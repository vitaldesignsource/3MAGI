// Shared by the Magical Scriptorium's tools: build-magic.mjs (which writes the
// comparison data), validate-magic.mjs (which checks every module, and that
// the written data is current) and the search index. Nothing here swallows an
// import error: a module that will not load stops the build with its message.

import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const web = path.resolve(here, '..');
export const MAGIC_DIR = path.join(web, 'src/data/education/magic');
export const GENERATED = path.join(MAGIC_DIR, 'compare.generated.js');
export const GENERATED_INDEX = path.join(MAGIC_DIR, 'wing-index.generated.js');

const importDefault = async (file) => (await import(pathToFileURL(file).href)).default;

export const loadRegistry = () => importDefault(path.join(MAGIC_DIR, 'registry.js'));
export const loadHall = (name) => importDefault(path.join(web, 'src/data/education', `${name}.js`));

// Every registry entry's module, keyed by slug. A missing or broken module is
// reported, never skipped.
export async function loadModules(registry) {
    const modules = {};
    const problems = [];
    for (const e of [...registry.alphabets, ...registry.pages]) {
        try { modules[e.slug] = await importDefault(path.join(MAGIC_DIR, `${e.slug}.js`)); }
        catch (err) { problems.push(`${e.slug}: module did not load — ${err.message.split('\n')[0]}`); }
    }
    return { modules, problems };
}

// --- the glyph kit's path rules (ported from its check.mjs, -----------------
// docs/research/magical-scriptorium/glyphkit/check.mjs) ----------------------

const ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
const TOKEN = /[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g;

// Tokenise a path into [command, numbers[]] pairs, or throw with the reason.
export function parsePath(d) {
    const toks = d.match(TOKEN) || [];
    const leftover = d.replace(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?|[\s,]/g, '');
    if (leftover) throw new Error(`unexpected characters "${leftover.slice(0, 20)}"`);
    const out = [];
    let i = 0;
    while (i < toks.length) {
        const c = toks[i++];
        if (!/^[A-Za-z]$/.test(c)) throw new Error(`number "${c}" where a command was expected`);
        if (!(c in ARGS)) throw new Error(`command "${c}" not allowed (absolute M L H V C S Q T A Z only)`);
        const n = ARGS[c];
        if (n === 0) { out.push([c, []]); continue; }
        let first = true;
        while (first || (i < toks.length && !/^[A-Za-z]$/.test(toks[i]))) {
            const nums = toks.slice(i, i + n).map(Number);
            if (nums.length < n || nums.some((x) => Number.isNaN(x))) throw new Error(`"${c}" needs ${n} numbers`);
            out.push([c, nums]);
            i += n;
            first = false;
        }
    }
    if (out.length && out[0][0] !== 'M') throw new Error('path must start with M');
    return out;
}

// The ends of every subpath: the start of each M and the last point before
// the next M (a ring must sit on one of these).
export function endpoints(cmds) {
    const pts = [];
    let cur = null, start = null;
    for (const [c, a] of cmds) {
        if (c === 'M') { if (cur) pts.push(cur); cur = [a[0], a[1]]; start = cur; pts.push(cur); continue; }
        if (c === 'Z') { cur = start; continue; }
        if (c === 'H') cur = [a[0], cur[1]];
        else if (c === 'V') cur = [cur[0], a[0]];
        else cur = [a[a.length - 2], a[a.length - 1]];
    }
    if (cur) pts.push(cur);
    return pts;
}

function coords(cmds) {
    const xs = [];
    for (const [c, a] of cmds) {
        if (c === 'H') xs.push([a[0], null]);
        else if (c === 'V') xs.push([null, a[0]]);
        else if (c === 'A') xs.push([a[5], a[6]]);
        else for (let k = 0; k + 1 < a.length; k += 2) xs.push([a[k], a[k + 1]]);
    }
    return xs;
}

// Every problem with one drawn glyph, as plain sentences (empty when sound).
// Beyond the grammar of the path, it holds the glyph to what a browser will
// actually draw and to the kit's README: a glyph must draw something (a
// stroke, a ring or a dot); an arc's flags are 0 or 1 and its radii positive,
// or the browser logs an error and drops the path; a ring or dot has a radius
// in (0, 50] and stays inside the box; and a ring sits on a stroke end with
// the stroke stopping at its EDGE — some endpoint lies r (±1.5) from the
// ring's centre, so the line never crosses the ring's hole. A filled glyph
// ({ fill }) is held to its own rules instead (fillProblems, below).
export const RING_R = 6;
export const DOT_R = 2.6;
const RING_TOLERANCE = 1.5;
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export function glyphProblems(g) {
    const out = [];
    if (g && typeof g === 'object' && Object.prototype.hasOwnProperty.call(g, 'fill')) return fillProblems(g);
    if (!g || typeof g !== 'object' || typeof g.d !== 'string') return ['glyph.d is missing: a drawn glyph needs path data, even an empty string (or give glyph.fill, the outline of its ink)'];
    for (const k of ['rings', 'dots']) {
        if (g[k] != null && !Array.isArray(g[k])) return [`glyph.${k} must be a list of [x, y] or [x, y, r]`];
    }
    // a lighter pen for where the glyph is drawn large (MagicGlyph.jsx)
    if (g.pen != null && !(isNum(g.pen) && g.pen > 0 && g.pen < 5.5)) out.push(`glyph.pen, if given, is a pen lighter than the house 5.5 (got ${g.pen})`);
    // a fine-lined figure's pen at every size but the plaque's (MagicGlyph.jsx):
    // lighter than the house pen, and given with its plaque pen, never heavier
    if (g.textPen != null) {
        if (!(isNum(g.textPen) && g.textPen > 0 && g.textPen < 5.5)) out.push(`glyph.textPen, if given, is a pen lighter than the house 5.5 (got ${g.textPen})`);
        else if (!isNum(g.pen)) out.push('glyph.textPen is given with glyph.pen, the figure’s own weight in the plaque');
        else if (g.pen > g.textPen) out.push(`glyph.pen (${g.pen}) is the figure’s own weight and is not heavier than its textPen (${g.textPen})`);
    }
    const rings = g.rings ?? [];
    const dots = g.dots ?? [];
    let cmds;
    try { cmds = parsePath(g.d); } catch (e) { return [`path: ${e.message}`]; }
    const draws = cmds.some(([c]) => c !== 'M' && c !== 'Z');
    if (!draws && rings.length === 0 && dots.length === 0) {
        out.push(g.d.trim() ? 'the path only moves the pen and there are no rings or dots: the glyph draws nothing'
            : 'the glyph draws nothing: no path, no rings, no dots');
    }
    for (const [c, a] of cmds) {
        if (c !== 'A') continue;
        const [rx, ry, , large, sweep] = a;
        if (!(rx > 0 && ry > 0)) out.push(`arc radii must be greater than 0 (got ${rx}, ${ry})`);
        if (![0, 1].includes(large) || ![0, 1].includes(sweep)) out.push(`arc flags must be 0 or 1 (got ${large}, ${sweep}): the browser rejects the path`);
    }
    for (const [x, y] of coords(cmds)) {
        if ((x !== null && (x < 0 || x > 100)) || (y !== null && (y < 0 || y > 100))) {
            out.push(`coordinate out of the 0–100 box: ${x},${y}`);
            break;
        }
    }
    const eps = endpoints(cmds);
    for (const r of rings) {
        if (!Array.isArray(r) || r.length < 2 || r.length > 3) { out.push(`bad ring ${JSON.stringify(r)}: give [x, y] or [x, y, r]`); continue; }
        const [x, y, rad = RING_R] = r;
        if (![x, y, rad].every(isNum)) { out.push(`bad ring ${JSON.stringify(r)}: every value must be a number`); continue; }
        if (!(rad > 0 && rad <= 50)) { out.push(`ring at ${x},${y} has radius ${rad}: it must be greater than 0 and at most 50`); continue; }
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) out.push(`ring at ${x},${y} leaves the 0–100 box`);
        if (!eps.length) { out.push(`ring at ${x},${y} has no stroke to end: a ring sits on a stroke end`); continue; }
        const nearest = Math.min(...eps.map(([ex, ey]) => Math.hypot(ex - x, ey - y)));
        if (Math.abs(nearest - rad) > RING_TOLERANCE) {
            out.push(`ring at ${x},${y} (r ${rad}) is not on a stroke end: the nearest endpoint is ${nearest.toFixed(1)} from its centre, and the stroke must stop at the ring's edge, ${rad} away`);
        }
    }
    // A fine-lined figure whose traced rings close up at text size may give
    // the rings it is drawn with there (MagicGlyph.jsx): one for each traced
    // ring, in the same order, never smaller, on the same stroke end, and
    // every one scaled by the same factor, so their sizes keep their
    // proportions. The traced rings stand in the plaque.
    if (g.textRings != null) {
        if (!Array.isArray(g.textRings) || g.textRings.length !== rings.length || !rings.length) out.push('glyph.textRings gives one ring for each traced ring, in the same order');
        else if (g.textPen == null) out.push('glyph.textRings belongs to a fine-lined figure: give it with textPen');
        else {
            const ratios = [];
            g.textRings.forEach((t, i) => {
                if (!Array.isArray(t) || t.length !== 3 || !t.every(isNum)) { out.push(`bad text ring ${JSON.stringify(t)}: give [x, y, r]`); return; }
                const [x, y, rad] = t;
                const [tx, ty, tr = RING_R] = rings[i];
                if (!(rad >= tr && rad <= 50)) { out.push(`text ring ${i + 1} (r ${rad}) is smaller than the traced ring it stands for (r ${tr})`); return; }
                if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) out.push(`text ring at ${x},${y} leaves the 0–100 box`);
                // the stroke end the traced ring sits on, which the text ring keeps
                const end = eps.reduce((b, e) => (Math.abs(Math.hypot(e[0] - tx, e[1] - ty) - tr) < Math.abs(Math.hypot(b[0] - tx, b[1] - ty) - tr) ? e : b), eps[0] || [NaN, NaN]);
                const d = Math.hypot(end[0] - x, end[1] - y);
                if (!(Math.abs(d - rad) <= RING_TOLERANCE)) out.push(`text ring ${i + 1} at ${x},${y} (r ${rad}) does not keep its traced ring's stroke end at its edge (it is ${d.toFixed(1)} away)`);
                ratios.push(rad / tr);
            });
            if (ratios.length && Math.max(...ratios) - Math.min(...ratios) > 0.02) out.push('glyph.textRings scales every traced ring by one factor');
        }
    }
    for (const dt of dots) {
        if (!Array.isArray(dt) || dt.length < 2 || dt.length > 3) { out.push(`bad dot ${JSON.stringify(dt)}: give [x, y] or [x, y, r]`); continue; }
        const [x, y, rad = DOT_R] = dt;
        if (![x, y, rad].every(isNum)) { out.push(`bad dot ${JSON.stringify(dt)}: every value must be a number`); continue; }
        if (!(rad > 0 && rad <= 50)) { out.push(`dot at ${x},${y} has radius ${rad}: it must be greater than 0 and at most 50`); continue; }
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) out.push(`dot at ${x},${y} (r ${rad}) leaves the 0–100 box`);
    }
    return out;
}

// --- filled glyphs (the kit's README, "Filled glyphs", and its fill.mjs: ---
// docs/research/magical-scriptorium/glyphkit/) ------------------------------
// A filled glyph is { fill }: the outline of the letter's ink, drawn by
// MagicGlyph as one path filled evenodd with no pen. Its path is absolute
// M L C Q Z only, every subpath begins with M and is closed with Z, and
// encloses some area; every coordinate lies in 0–100, and the ink itself —
// its exact box, the extrema of its curves included — inside the body box,
// x 10–90, y 15–85. It holds fill and nothing else: never d, rings or dots,
// and none of the pens, which are the centre-line glyphs'.
export const BODY_BOX = { x0: 10, y0: 15, x1: 90, y1: 85 };
const FILL_ARGS = { M: 2, L: 2, C: 6, Q: 4, Z: 0 };
const FILL_TOKEN = /[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g;
const FILL_LEFTOVER = /[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?|[\s,]/g;

// The subpaths of a fill, or throw with the reason: [{ start, segs }], each
// segment { c: 'L' | 'Q' | 'C', p } with p its points from its start point
// (2, 3 or 4). Number pairs after an M are lines, as in SVG.
export function parseFill(d) {
    if (!d.trim()) throw new Error('the fill is empty');
    const leftover = d.replace(FILL_LEFTOVER, '');
    if (leftover) throw new Error(`unexpected characters "${leftover.slice(0, 20)}"`);
    const toks = d.match(FILL_TOKEN) || [];
    const isCmd = (t) => /^[A-Za-z]$/.test(t);
    const subs = [];
    let i = 0, sub = null, cur = null;
    while (i < toks.length) {
        const c = toks[i++];
        if (!isCmd(c)) throw new Error(`number "${c}" where a command was expected`);
        if (!(c in FILL_ARGS)) throw new Error(`command "${c}" is not allowed in a fill (absolute M L C Q Z only)`);
        if (c === 'Z') {
            if (!sub) throw new Error(subs.length ? `a second Z after subpath ${subs.length} was closed` : 'path must start with M');
            if (!sub.segs.length) throw new Error(`subpath ${subs.length} is closed with nothing drawn`);
            cur = sub.start;
            sub = null;
            continue;
        }
        if (c === 'M' && sub) throw new Error(`subpath ${subs.length} is not closed with Z before the next M`);
        if (c !== 'M' && !sub) throw new Error(subs.length ? `"${c}" after Z: every subpath begins with M` : 'path must start with M');
        const n = FILL_ARGS[c];
        let first = true;
        while (first || (i < toks.length && !isCmd(toks[i]))) {
            const nums = toks.slice(i, i + n).map(Number);
            if (nums.length < n || nums.some((x) => !Number.isFinite(x))) throw new Error(`"${c}" needs ${n} numbers`);
            i += n;
            const pts = [];
            for (let k = 0; k < n; k += 2) pts.push([nums[k], nums[k + 1]]);
            if (c === 'M' && first) {
                sub = { start: pts[0], segs: [] };
                subs.push(sub);
            } else sub.segs.push({ c: c === 'M' ? 'L' : c, p: [cur, ...pts] });
            cur = pts[pts.length - 1];
            first = false;
        }
    }
    if (sub) throw new Error(`subpath ${subs.length} is not closed with Z`);
    return subs;
}

const fillPoint = ({ c, p }, t) => {
    const u = 1 - t;
    const w = c === 'L' ? [u, t] : c === 'Q' ? [u * u, 2 * u * t, t * t] : [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return [0, 1].map((k) => p.reduce((s, q, j) => s + w[j] * q[k], 0));
};

// The exact box of a fill's ink: its end points and its curves' extrema.
export function fillBox(subs) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const grow = ([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
    const roots = (a, b, c) => {
        if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? [] : [-c / b];
        const disc = b * b - 4 * a * c;
        return disc < 0 ? [] : [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)];
    };
    for (const s of subs) {
        grow(s.start);
        for (const seg of s.segs) {
            grow(seg.p[seg.p.length - 1]);
            if (seg.c === 'L') continue;
            for (const k of [0, 1]) {
                const v = seg.p.map((q) => q[k]);
                const ts = seg.c === 'Q' ? roots(0, 2 * (v[0] - 2 * v[1] + v[2]), 2 * (v[1] - v[0]))
                    : roots((v[1] - v[0]) - 2 * (v[2] - v[1]) + (v[3] - v[2]), 2 * ((v[2] - v[1]) - (v[1] - v[0])), v[1] - v[0]);
                for (const t of ts) if (t > 0 && t < 1) grow(fillPoint(seg, t));
            }
        }
    }
    return { x0, y0, x1, y1 };
}

// Does a subpath enclose any area: does some point of it, its curves taken in
// 24 steps, stand off the line through the two of its points farthest apart?
function enclosesArea(sub) {
    const pts = [sub.start, ...sub.segs.flatMap((seg) => (seg.c === 'L' ? [seg.p[1]] : Array.from({ length: 24 }, (_, k) => fillPoint(seg, (k + 1) / 24))))];
    let [a, b, far] = [pts[0], pts[0], 0];
    for (const p of pts) { const d = Math.hypot(p[0] - a[0], p[1] - a[1]); if (d > far) { far = d; b = p; } }
    return far > 1e-6 && pts.some((p) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / far > 1e-3);
}

// The area a fill draws, filled evenodd: on rows 0.1 unit apart across its
// box, the crossings of every subpath's edges (curves in 24 steps) sorted and
// taken in pairs, each pair a run of ink. Subpaths that cancel (the same shape
// twice, or a counter the size of its outline) draw nothing, though each
// encloses some area.
export function evenOddArea(subs) {
    const edges = [];
    for (const s of subs) {
        const pts = [s.start, ...s.segs.flatMap((seg) => (seg.c === 'L' ? [seg.p[1]] : Array.from({ length: 24 }, (_, k) => fillPoint(seg, (k + 1) / 24))))];
        for (let i = 0; i < pts.length; i++) edges.push([pts[i], pts[(i + 1) % pts.length]]);
    }
    const ys = edges.flatMap(([a, b]) => [a[1], b[1]]);
    const y0 = Math.min(...ys), y1 = Math.max(...ys), h = 0.1;
    let area = 0;
    for (let y = y0 + h / 2; y < y1; y += h) {
        const xs = [];
        for (const [a, b] of edges) {
            if ((a[1] <= y && y < b[1]) || (b[1] <= y && y < a[1])) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
        }
        xs.sort((p, q) => p - q);
        for (let k = 0; k + 1 < xs.length; k += 2) area += (xs[k + 1] - xs[k]) * h;
    }
    return area;
}

// Subpaths that cancel ink under evenodd though the fill as a whole draws
// something. A subpath given twice (the same points in the same order) draws
// nothing, wherever it stands. And every subpath must stand apart from the
// others or wholly inside one of them: then each adds its own area to the ink
// (a piece, or a piece standing in a counter) or takes it away (a counter), as
// the number of subpaths around it is even or odd, and the ink is the sum of
// those areas. Where two subpaths overlap in part, the overlap is left empty
// and the ink falls short of that sum.
export function cancelledSubpaths(subs) {
    const out = [];
    const key = (s) => JSON.stringify([s.start, ...s.segs.map((seg) => [seg.c, ...seg.p.slice(1)])]);
    const seen = new Map();
    subs.forEach((s, k) => {
        const id = key(s);
        if (seen.has(id)) out.push(`fill subpaths ${seen.get(id) + 1} and ${k + 1} are the same shape: under evenodd the two cancel and draw nothing`);
        else seen.set(id, k);
    });
    if (out.length || subs.length < 2) return out;
    const polys = subs.map((s) => [s.start, ...s.segs.flatMap((seg) => (seg.c === 'L' ? [seg.p[1]] : Array.from({ length: 24 }, (_, k) => fillPoint(seg, (k + 1) / 24))))]);
    const inside = ([x, y], P) => {
        let c = false;
        for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
            const [xi, yi] = P[i], [xj, yj] = P[j];
            if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
        }
        return c;
    };
    const sum = subs.reduce((t, s, k) => {
        const around = polys.filter((P, j) => j !== k && inside(polys[k][0], P)).length;
        return t + (around % 2 ? -1 : 1) * evenOddArea([s]);
    }, 0);
    const ink = evenOddArea(subs);
    if (Math.abs(sum - ink) > Math.max(0.5, 0.01 * Math.abs(sum))) {
        out.push('fill subpaths overlap one another in part: each must stand apart from the others or wholly inside one, or under evenodd the overlap is left empty');
    }
    return out;
}

function fillProblems(g) {
    const out = [];
    const keys = Object.keys(g).filter((k) => k !== 'fill');
    const centre = keys.filter((k) => ['d', 'rings', 'dots'].includes(k));
    if (centre.length) out.push(`a glyph has either fill or d/rings/dots, never both (this one also has ${centre.join(', ')})`);
    const rest = keys.filter((k) => !centre.includes(k));
    if (rest.length) out.push(`a filled glyph holds fill alone: ${rest.join(', ')} ${rest.length > 1 ? 'belong' : 'belongs'} to the centre-line glyphs or ${rest.length > 1 ? 'are' : 'is'} unknown`);
    if (typeof g.fill !== 'string') return [...out, 'glyph.fill must be a string of path data'];
    let subs;
    try { subs = parseFill(g.fill); } catch (e) { return [...out, `fill: ${e.message}`]; }
    const off = subs.flatMap((s) => [s.start, ...s.segs.flatMap((seg) => seg.p.slice(1))]).find(([x, y]) => x < 0 || x > 100 || y < 0 || y > 100);
    if (off) out.push(`fill coordinate out of the 0–100 box: ${off[0]},${off[1]}`);
    subs.forEach((s, k) => { if (!enclosesArea(s)) out.push(`fill subpath ${k + 1} encloses no area`); });
    if (subs.every(enclosesArea) && evenOddArea(subs) < 0.01) out.push('the fill draws nothing: its subpaths cancel each other under evenodd');
    else if (subs.every(enclosesArea)) out.push(...cancelledSubpaths(subs));
    const b = fillBox(subs);
    const r1 = (v) => Math.round(v * 10) / 10;
    const e = 1e-6;
    if (b.x0 < BODY_BOX.x0 - e || b.x1 > BODY_BOX.x1 + e || b.y0 < BODY_BOX.y0 - e || b.y1 > BODY_BOX.y1 + e) {
        out.push(`the ink (x ${r1(b.x0)}–${r1(b.x1)}, y ${r1(b.y0)}–${r1(b.y1)}, its curves included) leaves the body box, x ${BODY_BOX.x0}–${BODY_BOX.x1}, y ${BODY_BOX.y0}–${BODY_BOX.y1}`);
    }
    return out;
}

// A source URL the page can print: it must parse (the page reads its host
// name with new URL()) and it must be https.
export function urlProblem(url) {
    try {
        const u = new URL(url);
        if (u.protocol !== 'https:') return `url must be https:// — "${url}"`;
        if (!u.hostname) return `url has no host — "${url}"`;
        return null;
    } catch {
        return `url does not parse (the page reads its host name with new URL()) — "${url}"`;
    }
}

// --- the comparison data -----------------------------------------------------

const signOf = (l) => (l.glyph ? { glyph: l.glyph } : l.char ? { char: l.char } : null);

// Build compare.generated.js's object from the registry, the modules and the
// halls. Every cell is looked up from the alphabet's own letters by the value
// they stand for, and every row from the hall's own letters, so the tables and
// the transliterator cannot drift from the data they show.
export async function buildCompare(registry, modules) {
    const hebrew = await loadHall('hebrew');
    const latin = await loadHall('latin');
    const phoenician = await loadHall('phoenician');

    const hebrewKeys = [];
    hebrew.letters.forEach((l, i) => {
        hebrewKeys.push({ glyph: l.glyph, name: l.name, value: l.value, i });
        if (l.final) hebrewKeys.push({ glyph: l.final, name: `Final ${l.name}`, value: l.value, i, base: l.glyph });
    });
    const latinKeys = latin.letters.map((l, i) => ({ glyph: l.glyph.split(/\s+/)[0], name: l.name, i }));
    const finals = Object.fromEntries(hebrewKeys.filter((k) => k.base).map((k) => [k.glyph, k.base]));

    const table = (keyedTo, keys, ancestor) => {
        const entries = registry.alphabets.filter((a) => a.keyedTo === keyedTo);
        const columns = entries.map((a) => {
            const m = modules[a.slug] || {};
            const letters = m.letters || [];
            const signed = letters.some((l) => l.glyph || l.char);
            return {
                slug: a.slug, title: a.title, short: a.short, status: a.status, direction: a.direction,
                mode: signed ? 'signs' : 'pending',
                letters: letters.length,
            };
        });
        const rows = keys.map((k) => {
            const cells = {};
            for (const a of entries) {
                const letters = (modules[a.slug] && modules[a.slug].letters) || [];
                const i = letters.findIndex((l) => l.value === k.glyph);
                cells[a.slug] = i < 0 ? null : { i, name: letters[i].name, sign: signOf(letters[i]) };
            }
            const row = { key: k.glyph, name: k.name, cells };
            if (k.value != null) row.value = k.value;
            if (k.base) row.final = true;
            if (ancestor && !k.base) {
                const ph = ancestor.letters[k.i];
                if (ph) { row.ph = ph.glyph; row.phName = ph.name; }
            }
            if (k.i != null) row.hall = k.i;
            return row;
        });
        return { key: keyedTo, columns, rows };
    };

    const schemes = {};
    for (const a of registry.alphabets) {
        const m = modules[a.slug];
        if (!m || !m.transliteration || !m.letters) continue;
        const t = m.transliteration;
        const keys = [];
        m.letters.forEach((l, i) => {
            const key = t.from === 'hebrew' ? l.value : (l.translit ? l.translit.toLowerCase() : null);
            if (!key) return;
            keys.push({ key, i, name: l.name, translit: l.translit || null, sign: signOf(l) });
        });
        schemes[a.slug] = {
            slug: a.slug, title: a.title, short: a.short, status: a.status, direction: a.direction,
            from: t.from, convention: t.convention, folds: t.folds || [], unwritten: t.unwritten || null,
            keys, ...(t.from === 'hebrew' ? { finals } : {}),
        };
    }

    // What each entry holds, so a portal can mark a stub without loading it.
    const entries = {};
    for (const e of [...registry.alphabets, ...registry.pages]) {
        const m = modules[e.slug] || {};
        const letters = m.letters || [];
        entries[e.slug] = { stub: Boolean(m.stub), letters: letters.length, shown: letters.filter((l) => l.glyph || l.char).length };
    }

    return {
        entries,
        keys: { hebrew: hebrewKeys, latin: latinKeys },
        tables: [table('hebrew', hebrewKeys, phoenician), table('latin', latinKeys, null)],
        schemes,
    };
}

// Each sign (a letter's glyph or character) is written once, in S, and the
// table cells and the scheme keys that show it point to it: a filled outline
// is a long string, and the comparison table and the transliterator show the
// same letters. The object a page imports is the same as if each were written
// out in full.
export const serialiseCompare = (data) => {
    const signs = [];
    const index = new Map();
    const json = JSON.stringify(data, (k, v) => {
        if (k !== 'sign' || !v || typeof v !== 'object') return v;
        const id = JSON.stringify(v);
        if (!index.has(id)) { index.set(id, signs.length); signs.push(v); }
        return `@@sign:${index.get(id)}@@`;
    }, 1).replace(/"@@sign:(\d+)@@"/g, 'S[$1]');
    return [
        '// GENERATED by tools/build-magic.mjs — do not edit. The Magical Scriptorium\'s',
        '// comparison tables and transliteration schemes, derived from the alphabet',
        '// modules and the Hebrew, Latin and Phoenician halls. validate-magic.mjs',
        '// rebuilds this in memory and fails the build if the file is stale. Each',
        '// sign is written once, in S (one to a line), and every cell and key that',
        '// shows it points there.',
        `const S = [\n${signs.map((v) => ` ${JSON.stringify(v)}`).join(',\n')}\n];`,
        `export default ${json};`,
        '',
    ].join('\n');
};

// The small part of that data the portal and the alphabet pages need, written
// to a module of its own so that they do not load the tables and the schemes:
// what each entry holds (entries) and the Hebrew and Latin hall keys (keys).
export const serialiseIndex = (data) => [
    '// GENERATED by tools/build-magic.mjs — do not edit. What each entry of the',
    '// Magical Scriptorium holds, and the Hebrew and Latin hall keys, as in',
    '// compare.generated.js, for the pages that need nothing else from it.',
    '// validate-magic.mjs rebuilds this in memory and fails the build if it is stale.',
    `export default ${JSON.stringify({ entries: data.entries, keys: data.keys }, null, 1)};`,
    '',
].join('\n');
