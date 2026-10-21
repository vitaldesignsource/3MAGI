// Compare traced glyphs with the source letters they were traced from.
//
//   node compare.mjs <glyphs.json> <out.png> [--cols 6] [--title "…"]
//
// Each letter in <glyphs.json> may carry `cell`: the path of a SQUARE crop of
// that one letter from the source plate, framed so that the crop maps onto the
// glyph's 0–100 viewBox (the letter body inside x 10–90, y 15–85, as drawn).
// Every card shows three panels: the source cell, the traced glyph, and the
// glyph in red over the cell (greyed), so a misplaced stroke, a missing ring,
// a mirrored form or a wrong proportion shows at a glance. A filled glyph is
// laid over its cell as a translucent fill edged with a hairline.
import fs from 'node:fs';
import path from 'node:path';
import pw from '/opt/node22/lib/node_modules/playwright/index.js';

const [file, out, ...rest] = process.argv.slice(2);
if (!file || !out) { console.error('usage: node compare.mjs <glyphs.json> <out.png> [--cols 6] [--title "…"]'); process.exit(2); }
const opt = (k, d) => { const i = rest.indexOf(k); return i >= 0 ? rest[i + 1] : d; };
const set = JSON.parse(fs.readFileSync(file, 'utf8'));
const cols = Number(opt('--cols', 6));
const title = opt('--title', set.title || set.slug || '');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const S = 140;

// A filled glyph is drawn as its filled outline; over the source (`over`) it
// is a translucent fill with its edge in a hairline, so the ink beneath shows
// through and an edge that strays from the ink's edge is seen at once.
const shapes = (g, colour, over = false) => {
    if (!g) return '';
    if (typeof g.fill === 'string') {
        return over
            ? `<path d="${esc(g.fill)}" fill="${colour}" fill-opacity=".45" fill-rule="evenodd" stroke="${colour}" stroke-width=".35" stroke-linejoin="round"/>`
            : `<path d="${esc(g.fill)}" fill="${colour}" fill-rule="evenodd"/>`;
    }
    const rings = (g.rings ?? []).map(([x, y, r = 6]) => `<circle cx="${x}" cy="${y}" r="${r}" stroke-width="3.6"/>`).join('');
    const dots = (g.dots ?? []).map(([x, y, r = 2.6]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${colour}" stroke="none"/>`).join('');
    return `<g fill="none" stroke="${colour}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><path d="${esc(g.d)}"/>${rings}${dots}</g>`;
};
const dataUrl = (p) => {
    try {
        const abs = path.isAbsolute(p) ? p : path.resolve(path.dirname(file), p);
        const ext = path.extname(abs).slice(1).toLowerCase().replace('jpg', 'jpeg');
        return `data:image/${ext};base64,${fs.readFileSync(abs).toString('base64')}`;
    } catch { return null; }
};
const cards = set.letters.map((l) => {
    const img = l.cell ? dataUrl(l.cell) : null;
    const cell = img ? `<image href="${img}" x="0" y="0" width="100" height="100" preserveAspectRatio="none"/>` : '<text x="50" y="54" text-anchor="middle" font-size="10" fill="#8a7650">no cell</text>';
    const grey = img ? `<image href="${img}" x="0" y="0" width="100" height="100" preserveAspectRatio="none" style="filter:grayscale(1) contrast(.8) brightness(1.15)" opacity=".55"/>` : '';
    const panel = (inner, bg) => `<svg width="${S}" height="${S}" viewBox="0 0 100 100" style="background:${bg}">${inner}<rect x="10" y="15" width="80" height="70" fill="none" stroke="#c9a86a" stroke-width=".4" stroke-dasharray="2 2" opacity=".6"/></svg>`;
    return `<div class="card">
      <div class="row">${panel(cell, '#fff')}${panel(shapes(l.glyph, '#1a1410'), '#f4ecd8')}${panel(grey + shapes(l.glyph, 'rgba(200,20,20,.75)', true), '#fff')}</div>
      <div class="nm">${esc(l.order)}. ${esc(l.name)} <span class="v">${esc(l.value)}</span> <span class="cf cf-${esc(l.formConfidence)}">${esc(l.formConfidence)}</span></div>
      ${l.strokes ? `<div class="st">${esc(l.strokes)}</div>` : ''}
    </div>`;
}).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{margin:0;background:#0d0b0a;color:#ecd9ae;font:13px Georgia,serif;padding:20px}
  h1{font:600 20px Georgia,serif;margin:0 0 4px;color:#c9a86a}.sub{color:#8a7650;margin:0 0 14px}
  .grid{display:grid;grid-template-columns:repeat(${cols},${3 * S + 24}px);gap:12px}
  .card{border:1px solid #3a3023;padding:6px;background:#14110e}.row{display:flex;gap:4px}
  .nm{margin-top:5px}.v{color:#c9a86a}.st{color:#a8987a;font-size:11px;margin-top:2px}
  .cf{font-size:10px;letter-spacing:.08em;text-transform:uppercase;margin-left:6px}.cf-high{color:#9fc28a}.cf-medium{color:#d9b25f}.cf-low{color:#d9806a}
</style></head><body><h1>${esc(title)}</h1><p class="sub">source cell · traced glyph · glyph (red) over the source</p><div class="grid">${cards}</div></body></html>`;

const b = await pw.chromium.launch();
const p = await b.newPage({ viewport: { width: 40 + cols * (3 * S + 36), height: 600 } });
await p.setContent(html, { waitUntil: 'load' });
await p.screenshot({ path: out, fullPage: true });
await b.close();
console.log(`wrote ${out}`);
