#!/usr/bin/env node
// Emits public/scriptorium-index.json — a compact search index over every
// hall's signs, divine names, lexicon, currents, primary works and timeline
// events.
//
// The index is built here rather than in the browser so the portal chunk stays
// small: fourteen halls of data is well over a megabyte of JavaScript, and a
// reader who never searches should never download it. The search component
// fetches this file once, on the first keystroke.
//
// Keys are single letters because this file is shipped, not read.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const load = async (p) => {
    try { return (await import(path.join(web, 'src/data/education', p))).default; }
    catch { return null; }
};

const HALLS = [
    'latin', 'greek', 'hebrew', 'egyptian', 'cuneiform', 'sanskrit', 'arabic',
    'tibetan', 'syriac', 'coptic', 'aramaic', 'persian', 'armenian', 'geez', 'chinese',
];
const TITLES = {
    latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian',
    cuneiform: 'Cuneiform', sanskrit: 'Sanskrit', arabic: 'Arabic',
    tibetan: 'Tibetan', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic',
    persian: 'Persian', armenian: 'Armenian', geez: 'Geʼez',
    chinese: 'Classical Chinese',
};

const records = [];
// h hall · k kind · n native · l label · s subtitle · d detail · a anchor
const push = (h, k, n, l, s, d, a) => records.push({
    h, k, n: n || '', l: l || '', s: s || '', d: (d || '').slice(0, 180), a: a || '',
});

for (const hall of HALLS) {
    const d = await load(`${hall}.js`);
    if (!d) continue;

    d.letters.forEach((l, i) => push(
        hall, 'sign', l.glyph, l.name, l.translit,
        [l.meaning, l.note].filter(Boolean).join(' — '), `edu-letter-${i}`,
    ));

    for (const n of d.divineNames) push(
        hall, 'name', n.native, n.translit, n.english,
        [n.meaning, n.context].filter(Boolean).join(' — '), 'edu-names-heading',
    );

    for (const e of d.lexicon) push(
        hall, 'term', e.native, e.translit, e.english,
        e.definition, 'edu-lexicon-heading',
    );

    const themes = await load(`themes/${hall}.js`);
    for (const t of themes?.themes ?? []) push(
        hall, 'current', t.native, t.title, t.translit,
        t.summary, 'edu-currents-heading',
    );

    const corpus = await load(`corpus/${hall}.js`);
    for (const w of corpus?.works ?? []) push(
        hall, 'work', w.native, w.english, [w.translit, w.author].filter(Boolean).join(' · '),
        w.description, `edu-corpus-${hall}-${w.slug}`,
    );

    const tl = await load(`timelines/${hall}.js`);
    for (const e of tl?.events ?? []) {
        const era = e.year < 0 ? `${Math.abs(e.year)} BCE` : `${e.year} CE`;
        push(hall, 'event', e.native, e.title, `${e.circa ? 'c. ' : ''}${era}`,
            e.description, 'edu-timeline-heading');
    }

    const course = await load(`courses/${hall}.js`);
    for (const l of course?.lessons ?? []) push(
        hall, 'lesson', '', l.title, `Lesson ${l.number} · ${course.title}`,
        l.aim, `lesson-${l.number}`,
    );
}

const library = await load('library.js');
for (const b of library?.books ?? []) push(
    'library', 'book', '', b.title, `${b.author} · ${b.year}`,
    b.description, 'edu-library-heading',
);

const out = { halls: TITLES, records };
const file = path.join(web, 'public/scriptorium-index.json');
writeFileSync(file, JSON.stringify(out), 'utf8');

const kb = (JSON.stringify(out).length / 1024).toFixed(0);
const byKind = records.reduce((m, r) => (m[r.k] = (m[r.k] || 0) + 1, m), {});
console.log(`search index: ${records.length} records (${kb}KB) — `
    + Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', '));
