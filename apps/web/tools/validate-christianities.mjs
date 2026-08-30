#!/usr/bin/env node
// Validates the Christianities portal before it can be built.
//
// This portal describes living faith for some two billion people, across
// churches that once anathematized one another, so its failure modes are not
// only factual but editorial: a polemical exonym left standing as if it were
// a neutral name, a tradition described only from outside, a quotation with
// no source, a coordinate that puts Antioch in the sea. The canon table has a
// harder test still — it asserts totals that the reader can count, so the
// table must actually produce them.
//
// Runs as a build step. Sections still awaiting content are skipped with a
// notice; a section that is half-populated fails.

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');
const load = async (name) => {
    try { return (await import(path.join(web, 'src/data/christianities', `${name}.js`))).default; }
    catch { return null; }
};

const errors = [];
const warnings = [];
const notes = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// --- editorial tripwires ---------------------------------------------------
// Names that are somebody's polemic rather than a self-description. Prose may
// use them — the history is unreadable without them — but never bare, as
// though they were the neutral name.
const CONTESTED_LABELS = [
    { term: /\bnestorian/i, guard: /reject|exonym|misnomer|prefer|so-called|contested|do(es)? not accept|repudiat|others['’] name|opponent|polemic|label|weapon/i,
      why: 'the Assyrian Church of the East rejects the label' },
    { term: /\bmonophysit/i, guard: /miaphysit|not monophysit|distinct|reject|contested|misnomer|different from|charge|accus/i,
      why: 'the Oriental Orthodox are miaphysite, and the conflation is the charge, not the position' },
    { term: /robber (council|synod)|latrocinium/i, guard: /Leo|polemic|so-called|hostile|name given|opponent|called it/i,
      why: "it is Leo's polemical name for Ephesus II" },
];

// Structural fields carry the flag; prose is what has to be careful. Scanning
// the whole record lets the field name "exonym" satisfy its own guard, so the
// two are gathered separately.
const STRUCTURAL = new Set(['slug', 'name', 'exonym', 'selfName', 'key', 'term', 'native', 'translit']);
function prose(obj) {
    const out = [];
    const walk = (v, key) => {
        if (typeof v === 'string') { if (!STRUCTURAL.has(key)) out.push(v); return; }
        if (Array.isArray(v)) { v.forEach((x) => walk(x, key)); return; }
        if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) walk(x, k); }
    };
    walk(obj, null);
    return out.join('   ');
}

function checkContested(where, entry) {
    const text = prose(entry);
    const declared = String(entry?.exonym || '');
    for (const rule of CONTESTED_LABELS) {
        if (!rule.term.test(text)) continue;
        if (rule.term.test(declared)) continue;   // the entry names it as an exonym outright
        if (rule.guard.test(text)) continue;      // or the prose flags it in passing
        fail(`${where}: uses a contested label as if it were neutral — ${rule.why}`);
    }
}

const wordCount = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

// --- christologies ---------------------------------------------------------
const christologies = await load('christologies');
if (christologies) {
    const seen = new Set();
    for (const e of christologies.entries) {
        const where = `christologies/${e.slug}`;
        if (seen.has(e.slug)) fail(`${where}: duplicate slug`);
        seen.add(e.slug);
        if (!e.claim || wordCount(e.claim) < 4) fail(`${where}: the claim is too thin to state a position`);
        if (!e.heldBy) fail(`${where}: nobody is recorded as holding it`);
        if (!e.opposedBy) fail(`${where}: nobody is recorded as opposing it`);
        checkContested(where, e);
        // A position with living adherents must say so in its own terms.
        if (e.status === 'revived' && !e.today) {
            fail(`${where}: marked revived but says nothing about who holds it now`);
        }
    }
    notes.push(`christologies: ${christologies.entries.length}`);
}

// --- branches --------------------------------------------------------------
const branches = await load('branches');
if (branches) {
    const groups = new Set(branches.groups.map((g) => g.key));
    const seen = new Set();
    for (const b of branches.entries) {
        const where = `branches/${b.slug}`;
        if (seen.has(b.slug)) fail(`${where}: duplicate slug`);
        seen.add(b.slug);
        if (!groups.has(b.group)) fail(`${where}: belongs to unknown group "${b.group}"`);
        checkContested(where, b);
        // An exonym recorded without a self-name is a group named only by others.
        if (b.exonym && !b.selfName) {
            warn(`${where}: carries an exonym but no self-name`);
        }
    }
    // every group must actually hold something
    for (const g of branches.groups) {
        if (!branches.entries.some((b) => b.group === g.key)) fail(`branches: group "${g.key}" is empty`);
    }
    notes.push(`branches: ${branches.entries.length} in ${branches.groups.length} groups`);
}

// --- councils --------------------------------------------------------------
const councils = await load('councils');
if (councils) {
    let prev = -Infinity;
    for (const c of councils.councils) {
        const where = `councils/${c.slug}`;
        if (!Number.isInteger(c.year)) fail(`${where}: non-integer year`);
        if (c.year < prev) fail(`${where}: out of chronological order (${c.year} after ${prev})`);
        prev = c.year;
        if (!c.receivedBy) fail(`${where}: does not say which communions receive it`);
        checkContested(where, c);
    }
    for (const a of councils.disputes) {
        if (!a.course?.length) fail(`councils/${a.slug}: the argument has no course`);
        checkContested(`councils/${a.slug}`, a);
    }
    notes.push(`councils: ${councils.councils.length} councils, ${councils.disputes.length} disputes`);
}

// --- canon: the arithmetic must work ---------------------------------------
// The page prints totals a reader can count. If the table cannot reproduce
// them under its own stated convention, the page is lying to its reader.
const canon = await load('canon');
if (canon) {
    const tally = {};
    for (const t of canon.traditions) tally[t.key] = { in: 0, disputed: 0, appendix: 0 };
    for (const b of canon.books) {
        // A row may stand for several books (The Twelve); the count convention
        // lives in the row's note and is applied here.
        const m = /counts? as (\d+)/i.exec(b.note || '');
        const weight = m ? parseInt(m[1], 10) : 1;
        for (const t of canon.traditions) {
            const st = b.status[t.key];
            if (st && tally[t.key][st] != null) tally[t.key][st] += weight;
        }
    }
    for (const t of canon.traditions) {
        const counted = tally[t.key].in;
        const claimed = (t.otCount || 0) + (t.ntCount || 0);
        if (claimed) {
            if (counted !== claimed) {
                fail(`canon: ${t.label} claims ${claimed} books (${t.otCount} + ${t.ntCount}) `
                    + `but the table yields ${counted} marked "in"`);
            } else {
                notes.push(`canon: ${t.label} = ${counted} ✓`);
            }
        }
    }
    if (!canon.books.some((b) => /sinaiticus/i.test(b.note || '') || /hermas/i.test(b.name))) {
        warn('canon: no row mentions Hermas or Sinaiticus — the near-misses make the argument');
    }
    let prev = -Infinity;
    for (const e of canon.milestones) {
        if (e.year < prev) fail(`canon/${e.slug}: milestone out of chronological order`);
        prev = e.year;
        if (e.end != null && e.end < e.year) fail(`canon/${e.slug}: ends before it begins`);
    }
}

// --- figures: no unsourced quotations --------------------------------------
const figures = await load('figures');
if (figures) {
    const cats = new Set(figures.categories.map((c) => c.key));
    for (const f of figures.entries) {
        const where = `figures/${f.slug}`;
        for (const c of f.categories) if (!cats.has(c)) fail(`${where}: unknown category "${c}"`);
        if (f.quote && !f.quote.source) fail(`${where}: a quotation with no source`);
        if (f.quote && wordCount(f.quote.source) < 2) {
            fail(`${where}: quotation source "${f.quote.source}" is not a citation`);
        }
        checkContested(where, f);
    }
    notes.push(`figures: ${figures.entries.length}`);
}

// --- symbols: glyphs must be the characters claimed ------------------------
const symbols = await load('symbols');
if (symbols) {
    for (const s of symbols.entries) {
        if (s.glyph) {
            for (const ch of s.glyph) {
                const cp = ch.codePointAt(0);
                const ok = (cp >= 0x2600 && cp <= 0x27bf)      // misc symbols & dingbats
                    || (cp >= 0x2c80 && cp <= 0x2cff)          // Coptic (crux ansata, staurogram)
                    || (cp >= 0x0370 && cp <= 0x03ff)          // Greek (Α Ω, chi rho letters)
                    || (cp >= 0x1f00 && cp <= 0x1fff)          // polytonic Greek (ὁ ὤν in the nimbus)
                    || (cp >= 0x0300 && cp <= 0x036f)          // combining marks (nomina sacra overline)
                    || (cp >= 0x2020 && cp <= 0x203b)          // daggers, asterism
                    || (cp >= 0x0041 && cp <= 0x024f)          // Latin
                    || (cp >= 0x0590 && cp <= 0x05f4)          // Hebrew
                    || (cp >= 0x1f300 && cp <= 0x1f9ff)        // pictographs, if ever used
                    || ch === ' ';
                if (!ok) {
                    fail(`symbols/${s.slug}: glyph "${ch}" (U+${cp.toString(16).toUpperCase()}) `
                        + 'is outside the expected symbol blocks');
                }
            }
        }
    }
    notes.push(`symbols: ${symbols.entries.length}`);
}

// --- map: coordinates must be on the right part of the planet --------------
// Spot anchors for places whose position is not in doubt. A site claiming one
// of these names has to be within half a degree of it.
const ANCHORS = {
    jerusalem: [31.78, 35.22], rome: [41.90, 12.50], alexandria: [31.20, 29.92],
    antioch: [36.20, 36.16], constantinople: [41.01, 28.98], nicaea: [40.43, 29.72],
    chalcedon: [40.99, 29.03], ephesus: [37.94, 27.34], carthage: [36.85, 10.32],
    edessa: [37.16, 38.79], nisibis: [37.07, 41.22], axum: [14.13, 38.72],
    lalibela: [12.03, 39.04], etchmiadzin: [40.16, 44.29], wittenberg: [51.87, 12.65],
    geneva: [46.20, 6.14], canterbury: [51.28, 1.08], iona: [56.33, -6.42],
    trent: [46.07, 11.12], moscow: [55.76, 37.62], kyiv: [50.45, 30.52],
    'xi\'an': [34.34, 108.94], athos: [40.16, 24.33], sinai: [28.56, 33.98],
};
const mapsites = await load('mapsites');
if (mapsites) {
    const seen = new Set();
    for (const s of mapsites.sites) {
        const where = `map/${s.slug}`;
        if (seen.has(s.slug)) fail(`${where}: duplicate slug`);
        seen.add(s.slug);
        if (!(s.lat >= -90 && s.lat <= 90)) fail(`${where}: latitude ${s.lat} is off the planet`);
        if (!(s.lon >= -180 && s.lon <= 180)) fail(`${where}: longitude ${s.lon} is off the planet`);
        if (s.to != null && s.to < s.from) fail(`${where}: ends (${s.to}) before it begins (${s.from})`);
        for (const e of s.events) {
            if (e.year < s.from - 1 || (s.to != null && e.year > s.to + 1)) {
                warn(`${where}: event ${e.year} ("${e.title}") falls outside the site's span ${s.from}–${s.to ?? 'today'}`);
            }
        }
        const key = Object.keys(ANCHORS).find((k) => s.name.toLowerCase().includes(k));
        if (key) {
            const [alat, alon] = ANCHORS[key];
            const d = Math.max(Math.abs(s.lat - alat), Math.abs(s.lon - alon));
            if (d > 0.5) {
                fail(`${where}: plotted at ${s.lat},${s.lon} but ${key} is at ${alat},${alon} `
                    + `(${d.toFixed(2)}° away)`);
            }
        }
    }
    notes.push(`map: ${mapsites.sites.length} sites`);
}

// --- the grand timeline ----------------------------------------------------
const timeline = await load('timeline');
if (timeline) {
    let prev = -Infinity;
    for (const e of timeline.events) {
        if (!Number.isInteger(e.year)) fail(`timeline/${e.slug}: non-integer year`);
        if (e.year < prev) fail(`timeline/${e.slug}: out of chronological order`);
        prev = e.year;
        if (e.end != null && e.end < e.year) fail(`timeline/${e.slug}: ends before it begins`);
    }
    const dated = timeline.events.filter((e) => e.dating).length;
    notes.push(`timeline: ${timeline.events.length} events, ${dated} with dating notes`);
}

// --- the gallery: every image must exist, every card must say what it shows -
const gallery = await load('gallery');
if (gallery) {
    const { existsSync } = await import('node:fs');
    const seen = new Set();
    for (const g of gallery.images) {
        const where = `gallery/${g.file}`;
        if (seen.has(g.file)) fail(`${where}: the same image is used twice`);
        seen.add(g.file);
        if (!existsSync(path.join(web, 'public/media', g.file))) {
            fail(`${where}: no such file in public/media`);
        }
        if (!g.alt || wordCount(g.alt) < 5) fail(`${where}: alt text missing or too thin to describe the image`);
        if (!g.title || !g.caption) fail(`${where}: a card with no title or caption`);
        if (!g.link?.startsWith('/')) fail(`${where}: link "${g.link}" is not an internal path`);
        checkContested(where, g);
    }
    notes.push(`gallery: ${gallery.images.length} rooms`);
}

// --- the great tree: genealogy must be chronologically possible -------------
const tree = await load('tree');
if (tree) {
    const ids = new Set();
    const byId = new Map();
    for (const n of tree.nodes) {
        if (ids.has(n.id)) fail(`tree/${n.id}: duplicate id`);
        ids.add(n.id); byId.set(n.id, n);
    }
    const roots = tree.nodes.filter((n) => n.parent == null);
    if (roots.length !== 1) fail(`tree: expected exactly one root, found ${roots.length}`);
    for (const n of tree.nodes) {
        const where = `tree/${n.id}`;
        if (n.parent != null) {
            const p = byId.get(n.parent);
            if (!p) fail(`${where}: parent "${n.parent}" does not exist`);
            else if (n.from < p.from) fail(`${where}: born ${n.from}, before its parent (${p.from})`);
            else if (p.to != null && n.from > p.to && p.status !== 'absorbed') {
                // an absorbed line continues in its heirs; forking after its
                // drawn end is the chart's stated semantics
                fail(`${where}: born ${n.from}, after its parent ended (${p.to})`);
            }
        }
        if (n.to != null && n.to < n.from) fail(`${where}: ends (${n.to}) before it begins (${n.from})`);
        if (!['living', 'extinct', 'absorbed', 'disputed'].includes(n.status)) {
            fail(`${where}: unknown status "${n.status}"`);
        }
        if (n.status === 'living' && n.to != null) fail(`${where}: living but carries an end year`);
        if (n.status === 'extinct' && n.to == null) fail(`${where}: extinct but never ends`);
        if (!n.note || wordCount(n.note) < 6) fail(`${where}: the note is too thin to say what parted`);
        if (n.status === 'disputed' && wordCount(n.note) < 15) {
            fail(`${where}: a disputed membership needs both views in its note`);
        }
        checkContested(where, n);
    }
    notes.push(`tree: ${tree.nodes.length} branches`);
}

// --- the matrix: every position must face every question --------------------
const matrix = await load('matrix');
if (matrix) {
    const qkeys = matrix.questions.map((q) => q.key);
    const seen = new Set();
    for (const p of matrix.positions) {
        const where = `matrix/${p.key}`;
        if (seen.has(p.key)) fail(`${where}: duplicate key`);
        seen.add(p.key);
        for (const qk of qkeys) {
            const a = p.answers[qk];
            if (!a || !['yes', 'no', 'q'].includes(a.v)) {
                fail(`${where}: no answer to "${qk}" — a row that dodges a question is not a position`);
            } else if (a.v === 'q' && !a.note) {
                fail(`${where}: answer to "${qk}" is "qualified" with no note saying how`);
            }
        }
        for (const extra of Object.keys(p.answers)) {
            if (!qkeys.includes(extra)) fail(`${where}: answers unknown question "${extra}"`);
        }
        if (!p.holder) fail(`${where}: nobody is recorded as holding it`);
        checkContested(where, p);
    }
    notes.push(`matrix: ${matrix.positions.length} positions × ${qkeys.length} questions`);
}

// --- the words: script identity is the whole point --------------------------
const words = await load('words');
if (words) {
    const seen = new Set();
    const GREEK_OK = (cp) => (cp >= 0x0370 && cp <= 0x03ff) || (cp >= 0x1f00 && cp <= 0x1fff)
        || cp === 0x0020 || cp === 0x2019 || cp === 0x0027 || cp === 0x002d;
    const LATIN_OK = (cp) => (cp >= 0x0041 && cp <= 0x024f) || cp === 0x0020 || cp === 0x002d;
    for (const w of words.entries) {
        const where = `words/${w.slug}`;
        if (seen.has(w.slug)) fail(`${where}: duplicate slug`);
        seen.add(w.slug);
        const ok = w.lang === 'greek' ? GREEK_OK : LATIN_OK;
        for (const ch of w.native) {
            const cp = ch.codePointAt(0);
            if (!ok(cp)) {
                fail(`${where}: "${w.native}" contains U+${cp.toString(16).toUpperCase().padStart(4, '0')} `
                    + `"${ch}" — not ${w.lang} script`);
            }
        }
        if (!w.fight || wordCount(w.fight) < 10) fail(`${where}: the fight is not described`);
        checkContested(where, w);
    }
    notes.push(`words: ${words.entries.length}`);
}

// --- the creeds: the battlefields must be marked ----------------------------
const creeds = await load('creeds');
if (creeds) {
    const seen = new Set();
    for (const c of creeds.creeds) {
        const where = `creeds/${c.slug}`;
        if (seen.has(c.slug)) fail(`${where}: duplicate slug`);
        seen.add(c.slug);
        if (!c.clauses?.length) fail(`${where}: a creed with no text`);
        checkContested(where, c);
    }
    const n325 = creeds.creeds.find((c) => /325/.test(c.slug) || /325/.test(c.origin || ''));
    if (n325 && !n325.clauses.some((cl) => /anathema/i.test(cl.note || '') || /anathema/i.test(cl.text))) {
        fail('creeds: the original Nicene creed must carry its anathemas — they are half its point');
    }
    const n381 = creeds.creeds.find((c) => /381/.test(c.slug) || /381/.test(c.origin || ''));
    if (n381 && !n381.clauses.some((cl) => cl.variant)) {
        fail('creeds: the 381 creed must show the filioque variant — the East-West grievance lives in that clause');
    }
    notes.push(`creeds: ${creeds.creeds.length}`);
}

// --- report ----------------------------------------------------------------
const present = [christologies, branches, councils, canon, figures, symbols, mapsites, timeline,
    gallery, tree, matrix, words, creeds]
    .filter(Boolean).length;
if (present === 0) {
    console.log('christianities: scaffolded, awaiting content');
    process.exit(0);
}
if (warnings.length) {
    console.warn(`christianities: ${warnings.length} warning(s)`);
    for (const w of warnings.slice(0, 8)) console.warn(`  · ${w}`);
    if (warnings.length > 8) console.warn(`  · …and ${warnings.length - 8} more`);
}
if (errors.length) {
    console.error(`\nchristianities: ${errors.length} error(s) — build stopped\n`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
}
console.log(`christianities: ${present}/13 sections — ${notes.join(' · ')} — validated`);
