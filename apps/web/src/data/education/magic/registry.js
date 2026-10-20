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
            keyedTo: 'hebrew', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'Twenty-two signs, one for each Hebrew letter, which Agrippa says the Hebrews showed set and figured among the stars.',
        },
        {
            slug: 'malachim', group: 'agrippan', title: 'Malachim, the Writing of the Angels', short: 'Malachim',
            otherNames: ['Melachim', 'the writing of the angels, or regal'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'The second of Agrippa’s three ring-letter alphabets: “of Angels, or Regal”, as the English of 1651 has it.',
        },
        {
            slug: 'transitus-fluvii', group: 'agrippan', title: 'The Passing of the River', short: 'Passing the River',
            otherNames: ['Transitus Fluvii', 'the passing through the River (J.F., 1651)'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'The third ring-letter alphabet of III.30, reported in a Hebrew grammar printed at Venice ten years before Agrippa.',
        },
        {
            slug: 'theban', group: 'agrippan', title: 'The Theban Alphabet', short: 'Theban',
            otherNames: ['the alphabet of Honorius surnamed the Theban', 'the witches’ alphabet'],
            keyedTo: 'latin', direction: 'ltr', status: 'forms-pending', door: null,
            blurb: 'A cipher of the Latin letters, first printed by Trithemius in 1518 and ascribed by him to Honorius of Thebes.',
        },
        {
            slug: 'aiq-bekar', group: 'agrippan', title: 'The Nine Chambers', short: 'Nine Chambers',
            otherNames: ['Aiq Bekar', 'the Kabbalah of the nine chambers'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'Hebrew letters written as the walls of a grid and a count of points — the cipher Agrippa gives to “the Cabalists”.',
        },
        {
            slug: 'enochian', group: 'secret', title: 'The Enochian Alphabet', short: 'Enochian',
            otherNames: ['the Angelical alphabet', 'Dee’s alphabet'],
            keyedTo: 'latin', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'Twenty-one letters that John Dee recorded in 1583 from what Edward Kelley reported seeing in the shew-stone.',
        },
        {
            slug: 'alphabet-of-the-magi', group: 'secret', title: 'The Alphabet of the Magi', short: 'Magi',
            otherNames: ['the characters of the angel Raphael (Duret, 1613)'],
            keyedTo: 'hebrew', direction: 'rtl', status: 'forms-pending', door: null,
            blurb: 'A variant of the Hebrew alphabet whose earliest known printing is at Pavia in 1539, later credited — without a source — to Paracelsus.',
        },
        {
            slug: 'trithemius', group: 'secret', title: 'Trithemius and the Secret Alphabets', short: 'Trithemius',
            otherNames: ['the Polygraphia', 'the Steganographia'],
            keyedTo: 'none', direction: 'ltr', status: 'forms-pending', door: null,
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
