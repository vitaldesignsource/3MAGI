// arabic course — eight lessons for the Scriptorium.
// Every Arabic text quoted is one the hall already carries and has verified:
// the Basmala, the opening of al-Fātiḥa, the first clause of the Throne Verse,
// the opening of the Light Verse, the Shahāda, and al-Ḥallāj's anā al-Ḥaqq.
// Every letter-sum in lesson six was recomputed against the hall's own letter
// values before it was written down. Qurʾānic passages are given in the
// unvocalised consonantal spelling the hall uses, and where a reckoning is a
// tradition rather than a fact the lesson says so.
export default {
    language: 'arabic',
    title: 'The Greatest Name',
    tagline: 'Eight lessons from the twenty-eight letters to the Light Verse — and the Basmala reckoned at 786.',
    overview: 'Arabic is the language of the Qurʾān, and its tradition holds that book to be inimitable, which turned grammar and lexicography into devotional sciences and produced some of the most exacting philology any language has received. It is also the medium of one of the largest esoteric literatures ever written: Sufi metaphysics, ʿilm al-ḥurūf or the science of letters, the alchemical corpus that gave English the word alchemy, and the astral magic that crossed into Latin as the Picatrix. This course assumes nothing. You will learn the twenty-eight letters and the dots that tell them apart; the four shapes each letter takes and the six that refuse to join; the vowel marks, and why they are usually absent; the article, and why al-Raḥmān is pronounced ar-Raḥmān; the root and pattern system that makes an Arabic dictionary work; and then the abjad — the older ordering of the alphabet, in which every letter carries a number — with which you will reckon the divine name at sixty-six, the Basmala at seven hundred and eighty-six, and read a chronogram that hides a date inside a sentence. The last lesson reads the Light Verse and the Throne Verse, and ends on the vocabulary in which the Sufis did their thinking.',
    lessons: [
        {
            number: 1,
            title: 'The Twenty-Eight Letters',
            aim: 'Learn the twenty-eight consonants, see that twenty-two of them are the old Semitic alphabet and six are additions, and understand the dots that separate letters sharing one skeleton.',
            sections: [
                {
                    heading: 'An abjad of twenty-eight',
                    paragraphs: [
                        'Arabic writes twenty-eight letters, right to left, and notes the consonants and the long vowels while leaving the short vowels to the reader. A script of that kind is an abjad, and the word is itself Arabic — the first four letters of the older ordering you will meet in lesson six.',
                        'Twenty-two of the twenty-eight are the alphabet the Phoenicians passed to everyone: the same letters, in the same order, that give Hebrew and Syriac their twenty-two. The other six are Arabic\'s own additions, called the rawādif, \'the followers\', because they were appended at the end of the older row rather than fitted into it. They are thāʾ, khāʾ, dhāl, ḍād, ẓāʾ and ghayn, and lesson six will show you that their numerical values sit above four hundred for exactly that reason.',
                        'One of the six gives the language a nickname. Arabic calls itself lughat al-ḍād, the language of the ḍād, after a sound held to be peculiar to it — a claim more proud than precise, but old and universally repeated.',
                    ],
                    examples: [
                        { native: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي', translit: 'the hijāʾī order', gloss: 'the twenty-eight letters as a modern dictionary orders them', note: 'Sorted by shape: letters sharing a skeleton stand together.' },
                        { native: 'ض', translit: 'ḍād', gloss: 'the letter Arabic names itself after', note: 'lughat al-ḍād, \'the language of the ḍād\'.' },
                        { native: 'ث خ ذ ض ظ غ', translit: 'thāʾ khāʾ dhāl ḍād ẓāʾ ghayn', gloss: 'the six rawādif, the \'followers\'', note: 'Arabic\'s additions to the inherited twenty-two, appended at the end.' },
                    ],
                },
                {
                    heading: 'One skeleton, several letters',
                    paragraphs: [
                        'Look at ب ت ث. They are the same shape — a shallow bowl on the line — distinguished only by dots: one below, two above, three above. The same is true of ج ح خ, of د ذ, of ر ز, of س ش, of ص ض, of ط ظ, of ع غ, and of ف ق. The bare shape is called the rasm, the drawing; the dots are the iʿjām, the pointing.',
                        'This matters historically as well as practically. The earliest Qurʾānic manuscripts carry the rasm with few dots or none, so that a skeleton could be read several ways, and the recitation traditions preserved by ear were what fixed the reading. The dots were regularised in the later seventh century and after. A reader meeting an early manuscript is meeting a text that genuinely underdetermines its own pronunciation, and the tradition has always known it.',
                        'For the learner the lesson is simpler: count the dots and note whether they sit above or below. Nothing else separates the letters in these groups.',
                    ],
                    examples: [
                        { native: 'ب ت ث', translit: 'bāʾ tāʾ thāʾ', gloss: 'one dot below, two above, three above', note: 'One skeleton, three letters. The rasm is identical.' },
                        { native: 'ج ح خ', translit: 'jīm ḥāʾ khāʾ', gloss: 'dot below, no dot, dot above', note: 'Again one shape and three letters.' },
                        { native: 'س ش', translit: 'sīn shīn', gloss: 'no dots, three dots', note: 'Three dots alone make the difference.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'الله', translit: 'Allāh', gloss: 'God' },
                { native: 'كتاب', translit: 'kitāb', gloss: 'book' },
                { native: 'نور', translit: 'nūr', gloss: 'light' },
                { native: 'علم', translit: 'ʿilm', gloss: 'knowledge, science' },
                { native: 'قلب', translit: 'qalb', gloss: 'heart' },
                { native: 'روح', translit: 'rūḥ', gloss: 'spirit, breath' },
                { native: 'سر', translit: 'sirr', gloss: 'secret, the innermost' },
                { native: 'حرف', translit: 'ḥarf', gloss: 'letter (plural ḥurūf)' },
            ],
            exercises: [
                { prompt: 'How many letters does Arabic write, and how many of them are inherited?', answer: 'Twenty-eight. Twenty-two are the old Semitic alphabet shared with Hebrew and Syriac; the remaining six are Arabic\'s own additions.', hint: null },
                { prompt: 'What are the rawādif, and why are they so called?', answer: 'The six added letters — thāʾ, khāʾ, dhāl, ḍād, ẓāʾ and ghayn. The name means \'the followers\', because they were appended at the end of the inherited row rather than inserted into it.', hint: null },
                { prompt: 'What distinguishes ب from ت from ث?', answer: 'Only the dots: one below, two above, three above. The underlying shape, the rasm, is identical.', hint: null },
                { prompt: 'What are the rasm and the iʿjām?', answer: 'The rasm is the bare consonantal skeleton; the iʿjām is the system of dots that distinguishes letters sharing one skeleton.', hint: null },
                { prompt: 'Why can an early Qurʾānic manuscript be read more than one way?', answer: 'Because it carries the rasm with few dots or none, so a skeleton is ambiguous between several letters. The oral recitation traditions, not the page, fixed the reading.', hint: null },
                { prompt: 'What does lughat al-ḍād mean, and what is being claimed?', answer: '\'The language of the ḍād\' — Arabic\'s name for itself, claiming that sound as peculiar to it. The claim is traditional and often repeated rather than strictly accurate.', hint: null },
            ],
        },
        {
            number: 2,
            title: 'Four Shapes, and Six That Will Not Join',
            aim: 'Learn that almost every letter has four forms according to position, which six letters break the chain, and the one obligatory ligature in the script.',
            sections: [
                {
                    heading: 'A letter has four shapes',
                    paragraphs: [
                        'Arabic is cursive and has no printed alternative: letters join, always, and each takes a different form depending on where it stands. Initial, medial, final, isolated — four shapes for one letter. The tables in this hall show the isolated form, because it is the one a reader can identify unaided, but on a real page you will mostly meet the other three.',
                        'The forms are related, not arbitrary. A letter\'s distinguishing feature — the dots, the loop, the tail — survives in every position; what changes is the connecting stroke and how much of the body is drawn. Learn the isolated form and the initial form of each letter and the rest follows quickly.',
                    ],
                    examples: [
                        { native: 'ب', translit: 'bāʾ, isolated', gloss: 'the form the tables give', note: 'Initial, medial and final forms shorten the bowl and add joins; the dot never moves.' },
                        { native: 'كتاب', translit: 'kitāb', gloss: 'book', note: 'Four letters, joined: kāf, tāʾ, alif, bāʾ. Only the alif breaks the chain.' },
                    ],
                },
                {
                    heading: 'The six that refuse',
                    paragraphs: [
                        'Six letters join to what comes before them but never to what comes after: alif, dāl, dhāl, rāʾ, zāy and wāw. After one of them the pen lifts, and the next letter begins in its initial form. A single written word therefore breaks into two or more visible pieces, and beginners read the gaps as spaces between words.',
                        'They are not spaces. The gap after a non-joiner is narrower than a word-break, and telling the two apart by eye is one of the first real skills of reading Arabic. Take بسم الله: the first block is three joined letters, then a space, then الله — in which the alif refuses to join, so the word itself shows an internal break.',
                    ],
                    examples: [
                        { native: 'ا د ذ ر ز و', translit: 'alif dāl dhāl rāʾ zāy wāw', gloss: 'the six non-connectors', note: 'They join backwards but never forwards.' },
                        { native: 'الله', translit: 'Allāh', gloss: 'God', note: 'The alif does not join, so the word shows an internal gap that is not a word-break.' },
                        { native: 'نور', translit: 'nūr', gloss: 'light', note: 'nūn joins to wāw; wāw refuses, so rāʾ stands alone at the end.' },
                    ],
                },
                {
                    heading: 'The one ligature you must know',
                    paragraphs: [
                        'When lām is followed by alif the two are written as a single compound sign, لا. This is not optional and not a typographic nicety; it is how the sequence is written, and a font that set them separately would be wrong.',
                        'It is worth learning at once because it is the first thing in the Shahāda. لا إله إلا الله opens with lā, \'there is no\', and the word is that ligature and nothing else. The same lā opens the negation in every Arabic sentence that denies something.',
                    ],
                    examples: [
                        { native: 'لا', translit: 'lā', gloss: 'no, there is not', note: 'The obligatory lām-alif ligature, written as one sign.' },
                        { native: 'لا إله إلا الله', translit: 'lā ilāha illā Allāh', gloss: 'there is no god but God', note: 'The ligature twice: in lā and inside illā.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'لا', translit: 'lā', gloss: 'no, there is not' },
                { native: 'إله', translit: 'ilāh', gloss: 'a god' },
                { native: 'رسول', translit: 'rasūl', gloss: 'messenger, apostle' },
                { native: 'اسم', translit: 'ism', gloss: 'name' },
                { native: 'باب', translit: 'bāb', gloss: 'door, gate; a chapter' },
                { native: 'نفس', translit: 'nafs', gloss: 'soul, self' },
                { native: 'عين', translit: 'ʿayn', gloss: 'eye; spring; essence' },
                { native: 'حق', translit: 'ḥaqq', gloss: 'truth, reality, the Real' },
            ],
            exercises: [
                { prompt: 'How many forms does a typical Arabic letter have, and what determines which is used?', answer: 'Four — initial, medial, final and isolated — determined by the letter\'s position in the word and whether its neighbours join.', hint: null },
                { prompt: 'Name the six letters that do not join to what follows them.', answer: 'alif, dāl, dhāl, rāʾ, zāy and wāw.', hint: null },
                { prompt: 'Why does الله appear to contain a gap?', answer: 'Because the alif is a non-connector, so the pen lifts after it. The gap is internal to the word and is not a word-break.', hint: null },
                { prompt: 'What is لا, and why must it be written that way?', answer: 'The lām-alif ligature, the obligatory compound form of that sequence. It is not optional: writing the two letters separately would be incorrect.', hint: null },
                { prompt: 'Where does that ligature appear in the Shahāda, and how many times?', answer: 'Twice — in the opening lā, \'there is no\', and inside illā, \'except\'.', hint: null },
            ],
        },
        {
            number: 3,
            title: 'The Marks Above and Below',
            aim: 'Learn the short-vowel marks and the other signs that ride above and below the line, and understand why almost every Arabic text you meet does without them.',
            sections: [
                {
                    heading: 'Three vowels, three marks',
                    paragraphs: [
                        'The short vowels are not letters. They are small marks set above or below the consonant they follow: fatḥa, a short stroke above, for a; kasra, the same stroke below, for i; ḍamma, a small loop above, for u. Their absence is marked too, by sukūn, a small circle meaning that no vowel follows.',
                        'Two further marks matter. Shadda, written like a small w above a letter, doubles it — and doubling changes words, so it is not decorative. Tanwīn doubles a vowel mark at the end of a word to add an -n sound, which is how Arabic marks a noun as indefinite. There is no indefinite article; the tanwīn does that work.',
                    ],
                    examples: [
                        { native: 'كتب', translit: 'k-t-b, unpointed', gloss: 'the bare consonants', note: 'Without marks this could be kataba, kutiba, kutub and more. Context decides.' },
                        { native: 'كتاب', translit: 'kitāb', gloss: 'book', note: 'The long ā is written with alif, so it survives even in unpointed text.' },
                        { native: 'الله', translit: 'Allāh', gloss: 'God', note: 'Carries a shadda on the lām: the doubling is part of the word.' },
                    ],
                },
                {
                    heading: 'Long vowels are letters; short ones are not',
                    paragraphs: [
                        'The distinction that saves the reader is this: long vowels are written with full letters — alif for ā, wāw for ū, yāʾ for ī — and therefore appear in any text, pointed or not. Short vowels are marks, and marks are usually omitted. So an unpointed word gives you its consonants and its long vowels, which between them narrow the possibilities a great deal.',
                        'Kitāb has its ā written and is recognisable unpointed. Kataba, kutiba and kutub share three bare consonants and are told apart only by context or by pointing. This is why reading Arabic is a matter of knowing words rather than decoding letters, and why vocabulary repays study far more than the vowel system does.',
                    ],
                    examples: [
                        { native: 'ا و ي', translit: 'alif wāw yāʾ', gloss: 'the three letters of prolongation', note: 'ā, ū, ī — written as letters and never omitted.' },
                        { native: 'رسول', translit: 'rasūl', gloss: 'messenger', note: 'The wāw carries ū and is visible in any text.' },
                    ],
                },
                {
                    heading: 'Where the marks are compulsory',
                    paragraphs: [
                        'Ordinary Arabic — newspapers, letters, most books — is written without vowel marks, and a literate reader supplies them. Three kinds of text are pointed in full: the Qurʾān, poetry, and books for learners.',
                        'The Qurʾān is the significant case, and the reason is doctrinal rather than practical. If the wording is held to be inimitable and exactly given, then the reading must be fixed, and a fully pointed text fixes it. The pointing systems were developed for precisely that purpose in the first two centuries of Islam, and the ten canonical readings that the tradition recognises are differences within that fixing rather than a failure of it.',
                    ],
                    examples: [
                        { native: 'بسم الله الرحمن الرحيم', translit: 'bismillāh al-raḥmān al-raḥīm', gloss: 'In the name of God, the All-Merciful, the Ever-Merciful', note: 'Given here unpointed, as this hall gives its Qurʾānic texts; in a muṣḥaf every vowel would be marked.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'رحمن', translit: 'raḥmān', gloss: 'all-merciful' },
                { native: 'رحيم', translit: 'raḥīm', gloss: 'ever-merciful' },
                { native: 'حمد', translit: 'ḥamd', gloss: 'praise' },
                { native: 'رب', translit: 'rabb', gloss: 'lord, master' },
                { native: 'عالم', translit: 'ʿālam', gloss: 'world (plural ʿālamīn)' },
                { native: 'ذكر', translit: 'dhikr', gloss: 'remembrance, invocation' },
                { native: 'كشف', translit: 'kashf', gloss: 'unveiling' },
                { native: 'خلوة', translit: 'khalwa', gloss: 'retreat, seclusion' },
            ],
            exercises: [
                { prompt: 'Name the three short-vowel marks and the vowels they carry.', answer: 'fatḥa (above) for a, kasra (below) for i, ḍamma (above) for u.', hint: null },
                { prompt: 'What does sukūn mark, and what does shadda do?', answer: 'Sukūn marks the absence of a vowel. Shadda doubles the consonant it sits on, and the doubling changes the word.', hint: null },
                { prompt: 'How does Arabic mark a noun as indefinite?', answer: 'With tanwīn — a doubled vowel mark at the end adding an -n sound. There is no indefinite article.', hint: null },
                { prompt: 'Why is كتاب recognisable in unpointed text when كتب is ambiguous?', answer: 'Because the long ā of kitāb is written with a full letter, alif, and long vowels are never omitted. The bare three consonants of k-t-b carry no long vowel and so admit several readings.', hint: null },
                { prompt: 'Which kinds of text are fully pointed, and why is the Qurʾān among them?', answer: 'The Qurʾān, poetry, and teaching texts. The Qurʾān is pointed because its wording is held to be exactly given, so the reading must be fixed rather than supplied by the reader.', hint: null },
            ],
        },
        {
            number: 4,
            title: 'The Article, and the Sun and Moon Letters',
            aim: 'Learn the definite article, and the assimilation rule that explains why al-Raḥmān is pronounced ar-Raḥmān and al-Shams ash-shams.',
            sections: [
                {
                    heading: 'One article, never changing',
                    paragraphs: [
                        'The definite article is ال, al-, written as two letters attached to the front of the word and never varying: no gender, no number, no case. الكتاب is al-kitāb, \'the book\'; النور is al-nūr, \'the light\'. Arabic has no indefinite article, the tanwīn of the last lesson doing that work instead.',
                        'The article is also what makes the divine names look the way they do. All but one of the ninety-nine take it — al-Raḥmān, al-Ḥaqq, al-Nūr, al-Ẓāhir, al-Bāṭin — and the exception is Allāh itself, which is the proper name.',
                    ],
                    examples: [
                        { native: 'الكتاب', translit: 'al-kitāb', gloss: 'the book', note: 'The article written solid with the noun.' },
                        { native: 'النور', translit: 'al-nūr — pronounced an-nūr', gloss: 'the Light', note: 'Written with lām; sounded without it, for the reason below.' },
                        { native: 'الحق', translit: 'al-ḥaqq', gloss: 'the Real, the Truth', note: 'Ḥāʾ is a moon letter, so the lām is sounded: al-Ḥaqq.' },
                    ],
                },
                {
                    heading: 'Fourteen letters swallow the lām',
                    paragraphs: [
                        'The article is written the same way always, but it is not always pronounced the same way. Before fourteen of the twenty-eight letters the lām is not sounded; instead the following consonant is doubled. Those fourteen are called the sun letters, after al-shams, \'the sun\', which is pronounced ash-shams and not al-shams. The other fourteen are the moon letters, after al-qamar, \'the moon\', which keeps its lām.',
                        'The division is not arbitrary. The sun letters are the ones made with the tongue against or near the teeth and ridge — t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n — which is to say the ones close enough to lām for the assimilation to be natural. Say al-raḥmān quickly and you will find yourself saying ar-raḥmān without being told.',
                        'This is why transliterations differ. A book that writes al-Raḥmān is spelling; a book that writes ar-Raḥmān is pronouncing. Both are correct, and this Scriptorium generally spells.',
                    ],
                    examples: [
                        { native: 'الشمس', translit: 'al-shams — pronounced ash-shams', gloss: 'the sun', note: 'Shīn is a sun letter: the lām assimilates and the shīn doubles.' },
                        { native: 'القمر', translit: 'al-qamar', gloss: 'the moon', note: 'Qāf is a moon letter: the lām is sounded as written.' },
                        { native: 'الرحمن', translit: 'al-Raḥmān — pronounced ar-Raḥmān', gloss: 'the All-Merciful', note: 'Rāʾ is a sun letter, which is why the Basmala sounds as it does.' },
                        { native: 'الظاهر والباطن', translit: 'al-Ẓāhir wa-l-Bāṭin — aẓ-Ẓāhir wa-l-Bāṭin', gloss: 'the Outward and the Inward', note: 'Ẓāʾ assimilates; bāʾ does not. Two divine names, one of each kind.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'شمس', translit: 'shams', gloss: 'sun' },
                { native: 'قمر', translit: 'qamar', gloss: 'moon' },
                { native: 'ظاهر', translit: 'ẓāhir', gloss: 'outward, manifest' },
                { native: 'باطن', translit: 'bāṭin', gloss: 'inward, hidden' },
                { native: 'حي', translit: 'ḥayy', gloss: 'living' },
                { native: 'قيوم', translit: 'qayyūm', gloss: 'self-subsisting' },
                { native: 'ملك', translit: 'malik', gloss: 'king' },
                { native: 'ودود', translit: 'wadūd', gloss: 'loving' },
            ],
            exercises: [
                { prompt: 'What is the Arabic definite article, and how does it change for gender or number?', answer: 'ال, al-, prefixed to the noun. It never changes — no gender, no number, no case.', hint: null },
                { prompt: 'Why is الشمس pronounced ash-shams?', answer: 'Shīn is a sun letter, so the lām of the article assimilates to it and the shīn is doubled.', hint: null },
                { prompt: 'What do the sun letters have in common phonetically?', answer: 'They are made with the tongue at or near the teeth and the ridge behind them — close to where lām is made, which is what allows the assimilation.', hint: null },
                { prompt: 'Which of الرحمن and القمر assimilates, and why?', answer: 'الرحمن does: rāʾ is a sun letter, so it is sounded ar-Raḥmān. القمر does not: qāf is a moon letter, so al-qamar keeps its lām.', hint: null },
                { prompt: 'Which divine name does not take the article, and why?', answer: 'Allāh, because it is the proper name rather than a descriptive attribute. The other names are adjectives and take al-.', hint: null },
            ],
        },
        {
            number: 5,
            title: 'Root and Pattern',
            aim: 'Learn the triliteral root and the patterns poured into it, and understand why an Arabic dictionary is arranged in a way that first looks perverse and turns out to be the language\'s own logic.',
            sections: [
                {
                    heading: 'Three consonants and a field of meaning',
                    paragraphs: [
                        'Almost every Arabic word is built from a root of three consonants carrying a general field of meaning, into which vowels and affixes are poured according to fixed patterns. The root k–t–b has to do with writing. Pour the patterns in and you get kataba, \'he wrote\'; kitāb, \'a book\'; kātib, \'a writer, a scribe\'; maktab, \'a place of writing, an office\'; maktaba, \'a library\'; maktūb, \'written\' — and, because what is written is decreed, \'destined\'.',
                        'The patterns are regular and portable. The shape that gives kātib the sense of \'one who does\' gives ʿālim, \'one who knows, a scholar\', from ʿ–l–m; the shape that gives maktaba a place gives other places. Learn a pattern once and it works on every root you meet.',
                    ],
                    examples: [
                        { native: 'كتب', translit: 'kataba', gloss: 'he wrote', note: 'The root k–t–b in its simplest verbal shape.' },
                        { native: 'كتاب', translit: 'kitāb', gloss: 'a book', note: 'The same three consonants, a different pattern.' },
                        { native: 'كاتب', translit: 'kātib', gloss: 'a writer, a scribe', note: 'The doer-pattern: one who does the thing.' },
                        { native: 'مكتبة', translit: 'maktaba', gloss: 'a library', note: 'The place-pattern, with the feminine ending.' },
                    ],
                },
                {
                    heading: 'The same logic on a second root',
                    paragraphs: [
                        'Take ʿ–l–m, which has to do with knowing. ʿIlm is knowledge, and by extension a science. ʿĀlim, on the doer-pattern you just met, is one who knows — a scholar, plural ʿulamāʾ. Taʿlīm is teaching. And al-ʿAlīm, on an intensive pattern, is the divine name: the All-Knowing, whose knowledge is unconditioned.',
                        'The root also gives ʿālam, \'world\' — the same three consonants — which is why the opening of al-Fātiḥa calls God rabb al-ʿālamīn, \'Lord of the worlds\'. Whether \'world\' really belongs to this root or merely resembles it is argued by the lexicographers, and the tradition itself notices the resonance: what is known and what is there are written the same way.',
                    ],
                    examples: [
                        { native: 'علم', translit: 'ʿilm', gloss: 'knowledge, science', note: 'The root ʿ–l–m at its plainest.' },
                        { native: 'عالم', translit: 'ʿālim', gloss: 'one who knows, a scholar', note: 'The doer-pattern again — the same shape as kātib.' },
                        { native: 'العليم', translit: 'al-ʿAlīm', gloss: 'the All-Knowing', note: 'An intensive pattern; one of the ninety-nine names.' },
                        { native: 'رب العالمين', translit: 'rabb al-ʿālamīn', gloss: 'Lord of the worlds', note: 'From al-Fātiḥa. ʿālamīn is the plural of ʿālam.' },
                    ],
                },
                {
                    heading: 'Why a dictionary looks strange',
                    paragraphs: [
                        'An Arabic dictionary is not ordered by the first letter of the word. It is ordered by the root, so that maktaba, kitāb, kātib and kataba all stand together under k–t–b, and to look up a word you must first strip it to its three consonants. That is a skill in itself, and it is the reason a beginner can hold a dictionary and still not find anything.',
                        'It is also the reason Arabic can be read at all without vowels. If a word is a root plus a pattern, and you know both, the bare consonants are enough to identify it. The script and the morphology were made for each other, and neither is an accident.',
                    ],
                    examples: [
                        { native: 'ك ت ب', translit: 'k–t–b', gloss: 'the root: write', note: 'The entry under which every word of that family is filed.' },
                        { native: 'كيمياء', translit: 'kīmiyāʾ', gloss: 'alchemy', note: 'The word English took as \'alchemy\', by way of Latin, complete with the article.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'كاتب', translit: 'kātib', gloss: 'writer, scribe' },
                { native: 'مكتبة', translit: 'maktaba', gloss: 'library' },
                { native: 'عالم', translit: 'ʿālim', gloss: 'scholar, one who knows' },
                { native: 'كيمياء', translit: 'kīmiyāʾ', gloss: 'alchemy' },
                { native: 'إكسير', translit: 'iksīr', gloss: 'elixir' },
                { native: 'طلسم', translit: 'ṭilasm', gloss: 'talisman' },
                { native: 'معرفة', translit: 'maʿrifa', gloss: 'gnosis, direct knowledge' },
                { native: 'حقيقة', translit: 'ḥaqīqa', gloss: 'reality, the inner truth' },
            ],
            exercises: [
                { prompt: 'Give four words from the root k–t–b and their meanings.', answer: 'kataba \'he wrote\', kitāb \'a book\', kātib \'a scribe\', maktaba \'a library\' — also maktab \'an office\' and maktūb \'written, destined\'.', hint: null },
                { prompt: 'kātib and ʿālim share a pattern. What does that pattern mean?', answer: 'One who does the thing the root names: a writer, and one who knows.', hint: null },
                { prompt: 'How is an Arabic dictionary ordered, and what must you do before looking a word up?', answer: 'By root, not by the word\'s first letter. You must strip the word to its three root consonants first.', hint: null },
                { prompt: 'What connection does the tradition notice between ʿilm and ʿālam?', answer: 'They share the consonants ʿ–l–m, so that knowledge and world are written alike. Whether the derivation is real is argued by the lexicographers, but the resonance is noticed.', hint: null },
                { prompt: 'Why does root-and-pattern morphology make unpointed writing workable?', answer: 'Because a word is a known root in a known pattern, so the bare consonants plus the long vowels are enough to identify it. Script and morphology suit each other.', hint: null },
            ],
        },
        {
            number: 6,
            title: 'The Abjad, and the Science of Letters',
            aim: 'Learn the older ordering of the alphabet in which every letter carries a number, reckon the divine name and the Basmala yourself, and read a chronogram that hides a date inside a sentence.',
            sections: [
                {
                    heading: 'Two orders, and the older one counts',
                    paragraphs: [
                        'The order you learned in lesson one — alif, bāʾ, tāʾ, thāʾ, jīm — is the hijāʾī order, which groups letters by shape and is what dictionaries and indexes use. It is not the old order. Before it there was the abjad, which keeps the sequence of the parent Semitic alphabet, and it is the abjad that carries number.',
                        'It is memorised as eight nonsense words: abjad, hawwaz, ḥuṭṭī, kalaman, saʿfaṣ, qarashat, thakhadh, ḍaẓagh. Recite them and you have the letters in their numerical order. The first four give one, two, three, four; the next three give five, six, seven; and so on up through the tens and the hundreds.',
                        'The first twenty-two letters are the inherited alphabet, and their values agree exactly with Hebrew, Syriac and — allowing for its extra signs — Greek: alif one, bāʾ two, yāʾ ten, qāf a hundred, tāʾ four hundred. Then come the six rawādif of lesson one, appended above four hundred: thāʾ five hundred, khāʾ six hundred, dhāl seven hundred, ḍād eight hundred, ẓāʾ nine hundred, ghayn a thousand. That is why the additions sit where they do.',
                        'One honest caution. This is the Mashriqī, or eastern, abjad. The Islamic west used a different arrangement, in which several of the later letters carry other values, and a text of Maghribī origin may reckon differently. Check which order a source is using before you check its arithmetic.',
                    ],
                    examples: [
                        { native: 'أبجد هوز حطي', translit: 'abjad hawwaz ḥuṭṭī', gloss: '1 2 3 4 · 5 6 7 · 8 9 10', note: 'The mnemonic. Each nonsense word is a run of consecutive values.' },
                        { native: 'كلمن سعفص قرشت', translit: 'kalaman saʿfaṣ qarashat', gloss: '20 30 40 50 · 60 70 80 90 · 100 200 300 400', note: 'The tens, then the hundreds to four hundred.' },
                        { native: 'ثخذ ضظغ', translit: 'thakhadh ḍaẓagh', gloss: '500 600 700 · 800 900 1000', note: 'The six rawādif, appended above the inherited row.' },
                    ],
                },
                {
                    heading: 'Reckoning the names',
                    paragraphs: [
                        'Adding the letters of a word is ḥisāb al-jummal, and the practice of reading meaning in the totals is ʿilm al-ḥurūf, the science of letters, whose great systematiser is Aḥmad al-Būnī in the thirteenth century. Do the arithmetic yourself, every time, and note which spelling you used, because the article and the doubled letters change the total.',
                        'Start with the name. الله is alif one, lām thirty, lām thirty, hāʾ five — sixty-six. Then the Basmala entire: بسم الله الرحمن الرحيم comes to seven hundred and eighty-six, a number so well known that in ordinary Muslim usage 786 written at the head of a letter simply stands in for the Basmala itself. That is the clearest case there is of a reckoning escaping the esotericists and becoming a convention.',
                        'The divine names are reckoned the same way, and the hall lists them with their totals: al-Ḥayy forty-nine, al-Wadūd fifty-one, al-Awwal sixty-eight, al-Bāṭin ninety-three, al-Ḥaqq a hundred and thirty-nine, al-Malik a hundred and twenty-one. Behind all such work lies al-ism al-aʿẓam, the Greatest Name — the name held to be hidden among or behind the ninety-nine, sought by letter-reckoning among much else, and never agreed upon.',
                    ],
                    examples: [
                        { native: 'الله', translit: 'Allāh = 66', gloss: 'God', note: 'alif 1 + lām 30 + lām 30 + hāʾ 5.' },
                        { native: 'بسم الله الرحمن الرحيم', translit: 'the Basmala = 786', gloss: 'In the name of God, the All-Merciful, the Ever-Merciful', note: 'The number stands for the phrase in ordinary usage, written at the head of letters.' },
                        { native: 'الحي', translit: 'al-Ḥayy = 49', gloss: 'the Living', note: 'A divine name reckoned with its article, as the hall reckons them.' },
                        { native: 'الظاهر', translit: 'al-Ẓāhir = 1137', gloss: 'the Outward', note: 'The ẓāʾ alone is worth nine hundred: a rawādif letter carries most of the total.' },
                    ],
                },
                {
                    heading: 'A date hidden in a sentence',
                    paragraphs: [
                        'The prettiest use of the reckoning is the chronogram, taʾrīkh — a phrase composed so that its letters add to a year. It is a real and widespread practice: poets marked the deaths of patrons, the completion of buildings and the printing of books with a line whose sum is the date, and the line had to make sense as well as add up.',
                        'The hall carries two. مات الشعر بعده — \'poetry died after him\' — comes to one thousand one hundred and twenty-three, which is the year of the death it marks. And جاء المخصص يروي أحسن الكلم — \'the Mukhaṣṣaṣ came, relating the finest of speech\' — comes to one thousand three hundred and twenty-one, marking the appearance of a book.',
                        'Notice what the form demands: the writer must find words that mean something apt and total something exact. That double constraint is the art of it, and it is why a chronogram that reads awkwardly is a failure even when the arithmetic is right. Reckon both of the hall\'s examples yourself; the answers are in the exercises.',
                    ],
                    examples: [
                        { native: 'مات الشعر بعده', translit: 'māta al-shiʿr baʿdah = 1123', gloss: 'poetry died after him', note: 'A chronogram: the letters total the year being marked.' },
                        { native: 'جاء المخصص يروي أحسن الكلم', translit: '= 1321', gloss: 'the Mukhaṣṣaṣ came, relating the finest of speech', note: 'The sense and the sum are both required.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'أبجد', translit: 'abjad', gloss: 'the older letter-order; by extension, an alphabet' },
                { native: 'علم الحروف', translit: 'ʿilm al-ḥurūf', gloss: 'the science of letters' },
                { native: 'جفر', translit: 'jafr', gloss: 'divination by letters and numbers' },
                { native: 'الاسم الأعظم', translit: 'al-ism al-aʿẓam', gloss: 'the Greatest Name' },
                { native: 'تاريخ', translit: 'taʾrīkh', gloss: 'date, history; a chronogram' },
                { native: 'همة', translit: 'himma', gloss: 'aspiration, resolve' },
                { native: 'تجلي', translit: 'tajallī', gloss: 'self-disclosure, theophany' },
                { native: 'برزخ', translit: 'barzakh', gloss: 'isthmus, the between-world' },
            ],
            exercises: [
                { prompt: 'Name the two orderings of the Arabic alphabet and say what each is for.', answer: 'The hijāʾī order, grouped by shape, used by dictionaries and indexes; and the abjad, the older Semitic sequence, which carries the numerical values.', hint: null },
                { prompt: 'Recite the abjad mnemonic and give the values of the first group.', answer: 'abjad, hawwaz, ḥuṭṭī, kalaman, saʿfaṣ, qarashat, thakhadh, ḍaẓagh. The first gives alif 1, bāʾ 2, jīm 3, dāl 4.', hint: null },
                { prompt: 'Why do the six rawādif carry values above four hundred?', answer: 'Because they were appended to the end of the inherited twenty-two letters, whose values stop at four hundred. Position in the row is value.', hint: null },
                { prompt: 'Compute الله.', answer: '66 — alif 1 + lām 30 + lām 30 + hāʾ 5.', hint: null },
                { prompt: 'What is the total of the Basmala, and what everyday use does the number have?', answer: '786. It is written at the head of letters and documents as a stand-in for the Basmala itself.', hint: null },
                { prompt: 'What is a chronogram, and what two demands does it place on its author?', answer: 'A phrase whose letters add to a year, used to mark deaths, buildings and books. It must both make apt sense and total the exact date.', hint: null },
                { prompt: 'Compute مات الشعر بعده and say what the number is.', answer: '1123 — the year of the death the line commemorates.', hint: 'Add the letters, article and all.' },
                { prompt: 'Before checking a source\'s letter-arithmetic, what should you establish?', answer: 'Which abjad order it uses. This hall gives the eastern, Mashriqī, arrangement; the Islamic west ordered several later letters differently and reckons other values.', hint: null },
            ],
        },
        {
            number: 7,
            title: 'Short Texts Entire',
            aim: 'Read three texts with every word accounted for: the Basmala, the opening of al-Fātiḥa, and the Shahāda.',
            sections: [
                {
                    heading: 'بسم الله الرحمن الرحيم',
                    paragraphs: [
                        'The Basmala stands at the head of every sūra but the ninth, and at the head of a great deal else besides — books, letters, meals, journeys. Bism is the preposition bi-, \'in, with\', written solid with ism, \'name\'. Allāh is the name. Al-Raḥmān and al-Raḥīm are both from the root r–ḥ–m, mercy, in two different patterns.',
                        'The pair is not a repetition, and the commentators have never treated it as one. Al-Raḥmān is on an intensive pattern and is used of God alone; al-Raḥīm is on a pattern of continuing quality and can be used of others. The usual gloss makes the first the mercy that embraces all creation and the second the mercy shown particularly to the faithful — a distinction the Arabic patterns support, though the exact division is a matter of interpretation rather than grammar.',
                    ],
                    examples: [
                        { native: 'بسم الله الرحمن الرحيم', translit: 'bismillāh al-raḥmān al-raḥīm', gloss: 'In the name of God, the All-Merciful, the Ever-Merciful', note: 'Four words; the last two share the root r–ḥ–m in different patterns.' },
                        { native: 'الرحمن الرحيم', translit: 'al-Raḥmān al-Raḥīm', gloss: 'the All-Merciful, the Ever-Merciful', note: 'Both from r–ḥ–m; both sun-letter names, so both sound with the assimilated article.' },
                    ],
                },
                {
                    heading: 'الحمد لله رب العالمين',
                    paragraphs: [
                        'The first line of al-Fātiḥa, the opening sūra recited in every unit of the daily prayer. Al-ḥamd is \'the praise\', with the article. Lillāh is the preposition li-, \'to, for\', with Allāh — written solid, and the reason the phrase is one word on the page.',
                        'Rabb al-ʿālamīn is a construct: \'Lord of the worlds\'. ʿĀlamīn is the plural of ʿālam, the word you met in lesson five sharing its consonants with ʿilm, knowledge. The plural is deliberately wide — not \'the world\' but \'the worlds\', which the commentators take to include the visible and the invisible, the human and the angelic and the rest.',
                    ],
                    examples: [
                        { native: 'الحمد لله رب العالمين', translit: 'al-ḥamd lillāh rabb al-ʿālamīn', gloss: 'Praise belongs to God, Lord of the worlds', note: 'al-Fātiḥa. lillāh is li- plus Allāh, written solid.' },
                        { native: 'رب العالمين', translit: 'rabb al-ʿālamīn', gloss: 'Lord of the worlds', note: 'A construct phrase; the plural is deliberately comprehensive.' },
                    ],
                },
                {
                    heading: 'لا إله إلا الله محمد رسول الله',
                    paragraphs: [
                        'The Shahāda, the testimony, whose sincere utterance is what makes a person Muslim. Its first half is a negation followed by an exception: lā ilāha, \'there is no god\' — the ligature of lesson two, then ilāh, \'a god\', indefinite — illā, \'except\', then Allāh.',
                        'The structure is worth dwelling on, because it is doing something a plain assertion would not. It does not say \'God is one\'; it denies every god and then admits one back. The Sufi commentators make a great deal of this shape, reading the negation as clearing the ground before anything can be affirmed — and the phrase lā ilāha illā Allāh is the commonest formula of dhikr, the repeated invocation, precisely for that reason.',
                        'The second half is a construct: Muḥammad rasūl Allāh, \'Muhammad is the messenger of God\'. Rasūl you met in lesson two; here it stands between the two names, bound to the second.',
                    ],
                    examples: [
                        { native: 'لا إله إلا الله', translit: 'lā ilāha illā Allāh', gloss: 'there is no god but God', note: 'Negation, then exception. The commonest formula of dhikr.' },
                        { native: 'محمد رسول الله', translit: 'Muḥammad rasūl Allāh', gloss: 'Muhammad is the messenger of God', note: 'A construct: rasūl is bound to Allāh.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'بسم', translit: 'bism', gloss: 'in the name of' },
                { native: 'الحمد', translit: 'al-ḥamd', gloss: 'the praise' },
                { native: 'إلا', translit: 'illā', gloss: 'except, but' },
                { native: 'شهادة', translit: 'shahāda', gloss: 'testimony, witnessing' },
                { native: 'توحيد', translit: 'tawḥīd', gloss: 'the affirmation of divine unity' },
                { native: 'سماع', translit: 'samāʿ', gloss: 'audition, listening as practice' },
                { native: 'ولي', translit: 'walī', gloss: 'friend of God, saint (plural awliyāʾ)' },
                { native: 'سلسلة', translit: 'silsila', gloss: 'chain of transmission' },
            ],
            exercises: [
                { prompt: 'Break بسم into its parts.', answer: 'The preposition bi-, \'in, with\', written solid with ism, \'name\'.', hint: null },
                { prompt: 'Al-Raḥmān and al-Raḥīm share a root. What distinguishes them?', answer: 'Both are from r–ḥ–m, mercy, but in different patterns: al-Raḥmān is intensive and used of God alone; al-Raḥīm denotes a continuing quality and may be used of others.', hint: null },
                { prompt: 'Why is لله written as one block?', answer: 'It is the preposition li-, \'to, for\', written solid with Allāh.', hint: null },
                { prompt: 'What is the grammatical shape of the first half of the Shahāda?', answer: 'A negation followed by an exception: \'there is no god\' then \'except God\'. It denies all and readmits one, rather than simply asserting oneness.', hint: null },
                { prompt: 'Why do the Sufi commentators dwell on that shape?', answer: 'Because the negation clears the ground before anything is affirmed, which is why the phrase is the commonest formula of dhikr.', hint: null },
                { prompt: 'What does ʿālamīn mean and what is its singular?', answer: '\'Worlds\', plural of ʿālam. The plural is taken widely, covering the visible and invisible orders alike.', hint: null },
            ],
        },
        {
            number: 8,
            title: 'God is the Light of the Heavens and the Earth',
            aim: 'Read the openings of the Light Verse and the Throne Verse, meet al-Ḥallāj\'s most notorious sentence, and take stock of the vocabulary in which the Sufi metaphysicians worked.',
            sections: [
                {
                    heading: 'الله نور السماوات والأرض',
                    paragraphs: [
                        'The opening of the Light Verse, Q 24:35, from which the sūra takes its name, al-Nūr. Allāh, then nūr, \'light\', in a construct with what follows: al-samāwāt, \'the heavens\', plural, and wa-l-arḍ, \'and the earth\', the conjunction wa- written solid with the article.',
                        'The grammar is worth noticing because it is stronger than a comparison. The verse does not say God is like a light or has light; it puts the two nouns in apposition — God is the light of the heavens and the earth. That reading is what made the verse the single most commented-upon sentence in Islamic mysticism and philosophy alike. Al-Ghazālī wrote a whole treatise on it, the Mishkāt al-anwār, the Niche of Lights, which the hall carries on its shelf.',
                        'One thing to know about the spelling. The hall gives this passage in the modern orthography; the Uthmanic rasm of the earliest codices writes the word for \'the heavens\' with both its long ā\'s unwritten, and the printed muṣḥaf supplies them with a superscript alif. That is the rasm of lesson one, still visible in the most-read book in the world.',
                    ],
                    examples: [
                        { native: 'الله نور السماوات والأرض', translit: 'Allāh nūr al-samāwāt wa-l-arḍ', gloss: 'God is the Light of the heavens and the earth', note: 'Q 24:35, opening. Apposition, not simile.' },
                        { native: 'النور', translit: 'al-Nūr = 287', gloss: 'the Light — a divine name', note: 'One of the ninety-nine, and the name of the sūra.' },
                    ],
                },
                {
                    heading: 'الله لا إله إلا هو الحي القيوم',
                    paragraphs: [
                        'The first clause of the Throne Verse, Q 2:255, known as Āyat al-Kursī and the most recited verse of the Qurʾān after the Fātiḥa. You can now read it whole. Allāh; then the negation-and-exception of lesson seven, but with the pronoun huwa, \'He\', in place of the name; then two divine names in apposition, al-Ḥayy and al-Qayyūm.',
                        'Al-Ḥayy is the Living: possessed of life essentially rather than derivatively. Al-Qayyūm is harder to render and every translator struggles — self-subsisting, the one who stands by himself and by whom everything else stands. The hall reckons them at forty-nine and a hundred and eighty-seven, and the pairing of the two names is itself a subject of commentary.',
                    ],
                    examples: [
                        { native: 'الله لا إله إلا هو الحي القيوم', translit: 'Allāh lā ilāha illā huwa al-Ḥayy al-Qayyūm', gloss: 'God — there is no god but He, the Living, the Self-subsisting', note: 'Q 2:255, first clause. The Shahāda\'s shape with huwa for the name.' },
                        { native: 'هو', translit: 'huwa', gloss: 'He', note: 'The pronoun of the divine ipseity; the hāʾ of huwa is a letter the Sufis dwell on.' },
                    ],
                },
                {
                    heading: 'أنا الحق',
                    paragraphs: [
                        'Two words, and among the most consequential ever spoken in Arabic. Anā, \'I\'; al-Ḥaqq, \'the Real\' — a divine name, the one the hall reckons at a hundred and thirty-nine. Al-Ḥusayn ibn Manṣūr al-Ḥallāj was executed at Baghdad in 922, and this sentence is what the tradition remembers him for.',
                        'What he meant has been argued ever since, and the arguing is the point. Read one way it is a claim to identity with God and therefore blasphemy; read another it is a report of a state in which the speaker has ceased, so that what speaks is not the speaker — the doctrine later systematised as fanāʾ, annihilation, and its complement baqāʾ, subsistence. Many later Sufis defended him on exactly that ground; others held that whatever the truth of the state, it should not have been said aloud.',
                        'The sentence comes down chiefly as a reported saying, through the literature of shaṭaḥāt, ecstatic utterances, and the accounts of his trial. It also stands in the Kitāb al-Ṭawāsīn transmitted under his own name. That is a thinner evidential base than its fame suggests, and worth saying.',
                    ],
                    examples: [
                        { native: 'أنا الحق', translit: 'anā al-Ḥaqq', gloss: 'I am the Real', note: 'Ascribed to al-Ḥallāj, executed at Baghdad in 922.' },
                        { native: 'الحق', translit: 'al-Ḥaqq = 139', gloss: 'the Real, the Truth', note: 'A divine name; also the ordinary word for truth and for what is rightfully due.' },
                    ],
                },
                {
                    heading: 'The words they thought in',
                    paragraphs: [
                        'You now have enough to open a page, and the vocabulary is the last thing to fix. Ḥaqīqa is the inner reality, set against sharīʿa, the outward law, with ṭarīqa, the path, between them — a threefold scheme the orders use constantly. Maʿrifa is knowledge by direct acquaintance, as against ʿilm, knowledge acquired. Tawḥīd is the affirmation of unity, and waḥdat al-wujūd, the unity of being, is the doctrine associated with Ibn ʿArabī, whose Fuṣūṣ al-ḥikam the hall dates to 1229.',
                        'For the states: fanāʾ and baqāʾ, annihilation and subsistence; kashf, unveiling; tajallī, self-disclosure. For the practice: dhikr, remembrance; samāʿ, audition; khalwa, the retreat; murāqaba, vigilance. For the structure: shaykh and murīd, master and disciple, joined in a silsila, a chain reaching back. And for the cosmos: barzakh, the isthmus between two orders, and ʿālam al-mithāl, the world of images, where Ibn ʿArabī located the forms that are neither purely spirit nor purely body.',
                        'The hall\'s currents take these up in earnest — the science of letters, the alchemy, the astral magic of the Ghāya that crossed into Latin as the Picatrix, and the Brethren of Purity. That is the next room, and you can now read the words on its door.',
                    ],
                    examples: [
                        { native: 'حقيقة · شريعة · طريقة', translit: 'ḥaqīqa · sharīʿa · ṭarīqa', gloss: 'inner reality · the law · the path', note: 'The threefold scheme the orders work with.' },
                        { native: 'فناء وبقاء', translit: 'fanāʾ wa-baqāʾ', gloss: 'annihilation and subsistence', note: 'The pair by which al-Ḥallāj\'s sentence is usually defended.' },
                        { native: 'وحدة الوجود', translit: 'waḥdat al-wujūd', gloss: 'the unity of being', note: 'The doctrine associated with Ibn ʿArabī.' },
                        { native: 'عالم المثال', translit: 'ʿālam al-mithāl', gloss: 'the world of images', note: 'Neither purely spirit nor purely body; where the imaginal forms subsist.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'السماوات', translit: 'al-samāwāt', gloss: 'the heavens' },
                { native: 'الأرض', translit: 'al-arḍ', gloss: 'the earth' },
                { native: 'هو', translit: 'huwa', gloss: 'He' },
                { native: 'أنا', translit: 'anā', gloss: 'I' },
                { native: 'فناء', translit: 'fanāʾ', gloss: 'annihilation of the self' },
                { native: 'بقاء', translit: 'baqāʾ', gloss: 'subsistence in God' },
                { native: 'شريعة', translit: 'sharīʿa', gloss: 'the revealed law' },
                { native: 'طريقة', translit: 'ṭarīqa', gloss: 'the path; a Sufi order' },
                { native: 'وحدة الوجود', translit: 'waḥdat al-wujūd', gloss: 'the unity of being' },
                { native: 'عالم المثال', translit: 'ʿālam al-mithāl', gloss: 'the world of images' },
            ],
            exercises: [
                { prompt: 'Translate الله نور السماوات والأرض and say why the grammar matters.', answer: '\'God is the Light of the heavens and the earth.\' The two nouns stand in apposition rather than in a comparison, so the verse says God is the light, not that God is like a light.', hint: null },
                { prompt: 'Which treatise did al-Ghazālī devote to that verse?', answer: 'The Mishkāt al-anwār, the Niche of Lights.', hint: null },
                { prompt: 'In the Throne Verse, what stands where the name stands in the Shahāda?', answer: 'The pronoun huwa, \'He\' — lā ilāha illā huwa rather than illā Allāh.', hint: null },
                { prompt: 'Translate al-Ḥayy and al-Qayyūm, and say which is harder to render.', answer: 'The Living and the Self-subsisting. Al-Qayyūm is the harder: it means the one who stands by himself and by whom everything else stands, and no single English word carries it.', hint: null },
                { prompt: 'What are the two readings of أنا الحق?', answer: 'A claim to identity with God, and so blasphemy; or a report of a state in which the speaker has been annihilated, so that what speaks is not the speaker — the doctrine of fanāʾ and baqāʾ.', hint: null },
                { prompt: 'How well attested is that sentence?', answer: 'Less well than its fame suggests. It comes down chiefly as a reported saying through the shaṭaḥāt literature and trial accounts, and stands in the Kitāb al-Ṭawāsīn transmitted under his name.', hint: null },
                { prompt: 'Distinguish ʿilm from maʿrifa.', answer: 'ʿIlm is knowledge acquired and transmitted; maʿrifa is knowledge by direct acquaintance, gnosis.', hint: null },
                { prompt: 'Name the threefold scheme of sharīʿa, ṭarīqa and ḥaqīqa.', answer: 'The outward law, the path, and the inner reality — the outer, the way, and what the way is towards.', hint: null },
            ],
        },
    ],
};
