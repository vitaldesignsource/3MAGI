// geez hall extension — numbers and glossed first readings.
// Arithmetic and era conversions recomputed, citations checked, scripts
// verified against unicodedata by the content pipeline.
export default {
    numbers: {
        note: 'Geʿez does not count with its letters. Where Hebrew, Greek, Coptic and Church Slavonic all pressed the alphabet into double service, Ethiopia took over a separate set of twenty signs and left the fidäl alone — which is why no letter in this hall carries a number, and why a tradition with every appetite for hidden sense has nothing answering to gematria or isopsephy. The signs are borrowed. The standard account derives them from the Greek alphabetic numerals — the Milesian system of nine units, nine tens and nine hundreds — reaching Aksum in their Egyptian, Coptic-uncial dress, at a period when Greek was the language of the Aksumite coinage and of the royal inscriptions; the two horizontal strokes that frame every Ethiopic numeral are usually explained as answering the overbar with which Greek and Coptic scribes marked a letter that was to be read as a number. Some individual shapes are hard to reconcile with any Greek original, and a minority has looked instead to South Arabian or Demotic models, but the Greek derivation is the settled view. In Unicode the strokes belong to the character itself rather than to any combining mark, so ፩ arrives already framed. The series runs ፩ to ፱ for the units, ፲ to ፺ for the tens, then ፻ for a hundred and ፼ for ten thousand: twenty signs in all, U+1369 to U+137C, and no more. There is no zero. The reckoning begins at one and has no notion of an empty place because it has no places at all — below a hundred the values are simply added, written largest first, so that ፻፹፪ is 100 + 80 + 2, and within such a run of tens and units the order does not affect the sum, ፻፪፹ coming to 182 as well. Above ninety-nine the notation turns multiplicative, and there order is no longer free: the number set before ፻ multiplies it, and that number may itself be more than one sign, so that ፫፻ is three hundreds, ፲፱፻ nineteen hundreds — 1900, the ordinary way of writing a year — and ፳፻ twenty hundreds, that is two thousand, there being no separate sign for a thousand at all; ፼ is itself a hundred hundreds. Reverse ፻፹፪ into ፪፹፻ and the value is not 182 but eighty-two hundreds, 8200. Scribes will write the spoken conjunction into a figure, so that the Kebra Nagast names the Fathers of Nicaea ፫፻፲ወ፰ — three hundred, ten and eight — with the letter ወ wä, \'and\', standing between the tens and the units. Years are written no differently, and are dated by the era of ዓመተ ምሕረት, the Year of Mercy, whose epoch — 1 መስከረም of the year 1 — falls on 29 August AD 8 in the Julian calendar. The era counts from the Incarnation as it was computed at Alexandria by Annianus rather than by Dionysius Exiguus at Rome, and the Alexandrian date falls eight years later than the Dionysian, so the Ethiopian year number is always the lower. Because the Ethiopian year begins on 1 መስከረም — 11 September in the Gregorian calendar, or 12 September in the year before a Gregorian leap year, a rule that holds for 1900 to 2099 and shifts a day after Gregorian 2100, the Ethiopian calendar having kept the Julian leap rule of one added day every fourth year without century exception — the gap between the two year-numbers stands at eight from 1 January until the Ethiopian new year in September, and at seven for the remainder of the Gregorian year. Twelve months of thirty days are followed by ጳጉሜን, a thirteenth month of five days, six in every fourth year. The Geʿez number-words are given beside the signs below for reference only: the sign is not an abbreviation of the word, and the two have no formal relation.',
        digits: [
            {
                glyph: '፩',
                value: 1,
                name: 'ʾaḥadu — one',
                unicodeName: 'ETHIOPIC DIGIT ONE (U+1369)',
            },
            {
                glyph: '፪',
                value: 2,
                name: 'kəlʾetu — two',
                unicodeName: 'ETHIOPIC DIGIT TWO (U+136A)',
            },
            {
                glyph: '፫',
                value: 3,
                name: 'śälästu — three',
                unicodeName: 'ETHIOPIC DIGIT THREE (U+136B)',
            },
            {
                glyph: '፬',
                value: 4,
                name: 'ʾarbaʿtu — four',
                unicodeName: 'ETHIOPIC DIGIT FOUR (U+136C)',
            },
            {
                glyph: '፭',
                value: 5,
                name: 'ḫaməstu — five',
                unicodeName: 'ETHIOPIC DIGIT FIVE (U+136D)',
            },
            {
                glyph: '፮',
                value: 6,
                name: 'sədəstu — six',
                unicodeName: 'ETHIOPIC DIGIT SIX (U+136E). Greek had to keep the dead letter digamma alive to write six; Ethiopic, borrowing signs rather than letters, needed no such ghost.',
            },
            {
                glyph: '፯',
                value: 7,
                name: 'säbʿatu — seven',
                unicodeName: 'ETHIOPIC DIGIT SEVEN (U+136F)',
            },
            {
                glyph: '፰',
                value: 8,
                name: 'sämantu — eight',
                unicodeName: 'ETHIOPIC DIGIT EIGHT (U+1370)',
            },
            {
                glyph: '፱',
                value: 9,
                name: 'təsʿatu — nine',
                unicodeName: 'ETHIOPIC DIGIT NINE (U+1371)',
            },
            {
                glyph: '፲',
                value: 10,
                name: 'ʿaśärtu — ten',
                unicodeName: 'ETHIOPIC NUMBER TEN (U+1372). Unicode divides the series here: one to nine are \'digits\', ten and above are \'numbers\', a distinction of nomenclature only.',
            },
            {
                glyph: '፳',
                value: 20,
                name: 'ʿəśra — twenty',
                unicodeName: 'ETHIOPIC NUMBER TWENTY (U+1373)',
            },
            {
                glyph: '፴',
                value: 30,
                name: 'śälasa — thirty',
                unicodeName: 'ETHIOPIC NUMBER THIRTY (U+1374)',
            },
            {
                glyph: '፵',
                value: 40,
                name: 'ʾarbaʿa — forty',
                unicodeName: 'ETHIOPIC NUMBER FORTY (U+1375)',
            },
            {
                glyph: '፶',
                value: 50,
                name: 'ḫamsa — fifty',
                unicodeName: 'ETHIOPIC NUMBER FIFTY (U+1376)',
            },
            {
                glyph: '፷',
                value: 60,
                name: 'səssa — sixty',
                unicodeName: 'ETHIOPIC NUMBER SIXTY (U+1377)',
            },
            {
                glyph: '፸',
                value: 70,
                name: 'säbʿa — seventy',
                unicodeName: 'ETHIOPIC NUMBER SEVENTY (U+1378)',
            },
            {
                glyph: '፹',
                value: 80,
                name: 'sämanya — eighty',
                unicodeName: 'ETHIOPIC NUMBER EIGHTY (U+1379)',
            },
            {
                glyph: '፺',
                value: 90,
                name: 'təsʿa — ninety',
                unicodeName: 'ETHIOPIC NUMBER NINETY (U+137A). Greek needed the obsolete koppa for ninety; again, Ethiopic did not.',
            },
            {
                glyph: '፻',
                value: 100,
                name: 'məʾət — a hundred',
                unicodeName: 'ETHIOPIC NUMBER HUNDRED (U+137B). Not merely a value but an operator: the number standing before it multiplies it, and that number may run to two signs, so that ፲፱፻ is nineteen hundreds, 1900.',
            },
            {
                glyph: '፼',
                value: 10000,
                name: 'ʾəlf — ten thousand',
                unicodeName: 'ETHIOPIC NUMBER TEN THOUSAND (U+137C). A hundred hundreds, and the last new sign the system ever acquired; there is no sign for a thousand between it and ፻. The number-word is እልፍ ʾəlf, which Leslau glosses \'thousand, ten thousand, myriad\'; ትእልፊት təʾəlfit, sometimes cited here, is in Leslau not the plain numeral but \'a vast number, ten thousand-fold\'.',
            },
        ],
        examples: [
            {
                native: '፻፹፪',
                value: 182,
                note: 'The plain mechanism, and a number this hall has already met: ፻ (100) + ፹ (80) + ፪ (2), set down largest first with nothing between them. It is the size of the core fidäl chart — twenty-six consonants in seven orders each, 26 × 7 = 182, to which the four labiovelar series add some twenty more in five forms each — and a pupil in the church schools chants that chart through entire before reading a word. The tens and units may be transposed without touching the sum, ፻፪፹ coming to 182 as well; but the freedom stops at a hundred. Written backwards as ፪፹፻ the figure reads eighty-two hundreds, 8200, because ፻ takes its value from whatever stands before it. Order is habit and legibility below a hundred, and arithmetic above it.',
            },
            {
                native: '፫፻፲፰',
                value: 318,
                note: 'Above ninety-nine the notation changes gear: ፫ set before ፻ makes three hundreds, and ፲ (10) and ፰ (8) are then added — 300 + 10 + 8. This is the number of the Fathers of Nicaea in the traditional reckoning, and the first chapter of the Kebra Nagast opens by naming them, writing the figure as ፫፻፲ወ፰ with the conjunction ወ, \'and\', spelt out between the tens and the units exactly as it would be spoken. The same 318 stands in the Greek hall as τιηʹ, where the Epistle of Barnabas reads Τ as the cross and ΙΗ as the first letters of Jesus. Nothing of the kind can happen here. These signs are not letters and spell nothing.',
            },
            {
                native: '፫፻፷፬',
                value: 364,
                note: '፫ before ፻ gives three hundred, then ፷ (60) and ፬ (4): 364. This is the length of the year in the Astronomical Book of Enoch, chapters 72 to 82 of the Geʿez Mäṣḥafä Henok — twelve months of thirty days with four days standing at the turns of the seasons and belonging to no month, which the text insists are not to be omitted; Jubilees, also canonical in Ethiopia, argues for the same figure. Its virtue is that it divides exactly by seven, 364 ÷ 7 = 52, so that every feast falls on the same weekday for ever. Its defect is that it runs about a day and a quarter short of the solar year — 365.2422 − 364 = 1.2422 days — a drift the Geʿez text does not address.',
            },
            {
                native: '፳፻፲፰',
                value: 2018,
                note: 'A year, written as any other number is: ፳ (20) before ፻ makes twenty hundreds — two thousand, there being no thousand-sign — with ፲ and ፰ added, 2018. This is the year of ዓመተ ምሕረት current as this hall is written. Ethiopian 2018 began on 11 September 2025 and ends on 10 September 2026, so that Gregorian 29 August 2026 falls on 23 ነሐሴ 2018, in the twelfth of the thirteen months. The difference between the two year-numbers is eight on that date and becomes seven on 11 September 2026, when Ethiopian 2019 begins: the alternation is a consequence of the September new year, not an error, and the eight-year offset behind it is the Alexandrian reckoning of the Incarnation by Annianus set against the Roman one of Dionysius Exiguus that the West inherited.',
            },
            {
                native: '፳፻',
                value: 2000,
                note: 'Two thousand in two signs: ፳ (20) multiplying ፻ (100). Ethiopia entered its third millennium at the start of 1 መስከረም 2000, which fell on 12 September 2007 in the Gregorian calendar rather than the usual 11 — the extra day because the Ethiopian year just ending had run to six epagomenal days instead of five. The Ethiopian year is twelve months of thirty days followed by ጳጉሜን, a short thirteenth month of five days, six in every fourth year without exception, the Julian rule; 11 September 2007 was ጳጉሜን 6 of 1999, the sixth and last of them, and the day before the millennium.',
            },
        ],
        special: 'Above ninety-nine the system does not add a column, it changes gear. ፻ (100) is a multiplicand: the number placed before it multiplies it — one sign or two — so that ፪፻ is two hundred, ፫፻ three hundred, ፲፱፻ nineteen hundred, and, since Geʿez never acquired a sign for a thousand, ፲፻ is a thousand and ፳፻ two thousand, literally ten hundreds and twenty hundreds. Only at ፼ does a new sign appear, and it is itself a hundred hundreds, 10,000; larger figures are built on it the same way, so ፲፼ is a hundred thousand. Nothing in the notation marks where one group ends and the next begins; the reader supplies that from the values. Order is therefore indifferent only within a run of tens and units — ፻፹፪ and ፻፪፹ are both 182 — and decisive as soon as ፻ or ፼ is in play, ፪፹፻ being eighty-two hundreds, 8200. In manuscript the framing bars are commonly drawn as one continuous line above and one below a whole numeral group, binding it visually into a single word; digital fonts give every sign its own pair of strokes, so a rendered Ethiopic number shows a broken rule where a written one shows an unbroken one. There are no separate ordinals and no fractions in the notation — both are put into words. The numerals do the ordinary work of a script: foliation and quire-marks in manuscripts, chapter and verse numbers in printed scripture, dates on church walls and in colophons, and the year of ዓመተ ምሕረት in formal documents, where the era is marked in print by the initials of those two words, ዓ.ም. In everyday Ethiopian and Eritrean use Hindu-Arabic digits now do most of this, and the Ethiopic figures have withdrawn to liturgical books, manuscript practice and formal inscription — roughly where Roman numerals have withdrawn to in the West, and for much the same reasons.',
    },
    readings: [
        {
            title: 'The Word of Blessing of Enoch',
            source: '1 Enoch (መጽሐፈ ሄኖክ, Mäṣḥafä Henok) 1:1, opening words; Geʿez as edited by R. H. Charles, The Ethiopic Version of the Book of Enoch (Anecdota Oxoniensia, Semitic Series XI, Oxford, 1906). The English below is this hall\'s own word-for-word rendering of the seven words given, checked against Charles\'s translation and against G. W. E. Nickelsburg and J. C. VanderKam, 1 Enoch: A New Translation (Fortress, 2004), who construe the two accusatives as a single phrase, \'the righteous chosen\'.',
            words: [
                {
                    native: 'ቃለ',
                    translit: 'qalä',
                    gloss: 'word of, words of — the construct state, which in Geʿez binds a noun to what follows without any preposition',
                },
                {
                    native: 'በረከት',
                    translit: 'bäräkät',
                    gloss: 'blessing',
                },
                {
                    native: 'ዘሄኖክ',
                    translit: 'zä-Henok',
                    gloss: 'which is Enoch\'s — the relative particle ዘ zä doing the work of \'of\'',
                },
                {
                    native: 'ዘከመ',
                    translit: 'zäkämä',
                    gloss: 'according as, wherewith',
                },
                {
                    native: 'ባረከ',
                    translit: 'barakä',
                    gloss: 'he blessed — bāraka, Leslau\'s brk II, a type-C (L) stem: the first syllable carries a long ā, which the fourth-order ባ writes, and the r is not doubled',
                },
                {
                    native: 'ኅሩያነ',
                    translit: 'ḫəruyanä',
                    gloss: 'the chosen, the elect — accusative plural of ḫəruy',
                },
                {
                    native: 'ወጻድቃነ',
                    translit: 'wä-ṣadəqanä',
                    gloss: 'and the righteous — accusative plural of ṣadəq',
                },
            ],
            translation: 'The word of blessing of Enoch, wherewith he blessed the elect and the righteous.',
            note: 'In the manuscripts these words are separated by the wordspace, ቃለ፡በረከት፡ዘሄኖክ፡, and the sentence runs on — እለ ሀለዉ ይኩኑ, \'who shall be\' in the day of tribulation — so what is set down here is an incipit and not a whole clause. It opens a book that exists complete in this language and in no other. The claim needs stating exactly, because it is often stated loosely. 1 Enoch entire survives only in Geʿez, canonical scripture in the Ethiopian and Eritrean Orthodox Tewahedo churches and nowhere else in Christendom. Of the Greek from which the Geʿez was made, the Akhmim codex (Codex Panopolitanus) carries chapters 1 to 32, the fourth-century Chester Beatty–Michigan papyrus much of the last section, and George Syncellus a handful of excerpts; the Aramaic beneath the Greek was returned in fragments from Qumran Cave 4, published by J. T. Milik in 1976, amounting on the usual estimate to only a few per cent of the whole. This opening is in fact among the better-attested parts: 4Q201 preserves 1 Enoch 1:1–6 in Aramaic, damaged but legible, and the rest of the theophany at 1:7–9 is reconstructed there with help from the Greek and the Geʿez rather than simply read off the leather. What survives in Geʿez alone, in no Greek and no Aramaic, is the Book of Parables, chapters 37 to 71 — the Son of Man material, and the section on whose date the argument still turns. The complete text reached Europe when James Bruce brought three Ethiopic manuscripts back with him in 1773; Richard Laurence published the first English translation in 1821. A few lines below this verse stands 1 Enoch 1:9, the passage the Epistle of Jude quotes as prophecy at verses 14–15, which is how the Latin West kept the name of a book it had otherwise let fall.',
            grid: null,
        },
        {
            title: 'In the Beginning Was the Word',
            source: 'Gospel of John 1:1 in Geʿez (ወንጌል ዘዮሐንስ), as printed in the Geʿez New Testament (ሐዲስ ኪዳን በልሳነ ግእዝ) and as edited from twenty-one manuscripts by M. G. Wechsler, Evangelium Iohannis Aethiopicum, CSCO 617, Scriptores Aethiopici 109 (Peeters, Leuven, 2005), whose base text for the Versio Antiqua rests on the Abba Garima Gospels',
            words: [
                {
                    native: 'ቀዳሚሁ',
                    translit: 'qädamihu',
                    gloss: 'in his beginning, at the first of it — ቀዳሚ qädami, \'beginning, first\', with the third-person suffix',
                },
                {
                    native: 'ቃል',
                    translit: 'qal',
                    gloss: 'word, voice',
                },
                {
                    native: 'ውእቱ',
                    translit: 'wəʾətu',
                    gloss: 'he is — the independent third-person pronoun standing as copula; Leslau\'s English–Geʿez index gives plainly \'he is: wəʾətu\'',
                },
                {
                    native: 'ወውእቱ',
                    translit: 'wä-wəʾətu',
                    gloss: 'and he, that same one',
                },
                {
                    native: 'ቃል',
                    translit: 'qal',
                    gloss: 'the Word',
                },
                {
                    native: 'ኀበ',
                    translit: 'ḫäbä',
                    gloss: 'with, towards, in the presence of',
                },
                {
                    native: 'እግዚአብሔር',
                    translit: 'ʾƎgziʾabḥer',
                    gloss: 'God — a compound, ʾəgziʾa bəḥer, \'Lord of the land\'',
                },
                {
                    native: 'ውእቱ',
                    translit: 'wəʾətu',
                    gloss: 'he is — the same copula, the tense supplied by the reader',
                },
                {
                    native: 'ወእግዚአብሔር',
                    translit: 'wä-ʾƎgziʾabḥer',
                    gloss: 'and God',
                },
                {
                    native: 'ውእቱ',
                    translit: 'wəʾətu',
                    gloss: 'he is — the copula a third time',
                },
                {
                    native: 'ቃል',
                    translit: 'qal',
                    gloss: 'the Word',
                },
            ],
            translation: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
            note: 'The Geʿez has no verb in it. Where the Greek turns on ἦν, an imperfect that says \'was continuously\' rather than \'came to be\' and carries the whole weight of the later argument, Geʿez sets down the independent pronoun ውእቱ and lets the sentence rest on it: word for word, \'his-beginning, Word he; and he, Word, with God he; and God he, Word\'. Tense is supplied by the reader, and the pronoun tolls three times like a refrain. ቀዳሚሁ is not the Greek construction either — not a preposition with a noun but \'its first\', a possessive idiom, so that the beginning belongs to something before the Word is named. The translation was made from Greek in the Aksumite period, and the earliest witnesses to it are the Abba Garima Gospels, kept at their monastery east of Adwa, whose parchment was radiocarbon-dated at Oxford and reported in 2010: Garima 2 to about 390–570, Garima 1 to about 530–660. The three Garima manuscripts are numbered differently in different studies — Wechsler\'s critical text rests on those he calls Garima I and III — so the labels want watching. They are widely described as possibly the earliest surviving illuminated Christian manuscripts anywhere, which places this sentence, in this script, at the head of a line of copying older than almost anything the Greek or Latin churches can show.',
            grid: null,
        },
        {
            title: 'Holy God, Holy Mighty',
            source: 'The Trisagion in the Geʿez rite, sung in the pre-anaphora — the ordinary common to all fourteen anaphoras, ቅዳሴ ሐዋርያት, the Anaphora of the Apostles, among them — and standing near the head of the daily prayers; Geʿez as printed in the Ethiopian ቅዳሴ, English checked against The Liturgy of the Ethiopian Church, translated by Marcos Daoud and revised by Marsie Hazen',
            words: [
                {
                    native: 'ቅዱስ',
                    translit: 'qəddus',
                    gloss: 'holy — the same root as ቅዳሴ qəddase, the Liturgy',
                },
                {
                    native: 'እግዚአብሔር',
                    translit: 'ʾƎgziʾabḥer',
                    gloss: 'God',
                },
                {
                    native: 'ቅዱስ',
                    translit: 'qəddus',
                    gloss: 'holy',
                },
                {
                    native: 'ኃያል',
                    translit: 'ḫayal',
                    gloss: 'mighty, strong',
                },
                {
                    native: 'ቅዱስ',
                    translit: 'qəddus',
                    gloss: 'holy',
                },
                {
                    native: 'ሕያው',
                    translit: 'ḥəyaw',
                    gloss: 'living',
                },
                {
                    native: 'ዘኢይመውት',
                    translit: 'zä-ʾi-yəmäwwət',
                    gloss: 'who does not die — ዘ \'who\' + ኢ \'not\' + the imperfect \'he dies\'',
                },
                {
                    native: 'ዘተወልደ',
                    translit: 'zä-täwäldä',
                    gloss: 'who was born',
                },
                {
                    native: 'እማርያም',
                    translit: 'ʾəmmaryam',
                    gloss: 'of Mary — the preposition እም ʾəm \'from\' with ማርያም, written assimilated as it is usually printed; the unassimilated እም ማርያም also occurs',
                },
                {
                    native: 'እምቅድስት',
                    translit: 'ʾəm-qəddəst',
                    gloss: 'of the holy (feminine)',
                },
                {
                    native: 'ድንግል',
                    translit: 'dəngəl',
                    gloss: 'virgin',
                },
                {
                    native: 'ተሣሃለነ',
                    translit: 'täśahalänä',
                    gloss: 'have mercy upon us — täśahala (Leslau, root śhl, \'be merciful, have pity\') with the first-person plural object suffix; a perfect used precatively, as Geʿez prayer commonly does',
                },
                {
                    native: 'እግዚኦ',
                    translit: 'ʾƎgziʾo',
                    gloss: 'O Lord — the vocative of ʾəgziʾ',
                },
            ],
            translation: 'Holy God, Holy Mighty, Holy Immortal, who was born of Mary the holy Virgin: have mercy upon us, O Lord.',
            note: 'Two things are worth watching here. The first is grammatical: Geʿez has no privative prefix, no way of saying \'im-mortal\' in a word, and so builds the sense as a relative clause — ሕያው ዘኢይመውት, \'living, who does not die\'. The Greek Ἀθάνατος becomes a small sentence, and the hymn is longer and slower for it. The second is doctrinal. The Ethiopian rite, with the other Oriental Orthodox churches, reads the Trisagion as addressed to Christ rather than to the Trinity, and therefore attaches a clause naming what he did: born of the Virgin, baptised in the Jordan, crucified for us, risen — the clause changing with the feast. That instinct is the same one behind the Theopaschite addition \'who was crucified for us\', made at Antioch by Peter the Fuller in the 470s, which the Greek East and the Latin West resisted precisely because they read the hymn as trinitarian; the divergence in a single line of chant is a fair miniature of the whole Chalcedonian quarrel. The formula is not confined to the altar: it stands near the head of the daily prayers a great many Ethiopian Christians say from memory.',
            grid: null,
        },
        {
            title: 'Concerning the Glory of Kings',
            source: 'ክብረ ነገሥት, Kəbrä Nägäśt, chapter 1 — the chapter heading and the first words of the text; Geʿez edited by Carl Bezold, Kebra Nagast: Die Herrlichkeit der Könige (Abhandlungen der Königlich Bayerischen Akademie, Munich, 1905), the reading here checked word for word against the Geʿez text as digitally published; English compared with E. A. Wallis Budge, The Queen of Sheba and Her Only Son Menyelek (1922), who renders the same clause \'The interpretation and explanation of the Three Hundred and Eighteen Orthodox [Fathers]\', the word \'Fathers\' being his supplement and not in the Geʿez',
            words: [
                {
                    native: 'በእንተ',
                    translit: 'bä-ʾəntä',
                    gloss: 'concerning, on the subject of',
                },
                {
                    native: 'ክብረ',
                    translit: 'kəbrä',
                    gloss: 'the glory of — construct state',
                },
                {
                    native: 'ነገሥት',
                    translit: 'nägäśt',
                    gloss: 'kings — plural of ንጉሥ nəguś',
                },
                {
                    native: 'ፍካሬ',
                    translit: 'fəkkare',
                    gloss: 'interpretation, exposition, commentary — from fäkkärä \'explain, expound\' (Leslau)',
                },
                {
                    native: 'ወዜና',
                    translit: 'wä-zena',
                    gloss: 'and the account, the report, the news',
                },
                {
                    native: 'ዘ፫፻፲ወ፰',
                    translit: 'zä- [318]',
                    gloss: 'of the three hundred and eighteen — the relative ዘ zä prefixed to the figure ፫፻፲ወ፰, three hundreds plus ten, with the conjunction ወ wä, \'and\', spelt out before the eight. The transliteration stands in for the number because these signs are not letters and carry no sound of their own; a reader speaks the Geʿez number-words',
                },
                {
                    native: 'ርቱዓነ',
                    translit: 'rətuʿanä',
                    gloss: 'the upright, the orthodox — accusative plural',
                },
                {
                    native: 'ሃይማኖት',
                    translit: 'haymanot',
                    gloss: 'faith',
                },
            ],
            translation: 'Concerning the Glory of Kings. The exposition and the account of the three hundred and eighteen orthodox in faith.',
            note: 'The national epic begins with a number, and writes it in the manner of the manuscripts: ፫፻፲ወ፰, with the spoken \'and\' set between the tens and the units. What is quoted here is the heading and the opening of a sentence that runs on — በእንተ ክብር ወዕበይ ወተድላ, \'concerning glory and greatness and delight\' — so the full stop after \'faith\' is the excerpt\'s, not the book\'s. Three hundred and eighteen is the traditional count of the Fathers of the First Council of Nicaea, itself borrowed from the 318 trained men of Abraham\'s household at Genesis 14:14 — a number the Greek hall shows being read as a cipher of the cross, and which Geʿez cannot read that way at all, since its numerals are signs and not letters. The book\'s frame is a debate among those Fathers on what the glory of kings consists in, and the answer it unfolds across a hundred and seventeen chapters is the story of Makədda, of Solomon, of their son Bäynä Ləḥkəm who is Mənilək, and of the Ark carried from Zion to Aksum. Its colophon claims a passage from Coptic into Arabic in the Year of Mercy 409, that is 1225, and thence into Geʿez by a group of clerics under Yəsḥaq, nəburä əd of Aksum, at the command of Yaʿibikä Ǝgziʾ, governor of Ǝndärta; careful study of the text has found traces of Arabic but no clear evidence of any Coptic version behind it, and scholarship places the compilation in the early fourteenth century, under a restored dynasty with every reason to want such a book. The claim of Solomonic descent it advances was written into the imperial constitutions of 1931 and 1955 and stood as the formal basis of the throne until 1974.',
            grid: null,
        },
        {
            title: 'In the Name of the Father',
            source: 'The opening invocation of Ethiopian manuscripts of every kind, and the head of the protective scroll, ክታብ kətab; the manuscript incipit as it stands at the head of countless codices catalogued in the Ethiopian Manuscript Microfilm Library collections, and the scroll practice described and illustrated in Jacques Mercier, Ethiopian Magic Scrolls (Braziller, New York, 1979) and Art That Heals: The Image as Medicine in Ethiopia (New York, 1997)',
            words: [
                {
                    native: 'በስመ',
                    translit: 'bä-səmä',
                    gloss: 'in the name of — the preposition በ with ስም səm, \'name\', in the construct',
                },
                {
                    native: 'አብ',
                    translit: 'Ab',
                    gloss: 'Father',
                },
                {
                    native: 'ወወልድ',
                    translit: 'wä-Wäld',
                    gloss: 'and Son',
                },
                {
                    native: 'ወመንፈስ',
                    translit: 'wä-Mänfäs',
                    gloss: 'and Spirit',
                },
                {
                    native: 'ቅዱስ',
                    translit: 'Qəddus',
                    gloss: 'Holy',
                },
                {
                    native: 'አሐዱ',
                    translit: 'ʾaḥadu',
                    gloss: 'one',
                },
                {
                    native: 'አምላክ',
                    translit: 'ʾAmlak',
                    gloss: 'God',
                },
            ],
            translation: 'In the name of the Father and of the Son and of the Holy Spirit: one God.',
            note: 'This is the head of nearly every Ethiopic manuscript — gospel book, chronicle, hagiography, chant book — and it is also, without alteration, the head of the protective scroll, where a rubric naming the asmat the scroll is to carry commonly follows it. That continuity is the point worth registering: the scroll does not open in a different register from the Psalter, because in Ethiopian understanding it is not doing a different kind of thing. አስማት asmat, from Arabic asmāʾ, the plural of ism \'name\', are the names of power — divine names, angelic names, names held to have been revealed — and they are what the scroll is built around. The ደብተራ däbtära, the learned laymen of the church schools who are not ordained, prepare a ክታብ kətab of dressed parchment, the sheet cut to the height of the person it is to guard, so that the object is a measure of a body before it is a text; the writing is interleaved with talismanic panels, netted and knotted designs, and frontal faces with wide-open eyes. Ethiopian churchmen have argued about the practice for six centuries — the Mäṣḥafä Bərhan of Zärʾa Yaʿqob (reigned 1434–1468) condemns it at length, and is a valuable and hostile witness to what it condemns. The genre is described here and not reproduced: the names, the sequences and the manner of their use belong to a living practice and to the people who hold it, and nothing in this hall is offered as instruction. Substantial collections are held by the Wellcome, the British Library, the Institute of Ethiopian Studies in Addis Ababa, and the Hill Museum and Manuscript Library.',
            grid: null,
        },
        {
            title: 'The Lord Willed to Set Adam Free',
            source: 'ውዳሴ ማርያም, Wəddase Maryam, the office for Monday (ዘሰኑይ), opening line; the Geʿez as printed at the end of the Ethiopian Psalter (መዝሙረ ዳዊት), where the office is customarily copied, and as printed in the parish editions of the seven daily parts. The full title runs Wəddase ʾƎgzəʾtənä Maryam Dəngəl Waladitä Amlak, \'Praise of our Lady Mary, the Virgin who bore God\'',
            words: [
                {
                    native: 'ፈቀደ',
                    translit: 'fäqädä',
                    gloss: 'he willed, he desired',
                },
                {
                    native: 'እግዚእ',
                    translit: 'ʾƎgziʾ',
                    gloss: 'the Lord',
                },
                {
                    native: 'ያግእዞ',
                    translit: 'yagəʾəzo',
                    gloss: 'that he might set him free — subjunctive of ʾagʾaza, the causative of gaʿaza \'be free\' (Leslau, root gʿz), with the third-person object suffix',
                },
                {
                    native: 'ለአዳም',
                    translit: 'lä-ʾAdam',
                    gloss: 'Adam — the object is anticipated by the suffix on the verb and then named with the preposition ለ, a standard Geʿez construction',
                },
                {
                    native: 'ኅዙነ',
                    translit: 'ḫəzunä',
                    gloss: 'sorrowful — accusative; the passive participle of ḥazana, \'be sad\' (Leslau, root ḥzn). The office prints ኅ where etymology wants ሕ, the three h-letters having fallen together in reading, so the word is also written ሕዙነ ḥəzunä',
                },
                {
                    native: 'ወትኩዘ',
                    translit: 'wä-təkkuzä',
                    gloss: 'and grieved, downcast — accusative of təkkuz; Leslau records the very phrase, təkkuza ləbb and ḥəzuna ləbb, \'sad, afflicted\'',
                },
                {
                    native: 'ልብ',
                    translit: 'ləbb',
                    gloss: 'heart',
                },
            ],
            translation: 'The Lord willed to set Adam free, sorrowful and grieved of heart.',
            note: 'The line continues — ወያግብኦ ኀበ ዘትካት መንበሩ, \'and restore him to his ancient seat\' — so this is the head of a sentence and not the whole of it. The verb in it is nevertheless the whole hall in one word. ያግእዞ is the causative of gʿz, \'to be free\', and gəʿz is the word that gives the language its own name, ግዕዝ, so that the Praise of Mary opens by asking God to do to Adam what the tongue it is sung in is called after. The etymology deserves its hedge: gəʿz in the lexicon means \'nature, manner, custom\' as well as standing for the language and for the first order of the syllabary, and the name is usually connected with the Agʿazi, the free people, without the derivation being certain. The Wəddase Maryam is divided into seven parts, one for each day of the week; it is ordinarily copied at the end of the Psalter, and it is commonly the first book a pupil of the church schools commits to memory after the Psalms, which means that a very large number of Ethiopians know a Marian office before they know anything else in Geʿez. Tradition ascribes it to Ephrem the Syrian, who died in 373, and a rival tradition to Simeon the Potter, a Syrian poet of the fifth or sixth century; scholarship treats both as ascriptions rather than attributions — no Vorlage has been found in Ephrem\'s surviving works — and traces the text instead to a Coptic Theotokion surviving in Bohairic, which reached Geʿez through an Arabic version, the translation usually placed in the fourteenth century and associated with abba Sälama the Translator. Manuscripts differ over whether the weekly cycle opens on Sunday or on Monday, but the difference is one of arrangement and not of text.',
            grid: null,
        },
    ],
    correspondences: null,
};
