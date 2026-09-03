// syriac course — eight lessons for the Scriptorium.
// Every Syriac text quoted here is one the hall already carries and has
// verified: John 1:1 and Matthew 6:9-10 from the Peshitta, Ephrem's Hymns on
// Faith 10:17, Isaac of Nineveh's Homily 74, and the composite scribal
// colophon, which the hall marks plainly as a specimen rather than a
// transcription. Consonantal spellings are given unvocalised throughout, as
// the hall gives them. Where East and West Syriac differ — and on the vowels
// they differ constantly — both are named rather than one being quietly
// preferred.
export default {
    language: 'syriac',
    title: 'Fire in the Letters',
    tagline: 'Eight lessons from the twenty-two letters to Ephrem on Fire and Spirit — and a manuscript dated from its own colophon.',
    overview: 'Syriac is the Aramaic of Edessa, and it is the language in which a great deal of what Europe later called Arabic science first travelled. This course assumes nothing. You will learn the twenty-two letters and the three hands they are written in; how the letters join and what the dot does, which in Syriac is a great deal; the two rival ways of writing the vowels, and why the same word is Māryā in the east and Moryo in the west; the emphatic state, which is why every Syriac noun you meet appears to end in the same letter; the verb, and the strange doubled construction with which the Peshitta renders \'was\'; and the letters as numerals, ending in a skill worth having — taking a date off a manuscript colophon and turning it into a year of our era. The last lesson reads Ephrem on Fire and Spirit and Isaac of Nineveh on the merciful heart, which is where this hall\'s material is richest. Everything quoted is attested and cited, and where the traditions disagree you will be told which is which.',
    lessons: [
        {
            number: 1,
            title: 'The Twenty-Two Letters',
            aim: 'Learn the twenty-two consonants, read them right to left, meet the three hands they are written in, and see why the letter-names are a list of ordinary objects.',
            sections: [
                {
                    heading: 'An abjad, and a cousin',
                    paragraphs: [
                        'Syriac writes twenty-two letters, all of them consonants, running right to left. A script that writes the consonants and leaves the vowels to the reader is called an abjad, after the first four letters of the Arabic order, and it is the normal Semitic arrangement: the root of a word lives in its consonants, and a reader who knows the language supplies the rest. Vowel marks exist, and lesson three is about them, but they were an afterthought of the fifth century and later, and a great many manuscripts do without.',
                        'The alphabet descends from Imperial Aramaic, the chancery script of the Persian empire, and so does the square Hebrew alphabet. The two are cousins: twenty-two letters each, in the same order, with the same names and — as lesson six will use — the same numerical values. A reader who has walked the Hebrew hall already knows the skeleton of this one, and will find ālap̄ where ālef stood, bēth for bet, gāmal for gimel, and so on to the end.',
                    ],
                    examples: [
                        { native: 'ܐ ܒ ܓ ܕ ܗ ܘ ܙ ܚ ܛ ܝ ܟ ܠ ܡ ܢ ܣ ܥ ܦ ܨ ܩ ܪ ܫ ܬ', translit: 'ʾ b g d h w z ḥ ṭ y k l m n s ʿ p ṣ q r š t', gloss: 'the twenty-two letters, in order', note: 'Read from the right. This is also the numeral order of lesson six.' },
                        { native: 'ܐܠܗܐ', translit: 'Alāhā', gloss: 'God', note: 'Four letters, ālap̄–lāmadh–hē–ālap̄, and not a vowel written among them.' },
                    ],
                },
                {
                    heading: 'The names are a list of things',
                    paragraphs: [
                        'The letter-names are not sounds but objects, and they are the oldest thing about the alphabet: ālap̄ an ox, bēth a house, gāmal a camel, dālath a door, mīm water, nūn a fish, ʿē an eye, pē a mouth, rēsh a head, shīn a tooth. Each began as a picture of the thing it names, and each came to stand for the first sound of that name. That is the whole principle of the alphabet, invented once, in the Sinai or the Levant in the second millennium before Christ, and inherited by every alphabet in this Scriptorium including the one you are reading now.',
                        'Two of the names have never been securely explained. Ṣādhē has been read as a fish-hook and as a papyrus plant, and qōp̄ as the back of the head, a monkey and the eye of a needle, none of them settled. The hall says so rather than choosing, and so should you: an etymology that is repeated confidently in handbooks is not thereby established.',
                    ],
                    examples: [
                        { native: 'ܒܝܬܐ', translit: 'baytā', gloss: 'house', note: 'The word the second letter is named for, still meaning what it meant.' },
                        { native: 'ܡܝܐ', translit: 'mayyā', gloss: 'water', note: 'Named by mīm, whose parent sign was a row of waves.' },
                        { native: 'ܥܝܢܐ', translit: 'ʿaynā', gloss: 'eye, spring', note: 'ʿē is the eye; the same word means a spring of water.' },
                    ],
                },
                {
                    heading: 'Three hands',
                    paragraphs: [
                        'You will meet the alphabet in three shapes, and they are not fonts but the scripts of different centuries and communities. Estrangela is the oldest, angular and monumental, the hand of the great codices of the fifth and sixth centuries; the name is usually derived from Greek strongylos, \'rounded\', though the derivation is not certain. Serṭo is the flowing cursive of the West Syriac tradition, and is what most printed grammars use. Madnḥāyā, \'eastern\', is the hand of the Church of the East, which carried Syriac to Kerala and along the Silk Road.',
                        'The letters below, and everywhere in this Scriptorium, are set in the shapes your system provides — which is usually a Serṭo or Estrangela form. What matters is that the same twenty-two letters underlie all three, in the same order and with the same values, so learning one hand is learning the alphabet.',
                    ],
                    examples: [
                        { native: 'ܟܬܒܐ', translit: 'ktābā', gloss: 'book', note: 'From ktab, \'to write\'; the word for a book, and for Scripture.' },
                        { native: 'ܡܕܢܚܝܐ', translit: 'madnḥāyā', gloss: 'eastern', note: 'The name of the eastern hand, from denḥā, \'dawning, rising\'.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܐܠܗܐ', translit: 'Alāhā', gloss: 'God' },
                { native: 'ܟܬܒܐ', translit: 'ktābā', gloss: 'book; Scripture' },
                { native: 'ܒܝܬܐ', translit: 'baytā', gloss: 'house' },
                { native: 'ܡܝܐ', translit: 'mayyā', gloss: 'water' },
                { native: 'ܢܘܪܐ', translit: 'nūrā', gloss: 'fire' },
                { native: 'ܪܘܚܐ', translit: 'rūḥā', gloss: 'spirit, wind, breath' },
                { native: 'ܪܫܐ', translit: 'rēshā', gloss: 'head, beginning' },
                { native: 'ܫܡܐ', translit: 'shmā', gloss: 'name' },
            ],
            exercises: [
                { prompt: 'How many letters does Syriac write, and what does it not write?', answer: 'Twenty-two, all consonants. The vowels are not written in the base script; marks for them were added later and many manuscripts omit them.', hint: null },
                { prompt: 'Which direction do you read, and where does ܐܠܗܐ begin?', answer: 'Right to left. ܐܠܗܐ begins with the rightmost letter, ālap̄, and runs ālap̄–lāmadh–hē–ālap̄.', hint: null },
                { prompt: 'What do the letter-names ܡ mīm, ܢ nūn and ܥ ʿē mean?', answer: 'Water, fish, and eye. The names are the objects the signs originally pictured.', hint: 'They are ordinary nouns, not sounds.' },
                { prompt: 'Name the three hands, and say which is oldest.', answer: 'Estrangela, the oldest and most angular; Serṭo, the western cursive; Madnḥāyā, the eastern hand of the Church of the East.', hint: null },
                { prompt: 'Which two letter-names have never been securely explained?', answer: 'Ṣādhē — proposed as a fish-hook and as a papyrus plant — and qōp̄, proposed as the back of the head, a monkey and the eye of a needle. None is established.', hint: null },
                { prompt: 'What alphabet is Syriac a cousin of, and in what three respects?', answer: 'The square Hebrew alphabet. Both descend from Imperial Aramaic, and both have twenty-two letters in the same order, with the same names and the same numerical values.', hint: null },
            ],
        },
        {
            number: 2,
            title: 'Letters That Join, and What the Dot Does',
            aim: 'Learn that Syriac is cursive by nature, which eight letters refuse to join forwards, and the several distinct jobs the dot performs — one of which is the only thing separating a singular from a plural.',
            sections: [
                {
                    heading: 'A cursive script by nature',
                    paragraphs: [
                        'Syriac is joined-up writing, and always was. Within a word the letters connect along the line, each flowing into the next, so that a word is drawn as one continuous movement rather than as a row of separate signs. This is not a calligraphic flourish but the ordinary state of the script, and it is why a printed Syriac word looks so unlike the tidy separated letters of a Hebrew page.',
                        'Eight letters, however, refuse to join to the letter that follows them: ālap̄, dālath, hē, waw, zain, ṣādhē, rēsh and taw. After one of these the pen lifts and the next letter begins afresh, which produces a visible gap inside a word. Beginners read those gaps as word-breaks and mis-divide the line. They are not word-breaks; they are simply eight letters with no exit stroke.',
                    ],
                    examples: [
                        { native: 'ܟܬܒܐ', translit: 'ktābā', gloss: 'book', note: 'Kāp̄ joins forward to taw; taw does not join, so ālap̄ after it starts clear.' },
                        { native: 'ܡܠܟܘܬܐ', translit: 'malkūtā', gloss: 'kingdom, kingship', note: 'A long word with waw and taw inside it, each producing an internal gap.' },
                        { native: 'ܐܒܘܢ', translit: 'abūn', gloss: 'our Father', note: 'Four letters and two of them non-joiners: the word looks like three pieces and is one.' },
                    ],
                },
                {
                    heading: 'The dot that tells two letters apart',
                    paragraphs: [
                        'Dālath and rēsh are the same shape. Nothing distinguishes them but a dot: below the letter it is dālath, d; above it, rēsh, r. There is no other difference, and the two letters are common enough that mistaking them wrecks a reading — d- alone is the relative and genitive particle that holds Syriac sentences together, while rēsh opens rēshā, \'head, beginning\'.',
                        'This is the plainest of the dot\'s jobs, and it is worth fixing before the others, because the same small mark is asked to do several unrelated things in this script and the beginner tends to see one undifferentiated speckle.',
                    ],
                    examples: [
                        { native: 'ܕ  /  ܪ', translit: 'd / r', gloss: 'dālath / rēsh', note: 'One skeleton, two letters. Dot beneath, dālath; dot above, rēsh.' },
                        { native: 'ܪܫܐ', translit: 'rēshā', gloss: 'head, beginning', note: 'Opens with rēsh — the dot is above.' },
                        { native: 'ܕܝܢ', translit: 'dēn', gloss: 'but, now (a connective particle)', note: 'Opens with dālath — the dot is below.' },
                    ],
                },
                {
                    heading: 'Seyāmē: the two dots that make a plural',
                    paragraphs: [
                        'Set two dots above a word and it becomes plural. The mark is called seyāmē, \'placings\', and it is the single most useful diacritic in Syriac, because in a great many nouns the plural is not spelled differently from the singular at all. Malkā, \'king\', and malkē, \'kings\', are written with the same four letters; only the seyāmē separates them. Miss the dots and you have misread the number of everything in the sentence.',
                        'The dots sit anywhere convenient above the word, usually over a short letter, and they are not tied to a particular consonant. They mark plural nouns and adjectives, and certain feminine plural verb forms — but not, as a rule, masculine plural verbs, which is a distinction to keep in mind and not a rule to apply blindly.',
                    ],
                    examples: [
                        { native: 'ܡܠܟܐ', translit: 'malkā', gloss: 'king', note: 'Without seyāmē: singular.' },
                        { native: 'ܡܠܟ̈ܐ', translit: 'malkē', gloss: 'kings', note: 'The identical letters with two dots above: plural. Nothing else changed.' },
                        { native: 'ܣܝ̈ܡܐ', translit: 'seyāmē', gloss: 'placings — the name of the mark', note: 'The word for the plural mark is itself a plural, and carries the mark.' },
                    ],
                },
                {
                    heading: 'Hard and soft: the six letters that soften',
                    paragraphs: [
                        'Six letters — bēth, gāmal, dālath, kāp̄, pē and taw, remembered by the mnemonic bgdkpt — are sounded two ways. After a vowel they soften, so that b becomes a v-sound, k a ch as in Scottish loch, p an f, and t a th. Where a manuscript troubles to mark it, a dot above the letter says hard (qushshāyā, \'hardening\') and a dot below says soft (rukkākā, \'softening\').',
                        'You now have three unrelated jobs for one mark: distinguishing dālath from rēsh, marking hard against soft, and — doubled — marking the plural. Others exist, including dots that distinguish verb forms. The point of this section is not to master them but to stop seeing them as one thing. When you meet a dot, ask which of its jobs it is doing, and the position and number will usually tell you.',
                    ],
                    examples: [
                        { native: 'ܟܬܒ', translit: 'ktab', gloss: 'he wrote', note: 'The bēth here is soft after a vowel: the sound is closer to v.' },
                        { native: 'ܟܬܒܐ', translit: 'ktābā', gloss: 'book', note: 'Same three root letters, soft bēth again, with the ending of the next lesson.' },
                        { native: 'ܐܒܐ', translit: 'abbā', gloss: 'father', note: 'Here the bēth is doubled and hard — abbā, not avā.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܡܠܟܐ', translit: 'malkā', gloss: 'king' },
                { native: 'ܡܠܟܘܬܐ', translit: 'malkūtā', gloss: 'kingdom, kingship' },
                { native: 'ܐܒܐ', translit: 'abbā', gloss: 'father' },
                { native: 'ܐܒܘܢ', translit: 'abūn', gloss: 'our Father' },
                { native: 'ܟܬܒ', translit: 'ktab', gloss: 'he wrote' },
                { native: 'ܕ', translit: 'd-', gloss: 'who, which, of (relative and genitive particle)' },
                { native: 'ܕܝܢ', translit: 'dēn', gloss: 'but, now' },
                { native: 'ܣܝ̈ܡܐ', translit: 'seyāmē', gloss: 'the two dots marking a plural' },
            ],
            exercises: [
                { prompt: 'Name the eight letters that do not join to the letter following them.', answer: 'ālap̄, dālath, hē, waw, zain, ṣādhē, rēsh and taw.', hint: null },
                { prompt: 'You see a gap in the middle of what you thought was one word. What has probably happened?', answer: 'One of the eight non-joining letters has ended, so the pen lifted. It is not a word-break.', hint: null },
                { prompt: 'What is the only difference between ܕ and ܪ?', answer: 'The dot: below the letter it is dālath (d), above it is rēsh (r). The skeletons are identical.', hint: null },
                { prompt: 'ܡܠܟܐ and ܡܠܟ̈ܐ have the same letters. What separates them, and what do they mean?', answer: 'The seyāmē, two dots above the second. ܡܠܟܐ is malkā, \'king\'; ܡܠܟ̈ܐ is malkē, \'kings\'.', hint: 'Count the dots, not the letters.' },
                { prompt: 'Name three distinct jobs the dot does in Syriac.', answer: 'It distinguishes dālath from rēsh; it marks a bgdkpt letter as hard (above) or soft (below); and doubled as seyāmē it marks a plural. It also distinguishes certain verb forms.', hint: null },
                { prompt: 'Which six letters soften after a vowel, and what are the two marks called?', answer: 'bēth, gāmal, dālath, kāp̄, pē and taw — bgdkpt. Hard is qushshāyā, marked with a dot above; soft is rukkākā, marked with a dot below.', hint: null },
            ],
        },
        {
            number: 3,
            title: 'Vowels, and Two Ways to Write Them',
            aim: 'Learn the three letters that hint at vowels, then the two rival vowel systems — eastern dots and western Greek letters — and why the same word is Māryā in one tradition and Moryo in the other.',
            sections: [
                {
                    heading: 'Three letters that lean towards vowels',
                    paragraphs: [
                        'Before any vowel marks existed, the script had a partial remedy: three consonants doing double duty as vowel indicators, the device Latin grammarians call matres lectionis, \'mothers of reading\'. Waw stands for u and o, yōdh for i and e, and ālap̄ for long a and for a vowel at the end of a word. They are consonants that have agreed to hint.',
                        'This is why ālap̄ ends almost every Syriac noun you will meet — malkā, ktābā, rūḥā, nūrā — and why the ending is written but the vowel it carries is not. The next lesson explains what that ending is doing grammatically. For now, read a final ālap̄ as long ā.',
                    ],
                    examples: [
                        { native: 'ܢܘܪܐ', translit: 'nūrā', gloss: 'fire', note: 'The waw carries ū; the final ālap̄ carries ā. Two vowels indicated, none written as such.' },
                        { native: 'ܪܫܝܬ', translit: 'rēshīt', gloss: 'beginning', note: 'The yōdh carries ī. Without it the word would be four bare consonants.' },
                        { native: 'ܐܒܘܢ', translit: 'abūn', gloss: 'our Father', note: 'The waw again, this time ū in a suffix.' },
                    ],
                },
                {
                    heading: 'Two systems, two churches',
                    paragraphs: [
                        'By the fifth century readers wanted more, and two solutions were found — not one after the other, but by two communities that had by then parted. The eastern system, used by the Church of the East and still in use, places dots above and below the letters: a dot above for one vowel, below for another, pairs of dots for others. The western system, used by the Syriac Orthodox and the Maronites, instead sets miniature Greek vowel letters over and under the consonants — a small alpha for a, epsilon for e, and so on. Tradition credits the western scheme to Jacob of Edessa, who died in 708 and who certainly worked on Syriac orthography, though how much of the system is his is not settled.',
                        'The consequence for a reader is that the same consonantal text can be pointed two different ways, and that the two traditions genuinely pronounce Syriac differently. The vowel written zqāpā is ā in the east and o in the west. So the identical letters ܡܪܝܐ are Māryā to an eastern reader and Moryo to a western one; ܝܫܘܥ is Ishoʿ in the east and Yeshuʿ in the west. Neither is a mistake, and a book that gives only one without saying so is concealing something from you.',
                    ],
                    examples: [
                        { native: 'ܡܪܝܐ', translit: 'Māryā (east) / Moryo (west)', gloss: 'the Lord', note: 'One spelling, two traditions of pronunciation. The letters do not decide it.' },
                        { native: 'ܝܫܘܥ', translit: 'Yeshuʿ (west) / Ishoʿ (east)', gloss: 'Jesus', note: 'The same divergence in the commonest name in the literature.' },
                        { native: 'ܐܠܗܐ', translit: 'Alāhā (east) / Aloho (west)', gloss: 'God', note: 'Every ā of the eastern reading is an o in the western.' },
                    ],
                },
                {
                    heading: 'Reading unpointed text',
                    paragraphs: [
                        'Most Syriac you will meet, in manuscripts and in this Scriptorium alike, is unpointed: consonants and the three hinting letters, and nothing else. This is less forbidding than it sounds, because Semitic words are built on consonantal roots and the patterns are few. Once you know that ktab is \'he wrote\' and ktābā is \'a book\', the skeleton k–t–b tells you which family a word belongs to and the shape tells you the rest.',
                        'The practical advice is the one every reader of these scripts arrives at: learn words, not letters. A vocabulary of two hundred words read in context will get you further than any amount of vowel-pointing learned in the abstract, and the pointing is not there to be leaned on in the manuscripts anyway.',
                    ],
                    examples: [
                        { native: 'ܟܬܒ · ܟܬܒܐ · ܟܬܘܒܐ', translit: 'ktab · ktābā · kātōbā', gloss: 'he wrote · a book · a scribe', note: 'One root, k–t–b, three words. The consonants are the family; the pattern is the member.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܡܪܝܐ', translit: 'Māryā', gloss: 'the Lord' },
                { native: 'ܝܫܘܥ', translit: 'Yeshuʿ', gloss: 'Jesus' },
                { native: 'ܪܫܝܬ', translit: 'rēshīt', gloss: 'beginning' },
                { native: 'ܟܬܘܒܐ', translit: 'kātōbā', gloss: 'scribe' },
                { native: 'ܫܡܝܐ', translit: 'shmayyā', gloss: 'heaven, the heavens' },
                { native: 'ܥܠܡܐ', translit: 'ʿālmā', gloss: 'world, age' },
                { native: 'ܢܘܗܪܐ', translit: 'nuhrā', gloss: 'light' },
                { native: 'ܫܠܡܐ', translit: 'shlāmā', gloss: 'peace' },
            ],
            exercises: [
                { prompt: 'Name the three matres lectionis and the vowels each indicates.', answer: 'Waw for u and o; yōdh for i and e; ālap̄ for long a and for a final vowel.', hint: null },
                { prompt: 'Describe the two vowel systems and who uses each.', answer: 'The eastern system uses dots above and below the line and is used by the Church of the East; the western uses miniature Greek vowel letters and is used by the Syriac Orthodox and Maronites, traditionally credited to Jacob of Edessa.', hint: null },
                { prompt: 'Why do books give both Māryā and Moryo for ܡܪܝܐ?', answer: 'Because the vowel zqāpā is sounded ā in the East Syriac tradition and o in the West Syriac. The consonantal spelling is identical; the traditions differ.', hint: 'The letters are not in dispute.' },
                { prompt: 'What do ܟܬܒ, ܟܬܒܐ and ܟܬܘܒܐ have in common, and how do they differ?', answer: 'All three are built on the root k–t–b. ktab is \'he wrote\', ktābā \'a book\', kātōbā \'a scribe\' — same consonantal family, different patterns.', hint: null },
                { prompt: 'A manuscript has no vowel marks at all. Is it defective?', answer: 'No. Unpointed text is the normal state of Syriac writing; the pointing systems are later additions and a great many manuscripts do without them entirely.', hint: null },
            ],
        },
        {
            number: 4,
            title: 'The Emphatic State',
            aim: 'Understand why nearly every Syriac noun ends in ālap̄, learn the three states and the two genders, and use the particle d- that holds Syriac phrases together.',
            sections: [
                {
                    heading: 'Why everything ends in ā',
                    paragraphs: [
                        'You will have noticed that almost every noun in this course ends the same way: malkā, ktābā, rūḥā, nūrā, ʿālmā, shlāmā. That ending is not part of the root. Syriac nouns have three states, and the one ending in -ā is called the emphatic.',
                        'Its history is worth knowing because it explains the oddity. In older Aramaic the emphatic ending was a definite article stuck on the end — malkā meant \'the king\' as against malek, \'a king\'. By classical Syriac that force had worn away entirely, and the emphatic simply became the ordinary form in which a noun is used and cited. So malkā means \'king\', definite or not, and Syriac has no article at all: a language that lost its indefinite form by making the definite one universal.',
                        'The other two states survive in narrow uses. The absolute, without the ending, appears after numerals and in a few set phrases. The construct, also endingless, appears when one noun is bound directly to another — as in the colophon phrase b-shnat, \'in the year of\', which you will read in lesson six.',
                    ],
                    examples: [
                        { native: 'ܡܠܟܐ', translit: 'malkā', gloss: 'king — emphatic state, the ordinary form', note: 'Historically \'the king\'; in classical Syriac simply \'king\'.' },
                        { native: 'ܫܢܬ', translit: 'shnat', gloss: 'year of — construct state', note: 'Endingless because it is bound to what follows. The emphatic would be shattā.' },
                        { native: 'ܟܬܒܐ', translit: 'ktābā', gloss: 'book', note: 'Root k–t–b with the emphatic ending; the final ālap̄ is the state, not the root.' },
                    ],
                },
                {
                    heading: 'Two genders, and the plural you cannot see',
                    paragraphs: [
                        'Every noun is masculine or feminine. Feminine nouns generally mark it with a taw before the ending: malkā, \'king\', against malktā, \'queen\'; and abstract nouns are formed in -ūtā, which is how malkā gives malkūtā, \'kingship, kingdom\', the word in the Lord\'s Prayer.',
                        'The plurals are where lesson two pays off. The masculine emphatic plural ends in -ē, which is written with exactly the same letters as the singular -ā, so malkā and malkē are indistinguishable on the page except for the seyāmē. The feminine plural is -ātā and is visible: malktā gives malkātā. So for half the nouns in the language, number is carried by two dots and nothing else.',
                    ],
                    examples: [
                        { native: 'ܡܠܟܬܐ', translit: 'malktā', gloss: 'queen', note: 'The feminine taw before the ending.' },
                        { native: 'ܡܠܟܘܬܐ', translit: 'malkūtā', gloss: 'kingdom, kingship', note: 'The abstract in -ūtā, built on malkā.' },
                        { native: 'ܡܠܟ̈ܐ', translit: 'malkē', gloss: 'kings', note: 'Masculine plural: same letters as the singular, distinguished only by seyāmē.' },
                        { native: 'ܝܚܝܕܝܘܬܐ', translit: 'īḥīdāyūtā', gloss: 'singleness, the solitary life', note: 'The same -ūtā abstract on īḥīdāyā, \'solitary\' — a key word of Syriac asceticism.' },
                    ],
                },
                {
                    heading: 'The particle that joins everything: d-',
                    paragraphs: [
                        'A single letter, dālath prefixed to a word, does the work that English spreads over several: it is the relative pronoun \'who, which, that\', and it is also the mark of the genitive, \'of\'. Syriac uses it constantly, and once you see it the structure of a phrase opens up.',
                        'So rūḥā d-qudshā is \'the Spirit of holiness\', which is the Syriac for the Holy Spirit; yāldat Alāhā is \'the bearer of God\', the Theotokos; and in the colophon of lesson six, d-Yawnāyē is \'of the Greeks\'. Prefixed particles stack, too, and are written solid with the word: in the Lord\'s Prayer, d-ba-shmayyā is three elements in one written block — d- \'who\', b- \'in\', and shmayyā \'heaven\'.',
                    ],
                    examples: [
                        { native: 'ܪܘܚܐ ܕܩܘܕܫܐ', translit: 'Rūḥā d-Qudshā', gloss: 'the Spirit of holiness — the Holy Spirit', note: 'd- as genitive: literally spirit of-holiness.' },
                        { native: 'ܝܠܕܬ ܐܠܗܐ', translit: 'Yāldat Alāhā', gloss: 'Bearer of God, Theotokos', note: 'A construct: yāldat is endingless because bound to Alāhā.' },
                        { native: 'ܕܒܫܡܝܐ', translit: 'd-ba-shmayyā', gloss: 'who is in heaven', note: 'Three elements written solid: d- who, b- in, shmayyā heaven.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܡܠܟܬܐ', translit: 'malktā', gloss: 'queen' },
                { native: 'ܫܢܬܐ', translit: 'shattā', gloss: 'year (construct ܫܢܬ shnat)' },
                { native: 'ܩܘܕܫܐ', translit: 'qudshā', gloss: 'holiness' },
                { native: 'ܝܚܝܕܝܐ', translit: 'īḥīdāyā', gloss: 'single one, solitary; a monk' },
                { native: 'ܝܚܝܕܝܘܬܐ', translit: 'īḥīdāyūtā', gloss: 'singleness, the solitary life' },
                { native: 'ܢܦܫܐ', translit: 'napshā', gloss: 'soul, self' },
                { native: 'ܠܒܐ', translit: 'lebbā', gloss: 'heart' },
                { native: 'ܒܪܝܬܐ', translit: 'brītā', gloss: 'creation' },
            ],
            exercises: [
                { prompt: 'Why does nearly every Syriac noun end in ālap̄?', answer: 'Because it is cited in the emphatic state, whose ending is -ā. Historically that ending was a definite article; in classical Syriac the force is gone and the emphatic is simply the ordinary form.', hint: null },
                { prompt: 'Does Syriac have a definite article?', answer: 'No. The old definite ending became universal, so malkā covers both \'king\' and \'the king\'.', hint: null },
                { prompt: 'Name the three states and what each is for.', answer: 'Emphatic, the ordinary form, ending -ā. Absolute, endingless, after numerals and in set phrases. Construct, endingless, when a noun is bound directly to a following noun.', hint: null },
                { prompt: 'How is ܡܠܟ̈ܐ distinguished from ܡܠܟܐ, and what does each mean?', answer: 'Only by the seyāmē. ܡܠܟܐ is malkā, \'king\'; ܡܠܟ̈ܐ is malkē, \'kings\'.', hint: null },
                { prompt: 'Build the abstract noun from ܡܠܟܐ and translate it.', answer: 'ܡܠܟܘܬܐ malkūtā, \'kingship, kingdom\', using the abstract ending -ūtā.', hint: null },
                { prompt: 'Give the two jobs of the particle d-, with an example of each.', answer: 'Relative \'who, which\': d-ba-shmayyā, \'who is in heaven\'. Genitive \'of\': rūḥā d-qudshā, \'the Spirit of holiness\'.', hint: null },
            ],
        },
        {
            number: 5,
            title: 'The Verb, and the Word That Was',
            aim: 'Learn the perfect as the citation form, the verb hwā, the existential particle īt with its suffixes, and read the first clause of the Peshitta Gospel of John.',
            sections: [
                {
                    heading: 'The perfect is the dictionary form',
                    paragraphs: [
                        'A Syriac verb is cited not as an infinitive but as the third person masculine singular of the perfect — that is, as \'he did it\'. So the lexicon entry for writing is ktab, \'he wrote\', and the root is read off from it. This takes a little adjusting to, and it is the same convention as Hebrew and Arabic.',
                        'The perfect adds its endings after the root: ktab, \'he wrote\'; kethbat, \'she wrote\'; ketbet, \'I wrote\'. The imperfect puts them in front: nektōb, \'he will write\'. You do not need the paradigms in full for this course, but you do need to recognise that a prefixed n- or t- signals an imperfect, since two words in the Lord\'s Prayer of the next lesson are built that way.',
                    ],
                    examples: [
                        { native: 'ܟܬܒ', translit: 'ktab', gloss: 'he wrote — the citation form', note: 'Root k–t–b. Lexicons list this, not an infinitive.' },
                        { native: 'ܫܠܡ', translit: 'shlem', gloss: 'it is finished, it is completed', note: 'The perfect that opens every scribal colophon.' },
                        { native: 'ܢܬܩܕܫ', translit: 'netqaddash', gloss: 'let it be hallowed', note: 'The prefixed n- marks an imperfect; the t- inside marks the passive-reflexive stem.' },
                    ],
                },
                {
                    heading: 'To be, twice over',
                    paragraphs: [
                        'Syriac expresses being in two ways, and the Peshitta uses both at once. The first is the ordinary verb hwā, \'he was, he became\', a perfectly normal perfect. The second is īt, an existential particle meaning \'there is\', which takes pronominal suffixes: ītaw(hy), \'he is\'. The final yōdh of that form is written and not sounded — pointed manuscripts draw a small line under it, the linea occultans, to say so.',
                        'Set the two together and you have the construction that opens the Fourth Gospel in Syriac: ītaw(hy) hwā, literally \'he-is was\'. It is not a redundancy but the Peshitta\'s way of rendering the Greek imperfect ἦν, which asserts a state continuing with no beginning in view. Where Greek has one word, Syriac uses two, and the doubling is the point.',
                    ],
                    examples: [
                        { native: 'ܗܘܐ', translit: 'hwā', gloss: 'he was, he became', note: 'Third masculine singular perfect. An ordinary verb.' },
                        { native: 'ܐܝܬ', translit: 'īt', gloss: 'there is', note: 'The existential particle, not a verb proper.' },
                        { native: 'ܐܝܬܘܗܝ', translit: 'ītaw(hy)', gloss: 'he is', note: 'īt with the third masculine singular suffix. The final yōdh is written but silent.' },
                        { native: 'ܐܝܬܘܗܝ ܗܘܐ', translit: 'ītaw(hy) hwā', gloss: 'he was — as a continuing state', note: 'The two together render the Greek imperfect ἦν.' },
                    ],
                },
                {
                    heading: 'ܒܪܫܝܬ ܐܝܬܘܗܝ ܗܘܐ ܡܠܬܐ',
                    paragraphs: [
                        'Four words, and you have met every one. B-rēshīt: the preposition b-, \'in\', written solid with rēshīt, \'beginning\', which is built on rēshā, \'head\' — the same idiom as the Hebrew of Genesis, and the same as the Greek ἐν ἀρχῇ. Ītaw(hy) hwā: the doubled being of the last section. Meltā: the emphatic state of a feminine noun from the root m–l–l, \'to speak\', meaning word, utterance, saying and reason at once.',
                        'That last word deserves attention. Syriac has two candidates for the Greek λόγος — meltā, and mēmrā, which also means a verse homily and is the word Syriac writers use for the divine Word in other contexts. The Peshitta chose meltā here. A reader who wants to know what Syriac Christianity meant by the Word has to weigh both, and the hall\'s lexicon carries each.',
                        'One further thing to notice: meltā is grammatically feminine. Nothing follows from that theologically — grammatical gender in Semitic languages is not a statement about the thing named — but readers regularly try to make something of it, and it is worth knowing why they should not.',
                    ],
                    examples: [
                        { native: 'ܒܪܫܝܬ ܐܝܬܘܗܝ ܗܘܐ ܡܠܬܐ', translit: 'b-rēshīt ītaw(hy) hwā meltā', gloss: 'In the beginning was the Word', note: 'Peshitta, John 1:1. Every word met in this course.' },
                        { native: 'ܡܠܬܐ', translit: 'meltā', gloss: 'word, utterance, reason', note: 'From m–l–l, \'to speak\'. Feminine, and emphatic in state.' },
                        { native: 'ܡܐܡܪܐ', translit: 'mēmrā', gloss: 'word; a verse homily', note: 'The other Syriac word for the Word, and the name of a poetic genre.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܗܘܐ', translit: 'hwā', gloss: 'he was, he became' },
                { native: 'ܐܝܬ', translit: 'īt', gloss: 'there is' },
                { native: 'ܐܝܬܘܗܝ', translit: 'ītaw(hy)', gloss: 'he is' },
                { native: 'ܡܠܬܐ', translit: 'meltā', gloss: 'word, utterance, reason' },
                { native: 'ܡܐܡܪܐ', translit: 'mēmrā', gloss: 'word; verse homily' },
                { native: 'ܫܠܡ', translit: 'shlem', gloss: 'it is finished' },
                { native: 'ܒܪܫܝܬ', translit: 'b-rēshīt', gloss: 'in the beginning' },
                { native: 'ܪܐܙܐ', translit: 'rāzā', gloss: 'mystery, symbol, sacrament' },
            ],
            exercises: [
                { prompt: 'In what form is a Syriac verb cited, and what does ܟܬܒ mean as a lexicon entry?', answer: 'In the third person masculine singular of the perfect. ktab is \'he wrote\'.', hint: null },
                { prompt: 'What are the two ways Syriac expresses being?', answer: 'The verb hwā, \'he was\', and the existential particle īt, \'there is\', which takes suffixes — ītaw(hy), \'he is\'.', hint: null },
                { prompt: 'Why does the Peshitta write ܐܝܬܘܗܝ ܗܘܐ rather than just ܗܘܐ?', answer: 'The pair renders the Greek imperfect ἦν, which presents a state as continuing with no beginning in view. The doubling carries that force.', hint: 'Ask what the Greek it translates was doing.' },
                { prompt: 'What is odd about the final yōdh of ܐܝܬܘܗܝ?', answer: 'It is written but not pronounced. Pointed manuscripts mark it with a line beneath, the linea occultans.', hint: null },
                { prompt: 'Translate ܒܪܫܝܬ ܐܝܬܘܗܝ ܗܘܐ ܡܠܬܐ and name the parts of the first word.', answer: '\'In the beginning was the Word.\' b-rēshīt is the preposition b-, \'in\', written solid with rēshīt, \'beginning\', from rēshā, \'head\'.', hint: null },
                { prompt: 'Which two Syriac words compete to render the Greek λόγος?', answer: 'meltā, which the Peshitta uses at John 1:1, and mēmrā, which also means a verse homily and is used of the divine Word elsewhere.', hint: null },
            ],
        },
        {
            number: 6,
            title: 'Letters as Numbers, and Dating a Manuscript',
            aim: 'Learn the numerical values of the twenty-two letters, read a number off a page, and take a real date out of a scribal colophon and convert it to a year of our era.',
            sections: [
                {
                    heading: 'The alphabet counts',
                    paragraphs: [
                        'The letters in their alphabetical order carry number. Ālap̄ to ṭēth are the units one to nine; yōdh to ṣādhē are the tens, ten to ninety; qōp̄ to taw are the hundreds, one hundred to four hundred. Twenty-two letters give values up to four hundred, and larger numbers are built by combination — five hundred is taw plus qōp̄, ܬܩ, four hundred and one hundred set side by side.',
                        'This is the scheme Hebrew uses, letter for letter, and it is the same idea as Greek isopsephy, though Greek needed three extra signs to reach nine hundred. A reader who has done the arithmetic in the Hebrew or Greek halls already knows this one.',
                        'A letter is not read as a number unless something tells the eye to do so. The usual mark is a horizontal stroke drawn above the letter or over the whole group; some hands use a dot above each letter instead. For thousands the mark moves beneath.',
                    ],
                    examples: [
                        { native: 'ܐ ܒ ܓ ܕ ܗ ܘ ܙ ܚ ܛ', translit: '1 2 3 4 5 6 7 8 9', gloss: 'the units', note: 'Ālap̄ through ṭēth.' },
                        { native: 'ܝ ܟ ܠ ܡ ܢ ܣ ܥ ܦ ܨ', translit: '10 20 30 40 50 60 70 80 90', gloss: 'the tens', note: 'Yōdh through ṣādhē.' },
                        { native: 'ܩ ܪ ܫ ܬ', translit: '100 200 300 400', gloss: 'the hundreds', note: 'Qōp̄ through taw. The alphabet runs out at four hundred.' },
                        { native: 'ܬܩ', translit: '500', gloss: 'five hundred', note: 'taw 400 + qōp̄ 100, written together.' },
                    ],
                },
                {
                    heading: 'A number Hebrew will not write',
                    paragraphs: [
                        'Fifteen is ܝܗ, yōdh ten and hē five, and Syriac writes it without hesitation. Hebrew does not: there the same two letters, yod and he, spell a form of the divine Name, and the convention is to avoid them and write fifteen as tet-vav, nine and six, instead.',
                        'The comparison is instructive because it shows that a scribal taboo belongs to a community and not to a script. The two alphabets are cousins with identical values, and the avoidance appears in one and not the other. When you meet a claim that some feature of a script is inherently sacred, ask whether the cousin alphabet does the same thing.',
                    ],
                    examples: [
                        { native: 'ܝܗ', translit: '15', gloss: 'fifteen', note: 'yōdh 10 + hē 5. Written plainly in Syriac; avoided in Hebrew, which writes 9 + 6.' },
                        { native: 'ܬܫܥܗ', translit: '775', gloss: 'seven hundred and seventy-five', note: 'taw 400 + shīn 300 + ʿē 70 + hē 5.' },
                    ],
                },
                {
                    heading: 'Taking a date off a colophon',
                    paragraphs: [
                        'Syriac scribes dated their work, and the formula is short: b-shnat, \'in the year of\', then the number in letters, then the era. The commonest era in these manuscripts is d-Yawnāyē, \'of the Greeks\' — the Seleucid era, reckoned from the autumn of 312 before Christ, and used across the Syriac world for well over a thousand years.',
                        'So take the colophon date the hall carries: ܒܫܢܬ ܬܫܟܓ ܕܝܘܢܝܐ. Read the number: taw 400, shīn 300, kāp̄ 20, gāmal 3 — seven hundred and twenty-three. Then convert. Because the Seleucid year begins in the autumn, subtract 311 for a date falling in October to December, and 312 for one falling in January to September. The colophon rarely names the month, so the honest answer is a span: AG 723 is 411 or 412 of our era.',
                        'That is the skill, and it is worth having. A very great number of Syriac manuscripts carry a date of exactly this form, and it is often the only firm chronological point in the volume. Give the range rather than a single year unless the month is stated, and say which era you have assumed — the Syriac world also used the era of the Martyrs and, later, the Hijra.',
                    ],
                    examples: [
                        { native: 'ܒܫܢܬ', translit: 'b-shnat', gloss: 'in the year of', note: 'b- \'in\' with shnat, the construct of shattā, \'year\'.' },
                        { native: 'ܬܫܟܓ', translit: '723', gloss: 'seven hundred and twenty-three', note: 'taw 400 + shīn 300 + kāp̄ 20 + gāmal 3.' },
                        { native: 'ܕܝܘܢܝܐ', translit: 'd-Yawnāyē', gloss: 'of the Greeks — the Seleucid era', note: 'd- \'of\' with the plural of Yawnāyā, \'a Greek\'.' },
                        { native: 'ܒܫܢܬ ܬܫܟܓ ܕܝܘܢܝܐ', translit: 'b-shnat 723 d-Yawnāyē', gloss: 'in the year 723 of the Greeks — 411/412 CE', note: 'Subtract 311 for autumn dates, 312 for the rest of the year.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܫܢܬ', translit: 'shnat', gloss: 'year of (construct)' },
                { native: 'ܝܘܢܝܐ', translit: 'Yawnāyā', gloss: 'a Greek (plural ܝ̈ܘܢܝܐ Yawnāyē)' },
                { native: 'ܡܢܝܢܐ', translit: 'menyānā', gloss: 'number, reckoning' },
                { native: 'ܨܠܘ', translit: 'ṣallaw', gloss: 'pray ye (plural imperative)' },
                { native: 'ܥܠ', translit: 'ʿal', gloss: 'on, over, for, concerning' },
                { native: 'ܚܛܝܐ', translit: 'ḥaṭṭāyā', gloss: 'sinful, a sinner' },
            ],
            exercises: [
                { prompt: 'What values do ālap̄, yōdh and qōp̄ carry?', answer: 'One, ten, and one hundred — the first of the units, the tens and the hundreds respectively.', hint: null },
                { prompt: 'Compute ܬܫܟܓ.', answer: '723 — taw 400 + shīn 300 + kāp̄ 20 + gāmal 3.', hint: null },
                { prompt: 'How is five hundred written, and why does it take two letters?', answer: 'ܬܩ, taw 400 plus qōp̄ 100. The alphabet\'s highest single value is four hundred, so anything above it is built by combination.', hint: null },
                { prompt: 'Why does Syriac write fifteen as ܝܗ when Hebrew does not?', answer: 'In Hebrew those two letters spell a form of the divine Name and are avoided, fifteen being written as nine plus six instead. The taboo is a Jewish scribal convention, not a property of the alphabet, and Syriac does not share it.', hint: null },
                { prompt: 'Convert AG 723 to our era, and say why the answer is a range.', answer: '411 or 412 CE. The Seleucid year begins in the autumn, so one subtracts 311 for October to December and 312 for January to September; without the month, both are possible.', hint: null },
                { prompt: 'What does ܒܫܢܬ ܬܫܟܓ ܕܝܘܢܝܐ say, word by word?', answer: 'b-shnat, \'in the year of\'; the number 723; d-Yawnāyē, \'of the Greeks\' — that is, of the Seleucid era.', hint: null },
                { prompt: 'A colophon gives a year but names no era. What should you do?', answer: 'Say which era you have assumed and give the resulting range. The Syriac world used the Seleucid era most often, but also the era of the Martyrs and later the Hijra.', hint: null },
            ],
        },
        {
            number: 7,
            title: 'Short Texts Entire',
            aim: 'Read two whole texts with every word accounted for: the opening petitions of the Lord\'s Prayer in the Peshitta, and a scribal colophon from its first word to its last.',
            sections: [
                {
                    heading: 'ܐܒܘܢ ܕܒܫܡܝܐ',
                    paragraphs: [
                        'The Peshitta at Matthew 6:9-10 opens the prayer: ܐܒܘܢ ܕܒܫܡܝܐ ܢܬܩܕܫ ܫܡܟ ܬܐܬܐ ܡܠܟܘܬܟ. Take it word by word. Abūn is abā, \'father\', in the construct with the first person plural suffix -an: \'our Father\'. D-ba-shmayyā is the three elements of lesson four written solid — d- \'who\', b- \'in\', shmayyā \'heaven\'.',
                        'Netqaddash is an imperfect with the prefixed n- of lesson five, in the stem called ethpaʿʿal, which is passive and reflexive: \'let it be hallowed\'. Its subject follows: shmāk, shmā \'name\' with the second masculine singular suffix -āk, \'thy name\'. Then tītē, an imperfect of etā, \'to come\' — feminine, because its subject is malkūtāk, \'thy kingdom\', the abstract in -ūtā you built in lesson four, feminine as all such abstracts are.',
                        'Notice how much of the sentence is carried by prefixes and suffixes rather than separate words. Six written blocks render what English needs fourteen words for, and every one of the joins is something this course has already given you.',
                    ],
                    examples: [
                        { native: 'ܐܒܘܢ ܕܒܫܡܝܐ', translit: 'Abūn d-ba-shmayyā', gloss: 'Our Father who art in heaven', note: 'Construct with suffix, then three particles written solid.' },
                        { native: 'ܢܬܩܕܫ ܫܡܟ', translit: 'netqaddash shmāk', gloss: 'hallowed be thy name', note: 'Imperfect passive-reflexive, then noun with the suffix -āk.' },
                        { native: 'ܬܐܬܐ ܡܠܟܘܬܟ', translit: 'tītē malkūtāk', gloss: 'thy kingdom come', note: 'The verb is feminine because malkūtā is.' },
                    ],
                },
                {
                    heading: 'The scribe signs off',
                    paragraphs: [
                        'The colophon the hall carries reads: ܫܠܡ ܟܬܒܐ ܒܫܢܬ ܬܫܟܓ ܕܝܘܢܝܐ ܨܠܘ ܥܠ ܟܬܘܒܐ ܚܛܝܐ. Shlem ktābā: \'the book is finished\', a perfect and a noun. B-shnat 723 d-Yawnāyē: the date of the last lesson. Ṣallaw ʿal kātōbā ḥaṭṭāyā: \'pray for the sinful scribe\' — a plural imperative, the preposition ʿal, and an agent noun with its adjective.',
                        'Kātōbā is worth a moment. It is built on the root k–t–b of lesson three, on the pattern that makes agent nouns: one who does the thing. So from writing comes the writer. The self-description as ḥaṭṭāyā, sinful, is formulaic and appears in colophon after colophon; it is a convention of humility rather than a confession, and should be read as such.',
                        'One caution the hall states plainly and this course repeats: these three formulae are a specimen, assembled to be read together. Each is standard and attested in hundreds of manuscripts, but they are not lifted as a continuous passage from a single leaf. A real colophon is rarely so tidy — it will name the town, the monastery, the patron who paid for the parchment, the patriarch and sometimes the caliph, and it may complain about the cold.',
                    ],
                    examples: [
                        { native: 'ܫܠܡ ܟܬܒܐ', translit: 'shlem ktābā', gloss: 'the book is finished', note: 'Perfect verb, then the noun in the emphatic state.' },
                        { native: 'ܨܠܘ ܥܠ ܟܬܘܒܐ ܚܛܝܐ', translit: 'ṣallaw ʿal kātōbā ḥaṭṭāyā', gloss: 'pray for the sinful scribe', note: 'Plural imperative, preposition, agent noun and adjective.' },
                        { native: 'ܟܬܘܒܐ', translit: 'kātōbā', gloss: 'scribe', note: 'The agent-noun pattern on k–t–b: one who writes.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܢܬܩܕܫ', translit: 'netqaddash', gloss: 'let it be hallowed' },
                { native: 'ܫܡܟ', translit: 'shmāk', gloss: 'thy name' },
                { native: 'ܬܐܬܐ', translit: 'tītē', gloss: 'let it come' },
                { native: 'ܡܠܟܘܬܟ', translit: 'malkūtāk', gloss: 'thy kingdom' },
                { native: 'ܟܬܘܒܐ', translit: 'kātōbā', gloss: 'scribe' },
                { native: 'ܩܕܝܫܐ', translit: 'qaddīshā', gloss: 'holy one, saint' },
                { native: 'ܬܫܒܘܚܬܐ', translit: 'teshboḥtā', gloss: 'praise, doxology' },
                { native: 'ܩܘܪܒܢܐ', translit: 'qurbānā', gloss: 'offering, Eucharist' },
            ],
            exercises: [
                { prompt: 'Break ܕܒܫܡܝܐ into its parts and translate it.', answer: 'd- \'who\', b- \'in\', shmayyā \'heaven\' — \'who is in heaven\'. Three elements written as one block.', hint: null },
                { prompt: 'Why is ܬܐܬܐ feminine?', answer: 'Because its subject, malkūtā, \'kingdom\', is feminine — as all abstract nouns in -ūtā are.', hint: 'Look at what is coming.' },
                { prompt: 'Translate ܫܠܡ ܟܬܒܐ and name the part of speech of each word.', answer: '\'The book is finished.\' shlem is a third masculine singular perfect; ktābā is a noun in the emphatic state.', hint: null },
                { prompt: 'What pattern is ܟܬܘܒܐ built on, and from what root?', answer: 'The agent-noun pattern, on the root k–t–b, \'to write\' — hence \'one who writes\', a scribe.', hint: null },
                { prompt: 'How should the scribe\'s self-description as ܚܛܝܐ be read?', answer: 'As a formula of humility. It appears in colophon after colophon and is a convention rather than a personal confession.', hint: null },
                { prompt: 'What does the hall warn about this colophon, and why does it matter?', answer: 'That it is a specimen rather than a transcription: the three formulae are each attested but were assembled to be read together, and a real colophon carries far more — place, monastery, patron, patriarch. It matters because a reader must not cite it as a single manuscript\'s text.', hint: null },
            ],
        },
        {
            number: 8,
            title: 'Fire and Spirit',
            aim: 'Read Ephrem on Fire and Spirit and Isaac of Nineveh on the merciful heart, and take stock of the vocabulary in which Syriac Christianity does its thinking.',
            sections: [
                {
                    heading: 'ܢܘܪܐ ܘܪܘܚܐ ܒܟܪܣܐ ܕܝܠܕܬܟ',
                    paragraphs: [
                        'Ephrem the Syrian, who died in 373, is the greatest poet of the language and thought in images rather than definitions. The half-line here is from the Hymns on Faith 10:17: ܢܘܪܐ ܘܪܘܚܐ ܒܟܪܣܐ ܕܝܠܕܬܟ. Four words. Nūrā, \'fire\', in the emphatic state. W-rūḥā, the conjunction w- prefixed to rūḥā, \'spirit, wind, breath\'. B-karsā, the preposition b- with karsā, \'belly, womb\'. D-yeldtāk, the relative d- with a third feminine singular perfect and a suffix: \'that bore thee\'.',
                        '\'Fire and Spirit in the womb that bore thee.\' The pair is Ephrem\'s constant figure for the divine presence, and in this stanza he sets it four times over — in the womb, in the river of the baptism, in the Bread and in the Wine. The doctrine is not stated; it is placed beside itself until the reader sees the pattern. That is how Ephrem argues, and it is why he wrote hymns rather than treatises.',
                        'Two things to say honestly, both of which the hall says. The stanza opens with an imperative, \'see\', which is not reproduced in this half-line. And the reference is frequently miscited as 10:8, which is the neighbouring quatrain, on the Spirit hidden in the Bread and the Fire dwelling in the Wine. If you quote it, collate it against Beck\'s edition.',
                    ],
                    examples: [
                        { native: 'ܢܘܪܐ ܘܪܘܚܐ ܒܟܪܣܐ ܕܝܠܕܬܟ', translit: 'nūrā w-rūḥā b-karsā d-yeldtāk', gloss: 'Fire and Spirit in the womb that bore thee', note: 'Ephrem, Hymns on Faith 10:17.' },
                        { native: 'ܢܘܪܐ', translit: 'nūrā', gloss: 'fire', note: 'Ephrem\'s constant figure for the divine.' },
                        { native: 'ܕܝܠܕܬܟ', translit: 'd-yeldtāk', gloss: 'that bore thee', note: 'd- relative, a feminine perfect, and a second person suffix — three things in one word.' },
                    ],
                },
                {
                    heading: 'ܡܢܘ ܠܒܐ ܡܪܚܡܢܐ',
                    paragraphs: [
                        'Isaac of Nineveh, writing in the seventh century for the Church of the East, asks and answers his own question: ܡܢܘ ܠܒܐ ܡܪܚܡܢܐ ܝܩܕܢܐ ܕܠܒܐ ܥܠ ܟܠܗ ܒܪܝܬܐ. Mānaw is mānā, \'what\', contracted with the enclitic hū — \'what is it?\'. Lebbā mraḥmānā: \'a merciful heart\', the noun with a participial adjective from the paʿʿel of rḥem, \'to have compassion\'.',
                        'Then the answer: yaqdānā d-lebbā ʿal kullāh brītā. Yaqdānā, \'a burning\', a noun formed on yqed, \'to burn\'. D-lebbā, \'of the heart\'. ʿal, \'for\'. Kullāh brītā, \'the whole of creation\' — kul with a feminine suffix anticipating brītā, from brā, \'to create\'.',
                        '\'What is a merciful heart? A burning of the heart for the whole of creation.\' Note what Isaac does not say. He does not name a virtue or prescribe a practice; he answers with a physical image, a burning, and then refuses to limit its object. The homily goes on to include the reptiles and the demons in what the merciful heart burns for, which is a harder saying than it first appears.',
                    ],
                    examples: [
                        { native: 'ܡܢܘ ܠܒܐ ܡܪܚܡܢܐ', translit: 'mānaw lebbā mraḥmānā', gloss: 'What is a merciful heart?', note: 'Isaac of Nineveh, Part One, Homily 74.' },
                        { native: 'ܝܩܕܢܐ ܕܠܒܐ', translit: 'yaqdānā d-lebbā', gloss: 'a burning of the heart', note: 'A noun of action on yqed, \'to burn\', with the genitive d-.' },
                        { native: 'ܥܠ ܟܠܗ ܒܪܝܬܐ', translit: 'ʿal kullāh brītā', gloss: 'for the whole of creation', note: 'The suffix on kul anticipates and agrees with brītā.' },
                    ],
                },
                {
                    heading: 'The words this tradition thinks in',
                    paragraphs: [
                        'Syriac Christianity has a technical vocabulary of its own, and much of it does not map onto Greek or Latin theology. Rāzā is the largest of them: it means mystery, symbol and sacrament all at once, and it is what a thing is when it holds more than it appears to. Ṭupsā, from the Greek typos, is the figure or type — the pattern in one thing that answers to another. Kasyā is hidden, gelyānā is revelation, and the pair frames how these writers think about what can be known.',
                        'From the ascetic side come īḥīdāyā, the single one, which is at once Christ the Only-Begotten, the celibate, and the person made single in themselves; īḥīdāyūtā, the state of being so; and shelyūtā, stillness or silence, the condition the solitary is after. Dubbārā is the way of life, the conduct, the manner of going.',
                        'You now have the alphabet, the joins, the dot, the states, the verb, the numerals, and enough of this vocabulary to open a page. What lies beyond is reading, and the hall\'s own lexicon, readings and currents are the next room — the currents in particular, where this material meets astrology, alchemy, angelology and the amulets, which is the part of Syriac literature this press is chiefly here for.',
                    ],
                    examples: [
                        { native: 'ܪܐܙܐ', translit: 'rāzā', gloss: 'mystery, symbol, sacrament', note: 'The central word. One term for three things Greek keeps apart.' },
                        { native: 'ܟܣܝܐ · ܓܠܝܢܐ', translit: 'kasyā · gelyānā', gloss: 'hidden · revelation', note: 'The pair that frames Syriac epistemology.' },
                        { native: 'ܝܚܝܕܝܐ', translit: 'īḥīdāyā', gloss: 'single one, solitary', note: 'Christ the Only-Begotten, the celibate, and the one made single — the same word.' },
                        { native: 'ܫܠܝܘܬܐ', translit: 'shelyūtā', gloss: 'stillness, silence', note: 'What the solitary life is for.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'ܟܪܣܐ', translit: 'karsā', gloss: 'belly, womb' },
                { native: 'ܝܩܕܢܐ', translit: 'yaqdānā', gloss: 'a burning' },
                { native: 'ܡܪܚܡܢܐ', translit: 'mraḥmānā', gloss: 'merciful' },
                { native: 'ܛܘܦܣܐ', translit: 'ṭupsā', gloss: 'type, figure' },
                { native: 'ܟܣܝܐ', translit: 'kasyā', gloss: 'hidden' },
                { native: 'ܓܠܝܢܐ', translit: 'gelyānā', gloss: 'revelation, apocalypse' },
                { native: 'ܫܠܝܘܬܐ', translit: 'shelyūtā', gloss: 'stillness, silence' },
                { native: 'ܕܘܒܪܐ', translit: 'dubbārā', gloss: 'way of life, conduct' },
            ],
            exercises: [
                { prompt: 'Translate ܢܘܪܐ ܘܪܘܚܐ ܒܟܪܣܐ ܕܝܠܕܬܟ and identify the parts of the last word.', answer: '\'Fire and Spirit in the womb that bore thee.\' d-yeldtāk is the relative d-, a third feminine singular perfect of \'to bear\', and the second person singular suffix.', hint: null },
                { prompt: 'What two cautions does the hall attach to that line?', answer: 'The stanza opens with an imperative, \'see\', which the half-line omits; and the passage is often miscited as 10:8, which is the neighbouring quatrain on the Bread and the Wine.', hint: null },
                { prompt: 'How does Ephrem make an argument?', answer: 'By placing images beside one another until the pattern shows — here Fire and Spirit set four times over, in the womb, the river, the Bread and the Wine — rather than by stating a doctrine.', hint: null },
                { prompt: 'Translate Isaac\'s answer, and say what is notable about the form of it.', answer: '\'A burning of the heart for the whole of creation.\' He answers with a physical image rather than naming a virtue, and sets no limit on its object.', hint: null },
                { prompt: 'What does ܪܐܙܐ mean, and why is it hard to translate?', answer: 'Mystery, symbol and sacrament at once. Greek and Latin theology keep those three apart; Syriac holds them in one word.', hint: null },
                { prompt: 'Give three senses of ܝܚܝܕܝܐ.', answer: 'Christ as the Only-Begotten; the celibate or monk; and a person made single or unified in themselves.', hint: null },
                { prompt: 'Which pair of words frames how these writers speak about what can be known?', answer: 'kasyā, \'hidden\', and gelyānā, \'revelation\'.', hint: null },
            ],
        },
    ],
};
