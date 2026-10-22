// Render a glyph set as a specimen sheet PNG (see README.md).
import fs from 'node:fs';
import pw from '/opt/node22/lib/node_modules/playwright/index.js';

const [file, out, ...rest] = process.argv.slice(2);
if (!file || !out) { console.error('usage: node sheet.mjs <glyphs.json> <out.png> [--title "…"] [--cols 8]'); process.exit(2); }
const opt = (k, d) => { const i = rest.indexOf(k); return i >= 0 ? rest[i + 1] : d; };
const set = JSON.parse(fs.readFileSync(file, 'utf8'));
const cols = Number(opt('--cols', 8));
const title = opt('--title', set.title || set.slug || '');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const svg = (g, size) => {
    if (!g) return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="none" stroke="#6b5a3a" stroke-dasharray="4 4"/><text x="50" y="56" text-anchor="middle" font-size="12" fill="#8a7650">gap</text></svg>`;
    // a filled glyph: its outline filled, evenodd, no pen (README.md, "Filled glyphs")
    if (typeof g.fill === 'string') return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><path d="${esc(g.fill)}" fill="currentColor" fill-rule="evenodd"/></svg>`;
    const rings = (g.rings ?? []).map(([x, y, r = 6]) => `<circle cx="${x}" cy="${y}" r="${r}" stroke-width="3.6"/>`).join('');
    const dots = (g.dots ?? []).map(([x, y, r = 2.6]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`).join('');
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><path d="${esc(g.d)}"/>${rings}${dots}</svg>`;
};
const conf = { high: '#9fc28a', medium: '#d9b25f', low: '#d9806a' };
const cards = set.letters.map((l) => `
  <div class="card">
    <div class="box">${svg(l.glyph, 150)}</div>
    <div class="nm">${esc(l.order)}. ${esc(l.name)} <span class="v">${esc(l.value)}</span></div>
    <div class="cf" style="color:${conf[l.formConfidence] || '#ccc'}">${esc(l.formConfidence)}</div>
  </div>`).join('');
const line = (px) => set.letters.map((l) => svg(l.glyph, px)).join('<span style="display:inline-block;width:' + Math.round(px / 6) + 'px"></span>');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{margin:0;background:#0d0b0a;color:#ecd9ae;font:14px Georgia,serif;padding:24px}
  h1{font:600 22px Georgia,serif;letter-spacing:.06em;margin:0 0 16px;color:#c9a86a}
  .grid{display:grid;grid-template-columns:repeat(${cols},170px);gap:14px}
  .card{border:1px solid #3a3023;padding:8px;background:#14110e}
  .box{background:#0d0b0a;border:1px solid #2a2219;display:flex;justify-content:center;position:relative}
  .box:before{content:"";position:absolute;left:10%;right:10%;top:15%;bottom:15%;border:1px dashed #2c251b}
  .nm{margin-top:6px;font-size:13px}.v{color:#c9a86a;margin-left:4px}.cf{font-size:11px;letter-spacing:.08em;text-transform:uppercase}
  .row{margin-top:22px;color:#ecd9ae;line-height:1}.lab{color:#8a7650;font-size:12px;margin:18px 0 6px}
</style></head><body><h1>${esc(title)}</h1><div class="grid">${cards}</div>
<div class="lab">At text size (28 px)</div><div class="row">${line(28)}</div>
<div class="lab">Small (14 px)</div><div class="row">${line(14)}</div></body></html>`;

const b = await pw.chromium.launch();
const p = await b.newPage({ viewport: { width: 24 * 2 + cols * 184, height: 600 } });
await p.setContent(html);
await p.screenshot({ path: out, fullPage: true });
await b.close();
console.log(`wrote ${out}`);
