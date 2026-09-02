// sanskrit course — eight lessons for the Scriptorium.
// Authored to the same discipline as the other courses: every quoted text is
// attested and cited, every paradigm is the standard one, every sandhi is
// worked in both directions, and where the scholarship is genuinely divided
// — as it is on one word of the Gāyatrī — the lesson says so rather than
// choosing quietly. Classical Sanskrit is taught; the Vedic forms met in the
// final verse are pointed out as Vedic.
export default {
    language: 'sanskrit',
    title: 'The Perfected Tongue',
    tagline: 'Eight lessons from the first vowel to the Gāyatrī — the verse recited at dawn for three thousand years — read in its own script, with every word accounted for.',
    overview: 'This course assumes no Sanskrit and no Devanagari, and ends with you reading, unaided, Ṛgveda 3.62.10 — the Gāyatrī, which the tradition calls the mother of the Veda and gives to the student at initiation. Eight lessons, each built on the last: what kind of writing Devanagari is and why its alphabet is ordered by the mouth; the vowels in their two shapes; the consonants in their five rows and the conjunct signs that stack them; sandhi, the rules of joining that make running Sanskrit look like a single word; the noun and its eight cases, with the dual; the verb, through the two great sayings that turn on a form of \'to be\'; the compound, and three short texts read entire; and then the Gāyatrī itself, every join undone and every form named. Everything quoted is genuinely attested, and the grammar is the standard grammar. The course teaches classical Sanskrit; the Vedic forms in the final verse are pointed out when they come.',
    lessons: [
        {
            number: 1,
            title: 'The Alphabet Ordered by the Mouth',
            aim: 'Learn what kind of writing Devanagari is — a syllabary of consonant-plus-a rather than an alphabet — how the virāma cancels the built-in vowel, and why the traditional order of the letters is a map of the mouth.',
            sections: [
                {
                    heading: 'A language named for its own refinement',
                    paragraphs: [
                        'Saṃskṛta means \'put together, perfected\' — sam, \'together\', on the root kṛ, \'to make\' — and the name is a claim: this is speech refined out of ordinary speech, prākṛta, \'the natural\', and held at that pitch by grammar. The grammar in question is Pāṇini\'s Aṣṭādhyāyī, \'the eight chapters\', composed in perhaps the fourth century before the common era in just under four thousand sūtras, and it is still the instrument by which the language is judged. No later grammar of any language has matched its economy, and the learner should know from the first day that Sanskrit is, unusually, a language whose rules were written down before most of its literature.',
                        'Sanskrit has no script of its own. It has been written in Brāhmī and in every one of Brāhmī\'s descendants — Śāradā in Kashmir, Grantha in the Tamil country, Bengali, Telugu, Kannada, Malayalam, Siddhaṃ in the Buddhist east — and the Devanagari in which it is printed today is a medieval northern hand that the presses of the nineteenth century made universal. Nāgarī means \'of the city\'; the deva-, \'divine\', was prefixed later, and the reason is not securely known. What matters for the reader is that the sounds are the language and the letters are only one costume for them, which is why this course keeps the transliteration beside every word.',
                    ],
                    examples: [
                        { native: 'संस्कृत', translit: 'saṃskṛta', gloss: 'put together, perfected — the language\'s name for itself', note: null },
                        { native: 'प्राकृत', translit: 'prākṛta', gloss: 'natural, ordinary — the name for the vernaculars it was refined out of', note: null },
                        { native: 'देवनागरी', translit: 'devanāgarī', gloss: 'the script of this course; nāgarī, \'of the city\', with deva- added later', note: null },
                        { native: 'अष्टाध्यायी', translit: 'aṣṭādhyāyī', gloss: 'the Eight Chapters — Pāṇini\'s grammar, and the language\'s constitution', note: null },
                    ],
                },
                {
                    heading: 'Every consonant carries a vowel',
                    paragraphs: [
                        'Devanagari is not an alphabet but an abugida: the basic sign is a syllable, not a sound. The letter क does not write k; it writes ka, with a short a built in, and so does every consonant sign. To write the bare consonant, a small stroke called virāma or halanta is hung beneath it — क् — and the built-in vowel is cancelled. Reading therefore begins with a habit that English does not teach: every consonant you see is followed by a, unless something removes or replaces it.',
                        'The consequence is that a word like kamala, \'lotus\', needs no vowel signs at all. It is written कमल — three consonant signs, each carrying its a — and reads k-a m-a l-a. The horizontal line along the top, the śirorekhā or head-stroke, joins the letters of a word into one unit, so that a Sanskrit word hangs from its line like washing. In manuscripts the spaces between words were optional and often absent; print has added them, and the reader should be grateful.',
                    ],
                    examples: [
                        { native: 'क', translit: 'ka', gloss: 'the consonant sign, with its inherent short a', note: null },
                        { native: 'क्', translit: 'k', gloss: 'the same sign with virāma: the vowel cancelled', note: null },
                        { native: 'कमल', translit: 'kamala', gloss: 'lotus — three signs, three syllables, and not one vowel mark', note: null },
                        { native: 'नमः', translit: 'namaḥ', gloss: 'homage — n-a m-a and the final breath called visarga, met properly in the next lesson', note: null },
                    ],
                },
                {
                    heading: 'The order of the mouth',
                    paragraphs: [
                        'The Roman alphabet runs A, B, C in an order that means nothing. The Sanskrit varṇamālā, the \'garland of letters\', is a phonetic table. The vowels come first: the simple ones in short-and-long pairs, a ā, i ī, u ū, ṛ ṝ, ḷ ḹ, then the diphthongs e ai o au, then the two after-sounds, anusvāra and visarga. Then the twenty-five stops, in five rows of five, each row named for the place in the mouth where it is made and the rows running from the throat forward: kaṇṭhya, the velars k kh g gh ṅ; tālavya, the palatals c ch j jh ñ; mūrdhanya, the retroflexes ṭ ṭh ḍ ḍh ṇ; dantya, the dentals t th d dh n; oṣṭhya, the labials p ph b bh m. Within each row the order is the same: voiceless, voiceless aspirate, voiced, voiced aspirate, nasal. After the stops come the four semivowels y r l v, the three sibilants ś ṣ s, and h.',
                        'This is the work of the phoneticians whose treatises, the Prātiśākhyas and the Śikṣās, are among the oldest linguistic science anywhere, and it means the alphabet teaches you to pronounce as you learn it. Learn the five place-names now; the next two lessons walk the table row by row, and the fourth lesson\'s rules of joining are stated in these terms.',
                    ],
                    examples: [
                        { native: 'क ख ग घ ङ', translit: 'ka kha ga gha ṅa', gloss: 'the velar row, made at the back of the mouth: kaṇṭhya, \'of the throat\'', note: null },
                        { native: 'त थ द ध न', translit: 'ta tha da dha na', gloss: 'the dental row, tongue at the teeth: dantya, from danta, \'tooth\'', note: null },
                        { native: 'प फ ब भ म', translit: 'pa pha ba bha ma', gloss: 'the labial row, made with the lips: oṣṭhya, from oṣṭha, \'lip\'', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'संस्कृत', translit: 'saṃskṛta', gloss: 'perfected; Sanskrit' },
                { native: 'वर्ण', translit: 'varṇa', gloss: 'a sound, a letter; also colour and class' },
                { native: 'वर्णमाला', translit: 'varṇamālā', gloss: 'the garland of letters — the alphabet in its phonetic order' },
                { native: 'अक्षर', translit: 'akṣara', gloss: 'syllable; also the imperishable' },
                { native: 'विराम', translit: 'virāma', gloss: 'stop, pause; the stroke that cancels the inherent vowel' },
                { native: 'कमल', translit: 'kamala', gloss: 'lotus' },
                { native: 'दन्त', translit: 'danta', gloss: 'tooth' },
                { native: 'ओष्ठ', translit: 'oṣṭha', gloss: 'lip' },
            ],
            exercises: [
                { prompt: 'What does क write on its own, and what does क् write?', answer: 'क writes the syllable ka, with the inherent short a; क् writes the bare consonant k, the virāma beneath it having cancelled the vowel.', hint: 'The small stroke at the foot is the whole difference.' },
                { prompt: 'कमल is kamala, three syllables. Why does it carry no vowel marks?', answer: 'Because each of the three consonant signs carries the short a by itself; a vowel mark is needed only when the vowel is something other than a.', hint: null },
                { prompt: 'Name the five rows of stops in order, with the place in the mouth each is made.', answer: 'Kaṇṭhya, velars, at the back of the mouth; tālavya, palatals; mūrdhanya, retroflexes, tongue-tip curled back; dantya, dentals, at the teeth; oṣṭhya, labials, at the lips. The rows run from the throat forward.', hint: 'Start at the throat and move to the lips.' },
                { prompt: 'Within any one row, what is the order of the five sounds?', answer: 'Voiceless, voiceless aspirate, voiced, voiced aspirate, nasal — k kh g gh ṅ, and likewise in every row.', hint: null },
                { prompt: 'What does the name saṃskṛta mean, and what is its opposite?', answer: 'Put together, perfected: sam, \'together\', on kṛ, \'to make\'. Its opposite is prākṛta, \'natural\', the name for the ordinary vernaculars.', hint: null },
            ],
        },
        {
            number: 2,
            title: 'The Vowels in Their Two Shapes',
            aim: 'Read the fourteen vowels both ways — independent at the start of a syllable, dependent mātrā after a consonant — and the two after-sounds anusvāra and visarga; then read oṃ as the Upaniṣad reads it.',
            sections: [
                {
                    heading: 'Independent and dependent',
                    paragraphs: [
                        'Every vowel has two shapes. When a syllable begins with the vowel — at the start of a word, or after another vowel — the independent form is used: अ a, आ ā, इ i, ई ī, उ u, ऊ ū, ऋ ṛ, ए e, ऐ ai, ओ o, औ au. When the vowel follows a consonant, it is written as a mātrā, a dependent mark attached to the consonant sign, and the inherent a is replaced rather than cancelled. Long ā is a vertical stroke after the consonant, का kā; u and ū hang beneath, कु ku, कू kū; so does ṛ, कृ kṛ; e and ai sit above, के ke, कै kai; o and au combine the ā-stroke with a mark above, को ko, कौ kau.',
                        'One mark breaks the rule of reading left to right, and it catches every beginner. Short i is written before the consonant it follows in sound: कि is ki, the hook on the left belonging to the क on its right. Long ī goes after, की kī. Say the consonant first, whatever the ink does.',
                    ],
                    examples: [
                        { native: 'का कि की', translit: 'kā ki kī', gloss: 'long ā after; short i written before its consonant; long ī after', note: null },
                        { native: 'कु कू कृ', translit: 'ku kū kṛ', gloss: 'the three marks that hang below the letter', note: null },
                        { native: 'के कै को कौ', translit: 'ke kai ko kau', gloss: 'e and ai above; o and au built on the ā-stroke', note: null },
                        { native: 'इति', translit: 'iti', gloss: 'thus — an independent i to open the word, a dependent i on the t', note: null },
                    ],
                },
                {
                    heading: 'Short and long, and the vowel that is not a consonant',
                    paragraphs: [
                        'Length is not decoration. A short vowel is one measure, a mātrā, and a long vowel two, and the difference divides words: kala is a soft, low sound, kāla is time, and also black. The metres of the whole poetic tradition are built on this distinction, and so is the Gāyatrī in the last lesson. The diphthongs e ai o au are always long; the tradition calls them saṃdhyakṣara, \'joined syllables\', because e is an old a plus i and o an old a plus u — a fact that lesson four will turn into a rule.',
                        'Then there is ऋ. It is a vowel, syllabic r, and English speakers must resist turning it into ri or ru — though northern and southern India have done exactly that for centuries, and the reader will hear both. It carries some of the tradition\'s heaviest words: ṛta, the order of the world; ṛṣi, the seer; amṛta, the deathless; and the name Kṛṣṇa, which is two syllables, kṛṣ-ṇa, not three. Its long partner ṝ is rare, and the vowels ḷ and ḹ rarer still — the last occurs in no Sanskrit word at all and is admitted so that every short vowel should have a long one.',
                    ],
                    examples: [
                        { native: 'कल', translit: 'kala', gloss: 'a soft, low sound', note: null },
                        { native: 'काल', translit: 'kāla', gloss: 'time; black — one mātrā longer, and a different word', note: null },
                        { native: 'ऋषि', translit: 'ṛṣi', gloss: 'seer — the syllabic vowel opening the word', note: null },
                        { native: 'अमृत', translit: 'amṛta', gloss: 'deathless; the drink of immortality', note: null },
                        { native: 'कृष्ण', translit: 'kṛṣṇa', gloss: 'dark, black; the name — two syllables, kṛṣ-ṇa', note: null },
                    ],
                },
                {
                    heading: 'The two after-sounds',
                    paragraphs: [
                        'Two marks are recited after the vowels and belong to neither class. Anusvāra, a dot above the line, ं, is a nasal after-sound: saṃskṛta itself carries one, and so does haṃsa, the wild goose that became the tradition\'s image of the soul. The dot is called bindu, \'the point\', and it seals nearly every seed-syllable of the tantras. Visarga, two dots after the letter, ः, is a breath released at the end of a syllable, sounding as a faint echo of the vowel before it: namaḥ, \'homage\', ends in one. The grammarians know it as what a final s or r becomes, so that the nominative namaḥ is underlyingly namas — a fact that becomes the most useful rule in the language when words are joined.',
                    ],
                    examples: [
                        { native: 'हंस', translit: 'haṃsa', gloss: 'goose, swan — the anusvāra as a dot above the ha', note: null },
                        { native: 'नमः', translit: 'namaḥ', gloss: 'homage — the visarga as two dots after the ma', note: null },
                        { native: 'दुःख', translit: 'duḥkha', gloss: 'suffering — a visarga inside a word, before the kha', note: null },
                    ],
                },
                {
                    heading: 'Reading oṃ',
                    paragraphs: [
                        'The syllable that opens recitation is written with a sign of its own, ॐ, though it can be spelled out in ordinary letters as ओम्. The Māṇḍūkya Upaniṣad hears three sounds in it, a, u and m, since o is by rule the joining of a and u; it assigns a to the waking state, u to dream, m to dreamless sleep, and hears in the silence after the m a fourth, turīya, which has no sound and no measure. That analysis is the tradition\'s own, and it is the first place the learner meets the idea, everywhere in this literature, that a sound is a thing and not the name of a thing.',
                    ],
                    examples: [
                        { native: 'ॐ', translit: 'oṃ', gloss: 'the syllable, in its own sign', note: null },
                        { native: 'ओम्', translit: 'om', gloss: 'the same, spelled in ordinary letters: o, and m with virāma', note: null },
                        { native: 'अ उ म्', translit: 'a u m', gloss: 'the three sounds the Māṇḍūkya Upaniṣad hears in it', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'मात्रा', translit: 'mātrā', gloss: 'measure; a dependent vowel mark' },
                { native: 'स्वर', translit: 'svara', gloss: 'vowel; also tone, note' },
                { native: 'ऋत', translit: 'ṛta', gloss: 'the order of the world; truth' },
                { native: 'ऋषि', translit: 'ṛṣi', gloss: 'seer' },
                { native: 'अमृत', translit: 'amṛta', gloss: 'deathless; nectar' },
                { native: 'हंस', translit: 'haṃsa', gloss: 'goose, swan' },
                { native: 'दुःख', translit: 'duḥkha', gloss: 'suffering' },
                { native: 'बिन्दु', translit: 'bindu', gloss: 'point, drop; the anusvāra dot' },
                { native: 'ॐ', translit: 'oṃ', gloss: 'the syllable that opens recitation' },
            ],
            exercises: [
                { prompt: 'Read कि and की. Which is short, and which mark stands on the wrong side of its consonant?', answer: 'कि is ki, short, and its mark is written to the left of the क although it is sounded after it; की is kī, long, with the mark after.', hint: null },
                { prompt: 'Read गुरु and say which marks it uses.', answer: 'guru, \'teacher\'. Both syllables carry the short-u mark hanging beneath the consonant: गु gu, रु ru.', hint: 'Two vowels, both short, both below the line.' },
                { prompt: 'What are the two dots at the end of नमः, and what sound do the grammarians say lies beneath them?', answer: 'The visarga, a released breath. It stands for an underlying final s: namaḥ is namas, which is why the word changes shape when another word follows.', hint: null },
                { prompt: 'Name the three sounds the Māṇḍūkya Upaniṣad hears in oṃ and the state it assigns to each.', answer: 'a, the waking state; u, dream; m, dreamless sleep — and a soundless fourth, turīya, in the silence after.', hint: null },
                { prompt: 'How many syllables in कृष्ण, and why?', answer: 'Two: kṛṣ-ṇa. The ṛ is a vowel in its own right, so kṛṣ is a full syllable; there is no i or u in the word however it is pronounced in the north or south.', hint: null },
                { prompt: 'Is ए long or short?', answer: 'Long, always. All four diphthongs, e ai o au, count as long; the tradition calls them saṃdhyakṣara because each is two old vowels joined.', hint: null },
            ],
        },
        {
            number: 3,
            title: 'The Consonants in Their Rows',
            aim: 'Sound the thirty-three consonants correctly — the aspirates, the retroflexes, the three sibilants — and read the conjunct signs that stack consonants into one glyph.',
            sections: [
                {
                    heading: 'Five rows of five, and the puff of breath',
                    paragraphs: [
                        'The table of stops from lesson one now has to be pronounced. In each row, the second and fourth sounds are aspirates, mahāprāṇa, \'great breath\': kha is ka with an audible puff after it, gha is ga with the same. English has the puff but never uses it to tell words apart; Sanskrit does, everywhere. Rata is \'delighted\'; ratha is \'chariot\'. Kala is a soft sound; khala is a scoundrel. The voiced aspirates gh jh ḍh dh bh have no English equivalent at all, and the learner must build them: dharma is not darma, and bhakti is not bakti.',
                        'The fifth column is the nasal proper to each row, and the language places them by rule. ṅ never begins a word and stands only before another velar, as in aṅga, \'limb\', and Gaṅgā; ñ appears only before palatals, as in pañca, \'five\'; the retroflex ṇ turns up wherever the rules of the previous lesson\'s vowel ṛ and of r and ṣ demand it, as in Kṛṣṇa and Pāṇini; n and m are the nasals you already know.',
                    ],
                    examples: [
                        { native: 'रत', translit: 'rata', gloss: 'delighted, devoted', note: null },
                        { native: 'रथ', translit: 'ratha', gloss: 'chariot — the same consonants, one aspirated', note: null },
                        { native: 'धर्म', translit: 'dharma', gloss: 'law, order, duty — a voiced aspirate opening the word', note: null },
                        { native: 'अङ्ग', translit: 'aṅga', gloss: 'limb — the velar nasal, only ever before a velar', note: null },
                        { native: 'पञ्च', translit: 'pañca', gloss: 'five — the palatal nasal, only ever before a palatal', note: null },
                    ],
                },
                {
                    heading: 'Tongue at the teeth, tongue curled back',
                    paragraphs: [
                        'The third and fourth rows are the signature of Indian speech. The dentals t th d dh n are made with the tongue against the teeth, further forward than any English t or d. The retroflexes ṭ ṭh ḍ ḍh ṇ are made with the tip of the tongue curled back to touch the roof of the mouth, and they are written in transliteration with a dot beneath. English t and d sit between the two and must be moved — to the teeth for the dentals, and back for the retroflexes. The row-names are themselves examples: danta, \'tooth\', opens with a dental; mūrdhan, \'head, crown\', from which mūrdhanya, contains a retroflex ḍh sounded against the roof of the mouth, and ṭīkā, \'commentary\', opens with the retroflex ṭ.',
                    ],
                    examples: [
                        { native: 'दन्त', translit: 'danta', gloss: 'tooth — tongue at the teeth for the d, the t and the n', note: null },
                        { native: 'टीका', translit: 'ṭīkā', gloss: 'commentary — tongue curled back for the ṭ', note: null },
                        { native: 'मूर्धन्', translit: 'mūrdhan', gloss: 'head, crown — the place-name of the retroflex row', note: null },
                        { native: 'घट', translit: 'ghaṭa', gloss: 'pot — a voiced aspirate and then a retroflex', note: null },
                    ],
                },
                {
                    heading: 'Three sibilants and h',
                    paragraphs: [
                        'Sanskrit has three s-sounds where English has one and a half. The palatal ś, written with an acute accent, opens Śiva, śānti and śruti, and is close to English sh; the retroflex ṣ, dotted beneath, is the sh of Kṛṣṇa and Viṣṇu, made with the tongue curled back; the dental s of sat, soma and sūrya is the plain s. Pandits keep the first two apart, and so should the reader\'s eye, even where the reader\'s ear cannot yet. The last consonant, h, is voiced and breathy, and it opens hṛdaya, the heart, and aham, \'I\' — a word the tradition likes to note is built of the first letter of the alphabet and the last.',
                    ],
                    examples: [
                        { native: 'शिव', translit: 'śiva', gloss: 'auspicious; the god — the palatal sibilant', note: null },
                        { native: 'विष्णु', translit: 'viṣṇu', gloss: 'the god — the retroflex sibilant, then the retroflex nasal', note: null },
                        { native: 'सोम', translit: 'soma', gloss: 'the pressed drink of the sacrifice — the dental sibilant', note: null },
                        { native: 'हृदय', translit: 'hṛdaya', gloss: 'heart', note: null },
                        { native: 'अहम्', translit: 'aham', gloss: 'I — the first letter and the last', note: null },
                    ],
                },
                {
                    heading: 'Stacking the consonants',
                    paragraphs: [
                        'When two consonants meet with no vowel between them, the script does not write the first with a virāma; it fuses the two into one sign, a saṃyukta or conjunct, and the inherent a belongs only to the last. Most conjuncts are transparent once the trick is seen: the first consonant loses its vertical stem and is written against the second, so that क् + त gives क्त, kta, as in bhakti, and त् + त gives त्त, tta, as in tattva. A few are special shapes to be learned outright — क्ष kṣa from k and ṣ, ज्ञ jña from j and ñ — and two involve r. As the second member r is a small slanting stroke at the foot, as in त्र tra and प्र pra; as the first member it leaves the line altogether and becomes a hook above the following letter, called repha: the r of dharma and karma is that hook over the म.',
                        'The rule for reading any stack is to read it as written, top to bottom and left to right, and to give the vowel to the last consonant only. Mantra is म, then the stack न्त्र of n, t and r, then the vowel: ma-ntra, two syllables.',
                    ],
                    examples: [
                        { native: 'क्ष', translit: 'kṣa', gloss: 'a special shape: क + ष', note: null },
                        { native: 'ज्ञान', translit: 'jñāna', gloss: 'knowledge — the special shape for j + ñ, then na', note: null },
                        { native: 'भक्ति', translit: 'bhakti', gloss: 'devotion — k without its stem, fused to t', note: null },
                        { native: 'तत्त्व', translit: 'tattva', gloss: 'that-ness; a principle — t fused to t, then v', note: null },
                        { native: 'कर्म', translit: 'karma', gloss: 'action — the r written as a hook above the ma', note: null },
                        { native: 'मन्त्र', translit: 'mantra', gloss: 'mantra — n, t and r in one stack, with the a on the r', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'धर्म', translit: 'dharma', gloss: 'law, order, duty' },
                { native: 'कर्म', translit: 'karma', gloss: 'action, deed' },
                { native: 'मन्त्र', translit: 'mantra', gloss: 'mantra, sacred formula' },
                { native: 'तन्त्र', translit: 'tantra', gloss: 'loom, system; a scripture of that name' },
                { native: 'चक्र', translit: 'cakra', gloss: 'wheel; a centre of the subtle body' },
                { native: 'शक्ति', translit: 'śakti', gloss: 'power; the Goddess as power' },
                { native: 'ज्ञान', translit: 'jñāna', gloss: 'knowledge' },
                { native: 'स्वस्ति', translit: 'svasti', gloss: 'well-being; the word of blessing' },
            ],
            exercises: [
                { prompt: 'रत and रथ — which is the chariot, and what is the only difference in sound?', answer: 'रथ, ratha, is the chariot. The only difference is the puff of breath after the t: th is the aspirate of t.', hint: null },
                { prompt: 'In धर्म, where is the r written, and what is the hook called?', answer: 'Above the म, as a small hook on the head-stroke, because r is the first member of the conjunct rm. The hook is called repha.', hint: null },
                { prompt: 'Split कृष्ण into its consonants and vowels.', answer: 'k, the vowel ṛ, then the conjunct of ṣ and ṇ, then the inherent a: k-ṛ-ṣ-ṇ-a, two syllables.', hint: 'Remember that ṛ is a vowel.' },
                { prompt: 'Which nasal may stand before a palatal? Read पञ्च.', answer: 'The palatal nasal ñ. पञ्च is pañca, \'five\'.', hint: null },
                { prompt: 'Name the sibilant in each of शिव, विष्णु and सूर्य and the place it is made.', answer: 'शिव has the palatal ś; विष्णु the retroflex ṣ, tongue curled back; सूर्य the dental s, at the teeth.', hint: null },
                { prompt: 'Read यज्ञ and explain the conjunct.', answer: 'yajña, \'sacrifice\': य ya, then the special conjunct ज्ञ of j and ñ, carrying the final a.', hint: null },
            ],
        },
        {
            number: 4,
            title: 'Sandhi, Where Words Touch',
            aim: 'Learn why running Sanskrit looks like one unbroken word, and master the joins that account for most of what you will meet: vowel with vowel, the final visarga, final t and final m.',
            sections: [
                {
                    heading: 'The text as it is spoken',
                    paragraphs: [
                        'Sandhi means \'placing together\'. Spoken continuously, sounds at the boundaries of words alter one another, and Sanskrit writes down the result rather than the parts: the Veda transmitted in its running form is the saṃhitā, \'the joined\', and the reciters who kept it also kept a second text, the padapāṭha, in which every word stands alone — which is the plainest proof that the tradition understood sandhi as a change and not as spelling. Within a word the joins are obligatory; between words they are the ordinary convention of any printed text. The reader\'s task is to undo them. The most quoted sentence in the language, tat tvam asi, \'that thou art\', is printed as a single word.',
                    ],
                    examples: [
                        { native: 'तत् त्वम् असि', translit: 'tat tvam asi', gloss: 'the three words — that, thou, art', note: null },
                        { native: 'तत्त्वमसि', translit: 'tattvamasi', gloss: 'the same three words as printed: one shape, no seams', note: null },
                    ],
                },
                {
                    heading: 'Vowel meets vowel',
                    paragraphs: [
                        'Two like vowels merge into the long one: a and a give ā, so vidyā and ālaya make vidyālaya, \'abode of learning\', and na and asti make nāsti, \'is not\'. An a before i gives e, and before u gives o — the two old joinings that lesson two said the diphthongs were: deva and indra make devendra, sūrya and udaya make sūryodaya, \'sunrise\'. An a before ṛ gives ar: mahā and ṛṣi make maharṣi. A final i before another vowel becomes y, and a final u becomes v: iti and api make ity api, su and āgata make svāgata, \'welcome\'. That handful of rules accounts for most of the vowel joins a reader meets.',
                    ],
                    examples: [
                        { native: 'विद्या + आलय = विद्यालय', translit: 'vidyā + ālaya = vidyālaya', gloss: 'abode of learning — like vowels merge into the long', note: null },
                        { native: 'न + अस्ति = नास्ति', translit: 'na + asti = nāsti', gloss: 'is not', note: null },
                        { native: 'देव + इन्द्र = देवेन्द्र', translit: 'deva + indra = devendra', gloss: 'a + i gives e', note: null },
                        { native: 'सूर्य + उदय = सूर्योदय', translit: 'sūrya + udaya = sūryodaya', gloss: 'sunrise — a + u gives o', note: null },
                        { native: 'महा + ऋषि = महर्षि', translit: 'mahā + ṛṣi = maharṣi', gloss: 'great seer — a + ṛ gives ar', note: null },
                        { native: 'सु + आगत = स्वागत', translit: 'su + āgata = svāgata', gloss: 'welcome — u before a vowel becomes v', note: null },
                    ],
                },
                {
                    heading: 'The visarga, a chameleon',
                    paragraphs: [
                        'Most Sanskrit nouns end their nominative in -aḥ, and that visarga changes with what follows. Before a voiced sound — any vowel other than a, any voiced consonant, any nasal or semivowel — -aḥ becomes -o: namaḥ and namaḥ make namo namaḥ, and in the Gāyatrī bhargaḥ before devasya is printed bhargo devasya. Before a following a-, the -aḥ likewise becomes -o and the a- itself vanishes, its absence marked by a sign like an S, the avagraha: śivaḥ aham is śivo \'ham, \'I am Śiva\'. Before a voiceless palatal, -aḥ becomes -aś: rāmaḥ ca is rāmaś ca; before a voiceless dental it becomes -as: rāmaḥ tatra is rāmas tatra. Before k, kh, p, ph, the sibilants, and at the end of a sentence, the visarga simply stays. After a vowel other than a, a visarga before a voiced sound becomes r instead: jyotiḥ gamaya is jyotir gamaya, and in the Gāyatrī savituḥ vareṇyam is printed savitur vareṇyam.',
                    ],
                    examples: [
                        { native: 'नमः + नमः = नमो नमः', translit: 'namaḥ + namaḥ = namo namaḥ', gloss: 'homage upon homage — -aḥ before a voiced sound gives -o', note: null },
                        { native: 'शिवः + अहम् = शिवोऽहम्', translit: 'śivaḥ + aham = śivo \'ham', gloss: 'I am Śiva — the lost a marked by the avagraha ऽ', note: null },
                        { native: 'रामः + च = रामश्च', translit: 'rāmaḥ + ca = rāmaś ca', gloss: 'and Rāma — visarga to ś before c', note: null },
                        { native: 'रामः + तत्र = रामस्तत्र', translit: 'rāmaḥ + tatra = rāmas tatra', gloss: 'Rāma is there — visarga to s before t', note: null },
                        { native: 'नमः शिवाय', translit: 'namaḥ śivāya', gloss: 'homage to Śiva — before ś the visarga stays', note: null },
                        { native: 'ज्योतिः + गमय = ज्योतिर्गमय', translit: 'jyotiḥ + gamaya = jyotir gamaya', gloss: 'lead me to the light — after i, the visarga becomes r', note: null },
                    ],
                },
                {
                    heading: 'Final t and final m',
                    paragraphs: [
                        'A final t takes the voice of what follows: sat before gamaya is sad gamaya, and tat before api is tad api. Before c it becomes c, so sat and cit make saccit; before n it becomes n. A final m before a consonant is written as anusvāra: aham brahma is ahaṃ brahma, satyam vada is satyaṃ vada, \'speak the truth\'. Put the rules together and one of the tradition\'s great words assembles itself in front of you: sat, cit, ānanda — being, consciousness, bliss — join as saccidānanda, the t taking c before cit and d before the vowel of ānanda.',
                    ],
                    examples: [
                        { native: 'सत् + गमय = सद्गमय', translit: 'sat + gamaya = sad gamaya', gloss: 'lead me to the real — t voiced to d', note: null },
                        { native: 'तत् + अपि = तदपि', translit: 'tat + api = tad api', gloss: 'that too', note: null },
                        { native: 'अहम् + ब्रह्म = अहं ब्रह्म', translit: 'aham + brahma = ahaṃ brahma', gloss: 'I, brahman — final m as anusvāra before a consonant', note: null },
                        { native: 'सत् + चित् + आनन्द = सच्चिदानन्द', translit: 'sat + cit + ānanda = saccidānanda', gloss: 'being, consciousness, bliss — every rule of this section at once', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'सन्धि', translit: 'sandhi', gloss: 'joining; the rules of euphonic combination' },
                { native: 'संहिता', translit: 'saṃhitā', gloss: 'the joined text; a Vedic collection' },
                { native: 'पद', translit: 'pada', gloss: 'word; foot; a quarter-verse' },
                { native: 'अवग्रह', translit: 'avagraha', gloss: 'the sign ऽ marking an elided a' },
                { native: 'नास्ति', translit: 'nāsti', gloss: 'is not' },
                { native: 'स्वागत', translit: 'svāgata', gloss: 'welcome' },
                { native: 'सूर्योदय', translit: 'sūryodaya', gloss: 'sunrise' },
                { native: 'सच्चिदानन्द', translit: 'saccidānanda', gloss: 'being, consciousness, bliss' },
            ],
            exercises: [
                { prompt: 'Resolve तत्त्वमसि into its words.', answer: 'tat tvam asi — \'that thou art\'. The final t of tat and the tv of tvam are simply written as one conjunct; no sound has changed.', hint: null },
                { prompt: 'Why is asataḥ printed asato in असतो मा?', answer: 'Because -aḥ before a voiced sound — here the m of mā — becomes -o. The word is asataḥ, \'from the unreal\'.', hint: null },
                { prompt: 'Join सत् + चित् + आनन्द and explain each change.', answer: 'सच्चिदानन्द, saccidānanda. The t of sat becomes c before the c of cit; the t of cit becomes d before the vowel ā of ānanda.', hint: null },
                { prompt: 'What does the avagraha record in शिवोऽहम्?', answer: 'The a of aham, dropped after śivaḥ became śivo. The sign marks where a vowel was.', hint: null },
                { prompt: 'Write aham brahma asmi with its sandhi applied.', answer: 'अहं ब्रह्मास्मि, ahaṃ brahmāsmi: the final m of aham becomes anusvāra before b, and the a of brahma merges with the a of asmi into ā.', hint: 'Two rules — one from the last section, one from the vowels.' },
                { prompt: 'Join नमः + शिवाय. Does the visarga change?', answer: 'नमः शिवाय, namaḥ śivāya. Before a sibilant the visarga stays as it is.', hint: null },
            ],
        },
        {
            number: 5,
            title: 'The Noun and Its Eight Cases',
            aim: 'Meet the eight cases and three numbers of the Sanskrit noun through the a-stem deva, learn the dative of homage that every namaḥ requires, and the genitive on which the Gāyatrī hangs.',
            sections: [
                {
                    heading: 'Eight ways to stand in a sentence',
                    paragraphs: [
                        'A Sanskrit noun does not rely on word order or prepositions to say what it is doing; it changes its ending. There are eight endings, the vibhaktis, which the Indian grammarians simply number, first to seventh, with the address counted separately: the nominative names the subject, the accusative the object, the instrumental the means, \'by\' or \'with\'; the dative the recipient, \'to\' or \'for\'; the ablative the source, \'from\'; the genitive the possessor, \'of\'; the locative the place, \'in\' or \'on\'; and the vocative calls. Each comes in three numbers, since Sanskrit keeps the dual that most of its cousins lost — eyes, hands, the two Aśvins, Rāma and Lakṣmaṇa. Learn the masculine a-stem deva, \'god\', and you can read the largest class of nouns in the language.',
                    ],
                    examples: [
                        { native: 'देवः', translit: 'devaḥ', gloss: 'the god — nominative, the subject', note: null },
                        { native: 'देवम्', translit: 'devam', gloss: 'the god — accusative, the object', note: null },
                        { native: 'देवेन', translit: 'devena', gloss: 'by the god — instrumental', note: null },
                        { native: 'देवाय', translit: 'devāya', gloss: 'to the god — dative', note: null },
                        { native: 'देवात्', translit: 'devāt', gloss: 'from the god — ablative', note: null },
                        { native: 'देवस्य', translit: 'devasya', gloss: 'of the god — genitive', note: null },
                        { native: 'देवे', translit: 'deve', gloss: 'in the god — locative', note: null },
                        { native: 'देव', translit: 'deva', gloss: 'O god — vocative', note: null },
                    ],
                },
                {
                    heading: 'Two, and many',
                    paragraphs: [
                        'The dual has three forms doing eight jobs: devau for nominative and accusative, devābhyām for instrumental, dative and ablative, devayoḥ for genitive and locative. The plural runs devāḥ, devān, devaiḥ, devebhyaḥ for both dative and ablative, devānām, deveṣu. A neuter a-stem such as jñāna, \'knowledge\', differs only in the nominative and accusative — jñānam in the singular, jñānāni in the plural — and a feminine ā-stem such as vidyā, \'learning\', keeps the same eight-fold logic with its own endings: vidyām, vidyayā, vidyāyai, vidyāyāḥ, vidyāyām. Note how the visarga of lesson four sits at the end of devaḥ, devāḥ, devaiḥ and devebhyaḥ, ready to change with the next word.',
                    ],
                    examples: [
                        { native: 'देवौ', translit: 'devau', gloss: 'the two gods — dual', note: null },
                        { native: 'देवाः', translit: 'devāḥ', gloss: 'the gods — nominative plural', note: null },
                        { native: 'देवानाम्', translit: 'devānām', gloss: 'of the gods — genitive plural', note: null },
                        { native: 'देवेषु', translit: 'deveṣu', gloss: 'among the gods — locative plural', note: null },
                        { native: 'ज्ञानम्', translit: 'jñānam', gloss: 'knowledge — the neuter nominative and accusative', note: null },
                        { native: 'विद्यया', translit: 'vidyayā', gloss: 'by learning — the feminine instrumental', note: null },
                    ],
                },
                {
                    heading: 'The dative of homage and the genitive of the god',
                    paragraphs: [
                        'Two cases carry the mantras. Namaḥ, \'homage\', governs the dative: whoever is honoured stands in the fourth case, so the oldest and commonest of the Śaiva formulas is oṃ namaḥ śivāya, and the Vaiṣṇava twelve-syllable mantra is oṃ namo bhagavate vāsudevāya, where bhagavate and vāsudevāya are both datives — \'to the Blessed One, to Vāsudeva\' — and namaḥ has become namo before the voiced bh exactly as lesson four said it would. The genitive carries the Gāyatrī: devasya, \'of the god\', is the form from the table above, and savituḥ, \'of Savitṛ\', is the genitive of a stem ending in -ṛ, a class of nouns naming agents and kin, which runs savitā in the nominative, savitāram in the accusative, savituḥ in the genitive, on the pattern of pitā, pitaram, pituḥ, \'father\'.',
                    ],
                    examples: [
                        { native: 'ॐ नमः शिवाय', translit: 'oṃ namaḥ śivāya', gloss: 'homage to Śiva — the dative of the one honoured', note: null },
                        { native: 'ॐ नमो भगवते वासुदेवाय', translit: 'oṃ namo bhagavate vāsudevāya', gloss: 'homage to the Blessed One, Vāsudeva — two datives, and namo by sandhi', note: null },
                        { native: 'सविता', translit: 'savitā', gloss: 'Savitṛ, the Impeller — nominative of the ṛ-stem', note: null },
                        { native: 'सवितुः', translit: 'savituḥ', gloss: 'of Savitṛ — the genitive that the Gāyatrī uses', note: null },
                        { native: 'पितुः', translit: 'pituḥ', gloss: 'of the father — the same ending on the commonest ṛ-stem', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'विभक्ति', translit: 'vibhakti', gloss: 'case-ending; a grammatical case' },
                { native: 'द्विवचन', translit: 'dvivacana', gloss: 'the dual number' },
                { native: 'देव', translit: 'deva', gloss: 'god; the shining one' },
                { native: 'ज्ञान', translit: 'jñāna', gloss: 'knowledge' },
                { native: 'विद्या', translit: 'vidyā', gloss: 'learning, knowledge, a science' },
                { native: 'भगवत्', translit: 'bhagavat', gloss: 'blessed, possessing fortune; the Lord' },
                { native: 'सवितृ', translit: 'savitṛ', gloss: 'the Impeller; the sun as the god who sets the day going' },
                { native: 'पितृ', translit: 'pitṛ', gloss: 'father; in the plural, the ancestors' },
            ],
            exercises: [
                { prompt: 'What case is देवाय, and what does it mean?', answer: 'Dative singular: \'to the god\', or \'for the god\'.', hint: null },
                { prompt: 'Give the genitive singular of देव, and find it in the Gāyatrī.', answer: 'देवस्य, devasya, \'of the god\' — the fifth word of the verse: bhargo devasya, \'the radiance of the god\'.', hint: null },
                { prompt: 'What number is देवौ, and which cases does it serve?', answer: 'Dual: \'the two gods\'. It serves both the nominative and the accusative.', hint: null },
                { prompt: 'Parse ॐ नमो भगवते वासुदेवाय: which words are datives, and why is namaḥ written namo?', answer: 'bhagavate and vāsudevāya are datives, the case that namaḥ governs. namaḥ becomes namo because its final -aḥ stands before the voiced bh.', hint: null },
                { prompt: 'Say \'from the fruit\', the fruit being फल.', answer: 'फलात्, phalāt — the ablative of a neuter a-stem takes the same ending as the masculine.', hint: null },
                { prompt: 'Nominative, accusative, genitive: give the three forms of savitṛ and of pitṛ.', answer: 'savitā, savitāram, savituḥ; pitā, pitaram, pituḥ. The Gāyatrī uses the genitive, savituḥ.', hint: null },
            ],
        },
        {
            number: 6,
            title: 'The Verb: To Be, To Become, To Do',
            aim: 'Conjugate as, \'to be\', and bhū, \'to become\', in the present; learn the persons and numbers by their endings; and read the two great sayings that turn on a single form of the verb to be.',
            sections: [
                {
                    heading: 'Three persons, three numbers',
                    paragraphs: [
                        'A Sanskrit verb in the present tense carries its person and its number in its ending, and the endings are regular enough to learn in one sitting. For the large class of verbs whose stem ends in a — bhū, \'to become, to be\', makes the stem bhava- — the singular runs bhavāmi, bhavasi, bhavati: I am, you are, he or she or it is. The plural is bhavāmaḥ, bhavatha, bhavanti, and the dual, which the noun taught you to expect, is bhavāvaḥ, bhavathaḥ, bhavataḥ. One thing the Indian grammarians do differently deserves knowing: they count the persons in the opposite direction from ours. Their prathama puruṣa, \'first person\', is our third; their uttama puruṣa, \'the highest person\', is \'I\'.',
                    ],
                    examples: [
                        { native: 'भवामि', translit: 'bhavāmi', gloss: 'I am, I become', note: null },
                        { native: 'भवसि', translit: 'bhavasi', gloss: 'you are', note: null },
                        { native: 'भवति', translit: 'bhavati', gloss: 'he, she, it is', note: null },
                        { native: 'भवामः', translit: 'bhavāmaḥ', gloss: 'we are', note: null },
                        { native: 'भवथ', translit: 'bhavatha', gloss: 'you all are', note: null },
                        { native: 'भवन्ति', translit: 'bhavanti', gloss: 'they are', note: null },
                    ],
                },
                {
                    heading: 'The verb that is',
                    paragraphs: [
                        'The root as, \'to be\', is the language\'s most irregular verb and its most necessary: asmi, asi, asti in the singular; svaḥ, sthaḥ, staḥ in the dual; smaḥ, stha, santi in the plural. Two of these forms are the hinges of the Upaniṣads. Tat tvam asi, \'that thou art\', which the Chāndogya Upaniṣad has Uddālaka say to his son nine times over, turns on asi, the second person singular. Ahaṃ brahmāsmi, \'I am brahman\', which the Bṛhadāraṇyaka puts into the mouth of brahman itself before any human being says it, turns on asmi, the first. Note that in a plain statement of identity the verb is often left out altogether: the Taittirīya Upaniṣad\'s satyaṃ jñānam anantaṃ brahma — \'brahman is truth, knowledge, the infinite\' — has no verb at all, and needs none.',
                    ],
                    examples: [
                        { native: 'अस्मि असि अस्ति', translit: 'asmi asi asti', gloss: 'I am, you are, it is', note: null },
                        { native: 'स्मः स्थ सन्ति', translit: 'smaḥ stha santi', gloss: 'we are, you all are, they are', note: null },
                        { native: 'तत्त्वमसि', translit: 'tat tvam asi', gloss: 'that thou art — Chāndogya Upaniṣad 6.8.7', note: null },
                        { native: 'अहं ब्रह्मास्मि', translit: 'ahaṃ brahmāsmi', gloss: 'I am brahman — Bṛhadāraṇyaka Upaniṣad 1.4.10', note: null },
                        { native: 'सत्यं ज्ञानमनन्तं ब्रह्म', translit: 'satyaṃ jñānam anantaṃ brahma', gloss: 'truth, knowledge, infinite — brahman; no verb — Taittirīya Upaniṣad 2.1', note: null },
                    ],
                },
                {
                    heading: 'Going, seeing, knowing, doing — and a command',
                    paragraphs: [
                        'Most verbs you will meet behave like bhū: gacchati, \'goes\', from gam; vadati, \'speaks\'; paśyati, \'sees\', from a root, dṛś, that the present tense does not show. Two of the commonest do not: jānāti, \'knows\', from jñā, and karoti, \'does, makes\', from kṛ, the root inside saṃskṛta and karma alike. The imperative, the form of command and prayer, drops the ending to its shortest: gaccha, \'go!\'; bhava, \'be!\'. And the causative adds -aya- to say \'cause to\': gamaya, \'lead!\', literally \'cause to go\'. That single form carries one of the most recited prayers in the language, from the Bṛhadāraṇyaka Upaniṣad: asato mā sad gamaya, tamaso mā jyotir gamaya, mṛtyor mā amṛtaṃ gamaya — \'from the unreal lead me to the real; from darkness lead me to light; from death lead me to the deathless\'. Every join in it is one you already know: asataḥ becomes asato before mā, sat becomes sad before gamaya, jyotiḥ becomes jyotir before gamaya, mṛtyoḥ becomes mṛtyor before mā.',
                    ],
                    examples: [
                        { native: 'गच्छति', translit: 'gacchati', gloss: 'goes — the ch doubled after the vowel, as the script requires', note: null },
                        { native: 'पश्यति', translit: 'paśyati', gloss: 'sees', note: null },
                        { native: 'जानाति', translit: 'jānāti', gloss: 'knows', note: null },
                        { native: 'करोति', translit: 'karoti', gloss: 'does, makes', note: null },
                        { native: 'असतो मा सद्गमय', translit: 'asato mā sad gamaya', gloss: 'from the unreal lead me to the real', note: null },
                        { native: 'तमसो मा ज्योतिर्गमय', translit: 'tamaso mā jyotir gamaya', gloss: 'from darkness lead me to light', note: null },
                        { native: 'मृत्योर्मामृतं गमय', translit: 'mṛtyor mā amṛtaṃ gamaya', gloss: 'from death lead me to the deathless — Bṛhadāraṇyaka Upaniṣad 1.3.28', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'अस्ति', translit: 'asti', gloss: 'is' },
                { native: 'सन्ति', translit: 'santi', gloss: 'they are' },
                { native: 'भवति', translit: 'bhavati', gloss: 'is, becomes' },
                { native: 'गच्छति', translit: 'gacchati', gloss: 'goes' },
                { native: 'जानाति', translit: 'jānāti', gloss: 'knows' },
                { native: 'करोति', translit: 'karoti', gloss: 'does, makes' },
                { native: 'सत्', translit: 'sat', gloss: 'being, real, true' },
                { native: 'असत्', translit: 'asat', gloss: 'non-being, unreal' },
                { native: 'ज्योतिस्', translit: 'jyotis', gloss: 'light' },
                { native: 'मृत्यु', translit: 'mṛtyu', gloss: 'death' },
            ],
            exercises: [
                { prompt: 'Person and number of असि?', answer: 'Second person singular of as: \'you are\'. It is the verb of tat tvam asi.', hint: null },
                { prompt: 'Translate देवाः सन्ति.', answer: '\'The gods are\', or \'there are gods\' — nominative plural subject with the third person plural of as.', hint: null },
                { prompt: 'Which of our persons is the grammarians\' prathama puruṣa?', answer: 'Our third person. They count from the person spoken about to the speaker, whom they call uttama, \'highest\'.', hint: null },
                { prompt: 'Undo the sandhi in ज्योतिर्गमय.', answer: 'jyotiḥ gamaya: the visarga of jyotiḥ, standing after an i, becomes r before the voiced g.', hint: 'Lesson four, the last rule of the visarga section.' },
                { prompt: 'Give \'we are\' from the root as, and from bhū.', answer: 'smaḥ, and bhavāmaḥ.', hint: null },
                { prompt: 'What kind of form is गमय, and what does the prayer that uses it ask for?', answer: 'A causative imperative — \'cause to go\', that is \'lead!\' The prayer asks to be led from the unreal to the real, from darkness to light, from death to the deathless.', hint: null },
            ],
        },
        {
            number: 7,
            title: 'The Compound, and Three Texts Entire',
            aim: 'Read the four kinds of compound that let Sanskrit fold a phrase into one word, then read three short texts whole: the threefold peace, the first sūtra of Patañjali, and the fullness verse.',
            sections: [
                {
                    heading: 'Four ways to join',
                    paragraphs: [
                        'Sanskrit builds phrases into single words by compounding, and a reader who cannot take a compound apart cannot read a line of classical verse. Only the last member carries a case-ending; the relation between the members is left for the reader to supply, and the grammarians sort the possibilities into four kinds. In a tatpuruṣa the first member depends on the second as a case would: devaputra is \'a god\'s son\', rājapuruṣa \'the king\'s man\'. In a karmadhāraya the first describes the second: mahādeva is \'the great god\', nīlotpala \'the blue lotus\', the a of nīla and the u of utpala giving o by the rule of lesson four. A dvandva simply pairs: rāmalakṣmaṇau, \'Rāma and Lakṣmaṇa\', takes the dual ending because there are two of them, and sukhaduḥkhe, \'pleasure and pain\', likewise. The fourth kind is the subtle one. A bahuvrīhi looks like a karmadhāraya but names someone by what he has: mahābāhu is not \'a great arm\' but \'he whose arms are great\'; nīlakaṇṭha, \'blue-throated\', is Śiva, who drank the poison; cakrapāṇi, \'discus-in-hand\', is Viṣṇu. The gods\' epithets are bahuvrīhis almost without exception.',
                    ],
                    examples: [
                        { native: 'देवपुत्र', translit: 'devaputra', gloss: 'a god\'s son — tatpuruṣa, the first member as if in the genitive', note: null },
                        { native: 'महादेव', translit: 'mahādeva', gloss: 'the great god — karmadhāraya, the first member describing the second', note: null },
                        { native: 'नीलोत्पल', translit: 'nīlotpala', gloss: 'the blue lotus — karmadhāraya, with a + u giving o at the seam', note: null },
                        { native: 'रामलक्ष्मणौ', translit: 'rāmalakṣmaṇau', gloss: 'Rāma and Lakṣmaṇa — dvandva, in the dual', note: null },
                        { native: 'नीलकण्ठ', translit: 'nīlakaṇṭha', gloss: 'blue-throated: Śiva — bahuvrīhi, naming by possession', note: null },
                        { native: 'चक्रपाणि', translit: 'cakrapāṇi', gloss: 'discus-in-hand: Viṣṇu — bahuvrīhi', note: null },
                    ],
                },
                {
                    heading: 'Reading a long compound',
                    paragraphs: [
                        'Compounds nest, and the classical style can run them to a dozen members. The rule of thumb is to read from the end backwards, asking of each member what it is to the one after it. Patañjali\'s definition of yoga is the cleanest example the tradition offers: citta-vṛtti-nirodhaḥ, the nirodha, \'stilling\', of the vṛttis, \'turnings\', of the citta, \'mind\'. In the printed sūtra the definition is one word, and the subject yogaḥ has become yogaś before it by the rule for a visarga before c.',
                    ],
                    examples: [
                        { native: 'योगश्चित्तवृत्तिनिरोधः', translit: 'yogaś citta-vṛtti-nirodhaḥ', gloss: 'yoga is the stilling of the turnings of thought — Yoga Sūtra 1.2', note: null },
                        { native: 'चित्तवृत्ति', translit: 'citta-vṛtti', gloss: 'the turnings of the mind — a tatpuruṣa inside the larger one', note: null },
                    ],
                },
                {
                    heading: 'Three texts entire',
                    paragraphs: [
                        'The Upaniṣads are closed with a threefold peace: oṃ śāntiḥ śāntiḥ śāntiḥ. The commentators explain the three against the three sources of affliction, ādhyātmika, from oneself, ādhibhautika, from other beings, ādhidaivika, from the gods and the elements; and the word is a nominative repeated three times, with its visarga kept at the pause. The fullness verse that opens the last section of the Bṛhadāraṇyaka Upaniṣad, and is recited before the Īśa, you can now read as grammar rather than as sound: pūrṇam adaḥ, pūrṇam idam — \'that is full, this is full\' — pūrṇāt pūrṇam udacyate, \'from the full the full is drawn out\', with pūrṇāt the ablative of lesson five; pūrṇasya pūrṇam ādāya, \'having taken the full of the full\', pūrṇam evāvaśiṣyate, \'the full alone remains\', where eva and avaśiṣyate have merged their two a\'s into one ā. And the motto the Republic of India took from the Muṇḍaka Upaniṣad, satyam eva jayate, \'truth alone conquers\', is a sentence of three words in which nothing has changed shape at all, because a final m stands unaltered before a vowel.',
                    ],
                    examples: [
                        { native: 'ॐ शान्तिः शान्तिः शान्तिः', translit: 'oṃ śāntiḥ śāntiḥ śāntiḥ', gloss: 'peace, peace, peace — the visarga kept at each pause', note: null },
                        { native: 'पूर्णमदः पूर्णमिदम्', translit: 'pūrṇam adaḥ pūrṇam idam', gloss: 'that is full, this is full', note: null },
                        { native: 'पूर्णात्पूर्णमुदच्यते', translit: 'pūrṇāt pūrṇam udacyate', gloss: 'from the full the full is drawn out — an ablative, and a passive verb', note: null },
                        { native: 'पूर्णमेवावशिष्यते', translit: 'pūrṇam evāvaśiṣyate', gloss: 'the full alone remains — eva and avaśiṣyate joined at the seam', note: null },
                        { native: 'सत्यमेव जयते', translit: 'satyam eva jayate', gloss: 'truth alone conquers — Muṇḍaka Upaniṣad 3.1.6', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'समास', translit: 'samāsa', gloss: 'compound' },
                { native: 'तत्पुरुष', translit: 'tatpuruṣa', gloss: 'the dependent compound' },
                { native: 'कर्मधारय', translit: 'karmadhāraya', gloss: 'the descriptive compound' },
                { native: 'द्वन्द्व', translit: 'dvandva', gloss: 'the pairing compound' },
                { native: 'बहुव्रीहि', translit: 'bahuvrīhi', gloss: 'the possessive compound; \'much-rice\', its own first example' },
                { native: 'शान्ति', translit: 'śānti', gloss: 'peace' },
                { native: 'पूर्ण', translit: 'pūrṇa', gloss: 'full, complete' },
                { native: 'सत्यम्', translit: 'satyam', gloss: 'truth' },
            ],
            exercises: [
                { prompt: 'What kind of compound is महादेव, and how do you know?', answer: 'A karmadhāraya: the first member mahā describes the second, deva — \'the great god\'. Nothing is possessed and nothing depends as a case would.', hint: null },
                { prompt: 'नीलकण्ठ — what kind of compound, and whom does it name?', answer: 'A bahuvrīhi, \'he whose throat is blue\': Śiva, who held the poison of the churned ocean in his throat.', hint: 'Ask whether the word names a throat or someone who has one.' },
                { prompt: 'Resolve योगश्चित्तवृत्तिनिरोधः into its words and translate it.', answer: 'yogaḥ citta-vṛtti-nirodhaḥ: \'yoga is the stilling of the turnings of the mind\'. The visarga of yogaḥ became ś before the c.', hint: null },
                { prompt: 'Why is रामलक्ष्मणौ in the dual?', answer: 'Because it is a dvandva naming two persons, Rāma and Lakṣmaṇa, and a dvandva takes the number of the things it pairs.', hint: null },
                { prompt: 'What has happened at the seam of एवावशिष्यते?', answer: 'eva + avaśiṣyate: the final a of eva and the initial a of avaśiṣyate have merged into ā.', hint: null },
                { prompt: 'Translate सत्यमेव जयते and account for the word eva.', answer: '\'Truth alone conquers.\' eva is the particle of emphasis and restriction, \'only, indeed\'; satyam keeps its final m unchanged before the vowel.', hint: null },
            ],
        },
        {
            number: 8,
            title: 'The Gāyatrī',
            aim: 'Read Ṛgveda 3.62.10 word by word — every join undone, every form named, the metre counted — and understand why the tradition calls it the mother of the Veda, while admitting what in it is still argued.',
            sections: [
                {
                    heading: 'The verse and its names',
                    paragraphs: [
                        'Tat savitur vareṇyaṃ bhargo devasya dhīmahi, dhiyo yo naḥ pracodayāt. The verse is the tenth of the sixty-second hymn of the third maṇḍala of the Ṛgveda, the book of the family of Viśvāmitra, and it is ascribed to Viśvāmitra Gāthina himself. Properly it is the Sāvitrī, since it is addressed to Savitṛ; it is called the Gāyatrī after its metre, and it has been recited at dawn and dusk, at the sandhyā, for as long as there has been a Vedic tradition to recite it. It is the verse given to the student at the upanayana, the initiation that makes him dvija, twice-born, and the Manusmṛti prescribes that it be preceded by oṃ and by the three vyāhṛtis, bhūr bhuvaḥ svaḥ — earth, atmosphere, heaven. Those words are not part of the Ṛgvedic verse: they are the liturgy\'s frame for it, and a reader should know where the verse ends and the frame begins.',
                    ],
                    examples: [
                        { native: 'तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥', translit: 'tat savitur vareṇyaṃ bhargo devasya dhīmahi, dhiyo yo naḥ pracodayāt', gloss: 'Ṛgveda 3.62.10, as the joined text prints it', note: null },
                        { native: 'ॐ भूर्भुवः स्वः', translit: 'oṃ bhūr bhuvaḥ svaḥ', gloss: 'the three vyāhṛtis that the liturgy sets before it — not part of the verse', note: null },
                    ],
                },
                {
                    heading: 'Undoing the joins',
                    paragraphs: [
                        'Every seam in the verse is one of lesson four\'s. Savituḥ, a genitive ending in a visarga after u, stands before the voiced v of vareṇyam, so its visarga becomes r: savitur vareṇyam. The final m of vareṇyam stands before the bh of bhargaḥ and is written as anusvāra: vareṇyaṃ bhargo. Bhargaḥ, ending in -aḥ, stands before the voiced d of devasya and becomes bhargo. Dhiyaḥ before the y of yaḥ becomes dhiyo, and yaḥ before the n of naḥ becomes yo. Naḥ before the p of pracodayāt keeps its visarga, since p is voiceless. Undo them and the ten words stand clear: tat, savituḥ, vareṇyam, bhargaḥ, devasya, dhīmahi, dhiyaḥ, yaḥ, naḥ, pracodayāt.',
                    ],
                    examples: [
                        { native: 'सवितुः + वरेण्यम् = सवितुर्वरेण्यम्', translit: 'savituḥ + vareṇyam = savitur vareṇyam', gloss: 'visarga after u, before a voiced sound, becomes r', note: null },
                        { native: 'भर्गः + देवस्य = भर्गो देवस्य', translit: 'bhargaḥ + devasya = bhargo devasya', gloss: '-aḥ before a voiced sound becomes -o', note: null },
                        { native: 'धियः + यः + नः = धियो यो नः', translit: 'dhiyaḥ + yaḥ + naḥ = dhiyo yo naḥ', gloss: 'two more -aḥ to -o; the last visarga kept before p', note: null },
                    ],
                },
                {
                    heading: 'Every word named',
                    paragraphs: [
                        'Tat is the neuter of the pronoun tad, \'that\', and agrees with bhargaḥ, which is neuter: the verse is about that radiance. Savituḥ is the genitive of savitṛ, the Impeller, from the root sū, \'to set in motion\' — the sun named for what it does to the world each morning. Vareṇyam is a gerundive of vṛ, \'to choose\': \'to be chosen\', hence choice, most desirable. Bhargaḥ is the nominative-and-accusative of a neuter s-stem, bhargas, \'radiance, burning splendour\', usually connected with the root bhrāj, \'to shine\'; here it is the object of the verb. Devasya you declined in lesson five. Dhiyaḥ is the accusative plural of dhī, feminine, \'thought, insight, prayer\'; yaḥ is the relative pronoun, masculine, and points back to Savitṛ; naḥ is the short, unaccented form of the first-person plural pronoun, here \'our\'. Pracodayāt is the verb of the relative clause: third person singular of the causative of pra-cud, \'to impel, urge on\', in the subjunctive — a Vedic mood of will and expectation that classical Sanskrit let go — \'may he impel, let him inspire\'.',
                        'That leaves dhīmahi, and here the honest lesson slows down. Grammatically the form is a first person plural of the middle voice with the ending -mahi, and the philologists read it as an aorist optative — the precative — of dhā, \'to place, to hold\': \'may we hold, may we attain\'. The tradition, from Sāyaṇa\'s fourteenth-century commentary onward, glosses it dhyāyema, \'may we meditate upon\', as if from dhyai, \'to think, to contemplate\', and the two readings have travelled together for as long as the verse has been explained. This hall renders it \'may we hold in thought\', which keeps both. A learner should know that the most famous verb in the Veda is a form on which the grammarians and the priests do not entirely agree, and that nothing in the verse\'s use has ever depended on settling it.',
                    ],
                    examples: [
                        { native: 'तत्', translit: 'tat', gloss: 'that — neuter, agreeing with bhargaḥ', note: null },
                        { native: 'सवितुः', translit: 'savituḥ', gloss: 'of Savitṛ, the Impeller — genitive of the ṛ-stem', note: null },
                        { native: 'वरेण्यम्', translit: 'vareṇyam', gloss: 'to be chosen, most desirable — gerundive of vṛ', note: null },
                        { native: 'भर्गः', translit: 'bhargaḥ', gloss: 'radiance, burning splendour — neuter s-stem, the object', note: null },
                        { native: 'देवस्य', translit: 'devasya', gloss: 'of the god — genitive', note: null },
                        { native: 'धीमहि', translit: 'dhīmahi', gloss: 'may we hold in thought — first person plural middle; the disputed form', note: null },
                        { native: 'धियः', translit: 'dhiyaḥ', gloss: 'thoughts — accusative plural of dhī', note: null },
                        { native: 'यः', translit: 'yaḥ', gloss: 'who — the relative pronoun, referring to Savitṛ', note: null },
                        { native: 'नः', translit: 'naḥ', gloss: 'our — the enclitic first-person plural', note: null },
                        { native: 'प्रचोदयात्', translit: 'pracodayāt', gloss: 'may he impel — causative of pra-cud, in the Vedic subjunctive', note: null },
                    ],
                },
                {
                    heading: 'Counting the metre, and what you can now read',
                    paragraphs: [
                        'The gāyatrī metre is three pādas of eight syllables, twenty-four in all, and it is the metre of the verse\'s name rather than the verse\'s subject. Count the second pāda: bhar-go de-vas-ya dhī-ma-hi, eight; the third: dhi-yo yo naḥ pra-co-da-yāt, eight. The first, as printed, has seven: tat sa-vi-tur va-re-ṇyam. The reciters restore the eighth by sounding vareṇyam as va-re-ṇi-yam, and that is not a fudge but a fossil — one of many places where the metre of the Ṛgveda preserves a pronunciation older than the written text. The whole verse, in this hall\'s rendering: \'May we hold in thought that desirable radiance of the god Savitṛ — he who shall impel our thoughts.\'',
                        'Take stock. You have read a neuter pronoun agreeing with its noun, the genitive of an ṛ-stem and of an a-stem, a gerundive, an s-stem noun, a relative clause with its enclitic pronoun, and a verb in each of two moods; you have undone five joins, and counted a metre. The Vedic accents, which the printed Saṃhitā marks with strokes above and below the line, and the subjunctive mood are the two things in the verse that belong to Vedic rather than classical Sanskrit, and you have been told which they are. What lies beyond is the Vedic vocabulary and the classical literature, and the hall\'s readings and lexicon are the next room.',
                    ],
                    examples: [
                        { native: 'तत् सवितुर् वरेण्यम्', translit: 'tat sa-vi-tur va-re-ṇyam', gloss: 'seven syllables as written; eight as recited, va-re-ṇi-yam', note: null },
                        { native: 'भर्गो देवस्य धीमहि', translit: 'bhar-go de-vas-ya dhī-ma-hi', gloss: 'eight', note: null },
                        { native: 'धियो यो नः प्रचोदयात्', translit: 'dhi-yo yo naḥ pra-co-da-yāt', gloss: 'eight', note: null },
                    ],
                },
            ],
            vocabulary: [
                { native: 'गायत्री', translit: 'gāyatrī', gloss: 'the metre of three eight-syllable pādas; by extension the verse' },
                { native: 'सावित्री', translit: 'sāvitrī', gloss: 'the verse to Savitṛ — its proper name' },
                { native: 'सवितृ', translit: 'savitṛ', gloss: 'the Impeller; the sun' },
                { native: 'वरेण्य', translit: 'vareṇya', gloss: 'to be chosen; excellent' },
                { native: 'भर्गस्', translit: 'bhargas', gloss: 'radiance, splendour' },
                { native: 'धी', translit: 'dhī', gloss: 'thought, insight, prayer' },
                { native: 'व्याहृति', translit: 'vyāhṛti', gloss: 'utterance; the three words bhūr bhuvaḥ svaḥ' },
                { native: 'उपनयन', translit: 'upanayana', gloss: 'the initiation at which the verse is given' },
                { native: 'द्विज', translit: 'dvija', gloss: 'twice-born' },
                { native: 'पाद', translit: 'pāda', gloss: 'foot; a quarter-verse' },
            ],
            exercises: [
                { prompt: 'Why is savituḥ printed savitur before vareṇyam?', answer: 'Its visarga stands after u, not a, and before the voiced v; in that position a visarga becomes r.', hint: null },
                { prompt: 'Case and number of dhiyaḥ, and why is it printed dhiyo?', answer: 'Accusative plural of dhī, \'thoughts\'. Its -aḥ stands before the voiced y of yaḥ and becomes -o.', hint: null },
                { prompt: 'Which noun does tat agree with, and what tells you?', answer: 'bhargaḥ. Both are neuter singular, and bhargaḥ is the only neuter noun in the verse; tat cannot go with savituḥ or devasya, which are genitives.', hint: null },
                { prompt: 'Which word is the relative pronoun, and who is its antecedent?', answer: 'yaḥ, \'who\', masculine singular: it refers to Savitṛ, the god whose radiance the first half names.', hint: null },
                { prompt: 'Count the syllables of the first pāda as written and as recited.', answer: 'Seven as written — tat sa-vi-tur va-re-ṇyam — and eight as recited, with vareṇyam sounded va-re-ṇi-yam to fill the metre.', hint: null },
                { prompt: 'State the two accounts of dhīmahi.', answer: 'The philologists take it as the first person plural middle of the aorist optative of dhā, \'may we hold, attain\'; the commentators from Sāyaṇa take it as \'may we meditate\', dhyāyema, from dhyai. Both are old, and the hall\'s \'may we hold in thought\' keeps both.', hint: null },
                { prompt: 'Are bhūr bhuvaḥ svaḥ part of Ṛgveda 3.62.10?', answer: 'No. They are the three vyāhṛtis, set before the verse in the liturgy with oṃ; the Ṛgvedic verse begins at tat.', hint: null },
                { prompt: 'Translate the verse.', answer: 'May we hold in thought that desirable radiance of the god Savitṛ — he who shall impel our thoughts.', hint: null },
            ],
        },
    ],
};
