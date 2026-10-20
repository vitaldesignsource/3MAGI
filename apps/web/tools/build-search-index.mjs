#!/usr/bin/env node
// Emits public/scriptorium-index.json — a compact search index over every
// hall's signs, divine names, lexicon, currents, primary works and timeline
// events.
//
// The index is built here rather than in the browser so the portal chunk stays
// small: twenty halls of data is well over a megabyte of JavaScript, and a
// reader who never searches should never download it. The search component
// fetches this file once, on the first keystroke.
//
// Keys are single letters because this file is shipped, not read.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadModules, loadRegistry } from './magic-lib.mjs';
import { sharedNote, textOf } from '../src/pages/magic/sign.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const load = async (p) => {
    try { return (await import(path.join(web, 'src/data/education', p))).default; }
    catch { return null; }
};

const HALLS = [
    'latin', 'greek', 'hebrew', 'egyptian', 'cuneiform', 'sanskrit', 'arabic',
    'tibetan', 'syriac', 'coptic', 'aramaic', 'persian', 'armenian', 'geez', 'chinese', 'slavonic',
    'mandaic', 'avestan', 'ugaritic', 'phoenician',
];
const TITLES = {
    latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian',
    cuneiform: 'Cuneiform', sanskrit: 'Sanskrit', arabic: 'Arabic',
    tibetan: 'Tibetan', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic',
    persian: 'Persian', armenian: 'Armenian', geez: 'Geʼez',
    chinese: 'Classical Chinese', slavonic: 'Church Slavonic',
    mandaic: 'Mandaic', avestan: 'Avestan', ugaritic: 'Ugaritic', phoenician: 'Phoenician',
    magic: 'The Magical Scriptorium',
};

const records = [];
// h hall · k kind · n native · l label · s subtitle · d detail · a anchor
// · u explicit path (Christianities records only; hall records route by convention)
const push = (h, k, n, l, s, d, a, u) => {
    const r = { h, k, n: n || '', l: l || '', s: s || '', d: (d || '').slice(0, 180), a: a || '' };
    if (u) r.u = u;
    records.push(r);
};

// The Scriptorium's counts, for the copy that quotes them (the Home page's
// card): written beside the index so the numbers cannot fall behind the halls.
const stats = { halls: 0, signs: 0, names: 0, courses: 0 };

for (const hall of HALLS) {
    const d = await load(`${hall}.js`);
    if (!d) continue;
    stats.halls++;
    stats.signs += d.letters.length;
    stats.names += d.divineNames.length;

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
    if (course) stats.courses++;
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

// --- The Magical Scriptorium -------------------------------------------------
// The wing's records carry their path (u), since the wing's routes are not the
// halls'. An alphabet is kind 'alphabet'; the author and the lineage pages are
// kind 'page'. A letter set in a face carries its character (n) as a hall's
// sign does; a drawn letter has no text, so it carries its drawing (g) for the
// result row to draw; a letter whose form is still being traced carries x.
// The gap note an alphabet's letters share is given once on its page, so it is
// not repeated in every result, and a gap letter of a Latin-keyed alphabet
// that has nothing of its own (its name is its letter, its note the shared
// one) is left out: a search for the alphabet would otherwise list A to Z.
{
    const registry = await loadRegistry();
    const { modules, problems } = await loadModules(registry);
    if (problems.length) throw new Error(`magic modules did not load: ${problems.join('; ')}`);
    const MG = 'magic';
    const pages = new Set(registry.pages.map((p) => p.slug));
    for (const e of [...registry.alphabets, ...registry.pages]) {
        const m = modules[e.slug];
        const url = `${registry.wing.path}/${e.slug}`;
        push(MG, pages.has(e.slug) ? 'page' : 'alphabet', '', m.title, (m.otherNames || e.otherNames || []).join(' · '), m.summary, '', url);
        const letters = m.letters || [];
        const shared = sharedNote(letters);
        letters.forEach((l, i) => {
            const gap = !l.glyph && !l.char;
            const own = l.note && l.note !== shared ? l.note : '';
            if (gap && !own && e.keyedTo === 'latin' && l.value != null && String(l.name) === String(l.value)) return;
            const rec = { h: MG, k: 'sign', n: l.char ? textOf(l.char) : '', l: l.name,
                s: [e.short, l.translit || l.planet || l.codepoint].filter(Boolean).join(' · '),
                d: own.slice(0, 180), a: `mg-letter-${i}`, u: url };
            if (l.glyph) {
                rec.g = { d: l.glyph.d };
                if (l.glyph.rings?.length) rec.g.rings = l.glyph.rings;
                if (l.glyph.dots?.length) rec.g.dots = l.glyph.dots;
            } else if (!l.char) rec.x = 1;
            records.push(rec);
        });
        for (const ev of m.transmission || []) {
            const era = ev.when || `${ev.circa ? 'c. ' : ''}${ev.year < 0 ? `${-ev.year} BCE` : `${ev.year} CE`}`;
            push(MG, 'event', '', ev.title, `${era} · ${e.short}`, ev.description, 'mg-transmission-heading', url);
        }
    }
}

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

const tree = await loadCh('tree');
for (const n of tree?.nodes ?? []) push(
    CH, 'branch', '', n.label, `${n.from}–${n.to ?? 'today'}`,
    n.note, '', '/christianities/branches',
);

const chMatrix = await loadCh('matrix');
for (const p of chMatrix?.positions ?? []) push(
    CH, 'christology', '', p.label, '', p.holder, '', '/christianities/christologies',
);

const chWords = await loadCh('words');
for (const w of chWords?.entries ?? []) push(
    CH, 'term', w.native, w.translit, w.literal, w.fight, w.slug, '/christianities/councils',
);

const chCreeds = await loadCh('creeds');
for (const c of chCreeds?.creeds ?? []) push(
    CH, 'creed', c.native, c.name, c.origin, c.story, c.slug, '/christianities/councils',
);

const esoteric = await loadCh('esoteric');
for (const e of esoteric?.entries ?? []) push(
    CH, 'current', '', e.name, e.era, e.claim, e.slug, '/christianities/esoteric',
);

// The three founding books get their own records, pointing at the Rosicrucian
// page rather than the current, because that is where they are set out.
const rosicrucian = await loadCh('rosicrucian');
for (const m of rosicrucian?.manifestos ?? []) push(
    CH, 'work', '', m.title, `${m.year} · ${m.place}`, m.says, m.slug, '/christianities/rosicrucian',
);

for (const d of rosicrucian?.days ?? []) push(
    CH, 'current', '', `The Chymical Wedding, Day ${d.n}: ${d.title}`,
    `Day ${d.n} of seven`, d.story, `day-${d.n}`, '/christianities/rosicrucian',
);

// The Fama's six articles. Searched for by their contents — the house S.
// Spiritus, the day C., curing the sick gratis — so the article text is the
// description and the gist is the name.
for (const r of rosicrucian?.rules ?? []) push(
    CH, 'note', '', `The ${['first', 'second', 'third', 'fourth', 'fifth', 'sixth'][r.n - 1]} agreement: ${r.label}`,
    'The six articles of the Fama', r.text, `rule-${r.n}`, '/christianities/rosicrucian',
);

// The furore. Every one of these is a real book with a findable title, and
// several of them (Atalanta fugiens, Turris Babel) are looked for by name.
for (const b of rosicrucian?.furore ?? []) push(
    CH, 'work', '', b.title, `${b.year} · ${b.author}`, b.note, b.slug, '/christianities/rosicrucian',
);

// The descent. The era is a poor search target and the bodies are full of good
// ones — Sprengel, Toulouse, Haarlem — so both columns go in the description.
for (const r of rosicrucian?.descent ?? []) push(
    CH, 'note', '', `The descent: ${r.era}`, 'Claimed against documented',
    [r.claimed, r.documented, r.note].filter(Boolean).join(' — '),
    'rc-descent-heading', '/christianities/rosicrucian',
);

// The grades. People search for the names themselves — Zelator, Adeptus
// Minor, Ipsissimus — so each rung is a record, carrying its line of descent.
for (const g of rosicrucian?.grades ?? []) push(
    CH, 'note', '', `${g.gd} (${g.num})`, 'The Rosicrucian grades',
    g.added
        ? `Added by the Golden Dawn in 1888, with no earlier Rosicrucian grade behind it. On the Tree: ${g.sefira}.`
        : `Gold- und Rosenkreuz ${g.gurc} → Societas Rosicruciana ${g.sria} → Golden Dawn ${g.gd}. On the Tree: ${g.sefira}.`,
    'rc-grades-heading', '/christianities/rosicrucian',
);

// The signs: looked for by name — the Monas, the Luther rose, the lamen.
for (const g of rosicrucian?.signs ?? []) push(
    CH, 'symbol', '', g.title, `${g.year} \u00b7 a Rosicrucian sign`, g.about, `sign-${g.key}`, '/christianities/rosicrucian',
);

// The map: every place with a location, claimed or documented, so a search
// for Kassel or Damascus finds the portal's map.
for (const p of [...(rosicrucian?.map?.journey ?? []), ...(rosicrucian?.map?.places ?? [])].filter((x) => x.located)) push(
    CH, 'site', '', p.name, `${p.year} \u00b7 the Rosicrucian map, ${p.layer}`, p.note, 'rc-map-heading', '/christianities/rosicrucian',
);

// The lines: every body that took the name, found by its own name (AMORC,
// the Stella Matutina, the Lectorium) and opening the chart's list entry.
for (const b of rosicrucian?.lines?.bodies ?? []) push(
    CH, 'branch', '', b.name, `${b.founded} \u00b7 ${b.place} \u00b7 a Rosicrucian line`, b.note, `line-${b.key}`, '/christianities/rosicrucian',
);

// The people of the story and the brothers of the Fama, found by name.
for (const p of rosicrucian?.people ?? []) push(
    CH, 'figure', '', p.name, `${p.dates} \u00b7 the Rosicrucian circles`, p.role, `person-${p.key}`, '/christianities/rosicrucian',
);
for (const b of rosicrucian?.brethren ?? []) push(
    CH, 'figure', '', b.initials, 'A brother of the Fama, named only by initials', b.says, `brother-${b.key}`, '/christianities/rosicrucian',
);

// The historians: their books are looked for by title.
for (const w of rosicrucian?.scholarship ?? []) push(
    CH, 'work', '', w.work, `${w.year} · ${w.author}`, w.argued, w.slug, '/christianities/rosicrucian',
);

// The Witnesses, on the Canon page: the manuscripts by siglum, and the four
// notes beneath them. Recovered with the dataset itself from the deploy build.
const codices = await loadCh('codices');
for (const c of codices?.entries ?? []) push(
    CH, 'manuscript', c.siglum, c.name, `${c.ga} \u00b7 ${c.date}`,
    c.proves, c.slug, '/christianities/canon',
);
for (const n of codices?.commentary ?? []) push(
    CH, 'note', '', n.heading, 'On the manuscripts',
    Array.isArray(n.body) ? n.body[0] : n.body, n.slug, '/christianities/canon',
);

const bibles = await loadCh('bibles');
for (const v of bibles?.versions ?? []) push(
    CH, 'work', v.native, v.name, `${v.year < 0 ? `${-v.year} BCE` : v.year} · ${v.language}`,
    v.note, v.slug, '/christianities/canon',
);

const chTimeline = await loadCh('timeline');
for (const e of chTimeline?.events ?? []) push(
    CH, 'event', e.native, e.title,
    `${e.circa ? 'c. ' : ''}${e.year < 0 ? `${-e.year} BCE` : `${e.year} CE`}`,
    e.description, 'edu-timeline-heading', '/christianities',
);


// --- The Powers portal ------------------------------------------------------
const loadPw = async (name) => {
    try { return (await import(path.join(web, 'src/data/powers', `${name}.js`))).default; }
    catch { return null; }
};
const PW = 'pw';

const pwHier = await loadPw('hierarchies');
for (const e of pwHier?.entries ?? []) push(
    PW, 'order', '', e.name, e.tradition, e.exposition?.[0], e.slug, '/powers/hierarchies',
);
const pwHost = await loadPw('host');
for (const e of pwHost?.entries ?? []) push(
    PW, 'being', e.native, e.name, [e.title, e.tradition].filter(Boolean).join(' · '),
    e.exposition?.[0], e.slug, '/powers/host',
);
const pwPan = await loadPw('pantheons');
for (const e of pwPan?.entries ?? []) push(
    PW, 'deity', e.native, e.name, e.domain, e.exposition?.[0], e.slug, '/powers/pantheons',
);
const pwDai = await loadPw('daimons');
for (const e of pwDai?.entries ?? []) push(
    PW, 'being', '', e.name, e.tradition, e.exposition?.[0], e.slug, '/powers/daimons',
);
const pwTexts = await loadPw('texts');
for (const e of pwTexts?.entries ?? []) push(
    PW, 'work', e.native, e.name, e.dating, e.exposition?.[0], e.slug, '/powers/texts',
);
const pwWords = await loadPw('words');
for (const w of pwWords?.entries ?? []) push(
    PW, 'term', w.native, w.translit, w.literal, w.story, w.slug, '/powers/daimons',
);
const pwSites = await loadPw('mapsites');
for (const s of pwSites?.sites ?? []) push(
    PW, 'site', '', s.name,
    [s.modern ? `now ${s.modern}` : '', `${s.from < 0 ? -s.from + ' BCE' : s.from}–${s.to ?? 'today'}`].filter(Boolean).join(' · '),
    s.blurb, s.slug, '/powers/map',
);
const pwTl = await loadPw('timeline');
for (const e of pwTl?.events ?? []) push(
    PW, 'event', e.native, e.title,
    `${e.circa ? 'c. ' : ''}${e.year < 0 ? `${-e.year} BCE` : `${e.year} CE`}`,
    e.description, 'edu-timeline-heading', '/powers',
);

const out = { halls: TITLES, records };
const file = path.join(web, 'public/scriptorium-index.json');
writeFileSync(file, JSON.stringify(out), 'utf8');

// src/data/education/portal/stats.generated.js — the counts the Home page
// quotes. Like the index, it is rewritten by every build and committed.
const statsFile = path.join(web, 'src/data/education/portal/stats.generated.js');
writeFileSync(statsFile, [
    '// GENERATED by tools/build-search-index.mjs — do not edit. The Scriptorium\'s',
    '// counts, read from the halls\' own data: halls, signs (letters), divine names,',
    '// and courses. The Home page builds its Scriptorium card from these.',
    `export default ${JSON.stringify(stats)};`,
    '',
].join('\n'), 'utf8');

const kb = (JSON.stringify(out).length / 1024).toFixed(0);
const byKind = records.reduce((m, r) => (m[r.k] = (m[r.k] || 0) + 1, m), {});
console.log(`search index: ${records.length} records (${kb}KB) — `
    + Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', '));
console.log(`scriptorium stats: ${stats.halls} halls, ${stats.signs} signs, ${stats.names} names, ${stats.courses} courses → ${path.relative(web, statsFile)}`);
