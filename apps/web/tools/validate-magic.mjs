#!/usr/bin/env node
// Validates the Magical Scriptorium before it can be built. The wing holds the
// stricter line the halls beside it do not: a drawing says what it was drawn
// from, a quotation names its translation, a claim carries its standing, and
// a letter with no form says why. The glyph kit's rules (glyphkit/check.mjs)
// are applied to every drawn letter. Nothing is skipped silently: a module
// that will not load is an error with its message, not an absence.
//
//   node tools/validate-magic.mjs

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { GENERATED, buildCompare, glyphProblems, loadHall, loadModules, loadRegistry, serialiseCompare, urlProblem, web } from './magic-lib.mjs';
import { BAD_GLYPHS, BAD_URLS, GOOD_GLYPHS, GOOD_URLS } from './magic-fixtures.mjs';

const errors = [];
const notes = [];
const fail = (where, m) => errors.push(`${where}: ${m}`);
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
const YEAR = /\b(1\d{3}|20\d{2})\b/;
const LOCATOR = /\b(book|bk\.|ch\.|chapter|cap\.|p\.|pp\.|fol\.|ff?\.|plate|sig\.|MS|[IVX]+\.\d+)/i;
const canon = (g) => JSON.stringify({ d: String(g.d).trim().replace(/\s+/g, ' '), rings: g.rings ?? [], dots: g.dots ?? [] });
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
function checkPlates(where, plates) {
    if (!Array.isArray(plates)) { fail(where, 'plates must be a list'); return; }
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
        const cap = String(p.caption || '');
        if (!/\bcopy\b/i.test(cap)) fail(w, 'caption must name the copy shown');
        if (!YEAR.test(cap) || !LOCATOR.test(cap)) fail(w, 'caption must name the edition with its year and where in it the page stands (page, signature)');
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
    letters.forEach((l, i) => {
        const w = `${where} #${l.order ?? i + 1} ${l.name ?? ''}`.trim();
        letterCount++;
        if (l.order !== i + 1) fail(w, `order must run 1..n (expected ${i + 1})`);
        if (!l.name) fail(w, 'missing name');
        if (names.has(l.name)) fail(w, 'duplicate name');
        names.add(l.name);
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
    if (m.plates != null) checkPlates(where, m.plates);

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

// --- report ----------------------------------------------------------------------
if (errors.length) {
    console.error(`\nmagic: ${errors.length} error(s) — build stopped\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
const full = all.filter((e) => modules[e.slug] && !modules[e.slug].stub).length;
for (const n of notes.slice(0, 10)) console.log(`  · ${n}`);
console.log(`magic: ${all.length} entries (${full} full, ${all.length - full} stubs) · ${letterCount} letters — ${setCount} set, ${drawnCount} drawn, ${gapCount} forms pending — validated`);
