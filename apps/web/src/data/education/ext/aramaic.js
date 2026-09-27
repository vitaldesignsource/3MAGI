// aramaic hall extension — numbers and glossed first readings.
// Arithmetic and era conversions recomputed, citations checked, scripts
// verified against unicodedata by the content pipeline.
export default {
    numbers: {
        note: 'Aramaic has counted in two quite different ways, one after the other, and the letters of this hall carry only the later of them. In the square script the twenty-two letters bear the values themselves: alaph to teth for the units 1 to 9, yodh to sadhe for the tens 10 to 90, and qoph, resh, shin and taw for the hundreds 100, 200, 300 and 400. There is no zero and no place value. A numeral is simply the sum of its letters, written with the largest first — which, the script running right to left, means rightmost — so that the eye descends the scale as it moves leftward. Above four hundred the alphabet runs out and the hundreds are assembled by addition: 500 is תק, 600 תר, 700 תש, 800 תת, 900 תתק. The five final forms (ך ם ן ף ץ) are not numerals here: their use for 500 to 900 is a much later device of Jewish letter-reckoning and belongs to no Aramaic document. And nothing in a letter says \'read me as a number\'. Later Jewish usage marks a numeral with a geresh ׳ after a single letter and a gershayim ״ before the last letter of a group, but those marks are post-Talmudic; an ancient scribe relied on the formula and the context, which is why a number in a document is recognised by the word standing before it — שנת, shnat, \'in the year of\' — as often as by anything in the number itself.  This scheme is neither native to Aramaic nor old. Imperial Aramaic, the chancery language of the Achaemenids, counted with strokes and signs and not with letters at all, and that older system is described below. Counting with the alphabet is a later habit, taken up on the Greek model or alongside it — the Milesian numerals of Greek are attested earlier, and which alphabet taught which is genuinely argued — and the earliest securely dated instance in this script is usually located on Hasmonean coinage: the bronzes of Alexander Jannaeus whose Aramaic legend carries שנת כה, \'year 25\', kaph 20 and he 5. The coin says twenty-five; the year AD or BC does not follow from the coin. Twenty-five regnal years counted from an accession placed at 104 BC give 80/79, and from an accession placed at 103 they give 79/78, and the catalogues divide between the two. The numeral is firm and the conversion is not, which is a useful thing to learn from the very first example.  What a document does with a number is date itself, and Aramaic documents date themselves in two manners. The Persian-period papyri of the Judaean garrison at Elephantine give the regnal year of the king and very often double-date the day, once in the Babylonian month and once in the Egyptian — synchronisms that are among the sharpest instruments Achaemenid chronology possesses. The letter conventionally called the Passover Letter (TAD A4.1, Cowley 21), sent to Jedaniah and his colleagues and citing an instruction of the king to Arsames the satrap, is dated to the fifth year of Darius, that is Darius II, and so to 419 BC; the papyrus is badly broken, a good deal of what is printed of it is conjectural restoration, and the name it goes by is a modern convenience rather than a word standing whole in the text. Years in that archive are written in the numeral signs, or else spelled out in words. They are never written in alphabetic letter-numerals.  For the Jewish documents of Babylonia and everywhere after, the era that matters is the Seleucid, which Jewish sources call מנין שטרות, minyan sheṭarot, \'the reckoning of documents\', and which Syriac calls the year of the Greeks. Rav Naḥman states the rule flatly at Avodah Zarah 10a: in the Diaspora one counts only by the Greek kings. It is the first era in the history of reckoning to count continuously from a fixed point instead of beginning again with each new king, and Jewish deeds were still dated by it in Yemen in the twentieth century — some two and a quarter thousand years of unbroken counting, an extraordinary survival for the calendar of a dead empire. Its epoch is the autumn of 312 BC in the Macedonian reckoning and the spring of 311 in the Babylonian; Jewish usage follows the autumn, its year turning at Tishri. So the conversion runs: subtract 311 from the year of documents for a month falling between January and September, and 312 for October, November or December. Every such year straddles two of ours and begins in the earlier of them.  Set beside the year from the Creation the arithmetic comes out at AM = SE + 3449, and Maimonides supplies the check in his own hand: dating the year in which he wrote, at Mishneh Torah, Hilkhot Shemittah we-Yovel 10:4, he calls it the 1107th year from the Destruction, the 1487th of the reckoning of documents and the 4936th from the Creation — and 1487 + 3449 = 4936 exactly. By that offset AM 5786, the year running from the autumn of 2025 to the autumn of 2026, is SE 2337, the very year a Syriac colophon of the same date would call the year 2337 of the Greeks. One caution: some tables give AM = SE + 3448 instead, taking the Jewish era of documents to begin a year later, at Tishri of 311 BC. The figures here follow the autumn-312 convention, which is also the convention the Syriac year of the Greeks keeps, and a reader comparing tables should check which epoch a table has chosen before accusing it of error.  Follow instead the Talmud\'s own chronology and the answer moves. There the reckoning of documents begins 380 years before the Destruction of the Temple, which is what makes the rule of thumb at Avodah Zarah 9a work: a tanna who has lost count of the years since the Destruction is told to ask a scribe what year he is writing and add twenty — the scribes wrote only the figures standing within the current century of the era, and the Destruction fell twenty years short of that era\'s four hundredth year. Take the Destruction accordingly as SE 380, and the Ninth of Av, a summer month and so on the January-to-September branch, returns 380 − 311 = AD 69, against the conventional 70. Count the 380 as years elapsed rather than as a year-number and it returns 70 exactly. The play of a single year is the ordinary consequence of inclusive counting, and the chronologers have long noticed it and variously explained it; the same one-year play appears again when the era is set beside the years from Creation, since 380 + 3449 gives AM 3829 where the traditional date of the Destruction is AM 3828.  The bowls, against all this, hardly ever date themselves. It is the most frustrating fact about the corpus — some two thousand inscribed vessels and almost no colophons — and it is why their chronology has to be built from the archaeology where any was recorded, from the shapes of the letters, and from the names of the clients. Where numbers do appear in a bowl they are enumerations of what the text ranges itself against, not years; and the tag with which a bowl comes to rest, אמן אמן סלה, is Hebrew liturgy rather than arithmetic. Mandaic manuscripts count differently again: their colophons are chains rather than dates, each copyist naming the exemplar he worked from and the man who made it, and Jorunn Jacobsen Buckley\'s study of those chains (The Great Stem of Souls, 2005) reads them as a genealogy of transmission reaching, on her reckoning, into the early centuries of the common era. Where an absolute year is given at all, it is most often borrowed from the neighbours, and after the conquests that means the Hijra.',
        digits: [
            {
                glyph: 'א',
                value: 1,
                name: 'Alaph',
                unicodeName: 'HEBREW LETTER ALEF',
            },
            {
                glyph: 'ב',
                value: 2,
                name: 'Beth',
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
                name: 'Daleth',
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
                name: 'Waw',
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
                name: 'Heth',
                unicodeName: 'HEBREW LETTER HET',
            },
            {
                glyph: 'ט',
                value: 9,
                name: 'Teth',
                unicodeName: 'HEBREW LETTER TET',
            },
            {
                glyph: 'י',
                value: 10,
                name: 'Yodh',
                unicodeName: 'HEBREW LETTER YOD',
            },
            {
                glyph: 'כ',
                value: 20,
                name: 'Kaph',
                unicodeName: 'HEBREW LETTER KAF',
            },
            {
                glyph: 'ל',
                value: 30,
                name: 'Lamedh',
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
                name: 'Sadhe',
                unicodeName: 'HEBREW LETTER TSADI',
            },
            {
                glyph: 'ק',
                value: 100,
                name: 'Qoph',
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
                name: 'Taw',
                unicodeName: 'HEBREW LETTER TAV',
            },
        ],
        examples: [
            {
                native: 'יא',
                value: 11,
                note: 'Yodh 10 and alaph 1: 10 + 1 = 11. There is no more machinery than this. Every numeral in the square script is a sum, the reader adds as the eye moves, and the only thing that can go wrong is mistaking a numeral for a word.',
            },
            {
                native: 'טו',
                value: 15,
                note: 'Teth 9 and waw 6: 9 + 6 = 15. The expected ten-and-five would be יה, which spells Yah, a Name of God, and Jewish scribal practice declines to write it as a quantity; so fifteen is built from nine and six, and sixteen from nine and seven (טז) rather than from יו. The substitution is Jewish rather than Aramaic in origin, but it travels with the square script wherever the script goes, and it is inherited by every larger number ending in fifteen or sixteen.',
            },
            {
                native: 'תתק',
                value: 900,
                note: 'Taw 400, taw 400, qoph 100: 400 + 400 + 100 = 900. Twenty-two letters stop at four hundred, so everything above that is assembled — 500 is taw with qoph, 600 taw with resh, 700 taw with shin, 800 taw written twice, 900 taw twice and qoph. Syriac and Hebrew do exactly the same, for exactly the same reason; Greek, having pressed three obsolete letters back into service as numerals, has single signs all the way to nine hundred.',
            },
            {
                native: 'תקנו',
                value: 556,
                note: 'Taw 400, qoph 100, nun 50, waw 6: 400 + 100 + 50 + 6 = 556. This is the year of the Seleucid era in which the synagogue at Dura-Europos on the Euphrates was rebuilt, as the Aramaic dedication preserved on its ceiling tiles records; the same text fixes the year by the reign of Philip the Arab, which is the check on the arithmetic. By the autumn reckoning 556 − 312 = 244 and 556 − 311 = 245, so AD 244/5. (The emperor\'s name stands in the inscription with a space where a further name would go; the \'Julius\' printed in Torrey\'s edition is a restoration, and the gap has been read by some as damnatio memoriae.) Within a dozen years the city was under siege, and the synagogue — its walls carrying the most extensive cycle of biblical narrative painting to survive from antiquity — was packed with earth into the embankment raised along the western wall against the Sasanian siege, which is the only reason it survives at all. One honesty is owed: the inscription writes its number out in words, the year five hundred and fifty-six. תקנו is how that year would be set down in letters, not what stands on the tile.',
            },
            {
                native: 'אמן',
                value: 91,
                note: 'Alaph 1, mem 40, nun 50: 1 + 40 + 50 = 91, the final nun counting as the plain letter, since the reckoning of finals as hundreds is a later device. Ninety-one is also the sum of the Tetragrammaton יהוה (10 + 5 + 6 + 5 = 26) together with אדני, Adonai, the word said in its place (1 + 4 + 50 + 10 = 65): 26 + 65 = 91. The equation is a commonplace of mediaeval and later Jewish letter-reckoning, in which amen is read as joining the Name written to the Name spoken; it is recorded here as a traditional interpretation and not as an etymology, and it should be said plainly that no Aramaic deed or coin ever writes the quantity ninety-one in this way. The sum is a reading laid over a word, not a numeral in use. The word itself is Hebrew, and it is the word at which an Aramaic incantation bowl and an Aramaic doxology alike come to rest.',
            },
        ],
        special: 'Before the letters, the strokes. Imperial Aramaic — the language of the Achaemenid chancery, of the Elephantine papyri, of the Persian-period ostraca and of the Wadi Daliyeh deeds — did not count with its alphabet at all. It used a separate set of numeral signs, comparable to the Egyptian practice beside which its scribes worked: a vertical stroke for one, the units bundled in groups of three, a hook for ten, a doubled form for twenty, and distinct signs for one hundred, one thousand and ten thousand, the largest element written first. Unicode encodes them in the Imperial Aramaic block, and the list is worth reading closely — U+10858 IMPERIAL ARAMAIC NUMBER ONE, U+10859 NUMBER TWO, U+1085A NUMBER THREE, U+1085B NUMBER TEN, U+1085C NUMBER TWENTY, U+1085D NUMBER ONE HUNDRED, U+1085E NUMBER ONE THOUSAND, U+1085F NUMBER TEN THOUSAND — because the encoding of a NUMBER TWO and a NUMBER THREE beside NUMBER ONE is the tell that the units were written in bundles rather than as repeated single strokes. Fifteen in that notation is the ten-sign followed by a three and a two: 10 + 3 + 2 = 15. The signs are named here rather than displayed, since next to no font covers the block and a row of empty boxes teaches nothing. What the two systems mean for a reader is this: an Aramaic deed of the fifth century BC and an Aramaic deed of the fifth century AD may both state a year, and the two statements will look nothing alike — the first a bundle of strokes and hooks, the second a group of letters that is not a word and must not be read as one.',
    },
    readings: [
        {
            title: 'The Writing on the Wall',
            source: 'Daniel 5:25 (Masoretic Text, in the unpointed consonantal spelling); the decipherment follows in the mouth of Daniel himself at 5:26–28.',
            words: [
                {
                    native: 'מנא',
                    translit: 'mene',
                    gloss: 'numbered — or a mina. The consonants carry both: read as a verb it is the passive participle of מנה, \'to count, to number\'; read as a noun it is the weight, the mina of the Babylonian scales. An unpointed script does not choose between them, and the whole scene turns on that.',
                },
                {
                    native: 'מנא',
                    translit: 'mene',
                    gloss: 'numbered — the same word again. The repetition stands in the Masoretic text and is not a scribal slip, though the Greek versions do not double it: the Old Greek, whose chapter 5 diverges from the Masoretic text at many points, and Theodotion alike give three words where the Aramaic gives four. The doubling has been read since antiquity as emphasis, as two separate weights, and as the counting of two kingdoms.',
                },
                {
                    native: 'תקל',
                    translit: 'teqel',
                    gloss: 'weighed — or a shekel: the passive participle of תקל, \'to weigh\', and also the name of the coin-weight, Aramaic tiqla against Hebrew sheqel. Again the two readings share one spelling.',
                },
                {
                    native: 'ופרסין',
                    translit: 'u-farsin',
                    gloss: 'and divided — or and half-minas. The conjunction ו with the plural of פרס: as a weight the half-mina, as a participle \'divided\', and as a proper name Persia. Three senses in five letters, and the interpretation that follows uses all three.',
                },
            ],
            translation: 'Numbered, numbered, weighed and divided — or: a mina, a mina, a shekel and half-minas.',
            note: 'Four words, and no sentence in Aramaic is better known. The hand appears at Belshazzar\'s feast and writes on the plaster of the wall over against the lampstand (5:5), and the king\'s wise men cannot read it — which is the crux, since the words are short and the script is theirs. The Talmud at Sanhedrin 22a canvasses several answers, that the writing stood in a cipher, that the letters were transposed, that it was set in vertical columns to be read downward, and the variety of the answers is the measure of the puzzle. Daniel reads it by turning nouns into verbs: מנה, God has numbered thy kingdom and finished it; תקילתה, thou art weighed in the balances and found חסיר, wanting; פריסת, thy kingdom is divided and given to the Medes and Persians, למדי ופרס, where the plural ופרסין of verse 25 has quietly become the singular פרס so that the pun on the name of Persia can be made. That the four words are in the first place a series of descending weights — mina, mina, shekel, half-minas — was Charles Clermont-Ganneau\'s proposal in the Journal Asiatique in 1886, taken up by Nöldeke and standard since; it is an interpretation, and a durable one, not a datum of the text. Two historical notes belong with it. Belshazzar was the son of Nabonidus and not of Nebuchadnezzar, and was crown prince and regent rather than king; and the chapter is a Hellenistic book looking back at Babylon, not a Babylonian chronicle. Neither point touches what the sentence has done to English, in which the writing on the wall no longer needs a wall.',
            grid: [
                'מנא מנא תקל ופרסין',
            ],
        },
        {
            title: 'Where the Book Changes Language',
            source: 'Daniel 2:4 (Masoretic Text, unpointed consonantal spelling; the word for the addressees is given in the ketiv, the written form, on which see the gloss). The Aramaic begins in the middle of this verse, at 2:4b, and runs unbroken to the end of chapter 7; the Aramaic of Ezra stands at 4:8–6:18 and 7:12–26, with a single Aramaic verse at Jeremiah 10:11 and two Aramaic words at Genesis 31:47.',
            words: [
                {
                    native: 'ארמית',
                    translit: 'aramit',
                    gloss: 'in Aramaic — the last word of the Hebrew narration, and the hinge of the whole book. It is a Hebrew adverb, not an Aramaic one: the narrator says what language is about to be spoken, and then the language changes and does not change back for six chapters.',
                },
                {
                    native: 'מלכא',
                    translit: 'malka',
                    gloss: 'O king — melek, \'king\', in the emphatic state with its final aleph, used here as a vocative. The emphatic began as a suffixed definite article and by this period is simply the ordinary shape of the noun.',
                },
                {
                    native: 'לעלמין',
                    translit: 'le-almin',
                    gloss: 'for ever — the preposition ל with the plural of עלם, \'age, world, eternity\'; literally \'to ages\'. The same noun stands at the heart of the Kaddish.',
                },
                {
                    native: 'חיי',
                    translit: 'ḥeyi',
                    gloss: 'live — the imperative of חיה, \'to live\'. The three words together are the fixed court greeting of the Aramaic chapters, repeated at Daniel 3:9, 5:10 and 6:7, and the book gives it to the Chaldeans here, to the queen mother at 5:10, and at 6:7 to the very satraps who are laying the trap for Daniel.',
                },
                {
                    native: 'אמר',
                    translit: 'emar',
                    gloss: 'tell — the imperative of אמר, \'to say\'. In the perfect the same three consonants mean \'he said\', and only the context distinguishes them.',
                },
                {
                    native: 'חלמא',
                    translit: 'ḥelma',
                    gloss: 'the dream — ḥelem in the emphatic state. The word governs the first half of the book: it is the king\'s dream that no one can recover, and the recovery of it that makes Daniel.',
                },
                {
                    native: 'לעבדיך',
                    translit: 'le-avdayk',
                    gloss: 'to thy servants — the preposition ל with עבד, \'servant\', in the plural with the second masculine singular suffix. This is the ketiv, the consonants as written, and it is what is given above and in the translation. The Masoretic qere directs that it be read לעבדך, \'to thy servant\', in the singular; the two differ over the yod, and the sense is not the same either way. Editions print the ketiv in the text and the qere in the margin.',
                },
                {
                    native: 'ופשרא',
                    translit: 'u-fishra',
                    gloss: 'and the interpretation — the conjunction with pishra in the emphatic state, from פשר, \'to loosen, to solve\'. This is the word behind the pesher of the Qumran commentaries, where a verse of prophecy is \'solved\' by being applied to the community\'s own days.',
                },
                {
                    native: 'נחוא',
                    translit: 'neḥawwe',
                    gloss: 'we will declare — first person plural imperfect of the paʿʿel of חוה, \'to show, to make known\'. The Chaldeans speak in the plural: they are a guild, and they will fail as a guild.',
                },
            ],
            translation: '…in Aramaic: \'O king, live for ever! Tell thy servants the dream, and we will declare the interpretation.\'',
            note: 'This is the most conspicuous seam in the Hebrew Bible. Daniel begins in Hebrew, turns to Aramaic in the middle of a verse when the Chaldeans open their mouths, and stays there for six chapters — through the fiery furnace, the madness of Nebuchadnezzar, Belshazzar\'s feast, the lions\' den and the vision of the four beasts — before returning to Hebrew at chapter 8. No explanation in the book accounts for it. The tidiest theory, that the court tales are Aramaic and the visions Hebrew, founders on chapter 7, which is a vision and is Aramaic; H. L. Ginsberg proposed instead that the whole was composed in Aramaic and that chapters 1 and 8 to 12 were rendered into Hebrew, which is an argued position and not a settled one; others read the Aramaic block as a deliberate frame, its six chapters answering one another in a chiasm with 2 and 7 at the ends. What is not in doubt is that the switch is signalled. The word ארמית stands in the text like a stage direction, and it is the same word used at 2 Kings 18:26, where Hezekiah\'s officials beg the Assyrian envoy to speak Aramaic so that the people on the wall shall not understand — the earliest glimpse in Scripture of Aramaic as the language two governments have in common and the crowd has not. A century and a half later it was the crowd\'s language too.',
            grid: [
                'מלכא לעלמין חיי',
                'אמר חלמא לעבדיך ופשרא נחוא',
            ],
        },
        {
            title: 'Magnified and Sanctified',
            source: 'The opening of the Qaddish, in the standard text of the prayerbook. The complete text first appears in Seder Rav ʿAmram Gaon (Babylonia, ninth century) and in Maḥzor Vitry (northern France, c. 1100); the doxology is older than either, and the standing of its congregational response is discussed in the Talmud at Berakhot 3a, Shabbat 119b and Sotah 49a.',
            words: [
                {
                    native: 'יתגדל',
                    translit: 'yitgaddal',
                    gloss: 'may it be magnified — the itpaʿal, the reflexive-passive stem, in the imperfect. Aramaic keeps no separate jussive, so the plain imperfect carries the wish, and the subject is the noun two words further on.',
                },
                {
                    native: 'ויתקדש',
                    translit: 'we-yitqaddash',
                    gloss: 'and may it be sanctified — the same formation from קדש, \'to be holy\'. The two verbs are a pair, and the pair is quoted.',
                },
                {
                    native: 'שמה',
                    translit: 'shmeh',
                    gloss: 'his name — shum, \'name\', with the third masculine singular suffix -eh. By Semitic idiom the name is the person; nothing here is being said about a word.',
                },
                {
                    native: 'רבא',
                    translit: 'rabba',
                    gloss: 'great — the adjective in the emphatic state, standing after its noun, which is the ordinary Aramaic order for an attributive.',
                },
                {
                    native: 'בעלמא',
                    translit: 'be-alma',
                    gloss: 'in the world — the preposition ב with alma, the same noun that means both \'age\' and \'world\', in the emphatic.',
                },
                {
                    native: 'די',
                    translit: 'di',
                    gloss: 'which — the all-purpose relative and genitive particle of older Aramaic, written as a separate word; in the later eastern dialects it shortens to a prefixed dalath.',
                },
                {
                    native: 'ברא',
                    translit: 'bera',
                    gloss: 'he created — third masculine singular perfect of ברא, the same root as the Hebrew of Genesis 1:1. Its subject is unexpressed, because the subject has just been named as a Name.',
                },
                {
                    native: 'כרעותיה',
                    translit: 'ki-reʿuteh',
                    gloss: 'according to his will — the preposition כ, \'as, according to\', with reʿuta, \'will, desire, favour\', and the third masculine singular suffix. One word, and the sentence is closed.',
                },
            ],
            translation: 'Magnified and sanctified be his great name in the world which he created according to his will.',
            note: 'The two opening verbs are a quotation. At Ezekiel 38:23 God says of himself והתגדלתי והתקדשתי, \'I will magnify myself and sanctify myself\' — the same two roots, in the same order, in the Hebrew reflexive; the prayer takes the words God speaks about himself and returns them to him as a petition. What follows in the service is the response the congregation makes: יהא שמה רבא מברך לעלם ולעלמי עלמיא, \'may his great name be blessed for ever and to all eternity\', which stands very close to Daniel 2:20, להוא שמה די אלהא מברך מן עלמא ועד עלמא. The rites differ over how the first two verbs are vocalised, and over how much of the doxology is said aloud, and the transliteration above is one convention among several. Three things are worth a beginner\'s attention. Not a word of it concerns the dead, although the mourner\'s Kaddish is what most people have heard: its original setting appears to have been the close of a session of study, which survives in the Kaddish de-rabbanan, and the mourner\'s form is a mediaeval Ashkenazi development first firmly attested in the thirteenth-century Or Zaruaʿ. It is built for a congregation, since a doxology whose weight lies in a communal answer cannot be performed alone. And it is in Aramaic, in the teeth of the dictum at Shabbat 12b that the ministering angels do not attend to that language — a paradox the tradition has resolved either by noting that Aramaic was what everyone spoke, or, more interestingly, by observing that a prayer needing no angelic intermediary is the stronger for it. It is said daily wherever Jews pray, and is described here, not prescribed.',
            grid: [
                'יתגדל ויתקדש שמה רבא',
                'בעלמא די ברא כרעותיה',
            ],
        },
        {
            title: 'The Targum\'s First Verse',
            source: 'Targum Onkelos, Genesis 1:1, in the text of A. Sperber, The Bible in Aramaic, vol. 1: The Pentateuch according to Targum Onkelos (Leiden, 1959); given here in the consonantal spelling, without the vowel points the printed Targum carries.',
            words: [
                {
                    native: 'בקדמין',
                    translit: 'be-qadmin',
                    gloss: 'in the beginning — the preposition ב with a plural adverbial form of קדם, \'before, front\': \'at the first\'. It is not a construct, and that is the point: where the Hebrew בראשית has a form that can be read either absolutely or as bound to what follows, the Aramaic quietly settles for the absolute.',
                },
                {
                    native: 'ברא',
                    translit: 'bera',
                    gloss: 'he created — the same three consonants as the Hebrew ברא, and the same sense; Aramaic and Hebrew share the root, and the Targum is content to leave the verb standing.',
                },
                {
                    native: 'יי',
                    translit: 'YY (read aloud as Adonai)',
                    gloss: 'the Lord — two yodhs, the scribal surrogate by which printed Targums write the Tetragrammaton. Note what has happened: the Hebrew of this verse has אלהים, Elohim, and Onkelos renders it by the Name, as it does throughout the chapter.',
                },
                {
                    native: 'ית',
                    translit: 'yat',
                    gloss: '(marker of the definite object; not translated) — the Aramaic particle answering the Hebrew את, and used exactly as it is.',
                },
                {
                    native: 'שמיא',
                    translit: 'shemayya',
                    gloss: 'the heavens — the emphatic state of a noun plural in form and singular in sense, as Hebrew shamayim is. It is the same word that stands in the bowls\' formula, healing from heaven.',
                },
                {
                    native: 'וית',
                    translit: 'we-yat',
                    gloss: 'and (object marker) — the conjunction prefixed to the particle, matching the Hebrew ואת.',
                },
                {
                    native: 'ארעא',
                    translit: 'arʿa',
                    gloss: 'the earth — emphatic state of arʿa, the Aramaic answering to Hebrew erets; the ayin against the tsade is one of the regular sound correspondences by which the two languages can be told apart at a glance.',
                },
            ],
            translation: 'In the beginning the Lord created the heavens and the earth.',
            note: 'For centuries this was the most-read Aramaic in the world. The Talmud at Berakhot 8a records the obligation of shenayim miqra we-eḥad targum, the weekly portion read twice in the Hebrew and once in the Targum, so that a Jewish household went through Onkelos annually; in the Babylonian academies it was targum didan, \'our Targum\'. Megillah 3a attributes it to Onkelos the proselyte, who is said to have recited it from the mouths of R. Eliezer and R. Joshua — a tradition long recognised as running parallel to, and probably confused with, the Palestinian traditions about Aquila and his Greek version, and the attribution is not one a modern reader should take at face value. Its language is a literary Middle Aramaic which Kutscher argued to be Palestinian in origin and Babylonian in redaction. Onkelos is famously restrained where Scripture is anthropomorphic, interposing the Memra, the Word, and other circumlocutions where the Hebrew speaks of God directly; the Palestinian Targums are far more expansive, and Neofiti opens Genesis with Wisdom and the Memra in the first line. Two small things reward attention here. The Targum\'s vote on how to construe בראשית goes with the Septuagint\'s absolute reading and against Rashi\'s construct one, and it is a vote cast centuries before the argument was formally joined. And the object marker changes shape: the Hebrew את invites the old midrashic reading of aleph-to-tav, the whole alphabet folded into the act of creation, while the Aramaic ית cannot be read that way at all, its letters standing nowhere near the ends of the alphabet. A midrash can be untranslatable even between two languages this close.',
            grid: [
                'בקדמין ברא יי ית שמיא וית ארעא',
            ],
        },
        {
            title: 'Healing from Heaven',
            source: 'The commonest of the opening formulae of the Jewish Babylonian incantation bowls, attested across the corpus and printed in the standard editions: J. A. Montgomery, Aramaic Incantation Texts from Nippur (Philadelphia, 1913); J. Naveh and S. Shaked, Amulets and Magic Bowls (Jerusalem and Leiden, 1985) and Magic Spells and Formulae (Jerusalem, 1993). What is glossed below is a formula type, assembled so that it can be read whole, and not a transcription of any one bowl: orthography varies from scribe to scribe, and no adjuration is reproduced here.',
            words: [
                {
                    native: 'אסותא',
                    translit: 'asuta',
                    gloss: 'healing — the emphatic state of asu, from the root אסי, \'to heal\'; the same root gives asya, the physician. It is the ordinary Aramaic word for getting better, not a technical term of the art, and that is the first thing the corpus tells us about itself.',
                },
                {
                    native: 'מן',
                    translit: 'min',
                    gloss: 'from — the preposition. The healing is not made by the bowl; it is asked from somewhere else, and the somewhere is named next.',
                },
                {
                    native: 'שמיא',
                    translit: 'shemayya',
                    gloss: 'heaven — the emphatic state, plural in form and singular in sense. The same word stands in the Targum\'s first verse.',
                },
                {
                    native: 'תהוי',
                    translit: 'tehwe',
                    gloss: 'let there be — third feminine singular imperfect of הוה, \'to be\', feminine because asuta is; the imperfect carries the wish, as Aramaic has no separate jussive. Spellings vary from hand to hand.',
                },
                {
                    native: 'לה',
                    translit: 'lah',
                    gloss: 'to her — the preposition ל with the third feminine singular suffix, standing before the name that follows: \'let there be healing to her, to N daughter of N\'. The anticipating pronoun is ordinary Babylonian Aramaic idiom and not a solecism.',
                },
            ],
            translation: 'Healing from heaven be to her, to N daughter of N.',
            note: 'The line breaks off where the personal names would stand, and the names are the most valuable thing on most bowls. The client is ordinarily identified by the mother — ברת, bart, \'daughter of\' — a matronymic convention shared with later Jewish amulet practice, and the roll of names is a mixture found nowhere else: Jewish beside Iranian, Akkadian survivals, Arabic in the later material. These are people who appear in no chronicle. What the formula asks for is worth dwelling on. Not knowledge, not ascent, not power over a rival, but health, and its companion word in the bowls is נטירותא, guarding. Read in bulk the corpus is a record of ordinary trouble in a Mesopotamian household: illness that has not lifted, children lost one after another, sleep that will not come, livestock dying. The bowl was written by a professional, inverted, and set into the floor of a room or at its threshold, and the physician went on practising next door; the therapeutic pages of the Babylonian Talmud at Giṭṭin 67b–70b move between pharmacology, regimen and adjuration without any sense of crossing a line. This entry describes how such texts open and what they wanted. It is a historical description of a buried corpus, not a formulary, and the adjurations that follow the opening are not reproduced.',
            grid: [
                'אסותא מן שמיא',
                'תהוי לה',
            ],
        },
        {
            title: 'In the Name of the Great Life',
            source: 'The invocation with which the Ginza Rba opens, and with which Mandaean books, prayers and colophons open generally; Right Ginza, Book 1. The standard translation is M. Lidzbarski, Ginzā: Der Schatz oder das große Buch der Mandäer (Göttingen and Leipzig, 1925), made from the lithographic edition of J. H. Petermann, Thesaurus s. Liber Magnus (Leipzig, 1867). Transliteration follows the conventions of E. S. Drower and R. Macuch, A Mandaic Dictionary (Oxford, 1963).',
            words: [
                {
                    native: 'b-',
                    translit: 'b-',
                    gloss: 'in — the preposition, prefixed. Every native field in this reading is transliteration and not script, deliberately: the manuscript orthography of the incipit varies between copies and editions, and the hall\'s Mandaic letters are shown in the alphabet and in the Mandaean current rather than reconstructed here.',
                },
                {
                    native: 'šumaihun',
                    translit: 'shumaihun',
                    gloss: 'their names — šuma, \'name\', with the third person plural suffix. Literally \'in their names\'; the plural is one of majesty and the reference is single. Transliteration, not script.',
                },
                {
                    native: 'ḏ-',
                    translit: 'dh-',
                    gloss: 'of — the genitive and relative particle, and in Mandaic a letter in its own right: the ligature dushenna, ࡖ, counted as the twenty-third sign of the alphabet after the twenty-two. Transliteration, not script.',
                },
                {
                    native: 'hiia',
                    translit: 'hiia',
                    gloss: 'Life — the supreme God of the Mandaeans, whom the hall\'s Mandaean current writes ࡄࡉࡉࡀ ࡓࡁࡀ, Hiia Rba. Plural in form and singular in reference, like the names above; the community says Hayyi. Transliteration, not script.',
                },
                {
                    native: 'rbia',
                    translit: 'rbia',
                    gloss: 'great — the adjective, plural in form to agree with hiia. Transliteration, not script.',
                },
            ],
            translation: 'In the name of the Great Life.',
            note: 'Mandaic stands in this hall\'s letters: the alphabet plaques carry the Mandaean alphabet as well as the square script, with the ligature dushenna counted as a twenty-third letter and the first letter, halqa, repeated at the end so that the series closes where it opened. The words above are nevertheless given in transliteration rather than in those letters, because the spelling of this incipit varies from manuscript to manuscript and a single reconstructed form would claim more than the evidence allows. The transliteration is unusually secure for a Semitic language, since Mandaic writes its vowels — halqa, aksa, ushenna and in serving as a, i, u and e — so that a Mandaic text can be voiced with a certainty no unpointed square-script text permits. Two features of the formula are worth naming. The plural of majesty runs through it: \'in their names, of the great Lives\', for the one Life. And the epithets that follow in the Right Ginza — the great, the first, the alien Life, out of the worlds of light — are the vocabulary that made this corpus so important to the study of Gnosticism, the alien or strange Life being a description of a God who is not of this world and owes it nothing. The Ginza is bound in two halves, the Right for the living and the Left for the dead, the Left written so that the reader must turn the volume over and begin again from the other end. This is a living scripture: Mandaeans in Iraq, Iran and the diaspora recite these words now, and what is offered here is a description of how their books begin.',
            grid: [
                'b-šumaihun ḏ-hiia rbia',
            ],
        },
    ],
    correspondences: null,
};
