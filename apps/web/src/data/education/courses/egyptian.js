// egyptian course — eight lessons for the Scriptorium.
// Authored and fact-checked by the content pipeline: arithmetic recomputed,
// glyphs verified against Unicode names, every quoted text checked against
// its cited source, and every exercise worked to confirm its answer.
export default {
    language: 'egyptian',
    title: 'The Scribe\'s First Year',
    tagline: 'Eight lessons from the first sign to a whole line of the offering formula — the sentence carved on Egyptian monuments more often than any other.',
    overview: 'This course assumes you know nothing, and ends with you reading, unaided, the ḥtp-dı͗-nsw formula cut on false doors, stelae, coffins and offering tables from the Old Kingdom to the Roman period. Eight lessons, each built on the last: what kind of system the hieroglyphs are and which way a line runs; the single-consonant signs and the transliteration alphabet; the two- and three-consonant signs and their phonetic complements; the silent classifiers that cut words apart in unspaced text; six words of the religious vocabulary read sign by sign; the cartouche and honorific transposition; the numerals and the dating of a reign. Every text quoted is genuinely attested and every grammatical claim is the standard one; where the scholarship is unsettled — as on this formula it genuinely is — the lesson says so.',
    lessons: [
        {
            number: 1,
            title: 'A Writing of Three Kinds',
            aim: 'Learn what sort of system the hieroglyphs are — sound-signs, word-signs and silent classifiers — and how to tell which end of a line to begin at.',
            sections: [
                {
                    heading: 'Not a picture-code',
                    paragraphs: [
                        'Put aside the belief that each hieroglyph stands for an idea. The hieroglyphs write a language — the longest-attested member of the Afroasiatic family, surviving into the Christian era as Coptic — and Champollion announced the proof in 1822, in his Lettre à M. Dacier, by reading the cartouches of Ptolemy and Cleopatra as sound. One thing must be faced now: Egyptian did not write vowels, so a transliteration records a consonantal skeleton whose vowels are, for most words, permanently lost.',
                    ],
                    examples: [],
                },
                {
                    heading: 'The three offices of a sign',
                    paragraphs: [
                        'A phonogram is a sign used for its sound alone. The house-plan 𓉐 writes p and r; in the verb prı͗, \'to go out\', there is no house in the meaning. A logogram is a sign used for the word it draws: the same plan written 𓉐𓏤, with a small stroke beneath, is pr, \'house\'. That stroke — Gardiner\'s Z1 — tells the reader to take the sign as the thing it depicts.',
                        'A determinative is a sign added at the end of a word and never pronounced. In 𓉐𓂋𓇋𓂻, prı͗, the walking legs are silent; they declare the word a verb of motion. Gardiner\'s sign-list runs to some seven hundred signs, but they do only these three jobs, and one sign may do all three in different words.',
                    ],
                    examples: [
                        {
                            native: '𓉐𓏤',
                            translit: 'pr',
                            gloss: 'house — the house-plan as logogram, confirmed by the stroke',
                            note: null,
                        },
                        {
                            native: '𓉐𓂋𓇋𓂻',
                            translit: 'prı͗',
                            gloss: 'to go out — the same plan for its sound pr, with r and ı͗, closed by the silent walking legs',
                            note: null,
                        },
                        {
                            native: '𓇳𓏤',
                            translit: 'rꜥ',
                            gloss: 'the sun; the day — the sun-disc as logogram with its stroke',
                            note: null,
                        },
                        {
                            native: '𓋴𓈖𓀀',
                            translit: 'sn',
                            gloss: 'brother — s and n as sound-signs, the seated man as classifier',
                            note: null,
                        },
                    ],
                },
                {
                    heading: 'Which way the line runs',
                    paragraphs: [
                        'Hieroglyphs run in rows or columns, left-to-right or right-to-left, and the scribe tells you which by a rule almost never broken: the animate signs face the beginning of the line. Signs are packed into notional squares called quadrats, read top to bottom then front to back. Modern printing normalises everything to a left-to-right row; that is a convenience, not a fact about the monuments. Two honest caveats: some religious texts are written retrograde, and inscriptions are sometimes mirrored so that two lines face a central figure.',
                    ],
                    examples: [],
                },
            ],
            vocabulary: [
                {
                    native: '𓉐𓏤',
                    translit: 'pr',
                    gloss: 'house, household, estate',
                },
                {
                    native: '𓉐𓂋𓇋𓂻',
                    translit: 'prı͗',
                    gloss: 'to go out, come forth',
                },
                {
                    native: '𓇳𓏤',
                    translit: 'rꜥ',
                    gloss: 'sun; day',
                },
                {
                    native: '𓋴𓈖𓀀',
                    translit: 'sn',
                    gloss: 'brother',
                },
                {
                    native: '𓂋𓏤',
                    translit: 'r',
                    gloss: 'mouth; utterance',
                },
            ],
            exercises: [
                {
                    prompt: 'In prı͗, \'to go out\', written 𓉐𓂋𓇋𓂻, which of the three offices does the house-plan 𓉐 hold?',
                    answer: 'Phonogram. It is used for its sound, p and r, and contributes nothing of \'house\' to the meaning.',
                    hint: 'Ask whether a house is anywhere in the meaning.',
                },
                {
                    prompt: 'What is the small vertical stroke doing in 𓇳𓏤?',
                    answer: 'It is the ideogram stroke, Gardiner\'s Z1, marking the preceding sign as a logogram; the group reads rꜥ, \'sun, day\'.',
                    hint: null,
                },
                {
                    prompt: 'A row of hieroglyphs shows an owl, a quail chick and a seated man, all facing right. At which end do you begin reading?',
                    answer: 'At the right, reading leftwards. The animate signs face the beginning of the line.',
                    hint: null,
                },
                {
                    prompt: 'Which sign in 𓋴𓈖𓀀 is never pronounced, and what does it do?',
                    answer: 'The seated man 𓀀 — a determinative marking the word as denoting a male human being. It has no sound.',
                    hint: null,
                },
                {
                    prompt: 'Why does a transliteration of Egyptian show no vowels?',
                    answer: 'Because the script did not write them. It records the consonantal skeleton of a word, so transliteration records consonants only.',
                    hint: null,
                },
            ],
        },
        {
            number: 2,
            title: 'The Scribe\'s Alphabet',
            aim: 'Master the single-consonant signs in five groups, learn the transliteration letters ꜣ ꜥ ḥ ḫ ẖ š ṯ ḏ, and adopt the classroom pronunciation without mistaking it for speech.',
            sections: [
                {
                    heading: 'Twenty-four signs, or twenty-five',
                    paragraphs: [
                        'Within the great repertoire sits a small set of signs each writing a single consonant. Egyptologists call them uniliterals and teach them first, because they are the key Champollion turned. Be honest about what they are not: the Egyptians never wrote with these alone. Handbooks print twenty-four, twenty-five or twenty-six of them, the count turning on whether the single and double reed-leaves are one sign or two, and on the door-bolt 𓊃 and folded cloth 𓋴, which wrote distinct sounds in Old Egyptian (z and s) but had merged by Middle Egyptian, after which the two interchange freely.',
                    ],
                    examples: [],
                },
                {
                    heading: 'Five groups',
                    paragraphs: [
                        'Take them in the five groups below over five sittings, writing each out by hand a dozen times. Learn them in this traditional order — it is how you will find a word in any dictionary. Two warnings. ꜣ, the Egyptological alef, is conventionally given the value of a glottal stop, though its earliest value may have been an r-like liquid, and it had largely fallen silent by later periods. And the four h-signs are four distinct sounds, which English collapses and Egyptian did not; students who blur them spend a year unlearning it.',
                    ],
                    examples: [
                        {
                            native: '𓄿𓇋𓇌𓂝𓅱',
                            translit: 'ꜣ ı͗ y ꜥ w',
                            gloss: 'vulture, reed-leaf, double reed-leaf, forearm, quail chick — the weak consonants and semivowels',
                            note: 'Gardiner writes the double reed-leaf as two reed-leaves; the single ligature sign used here comes from the extended sign-lists. ꜥ, the ain, is conventionally read as a voiced pharyngeal like Arabic ʿayn: a real consonant, not a decoration.',
                        },
                        {
                            native: '𓃀𓊪𓆑𓅓𓈖𓂋',
                            translit: 'b p f m n r',
                            gloss: 'foot (D58), stool of reed matting (Q3), horned viper, owl, water-ripple, mouth',
                            note: null,
                        },
                        {
                            native: '𓉔𓎛𓐍𓄡',
                            translit: 'h ḥ ḫ ẖ',
                            gloss: 'shelter of reeds (h as in \'house\'), twisted wick of flax (pharyngeal ḥ), the circle (ḫ as in \'loch\'), animal\'s belly (ẖ as in German \'ich\')',
                            note: 'What the ḫ-circle depicts is genuinely unknown; Gardiner labelled it \'placenta (?)\' and filed it under Aa, his class of unclassified signs.',
                        },
                        {
                            native: '𓊃𓋴𓈙𓈎𓎡𓎼',
                            translit: 'z s š q k g',
                            gloss: 'door-bolt, folded cloth, garden pool, sandy hill-slope (q, a uvular stop like Arabic qāf), basket with handle, ring-stand for a jar',
                            note: null,
                        },
                        {
                            native: '𓏏𓍿𓂧𓆓',
                            translit: 't ṯ d ḏ',
                            gloss: 'loaf, tethering rope (ṯ as \'ch\'), hand, cobra (ḏ as \'j\')',
                            note: 'ṯ and ḏ often relax back to plain t and d in later texts, so the pairs interchange in some words.',
                        },
                    ],
                },
                {
                    heading: 'Writing it down, and saying it out',
                    paragraphs: [
                        'Transliteration is the agreed Latin-letter notation: ꜣ (alef), ꜥ (ain), ḥ, ḫ, ẖ, š, ṯ, ḏ. The Scriptorium writes the reed-leaf as ı͗; older books use ḳ for q and j for ı͗, but the variation is notational only. Since no vowels were written, a transliteration is unpronounceable as it stands, so Egyptologists adopted a classroom convention: insert a short \'e\' between consonants, read ꜣ and ꜥ as \'a\', w as \'u\', ı͗ as \'i\'. Thus nfr becomes \'nefer\', ḥtp \'hotep\', ꜥnḫ \'ankh\'. That is a convenience of the seminar room, not a reconstruction of speech.',
                    ],
                    examples: [],
                },
            ],
            vocabulary: [
                {
                    native: '𓂋𓈖',
                    translit: 'rn',
                    gloss: 'name — spelled with two uniliterals and nothing else',
                },
                {
                    native: '𓅓',
                    translit: 'm',
                    gloss: 'in, from, as, by means of',
                },
                {
                    native: '𓈖',
                    translit: 'n',
                    gloss: 'to, for',
                },
                {
                    native: '𓆑',
                    translit: '=f',
                    gloss: 'he, him, his (suffix pronoun)',
                },
                {
                    native: '𓎛𓈖𓂝',
                    translit: 'ḥnꜥ',
                    gloss: 'together with, and',
                },
            ],
            exercises: [
                {
                    prompt: 'Transliterate 𓂋𓈖.',
                    answer: 'rn — the mouth (r) and the water-ripple (n). The word means \'name\'.',
                    hint: 'Both signs are uniliterals from the second group.',
                },
                {
                    prompt: 'Name the four h-signs in the order taught in this lesson, giving the transliteration letter of each.',
                    answer: 'h (shelter of reeds), ḥ (twisted wick of flax), ḫ (the circle), ẖ (animal\'s belly).',
                    hint: null,
                },
                {
                    prompt: 'Which single sign writes ḥ, the pharyngeal h of Muḥammad?',
                    answer: '𓎛, the wick of twisted flax, Gardiner V28.',
                    hint: null,
                },
                {
                    prompt: 'Give the classroom pronunciation of nfr and of ḥtp.',
                    answer: '\'nefer\' and \'hotep\' — an \'e\' inserted between the consonants by convention.',
                    hint: null,
                },
                {
                    prompt: 'Why do handbooks disagree about the number of uniliterals?',
                    answer: 'Because the count depends on whether the single and double reed-leaves are one sign or two, and on how the door-bolt z and folded cloth s are treated — distinct sounds in Old Egyptian, merged by Middle Egyptian and thereafter interchangeable.',
                    hint: null,
                },
            ],
        },
        {
            number: 3,
            title: 'Signs That Carry Two Sounds',
            aim: 'Read the commonest biliterals — pr, nb, mn, kꜣ — with ḥtp and the triliteral ꜥnḫ, and understand honestly what a phonetic complement does and does not add.',
            sections: [
                {
                    heading: 'The economy of the two-consonant sign',
                    paragraphs: [
                        'Having learned the alphabet, put it in its place: Egyptian scribes did not spell words out letter by letter. The working core of the script is a body of roughly a hundred signs in common use that each write two consonants — biliterals — with a smaller set writing three, the triliterals. A word of three consonants might take three uniliterals, or one triliteral, or a biliteral plus a uniliteral, the choice governed by convention and by how the group would sit in its quadrat. This is why a beginner who knows only the alphabet stalls at the first real inscription.',
                    ],
                    examples: [],
                },
                {
                    heading: 'Six signs to know by sight',
                    paragraphs: [
                        'Learn these as shapes recognised at sight, not as puzzles solved. You already have the first: the house-plan pr of Lesson 1. The basket nb stands behind two very common words: nb, \'lord, master\', and the adjective nb, \'every, all\', which follows its noun. The loaf on a reed mat, ḥtp, is the first word of the sentence this course ends with. The arms kꜣ are as a word the sustaining life-force of a person, and as a sign simply the sound kꜣ wherever it is needed. Three further triliterals are worth knowing at once: 𓄤 nfr, \'good, beautiful\'; 𓆣 ḫpr, \'come into being\'; 𓊽 ḏd, \'be stable, enduring\'.',
                    ],
                    examples: [
                        {
                            native: '𓉐',
                            translit: 'pr',
                            gloss: 'house-plan (O1), biliteral p + r — \'house\', and the sound pr in other words',
                            note: null,
                        },
                        {
                            native: '𓎟',
                            translit: 'nb',
                            gloss: 'basket (V30), biliteral n + b — \'lord\'; also \'every, all\'',
                            note: null,
                        },
                        {
                            native: '𓏠',
                            translit: 'mn',
                            gloss: 'gaming-board (Y5), biliteral m + n — \'remain, be established\'',
                            note: null,
                        },
                        {
                            native: '𓊵',
                            translit: 'ḥtp',
                            gloss: 'loaf on a reed mat (R4), ḥ + t + p — \'be at peace\'; \'an offering\'',
                            note: 'Strictly a three-consonant sign, taught with the biliterals because it appears so constantly.',
                        },
                        {
                            native: '𓂓',
                            translit: 'kꜣ',
                            gloss: 'two upraised arms (D28), biliteral k + ꜣ — the ka',
                            note: null,
                        },
                        {
                            native: '𓋹',
                            translit: 'ꜥnḫ',
                            gloss: 'the looped sign (S34), triliteral ꜥ + n + ḫ — \'life, to live\'',
                            note: 'Its identification as a sandal-strap is traditional and not certain; what is certain is its value. It is a word, not an emblem.',
                        },
                    ],
                },
                {
                    heading: 'The complement that adds nothing',
                    paragraphs: [
                        'Open any inscription and you will find these signs trailed by uniliterals that seem to repeat them. 𓏠𓈖 is not mn-n but simply mn: the water-ripple is a phonetic complement, echoing the last consonant of the sign before it, and is not spoken twice. Complements disambiguate and aid recognition. But complementation is a convention, not a rule: the same scribe may write mn bare in one line and 𓏠𓈖 in the next, a complement may follow, precede or bracket its sign, and in some words it is arguable whether a given uniliteral is a complement at all or simply part of the spelling.',
                    ],
                    examples: [
                        {
                            native: '𓏠𓈖',
                            translit: 'mn',
                            gloss: 'mn with its complement n — two consonants, not three',
                            note: null,
                        },
                        {
                            native: '𓊵𓏏𓊪',
                            translit: 'ḥtp',
                            gloss: 'ḥtp with complements t and p — the usual writing in the offering formula',
                            note: null,
                        },
                        {
                            native: '𓋹𓈖𓐍',
                            translit: 'ꜥnḫ',
                            gloss: 'ꜥnḫ with complements n and ḫ',
                            note: null,
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: '𓎟',
                    translit: 'nb',
                    gloss: 'lord, master; (as adjective) every, all',
                },
                {
                    native: '𓏠𓈖',
                    translit: 'mn',
                    gloss: 'to remain, be established, endure',
                },
                {
                    native: '𓊵𓏏𓊪',
                    translit: 'ḥtp',
                    gloss: 'to be at peace; (noun) offering, boon',
                },
                {
                    native: '𓂓',
                    translit: 'kꜣ',
                    gloss: 'the ka, the sustaining life-force',
                },
                {
                    native: '𓋹𓈖𓐍',
                    translit: 'ꜥnḫ',
                    gloss: 'life; to live',
                },
                {
                    native: '𓄤𓆑𓂋',
                    translit: 'nfr',
                    gloss: 'good, beautiful, perfect',
                },
            ],
            exercises: [
                {
                    prompt: 'Transliterate 𓏠𓈖, and say how many consonants the group writes.',
                    answer: 'mn — two consonants. The water-ripple is a phonetic complement echoing the n of the gaming-board, and is not counted twice.',
                    hint: null,
                },
                {
                    prompt: 'Transliterate 𓊵𓏏𓊪.',
                    answer: 'ḥtp',
                    hint: 'Both trailing signs are complements.',
                },
                {
                    prompt: 'How many consonants does the single sign 𓋹 write, and what are they?',
                    answer: 'Three: ꜥ, n, ḫ. It is a triliteral, read ꜥnḫ, \'life\'.',
                    hint: null,
                },
                {
                    prompt: 'Which two consonants does the basket 𓎟 write, and what two common words does it stand behind?',
                    answer: 'n and b. It writes nb, \'lord, master\', and the adjective nb, \'every, all\'.',
                    hint: null,
                },
                {
                    prompt: 'State plainly what a phonetic complement adds to the pronunciation of a word.',
                    answer: 'Nothing. It repeats a consonant already written by the multiliteral sign; it aids disambiguation and recognition but is not pronounced separately.',
                    hint: null,
                },
            ],
        },
        {
            number: 4,
            title: 'The Silent Classifiers',
            aim: 'Use determinatives to find where one word ends in an unspaced text, and to tell apart words spelled with the same consonants.',
            sections: [
                {
                    heading: 'Where does one word end?',
                    paragraphs: [
                        'Egyptian was written without spaces, without punctuation, and without any mark between words, so the beginner\'s real difficulty is the segmentation: knowing where to stop. The determinative is the answer. Placed at the end of a written word and never pronounced, it declares the class of meaning the word belongs to, and by doing so announces that the word is finished.',
                        'A note on the term. \'Determinative\' is traditional and appears in every handbook, but many Egyptologists now prefer \'classifier\', following work associated above all with Orly Goldwasser, on the grounds that these signs do not merely determine a reading but sort the vocabulary into semantic categories — that the sign-set is a map of how Egyptians classified their world. Both terms are current; this course uses them interchangeably.',
                    ],
                    examples: [],
                },
                {
                    heading: 'A short catalogue, and the words it opens',
                    paragraphs: [
                        'Five classifiers below will carry you through most of an ordinary funerary inscription: the seated man for men and male names, the seated woman for women, the seated god for deities, the walking legs for verbs of motion, and the rolled papyrus for what cannot be drawn — knowledge, thought, writing, abstraction of every kind. Four worked words follow them.',
                        'Because vowels were unwritten, Egyptian is full of words sharing a consonantal skeleton, and the classifier keeps them apart: 𓉐𓏤 is pr, \'house\', settled by the ideogram stroke, while 𓉐𓂋𓇋𓂻 is prı͗, \'to go out\', settled by the walking legs. Three cautions before you rely on them. Classifiers are not obligatory, and a word may appear bare in older or hastier writing; a word may take two, or a different one in a different period or workshop; and in some words the choice is itself a small interpretation on the scribe\'s part, telling you how he understood the word.',
                    ],
                    examples: [
                        {
                            native: '𓀀',
                            translit: '(A1)',
                            gloss: 'seated man — men, male persons, personal names',
                            note: null,
                        },
                        {
                            native: '𓁐',
                            translit: '(B1)',
                            gloss: 'seated woman — women, female persons',
                            note: null,
                        },
                        {
                            native: '𓀭',
                            translit: '(A40)',
                            gloss: 'seated god — deities and divine beings',
                            note: null,
                        },
                        {
                            native: '𓂻',
                            translit: '(D54)',
                            gloss: 'walking legs — motion, going, coming',
                            note: null,
                        },
                        {
                            native: '𓏛',
                            translit: '(Y1)',
                            gloss: 'papyrus roll — abstractions, thought, writing, knowledge',
                            note: null,
                        },
                        {
                            native: '𓇋𓅱𓂻',
                            translit: 'ı͗w',
                            gloss: 'to come — ı͗ and w, closed by the walking legs',
                            note: null,
                        },
                        {
                            native: '𓂋𓐍𓏛',
                            translit: 'rḫ',
                            gloss: 'to know — r and ḫ, closed by the papyrus roll of abstraction',
                            note: null,
                        },
                        {
                            native: '𓋴𓈖𓏏𓁐',
                            translit: 'snt',
                            gloss: 'sister — s, n, the feminine ending t, and the seated woman',
                            note: 'Compare 𓋴𓈖𓀀, sn, \'brother\'.',
                        },
                        {
                            native: '𓐍𓄿𓋴𓏏𓈉',
                            translit: 'ḫꜣst',
                            gloss: 'hill-country, desert, foreign land — four sound-signs closed by N25, the sign of foreign lands',
                            note: null,
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: '𓋴𓈖𓏏𓁐',
                    translit: 'snt',
                    gloss: 'sister',
                },
                {
                    native: '𓂋𓐍𓏛',
                    translit: 'rḫ',
                    gloss: 'to know, learn; knowledge',
                },
                {
                    native: '𓇋𓅱𓂻',
                    translit: 'ı͗w',
                    gloss: 'to come',
                },
                {
                    native: '𓐍𓄿𓋴𓏏𓈉',
                    translit: 'ḫꜣst',
                    gloss: 'hill-country, desert, foreign land',
                },
            ],
            exercises: [
                {
                    prompt: 'In 𓇋𓅱𓂻, which sign is never spoken, and what does it tell you?',
                    answer: 'The walking legs 𓂻 — the classifier of motion, marking the word as a verb of movement. The word is ı͗w, \'to come\'.',
                    hint: null,
                },
                {
                    prompt: 'Egyptian was written without spaces. What feature most reliably tells a reader that a word has just ended?',
                    answer: 'The determinative, or classifier — the silent sign placed at the end of a written word.',
                    hint: null,
                },
                {
                    prompt: '𓋴𓈖𓀀 and 𓋴𓈖𓏏𓁐 share their first two signs. What tells you the second word is \'sister\' and not \'brother\'?',
                    answer: 'Two things: the feminine ending -t, written with the loaf 𓏏, and the seated-woman classifier 𓁐 in place of the seated man.',
                    hint: null,
                },
                {
                    prompt: 'What does the papyrus roll 𓏛 tell you about the word 𓂋𓐍𓏛?',
                    answer: 'That it belongs to the class of abstractions — thought, knowledge, writing. The word is rḫ, \'to know\'.',
                    hint: null,
                },
                {
                    prompt: 'Is a determinative pronounced?',
                    answer: 'No. It is silent and adds nothing to the sound of the word.',
                    hint: null,
                },
            ],
        },
        {
            number: 5,
            title: 'Words of Power',
            aim: 'Read six central words of the religious vocabulary entire — nṯr, ꜥnḫ, kꜣ, bꜣ, mꜣꜥt, ḥkꜣ — accounting for every sign in each.',
            sections: [
                {
                    heading: 'The method: name every sign',
                    paragraphs: [
                        'From here on, adopt a discipline. When you meet a written word, do not guess it whole: go through it sign by sign, naming each and stating its office — phonogram, logogram, complement, classifier — and only then pronounce the word. Four of the six words below are so central that English has borrowed them rather than translate them, and that borrowing is a warning: where a translator gives up and transliterates, the concept did not fit.',
                    ],
                    examples: [],
                },
                {
                    heading: 'nṯr, ꜥnḫ, kꜣ',
                    paragraphs: [
                        'nṯr, \'god\', is written with a single sign, 𓊹, and that sign is a logogram. It is conventionally understood to draw a pole wound with cloth — a divine standard of the kind set up at temple gateways. The word\'s etymology is unknown, and its range is wider than English \'god\': it covers great deities, minor divine beings, the sanctified dead and the king. ꜥnḫ, \'life\', is the triliteral 𓋹 of Lesson 3. kꜣ, the ka, is written 𓂓, two arms raised from the ground: the vital double created with a person and sustained after death by offerings. It is the ka, not the corpse, to whom the offering formula directs its bread and beer.',
                    ],
                    examples: [
                        {
                            native: '𓊹',
                            translit: 'nṯr',
                            gloss: 'god — R8, the divine standard, used as a logogram',
                            note: 'The Egyptians\' own name for their script, mdw-nṯr, \'the god\'s words\', is built on this sign.',
                        },
                        {
                            native: '𓊹𓊹𓊹',
                            translit: 'nṯrw',
                            gloss: 'gods — the sign written three times to mark the plural',
                            note: null,
                        },
                        {
                            native: '𓂓𓏤',
                            translit: 'kꜣ',
                            gloss: 'the ka — D28, the upraised arms, with the ideogram stroke',
                            note: null,
                        },
                    ],
                },
                {
                    heading: 'bꜣ, mꜣꜥt, ḥkꜣ',
                    paragraphs: [
                        'bꜣ, the ba, is written with the jabiru stork 𓅡, a biliteral writing b + ꜣ. The bird is in the word for its sound, not its nature: no Egyptian thought the ba was a stork. In funerary contexts the word is closed by a quite different bird, the human-headed 𓅽, a classifier that does depict the concept — the mobile aspect of a person, free to leave the tomb by day.',
                        'mꜣꜥt is written 𓌳𓂝𓏏𓆄: the sickle, a biliteral writing mꜣ; the forearm, uniliteral ꜥ; the loaf, here the feminine ending -t; and the ostrich feather, silent, the classifier — and also the emblem of the goddess against whose feather the heart is weighed. The word means truth, justice and cosmic right order at once, which is why no single English word will serve.',
                        'ḥkꜣ, written 𓎛𓂓, is the reason for the discipline urged above. The first sign is the twisted wick, uniliteral ḥ. The second is the pair of upraised arms — but here it is not the word kꜣ at all. It is a phonogram, contributing the sound kꜣ to a different word, and a reader who recognises signs as words rather than analysing them would read \'ḥ-ka\' and be lost.',
                    ],
                    examples: [
                        {
                            native: '𓅡',
                            translit: 'bꜣ',
                            gloss: 'the ba — G29, the jabiru stork, a biliteral b + ꜣ',
                            note: null,
                        },
                        {
                            native: '𓅽',
                            translit: '(G53)',
                            gloss: 'the human-headed ba-bird — classifier of the funerary bꜣ',
                            note: null,
                        },
                        {
                            native: '𓌳𓂝𓏏𓆄',
                            translit: 'mꜣꜥt',
                            gloss: 'truth, justice, right order — sickle (biliteral mꜣ) + forearm (ꜥ) + loaf (the feminine ending t) + ostrich feather (silent classifier)',
                            note: null,
                        },
                        {
                            native: '𓎛𓂓',
                            translit: 'ḥkꜣ',
                            gloss: 'magic, the efficacy of word and rite — ḥ + the arms used purely for the sound kꜣ',
                            note: 'Fuller writings add 𓄿 and the papyrus roll 𓏛. The gloss \'magic\' carries freight the Egyptian word does not; ḥkꜣ was itself divinised as the god Heka.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: '𓊹',
                    translit: 'nṯr',
                    gloss: 'god; divine being',
                },
                {
                    native: '𓊹𓊹𓊹',
                    translit: 'nṯrw',
                    gloss: 'gods',
                },
                {
                    native: '𓂓𓏤',
                    translit: 'kꜣ',
                    gloss: 'the ka, the sustaining double',
                },
                {
                    native: '𓅡',
                    translit: 'bꜣ',
                    gloss: 'the ba, the mobile aspect of a person',
                },
                {
                    native: '𓌳𓂝𓏏𓆄',
                    translit: 'mꜣꜥt',
                    gloss: 'truth, justice, cosmic order',
                },
                {
                    native: '𓎛𓂓',
                    translit: 'ḥkꜣ',
                    gloss: 'magic; the creative power of word and rite',
                },
            ],
            exercises: [
                {
                    prompt: 'In 𓎛𓂓, what office does the pair of upraised arms hold?',
                    answer: 'Phonogram. It supplies the sound kꜣ to the word ḥkꜣ; it is not the word kꜣ, \'the ka\'.',
                    hint: 'Ask whether the ka is anywhere in the meaning.',
                },
                {
                    prompt: 'Transliterate 𓌳𓂝𓏏𓆄.',
                    answer: 'mꜣꜥt',
                    hint: 'Sickle, forearm, loaf, feather — and one of those four is silent.',
                },
                {
                    prompt: 'Which sign in 𓌳𓂝𓏏𓆄 is silent, and what does it do?',
                    answer: 'The ostrich feather 𓆄 — the classifier, marking the word\'s class of meaning, and also the emblem of the goddess Ma\'at herself.',
                    hint: null,
                },
                {
                    prompt: 'How is nṯr, \'god\', written, and what office does the sign hold?',
                    answer: 'With the single sign 𓊹, the divine standard (Gardiner R8), used as a logogram — writing the word by depicting the thing rather than spelling out its sounds.',
                    hint: null,
                },
                {
                    prompt: 'Write \'gods\', the plural of nṯr.',
                    answer: '𓊹𓊹𓊹, nṯrw — the sign written three times; alternatively the sign once followed by the plural strokes 𓏥.',
                    hint: null,
                },
            ],
        },
        {
            number: 6,
            title: 'The King\'s Two Names',
            aim: 'Read a royal cartouche — Tutankhamun\'s nomen and Thutmose III\'s prenomen — and understand honorific transposition, which puts a god\'s name first on the stone though it is spoken later.',
            sections: [
                {
                    heading: 'The ring of rope',
                    paragraphs: [
                        'The oval drawn around a royal name is a loop of rope knotted at one end. Its Egyptian name is šnw, from the verb šnı͗, \'to encircle\': the ring is everything the sun goes around, and so the king\'s dominion. It appears first in the Fourth Dynasty and is standard thereafter, and it encloses two of the king\'s five names — the prenomen or throne-name, introduced by nsw-bı͗t, conventionally \'King of Upper and Lower Egypt\', and the nomen or birth-name, introduced by sꜣ-Rꜥ, \'Son of Re\'. The Horus, Two Ladies and Golden Horus names stand outside it.',
                    ],
                    examples: [],
                },
                {
                    heading: 'Reading Tutankhamun, and the courtesy behind it',
                    paragraphs: [
                        'Take the best-known cartouche in the world and read it properly. Inside the ring stand, in this order: 𓇋𓏠𓈖 — reed-leaf ı͗, gaming-board mn, water-ripple n — which is I͗mn, Amun; then 𓏏𓅱𓏏, twt, \'image, likeness\'; then 𓋹, ꜥnḫ, \'living\'. The eye meets I͗mn–twt–ꜥnḫ. The tongue says Twt-ꜥnḫ-I͗mn: \'Living image of Amun\'.',
                        'What has happened in the writing is honorific transposition. When a word for a god or a king occurs within a longer name or phrase, the scribe habitually writes it first, out of reverence, wherever it belongs in speech. It affects the writing only: the spoken order is untouched, and the translation follows the speech, not the stone. The title sꜣ-Rꜥ above is written 𓇳𓅭, sun-disc before pintail duck, yet read sꜣ-Rꜥ; so are the script\'s own name mdw-nṯr, \'the god\'s words\', and the priestly title ḥm-nṯr; and so is the sentence this course ends with. The convention is strong but not absolute, and practice varies by period and workshop.',
                    ],
                    examples: [
                        {
                            native: '𓍹𓇋𓏠𓈖𓏏𓅱𓏏𓋹𓍺',
                            translit: 'Twt-ꜥnḫ-I͗mn',
                            gloss: 'Tutankhamun — \'Living image of Amun\'',
                            note: 'Written I͗mn–twt–ꜥnḫ; read Twt-ꜥnḫ-I͗mn. This is the short form; his fuller cartouches usually add the epithet ḥqꜣ-I͗wnw-šmꜥ, \'ruler of Southern Heliopolis\'. Unicode encodes the two halves of the cartouche ring as separate signs.',
                        },
                    ],
                },
                {
                    heading: 'A second cartouche: Mn-ḫpr-Rꜥ',
                    paragraphs: [
                        'Now read one you have not been told the answer to. Inside the ring: 𓇳, the sun-disc, Rꜥ; 𓏠, the gaming-board, mn; 𓆣, the scarab beetle, the triliteral ḫpr. Sign order Rꜥ–mn–ḫpr; reading order Mn-ḫpr-Rꜥ, by honorific transposition of the god\'s name — \'Enduring is the manifestation of Re\'. This is the prenomen of Thutmose III, whose reign falls in the fifteenth century BC (conventionally c. 1479–1425). It recurs on scarabs for centuries after his death, so that a Mn-ḫpr-Rꜥ scarab is by itself no reliable guide to date. His nomen is Ḏḥwty-ms, \'Thoth is born\', whence Thutmose.',
                    ],
                    examples: [
                        {
                            native: '𓍹𓇳𓏠𓆣𓍺',
                            translit: 'Mn-ḫpr-Rꜥ',
                            gloss: 'Menkheperre — \'Enduring is the manifestation of Re\', prenomen of Thutmose III',
                            note: 'Written Rꜥ–mn–ḫpr on the stone; read Mn-ḫpr-Rꜥ.',
                        },
                        {
                            native: '𓆣',
                            translit: 'ḫpr',
                            gloss: 'scarab beetle (L1), triliteral ḫ + p + r — \'come into being, become\'',
                            note: null,
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: '𓍷',
                    translit: 'šnw',
                    gloss: 'cartouche, \'that which encircles\' (V10; around a name it is drawn as a ring, which Unicode splits into 𓍹 and 𓍺)',
                },
                {
                    native: '𓇋𓏠𓈖',
                    translit: 'I͗mn',
                    gloss: 'Amun, conventionally \'the Hidden One\'',
                },
                {
                    native: '𓏏𓅱𓏏',
                    translit: 'twt',
                    gloss: 'image, likeness, statue',
                },
                {
                    native: '𓇳',
                    translit: 'Rꜥ',
                    gloss: 'Re, the sun-god; the sun',
                },
                {
                    native: '𓆣',
                    translit: 'ḫpr',
                    gloss: 'to come into being, become, take form',
                },
                {
                    native: '𓇳𓅭',
                    translit: 'sꜣ-Rꜥ',
                    gloss: 'Son of Re — written sun-disc first, read sꜣ first',
                },
            ],
            exercises: [
                {
                    prompt: 'The signs inside Tutankhamun\'s cartouche stand in the order I͗mn–twt–ꜥnḫ. How is the name read?',
                    answer: 'Twt-ꜥnḫ-I͗mn. The god\'s name is written first by honorific transposition but spoken last.',
                    hint: null,
                },
                {
                    prompt: 'Translate Twt-ꜥnḫ-I͗mn.',
                    answer: 'Living image of Amun',
                    hint: 'twt is \'image\', ꜥnḫ is \'living\'.',
                },
                {
                    prompt: 'Read the cartouche 𓍹𓇳𓏠𓆣𓍺 — give the name as it is spoken.',
                    answer: 'Mn-ḫpr-Rꜥ (Menkheperre), the prenomen of Thutmose III.',
                    hint: 'Sun-disc, gaming-board, scarab. One of them is written first out of reverence.',
                },
                {
                    prompt: 'What sound does the scarab 𓆣 write, and how many consonants is that?',
                    answer: 'ḫpr — three consonants. It is a triliteral.',
                    hint: null,
                },
                {
                    prompt: 'Which two of the king\'s five names are written inside cartouches?',
                    answer: 'The prenomen (throne-name), introduced by nsw-bı͗t, and the nomen (birth-name), introduced by sꜣ-Rꜥ. The Horus, Two Ladies and Golden Horus names stand outside the ring.',
                    hint: null,
                },
            ],
        },
        {
            number: 7,
            title: 'Counting Like a Scribe',
            aim: 'Read and write Egyptian numerals from the seven magnitude signs, and date a text by the regnal year of its king.',
            sections: [
                {
                    heading: 'Seven signs and no zero',
                    paragraphs: [
                        'Egyptian numbering is decimal but not positional. There is one sign for each power of ten from one to a million, and a number is written by repeating each sign as often as required and adding the results. Magnitude rides on the sign itself, which is why no zero is needed: an empty rank is simply not written, because there is no place for it to hold. ḥḥ, the sign for a million, also means \'countless\', so a royal wish for \'millions of years\' is rhetoric, not arithmetic.',
                        'One trap catches everyone once. The ideogram stroke of Lesson 1 and the numeral one are the same plain stroke on the stone; modern fonts encode them as two signs, 𓏤 and 𓏺, but the scribe drew one shape and left you to judge by function. A stroke standing after a single depicting sign is almost always the ideogram mark; strokes ranged in a row are numerals.',
                    ],
                    examples: [
                        {
                            native: '𓏺',
                            translit: 'wꜥ',
                            gloss: '1 — a single stroke, a tally; the word for \'one\' is wꜥ',
                            note: null,
                        },
                        {
                            native: '𓎆',
                            translit: 'mḏ',
                            gloss: '10 — a cattle hobble',
                            note: null,
                        },
                        {
                            native: '𓍢',
                            translit: 'št',
                            gloss: '100 — a coil of rope',
                            note: null,
                        },
                        {
                            native: '𓆼',
                            translit: 'ḫꜣ',
                            gloss: '1,000 — a lotus plant',
                            note: null,
                        },
                        {
                            native: '𓂭',
                            translit: 'ḏbꜥ',
                            gloss: '10,000 — a finger',
                            note: 'ḏbꜥ is also the ordinary word for \'finger\'.',
                        },
                        {
                            native: '𓆐',
                            translit: 'ḥfn',
                            gloss: '100,000 — a tadpole',
                            note: null,
                        },
                        {
                            native: '𓁨',
                            translit: 'ḥḥ',
                            gloss: '1,000,000 — the god Ḥeḥ, arms raised',
                            note: null,
                        },
                    ],
                },
                {
                    heading: 'Composing a number, and dating a reign',
                    paragraphs: [
                        'Write the largest magnitude first and descend, repeating each sign up to nine times before the next rank takes over. On the monument, repeated signs are stacked in tidy rows of two or three rather than strung out in a line, and numerals turn with the text, so that in a right-to-left line the highest rank stands at the right.',
                        'Egypt had no continuous era: years were counted afresh from each king\'s accession, and a date opens with the regnal-year group — the palm rib 𓆳, which writes the word for \'year\', with the loaf 𓏏 and the sign 𓊗 — followed by the numeral. A full date runs: regnal year N, month N of the season (ꜣḫt, the inundation; prt, the emergence of the fields; šmw, the harvest), day N, under the majesty of King So-and-so, whose cartouche follows.',
                        'How that group was pronounced is genuinely unsettled, and you should know it rather than repeat a reading with false confidence. Older scholarship read it ḥꜣt-sp, \'beginning of the occasion\'; rnpt-sp, \'year of the occasion\', is the form most handbooks and museum labels now print; and a third proposal reads it from a root meaning \'to reckon\', pointing to Demotic ḥsb.t, which is unambiguously the word for a regnal year in the latest stages of the language. This course cites it as rnpt-sp because that is the form most of the literature uses, not because the question is closed. The signs are not in doubt; only the sounds are.',
                    ],
                    examples: [
                        {
                            native: '𓍢𓍢𓎆𓎆𓎆𓏺𓏺𓏺𓏺',
                            translit: '234',
                            gloss: 'two hundreds, three tens, four units',
                            note: null,
                        },
                        {
                            native: '𓆼𓍢𓍢𓏺𓏺𓏺',
                            translit: '1,203',
                            gloss: 'one thousand, two hundreds, no tens at all, three units',
                            note: null,
                        },
                        {
                            native: '𓆳𓏏𓊗𓎆𓎆𓏺𓏺',
                            translit: 'rnpt-sp 22',
                            gloss: 'regnal year 22 — the regnal-year group followed by two hobbles and two strokes',
                            note: null,
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: '𓏺',
                    translit: 'wꜥ',
                    gloss: 'one',
                },
                {
                    native: '𓎆',
                    translit: 'mḏ',
                    gloss: 'ten',
                },
                {
                    native: '𓍢',
                    translit: 'št',
                    gloss: 'hundred',
                },
                {
                    native: '𓆼',
                    translit: 'ḫꜣ',
                    gloss: 'thousand',
                },
                {
                    native: '𓂭',
                    translit: 'ḏbꜥ',
                    gloss: 'ten thousand; finger',
                },
                {
                    native: '𓆐',
                    translit: 'ḥfn',
                    gloss: 'hundred thousand',
                },
                {
                    native: '𓁨',
                    translit: 'ḥḥ',
                    gloss: 'million; countless',
                },
                {
                    native: '𓆳',
                    translit: 'rnpt',
                    gloss: 'year',
                },
            ],
            exercises: [
                {
                    prompt: 'What number is written 𓍢𓍢𓎆𓎆𓎆𓏺𓏺𓏺𓏺?',
                    answer: '234',
                    hint: 'Two coils, three hobbles, four strokes.',
                },
                {
                    prompt: 'Write 1,203 in Egyptian numerals.',
                    answer: '𓆼𓍢𓍢𓏺𓏺𓏺 — one lotus (1,000), two coils (200), no tens, three strokes (3).',
                    hint: 'Nothing at all is written for the empty rank.',
                },
                {
                    prompt: 'How many individual signs are needed to write 999?',
                    answer: '27 — nine coils, nine hobbles and nine strokes.',
                    hint: null,
                },
                {
                    prompt: 'Why does the Egyptian system need no zero?',
                    answer: 'Because it is not positional. Each sign carries its own magnitude, so an empty rank is simply left unwritten; there is no place for a placeholder to hold.',
                    hint: null,
                },
                {
                    prompt: 'Read the date 𓆳𓏏𓊗𓎆𓎆𓏺𓏺.',
                    answer: 'Regnal year 22 — the regnal-year group followed by two tens and two units.',
                    hint: null,
                },
            ],
        },
        {
            number: 8,
            title: 'An Offering Which the King Gives',
            aim: 'Read the ḥtp-dı͗-nsw formula entire, clause by clause; know where such lines stood and what they were for; and know which parts of the standard translation are argued over.',
            sections: [
                {
                    heading: 'The commonest sentence in Egyptian',
                    paragraphs: [
                        'You are about to read what is almost certainly the sentence carved more often than any other in the Egyptian language. It appears from the Old Kingdom to the Roman period, on false doors, funerary stelae, offering tables, coffins, statues and tomb chapel walls — wherever a dead person\'s provision had to be secured in stone. The god named varies (Anubis in the Old Kingdom, Osiris from the First Intermediate Period onward) and the goods vary too. What does not vary is the frame: the king gives an offering to a god, and the god passes it to the ka of a named person.',
                        'For the standard form and the discussion behind it, see Gardiner, Egyptian Grammar, 3rd ed. (Oxford, 1957), §171; Winfried Barta, Aufbau und Bedeutung der altägyptischen Opferformel (Glückstadt, 1968); and Detlef Franke, \'The Middle Kingdom Offering Formulas — A Challenge\', Journal of Egyptian Archaeology 89 (2003), 39–57.',
                    ],
                    examples: [],
                },
                {
                    heading: 'Clause by clause',
                    paragraphs: [
                        'The line opens with three signs: 𓇓, the sedge of Upper Egypt, which with the loaf 𓏏 writes the word for \'king\'; 𓊵, the loaf on a reed mat, ḥtp, \'offering\'; 𓏙, the conical loaf, dı͗, \'gives\'. Your eye meets nsw–ḥtp–dı͗; your tongue says ḥtp-dı͗-nsw. This is honorific transposition, exactly as in the cartouche of Tutankhamun. The god follows, then dı͗=f, \'that he may give\'.',
                        'Then 𓉐𓂋𓏏𓊤, prt-ḫrw: the house-plan for the sound pr, the mouth r, the loaf t, spelling prt, \'a going forth\'; then the oar 𓊤, ḫrw, \'voice\'. Literally, \'a going-forth of the voice\'. Then the goods — t, \'bread\'; ḥnqt, \'beer\'; kꜣw, \'oxen\'; ꜣpdw, \'fowl\', with longer lists adding linen, alabaster and \'every good and pure thing\'. They are given here in transliteration only, because their writings vary so widely by period and workshop that no single form can honestly be shown as the standard one.',
                        'Then the beneficiary — 𓈖𓂓𓈖, n kꜣ n, \'for the ka of\'. The goods go to the ka, not to the corpse. The name and titles follow, and the line usually closes with mꜣꜥ-ḫrw, \'true of voice\'. Observe that the oar writes ḫrw both there and in prt-ḫrw: the voice that summons the offering and the voice found true are one and the same sign.',
                    ],
                    examples: [
                        {
                            native: '𓇓𓏏',
                            translit: 'nsw',
                            gloss: 'the king — the sedge (M23) and the loaf (X1)',
                            note: 'Written first, read last.',
                        },
                        {
                            native: '𓊨𓁹𓅆',
                            translit: 'Wsı͗r',
                            gloss: 'Osiris — throne (Q1) and eye (D4), with the divine classifier G7',
                            note: 'In Old Kingdom examples the god named here is usually Anubis.',
                        },
                        {
                            native: '𓏙𓆑',
                            translit: 'dı͗=f',
                            gloss: 'that he may give — the giving-sign with the suffix pronoun =f, \'he\'',
                            note: '𓏙 is the conical loaf, Gardiner X8. The arm holding out a conical loaf, 𓂞 (D37), is an equally common writing of the same verb.',
                        },
                        {
                            native: '𓉐𓂋𓏏𓊤',
                            translit: 'prt-ḫrw',
                            gloss: 'an invocation offering — literally \'a going-forth of the voice\'',
                            note: null,
                        },
                        {
                            native: '𓈖𓂓𓈖',
                            translit: 'n kꜣ n',
                            gloss: 'for the ka of — n, the upraised arms kꜣ, n again',
                            note: null,
                        },
                        {
                            native: '𓐙𓊤',
                            translit: 'mꜣꜥ-ḫrw',
                            gloss: 'true of voice — vindicated, justified',
                            note: null,
                        },
                        {
                            native: '𓇓𓏏𓊵𓏙 𓊨𓁹𓅆 𓏙𓆑 𓉐𓂋𓏏𓊤 𓈖𓂓𓈖',
                            translit: 'ḥtp-dı͗-nsw Wsı͗r, dı͗=f prt-ḫrw … n kꜣ n N',
                            gloss: 'An offering which the king gives to Osiris, that he may give an invocation offering … for the ka of N',
                            note: null,
                        },
                    ],
                },
                {
                    heading: 'What is argued, and what the line is for',
                    paragraphs: [
                        'Put together, the line reads: ḥtp-dı͗-nsw Wsı͗r, dı͗=f prt-ḫrw t ḥnqt kꜣw ꜣpdw n kꜣ n N, mꜣꜥ-ḫrw — \'An offering which the king gives to Osiris, that he may give an invocation offering of bread, beer, oxen and fowl for the ka of N, true of voice.\' Commit that to memory; it will unlock a museum case at sight.',
                        'Two honest cautions, both about the first three signs. The grammar has been argued for a century: Gardiner\'s rendering treats ḥtp as a noun qualified by a relative form, \'an offering which the king gives\'; others read a plain statement, \'the king gives an offering\'; and Franke\'s 2003 article reopened the question rather than settling it. The reading of the king-word is unsettled too: both nsw and nswt appear in print, and the writing does not decide between them. This course gives the conventional forms because they are what the literature quotes, not because the matter is closed.',
                        'Finally, what the line is for. It is not a prayer in the sense of a wish sent upward; it is a mechanism, and prt-ḫrw tells you how it works — an offering that goes forth at the sound of a voice. Endowments failed and priests died, but the inscribed line survived, because anyone who could read could reactivate it by pronouncing it. Hence the appeal to the living carved in so many tomb chapels, asking the passing visitor to say the formula aloud. The line was designed to be effective in the mouth of a stranger, thousands of years after it was cut, and you have just become that stranger.',
                    ],
                    examples: [],
                },
            ],
            vocabulary: [
                {
                    native: '𓇓𓏏',
                    translit: 'nsw(t)',
                    gloss: 'king (both nsw and nswt are current transliterations of this writing)',
                },
                {
                    native: '𓊵',
                    translit: 'ḥtp',
                    gloss: 'offering, boon; to be at peace',
                },
                {
                    native: '𓏙',
                    translit: 'dı͗',
                    gloss: 'to give',
                },
                {
                    native: '𓊨𓁹𓅆',
                    translit: 'Wsı͗r',
                    gloss: 'Osiris',
                },
                {
                    native: '𓉐𓂋𓏏𓊤',
                    translit: 'prt-ḫrw',
                    gloss: 'invocation offering, \'a going-forth of the voice\'',
                },
                {
                    native: '𓈖𓂓𓈖',
                    translit: 'n kꜣ n',
                    gloss: 'for the ka of',
                },
                {
                    native: '𓐙𓊤',
                    translit: 'mꜣꜥ-ḫrw',
                    gloss: 'true of voice, vindicated, justified',
                },
            ],
            exercises: [
                {
                    prompt: 'Give the offering formula entire, in transliteration, in the short form taught in this lesson, with Osiris as the god named.',
                    answer: 'ḥtp-dı͗-nsw Wsı͗r, dı͗=f prt-ḫrw t ḥnqt kꜣw ꜣpdw n kꜣ n N, mꜣꜥ-ḫrw',
                    hint: 'King\'s offering, god, that he may give, invocation offering, the four goods, for the ka of the named person, true of voice.',
                },
                {
                    prompt: 'Translate that formula into English.',
                    answer: 'An offering which the king gives to Osiris, that he may give an invocation offering of bread, beer, oxen and fowl for the ka of N, true of voice.',
                    hint: null,
                },
                {
                    prompt: 'Why does 𓇓𓏏 stand first on the stone when it is read after ḥtp and dı͗?',
                    answer: 'Honorific transposition — the word for the king is written first as a courtesy, exactly as a god\'s name is in a cartouche. The spoken order is unaffected.',
                    hint: null,
                },
                {
                    prompt: 'What does prt-ḫrw mean literally, and why does the literal sense matter?',
                    answer: '\'A going-forth of the voice\'. It matters because it explains the mechanism: the offering is summoned into effect by being spoken aloud, which is why the line was cut where a passing visitor could read it.',
                    hint: null,
                },
                {
                    prompt: 'To whom are the bread, beer, oxen and fowl directed?',
                    answer: 'To the ka of the named person — n kꜣ n N, written 𓈖𓂓𓈖. Not to the body, but to the sustaining double.',
                    hint: null,
                },
                {
                    prompt: 'Is the grammar of ḥtp-dı͗-nsw settled?',
                    answer: 'No. Gardiner\'s \'an offering which the king gives\' takes ḥtp as a noun qualified by a relative form; others read a plain statement, \'the king gives an offering\'; and Franke\'s 2003 article in JEA 89 reopened rather than resolved the question.',
                    hint: null,
                },
            ],
        },
    ],
};
