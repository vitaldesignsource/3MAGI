#!/usr/bin/env node
// Validates The Powers portal before it can be built. Same posture as the
// Christianities gate: mechanical checks that catch what a tired editor
// misses — a native name in the wrong script, a god born after his own cult
// site closed, a correspondence row that dodges a column, a Delphi plotted
// in the sea. Sections still unwritten are skipped; half-written ones fail.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { existsSync } from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const load = async (name) => {
    try { return (await import(path.join(web, 'src/data/powers', `${name}.js`))).default; }
    catch { return null; }
};

const errors = [];
const notes = [];
const fail = (m) => errors.push(m);
const wordCount = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

// Script identity: a `lang` tag names the writing system a native string must
// live in. Ranges are generous within the system and closed to look-alikes.
const BLOCKS = {
    cuneiform: [[0x12000, 0x123ff], [0x12400, 0x1247f]],
    hieroglyphic: [[0x13000, 0x1342f]],
    hebrew: [[0x0590, 0x05f4]],
    greek: [[0x0370, 0x03ff], [0x1f00, 0x1fff]],
    arabic: [[0x0600, 0x06ff], [0x0750, 0x077f]],
    devanagari: [[0x0900, 0x097f]],
    avestan: [[0x10b00, 0x10b3f]],
    cjk: [[0x4e00, 0x9fff], [0x3040, 0x30ff]],
    runic: [[0x16a0, 0x16ff]],
    latin: [[0x0041, 0x024f], [0x1e00, 0x1eff]],
};
const COMMON_OK = new Set([0x20, 0x27, 0x2019, 0x2d, 0xfe0e, 0x30fb]);
function checkScript(where, native, lang) {
    if (!native) return;
    const ranges = BLOCKS[lang];
    if (!ranges) { fail(`${where}: unknown lang tag "${lang}"`); return; }
    for (const ch of native) {
        const cp = ch.codePointAt(0);
        if (cp >= 0xd800 && cp <= 0xdfff) continue; // surrogate halves of astral chars
        if (COMMON_OK.has(cp)) continue;
        if (cp >= 0x0300 && cp <= 0x036f) continue; // combining marks
        if (!ranges.some(([a, b]) => cp >= a && cp <= b)) {
            fail(`${where}: "${native}" contains U+${cp.toString(16).toUpperCase()} "${ch}" — not ${lang}`);
        }
    }
}

const seenAll = new Map(); // slug → section, unique across the portal's doors
function uniq(section, slug) {
    if (seenAll.has(slug)) fail(`${section}/${slug}: slug already used in ${seenAll.get(slug)}`);
    seenAll.set(slug, section);
}

// --- hierarchies ------------------------------------------------------------
const hierarchies = await load('hierarchies');
if (hierarchies) {
    for (const e of hierarchies.entries) {
        const where = `hierarchies/${e.slug}`;
        uniq('hierarchies', e.slug);
        if (!e.exposition?.length) fail(`${where}: no exposition`);
        if (!e.source) fail(`${where}: a ladder with no source text`);
        if (e.image && !existsSync(path.join(web, 'public/media', e.image))) {
            fail(`${where}: image ${e.image} not in public/media`);
        }
        if (e.image && !e.imageAlt) fail(`${where}: entry image without alt text`);
        for (const r of e.ranks ?? []) {
            if (r.native && r.lang) checkScript(`${where} rank ${r.name}`, r.native, r.lang);
        }
    }
    notes.push(`hierarchies: ${hierarchies.entries.length}`);
}

// --- host -------------------------------------------------------------------
const host = await load('host');
if (host) {
    const groups = new Set(host.groups.map((g) => g.key));
    for (const e of host.entries) {
        const where = `host/${e.slug}`;
        uniq('host', e.slug);
        if (!groups.has(e.group)) fail(`${where}: unknown group "${e.group}"`);
        if (e.native) checkScript(where, e.native, e.lang);
        if (!e.attested) fail(`${where}: no attestation — a being needs its first appearance`);
    }
    for (const g of host.groups) {
        if (!host.entries.some((e) => e.group === g.key)) fail(`host: group "${g.key}" is empty`);
        if (g.image && !existsSync(path.join(web, 'public/media', g.image))) {
            fail(`host/${g.key}: group image ${g.image} not in public/media`);
        }
        if (g.image && !g.imageAlt) fail(`host/${g.key}: group image without alt text`);
    }
    for (const e of host.entries) {
        if (e.image && !existsSync(path.join(web, 'public/media', e.image))) {
            fail(`host/${e.slug}: image ${e.image} not in public/media`);
        }
        if (e.image && !e.imageAlt) fail(`host/${e.slug}: entry image without alt text`);
    }
    notes.push(`host: ${host.entries.length} in ${host.groups.length} companies`);
}

// --- pantheons --------------------------------------------------------------
const pantheons = await load('pantheons');
if (pantheons) {
    const groups = new Set(pantheons.groups.map((g) => g.key));
    for (const e of pantheons.entries) {
        const where = `pantheons/${e.slug}`;
        uniq('pantheons', e.slug);
        if (!groups.has(e.group)) fail(`${where}: unknown pantheon "${e.group}"`);
        if (e.native) checkScript(where, e.native, e.lang);
        if (!e.domain) fail(`${where}: a deity with no stated domain`);
    }
    for (const g of pantheons.groups) {
        if (!pantheons.entries.some((e) => e.group === g.key)) fail(`pantheons: "${g.key}" is empty`);
        if (g.image && !existsSync(path.join(web, 'public/media', g.image))) {
            fail(`pantheons/${g.key}: group image ${g.image} not in public/media`);
        }
        if (g.image && !g.imageAlt) fail(`pantheons/${g.key}: group image without alt text`);
    }
    notes.push(`pantheons: ${pantheons.entries.length} deities in ${pantheons.groups.length} families`);
}

// --- correspondences: every pantheon answers every office -------------------
const corr = await load('correspondences');
if (corr) {
    const roleKeys = corr.roles.map((r) => r.key);
    for (const p of corr.pantheons) {
        for (const rk of roleKeys) {
            const c = p.cells[rk];
            if (c === undefined) fail(`correspondences/${p.key}: no cell for "${rk}" — use name "—" with a note if the office is genuinely absent`);
            else if (c && !c.name) fail(`correspondences/${p.key}.${rk}: cell without a name`);
        }
        for (const extra of Object.keys(p.cells)) {
            if (!roleKeys.includes(extra)) fail(`correspondences/${p.key}: unknown office "${extra}"`);
        }
    }
    if (corr.image && !existsSync(path.join(web, 'public/media', corr.image))) {
        fail(`correspondences: image ${corr.image} not in public/media`);
    }
    if (corr.image && !corr.imageAlt) fail('correspondences: image without alt text');
    notes.push(`correspondences: ${corr.pantheons.length} × ${roleKeys.length}`);
}

// --- daimons ----------------------------------------------------------------
const daimons = await load('daimons');
if (daimons) {
    for (const e of daimons.entries) {
        uniq('daimons', e.slug);
        if (!e.source) fail(`daimons/${e.slug}: no source`);
        if (!e.exposition?.length) fail(`daimons/${e.slug}: no exposition`);
        if (e.image && !existsSync(path.join(web, 'public/media', e.image))) {
            fail(`daimons/${e.slug}: image ${e.image} not in public/media`);
        }
        if (e.image && !e.imageAlt) fail(`daimons/${e.slug}: image without alt text`);
    }
    notes.push(`daimons: ${daimons.entries.length}`);
}

// --- the middle world table -------------------------------------------------
const middleworld = await load('middleworld');
if (middleworld) {
    const qkeys = middleworld.questions.map((q) => q.key);
    const seen = new Set();
    for (const t of middleworld.traditions) {
        const where = `middleworld/${t.key}`;
        if (seen.has(t.key)) fail(`${where}: duplicate key`);
        seen.add(t.key);
        if (!t.era) fail(`${where}: no era`);
        for (const qk of qkeys) {
            const c = t.cells[qk];
            if (!c || !['yes', 'no', 'q'].includes(c.v)) {
                fail(`${where}: no answer to "${qk}" — a row that dodges a question is not a comparison`);
            } else if (c.v === 'q' && !c.note) {
                fail(`${where}: "${qk}" is qualified with no note saying how`);
            }
        }
        for (const extra of Object.keys(t.cells)) {
            if (!qkeys.includes(extra)) fail(`${where}: answers unknown question "${extra}"`);
        }
    }
    notes.push(`middleworld: ${middleworld.traditions.length} × ${qkeys.length}`);
}

// --- words ------------------------------------------------------------------
const words = await load('words');
if (words) {
    for (const w of words.entries) {
        uniq('words', w.slug);
        checkScript(`words/${w.slug}`, w.native, w.lang);
        if (!w.story || wordCount(w.story) < 12) fail(`words/${w.slug}: the story is too thin`);
    }
    notes.push(`words: ${words.entries.length}`);
}

// --- texts ------------------------------------------------------------------
const texts = await load('texts');
if (texts) {
    for (const e of texts.entries) {
        uniq('texts', e.slug);
        if (e.native) checkScript(`texts/${e.slug}`, e.native, e.lang);
        if (!e.dating) fail(`texts/${e.slug}: no dating line`);
        if (!e.access) fail(`texts/${e.slug}: says nothing about where to read it`);
    }
    notes.push(`texts: ${texts.entries.length}`);
}

// --- map: fixed places must be where they are -------------------------------
const ANCHORS = {
    uruk: [31.32, 45.64], nippur: [32.13, 45.23], babylon: [32.54, 44.42],
    heliopolis: [30.13, 31.31], karnak: [25.72, 32.66], philae: [24.03, 32.88],
    delphi: [38.48, 22.50], dodona: [39.55, 20.79], eleusis: [38.04, 23.54],
    olympia: [37.64, 21.63], delos: [37.40, 25.27], ephesus: [37.94, 27.34],
    ugarit: [35.60, 35.78], jerusalem: [31.78, 35.22], qumran: [31.74, 35.46],
    uppsala: [59.90, 17.63], 'ile-ife': [7.48, 4.56], ise: [34.46, 136.72],
    teotihuacan: [19.69, -98.84], varanasi: [25.32, 83.01],
};
const mapsites = await load('mapsites');
if (mapsites) {
    for (const s of mapsites.sites) {
        const where = `map/${s.slug}`;
        uniq('map', s.slug);
        if (!(s.lat >= -90 && s.lat <= 90) || !(s.lon >= -180 && s.lon <= 180)) {
            fail(`${where}: off the planet (${s.lat}, ${s.lon})`);
        }
        if (s.to != null && s.to < s.from) fail(`${where}: ends before it begins`);
        const key = Object.keys(ANCHORS).find((k) => s.slug === k || s.name.toLowerCase().includes(k));
        if (key) {
            const [alat, alon] = ANCHORS[key];
            const d = Math.max(Math.abs(s.lat - alat), Math.abs(s.lon - alon));
            if (d > 0.5) fail(`${where}: plotted ${d.toFixed(2)}° from ${key}'s true position`);
        }
        for (const e of s.events ?? []) {
            if (e.year < s.from - 1 || (s.to != null && e.year > s.to + 1)) {
                fail(`${where}: event ${e.year} outside span ${s.from}–${s.to ?? 'today'}`);
            }
        }
    }
    notes.push(`map: ${mapsites.sites.length} sites`);
}

// --- timeline ---------------------------------------------------------------
const timeline = await load('timeline');
if (timeline) {
    let prev = -Infinity;
    for (const e of timeline.events) {
        if (!Number.isInteger(e.year)) fail(`timeline/${e.slug}: non-integer year`);
        if (e.year < prev) fail(`timeline/${e.slug}: out of order`);
        prev = e.year;
        if (!e.dating) fail(`timeline/${e.slug}: no dating note — every date here carries its argument`);
    }
    notes.push(`timeline: ${timeline.events.length} events, all dated with notes`);
}

// --- report -----------------------------------------------------------------
const present = [hierarchies, host, pantheons, corr, daimons, middleworld, words, texts, mapsites, timeline]
    .filter(Boolean).length;
if (present === 0) { console.log('powers: scaffolded, awaiting content'); process.exit(0); }
if (errors.length) {
    console.error(`\npowers: ${errors.length} error(s) — build stopped\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
console.log(`powers: ${present}/10 sections — ${notes.join(' · ')} — validated`);
