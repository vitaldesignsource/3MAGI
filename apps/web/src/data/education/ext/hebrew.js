// Hebrew hall extension — numbers, glossed readings, correspondences.
// Authored and fact-checked by the content pipeline (arithmetic recomputed,
// glyphs verified against Unicode names, sources audited).
export default {
    numbers: {
        note: 'Hebrew has no separate numerals: the twenty-two letters carry the values themselves — aleph to tet for the units 1–9, yod to tsadi for the tens 10–90, and qof to tav for the hundreds 100–400. (Modern Israeli Hebrew writes ordinary Arabic figures; the letter-numerals survive for dates, festivals, chapter and verse, and every kind of gematria.) There is no zero and no place value; a numeral is simply the sum of its letters, written with the largest value first, so right to left as the script runs. Numbers above four hundred are built by combination: 500 is ת״ק (400+100), 600 ת״ר, 700 ת״ש, 800 ת״ת (400+400), 900 תת״ק (400+400+100). The use of the five final forms (ך ם ן ף ץ) for 500, 600, 700, 800 and 900 is a considerably later convention — a scribal and gematric device, the mispar gadol, found in some medieval and early modern works, not in the Talmudic or Masoretic tradition — and it is used sparingly, never in ordinary dating; the combined forms remain standard. Two marks show that letters are being read as number rather than word: a single geresh (׳) after a lone letter, as א׳ for 1, and gershayim (״) set before the final letter of a numeral of two or more letters, as תרי״ג for 613. In plain typing the ASCII apostrophe and quotation mark commonly stand in for them. Thousands are marked by a geresh on the leading letter — ה׳ for five thousand — though Jewish years are most often given lifrat katan, \'by the small reckoning\', with the millennium simply left off.',
        digits: [
            {
                glyph: 'א',
                value: 1,
                name: 'Aleph',
                unicodeName: 'HEBREW LETTER ALEF',
            },
            {
                glyph: 'ב',
                value: 2,
                name: 'Bet',
                unicodeName: 'HEBREW LETTER BET',
            },
            {
                glyph: 'ג',
                value: 3,
                name: 'Gimel',
                unicodeName: 'HEBREW LETTER GIMEL',
            },
            {
                glyph: 'ד',
                value: 4,
                name: 'Dalet',
                unicodeName: 'HEBREW LETTER DALET',
            },
            {
                glyph: 'ה',
                value: 5,
                name: 'He',
                unicodeName: 'HEBREW LETTER HE',
            },
            {
                glyph: 'ו',
                value: 6,
                name: 'Vav',
                unicodeName: 'HEBREW LETTER VAV',
            },
            {
                glyph: 'ז',
                value: 7,
                name: 'Zayin',
                unicodeName: 'HEBREW LETTER ZAYIN',
            },
            {
                glyph: 'ח',
                value: 8,
                name: 'Chet',
                unicodeName: 'HEBREW LETTER HET',
            },
            {
                glyph: 'ט',
                value: 9,
                name: 'Tet',
                unicodeName: 'HEBREW LETTER TET',
            },
            {
                glyph: 'י',
                value: 10,
                name: 'Yod',
                unicodeName: 'HEBREW LETTER YOD',
            },
            {
                glyph: 'כ',
                value: 20,
                name: 'Kaf',
                unicodeName: 'HEBREW LETTER KAF',
            },
            {
                glyph: 'ל',
                value: 30,
                name: 'Lamed',
                unicodeName: 'HEBREW LETTER LAMED',
            },
            {
                glyph: 'מ',
                value: 40,
                name: 'Mem',
                unicodeName: 'HEBREW LETTER MEM',
            },
            {
                glyph: 'נ',
                value: 50,
                name: 'Nun',
                unicodeName: 'HEBREW LETTER NUN',
            },
            {
                glyph: 'ס',
                value: 60,
                name: 'Samekh',
                unicodeName: 'HEBREW LETTER SAMEKH',
            },
            {
                glyph: 'ע',
                value: 70,
                name: 'Ayin',
                unicodeName: 'HEBREW LETTER AYIN',
            },
            {
                glyph: 'פ',
                value: 80,
                name: 'Pe',
                unicodeName: 'HEBREW LETTER PE',
            },
            {
                glyph: 'צ',
                value: 90,
                name: 'Tsadi',
                unicodeName: 'HEBREW LETTER TSADI',
            },
            {
                glyph: 'ק',
                value: 100,
                name: 'Qof',
                unicodeName: 'HEBREW LETTER QOF',
            },
            {
                glyph: 'ר',
                value: 200,
                name: 'Resh',
                unicodeName: 'HEBREW LETTER RESH',
            },
            {
                glyph: 'ש',
                value: 300,
                name: 'Shin',
                unicodeName: 'HEBREW LETTER SHIN',
            },
            {
                glyph: 'ת',
                value: 400,
                name: 'Tav',
                unicodeName: 'HEBREW LETTER TAV',
            },
        ],
        examples: [
            {
                native: 'טו',
                value: 15,
                note: 'Tet (9) + vav (6). The expected spelling would be yod-he (10 + 5), but that is יה, Yah, a Name of God; so fifteen is written 9 + 6 instead — the reason the fifteenth of a month, as in Tu bi-Shvat and Tu be-Av, is spoken as \'Tu\'.',
            },
            {
                native: 'טז',
                value: 16,
                note: 'Tet (9) + zayin (7), avoiding yod-vav (10 + 6). The reason usually given is that יו likewise stands for the Name: it serves as a scribal abbreviation of the Tetragrammaton and is the theophoric element Yo- in names such as Yoḥanan. (יו is not the opening of the Tetragrammaton, as is sometimes said — that is יה, the spelling avoided at fifteen.) Others explain sixteen more simply, as following the analogy of fifteen.',
            },
            {
                native: 'חי',
                value: 18,
                note: 'Chet (8) + yod (10) — and the word chai, \'living\'. Hence the custom of giving charity and gifts in multiples of eighteen: the sum is read as a blessing of life rather than a quantity.',
            },
            {
                native: 'תרי״ג',
                value: 613,
                note: 'Tav (400) + resh (200) + yod (10) + gimel (3), pronounced taryag: the number of the commandments of the Torah as reckoned by R. Simlai in the Talmud (Makkot 23b), 365 prohibitions and 248 positive commands. The gershayim before the final letter mark the string as a numeral.',
            },
            {
                native: 'ה׳תשפ״ו',
                value: 5786,
                note: 'The Jewish year running from autumn 2025 to autumn 2026. He with a geresh gives the fifth millennium; tav (400) + shin (300) + pe (80) + vav (6) gives 786. In practice the millennium is usually dropped and the year printed simply תשפ״ו — the \'small reckoning\', lifrat katan.',
            },
        ],
        special: 'Fifteen and sixteen are never written יה or יו. יה is the Name Yah; יו serves as a scribal abbreviation of the Tetragrammaton and is the theophoric element Yo- in proper names. So Hebrew numeration substitutes טו (9 + 6) and טז (9 + 7). The substitution is inherited by every larger number ending in fifteen or sixteen — 115 is קטו, 216 is רטז — and it is the one place where reverence, not arithmetic, dictates the form of a number.',
    },
    readings: [
        {
            title: 'The Opening of the Torah',
            source: 'Genesis 1:1 (Masoretic Text; unpointed consonantal spelling)',
            words: [
                {
                    native: 'בראשית',
                    translit: 'bereshit',
                    gloss: 'in the beginning',
                },
                {
                    native: 'ברא',
                    translit: 'bara',
                    gloss: 'created',
                },
                {
                    native: 'אלהים',
                    translit: 'Elohim',
                    gloss: 'God',
                },
                {
                    native: 'את',
                    translit: 'et',
                    gloss: '(marker of the definite object; not translated)',
                },
                {
                    native: 'השמים',
                    translit: 'ha-shamayim',
                    gloss: 'the heavens',
                },
                {
                    native: 'ואת',
                    translit: 've-et',
                    gloss: 'and (object marker)',
                },
                {
                    native: 'הארץ',
                    translit: 'ha-arets',
                    gloss: 'the earth',
                },
            ],
            translation: 'In the beginning God created the heavens and the earth.',
            note: 'Seven words and twenty-eight letters, both multiples of seven — a count later kabbalistic writing returns to often. Rashi reads bereshit as a construct, \'When God began to create\', rather than an absolute \'In the beginning\'; the Septuagint (Ἐν ἀρχῇ) and the Vulgate (In principio) take the absolute sense, and the ambiguity is genuine Hebrew, not a translator\'s fault. The particle את has no English equivalent; the kabbalistic commonplace reads it as aleph-to-tav, the whole alphabet folded into the act of creation.',
            grid: null,
        },
        {
            title: 'The Shema',
            source: 'Deuteronomy 6:4; recited evening and morning (Mishnah Berakhot 1:1–2)',
            words: [
                {
                    native: 'שמע',
                    translit: 'shemaʿ',
                    gloss: 'hear!',
                },
                {
                    native: 'ישראל',
                    translit: 'Yisraʾel',
                    gloss: 'O Israel',
                },
                {
                    native: 'יהוה',
                    translit: 'YHWH',
                    gloss: 'the LORD (the Name, read as Adonai)',
                },
                {
                    native: 'אלהינו',
                    translit: 'eloheinu',
                    gloss: 'our God',
                },
                {
                    native: 'יהוה',
                    translit: 'YHWH',
                    gloss: 'the LORD',
                },
                {
                    native: 'אחד',
                    translit: 'eḥad',
                    gloss: 'one',
                },
            ],
            translation: 'Hear, O Israel: the LORD our God, the LORD is one.',
            note: 'The verse has no verb \'is\'; Hebrew simply juxtaposes, and translators must choose where to place the copula — \'the LORD is our God, the LORD is one\' is equally defensible. In every Torah scroll the ayin of shemaʿ and the dalet of eḥad are written large, and the two letters spell עד, ʿed, \'witness\'. The Tetragrammaton is not pronounced: the reader says Adonai in its place.',
            grid: null,
        },
        {
            title: 'Barukh Shem',
            source: 'Mishnah Yoma 3:8 (also 4:1–2 and 6:2): the response in the Temple to the Explicit Name; on its place in the liturgy, Pesachim 56a',
            words: [
                {
                    native: 'ברוך',
                    translit: 'barukh',
                    gloss: 'blessed',
                },
                {
                    native: 'שם',
                    translit: 'shem',
                    gloss: '(be) the name',
                },
                {
                    native: 'כבוד',
                    translit: 'kevod',
                    gloss: 'of the glory of',
                },
                {
                    native: 'מלכותו',
                    translit: 'malkhuto',
                    gloss: 'his kingdom',
                },
                {
                    native: 'לעולם',
                    translit: 'le-ʿolam',
                    gloss: 'for ever',
                },
                {
                    native: 'ועד',
                    translit: 'va-ʿed',
                    gloss: 'and ever',
                },
            ],
            translation: 'Blessed be the name of the glory of His kingdom for ever and ever.',
            note: 'Not a biblical verse but a liturgical formula. The Mishnah records that when the High Priest pronounced the Explicit Name in his confessions on the Day of Atonement, the priests and the people standing in the courtyard knelt, prostrated themselves and fell on their faces, answering with these words. It follows the first line of the Shema to this day, said in an undertone. Two explanations circulate and should not be merged: Pesachim 56a tells of Jacob\'s sons answering him with the Shema and Jacob replying \'Barukh shem…\', which is why the line is said although it stands nowhere in the Torah\'s text; Deuteronomy Rabbah 2:36 has Moses overhear the phrase among the angels, which is the reason usually given for saying it quietly — and aloud on Yom Kippur, when Israel is held to be angel-like.',
            grid: null,
        },
        {
            title: 'The Priestly Blessing, first line',
            source: 'Numbers 6:24 (first of the three lines of the Birkat Kohanim, Numbers 6:24–26)',
            words: [
                {
                    native: 'יברכך',
                    translit: 'yevarekhekha',
                    gloss: 'may He bless you',
                },
                {
                    native: 'יהוה',
                    translit: 'YHWH',
                    gloss: 'the LORD',
                },
                {
                    native: 'וישמרך',
                    translit: 've-yishmerekha',
                    gloss: 'and keep you',
                },
            ],
            translation: 'May the LORD bless you and keep you.',
            note: 'The three lines widen as they go — three words, then five, then seven — and the \'you\' throughout is singular, addressed to each hearer rather than to the assembly. Two rolled silver amulets excavated at Ketef Hinnom outside Jerusalem carry a version of this blessing and are dated by their excavators to the late seventh or early sixth century BCE, which would make them the oldest surviving witnesses to any biblical text.',
            grid: null,
        },
        {
            title: 'The Name at the Bush',
            source: 'Exodus 3:14 (the answer to Moses\' question)',
            words: [
                {
                    native: 'אהיה',
                    translit: 'ehyeh',
                    gloss: 'I shall be',
                },
                {
                    native: 'אשר',
                    translit: 'asher',
                    gloss: 'who, that, what',
                },
                {
                    native: 'אהיה',
                    translit: 'ehyeh',
                    gloss: 'I shall be',
                },
            ],
            translation: 'I shall be what I shall be.',
            note: 'The verb is imperfect, so \'I AM THAT I AM\' — the Authorised Version, following the Vulgate\'s ego sum qui sum and behind it the Septuagint\'s ἐγώ εἰμι ὁ ὤν — narrows a form that in Hebrew leans toward the future. Berakhot 9b glosses it as a promise of presence: as I am with them in this affliction, so shall I be with them in others. Its four letters sum to twenty-one, and kabbalah assigns Ehyeh to Keter, the hidden crown, as it assigns the Tetragrammaton (26) to Tiferet.',
            grid: null,
        },
        {
            title: 'The First Mishnah of Sefer Yetzirah',
            source: 'Sefer Yetzirah 1:1, opening clause (wording as in the Gra–Ari recension; the work was first printed at Mantua, 1562, in the short and long recensions)',
            words: [
                {
                    native: 'בשלשים',
                    translit: 'bi-shloshim',
                    gloss: 'with thirty',
                },
                {
                    native: 'ושתים',
                    translit: 'u-shtayim',
                    gloss: 'and two',
                },
                {
                    native: 'נתיבות',
                    translit: 'netivot',
                    gloss: 'paths',
                },
                {
                    native: 'פליאות',
                    translit: 'peliʾot',
                    gloss: 'wonders, wondrous',
                },
                {
                    native: 'חכמה',
                    translit: 'ḥokhmah',
                    gloss: 'of wisdom',
                },
                {
                    native: 'חקק',
                    translit: 'ḥaqaq',
                    gloss: 'engraved, incised',
                },
                {
                    native: 'יה',
                    translit: 'Yah',
                    gloss: 'Yah (the short Name)',
                },
            ],
            translation: 'With thirty-two wondrous paths of wisdom, Yah engraved…',
            note: 'The construct chain נתיבות פליאות חכמה is itself ambiguous: \'wondrous paths of wisdom\' and \'paths of the wonders of wisdom\' are both defensible, and both are printed. The sentence continues through a long chain of divine titles before its verb completes, ending \'…and created His world with three sefarim: with sefer, sefar and sippur\' (בספר וספר וסיפור) — writing, number and telling. The thirty-two paths are the ten sefirot and the twenty-two letters, as the next mishnah states outright (1:2, \'ten sefirot of nothingness and twenty-two foundation letters\'). The book survives in several genuinely divergent recensions — short, long, the Saadia version, and the much later Gra–Ari text — whose chapter and verse divisions do not agree, so citations to Sefer Yetzirah are only ever approximate. Its date is disputed: most scholarship places it between the third and sixth centuries CE, with proposals ranging from the second to as late as the ninth.',
            grid: null,
        },
    ],
    correspondences: {
        note: 'Sefer Yetzirah divides the alphabet into three classes: three mother letters (chapter 3), seven doubles — those sounded hard or soft, bet, gimel, dalet, kaf, pe, resh, tav, בג״ד כפר״ת (chapter 4) — and twelve simple letters (chapter 5). The mothers are given to the elements in every recension alike: aleph to air, mem to water, shin to fire. Earth is not among them; where the book speaks of earth it is formed out of water rather than standing as a fourth element. The twelve simples run in alphabetical order through the zodiac and the months, beginning with he for Aries at Nisan; the recensions substantially agree here, differing only in detail. The seven doubles are the contested case. The planetary attributions given below are those of the Hermetic Order of the Golden Dawn — bet to Mercury, gimel to the Moon, dalet to Venus, kaf to Jupiter, pe to Mars, resh to the Sun, tav to Saturn. They follow from the Order\'s pairing of the letters with the Tarot trumps on the Kircher Tree of Life, set out in the Order\'s knowledge lectures and tabulated for the public in Crowley\'s Liber 777 (1909), and they underlie most subsequent Western esoteric writing. The Hebrew manuscript tradition assigns them differently: the Gra–Ari text runs the doubles in descending Chaldean order — bet to Saturn, gimel to Jupiter, dalet to Mars, kaf to the Sun, pe to Venus, resh to Mercury, tav to the Moon — and the long and Saadian recensions differ again from both. No single ordering can be called the authentic one; the Golden Dawn scheme is used here because the portal serves readers of the Western esoteric tradition, and it should be recognised as such rather than mistaken for the reading of the Hebrew text. The Golden Dawn additionally gives tav rulership of the element of Earth alongside Saturn — its trump is the World, or Universe — supplying the fourth element that the three mothers omit.',
        entries: [
            {
                letter: 'Aleph',
                correspondence: 'Air — mother letter',
            },
            {
                letter: 'Bet',
                correspondence: 'Mercury — double letter (Golden Dawn)',
            },
            {
                letter: 'Gimel',
                correspondence: 'Moon — double letter (Golden Dawn)',
            },
            {
                letter: 'Dalet',
                correspondence: 'Venus — double letter (Golden Dawn)',
            },
            {
                letter: 'He',
                correspondence: 'Aries — simple letter',
            },
            {
                letter: 'Vav',
                correspondence: 'Taurus — simple letter',
            },
            {
                letter: 'Zayin',
                correspondence: 'Gemini — simple letter',
            },
            {
                letter: 'Chet',
                correspondence: 'Cancer — simple letter',
            },
            {
                letter: 'Tet',
                correspondence: 'Leo — simple letter',
            },
            {
                letter: 'Yod',
                correspondence: 'Virgo — simple letter',
            },
            {
                letter: 'Kaf',
                correspondence: 'Jupiter — double letter (Golden Dawn)',
            },
            {
                letter: 'Lamed',
                correspondence: 'Libra — simple letter',
            },
            {
                letter: 'Mem',
                correspondence: 'Water — mother letter',
            },
            {
                letter: 'Nun',
                correspondence: 'Scorpio — simple letter',
            },
            {
                letter: 'Samekh',
                correspondence: 'Sagittarius — simple letter',
            },
            {
                letter: 'Ayin',
                correspondence: 'Capricorn — simple letter',
            },
            {
                letter: 'Pe',
                correspondence: 'Mars — double letter (Golden Dawn)',
            },
            {
                letter: 'Tsadi',
                correspondence: 'Aquarius — simple letter',
            },
            {
                letter: 'Qof',
                correspondence: 'Pisces — simple letter',
            },
            {
                letter: 'Resh',
                correspondence: 'Sun — double letter (Golden Dawn)',
            },
            {
                letter: 'Shin',
                correspondence: 'Fire — mother letter',
            },
            {
                letter: 'Tav',
                correspondence: 'Saturn — double letter (Golden Dawn)',
            },
        ],
    },
};
