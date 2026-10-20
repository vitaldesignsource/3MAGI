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
// tables of 1518 and 1539, Dee's leaf, the Voynich glyphs kept at their
// written sizes) or are too intricate to read at a letter's size (the seals
// of the planets, the Icelandic staves): the drawing and the signs' sizes
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
            // its tables are printed, and drawn, reading from the right
            keyedTo: 'none', direction: 'rtl', status: 'ready', signScale: 1.6,
            // door: the jīm of Jupiter's pen, as drawn from Arabic p. 48 (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 29.7 43.1 L 40.3 42.1 L 59.8 28.4 L 68.5 42 L 75 51.8 L 81 62 Q 82 65.5 84 67.3 M 40.3 42.1 L 52.3 58.7 M 52.3 58.7 L 68.5 42 L 86.3 23.5', rings: [[23.2, 43.6, 6.5], [52.1, 66.2, 7.5]] } },
            blurb: 'An Arabic catalogue of the alphabets of Hermes, the sages, the planets and the ancient kings, printed in London with an English version in 1806.',
        },
        {
            slug: 'voynich', group: 'secret', title: 'The Voynich Script', short: 'Voynich',
            otherNames: ['Beinecke MS 408', 'Voynichese'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', signScale: 1.6,
            // door: its t, the two-looped gallows, as drawn from f. 2r (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 41.3 22.5 C 40.5 35.8 40.1 54.7 39.4 76.1 M 45.7 21.6 C 38.6 21.6 30.1 25.3 28.7 31 C 28.2 33.4 32 34.6 36.7 34.8 L 52.8 36.9 C 59.5 37.5 67.5 35.8 72.3 32.5 C 75.1 29.6 73.2 24.4 68.5 22.5 C 63.3 21.1 56.6 21.6 54.3 25.3 C 53 28.2 52.8 32 52.8 36.9 C 52.3 50 50.9 64.2 49.8 76.8 C 50.8 77.5 52.4 77 53.6 75.6' } },
            blurb: 'A script found in one manuscript, on vellum dated to the early fifteenth century, which no proposed reading has unlocked.',
        },
        {
            slug: 'charakteres', group: 'signs', title: 'Charaktêres: the Ring-Letters', short: 'Charaktêres',
            otherNames: ['Brillenbuchstaben', 'ring-signs', 'al-khawātim, the seals'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', signScale: 1.25,
            // door: its ring-ended cross, as drawn from Eitrem’s Plate VIII (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 50.1 28.4 C 50.6 42 49.6 52 47.6 59 Q 46 65 45.5 73.8 M 28.3 42.5 C 32 42.2 36 43.8 44 43.9 L 70.9 44.4', rings: [[49.5, 23.4, 5], [44.9, 78.8, 5], [24.2, 45.5, 5], [75.9, 45, 5]] } },
            blurb: 'Invented signs that spell nothing, to be copied exactly, from the Greek magical handbooks to Jewish magic and the ring-letter alphabets of the Renaissance.',
        },
        {
            slug: 'planetary-seals', group: 'signs', title: 'The Tables of the Planets', short: 'Tables of the Planets',
            otherNames: ['the sacred tables of the planets (J.F., 1651)', 'planetary magic squares'],
            keyedTo: 'none', direction: 'ltr', status: 'ready', signScale: 1.4,
            // door: the seal of Jupiter, as drawn from the woodcut of 1533 (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 52.84 78.93 A 29.2 30.5 82.98 0 1 45.7 20.97 A 29.2 30.5 82.98 0 1 52.84 78.93 M 20.37 22.09 L 79.73 78.11 M 76.68 22.94 L 23.02 78.56', rings: [[17.1, 19, 4.5], [83, 81.2, 4.5], [79.8, 19.7, 4.5], [19.9, 81.8, 4.5]] } },
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
            keyedTo: 'none', direction: 'ltr', status: 'ready', signScale: 1.5,
            // door: the Vegvísir, as drawn from the Huld manuscript (the validator checks it is one of the page's own signs)
            door: { glyph: { d: 'M 48.6 19.3 L 49.4 50.8 L 50.7 83.7 M 18 50.5 L 49.5 51.15 L 82.2 51.6 M 80.5 18.8 L 49.45 50.75 L 19.5 81.2 M 16.6 16.7 L 49.5 50.8 L 80 82 M 42.1 18.4 L 42.2 23.35 L 55.4 23.65 L 55.8 18.3 M 44.2 25.5 L 53.1 25.7 M 43.9 27.3 L 53.3 27.4 M 44.2 29.3 L 53.3 29.3 M 76.3 15.4 L 73.2 19.3 L 81.5 25.4 L 85.5 22.4 M 74.2 22 C 73.7 23.5 74.3 24.8 75.3 25.3 C 76.2 25.7 77.2 25.5 77.7 25 M 69.6 23.8 L 76.2 29.6 M 65.4 27.2 L 65.8 26.6 C 68 26.3 70.5 27 71.6 28.1 C 72.8 29.3 73.2 31 73.2 33.2 M 66.6 48.9 C 68.5 49.3 69.4 50.3 69.4 51.4 C 69.4 52.8 68.6 54 67.8 54.6 M 71.8 47.5 L 71.8 56 M 75.8 49.4 C 74.6 49.6 74.1 50.5 74.1 51.5 C 74.1 52.8 74.6 53.9 75.8 54.4 M 83 47.2 L 77.6 47 L 77.9 56.3 L 82.3 56.5 M 68.2 76.8 L 73.7 70.9 M 70.1 77.8 L 75.2 72.8 M 71.9 79 L 77.1 74.2 M 76.8 85.8 L 73.4 82.5 L 80.6 75.3 L 84.7 78.2 M 80.8 77.6 C 81.4 79.5 81.2 81.2 80 82 C 78.6 83 76.6 83.3 75.2 82.8 M 37.7 84.9 L 37.7 75.4 L 45 75.12 L 52 75.45 L 62.2 75.7 L 62.5 84.3 M 35.6 83.7 L 40.1 83.9 M 35.7 85 L 39.8 84.9 M 60.1 83 L 64.8 83 M 60.6 84.5 L 64.7 84.3 M 42.1 75.5 L 42.2 81.3 M 40 78.1 L 43.5 78 M 39.8 79.1 L 44.2 79.1 M 58.3 75.6 L 58.8 81.7 M 56.5 77.9 L 60.2 77.8 M 56.4 79 L 60.1 79 M 44.9 84.5 L 45.2 78.8 L 56 78.8 L 56.2 83.6 M 48.8 82.8 L 52.5 82.4 M 49.2 83.9 L 52.9 83.6 M 25.2 70.5 C 24 71.8 24 73.8 25.5 74.9 C 27 76 29.4 75.9 30.9 74.9 M 21.9 75.2 L 26.1 77.8 M 15.5 79.4 L 17.6 76 L 19.8 76.9 L 22.1 78.7 L 25.2 81.6 L 23.1 84.9 M 18.9 79.1 L 21.9 81.2 M 18.1 80.1 L 20.8 82.1 M 16.4 41.5 L 21.4 41.9 L 21.1 59.3 L 16 59.1 M 16.5 45.8 L 21.4 45.6 M 16.4 55.5 L 21.1 55.6 M 16.25 19.26 A 2.62 1.89 136 1 1 20.03 15.64 A 2.62 1.89 136 1 1 16.25 19.26 M 23.3 15.9 L 25.5 19 L 17.2 25.6 L 14 23.1 M 18 22.9 L 22 19 M 21.6 26 C 21.6 24.8 22.1 23.8 22.8 23.2 C 23.8 22.3 25.4 22.2 26.2 23.1', dots: [[67.8, 28.2, 0.6], [71.2, 30.9, 0.65]], pen: 1, textPen: 1.5 } },
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
