// greek course — eight lessons for the Scriptorium.
// Authored and fact-checked by the content pipeline: arithmetic recomputed,
// glyphs verified against Unicode names, every quoted text checked against
// its cited source, and every exercise worked to confirm its answer.
export default {
    language: 'Greek',
    title: 'Reading the Mysteries',
    tagline: 'Eight lessons from the four-and-twenty letters to ἐν ἀρχῇ ἦν ὁ λόγος.',
    overview: 'Eight lessons, each teaching a few things thoroughly. You will learn the letters and where their foreign names came from, choose a pronunciation knowing what you have chosen, sound the seven vowels and the eight diphthongs, sort the consonants into their three classes, master the article until it lights up any inscription, decline nouns through four cases across the three declensions, conjugate εἰμί in full, and count with the Milesian numerals on cases that are genuinely attested. Then whole texts: the Delphic maxims, a gold leaf from a grave in southern Italy, a formula from the magical papyri, and at last the opening of John with the alchemists\' motto ἓν τὸ πᾶν. Nothing here is invented, and where the scholarship is unsettled you will be told so.',
    lessons: [
        {
            number: 1,
            title: 'Four-and-twenty letters',
            aim: 'Learn the letters in both cases, see why breathings and accents are later apparatus, and read two names aloud: Ἑρμῆς and Σοφία.',
            sections: [
                {
                    heading: 'The row of twenty-four',
                    paragraphs: [
                        'The Ionic alphabet, official at Athens from 403/2 BCE under the archon Eucleides, has twenty-four letters. Nineteen of them, α through τ, keep the order of the Phoenician consonantary; the Greek innovation was to spend some of those inherited signs on vowels, which no earlier alphabet wrote.',
                        'Five letters stand at the end, after τ, where the Phoenician row had nothing: υ φ χ ψ ω, which scholars call the supplementals. Upsilon is the Phoenician waw put to a second, vocalic use; omega is an omicron opened at the bottom, an Ionic invention; the origin of φ, χ and ψ is still argued.',
                        'Learn the whole row in order. That order is the numeral system of lesson six, where a letter\'s place is its value, and it is the order in which the seven vowels are chanted in the papyri. Note that ἒ ψιλόν, ὂ μικρόν and ὦ μέγα are Byzantine labels, coined to tell apart letters that had come to sound alike.',
                    ],
                    examples: [
                        {
                            native: 'α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω',
                            translit: 'a b g d e z ē th i k l m n x o p r s t u ph ch ps ō',
                            gloss: 'the twenty-four letters',
                            note: 'Sigma alone has two shapes: σ inside a word, ς at the end.',
                        },
                    ],
                },
                {
                    heading: 'The names are foreign',
                    paragraphs: [
                        'ἄλφα, βῆτα, γάμμα, δέλτα: the names mean nothing whatever in Greek. They are the Phoenician words carried over with the signs — ʾalp, \'ox\'; bet, \'house\'; gaml; dalt, \'door\' — and Greek took the sounds without the sense, so that the alphabet recites a vocabulary its users could not translate. Herodotus knew it. At 5.58 he calls the letters Φοινικήια γράμματα, \'Phoenician letters\', and reports the tradition that Cadmus of Tyre brought them to Boeotia.',
                        'The exceptions prove the borrowing. The five supplementals at the end of the row, which Phoenician did not supply, carry plain Greek descriptions rather than foreign names — εἶ, ταῦ and the rest are matched by ὖ ψιλόν, \'bare u\', and by the Byzantine labels ἒ ψιλόν, ὂ μικρόν and ὦ μέγα met a moment ago. Where the sign was inherited the name is a fossil; where the Greeks made the sign themselves, the name describes it.',
                    ],
                    examples: [
                        {
                            native: 'ἄλφα, βῆτα, γάμμα, δέλτα',
                            translit: 'alpha, bēta, gamma, delta',
                            gloss: 'the first four letter-names',
                            note: 'Phoenician ʾalp, bet, gaml, dalt — ox, house, and door among them.',
                        },
                        {
                            native: 'Φοινικήια γράμματα',
                            translit: 'Phoinikēia grammata',
                            gloss: 'Phoenician letters',
                            note: 'Herodotus 5.58, on where the alphabet came from.',
                        },
                    ],
                },
                {
                    heading: 'Majuscule came first',
                    paragraphs: [
                        'The capitals are the ancient forms. Greek books were written in majuscule until the ninth century CE; minuscule as a book-hand is a Byzantine development, its earliest dated example a Gospel book of 835 CE, the Uspensky Gospels. Documentary hands on papyrus were cursive long before that, but they are not the ancestor of the printed letters you are learning.',
                        'The literary page also had no word-spaces. ΓΝΩΘΙΣΑΥΤΟΝ is how the most famous sentence in Greek met a reader\'s eye, and the reader divided it himself.',
                    ],
                    examples: [
                        {
                            native: 'ΓΝΩΘΙΣΑΥΤΟΝ',
                            translit: 'gnōthisauton',
                            gloss: 'know thyself, as an ancient hand would set it',
                            note: 'The division γνῶθι σαυτόν, and its accents, are ours.',
                        },
                    ],
                },
                {
                    heading: 'Breathings and accents',
                    paragraphs: [
                        'Every word beginning with a vowel carries a breathing: the rough adds an h, the smooth marks its absence and says nothing, but must be written. Initial ρ takes the rough (ῥ), and initial υ regularly does; on a capital the mark stands at the left shoulder, Ἑρμῆς.',
                        'The three accents marked pitch, not stress. Tradition credits them to Aristophanes of Byzantium at Alexandria about 200 BCE, though the attribution rests on later grammarians; papyri use them sporadically, mediaeval minuscule regularly. So read Her-mês, with the h the breathing supplies, and so-phí-a, with no breathing at all.',
                    ],
                    examples: [
                        {
                            native: 'Ἑρμῆς',
                            translit: 'Hermēs',
                            gloss: 'Hermes',
                            note: 'Rough breathing left of the capital; circumflex on the long η.',
                        },
                        {
                            native: 'ὕδωρ',
                            translit: 'hydōr',
                            gloss: 'water',
                            note: 'Initial upsilon takes the rough breathing: hence English \'hydro-\'.',
                        },
                        {
                            native: 'Σοφία',
                            translit: 'Sophia',
                            gloss: 'Wisdom',
                            note: 'No breathing: the word opens with a consonant. Read so-phí-a.',
                        },
                        {
                            native: 'ἀρχή / ἁρμονία',
                            translit: 'archē / harmonia',
                            gloss: 'beginning / harmony',
                            note: 'The same vowel, the two breathings: smooth gives ar-, rough gives har-.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'γράμμα',
                    translit: 'gramma',
                    gloss: 'letter, written character',
                },
                {
                    native: 'στοιχεῖον',
                    translit: 'stoicheion',
                    gloss: 'element; letter of the alphabet',
                },
                {
                    native: 'λόγος',
                    translit: 'logos',
                    gloss: 'word, reason, account',
                },
                {
                    native: 'ψυχή',
                    translit: 'psychē',
                    gloss: 'soul',
                },
                {
                    native: 'ἀρχή',
                    translit: 'archē',
                    gloss: 'beginning, first principle',
                },
                {
                    native: 'Σοφία',
                    translit: 'Sophia',
                    gloss: 'Wisdom',
                },
                {
                    native: 'ὄνομα',
                    translit: 'onoma',
                    gloss: 'name (genitive ὀνόματος)',
                },
                {
                    native: 'ἁρμονία',
                    translit: 'harmonia',
                    gloss: 'joining, harmony, tuning',
                },
            ],
            exercises: [
                {
                    prompt: 'Name the five letters that stand at the end of the row, after τ, where the Phoenician alphabet had nothing.',
                    answer: 'υ, φ, χ, ψ, ω — the supplementals. Upsilon is a second use of the sign that also gave digamma, omega a modified omicron; the origin of φ, χ and ψ is disputed.',
                    hint: 'The inherited row ends with τ, not with υ.',
                },
                {
                    prompt: 'Which single letter changes shape at the end of a word?',
                    answer: 'Sigma: σ within a word, ς at the end.',
                    hint: 'Look at the last letter of λόγος.',
                },
                {
                    prompt: 'Write ΛΟΓΟΣ in minuscule with its accent.',
                    answer: 'λόγος',
                    hint: 'Acute on the first syllable; mind which sigma ends a word.',
                },
                {
                    prompt: 'Why does Ἑρμῆς carry a breathing while Σοφία does not?',
                    answer: 'Breathings stand only over an initial vowel (and over initial ρ). Ἑρμῆς opens with ε, which here takes the rough breathing and is sounded \'Her-\'; Σοφία opens with the consonant σ.',
                    hint: null,
                },
                {
                    prompt: 'A fourth-century BCE inscription has no accents, breathings or word-spacing. Is the stone defective?',
                    answer: 'No. Word-division, breathings and accents are later apparatus, Hellenistic in origin and regular only in mediaeval manuscripts.',
                    hint: 'Ask when the marks were invented.',
                },
                {
                    prompt: 'What do the names ἄλφα and βῆτα mean in Greek?',
                    answer: 'Nothing. They are Phoenician words taken over with the signs — ʾalp, \'ox\', and bet, \'house\' — and carry no sense in Greek at all.',
                    hint: 'Ask which language the names belong to.',
                },
                {
                    prompt: 'Read ἀρχή and ἁρμονία aloud. What single mark separates them at the start?',
                    answer: 'The breathing. ἀρχή has the smooth, sounded ar-; ἁρμονία has the rough, sounded har-. Nothing else in the spelling distinguishes the two openings.',
                    hint: 'Look above the first letter, not at it.',
                },
            ],
        },
        {
            number: 2,
            title: 'Sounding the sacred',
            aim: 'Choose a pronunciation with open eyes — classical, Erasmian, or modern — and learn the seven vowels as instruments, since the papyri treat them so.',
            sections: [
                {
                    heading: 'Three pronunciations, none innocent',
                    paragraphs: [
                        'Reconstructed classical Attic is built from spelling errors, metre, puns and loanwords. The Erasmian, descended from a dialogue Erasmus published in 1528, keeps every letter distinct and was never anybody\'s speech. Modern Greek is the living continuation, in which many ancient distinctions have merged.',
                        'Choose one and be consistent. For the Koine of the papyri and the New Testament the sound was already drifting modern — writers confuse ει with ι early, αι with ε from the second century CE. Classically φ, θ and χ were aspirated stops rather than fricatives, υ was the vowel of French \'tu\', η a long open e, and ζ probably [zd], though that is argued still.',
                    ],
                    examples: [
                        {
                            native: 'Χριστός',
                            translit: 'Christos',
                            gloss: 'anointed',
                            note: 'In classical pronunciation χ is an aspirated k, never the ch of \'church\'; by Koine it had become a fricative.',
                        },
                    ],
                },
                {
                    heading: 'The seven vowels',
                    paragraphs: [
                        'Greek was the first script to write vowels, and it wrote seven: α ε η ι ο υ ω. Two pairs mark quantity — short ε against long η, short ο against long ω — while α, ι and υ each serve as both, with nothing in the spelling to say which.',
                        'In the magical papyri the seven are chanted in every arrangement. Demetrius, On Style 71, reports that the priests in Egypt hymn the gods by uttering the seven vowels in succession, and that the sound is heard with pleasure in place of flute and lyre. They were matched to the seven planetary spheres as well, most often on the authority of a passage transmitted under the name of Nicomachus of Gerasa — but the assignments differ from source to source, so treat any single table as one tradition among several.',
                        'One word here runs ahead of you: τὰ φωνήεντα, the grammarians\' own name for the vowels, \'the sounding ones\'. τά is the neuter plural article, which you meet properly in the next lesson.',
                    ],
                    examples: [
                        {
                            native: 'α ε η ι ο υ ω',
                            translit: 'a e ē i o u ō',
                            gloss: 'the seven vowels',
                            note: 'Chanted in the papyri; matched to the spheres in conflicting schemes.',
                        },
                        {
                            native: 'τὰ φωνήεντα',
                            translit: 'ta phōnēenta',
                            gloss: 'the vowels, \'the sounding ones\'',
                            note: 'The ancient grammarians\' own term.',
                        },
                    ],
                },
                {
                    heading: 'Two traps',
                    paragraphs: [
                        'The iota in ᾳ, ῃ, ῳ is silent: it belongs to long diphthongs whose iota had stopped being pronounced by Hellenistic times. Ancient stones write it full size on the line (ΤΗΙ); writing it small and beneath the vowel is a mediaeval convention, which is why editors call it subscript and epigraphists call it adscript.',
                        'And γ before γ, κ, χ or ξ is not g but the nasal ng — ἄγγελος is angelos, which is why the English word is \'angel\'. Modern Greek, for its part, pronounces η, ι, υ, ει and οι all alike as i, a merger called iotacism.',
                    ],
                    examples: [
                        {
                            native: 'ἄγγελος',
                            translit: 'angelos',
                            gloss: 'messenger, angel',
                            note: 'γγ = ng; the same rule gives \'evangelist\' from εὐαγγέλιον.',
                        },
                    ],
                },
                {
                    heading: 'The diphthongs',
                    paragraphs: [
                        'Two vowels written together and sounded as one syllable make a diphthong, and Greek has eight in common use: αι, ει, οι, υι, αυ, ευ, ηυ, ου. The first four glide towards ι, the last four towards υ. They are not optional ornament — you cannot read a line without them, since εἰμί, οὐρανός, αὐτός and εὐαγγέλιον are all built on one.',
                        'Classically each was a true glide: αι as in \'aisle\', ει close to the vowel of \'eight\', οι as in \'oil\', αυ as in \'how\', ευ as e followed quickly by u. ου was the exception even then, a plain long u, which is why Latin transcribes Greek ου as u and English gets \'ouranos\' as Uranus. By Koine the glides were collapsing: ει had fallen together with ι, and αι with ε, which is exactly the confusion the papyri show in their spelling.',
                        'Two warnings. A diphthong takes its breathing and accent on the second letter, so \'and\' is καί and \'the heaven\' is οὐρανός, with the marks over the ι and the υ. And when the two vowels are not to be run together, a diaeresis says so: Ἠσαΐας is four syllables, the mark over the ι forbidding the diphthong αι.',
                    ],
                    examples: [
                        {
                            native: 'αι ει οι υι αυ ευ ηυ ου',
                            translit: 'ai ei oi ui au eu ēu ou',
                            gloss: 'the eight diphthongs',
                            note: 'Four glide to ι, four to υ; ου is simply long u.',
                        },
                        {
                            native: 'οὐρανός',
                            translit: 'ouranos',
                            gloss: 'heaven, sky',
                            note: 'ου is one sound. Breathing and accent sit on the second vowel.',
                        },
                        {
                            native: 'εὐαγγέλιον',
                            translit: 'euangelion',
                            gloss: 'good news, gospel',
                            note: 'ευ, then the γγ of the last section: eu-an-gé-li-on.',
                        },
                        {
                            native: 'Ἠσαΐας',
                            translit: 'Ēsaias',
                            gloss: 'Isaiah',
                            note: 'The diaeresis on ι breaks the pair: read -a-i-, not the diphthong αι.',
                        },
                    ],
                },
                {
                    heading: 'The consonants in three classes',
                    paragraphs: [
                        'The stops fall into three classes by where they are made, and three grades by how: labial π β φ, dental τ δ θ, velar κ γ χ, each in the order voiceless, voiced, aspirate. Learning the grid is worth an hour, because Greek changes stops by rule at every join, and the rules are stated in these terms.',
                        'The three double letters are the grid at work. ψ is a labial plus σ, ξ a velar plus σ; ζ is the odd one, probably [zd] in classical Attic, though the question is still argued. So ψυχή opens with π-σ fused into one sign, and the numeral row of lesson six is the alphabet with three dead letters still standing in it.',
                        'What remains are the liquids λ ρ, the nasals μ ν, and the sibilant σ. These behave gently and survive most joins unchanged, which is why they carry so much of the vocabulary you will meet: λόγος, ῥῆμα, μορφή, νοῦς, σοφία.',
                    ],
                    examples: [
                        {
                            native: 'π β φ · τ δ θ · κ γ χ',
                            translit: 'p b ph · t d th · k g ch',
                            gloss: 'labial, dental, velar — voiceless, voiced, aspirate',
                            note: 'Three places, three grades; the whole system of Greek stops.',
                        },
                        {
                            native: 'ψ = π + σ, ξ = κ + σ',
                            translit: 'ps = p + s, x = k + s',
                            gloss: 'the double letters resolved',
                            note: 'One sign for two sounds; ζ is the third double, probably [zd].',
                        },
                        {
                            native: 'νοῦς',
                            translit: 'nous',
                            gloss: 'mind, intellect',
                            note: 'A nasal, the diphthong ου, and final ς: the word Poimandres turns on.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'φωνή',
                    translit: 'phōnē',
                    gloss: 'voice, sound',
                },
                {
                    native: 'φωνῆεν',
                    translit: 'phōnēen',
                    gloss: 'vowel (plural φωνήεντα)',
                },
                {
                    native: 'ἄγγελος',
                    translit: 'angelos',
                    gloss: 'messenger, angel',
                },
                {
                    native: 'ζωή',
                    translit: 'zōē',
                    gloss: 'life',
                },
                {
                    native: 'φῶς',
                    translit: 'phōs',
                    gloss: 'light',
                },
                {
                    native: 'ἱερεύς',
                    translit: 'hiereus',
                    gloss: 'priest',
                },
                {
                    native: 'νοῦς',
                    translit: 'nous',
                    gloss: 'mind, intellect',
                },
                {
                    native: 'καί',
                    translit: 'kai',
                    gloss: 'and, also, even',
                },
                {
                    native: 'μορφή',
                    translit: 'morphē',
                    gloss: 'form, shape',
                },
            ],
            exercises: [
                {
                    prompt: 'Name the seven vowels in order, and say which pairs are distinguished by quantity.',
                    answer: 'α ε η ι ο υ ω. Short ε pairs with long η, short ο with long ω; α, ι and υ each serve as both.',
                    hint: 'Two of the seven exist only to mark length.',
                },
                {
                    prompt: 'How is the first γ of ἄγγελος sounded, and why?',
                    answer: 'As ng: before γ, κ, χ or ξ, gamma is a nasal, so ἄγγελος is angelos.',
                    hint: 'Say the English word descended from it.',
                },
                {
                    prompt: 'In Modern Greek, how many distinct sounds do η, ι, υ, ει and οι have between them?',
                    answer: 'One: all five are pronounced i. The merger is called iotacism.',
                    hint: null,
                },
                {
                    prompt: 'Which ancient writer reports Egyptian priests hymning the gods with the seven vowels in succession, and where?',
                    answer: 'Demetrius, On Style (De elocutione) 71.',
                    hint: 'A treatise on prose style, not on religion.',
                },
                {
                    prompt: 'What is Erasmian pronunciation, and what is it not?',
                    answer: 'The schoolroom system descended from the dialogue on pronunciation Erasmus published in 1528. It is not the speech of any historical Greek community, ancient or modern.',
                    hint: 'A date and a purpose, rather than a place.',
                },
                {
                    prompt: 'Name the eight diphthongs, and say which way each group glides.',
                    answer: 'αι, ει, οι, υι glide towards ι; αυ, ευ, ηυ, ου glide towards υ. ου is the exception in sound, being simply a long u.',
                    hint: 'Four end in one vowel, four in another.',
                },
                {
                    prompt: 'On which letter of a diphthong do the breathing and accent stand? Give an example.',
                    answer: 'On the second. οὐρανός carries both marks over the υ, not the ο.',
                    hint: 'Look at where the marks actually sit in οὐρανός.',
                },
                {
                    prompt: 'What does the diaeresis in Ἠσαΐας do?',
                    answer: 'It cancels the diphthong: the two vowels are to be sounded separately, so the word is Ē-sa-i-as rather than Ē-sais.',
                    hint: 'Two dots, and a pair of vowels that would otherwise merge.',
                },
                {
                    prompt: 'Resolve ψ and ξ into the sounds they stand for, and name the class of the first element of each.',
                    answer: 'ψ is a labial plus σ (π + σ); ξ is a velar plus σ (κ + σ).',
                    hint: 'Each double letter is a stop plus a sibilant.',
                },
            ],
        },
        {
            number: 3,
            title: 'The article is a lantern',
            aim: 'Master ὁ, ἡ, τό — the small word that declares gender, number and case, and turns an unbroken line of capitals into a sentence.',
            sections: [
                {
                    heading: 'Three genders, one small word',
                    paragraphs: [
                        'Gender in Greek is grammatical, not biological: ἡ ὁδός, \'the road\', is feminine. The article agrees with its noun in gender, number and case, which makes it a label announcing all three. Singular: ὁ, τοῦ, τῷ, τόν; ἡ, τῆς, τῇ, τήν; τό, τοῦ, τῷ, τό. Plural: οἱ, τῶν, τοῖς, τούς; αἱ, τῶν, ταῖς, τάς; τά, τῶν, τοῖς, τά.',
                        'Two observations. ὁ, ἡ, οἱ and αἱ carry no accent: they are proclitics, leaning forward onto the word that follows. And Greek has no indefinite article at all, so a noun standing without ὁ may be rendered \'a god\', \'God\' or \'divine\' as the sense requires — a fact that will decide the hardest sentence in lesson eight.',
                    ],
                    examples: [
                        {
                            native: 'ὁ λόγος, ἡ σοφία, τὸ φῶς',
                            translit: 'ho logos, hē sophia, to phōs',
                            gloss: 'the word, the wisdom, the light',
                            note: 'Masculine, feminine, neuter, all nominative singular.',
                        },
                        {
                            native: 'ὁ, τοῦ, τῷ, τόν · οἱ, τῶν, τοῖς, τούς',
                            translit: 'ho, tou, tōi, ton · hoi, tōn, tois, tous',
                            gloss: 'masculine: nominative, genitive, dative, accusative — singular then plural',
                            note: 'Learn the four across, then the plural beneath. This is the whole table for one gender.',
                        },
                        {
                            native: 'ἡ, τῆς, τῇ, τήν · αἱ, τῶν, ταῖς, τάς',
                            translit: 'hē, tēs, tēi, tēn · hai, tōn, tais, tas',
                            gloss: 'feminine, singular then plural',
                            note: 'The genitive plural τῶν is shared by all three genders.',
                        },
                        {
                            native: 'τό, τοῦ, τῷ, τό · τά, τῶν, τοῖς, τά',
                            translit: 'to, tou, tōi, to · ta, tōn, tois, ta',
                            gloss: 'neuter, singular then plural',
                            note: 'Neuter nominative and accusative are always identical — here and in every noun you will meet.',
                        },
                    ],
                },
                {
                    heading: 'Why it is a lantern',
                    paragraphs: [
                        'The article\'s forms are unambiguous where the noun\'s are not. Third-declension nouns disguise themselves; the article never does. See τοῦ and you know a genitive singular is coming before you have identified the noun; τῶν announces a genitive plural of any gender. Try it on an unspaced string of capitals, ΤΟΦΩΣΤΩΝΑΝΘΡΩΠΩΝ: two articles show through and divide the line for you — τὸ φῶς τῶν ἀνθρώπων, \'the light of men\', which is the last four words of John 1:4.',
                    ],
                    examples: [
                        {
                            native: 'τὸ φῶς τῶν ἀνθρώπων',
                            translit: 'to phōs tōn anthrōpōn',
                            gloss: 'the light of men',
                            note: 'John 1:4. τό marks the head noun, τῶν the genitive plural hanging from it.',
                        },
                    ],
                },
                {
                    heading: 'The article makes nouns out of anything',
                    paragraphs: [
                        'Put the neuter article before an adjective, a participle or a whole phrase, and Greek hands you an abstract noun: τὸ πᾶν, \'the All\'; τὸ ἕν, \'the One\', on which the whole of Plotinus turns; τὰ πάντα, \'all things\'; ὁ ὤν, \'the One who is\', the Septuagint\'s rendering at Exodus 3:14. (ὤν is the participle of the verb \'to be\'; you will conjugate that verb in lesson five. Take the phrase whole for now.)',
                        'This is the engine of Greek philosophical vocabulary, and much of the technical language of the Hermetica, the Gnostics and the Neoplatonists is built by exactly this manoeuvre. It is also how the motto that closes this course is made: ἓν τὸ πᾶν.',
                    ],
                    examples: [
                        {
                            native: 'τὸ πᾶν',
                            translit: 'to pan',
                            gloss: 'the All, the universe',
                            note: 'Neuter article + neuter adjective, made a noun.',
                        },
                        {
                            native: 'ὁ ὤν',
                            translit: 'ho ōn',
                            gloss: 'the One who is',
                            note: 'Exodus 3:14; lettered into the cross-halo of Christ in Orthodox icons.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'ὁ, ἡ, τό',
                    translit: 'ho, hē, to',
                    gloss: 'the (masculine, feminine, neuter)',
                },
                {
                    native: 'θεός',
                    translit: 'theos',
                    gloss: 'god, God',
                },
                {
                    native: 'ἄνθρωπος',
                    translit: 'anthrōpos',
                    gloss: 'human being, man',
                },
                {
                    native: 'πᾶς, πᾶσα, πᾶν',
                    translit: 'pas, pasa, pan',
                    gloss: 'all, every, whole',
                },
                {
                    native: 'εἷς, μία, ἕν',
                    translit: 'heis, mia, hen',
                    gloss: 'one',
                },
                {
                    native: 'ὁδός',
                    translit: 'hodos',
                    gloss: 'road, way (feminine, though it ends -ος)',
                },
            ],
            exercises: [
                {
                    prompt: 'Supply the right article: ___ λόγος, ___ σοφία, ___ φῶς.',
                    answer: 'ὁ λόγος, ἡ σοφία, τὸ φῶς.',
                    hint: 'Masculine, feminine, neuter, in that order.',
                },
                {
                    prompt: 'Give the genitive singular of the article in all three genders.',
                    answer: 'τοῦ (masculine), τῆς (feminine), τοῦ (neuter).',
                    hint: 'Masculine and neuter share a form.',
                },
                {
                    prompt: 'Divide ΤΟΦΩΣΤΩΝΑΝΘΡΩΠΩΝ into words and translate it.',
                    answer: 'τὸ φῶς τῶν ἀνθρώπων — \'the light of men\' (John 1:4).',
                    hint: 'Find the two articles first; they mark the joints.',
                },
                {
                    prompt: 'Why do ὁ, ἡ, οἱ and αἱ carry no accent?',
                    answer: 'They are proclitics: unaccented words that lean forward onto the word they precede.',
                    hint: null,
                },
                {
                    prompt: 'Translate τὸ πᾶν and τὰ πάντα, and explain how the difference is made.',
                    answer: '\'The All\' and \'all things\'. Both are πᾶς made a noun by the neuter article; the singular views the totality as one whole, the plural as the sum of individual things.',
                    hint: 'Only the number of the article changes.',
                },
                {
                    prompt: 'Which form of the article is shared by all three genders, and in what case and number?',
                    answer: 'τῶν — the genitive plural. Seeing it tells you the case and number at once, but nothing about gender.',
                    hint: 'Look down the three tables for a form that repeats.',
                },
                {
                    prompt: 'In the neuter, which two cases always share a form? Give the singular and the plural.',
                    answer: 'Nominative and accusative: τό and τό in the singular, τά and τά in the plural. The rule holds for every neuter noun in Greek, not only the article.',
                    hint: 'Two of the four columns are identical.',
                },
            ],
        },
        {
            number: 4,
            title: 'Nouns and their cases',
            aim: 'Learn the cases across the three declensions — nominative and genitive first, since titles and inscriptions are built from them, then the dative and accusative that the last three lessons need — and construe a real Hermetic title.',
            sections: [
                {
                    heading: 'Five cases, and the two you need first',
                    paragraphs: [
                        'The nominative is the subject and the dictionary form; the genitive answers \'of what?\' — possession, parentage, source, definition — and follows many prepositions; the dative covers \'to, for, with, in\'; the accusative is the object; the vocative addresses. Take nominative and genitive together, for lexicons cite both, and titles and dedications are built almost entirely from the two.',
                    ],
                    examples: [
                        {
                            native: 'ἡ ψυχή / τῆς ψυχῆς',
                            translit: 'hē psychē / tēs psychēs',
                            gloss: 'the soul / of the soul',
                            note: 'First declension: -η, -ης.',
                        },
                    ],
                },
                {
                    heading: 'Three declensions in outline',
                    paragraphs: [
                        'The first declension is mostly feminine, nominative in -η or -α, genitive in -ης or -ας: ἡ ψυχή / τῆς ψυχῆς, ἡ σοφία / τῆς σοφίας. Its masculine branch has -ης with genitive -ου (ὁ προφήτης / τοῦ προφήτου), and by contraction gives Ἑρμῆς the genitive Ἑρμοῦ. The second declension has -ος (usually masculine) or -ον (always neuter), genitive -ου for both.',
                        'The third gathers everything else. Its nominative is unpredictable, often disguised by sound change, but its genitive ends in -ος and shows the stem plainly: τὸ φῶς / τοῦ φωτός, ὁ ποιμήν / τοῦ ποιμένος, ἡ γένεσις / τῆς γενέσεως, ὁ ἀνήρ / τοῦ ἀνδρός. Hence the rule for the rest of your life with Greek: learn the genitive, because the stem lives there. Beware too a small family of feminine nouns in -ος — ἡ βίβλος, ἡ ὁδός — where nothing but the article betrays the gender.',
                    ],
                    examples: [
                        {
                            native: 'τὸ φῶς / τοῦ φωτός',
                            translit: 'to phōs / tou phōtos',
                            gloss: 'the light / of the light',
                            note: 'The nominative hides the stem φωτ-; the genitive shows it.',
                        },
                    ],
                },
                {
                    heading: 'Reading a title',
                    paragraphs: [
                        'The first treatise of the Corpus Hermeticum is headed Ἑρμοῦ Τρισμεγίστου Ποιμάνδρης: Ἑρμοῦ, genitive of Ἑρμῆς; Τρισμεγίστου, genitive of Τρισμέγιστος, \'thrice-greatest\', agreeing with it; Ποιμάνδρης, nominative, the title proper. Compare the first four words of Matthew 1:1, Βίβλος γενέσεως Ἰησοῦ Χριστοῦ — a nominative followed by genitives, each depending on the word before.',
                        'The name Ποιμάνδρης is itself unsettled, and you should say so when you translate it. Read as Greek it suggests ποιμὴν ἀνδρῶν, \'shepherd of men\'; an influential alternative derives it from Egyptian, p-eime nte-rē, \'the knowledge of Re\', which would suit a treatise where the divine Mind instructs a seer in Egypt. Neither is proved.',
                    ],
                    examples: [
                        {
                            native: 'Ἑρμοῦ Τρισμεγίστου Ποιμάνδρης',
                            translit: 'Hermou Trismegistou Poimandrēs',
                            gloss: 'The Poimandres of Hermes Trismegistus',
                            note: 'Corpus Hermeticum I, title: two genitives before the nominative.',
                        },
                        {
                            native: 'Βίβλος γενέσεως Ἰησοῦ Χριστοῦ',
                            translit: 'Biblos geneseōs Iēsou Christou',
                            gloss: 'Book of the genesis of Jesus Christ',
                            note: 'The opening words of Matthew 1:1: a chain of genitives.',
                        },
                    ],
                },
                {
                    heading: 'The dative and the accusative',
                    paragraphs: [
                        'Two more cases, and you will meet both within three lessons. The dative covers \'to\', \'for\', \'with\', \'by\' and \'in\'; the accusative is the direct object and the case of motion towards. First-declension datives end -ῃ or -ᾳ, second-declension -ῳ, third-declension -ι, and all three write that iota beneath the vowel where they can: τῇ ψυχῇ, τῷ λόγῳ, τῷ φωτί. Accusatives end -ην or -αν, -ον, and -α or -ν in the third.',
                        'Prepositions are the quickest way to fix them, because most govern one case and mean one thing with it. ἐν takes the dative and means \'in\'; εἰς takes the accusative and means \'into\'; πρός with the accusative is \'towards, with\'; διά with the genitive is \'through\'. So the first three words of lesson eight, ἐν ἀρχῇ, are simply ἐν with the dative of ἡ ἀρχή, and the phrase πρὸς τὸν θεόν is πρός with the accusative of ὁ θεός.',
                        'The neuter rule from the last lesson holds for nouns as it did for the article: τὸ φῶς is both nominative and accusative, and there is nothing in the form to say which. Only the sense and the surrounding words decide — which is precisely the problem John 1:5 sets, where αὐτό could in principle be either.',
                    ],
                    examples: [
                        {
                            native: 'ἡ ψυχή, τῆς ψυχῆς, τῇ ψυχῇ, τὴν ψυχήν',
                            translit: 'hē psychē, tēs psychēs, tēi psychēi, tēn psychēn',
                            gloss: 'the soul — nominative, genitive, dative, accusative',
                            note: 'First declension in -η. The dative iota is written beneath.',
                        },
                        {
                            native: 'ὁ λόγος, τοῦ λόγου, τῷ λόγῳ, τὸν λόγον',
                            translit: 'ho logos, tou logou, tōi logōi, ton logon',
                            gloss: 'the word — the four cases of the second declension',
                            note: 'The commonest noun-pattern in the language.',
                        },
                        {
                            native: 'τὸ φῶς, τοῦ φωτός, τῷ φωτί, τὸ φῶς',
                            translit: 'to phōs, tou phōtos, tōi phōti, to phōs',
                            gloss: 'the light — third declension, stem φωτ-',
                            note: 'Nominative and accusative identical, as in every neuter.',
                        },
                        {
                            native: 'ἐν ἀρχῇ · εἰς τὸν αἰῶνα',
                            translit: 'en archēi · eis ton aiōna',
                            gloss: 'in the beginning · into the age, for ever',
                            note: 'ἐν always with the dative, εἰς always with the accusative.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'βίβλος',
                    translit: 'biblos',
                    gloss: 'book (feminine)',
                },
                {
                    native: 'γένεσις',
                    translit: 'genesis',
                    gloss: 'origin, coming-to-be (genitive γενέσεως)',
                },
                {
                    native: 'ποιμήν',
                    translit: 'poimēn',
                    gloss: 'shepherd (genitive ποιμένος)',
                },
                {
                    native: 'ἀνήρ',
                    translit: 'anēr',
                    gloss: 'man, husband (genitive ἀνδρός)',
                },
                {
                    native: 'προφήτης',
                    translit: 'prophētēs',
                    gloss: 'prophet, spokesman',
                },
                {
                    native: 'φῶς',
                    translit: 'phōs',
                    gloss: 'light (genitive φωτός)',
                },
                {
                    native: 'ἐν',
                    translit: 'en',
                    gloss: 'in, among (+ dative)',
                },
                {
                    native: 'εἰς',
                    translit: 'eis',
                    gloss: 'into, to (+ accusative)',
                },
                {
                    native: 'αἰών',
                    translit: 'aiōn',
                    gloss: 'age, lifetime, aeon (genitive αἰῶνος)',
                },
            ],
            exercises: [
                {
                    prompt: 'Give the genitive singular, with article, of ὁ λόγος, ἡ ψυχή and τὸ φῶς.',
                    answer: 'τοῦ λόγου, τῆς ψυχῆς, τοῦ φωτός.',
                    hint: 'Second declension, then first, then third.',
                },
                {
                    prompt: 'Translate Ἑρμοῦ Τρισμεγίστου Ποιμάνδρης, naming the case of each word.',
                    answer: '\'The Poimandres of Hermes Trismegistus\'. Ἑρμοῦ: genitive singular of Ἑρμῆς. Τρισμεγίστου: genitive singular, agreeing with it. Ποιμάνδρης: nominative singular.',
                    hint: 'Two of the three words share a case.',
                },
                {
                    prompt: 'ἡ βίβλος ends in -ος. What gender is it, and how can you tell?',
                    answer: 'Feminine — the article ἡ says so. The ending -ος is usually masculine, but a small family of nouns is feminine, and only the article or an agreeing adjective reveals it.',
                    hint: 'The ending lies; something else does not.',
                },
                {
                    prompt: 'Which form should you memorise beside the nominative of a third-declension noun, and why?',
                    answer: 'The genitive singular: the nominative is often disguised by sound change (φῶς), while the genitive shows the stem (φωτός) on which every other case is built.',
                    hint: null,
                },
                {
                    prompt: 'In Βίβλος γενέσεως, which word is genitive, and what is its nominative?',
                    answer: 'γενέσεως, genitive singular; its nominative is ἡ γένεσις, third declension.',
                    hint: 'The first word heads the phrase, so it is not the one bending.',
                },
                {
                    prompt: 'What is unsettled about the name Ποιμάνδρης?',
                    answer: 'Its derivation: Greek ποιμὴν ἀνδρῶν, \'shepherd of men\', or Egyptian p-eime nte-rē, \'the knowledge of Re\'. Neither is proved, so transliterate it as Poimandres and note both proposals.',
                    hint: 'Two languages have been proposed as its source.',
                },
                {
                    prompt: 'Put ἡ ψυχή into the dative and the accusative singular, with the article.',
                    answer: 'τῇ ψυχῇ and τὴν ψυχήν.',
                    hint: 'The dative writes its iota beneath the vowel.',
                },
                {
                    prompt: 'Which case does ἐν govern, and which εἰς? Give the phrase each makes with ἀρχή and αἰών.',
                    answer: 'ἐν takes the dative: ἐν ἀρχῇ, \'in the beginning\'. εἰς takes the accusative: εἰς τὸν αἰῶνα, \'into the age, for ever\'.',
                    hint: 'One preposition is static, the other is motion towards.',
                },
                {
                    prompt: 'You meet τὸ φῶς in a sentence. What two cases could it be, and what will settle it?',
                    answer: 'Nominative or accusative — a neuter noun never distinguishes them. Only the sense and the other words in the clause can decide.',
                    hint: 'Recall the rule that held for the neuter article.',
                },
            ],
        },
        {
            number: 5,
            title: 'The verb εἰμί and the timeless present',
            aim: 'Conjugate εἰμί, build sentences with and without a verb, learn how the article shows which noun is the subject, and parse the most famous imperative in Greek.',
            sections: [
                {
                    heading: 'εἰμί, to be',
                    paragraphs: [
                        'The present indicative runs εἰμί (I am), εἶ (you are), ἐστί(ν) (he, she, it is), ἐσμέν, ἐστέ, εἰσί(ν). The bracketed ν is movable, added before a vowel or a pause. Every form but εἶ is enclitic, surrendering its accent to the word before — hence φῶς ἐστιν; when the verb heads a sentence or means \'there exists\', it is written ἔστι(ν).',
                        'Learn also the third person singular of the imperfect, ἦν, \'he, she, it was\'. The imperfect views a state as extended through past time, with no point of beginning in sight. Memorise it now: the passage you read in lesson eight opens with ἦν four times in two verses.',
                    ],
                    examples: [
                        {
                            native: 'ἐγώ εἰμι ὁ ὤν',
                            translit: 'egō eimi ho ōn',
                            gloss: 'I am the One who is',
                            note: 'Septuagint, Exodus 3:14 — the answer from the burning bush.',
                        },
                        {
                            native: 'εἰμί, εἶ, ἐστί(ν), ἐσμέν, ἐστέ, εἰσί(ν)',
                            translit: 'eimi, ei, esti(n), esmen, este, eisi(n)',
                            gloss: 'I am, you are, he is; we are, you are, they are',
                            note: 'The present indicative entire. All but εἶ are enclitic.',
                        },
                        {
                            native: 'ἦν, ἦσθα, ἦν, ἦμεν, ἦτε, ἦσαν',
                            translit: 'ēn, ēstha, ēn, ēmen, ēte, ēsan',
                            gloss: 'I was, you were, he was; we were, you were, they were',
                            note: 'The imperfect. First and third person singular are identical.',
                        },
                        {
                            native: 'ὤν, οὖσα, ὄν · εἶναι',
                            translit: 'ōn, ousa, on · einai',
                            gloss: 'being (masculine, feminine, neuter) · to be',
                            note: 'The participle you met in ὁ ὤν, and the infinitive you will meet in Heraclitus.',
                        },
                    ],
                },
                {
                    heading: 'Sentences without a verb, and how to find the subject',
                    paragraphs: [
                        'Greek may set subject and predicate side by side and let ἐστί be understood. Plato writes ψυχὴ πᾶσα ἀθάνατος at Phaedrus 245c — \'every soul is immortal\', or \'all soul is immortal\' — with no verb at all. Which rendering is right has been argued for two centuries, since πᾶσα can distribute (\'every\') or totalise (\'all, as such\'), and the Greek does not decide it.',
                        'When two nominatives are joined by a form of εἰμί, which is the subject? The reliable rule of thumb: the noun carrying the article. So ὁ θεὸς φῶς ἐστιν (1 John 1:5) is \'God is light\', not \'light is God\'. Hold that rule steady; in lesson eight it carries the weight of the most contested clause in the New Testament.',
                    ],
                    examples: [
                        {
                            native: 'ψυχὴ πᾶσα ἀθάνατος',
                            translit: 'psychē pasa athanatos',
                            gloss: 'every soul is immortal (or: all soul is immortal)',
                            note: 'Plato, Phaedrus 245c. No verb; the rendering of πᾶσα is disputed.',
                        },
                        {
                            native: 'ὁ θεὸς φῶς ἐστιν',
                            translit: 'ho theos phōs estin',
                            gloss: 'God is light',
                            note: '1 John 1:5. The articular noun is subject; the anarthrous noun predicate.',
                        },
                    ],
                },
                {
                    heading: 'γνῶθι σεαυτόν',
                    paragraphs: [
                        'γνῶθι is the second person singular aorist active imperative of γιγνώσκω (Koine γινώσκω), built on the root aorist whose indicative is ἔγνων; σεαυτόν is the accusative of the reflexive pronoun, its object. Aspect matters more than tense here: the present imperative γίγνωσκε would mean \'be knowing, keep on knowing\', while the aorist views the act whole and demands it once — \'come to know yourself\'.',
                        'Pausanias saw the maxims in the forecourt of the temple at Delphi (10.24.1), and Plato has the Seven Sages dedicate γνῶθι σαυτόν and μηδὲν ἄγαν there as the first fruits of their wisdom (Protagoras 343b). Both σαυτόν and σεαυτόν are transmitted; Plato\'s text has the shorter form.',
                    ],
                    examples: [
                        {
                            native: 'γνῶθι σεαυτόν',
                            translit: 'gnōthi seauton',
                            gloss: 'know thyself',
                            note: 'Aorist imperative + reflexive accusative; also transmitted as γνῶθι σαυτόν.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'εἰμί',
                    translit: 'eimi',
                    gloss: 'I am',
                },
                {
                    native: 'ἐστί(ν)',
                    translit: 'esti(n)',
                    gloss: 'he, she, it is',
                },
                {
                    native: 'ἦν',
                    translit: 'ēn',
                    gloss: 'he, she, it was (imperfect)',
                },
                {
                    native: 'ἐγώ',
                    translit: 'egō',
                    gloss: 'I',
                },
                {
                    native: 'σεαυτόν',
                    translit: 'seauton',
                    gloss: 'yourself (accusative)',
                },
                {
                    native: 'γινώσκω',
                    translit: 'ginōskō',
                    gloss: 'I know, come to know',
                },
                {
                    native: 'ἀθάνατος',
                    translit: 'athanatos',
                    gloss: 'deathless, immortal',
                },
                {
                    native: 'εἶναι',
                    translit: 'einai',
                    gloss: 'to be (infinitive)',
                },
                {
                    native: 'ὤν, οὖσα, ὄν',
                    translit: 'ōn, ousa, on',
                    gloss: 'being (present participle of εἰμί)',
                },
            ],
            exercises: [
                {
                    prompt: 'Write out the present indicative of εἰμί in full.',
                    answer: 'εἰμί, εἶ, ἐστί(ν), ἐσμέν, ἐστέ, εἰσί(ν).',
                    hint: 'Six forms; two may take a movable ν.',
                },
                {
                    prompt: 'Parse γνῶθι completely.',
                    answer: 'Second person singular, aorist active imperative of γιγνώσκω (Koine γινώσκω): \'know!\', \'come to know\'.',
                    hint: 'Person, number, tense, voice, mood, then the verb.',
                },
                {
                    prompt: 'What would γίγνωσκε σεαυτόν have meant instead of γνῶθι σεαυτόν?',
                    answer: 'γίγνωσκε is present imperative and views the action as ongoing: \'be knowing yourself\'. The aorist γνῶθι commands it as a single decisive act.',
                    hint: 'The difference is aspect, not time.',
                },
                {
                    prompt: 'In ὁ θεὸς φῶς ἐστιν, which word is subject and which predicate? Give your evidence.',
                    answer: 'ὁ θεός is subject and φῶς predicate. The evidence is the article: the noun carrying it is what the sentence is about.',
                    hint: 'Ask which of the two nouns the sentence is about, and how the Greek marks it.',
                },
                {
                    prompt: 'What is ἦν, and what does its tense imply?',
                    answer: 'Third person singular imperfect indicative of εἰμί, \'he, she, it was\'. The imperfect presents a state as continuing through past time, with no beginning in view.',
                    hint: null,
                },
                {
                    prompt: 'Why does ψυχὴ πᾶσα ἀθάνατος need no verb, and what remains disputed in it?',
                    answer: 'Greek may juxtapose subject and predicate and leave ἐστί to be supplied. The dispute is over πᾶσα: \'every soul\' or \'all soul, soul as such\'.',
                    hint: 'The missing word is easy; the ambiguous one is the adjective.',
                },
                {
                    prompt: 'Give the imperfect of εἰμί in full, and name the one ambiguity in it.',
                    answer: 'ἦν, ἦσθα, ἦν, ἦμεν, ἦτε, ἦσαν. The first and third person singular are both ἦν, so only the context says whether it is \'I was\' or \'he was\'.',
                    hint: 'Six forms, but only five distinct ones.',
                },
                {
                    prompt: 'What are ὤν and εἶναι, and where has each already appeared in this course?',
                    answer: 'ὤν is the present participle of εἰμί, \'being\', met in ὁ ὤν in lesson three; εἶναι is its infinitive, \'to be\', which stands in the Heraclitus fragment quoted in lesson eight, ἓν πάντα εἶναι.',
                    hint: 'One was in a divine name, the other in a philosopher.',
                },
            ],
        },
        {
            number: 6,
            title: 'Isopsephy as reading',
            aim: 'Learn the Milesian numerals, compute values yourself, follow four attested reckonings — 318, 365, 888, 666 — and learn the discipline that keeps the method honest.',
            sections: [
                {
                    heading: 'The numeral row',
                    paragraphs: [
                        'Units: α 1, β 2, γ 3, δ 4, ε 5, digamma ϝ (in later hands the ligature stigma, ϛ) 6, ζ 7, η 8, θ 9. Tens: ι 10, κ 20, λ 30, μ 40, ν 50, ξ 60, ο 70, π 80, koppa ϟ 90. Hundreds: ρ 100, σ 200, τ 300, υ 400, φ 500, χ 600, ψ 700, ω 800, sampi ϡ 900. Three letters that died as sounds are kept solely to hold their places, which is why ζ is worth seven and not six.',
                        'Figures are marked off from words by a keraia, a small stroke like an apostrophe set after the last letter, so that τιη, marked with a keraia, is read as the figure 318 and not as three letters. Adding the letters of a word is ἰσοψηφία, \'equal-pebble-reckoning\', from ψῆφος, the counting pebble. Do the sums yourself, every time; accents and breathings count for nothing, and final ς is simply σ, worth 200.',
                    ],
                    examples: [
                        {
                            native: 'τιη',
                            translit: 'tiē = 318',
                            gloss: 'three hundred and eighteen',
                            note: 'τ 300 + ι 10 + η 8; the keraia marks the letters as figures.',
                        },
                    ],
                },
                {
                    heading: 'Four attested reckonings',
                    paragraphs: [
                        '318: the Epistle of Barnabas (9.7-8), of the early second century, gives one of the earliest surviving Christian isopsephies. Quoting a text in which Abraham circumcises three hundred and eighteen men of his household — Genesis 17:23 run together with the 318 of Genesis 14:14 — its author separates the number into its Greek figures and takes them for prophecy: ΙΗ, eighteen, is the first two letters of ΙΗΣΟΥΣ, and Τ, three hundred, is the shape of the cross.',
                        '365: Ἀβρασάξ sums to 1+2+100+1+200+1+60, the number of heavens in the Basilidean system reported by Irenaeus (Against Heresies I.24.7) and Hippolytus (Refutation VII.26). The transposed spelling Ἀβραξάς, which stands behind the Latin Abraxas, reaches the same total, though the engraved gems overwhelmingly have ΑΒΡΑΣΑΞ.',
                        '888: Ἰησοῦς sums to 10+8+200+70+400+200. Sibylline Oracles 1.324-330, part of a Christian passage worked into the first book, announces the name by its number rather than writing it: eight units, as many tens, and eight hundreds.',
                        '666: Revelation 13:18 gives the beast\'s number and tells the reader to calculate it. The critical text spells it out in words, ἑξακόσιοι ἑξήκοντα ἕξ, while many manuscripts write the figures χξϛ, 600+60+6. A variant reading, χιϛ (616), stands in the early papyrus P115 and was known to Irenaeus, who argued against it (Against Heresies V.30.1). The leading modern proposal reads the figure through the Hebrew letters of \'Nero Caesar\' — gematria in another alphabet, not Greek isopsephy.',
                    ],
                    examples: [
                        {
                            native: 'Ἀβρασάξ',
                            translit: 'Abrasax = 365',
                            gloss: 'Abrasax',
                            note: 'α 1 + β 2 + ρ 100 + α 1 + σ 200 + α 1 + ξ 60.',
                        },
                        {
                            native: 'Ἰησοῦς',
                            translit: 'Iēsous = 888',
                            gloss: 'Jesus',
                            note: 'ι 10 + η 8 + σ 200 + ο 70 + υ 400 + ς 200.',
                        },
                        {
                            native: 'περιστερά',
                            translit: 'peristera = 801',
                            gloss: 'dove',
                            note: 'Equal to α (1) + ω (800); the Marcosians made much of it (Irenaeus, Against Heresies I.14.6).',
                        },
                    ],
                },
                {
                    heading: 'The discipline of the method',
                    paragraphs: [
                        'Isopsephy proves nothing on its own, because sums are cheap: a great many words share any given total. A wall at Pompeii carries a lover\'s boast, φιλῶ ἧς ἀριθμὸς φμε, \'I love her whose number is 545\' — and the writer knew that nobody but he could invert the sum.',
                        'So watch the direction of the inference. Ancient practitioners generally began from a name they already revered and found the number confirming it; they did not derive doctrine from arithmetic. When a modern book runs the process backwards, ask which spelling was used and whether it is attested, check the arithmetic yourself, and ask how many other words reach the same figure.',
                    ],
                    examples: [
                        {
                            native: 'φῶς',
                            translit: 'phōs = 1500',
                            gloss: 'light',
                            note: 'φ 500 + ω 800 + ς 200. Compute it yourself before you believe it.',
                        },
                        {
                            native: 'ἀμήν',
                            translit: 'amēn = 99',
                            gloss: 'amen',
                            note: 'α 1 + μ 40 + η 8 + ν 50; abbreviated ϟθ in some Christian manuscripts and inscriptions.',
                        },
                        {
                            native: 'λόγος',
                            translit: 'logos = 373',
                            gloss: 'word, reason, account',
                            note: 'λ 30 + ο 70 + γ 3 + ο 70 + ς 200. The word this course turns on, reckoned.',
                        },
                        {
                            native: 'ΙΑΩ',
                            translit: 'IAŌ = 811',
                            gloss: 'Iao — the Greek rendering of the divine name',
                            note: 'ι 10 + α 1 + ω 800. Three of the seven vowels; ubiquitous on the magical gems.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'ἀριθμός',
                    translit: 'arithmos',
                    gloss: 'number',
                },
                {
                    native: 'ψῆφος',
                    translit: 'psēphos',
                    gloss: 'pebble, counter, vote',
                },
                {
                    native: 'ἰσοψηφία',
                    translit: 'isopsēphia',
                    gloss: 'isopsephy, equality of letter-sums',
                },
                {
                    native: 'θηρίον',
                    translit: 'thērion',
                    gloss: 'wild beast',
                },
                {
                    native: 'σταυρός',
                    translit: 'stauros',
                    gloss: 'stake, cross',
                },
                {
                    native: 'ἀμήν',
                    translit: 'amēn',
                    gloss: 'amen, truly (from Hebrew)',
                },
            ],
            exercises: [
                {
                    prompt: 'Add the letters of Ἰησοῦς and give the total.',
                    answer: '888 — ι 10 + η 8 + σ 200 + ο 70 + υ 400 + ς 200.',
                    hint: 'Final ς is worth the same as σ.',
                },
                {
                    prompt: 'Add the letters of Ἀβρασάξ and give the total.',
                    answer: '365 — α 1 + β 2 + ρ 100 + α 1 + σ 200 + α 1 + ξ 60.',
                    hint: 'Three alphas, and a xi worth sixty.',
                },
                {
                    prompt: 'Compute the value of φῶς.',
                    answer: '1500 — φ 500 + ω 800 + ς 200.',
                    hint: null,
                },
                {
                    prompt: 'What number is τιη, and what did the Epistle of Barnabas find in it?',
                    answer: '318. Barnabas read ΙΗ (10 + 8) as the first two letters of ΙΗΣΟΥΣ, and Τ (300) as the figure of the cross.',
                    hint: 'Split the three letters into two and one.',
                },
                {
                    prompt: 'Why is ζ worth seven rather than six?',
                    answer: 'Because the sixth place belongs to digamma (ϝ), written stigma (ϛ) in later hands, which died as a sound but was kept as a figure; every letter after it is displaced by one.',
                    hint: null,
                },
                {
                    prompt: 'Compute περιστερά, and say why the Marcosians cared about the result.',
                    answer: '801 — π 80 + ε 5 + ρ 100 + ι 10 + σ 200 + τ 300 + ε 5 + ρ 100 + α 1. Since α is 1 and ω is 800, the dove bears the number of the Alpha and the Omega together.',
                    hint: 'Add the first and last letters of the alphabet too.',
                },
                {
                    prompt: 'Write 666 in Greek figures, and give the ancient variant with its evidence.',
                    answer: 'χξϛ (600 + 60 + 6). The variant is χιϛ, 616, in the papyrus P115 and known to Irenaeus, who rejected it.',
                    hint: 'Change the middle letter and the tens change with it.',
                },
                {
                    prompt: 'Compute φμε, the number of the woman on the Pompeian wall.',
                    answer: '545 — φ 500 + μ 40 + ε 5.',
                    hint: 'Three figures: a hundreds, a tens, a units.',
                },
                {
                    prompt: 'Compute λόγος.',
                    answer: '373 — λ 30 + ο 70 + γ 3 + ο 70 + ς 200.',
                    hint: 'Two omicrons, and a final sigma still worth two hundred.',
                },
                {
                    prompt: 'Compute ΙΑΩ, and say what is notable about the letters chosen.',
                    answer: '811 — ι 10 + α 1 + ω 800. All three are vowels, drawn from the seven of lesson two, which is why the name is chanted rather than merely spelled.',
                    hint: 'Ask which class of letter the name is made of.',
                },
            ],
        },
        {
            number: 7,
            title: 'Small texts entire',
            aim: 'Read short texts with every word accounted for: two Delphic maxims, the line the gold leaves put in the mouth of the dead, and a formula from the magical papyri.',
            sections: [
                {
                    heading: 'The maxims',
                    paragraphs: [
                        'γνῶθι σαυτόν and μηδὲν ἄγαν stood in the forecourt of the temple at Delphi, with a third regularly transmitted beside them: ἐγγύα πάρα δ\' ἄτα, \'give a pledge, and ruin is at hand\' — a reminder that the maxims are practical counsel before they are anything mystical.',
                        'Parse μηδὲν ἄγαν. μηδέν is the neuter of μηδείς, \'nothing\'; the μη- form belongs to prohibitions and wishes, where a statement of fact would take οὐδέν. ἄγαν is an adverb, \'too much\'. No verb is needed. The maxims travelled far: a list was inscribed at Ai Khanoum on the Oxus, in Hellenistic Bactria, where an epigram credits a Clearchus with copying them at Delphi, and a longer collection of one hundred and forty-seven survives under the name of Sosiades, preserved by Stobaeus.',
                    ],
                    examples: [
                        {
                            native: 'μηδὲν ἄγαν',
                            translit: 'mēden agan',
                            gloss: 'nothing too much',
                            note: 'Pronoun + adverb, no verb; note the grave on μηδέν before the next word.',
                        },
                    ],
                },
                {
                    heading: 'The gold leaf',
                    paragraphs: [
                        'From about 400 BCE onwards, thin gold sheets inscribed with instructions for the soul were buried with the dead in southern Italy, Thessaly and Crete. Scholars call them Orphic or Bacchic; the label is a modern convenience, and the texts name no school. The leaf from Petelia, now in the British Museum, gives the dead their password. It opens: Γῆς παῖς εἰμι καὶ Οὐρανοῦ ἀστερόεντος, αὐτὰρ ἐμοὶ γένος οὐράνιον. More follows on the leaf; this is its first line and a half.',
                        'Construe it. Γῆς is genitive of γῆ, \'Earth\', a genitive of parentage; παῖς is nominative, \'child\'; εἰμι is your verb from lesson five, here unaccented because it is enclitic; Οὐρανοῦ is genitive of οὐρανός, with ἀστερόεντος, genitive of the adjective ἀστερόεις, \'starry\', agreeing with it. The second clause has no verb at all: ἐμοί is a dative of possession, γένος a neuter nominative, \'lineage\', οὐράνιον a neuter adjective agreeing with it. The leaves vary from burial to burial — the Hipponion leaf has the Doric Γᾶς — so this is the Petelia text as standardly printed, not a fixed scripture.',
                    ],
                    examples: [
                        {
                            native: 'Γῆς παῖς εἰμι καὶ Οὐρανοῦ ἀστερόεντος',
                            translit: 'Gēs pais eimi kai Ouranou asteroentos',
                            gloss: 'I am a child of Earth and of starry Heaven',
                            note: 'Petelia gold leaf, British Museum.',
                        },
                        {
                            native: 'αὐτὰρ ἐμοὶ γένος οὐράνιον',
                            translit: 'autar emoi genos ouranion',
                            gloss: 'but my lineage is heavenly',
                            note: 'Verbless: literally \'but to me the lineage is heavenly\'.',
                        },
                    ],
                },
                {
                    heading: 'A line from the papyri',
                    paragraphs: [
                        'The commonest sentence-shape in the Greek magical papyri is the self-identification: ἐγώ εἰμι followed by a name or title, by which the operator assumes the authority of a god or power. In the rite of the Headless One (PGM V.96-172) the operator declares ἐγώ εἰμι ὁ ἀκέφαλος δαίμων — every word within your reach, down to ἀκέφαλος, from ἀ- privative and κεφαλή, \'head\', and δαίμων, third declension, genitive δαίμονος.',
                        'Two cautions. δαίμων here is not the demon of later Christian usage but a spirit or power of no fixed moral colour. And editors differ over whether ἀκέφαλος is a title, \'the Headless One\', a figure with its own iconography on the magical gems, or a plain description; the papyrus varies in wording between passages and editions, so cite the text you are actually reading.',
                    ],
                    examples: [
                        {
                            native: 'ἐγώ εἰμι ὁ ἀκέφαλος δαίμων',
                            translit: 'egō eimi ho akephalos daimōn',
                            gloss: 'I am the headless daimon',
                            note: 'The self-identification formula of the Headless rite, PGM V.96-172.',
                        },
                    ],
                },
                {
                    heading: 'The names that cannot be read',
                    paragraphs: [
                        'Among the Greek of the papyri stand strings that are not Greek at all: ΑΒΛΑΝΑΘΑΝΑΛΒΑ, ΑΚΡΑΜΜΑΧΑΜΑΡΕΙ, and hundreds more. The ancient term for them is ὀνόματα βάρβαρα, \'barbarous names\' — barbarous in the plain Greek sense of foreign, not of savage. They are the commonest words on the Greco-Egyptian amulets, and they are untranslatable by design.',
                        'ΑΒΛΑΝΑΘΑΝΑΛΒΑ is a palindrome of thirteen letters, identical read either way, and that symmetry is plainly the point. A derivation from Aramaic, roughly \'thou art our father\', is old and often repeated but genuinely uncertain; ΑΚΡΑΜΜΑΧΑΜΑΡΕΙ has no accepted etymology at all and its spelling shifts from gem to gem. Both are often cut as a diminishing wing, one letter pared away each line, so that the name dwindles on the stone as the affliction is meant to.',
                        'You can read every letter of them and understand nothing, and that is the correct result. Iamblichus makes the argument explicitly at De mysteriis VII.4-5: such names must never be translated, because what works is the sound and not any sense a Greek could give it. Set that beside lesson six and the shape of the whole tradition appears — a name may be operative as number, as sound, or as symmetry, and in none of those cases does meaning do the work.',
                    ],
                    examples: [
                        {
                            native: 'ΑΒΛΑΝΑΘΑΝΑΛΒΑ',
                            translit: 'Ablanathanalba',
                            gloss: 'untranslated: a name of power',
                            note: 'Thirteen letters, an exact palindrome. The Aramaic derivation is old and unproven.',
                        },
                        {
                            native: 'ΑΚΡΑΜΜΑΧΑΜΑΡΕΙ',
                            translit: 'Akrammachamarei',
                            gloss: 'untranslated: a name of power',
                            note: 'No accepted etymology; the spelling varies across the gems.',
                        },
                        {
                            native: 'ὀνόματα βάρβαρα',
                            translit: 'onomata barbara',
                            gloss: 'barbarous names, foreign names',
                            note: 'Neuter plural noun and adjective. βάρβαρος means foreign-speaking, nothing worse.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'γῆ',
                    translit: 'gē',
                    gloss: 'earth, land (genitive γῆς)',
                },
                {
                    native: 'οὐρανός',
                    translit: 'ouranos',
                    gloss: 'heaven, sky',
                },
                {
                    native: 'παῖς',
                    translit: 'pais',
                    gloss: 'child (genitive παιδός)',
                },
                {
                    native: 'γένος',
                    translit: 'genos',
                    gloss: 'race, lineage, kind',
                },
                {
                    native: 'ἄγαν',
                    translit: 'agan',
                    gloss: 'too much, excessively',
                },
                {
                    native: 'μηδέν',
                    translit: 'mēden',
                    gloss: 'nothing (in prohibitions and wishes)',
                },
                {
                    native: 'δαίμων',
                    translit: 'daimōn',
                    gloss: 'spirit, divine power',
                },
                {
                    native: 'ἀστερόεις',
                    translit: 'asteroeis',
                    gloss: 'starry',
                },
                {
                    native: 'βάρβαρος',
                    translit: 'barbaros',
                    gloss: 'foreign, foreign-speaking',
                },
                {
                    native: 'ἀκέφαλος',
                    translit: 'akephalos',
                    gloss: 'headless (ἀ- privative + κεφαλή)',
                },
            ],
            exercises: [
                {
                    prompt: 'Translate μηδὲν ἄγαν and account for the absence of a verb.',
                    answer: '\'Nothing too much\' (nothing in excess). μηδέν is the neuter of μηδείς, with the adverb ἄγαν; nothing more is needed, and the prohibitive μη- form carries the imperative force by itself.',
                    hint: 'Two words: a pronoun and an adverb.',
                },
                {
                    prompt: 'In Γῆς παῖς εἰμι, what case is Γῆς, and what is it doing?',
                    answer: 'Genitive singular of γῆ, \'Earth\' — a genitive of parentage depending on παῖς: \'child of Earth\'.',
                    hint: 'The English \'of\' is your clue.',
                },
                {
                    prompt: 'What does ἀστερόεντος agree with, and in what respects?',
                    answer: 'With Οὐρανοῦ — in gender (masculine), number (singular) and case (genitive).',
                    hint: 'An adjective agrees in three things at once.',
                },
                {
                    prompt: 'Translate the whole of the Petelia line and a half quoted above.',
                    answer: '\'I am a child of Earth and of starry Heaven; but my lineage is heavenly.\'',
                    hint: 'The second clause has a dative of possession and no verb.',
                },
                {
                    prompt: 'Where besides Delphi were the maxims inscribed, and under whose name did a longer collection circulate?',
                    answer: 'At Ai Khanoum in Hellenistic Bactria, where an epigram credits a Clearchus with copying them at Delphi; a list of one hundred and forty-seven circulated under the name of Sosiades, preserved by Stobaeus.',
                    hint: 'One site is remarkably far east of Greece.',
                },
                {
                    prompt: 'Parse ἀκέφαλος, and say why \'demon\' is a poor rendering of δαίμων here.',
                    answer: 'ἀκέφαλος: adjective, masculine nominative singular, agreeing with δαίμων; ἀ- privative + κεφαλή, \'head\'. δαίμων in the papyri means a spirit of no fixed moral colour, so \'demon\' imports the later Christian sense.',
                    hint: null,
                },
                {
                    prompt: 'What does βάρβαρος mean in the phrase ὀνόματα βάρβαρα, and what does it not mean?',
                    answer: 'Foreign, foreign-speaking. It carries none of the English sense of savage or cruel; the names are simply not Greek.',
                    hint: 'The word describes a language, not a character.',
                },
                {
                    prompt: 'What is formally remarkable about ΑΒΛΑΝΑΘΑΝΑΛΒΑ, and what did Iamblichus say should be done with such names?',
                    answer: 'It is an exact palindrome of thirteen letters. Iamblichus argues at De mysteriis VII.4-5 that such names must never be translated, since their power lies in the sounds and not in any meaning.',
                    hint: 'Read it backwards first.',
                },
            ],
        },
        {
            number: 8,
            title: 'In the beginning was the Word',
            aim: 'Read John 1:1-5 clause by clause with nothing concealed, including where the Greek is genuinely undecided, and parse the motto inside the alchemists\' serpent, ἓν τὸ πᾶν.',
            sections: [
                {
                    heading: 'Ἐν ἀρχῇ ἦν ὁ λόγος',
                    paragraphs: [
                        'The first two verses run: Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος. οὗτος ἦν ἐν ἀρχῇ πρὸς τὸν θεόν. ἐν takes the dative, so ἀρχῇ is dative singular of ἡ ἀρχή; the phrase is the Septuagint\'s opening of Genesis, ἐν ἀρχῇ ἐποίησεν ὁ θεός, quoted to be heard.',
                        'ἦν is the imperfect of εἰμί, chosen with care: it presents a state as continuing, with no point of beginning in view, and in verse 3 it will be set against ἐγένετο, the aorist \'came to be\'. As for πρὸς τὸν θεόν, πρός with the accusative has the root sense \'towards\', but for being in someone\'s company it is ordinary Koine; the older claim that the preposition here proves a face-to-face intimacy overreads it.',
                    ],
                    examples: [
                        {
                            native: 'Ἐν ἀρχῇ ἦν ὁ λόγος',
                            translit: 'En archē ēn ho logos',
                            gloss: 'In the beginning was the Word',
                            note: 'ἀρχῇ: dative after ἐν. ἦν: imperfect of εἰμί.',
                        },
                        {
                            native: 'καὶ ὁ λόγος ἦν πρὸς τὸν θεόν',
                            translit: 'kai ho logos ēn pros ton theon',
                            gloss: 'and the Word was with God',
                            note: 'πρός + accusative, of presence and orientation.',
                        },
                        {
                            native: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
                            translit: 'En archēi ēn ho logos, kai ho logos ēn pros ton theon, kai theos ēn ho logos.',
                            gloss: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
                            note: 'John 1:1 entire. Every word in it has been taught: ἐν with the dative, the article, the imperfect of εἰμί, πρός with the accusative.',
                        },
                    ],
                },
                {
                    heading: 'καὶ θεὸς ἦν ὁ λόγος',
                    paragraphs: [
                        'Apply the rule from lesson five. Two nouns stand in the nominative with ἦν between them, and the one carrying the article is the subject: ὁ λόγος is what the sentence is about, while θεός, standing bare, is the predicate, pulled to the front for emphasis. John did not write ὁ θεὸς ἦν ὁ λόγος, which would make the two convertible, simply the same without remainder.',
                        'E. C. Colwell observed in 1933 that definite predicate nouns preceding the verb regularly drop the article; P. B. Harner argued in 1973 that the force here is rather qualitative, saying what the Word is in nature. So \'was God\', \'was divine\' and \'was a god\' all have defenders: the syntax excludes plain identity but does not settle the rest, and what follows is a judgement about John\'s theology and the Greek of his period.',
                    ],
                    examples: [
                        {
                            native: 'καὶ θεὸς ἦν ὁ λόγος',
                            translit: 'kai theos ēn ho logos',
                            gloss: 'and the Word was God',
                            note: 'ὁ λόγος is subject (it has the article); θεός is the fronted, anarthrous predicate.',
                        },
                    ],
                },
                {
                    heading: 'Life, light, and the darkness',
                    paragraphs: [
                        'Verse 3: πάντα δι\' αὐτοῦ ἐγένετο, καὶ χωρὶς αὐτοῦ ἐγένετο οὐδὲ ἕν — \'all things came to be through him, and without him came to be not even one thing\'. πάντα is a neuter plural subject, and a neuter plural subject regularly takes a singular verb, hence ἐγένετο and not ἐγένοντο; διά with the genitive expresses agency or means.',
                        'Then a genuine crux, and it is one of punctuation, not of wording: do the next two words, ὃ γέγονεν, \'that which has come to be\', close verse 3 or open verse 4? The oldest manuscripts have no punctuation to tell us. Many early fathers took the words with what follows, and the modern critical editions from Nestle-Aland 27 onwards print the stop before them, so that verse 4 begins ὃ γέγονεν ἐν αὐτῷ ζωὴ ἦν. Older editions, and most English versions, attach them to verse 3: \'without him was not any thing made that was made\'. The letters are certain and the sense is not.',
                        'Verses 4 and 5, as those editions punctuate them, run: ὃ γέγονεν ἐν αὐτῷ ζωὴ ἦν, καὶ ἡ ζωὴ ἦν τὸ φῶς τῶν ἀνθρώπων· καὶ τὸ φῶς ἐν τῇ σκοτίᾳ φαίνει, καὶ ἡ σκοτία αὐτὸ οὐ κατέλαβεν. Notice that φαίνει is present in a passage otherwise past — the shining is not over — and that κατέλαβεν, aorist of καταλαμβάνω, carries both attested senses \'seize, overpower\' and \'grasp, understand\', whence \'did not overcome it\' against the Vulgate\'s comprehenderunt.',
                    ],
                    examples: [
                        {
                            native: 'πάντα δι\' αὐτοῦ ἐγένετο',
                            translit: 'panta di\' autou egeneto',
                            gloss: 'all things came to be through him',
                            note: 'Neuter plural subject with a singular verb — a standing rule of Greek.',
                        },
                        {
                            native: 'καὶ ἡ σκοτία αὐτὸ οὐ κατέλαβεν',
                            translit: 'kai hē skotia auto ou katelaben',
                            gloss: 'and the darkness did not overcome (or comprehend) it',
                            note: 'αὐτό is neuter, referring back to τὸ φῶς.',
                        },
                    ],
                },
                {
                    heading: 'ἓν τὸ πᾶν',
                    paragraphs: [
                        'Parse the motto. ἕν is the neuter nominative singular of εἷς, \'one\' — written ἓν here, with a grave, because an acute on a final syllable is lowered when another word follows. τό is the neuter article, and πᾶν the neuter of πᾶς made a noun by it: \'the All\'. There is no verb; ἐστί is understood. Since the articular noun is the subject, the sense is \'the All is one\'.',
                        'The motto is written inside the ouroboros, the serpent devouring its own tail, in the diagram known as the Chrysopoeia of Cleopatra, which survives in Byzantine manuscripts of the Greek alchemical corpus, chief among them Marcianus graecus 299 of the tenth or eleventh century. Those manuscripts copy older material, but how far back the diagram itself goes cannot be fixed, and you should not date it more confidently than the evidence allows.',
                        'The thought is older still. In the fragment Hippolytus preserves (Diels-Kranz 22 B50), Heraclitus says it is wise to listen not to him but to the λόγος, and to agree ἓν πάντα εἶναι, \'that all things are one\'. There, in one sentence from about 500 BCE, are both the terms this course has taught you to read.',
                    ],
                    examples: [
                        {
                            native: 'ἓν τὸ πᾶν',
                            translit: 'hen to pan',
                            gloss: 'the All is one',
                            note: 'Neuter predicate + articular subject, ἐστί understood; written within the ouroboros of the Chrysopoeia of Cleopatra.',
                        },
                        {
                            native: 'ἓν πάντα εἶναι',
                            translit: 'hen panta einai',
                            gloss: 'that all things are one',
                            note: 'Heraclitus, fragment B50, quoted by Hippolytus; εἶναι is the infinitive of εἰμί.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'πρός',
                    translit: 'pros',
                    gloss: 'towards, with (+ accusative)',
                },
                {
                    native: 'ἐγένετο',
                    translit: 'egeneto',
                    gloss: 'came to be (aorist of γίνομαι)',
                },
                {
                    native: 'διά',
                    translit: 'dia',
                    gloss: 'through (+ genitive)',
                },
                {
                    native: 'χωρίς',
                    translit: 'chōris',
                    gloss: 'apart from, without (+ genitive)',
                },
                {
                    native: 'σκοτία',
                    translit: 'skotia',
                    gloss: 'darkness',
                },
                {
                    native: 'φαίνω',
                    translit: 'phainō',
                    gloss: 'I shine, appear (φαίνει, \'it shines\')',
                },
                {
                    native: 'καταλαμβάνω',
                    translit: 'katalambanō',
                    gloss: 'I seize, overcome; I grasp, comprehend',
                },
                {
                    native: 'οὗτος',
                    translit: 'houtos',
                    gloss: 'this, this one',
                },
            ],
            exercises: [
                {
                    prompt: 'Translate Ἐν ἀρχῇ ἦν ὁ λόγος, and parse ἀρχῇ and ἦν.',
                    answer: '\'In the beginning was the Word.\' ἀρχῇ: dative singular of ἡ ἀρχή, governed by ἐν. ἦν: third person singular imperfect indicative of εἰμί, presenting the state as continuous.',
                    hint: 'One noun governed by a preposition, one verb of being.',
                },
                {
                    prompt: 'In καὶ θεὸς ἦν ὁ λόγος, which noun is the subject? Give your evidence.',
                    answer: 'ὁ λόγος, because it carries the article; θεός, without the article, is the predicate, fronted for emphasis.',
                    hint: 'Only one of the two nouns has an article.',
                },
                {
                    prompt: 'Why can grammar alone not settle whether θεός here means \'God\', \'divine\' or \'a god\'?',
                    answer: 'Because an anarthrous predicate noun before the verb is regularly either definite (Colwell, 1933) or qualitative (Harner, 1973). The construction rules out convertible identity with ὁ θεός, but the choice among renderings depends on judgements about John\'s theology and Koine usage, not on syntax alone.',
                    hint: 'Two names and two dates in the modern discussion.',
                },
                {
                    prompt: 'Why is ἐγένετο singular when its subject πάντα is plural?',
                    answer: 'Because a neuter plural subject regularly takes a singular verb in Greek.',
                    hint: null,
                },
                {
                    prompt: 'Give the two established senses of κατέλαβεν and the resulting translations of John 1:5.',
                    answer: 'καταλαμβάνω means both \'seize, overpower\' and \'grasp, understand\'. Hence \'the darkness did not overcome it\' and \'the darkness did not comprehend it\', the latter behind the Vulgate\'s comprehenderunt.',
                    hint: 'One verb, two English families of meaning.',
                },
                {
                    prompt: 'What is disputed about the words ὃ γέγονεν, and what kind of evidence would settle it?',
                    answer: 'Whether they close verse 3 (\'not one thing that has come to be\') or open verse 4 (\'that which has come to be was life in him\'). Only punctuation could settle it, and the oldest manuscripts have none; ancient authors quote it both ways, and editions differ — Nestle-Aland from the 27th edition takes the words with verse 4, while most English versions keep them in verse 3.',
                    hint: 'The problem is not the letters but the pointing.',
                },
                {
                    prompt: 'Parse ἓν τὸ πᾶν word by word and translate it.',
                    answer: 'ἕν: neuter nominative singular of εἷς, \'one\', written with a grave because another word follows. τό: neuter nominative singular of the article. πᾶν: neuter of πᾶς, made a noun by the article, \'the All\'. No verb is expressed; ἐστί is understood. The articular noun is the subject: \'The All is one.\'',
                    hint: 'Three words, one of them only there to make a noun of the third.',
                },
                {
                    prompt: 'Where does ἓν τὸ πᾶν actually appear, and how confidently can it be dated?',
                    answer: 'Within the ouroboros of the diagram called the Chrysopoeia of Cleopatra, preserved in Byzantine manuscripts of the Greek alchemical corpus, notably Marcianus graecus 299. The manuscripts copy older material, so motto and diagram are older than the copies, but they cannot be dated precisely.',
                    hint: 'Name the manuscript tradition, then admit what it cannot tell you.',
                },
                {
                    prompt: 'Take John 1:1 whole and name the grammar of each clause: what governs ἀρχῇ, what case follows πρός, and which noun is the subject of the third clause.',
                    answer: 'ἐν governs ἀρχῇ, dative. πρός takes the accusative, τὸν θεόν. In the third clause ὁ λόγος is the subject, because it carries the article; θεός stands bare as the fronted predicate.',
                    hint: 'One preposition with the dative, one with the accusative, and one article that settles a subject.',
                },
            ],
        },
    ],
};
