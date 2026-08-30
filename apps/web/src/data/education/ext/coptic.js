// Coptic hall extension — numbers, glossed readings, correspondences.
// Authored and fact-checked by the content pipeline (arithmetic recomputed,
// glyphs verified against Unicode names, sources audited). Every native
// string here is drawn from the Coptic block (U+2C80–U+2CFF) and the
// Demotic-derived letters Unicode left at U+03E2–U+03EF; nothing in it is a
// Greek letter wearing Coptic clothes.
export default {
    numbers: {
        note: 'Coptic writes its numbers in Greek and says them in Egyptian. The signs are the Ionic or Milesian series taken over whole with the alphabet — nine units, nine tens, nine hundreds, every letter a numeral — and they work as they did in Greek: additive, largest first, no zero, no place value, so that ⲧ̅ⲝ̅ⲉ̅ is nothing but 300 + 60 + 5 and would come to the same total in any order. The words a reader would speak over those signs, however, are not Greek at all. They are the last form of the numerals of the hieroglyphs: ⲟⲩⲁ, ⲥⲛⲁⲩ, ϣⲟⲙⲛⲧ, ϥⲧⲟⲟⲩ for one to four, ϣⲉ a hundred, ϣⲟ a thousand, ⲧⲃⲁ ten thousand — Egyptian words three thousand years old, unchanged in office and only worn in sound. A Coptic page counts in one language and spells the count in another, which is the whole condition of the script in miniature. What marks a group of letters as a number is the stroke: a supralinear line drawn over them tells the reader that these are a quantity and not a word. It is the same stroke that Sahidic sets over a consonant to make it a syllable in its own right (ⲙ̅, ⲛ̅, ⲣ̅) and over the sacred contractions (ⲓ̅ⲥ̅, ⲡⲉⲭ̅ⲥ̅), here doing a third office; context, and nothing else, tells a reader which of the three is meant. In the manuscripts the line is continuous across the whole group. Unicode provides the half-macrons U+FE24 COMBINING MACRON LEFT HALF, U+FE25 COMBINING MACRON RIGHT HALF and U+FE26 COMBINING CONJOINING MACRON to draw exactly that, but their rendering is uneven across fonts, so this hall approximates the line with a plain COMBINING OVERLINE (U+0305) on each letter, which every Coptic face handles: the appearance differs, the meaning does not. The interesting part is where the two systems fail to fit. Greek needed twenty-seven numeral slots and had twenty-four letters, and filled the difference with three signs that had already stopped being sounds — episemon at six, koppa at ninety, sampi at nine hundred. Coptic kept the first of the three and replaced the other two out of its own borrowed stock. ⲋ survives as a letter with a value and no voice: it spells no word, and stands in the alphabet purely to hold the six. But ninety went to ϥ and nine hundred to ϯ, two of the Demotic-derived letters, fully alive as sounds and now carrying numbers besides — Egyptian signs doing the work of dead Greek ones. The rest of the Demotic set — ϣ, ϧ, ϩ, ϫ, ϭ — stand outside the count altogether: they spell and never reckon, and a reader summing a Coptic word passes over them in silence. One consequence is that alphabetical order and numerical order part company. ϥ sits near the end of the alphabet and between ⲡ and ⲣ in the count; ϯ, last of the borrowed letters, happens also to be the last of the numerals, so the series ends where the alphabet does. The six-sign is named ⲥⲟⲩ — three ordinary letters, not the sign itself — and those same three letters make the small word Coptic sets before the day of a month in a date, ⲥⲟⲩ ⲕ̅ⲑ̅, \'on the twenty-ninth\'. That word is the old Egyptian sw, which had stood before day-numbers since the hieroglyphs and went on standing there after the alphabet changed underneath it. Whether the letter took its name from the numeral word ⲥⲟⲟⲩ, six, or from somewhere else is not settled; the grammars record the coincidence and leave it.',
        digits: [
            {
                glyph: 'ⲁ',
                value: 1,
                name: 'alfa',
                unicodeName: 'COPTIC SMALL LETTER ALFA (U+2C81)',
            },
            {
                glyph: 'ⲃ',
                value: 2,
                name: 'vida',
                unicodeName: 'COPTIC SMALL LETTER VIDA (U+2C83)',
            },
            {
                glyph: 'ⲅ',
                value: 3,
                name: 'gamma',
                unicodeName: 'COPTIC SMALL LETTER GAMMA (U+2C85)',
            },
            {
                glyph: 'ⲇ',
                value: 4,
                name: 'dalda',
                unicodeName: 'COPTIC SMALL LETTER DALDA (U+2C87)',
            },
            {
                glyph: 'ⲉ',
                value: 5,
                name: 'eie',
                unicodeName: 'COPTIC SMALL LETTER EIE (U+2C89)',
            },
            {
                glyph: 'ⲋ',
                value: 6,
                name: 'sou — a numeral and no sound',
                unicodeName: 'COPTIC SMALL LETTER SOU (U+2C8B); the Greek episemon, printed there as stigma ϛ or written as digamma ϝ',
            },
            {
                glyph: 'ⲍ',
                value: 7,
                name: 'zata',
                unicodeName: 'COPTIC SMALL LETTER ZATA (U+2C8D)',
            },
            {
                glyph: 'ⲏ',
                value: 8,
                name: 'hate',
                unicodeName: 'COPTIC SMALL LETTER HATE (U+2C8F)',
            },
            {
                glyph: 'ⲑ',
                value: 9,
                name: 'thethe',
                unicodeName: 'COPTIC SMALL LETTER THETHE (U+2C91)',
            },
            {
                glyph: 'ⲓ',
                value: 10,
                name: 'iauda',
                unicodeName: 'COPTIC SMALL LETTER IAUDA (U+2C93)',
            },
            {
                glyph: 'ⲕ',
                value: 20,
                name: 'kapa',
                unicodeName: 'COPTIC SMALL LETTER KAPA (U+2C95)',
            },
            {
                glyph: 'ⲗ',
                value: 30,
                name: 'laula',
                unicodeName: 'COPTIC SMALL LETTER LAULA (U+2C97)',
            },
            {
                glyph: 'ⲙ',
                value: 40,
                name: 'mi',
                unicodeName: 'COPTIC SMALL LETTER MI (U+2C99)',
            },
            {
                glyph: 'ⲛ',
                value: 50,
                name: 'ni',
                unicodeName: 'COPTIC SMALL LETTER NI (U+2C9B)',
            },
            {
                glyph: 'ⲝ',
                value: 60,
                name: 'ksi',
                unicodeName: 'COPTIC SMALL LETTER KSI (U+2C9D)',
            },
            {
                glyph: 'ⲟ',
                value: 70,
                name: 'o',
                unicodeName: 'COPTIC SMALL LETTER O (U+2C9F)',
            },
            {
                glyph: 'ⲡ',
                value: 80,
                name: 'pi',
                unicodeName: 'COPTIC SMALL LETTER PI (U+2CA1)',
            },
            {
                glyph: 'ϥ',
                value: 90,
                name: 'fai — Demotic, standing where Greek wrote koppa',
                unicodeName: 'COPTIC SMALL LETTER FEI (U+03E5), one of the seven Demotic-derived letters Unicode left in the Greek and Coptic block rather than re-encoding at U+2C80',
            },
            {
                glyph: 'ⲣ',
                value: 100,
                name: 'ro',
                unicodeName: 'COPTIC SMALL LETTER RO (U+2CA3)',
            },
            {
                glyph: 'ⲥ',
                value: 200,
                name: 'sima',
                unicodeName: 'COPTIC SMALL LETTER SIMA (U+2CA5)',
            },
            {
                glyph: 'ⲧ',
                value: 300,
                name: 'tau',
                unicodeName: 'COPTIC SMALL LETTER TAU (U+2CA7)',
            },
            {
                glyph: 'ⲩ',
                value: 400,
                name: 'ua',
                unicodeName: 'COPTIC SMALL LETTER UA (U+2CA9)',
            },
            {
                glyph: 'ⲫ',
                value: 500,
                name: 'fi',
                unicodeName: 'COPTIC SMALL LETTER FI (U+2CAB)',
            },
            {
                glyph: 'ⲭ',
                value: 600,
                name: 'khi',
                unicodeName: 'COPTIC SMALL LETTER KHI (U+2CAD)',
            },
            {
                glyph: 'ⲯ',
                value: 700,
                name: 'psi',
                unicodeName: 'COPTIC SMALL LETTER PSI (U+2CAF)',
            },
            {
                glyph: 'ⲱ',
                value: 800,
                name: 'ōou',
                unicodeName: 'COPTIC SMALL LETTER OOU (U+2CB1)',
            },
            {
                glyph: 'ϯ',
                value: 900,
                name: 'ti — Demotic, standing where Greek wrote sampi',
                unicodeName: 'COPTIC SMALL LETTER DEI (U+03EF); the one letter of the alphabet that is a whole syllable',
            },
        ],
        examples: [
            {
                native: 'ⲧ̅ⲝ̅ⲉ̅',
                value: 365,
                note: 'The plain mechanism: ⲧ (300) + ⲝ (60) + ⲉ (5), set down largest first and roofed with the stroke that says \'this is a number\'. It is the length of the Egyptian civil year — twelve months of thirty days and five days over — and it is also the sum of ⲁⲃⲣⲁⲥⲁⲝ, whose seven letters reckon ⲁ 1, ⲃ 2, ⲣ 100, ⲁ 1, ⲥ 200, ⲁ 1, ⲝ 60. Irenaeus reports that the Basilideans of Alexandria named their ruler so because the name holds the number of their heavens (Adversus Haereses 1.24.7). Coptic inherits the arithmetic along with the alphabet, and the name is thick on the Egyptian amulets in both scripts.',
            },
            {
                native: 'ϯ̅ϥ̅ⲑ̅',
                value: 999,
                note: 'ϯ (900) + ϥ (90) + ⲑ (9): the ceiling of the three-figure series, and the one number that puts both Demotic-derived numerals side by side. Where a Greek scribe would have written sampi and koppa — two signs long dead as sounds — a Coptic scribe writes ti and fai, letters he uses every day to spell \'to give\' and \'him\'. It is the clearest single illustration of what the alphabet did: it filled the holes in a borrowed system with living Egyptian material.',
            },
            {
                native: 'ⲭ̅ⲗ̅',
                value: 630,
                note: 'ⲭ (600) + ⲗ (30). A colophon that gives this as its year is dated by the Era of the Martyrs, and 630 + 283 puts it in 913/914 of the common era — two of our years, because a Coptic year begins at the end of our August and ends at the end of the next. That is squarely the period of the dated codices from the monastery of Saint Michael at Hamouli in the Fayyum, whose scribes signed and dated their work in exactly this form.',
            },
            {
                native: 'ⲥⲟⲩ ⲕ̅ⲑ̅',
                value: 29,
                note: 'ⲕ (20) + ⲑ (9), preceded by ⲥⲟⲩ, the word Coptic sets before a day of the month — the old Egyptian sw, unchanged in function since the hieroglyphs. The whole phrase reads \'on the twenty-ninth\'. The twenty-ninth of the month Koiahk is the Coptic Nativity, which falls on 7 January in the Gregorian calendar; the Coptic Church also keeps the twenty-ninth of the month, in most months of the year, as a commemoration of the Incarnation.',
            },
            {
                native: 'ⲭ̅ⲙ̅ⲅ̅',
                value: 643,
                note: 'ⲭ (600) + ⲙ (40) + ⲅ (3), and here the number is not a quantity at all. These three letters stand at the head of an enormous number of Christian letters from Egypt, Greek and Coptic alike, from the fourth century onward, and what they abbreviate has never been settled. The two standing proposals are an abbreviation, Χριστὸν Μαρία γεννᾷ, \'Mary bears Christ\'; and an isopsephy, since θεὸς βοηθός, \'God is helper\', reckons θ 9 + ε 5 + ο 70 + ς 200 = 284 and β 2 + ο 70 + η 8 + θ 9 + ο 70 + ς 200 = 359, and 284 + 359 is 643 exactly. The arithmetic is unarguable; what the writer meant by it is not.',
            },
        ],
        special: 'The reckoning Coptic letters are most often asked to do is a date, and the date is almost always given in the Era of the Martyrs. The Coptic year is the old Egyptian civil year kept alive under a new name — twelve months of thirty days, then a short month of five days, six in every fourth year — and its epoch is the first day of the Egyptian year in which Diocletian acceded, 29 August 284 in the Julian calendar. The era takes its name not from the emperor but from the persecution that followed him, so that Coptic chronology counts forward from a catastrophe rather than from a reign. It is not an antiquarian survival: the Coptic Orthodox Church dates by it still, and the year that began on 11 September 2025 and ends on 10 September 2026 is Anno Martyrum 1742. To turn a colophon\'s year into ours, add 283 for the stretch from the Coptic new year in September to the end of December, and 284 from January onward — the two answers differ because a Coptic year always straddles two of ours. Thousands are the system\'s weak joint. Greek marked them by returning to the unit letters with a small stroke set low and before the sign, and Coptic scribes follow the principle without following any one convention: the mark may be a stroke, a dot or a doubled line, and it may sit below, before or above. A good many colophons decline the problem and write the year out in words instead, which is why a manuscript dated in the fifteen hundreds of the Martyrs will often give its number in Egyptian spoken numerals rather than in Greek letters counted up. Nothing in this changes a value; it changes only how much a reader must already know in order to see one.',
    },
    readings: [
        {
            title: 'The Sahidic Prologue',
            source: 'Gospel of John 1:1a in Sahidic. Text as edited by Herbert Thompson, The Gospel of St John according to the Earliest Coptic Manuscript (London: British School of Archaeology in Egypt, 1924), from the fourth-century codex found at Qau el-Kebir in Upper Egypt; the same reading in George Horner, The Coptic Version of the New Testament in the Southern Dialect, vol. 3 (Oxford: Clarendon, 1911)',
            words: [
                {
                    native: 'ϩⲛ̅',
                    translit: 'hn',
                    gloss: 'in',
                },
                {
                    native: 'ⲧⲉϩⲟⲩⲉⲓⲧⲉ',
                    translit: 'tehoueite',
                    gloss: 'the beginning (literally the first, feminine)',
                },
                {
                    native: 'ⲛⲉϥϣⲟⲟⲡ',
                    translit: 'nefshoop',
                    gloss: 'he was existing',
                },
                {
                    native: 'ⲛ̅ϭⲓ',
                    translit: 'nchi',
                    gloss: 'namely (marks the subject that follows)',
                },
                {
                    native: 'ⲡϣⲁϫⲉ',
                    translit: 'pshaje',
                    gloss: 'the Word',
                },
            ],
            translation: 'In the beginning the Word was.',
            note: 'Coptic will not put its subject before its verb here. The sentence runs \'in the beginning he-was-existing\', and only then, with the particle ⲛ̅ϭⲓ, does it say who: the Word. English has no equivalent and must reverse the order to be read at all. The verb ⲛⲉϥϣⲟⲟⲡ is an imperfect built on the stative ϣⲟⲟⲡ, \'to be in existence\' — a continuous was, not a coming-to-be, which is the same grammatical hinge the Greek ἦν provides. Where Greek has ἀρχή, Sahidic declines the loanword and translates: ⲧⲉϩⲟⲩⲉⲓⲧⲉ is \'the first\', an adjective made a noun. Bohairic goes the other way and simply keeps the Greek, ϧⲉⲛ ⲟⲩⲁⲣⲭⲏ, and calls the Word ⲡⲓⲥⲁϫⲓ where Sahidic says ⲡϣⲁϫⲉ; between two dialects of the same language one translates and the other borrows. The verse continues ⲁⲩⲱ ⲡϣⲁϫⲉ ⲛⲉϥϣⲟⲟⲡ ⲛ̅ⲛⲁϩⲣⲙ̅ ⲡⲛⲟⲩⲧⲉ ⲁⲩⲱ ⲛⲉⲩⲛⲟⲩⲧⲉ ⲡⲉ ⲡϣⲁϫⲉ, and the last clause is much fought over in modern polemic, since it spells its predicate with the indefinite article ⲟⲩ-. Coptic grammarians caution that the indefinite article is the ordinary way of assigning a noun to a class or a quality, and that the construction therefore settles rather less than either side of that argument wants it to.',
            grid: null,
        },
        {
            title: 'The Hidden Words',
            source: 'Gospel of Thomas, incipit; Nag Hammadi Codex II, tractate 2, page 32, lines 10–12 (Coptic Museum, Cairo). Coptic text in Bentley Layton (ed.), Nag Hammadi Codex II,2–7, Nag Hammadi Studies 20 (Leiden: Brill, 1989); first published by A. Guillaumont, H.-Ch. Puech, G. Quispel, W. Till and Yassah ʿAbd al-Masīḥ, The Gospel according to Thomas (Leiden: Brill, 1959)',
            words: [
                {
                    native: 'ⲛⲁⲉⲓ',
                    translit: 'naei',
                    gloss: 'these',
                },
                {
                    native: 'ⲛⲉ',
                    translit: 'ne',
                    gloss: 'are',
                },
                {
                    native: 'ⲛ̅ϣⲁϫⲉ',
                    translit: 'nshaje',
                    gloss: 'the words',
                },
                {
                    native: 'ⲉⲑⲏⲡ',
                    translit: 'ethēp',
                    gloss: 'that are hidden',
                },
                {
                    native: 'ⲉⲛⲧⲁ',
                    translit: 'enta',
                    gloss: 'which',
                },
                {
                    native: 'ⲓ̅ⲥ̅',
                    translit: 'IS (Iēsous)',
                    gloss: 'Jesus, written as a sacred contraction',
                },
                {
                    native: 'ⲉⲧⲟⲛϩ',
                    translit: 'etonh',
                    gloss: 'the living',
                },
                {
                    native: 'ϫⲟⲟⲩ',
                    translit: 'joou',
                    gloss: 'spoke them',
                },
            ],
            translation: 'These are the hidden words which the living Jesus spoke.',
            note: 'The opening line of the codex buried in a jar below the Jabal al-Tarif and dug up in December 1945. The manuscript writes ⲉⲛⲧⲁⲓ̅ⲥ̅ as one group, the relative converter running straight into the name; it is separated here only to be glossed. Two small things are worth watching. ⲉⲑⲏⲡ is the relative ⲉⲧ- welded to ϩⲏⲡ, \'hidden\', with ⲧ + ϩ collapsing into the single letter ⲑ — precisely the ligature-work that ⲑ, ⲫ and ⲭ do in native Coptic words. And ⲓ̅ⲥ̅ is a nomen sacrum, the name abbreviated to its first and last letters under the same supralinear stroke that marks a numeral: the scribe of this codex uses the Church\'s own scribal conventions for a book the Church did not keep. The Coptic is a translation from Greek, and three fragments from Oxyrhynchus (P.Oxy. 1, 654 and 655) preserve parts of a Greek Thomas, P.Oxy. 654 carrying a version of this very prologue — so the sentence survives in two languages and in neither one complete.',
            grid: null,
        },
        {
            title: 'The Ninetieth Psalm, on an Amulet',
            source: 'Psalm 90:1 in the Septuagint numbering (91:1 in the Hebrew), Sahidic; text after the Sahidic psalter edited by E. A. Wallis Budge, The Earliest Known Coptic Psalter (London: Kegan Paul, 1898). For its use on amulets, Theodore de Bruyn, Making Amulets Christian: Artefacts, Scribes, and Contexts (Oxford: Oxford University Press, 2017)',
            words: [
                {
                    native: 'ⲡⲉⲧⲟⲩⲏϩ',
                    translit: 'petouēh',
                    gloss: 'he who dwells',
                },
                {
                    native: 'ϩⲛ̅',
                    translit: 'hn',
                    gloss: 'in',
                },
                {
                    native: 'ⲧⲃⲟⲏⲑⲓⲁ',
                    translit: 'tboēthia',
                    gloss: 'the help (Greek boētheia, taken in with its article)',
                },
                {
                    native: 'ⲙ̅ⲡⲉⲧϫⲟⲥⲉ',
                    translit: 'mpetjose',
                    gloss: 'of the one who is high',
                },
            ],
            translation: 'He who dwells in the help of the Most High.',
            note: 'No text was copied onto Egyptian amulets more often than this psalm, in Greek and in Coptic alike, and very often only its opening words were copied — the incipit standing in for the whole, the way a first line stands for a hymn. The reason is in the psalm itself, which promises shelter from the snare of the hunter, the terror by night, the arrow that flies by day and the demon of noon; that last phrase, δαιμόνιον μεσημβρινόν in the Greek, went on to name the noonday demon of accidie that the desert fathers reckoned the monk\'s worst hour. The line shows the language\'s two halves at work in four words: ⲃⲟⲏⲑⲓⲁ is Greek, absorbed whole and given a Coptic feminine article, while ⲡⲉⲧϫⲟⲥⲉ, \'the one who is high\', is native Coptic built from a relative and a verb where Greek had the single word ὕψιστος. The wording given here follows the psalter. The amulets themselves are another matter: they abbreviate, misspell, run words together and break off mid-phrase, and no two of them agree exactly.',
            grid: null,
        },
        {
            title: 'The Thrice-Holy',
            source: 'The Trisagion of the Coptic rite, sung in the Divine Liturgy and in the daily offices — Greek preserved in Coptic letters. The Coptic liturgies in F. E. Brightman, Liturgies Eastern and Western, vol. 1: Eastern Liturgies (Oxford: Clarendon, 1896), and in the Coptic Euchologion as printed for the Church\'s own use',
            words: [
                {
                    native: 'ⲁⲅⲓⲟⲥ',
                    translit: 'agios',
                    gloss: 'holy (said three times)',
                },
                {
                    native: 'ⲟ',
                    translit: 'o',
                    gloss: 'the',
                },
                {
                    native: 'ⲑⲉⲟⲥ',
                    translit: 'theos',
                    gloss: 'God',
                },
                {
                    native: 'ⲓⲥⲭⲩⲣⲟⲥ',
                    translit: 'ischyros',
                    gloss: 'mighty',
                },
                {
                    native: 'ⲁⲑⲁⲛⲁⲧⲟⲥ',
                    translit: 'athanatos',
                    gloss: 'deathless',
                },
                {
                    native: 'ⲡⲁⲣⲑⲉⲛⲟⲩ',
                    translit: 'parthenou',
                    gloss: 'of a virgin',
                },
                {
                    native: 'ⲅⲉⲛⲛⲏⲑⲉⲓⲥ',
                    translit: 'gennētheis',
                    gloss: 'having been born',
                },
                {
                    native: 'ⲉⲗⲉⲏⲥⲟⲛ',
                    translit: 'eleēson',
                    gloss: 'have mercy',
                },
                {
                    native: 'ⲏⲙⲁⲥ',
                    translit: 'ēmas',
                    gloss: 'us',
                },
            ],
            translation: 'Holy God, Holy Mighty, Holy Immortal, who wast born of the Virgin: have mercy upon us.',
            note: 'Not one word of this is Coptic. It is Greek, written in Coptic letters and sung by congregations whose everyday speech has been Arabic for a thousand years — a fossil of the language in which the Alexandrian liturgy was first celebrated, kept inside the alphabet that replaced it. The clause after the three acclamations is where the history sits. A Trisagion referred to the Trinity cannot be said to have been born or crucified; a Trisagion referred to Christ can. The Antiochene addition \'who wast crucified for us\', attributed to Peter the Fuller in the fifth century, was therefore read in Constantinople as an attack on Chalcedon and set off a long and bitter quarrel. The Coptic rite refers the hymn to Christ and sings it three times over, changing the clause each time — born of the Virgin, crucified for us, risen from the dead and ascended into the heavens — so that the whole Christological difference between two communions rides on the three or four words that vary. The letters ⲑ and ⲭ here are doing their Greek work, spelling θ and χ inside Greek words, rather than the ligature-work they do in native Coptic.',
            grid: null,
        },
        {
            title: 'Our Father, in Bohairic',
            source: 'Matthew 6:9a in Bohairic, in the form recited in the Coptic Orthodox liturgy and in the Agpeya, the book of the hours. Coptic text in George Horner, The Coptic Version of the New Testament in the Northern Dialect, otherwise called Memphitic and Bohairic, vol. 1 (Oxford: Clarendon, 1898)',
            words: [
                {
                    native: 'ϫⲉ',
                    translit: 'je',
                    gloss: 'saying (the particle that opens quoted speech)',
                },
                {
                    native: 'ⲡⲉⲛⲓⲱⲧ',
                    translit: 'peniōt',
                    gloss: 'our Father',
                },
                {
                    native: 'ⲉⲧϧⲉⲛ',
                    translit: 'etkhen',
                    gloss: 'who is in',
                },
                {
                    native: 'ⲛⲓⲫⲏⲟⲩⲓ̀',
                    translit: 'niphēoui',
                    gloss: 'the heavens',
                },
            ],
            translation: 'Our Father who art in the heavens.',
            note: 'Four words that a reader can date a page by. ϧ is the Bohairic letter for a back fricative that Sahidic had already lost, so ⲉⲧϧⲉⲛ here answers to Sahidic ⲉⲧϩⲛ̅ — the prayer opening ⲡⲉⲛⲉⲓⲱⲧ ⲉⲧϩⲛ̅ ⲙ̅ⲡⲏⲩⲉ in the southern dialect and ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ̀ in the northern one. The small oblique mark over the last letter is the djinkim, Bohairic\'s device where Sahidic uses the supralinear stroke. And the prayer begins with ϫⲉ, a particle with no English counterpart: it introduces reported speech, so that the congregation does not simply pray the words but quotes them, and the sentence carries its own attribution inside it. This is the reading in which the hall\'s subject is least a matter of history. Bohairic is the dialect that outlived the others because it became the liturgy, and these words are chanted daily by people for whom Coptic is no longer a mother tongue — the last stage of the Egyptian language still to be heard aloud.',
            grid: null,
        },
        {
            title: 'The Scribe\'s Petition',
            source: 'A standard Sahidic colophon formula, recurring across the corpus assembled in Arnold van Lantschoot, Recueil des colophons des manuscrits chrétiens d\'Égypte, I: Les colophons coptes des manuscrits sahidiques (Louvain, 1929); the request is a fixture of the dated codices from the monastery of Saint Michael at Hamouli in the Fayyum, now in the Morgan Library, New York',
            words: [
                {
                    native: 'ⲁⲣⲓ',
                    translit: 'ari',
                    gloss: 'do, make (imperative)',
                },
                {
                    native: 'ⲧⲁⲅⲁⲡⲏ',
                    translit: 'tagapē',
                    gloss: 'the charity (Greek agapē with a Coptic article)',
                },
                {
                    native: 'ⲛ̅ⲧⲉⲧⲛ̅ϣⲗⲏⲗ',
                    translit: 'ntetnshlēl',
                    gloss: 'and pray, you all',
                },
                {
                    native: 'ⲉϫⲱⲓ',
                    translit: 'ejōi',
                    gloss: 'over me, for me',
                },
            ],
            translation: 'Be so kind, and pray for me.',
            note: 'A Coptic colophon is a small legal and devotional document in its own right. It names the scribe, often the donor who paid for the parchment, the monastery the book was made for, the day of the month after ⲥⲟⲩ and the year of the Martyrs — which is where the Numbers above stop being an exercise — and then, having settled all that, it asks the reader for something. ⲁⲣⲓ ⲧⲁⲅⲁⲡⲏ is the ordinary Coptic way of saying \'please\': literally \'do the love\', with the Greek ἀγάπη taken in as a common noun and given the feminine article, so that the politest formula in the language turns out to be a theological term put to domestic use. The conjunctive ⲛ̅ⲧⲉⲧⲛ̅- then carries the second verb along under the force of the first imperative, which is why the two clauses need only one \'do\' between them. What the scribe asks for is not payment and not praise. It is intercession — the one thing a reader a thousand years later is still in a position to give, which may be why the formula outlasted every scriptorium that used it.',
            grid: null,
        },
    ],
    correspondences: null,
};
