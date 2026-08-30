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
    'tibetan', 'syriac', 'coptic', 'aramaic', 'persian', 'armenian', 'geez', 'chinese', 'slavonic',
];
const TITLES = {
    latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian',
    cuneiform: 'Cuneiform', sanskrit: 'Sanskrit', arabic: 'Arabic',
    tibetan: 'Tibetan', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic',
    persian: 'Persian', armenian: 'Armenian', geez: 'Geʼez',
    chinese: 'Classical Chinese', slavonic: 'Church Slavonic',
};

const records = [];
// h hall · k kind · n native · l label · s subtitle · d detail · a anchor
// · u explicit path (Christianities records only; hall records route by convention)
const push = (h, k, n, l, s, d, a, u) => {
    const r = { h, k, n: n || '', l: l || '', s: s || '', d: (d || '').slice(0, 180), a: a || '' };
    if (u) r.u = u;
    records.push(r);
};

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

// --- The Christianities portal --------------------------------------------
// Same index, different door: records carry an explicit path (u) because the
// portal's routes don't follow the hall convention. Sections still awaiting
// their pipeline export null and contribute nothing.
const loadCh = async (name) => {
    try { return (await import(path.join(web, 'src/data/christianities', `${name}.js`))).default; }
    catch { return null; }
};
// Must mirror bookId() in ChristianitiesCanonPage.jsx.
const bookId = (name) => `bk-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
const CH = 'ch';

const christologies = await loadCh('christologies');
for (const e of christologies?.entries ?? []) push(
    CH, 'christology', e.term?.native, e.name, e.term?.translit,
    e.claim, e.slug, '/christianities/christologies',
);

const branches = await loadCh('branches');
for (const e of branches?.entries ?? []) push(
    CH, 'branch', '', e.name, [e.selfName !== e.name ? e.selfName : '', e.era].filter(Boolean).join(' · '),
    e.origin, e.slug, '/christianities/branches',
);

const councils = await loadCh('councils');
for (const c of councils?.councils ?? []) push(
    CH, 'council', '', c.name, `${c.place} · ${c.year < 0 ? `${-c.year} BCE` : c.year}`,
    c.question, c.slug, '/christianities/councils',
);
for (const a of councils?.disputes ?? []) push(
    CH, 'dispute', '', a.name, a.span, a.question, a.slug, '/christianities/councils',
);

const canon = await loadCh('canon');
for (const b of canon?.books ?? []) push(
    CH, 'canon', '', b.name, '', b.note, bookId(b.name), '/christianities/canon',
);
for (const m of canon?.milestones ?? []) push(
    CH, 'event', m.native, m.title,
    `${m.circa ? 'c. ' : ''}${m.year < 0 ? `${-m.year} BCE` : `${m.year} CE`}`,
    m.description, 'edu-timeline-heading', '/christianities/canon',
);

const figures = await loadCh('figures');
for (const f of figures?.entries ?? []) push(
    CH, 'figure', '', f.name, [f.dates, f.role].filter(Boolean).join(' · '),
    f.contribution, f.slug, '/christianities/figures',
);

const symbols = await loadCh('symbols');
for (const s of symbols?.entries ?? []) push(
    CH, 'symbol', s.glyph, s.name, '', s.meaning, s.slug, '/christianities/symbols',
);

const mapsites = await loadCh('mapsites');
for (const s of mapsites?.sites ?? []) push(
    CH, 'site', '', s.name,
    [s.modern ? `now ${s.modern}` : '', `${s.from}–${s.to ?? 'today'}`].filter(Boolean).join(' · '),
    s.blurb, s.slug, '/christianities/map',
);

const chTimeline = await loadCh('timeline');
for (const e of chTimeline?.events ?? []) push(
    CH, 'event', e.native, e.title,
    `${e.circa ? 'c. ' : ''}${e.year < 0 ? `${-e.year} BCE` : `${e.year} CE`}`,
    e.description, 'edu-timeline-heading', '/christianities',
);

const out = { halls: TITLES, records };
const file = path.join(web, 'public/scriptorium-index.json');
writeFileSync(file, JSON.stringify(out), 'utf8');

const kb = (JSON.stringify(out).length / 1024).toFixed(0);
const byKind = records.reduce((m, r) => (m[r.k] = (m[r.k] || 0) + 1, m), {});
console.log(`search index: ${records.length} records (${kb}KB) — `
    + Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', '));
