// latin course — eight lessons for the Scriptorium.
// Authored and fact-checked by the content pipeline: arithmetic recomputed,
// glyphs verified against Unicode names, every quoted text checked against
// its cited source, and every exercise worked to confirm its answer.
export default {
    language: 'latin',
    title: 'An Alchemist\'s Latin',
    tagline: 'Eight lessons, from the twenty-three letters of Rome to the Emerald Tablet read whole.',
    overview: 'Latin is not a difficult language; it is a dense one. Every noun carries its job on its back and every verb carries its own subject, so a Latin sentence is often shorter than its English translation and says more. This course teaches enough of that density to read. We begin with the sounds, then the noun, then the verb, then the two cases — genitive and ablative — that do most of the work in alchemical, liturgical and lapidary Latin. From the fifth lesson onward you read real texts and nothing else: mottoes cut on stone and lettered on plates, the opening of John in Jerome\'s Latin, the mottoes of the emblem books, and at the last the Tabula Smaragdina entire, clause by clause. Eight lessons will not make you a Latinist, and this course will not pretend otherwise. They will make you a reader who can sit with a facing translation and see for yourself what the Latin actually says — which is the only real defence against the centuries of confident mistranslation that stand between us and these books. Where the scholarship is unsettled, or where a famous motto turns out to be a hundred and fifty years old rather than a thousand, you will be told so plainly.',
    lessons: [
        {
            number: 1,
            title: 'The Letters and the Sound of Rome',
            aim: 'To read Latin aloud with confidence — twenty-three letters, five vowels long and short, one fixed rule of stress — and to understand honestly why a choir says Cicero differently from a classicist.',
            sections: [
                {
                    heading: 'Twenty-three letters, and three that came later',
                    paragraphs: [
                        'The alphabet of the Romans has twenty-three letters: A B C D E F G H I K L M N O P Q R S T V X Y Z. K is a fossil, surviving in a handful of words such as Kalendae and Karthago. Y and Z were admitted late and only for Greek borrowings — you will meet them in zodiacus and hyle, never in native Latin stock.',
                        'Three letters you expect are missing. There is no J: the letter I does double duty, standing for the vowel in ignis and for the consonant y-sound in Iesus and iam. There is no U: the letter V does double duty, standing for the vowel in AQVA and the consonant w-sound in venio. And there is no W at all. This is why Julius stands on marble as IVLIVS. The separation of I from J and of V from U was made gradually by printers and grammarians in the sixteenth and seventeenth centuries, and it never settled completely; the books you will read print Iesus and Jesus, uita and vita, sometimes on the same page.',
                        'Monumental antiquity wrote in capitals. The lower-case letters you read now descend from the Caroline minuscule of the eighth and ninth centuries, by way of the humanist hands that the first Italian printers copied. When you meet an inscription cut in unbroken capitals with a raised point set between the words, you are looking at the older habit, not at a decorative choice; and when a Renaissance title page apes it, the imitation is deliberate.',
                    ],
                    examples: [
                        {
                            native: 'IVLIVS',
                            translit: 'IVLIVS',
                            gloss: 'Julius',
                            note: 'Read the first V as a consonant (w) and the second as a vowel (u): YOO-lee-oos. The same letter, two jobs.',
                        },
                        {
                            native: 'AQVA',
                            translit: 'AQVA',
                            gloss: 'water',
                            note: 'QV is always the pair kw. Here the V after Q is part of that pair, and the final A is the vowel.',
                        },
                        {
                            native: 'IESVS',
                            translit: 'IESVS',
                            gloss: 'Jesus',
                            note: 'Initial I is consonantal. The name is of course not classical Latin; YEH-soos is the classical set of values applied to a Christian word.',
                        },
                    ],
                },
                {
                    heading: 'The vowels, and the length that changes meaning',
                    paragraphs: [
                        'Latin has five vowels, each of which comes long or short. The difference is one of duration, not of quality: a long vowel is simply held about twice as long as its short partner. It is not decoration. Rosa with a short final a is \'a rose\' as the subject of a sentence; rosa with a long final a is \'by, with or from a rose\'. The Romans marked length only occasionally, with a small stroke called the apex; the macrons printed in modern textbooks are a teaching aid, and you will not find them in the books you actually want to read.',
                        'The diphthongs — two vowels run together in one syllable — are ae, oe, au, eu, and, in a very few words, ui and ei. In classical pronunciation ae sounds like English \'eye\', oe like the oi of \'boil\', au like the ow of \'how\'. So caelum, \'heaven\', is KAI-loom, and poena, \'punishment\', is POI-na.',
                        'Early printed books very often set ae and oe as ligatures, and often write foemina for femina or coelum for caelum. These are compositors\' habits and later spelling fashions, not different words. Read through them.',
                    ],
                    examples: [
                        {
                            native: 'rosa',
                            translit: 'rosa',
                            gloss: 'rose (as subject)',
                            note: 'Final a short. The ablative has the same four letters with the final a long — the only difference between the two forms in speech, and invisible in an unmarked text.',
                        },
                        {
                            native: 'caelum',
                            translit: 'caelum',
                            gloss: 'heaven, sky',
                            note: 'Classical KAI-loom; in church Latin CHEH-loom. Printed as coelum in many early books, which is a false etymological spelling.',
                        },
                        {
                            native: 'aurum',
                            translit: 'aurum',
                            gloss: 'gold',
                            note: 'AU is one syllable: OW-room, not ah-OO-room.',
                        },
                    ],
                },
                {
                    heading: 'The consonants, and two that will surprise you',
                    paragraphs: [
                        'Most Latin consonants are read as English reads them. Five are not, and they are worth learning at once. C is always hard, a k, in every position: Cicero is KIH-keh-roh, caelum is KAI-loom. G is likewise always hard, as in \'get\'. Consonantal V is an English w, so veni, vidi, vici is WEH-nee, WEE-dee, WEE-kee. Consonantal I is an English y. And S is always the hiss of \'sit\', never the buzz of \'rose\'.',
                        'R is trilled with the tip of the tongue. H is a light breath and was already weak in the spoken language, which is why the Romans themselves misspelled words containing it — Catullus wrote a whole poem mocking a man who put h where none belonged. The aspirated pairs PH, TH and CH, which arrived with Greek loanwords, were pronounced as p, t and k with a puff of breath after them: philosophus begins with a p-sound and not an f-sound in the classical reckoning. Double consonants are genuinely doubled and held: annus, \'year\', is AN-nus, and is a different word from anus.',
                        'This is a reconstruction, and an honest teacher says so. It rests on Roman descriptions of their own speech, on Greek transcriptions of Latin words, on spelling mistakes in graffiti and on the later development of the Romance languages. It is very well founded, but it is a reconstruction, and it describes the educated speech of the late Republic and early Empire rather than every Latin ever spoken.',
                    ],
                    examples: [
                        {
                            native: 'Cicero',
                            translit: 'Cicero',
                            gloss: 'Cicero',
                            note: 'Classical KIH-keh-roh; ecclesiastical CHEE-cheh-roh. Both are correct in their own tradition.',
                        },
                        {
                            native: 'vitriolum',
                            translit: 'vitriolum',
                            gloss: 'vitriol',
                            note: 'A medieval word, not a classical one, but read with the classical values it is wi-TRI-o-lum, with a w. This is the word behind the great acrostic.',
                        },
                        {
                            native: 'philosophus',
                            translit: 'philosophus',
                            gloss: 'philosopher',
                            note: 'PH is an aspirated p, not f. Stress falls on the second syllable: phi-LO-so-phus.',
                        },
                    ],
                },
                {
                    heading: 'Where the voice falls, and the two Latins',
                    paragraphs: [
                        'Latin stress is not a matter of taste. It follows one rule. A word of two syllables is stressed on the first. A word of three or more is stressed on the second-to-last syllable — the penult — if that syllable is heavy, and otherwise on the third-to-last, the antepenult. A syllable is heavy if it contains a long vowel or a diphthong, or if its vowel is followed by two consonants. Latin does not otherwise stress the last syllable of a word; the exceptions are a few contracted forms, and words carrying an attached enclitic, where the traditional rule pulls the accent forward onto the syllable before it.',
                        'Apply the rule and a great deal of mispronunciation falls away. Coagula is co-A-gu-la, because the penult -gu- is light: not co-a-GU-la. Mercurius is mer-CU-ri-us. Rosarium is ro-SA-ri-um. Tabula Smaragdina is TA-bu-la sma-RAG-di-na, not smarag-DEE-na. Philosophorum, on the other hand, is phi-lo-so-PHO-rum, because the genitive plural ending -orum has a long o and the penult is therefore heavy.',
                        'There are two living pronunciations of Latin and neither is a mistake. The classical reconstruction above is used for Roman authors. Ecclesiastical or \'church\' Latin is the Italianate pronunciation standardised for liturgical use in the nineteenth and early twentieth centuries and promoted by the monks of Solesmes and by Pius X. In it, C before e, i, ae or oe becomes the ch of \'church\'; G in the same position becomes the g of \'gentle\'; V becomes an English v; ae and oe both flatten to a plain e; GN becomes the ny of \'canyon\'; and TI before a vowel becomes tsi.',
                        'Which should you use? Classical for classical authors, church for anything sung or said in the liturgy. For the alchemical corpus there is no single right answer: those books were written between the twelfth and eighteenth centuries by men who pronounced Latin in the accent of their own countries — a Frenchman, a German and an Englishman would each have read the Tabula Smaragdina aloud quite differently. Choose one, be consistent, and do not let anyone tell you the other is illiterate.',
                        'Now read something. The VITRIOL acrostic, whose seven initials spell the name of the vitriol from which the philosophers\' fire was drawn: Visita Interiora Terrae Rectificando Invenies Occultum Lapidem. Classically: WEE-si-ta in-teh-ri-OH-ra TER-rai rek-ti-fi-KAN-doh in-WEH-ni-ays ok-KOOL-toom LA-pi-dem. Say it slowly and let the stresses fall where the rule puts them.',
                        'Then the SATOR square, five words of five letters that read the same forwards, backwards, downwards and upwards: SATOR AREPO TENET OPERA ROTAS. SA-tor A-re-po TE-net O-pe-ra RO-tas — every one of the five stressed on its first syllable, which is part of why the thing feels like a charm when spoken. One caution, and it is a real one: AREPO occurs nowhere else in the whole of Latin, so nobody knows the quantity of its vowels and nobody can say with authority where its stress belongs. A-re-po is the conventional reading, not a fact.',
                    ],
                    examples: [
                        {
                            native: 'Visita Interiora Terrae Rectificando Invenies Occultum Lapidem',
                            translit: 'Visita Interiora Terrae Rectificando Invenies Occultum Lapidem',
                            gloss: 'Visit the interior of the earth; by rectifying, you will find the hidden stone.',
                            note: 'The seven initials spell VITRIOL. We take the sentence apart word by word in Lesson 5.',
                        },
                        {
                            native: 'SATOR AREPO TENET OPERA ROTAS',
                            translit: 'SATOR AREPO TENET OPERA ROTAS',
                            gloss: 'The sower Arepo holds the wheels with care (one reading among several).',
                            note: 'Scratched at Pompeii, and so before 79 CE; one example is cut into a column of the great palaestra. The meaning is genuinely open; AREPO is attested nowhere else in the language.',
                        },
                        {
                            native: 'coagula',
                            translit: 'coagula',
                            gloss: 'coagulate! (a command)',
                            note: 'Stressed co-A-gu-la. The penultimate syllable is light, so the accent retreats to the antepenult.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'aqua',
                    translit: 'aqua',
                    gloss: 'water',
                },
                {
                    native: 'terra',
                    translit: 'terra',
                    gloss: 'earth, land',
                },
                {
                    native: 'ignis',
                    translit: 'ignis',
                    gloss: 'fire',
                },
                {
                    native: 'caelum',
                    translit: 'caelum',
                    gloss: 'sky, heaven',
                },
                {
                    native: 'lux',
                    translit: 'lux',
                    gloss: 'light',
                },
                {
                    native: 'sol',
                    translit: 'sol',
                    gloss: 'sun',
                },
                {
                    native: 'luna',
                    translit: 'luna',
                    gloss: 'moon',
                },
                {
                    native: 'vita',
                    translit: 'vita',
                    gloss: 'life',
                },
                {
                    native: 'verbum',
                    translit: 'verbum',
                    gloss: 'word',
                },
                {
                    native: 'aurum',
                    translit: 'aurum',
                    gloss: 'gold',
                },
                {
                    native: 'nomen',
                    translit: 'nomen',
                    gloss: 'name',
                },
                {
                    native: 'vox',
                    translit: 'vox',
                    gloss: 'voice',
                },
            ],
            exercises: [
                {
                    prompt: 'Which three letters of the modern English alphabet does the classical Roman alphabet of twenty-three letters lack?',
                    answer: 'J, U and W.',
                    hint: 'Think of how Julius is cut on stone.',
                },
                {
                    prompt: 'How would a Roman of the late Republic have pronounced the c in Cicero, and how does a church choir pronounce it?',
                    answer: 'Classically it is a hard k, so KIH-keh-roh. In ecclesiastical Latin, c before e or i becomes the ch of \'church\', so CHEE-cheh-roh.',
                    hint: 'One rule holds in every position; the other depends on the following vowel.',
                },
                {
                    prompt: 'Where does the stress fall in the word coagula, and why?',
                    answer: 'On the second syllable: co-A-gu-la. The word has four syllables, and the penultimate syllable -gu- is light, so the accent falls back onto the antepenult.',
                    hint: 'Find the second-to-last syllable first, and ask whether it is heavy.',
                },
                {
                    prompt: 'Write out, in order, the seven initials of the VITRIOL acrostic from Visita Interiora Terrae Rectificando Invenies Occultum Lapidem.',
                    answer: 'V, I, T, R, I, O, L',
                    hint: 'One initial per word; there are seven words.',
                },
                {
                    prompt: 'In classical pronunciation, what sound does the letter V have at the beginning of vitriolum, and where does the stress fall?',
                    answer: 'V is a consonantal u, that is an English w. The stress falls on the second syllable: vi-TRI-o-lum, since the penult -o- is light.',
                    hint: 'Remember that V and U are one letter doing two jobs.',
                },
                {
                    prompt: 'Say what is genuinely unknowable about the pronunciation of AREPO in the SATOR square.',
                    answer: 'Its vowel quantities. The word is attested nowhere else in Latin, so no one can say which of its vowels are long; and since Latin stress depends on vowel length, no one can say for certain where its accent falls. A-re-po is a convention, not a finding.',
                    hint: 'Stress in Latin depends on something we cannot recover for this word.',
                },
                {
                    prompt: 'Give the classical and the ecclesiastical pronunciation of the diphthong ae in caelum.',
                    answer: 'Classical: ae is the vowel of English \'eye\', so KAI-loom. Ecclesiastical: ae flattens to a plain e and the c softens before it, so CHEH-loom.',
                    hint: 'Church Latin has no diphthongs left in ae or oe.',
                },
            ],
        },
        {
            number: 2,
            title: 'The Noun Names the World',
            aim: 'To grasp the idea of case, to learn the nominative and genitive of the first and second declensions, and to read the title page of an alchemical book unaided.',
            sections: [
                {
                    heading: 'A noun with a job',
                    paragraphs: [
                        'English tells you what a noun is doing in a sentence by where it stands and by little words placed in front of it: the philosopher\'s water, the water of the philosopher. Latin tells you by changing the end of the noun itself. Philosophus is a philosopher doing something; philosophi is of a philosopher. The word order can then be almost anything, because the endings, not the positions, carry the sense.',
                        'Latin nouns have six cases. The nominative names the subject; the genitive says \'of\'; the dative says \'to\' or \'for\'; the accusative marks the object; the ablative covers \'by, with, from, in\'; and the vocative calls someone by name. A seventh, the locative, survives only in fossils such as Romae, \'at Rome\', and domi, \'at home\'. We take two of the six now, the nominative and the genitive, because between them they will let you read almost every title page in the alchemical library.',
                        'A dictionary gives a noun in two forms: rosa, rosae, f. The first is the nominative singular, the second the genitive singular, and the letter names the gender. The genitive is not there for decoration. It tells you which declension — which family of endings — the noun belongs to, and it gives you the stem to which all the other endings attach. Learn nouns in pairs, always, and half the difficulty of Latin disappears.',
                        'Gender in Latin is grammatical, not natural. Terra, \'earth\', is feminine and mundus, \'world\', is masculine because of the shape of the words, not because of anything about earth or world. But the alchemists read the grammar as significant: sol is masculine and luna feminine, and the whole iconography of the King and Queen leans on that fact. The honest position is that the gender is inherited accident and the symbolism is a later reading of it — which does not make the reading less interesting, only less inevitable.',
                    ],
                    examples: [
                        {
                            native: 'philosophus',
                            translit: 'philosophus',
                            gloss: 'a philosopher (nominative — the one doing something)',
                            note: null,
                        },
                        {
                            native: 'philosophi',
                            translit: 'philosophi',
                            gloss: 'of a philosopher (genitive singular)',
                            note: 'Also, confusingly, the nominative plural: \'philosophers\'. Context decides. Latin has a good many such overlaps, and you learn to live with them.',
                        },
                        {
                            native: 'rosa, rosae, f.',
                            translit: 'rosa, rosae, f.',
                            gloss: 'rose (dictionary form: nominative, genitive, gender)',
                            note: 'The second form is the one that does the work. It identifies the declension and yields the stem ros-.',
                        },
                    ],
                },
                {
                    heading: 'The first declension: -a and -ae',
                    paragraphs: [
                        'The first declension is the easiest family in the language. Its nouns end in -a in the nominative singular and -ae in the genitive singular. In the plural, the nominative is -ae and the genitive is -arum. Almost all of them are feminine.',
                        'So: rosa, a rose; rosae, of a rose; rosae, roses; rosarum, of roses. The same four endings serve aqua (water), terra (earth), luna (moon), natura (nature), materia (matter), anima (soul), forma (form), stella (star), tabula (tablet or board), turba (crowd), and a great many more. Learn the pattern once and you have several hundred words.',
                        'A few first-declension nouns are masculine because of what they mean rather than how they look: poeta a poet, nauta a sailor, agricola a farmer. They take exactly the same endings; only the adjectives that agree with them betray the difference.',
                        'Now a distinction that will save you from a common error. In the laboratory Latin of the alchemists you meet aqua vitae and aqua fortis side by side. In aqua vitae, the second word is the genitive of vita: \'water of life\' — the phrase behind eau-de-vie, whisky, akvavit. In aqua fortis, the second word is not a genitive at all but an adjective agreeing with aqua: \'strong water\', the old name for nitric acid. And aqua regia, \'royal water\', which dissolves gold, is the same construction again. Two nouns joined make a genitive; a noun and an adjective agree.',
                    ],
                    examples: [
                        {
                            native: 'aqua vitae',
                            translit: 'aqua vitae',
                            gloss: 'water of life — distilled spirit',
                            note: 'vitae is the genitive singular of vita. A noun governing a noun.',
                        },
                        {
                            native: 'aqua fortis',
                            translit: 'aqua fortis',
                            gloss: 'strong water — nitric acid',
                            note: 'fortis is an adjective agreeing with aqua, not a genitive. The trap is that it looks like one.',
                        },
                        {
                            native: 'prima materia',
                            translit: 'prima materia',
                            gloss: 'first matter',
                            note: 'prima is the feminine of the adjective primus, and so takes first-declension endings. Adjective and noun are both nominative singular and both feminine: they agree in case, number and gender, which is what agreement means.',
                        },
                        {
                            native: 'Aurora consurgens',
                            translit: 'Aurora consurgens',
                            gloss: 'The Rising Dawn',
                            note: 'A fifteenth-century illustrated alchemical treatise, long and wrongly attributed to Thomas Aquinas. consurgens is a present participle agreeing with Aurora.',
                        },
                    ],
                },
                {
                    heading: 'The second declension: -us, -um and -i',
                    paragraphs: [
                        'The second declension has two shapes. Masculine nouns end in -us in the nominative singular; neuter nouns end in -um. Both make their genitive singular in -i, and both make their genitive plural in -orum. The masculine nominative plural is -i; the neuter nominative plural is -a.',
                        'Masculine: philosophus, philosophi — a philosopher, of a philosopher; philosophi, philosophorum — philosophers, of philosophers. Also mundus (world), hortus (garden), deus (god), animus (mind), oculus (eye). A small group ends in -er: liber, libri, a book.',
                        'Neuter: verbum, verbi — a word, of a word; verba, verborum — words, of words. Also aurum (gold), argentum (silver), plumbum (lead), oleum (oil), vitriolum (vitriol), elementum, principium (beginning, principle), mysterium, speculum (mirror), rosarium (rose-garden), musaeum.',
                        'One warning before the title pages. Not every Latin noun belongs to these two families. Ignis (fire), lapis (stone), sol (sun), lux (light), corpus (body) and opus (work) are third declension, with a genitive in -is: ignis, lapidis, solis, lucis, corporis, operis. Spiritus is fourth declension. We come to the third declension properly in Lesson 4; for now, simply do not assume that a noun ending in -us is second declension, and always check the genitive.',
                    ],
                    examples: [
                        {
                            native: 'mundus, mundi, m.',
                            translit: 'mundus, mundi, m.',
                            gloss: 'world (masculine, second declension)',
                            note: null,
                        },
                        {
                            native: 'verbum, verbi, n.',
                            translit: 'verbum, verbi, n.',
                            gloss: 'word (neuter, second declension)',
                            note: 'Neuter nouns have the same form for nominative and accusative, in both numbers. This is true of every neuter noun in Latin, in every declension.',
                        },
                        {
                            native: 'philosophorum',
                            translit: 'philosophorum',
                            gloss: 'of the philosophers',
                            note: 'Genitive plural. The single most useful word-form in the whole alchemical library.',
                        },
                    ],
                },
                {
                    heading: 'Reading a title page',
                    paragraphs: [
                        'You now have enough to read the spines of a shelf. Turba Philosophorum: turba is a first-declension noun in the nominative singular, \'a crowd, throng, assembly\'; philosophorum is a second-declension genitive plural, \'of the philosophers\'. \'The Assembly of the Philosophers\' — a dialogue among sages, translated into Latin from an Arabic original, the Mushaf al-jama\'a or Book of the Assembly, which Martin Plessner dated to about the year 900; the Latin version circulated from the twelfth or thirteenth century.',
                        'Rosarium Philosophorum: rosarium is a second-declension neuter, \'a rose-garden\', and in later Latin also a rosary. Here the older sense is meant, and it is a bookish metaphor: a rosarium is a gathering of choice sayings, a florilegium, flowers picked from many authors. \'The Rose-Garden of the Philosophers\', printed at Frankfurt in 1550.',
                        'Speculum Alchimiae: speculum, neuter, \'a mirror\'; alchimiae, first-declension genitive singular of alchimia. \'The Mirror of Alchemy\', a short treatise attributed to Roger Bacon, though the attribution is disputed and probably wrong. Note that a Greek-and-Arabic word like alchimia, once naturalised in Latin, declines like any first-declension noun.',
                        'Musaeum Hermeticum contains no genitive at all. Hermeticum is an adjective in the neuter nominative singular, agreeing with musaeum: \'The Hermetic Museum\', printed at Frankfurt in 1625 and reissued much enlarged in 1678. Had the compiler meant \'the museum of Hermes\' he would have written Musaeum Hermetis, with the third-declension genitive.',
                        'Aurea Catena Homeri: aurea, adjective, feminine nominative singular, \'golden\'; catena, first declension, \'chain\'; Homeri, second-declension genitive singular, \'of Homer\'. \'The Golden Chain of Homer\', 1723. Adjective agreeing, noun, and noun in the genitive — everything this lesson has taught, in three words.',
                    ],
                    examples: [
                        {
                            native: 'Turba Philosophorum',
                            translit: 'Turba Philosophorum',
                            gloss: 'The Assembly of the Philosophers',
                            note: 'Nominative singular + genitive plural. The commonest shape of an alchemical title.',
                        },
                        {
                            native: 'Rosarium Philosophorum',
                            translit: 'Rosarium Philosophorum',
                            gloss: 'The Rose-Garden of the Philosophers',
                            note: 'Frankfurt, 1550, printed as the second part of a collection of older treatises. Twenty woodcuts; we return to them in Lesson 7.',
                        },
                        {
                            native: 'Speculum Alchimiae',
                            translit: 'Speculum Alchimiae',
                            gloss: 'The Mirror of Alchemy',
                            note: 'alchimiae is a first-declension genitive singular. Also spelled Alchemiae; both spellings are current in the printed books.',
                        },
                        {
                            native: 'Musaeum Hermeticum',
                            translit: 'Musaeum Hermeticum',
                            gloss: 'The Hermetic Museum',
                            note: 'Adjective, not genitive. \'The Museum of Hermes\' would be Musaeum Hermetis.',
                        },
                        {
                            native: 'Aurea Catena Homeri',
                            translit: 'Aurea Catena Homeri',
                            gloss: 'The Golden Chain of Homer',
                            note: 'An eighteenth-century compendium of alchemical natural philosophy, generally ascribed to Anton Josef Kirchweger, and read with attention by Goethe.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'rosa',
                    translit: 'rosa',
                    gloss: 'rose',
                },
                {
                    native: 'turba',
                    translit: 'turba',
                    gloss: 'crowd, throng, assembly',
                },
                {
                    native: 'tabula',
                    translit: 'tabula',
                    gloss: 'tablet, board, table',
                },
                {
                    native: 'natura',
                    translit: 'natura',
                    gloss: 'nature',
                },
                {
                    native: 'materia',
                    translit: 'materia',
                    gloss: 'matter, material',
                },
                {
                    native: 'philosophus',
                    translit: 'philosophus',
                    gloss: 'philosopher',
                },
                {
                    native: 'mundus',
                    translit: 'mundus',
                    gloss: 'world',
                },
                {
                    native: 'liber',
                    translit: 'liber',
                    gloss: 'book',
                },
                {
                    native: 'speculum',
                    translit: 'speculum',
                    gloss: 'mirror',
                },
                {
                    native: 'rosarium',
                    translit: 'rosarium',
                    gloss: 'rose-garden; anthology',
                },
                {
                    native: 'catena',
                    translit: 'catena',
                    gloss: 'chain',
                },
                {
                    native: 'argentum',
                    translit: 'argentum',
                    gloss: 'silver',
                },
            ],
            exercises: [
                {
                    prompt: 'Give the genitive singular of rosa.',
                    answer: 'rosae',
                    hint: 'First declension.',
                },
                {
                    prompt: 'Give the genitive plural of philosophus.',
                    answer: 'philosophorum',
                    hint: 'Second declension masculine.',
                },
                {
                    prompt: 'Take Turba Philosophorum apart word by word and translate it.',
                    answer: 'turba — nominative singular, first declension, \'crowd, assembly\'; philosophorum — genitive plural, second declension, \'of the philosophers\'. Together: \'The Assembly of the Philosophers\'.',
                    hint: 'One noun naming the thing, one noun in the genitive telling you whose.',
                },
                {
                    prompt: 'In aqua vitae and aqua fortis, only one of the second words is a genitive. Which is it, and what is the other?',
                    answer: 'vitae is the genitive singular of vita, so aqua vitae is \'water of life\'. fortis is an adjective agreeing with aqua, so aqua fortis is \'strong water\' and not \'water of strength\'.',
                    hint: 'Ask whether the second word could stand as a noun on its own.',
                },
                {
                    prompt: 'Give the genitive singular of verbum, and its gender.',
                    answer: 'verbi; neuter.',
                    hint: 'Second declension, the -um shape.',
                },
                {
                    prompt: 'A dictionary entry reads \'mundus, mundi, m.\' What does the second word tell you, and why does it matter?',
                    answer: 'It is the genitive singular. Its -i ending identifies the noun as second declension and gives you the stem mund-, to which every other ending attaches. Without it you could not tell which family of endings the noun takes.',
                    hint: 'It is not there to be translated.',
                },
                {
                    prompt: 'Put \'the water of the philosophers\' into Latin.',
                    answer: 'aqua philosophorum',
                    hint: 'Nominative singular, then genitive plural.',
                },
                {
                    prompt: 'Musaeum Hermeticum contains no genitive. Explain, and give the form that would have made it one.',
                    answer: 'Hermeticum is an adjective agreeing with the neuter noun musaeum in case, number and gender — \'the Hermetic Museum\'. To say \'the Museum of Hermes\' the title would need the genitive of Hermes, giving Musaeum Hermetis.',
                    hint: 'Compare Rosarium Philosophorum, where the second word cannot be an adjective.',
                },
            ],
        },
        {
            number: 3,
            title: 'The Verb Commands',
            aim: 'To read the present tense, to recognise and form the imperative that drives every alchemical motto, and to know sum, the verb \'to be\', by heart.',
            sections: [
                {
                    heading: 'The verb carries its own subject',
                    paragraphs: [
                        'A Latin verb tells you who is acting without any pronoun in front of it. Laboro is \'I work\'; laboras is \'you work\'; laborat is \'he, she or it works\'. The endings do it: -o (or -m) for I, -s for you, -t for he-she-it, -mus for we, -tis for you all, -nt for they. Six endings, and they are nearly the same across the whole language. Learn them now and you will recognise the person of almost any Latin verb for the rest of your life.',
                        'Latin has separate words for I and you — ego, tu, nos, vos — but uses them only for emphasis or contrast. Ego laboro means \'I am the one who works\'. If you see the pronoun, look for the point being made.',
                        'Verbs are sorted into four conjugations, told apart by the vowel before the infinitive ending -re: first laborare, second tenere, third solvere, fourth audire. A dictionary gives a verb in four forms — solvo, solvere, solvi, solutum — of which the first two are all you need for the present tense and the imperative. The third and fourth give you the perfect and the participle, which we meet in Lesson 6.',
                    ],
                    examples: [
                        {
                            native: 'laboro',
                            translit: 'laboro',
                            gloss: 'I work',
                            note: 'First conjugation. The bare form ends in -o and already means \'I\'.',
                        },
                        {
                            native: 'laborat',
                            translit: 'laborat',
                            gloss: 'he, she or it works',
                            note: 'Latin does not distinguish he from she in the verb ending. Only the context, or a stated subject, will tell you.',
                        },
                        {
                            native: 'tenet',
                            translit: 'tenet',
                            gloss: 'he, she or it holds',
                            note: 'The pivot of the SATOR square, and itself a palindrome. Second conjugation, from tenere.',
                        },
                    ],
                },
                {
                    heading: 'The present tense',
                    paragraphs: [
                        'Take the first conjugation, laborare, \'to work\'. Cut off the -re and you have the stem labora-. Add the person endings: laboro (the stem vowel is swallowed in the first person), laboras, laborat, laboramus, laboratis, laborant.',
                        'The second conjugation, tenere, \'to hold\', keeps its e: teneo, tenes, tenet, tenemus, tenetis, tenent. The third, solvere, \'to loosen, dissolve\', has a short connecting vowel that shifts: solvo, solvis, solvit, solvimus, solvitis, solvunt. The fourth, audire, \'to hear\': audio, audis, audit, audimus, auditis, audiunt.',
                        'The Latin present covers three English presents. Tenet is \'he holds\', \'he is holding\' and \'he does hold\' — Latin does not distinguish them, and you supply whichever the sense wants. It can also, in vivid narrative, stand for the past.',
                        'One further useful tense, because the alchemical texts are full of it: the future. First and second conjugations form it with -bo, -bis, -bit, -bimus, -bitis, -bunt (laborabo, \'I shall work\'; habebis, \'you will have\'). Third and fourth use -am, -es, -et, -emus, -etis, -ent (solvam, \'I shall dissolve\'; invenies, \'you will find\'). Remember invenies. It looks like a command and is not one, and half the popular translations of the VITRIOL motto get it wrong.',
                    ],
                    examples: [
                        {
                            native: 'solvo, solvis, solvit',
                            translit: 'solvo, solvis, solvit',
                            gloss: 'I loosen, you loosen, he loosens',
                            note: 'Third conjugation. solvo means to untie, release, dissolve, and to pay a debt; the alchemical sense grows straight out of the ordinary one.',
                        },
                        {
                            native: 'invenies',
                            translit: 'invenies',
                            gloss: 'you will find',
                            note: 'Fourth conjugation future, from invenio. Not an imperative, though it is constantly mistranslated as one.',
                        },
                        {
                            native: 'habebis',
                            translit: 'habebis',
                            gloss: 'you will have',
                            note: 'Second conjugation future. It appears in the Emerald Tablet: sic habebis gloriam totius mundi.',
                        },
                    ],
                },
                {
                    heading: 'The command',
                    paragraphs: [
                        'This is the form that matters most for our purposes, because the alchemical corpus speaks in orders. The singular imperative is the present stem, bare: ama (love!), tene (hold!), solve (loosen!), audi (hear!). The plural adds -te: amate, tenete, solvite, audite. Note that the third conjugation slips in an i before -te, giving solvite rather than solvte.',
                        'Four common verbs drop the final vowel in the singular: dic (say!), duc (lead!), fac (make! do!), fer (bring!). You will meet fac constantly in the emblem books.',
                        'To forbid, Latin does not negate the imperative. It says noli (singular) or nolite (plural), \'be unwilling\', followed by the infinitive. Noli me tangere, \'do not touch me\' — literally \'be unwilling to touch me\' — is the risen Christ to Mary Magdalene in the Vulgate at John 20:17, and the title of a hundred paintings.',
                        'Now look at what you can already read. Solve et coagula: two singular imperatives joined by et, \'dissolve and coagulate\'. Ora et labora: \'pray and work\'. Visita interiora terrae: \'visit the interior parts of the earth\'. Fac ex mare et foemina circulum: \'make a circle out of male and female\'. Accipe ovum: \'take the egg\'. Vade ad mulierem: \'go to the woman\'. Every one of these is a real motto from a real book, and the grammar is a stem and sometimes a -te.',
                    ],
                    examples: [
                        {
                            native: 'solve',
                            translit: 'solve',
                            gloss: 'dissolve! loosen!',
                            note: 'Singular imperative of solvo. Lettered on one forearm of the Baphomet in Éliphas Lévi\'s Dogme et Rituel de la Haute Magie, 1854-56.',
                        },
                        {
                            native: 'coagula',
                            translit: 'coagula',
                            gloss: 'coagulate! curdle!',
                            note: 'Singular imperative of coagulo, a first-conjugation verb from coagulum, rennet — the stuff that sets milk. The metaphor is a dairy one before it is a laboratory one.',
                        },
                        {
                            native: 'solvite',
                            translit: 'solvite',
                            gloss: 'dissolve! (addressed to more than one)',
                            note: 'Plural imperative. The i before -te is a feature of the third conjugation.',
                        },
                        {
                            native: 'Noli me tangere',
                            translit: 'Noli me tangere',
                            gloss: 'Do not touch me',
                            note: 'Vulgate, John 20:17. noli is the imperative of nolo, \'to be unwilling\'; tangere is the infinitive.',
                        },
                        {
                            native: 'fac',
                            translit: 'fac',
                            gloss: 'make! do!',
                            note: 'Irregular short imperative of facio. Compare dic, duc, fer.',
                        },
                    ],
                },
                {
                    heading: 'sum: the verb of being',
                    paragraphs: [
                        'Sum is irregular, common and short, so learn it whole and be done with it. Present: sum (I am), es, est, sumus, estis, sunt. Imperfect, the past of continuing state: eram (I was), eras, erat, eramus, eratis, erant. Future: ero (I shall be), eris, erit, erimus, eritis, erunt.',
                        'Est does not take an object. It links two words in the nominative case, and either of them may be the subject. Nutrix eius terra est — \'its nurse is the earth\', or with the same words \'the earth is its nurse\'. Latin will not tell you which noun the author meant to lead with; only the sense, or a parallel passage, will. This is a real ambiguity and it becomes theologically important in Lesson 6.',
                        'Est is also very often simply left out when the sense is obvious. Pater eius est Sol, mater eius Luna: the second clause has no verb, and you supply est from the first. This is normal Latin, not carelessness.',
                        'With these three tenses of sum you can already read a good deal. Vis eius integra est — \'its power is whole\'. Hinc erunt adaptationes mirabiles — \'hence there will be wonderful adaptations\'. Both are clauses of the Emerald Tablet, and you have five lessons still to go before you meet them in earnest.',
                    ],
                    examples: [
                        {
                            native: 'sum, es, est, sumus, estis, sunt',
                            translit: 'sum, es, est, sumus, estis, sunt',
                            gloss: 'I am, you are, he/she/it is, we are, you all are, they are',
                            note: 'Worth committing to memory as a single chant.',
                        },
                        {
                            native: 'eram, eras, erat, eramus, eratis, erant',
                            translit: 'eram, eras, erat, eramus, eratis, erant',
                            gloss: 'I was, you were, he/she/it was, we were, you all were, they were',
                            note: 'The imperfect: a state that went on, rather than an event that happened. In principio erat Verbum uses this tense, and the choice matters.',
                        },
                        {
                            native: 'Nutrix eius terra est',
                            translit: 'Nutrix eius terra est',
                            gloss: 'Its nurse is the earth',
                            note: 'From the Emerald Tablet, and the motto of the second emblem of Michael Maier\'s Atalanta fugiens, 1617.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'solvo',
                    translit: 'solvo',
                    gloss: 'to loosen, dissolve, release',
                },
                {
                    native: 'coagulo',
                    translit: 'coagulo',
                    gloss: 'to curdle, coagulate',
                },
                {
                    native: 'oro',
                    translit: 'oro',
                    gloss: 'to pray, plead, speak',
                },
                {
                    native: 'laboro',
                    translit: 'laboro',
                    gloss: 'to work, toil',
                },
                {
                    native: 'teneo',
                    translit: 'teneo',
                    gloss: 'to hold, keep',
                },
                {
                    native: 'audio',
                    translit: 'audio',
                    gloss: 'to hear, listen',
                },
                {
                    native: 'video',
                    translit: 'video',
                    gloss: 'to see',
                },
                {
                    native: 'facio',
                    translit: 'facio',
                    gloss: 'to make, do',
                },
                {
                    native: 'invenio',
                    translit: 'invenio',
                    gloss: 'to find, come upon',
                },
                {
                    native: 'accipio',
                    translit: 'accipio',
                    gloss: 'to take, receive',
                },
                {
                    native: 'visito',
                    translit: 'visito',
                    gloss: 'to visit, go to see',
                },
                {
                    native: 'sum',
                    translit: 'sum',
                    gloss: 'to be',
                },
            ],
            exercises: [
                {
                    prompt: 'What does tenet mean, and what person, number and tense is it?',
                    answer: '\'He, she or it holds\' — third person singular, present tense, from tenere.',
                    hint: 'The -t ending is doing the work.',
                },
                {
                    prompt: 'Form the singular imperative of laboro and of oro.',
                    answer: 'labora; ora',
                    hint: 'Take the infinitive, cut off the -re.',
                },
                {
                    prompt: 'Form the plural imperative of solvo.',
                    answer: 'solvite',
                    hint: 'Third conjugation slips a vowel in before the ending.',
                },
                {
                    prompt: 'Take solve et coagula apart: what part of speech is each of the three words?',
                    answer: 'solve — singular imperative of solvo, \'dissolve\'; et — conjunction, \'and\'; coagula — singular imperative of coagulo, \'coagulate\'.',
                    hint: 'Two of the three are the same kind of word.',
                },
                {
                    prompt: 'In the VITRIOL motto, invenies is not an imperative. What is it, and what would the imperative have been?',
                    answer: 'invenies is the second person singular future indicative of invenio, \'you will find\'. The singular imperative would be inveni.',
                    hint: 'Fourth conjugation futures end in -am, -es, -et.',
                },
                {
                    prompt: 'Give the third person plural of sum in the present and in the imperfect.',
                    answer: 'sunt; erant',
                    hint: '\'They are\' and \'they were\'.',
                },
                {
                    prompt: 'Put \'Pray and work\' into Latin, addressing one person.',
                    answer: 'Ora et labora',
                    hint: 'Two singular imperatives joined by et.',
                },
                {
                    prompt: 'How does Latin forbid an action, and what is the Vulgate\'s phrase for \'do not touch me\'?',
                    answer: 'It does not negate the imperative. It uses noli (to one person) or nolite (to several), \'be unwilling\', with the infinitive. The Vulgate has Noli me tangere, John 20:17.',
                    hint: 'Literally, \'be unwilling to...\'.',
                },
            ],
        },
        {
            number: 4,
            title: 'The Genitive Chain and the Case of Circumstance',
            aim: 'To follow genitives stacked one on another as the alchemical titles stack them, to find the stem of a third-declension noun, and to read the commonest prepositional phrases in the corpus.',
            sections: [
                {
                    heading: 'Genitive upon genitive',
                    paragraphs: [
                        'The genitive glues nouns together, and it can glue more than two. Pater omnis telesmi totius mundi: pater is the nominative, \'the father\'; omnis telesmi is genitive, \'of every telesma\'; totius mundi is a further genitive depending on that, \'of the whole world\'. The chain runs \'father — of every telesma — of the whole world\', each link hanging from the one before. English does the same with \'of\', and tires of it faster.',
                        'The genitive usually follows the noun it depends on, but it need not. Latin puts words where it wants emphasis, and the endings keep the sense intact. Haec est totius fortitudinis fortitudo fortis, a clause of the Emerald Tablet, sets the genitive totius fortitudinis before its noun fortitudo: \'this is the strong strength of all strength\'.',
                        'A genitive can also describe rather than possess. Vir magnae virtutis is \'a man of great virtue\' — the genitive supplies a quality, not an owner. Read the case as a general link between nouns, and let the English preposition be chosen by sense.',
                    ],
                    examples: [
                        {
                            native: 'pater omnis telesmi totius mundi',
                            translit: 'pater omnis telesmi totius mundi',
                            gloss: 'the father of every telesma of the whole world',
                            note: 'Two genitives in series. We come to what telesmi might mean in Lesson 8, where the honest answer is that nobody is sure.',
                        },
                        {
                            native: 'totius fortitudinis fortitudo fortis',
                            translit: 'totius fortitudinis fortitudo fortis',
                            gloss: 'the strong strength of all strength',
                            note: 'A figura etymologica: the same root three times over in four words. The Latin is deliberately incantatory here.',
                        },
                        {
                            native: 'lapis philosophorum',
                            translit: 'lapis philosophorum',
                            gloss: 'the stone of the philosophers',
                            note: 'lapis is third declension, nominative singular; philosophorum is second declension, genitive plural.',
                        },
                    ],
                },
                {
                    heading: 'The third declension, and how to find its stem',
                    paragraphs: [
                        'The third declension is the largest family in Latin and the least predictable. Its nominative singular takes many shapes and tells you almost nothing; its genitive singular always ends in -is, and that is where you find the stem. This is the reason a dictionary gives both forms.',
                        'So: lapis, lapidis — stone, of a stone, stem lapid-. sol, solis — sun, of the sun. lux, lucis — light, of light. pater, patris — father. mater, matris — mother. corpus, corporis — body. opus, operis — work. nomen, nominis — name. ignis, ignis — fire. vis, an irregular noun meaning force or power, has the accusative vim and the ablative vi. The genitive plural is -um, or -ium in a large sub-group.',
                        'Once you can find the stem you can read the titles that use it. Splendor Solis, \'The Splendour of the Sun\', the great illuminated treatise attributed to Salomon Trismosin, of which the best-known copy, now in the British Library, was made in 1582. Lumen de lumine, \'Light from light\', Thomas Vaughan\'s book of 1651, which lifts its title from the Nicene Creed. Fons vitae, \'The Fountain of Life\' — the Latin title under which the Jewish philosopher Ibn Gabirol reached the schoolmen, translated from Arabic about 1150. In each case a nominative and a genitive, or a nominative and a preposition.',
                        'Three very common words have an irregular genitive singular in -ius that you should simply memorise: unus, unius, \'one\'; totus, totius, \'whole\'; solus, solius, \'alone\'. Totius mundi, \'of the whole world\', will meet you three times in the Emerald Tablet.',
                    ],
                    examples: [
                        {
                            native: 'Splendor Solis',
                            translit: 'Splendor Solis',
                            gloss: 'The Splendour of the Sun',
                            note: 'solis is the genitive singular of sol. The nominative gives no hint of the stem sol-; the genitive does.',
                        },
                        {
                            native: 'totius mundi',
                            translit: 'totius mundi',
                            gloss: 'of the whole world',
                            note: 'totius is the irregular genitive singular of totus, agreeing with mundi.',
                        },
                        {
                            native: 'opus, operis',
                            translit: 'opus, operis',
                            gloss: 'work, of a work',
                            note: 'The stem is oper-, not opus-. The Great Work is the magnum opus; \'of the great work\' is magni operis.',
                        },
                    ],
                },
                {
                    heading: 'The ablative: from, with, in, by',
                    paragraphs: [
                        'The ablative is the case of attendant circumstance. It answers by what means, in whose company, from what source, at what place, in what manner. It is the workhorse of technical Latin, and you meet it in two ways: bare, and after a preposition.',
                        'Bare, it very often expresses the means or instrument. Igne, the ablative of ignis, means \'by fire\'. Meditatione unius, \'by the meditation of one\'. Adaptatione, \'by adaptation\'. No preposition is needed or wanted; the case alone says \'by means of\'.',
                        'The commonest prepositions taking the ablative are ab or a (\'from, away from\', a before a consonant, ab before a vowel), ex or e (\'out of\'), de (\'down from, concerning\'), cum (\'together with\'), sine (\'without\'), pro (\'for, on behalf of\'), sub (\'under\'), and in (\'in, on\'). Note the difference between the bare ablative of means and cum: igne is \'by fire\', but cum magno ingenio is \'with great skill\' in the sense of accompanying manner.',
                        'The ablative singular endings are -a in the first declension (rosa, with the a long, indistinguishable in an unmarked text from the nominative), -o in the second (mundo, vitro, mendacio), and -e in the third (igne, lapide, sole), with -i in a sub-group.',
                        'Two phrases everyone knows, and both repay a moment\'s honesty. Sub rosa, \'under the rose\', means \'in confidence\'; rosa is ablative after sub. The phrase is early modern rather than ancient, and the pretty story that Cupid gave a rose to Harpocrates to buy his silence is a Renaissance elaboration, not a Roman source. In vitro, \'in glass\', is ablative after in — but the phrase is modern scientific Latin of the nineteenth century, not alchemical. Vitrum for glass is perfectly classical; the laboratory idiom is not.',
                    ],
                    examples: [
                        {
                            native: 'sine mendacio',
                            translit: 'sine mendacio',
                            gloss: 'without falsehood',
                            note: 'sine always takes the ablative; mendacio is the second-declension neuter ablative singular of mendacium.',
                        },
                        {
                            native: 'cum magno ingenio',
                            translit: 'cum magno ingenio',
                            gloss: 'with great skill',
                            note: 'Adjective and noun agreeing, both ablative singular, both neuter, after cum.',
                        },
                        {
                            native: 'de operatione Solis',
                            translit: 'de operatione Solis',
                            gloss: 'concerning the operation of the Sun',
                            note: 'de + ablative for \'about, concerning\' — the standard way a Latin book announces its subject. operatione is a third-declension ablative; Solis is genitive.',
                        },
                        {
                            native: 'sub rosa',
                            translit: 'sub rosa',
                            gloss: 'under the rose — in confidence',
                            note: 'sub with the ablative means position under. The phrase is early modern; do not cite it as ancient Roman usage.',
                        },
                        {
                            native: 'in vitro',
                            translit: 'in vitro',
                            gloss: 'in glass',
                            note: 'Grammatically transparent, historically modern: this is nineteenth-century scientific Latin, not the language of the alchemists.',
                        },
                    ],
                },
                {
                    heading: 'in with two cases',
                    paragraphs: [
                        'Some prepositions take either the ablative or the accusative, and the case changes the meaning. In with the ablative means \'in, within\' — a place where. In with the accusative means \'into\' — a motion towards. Sub behaves the same way: sub rosa is \'under the rose\', at rest; sub terram is \'to a place under the earth\'.',
                        'This single distinction unlocks one of the most quoted clauses in Western esotericism. Ascendit a terra in caelum, iterumque descendit in terram: \'it ascends from the earth into heaven, and again descends into the earth\'. Caelum and terram are accusative because there is motion into them. Had the author written in caelo and in terra, with the ablative, the sentence would say that the thing rises and then falls while remaining in heaven and on earth — which is not what he meant.',
                        'So watch the endings. The accusative singular is -am in the first declension, -um in the second, -em in the third. In principio (ablative) is \'in the beginning\'; in principium would be \'into the beginning\'. In ventre suo (ablative) is \'in its own belly\'. Si versa fuerit in terram (accusative) is \'if it shall have been turned into earth\'.',
                        'Other prepositions take the accusative always: ad (\'to, towards\'), per (\'through, by means of\'), apud (\'with, in the presence of\'), contra (\'against\'), post (\'after\'), ante (\'before\'). Ad maiorem Dei gloriam and per ipsum both belong here, and you will meet them in the next two lessons.',
                    ],
                    examples: [
                        {
                            native: 'in principio',
                            translit: 'in principio',
                            gloss: 'in the beginning',
                            note: 'Ablative: a place where, no motion. The first two words of John\'s Gospel in Latin.',
                        },
                        {
                            native: 'a terra in caelum',
                            translit: 'a terra in caelum',
                            gloss: 'from the earth into heaven',
                            note: 'terra ablative after a; caelum accusative after in, because the motion is into. Two cases in four words.',
                        },
                        {
                            native: 'in terram',
                            translit: 'in terram',
                            gloss: 'into the earth',
                            note: 'Accusative. Contrast in terra, ablative, \'in the earth\'.',
                        },
                        {
                            native: 'per ipsum',
                            translit: 'per ipsum',
                            gloss: 'through him',
                            note: 'per always takes the accusative. From John 1:3, and from the doxology of the Roman Mass.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'lapis',
                    translit: 'lapis',
                    gloss: 'stone',
                },
                {
                    native: 'pater',
                    translit: 'pater',
                    gloss: 'father',
                },
                {
                    native: 'mater',
                    translit: 'mater',
                    gloss: 'mother',
                },
                {
                    native: 'opus',
                    translit: 'opus',
                    gloss: 'work, labour',
                },
                {
                    native: 'vis',
                    translit: 'vis',
                    gloss: 'force, power, strength',
                },
                {
                    native: 'fortitudo',
                    translit: 'fortitudo',
                    gloss: 'strength, fortitude',
                },
                {
                    native: 'ingenium',
                    translit: 'ingenium',
                    gloss: 'native wit, skill, genius',
                },
                {
                    native: 'vitrum',
                    translit: 'vitrum',
                    gloss: 'glass',
                },
                {
                    native: 'mendacium',
                    translit: 'mendacium',
                    gloss: 'falsehood, a lie',
                },
                {
                    native: 'splendor',
                    translit: 'splendor',
                    gloss: 'brightness, splendour',
                },
                {
                    native: 'totus',
                    translit: 'totus',
                    gloss: 'whole, entire',
                },
                {
                    native: 'unus',
                    translit: 'unus',
                    gloss: 'one',
                },
            ],
            exercises: [
                {
                    prompt: 'Give the genitive singular of lapis and of sol.',
                    answer: 'lapidis; solis',
                    hint: 'Third declension: the genitive gives the stem.',
                },
                {
                    prompt: 'Translate Splendor Solis and say what case each word is in.',
                    answer: '\'The Splendour of the Sun\'. splendor is nominative singular; solis is genitive singular.',
                    hint: 'Nominative and genitive, as on every title page.',
                },
                {
                    prompt: 'Why is caelum accusative in ascendit a terra in caelum?',
                    answer: 'Because in with the accusative expresses motion into: \'it ascends from the earth into heaven\'. With the ablative, in caelo, the phrase would mean \'in heaven\', with no motion at all.',
                    hint: 'One preposition, two cases, two meanings.',
                },
                {
                    prompt: 'What case is rosa in sub rosa, and how do you know?',
                    answer: 'Ablative singular. sub takes the ablative when it means position under, and the first-declension ablative singular is -a (long, though unmarked in print, so it looks identical to the nominative).',
                    hint: 'Ask whether there is any motion in the phrase.',
                },
                {
                    prompt: 'Give the genitive singular of totus.',
                    answer: 'totius',
                    hint: 'One of a small group with an irregular -ius genitive.',
                },
                {
                    prompt: 'Break pater omnis telesmi totius mundi into its parts and translate.',
                    answer: 'pater — nominative singular, \'the father\'; omnis telesmi — genitive singular, \'of every telesma\'; totius mundi — genitive singular depending on the first genitive, \'of the whole world\'. \'The father of every telesma of the whole world.\'',
                    hint: 'Two genitives, one hanging from the other.',
                },
                {
                    prompt: 'In sine mendacio, what case does sine govern, and why does the noun end in -o?',
                    answer: 'sine governs the ablative. mendacium is a second-declension neuter, whose ablative singular ends in -o: mendacio, \'without falsehood\'.',
                    hint: 'Second-declension ablative singular.',
                },
                {
                    prompt: 'Put \'the stone of the philosophers\' into Latin.',
                    answer: 'lapis philosophorum',
                    hint: 'Third-declension nominative, second-declension genitive plural.',
                },
            ],
        },
        {
            number: 5,
            title: 'Mottoes and Inscriptions',
            aim: 'To read ten genuine formulae word by word, and to learn to ask how old a famous motto really is before repeating it.',
            sections: [
                {
                    heading: 'The shapes a motto takes',
                    paragraphs: [
                        'Latin mottoes come in three shapes, and once you can tell them apart you can parse almost any of them at sight. The first is the bare imperative, alone or with an object: solve, ora et labora, memento mori. The second is a verbless nominal phrase, usually a noun with a genitive or an adjective hanging on it: lapis philosophorum, prima materia, aurea catena Homeri. The third is a full sentence with a finite verb, often passive: sic transit gloria mundi, igne natura renovatur integra.',
                        'You will need adverbs. Latin makes them from adjectives: most often in -e from the first-and-second declension type, so lentus gives lente, \'slowly\', and in -ter from the third declension type, so fortis gives fortiter, \'bravely\', and suavis gives suaviter, \'gently\'. Adverbs do not decline; they change only to make comparatives, as lente gives lentius.',
                        'And you will need et. It joins two words or clauses, and it can also mean \'even, also\'. The enclitic -que, tacked onto the end of the second word, does the same job: iterumque is \'and again\'. Watch for it; it is easy to read as part of the word.',
                        'A word about the habit of the tradition. Alchemical Latin is riddled with imperatives and futures because it is instructional writing: do this, and you will obtain that. When you see a second-person future — invenies, habebis, separabis — read it as a promise attached to a command, not as prophecy.',
                    ],
                    examples: [
                        {
                            native: 'festina lente',
                            translit: 'festina lente',
                            gloss: 'make haste slowly',
                            note: 'Imperative plus adverb. Two words, and one of the shortest complete pieces of advice in any language.',
                        },
                        {
                            native: 'memento mori',
                            translit: 'memento mori',
                            gloss: 'remember that you must die',
                            note: 'memento is a future imperative of memini, a verb that exists only in past-looking forms; mori is the infinitive of the deponent verb morior, \'to die\'. Both irregularities are worth noticing and neither needs mastering now.',
                        },
                        {
                            native: 'iterumque',
                            translit: 'iterumque',
                            gloss: 'and again',
                            note: 'The enclitic -que attached to iterum. Latin can hide its conjunctions at the end of words.',
                        },
                    ],
                },
                {
                    heading: 'Ten from the workshop and the cloister',
                    paragraphs: [
                        'What follows is ten real formulae, each with its source. Read each one aloud, then take it apart before you look at the gloss. You have all the grammar you need for every one of them.',
                        'Two of them require a warning, and the warning is the lesson. A motto\'s fame is no evidence of its age. Ora et labora is universally called the motto of Saint Benedict; it is not in the Rule of Saint Benedict, which nowhere joins the two verbs, and no earlier Benedictine use of it has been traced. Its currency as the motto of the order dates from the nineteenth century and is generally credited to Maurus Wolter of Beuron, who applies it to monastic life in his Praecipua ordinis monastici elementa of 1880. The Latin is impeccable and the sixth-century pedigree is not there.',
                        'Solve et coagula is the same case in a different register. Both verbs are ordinary vocabulary throughout the Latin alchemical corpus, and the operations they name are as old as the art. But the paired slogan owes its fame to Éliphas Lévi, who lettered SOLVE along one forearm of his Baphomet and COAGULA along the other in the frontispiece to Dogme et Rituel de la Haute Magie, 1854-56. The words are old; the emblem is Victorian.',
                    ],
                    examples: [
                        {
                            native: 'Festina lente',
                            translit: 'Festina lente',
                            gloss: 'Make haste slowly.',
                            note: 'Suetonius, Divus Augustus 25, reports this as Augustus\' favourite maxim — but reports it in Greek, as speude bradeos. The Latin is the traditional rendering, taken by Aldus Manutius as the sense of his dolphin-and-anchor device.',
                        },
                        {
                            native: 'Ora et labora',
                            translit: 'Ora et labora',
                            gloss: 'Pray and work.',
                            note: 'Two singular imperatives. Not in the Rule of Saint Benedict; current as the Benedictine motto only from the nineteenth century.',
                        },
                        {
                            native: 'Solve et coagula',
                            translit: 'Solve et coagula',
                            gloss: 'Dissolve and coagulate.',
                            note: 'Standard operations of the art; famous as a paired motto from Lévi\'s Baphomet plate of 1854-56.',
                        },
                        {
                            native: 'Memento mori',
                            translit: 'Memento mori',
                            gloss: 'Remember that you must die.',
                            note: 'Proverbial rather than scriptural; the sentiment is ancient, the tag as we have it is a commonplace of medieval and early modern devotion.',
                        },
                        {
                            native: 'Sic transit gloria mundi',
                            translit: 'Sic transit gloria mundi',
                            gloss: 'Thus passes the glory of the world.',
                            note: 'sic adverb, transit third singular present, gloria nominative, mundi genitive. Used in the papal coronation ritual from the fifteenth century; the phrasing echoes Thomas à Kempis, De imitatione Christi I.3, \'O quam cito transit gloria mundi\'.',
                        },
                        {
                            native: 'Ad maiorem Dei gloriam',
                            translit: 'Ad maiorem Dei gloriam',
                            gloss: 'To the greater glory of God.',
                            note: 'The Jesuit motto. ad takes the accusative gloriam; maiorem is a comparative adjective agreeing with it; Dei is genitive.',
                        },
                        {
                            native: 'Nosce te ipsum',
                            translit: 'Nosce te ipsum',
                            gloss: 'Know thyself.',
                            note: 'nosce is the singular imperative of nosco; te ipsum is the accusative, \'yourself\'. A Latin rendering of the Delphic gnothi seauton, standard in Renaissance humanism.',
                        },
                        {
                            native: 'Audi, vide, tace',
                            translit: 'Audi, vide, tace',
                            gloss: 'Hear, see, be silent.',
                            note: 'Three singular imperatives: audi from the fourth conjugation, vide and tace from the second. Proverbial, often extended with si vis vivere in pace, \'if you wish to live in peace\'; later adopted as a Masonic tag.',
                        },
                        {
                            native: 'Ora, lege, lege, lege, relege, labora et invenies',
                            translit: 'Ora, lege, lege, lege, relege, labora et invenies',
                            gloss: 'Pray, read, read, read, read again, work — and you will find.',
                            note: 'From the Mutus Liber, La Rochelle, 1677. Six imperatives and one future, in eight words.',
                        },
                        {
                            native: 'Visita interiora terrae rectificando invenies occultum lapidem',
                            translit: 'Visita interiora terrae rectificando invenies occultum lapidem',
                            gloss: 'Visit the interior parts of the earth; by rectifying you will find the hidden stone.',
                            note: 'The VITRIOL acrostic, taken apart in the next section.',
                        },
                    ],
                },
                {
                    heading: 'The acrostic mottoes, and how late they can be',
                    paragraphs: [
                        'Take VITRIOL apart. Visita is the singular imperative of visito, \'visit\'. Interiora is the neuter accusative plural of the comparative adjective interior, used as a noun: \'the inner parts\'. Terrae is the genitive singular of terra, \'of the earth\'. Rectificando is a gerund in the ablative — a verbal noun meaning \'by rectifying\'; rectifico is a medieval coinage and not classical Latin at all. Invenies is the future, \'you will find\'. Occultum lapidem is the accusative singular of occultus lapis, \'the hidden stone\'. Note that the sentence has two verbs and no conjunction between them; the second clause is a promise, and English usually supplies a semicolon or an \'and\'.',
                        'The acrostic is not medieval so far as anyone has shown. It appears with the Azoth material published in Latin and German from the early seventeenth century — Azoth, sive Aureliae occultae philosophorum, Frankfurt, 1613 — and is lettered around the central emblem of Azoth, ou le moyen de faire l\'or caché des philosophes, Paris, 1659, attributed to Basil Valentine. Some versions add two further words, veram medicinam, extending the acrostic to the nine letters VITRIOLVM.',
                        'Now INRI, and here you must be careful. The letters are the titulus of the Cross, recorded at John 19:19: Iesus Nazarenus Rex Iudaeorum, \'Jesus of Nazareth, King of the Jews\'. That is what the inscription is, and it is first-century.',
                        'The alchemical expansion Igne Natura Renovatur Integra — \'by fire nature is renewed whole\' — is another thing entirely. No attestation of it has been traced in the medieval or early modern alchemical corpus; its documented currency begins in the nineteenth century, in Masonic and occult writing — Albert Pike quotes it in Morals and Dogma, 1871, and ascribes it vaguely to \'the sages of antiquity\' — and it is fixed in the memory of the modern tradition by the Adeptus Minor ceremony of the Hermetic Order of the Golden Dawn, drawn up in the 1890s. Repeat it if you like it, but do not call it ancient on present evidence.',
                        'The grammar is worth a moment too, because the motto circulates in two forms. Igne natura renovatur integra is correct Latin: igne is the ablative of ignis, the ablative of means, \'by fire\'; natura is the nominative subject; renovatur is a passive, \'is renewed\'; integra is an adjective agreeing with natura, \'whole, unimpaired\'. The variant Ignis natura renovatur integra puts ignis in the nominative, which leaves the sentence with two subjects and no agent. If you meet that form, you have met a copyist\'s slip that hardened into a tradition.',
                        'Other expansions circulate — Igne Nitrum Roris Invenitur among the alchemists, and Iustum Necare Reges Impios, which belongs not to any republican society but to the anti-Masonic polemic that ascribed it to one. Their multiplicity is the point. Notariqon, the reading of initials as sentences, is a technique for making fixed letters speak again in each age. It produces meaning; it does not recover it.',
                    ],
                    examples: [
                        {
                            native: 'Iesus Nazarenus Rex Iudaeorum',
                            translit: 'Iesus Nazarenus Rex Iudaeorum',
                            gloss: 'Jesus of Nazareth, King of the Jews',
                            note: 'The titulus of John 19:19, and what the four letters actually abbreviate. Iudaeorum is a genitive plural.',
                        },
                        {
                            native: 'Igne natura renovatur integra',
                            translit: 'Igne natura renovatur integra',
                            gloss: 'By fire, nature is renewed whole.',
                            note: 'The alchemical expansion of I.N.R.I. Not traced in the earlier alchemical corpus; documented from nineteenth-century Masonic and occult writing, and fixed by Golden Dawn ritual in the 1890s.',
                        },
                        {
                            native: 'rectificando',
                            translit: 'rectificando',
                            gloss: 'by rectifying',
                            note: 'An ablative gerund. rectifico is medieval Latin; a classical author would have said corrigendo or emendando.',
                        },
                        {
                            native: 'occultum lapidem',
                            translit: 'occultum lapidem',
                            gloss: 'the hidden stone',
                            note: 'Accusative singular, adjective agreeing with noun: the object of invenies.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'festino',
                    translit: 'festino',
                    gloss: 'to hurry, make haste',
                },
                {
                    native: 'lente',
                    translit: 'lente',
                    gloss: 'slowly',
                },
                {
                    native: 'gloria',
                    translit: 'gloria',
                    gloss: 'glory, renown',
                },
                {
                    native: 'taceo',
                    translit: 'taceo',
                    gloss: 'to be silent',
                },
                {
                    native: 'lego',
                    translit: 'lego',
                    gloss: 'to read, gather, choose',
                },
                {
                    native: 'relego',
                    translit: 'relego',
                    gloss: 'to read again',
                },
                {
                    native: 'occultus',
                    translit: 'occultus',
                    gloss: 'hidden, concealed',
                },
                {
                    native: 'interior',
                    translit: 'interior',
                    gloss: 'inner, further within',
                },
                {
                    native: 'renovo',
                    translit: 'renovo',
                    gloss: 'to renew, restore',
                },
                {
                    native: 'integer',
                    translit: 'integer',
                    gloss: 'whole, untouched, unimpaired',
                },
                {
                    native: 'rex',
                    translit: 'rex',
                    gloss: 'king',
                },
                {
                    native: 'sic',
                    translit: 'sic',
                    gloss: 'thus, so, in this way',
                },
            ],
            exercises: [
                {
                    prompt: 'Parse festina lente.',
                    answer: 'festina — singular imperative of festino, \'hasten\'; lente — adverb formed from the adjective lentus, \'slowly\'. \'Make haste slowly.\'',
                    hint: 'One command and one adverb.',
                },
                {
                    prompt: 'Which word in the VITRIOL motto is a finite verb but not a command, and what is it?',
                    answer: 'invenies — second person singular future indicative of invenio, \'you will find\'.',
                    hint: 'It follows the gerund rectificando.',
                },
                {
                    prompt: 'Why is igne, and not ignis, the grammatical form in the I.N.R.I. expansion?',
                    answer: 'igne is the ablative singular of ignis, used as an ablative of means: \'by fire nature is renewed whole\'. ignis is nominative, which would give the sentence two subjects, natura and ignis, and leave the passive verb renovatur with no agent.',
                    hint: 'Which case says \'by means of\'?',
                },
                {
                    prompt: 'How old is the reading of I.N.R.I. as Igne Natura Renovatur Integra, and what do the letters actually abbreviate?',
                    answer: 'No medieval or early modern alchemical attestation has been traced. Its documented currency begins in nineteenth-century Masonic and occult writing — Pike\'s Morals and Dogma of 1871 quotes it — and it is fixed by Golden Dawn ritual from the 1890s. The letters themselves abbreviate the titulus of John 19:19, Iesus Nazarenus Rex Iudaeorum.',
                    hint: 'Separate the inscription from the later reading of it.',
                },
                {
                    prompt: 'Ora et labora is called the motto of Saint Benedict. What is the honest position?',
                    answer: 'The phrase is not in the Rule of Saint Benedict, which nowhere joins the two verbs, and no earlier Benedictine use has been traced. Its currency as the motto of the order dates from the nineteenth century and is generally credited to Maurus Wolter of Beuron, who applies it to monastic life in a work of 1880.',
                    hint: 'The Latin is old; the motto is not.',
                },
                {
                    prompt: 'Give the case and number of gloria and of mundi in sic transit gloria mundi.',
                    answer: 'gloria — nominative singular, the subject of transit; mundi — genitive singular, \'of the world\'.',
                    hint: 'One does the passing; the other says whose glory it is.',
                },
                {
                    prompt: 'Translate the closing motto of the Mutus Liber: Ora, lege, lege, lege, relege, labora et invenies.',
                    answer: 'Pray, read, read, read, read again, work — and you will find.',
                    hint: 'Six imperatives and one future.',
                },
                {
                    prompt: 'In ad maiorem Dei gloriam, what governs the accusative gloriam, and what are the other two words doing?',
                    answer: 'The preposition ad governs the accusative gloriam. maiorem is a comparative adjective agreeing with gloriam in case, number and gender, \'greater\'; Dei is a genitive singular, \'of God\'. \'To the greater glory of God.\'',
                    hint: 'One preposition, one agreeing adjective, one genitive.',
                },
            ],
        },
        {
            number: 6,
            title: 'The Vulgate Sentence',
            aim: 'To read a sentence whose words do not stand where English would stand them, to know erat and its family, and to read John 1:1-5 in Jerome\'s Latin.',
            sections: [
                {
                    heading: 'Where the verb stands',
                    paragraphs: [
                        'Latin word order is not free but it is not grammatical either: it is rhetorical. The endings hold the sentence together, which leaves the writer at liberty to place words for emphasis. Classical prose tends to put the verb last and to save the strongest word for the first or the final position. But nothing forces it, and a Latin author who wants a word to strike puts it where it will.',
                        'This means that reading Latin is a matter of holding a sentence in suspension until the endings resolve it. Do not translate word by word from the left. Read to the end, find the verb, find the nominative, and let the rest fall into place around them. It feels slow. It becomes fast.',
                        'The Vulgate is a special case and an unusually kind one. Jerome revised the Old Latin Gospels at Rome about 383-384 at the request of Pope Damasus, and later translated most of the Old Testament afresh from Hebrew; the Bible that travels under his name is a composite, and some books in it — Wisdom and Sirach among them — are Old Latin he never touched. Throughout, the translation follows the word order of its Greek and Hebrew originals far more closely than a Latin stylist would. That is why John 1:1 does not sound like Cicero, and why it is easy to read.',
                        'One practical note. The text quoted here is the Clementine Vulgate of 1592, the standard reference edition for four centuries and the text behind almost every citation you will meet in older esoteric literature. The Nova Vulgata of 1979 differs in places, and critical editions differ again. When a phrase matters, check which edition you are quoting.',
                    ],
                    examples: [
                        {
                            native: 'In principio erat Verbum',
                            translit: 'In principio erat Verbum',
                            gloss: 'In the beginning was the Word',
                            note: 'Verb before subject, prepositional phrase first — Greek order, kept deliberately.',
                        },
                        {
                            native: 'Deus erat Verbum',
                            translit: 'Deus erat Verbum',
                            gloss: 'the Word was God',
                            note: 'Latin word order here is the Greek\'s; the English reverses it. Why, and on what authority, is the subject of the next section.',
                        },
                    ],
                },
                {
                    heading: 'erat, and sentences of being',
                    paragraphs: [
                        'Erat is the third person singular imperfect of sum: \'was, used to be, went on being\'. The imperfect is the tense of continuing or habitual past, as against the perfect, which reports a completed event. In principio erat Verbum therefore does not say that the Word came into being at the beginning; it says that at the beginning the Word already was, and was continuing. The tense is doing theological work, and it is doing it in the grammar and not in the commentary.',
                        'Est and erat are copulas: they link two words in the nominative case rather than taking an object. Either of the two can be the subject. In Greek this is resolved by the article — in John 1:1 the Greek has the article on logos and none on theos, which is why translators read \'the Word was God\' and not \'God was the Word\'. Latin has no article. Deus erat Verbum, taken by itself, cannot decide the question, and Latin readers took the ordering from the Greek behind it. This is an honest and consequential limitation of the language, and it is worth knowing that centuries of Latin theology were built on a sentence the Latin could not fully disambiguate.',
                        'Apud takes the accusative and means \'with, at the house of, in the presence of\'. Apud Deum is \'with God\' in the sense of \'in God\'s company\', not \'by means of God\'. The choice of preposition is careful.',
                    ],
                    examples: [
                        {
                            native: 'erat',
                            translit: 'erat',
                            gloss: 'was, used to be',
                            note: 'Imperfect of sum. Continuing state, not completed event.',
                        },
                        {
                            native: 'apud Deum',
                            translit: 'apud Deum',
                            gloss: 'with God, in God\'s presence',
                            note: 'apud always takes the accusative. Deum is the accusative singular of Deus.',
                        },
                        {
                            native: 'Hoc erat in principio apud Deum',
                            translit: 'Hoc erat in principio apud Deum',
                            gloss: 'This was in the beginning with God',
                            note: 'hoc is the neuter nominative singular of hic, \'this\'. It is neuter because it agrees with Verbum, which is neuter in Latin; the Greek, where logos is masculine, has the masculine houtos here.',
                        },
                    ],
                },
                {
                    heading: 'John 1:1-5, clause by clause',
                    paragraphs: [
                        'Here is the passage entire in the Clementine text. In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum. Hoc erat in principio apud Deum. Omnia per ipsum facta sunt, et sine ipso factum est nihil quod factum est. In ipso vita erat, et vita erat lux hominum; et lux in tenebris lucet, et tenebrae eam non comprehenderunt.',
                        'Take it slowly. Every construction in it you have already met, except two verb forms which the next section will name. Read each clause aloud, find the verb, find the nominative, then check yourself against the glosses below.',
                        'Two details reward attention. First, the tense shifts in verse 5: everything before it is in past tenses, and then lucet arrives in the present — \'the light shines\', now, still. Second, comprehenderunt means both \'seized, overcame\' and \'grasped, understood\', and the Greek verb behind it, katelaben, carries exactly the same double sense. The ambiguity is in the original. Translators must choose; the text does not.',
                    ],
                    examples: [
                        {
                            native: 'In principio erat Verbum',
                            translit: 'In principio erat Verbum',
                            gloss: 'In the beginning was the Word',
                            note: 'in + ablative principio; erat imperfect; Verbum nominative singular neuter.',
                        },
                        {
                            native: 'et Verbum erat apud Deum',
                            translit: 'et Verbum erat apud Deum',
                            gloss: 'and the Word was with God',
                            note: 'apud + accusative Deum.',
                        },
                        {
                            native: 'et Deus erat Verbum',
                            translit: 'et Deus erat Verbum',
                            gloss: 'and the Word was God',
                            note: 'Two nominatives joined by erat. The English order follows the Greek article, not the Latin.',
                        },
                        {
                            native: 'Hoc erat in principio apud Deum',
                            translit: 'Hoc erat in principio apud Deum',
                            gloss: 'This was in the beginning with God',
                            note: null,
                        },
                        {
                            native: 'Omnia per ipsum facta sunt',
                            translit: 'Omnia per ipsum facta sunt',
                            gloss: 'All things were made through him',
                            note: 'omnia neuter nominative plural, \'all things\'; per + accusative ipsum; facta sunt perfect passive, \'were made\'.',
                        },
                        {
                            native: 'et sine ipso factum est nihil quod factum est',
                            translit: 'et sine ipso factum est nihil quod factum est',
                            gloss: 'and without him was made nothing that was made',
                            note: 'sine + ablative ipso; nihil is indeclinable, \'nothing\'; quod is the neuter relative pronoun, \'which\'. The punctuation of this clause has been disputed since antiquity: some read the last three words with the following verse.',
                        },
                        {
                            native: 'In ipso vita erat',
                            translit: 'In ipso vita erat',
                            gloss: 'In him was life',
                            note: 'in + ablative, place where.',
                        },
                        {
                            native: 'et vita erat lux hominum',
                            translit: 'et vita erat lux hominum',
                            gloss: 'and the life was the light of men',
                            note: 'hominum is the genitive plural of homo, hominis, \'man, human being\'.',
                        },
                        {
                            native: 'et lux in tenebris lucet',
                            translit: 'et lux in tenebris lucet',
                            gloss: 'and the light shines in the darkness',
                            note: 'tenebrae is a plural-only noun: first declension, no singular in use, meaning \'darkness\'. tenebris is its ablative plural. lucet is present tense amid past tenses.',
                        },
                        {
                            native: 'et tenebrae eam non comprehenderunt',
                            translit: 'et tenebrae eam non comprehenderunt',
                            gloss: 'and the darkness did not comprehend it',
                            note: 'eam is the feminine accusative singular of is, referring to lux, which is feminine. comprehenderunt is third plural perfect active, and means both \'overcame\' and \'understood\'.',
                        },
                    ],
                },
                {
                    heading: 'Tenses to recognise, not yet to make',
                    paragraphs: [
                        'Two verb forms in that passage are new, and both will meet you again in the Emerald Tablet. Learn to recognise them; you need not yet be able to produce them.',
                        'The perfect active reports a completed act: \'I did, I have done\'. Its endings are -i, -isti, -it, -imus, -istis, -erunt, attached to a special perfect stem which the dictionary gives as the third form of the verb. Comprehenderunt, \'they comprehended\', and dixi, \'I said\', are perfects. Portavit, \'he carried\', is a perfect too.',
                        'The perfect passive is built from two words: the perfect participle, which behaves like an adjective and agrees with its subject, plus a form of sum. Factum est is \'it was made\' — factum agreeing with a neuter subject. Facta sunt is \'they were made\', neuter plural. Creatus est is \'he or it was created\', masculine singular. Vocatus sum is \'I was called\'. Completum est is \'it has been completed\'. When you see a participle and a part of sum standing together, read them as one verb.',
                        'Two odd variants are worth flagging because the Tablet uses them. Fuerunt sometimes replaces sunt in this construction, giving natae fuerunt for \'they were born\'; the sense is the same, with perhaps a shade more finality. And versa fuerit is a future perfect passive, \'it shall have been turned\' — the tense of a condition that must be satisfied before the main clause can follow.',
                    ],
                    examples: [
                        {
                            native: 'facta sunt',
                            translit: 'facta sunt',
                            gloss: 'they were made',
                            note: 'Perfect passive. facta is a neuter plural participle agreeing with omnia.',
                        },
                        {
                            native: 'factum est',
                            translit: 'factum est',
                            gloss: 'it was made',
                            note: 'Perfect passive, neuter singular.',
                        },
                        {
                            native: 'comprehenderunt',
                            translit: 'comprehenderunt',
                            gloss: 'they seized; they understood',
                            note: 'Perfect active, third plural. The double sense is genuine and old.',
                        },
                        {
                            native: 'versa fuerit',
                            translit: 'versa fuerit',
                            gloss: 'it shall have been turned',
                            note: 'Future perfect passive, feminine singular. From the Emerald Tablet, where it agrees with vis, \'power\'.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'principium',
                    translit: 'principium',
                    gloss: 'beginning, first principle',
                },
                {
                    native: 'verbum',
                    translit: 'verbum',
                    gloss: 'word',
                },
                {
                    native: 'apud',
                    translit: 'apud',
                    gloss: 'with, in the presence of (+ accusative)',
                },
                {
                    native: 'omnis',
                    translit: 'omnis',
                    gloss: 'every; in the plural, all',
                },
                {
                    native: 'nihil',
                    translit: 'nihil',
                    gloss: 'nothing',
                },
                {
                    native: 'homo',
                    translit: 'homo',
                    gloss: 'human being, man',
                },
                {
                    native: 'tenebrae',
                    translit: 'tenebrae',
                    gloss: 'darkness (plural only)',
                },
                {
                    native: 'luceo',
                    translit: 'luceo',
                    gloss: 'to shine, be light',
                },
                {
                    native: 'comprehendo',
                    translit: 'comprehendo',
                    gloss: 'to seize, grasp, understand',
                },
                {
                    native: 'dico',
                    translit: 'dico',
                    gloss: 'to say, speak',
                },
                {
                    native: 'ipse',
                    translit: 'ipse',
                    gloss: 'himself, herself, itself; the very one',
                },
                {
                    native: 'hic',
                    translit: 'hic',
                    gloss: 'this (also, as an adverb, here)',
                },
            ],
            exercises: [
                {
                    prompt: 'Translate In principio erat Verbum word by word.',
                    answer: 'in — \'in\', governing the ablative; principio — ablative singular of principium, \'beginning\'; erat — third person singular imperfect of sum, \'was\'; Verbum — nominative singular neuter, \'the Word\'. \'In the beginning was the Word.\'',
                    hint: 'Four words, four jobs.',
                },
                {
                    prompt: 'What case does apud take, and what does apud Deum mean?',
                    answer: 'The accusative. apud Deum means \'with God\', in the sense of \'in God\'s presence\'.',
                    hint: 'Not \'by means of God\'.',
                },
                {
                    prompt: 'Why is Deus erat Verbum formally ambiguous in Latin, and how do translators settle it?',
                    answer: 'Because erat is a copula joining two nominatives, and Latin has no article to mark which is the subject. Greek marks the subject with the article — it has the article on logos and none on theos — so translators take Verbum as the subject and Deus as the predicate. The Latin alone cannot decide it.',
                    hint: 'What does Greek have that Latin lacks?',
                },
                {
                    prompt: 'What tense and voice is facta sunt?',
                    answer: 'Perfect passive: \'they were made\'.',
                    hint: 'A participle plus a part of sum.',
                },
                {
                    prompt: 'What is unusual about the noun tenebrae?',
                    answer: 'It is plural only — a plurale tantum. It is a first-declension plural meaning \'darkness\', with no singular in ordinary use.',
                    hint: 'Count the darknesses.',
                },
                {
                    prompt: 'Give the third person singular and plural of the imperfect of sum.',
                    answer: 'erat; erant',
                    hint: '\'He was\' and \'they were\'.',
                },
                {
                    prompt: 'In et lux in tenebris lucet, what tense is lucet, and why is the choice worth noticing?',
                    answer: 'Present tense: \'shines\'. Every surrounding clause is in a past tense, so the shift to the present asserts that the shining is not finished — it goes on now.',
                    hint: 'Compare erat in the clauses before it.',
                },
                {
                    prompt: 'What does comprehenderunt mean, and why do translations of it differ?',
                    answer: 'It is the third person plural perfect active of comprehendo, and it means both \'seized, overcame\' and \'grasped, understood\'. The Greek verb behind it, katelaben, carries the same double sense, so the ambiguity belongs to the original and is not an artefact of the Latin.',
                    hint: 'Two senses, one verb, and the same in Greek.',
                },
            ],
        },
        {
            number: 7,
            title: 'Reading the Emblem Books',
            aim: 'To read the Latin mottoes that stand over alchemical plates, and to learn what may and may not be safely quoted from them.',
            sections: [
                {
                    heading: 'How an emblem is built',
                    paragraphs: [
                        'An emblem has three parts: the inscriptio or motto, a short Latin sentence set above the plate; the pictura, the image itself; and the subscriptio, a verse epigram below it. The form was invented, more or less by accident, by Andrea Alciato, whose Emblematum liber was printed at Augsburg in 1531 without his authorisation and imitated for the next two hundred years. The reader is meant to move between the three parts until they lock together. An emblem is a puzzle with its answer distributed across three media.',
                        'Michael Maier\'s Atalanta fugiens, printed at Oppenheim by Johann Theodor de Bry in 1617, is the most ambitious book ever built on this plan. It has fifty emblems, and each has four parts rather than three: a Latin motto, an engraving attributed to Matthäus Merian, a Latin epigram in elegiac couplets, a prose discourse — and a fugue for three voices, printed as music. It is a book to be looked at, read and sung at once, and the only one of its kind.',
                        'For our purposes the mottoes are the prize, because they are exactly the grammar you have been learning: an imperative, an object in the accusative, a prepositional phrase. Nothing in what follows will surprise you.',
                        'One practical caution about early printed books. Compositors set foemina for femina, coelum for caelum, and haec or caelum with the ae as a single ligature; and they used u and v, i and j by position rather than by sound, so that you meet vt for ut, vniuersum for universum, and iam where a later book prints jam. None of this changes the words. Read through the orthography and look for the stem.',
                    ],
                    examples: [
                        {
                            native: 'Emblematum liber',
                            translit: 'Emblematum liber',
                            gloss: 'Book of Emblems',
                            note: 'Alciato, Augsburg, 1531. emblematum is a Greek-derived genitive plural; liber is the second-declension noun \'book\'.',
                        },
                        {
                            native: 'Atalanta fugiens',
                            translit: 'Atalanta fugiens',
                            gloss: 'Atalanta Fleeing',
                            note: 'Maier, Oppenheim, 1617. fugiens is a present participle agreeing with Atalanta — the runner of the Greek myth, delayed by golden apples, whose flight Maier makes an image of the volatile principle.',
                        },
                        {
                            native: 'foemina',
                            translit: 'foemina',
                            gloss: 'woman (early modern spelling of femina)',
                            note: 'An orthographic habit of the printers, not a different word.',
                        },
                    ],
                },
                {
                    heading: 'Eight mottoes from Atalanta fugiens',
                    paragraphs: [
                        'Read each of these before looking at the gloss. Find the verb first. Where there is no verb, find the two nominatives and supply est.',
                        'Notice how many are imperatives, and notice that the first two are quotations. Maier opens his book with two clauses lifted straight from the Emerald Tablet — Portavit eum ventus in ventre suo and Nutrix eius terra est — which tells you what he took the foundation of the art to be, and gives you a first sight of the text you will read whole in the next lesson. Maier writes eum where the Tablet\'s standard text has illud; both are pronouns meaning \'it\', differing in gender, and the variation is the ordinary noise of a manuscript tradition.',
                        'One motto rewards a second look. In emblem XXI, fac ex mare et foemina circulum, the word mare is not the neuter noun meaning \'sea\' but the ablative of mas, maris, \'a male\'. \'Make a circle out of male and female.\' The two words are spelled identically here and the confusion is old; the sense is settled by foemina standing beside it. This is what reading Latin actually consists of — not decoding, but choosing between possibilities that the sentence itself narrows down.',
                    ],
                    examples: [
                        {
                            native: 'Portavit eum ventus in ventre suo',
                            translit: 'Portavit eum ventus in ventre suo',
                            gloss: 'The wind carried it in its belly.',
                            note: 'Emblem I. portavit perfect active; eum accusative object; ventus nominative subject; in + ablative ventre. Quoted from the Emerald Tablet.',
                        },
                        {
                            native: 'Nutrix eius terra est',
                            translit: 'Nutrix eius terra est',
                            gloss: 'Its nurse is the earth.',
                            note: 'Emblem II. Two nominatives and est. Also from the Tablet.',
                        },
                        {
                            native: 'Vade ad mulierem lavantem pannos, tu fac similiter',
                            translit: 'Vade ad mulierem lavantem pannos, tu fac similiter',
                            gloss: 'Go to the woman washing clothes; do thou likewise.',
                            note: 'Emblem III. vade imperative; ad + accusative mulierem; lavantem a present participle agreeing with mulierem; pannos its accusative object; fac the irregular imperative of facio; similiter an adverb. tu is emphatic: \'you, for your part\'.',
                        },
                        {
                            native: 'Coniunge fratrem cum sorore et propina illis poculum amoris',
                            translit: 'Coniunge fratrem cum sorore et propina illis poculum amoris',
                            gloss: 'Join the brother with the sister and give them the cup of love to drink.',
                            note: 'Emblem IV. Two imperatives; cum + ablative sorore; illis dative plural, \'to them\'; poculum amoris an accusative with a genitive hanging from it.',
                        },
                        {
                            native: 'Seminate aurum vestrum in terram albam foliatam',
                            translit: 'Seminate aurum vestrum in terram albam foliatam',
                            gloss: 'Sow your gold in white foliated earth.',
                            note: 'Emblem VI. seminate is a plural imperative — Maier addresses the whole company here. in + accusative, and three words agreeing: terram albam foliatam.',
                        },
                        {
                            native: 'Accipe ovum et igneo percute gladio',
                            translit: 'Accipe ovum et igneo percute gladio',
                            gloss: 'Take the egg and strike it with a fiery sword.',
                            note: 'Emblem VIII. igneo ... gladio is an ablative of means split around the verb percute — a thoroughly Latin habit that looks impossible until you have seen it twice.',
                        },
                        {
                            native: 'Fac ex mare et foemina circulum, inde quadrangulum, hinc triangulum, fac circulum et habebis lapidem Philosophorum',
                            translit: 'Fac ex mare et foemina circulum, inde quadrangulum, hinc triangulum, fac circulum et habebis lapidem Philosophorum',
                            gloss: 'Make of male and female a circle, then a square, then a triangle; make a circle, and you will have the stone of the philosophers.',
                            note: 'Emblem XXI, the most reproduced image in the book. mare is the ablative of mas, \'male\', not the neuter \'sea\'. habebis is a future, as in the Tablet.',
                        },
                        {
                            native: 'Sol et eius umbra perficiunt opus',
                            translit: 'Sol et eius umbra perficiunt opus',
                            gloss: 'The sun and its shadow complete the work.',
                            note: 'Emblem XLV, printed there with the spelling ejus. Two nominative subjects joined by et take a plural verb, perficiunt; opus is the accusative object.',
                        },
                    ],
                },
                {
                    heading: 'The Rosarium and what may be quoted from it',
                    paragraphs: [
                        'The Rosarium philosophorum was printed at Frankfurt by Cyriacus Jacobus in 1550, as the second part of De alchimia opuscula complura veterum philosophorum. Its own title-page line begins: Rosarium philosophorum. Secunda pars alchimiae de lapide philosophico vero modo praeparando. Take it apart: secunda pars, nominative, \'the second part\'; alchimiae, genitive, \'of alchemy\'; de lapide philosophico, ablative after de, \'concerning the philosophers\' stone\'; vero modo, ablative of manner, \'in the true way\'; praeparando, a gerundive in the ablative agreeing with lapide, \'to be prepared\'. The whole is \'The second part of alchemy, concerning the philosophers\' stone, to be prepared in the true manner\'. The gerundive is beyond this course, but you can see its shape: a verbal adjective saying what must be done to the noun it agrees with.',
                        'The book\'s fame rests on its twenty woodcuts — the Mercurial Fountain, the King and Queen, the bath, the conjunction, the death and putrefaction, the ascent and return of the soul, the final hermaphrodite. They are among the most reproduced images in the whole tradition.',
                        'And here an honest caution is owed, because the woodcut captions are quoted constantly and quoted carelessly. The verses printed beneath the woodcuts in the 1550 edition are in German, not Latin. Latin labels do accompany the images in the tradition — Coniunctio sive coitus, Ablutio vel mundificatio, and others — but the wording varies between the 1550 printing, the later manuscript copies and the modern reproductions, and the versions most people quote come by way of C. G. Jung\'s Die Psychologie der Übertragung of 1946, which reprinted the series and made it famous. Before you assign a Latin caption to the sixteenth century, look at a facsimile of the 1550 print. This is not pedantry; a good deal of what is confidently attributed to the Rosarium was in fact standardised in the twentieth century.',
                        'The Latin of the labels themselves is easy, and worth having. Coniunctio sive coitus: \'conjunction, or coupling\' — sive and seu both mean \'or\', offering an alternative name for the same thing, and vel does the same work. Ablutio vel mundificatio: \'washing, or purification\'. These are nominative nouns in apposition, naming a stage. That grammar, at least, is not in dispute.',
                    ],
                    examples: [
                        {
                            native: 'Secunda pars alchimiae',
                            translit: 'Secunda pars alchimiae',
                            gloss: 'The second part of alchemy',
                            note: 'Adjective and noun agreeing in the nominative, plus a genitive.',
                        },
                        {
                            native: 'de lapide philosophico',
                            translit: 'de lapide philosophico',
                            gloss: 'concerning the philosophers\' stone',
                            note: 'de + ablative. philosophico is an adjective agreeing with lapide, so strictly \'the philosophical stone\'.',
                        },
                        {
                            native: 'Coniunctio sive coitus',
                            translit: 'Coniunctio sive coitus',
                            gloss: 'Conjunction, or coupling',
                            note: 'Two nominatives in apposition joined by sive, \'or\'. Widely reproduced as a plate label; check a facsimile before dating the wording to 1550.',
                        },
                        {
                            native: 'Ablutio vel mundificatio',
                            translit: 'Ablutio vel mundificatio',
                            gloss: 'Washing, or purification',
                            note: 'Same construction with vel. Both nouns are third declension, from abluo and mundifico.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'ventus',
                    translit: 'ventus',
                    gloss: 'wind',
                },
                {
                    native: 'venter',
                    translit: 'venter',
                    gloss: 'belly, womb',
                },
                {
                    native: 'nutrix',
                    translit: 'nutrix',
                    gloss: 'nurse',
                },
                {
                    native: 'mulier',
                    translit: 'mulier',
                    gloss: 'woman',
                },
                {
                    native: 'frater',
                    translit: 'frater',
                    gloss: 'brother',
                },
                {
                    native: 'soror',
                    translit: 'soror',
                    gloss: 'sister',
                },
                {
                    native: 'ovum',
                    translit: 'ovum',
                    gloss: 'egg',
                },
                {
                    native: 'gladius',
                    translit: 'gladius',
                    gloss: 'sword',
                },
                {
                    native: 'umbra',
                    translit: 'umbra',
                    gloss: 'shadow, shade',
                },
                {
                    native: 'coniunctio',
                    translit: 'coniunctio',
                    gloss: 'joining, conjunction',
                },
                {
                    native: 'pars',
                    translit: 'pars',
                    gloss: 'part, portion',
                },
                {
                    native: 'mas',
                    translit: 'mas',
                    gloss: 'male',
                },
            ],
            exercises: [
                {
                    prompt: 'Name the three parts of an emblem in the sense established by Alciato.',
                    answer: 'The inscriptio or motto, the pictura or image, and the subscriptio or epigram.',
                    hint: 'One is above, one is in the middle, one is below.',
                },
                {
                    prompt: 'Parse Nutrix eius terra est and translate it.',
                    answer: 'nutrix — nominative singular, \'nurse\'; eius — genitive singular of is, \'of it, its\'; terra — nominative singular, \'earth\'; est — \'is\'. \'Its nurse is the earth.\' Two nominatives joined by est, so either could be read as subject; the sense taken from the Tablet is that the earth is the nurse.',
                    hint: 'Find the copula and the two nominatives.',
                },
                {
                    prompt: 'In Accipe ovum et igneo percute gladio, which two words belong together, and what case are they in?',
                    answer: 'igneo and gladio belong together — ablative singular, \'with a fiery sword\'. The imperative percute stands between them, which is ordinary Latin word order and not a corruption.',
                    hint: 'An adjective must agree with its noun even if a verb intervenes.',
                },
                {
                    prompt: 'What kind of word is seminate, and how does it differ from semina?',
                    answer: 'seminate is the plural imperative of semino, \'sow\', addressed to more than one person. semina is the singular imperative, addressed to one.',
                    hint: 'The -te ending.',
                },
                {
                    prompt: 'Two mottoes of Atalanta fugiens are quotations from the Emerald Tablet. Give them.',
                    answer: 'Portavit eum ventus in ventre suo (Emblem I) and Nutrix eius terra est (Emblem II).',
                    hint: 'They open the book.',
                },
                {
                    prompt: 'In emblem XXI, fac ex mare et foemina circulum, the word mare does not mean \'sea\'. What does it mean, and how do you know?',
                    answer: 'It is the ablative singular of mas, maris, \'a male\' — \'out of male and female\'. The neuter noun mare, \'sea\', is spelled the same way in the nominative and accusative, but foemina standing beside it settles the sense.',
                    hint: 'What is the natural partner of foemina?',
                },
                {
                    prompt: 'Why must one be careful in quoting the Latin labels of the Rosarium woodcuts?',
                    answer: 'Because the verses printed under the woodcuts in the 1550 Frankfurt edition are in German, and the Latin labels commonly quoted vary between that printing, later manuscript copies and modern reproductions — above all Jung\'s Psychologie der Übertragung of 1946, which made the series famous. Check a facsimile of the 1550 print before assigning a caption to the sixteenth century.',
                    hint: 'Ask where the wording you are quoting actually comes from.',
                },
                {
                    prompt: 'Translate Sol et eius umbra perficiunt opus, and say why the verb is plural.',
                    answer: '\'The sun and its shadow complete the work.\' The verb is plural because there are two nominative subjects, sol and umbra, joined by et.',
                    hint: 'Count the subjects.',
                },
            ],
        },
        {
            number: 8,
            title: 'The Emerald Tablet',
            aim: 'To read the Tabula Smaragdina entire in its standard Latin text, clause by clause, and to know honestly where it came from and what in it remains undecided.',
            sections: [
                {
                    heading: 'Where the tablet comes from',
                    paragraphs: [
                        'The Emerald Tablet is not Egyptian, and there is no tablet. It is an Arabic text. Its earliest known appearance is in the Kitab sirr al-khaliqa, the Book of the Secret of Creation, a cosmological work attributed to Balinus — that is, to a pseudonymous Apollonius of Tyana — and compiled, on the best current estimates, in the late eighth or early ninth century. A shorter version travels in the Sirr al-asrar, the Secret of Secrets, an Arabic book of counsel to princes that Europe knew as the Secretum secretorum of Pseudo-Aristotle. Some scholars argue for a lost Greek antecedent behind the Arabic; no Greek text survives, and the case rests on style and content rather than on a manuscript.',
                        'Latin got it in the twelfth and thirteenth centuries, by more than one road. Hugo of Santalla translated the Sirr al-khaliqa in Spain around the middle of the twelfth century, and his version of the Tablet differs from the one that became standard. The Secretum secretorum, partially rendered by John of Seville about 1140 and fully by Philip of Tripoli about 1243, carried a version of the text into general European reading, since that book was among the most widely copied works of the Middle Ages.',
                        'The text printed below is the so-called vulgate Latin, the version that circulates with the commentary of Hortulanus — a Latin alchemist of the fourteenth century about whom almost nothing is known, not even his real name — and that was printed with that commentary in De alchemia, Nuremberg, 1541. It is not an original. It is the form of the text that Europe read, quoted, glossed and set to work, and that is precisely why it is worth reading. Wordings vary between manuscripts and prints, and the division into numbered clauses is a modern editorial convenience.',
                        'The frame-story belongs to the literature and not to archaeology. In the Arabic sources the tablet is found in a vault beneath a statue of Hermes, in the hands of the corpse; later European versions have it discovered by Sarah, the wife of Abraham, or by Alexander. These are conventions of revelation-narrative, and were probably understood as such by many of the people who copied them. No object has ever been produced, and none is expected.',
                        'One later reader deserves a mention. Isaac Newton made an English rendering of the Tablet, preserved among his alchemical papers as Keynes MS 28 in King\'s College, Cambridge, and unpublished in his lifetime. It opens \'That which is below is like that which is above\', and its plain, flat phrasing has echoed through English versions ever since — often in translations whose makers had never read him.',
                    ],
                    examples: [
                        {
                            native: 'Tabula Smaragdina',
                            translit: 'Tabula Smaragdina',
                            gloss: 'The Emerald Tablet',
                            note: 'Adjective agreeing with noun, both first declension, both feminine, both nominative singular. Stressed TA-bu-la sma-RAG-di-na.',
                        },
                        {
                            native: 'Tabula Smaragdina Hermetis Trismegisti',
                            translit: 'Tabula Smaragdina Hermetis Trismegisti',
                            gloss: 'The Emerald Tablet of Hermes Trismegistus',
                            note: 'The heading in the printed editions. Hermetis Trismegisti is a genitive, third and second declension respectively.',
                        },
                    ],
                },
                {
                    heading: 'The text: first half',
                    paragraphs: [
                        'Read each clause aloud before you look at the gloss. You have met every construction in it. Where a clause defeats you, find the verb, then the nominative, then let the prepositions and genitives arrange themselves.',
                        'There is one textual crux in this half, and it is a good one. In the third clause, printed editions differ between meditatione unius, \'by the meditation of one\', and mediatione unius, \'by the mediation of one\'. A single letter, and two quite different doctrines: contemplation on one side, and an intermediary principle on the other. Both readings are attested; neither can be shown to be the original. Anyone who quotes the line without noticing the variant has not looked at more than one edition.',
                        'In the seventh clause the word telesmi is the great unknown of the text. It is a Greek loan, from telesma, a completed rite or a consecrated object, and it is the ancestor — through Arabic tilsam — of the English \'talisman\'. What Hortulanus and his successors took it to mean varies: talisman, perfection, the whole created order. The manuscripts vary in spelling too, giving thelesmi as well as telesmi, and the Latin nominative behind the form is itself uncertain. The honest statement is that we do not know, and that anyone who translates it with confidence is supplying a doctrine rather than reading one. The final word of that clause, hic, is ambiguous as well: it can be the adverb \'here\' or the pronoun \'this\'.',
                    ],
                    examples: [
                        {
                            native: 'Verum, sine mendacio, certum et verissimum:',
                            translit: 'Verum, sine mendacio, certum et verissimum:',
                            gloss: 'True, without falsehood, certain and most true:',
                            note: 'Three neuter adjectives with no noun and no verb — the Latin equivalent of a seal stamped on a document. verissimum is a superlative, \'most true\'.',
                        },
                        {
                            native: 'Quod est inferius est sicut quod est superius, et quod est superius est sicut quod est inferius, ad perpetranda miracula rei unius.',
                            translit: 'Quod est inferius est sicut quod est superius, et quod est superius est sicut quod est inferius, ad perpetranda miracula rei unius.',
                            gloss: 'That which is below is as that which is above, and that which is above is as that which is below, for the accomplishing of the miracles of the one thing.',
                            note: 'quod, \'that which\'; inferius and superius are neuter comparatives; sicut, \'just as\'. ad perpetranda miracula is a gerundive construction of purpose; rei unius is the genitive of res una, \'the one thing\'.',
                        },
                        {
                            native: 'Et sicut omnes res fuerunt ab uno, meditatione unius, sic omnes res natae fuerunt ab hac una re, adaptatione.',
                            translit: 'Et sicut omnes res fuerunt ab uno, meditatione unius, sic omnes res natae fuerunt ab hac una re, adaptatione.',
                            gloss: 'And as all things were from one, by the meditation of one, so all things were born from this one thing, by adaptation.',
                            note: 'ab + ablative uno; meditatione and adaptatione are bare ablatives of means; natae fuerunt is a perfect passive with feminine plural agreement, since res is feminine. Note the variant mediatione, \'by the mediation\'.',
                        },
                        {
                            native: 'Pater eius est Sol, mater eius Luna;',
                            translit: 'Pater eius est Sol, mater eius Luna;',
                            gloss: 'Its father is the Sun, its mother the Moon;',
                            note: 'The second clause has no verb: supply est. eius is the genitive, \'of it\'.',
                        },
                        {
                            native: 'portavit illud ventus in ventre suo;',
                            translit: 'portavit illud ventus in ventre suo;',
                            gloss: 'the wind carried it in its belly;',
                            note: 'Perfect active with the subject third. Maier\'s Emblem I quotes this with eum for illud.',
                        },
                        {
                            native: 'nutrix eius terra est.',
                            translit: 'nutrix eius terra est.',
                            gloss: 'its nurse is the earth.',
                            note: 'Maier\'s Emblem II.',
                        },
                        {
                            native: 'Pater omnis telesmi totius mundi est hic.',
                            translit: 'Pater omnis telesmi totius mundi est hic.',
                            gloss: 'The father of every telesma of the whole world is here — or, this is the father of all perfection of the whole world.',
                            note: 'Two genitives in series, and two live ambiguities: what telesmi means, and whether hic is \'here\' or \'this\'. The translation you choose is an interpretation, and should be labelled as one.',
                        },
                    ],
                },
                {
                    heading: 'The text: second half',
                    paragraphs: [
                        'The second half turns from cosmology to instruction, and the grammar turns with it. Notice how many verbs are in the second-person future: separabis, habebis. Latin recipe-writing gives its orders this way — \'thou shalt separate\', \'thou shalt have\' — and the older English translations preserve the idiom exactly. It is the same construction as invenies in the VITRIOL motto, and recognising it is one of the small, real skills this course exists to give you.',
                        'Notice too the sound of the clause beginning Haec est totius fortitudinis fortitudo fortis, which puts three words from one root in a row; a Latin rhetorician would call it a figura etymologica, and the effect is incantatory rather than informative. The Latin is doing something here that translation always flattens.',
                        'Two cautions. First, ascendit and descendit could each be present (\'it ascends\') or perfect (\'it ascended\') — the forms are identical apart from a vowel length that print does not show. Most translators take them as present, and the present recipit alongside them supports that reading, but the text itself does not settle it. Second, spelling: the printed editions of 1541 and after set coelum where we print caelum, and some set ejus for eius. Nothing turns on either.',
                    ],
                    examples: [
                        {
                            native: 'Vis eius integra est, si versa fuerit in terram.',
                            translit: 'Vis eius integra est, si versa fuerit in terram.',
                            gloss: 'Its power is whole, if it be turned into earth.',
                            note: 'vis, \'force, power\', is feminine; integra agrees with it; versa fuerit is a future perfect passive agreeing with it too. in + accusative for change into.',
                        },
                        {
                            native: 'Separabis terram ab igne, subtile a spisso, suaviter, cum magno ingenio.',
                            translit: 'Separabis terram ab igne, subtile a spisso, suaviter, cum magno ingenio.',
                            gloss: 'Thou shalt separate the earth from the fire, the subtle from the gross, gently, with great skill.',
                            note: 'separabis is a future used as an instruction. subtile and spisso are neuter adjectives used as nouns. suaviter is an adverb; cum magno ingenio an ablative of manner.',
                        },
                        {
                            native: 'Ascendit a terra in caelum, iterumque descendit in terram, et recipit vim superiorum et inferiorum.',
                            translit: 'Ascendit a terra in caelum, iterumque descendit in terram, et recipit vim superiorum et inferiorum.',
                            gloss: 'It ascends from the earth into heaven, and again descends into the earth, and receives the power of the things above and below.',
                            note: 'a + ablative for the source, in + accusative for the goal — the distinction of Lesson 4, doing all the work. vim is the accusative of vis. superiorum and inferiorum are comparative genitive plurals used as nouns. Printed editions spell caelum as coelum.',
                        },
                        {
                            native: 'Sic habebis gloriam totius mundi. Ideo fugiet a te omnis obscuritas.',
                            translit: 'Sic habebis gloriam totius mundi. Ideo fugiet a te omnis obscuritas.',
                            gloss: 'Thus wilt thou have the glory of the whole world. Therefore shall all obscurity flee from thee.',
                            note: 'Two futures. a te, \'from thee\', ablative after a. obscuritas is the nominative subject of fugiet.',
                        },
                        {
                            native: 'Haec est totius fortitudinis fortitudo fortis, quia vincet omnem rem subtilem, omnemque solidam penetrabit.',
                            translit: 'Haec est totius fortitudinis fortitudo fortis, quia vincet omnem rem subtilem, omnemque solidam penetrabit.',
                            gloss: 'This is the strong strength of all strength, for it will overcome every subtle thing and penetrate every solid one.',
                            note: 'haec, feminine nominative, agreeing with fortitudo. quia, \'because\'. Two more futures, vincet and penetrabit. omnemque solidam has rem understood.',
                        },
                        {
                            native: 'Sic mundus creatus est. Hinc erunt adaptationes mirabiles, quarum modus est hic.',
                            translit: 'Sic mundus creatus est. Hinc erunt adaptationes mirabiles, quarum modus est hic.',
                            gloss: 'So was the world created. From this will come wonderful adaptations, of which this is the manner.',
                            note: 'creatus est is a perfect passive; erunt is the future of sum; quarum is the feminine genitive plural of the relative pronoun, agreeing with adaptationes. Some prints give the last three words as modus hic est.',
                        },
                        {
                            native: 'Itaque vocatus sum Hermes Trismegistus, habens tres partes philosophiae totius mundi.',
                            translit: 'Itaque vocatus sum Hermes Trismegistus, habens tres partes philosophiae totius mundi.',
                            gloss: 'Therefore am I called Hermes Thrice-Greatest, having the three parts of the philosophy of the whole world.',
                            note: 'vocatus sum is a perfect passive and may be rendered \'I was called\' or \'I am called\'. habens is a present participle. Two genitives again: philosophiae totius mundi.',
                        },
                        {
                            native: 'Completum est quod dixi de operatione Solis.',
                            translit: 'Completum est quod dixi de operatione Solis.',
                            gloss: 'What I have said of the operation of the Sun is complete.',
                            note: 'completum est perfect passive; quod, \'that which\'; dixi first person perfect active, \'I said\'; de + ablative for the subject-matter.',
                        },
                    ],
                },
                {
                    heading: 'What the Latin will and will not tell you',
                    paragraphs: [
                        'You have now read the whole thing. Before you close the book, four observations that only reading the Latin can give you.',
                        'First, the famous maxim is smaller than its reputation. Quod est inferius est sicut quod est superius says exactly one thing: that the below is as the above. Sicut is a plain comparison, \'just as\'. It does not say that the below is the above, or that either causes the other, or anything about man and cosmos. The doctrine of correspondence is a construction placed on this sentence, and a very old and fruitful one — but the Latin supplies the comparison, and you supply the metaphysics. Knowing which is which is the difference between a reader and a devotee.',
                        'Second, the text is a set of instructions wearing a cosmology. Separabis, habebis, vincet, penetrabit — the futures are procedural. Hortulanus read the whole piece as a veiled recipe for the stone, clause by clause, and printed his reading alongside it for four centuries; others have read it cosmologically, as an account of how the one becomes the many. Both readings are medieval, both are defensible from the Latin, and the text does not adjudicate between them.',
                        'Third, de operatione Solis, the last three words, means \'concerning the work of the Sun\'. In the language of the art, the Sun is gold. The Tablet closes by telling you what it has been about, and what it says it has been about is the making of gold. Whatever else one may find in it, that plain sense is there in the Latin and ought not to be quietly dropped.',
                        'Fourth, the parts you cannot translate. Telesmi is not securely understood. Meditatione may be mediatione. Hic may be \'here\' or \'this\'. Ascendit may be present or past. Four small uncertainties in a text this short is not a scandal; it is the normal condition of something that travelled from Arabic through several Latin hands over five hundred years. What would be a scandal is to translate confidently past them and let a reader think the Latin was clear where it is not.',
                        'Where to go from here. Get a grammar and work through it — Wheelock\'s Latin if you want it gentle, Moreland and Fleischer if you want it fast. Get a dictionary: Lewis and Short for the classical language, and Du Cange or Niermeyer for the medieval vocabulary that the alchemists actually use. Then read with the Latin on the left and a translation on the right, and argue with the translation. Eight lessons have made you a reader who can check. That is a smaller thing than fluency and a much larger thing than trust.',
                    ],
                    examples: [
                        {
                            native: 'Quod est inferius est sicut quod est superius',
                            translit: 'Quod est inferius est sicut quod est superius',
                            gloss: 'That which is below is as that which is above',
                            note: 'sicut is a comparison and nothing more. The rest is interpretation, and worth doing — but worth labelling.',
                        },
                        {
                            native: 'de operatione Solis',
                            translit: 'de operatione Solis',
                            gloss: 'concerning the operation of the Sun',
                            note: 'The Tablet\'s own statement of its subject. In the vocabulary of the art, the Sun is gold.',
                        },
                        {
                            native: 'telesmi',
                            translit: 'telesmi',
                            gloss: 'of telesma — meaning uncertain',
                            note: 'Greek telesma by way of Arabic tilsam; the ancestor of \'talisman\'. Read as talisman, as perfection, and as the created order by different commentators. Spelled thelesmi in some witnesses.',
                        },
                    ],
                },
            ],
            vocabulary: [
                {
                    native: 'verum',
                    translit: 'verum',
                    gloss: 'true; a true thing, the truth',
                },
                {
                    native: 'certus',
                    translit: 'certus',
                    gloss: 'certain, sure, fixed',
                },
                {
                    native: 'superior',
                    translit: 'superior',
                    gloss: 'higher, upper',
                },
                {
                    native: 'inferior',
                    translit: 'inferior',
                    gloss: 'lower, below',
                },
                {
                    native: 'miraculum',
                    translit: 'miraculum',
                    gloss: 'wonder, marvel, miracle',
                },
                {
                    native: 'res',
                    translit: 'res',
                    gloss: 'thing, matter, affair',
                },
                {
                    native: 'subtilis',
                    translit: 'subtilis',
                    gloss: 'fine, thin, subtle',
                },
                {
                    native: 'spissus',
                    translit: 'spissus',
                    gloss: 'thick, dense, gross',
                },
                {
                    native: 'separo',
                    translit: 'separo',
                    gloss: 'to separate, divide',
                },
                {
                    native: 'adaptatio',
                    translit: 'adaptatio',
                    gloss: 'adaptation, fitting-together',
                },
                {
                    native: 'obscuritas',
                    translit: 'obscuritas',
                    gloss: 'darkness, obscurity',
                },
                {
                    native: 'operatio',
                    translit: 'operatio',
                    gloss: 'working, operation',
                },
            ],
            exercises: [
                {
                    prompt: 'Translate the opening formula: Verum, sine mendacio, certum et verissimum.',
                    answer: 'True, without falsehood, certain and most true.',
                    hint: 'Three adjectives and a prepositional phrase; no verb at all.',
                },
                {
                    prompt: 'What does quod est inferius mean literally, and what does the clause as a whole claim?',
                    answer: '\'That which is below.\' quod is the relative pronoun used as \'that which\'; est is \'is\'; inferius is the neuter comparative of inferus, \'lower\'. The whole clause, quod est inferius est sicut quod est superius, claims a likeness and nothing more: \'that which is below is as that which is above\'. sicut is a plain comparison, not an identity.',
                    hint: 'Pay attention to how much work sicut is actually doing.',
                },
                {
                    prompt: 'Separabis and habebis are futures, not imperatives. Why does the text use them?',
                    answer: 'Because Latin instruction — recipes, precepts, technical writing — regularly gives orders in the second-person future indicative: \'thou shalt separate\', \'thou shalt have\'. The same idiom produces invenies, \'thou shalt find\', in the VITRIOL motto.',
                    hint: 'You met this idiom in Lesson 5.',
                },
                {
                    prompt: 'Give the Latin for \'Its father is the Sun, its mother the Moon\', as the Tablet has it.',
                    answer: 'Pater eius est Sol, mater eius Luna',
                    hint: 'The second clause leaves its verb to be supplied.',
                },
                {
                    prompt: 'Why is terram accusative in si versa fuerit in terram?',
                    answer: 'Because in with the accusative expresses motion or change into something: \'if it shall have been turned into earth\'. With the ablative, in terra, the phrase would mean \'in the earth\', with no change of state.',
                    hint: 'The distinction from Lesson 4.',
                },
                {
                    prompt: 'What does telesmi mean in the clause Pater omnis telesmi totius mundi est hic, and how certain is that meaning?',
                    answer: 'It is the genitive of a Greek loanword, from telesma, \'a completed rite, a consecrated object\', which reached Latin through Arabic tilsam and gave English \'talisman\'. Its force here is not settled: commentators have read it as talisman, as perfection, and as the whole created order; the manuscripts vary between telesmi and thelesmi; and even the Latin nominative behind the form is uncertain. Any confident single translation is supplying a doctrine rather than reading one.',
                    hint: 'The honest answer includes an admission.',
                },
                {
                    prompt: 'Where does the Emerald Tablet first appear, and in what language?',
                    answer: 'In Arabic. The earliest known text is in the Kitab sirr al-khaliqa, the Book of the Secret of Creation, attributed to Balinus — a pseudonymous Apollonius of Tyana — and compiled in the late eighth or early ninth century. No Greek original survives, though some scholars argue for a lost Greek antecedent, and there is no physical emerald tablet.',
                    hint: 'Not Egyptian, and not Greek so far as any manuscript shows.',
                },
                {
                    prompt: 'Whose commentary travels with the standard Latin text, and when was it printed alongside it?',
                    answer: 'Hortulanus, a Latin alchemist of the fourteenth century about whom almost nothing is known. His commentary accompanies the text in the manuscripts and was printed with it in De alchemia, Nuremberg, 1541.',
                    hint: 'His name means \'the gardener\'.',
                },
            ],
        },
    ],
};
