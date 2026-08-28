#!/usr/bin/env node
// Writes public/sitemap.xml from the route list and the article index, so a
// new essay is in the sitemap the moment it is published — no hand editing.
// Runs as the first step of `npm run build`; Vite then copies public/ into
// the build output.
//
// Essays flagged comingSoon or password-gated are left out: crawlers would
// only see the gate, and listing them advertises URLs that show no content.

import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { articles } from '../src/data/articles.js';

const SITE = 'https://threemagipress.com';
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../public/sitemap.xml');

const today = new Date().toISOString().slice(0, 10);
const iso = (d) => (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today);

// Static routes. Account, membership and checkout pages are deliberately
// absent — they carry nothing a search engine should index.
const staticRoutes = [
    { loc: '/',                       priority: '1.0', changefreq: 'weekly' },
    { loc: '/books',                  priority: '0.8', changefreq: 'weekly' },
    { loc: '/third-lamp',             priority: '0.9', changefreq: 'weekly' },
    { loc: '/third-lamp/archive',     priority: '0.9', changefreq: 'weekly' },
    { loc: '/third-lamp/authors',     priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/about',       priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/contribute',  priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/lamp-post',   priority: '0.6', changefreq: 'weekly' },
    { loc: '/third-lamp/education',   priority: '0.8', changefreq: 'monthly' },
    { loc: '/third-lamp/education/latin',    priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/greek',    priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/hebrew',   priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/egyptian', priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/cuneiform', priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/sanskrit',  priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/arabic',    priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/tibetan',   priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/syriac',    priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/coptic',    priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/aramaic',   priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/persian',   priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/armenian',  priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/geez',      priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/chinese', priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/slavonic', priority: '0.7', changefreq: 'monthly' },
    { loc: '/third-lamp/education/latin/course',    priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/education/greek/course',    priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/education/hebrew/course',   priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/education/egyptian/course', priority: '0.6', changefreq: 'monthly' },
    { loc: '/third-lamp/contact',     priority: '0.4', changefreq: 'yearly' },
].map((r) => ({ ...r, lastmod: today }));

// Gated essays are excluded: pointing a crawler at a URL that answers with a
// paywall earns a soft-404, not a ranking. The gated set is whatever the build
// moved out of the bundle, so this cannot drift from the actual paywall.
const gatedDir = path.resolve(here, '../src/data/articles/gated');
const gated = new Set(
    (existsSync(gatedDir) ? readdirSync(gatedDir) : [])
        .filter((f) => f.endsWith('.js'))
        .map((f) => f.replace(/\.js$/, ''))
);
const published = articles.filter((a) => !a.comingSoon && !a.password && !gated.has(a.slug));
const essayRoutes = published.map((a) => ({
    loc: `/articles/${a.slug}`,
    lastmod: iso(a.updated || a.date),
    priority: '0.8',
    changefreq: 'monthly',
}));

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entry = (r) =>
    `  <url>\n` +
    `    <loc>${escapeXml(SITE + r.loc)}</loc>\n` +
    `    <lastmod>${r.lastmod}</lastmod>\n` +
    `    <changefreq>${r.changefreq}</changefreq>\n` +
    `    <priority>${r.priority}</priority>\n` +
    `  </url>`;

const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...staticRoutes, ...essayRoutes].map(entry).join('\n') +
    `\n</urlset>\n`;

writeFileSync(out, xml, 'utf8');
console.log(`sitemap: ${staticRoutes.length} pages + ${published.length} free essays → ${path.relative(process.cwd(), out)}` +
    (articles.length - published.length ? ` (${articles.length - published.length} gated or unpublished omitted)` : ''));
