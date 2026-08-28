#!/usr/bin/env node
// Validates the Scriptorium's data before it can be built.
//
// The portal now carries fourteen halls of hand-checked scholarship in ten
// scripts, and the failure modes are quiet ones: a Cyrillic о standing in for
// a Latin one, a letter value that disagrees with the sum printed beside it, a
// timeline whose span ends before it begins, an edition link that is not a
// link. None of those break a build on their own; all of them are wrong on a
// published page. This runs as the first step of `npm run build` and fails it.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const src = (p) => path.join(web, 'src/data/education', p);

const HALLS = [
    'latin', 'greek', 'hebrew', 'egyptian', 'cuneiform', 'sanskrit', 'arabic',
    'tibetan', 'syriac', 'coptic', 'aramaic', 'persian', 'armenian', 'geez', 'chinese', 'slavonic',
];

// Unicode ranges each hall's native strings are allowed to draw on. Latin,
// spaces, punctuation and combining marks are permitted everywhere, since a
// gloss may carry transliteration and several halls deliberately put a
// transliteration in a native field rather than guess at a spelling.
const BLOCKS = {
    greek: [[0x0370, 0x03ff], [0x1f00, 0x1fff]],
    hebrew: [[0x0590, 0x05f4]],
    aramaic: [[0x0590, 0x05f4], [0x0840, 0x085f]],
    egyptian: [[0x13000, 0x1342f]],
    cuneiform: [[0x12000, 0x123ff], [0x12400, 0x1247f]],
    sanskrit: [[0x0900, 0x097f], [0xa8e0, 0xa8ff]],
    arabic: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
    persian: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
    tibetan: [[0x0f00, 0x0fff]],
    syriac: [[0x0700, 0x074f], [0x0860, 0x086f]],
    coptic: [[0x2c80, 0x2cff], [0x03e2, 0x03ef]],
    armenian: [[0x0530, 0x058f], [0xfb13, 0xfb17]],
    geez: [[0x1200, 0x139f], [0x2d80, 0x2ddf]],
    // Han ideographs, the Kangxi radicals, CJK punctuation, and the two
    // Yijing symbol blocks: the eight trigrams (U+2630) and the sixty-four
    // hexagrams (U+4DC0), which are characters in their own right.
    // Old Church Slavonic was written in Glagolitic first and Cyrillic
    // after, so the hall legitimately carries both, plus the Cyrillic
    // extensions that hold the yuses and the combining titlo.
    slavonic: [[0x0400, 0x052f], [0x2c00, 0x2c5f], [0x2de0, 0x2dff], [0xa640, 0xa69f]],
    chinese: [[0x4e00, 0x9fff], [0x3400, 0x4dbf], [0x4dc0, 0x4dff],
              [0x2f00, 0x2fdf], [0x3000, 0x303f], [0x2600, 0x26ff], [0xf900, 0xfaff]],
};

// Halls whose subject genuinely includes another script. The Egyptian currents
// on the late papyri and on the word made effective quote Coptic ϩⲓⲕ — the
// direct descendant of ḥkꜣ — and the Greek μαγεία the Hellenistic world
// applied to it; refusing those would be refusing the argument.
const ALSO_ALLOWED = {
    egyptian: [[0x2c80, 0x2cff], [0x0370, 0x03ff]],
    coptic: [[0x13000, 0x1342f]],
    aramaic: [[0x0700, 0x074f]],
    sanskrit: [[0x0f00, 0x0fff]],
};

// Always allowed. Several halls deliberately put a transliteration in a native
// field rather than guess at a spelling they cannot verify, so the academic
// transliteration alphabets belong here: Egyptological ꜣ ꜥ ḥ ḫ ẖ ṯ ḏ,
// Assyriological ṣ ṭ š with its subscript sign-indices (gu₄, e₂), IAST, and
// the Semitic emphatics shared across several of these fields.
const alwaysOk = (cp) =>
    cp < 0x0250 ||                       // Latin + supplements
    (cp >= 0x0250 && cp <= 0x02ff) ||    // IPA and modifier letters
    (cp >= 0x0300 && cp <= 0x036f) ||    // combining diacritics
    (cp >= 0x1e00 && cp <= 0x1eff) ||    // Latin extended additional (ḥ ḫ ṣ ṭ ṯ ḏ ẖ)
    (cp >= 0x2000 && cp <= 0x206f) ||    // general punctuation
    (cp >= 0x2070 && cp <= 0x209f) ||    // super/subscripts (sign indices)
    (cp >= 0xa720 && cp <= 0xa7ff) ||    // Latin extended-D (ꜣ, ꜥ)
    cp === 0xfeff;

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const load = async (p) => {
    try { return (await import(src(p))).default; } catch { return null; }
};

// --- script identity -------------------------------------------------------
function checkScript(hall, label, str) {
    const base = BLOCKS[hall];
    if (!base || !str) return;
    const ranges = base.concat(ALSO_ALLOWED[hall] || []);
    for (const ch of str) {
        const cp = ch.codePointAt(0);
        if (alwaysOk(cp)) continue;
        if (ranges.some(([lo, hi]) => cp >= lo && cp <= hi)) continue;
        fail(`${hall}: ${label} contains U+${cp.toString(16).toUpperCase().padStart(4, '0')} "${ch}", outside this hall's script`);
    }
}

// --- the letter-sum halls, checked against known attested values -----------
// These are the numbers the halls themselves print, and the numbers the
// tradition cites. If the alphabet data drifts, these break first.
const ATTESTED = [
    ['hebrew', 'יהוה', 26], ['hebrew', 'אהיה', 21], ['hebrew', 'חי', 18],
    ['greek', 'λόγος', 373], ['greek', 'Ἀβραξάς', 365], ['greek', 'ΙΑΩ', 811],
    ['arabic', 'الله', 66],
    ['armenian', 'Տէր', 9007],
];

function buildValueMap(letters) {
    const map = new Map();
    const put = (ch, v) => {
        if (!ch || map.has(ch)) return;
        map.set(ch, v);
        const lo = ch.toLowerCase(); const up = ch.toUpperCase();
        if (lo !== ch && !map.has(lo)) map.set(lo, v);
        if (up !== ch && up.length === 1 && !map.has(up)) map.set(up, v);
    };
    for (const l of letters) {
        if (l.value == null) continue;
        for (const ch of l.glyph.replace(/\s/g, '')) put(ch, l.value);
        if (l.final) for (const ch of l.final) put(ch, l.value);
    }
    return map;
}
const strip = (s) => s.normalize('NFD').replace(
    /[̀-֑ͯ-ׇؐ-ًؚ-ٰٟۖ-ۭܰ-݊]/g, '');

// --- run -------------------------------------------------------------------
let counts = { halls: 0, letters: 0, names: 0, lexicon: 0, currents: 0, works: 0, events: 0, readings: 0 };

for (const hall of HALLS) {
    const d = await load(`${hall}.js`);
    if (!d) { fail(`${hall}: dataset missing`); continue; }
    counts.halls++;

    // A hall may be scaffolded before its content lands. Empty across the
    // board is a hall waiting to be written; empty in one place while full in
    // another is a hall that has lost something, and that must fail.
    const empty = !d.letters.length && !d.divineNames.length && !d.lexicon.length;
    if (empty) { warn(`${hall}: scaffolded, awaiting content`); continue; }
    if (!d.letters.length) fail(`${hall}: has names or lexicon but no letters`);
    counts.letters += d.letters.length;
    const seen = new Set();
    for (const l of d.letters) {
        if (!l.glyph) fail(`${hall}: a letter has no glyph`);
        if (!l.name) fail(`${hall}: a letter has no name`);
        if (!l.note) warn(`${hall}: letter ${l.name} has no note`);
        checkScript(hall, `letter ${l.name}`, l.glyph);
        if (seen.has(l.name)) fail(`${hall}: duplicate letter name ${l.name}`);
        seen.add(l.name);
        if (l.value != null && (!Number.isInteger(l.value) || l.value < 0)) {
            fail(`${hall}: letter ${l.name} has a non-integer value ${l.value}`);
        }
    }

    counts.names += d.divineNames.length;
    for (const n of d.divineNames) {
        checkScript(hall, `name ${n.translit}`, n.native);
        if (/^\s*(uncertain|unknown|disputed)\s*\.?\s*$/i.test(n.meaning || '')) {
            fail(`${hall}: name ${n.translit} gives a bare "${n.meaning}" with no proposals`);
        }
        if (n.proposals) {
            if (n.proposals.length < 2) fail(`${hall}: name ${n.translit} has a proposals array with fewer than two readings`);
            for (const p of n.proposals) {
                if (!p.basis || !p.standing) fail(`${hall}: a proposal for ${n.translit} lacks a basis or a standing`);
            }
        }
    }

    counts.lexicon += d.lexicon.length;
    for (const e of d.lexicon) checkScript(hall, `lexicon ${e.translit}`, e.native);

    // extensions
    const ext = await load(`ext/${hall}.js`);
    if (ext) {
        counts.readings += ext.readings.length;
        for (const r of ext.readings) {
            if (!r.source) fail(`${hall}: reading "${r.title}" has no source`);
            for (const w of r.words) checkScript(hall, `reading ${r.title}`, w.native);
        }
        if (ext.numbers) {
            for (const dg of ext.numbers.digits) {
                if (typeof dg.value !== 'number') fail(`${hall}: a digit has no numeric value`);
            }
            if (!ext.numbers.examples.length) fail(`${hall}: numbers section has no worked examples`);
        }
    }

    const themes = await load(`themes/${hall}.js`);
    if (themes) {
        counts.currents += themes.themes.length;
        const slugs = new Set();
        for (const t of themes.themes) {
            if (slugs.has(t.slug)) fail(`${hall}: duplicate current slug ${t.slug}`);
            slugs.add(t.slug);
            if (!t.paragraphs.length) fail(`${hall}: current ${t.slug} has no body`);
            for (const term of t.terms) checkScript(hall, `current ${t.slug} term`, term.native);
        }
    }

    const corpus = await load(`corpus/${hall}.js`);
    if (corpus) {
        counts.works += corpus.works.length;
        const slugs = new Set();
        for (const w of corpus.works) {
            if (slugs.has(w.slug)) fail(`${hall}: duplicate work slug ${w.slug}`);
            slugs.add(w.slug);
            checkScript(hall, `work ${w.slug}`, w.native);
            if (w.contents && !w.contents.length) fail(`${hall}: work ${w.slug} has an empty contents array — use null`);
            for (const e of w.editions) {
                if (!/^https?:\/\//.test(e.url)) fail(`${hall}: work ${w.slug} has a malformed edition URL: ${e.url}`);
            }
        }
    }

    const tl = await load(`timelines/${hall}.js`);
    if (tl && tl.events.length) {
        counts.events += tl.events.length;
        const slugs = new Set();
        let prev = -Infinity;
        for (const e of tl.events) {
            if (slugs.has(e.slug)) fail(`${hall}: duplicate timeline slug ${e.slug}`);
            slugs.add(e.slug);
            if (!Number.isInteger(e.year)) fail(`${hall}: event ${e.slug} has a non-integer year`);
            if (e.end != null && e.end < e.year) fail(`${hall}: event ${e.slug} ends (${e.end}) before it begins (${e.year})`);
            if (e.year < prev) fail(`${hall}: event ${e.slug} is out of chronological order`);
            prev = e.year;
        }
    }

    const course = await load(`courses/${hall}.js`);
    if (course && course.lessons.length) {
        const nums = course.lessons.map((l) => l.number);
        const expect = nums.map((_, i) => i + 1);
        if (JSON.stringify(nums) !== JSON.stringify(expect)) {
            fail(`${hall}: course lessons are not numbered 1..${nums.length}`);
        }
        for (const l of course.lessons) {
            for (const ex of l.exercises) {
                if (!ex.answer) fail(`${hall}: lesson ${l.number} has an exercise with no answer`);
            }
        }
    }
}

// --- attested arithmetic ---------------------------------------------------
for (const [hall, word, expected] of ATTESTED) {
    const d = await load(`${hall}.js`);
    if (!d) continue;
    const map = buildValueMap(d.letters);
    let total = 0;
    for (const ch of strip(word)) total += map.get(ch) || 0;
    if (total !== expected) {
        fail(`${hall}: ${word} reckons to ${total}, but the attested value is ${expected}`);
    }
}

// --- the Reading Room ------------------------------------------------------
const library = (await import(src('library.js'))).default;
const pdfs = new Set();
for (const b of library.books) {
    if (!/^https:\/\//.test(b.pdfUrl)) fail(`library: ${b.title} has a non-https pdfUrl`);
    if (pdfs.has(b.pdfUrl)) fail(`library: duplicate pdfUrl for ${b.title}`);
    pdfs.add(b.pdfUrl);
}

// --- report ----------------------------------------------------------------
const summary = `education: ${counts.halls} halls, ${counts.letters} signs, ${counts.names} names, `
    + `${counts.lexicon} lexicon, ${counts.readings} readings, ${counts.currents} currents, `
    + `${counts.works} works, ${counts.events} timeline events, ${library.books.length} books`;

if (warnings.length) {
    console.warn(`education: ${warnings.length} warning(s)`);
    for (const w of warnings.slice(0, 10)) console.warn(`  · ${w}`);
    if (warnings.length > 10) console.warn(`  · …and ${warnings.length - 10} more`);
}
if (errors.length) {
    console.error(`\neducation: ${errors.length} error(s) — build stopped\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
console.log(`${summary} — validated`);
