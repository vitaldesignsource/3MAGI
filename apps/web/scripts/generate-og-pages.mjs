/**
 * generate-og-pages.mjs
 * Generates static HTML files at dist/apps/web/articles/[slug]/index.html for
 * every article, based on the PRODUCTION built index.html (so the compiled
 * /assets/*.js and /assets/*.css are loaded, never /src/main.jsx).
 * Must run AFTER `vite build`. Each file includes the correct Open Graph / Twitter Card meta tags
 * so social-media crawlers (which don't run JavaScript) can read them.
 *
 * The file also includes the standard SPA bootstrap so React hydrates normally
 * for human visitors.
 *
 * Run:  node scripts/generate-og-pages.mjs
 * Also called automatically via the "pregenerate" hook in package.json.
 */

import { createRequire } from 'module';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '..');

// ── Load articles data ────────────────────────────────────────────────────
// articles.js is a plain ESM file with no external imports.
// We transform the named export into something Node can evaluate.
const articlesPath = path.join(webRoot, 'src/data/articles.js');
let src = readFileSync(articlesPath, 'utf-8');

// Strip the leading CDN const so the module evaluates cleanly.
// (It only uses a const for an asset prefix — not needed for meta generation.)
// Then load with a data: URL import so we avoid node_modules resolution.
const dataUrl =
  'data:text/javascript,' + encodeURIComponent(src);

const { articles } = await import(dataUrl);

// ── Config ────────────────────────────────────────────────────────────────
const SITE_URL = 'https://threemagipress.com';
const SITE_NAME = 'The Third Lamp';
const DEFAULT_IMAGE =
  'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/third-lamp-og-default.png';

// Per-article overrides for image / description when the editorial team
// supplies specific social-share assets (add more entries here as needed).
const ARTICLE_OVERRIDES = {
  'myth-is-more-real-than-facts': {
    image: 'https://images.hostinger.com/43736854-4715-4b1f-9ad2-689cce643c6c.png',
    imageWidth: '1344',
    imageHeight: '768',
    imageType: 'image/png',
    description:
      'Modernity did not destroy myth—it simply forgot that it was still making it. Jaime Paul Lamb explores mythopoeia, archetypalization, and the sacred mechanics of meaning-making.',
    twitterDescription:
      'Jaime Paul Lamb explores mythopoeia, archetypalization, and the sacred mechanics of meaning-making.',
  },
};

// ── HTML template ─────────────────────────────────────────────────────────
function escape(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(article) {
  const override = ARTICLE_OVERRIDES[article.slug] || {};

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;
  const title = `${escape(article.title)}${article.subtitle ? ': ' + escape(article.subtitle) : ''} | ${SITE_NAME}`;
  const description = escape(
    override.description || article.dek || `${article.title} — ${SITE_NAME}`
  );
  const twitterDescription = escape(
    override.twitterDescription ||
      override.description ||
      article.dek ||
      `${article.title} — ${SITE_NAME}`
  );
  const image =
    override.image ||
    article.heroImage ||
    article.image ||
    DEFAULT_IMAGE;
  const imageAlt = escape(
    article.imageAlt || `${article.title}${article.byline ? ' by ' + article.byline : ''}`
  );
  const imageWidth = override.imageWidth || '';
  const imageHeight = override.imageHeight || '';
  const imageType = override.imageType || 'image/jpeg';

  return `
    <!-- Primary meta -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escape(article.title)}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${image}" />${imageWidth ? `\n    <meta property="og:image:width" content="${imageWidth}" />` : ''}${imageHeight ? `\n    <meta property="og:image:height" content="${imageHeight}" />` : ''}
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:alt" content="${imageAlt}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(article.title)}" />
    <meta name="twitter:description" content="${twitterDescription}" />
    <meta name="twitter:image" content="${image}" />
`;
}

// ── Generate files ────────────────────────────────────────────────────────
const distDir = path.resolve(webRoot, '../../dist/apps/web');
const shellPath = path.join(distDir, 'index.html');

let shell;
try {
  shell = readFileSync(shellPath, 'utf-8');
} catch {
  console.warn('[generate-og-pages] No built index.html found at ' + shellPath + ' — skipping.');
  process.exit(0);
}

if (shell.includes('/src/main.jsx')) {
  console.warn('[generate-og-pages] Built shell still references /src/main.jsx — skipping.');
  process.exit(0);
}

// Strip any existing title / description / canonical / og / twitter tags from
// the shell so the per-article metadata is the only one present.
function cleanShell(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, '');
}

const baseShell = cleanShell(shell);
let count = 0;

for (const article of articles) {
  if (!article.slug) continue;
  const meta = buildHtml(article);
  const html = baseShell.replace(/<\/head>/i, `${meta}  </head>`);
  const dir = path.join(distDir, 'articles', article.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  count++;
}

console.log(`[generate-og-pages] Generated ${count} article HTML files in dist/apps/web/articles/`);
