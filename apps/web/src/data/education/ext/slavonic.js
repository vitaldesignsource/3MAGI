// slavonic hall extension — numbers and glossed first readings.
// Arithmetic and era conversions recomputed, citations checked, scripts
// verified against unicodedata by the content pipeline.
export default {
    numbers: {
        note: 'Church Slavonic did not invent a way of counting; it inherited one. Cyrillic is Greek uncial with additions, and it took the Ionic or Milesian numerals along with the letter-shapes, value for value, so that а is 1 and р is 100 exactly as alpha is 1 and rho is 100. What the alphabet borrowed it also had to adapt, and the adaptation is the interesting part. Greek kept three signs alive as numerals long after the sounds they wrote had died — stigma at 6, koppa at 90, sampi at 900 — and Slavonic filled all three slots with letters that were fully alive: ѕ (dzělo) at 6, ч (črьvь) at 90, ц (ci) at 900. Three dead Greek numerals became three working Slavic consonants, and ѕ is generally derived from the very shape of the Greek stigma it replaces. The traffic ran the other way as well. Four letters entered Cyrillic carrying no Slavic sound of their own — ѯ (60), ѱ (700), ѳ (9) and ѵ (400) — because Greek spelling and Greek arithmetic both required them, and they survive in the alphabet chiefly as numbers and as passports for Greek loanwords. Every letter the Greeks did not possess gets nothing at all: б, ж, ш, щ, the two jers, the jat and the yuses are letters without value, which is why the numeral row has twenty-seven signs while the alphabet in this hall runs to more than forty. The system is additive, with no zero and no place value: a numeral is read by summing its letters, set down largest first, so that рѯ҃е is simply 100 + 60 + 5. One habit distinguishes it from its Greek model. The teens are written unit first — а҃і is 11, and the two letters are not \'ten, one\' but \'one on ten\', following the spoken единъ на десѧте — where Greek writes ια in the ordinary descending order. Above the teens the descending order returns, and к҃а is 21. What marks a group of letters as a number is the titlo, the small arc drawn over it (҃, U+0483 COMBINING CYRILLIC TITLO). Printed practice sets it over the second letter from the end when the numeral has more than one letter and over the letter itself when it has one, so that 1 is а҃ and 12 is в҃і; manuscripts more often draw a single long stroke across the whole group, which no font reproduces gracefully. It matters that this is the same stroke that marks the nomina sacra — Бг҃ъ for Богъ, Гд҃ь for Господь — the contraction sign by which a scribe warns the eye that a Name and not an ordinary word is passing. A number and a Name wear the same mark, and both are read by knowing what has been left out. One caution belongs to this hall in particular: Cyrillic is not the only Slavonic reckoning. Glagolitic, the older alphabet and the one Cyril actually made, ignores the Greek values and counts straight down its own order, so that б — worth nothing whatever in Cyrillic — is 2 in Glagolitic. The same word yields two different sums depending on which alphabet writes it, and any numerological reading of a Slavonic word is obliged to say which of the two it means.',
        digits: [
            {
                glyph: 'а',
                value: 1,
                name: 'azъ',
                unicodeName: 'CYRILLIC SMALL LETTER A (U+0430)',
            },
            {
                glyph: 'в',
                value: 2,
                name: 'vědě',
                unicodeName: 'CYRILLIC SMALL LETTER VE (U+0432); it takes 2 because Byzantine beta was already pronounced [v]',
            },
            {
                glyph: 'г',
                value: 3,
                name: 'glagoli',
                unicodeName: 'CYRILLIC SMALL LETTER GHE (U+0433)',
            },
            {
                glyph: 'д',
                value: 4,
                name: 'dobro',
                unicodeName: 'CYRILLIC SMALL LETTER DE (U+0434)',
            },
            {
                glyph: 'е',
                value: 5,
                name: 'jestъ',
                unicodeName: 'CYRILLIC SMALL LETTER IE (U+0435); printed Church Slavonic often sets the numeral as є, CYRILLIC SMALL LETTER UKRAINIAN IE (U+0454)',
            },
            {
                glyph: 'ѕ',
                value: 6,
                name: 'dzělo',
                unicodeName: 'CYRILLIC SMALL LETTER DZE (U+0455); generally derived from the shape of the Greek numeral stigma, which had no sound left in it',
            },
            {
                glyph: 'з',
                value: 7,
                name: 'zemlja',
                unicodeName: 'CYRILLIC SMALL LETTER ZE (U+0437)',
            },
            {
                glyph: 'и',
                value: 8,
                name: 'iže',
                unicodeName: 'CYRILLIC SMALL LETTER I (U+0438)',
            },
            {
                glyph: 'ѳ',
                value: 9,
                name: 'fita',
                unicodeName: 'CYRILLIC SMALL LETTER FITA (U+0473); Greek theta, kept for Greek words and for this number',
            },
            {
                glyph: 'і',
                value: 10,
                name: 'i',
                unicodeName: 'CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I (U+0456); the same vowel as и, kept distinct by rule and by value',
            },
            {
                glyph: 'к',
                value: 20,
                name: 'kako',
                unicodeName: 'CYRILLIC SMALL LETTER KA (U+043A)',
            },
            {
                glyph: 'л',
                value: 30,
                name: 'ljudije',
                unicodeName: 'CYRILLIC SMALL LETTER EL (U+043B)',
            },
            {
                glyph: 'м',
                value: 40,
                name: 'myslite',
                unicodeName: 'CYRILLIC SMALL LETTER EM (U+043C)',
            },
            {
                glyph: 'н',
                value: 50,
                name: 'našь',
                unicodeName: 'CYRILLIC SMALL LETTER EN (U+043D)',
            },
            {
                glyph: 'ѯ',
                value: 60,
                name: 'ksi',
                unicodeName: 'CYRILLIC SMALL LETTER KSI (U+046F); Greek xi, a letter with no Slavic sound of its own',
            },
            {
                glyph: 'о',
                value: 70,
                name: 'onъ',
                unicodeName: 'CYRILLIC SMALL LETTER O (U+043E); printed books also use the broad or round o, ѻ, CYRILLIC SMALL LETTER ROUND OMEGA (U+047B)',
            },
            {
                glyph: 'п',
                value: 80,
                name: 'pokoi',
                unicodeName: 'CYRILLIC SMALL LETTER PE (U+043F)',
            },
            {
                glyph: 'ч',
                value: 90,
                name: 'črьvь',
                unicodeName: 'CYRILLIC SMALL LETTER CHE (U+0447); it stands in the slot of the Greek koppa',
            },
            {
                glyph: 'р',
                value: 100,
                name: 'rьci',
                unicodeName: 'CYRILLIC SMALL LETTER ER (U+0440)',
            },
            {
                glyph: 'с',
                value: 200,
                name: 'slovo',
                unicodeName: 'CYRILLIC SMALL LETTER ES (U+0441); its name is the word for \'word\'',
            },
            {
                glyph: 'т',
                value: 300,
                name: 'tvrьdo',
                unicodeName: 'CYRILLIC SMALL LETTER TE (U+0442)',
            },
            {
                glyph: 'ѹ',
                value: 400,
                name: 'ukъ',
                unicodeName: 'CYRILLIC SMALL LETTER UK (U+0479), the old digraph; later books write у, CYRILLIC SMALL LETTER U (U+0443), or the monograph ꙋ, CYRILLIC SMALL LETTER MONOGRAPH UK (U+A64B), and ižica ѵ, CYRILLIC SMALL LETTER IZHITSA (U+0475), also serves for 400 on the Greek pattern',
            },
            {
                glyph: 'ф',
                value: 500,
                name: 'frьtъ',
                unicodeName: 'CYRILLIC SMALL LETTER EF (U+0444)',
            },
            {
                glyph: 'х',
                value: 600,
                name: 'xěrъ',
                unicodeName: 'CYRILLIC SMALL LETTER HA (U+0445)',
            },
            {
                glyph: 'ѱ',
                value: 700,
                name: 'psi',
                unicodeName: 'CYRILLIC SMALL LETTER PSI (U+0471); Greek psi, another letter kept for Greek and for counting',
            },
            {
                glyph: 'ѡ',
                value: 800,
                name: 'omega (Glagolitic otъ)',
                unicodeName: 'CYRILLIC SMALL LETTER OMEGA (U+0461)',
            },
            {
                glyph: 'ц',
                value: 900,
                name: 'ci',
                unicodeName: 'CYRILLIC SMALL LETTER TSE (U+0446); it stands in the slot of the Greek sampi',
            },
        ],
        examples: [
            {
                native: 'а҃і',
                value: 11,
                note: 'Two letters and a stroke: а (1) written before і (10). Slavonic parts company with its Greek model here, since Greek writes ια with the ten first; the Slavonic numeral instead follows the spoken form, единъ на десѧте, \'one on ten\', in which the unit is named before the ten it stands upon. The inversion is confined to the teens, and 21 returns to the ordinary descending order as к҃а. The two letters involved repay a second look. и and і had long since fallen together as the same vowel, and nothing in the sound of the language keeps them apart; what keeps them apart is orthographic rule, Greek etymology, and the fact that one of them is 8 and the other 10.',
            },
            {
                native: '҂ѕфѯ҃е',
                value: 6565,
                note: '҂ѕ (6,000) + ф (500) + ѯ (60) + е (5). This is the year in the colophon of the Ostromir Gospel, the oldest dated East Slavic manuscript book to survive, copied by the deacon Gregory for Ostromir, posadnik of Novgorod: he records beginning the work on 21 October in the year 6564 and finishing it on 12 May 6565. Take 5508 from each and the dates are 21 October 1056 and 12 May 1057, which is how the manuscript is conventionally dated — and the first of the two figures declares which convention is in use. On the Byzantine reckoning, whose year opens on 1 September, an October date falls in the September-to-December stretch and takes 5509, which would put the beginning of the work in 1055. The March year usual in early Rus\' takes 5508 for every month from March to December, and gives 1056; the received date follows the March reckoning. The finishing date is untroubled, since May takes 5508 either way and is 1057 on both. The subtraction, in short, is the easy part, and where the year begins is the hard one. It is the standing reason two reputable books will occasionally date the same manuscript a year apart without either being careless.',
            },
            {
                native: 'хѯ҃ѕ',
                value: 666,
                note: 'х (600) + ѯ (60) + ѕ (6): the number of Revelation 13:18, which Slavonic renders letter for letter from the Greek χξϛ, having taken the Greek values whole. The correspondence is exact and slightly uncanny. Greek\'s sign for 6 was stigma, a numeral with no sound left in it, kept in the alphabet for arithmetic alone; the Cyrillic letter standing in that slot, ѕ (dzělo), is generally derived from the same shape and does have a sound, [dz]. The dead Greek numeral of the beast is, in Slavonic, a living letter. Two further facts of transmission are worth setting beside the number. Printed Slavonic Bibles more often spell it out in words than set it in figures; and the Apocalypse is the one New Testament book from which the Byzantine rite appoints no reading in its liturgical cycle, so that in this tradition the number has been copied and commented upon far more often than it has been heard. It acquired a long polemical afterlife in the Russian schism of the seventeenth century, where the number was read out of names and dates with great ingenuity on all sides; that literature is described on this hall\'s shelf rather than rehearsed here.',
            },
            {
                native: '҂з҃',
                value: 7000,
                note: 'A single letter under the stroke, lifted by the thousands sign: з is 7, ҂з is 7,000. No numeral in this alphabet carried more weight. Counted from the creation of the world, seven thousand years brought the seventh millennium to its close, and the Paschal tables of the Russian church had been computed no further and simply stopped; the tables\' silence was widely read as testimony rather than as arithmetic running out. On the September reckoning the church used for those tables, the year 7000 ran from 1 September 1491 to 31 August 1492 — its September-to-December months take 5509 and fall in 1491, its January-to-August months take 5508 and fall in 1492 — and it passed. On 27 November 1492, by then already the world year 7001, a council at Moscow confirmed the paschalion of Metropolitan Zosima for the eighth thousand years, prefaced by an exposition to the effect that the day and the hour are not given to be known; Archbishop Gennady of Novgorod sent his own calculation to the Novgorod cathedral clergy on 12 December of the same year. In that year too the Muscovite year was moved from 1 March to 1 September. That з is also the letter zemlja, \'earth\', is a coincidence of the borrowed Greek values and not a design, and this hall records it as a coincidence.',
            },
            {
                native: '҂зс҃и',
                value: 7208,
                note: '҂з (7,000) + с (200) + и (8): the last year Russia counted from the creation. In December of it Peter I decreed that the day following 31 December should be reckoned the first of January 1700, and that years should thereafter be numbered from the Nativity. December falls in the September-to-December stretch of the Byzantine year, so the decree\'s own date, December 7208, is December 1699: 7208 less 5509. Had the old count been left to run, the January that followed would still have been called January 7208, since the world year 7208 ran on to 31 August; 7208 less 5508 is 1700, and that is the Anno Domini figure for the same year\'s January-to-August months. The decree changed the civil calendar only. Church Slavonic service books went on counting from the creation of the world, and count so still.',
            },
        ],
        special: 'Thousands are written with the thousands sign ҂ (U+0482 CYRILLIC THOUSANDS SIGN), a small oblique stroke twice barred, set low and to the left of the letter it multiplies: ҂а is 1,000, ҂і is 10,000, and the sign may be repeated before each letter that needs lifting. Above that the language had names as well as signs. тьма — the ordinary word for darkness, and for a multitude — stands for ten thousand in the reckoning the later manuals call the small count, with легионъ, леодръ, воронъ and колода mounting above it; a great count also circulated, in which the same words are pushed vastly higher and тьма itself stands at a million, and the Russian manuscripts that set it out close the series at колода with the remark that beyond it there is nothing the human mind can grasp. The exact values differ between the two schemes and between manuscripts, so this hall gives the names in order and not a table. In the higher ranks the marking changes character: instead of another stroke before the letter, the scribe encloses it in a ring — a plain ring for тьма, a ring of dots for легионъ, a ring of strokes or rays for леодръ — so that the number is surrounded rather than prefixed. Dating is the ordinary daily business of these numerals, and Slavonic manuscripts count from the creation of the world. The era is the Byzantine or Constantinopolitan world era, which places the creation in 5509 BC and begins its year on 1 September; a colophon\'s year therefore converts by subtracting 5508 for months from January to August, and 5509 for September to December. Rus\' complicated this for its first centuries by preferring a year beginning on 1 March — on which reckoning every month from March to December takes 5508, and January and February take 5507 — and the ultra-March variant complicated it further. The rule is easy to state and easy to get wrong, and it is the standing reason for the one-year discrepancies that litter the older catalogues. Everything in that reckoning bore down on the year 7000, whose January-to-August months fell in 1492, and it passed without the world ending; the church answered by carrying the calculation forward into an eighth thousand, and Moscow moved its civil New Year to 1 September in the same year. The era itself outlasted the scare by two centuries, until Peter I ended it in December 7208. The liturgical books never stopped: a Slavonic service book printed this year still gives the year of the world beside the year of grace.',
    },
    readings: [
        {
            title: 'In the Beginning Was the Word',
            source: 'Gospel of John 1:1a in Old Church Slavonic. Codex Marianus (Glagolitic, early 11th c., from Mount Athos), edited by V. Jagić, Quattuor evangeliorum versionis palaeoslovenicae Codex Marianus glagoliticus (Berlin and St Petersburg, 1883); the same verse also stands at the head of the Ostromir Gospel of 1056–1057, whose opening reading is the Paschal pericope John 1:1–17.',
            words: [
                {
                    native: 'Искони',
                    translit: 'iskoni',
                    gloss: 'from the beginning, of old',
                },
                {
                    native: 'бѣ',
                    translit: 'bě',
                    gloss: 'was (imperfect, 3rd sg.)',
                },
                {
                    native: 'Слово',
                    translit: 'Slovo',
                    gloss: 'Word (nominative singular neuter)',
                },
            ],
            translation: 'In the beginning was the Word.',
            note: 'Greek opens with two words, and opens them deliberately: Ἐν ἀρχῇ repeats the first words of the Septuagint Genesis and then puts the Word where the act of creation had stood. Slavonic answers with one word. искони is an adverb, not a prepositional phrase — \'from the outset\', \'of old\' — and its root is конъ, which means both a beginning and a boundary, and which yields конецъ, \'end\', and законъ, \'law\', that which is laid along the boundary. The translators of the ninth century therefore render \'in the beginning\' with a word already containing its own end. бѣ is imperfect, a continuous \'was\' and not a coming-to-be, carrying the same weight as the Greek ἦν and standing at the same grammatical hinge that later theology leans on. слово is the ordinary Slavic word for a word, a speech, a discourse or a sermon; it is also the name of the letter с, whose numeral value is 200, so that in this language the Word is a letter as well and can be counted. A last observation about the page rather than the sentence. In the manuscripts the divine name of the clause that follows is written contracted under the titlo, Бг҃ъ for Богъ, the same stroke that turns letters into numbers. The verse as a scribe actually set it down is therefore part word, part abbreviation and part reckoning, and reading it is in every sense a matter of knowing what has been left out.',
            grid: null,
        },
        {
            title: 'Our Father',
            source: 'Matthew 6:9a, the opening of the Lord\'s Prayer, in the Old Church Slavonic of the canon gospels — the tetraevangelia Codex Marianus and Codex Zographensis — given here in the normalised orthography of the standard handbooks (Horace G. Lunt, Old Church Slavonic Grammar, 7th revised edition, Berlin and New York, 2001).',
            words: [
                {
                    native: 'отьче',
                    translit: 'otьče',
                    gloss: 'O Father (vocative of отьць)',
                },
                {
                    native: 'нашь',
                    translit: 'našь',
                    gloss: 'our',
                },
                {
                    native: 'иже',
                    translit: 'iže',
                    gloss: 'who (relative pronoun)',
                },
                {
                    native: 'ѥси',
                    translit: 'jesi',
                    gloss: 'thou art',
                },
                {
                    native: 'на',
                    translit: 'na',
                    gloss: 'in, on',
                },
                {
                    native: 'небесьхъ',
                    translit: 'nebesьxъ',
                    gloss: 'the heavens (locative plural of небо); the canon manuscripts also write небесехъ, and the later printed books read небесѣхъ — see the note',
                },
            ],
            translation: 'Our Father, who art in the heavens.',
            note: 'Slavonic still has a vocative, and отьче is a form used for nothing but address; the Greek behind it, πάτερ, is vocative likewise, so the case survives the translation intact, which is not true of everything in this sentence. небесьхъ is the locative plural of небо, one of the old neuter s-stems that show their -es- everywhere except the nominative and accusative singular — небо, небесе, небеса — a stem shared with Greek nephos and Sanskrit nabhas. The plural \'heavens\' is not a Slavic idiom but a faithful following of the Greek ouranois, itself following a Semitic plural: three languages deep, and the plural has survived all of them. One point of spelling should be stated rather than smoothed over. The old canon manuscripts write небесьхъ, with небесехъ beside it; the received Church Slavonic of the printed books — the Elizabethan Bible of 1751 and the service books in use today — reads небесѣхъ, with jat. This hall gives the older form as the headword and records the later, so that no reader is shown a modern word in tenth-century dress. On the page, finally, almost none of this appears at full length: manuscript and printed book alike contract the holy words under the titlo, Ѻч҃е and нб҃сѣхъ, so that what the eye meets is shorter than what the mouth says. This prayer is sung at every Divine Liturgy in this language, this morning as on any other. It is described here as a text, not set out as an instruction.',
            grid: null,
        },
        {
            title: 'The Alphabet Prayer',
            source: 'Constantine of Preslav, Азбучна молитва (the Alphabet Prayer), opening line — the verse prologue to his Учително евангелие (Didactic Gospel), composed in Bulgaria in 893 or 894. Forty verses of twelve syllables, one to each letter; some three dozen copies are catalogued, the earliest East Slavic and of the twelfth century. The standard edition is K. M. Kuev, Azbuchnata molitva v slavyanskite literaturi (Sofia, 1974).',
            words: [
                {
                    native: 'Азъ',
                    translit: 'Azъ',
                    gloss: 'I (and the name of the letter А)',
                },
                {
                    native: 'словомь',
                    translit: 'slovomь',
                    gloss: 'with a word (instrumental singular of слово)',
                },
                {
                    native: 'симь',
                    translit: 'simь',
                    gloss: 'this (instrumental singular of сь)',
                },
                {
                    native: 'молю',
                    translit: 'molju',
                    gloss: 'I pray, I beseech',
                },
                {
                    native: 'сѧ',
                    translit: 'sę',
                    gloss: 'reflexive clitic, completing молю сѧ \'I pray\'',
                },
                {
                    native: 'Богу',
                    translit: 'Bogu',
                    gloss: 'to God (dative singular)',
                },
            ],
            translation: 'I, with this word, pray to God.',
            note: 'This is the opening line of the first Slavic poem, and it is an abecedarian acrostic: each of its forty verses begins with the next letter of the alphabet, so that to recite the prayer is to recite the letters, and the poem cannot be read at all by someone who does not already know what order they come in. No text belongs more exactly in this hall. Constantine of Preslav was a disciple of Methodius, one of the company driven out of Moravia after 885 and received in Bulgaria, and he wrote the prayer as the verse prologue to his Didactic Gospel — barely thirty years after the alphabet was made, which is to say that the Slavs began writing poetry by writing about the fact that they could now write. The first line is a pun the language makes for free. азъ is both \'I\' and the name of the letter А, so the poem\'s first rung is at once its speaker and its first letter; and словомь, \'with a word\', is the instrumental of слово, which is likewise the name of the letter с. What is offered up in the opening line, read one way, is the alphabet itself. Two honest qualifications. The acrostic runs in the Glagolitic letter order — which is the abecedary order this hall\'s letter table follows — and that order is generally taken as a sign that the poem was first set down in Glagolitic, although every surviving copy is Cyrillic. And the spelling here follows the printed editions: strict Old Church Slavonic would write the first-person ending with the iotified big yus, молѭ (moljǫ), whereas the East Slavic copies that actually carry the poem had long since lost the nasal vowels and write молю. The grid beside this entry gives the first rungs of the ladder, each letter with its name.',
            grid: [
                'А — азъ',
                'Б — букꙑ',
                'В — вѣдѣ',
                'Г — глаголи',
                'Д — добро',
                'Е — ѥстъ',
                'Ж — живѣте',
                'Ѕ — ѕѣло',
            ],
        },
        {
            title: 'The Foreword to the Gospel',
            source: 'Прогласъ (Proglas), the verse preface to the Gospels, opening line; traditionally ascribed to Constantine-Cyril and dated to the 860s. Preserved in a handful of South Slavic copies, the oldest of them the Hilandar manuscript on Mount Athos, of the thirteenth century, found there by the archimandrite Leonid in 1868. The attribution is discussed in the note and should not be treated as settled.',
            words: [
                {
                    native: 'Прогласъ',
                    translit: 'Proglasъ',
                    gloss: 'foreword, proclamation (про- \'fore\' + гласъ \'voice\')',
                },
                {
                    native: 'ѥсмь',
                    translit: 'jesmь',
                    gloss: 'I am',
                },
                {
                    native: 'свѧту',
                    translit: 'svętu',
                    gloss: 'holy (dative singular neuter)',
                },
                {
                    native: 'евангелию',
                    translit: 'evangeliju',
                    gloss: 'to the Gospel (dative singular; from Greek euangelion). The copies write еванꙉелию, with the ђerv — see the note',
                },
            ],
            translation: 'I am the Foreword to the holy Gospel.',
            note: 'The poem speaks in the first person, and its first person is itself: not a poet announcing a work but a preface announcing that it is a preface — the riddling voice of inscriptions that say I am the cup, I am the stone. What follows is a sustained defence of scripture in a language people actually speak, and it contains the line most often quoted from early Slavic literature, that every nation without books goes naked. The attribution needs flagging plainly, and this hall flags it. The headings in the copies give the poem to Cyril; Roman Jakobson argued at length and on metrical grounds that it is his; other scholars, weighing the same evidence, assign it to Constantine of Preslav, whose Alphabet Prayer stands beside it here. The defensible position is that the Proglas is a Slavic poem of the Cyrillo-Methodian circle from the ninth or early tenth century, and that which member of that circle wrote it is unproven. One detail of spelling belongs to this hall\'s alphabet. The copies are Serbian, and they write the word for Gospel with the ђerv — ꙉ in its Old Church Slavonic form, ћ in the Serbian — the letter this hall lists as djervь, which exists largely to carry the palatal consonant of Greek loanwords of exactly this kind. The headword above is given in the commoner normalised spelling, евангелию, with the manuscript form recorded rather than silently adopted.',
            grid: null,
        },
        {
            title: 'The Colophon of Upir the Wicked',
            source: 'Scribal colophon to a copy of the Books of the Sixteen Prophets with commentary, made at Novgorod for Vladimir Yaroslavich, prince of Novgorod and eldest son of Yaroslav the Wise. The scribe records beginning on 14 May and finishing on 19 December of the world year 6555 (҂ѕфн҃е = 6555). The conventional conversion, 6555 − 5508 = 1047, holds for both dates on the March reckoning usual in Rus\'; on the Byzantine September reckoning the December date would take 5509 and fall in 1046. The original manuscript is lost; the colophon survives in nine copies of the fifteenth and sixteenth centuries, and the orthography given here follows those witnesses and the printed editions rather than any eleventh-century hand.',
            words: [
                {
                    native: 'Азъ',
                    translit: 'Azъ',
                    gloss: 'I',
                },
                {
                    native: 'попъ',
                    translit: 'popъ',
                    gloss: 'priest',
                },
                {
                    native: 'Оупирь',
                    translit: 'Upirь',
                    gloss: 'Upir — the scribe\'s name or byname; as a common noun, a revenant. Normalised here: the copies write the uk digraph, ѹпирь',
                },
                {
                    native: 'Лихыи',
                    translit: 'Lixyi',
                    gloss: 'the Wicked, the Bad (лихыи \'evil, excessive\')',
                },
            ],
            translation: 'I, the priest Upir the Wicked.',
            note: 'A scribe signs the book he has finished and gives its year, 6555 of the world era, which is 1047 — and in signing it he leaves behind the earliest dated occurrence of the word упирь in any Slavic language: the word that becomes Russian упырь, Czech upír, Polish upiór, and by a long road through South Slavic and German the English vampire. Older undated occurrences exist in homiletic texts against pagan survivals, but for a firm date this colophon is the first. What makes the attestation strange is its ordinariness. It is not a story about a revenant. It is a man\'s name at the foot of a page of prophets, which means the word was already common enough in eleventh-century Novgorod to serve as a byname, and that whatever it then denoted was not too dreadful to write beside one\'s priesthood. Whether the name is a nickname, a survival of a pre-Christian personal name, or something else again has been argued over for a century and is not settled. The colophon carries a second controversy in the same breath. The scribe gives thanks that he was granted to write these books ис коуриловицѣ, \'from the kurilovica\' — from Cyril\'s alphabet — and since the alphabet Cyril made was Glagolitic, some read the phrase as a witness that his exemplar was Glagolitic, and that the name we now attach to the younger script once belonged to the elder. Others read it the other way about, as describing the letters he wrote in rather than the letters he copied from. The manuscript that would settle it is gone; what survives is a copy of a copy, and this hall reports the name, the year and the phrase as those witnesses read them, noting that where the copies differ they differ in spelling and not in substance.',
            grid: null,
        },
        {
            title: 'The Opening of a Zagovor',
            source: 'The standard opening formula of the East Slavic zagovor (заговоръ), the spoken charm-text. A formula rather than a single composition: it is documented in hundreds of variants throughout L. N. Maikov, Velikorusskiya zaklinaniya (St Petersburg, 1869), and discussed at length in A. N. Afanasyev, Poeticheskiya vozzreniya slavyan na prirodu (Moscow, 1865–69). The words are given in the pre-reform orthography of the nineteenth-century printed collections.',
            words: [
                {
                    native: 'Стану',
                    translit: 'Stanu',
                    gloss: 'I shall arise, I shall stand up',
                },
                {
                    native: 'я',
                    translit: 'ja',
                    gloss: 'I',
                },
                {
                    native: 'рабъ',
                    translit: 'rabъ',
                    gloss: 'servant, bondsman',
                },
                {
                    native: 'Божій',
                    translit: 'Bozhii',
                    gloss: 'of God (adjective)',
                },
                {
                    native: 'благословясь',
                    translit: 'blagoslovyas\'',
                    gloss: 'having blessed myself (reflexive gerund)',
                },
            ],
            translation: 'I shall arise, a servant of God, having blessed myself.',
            note: 'A genre, not a text, and this entry describes the genre. The zagovor is the East Slavic charm: spoken, carried orally, and committed to writing late, so that while the material behind it is plainly old the records are mostly of the seventeenth century and after and the great printed collections are of the nineteenth. Its language is not Church Slavonic but the vernacular wearing Church Slavonic clothing — рабъ Божій is the liturgical formula that stands before a name in prayer, and the charm borrows it precisely because the frame it wants is the frame of the church. This is why a Slavonic hall can shelve the form at all, and also why it must be labelled: what is happening linguistically is borrowing, not descent. The structure that the opening announces is close to invariable. The speaker rises, blesses himself, goes out of the house by the door and out of the yard by the gate, and travels to a described elsewhere — the open field, the ocean-sea, the island, the white stone Alatyr — where the power addressed is to be found; and the whole is closed by a sealing formula. It is a journey narrated in the first person, and the narration is the entire form. Two things are worth saying plainly. First, the nineteenth-century collectors recorded a substantial number of charms that invert this opening on purpose, negating the blessing and the crossing and sending the speaker out by some way other than the door; they noted the two openings as a matched pair, and the inversion is the clearest evidence we have that the pious frame was understood by its users as a frame. Second, this hall sets out what a zagovor is, how it is built and where the texts were printed. It does not supply one to be used, and the clause above is the first line of a formula, not a working charm.',
            grid: null,
        },
    ],
    correspondences: null,
};
