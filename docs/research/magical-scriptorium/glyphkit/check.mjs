// Validate a glyph set against the kit's rules (see README.md).
//
//   node check.mjs <glyphs.json> [--boxes]
//
// --boxes also prints the ink box of every filled glyph, and the band their
// bottoms and tops make, so a set traced at one scale can be seen to sit on
// one baseline band.
import fs from 'node:fs';
import { BODY, cancelledSubpaths, enclosesArea, evenOddArea, fillBox, fillCoords, fillCrossings, flatten, parseFill } from './fill.mjs';

const [file, ...flags] = process.argv.slice(2);
if (!file) { console.error('usage: node check.mjs <glyphs.json> [--boxes]'); process.exit(2); }
const set = JSON.parse(fs.readFileSync(file, 'utf8'));
const problems = [];
const warnings = [];
const boxes = [];
const say = (l, m) => problems.push(`${l ? `#${l.order} ${l.name}: ` : ''}${m}`);
const warn = (l, m) => warnings.push(`${l ? `#${l.order} ${l.name}: ` : ''}${m}`);
const f1 = (v) => Math.round(v * 10) / 10;

// A filled glyph: { fill } and nothing else (README.md, "Filled glyphs").
function checkFill(l, g) {
    const other = Object.keys(g).filter((k) => k !== 'fill');
    const stroke = other.filter((k) => ['d', 'rings', 'dots'].includes(k));
    if (stroke.length) say(l, `a glyph has either fill or d/rings/dots, never both (this one also has ${stroke.join(', ')})`);
    const rest = other.filter((k) => !stroke.includes(k));
    if (rest.length) say(l, `a filled glyph holds fill only (${rest.join(', ')} ${rest.length > 1 ? 'are' : 'is'} for drawn strokes or unknown)`);
    if (typeof g.fill !== 'string') { say(l, 'glyph.fill must be a string of path data'); return; }
    let subs;
    try { subs = parseFill(g.fill); } catch (e) { say(l, `fill: ${e.message}`); return; }
    const out = fillCoords(subs).find(([x, y]) => x < 0 || x > 100 || y < 0 || y > 100);
    if (out) say(l, `fill coordinate out of 0–100: ${out[0]},${out[1]}`);
    subs.forEach((s, k) => { if (!enclosesArea(flatten(s))) say(l, `fill subpath ${k + 1} encloses no area`); });
    if (subs.every((s) => enclosesArea(flatten(s))) && evenOddArea(subs) < 0.01) say(l, 'the fill draws nothing: its subpaths cancel each other under evenodd');
    else if (subs.every((s) => enclosesArea(flatten(s)))) for (const m of cancelledSubpaths(subs)) say(l, m);
    const b = fillBox(subs);
    const e = 1e-6;
    if (b && (b.x0 < BODY.x0 - e || b.x1 > BODY.x1 + e || b.y0 < BODY.y0 - e || b.y1 > BODY.y1 + e)) {
        say(l, `the ink (x ${f1(b.x0)}–${f1(b.x1)}, y ${f1(b.y0)}–${f1(b.y1)}, curves included) leaves the body box x ${BODY.x0}–${BODY.x1}, y ${BODY.y0}–${BODY.y1}`);
    }
    for (const { a, b: c } of fillCrossings(subs)) {
        warn(l, a === c ? `fill subpath ${a} crosses itself: wherever it wraps an area twice, evenodd leaves that area empty`
            : `fill subpaths ${a} and ${c} cross: under evenodd their overlap is left empty (a counter lies wholly inside its outline)`);
    }
    if (b) boxes.push({ l, b, n: subs.length });
}

// Tokenise a path; return the list of [cmd, numbers[]] or throw.
const ARGS = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
function parse(d) {
    const toks = d.match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g) || [];
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

// Endpoints of every subpath (start of each M and the last point before the next M).
function endpoints(cmds) {
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

if (!set.slug) say(null, 'missing slug');
if (!Array.isArray(set.letters) || !set.letters.length) say(null, 'no letters');
const orders = new Set();
for (const l of set.letters ?? []) {
    if (!l.name) say(l, 'missing name');
    if (orders.has(l.order)) say(l, 'duplicate order');
    orders.add(l.order);
    if (!['high', 'medium', 'low'].includes(l.formConfidence)) say(l, 'formConfidence must be high|medium|low');
    if (l.glyph === null) {
        if (!l.note || l.note.trim().split(/\s+/).length < 8) say(l, 'a null glyph needs a note of at least 8 words');
        continue;
    }
    const g = l.glyph;
    const described = () => { if (!l.strokes || l.strokes.trim().split(/\s+/).length < 4) say(l, 'strokes description missing or too short'); };
    if (g && typeof g === 'object' && 'fill' in g) { described(); checkFill(l, g); continue; }
    if (!g || typeof g.d !== 'string') { say(l, 'glyph.d missing (or give glyph.fill for a filled glyph)'); continue; }
    described();
    let cmds;
    try { cmds = parse(g.d); } catch (e) { say(l, `path: ${e.message}`); continue; }
    for (const [x, y] of coords(cmds)) {
        if ((x !== null && (x < 0 || x > 100)) || (y !== null && (y < 0 || y > 100))) { say(l, `coordinate out of 0–100: ${x},${y}`); break; }
    }
    const rings = g.rings ?? [];
    const dots = g.dots ?? [];
    if (!Array.isArray(rings) || !Array.isArray(dots)) { say(l, 'rings and dots must be lists of [x, y] or [x, y, r]'); continue; }
    // it must draw something: a stroke, a ring or a dot
    if (!cmds.some(([c]) => c !== 'M' && c !== 'Z') && !rings.length && !dots.length) say(l, 'the glyph draws nothing: no stroke, no rings, no dots');
    // an arc the browser will draw: radii above 0, flags 0 or 1
    for (const [c, a] of cmds) {
        if (c !== 'A') continue;
        if (!(a[0] > 0 && a[1] > 0)) say(l, `arc radii must be greater than 0 (got ${a[0]}, ${a[1]})`);
        if (![0, 1].includes(a[3]) || ![0, 1].includes(a[4])) say(l, `arc flags must be 0 or 1 (got ${a[3]}, ${a[4]})`);
    }
    const eps = endpoints(cmds);
    const num = (v) => typeof v === 'number' && Number.isFinite(v);
    for (const r of rings) {
        if (!Array.isArray(r) || r.length < 2 || r.length > 3) { say(l, `bad ring ${JSON.stringify(r)}`); continue; }
        const [x, y, rad = 6] = r;
        if (![x, y, rad].every(num)) { say(l, `bad ring ${JSON.stringify(r)}`); continue; }
        if (!(rad > 0 && rad <= 50)) { say(l, `ring at ${x},${y}: radius must be in (0, 50]`); continue; }
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) say(l, `ring at ${x},${y} leaves the box`);
        // the stroke stops at the ring's EDGE: some endpoint is r (±1.5) from its centre
        const nearest = eps.length ? Math.min(...eps.map(([ex, ey]) => Math.hypot(ex - x, ey - y))) : Infinity;
        if (Math.abs(nearest - rad) > 1.5) say(l, `ring at ${x},${y} is not on a stroke end: the nearest endpoint is ${nearest.toFixed(1)} from its centre, not ${rad} (the stroke must stop at the ring's edge)`);
    }
    for (const dt of dots) {
        if (!Array.isArray(dt) || dt.length < 2 || dt.length > 3) { say(l, `bad dot ${JSON.stringify(dt)}`); continue; }
        const [x, y, rad = 2.6] = dt;
        if (![x, y, rad].every(num)) { say(l, `bad dot ${JSON.stringify(dt)}`); continue; }
        if (!(rad > 0 && rad <= 50)) { say(l, `dot at ${x},${y}: radius must be in (0, 50]`); continue; }
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) say(l, `dot at ${x},${y} leaves the box`);
    }
}
if (flags.includes('--boxes') && boxes.length) {
    const med = (xs) => { const v = [...xs].sort((p, q) => p - q); const m = v.length >> 1; return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; };
    console.log('filled glyphs, ink box (x0 y0 x1 y1, viewBox units; y grows downward):');
    for (const { l, b, n } of boxes) console.log(`  #${l.order} ${l.name}: ${f1(b.x0)} ${f1(b.y0)} ${f1(b.x1)} ${f1(b.y1)}  (${f1(b.w)} × ${f1(b.h)}, ${n} subpath${n > 1 ? 's' : ''})`);
    const bot = boxes.map((x) => x.b.y1), top = boxes.map((x) => x.b.y0);
    console.log(`  band: bottoms median ${f1(med(bot))} (${f1(Math.min(...bot))}–${f1(Math.max(...bot))}), tops median ${f1(med(top))} (${f1(Math.min(...top))}–${f1(Math.max(...top))})`);
}
for (const w of warnings) console.log(' ! ' + w);
if (problems.length) {
    console.log(`${problems.length} problem(s):`);
    for (const p of problems) console.log(' - ' + p);
    process.exit(1);
}
const filled = set.letters.filter((l) => l.glyph && typeof l.glyph === 'object' && 'fill' in l.glyph).length;
console.log(`ok: ${set.letters.length} letters, ${set.letters.filter((l) => l.glyph === null).length} gaps${filled ? `, ${filled} filled` : ''}${warnings.length ? `, ${warnings.length} warning(s)` : ''}`);
