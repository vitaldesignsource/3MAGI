// The Magical Scriptorium — the wing's registry.
//
// One list, read by the pages (through src/pages/magic/lib.js) and by the
// node tools: the validator, the comparison builder, the search index, the
// sitemap and llms.txt. It must stay plain literals with no imports and no
// import.meta, so node can load it as it is.
//
// Every alphabet carries a status. 'ready' means its signs can be shown — set
// in a vendored face or drawn from a named source. 'forms-pending' means its
// letterforms are still being traced from the named edition: the page is
// linkable and shows the history, sources and claims, and says plainly that
// the forms will appear. keyedTo names the hall whose letters an alphabet's
// values point into ('hebrew' | 'latin'), or 'none'. direction is the way its
// table and its writing run, and the way the arrow keys walk its letters.
//
// signScale (optional) sets an alphabet's drawn signs larger, all by one
// factor, where they were traced in a cell generous for their size (the
// tables of 1518 and 1539, Dee's leaf): the drawing and the signs' sizes
// relative to one another are unchanged, and they stand as tall as the
// letters beside them in the cards, the comparison tables and the tools.
//
// The alphabets are NOT halls: they are not in the halls' HALLS (data/education/portal/halls.js),
// and their modules live in this subfolder, out of reach of the halls' glob.

const registry = {
    wing: {
        title: 'The Magical Scriptorium',
        kicker: 'Secret Letters',
        path: '/third-lamp/education/magic',
        intro: 'A wing of the Scriptorium for the magical and secret alphabets: the angelic scripts Agrippa printed in 1533, the Theban that Trithemius gave to Honorius, the signs of the planets and the furnace, and the native scripts that later centuries filled with lore. Each is set beside the books that carried it from hand to hand, with what is documented kept apart from what is claimed.',
        // The hero's row of signs: the seven planets, set from the Signs of
        // the Art (the validator checks each is a sign of a ready alphabet).
        heroSigns: ['☉', '☽', '☿', '♀', '♂', '♃', '♄'],
    },
    groups: [
        { key: 'agrippan', title: 'Agrippa’s alphabets', note: 'Printed in De occulta philosophia III.29–30 (1533): the Theban, the three Hebrew-keyed ring-letter alphabets, and the cipher of the nine chambers.' },
        { key: 'secret', title: 'Other secret and angelic alphabets', note: 'Alphabets ascribed to angels, magi and ancient sages, and one script nobody can read.' },
        { key: 'signs', title: 'Signs, seals and characters', note: 'Not alphabets: signs that stand for things and powers, not sounds.' },
        { key: 'native', title: 'Native scripts and their lore', note: 'Real scripts, written for ordinary purposes, that later centuries surrounded with magic.' },
    ],
    alphabets: [
        {
            slug: 'celestial', group: 'agrippan', title: 'The Celestial Writing', short: 'Celestial',
            otherNames: ['Scriptura Cœlestis', 'Celestiall writing (J.F., 1651)'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'ready',
            // door: its Aleph, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 27.1 31.3 L 72.4 73.1 M 72.1 31.9 L 53.4 55.6 M 27.1 70.6 L 40.0 43.2', rings: [[22.7, 27.2], [73.4, 26], [23.6, 75.4], [76.8, 77.2]] } },
            blurb: 'Twenty-two signs, one for each Hebrew letter, which Agrippa says the Hebrews showed set and figured among the stars.',
        },
        {
            slug: 'malachim', group: 'agrippan', title: 'Malachim, the Writing of the Angels', short: 'Malachim',
            otherNames: ['Melachim', 'the writing of the angels, or regal'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'ready',
            // door: its Aleph, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 49.0 31.7 L 48.6 67.4 M 34.8 30.8 L 35.0 38.7 L 64.6 38.7 L 64.4 31.7 M 37.6 46.8 L 60.4 46.9 M 34.3 66.9 L 34.4 55.4 L 63.8 55.4 L 64.2 66.7', rings: [[34.6, 25.8, 5], [49, 26.7, 5], [64.3, 26.7, 5], [34.6, 46.8, 3], [63.4, 46.9, 3], [34.2, 71.9, 5], [48.6, 72.4, 5], [64.4, 71.7, 5]] } },
            blurb: 'The second of Agrippa’s three ring-letter alphabets: “of Angels, or Regal”, as the English of 1651 has it.',
        },
        {
            slug: 'transitus-fluvii', group: 'agrippan', title: 'The Passing of the River', short: 'Passing the River',
            otherNames: ['Transitus Fluvii', 'the passing through the River (J.F., 1651)'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'ready',
            // door: its Aleph, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 82.2 74.2 L 56.3 51.0 C 47.5 43.4 37.5 35.4 31 31.4 C 26.4 28.6 20.4 28.8 18.3 32.6 C 16.4 36.4 18.6 41.6 23.2 44.6 C 27.4 47.3 32.6 47.9 37.9 49.0 M 63.4 34.5 L 56.3 51.0', rings: [[42.4, 51.1, 5], [65.4, 29.9, 5]] } },
            blurb: 'The third ring-letter alphabet of III.30, reported in a Hebrew grammar printed at Venice ten years before Agrippa.',
        },
        {
            slug: 'theban', group: 'agrippan', title: 'The Theban Alphabet', short: 'Theban',
            otherNames: ['the alphabet of Honorius surnamed the Theban', 'the witches’ alphabet'],
            keyedTo: 'latin', direction: 'ltr', status: 'ready', signScale: 1.35,
            // door: its A, as drawn on its page from the table of 1518 (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 38.5 26.2 L 60.8 24.8 M 45.4 26.8 L 45.4 35.3 L 51.8 35.5 M 52 25 L 52 52 C 52.6 55.2 58.7 55.2 58.9 50.6 C 59 47.3 55.8 46.2 52.2 47.2' } },
            blurb: 'A cipher of the Latin letters, first printed by Trithemius in 1518 and ascribed by him to Honorius of Thebes.',
        },
        {
            slug: 'aiq-bekar', group: 'agrippan', title: 'The Nine Chambers', short: 'Nine Chambers',
            otherNames: ['Aiq Bekar', 'the Kabbalah of the nine chambers'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'ready',
            // door: its Aleph, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 34.4 32.2 L 34.5 73.7 L 68.0 76.0 M 56.7 25.2 L 58.9 23.9' } },
            blurb: 'Hebrew letters written as the walls of a grid and a count of points — the cipher Agrippa gives to “the Cabalists”.',
        },
        {
            slug: 'enochian', group: 'secret', title: 'The Enochian Alphabet', short: 'Enochian',
            otherNames: ['the Angelical alphabet', 'Dee’s alphabet'],
            keyedTo: 'latin', direction: 'rtl', status: 'ready', signScale: 1.3,
            // door: its Pa, the first form on f. 104, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 29 33 L 36.5 34 C 43 44 50 54 54.5 67.5 C 58.5 64 62 60 62.3 54 L 62.3 48.5 C 66.5 46.5 69.8 43.5 69.6 39 C 69.4 35 66 34.5 62 34.8 C 59 35 56 35.5 56 39.6 M 57.8 47 L 61.8 48' } },
            blurb: 'Twenty-one letters that John Dee recorded in 1583 from what Edward Kelley reported seeing in the shew-stone.',
        },
        {
            slug: 'alphabet-of-the-magi', group: 'secret', title: 'The Alphabet of the Magi', short: 'Magi',
            otherNames: ['the characters of the angel Raphael (Duret, 1613)'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'ready', signScale: 1.25,
            // door: its Aleph, as drawn on its page from the table of 1539 (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 23 40.5 C 24.5 36 31 35 34 40 C 38 45 42 50 42.5 56 L 43 68 L 64 68 L 64.5 37 L 75 36.5 M 34 48 L 24 70 L 32 69', dots: [[23.6, 40.1, 3.7], [77.4, 49.8, 3.2]] } },
            blurb: 'A variant of the Hebrew alphabet whose earliest known printing is at Pavia in 1539, later credited — without a source — to Paracelsus.',
        },
        {
            slug: 'trithemius', group: 'secret', title: 'Trithemius and the Secret Alphabets', short: 'Trithemius',
            otherNames: ['the Polygraphia', 'the Steganographia'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', signScale: 1.6,
            // door: the a of the alchemist's alphabet, as drawn on its page (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 51.4 32.9 C 58.08 32.9 63.5 38.32 63.5 45 C 63.5 51.68 58.08 57.1 51.4 57.1 C 44.72 57.1 39.3 51.68 39.3 45 C 39.3 38.32 44.72 32.9 51.4 32.9 Z', dots: [[51.3, 45.4, 2.9]] } },
            blurb: 'The abbot of Sponheim, whose books of secret writing carried cipher alphabets into print and into Agrippa’s hands.',
        },
        {
            slug: 'ibn-wahshiyya', group: 'secret', title: 'The Ancient Alphabets of Ibn Waḥshiyya', short: 'Ibn Waḥshiyya',
            otherNames: ['Shawq al-mustahām', 'Ancient Alphabets and Hieroglyphic Characters Explained (1806)'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'An Arabic catalogue of the alphabets of Hermes, the sages and the planets, printed in London with an English version in 1806.',
        },
        {
            slug: 'voynich', group: 'secret', title: 'The Voynich Script', short: 'Voynich',
            otherNames: ['Beinecke MS 408', 'Voynichese'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'A script found in one manuscript, on vellum dated to the early fifteenth century, which no proposed reading has unlocked.',
        },
        {
            slug: 'charakteres', group: 'signs', title: 'Charaktêres: the Ring-Letters', short: 'Charaktêres',
            otherNames: ['Brillenbuchstaben', 'ring-signs', 'al-khawātim, the seals'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'Invented signs that spell nothing, to be copied exactly, from the Greek magical handbooks to Jewish magic and the ring-letter alphabets of the Renaissance.',
        },
        {
            slug: 'planetary-seals', group: 'signs', title: 'The Tables of the Planets', short: 'Tables of the Planets',
            otherNames: ['the sacred tables of the planets (J.F., 1651)', 'planetary magic squares'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'Agrippa’s seven magic squares, with the seals and characters he draws from them for each planet.',
        },
        {
            slug: 'signs-of-the-art', group: 'signs', title: 'The Signs of the Art', short: 'Signs of the Art',
            otherNames: ['planetary, zodiacal and alchemical signs', 'geomantic figures'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', door: { char: '☿' },
            blurb: 'The shorthand of the heavens and the laboratory: planets and metals, the zodiac, the elements, and the figures of geomancy.',
        },
        {
            slug: 'galdrastafir', group: 'signs', title: 'Galdrastafir: the Icelandic Staves', short: 'Galdrastafir',
            otherNames: ['Icelandic magical staves', 'helms (hjálmar)'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'Named magical figures from Icelandic manuscripts of about 1500 to the nineteenth century — not runes, and not Viking.',
        },
        {
            slug: 'runes', group: 'native', title: 'The Runes', short: 'Runes',
            otherNames: ['the futhark', 'Elder Futhark'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', door: { char: 'ᚠ' },
            blurb: 'The native alphabet of the early Germanic peoples, and the lore the Edda, Bureus and the twentieth century laid upon it.',
        },
        {
            slug: 'ogham', group: 'native', title: 'Ogham', short: 'Ogham',
            otherNames: ['Ogam', 'Beithe-luis-nin'],
            // door: straif, four strokes across the stemline; beith (ᚁ), one
            // stroke beneath it, reads at text size as a Latin capital T
            keyedTo: 'none', direction: 'ltr', status: 'ready', door: { char: 'ᚎ' },
            blurb: 'Irish stroke-letters cut along a stemline, and the medieval scholarship that made every letter a tree.',
        },
    ],
    // The two pages the portal needs that are not alphabets.
    pages: [
        {
            slug: 'agrippa', kind: 'author', title: 'Agrippa and the Three Books', short: 'Agrippa', status: 'ready',
            blurb: 'Heinrich Cornelius Agrippa and De occulta philosophia (1533), the book that carried most of these alphabets into print.',
        },
        {
            slug: 'the-books', kind: 'lineage', title: 'The Books: Hand to Hand', short: 'The Books', status: 'ready',
            blurb: 'The short chain of books — Trithemius, de Balmes, Agrippa, the English of 1651, Barrett — through which the alphabets travelled.',
        },
    ],
    // Route segments the wing uses for itself; no entry may take them.
    reserved: ['compare', 'transliterate', 'course', 'books', 'kit'],
};

export default registry;
