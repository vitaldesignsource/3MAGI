// How a letter of the wing is shown — plain JavaScript, imported by the glyph
// renderer and the pages alike, with no registry and no import.meta, so the
// shared search box can draw a sign without pulling in the wing.
// (with its extension: the build's tools import this file in node)
import { HOUSE_DOT, HOUSE_PEN, HOUSE_RING, ringPen } from './pen.js';

// The zodiac signs default to emoji presentation on phones. A text-
// presentation selector after each keeps them in the site's own face.
const VS15 = String.fromCodePoint(0xFE0E);
const emojiDefault = (char) => {
    const cp = char.codePointAt(0);
    return char.length === 1 && cp >= 0x2648 && cp <= 0x2653;
};
export const textOf = (char) => (emojiDefault(char) ? char + VS15 : char);

// Drawn path data, a character set in a vendored face, or nothing yet — an
// honest gap. Takes a letter or a sign ({ glyph } | { char } | null).
export function modeOf(letter) {
    if (!letter) return 'gap';
    if (letter.glyph) return 'glyph';
    if (letter.char) return 'char';
    return 'gap';
}

// The points a path passes through or is pulled towards, in viewBox units:
// every end point and control point of its segments (a curve lies inside the
// hull of its control points), and, for an elliptical arc, points along the
// arc itself (its control parameters are not points). Absolute and relative
// commands alike.
function pathPoints(d) {
    const pts = [];
    const tok = String(d || '').match(/[MmLlHhVvCcSsQqTtAaZz]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) || [];
    let i = 0, cmd = null, x = 0, y = 0, sx = 0, sy = 0;
    const num = () => Number(tok[i++]);
    const isNum = () => i < tok.length && !/^[A-Za-z]$/.test(tok[i]);
    const ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7 };
    while (i < tok.length) {
        if (/^[A-Za-z]$/.test(tok[i])) cmd = tok[i++];
        else if (cmd == null) { i += 1; continue; }
        const C = cmd.toUpperCase(), rel = cmd !== C;
        if (C === 'Z') { x = sx; y = sy; cmd = null; continue; }
        if (!isNum()) continue;
        if (C === 'H') { x = (rel ? x : 0) + num(); pts.push([x, y]); }
        else if (C === 'V') { y = (rel ? y : 0) + num(); pts.push([x, y]); }
        else if (C === 'A') {
            const rx = Math.abs(num()), ry = Math.abs(num()), rot = num(), large = num(), sweep = num();
            const ex = (rel ? x : 0) + num(), ey = (rel ? y : 0) + num();
            pts.push(...arcPoints(x, y, rx, ry, rot, large, sweep, ex, ey), [ex, ey]);
            x = ex; y = ey;
        } else {
            const n = ARGS[C];
            const a = Array.from({ length: n }, () => num());
            for (let k = 0; k < n; k += 2) pts.push([(rel ? x : 0) + a[k], (rel ? y : 0) + a[k + 1]]);
            x = (rel ? x : 0) + a[n - 2]; y = (rel ? y : 0) + a[n - 1];
            if (C === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
        }
    }
    return pts;
}

// Points along an SVG elliptical arc (endpoint to centre parameterisation,
// SVG 1.1 F.6.5), 32 to the arc: enough that its box is within a hundredth
// of a unit of the true one.
function arcPoints(x1, y1, rx, ry, rotDeg, large, sweep, x2, y2) {
    if (!rx || !ry || (x1 === x2 && y1 === y2)) return [];
    const phi = (rotDeg * Math.PI) / 180, c = Math.cos(phi), s = Math.sin(phi);
    const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
    const x1p = c * dx + s * dy, y1p = -s * dx + c * dy;
    const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
    if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
    const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
    const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
    const f = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
    const cxp = (f * rx * y1p) / ry, cyp = (-f * ry * x1p) / rx;
    const cx = c * cxp - s * cyp + (x1 + x2) / 2, cy = s * cxp + c * cyp + (y1 + y2) / 2;
    const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
    const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
    if (!sweep && dt > 0) dt -= 2 * Math.PI;
    if (sweep && dt < 0) dt += 2 * Math.PI;
    const out = [];
    for (let k = 0; k <= 32; k++) {
        const t = t1 + (dt * k) / 32;
        out.push([cx + rx * Math.cos(t) * c - ry * Math.sin(t) * s, cy + rx * Math.cos(t) * s + ry * Math.sin(t) * c]);
    }
    return out;
}

// A filled glyph ({ fill }, glyphkit/README.md "Filled glyphs"): the outline
// of the letter's ink, drawn as one path, evenodd, with no pen — where the
// other glyphs are centre lines ({ d, rings, dots }) for the house pen. A
// glyph is one or the other, never both (validate-magic.mjs).
export const isFill = (g) => Boolean(g && typeof g.fill === 'string');

// The exact box of a fill's ink, in viewBox units: every end point, and every
// extremum of a curve (where its derivative is 0 on an axis), so a curve that
// bulges past its end points is measured where it bulges, and the box is the
// ink's own, not its control points'. A fill is absolute M L C Q Z only.
const FILL_ARGS = { M: 2, L: 2, C: 6, Q: 4 };
function fillBox(d) {
    const tok = String(d || '').match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const grow = ([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
    // the roots in (0, 1) of a t² + b t + c
    const roots = (a, b, c) => {
        if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? [] : [-c / b];
        const disc = b * b - 4 * a * c;
        return disc < 0 ? [] : [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)];
    };
    // a point on a quadratic (3 points) or cubic (4 points) at t
    const at = (p, t) => {
        const u = 1 - t;
        const w = p.length === 3 ? [u * u, 2 * u * t, t * t] : [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
        return [0, 1].map((k) => p.reduce((s, q, j) => s + w[j] * q[k], 0));
    };
    let i = 0, cmd = null, cur = [0, 0], start = cur;
    while (i < tok.length) {
        if (/^[A-Za-z]$/.test(tok[i])) {
            cmd = tok[i++];
            if (cmd === 'Z') { cur = start; cmd = null; }
            else if (!(cmd in FILL_ARGS)) cmd = null;
            continue;
        }
        if (!cmd) { i += 1; continue; }
        const n = FILL_ARGS[cmd];
        const a = tok.slice(i, i + n).map(Number);
        i += n;
        if (a.length < n || a.some(Number.isNaN)) break;
        const pts = [cur];
        for (let k = 0; k < n; k += 2) pts.push([a[k], a[k + 1]]);
        const end = pts[pts.length - 1];
        grow(end);
        if (cmd === 'M') { start = end; cmd = 'L'; }
        else if (cmd !== 'L') {
            for (const k of [0, 1]) {
                const v = pts.map((q) => q[k]);
                const ts = v.length === 3 ? roots(0, 2 * (v[0] - 2 * v[1] + v[2]), 2 * (v[1] - v[0]))
                    : roots((v[1] - v[0]) - 2 * (v[2] - v[1]) + (v[3] - v[2]), 2 * ((v[2] - v[1]) - (v[1] - v[0])), v[1] - v[0]);
                for (const t of ts) if (t > 0 && t < 1) grow(at(pts, t));
            }
        }
        cur = end;
    }
    return Number.isFinite(x0) ? { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 } : null;
}

// The box a drawn sign's ink fills, in viewBox units: its path's points
// widened by half the stroke pen, each ring by its radius and half its pen,
// each dot by its radius. The pens are MagicGlyph's: the house pen, or a
// fine-lined figure's `textPen` (pass `textPen` to measure it drawn with
// another), whose rings take the lighter of their own pen and it, and whose
// text rings, where it gives them, are the rings drawn outside the plaque.
// A filled glyph has no pen: its box is its outline's exact box (fillBox).
// Null for a sign with nothing drawn.
export function inkBox(g, { textPen = g?.textPen ?? null } = {}) {
    if (!g) return null;
    if (isFill(g)) return fillBox(g.fill);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const grow = (x, y, h) => { x0 = Math.min(x0, x - h); y0 = Math.min(y0, y - h); x1 = Math.max(x1, x + h); y1 = Math.max(y1, y + h); };
    const pen = textPen ?? HOUSE_PEN;
    for (const [x, y] of pathPoints(g.d)) grow(x, y, pen / 2);
    const traced = (g.rings ?? []).map(([x, y, r = HOUSE_RING]) => [x, y, r]);
    const rings = g.textPen != null && Array.isArray(g.textRings) && g.textRings.length === traced.length ? g.textRings : traced;
    for (const [x, y, r] of rings) grow(x, y, r + (textPen != null ? Math.min(ringPen(r), textPen) : ringPen(r)) / 2);
    for (const [x, y, r = HOUSE_DOT] of g.dots ?? []) grow(x, y, r);
    return Number.isFinite(x0) ? { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 } : null;
}

// The note most letters share. While an alphabet's forms are being traced it
// is the reason for the gap, the same for every letter: the notice above the
// register gives it once, and the register prints only the notes that say
// something of their own letter. The search index applies the same rule, so a
// result never repeats it either.
export function sharedNote(letters) {
    const counts = new Map();
    for (const l of letters) if (l.note) counts.set(l.note, (counts.get(l.note) || 0) + 1);
    let best = null;
    let n = 0;
    for (const [note, c] of counts) if (c > n) { best = note; n = c; }
    return n >= 3 && n * 3 >= letters.length ? best : null;
}
