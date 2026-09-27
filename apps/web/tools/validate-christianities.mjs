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
import { existsSync } from 'node:fs';

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
        if (g.image && !existsSync(path.join(web, 'public/media', g.image))) {
            fail(`branches/${g.key}: group image ${g.image} not in public/media`);
        }
        if (g.image && !g.imageAlt) fail(`branches/${g.key}: group image without alt text`);
    }
    for (const b of branches.entries) {
        if (b.image && !existsSync(path.join(web, 'public/media', b.image))) {
            fail(`branches/${b.slug}: image ${b.image} not in public/media`);
        }
        if (b.image && !b.imageAlt) fail(`branches/${b.slug}: image without alt text`);
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
    // The table documents its own counting conventions in its notes, and the
    // check implements them:
    //   - the Jewish column follows the Hebrew bundling: Samuel, Kings,
    //     Chronicles and Ezra–Nehemiah are "counted once across these two
    //     rows", and The Twelve is one book of the twenty-four;
    //   - every Christian column counts The Twelve as twelve;
    //   - a row may declare it "stands for N books" (the Ethiopian
    //     church-order row stands for eight) or "counts as N";
    //   - a null otCount/ntCount is a count the tradition does not assert
    //     (the Church of the East states only its 22-book Peshitta NT),
    //     never a zero;
    //   - 'other'-section rows marked "in" count toward the NT, which is
    //     where the Ethiopian broader canon lives.
    const OT_SECTIONS = new Set(['torah', 'history', 'wisdom', 'prophets', 'deutero']);
    const NT_SECTIONS = new Set(['gospels', 'acts', 'pauline', 'catholic', 'apocalypse', 'other']);
    const SECOND_HALVES = new Set(['2 Samuel', '2 Kings', '2 Chronicles', 'Nehemiah']);
    const WORD_NUMS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
        eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 };
    const declaredWeight = (note) => {
        const m = /(?:stands for|counts? as) (\d+|[a-z]+)/i.exec(note || '');
        if (!m) return null;
        const v = parseInt(m[1], 10);
        return Number.isInteger(v) ? v : (WORD_NUMS[m[1].toLowerCase()] ?? null);
    };
    const tally = {};
    for (const t of canon.traditions) tally[t.key] = { ot: 0, nt: 0 };
    for (const b of canon.books) {
        const declared = declaredWeight(b.note);
        for (const t of canon.traditions) {
            if (b.status[t.key] !== 'in') continue;
            let w;
            if (t.key === 'jewish') {
                w = SECOND_HALVES.has(b.name) ? 0 : 1;
            } else if (/^The Twelve$/i.test(b.name)) {
                w = 12;
            } else {
                w = declared ?? 1;
            }
            if (OT_SECTIONS.has(b.section)) tally[t.key].ot += w;
            else if (NT_SECTIONS.has(b.section)) tally[t.key].nt += w;
            else fail(`canon/${b.name}: unknown section "${b.section}"`);
        }
    }
    for (const t of canon.traditions) {
        const bad = [];
        if (t.otCount != null && tally[t.key].ot !== t.otCount) {
            bad.push(`OT: claims ${t.otCount}, table yields ${tally[t.key].ot}`);
        }
        if (t.ntCount != null && tally[t.key].nt !== t.ntCount) {
            bad.push(`NT: claims ${t.ntCount}, table yields ${tally[t.key].nt}`);
        }
        if (bad.length) fail(`canon: ${t.label} — ${bad.join('; ')}`);
        else {
            const parts = [];
            if (t.otCount != null) parts.push(String(t.otCount));
            if (t.ntCount != null) parts.push(String(t.ntCount));
            notes.push(`canon: ${t.label} = ${parts.join('+')} ✓`);
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
        if (f.image && !existsSync(path.join(web, 'public/media', f.image))) {
            fail(`${where}: image ${f.image} not in public/media`);
        }
        if (f.image && !f.imageAlt) fail(`${where}: image without alt text`);
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
                    || cp === 0xfe0e               // text-presentation selector
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

// --- the versions: a shelf that must stay in order --------------------------
const bibles = await load('bibles');
if (bibles) {
    let prev = -Infinity;
    const seen = new Set();
    for (const v of bibles.versions) {
        const where = `bibles/${v.slug}`;
        if (seen.has(v.slug)) fail(`${where}: duplicate slug`);
        seen.add(v.slug);
        if (!Number.isInteger(v.year)) fail(`${where}: no sort year`);
        else if (v.year < prev) fail(`${where}: shelf out of chronological order (${v.year} after ${prev})`);
        if (Number.isInteger(v.year)) prev = v.year;
        if (!v.madeFrom) fail(`${where}: does not say what it was translated from — the question that decides the rest`);
        if (!v.standing) fail(`${where}: does not say where it stands`);
        checkContested(where, v);
    }
    notes.push(`bibles: ${bibles.versions.length} versions`);
}

// --- the inner tradition: reception is a field, not an opinion --------------
const esoteric = await load('esoteric');
if (esoteric) {
    const groups = new Set(esoteric.groups.map((g) => g.key));
    const seen = new Set();
    for (const e of esoteric.entries) {
        const where = `esoteric/${e.slug}`;
        if (seen.has(e.slug)) fail(`${where}: duplicate slug`);
        seen.add(e.slug);
        if (!groups.has(e.group)) fail(`${where}: unknown group "${e.group}"`);
        if (!e.claim || wordCount(e.claim) < 5) fail(`${where}: the claim is too thin to state a teaching`);
        if (!e.sources) fail(`${where}: no sources`);
        // the discipline that keeps this door honest: every current records what
        // the authorities actually did, so admiration cannot stand in for it
        if (!e.reception) {
            fail(`${where}: no reception — a current with no record of what the church did about it is advocacy, not history`);
        }
        if (!e.today) fail(`${where}: says nothing about where it stands now`);
        checkContested(where, e);
    }
    for (const g of esoteric.groups) {
        if (!esoteric.entries.some((e) => e.group === g.key)) fail(`esoteric: group "${g.key}" is empty`);
    }
    notes.push(`esoteric: ${esoteric.entries.length} in ${esoteric.groups.length} currents`);
}

// --- the gallery: every image must exist, every card must say what it shows -
const gallery = await load('gallery');
if (gallery) {
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

// --- the Rosicrucian page --------------------------------------------------
// Its own discipline, and a strict one, because a ledger is only worth having
// if every row is falsifiable: each claim carries a standing drawn from the
// declared key, and a verdict that says what the record actually shows.
const rosicrucian = await load('rosicrucian');
if (rosicrucian) {
    const keys = new Set((rosicrucian.standings ?? []).map((s) => s.key));
    if (keys.size < 2) fail('rosicrucian: the ledger needs a declared key of standings');
    const seen = new Set();
    for (const m of rosicrucian.manifestos ?? []) {
        const where = `rosicrucian/${m.slug}`;
        if (seen.has(m.slug)) fail(`${where}: duplicate slug`);
        seen.add(m.slug);
        for (const f of ['title', 'year', 'place', 'printer', 'language', 'says', 'authorship']) {
            if (!m[f]) fail(`${where}: no ${f}`);
        }
        checkContested(where, m);
    }
    // The six agreements are quoted primary text, and the hall's rule is that a
    // quotation says where its wording comes from. On this page the wording is
    // Vaughan's English of 1652; if the introduction stops saying so, the
    // quotations have lost their provenance and the section is passing one
    // translator's choices off as the Fama's own.
    const rules = rosicrucian.rules ?? [];
    if (rules.length) {
        const rIntro = [rosicrucian.rulesIntro ?? []].flat().join(' ');
        if (!/Vaughan|1652|translat/i.test(rIntro)) {
            fail('rosicrucian: the six agreements are quoted, and nothing says whose English they are quoted in');
        }
        const ns = rules.map((r) => r.n);
        if (JSON.stringify(ns) !== JSON.stringify(ns.map((_, i) => i + 1))) {
            fail(`rosicrucian: the agreements are not numbered 1..${rules.length}`);
        }
        for (const r of rules) {
            const where = `rosicrucian/rule ${r.n}`;
            if (!r.text) fail(`${where}: no text — the article itself is what is being printed`);
            // The article and the gloss are different kinds of writing and the
            // page keeps them in different fields for that reason. An article
            // with no gloss has been printed without being accounted for.
            if (!r.after || wordCount(r.after) < 15) fail(`${where}: says nothing about what became of it`);
            checkContested(where, r);
        }
    }

    // The furore. The ledger's last row rests on a count of books, and this is
    // where the books are named. The discipline is the balance: a reception
    // section carrying only the attacks is a debunk, and one carrying only the
    // defences is advertising. Both sides have to be on the shelf.
    const sides = new Set((rosicrucian.sides ?? []).map((x) => x.key));
    const furore = rosicrucian.furore ?? [];
    if (furore.length) {
        if (sides.size < 2) fail('rosicrucian: the furore needs a declared key of sides');
        for (const [i, b] of furore.entries()) {
            const where = `rosicrucian/furore[${i}] ${b.title || ''}`.trim();
            for (const f of ['year', 'author', 'title', 'note']) {
                if (!b[f]) fail(`${where}: no ${f}`);
            }
            if (!sides.has(b.side)) fail(`${where}: side "${b.side}" is not in the declared key`);
            if (wordCount(b.note) < 15) fail(`${where}: a book is listed without being accounted for`);
            checkContested(where, b);
        }
        const bySide = new Set(furore.map((b) => b.side));
        if (!bySide.has('for')) fail('rosicrucian: the furore lists no book written in the tradition\u2019s defence — that is a debunk, not a reception');
        if (!bySide.has('against')) fail('rosicrucian: the furore lists no book written against the tradition — that is advertising, not a reception');
    }

    // The descent chart. Its force is the empty column, and an empty column has
    // to be declared: a row may leave the record blank only by marking itself a
    // gap and saying what the gap is. And a chart that draws seventy years of
    // silence without saying what follows from it is innuendo, not an argument.
    const descent = rosicrucian.descent ?? [];
    let gaps = 0;
    for (const [i, r] of descent.entries()) {
        const where = `rosicrucian/descent[${i}] ${r.era || ''}`.trim();
        if (!r.era) fail(`${where}: no era`);
        // The section's own rule: the claim is given as its holders make it.
        if (!r.claimed || wordCount(r.claimed) < 8) fail(`${where}: the claim is not stated as its holders make it`);
        if (r.gap) gaps += 1;
        if (!r.documented && !(r.gap && r.note)) {
            fail(`${where}: the record column is empty and the row does not declare itself a gap and say what the gap is`);
        }
        if (r.documented && wordCount(r.documented) < 10) fail(`${where}: the record does not show its working`);
        checkContested(where, r);
    }
    if (gaps && !rosicrucian.descentCoda) {
        fail('rosicrucian: the descent chart draws a gap in the record and says nothing about what follows from it');
    }

    let sound = 0;
    for (const [i, row] of (rosicrucian.ledger ?? []).entries()) {
        const where = `rosicrucian/ledger[${i}]`;
        if (!row.claim || wordCount(row.claim) < 5) fail(`${where}: the claim is too thin to be checkable`);
        if (!keys.has(row.standing)) fail(`${where}: standing "${row.standing}" is not in the declared key`);
        if (!row.verdict || wordCount(row.verdict) < 12) {
            fail(`${where}: a verdict must show its working, not just rule`);
        }
        if (row.standing === 'sound') sound += 1;
        checkContested(where, row);
    }
    // The rule this page exists to keep. A ledger on an esoteric current that
    // refuses every claim is a debunk wearing a table's clothes; if nothing
    // the tradition says survives contact with the evidence, that is a sign
    // the evidence was not looked for.
    if ((rosicrucian.ledger ?? []).length && sound === 0) {
        fail('rosicrucian: every ledger row is against the tradition — a table with no sound row is a debunk, not a reckoning');
    }
    // The seven days, and the rule that keeps the reading honest. A day may
    // carry a quotation or not; what it may not do is carry one without saying
    // where the wording comes from, because on this page the difference between
    // quotation and summary is the whole discipline.
    const days = rosicrucian.days ?? [];
    if (days.length) {
        const nums = days.map((d) => d.n);
        if (JSON.stringify(nums) !== JSON.stringify(nums.map((_, i) => i + 1))) {
            fail(`rosicrucian: the days are not numbered 1..${days.length}`);
        }
        for (const d of days) {
            const where = `rosicrucian/day ${d.n}`;
            if (!d.title) fail(`${where}: no title`);
            if (!d.story || wordCount(d.story) < 20) fail(`${where}: the day is not told`);
            if (!d.work) fail(`${where}: says nothing about what the day is doing`);
            if (d.quote && !d.quote.note) fail(`${where}: a quotation with no note on where the wording comes from`);
            if (d.quote && !d.quote.text) fail(`${where}: an empty quotation`);
            checkContested(where, d);
        }
    }
    // The vault is a diagram of a text and the page has to keep saying so.
    const vault = rosicrucian.vault;
    if (vault) {
        if (vault.sides !== 7) fail('rosicrucian: the Fama gives the vault seven sides');
        if (!vault.parts?.length) fail('rosicrucian: the vault has no labelled parts');
        if (!/diagram of a text|not of an excavation|no such vault/i.test(vault.caption || '')) {
            fail('rosicrucian: the vault figure must say on its face that it diagrams a description — nothing of the kind has been found');
        }
        for (const ins of vault.inscriptions ?? []) {
            if (!ins.latin || !ins.english || !ins.where) fail('rosicrucian: an inscription needs its Latin, a translation and a location');
        }
    }
    for (const c of rosicrucian.chronology ?? []) {
        if (!c.year || !c.label) fail('rosicrucian: a chronology row needs a year and a label');
    }
    notes.push(`rosicrucian: ${(rosicrucian.manifestos ?? []).length} manifestos, ${rules.length} agreements, ${days.length} days (${days.filter((d) => d.quote).length} quoted), ${furore.length} books of the furore, ${(rosicrucian.ledger ?? []).length} ledger rows (${sound} sound), ${descent.length} descent rows (${gaps} gap), ${(rosicrucian.chronology ?? []).length} dated`);
}

// --- report ----------------------------------------------------------------
const SECTION_DATA = [christologies, branches, councils, canon, figures, symbols, mapsites, timeline,
    gallery, tree, matrix, words, creeds, esoteric, bibles, rosicrucian];
const TOTAL = SECTION_DATA.length;
const present = SECTION_DATA.filter(Boolean).length;
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
console.log(`christianities: ${present}/${TOTAL} sections — ${notes.join(' · ')} — validated`);
