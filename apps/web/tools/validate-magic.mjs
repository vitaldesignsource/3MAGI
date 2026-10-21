#!/usr/bin/env node
// Validates the Magical Scriptorium before it can be built. The wing holds the
// stricter line the halls beside it do not: a drawing says what it was drawn
// from, a quotation names its translation, a claim carries its standing, and
// a letter with no form says why. The glyph kit's rules (glyphkit/check.mjs)
// are applied to every drawn letter. Nothing is skipped silently: a module
// that will not load is an error with its message, not an absence.
//
//   node tools/validate-magic.mjs

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { brotliDecompressSync } from 'node:zlib';
import { GENERATED, MAGIC_DIR, buildCompare, glyphProblems, loadHall, loadModules, loadRegistry, serialiseCompare, urlProblem, web } from './magic-lib.mjs';
import { BAD_GLYPHS, BAD_URLS, GOOD_GLYPHS, GOOD_URLS } from './magic-fixtures.mjs';
import { TRACED_FONTS, dumpTraced } from './fonts/dump-traced.mjs';

const errors = [];
const notes = [];
const fail = (where, m) => errors.push(`${where}: ${m}`);
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
const YEAR = /\b(1\d{3}|20\d{2})\b/;
const LOCATOR = /\b(book|bk\.|ch\.|chapter|cap\.|p\.|pp\.|fol\.|ff?\.|plate|sig\.|MS|[IVX]+\.\d+)/i;
// a glyph's form, for telling whether two glyphs are one: a filled glyph by
// its outline, a centre-line glyph by its strokes, rings and dots
const canon = (g) => (Object.prototype.hasOwnProperty.call(g, 'fill')
    ? JSON.stringify({ fill: String(g.fill).trim().replace(/\s+/g, ' ') })
    : JSON.stringify({ d: String(g.d).trim().replace(/\s+/g, ' '), rings: g.rings ?? [], dots: g.dots ?? [], textRings: g.textRings ?? [] }));
const sameGlyph = (a, b) => canon(a) === canon(b);

// --- facsimile plates --------------------------------------------------------------
// A page may show the printed page its letters are drawn from. Only a copy
// whose repository states no restriction may be shown, and the caption gives
// that repository's own credit line: each entry pairs the credit with the
// words its rights statement must contain. A copy whose digitisation carries
// no rights statement is never shown.
const PLATE_REPOSITORIES = [
    { credit: 'Library of Congress, Rare Book and Special Collections Division', rights: /not aware of any U\.S\. copyright or any other restrictions/ },
    // the Music Division's Books About Music Before 1800 collection
    { credit: 'Library of Congress, Music Division', rights: /in the public domain and are free to use or reuse/ },
    { credit: 'e-rara', rights: /Public Domain Mark/ },
    { credit: 'Wellcome Collection', rights: /Public Domain Mark/ },
];
const PLATE_MAX_BYTES = 300 * 1024;
const PLATE_MAX_WIDTH = 1600;
// The pixel size of a WebP or JPEG, read from its header (null if unreadable).
function imageSize(buf) {
    if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        const kind = buf.toString('ascii', 12, 16);
        if (kind === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
        if (kind === 'VP8L') {
            const b = buf.readUInt32LE(21);
            return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
        }
        if (kind === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
        return null;
    }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
        let i = 2;
        while (i + 9 < buf.length) {
            if (buf[i] !== 0xff) { i += 1; continue; }
            const marker = buf[i + 1];
            const len = buf.readUInt16BE(i + 2);
            if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
                return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
            }
            i += 2 + len;
        }
    }
    return null;
}
// A set of plates from one book may give the bibliographic line they share
// once, under the set (platesSource): each caption then names its own page,
// and the copy, the year and the credit line may stand in the shared line.
function checkPlates(where, plates, shared = null) {
    if (!Array.isArray(plates)) { fail(where, 'plates must be a list'); return; }
    if (shared != null) {
        if (plates.length < 2) fail(`${where}/platesSource`, 'platesSource is the line a set of plates shares: give it only with two plates or more');
        if (words(shared) < 8 || !/\bcopy\b/i.test(shared) || !YEAR.test(shared)) fail(`${where}/platesSource`, 'platesSource names the book with its year and the copy shown');
    }
    plates.forEach((p, i) => {
        const w = `${where}/plate ${i + 1}`;
        if (!/^magic\/[a-z0-9-]+\.(webp|jpe?g)$/.test(p.file || '')) { fail(w, 'file must be magic/<name>.webp or .jpg, under public/media'); return; }
        let buf = null;
        try { buf = readFileSync(path.join(web, 'public/media', p.file)); } catch { fail(w, `public/media/${p.file} does not exist`); }
        if (buf) {
            if (buf.length > PLATE_MAX_BYTES) fail(w, `${p.file} is ${Math.round(buf.length / 1024)} KB: compress it under ${PLATE_MAX_BYTES / 1024} KB`);
            const size = imageSize(buf);
            if (!size) fail(w, `${p.file}: cannot read its size (WebP or JPEG only)`);
            else {
                if (size.width > PLATE_MAX_WIDTH) fail(w, `${p.file} is ${size.width} px wide: at most ${PLATE_MAX_WIDTH}`);
                if (p.width !== size.width || p.height !== size.height) fail(w, `width/height ${p.width}×${p.height} do not match the file’s ${size.width}×${size.height}`);
            }
        }
        if (words(p.alt) < 12) fail(w, 'alt must describe the page in at least 12 words');
        if (words(p.alt) > 80) fail(w, 'alt is over 80 words: describe the page, and leave the rest to the caption');
        const own = String(p.caption || '');
        const cap = shared != null ? `${own} ${shared}` : own;
        if (!/\bcopy\b/i.test(cap)) fail(w, 'caption must name the copy shown');
        if (!YEAR.test(cap) || !LOCATOR.test(own)) fail(w, 'caption must name the edition with its year and where in it the page stands (page, signature)');
        const repo = PLATE_REPOSITORIES.find((r) => cap.includes(r.credit));
        if (!repo) fail(w, `caption must end with the repository’s credit line (${PLATE_REPOSITORIES.map((r) => r.credit).join(' | ')})`);
        if (words(p.rights) < 8) fail(w, 'rights must quote the repository’s rights statement');
        else if (repo && !repo.rights.test(p.rights)) fail(w, `rights must state that ${repo.credit} sets no restriction (expected ${repo.rights})`);
        if (p.url != null) { const up = urlProblem(p.url); if (up) fail(w, up); }
    });
}

// --- the rules themselves --------------------------------------------------------
// Before any module is read, the glyph and URL rules must refuse every bad
// fixture and pass every good one (magic-fixtures.mjs).
for (const [label, g] of BAD_GLYPHS) if (!glyphProblems(g).length) fail('self-test', `the glyph rules let through ${label}`);
for (const [label, g] of GOOD_GLYPHS) for (const p of glyphProblems(g)) fail('self-test', `the glyph rules refuse ${label}: ${p}`);
for (const u of BAD_URLS) if (!urlProblem(u)) fail('self-test', `the URL rule lets through "${u}"`);
for (const u of GOOD_URLS) if (urlProblem(u)) fail('self-test', `the URL rule refuses "${u}"`);

const registry = await loadRegistry();
const { modules, problems } = await loadModules(registry);
for (const p of problems) errors.push(p);

// --- what the wing may point at ----------------------------------------------
const hallSlugs = new Set(readdirSync(path.join(web, 'src/data/education'))
    .filter((f) => f.endsWith('.js') && f !== 'library.js' && !f.endsWith('.generated.js'))
    .map((f) => f.replace(/\.js$/, '')));
const hebrew = await loadHall('hebrew');
const latin = await loadHall('latin');
const HEBREW = new Map();
hebrew.letters.forEach((l) => { HEBREW.set(l.glyph, l.value); if (l.final) HEBREW.set(l.final, l.value); });
const LATIN = new Set(latin.letters.map((l) => l.glyph.split(/\s+/)[0].toUpperCase()));

// The vendored faces, read from their @font-face unicode-range in index.css, so
// a sign outside a face's range fails here rather than falling back in a browser.
const css = readFileSync(path.join(web, 'src/index.css'), 'utf8');
const FACES = {};
for (const m of css.matchAll(/@font-face\s*{[^}]*font-family:\s*"(TL (?:Runic|Ogham|Signs))"[^}]*unicode-range:\s*([^;]+);/g)) {
    FACES[m[1]] = m[2].split(',').map((r) => {
        const [a, b] = r.trim().replace(/^U\+/i, '').split('-');
        return [parseInt(a, 16), parseInt(b || a, 16)];
    });
}
const faceFor = (cp) => Object.keys(FACES).find((f) => FACES[f].some(([a, b]) => cp >= a && cp <= b));

// --- the registry --------------------------------------------------------------
const KEYED = ['hebrew', 'latin', 'none'];
const DIRS = ['ltr', 'rtl'];
const STATUS = ['ready', 'forms-pending'];
const reserved = new Set(registry.reserved);
for (const r of ['compare', 'transliterate', 'course', 'books']) {
    if (!reserved.has(r)) fail('registry', `"${r}" must be reserved: the wing's own routes use it`);
}
const groupKeys = new Set(registry.groups.map((g) => g.key));
if (groupKeys.size !== registry.groups.length) fail('registry', 'duplicate group key');
const seen = new Set();
const all = [...registry.alphabets, ...registry.pages];
for (const e of all) {
    const where = `registry/${e.slug}`;
    if (!/^[a-z][a-z-]*$/.test(e.slug || '')) fail(where, 'slug must match ^[a-z][a-z-]*$');
    if (seen.has(e.slug)) fail(where, 'duplicate slug');
    seen.add(e.slug);
    if (reserved.has(e.slug)) fail(where, `slug "${e.slug}" is reserved for the wing's own routes`);
    if (!e.title || !e.short) fail(where, 'title and short are required');
    if (!STATUS.includes(e.status)) fail(where, `status must be one of ${STATUS.join(' | ')}`);
    if (words(e.blurb) < 8) fail(where, 'blurb must be at least 8 words');
}
for (const a of registry.alphabets) {
    const where = `registry/${a.slug}`;
    if (!groupKeys.has(a.group)) fail(where, `unknown group "${a.group}"`);
    if (!KEYED.includes(a.keyedTo)) fail(where, `keyedTo must be one of ${KEYED.join(' | ')}`);
    if (!DIRS.includes(a.direction)) fail(where, 'direction must be ltr or rtl');
    // one factor for all of an alphabet's drawn signs, so the drawings and
    // their sizes relative to one another stay as traced
    if (a.signScale != null && !(typeof a.signScale === 'number' && a.signScale >= 1 && a.signScale <= 2)) fail(where, 'signScale, if given, is a number from 1 to 2');
    if (a.signScale != null && a.status !== 'ready') fail(where, 'a forms-pending alphabet has no signs to scale');
    if (a.door) {
        if (a.status !== 'ready') fail(where, 'a forms-pending alphabet has no door sign: no form may be shown before it is traced');
        if (a.door.char) {
            const cp = a.door.char.codePointAt(0);
            if ([...a.door.char].length !== 1 || !faceFor(cp)) fail(where, `door "${a.door.char}" is not one character of a vendored face`);
        } else if (a.door.glyph) {
            for (const p of glyphProblems(a.door.glyph)) fail(`${where} door`, p);
            // a drawn door is one of the alphabet's own drawn letters, copied
            // exactly: the portal must not show a sign the page does not
            const own = (modules[a.slug]?.letters || []).some((l) => l.glyph && sameGlyph(l.glyph, a.door.glyph));
            if (modules[a.slug] && !own) fail(where, 'door glyph is not one of the module’s drawn letters (copy a letter’s glyph exactly)');
        } else fail(where, 'door must be null, { char } or { glyph }');
    }
}
// 'ready' means the signs can be shown. A keyed alphabet marked ready with no
// sign to show would stand in the comparison band that says its forms are
// being traced, which would not be true.
for (const a of registry.alphabets) {
    const m = modules[a.slug];
    if (a.status === 'ready' && a.keyedTo !== 'none' && m && !(m.letters || []).some((l) => l.glyph || l.char)) {
        fail(`registry/${a.slug}`, 'a ready alphabet keyed to a hall shows its signs; mark it forms-pending until it does');
    }
}
for (const p of registry.pages) {
    if (!['author', 'lineage'].includes(p.kind)) fail(`registry/${p.slug}`, 'a page’s kind must be author or lineage');
}

// --- each module -----------------------------------------------------------------
const TIMELINE_KINDS = ['text', 'person', 'event', 'practice', 'manuscript', 'discovery'];
const STANDINGS = ['documented', 'attributed', 'disputed', 'legend'];
let letterCount = 0, drawnCount = 0, setCount = 0, gapCount = 0;

function checkTimeline(where, events) {
    let prev = -Infinity;
    const slugs = new Set();
    for (const e of events) {
        const w = `${where}/${e.slug}`;
        if (!e.slug || slugs.has(e.slug)) fail(w, 'missing or duplicate slug');
        slugs.add(e.slug);
        if (!Number.isInteger(e.year)) fail(w, 'year must be an integer');
        if (e.end != null && !(Number.isInteger(e.end) && e.end >= e.year)) fail(w, 'end must be an integer no earlier than year');
        if (e.year < prev) fail(w, 'out of order: transmission runs in ascending years');
        prev = e.year;
        if (!TIMELINE_KINDS.includes(e.kind)) fail(w, `kind must be one of ${TIMELINE_KINDS.join(' | ')}`);
        if (words(e.description) < 8) fail(w, 'description must be at least 8 words');
        if (e.when != null && typeof e.when !== 'string') fail(w, 'when, if given, is the date as the sources state it');
    }
}

function checkQuotations(where, quotations) {
    quotations.forEach((q, i) => {
        const w = `${where}/quotation ${i + 1}`;
        if (!q.text) fail(w, 'no text');
        if (!q.source || words(q.source) < 3) fail(w, 'no source: name the author, work and locator');
        const t = (q.translation || '').trim();
        if (!t) { fail(w, 'no translation: name the translator and edition, or give the original with a labelled paraphrase'); return; }
        if (/^paraphrase$/i.test(t)) {
            if (words(q.paraphrase) < 6) fail(w, 'translation is "paraphrase" but no paraphrase is given');
            if (!q.language || /^english$/i.test(q.language)) fail(w, 'a paraphrase stands beside an original: give the original’s language');
        } else if (/^english original$/i.test(t)) {
            if (!/^english$/i.test(q.language || '')) fail(w, '"English original" is only for a passage written in English');
        } else if (!YEAR.test(t) || words(t) < 3) {
            fail(w, `translation "${t}" must name the translator and the edition with its year`);
        }
    });
}

for (const entry of all) {
    const m = modules[entry.slug];
    if (!m) continue;
    const where = entry.slug;
    const reg = registry.alphabets.find((a) => a.slug === entry.slug);
    if (m.slug !== entry.slug) fail(where, `module slug "${m.slug}" does not match the registry`);
    if (!m.title) fail(where, 'title is required');
    if (m.status !== entry.status) fail(where, `status "${m.status}" does not match the registry’s "${entry.status}"`);
    if (reg && m.keyedTo != null && m.keyedTo !== reg.keyedTo) fail(where, 'keyedTo does not match the registry');
    if (reg && m.direction != null && m.direction !== reg.direction) fail(where, 'direction does not match the registry');
    if (words(m.summary) < 20) fail(where, 'summary must be at least 20 words');
    if (!Array.isArray(m.sources) || m.sources.length === 0) fail(where, 'sources must not be empty');
    for (const [i, s] of (m.sources || []).entries()) {
        if (words(s.citation) < 3) fail(`${where}/source ${i + 1}`, 'citation too short: name the work and where it is');
        if (s.url != null) { const p = urlProblem(s.url); if (p) fail(`${where}/source ${i + 1}`, p); }
    }
    if (m.stub) {
        const allowed = new Set(['slug', 'title', 'stub', 'status', 'summary', 'sources']);
        for (const k of Object.keys(m)) if (!allowed.has(k)) fail(where, `a stub carries title, summary, status and sources only — remove "${k}" or drop stub: true`);
        continue;
    }

    // a full module
    if (!Array.isArray(m.intro) || m.intro.length === 0) fail(where, 'intro must be a non-empty array of paragraphs');
    const fa = m.firstAttestation;
    if (!fa || !fa.work || !fa.date || !Number.isInteger(fa.year)) fail(where, 'firstAttestation needs work, date and an integer year');
    checkTimeline(`${where}/transmission`, m.transmission || []);
    if (!(m.transmission || []).length) fail(where, 'transmission must not be empty');
    for (const [i, c] of (m.claims || []).entries()) {
        const w = `${where}/claim ${i + 1}`;
        if (!STANDINGS.includes(c.standing)) fail(w, `standing must be one of ${STANDINGS.join(' | ')}`);
        if (words(c.evidence) < 8) fail(w, 'evidence must be at least 8 words');
        if (!Array.isArray(c.sources) || !c.sources.length) fail(w, 'a claim names its sources');
    }
    checkQuotations(where, m.quotations || []);
    for (const l of m.links || []) {
        if (!hallSlugs.has(l.to) && !seen.has(l.to)) fail(`${where}/links`, `"${l.to}" is neither a hall nor an entry of the wing`);
    }

    // letters
    const letters = m.letters || [];
    if (reg && letters.length === 0) fail(where, 'a full alphabet module lists its letters');
    const groups = new Set((m.groups || []).map((g) => g.key));
    const names = new Set();
    const values = new Map();
    let anyGlyph = false, anyChar = false;
    // A group that is a printed table (the Shawq's) gives its heading as
    // printed, in its language, with the facts beside it (the translator's
    // English, the book's claim, the page), and a short name (`short`) that
    // the drill, the search and the live region add to a letter's name where
    // the same name stands in several groups.
    for (const g of m.groups || []) {
        const gw = `${where}/group ${g.key}`;
        if (!g.key || !g.label) fail(gw, 'a group has a key and a label');
        if (g.heading != null) {
            if (!/^[a-z]{2,3}$/.test(g.headingLang || '')) fail(gw, 'a heading as printed names its language (headingLang, e.g. "ar")');
            if (!g.short || words(g.short) > 6) fail(gw, 'a table group has a short name of a few words (short)');
            for (const f of g.facts || []) if (!f.label || words(f.text) < 3) fail(gw, 'each fact has a label and a text');
        }
    }
    if (m.valueLang != null && !/^[a-z]{2,3}$/.test(m.valueLang)) fail(`${where}/valueLang`, 'valueLang is the language code of the values’ script, e.g. "ar"');
    letters.forEach((l, i) => {
        const w = `${where} #${l.order ?? i + 1} ${l.name ?? ''}`.trim();
        letterCount++;
        if (l.order !== i + 1) fail(w, `order must run 1..n (expected ${i + 1})`);
        if (!l.name) fail(w, 'missing name');
        // a name is unique in its alphabet — or, where the module's groups are
        // tables that each carry the whole alphabet, in its group, and the
        // group then has a short name to tell the two apart
        const nameKey = m.groups && (m.groups.find((g) => g.key === l.group)?.short) ? `${l.group}|${l.name}` : l.name;
        if (names.has(nameKey)) fail(w, 'duplicate name');
        names.add(nameKey);
        if (!['high', 'medium', 'low'].includes(l.formConfidence)) fail(w, 'formConfidence must be high | medium | low');
        // a reason given in place of the generic confidence word says what is
        // uncertain, briefly, and only where something is
        if (l.formReason != null) {
            if (typeof l.formReason !== 'string' || words(l.formReason) < 3 || words(l.formReason) > 16) fail(w, 'formReason is a short phrase of 3–16 words');
            if (l.formConfidence === 'high') fail(w, 'a secure form needs no formReason');
        }
        if (m.groups && !groups.has(l.group)) fail(w, `group "${l.group}" is not one of the module’s groups`);
        const hasGlyphKey = Object.prototype.hasOwnProperty.call(l, 'glyph');
        if (l.char && l.glyph) fail(w, 'a letter is either drawn (glyph) or set (char), not both');
        if (!l.char && !hasGlyphKey) fail(w, 'say how the letter is shown: glyph (drawn), char (set in a face) or glyph: null (a gap)');
        if (l.glyph) {
            anyGlyph = true; drawnCount++;
            if (words(l.strokes) < 4) fail(w, 'strokes description missing or too short');
            for (const p of glyphProblems(l.glyph)) fail(w, p);
        } else if (l.char) {
            anyChar = true; setCount++;
            const cp = l.char.codePointAt(0);
            if ([...l.char].length !== 1) fail(w, 'char must be one character');
            if (l.codepoint !== `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`) fail(w, `codepoint ${l.codepoint} does not match ${l.char}`);
            if (!l.unicodeName) fail(w, 'a set character names its Unicode name');
            if (!faceFor(cp)) fail(w, `U+${cp.toString(16).toUpperCase()} is outside every vendored face (TL Runic, TL Ogham, TL Signs)`);
        } else {
            gapCount++;
            if (words(l.note) < 8) fail(w, 'a null glyph needs a note of at least 8 words saying why it is a gap');
        }
        // a table of numbers (the planets' squares; a geomantic figure's rows
        // are a flat list of point counts): a square of its side, every cell a
        // number from 1 to side² or left open where the module gives both
        // readings, the restored cells inside it, and nothing drawn
        if (Array.isArray(l.rows) && Array.isArray(l.rows[0])) {
            const n = Array.isArray(l.rows) ? l.rows.length : 0;
            if (!n || !l.rows.every((row) => Array.isArray(row) && row.length === n)) fail(w, 'rows must be a square: as many cells in each row as there are rows');
            else {
                if (l.side != null && l.side !== n) fail(w, `side ${l.side} does not match the ${n} rows`);
                const cells = l.rows.flat();
                if (cells.some((v) => v != null && !(Number.isInteger(v) && v >= 1 && v <= n * n))) fail(w, `every cell is a number from 1 to ${n * n}, or null`);
                if (cells.some((v) => v == null) && !l.doubtfulRows) fail(w, 'a cell left open needs doubtfulRows, giving the readings');
                for (const rc of l.restoredCells || []) {
                    if (!Array.isArray(rc) || rc.length !== 2 || !rc.every((k) => Number.isInteger(k) && k >= 1 && k <= n)) fail(w, `restoredCells: ${JSON.stringify(rc)} is not a [row, column] of the table`);
                }
            }
            if (l.glyph) fail(w, 'a table is given as numbers, not drawn');
        }
        for (const [k, v] of (l.variants || []).entries()) {
            if (!v.source) fail(`${w} variant ${k + 1}`, 'a variant names the edition it is drawn from');
            if (v.glyph) for (const p of glyphProblems(v.glyph)) fail(`${w} variant ${k + 1}`, p);
        }
        // values
        if (reg && reg.keyedTo !== 'none') {
            if (l.value == null) {
                if (words(l.valueNote) < 4) fail(w, 'a letter with no value says why (valueNote)');
            } else if (reg.keyedTo === 'hebrew' && !HEBREW.has(l.value)) {
                fail(w, `value "${l.value}" is not a letter or final of the Hebrew hall`);
            } else if (reg.keyedTo === 'latin' && !LATIN.has(String(l.value).toUpperCase())) {
                fail(w, `value "${l.value}" is not a letter of the Latin hall`);
            }
            if (l.value != null) {
                if (values.has(l.value) && !l.variantOf) fail(w, `value "${l.value}" duplicates #${values.get(l.value)}; mark it variantOf`);
                values.set(l.value, l.order);
            }
            if (reg.keyedTo === 'hebrew' && l.numeric != null && l.numeric !== HEBREW.get(l.value)) {
                fail(w, `numeric ${l.numeric} disagrees with the Hebrew hall (${HEBREW.get(l.value)})`);
            }
        }
    });
    for (const g of m.groups || []) if (!letters.some((l) => l.group === g.key)) fail(`${where}/groups`, `group "${g.key}" holds no letters`);
    for (const o of m.sample?.orders || []) if (!letters[o - 1] || !(letters[o - 1].char || letters[o - 1].glyph)) fail(`${where}/sample`, `sample #${o} is not a shown letter`);
    if (reg && reg.keyedTo === 'hebrew' && letters.length) {
        const covered = new Set(letters.map((l) => l.value));
        const missing = hebrew.letters.filter((h) => !covered.has(h.glyph)).map((h) => h.name);
        const declared = new Set(m.gaps || []);
        const undeclared = missing.filter((n) => !declared.has(n));
        if (undeclared.length) fail(where, `a Hebrew-keyed alphabet covers all 22 letters or declares its gaps: ${undeclared.join(', ')}`);
    }

    // drawing
    const d = m.drawing || {};
    if (anyGlyph) {
        if (!YEAR.test(d.follows || '') || !LOCATOR.test(d.follows || '')) fail(`${where}/drawing`, 'follows must name the edition with its year and a locator (book and chapter, page, folio or plate)');
        if (words(d.drawn) < 15) fail(`${where}/drawing`, 'drawn must say in at least 15 words what the drawing keeps, what is conventional and what is the site’s own');
    }
    if (anyChar) {
        if (!/open font licen[cs]e|\bOFL\b/i.test(d.face || '')) fail(`${where}/drawing`, 'face must name the font and its licence');
        if (words(d.set) < 15) fail(`${where}/drawing`, 'set must say in at least 15 words what the font shows and what it does not');
    }
    if (entry.status === 'forms-pending') {
        if (words(d.pending) < 15 || !YEAR.test(d.pending || '')) fail(`${where}/drawing`, 'a forms-pending alphabet says, in at least 15 words, which dated edition its forms are being traced from (pending)');
    } else if (d.pending) {
        fail(`${where}/drawing`, 'a ready alphabet has no pending notice: remove drawing.pending');
    }
    if (m.plates != null) checkPlates(where, m.plates, m.platesSource ?? null);
    else if (m.platesSource != null) fail(`${where}/platesSource`, 'platesSource is given only with plates');
    // tables shown as printed, not drawn: the same rules as any plate, the
    // set's source line shared, and the values printed with the signs given
    // as text, row by row
    if (m.facsimiles != null) {
        const f = m.facsimiles;
        const fw = `${where}/facsimiles`;
        if (!f.title || words(f.note) < 15) fail(fw, 'facsimiles have a title and a note of at least 15 words saying why they are shown, not drawn');
        if (!Array.isArray(f.tables) || !f.tables.length) fail(fw, 'facsimiles list their tables');
        const all = (f.tables || []).flatMap((t) => t.plates || []);
        for (const t of f.tables || []) {
            if (!t.key || !t.label || !(t.plates || []).length) fail(`${fw}/${t.key}`, 'a facsimile table has a key, a label and its plates');
        }
        checkPlates(fw, all, f.source ?? null);
        all.forEach((p, i) => {
            for (const v of p.values || []) {
                if (!v.label || (!(Array.isArray(v.items) && v.items.length) && words(v.text) < 3)) fail(`${fw}/plate ${i + 1}`, 'each row of values has a label and its items (or a text)');
                if (v.items && v.lang != null && !/^[a-z]{2,3}$/.test(v.lang)) fail(`${fw}/plate ${i + 1}`, 'a row’s lang is a language code');
            }
        });
    }
    // what the page calls its units, where they are not letters (the drill,
    // the drawing's heading and the grid's name use it)
    if (m.unitNoun != null && !(m.unitNoun && /^[a-z]+$/.test(m.unitNoun.one || '') && /^[a-z]+$/.test(m.unitNoun.many || ''))) {
        fail(`${where}/unitNoun`, 'unitNoun is { one, many }: the page’s unit in lower case, singular and plural');
    }
    if (m.platesNote != null && (!m.plates?.length || words(m.platesNote) < 8)) fail(`${where}/platesNote`, 'platesNote introduces the plates in at least 8 words, and only where there are plates');

    // transliteration
    const t = m.transliteration;
    if (t) {
        if (!['latin', 'hebrew'].includes(t.from)) fail(`${where}/transliteration`, 'from must be latin or hebrew');
        if (words(t.convention) < 15) fail(`${where}/transliteration`, 'convention must say in at least 15 words what the tool does and whose convention it is');
        const keys = new Set(letters.map((l) => (t.from === 'hebrew' ? l.value : l.translit && l.translit.toLowerCase())).filter(Boolean));
        for (const f of t.folds || []) {
            if (!f.from || !f.to || !f.note) fail(`${where}/transliteration`, 'each fold has from, to and a note');
            else if (![...f.to].every((k) => keys.has(k))) fail(`${where}/transliteration`, `fold ${f.from} → ${f.to} writes a letter the alphabet does not have`);
        }
    } else if (reg && reg.keyedTo !== 'none' && letters.length) {
        notes.push(`${where}: keyed to ${reg.keyedTo} but declares no transliteration`);
    }
}

// the hero's signs must be shown signs of a ready alphabet
const readySigns = new Set();
for (const a of registry.alphabets) {
    if (a.status !== 'ready' || !modules[a.slug]) continue;
    for (const l of modules[a.slug].letters || []) if (l.char) readySigns.add(l.char);
}
for (const s of registry.wing.heroSigns || []) {
    if (!readySigns.has(s)) fail('registry/wing', `hero sign "${s}" is not a set sign of a ready alphabet`);
}

// the comparison data must be current
if (!problems.length) {
    const fresh = serialiseCompare(await buildCompare(registry, modules));
    let committed = '';
    try { committed = readFileSync(GENERATED, 'utf8'); } catch { /* reported below */ }
    if (committed !== fresh) fail('compare.generated.js', 'stale — run node tools/build-magic.mjs');
}

// --- the traced cipher fonts (tools/fonts) ---------------------------------------
// The transliterator's writ is set in fonts generated from the traced data
// (tools/fonts/build-traced-fonts.py, which reads tools/fonts/dump-traced.mjs).
// The dump is run again here: a font whose data, file or key set no longer
// match is stale, and the build stops until the fonts are rebuilt. The faces
// are the writ's alone: no stack names them but .mg-writ.is-text's.
const STALE = 'stale — run python -I tools/fonts/build-traced-fonts.py';
const TRACED_DIR = path.join(web, 'src/assets/fonts/traced');
const TRACED_CSS = path.join(web, 'src/styles/magic-traced-fonts.generated.css');
const FONTS_JS = path.join(MAGIC_DIR, 'fonts.generated.js');
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// The code points a WOFF2 font maps, read from its cmap (format 4 or 12).
const WOFF2_TAGS = ['cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep'];
function woff2Cmap(buf) {
    if (buf.toString('latin1', 0, 4) !== 'wOF2') throw new Error('not a WOFF2 file');
    const numTables = buf.readUInt16BE(12);
    const compressed = buf.readUInt32BE(20);
    let o = 48;
    const base128 = () => { let v = 0; for (let i = 0; i < 5; i++) { const b = buf[o++]; v = v * 128 + (b & 0x7f); if (!(b & 0x80)) return v; } throw new Error('bad UIntBase128'); };
    const tables = [];
    for (let i = 0; i < numTables; i++) {
        const flags = buf[o++];
        const idx = flags & 0x3f;
        let tag = WOFF2_TAGS[idx] ?? `#${idx}`;
        if (idx === 63) { tag = buf.toString('latin1', o, o + 4); o += 4; }
        const version = flags >> 6;
        const orig = base128();
        const transformed = tag === 'glyf' || tag === 'loca' ? version === 0 : version !== 0;
        tables.push({ tag, length: transformed ? base128() : orig });
    }
    const data = brotliDecompressSync(buf.subarray(o, o + compressed));
    let at = 0;
    for (const t of tables) { t.at = at; at += t.length; }
    const cm = tables.find((t) => t.tag === 'cmap');
    if (!cm) throw new Error('no cmap');
    const c = data.subarray(cm.at, cm.at + cm.length);
    const cps = new Set();
    for (let i = 0; i < c.readUInt16BE(2); i++) {
        const plat = c.readUInt16BE(4 + 8 * i), enc = c.readUInt16BE(6 + 8 * i), off = c.readUInt32BE(8 + 8 * i);
        if (!(plat === 3 && (enc === 1 || enc === 10)) && plat !== 0) continue;
        const format = c.readUInt16BE(off);
        if (format === 4) {
            const seg = c.readUInt16BE(off + 6) / 2;
            const ends = off + 14, starts = ends + 2 * seg + 2, deltas = starts + 2 * seg, ranges = deltas + 2 * seg;
            for (let k = 0; k < seg; k++) {
                const end = c.readUInt16BE(ends + 2 * k), start = c.readUInt16BE(starts + 2 * k);
                const delta = c.readInt16BE(deltas + 2 * k), range = c.readUInt16BE(ranges + 2 * k);
                for (let cp = start; cp <= end && cp !== 0xffff; cp++) {
                    let gid;
                    if (range === 0) gid = (cp + delta) & 0xffff;
                    else {
                        const g = c.readUInt16BE(ranges + 2 * k + range + 2 * (cp - start));
                        gid = g === 0 ? 0 : (g + delta) & 0xffff;
                    }
                    if (gid !== 0) cps.add(cp);
                }
            }
        } else if (format === 12) {
            for (let k = 0; k < c.readUInt32BE(off + 12); k++) {
                const r = off + 16 + 12 * k;
                const start = c.readUInt32BE(r), end = c.readUInt32BE(r + 4), gid = c.readUInt32BE(r + 8);
                for (let cp = start; cp <= end; cp++) if (gid + (cp - start) !== 0) cps.add(cp);
            }
        }
    }
    return cps;
}

if (!problems.length) {
    let traced = null;
    try { traced = (await dumpTraced()).alphabets; } catch (e) { fail('tools/fonts/dump-traced.mjs', e.message); }
    let FONTS = null;
    if (!existsSync(FONTS_JS)) fail('fonts.generated.js', `missing — ${STALE}`);
    else FONTS = (await import(pathToFileURL(FONTS_JS).href)).default;
    if (traced && FONTS) {
        for (const a of traced) {
            const w = `traced font ${a.family}`;
            const rec = FONTS[a.slug];
            if (!rec) { fail(w, `not in fonts.generated.js — ${STALE}`); continue; }
            if (rec.family !== a.family) fail(w, `fonts.generated.js names it "${rec.family}" — ${STALE}`);
            if (rec.dataHash !== a.dataHash) fail(w, `built from other data than ${a.slug}'s traced glyphs, keys, signScale and pen now give — ${STALE}`);
            const file = path.join(TRACED_DIR, a.file);
            if (!existsSync(file)) { fail(w, `src/assets/fonts/traced/${a.file} is missing — ${STALE}`); continue; }
            const buf = readFileSync(file);
            if (sha256(buf) !== rec.woff2Sha256) fail(w, `src/assets/fonts/traced/${a.file} is not the file the build wrote — ${STALE}`);
            // the font maps exactly the scheme's keys, the space and the no-break space
            let cps = null;
            try { cps = woff2Cmap(buf); } catch (e) { fail(w, `${a.file}: ${e.message}`); }
            if (cps) {
                const want = new Set([...a.glyphs.map((g) => g.cp), 0x20, 0xa0]);
                const hex = (cp) => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;
                const extra = [...cps].filter((cp) => !want.has(cp)).map(hex);
                const missing = [...want].filter((cp) => !cps.has(cp)).map(hex);
                if (extra.length || missing.length) fail(w, `its cmap is not ${a.slug}'s keys (extra ${extra.join(' ') || 'none'}; missing ${missing.join(' ') || 'none'}) — ${STALE}`);
            }
        }
        for (const slug of Object.keys(FONTS)) if (!traced.some((a) => a.slug === slug)) fail('fonts.generated.js', `${slug} has no traced font any more — ${STALE}`);
        for (const f of existsSync(TRACED_DIR) ? readdirSync(TRACED_DIR) : []) {
            if (!traced.some((a) => a.file === f)) fail('src/assets/fonts/traced', `${f} is no font of the build's — ${STALE}`);
        }
    }
    // the generated sheet declares exactly these faces, and the wing's sheet imports it
    const sheet = existsSync(TRACED_CSS) ? readFileSync(TRACED_CSS, 'utf8') : '';
    if (!sheet) fail('magic-traced-fonts.generated.css', `missing — ${STALE}`);
    const declared = [...sheet.matchAll(/@font-face\s*{[^}]*font-family:\s*"([^"]+)"[^}]*url\("\.\.\/assets\/fonts\/traced\/([^"?]+)/g)].map((m) => `${m[1]}|${m[2]}`);
    const expected = (traced || TRACED_FONTS).map((a) => `${a.family}|${a.file}`);
    if (sheet && declared.sort().join() !== [...expected].sort().join()) fail('magic-traced-fonts.generated.css', `does not declare exactly the traced faces — ${STALE}`);
    if (!/@import\s+"\.\/magic-traced-fonts\.generated\.css"/.test(readFileSync(path.join(web, 'src/styles/magic-fonts.css'), 'utf8'))) {
        fail('src/styles/magic-fonts.css', 'must @import "./magic-traced-fonts.generated.css"');
    }
    // No stack names a cipher face — not --edu-script-faces, not --edu-glyph-faces,
    // nothing but the writ's own rule: a cipher face maps Latin and Hebrew
    // letters to signs, so a stack that named it would write signs for prose.
    const families = TRACED_FONTS.map((f) => f.family);
    const named = (text) => families.filter((f) => new RegExp(`["']${f}["']|\\b${f}\\b`).test(text));
    const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
    for (const file of walk(path.join(web, 'src'))) {
        const rel = path.relative(web, file);
        if (/\.css$/.test(file)) {
            const text = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
            for (const m of text.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
                const selector = m[1].trim();
                if (/^@font-face$/.test(selector) && file === TRACED_CSS) continue;
                const hit = named(m[2]);
                if (hit.length && !/\.mg-writ\.is-text\b/.test(selector)) fail(rel, `${selector || '(rule)'} names ${hit.join(', ')}: only the writ (.mg-writ.is-text) is set in a traced cipher face`);
            }
        } else if (/\.(jsx?|mjs)$/.test(file) && file !== FONTS_JS) {
            const hit = named(readFileSync(file, 'utf8'));
            if (hit.length) fail(rel, `names ${hit.join(', ')}: the writ reads a cipher face's family from fonts.generated.js`);
        }
    }
}

// --- report ----------------------------------------------------------------------
if (errors.length) {
    console.error(`\nmagic: ${errors.length} error(s) — build stopped\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
const full = all.filter((e) => modules[e.slug] && !modules[e.slug].stub).length;
for (const n of notes.slice(0, 10)) console.log(`  · ${n}`);
console.log(`magic: ${all.length} entries (${full} full, ${all.length - full} stubs) · ${letterCount} letters — ${setCount} set, ${drawnCount} drawn, ${gapCount} not shown (forms pending, gaps and tables) — validated`);
