// The Tables of the Planets — forms pending.
//
// From the wing's research file planetary-seals.verified.json, with its
// fact-check corrections applied. This entry is not an alphabet: its units are
// the seven tables of Agrippa's De occulta philosophia II.22, each followed by
// the seal of its planet and the characters of its intelligences and spirits —
// thirty entries, twenty-three of them figures.
//
// The tables are set as numbers (`rows`, read from the top, left to right),
// from the English of 1651 as keyed by EEBO-TCP (A26565) and recomputed. The
// six cells of Mercury’s rows 3–4 on which that transcription and the regular
// square disagree are null in `rows`, with both readings in `doubtfulRows`;
// cells the transcription cannot read, fixed by the sums, are listed in
// `restoredCells` as [row, column]. The 1533 woodcuts were not compared.
//
// No seal or character is drawn: each keeps glyph: null until it is traced
// from the 1533 woodcut named in drawing.pending. Points the fact-check left
// unresolved are left out (the Latin words for "spirit" and "table", the 1533
// Hebrew tables, Venus's first name, the identity of Mars's 25-name, Pacioli,
// Moschopoulos, the Ikhwān, Kircher, the claim that each seal passes through
// every cell, al-Anṭākī's kunya) or are stated as uncertain in plain words.
// Every passage of Agrippa is quoted from the EEBO-TCP transcription of the
// English of 1651, checked word for word.
const JF = 'J.F. (probably John French), Three Books of Occult Philosophy (London: R.W. for Gregory Moule, 1651), as transcribed by EEBO-TCP (A26565)';

export default {
    slug: 'planetary-seals',
    title: 'The Tables of the Planets',
    otherNames: [
        '“the sacred tables of the planets”, the name Agrippa reports magicians giving them (J.F., 1651, II.xxii, p. 239)',
        'planetary magic squares',
        'kameas (a name reported from modern Western occult usage, said to come from Hebrew qameaʿ, “amulet”; it does not occur in the English of 1651)',
        'awfāq (Arabic, singular wafq: the magic squares of the Islamic tradition)',
    ],
    family: 'Not an alphabet: seven tables of numbers, one for each planet, with the divine names, intelligences and spirits whose numbers answer to them, and the seals and characters Agrippa says are drawn from them. The signs stand for planets and beings, not for sounds; the arithmetic rests on the numerical values of the Hebrew letters.',
    keyedTo: 'none',
    direction: 'ltr',
    status: 'forms-pending',
    summary: 'In Book II, chapter 22 of De occulta philosophia (July 1533) Agrippa prints seven magic squares, one for each planet, from Saturn’s three by three, whose every line adds to 15, to the Moon’s nine by nine, whose lines add to 369. Over each he sets divine names, an intelligence and a spirit answering to its numbers, and with each he prints the seal of the planet and the characters of its intelligence and spirit, drawn, he says, from the numbers. How they are drawn he leaves to “the wise searcher”.',
    intro: [
        'A magic square is a grid of the numbers from one upwards, each used once, arranged so that every row, every column and both diagonals give the same sum. In Book II, chapter 22 of De occulta philosophia, printed in July 1533, Agrippa gives seven, one for each planet in the old descending order: Saturn’s square of three, Jupiter’s of four, Mars’s of five, the Sun’s of six, Venus’s of seven, Mercury’s of eight and the Moon’s of nine. He opens with a report, not a claim of his own: it is “affirmed by Magicians”, in J.F.’s English of 1651, that these “sacred tables of the planets” carry the virtues of the heavens, because they represent the divine order of the celestial numbers.',
        'Each square has four numbers of its own: its side, the count of its cells, the sum of a line and the sum of all — for Saturn 3, 9, 15 and 45. Over each Agrippa sets divine names and two beings, an intelligence “to what is good” and a spirit “to what is bad”, all of them, he says, “such names as fill up the numbers”: written in Hebrew and counted letter by letter, Agiel, the intelligence of Saturn, and Zazel, its spirit, both give 45. Out of the same numbers, he says, are drawn the seal of the planet and the characters of its spirits, and he prints them beneath the tables. Before them he sets out what each table does when it is engraved on its planet’s metal, the planet fortunate or unfortunate — for Saturn and Jupiter, as what “they say”. How the seals are drawn he does not say; he leaves it to “the wise searcher”.',
        'That silence has been filled since. The method credited to modern commentators — reducing the letters of a name to numbers that fit the square and joining their cells in order — is not Agrippa’s, and on Saturn’s small square it gives the character of Agiel no more than a single stroke run back and forth; whether it accounts for his figures will be seen only when they are traced. The squares themselves are older than his book. Albrecht Dürer engraved a square of four, its lines adding to 34, in Melencolia I in 1514, and historians of mathematics trace an Arabic art of magic squares to the tenth century, though their studies could not be consulted for this page. For Agrippa’s set of names, numbers and seals no earlier source has been named. From his chapter they passed into the English of 1651 and, as is widely reported, into Barrett’s Magus (1801) and the ceremonial magic that followed.',
        'This page sets out the seven tables with their numbers, and the twenty-three seals and characters printed with them. The numbers come from the English of 1651, compared cell by cell and recomputed; the woodcuts of 1533 have not yet been compared, and where the English is doubtful, as in two rows of Mercury, both readings are given. No seal or character is shown until it has been traced from the woodcuts of 1533.',
    ],
    firstAttestation: {
        work: 'De occulta philosophia libri tres, Book II, chapter 22',
        author: 'Heinrich Cornelius Agrippa von Nettesheim',
        date: 'July 1533 — by the colophon, as the McGill Library’s record of its copy gives the date; the record notes four or five issues of that date',
        year: 1533,
        place: '[Cologne: Johannes Soter?]. The imprint is queried: the Eton College Library record gives the printer as “[J. Soter?]” and notes that Adams suggests Basel.',
        locator: 'Book II, chapter 22; its page in the printing of 1533 is not given here. In the English of 1651 it is headed “CHAP. XXII. Of the tables of the Planets, their vertues, forms, and what Divine names, Intelligencies, and Spirits are set over them.” (p. 239; the table of contents spells it “Intelligences”). The text runs pp. 239–242, the lists of names are on p. 243, and the tables, their Hebrew versions and the seals on pp. 244–252: Saturn and Jupiter p. 244, Mars p. 245, the Sun p. 246, Venus pp. 247–248, Mercury pp. 249–250, the Moon pp. 251–252.',
        notes: 'The earliest witness named here for this set of tables, names, numbers and seals — not for magic squares as such, which are older. Agrippa’s manuscript draft of the book was in Trithemius’s hands by 8 April 1510, the date of Trithemius’s reply, which the English of 1651 prints in its front matter; but Agrippa says that for the printing “we added some Chapters, and we inserted many things”, so the chapter cannot be dated to the draft without the manuscript. The tables are therefore dated here by the printing of July 1533 — not by the draft of 1510, nor by 1531, when Book I was printed alone.',
    },
    drawing: {
        pending: 'No seal or character is shown yet. The twenty-three figures — the seals of the seven planets and the characters of their intelligences and spirits — are being traced from the first printing, Agrippa’s De occulta philosophia libri tres (July 1533), Book II, chapter 22, in the Library of Congress copy, checked against the McGill copy, with the figures of the English translation of 1651 (pp. 244–252) recorded beside them. The tables are given now in numbers, from the English of 1651, and will be compared with the same woodcuts.',
        follows: 'Agrippa, De occulta philosophia libri tres (July 1533), Book II, chapter 22: the seals and characters printed with each table, Library of Congress copy, checked against the McGill copy; beside them, the figures of the English of 1651, pp. 244–252.',
        variants: 'The English of 1651 prints every table twice, in figures and again “In Hebrew notes”; whether the woodcuts of 1533 do the same has not yet been compared. The figures of 1651, as transcribed, differ from the regular squares in Mercury’s third and fourth rows, and the volume’s own errata list corrections for the pages of the Venus, Mercury and Moon tables (pp. 247, 249 and 251). Later copies, such as the plates of Barrett’s Magus (1801), are not used as a base: a figure can change each time it is cut again.',
    },
    lettersTitle: 'The Tables and Their Seals',
    scriptNote: 'Thirty entries, none of them a letter. For each planet comes its table, then its seal and the characters of the beings over it, in the order of the English of 1651: four figures for Venus and the Moon, whose lists name three beings each, and three for the rest. The tables are given in numbers; the twenty-three figures will be shown when they are traced. The names are spelled as the English of 1651 spells them.',
    groups: [
        { key: 'saturn', label: 'Saturn', note: 'the square of three' },
        { key: 'jupiter', label: 'Jupiter', note: 'the square of four' },
        { key: 'mars', label: 'Mars', note: 'the square of five' },
        { key: 'sun', label: 'The Sun', note: 'the square of six' },
        { key: 'venus', label: 'Venus', note: 'the square of seven' },
        { key: 'mercury', label: 'Mercury', note: 'the square of eight' },
        { key: 'moon', label: 'The Moon', note: 'the square of nine' },
    ],
    letters: [
        // Saturn
        {
            order: 1, name: 'The table of Saturn', group: 'saturn', value: 'Saturn', translit: '3 × 3', numeric: 15,
            side: 3, lineSum: 15, total: 45, centre: 5,
            rows: [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of Saturn in his compass” (p. 244). Rows from the top: 4 9 2 / 3 5 7 / 8 1 6. Every line gives 15 and the whole 45, with 5 at the centre, and the English of 1651 has the same figures cell for cell. A simple rule gives exactly this arrangement: set 1 in the cell below the centre and step one down and one to the right, wrapping round the edges; where that cell is taken, drop two cells below the last number instead. The rule identifies the arrangement; it is not a claim about how Agrippa or his source made it. The names: Ab at 3, Hod at 9, Iah and Hod at 15, and “Jehovah extended” at 45 — the four letters of the Name spelled out in full, יוד הא ואו הא, give 45. Engraved on lead under a fortunate Saturn, “They say”, it helps childbirth, makes a man safe and powerful and his petitions to princes succeed; under an unfortunate Saturn it hinders building and planting, casts a man from his honours, causes quarrels and disperses an army.',
        },
        {
            order: 2, name: 'The seal of Saturn', group: 'saturn', value: 'Saturn', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Printed beneath the table in the English of 1651, under the heading “The Seales or Characters” and the caption “Of Saturn.” (p. 244). Only in Saturn’s paragraph does the text call it “the seal, or Character”: “out of the same numbers is drawn the seal, or Character of Saturn, and of the spirits thereof” (p. 239). For the other planets the text says “Character”, though the headings over the figures speak of seals and characters for every planet.',
        },
        {
            order: 3, name: 'The character of Agiel', group: 'saturn', value: 'the intelligence of Saturn', translit: null, numeric: 45, glyph: null, formConfidence: 'low',
            note: 'Agiel stands at 45, the total of the square. Captioned “Of the Intelligence of Saturn.” in the English of 1651 (p. 244). By the modern tracing method its letters, spelled אגיאל, give 1, 3, 10, 1 and 30, and, reduced to fit the square as 1, 3, 1, 1 and 3, touch only two cells: the method alone would give a single stroke run back and forth.',
        },
        {
            order: 4, name: 'The character of Zazel', group: 'saturn', value: 'the spirit of Saturn', translit: null, numeric: 45, glyph: null, formConfidence: 'low',
            note: 'Zazel stands at 45, with Agiel. Captioned “Of the Spirit of Saturn.” in the English of 1651 (p. 244). Agrippa names Zazel again in Book III as a demon of Hebrew tradition: in a reading he gives from “the Cabalists”, the enemies who “shall lick the dust” are understood “of Zazell, and his Army” (III.xviii, p. 401), and the dead body, “as say the divines of the Hebrews, is left in the power of the Demon Zazel” (III.xli, p. 475).',
        },
        // Jupiter
        {
            order: 5, name: 'The table of Jupiter', group: 'jupiter', value: 'Jupiter', translit: '4 × 4', numeric: 34,
            side: 4, lineSum: 34, total: 136, centre: null,
            rows: [[4, 14, 15, 1], [9, 7, 6, 12], [5, 11, 10, 8], [16, 2, 3, 13]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of Jupiter in his compass” (p. 244). Rows from the top: 4 14 15 1 / 9 7 6 12 / 5 11 10 8 / 16 2 3 13. Every line gives 34 and the whole 136, and the English of 1651 has the same figures cell for cell. A second simple rule gives it: write 1 to 16 in reading order, replace each number on the two diagonals with 17 minus that number, and turn the table upside down. The names: a four-name the English prints “Abab.”, two names at 16 printed in Hebrew only, and El Ab at 34. Impressed on a silver plate with Jupiter “powerfull, and ruling”, “They say”, it brings gain and riches, favour and love, peace and concord, appeases enemies and confirms honours, dignities and counsels; engraved on coral it dissolves enchantments. No use under an unfortunate Jupiter is given.',
        },
        {
            order: 6, name: 'The seal of Jupiter', group: 'jupiter', value: 'Jupiter', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Captioned “Of Jupiter.” in the English of 1651 (p. 244), whose text says “out of it is drawn the Character of Jupiter, and the spirits thereof” (p. 240).',
        },
        {
            order: 7, name: 'The character of Johphiel', group: 'jupiter', value: 'the intelligence of Jupiter', translit: null, numeric: 136, glyph: null, formConfidence: 'low',
            note: 'The intelligence stands at 136, the total of the square. “Johphiel” is the spelling of the English of 1651. Captioned “Of the Intelligence of Jupiter.” (p. 244).',
        },
        {
            order: 8, name: 'The character of Hismael', group: 'jupiter', value: 'the spirit of Jupiter', translit: null, numeric: 136, glyph: null, formConfidence: 'low',
            note: 'Hismael stands at 136, with Johphiel. The caption in the English of 1651 reads “The Spirit of Jupiter.” (p. 244), where the other captions begin “Of”.',
        },
        // Mars
        {
            order: 9, name: 'The table of Mars', group: 'mars', value: 'Mars', translit: '5 × 5', numeric: 65,
            side: 5, lineSum: 65, total: 325, centre: 13,
            rows: [[11, 24, 7, 20, 3], [4, 12, 25, 8, 16], [17, 5, 13, 21, 9], [10, 18, 1, 14, 22], [23, 6, 19, 2, 15]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of Mars in his compass” (p. 245). Rows from the top: 11 24 7 20 3 / 4 12 25 8 16 / 17 5 13 21 9 / 10 18 1 14 22 / 23 6 19 2 15. Every line gives 65 and the whole 325, with 13 at the centre; Saturn’s rule gives it. The table of 1651 has the same figures cell for cell, though its text slips and calls it “a square of four containing twenty five numbers” (p. 240). The names: He, “the letter of the Holy Name”, whose number the transcription cannot read, though the letter itself counts 5, the side; a name printed in Hebrew only at 25, not transliterated in the English and not identified here; and Adonai, which the transcription of 1651 numbers 55, where 65 — the line sum, and the sum of the name’s letters spelled אדני — would be expected. On iron or a sword under a fortunate Mars it makes a man potent in war, judgements and petitions, terrible to his enemies and victorious over them, and engraved on “the Stone Correola” it stops blood and the menses. On red brass under an unfortunate Mars it hinders building, casts the powerful down, causes discord and hatred among men and beasts, chases away bees, pigeons and fish, “hinders Mils”, makes hunters and fighters unfortunate, causes barrenness, and strikes terror into all enemies and compels them to submit.',
        },
        {
            order: 10, name: 'The seal of Mars', group: 'mars', value: 'Mars', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Captioned “Of Mars.” in the English of 1651 (p. 245), whose text says “out of it is drawn the Character of Mars, and of his spirits” (p. 240).',
        },
        {
            order: 11, name: 'The character of Graphiel', group: 'mars', value: 'the intelligence of Mars', translit: null, numeric: 325, glyph: null, formConfidence: 'low',
            note: 'Graphiel stands at 325, the total of the square. Captioned “Of the Intelligence of Mars.” in the English of 1651 (p. 245).',
        },
        {
            order: 12, name: 'The character of Barzabel', group: 'mars', value: 'the spirit of Mars', translit: null, numeric: 325, glyph: null, formConfidence: 'low',
            note: 'Barzabel stands at 325, with Graphiel. Captioned “Of the Spirit of Mars.” in the English of 1651 (p. 245).',
        },
        // The Sun
        {
            order: 13, name: 'The table of the Sun', group: 'sun', value: 'the Sun', translit: '6 × 6', numeric: 111,
            side: 6, lineSum: 111, total: 666, centre: null,
            rows: [[6, 32, 3, 34, 35, 1], [7, 11, 27, 28, 8, 30], [19, 14, 16, 15, 23, 24], [18, 20, 22, 21, 17, 13], [25, 29, 10, 9, 26, 12], [36, 5, 33, 4, 2, 31]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of the Sun in his compass” (p. 246). Rows from the top: 6 32 3 34 35 1 / 7 11 27 28 8 30 / 19 14 16 15 23 24 / 18 20 22 21 17 13 / 25 29 10 9 26 12 / 36 5 33 4 2 31. Every line gives 111 and the whole 666, and the English of 1651 has the same figures cell for cell. A square of six cannot be made by either simple rule, and no rule is offered for this one: it holds 1 to 36 once each and every line gives 111, which is all that is claimed for it. The names: Vau and “He extended”, letters of the Holy Name, whose numbers the transcription cannot read, though each counts 6, the side; and Eloh at 36. On gold under a fortunate Sun it makes the wearer renowned, amiable and acceptable, potent in all his works and the equal of kings and princes; under an unfortunate Sun it makes a tyrant, proud, ambitious and insatiable, with an ill ending.',
        },
        {
            order: 14, name: 'The seal of the Sun', group: 'sun', value: 'the Sun', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Captioned “Of the Sun.” in the English of 1651 (p. 246). Here the text has the plural: “out of it are drawn Characters of the Sun, and of the spirits thereof” (p. 241).',
        },
        {
            order: 15, name: 'The character of Nachiel', group: 'sun', value: 'the intelligence of the Sun', translit: null, numeric: 111, glyph: null, formConfidence: 'low',
            note: 'Nachiel stands at 111, the line sum, not the total. Captioned “Of the intelligence of the Sun.” in the English of 1651 (p. 246).',
        },
        {
            order: 16, name: 'The character of Sorath', group: 'sun', value: 'the spirit of the Sun', translit: null, numeric: 666, glyph: null, formConfidence: 'low',
            note: 'Sorath stands at 666, the total: spelled סורת, its letters give 60 + 6 + 200 + 400. The chapter says only “the sum of all is 666” (p. 240), and Agrippa nowhere ties Sorath to the number of the beast. Captioned “Of the Spirit of the Sun.” in the English of 1651 (p. 246).',
        },
        // Venus
        {
            order: 17, name: 'The table of Venus', group: 'venus', value: 'Venus', translit: '7 × 7', numeric: 175,
            side: 7, lineSum: 175, total: 1225, centre: 25,
            rows: [[22, 47, 16, 41, 10, 35, 4], [5, 23, 48, 17, 42, 11, 29], [30, 6, 24, 49, 18, 36, 12], [13, 31, 7, 25, 43, 19, 37], [38, 14, 32, 1, 26, 44, 20], [21, 39, 8, 33, 2, 27, 45], [46, 15, 40, 9, 34, 3, 28]],
            restoredCells: [[2, 3], [3, 5]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of Venus in her Compass” (p. 247), and in Hebrew notes on p. 248. Rows from the top: 22 47 16 41 10 35 4 / 5 23 48 17 42 11 29 / 30 6 24 49 18 36 12 / 13 31 7 25 43 19 37 / 38 14 32 1 26 44 20 / 21 39 8 33 2 27 45 / 46 15 40 9 34 3 28. Every line gives 175 and the whole 1225, with 25 at the centre; Saturn’s rule gives it. As transcribed, the English of 1651 agrees except in two cells the transcription reads imperfectly — row 2, column 3, and row 3, column 5 — where 48 and 18 are the only numbers that keep every line at 175, and they are given on that ground. The names: the first entry of the list has no number or name that can be read in the transcription, so neither is given; Hagiel, the intelligence, stands at 49. On silver under a fortunate Venus it brings concord, ends strife, wins the love of women, helps conception and works against barrenness, dissolves enchantments, makes peace between man and woman and makes cattle fruitful; put in a dove-house it increases the pigeons; it helps to cure all melancholy distempers, causes joyfulness and makes travellers fortunate. Formed on brass under an unfortunate Venus it does the contrary.',
        },
        {
            order: 18, name: 'The seal of Venus', group: 'venus', value: 'Venus', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'The first of two figures that stand in the English of 1651 under the heading “The Seals, or Characters Of the Intelligence”, each captioned “Of Venus.” (p. 247): the seal, and the character of the intelligence. The text says “there is drawn out of it the Character of Venus, and of the spirits thereof” (p. 241).',
        },
        {
            order: 19, name: 'The character of Hagiel', group: 'venus', value: 'the intelligence of Venus', translit: null, numeric: 49, glyph: null, formConfidence: 'low',
            note: 'Hagiel stands at 49, the count of the cells, where the intelligences of the other planets stand at a sum. The second of the two figures under the heading “The Seals, or Characters Of the Intelligence”, captioned “Of Venus.” in the English of 1651 (p. 247).',
        },
        {
            order: 20, name: 'The character of Kedemel', group: 'venus', value: 'the spirit of Venus', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Spelled קדמאל, the name gives 175, the line sum; but the number beside it in the transcription of 1651 ends in 67, with what comes before it unreadable, and whether that is a misprint or a misreading is not settled, so no number is set here. Captioned “Of the Spirit of Venus.” (p. 248).',
        },
        {
            order: 21, name: 'The character of the Bne Seraphim', group: 'venus', value: 'the intelligences of Venus', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: '“The Intelligencies of Venus” in the list of 1651: Bne Seraphim, the sons of the Seraphim. The number beside them in the transcription ends in 252, its first digit unreadable — not 1225, the total of the square. Spelled בני שרפים, the name gives exactly 1252 if final mem counts 600, and 692 if it counts 40. Whether the woodcut of 1533 has 1225 or 1252, and whether either is a slip, remains open. Captioned “Of the Intelligences of Venus.” (p. 248).',
        },
        // Mercury
        {
            order: 22, name: 'The table of Mercury', group: 'mercury', value: 'Mercury', translit: '8 × 8', numeric: 260,
            side: 8, lineSum: 260, total: 2080, centre: null,
            rows: [
                [8, 58, 59, 5, 4, 62, 63, 1],
                [49, 15, 14, 52, 53, 11, 10, 56],
                [41, 23, 22, 44, null, 19, 18, null],
                [32, 34, null, 29, null, null, 39, null],
                [40, 26, 27, 37, 36, 30, 31, 33],
                [17, 47, 46, 20, 21, 43, 42, 24],
                [9, 55, 54, 12, 13, 51, 50, 16],
                [64, 2, 3, 61, 60, 6, 7, 57],
            ],
            doubtfulRows: {
                rows: [3, 4],
                transcribed1651: [[41, 23, 22, 44, 48, 19, 18, 45], [32, 34, 38, 29, 25, 35, 39, 28]],
                regular: [[41, 23, 22, 44, 45, 19, 18, 48], [32, 34, 35, 29, 28, 38, 39, 25]],
            },
            glyph: null, formConfidence: 'medium',
            note: 'In J.F.’s English of 1651, “The Table of Mercury in his compass” (p. 249), and in Hebrew notes on p. 250. Rows one, two and five to eight, as the English of 1651 has them: 8 58 59 5 4 62 63 1 / 49 15 14 52 53 11 10 56 / … / 40 26 27 37 36 30 31 33 / 17 47 46 20 21 43 42 24 / 9 55 54 12 13 51 50 16 / 64 2 3 61 60 6 7 57. Rows three and four are uncertain. As the transcription of 1651 reads them, 41 23 22 44 48 19 18 45 and 32 34 38 29 25 35 39 28, the square is not magic: its third column gives 263, its sixth column and its rising diagonal 257. Jupiter’s rule, applied block by block of four to the square of eight, with 65 in place of 17, gives 41 23 22 44 45 19 18 48 and 32 34 35 29 28 38 39 25, and with them every line gives 260 and the whole 2080. The errata of the 1651 volume list corrections for this page; whether the fault lies in the printing or in the transcription, and what the woodcut of 1533 has, is not yet settled. The names: Asboga — so the name is read; one letter is unreadable in the transcription — glossed “eight extended”: spelled אזבוגה its letters give 24, in three pairs of eight (1 + 7, 2 + 6, 3 + 5), which may be what “extended” means, though that reading is a modern inference; then Din and Doni at 64. On silver, tin or yellow brass, or written on virgin parchment, under a fortunate Mercury it makes the bearer grateful and fortunate to do what he pleases, brings gain, prevents poverty, and helps memory, understanding and divination, and the understanding of hidden things by dreams; under an unfortunate Mercury, the contrary.',
        },
        {
            order: 23, name: 'The seal of Mercury', group: 'mercury', value: 'Mercury', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'The first of two figures that stand in the English of 1651 under the heading “The Seals or Characters Of the Intelligency”, each captioned “Of Mercury.” (p. 249): the seal, and the character of the intelligence. The text says “from it is drawn a Character of Mercury, and of the spirits thereof” (p. 241).',
        },
        {
            order: 24, name: 'The character of Tiriel', group: 'mercury', value: 'the intelligence of Mercury', translit: null, numeric: 260, glyph: null, formConfidence: 'low',
            note: 'Tiriel stands at 260, the line sum. The second of the two figures under the heading “The Seals or Characters Of the Intelligency”, captioned “Of Mercury.” in the English of 1651 (p. 249).',
        },
        {
            order: 25, name: 'The character of Taphthartharath', group: 'mercury', value: 'the spirit of Mercury', translit: null, numeric: 2080, glyph: null, formConfidence: 'low',
            note: 'Taphthartharath stands at 2080, the total of the square. Captioned “Of the Spirit of Mercury.” in the English of 1651 (p. 250).',
        },
        // The Moon
        {
            order: 26, name: 'The table of the Moon', group: 'moon', value: 'the Moon', translit: '9 × 9', numeric: 369,
            side: 9, lineSum: 369, total: 3321, centre: 41,
            rows: [
                [37, 78, 29, 70, 21, 62, 13, 54, 5],
                [6, 38, 79, 30, 71, 22, 63, 14, 46],
                [47, 7, 39, 80, 31, 72, 23, 55, 15],
                [16, 48, 8, 40, 81, 32, 64, 24, 56],
                [57, 17, 49, 9, 41, 73, 33, 65, 25],
                [26, 58, 18, 50, 1, 42, 74, 34, 66],
                [67, 27, 59, 10, 51, 2, 43, 75, 35],
                [36, 68, 19, 60, 11, 52, 3, 44, 76],
                [77, 28, 69, 20, 61, 12, 53, 4, 45],
            ],
            restoredCells: [[1, 2], [1, 8], [7, 8]],
            glyph: null, formConfidence: 'high',
            note: 'In J.F.’s English of 1651, “The Table of the Moon in her Compass” (p. 251), and in Hebrew notes on p. 252. Rows from the top: 37 78 29 70 21 62 13 54 5 / 6 38 79 30 71 22 63 14 46 / 47 7 39 80 31 72 23 55 15 / 16 48 8 40 81 32 64 24 56 / 57 17 49 9 41 73 33 65 25 / 26 58 18 50 1 42 74 34 66 / 67 27 59 10 51 2 43 75 35 / 36 68 19 60 11 52 3 44 76 / 77 28 69 20 61 12 53 4 45. Every line gives 369 and the whole 3321, with 41 at the centre; Saturn’s rule gives it. As transcribed, the English of 1651 agrees except in three cells the transcription reads imperfectly — row 1, columns 2 and 8, and row 7, column 8 — where 78, 54 and 75 are the only numbers that keep every line at 369. The names: Hod and Elim, whose numbers the transcription cannot read; spelled הד and אלים they give 9 and 81, the side and the count of cells. On silver under a fortunate Moon it makes the bearer grateful, amiable, pleasant, cheerful and honoured, removes malice and ill will, gives safety on a journey, riches and health of body, and drives enemies and evils from any place chosen; engraved on lead and buried under an unfortunate Moon it makes the place and its people unfortunate, and ships, rivers, fountains and mills, drives the man it is aimed at from his country and his dwelling, and hinders physicians, orators and all men in their office.',
        },
        {
            order: 27, name: 'The seal of the Moon', group: 'moon', value: 'the Moon', translit: null, numeric: null, glyph: null, formConfidence: 'low',
            note: 'Captioned “Of the Moon.” in the English of 1651 (p. 251), whose text speaks of “the Characters of the Moon, and of the spirits thereof” (p. 242).',
        },
        {
            order: 28, name: 'The character of Hasmodai', group: 'moon', value: 'the spirit of the Moon', translit: null, numeric: 369, glyph: null, formConfidence: 'low',
            note: 'Hasmodai, “the spirit of the Moon” in the list of 1651, stands at 369, the line sum. The Moon’s list names no single intelligence. Captioned “Of the Spirit of the Moon.” (p. 251).',
        },
        {
            order: 29, name: 'The character of Schedbarschemoth Schartathan', group: 'moon', value: 'the spirit of the spirits of the Moon', translit: null, numeric: 3321, glyph: null, formConfidence: 'low',
            note: 'Set at 3321, the total, as “the spirit of the spirits of the Moon” in the list of 1651. Spelled שדברשהמעת שרתתן, the name gives 3321 only if final nun counts 700; with the ordinary values it gives 2671. The Hebrew of the plate has not been read for this page. Captioned “Of the Spirit of the spirits of the Moon.” (p. 252).',
        },
        {
            order: 30, name: 'The character of Malcha betharsisim hed beruah schehalim', group: 'moon', value: 'the intelligence of the intelligences of the Moon', translit: null, numeric: 3321, glyph: null, formConfidence: 'low',
            note: '“The Intelligency of the Intelligence of the Moon” in the list of 1651 (p. 243) and “the Intelligence of the Intelligences” in the caption (p. 252), set at 3321. The name is given as the English transliterates it; one letter of “beruah” is unreadable in the transcription. One Hebrew spelling, מלכא בתרשיתים עד ברוח שחקים, reaches 3321 if final mem counts 600, but it departs from J.F.’s transliteration in two letters — where it has tav he writes s, and where it has qoph he writes l — and spelled as he transliterates it the name reaches at most 3151, even with the great values. The Hebrew of the plate has not yet been read.',
        },
    ],
    transmission: [
        { slug: 'arabic-treatises', title: 'Arabic treatises on magic squares', kind: 'text', year: 900, end: null, circa: true, circaEnd: false, when: '10th century (reported)',
            description: 'Historians of mathematics describe a developed Arabic art of building magic squares of any size by the tenth century — Jacques Sesiano has edited treatises by al-Anṭākī and Abū’l-Wafāʾ al-Būzjānī — and among its methods the stepping rule that also gives Agrippa’s odd squares. Whether these authors tie the squares to the planets is not known here.',
            dating: 'Given as report: Sesiano’s studies could not be consulted for this page.' },
        { slug: 'buni', title: 'The letter-magic of al-Būnī', kind: 'text', year: 1225, end: null, circa: true, circaEnd: false, when: '13th century and later',
            description: 'The works that go under the name of Aḥmad al-Būnī are described as tying magic squares, awfāq, to divine names, planets and talismans — the nearest known parallel to Agrippa’s use of them. No line from them to Agrippa is documented.',
            dating: 'Al-Būnī’s death is given as 622/1225 or as 630/1232–3, and Noah Gardiner (2012) is reported to show that the corpus under his name grew after him; neither point could be confirmed for this page.' },
        { slug: 'latin-treatises', title: 'Latin treatises on the seven squares', kind: 'manuscript', year: 1300, end: 1500, circa: true, circaEnd: true, when: '14th–15th centuries (reported)',
            description: 'Menso Folkerts (1981) is reported to survey Latin treatises, translated or adapted from Arabic, that give the seven squares with the names of the planets and instructions for engraving them close to Agrippa’s. If so, they are the most likely kind of source for II.22.',
            dating: 'Given as report: the survey could not be consulted for this page, and no manuscript of these treatises is named here.' },
        { slug: 'draft-1510', title: 'The draft in Trithemius’s hands', kind: 'manuscript', year: 1510, end: null, circa: false, circaEnd: false,
            description: 'Agrippa sends the manuscript of De occulta philosophia to Trithemius, whose letter of approval, dated from Peapolis “the 8. day of April, An. M. D. X.”, the English of 1651 prints. Whether the draft held the tables is not known: for the printing, Agrippa says, “we added some Chapters”.',
            dating: 'The draft is reported to be at Würzburg, Universitätsbibliothek, M. ch. q. 50; it was not seen for this page, and Perrone Compagni’s edition (1992), which records its readings, could not be consulted.' },
        { slug: 'durer', title: 'Dürer’s Melencolia I', kind: 'event', year: 1514, end: null, circa: false, circaEnd: false,
            description: 'Albrecht Dürer’s engraving sets a square of four, its lines adding to 34, with the year 1514 in its bottom row: 16 3 2 13 / 5 10 11 8 / 9 6 7 12 / 4 15 14 1. It is Agrippa’s square of Jupiter turned upside down with its two middle columns exchanged — the same family, not the same arrangement — and nineteen years older than his print.' },
        { slug: 'agrippa-1533', title: 'Agrippa, De occulta philosophia II.22', kind: 'text', year: 1533, end: null, circa: false, circaEnd: false,
            description: 'The first printing of the tables: the seven squares with their sums, the lists of names answering to their numbers, the seals and characters of the planets and of their intelligences and spirits, and what each table does engraved on its metal. How the seals are drawn is left to “the wise searcher”.',
            dating: 'July 1533, by the colophon, as the McGill record gives it; [Cologne: J. Soter?], with Basel suggested by Adams. Whether this printing also gives each table in Hebrew numerals, as the English of 1651 does, has not yet been compared.' },
        { slug: 'jf-1651', title: 'The English of 1651', kind: 'text', year: 1651, end: null, circa: false, circaEnd: false,
            description: 'Three Books of Occult Philosophy (London: R.W. for Gregory Moule), translated by “J.F.”, prints the chapter on pp. 239–252: each table in figures and again “In Hebrew notes”, the lists of names, and the seals and characters under captions such as “Of the Spirit of Saturn.” As transcribed, its tables of Saturn, Jupiter, Mars and the Sun agree cell for cell with those given here; in its Mercury six cells differ, and its errata list corrections for the pages of Venus, Mercury and the Moon.',
            dating: 'Wing A789; ESTC R11002. The EEBO-TCP record calls the translator “probably John French”; the Wellcome record catalogues him as “J.F[reake]”, probably John French.' },
        { slug: 'barrett', title: 'Barrett’s Magus', kind: 'text', year: 1801, end: null, circa: false, circaEnd: false,
            description: 'Francis Barrett’s The Magus, or Celestial Intelligencer (London: Lackington, Allen and Co.) is widely reported to reprint the tables, names and seals from the English of 1651. Its plates are at best third-hand witnesses to Agrippa’s figures, and none is used here.',
            dating: 'Its plates were not compared for this page.' },
        { slug: 'kameas', title: 'Kameas and traced sigils', kind: 'practice', year: 1888, end: null, circa: false, circaEnd: false, when: 'from the late 19th century (reported)',
            description: 'In the ceremonial magic of the Hermetic Order of the Golden Dawn and after it, the squares are reported to be called kameas and used to trace the sigils of names, the values of the letters reduced by the nine chambers of III.30. The order has living successors: its use is described here, and none of its papers is reproduced.',
            dating: 'Given as report: the order’s papers, as Israel Regardie published them (1937–40), could not be consulted for this page. The year marks the order’s founding.' },
    ],
    claims: [
        { claim: 'Agrippa assigns seven magic squares to the planets in their descending order: Saturn three by three, Jupiter four, Mars five, the Sun six, Venus seven, Mercury eight and the Moon nine.', standing: 'documented',
            evidence: 'The English of 1651 sets them out in turn, from “The first of them is assigned to Saturn, and consists of a square of three” to “The seventh table is of the Moon, of a square of nine” (pp. 239–242). It is the old descending order of the planets, the Chaldean. In one place the text slips: Mars’s table is “made of a square of four containing twenty five numbers” (p. 240).',
            sources: ['J.F. 1651, II.xxii, pp. 239–242'] },
        { claim: 'The lines of the seven squares add to 15, 34, 65, 111, 175, 260 and 369, and their totals are 45, 136, 325, 666, 1225, 2080 and 3321.', standing: 'documented',
            evidence: 'Agrippa states every sum and total, and the English of 1651 prints them: Saturn’s “fifteen” and “fourty five” on p. 239, Jupiter’s to the Sun’s on p. 240, Venus’s and Mercury’s on p. 241, the Moon’s on p. 242. Recomputed for this page, each square as given here holds the numbers from 1 to n² once, and every row, column and diagonal gives n(n² + 1)/2. Mercury’s gives these sums only in the regular reading of its third and fourth rows.',
            sources: ['J.F. 1651, II.xxii, pp. 239–242', 'the arithmetic of this page'] },
        { claim: 'The divine names and the beings set over each table answer to its numbers.', standing: 'documented',
            evidence: 'Agrippa says so: over Saturn’s table are set “such names as fill up the numbers” (p. 239), and the lists of 1651 are headed “Divine names answering to the numbers of Saturn” and so on (p. 243). The pattern in the numbers is a modern observation; Agrippa does not state it. Where the numbers can be read, the lists set names at a table’s side, its count of cells, its line sum and its total. Saturn, Jupiter and Mars set intelligence and spirit at the total; the Sun and Mercury set the intelligence at the line sum and the spirit at the total; Venus sets Hagiel at the count of cells; the Moon sets its spirit at the line sum and its two compound beings at the total. In the Hebrew spellings worked for this page, which are not read from the plates, most names add up to their numbers; the exceptions — Adonai, Kedemel, the Bne Seraphim, Asboga and the Moon’s compound names — are set out under their entries.',
            sources: ['J.F. 1651, II.xxii, pp. 239 and 243', 'the arithmetic of this page'] },
        { claim: 'The intelligence of each table presides over its good effects, and the spirit over its evil ones.', standing: 'documented',
            evidence: 'Agrippa’s own distinction, repeated for every planet: for Saturn, names that fill up the numbers “with an Intelligency to what is good, with a spirit to what is bad” (p. 239); for Jupiter, “with an Intelligence to good, with a spirit to bad” (p. 240). It is his doctrine, reported here as such.',
            sources: ['J.F. 1651, II.xxii, pp. 239–242'] },
        { claim: 'Agrippa says that the seals and characters are drawn out of the numbers of the tables, and he withholds the method.', standing: 'documented',
            evidence: 'In the English of 1651, “out of the same numbers is drawn the seal, or Character of Saturn, and of the spirits thereof” (p. 239). At the end of the text: “Now how the seals, and Characters of the Stars, and spirits are drawn from these tables, the wise searcher, and he which shall understand the verifying of these tables, shall easily find out” (p. 242). That he says so is documented; the method is not.',
            sources: ['J.F. 1651, II.xxii, pp. 239 and 242'] },
        { claim: 'A name’s character is made by reducing the number of each letter to fit the square and joining the cells in order.', standing: 'attributed',
            evidence: 'The method is credited to the teaching of the Golden Dawn and to later commentators, Donald Tyson’s edition (1993) among them; neither could be consulted for this page, and Agrippa states no method. It can be worked: Zazel’s letters, spelled זאזל, give 7, 1, 7 and 30, which is reduced to 3, and on Saturn’s square run from the cell of 7 to the cell of 1, back to 7 and on to 3. But on the same square Agiel’s letters touch only two cells, so the method gives a single stroke run back and forth; whether that is Agrippa’s character of Agiel will be seen when the woodcut is traced. It is given here as a modern reconstruction.',
            sources: ['Regardie, The Golden Dawn (1937–40), not consulted', 'Tyson (ed.), Three Books of Occult Philosophy (1993), not consulted', 'the arithmetic of this page'] },
        { claim: 'The tables come from the Arabic tradition of magic squares.', standing: 'attributed',
            evidence: 'A judgement about lineage, not a documented line of copying. Jacques Sesiano, Schuyler Cammann and Menso Folkerts are reported to describe a developed Arabic art of magic squares from the tenth century, and Latin texts on the seven planetary squares, adapted from Arabic, before 1533; their studies could not be consulted for this page. The manuscript Agrippa used, if he used one, is not identified. His odd squares follow one stepping rule and his squares of four and eight another, both given under the tables.',
            sources: ['Sesiano (2017, 2019), not consulted', 'Folkerts (1981), not consulted', 'Cammann (1969), not consulted'] },
        { claim: 'Agrippa took the tables from Picatrix.', standing: 'disputed',
            evidence: 'No passage of Picatrix giving the seven squares has been identified for this page, and Pingree’s edition of the Latin text (1986) could not be consulted. Until such a passage is cited, Picatrix should not be named as their source.',
            sources: ['Pingree (ed.), Picatrix: The Latin Version (1986), not consulted'] },
        { claim: 'Agrippa took the tables from Cardano.', standing: 'disputed',
            evidence: 'The dates are against it. Cardano’s Practica arithmetice is cited as printed at Milan in 1539, six years after Agrippa’s printing of July 1533; the book could not be seen for this page, and its date is given as it is cited. If there is a debt, it is likelier to run from Agrippa to Cardano, or both to draw on a common source.',
            sources: ['Cardano, Practica arithmetice (1539), not consulted', 'Agrippa 1533, McGill Library record'] },
        { claim: 'The use of Saturn’s table in childbirth continues the Islamic use of the square of three, budūḥ, to ease labour.', standing: 'disputed',
            evidence: 'Agrippa’s first virtue of the table is in the English: it “doth help to bring forth, or birth” (pp. 239–240). The Islamic use of the square of three in labour, under the name budūḥ, from the letters of its corner numbers 2, 4, 6 and 8, is reported in the scholarship and associated with al-Ghazālī; whether the ascription goes back to al-Ghazālī himself or only to later writers could not be settled for this page. It is a parallel, not a documented descent.',
            sources: ['J.F. 1651, II.xxii, pp. 239–240', 'Cammann (1969), not consulted', 'Sesiano (2004, 2019), not consulted'] },
        { claim: 'The square of three was shown to the emperor Yu on the back of a turtle from the river Luo.', standing: 'legend',
            evidence: 'The Chinese legend of the Luoshu, told in versions that differ in their details. Schuyler Cammann is reported to find the arrangement itself in Chinese texts of the Han period; that could not be confirmed for this page. No link with Agrippa is documented.',
            sources: ['Cammann (1969), not consulted'] },
        { claim: 'Sorath, the spirit of the Sun, is the number of the beast.', standing: 'disputed',
            evidence: 'The arithmetic is exact: spelled סורת, Sorath gives 60 + 6 + 200 + 400 = 666, the total of the square of six. But the chapter says only “the sum of all is 666” (p. 240) and lists Sorath as “The spirit of the Sun” (p. 243); it never mentions the beast. Agrippa does cite Revelation 13:18 twice in Book II — “Let him which hath understanding compute the number of the name of the beast, which is the number of a man” (II.xx, p. 237; in slightly different words, II.iii, p. 173) — as an example of the power of the numbers of names, but never with Sorath or the Sun. Any link is a modern inference.',
            sources: ['J.F. 1651, II.iii p. 173, II.xx p. 237, II.xxii pp. 240 and 243', 'the arithmetic of this page'] },
        { claim: 'Agrippa calls the squares kameas.', standing: 'disputed',
            evidence: 'Not in the English: the word occurs nowhere in the translation of 1651, which calls them tables — “the sacred tables of the planets” (p. 239), “The Table of Saturn in his compass” (p. 244). The Latin word of 1533 is not given here. “Kamea” for a planetary square is reported as modern Western occult usage.',
            sources: ['J.F. 1651, the whole text searched'] },
        { claim: 'Agrippa’s draft of 1510 already held the tables.', standing: 'disputed',
            evidence: 'Unknown. The draft was in Trithemius’s hands by 8 April 1510, the date of his reply, which the English of 1651 prints; Agrippa says that for the printing “we added some Chapters, and we inserted many things” (“To the Reader”). The manuscript is reported to be at Würzburg (Universitätsbibliothek, M. ch. q. 50) and was not seen; Perrone Compagni’s edition (1992), which records the draft’s readings, would settle the question and could not be consulted.',
            sources: ['J.F. 1651, Trithemius’s letter and “To the Reader”', 'Perrone Compagni (ed.), 1992, not consulted'] },
        { claim: 'The names of the intelligences and spirits were known before Agrippa.', standing: 'disputed',
            evidence: 'No earlier witness has been found. Several of the divine names are biblical: Ab, Iah, Adonai, Eloh, Elim, El Ab. Agrippa himself, in Book III, presents Zazel as a demon of Hebrew tradition, citing “the Cabalists” (III.xviii, p. 401) and “the divines of the Hebrews” (III.xli, p. 475); that is his attribution, not an independent witness. The intelligences and spirits look like names composed to fit the numbers, but their origin is unknown.',
            sources: ['J.F. 1651, III.xviii p. 401 and III.xli p. 475'] },
        { claim: 'Dürer’s square of 1514 is Agrippa’s square of Jupiter.', standing: 'disputed',
            evidence: 'Recomputed: Dürer’s square is Agrippa’s square of Jupiter turned upside down with its two middle columns exchanged — the same family, not the same arrangement. The reading of Dürer’s square as Jupiter’s, set against Saturnine melancholy, is associated with Klibansky, Panofsky and Saxl’s Saturn and Melancholy (1964), which could not be consulted for this page. The engraving is nineteen years older than Agrippa’s printed table.',
            sources: ['Dürer, Melencolia I (1514)', 'the arithmetic of this page', 'Klibansky, Panofsky and Saxl (1964), not consulted'] },
    ],
    uses: [
        { use: 'Talismans engraved on the planet’s metal',
            evidence: 'Agrippa’s prescriptions, reported, not endorsed (J.F. 1651, pp. 239–242): lead for Saturn; silver for Jupiter, or coral against enchantments; iron or a sword for Mars, or “the Stone Correola” to stop blood; gold for the Sun; silver for Venus; silver, tin, yellow brass or virgin parchment for Mercury; silver for the Moon. For harm, with the planet unfortunate: red brass for Mars, brass for Venus, and lead, buried, for the Moon; for Saturn, the Sun and Mercury no other material is named, and no harmful use is given for Jupiter. The details stand under each table.' },
        { use: 'Names and characters for the intelligences and spirits of the planets',
            evidence: 'Agrippa gives each table an intelligence and a spirit — with, for Venus, “The Intelligencies of Venus”, and for the Moon “the spirit of the spirits” and “the Intelligence of the Intelligences” in place of a single intelligence — and prints their characters (J.F. 1651, pp. 243–252). Their later use, in Barrett’s Magus and in modern ceremonial magic, is widely reported but is not traced on this page.' },
        { use: 'Tracing the sigils of names',
            evidence: 'A modern practice, from the Golden Dawn onwards as it is reported: the letters of a name are reduced with the nine chambers of III.30 and their cells joined on the square. Agrippa does not describe it. The worked examples on this page were computed to show the method, and are labelled as modern.' },
        { use: 'Arithmetic',
            evidence: 'Apart from magic, the same squares are problems in arithmetic. The two simple rules that rebuild six of Agrippa’s seven are given under Saturn and Jupiter; the square of six follows neither. Historians of mathematics describe Arabic and later treatises on making such squares, a history that could not be consulted for this page.' },
    ],
    quotations: [
        {
            text: 'It is affirmed by Magicians, that there are certain tables of numbers distributed to the seven planets, which they call the sacred tables of the planets, endowed with many, and very great vertues of the Heavens, in as much as they represent that divine order of Celestiall numbers, impressed upon Celestials by the Idea’s of the divine mind, by means of the soul of the world […]',
            language: 'English',
            translation: JF,
            source: 'Agrippa, De occulta philosophia (1533), II.22, the opening; p. 239 in 1651',
            note: 'The display capitals of the opening word (“IT”) are normalised; spelling and punctuation are the transcription’s.',
        },
        {
            text: 'The first of them is assigned to Saturn, and consists of a square of three, containing the particular numbers of nine, and in every line three every way, and through each Diameter making fifteen. Now the whole sum of numbers is fourty five. Over this are of Divine names set such names as fill up the numbers with an Intelligency to what is good, with a spirit to what is bad, and out of the same numbers is drawn the seal, or Character of Saturn, and of the spirits thereof, such as we shall beneath ascribe to its table.',
            language: 'English',
            translation: JF,
            source: 'Agrippa, De occulta philosophia (1533), II.22, the table of Saturn; p. 239 in 1651',
        },
        {
            text: 'They say that this table being with a fortunate Saturn engraven on a plate of lead, doth help to bring forth, or birth, and to make a man safe, and powerfull, and to cause success of petitious with princes, and powers: but if it be done with an unfortunate Saturn, that it hinders buildings, plantings, and the like, and casts a man from honours, and dignities, and causes discords, and quarrellings, and disperses an Army.',
            language: 'English',
            translation: JF,
            source: 'Agrippa, De occulta philosophia (1533), II.22, the virtues of the table of Saturn; pp. 239–240 in 1651',
            note: '“Petitious”, for “petitions”, is the transcription’s reading.',
        },
        {
            text: 'The fourth table is of the Sun, and is made of a square of six, and contains thirty six numbers, whereof six in every side, and Diameter, produce III. and the sum of all is 666.',
            language: 'English',
            translation: JF,
            source: 'Agrippa, De occulta philosophia (1533), II.22, the table of the Sun; p. 240 in 1651',
            note: 'The line sum, 111, reads “III.” in the transcription.',
        },
        {
            text: 'Now how the seals, and Characters of the Stars, and spirits are drawn from these tables, the wise searcher, and he which shall understand the verifying of these tables, shall easily find out.',
            language: 'English',
            translation: JF,
            source: 'Agrippa, De occulta philosophia (1533), II.22, the close of the text before the tables; p. 242 in 1651',
        },
    ],
    links: [
        { to: 'agrippa', relation: 'The author and the Three Books, in which II.22 stands among the chapters a reader of this wing meets again and again.' },
        { to: 'hebrew', relation: 'Every name and every sum rests on the numbers of the Hebrew letters, including the “great” values of the final letters that the Moon’s compound names need.' },
        { to: 'aiq-bekar', relation: 'The nine chambers of III.30 (“nine Chambers”, J.F. 1651, p. 442) give the reduction — 300 to 30 to 3 — that the modern tracing method uses to fit a name onto a square.' },
        { to: 'arabic', relation: 'The Arabic tradition of magic squares, wafq and awfāq, to which historians trace these squares; no line of descent to Agrippa is documented.' },
        { to: 'charakteres', relation: 'The characters of the intelligences and spirits stand in the long line of invented magical signs that runs from the Greek handbooks into Agrippa’s Latin.' },
        { to: 'celestial', relation: 'Book III’s angelic alphabets are Agrippa’s other way of giving a name a visible form; the seals are the way through numbers.' },
        { to: 'signs-of-the-art', relation: 'The common signs of the seven planets, which are not the seals printed here: Agrippa’s seals are figures of their own, drawn, he says, from the tables.' },
        { to: 'alphabet-of-the-magi', relation: 'The pseudo-Paracelsian Archidoxis magica, discussed there, also prescribes seals bearing names and characters; its relation to Agrippa’s tables is not established.' },
        { to: 'the-books', relation: 'The chain of books in which the tables travelled with the alphabets, from Agrippa to the English of 1651 and beyond.' },
    ],
    cautions: [
        'No seal or character is shown, because none has yet been traced from the woodcuts of 1533; a figure presented as Agrippa’s that was not taken from his page would be worse than a gap.',
        'The numbers of the tables are given from the English of 1651, as transcribed by EEBO-TCP, and recomputed; the woodcuts of 1533 have not yet been compared. The volume’s own errata list corrections for the pages of the Venus, Mercury and Moon tables (pp. 247, 249 and 251).',
        'Mercury’s third and fourth rows are uncertain: as transcribed from the English of 1651 they make a square that is not magic. Both readings are given under the table, and neither is presented as Agrippa’s.',
        'The numbers beside the names are often hard to read in the transcription of 1651, where many first digits, and some whole numbers, are lost. Where the legible digits agree with one of a table’s numbers, that number is given; where none can be read, the entry says so; where they disagree — Adonai, Kedemel, the Bne Seraphim — the page says so and does not quietly correct them. Venus’s first name and Mars’s name at 25 are not identified.',
        'The Hebrew of the names is printed in the plates and has not been read for this page. Where a sum is worked, the Hebrew spelling it is worked from is printed beside it.',
        'Tracing a name from cell to cell is a modern method, credited to the Golden Dawn and later commentators. Agrippa gives no method and leaves it to “the wise searcher”.',
        '“Intelligence” and “spirit” are J.F.’s English. Agrippa sets the one over good effects and the other over evil ones; that is his doctrine, reported here, neither endorsed nor mocked. His Latin words are not given, because the Latin of the chapter has not been read for this page.',
        'Sorath’s letters give 666, the total of the Sun’s table, and that is all the chapter says. It makes no link with the number of the beast, though Agrippa cites that number twice elsewhere in Book II.',
        '“Kamea” is not presented here as Agrippa’s word: it occurs nowhere in the English of 1651, which calls them tables.',
        'The English of 1651 prints every table a second time, “In Hebrew notes”. Whether the woodcuts of 1533 do the same, and how they write 15 and 16, is not yet known, so no Hebrew table is given here.',
        'The history of magic squares before Agrippa rests here on scholarship that could not be consulted for this page, and is given as report.',
        'The Golden Dawn has living successors. Its use of the squares is described; none of its papers or emblems is reproduced.',
    ],
    sources: [
        { citation: 'Heinrich Cornelius Agrippa, De occulta philosophia libri tres ([Cologne: J. Soter?], July 1533), Book II, chapter 22; Library of Congress copy, digitised.', url: 'https://www.loc.gov/item/20007812' },
        { citation: 'The same, McGill Library copy, digitised at the Internet Archive; its record gives July 1533 from the colophon and notes four or five issues of that date.', url: 'https://archive.org/details/McGillLibrary-osl_henrici-cornelii-agrippae_folioA279o1533-19978' },
        { citation: 'The same, Eton College Library catalogue record (“[J. Soter?]”; Adams suggests Basel).', url: 'https://catalogue.etoncollege.com/B25098' },
        { citation: 'Agrippa, De occulta philosophia libri tres, ed. Vittoria Perrone Compagni (Leiden: Brill, 1992), Studies in the History of Christian Thought 48; Wellcome Collection record; not consulted for this page.', url: 'https://preview.wellcomecollection.org/works/ymvvbx6a' },
        { citation: 'Agrippa, Three Books of Occult Philosophy, trans. J.F. (probably John French) (London: R.W. for Gregory Moule, 1651; Wing A789; ESTC R11002), Book II, ch. xxii, pp. 239–252: EEBO-TCP A26565, table of contents.', url: 'https://quod.lib.umich.edu/e/eebo/A26565.0001.001?view=toc' },
        { citation: 'The same, the EEBO-TCP keyed text (CC0), from which the passages, captions, lists and tables of 1651 are read.', url: 'https://github.com/textcreationpartnership/A26565' },
        { citation: 'The same, Wellcome Collection record (“J.F[reake]”, probably John French).', url: 'https://wellcomecollection.org/works/ftahuupv' },
        { citation: 'Stanford Encyclopedia of Philosophy, “Heinrich Cornelius Agrippa von Nettesheim”.', url: 'https://plato.stanford.edu/entries/agrippa-nettesheim/' },
        { citation: 'Francis Barrett, The Magus, or Celestial Intelligencer (London: Lackington, Allen and Co., 1801), Wellcome copy, Internet Archive.', url: 'https://archive.org/download/b22006795/b22006795.pdf' },
        { citation: 'Menso Folkerts, “Zur Frühgeschichte der magischen Quadrate in Westeuropa”, Sudhoffs Archiv 65 (1981); not consulted for this page.' },
        { citation: 'Jacques Sesiano, Magic Squares in the Tenth Century: Two Arabic Treatises by Anṭākī and Būzjānī (Cham: Springer, 2017); not consulted for this page.' },
        { citation: 'Jacques Sesiano, Magic Squares: Their History and Construction from Ancient Times to AD 1600 (Cham: Springer, 2019); not consulted for this page.' },
        { citation: 'Jacques Sesiano, Les carrés magiques dans les pays islamiques (Lausanne: Presses polytechniques et universitaires romandes, 2004); not consulted for this page.' },
        { citation: 'Schuyler Cammann, “Islamic and Indian Magic Squares”, History of Religions 8 (1969); not consulted for this page.' },
        { citation: 'Noah Gardiner, “Forbidden Knowledge? Notes on the Production, Transmission, and Reception of the Major Works of Aḥmad al-Būnī”, Journal of Arabic and Islamic Studies 12 (2012); not consulted for this page.' },
        { citation: 'Raymond Klibansky, Erwin Panofsky and Fritz Saxl, Saturn and Melancholy (London: Nelson, 1964); not consulted for this page.' },
        { citation: 'David Pingree (ed.), Picatrix: The Latin Version of the Ghāyat al-Ḥakīm (London: Warburg Institute, 1986); not consulted for this page.' },
        { citation: 'Girolamo Cardano, Practica arithmetice et mensurandi singularis (Milan, 1539); not consulted for this page.' },
        { citation: 'Donald Tyson (ed.), Three Books of Occult Philosophy (St Paul: Llewellyn, 1993), the appendix on the magic squares; in copyright, and not consulted for this page.' },
        { citation: 'Israel Regardie, The Golden Dawn, 4 vols (Chicago: Aries Press, 1937–1940); not consulted for this page.' },
        { citation: 'The arithmetic of this page — the sums of every square, the two construction rules, the letter-sums of the names, the comparison with Dürer’s square and the traced examples — worked for this page and checked a second time.' },
    ],
};
