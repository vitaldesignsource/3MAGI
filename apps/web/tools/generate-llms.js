#!/usr/bin/env node
// Writes public/llms.txt: a plain map of the site for language models, in the
// llms.txt convention (a title, a one-line summary, then sections of links).
//
// The previous generator read <Helmet> blocks out of the top-level page files
// only, so it missed every portal page (they live in subdirectories), could
// not see a title or description built in code (the essays, the halls, the
// sections) and wrote "No description available" for most of what it did
// find. This one builds the list from the same sources the pages render from:
// the section declarations of the two portals, the Scriptorium's halls and
// courses, the article index, and the literal descriptions of the fixed pages.
// Account and checkout pages are left out, as they are from the sitemap.

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { articles } from '../src/data/articles.js';

const SITE = 'https://threemagipress.com';
const here = path.dirname(fileURLToPath(import.meta.url));
const src = (p) => path.resolve(here, '../src', p);
const out = path.resolve(here, '../public/llms.txt');

// An array literal declared as `export const NAME = [ ... ];` in a source file
// that node cannot import as is (JSX, or Vite's import.meta.glob). The arrays
// hold only plain literals, so slicing the bracket span and evaluating it is
// safe and keeps this file from duplicating the data.
function arrayFrom(file, name) {
    const text = readFileSync(src(file), 'utf8');
    const start = text.indexOf(`export const ${name} = [`);
    if (start < 0) throw new Error(`${name} not found in ${file}`);
    let i = text.indexOf('[', start), depth = 0, quote = null;
    for (let j = i; j < text.length; j++) {
        const c = text[j];
        if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
        if (c === '/' && text[j + 1] === '/') { j = text.indexOf('\n', j); continue; }
        if (c === '/' && text[j + 1] === '*') { j = text.indexOf('*/', j) + 1; continue; }
        if (c === '\'' || c === '"' || c === '`') { quote = c; continue; }
        if (c === '[') depth++;
        else if (c === ']' && --depth === 0) return new Function(`return ${text.slice(i, j + 1)};`)();
    }
    throw new Error(`${name} in ${file} is not closed`);
}

// The literal <meta name="description"> of a fixed page, if it has one.
function describe(file) {
    const text = readFileSync(src(file), 'utf8');
    const m = text.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    return m ? m[1].replace(/&amp;/g, '&') : '';
}

const line = (url, title, desc) => `- [${title}](${SITE}${url})${desc ? `: ${desc.replace(/\s+/g, ' ').trim()}` : ''}`;

const christianities = arrayFrom('pages/christianities/lib.js', 'SECTIONS');
const powers = arrayFrom('pages/powers/lib.js', 'SECTIONS');
const halls = arrayFrom('pages/EducationPortalPage.jsx', 'HALLS');

const coursesDir = src('data/education/courses');
const courses = [];
for (const f of existsSync(coursesDir) ? readdirSync(coursesDir).filter((x) => x.endsWith('.js')).sort() : []) {
    const c = (await import(pathToFileURL(path.join(coursesDir, f)).href)).default;
    courses.push({ slug: f.replace(/\.js$/, ''), title: c.title, tagline: c.tagline, lessons: c.lessons?.length ?? 0 });
}

const gatedDir = src('data/articles/gated');
const gated = new Set((existsSync(gatedDir) ? readdirSync(gatedDir) : []).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')));
const essays = articles.filter((a) => !a.comingSoon && !a.password);

const sections = [
    '# Three Magi Press',
    '',
    '> Three Magi Press publishes hermetic, occult and alchemical books and The Third Lamp, a digital magazine of esoteric history, with three reference portals: Christianities, The Powers, and the Scriptorium of sacred languages. Claims are kept apart from the documentary record throughout.',
    '',
    '## Three Magi Press',
    line('/', 'Home', describe('pages/HomePage.jsx')),
    line('/books', 'Books', describe('pages/BooksPage.jsx')),
    '',
    '## The Third Lamp',
    line('/third-lamp', 'The Third Lamp', describe('pages/ThirdLampPage.jsx')),
    line('/third-lamp/archive', 'The Living Archive', describe('pages/ThirdLampArchivePage.jsx')),
    line('/third-lamp/lamp-post', 'The Lamp Post', describe('pages/ThirdLampLampPostPage.jsx')),
    line('/third-lamp/authors', 'Authors', describe('pages/ThirdLampAuthorsPage.jsx')),
    line('/third-lamp/about', 'About', describe('pages/ThirdLampAboutPage.jsx')),
    line('/third-lamp/contribute', 'The Open Gate: contribute', describe('pages/ThirdLampContributePage.jsx')),
    line('/third-lamp/contact', 'Contact', describe('pages/ThirdLampContactPage.jsx')),
    '',
    '## Essays',
    ...essays.map((a) => line(`/articles/${a.slug}`, a.subtitle ? `${a.title}: ${a.subtitle}` : a.title,
        `${a.dek || ''}${gated.has(a.slug) ? ' (members)' : ''}`)),
    '',
    '## Christianities',
    line('/christianities', 'Christianities', describe('pages/christianities/ChristianitiesPortalPage.jsx')),
    ...christianities.map((s) => {
        const page = { canon: 'ChristianitiesCanonPage.jsx', map: 'ChristianitiesMapPage.jsx' }[s.slug];
        return line(`/christianities/${s.slug}`, s.title, (page && describe(`pages/christianities/${page}`)) || s.blurb);
    }),
    line('/christianities/rosicrucian', 'The Rose and the Cross', describe('pages/christianities/ChristianitiesRosicrucianPage.jsx')),
    '',
    '## The Powers',
    line('/powers', 'The Powers', describe('pages/powers/PowersPortalPage.jsx')),
    ...powers.map((s) => line(`/powers/${s.slug}`, s.title, s.slug === 'map' ? describe('pages/powers/PowersMapPage.jsx') || s.blurb : s.blurb)),
    '',
    '## The Scriptorium',
    line('/third-lamp/education', 'The Scriptorium', describe('pages/EducationPortalPage.jsx')),
    ...halls.map((h) => line(`/third-lamp/education/${h.slug}`, `The ${h.name} hall`, h.blurb)),
    ...courses.map((c) => line(`/third-lamp/education/${c.slug}/course`, c.title, `${c.tagline} ${c.lessons} lessons.`)),
    '',
];

writeFileSync(out, sections.join('\n'), 'utf8');
const links = sections.filter((l) => l.startsWith('- [')).length;
console.log(`llms.txt: ${links} pages → ${path.relative(process.cwd(), out)}`);
