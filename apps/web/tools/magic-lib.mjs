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

// --- the glyph kit's path rules (ported from glyphkit/check.mjs) -----------

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
// ring's centre, so the line never crosses the ring's hole.
export const RING_R = 6;
export const DOT_R = 2.6;
const RING_TOLERANCE = 1.5;
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

export function glyphProblems(g) {
    const out = [];
    if (!g || typeof g !== 'object' || typeof g.d !== 'string') return ['glyph.d is missing: a drawn glyph needs path data, even an empty string'];
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
    for (const dt of dots) {
        if (!Array.isArray(dt) || dt.length < 2 || dt.length > 3) { out.push(`bad dot ${JSON.stringify(dt)}: give [x, y] or [x, y, r]`); continue; }
        const [x, y, rad = DOT_R] = dt;
        if (![x, y, rad].every(isNum)) { out.push(`bad dot ${JSON.stringify(dt)}: every value must be a number`); continue; }
        if (!(rad > 0 && rad <= 50)) { out.push(`dot at ${x},${y} has radius ${rad}: it must be greater than 0 and at most 50`); continue; }
        if (x - rad < 0 || x + rad > 100 || y - rad < 0 || y + rad > 100) out.push(`dot at ${x},${y} (r ${rad}) leaves the 0–100 box`);
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

export const serialiseCompare = (data) => [
    '// GENERATED by tools/build-magic.mjs — do not edit. The Magical Scriptorium\'s',
    '// comparison tables and transliteration schemes, derived from the alphabet',
    '// modules and the Hebrew, Latin and Phoenician halls. validate-magic.mjs',
    '// rebuilds this in memory and fails the build if the file is stale.',
    `export default ${JSON.stringify(data, null, 1)};`,
    '',
].join('\n');
