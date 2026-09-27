#!/usr/bin/env node
// Serialises gated essays to JSON for the private directory, and writes the
// manifest of gated slugs the client uses to know which essays to request
// from the server rather than expect in the bundle.
//
// This is what makes the paywall real. Essays under src/data/articles/ are
// bundled by Vite and world-readable; essays under src/data/articles/gated/
// are never imported by the client at all — they end up in dist/tl-essays/,
// which the deploy places ABOVE the document root where Apache cannot serve
// them. api/essay.php is the only way to read them.
//
// Runs AFTER `vite build`, not before: vite is configured with emptyOutDir,
// so anything written into the output directory beforehand is deleted by the
// build. Getting this order wrong ships a site where every gated essay 404s
// for the members who paid for it.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, '..');
const gatedDir = path.join(webRoot, 'src/data/articles/gated');
// Deployed INSIDE public_html because Hostinger's git deploy copies the branch
// there wholesale — so the directory carries its own .htaccess denying all web
// access, and PHP reads the files from disk rather than over HTTP. If the
// essays can instead be placed above the document root on a given host,
// _lib.php prefers that location automatically.
const outDir = path.resolve(webRoot, '../../dist/apps/web/tl-essays');

const { articles } = await import(path.join(webRoot, 'src/data/articles.js'));
const bySlug = new Map(articles.map((a) => [a.slug, a]));

mkdirSync(outDir, { recursive: true });

const files = readdirSync(gatedDir).filter((f) => f.endsWith('.js'));
const slugs = [];
let bytes = 0;

for (const file of files) {
    const slug = file.replace(/\.js$/, '');
    const meta = bySlug.get(slug);
    if (!meta) {
        throw new Error(`gated/${file} has no matching record in articles.js — the slug must exist in the index or the essay is unreachable`);
    }

    const mod = await import(path.join(gatedDir, file));
    const record = {
        slug,
        // Drafts are owner-preview-only; the rest are members-only. essay.php
        // needs to know which, because they get different status codes.
        comingSoon: Boolean(meta.comingSoon),
        content: mod.default || {},
    };

    const json = JSON.stringify(record);
    writeFileSync(path.join(outDir, `${slug}.json`), json, 'utf8');
    bytes += Buffer.byteLength(json);
    slugs.push(slug);
}

// Belt and braces: deny at the directory itself, so a mistake in the site-wide
// .htaccess cannot expose the essays on its own.
writeFileSync(path.join(outDir, '.htaccess'),
`# Gated essay bodies. Never served over HTTP — api/essay.php reads them from
# disk after checking the reader's pass. Denying here as well as site-wide so
# neither rule is load-bearing on its own.
<IfModule mod_authz_core.c>
  Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
  Order allow,deny
  Deny from all
</IfModule>
`, 'utf8');

console.log(`essays: ${slugs.length} gated -> tl-essays (${Math.round(bytes / 1024)}KB, web access denied), ${bySlug.size - slugs.length} free stay in the bundle`);
