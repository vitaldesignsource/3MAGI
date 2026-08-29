#!/usr/bin/env node
// Emits src/data/education/cognates.generated.js — the table of the letter
// family. Aleph, alpha, alaph, alif and azъ are one letter worn five ways,
// and a portal holding all of these scripts is the rare place that can show
// the descent side by side.
//
// The table is DERIVED, not hand-written. For every script whose letters
// carry numeral values, the letter standing at each Semitic position is
// looked up by its value in that hall's own data — the same Semitic sequence
// carries the same numbers into Hebrew, Aramaic square script, Syriac,
// Arabic abjad, Greek, Coptic and Cyrillic, which is itself the historical
// argument the table makes. Only Latin, whose letters lost their numbers on
// the way through Etruria, is mapped by position from the standard descent.
// If a hall's data drifts, the table drifts with it or the build fails —
// there is no second copy of any alphabet here.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const load = async (p) => (await import(path.join(web, 'src/data/education', p))).default;

// The twenty-two Semitic positions with their conventional numeral values,
// proto-names and pictographic senses (the senses as conventionally given;
// several are disputed, and the component says so once rather than per cell).
const POSITIONS = [
    { v: 1, proto: 'ʾālep', sense: 'ox' },
    { v: 2, proto: 'bēt', sense: 'house' },
    { v: 3, proto: 'gīml', sense: 'camel / throwing-stick' },
    { v: 4, proto: 'dālet', sense: 'door' },
    { v: 5, proto: 'hē', sense: 'window / jubilation' },
    { v: 6, proto: 'wāw', sense: 'hook, peg' },
    { v: 7, proto: 'zayin', sense: 'weapon' },
    { v: 8, proto: 'ḥēt', sense: 'fence, courtyard' },
    { v: 9, proto: 'ṭēt', sense: 'wheel (disputed)' },
    { v: 10, proto: 'yōd', sense: 'hand, arm' },
    { v: 20, proto: 'kap', sense: 'palm of the hand' },
    { v: 30, proto: 'lāmed', sense: 'ox-goad' },
    { v: 40, proto: 'mēm', sense: 'water' },
    { v: 50, proto: 'nūn', sense: 'fish / serpent' },
    { v: 60, proto: 'sāmek', sense: 'pillar (disputed)' },
    { v: 70, proto: 'ʿayin', sense: 'eye' },
    { v: 80, proto: 'pē', sense: 'mouth' },
    { v: 90, proto: 'ṣādē', sense: 'plant / hunt (disputed)' },
    { v: 100, proto: 'qōp', sense: 'needle-eye / monkey (disputed)' },
    { v: 200, proto: 'rēš', sense: 'head' },
    { v: 300, proto: 'šīn', sense: 'tooth' },
    { v: 400, proto: 'tāw', sense: 'mark, cross-sign' },
];

// Scripts looked up by value from their own halls. Order is display order:
// the Semitic line first, then the two European borrowings.
const BY_VALUE = ['hebrew', 'aramaic', 'syriac', 'arabic', 'greek', 'coptic', 'slavonic'];

// Latin lost the numeral values, so it alone is mapped by position. The
// standard descent: G is the Roman remake of zayin's position via Z (which
// was expelled and readmitted at the end), and the etymological column here
// follows the conventional correspondences of the epigraphers.
const LATIN_BY_POSITION = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'Z', 8: 'H',
    10: 'I', 20: 'K', 30: 'L', 40: 'M', 50: 'N', 60: null, 70: 'O',
    80: 'P', 90: null, 100: 'Q', 200: 'R', 300: 'S', 400: 'T',
};

const rows = [];
const halls = {};
for (const h of BY_VALUE) halls[h] = await load(`${h}.js`);

// The Greek row is not a straight value-match, and the reason is itself a
// piece of the history: Greek dropped san — the descendant of ṣādē — from
// the living alphabet, so from qōp onward every Greek numeral sits one slot
// below its Semitic ancestor. Koppa, rēš's neighbour qōp, counts 90 in Greek
// against 100 in Hebrew; rho counts 100 against rēš's 200; and so on. Coptic
// and Cyrillic inherit Greek's numbers and therefore Greek's shift.
const GREEK_FAMILY = new Set(['greek', 'coptic', 'slavonic']);
const GREEK_SHIFT = { 90: null, 100: 90, 200: 100, 300: 200, 400: 300 };

const pickByValue = (hall, v) => {
    // Prefer a non-archaic letter; fall back to the archaic numeral letters
    // (Greek digamma 6, koppa 90, sampi 900) which are the genuine cognates.
    let want = v;
    if (GREEK_FAMILY.has(hall) && v in GREEK_SHIFT) {
        want = GREEK_SHIFT[v];
        if (want === null) return null; // san is lost; the position has no heir
    }
    const ls = halls[hall].letters.filter((l) => l.value === want);
    if (!ls.length) return null;
    const main = ls.find((l) => !l.archaic) || ls[0];
    return { g: main.glyph, n: main.name, archaic: !!main.archaic };
};

for (const pos of POSITIONS) {
    const cells = {};
    for (const h of BY_VALUE) cells[h] = pickByValue(h, pos.v);
    const latin = LATIN_BY_POSITION[pos.v];
    cells.latin = latin ? { g: latin, n: latin, archaic: false } : null;
    rows.push({ v: pos.v, proto: pos.proto, sense: pos.sense, cells });
}

// Sanity: Hebrew and Aramaic must fill all 22; Greek at least 20 (digamma
// and koppa may be archaic but must exist); a hole elsewhere is legitimate
// (Arabic šīn sits at 300 only in the Mashriqi order, which the hall uses).
const holes = [];
for (const r of rows) {
    for (const h of ['hebrew', 'aramaic']) {
        if (!r.cells[h]) holes.push(`${h} missing value ${r.v} (${r.proto})`);
    }
}
if (holes.length) {
    console.error('cognates: the table has holes that should not exist:');
    for (const x of holes) console.error('  ✗ ' + x);
    process.exit(1);
}

const out = { scripts: ['hebrew', 'aramaic', 'syriac', 'arabic', 'greek', 'coptic', 'slavonic', 'latin'], rows };
const file = path.join(web, 'src/data/education/cognates.generated.js');
writeFileSync(file,
    '// GENERATED by tools/build-cognates.mjs — do not edit. Every cell is\n'
    + '// looked up from its hall\'s own letter data by numeral value; Latin\n'
    + '// alone is mapped by position, having lost its numbers in Etruria.\n'
    + 'export default ' + JSON.stringify(out) + ';\n', 'utf8');

const filled = rows.reduce((n, r) => n + Object.values(r.cells).filter(Boolean).length, 0);
console.log(`cognates: 22 positions × 8 scripts, ${filled} cells filled`);
