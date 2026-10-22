import React from 'react';

// Inline typography for the Christianities prose, in the house register the
// magazine already speaks: gold italic for terms of art (homoousios, the
// Filioque), plain italic for works (the Didache, the Septuagint), bold for
// the first appearance of a keystone name in a block. The datasets are
// fact-checked plain text and stay that way — this layer wraps spans around
// the verified strings and never rewrites them. It also honours explicit
// **bold** and *italic* markers, so future authored copy can mark itself.

// --- the lexicon -----------------------------------------------------------
// Order inside each list is irrelevant; the compiler sorts longest-first so
// "mia physis" wins over "physis" and "sola scriptura" over nothing.

const TERMS = [
    'Logos', 'ousia', 'ousiai', 'hypostasis', 'hypostases',
    'homoousios', 'homoousion', 'homoiousios', 'homoiousion',
    'monogenēs', 'monogenes', 'prosōpon', 'prosopon', 'prosōpa', 'prosopa',
    'Theotokos', 'theotokos', 'Christotokos', 'christotokos',
    'mia physis', 'physis', 'physeis',
    'kenōsis', 'kenosis', 'theōsis', 'theosis', 'oikonomia',
    'perichōrēsis', 'perichoresis', 'hēsychia', 'hesychia',
    'Filioque', 'filioque', 'transsubstantiatio', 'ex opere operato',
    'sola scriptura', 'sola fide', 'sola gratia',
    'qnome', 'qnoma', 'parsopa', 'Tanakh', 'evyonim', 'dokein',
    'acta martyrum', 'comunidad de base', 'comunidades de base',
    'saebyeok gido', 'orasho', 'Pascha', 'anathemas', 'anathema',
];

const WORKS = [
    'Didache', 'Shepherd of Hermas', 'Thalia', 'Bazaar of Heracleides',
    'Against Heresies', 'First Apology', 'Ecclesiastical History',
    'Peshitta', 'Septuagint', 'Vulgate', 'Diatessaron', 'Panarion',
    'Gospel of Peter', 'Gospel of Thomas', 'Gospel of Truth',
    'On First Principles', 'City of God', 'Book of Common Prayer',
    'Octavius', 'Philokalia', 'Sinodos', 'Didascalia',
    'Codex Sinaiticus', 'Codex Vaticanus', 'Codex Alexandrinus',
    'Quicumque vult', 'Quicumque',
];

const NAMES = [
    'Nicaea', 'Chalcedon', 'Constantinople', 'Trent',
    'Arius', 'Athanasius', 'Cyril', 'Nestorius', 'Origen',
    'Augustine', 'Tertullian', 'Irenaeus', 'Ignatius', 'Polycarp',
    'Marcion', 'Montanus', 'Luther', 'Calvin', 'Wesley', 'Constantine',
];

const CLS = { term: 'rt-term', work: 'rt-work', name: 'rt-name' };

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const entries = [
    ...TERMS.map((t) => [t, 'term']),
    ...WORKS.map((t) => [t, 'work']),
    ...NAMES.map((t) => [t, 'name']),
].sort((a, b) => b[0].length - a[0].length);
const classOf = new Map(entries);
// \b is ASCII-blind, so guard with explicit non-letter lookarounds that know
// about the macron vowels the transliterations use.
const L = 'A-Za-zĀāĒēĪīŌōŪū';
const LEX = new RegExp(
    `(\\*\\*[^*]+\\*\\*|\\*[^*\\s][^*]*\\*|(?<![${L}])(?:${entries.map(([t]) => esc(t)).join('|')})(?![${L}]))`,
    'g',
);

// --- the renderer ----------------------------------------------------------

function Rich({ t }) {
    if (typeof t !== 'string' || !t) return t ?? null;
    const parts = t.split(LEX);
    if (parts.length === 1) return t;
    const seenNames = new Set();   // a name is bolded once per block
    return parts.map((p, i) => {
        if (i % 2 === 0) return p;
        if (p.startsWith('**')) return <strong key={i} className="rt-name">{p.slice(2, -2)}</strong>;
        if (p.startsWith('*')) return <em key={i} className="rt-work">{p.slice(1, -1)}</em>;
        const cls = classOf.get(p);
        if (cls === 'name') {
            if (seenNames.has(p)) return p;
            seenNames.add(p);
            return <strong key={i} className="rt-name">{p}</strong>;
        }
        return <em key={i} className={CLS[cls] || 'rt-term'}>{p}</em>;
    });
}

export default Rich;
