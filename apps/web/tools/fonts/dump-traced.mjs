#!/usr/bin/env node
// The traced glyph data the generated cipher fonts are built from, as one
// canonical JSON document: build-traced-fonts.py reads it, and
// validate-magic.mjs runs it in memory to tell whether the committed fonts
// (src/assets/fonts/traced, recorded in fonts.generated.js) are stale.
//
// Only the transliterator's writ is set in these fonts, so an alphabet's font
// holds exactly the keys its transliteration scheme writes (the scheme is
// built by magic-lib.mjs's buildCompare, the same builder as
// compare.generated.js), each drawn with that key's own sign. The pen is read
// from src/pages/magic/pen.js, as MagicGlyph.jsx reads it, and every ring and
// dot is written out as MagicGlyph resolves it:
//   - a ring [x, y, r, pen, hole]: its radius (the house 6 where the data give
//     none), the pen its circle is drawn with (ringPen(r)), and the radius of
//     the hole the strokes are masked by (r less half the lightest pen the ring
//     is drawn with);
//   - a dot [x, y, r]: its radius (the house 2.6 where the data give none).
// A glyph that names a pen of its own (pen, textPen, textRings) is drawn
// differently at different sizes, so one outline could not stand for it: the
// dump refuses it, and its alphabet stays SVG. A filled glyph ({ fill }, the
// outline of the letter's ink, drawn evenodd with no pen) is written out as
// { fill }: its outline is the font's, taken as it is.
//
// For each alphabet: slug, family, file, keyedTo, direction, signScale,
// drawingFollows (the font's description, name ID 10), the stroke pen and the
// glyphs, and dataHash = sha256 of the canonical JSON of all of these (object
// keys sorted, arrays in order, numbers as JavaScript prints them).
//
//   node tools/fonts/dump-traced.mjs        prints the document on stdout

import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { buildCompare, loadModules, loadRegistry } from '../magic-lib.mjs';
import { HOUSE_DOT, HOUSE_PEN, HOUSE_RING, ringPen } from '../../src/pages/magic/pen.js';

// The seven drawn alphabets the transliterator writes, with their font
// families and files. The family names are the fonts' own (name ID 1); the
// files are written to src/assets/fonts/traced.
export const TRACED_FONTS = [
    { slug: 'celestial', family: 'TL Celestial', file: 'TLCelestial.woff2' },
    { slug: 'malachim', family: 'TL Malachim', file: 'TLMalachim.woff2' },
    { slug: 'transitus-fluvii', family: 'TL River', file: 'TLRiver.woff2' },
    { slug: 'theban', family: 'TL Theban', file: 'TLTheban.woff2' },
    { slug: 'aiq-bekar', family: 'TL Nine Chambers', file: 'TLNineChambers.woff2' },
    { slug: 'enochian', family: 'TL Enochian', file: 'TLEnochian.woff2' },
    { slug: 'alphabet-of-the-magi', family: 'TL Magi', file: 'TLMagi.woff2' },
];

export const canonical = (v) => {
    if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
    if (v && typeof v === 'object') return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}`;
    if (typeof v === 'number' && !Number.isFinite(v)) throw new Error(`not a finite number: ${v}`);
    return JSON.stringify(v === undefined ? null : v);
};
const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

// A glyph as MagicGlyph.jsx draws it at text size, with no pen of its own:
// its strokes, rings and dots resolved, or its filled outline.
function resolveGlyph(g, where) {
    if (Object.prototype.hasOwnProperty.call(g, 'fill')) {
        const extra = Object.keys(g).filter((k) => k !== 'fill');
        if (extra.length) throw new Error(`${where}: a filled glyph holds fill alone, and this one holds ${extra.join(', ')} too`);
        if (typeof g.fill !== 'string' || !g.fill.trim()) throw new Error(`${where}: glyph.fill is not path data`);
        return { fill: g.fill };
    }
    for (const k of ['pen', 'textPen', 'textRings']) {
        if (g[k] != null) throw new Error(`${where}: the glyph names ${k}, so it is drawn differently by size and cannot be one outline`);
    }
    const extra = Object.keys(g).filter((k) => !['d', 'rings', 'dots'].includes(k));
    if (extra.length) throw new Error(`${where}: the glyph holds ${extra.join(', ')}, which the font builder does not know how to draw`);
    const rings = (g.rings ?? []).map(([x, y, r = HOUSE_RING]) => {
        const pen = ringPen(r);
        // MagicGlyph: the hole is r less half the lightest pen the ring is drawn
        // with; with no pen of the glyph's own, that is its ring pen
        return [x, y, r, pen, Math.max(0, r - pen / 2)];
    });
    const dots = (g.dots ?? []).map(([x, y, r = HOUSE_DOT]) => [x, y, r]);
    return { d: String(g.d ?? ''), rings, dots };
}

export async function dumpTraced() {
    const registry = await loadRegistry();
    const { modules, problems } = await loadModules(registry);
    if (problems.length) throw new Error(`modules failed to load: ${problems.join('; ')}`);
    const { schemes } = await buildCompare(registry, modules);
    const alphabets = [];
    for (const entry of registry.alphabets) {
        const spec = TRACED_FONTS.find((f) => f.slug === entry.slug);
        if (!spec) continue;
        const scheme = schemes[entry.slug];
        if (!scheme) throw new Error(`${entry.slug}: has a font but no transliteration scheme`);
        const glyphs = scheme.keys.map((k) => {
            const where = `${entry.slug} key ${k.key}`;
            const cps = Array.from(k.key);
            if (cps.length !== 1) throw new Error(`${where}: a key is one character`);
            if (!k.sign || !k.sign.glyph) throw new Error(`${where}: the key has no drawn sign, so the writ could not be set in the font`);
            return { key: k.key, cp: k.key.codePointAt(0), ...resolveGlyph(k.sign.glyph, where) };
        });
        if (new Set(glyphs.map((g) => g.cp)).size !== glyphs.length) throw new Error(`${entry.slug}: two keys share a character`);
        const m = modules[entry.slug];
        const a = {
            slug: entry.slug,
            family: spec.family,
            file: spec.file,
            keyedTo: entry.keyedTo,
            direction: entry.direction,
            signScale: entry.signScale ?? 1,
            drawingFollows: String(m.drawing?.follows ?? ''),
            pen: HOUSE_PEN,
            glyphs,
        };
        if (!a.drawingFollows) throw new Error(`${entry.slug}: drawing.follows is the font's description and must be given`);
        alphabets.push({ ...a, dataHash: sha256(canonical(a)) });
    }
    const missing = TRACED_FONTS.filter((f) => !alphabets.some((a) => a.slug === f.slug));
    if (missing.length) throw new Error(`no registry alphabet for ${missing.map((f) => f.slug).join(', ')}`);
    return { alphabets };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.stdout.write(`${JSON.stringify(await dumpTraced(), null, 1)}\n`);
}
