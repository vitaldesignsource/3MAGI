// Validate a glyph set against the kit's rules (see README.md).
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('usage: node check.mjs <glyphs.json>'); process.exit(2); }
const set = JSON.parse(fs.readFileSync(file, 'utf8'));
const problems = [];
const say = (l, m) => problems.push(`${l ? `#${l.order} ${l.name}: ` : ''}${m}`);

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
    if (!g || typeof g.d !== 'string') { say(l, 'glyph.d missing'); continue; }
    if (!l.strokes || l.strokes.trim().split(/\s+/).length < 4) say(l, 'strokes description missing or too short');
    let cmds;
    try { cmds = parse(g.d); } catch (e) { say(l, `path: ${e.message}`); continue; }
    for (const [x, y] of coords(cmds)) {
        if ((x !== null && (x < 0 || x > 100)) || (y !== null && (y < 0 || y > 100))) { say(l, `coordinate out of 0–100: ${x},${y}`); break; }
    }
    const eps = endpoints(cmds);
    for (const r of g.rings ?? []) {
        const [x, y, rad = 6] = r;
        if ([x, y, rad].some((v) => typeof v !== 'number')) { say(l, `bad ring ${JSON.stringify(r)}`); continue; }
        const near = eps.some(([ex, ey]) => Math.hypot(ex - x, ey - y) <= 6 + rad);
        if (!near) say(l, `ring at ${x},${y} is not on a stroke end`);
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) say(l, `ring at ${x},${y} leaves the box`);
    }
    for (const dt of g.dots ?? []) {
        if (dt.slice(0, 2).some((v) => typeof v !== 'number' || v < 0 || v > 100)) say(l, `bad dot ${JSON.stringify(dt)}`);
    }
}
if (problems.length) {
    console.log(`${problems.length} problem(s):`);
    for (const p of problems) console.log(' - ' + p);
    process.exit(1);
}
console.log(`ok: ${set.letters.length} letters, ${set.letters.filter((l) => l.glyph === null).length} gaps`);
