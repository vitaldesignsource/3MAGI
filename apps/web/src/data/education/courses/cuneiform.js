// cuneiform course — eight lessons for the Scriptorium.
// Every text quoted is one the hall already carries and has verified, and the
// hall's own discipline is kept: cuneiform is printed only where the signs are
// securely read, and transliteration stands wherever the spellings differ
// between manuscripts or the tablet is broken. Every sexagesimal value in
// lessons five and six was recomputed against the hall's own numeral signs
// before it was written down.
export default {
    language: 'cuneiform',
    title: 'Before the Alphabet',
    tagline: 'Eight lessons from the first accounts at Uruk to the opening of the Babylonian creation epic — and the square root of two, read off a tablet of 1800 BC.',
    overview: 'Writing begins here, and it begins as bookkeeping. The earliest tablets from Uruk are records of barley, sheep and cloth; literature comes centuries later. This course assumes nothing and teaches the system rather than a language: what a wedge is and why the signs look as they do; the three quite different jobs a single sign can perform; how two unrelated languages, Sumerian and Akkadian, came to share one script; and the transliteration conventions that every edition uses and almost no book explains, so that a line like ᵈEN.LÍL or lú or gu₄ stops being noise. Then the numbers, which are the great surprise: Mesopotamia counted by sixties, positionally, with two marks and no zero for most of its history, and by 1800 BC could write the square root of two to six significant figures. You will read that tablet. The last two lessons read short texts entire — a votive formula, a line of Sumerian wisdom, the opening of Gudea\'s cylinder — and end at enūma eliš, \'when on high\', the first words of the Babylonian creation epic.',
    lessons: [
        {
            number: 1,
            title: 'Writing Begins in a Warehouse',
            aim: 'Understand where writing came from and what it was first for, and see why a reed pressed into clay produces the shapes it does.',
            sections: [
                {
                    heading: 'Accounts before literature',
                    paragraphs: [
                        'The earliest writing we have comes from the temple precinct at Uruk in southern Iraq, at the end of the fourth millennium before Christ, and it is not poetry, prayer or law. It is administration: lists of barley, sheep, cloth and labour, with numbers beside them and the officials\' seals impressed alongside. Literature arrives centuries later.',
                        'This matters for how the script is built. A system designed to record commodities begins with pictures of the commodities and marks for their quantities, and Mesopotamian numerals stayed partly separate from the writing for that reason — the numbers had their own signs before the words did. What became a script capable of the Gilgameš epic started as a way of not being cheated.',
                    ],
                    examples: [
                        { native: '𒄞', translit: 'GU₄ / gu₄, gud — Akkadian alpu', gloss: 'ox, bull', note: 'A commodity sign: the kind of thing the first tablets were counting.' },
                        { native: '𒂍', translit: 'É / é — Akkadian bītu', gloss: 'house, household, temple', note: 'The institution doing the counting. É is also the sign this course returns to constantly.' },
                    ],
                },
                {
                    heading: 'The tool makes the letter',
                    paragraphs: [
                        'A wedge is not drawn; it is pressed. A reed stylus cut to a triangular end, pushed into damp clay and lifted, leaves an impression with a broad head and a narrow tail — and every cuneiform sign is a small arrangement of those impressions. The name itself says so: cuneus is Latin for wedge.',
                        'Two consequences follow. Curves are expensive and straight strokes are cheap, so the early pictures were rapidly stylised into bundles of wedges that no longer look like anything. And clay, unlike papyrus or parchment, survives fire — the libraries that burned are the libraries we have. Nineveh gave us the Gilgameš manuscripts because Nineveh was sacked and burned in 612 BC.',
                    ],
                    examples: [
                        { native: '𒁹', translit: 'DIŠ / diš', gloss: 'one — a single vertical wedge', note: 'The simplest sign there is: one impression of the stylus.' },
                        { native: '𒌋', translit: 'U / u', gloss: 'ten — the corner wedge', note: 'Called the Winkelhaken. With DIŠ it writes every number in the system.' },
                        { native: '𒀀', translit: 'A / a — Akkadian mû', gloss: 'water; also the syllable a', note: 'Once a picture of running water; now four wedges that resemble nothing.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒂍', translit: 'é', gloss: 'house, household, temple' },
                { native: '𒇽', translit: 'lú', gloss: 'man, person' },
                { native: '𒈗', translit: 'lugal', gloss: 'king' },
                { native: '𒀭', translit: 'an / DINGIR', gloss: 'sky, heaven; god' },
                { native: '𒆠', translit: 'ki', gloss: 'earth, ground, place' },
                { native: '𒌓', translit: 'ud / utu', gloss: 'sun, day' },
                { native: '𒀀', translit: 'a', gloss: 'water' },
                { native: '𒆳', translit: 'kur', gloss: 'mountain, foreign land, netherworld' },
            ],
            exercises: [
                { prompt: 'What were the earliest tablets from Uruk used for?', answer: 'Administration — records of barley, sheep, cloth and labour, with quantities. Literature comes centuries later.', hint: null },
                { prompt: 'Why is a cuneiform sign made of wedges rather than lines?', answer: 'Because a triangular reed stylus is pressed into damp clay rather than dragged across it, leaving an impression with a head and a tail. Curves are impractical; wedges are what the tool makes.', hint: null },
                { prompt: 'Why do we have the Nineveh libraries at all?', answer: 'Because clay survives burning. Nineveh was sacked and burned in 612 BC, and the fire baked and preserved the tablets.', hint: 'Ask what fire does to clay as against papyrus.' },
                { prompt: 'What do 𒁹 and 𒌋 stand for?', answer: 'One and ten — the vertical wedge and the corner wedge, which between them write every number in the system.', hint: null },
                { prompt: 'What does the word cuneiform mean, and where does it come from?', answer: 'Wedge-shaped, from Latin cuneus, a wedge. It names the impressions the stylus makes rather than any language.', hint: null },
            ],
        },
        {
            number: 2,
            title: 'Three Jobs a Sign Can Do',
            aim: 'Learn the three functions a single cuneiform sign can perform — word, syllable, and silent classifier — and see why the same sign can be all three.',
            sections: [
                {
                    heading: 'It may be a word',
                    paragraphs: [
                        'A sign may stand for a whole word. 𒂍 is é, \'house\'; 𒈗 is lugal, \'king\'; 𒆳 is kur, \'mountain, foreign land, the netherworld\'. Used this way a sign is a logogram, and the convention in transliteration is to write it in capitals when it is being cited as a sign rather than read in a particular language.',
                        'This is the oldest use, and it is the one the accounting tablets needed: a picture of an ox stands for an ox. It is also the most economical, which is why it never went away — Akkadian scribes writing a Semitic language continued to use Sumerian logograms as shorthand for a thousand years, the way we write & or £.',
                    ],
                    examples: [
                        { native: '𒈗', translit: 'LUGAL / lugal — Akkadian šarru', gloss: 'king', note: 'One sign, one word. Composed of LÚ, man, with GAL, great.' },
                        { native: '𒎏', translit: 'NIN / nin — Akkadian bēltu', gloss: 'lady, mistress, queen', note: 'Its Akkadian equivalent is a different word entirely; the sign is indifferent to which language reads it.' },
                    ],
                },
                {
                    heading: 'It may be a syllable',
                    paragraphs: [
                        'The same sign may instead stand for a sound: a syllable of the shape consonant-vowel, vowel-consonant, or consonant-vowel-consonant — ba, ab, bad. This is the step that made the script able to write anything, including foreign names and grammatical endings that no picture could carry.',
                        'The mechanism is the rebus. 𒀀 is a picture of water, Sumerian a — so it can also write the syllable /a/ wherever that sound is needed, with no reference to water at all. English does this in a puzzle-book; Mesopotamia did it as a writing system.',
                    ],
                    examples: [
                        { native: '𒀀', translit: 'a', gloss: 'water — and the syllable /a/', note: 'The rebus principle: the sound of the word, detached from its meaning.' },
                        { native: '𒌓', translit: 'ud, utu — Akkadian ūmu, šamšu', gloss: 'sun, day; and the syllable ud', note: 'A sign with several readings, which is the subject of lesson three.' },
                    ],
                },
                {
                    heading: 'It may be silent',
                    paragraphs: [
                        'The third job is the strangest and the most useful. A determinative is a sign that is written but not pronounced: a silent classifier telling the reader what kind of thing the next word is. 𒀭 DINGIR before a name says \'this is a god\'. 𒆠 KI after a name says \'this is a place\'. 𒄑 GIŠ before a word says \'this thing is made of wood\'; 𒎎 NA₄ says \'this is a stone\'.',
                        'They are the script\'s answer to a real problem. With no spaces between words and signs that could be read several ways, a reader needed to be told what sort of word was coming, and the determinative does it in advance. In transliteration determinatives are raised as superscripts, so that a god\'s name appears with a small d and a city with a small ki — which is why editions are full of them and why they look like typographic accidents until you know.',
                    ],
                    examples: [
                        { native: '𒀭', translit: 'DINGIR, superscript d', gloss: 'the divine determinative — written, never spoken', note: 'Also read an, \'sky, heaven\', and as the god An. Three jobs in one sign.' },
                        { native: '𒆠', translit: 'KI, superscript ki', gloss: 'the place determinative, written after the name', note: 'Also the word ki, \'earth, ground, place\'.' },
                        { native: '𒄑', translit: 'GIŠ', gloss: 'wood, tree; and the determinative for wooden things', note: 'Standing before a word it says the thing named is made of wood.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒎏', translit: 'nin', gloss: 'lady, mistress, queen' },
                { native: '𒂗', translit: 'en', gloss: 'lord; the en-priest' },
                { native: '𒃲', translit: 'gal', gloss: 'great, big, senior' },
                { native: '𒄑', translit: 'ĝiš', gloss: 'wood, tree' },
                { native: '𒎎', translit: 'na₄', gloss: 'stone' },
                { native: '𒌷', translit: 'uru, iri', gloss: 'city, town' },
                { native: '𒊕', translit: 'saĝ', gloss: 'head; first, foremost' },
                { native: '𒈬', translit: 'mu', gloss: 'name; year' },
            ],
            exercises: [
                { prompt: 'Name the three jobs a cuneiform sign can do.', answer: 'It can stand for a whole word (a logogram), for a syllable, or for nothing spoken at all (a determinative, a silent classifier).', hint: null },
                { prompt: 'What is the rebus principle, and how does 𒀀 illustrate it?', answer: 'A sign\'s sound is detached from its meaning and used for that sound anywhere. 𒀀 pictures water, Sumerian a, and so can write the syllable /a/ with no reference to water.', hint: null },
                { prompt: 'What does a determinative do, and is it pronounced?', answer: 'It classifies the word beside it — god, place, wood, stone — and it is never pronounced.', hint: null },
                { prompt: 'Where do DINGIR and KI stand relative to the name they classify?', answer: 'DINGIR before it; KI after it.', hint: null },
                { prompt: 'Why did the script need determinatives?', answer: 'Because there were no spaces between words and many signs had several possible readings, so the reader needed telling in advance what kind of word was coming.', hint: null },
                { prompt: 'Give three different functions of the single sign 𒀭.', answer: 'The word an, \'sky, heaven\'; the name of the god An; and the silent determinative DINGIR marking the following name as a god\'s.', hint: null },
            ],
        },
        {
            number: 3,
            title: 'Two Languages, One Script',
            aim: 'Learn that cuneiform served two wholly unrelated languages, how Akkadian took over a system built for Sumerian, and why that history is visible on every tablet.',
            sections: [
                {
                    heading: 'An isolate and a Semite',
                    paragraphs: [
                        'Sumerian, the language the script was made for, is an isolate: no relative has ever been found for it, anywhere. It is agglutinative, building words by stringing affixes onto a stem, and its grammar has nothing in common with the languages around it.',
                        'Akkadian is East Semitic — a cousin of Hebrew, Aramaic and Arabic, with the triliteral roots and the internal vowel changes those languages share. It has no business using a script designed for Sumerian, and the awkwardness of the fit is visible on every tablet.',
                        'The two coexisted for centuries and then Sumerian died as a spoken language, somewhere around the start of the second millennium, while continuing as a language of learning and liturgy for two thousand years after — the position Latin held in Europe. Scribes went on being trained in it long after nobody\'s mother spoke it.',
                    ],
                    examples: [
                        { native: '𒂗', translit: 'en (Sumerian) — bēlu (Akkadian)', gloss: 'lord', note: 'One sign, two entirely unrelated words, depending on which language is reading.' },
                        { native: '𒇽', translit: 'lú (Sumerian) — amēlu (Akkadian)', gloss: 'man, person', note: 'The Akkadian word is Semitic and shares nothing with the Sumerian.' },
                        { native: '𒋗', translit: 'šu (Sumerian) — qātu (Akkadian)', gloss: 'hand', note: 'Again two languages meeting in one sign.' },
                    ],
                },
                {
                    heading: 'The shorthand that stayed',
                    paragraphs: [
                        'When Akkadian scribes took the script over they kept the Sumerian logograms as abbreviations, reading them aloud as the Akkadian word. A scribe writing Akkadian could write 𒈗 and say šarru, \'king\', exactly as an English writer may write & and say \'and\'. Signs used this way are called Sumerograms, and editions print them in capitals to mark what is happening.',
                        'The result is that a line of Akkadian is a mixture: syllabic spellings for the grammar and for anything unusual, Sumerograms for common nouns, and determinatives scattered through to keep the reader oriented. The hall\'s Maqlû line shows it — the manuscripts write the gods with the logogram DINGIR.MEŠ rather than spelling out the Akkadian plural, so the case ending has to be supplied by the reader.',
                    ],
                    examples: [
                        { native: '𒈗', translit: 'LUGAL, read šarru in Akkadian', gloss: 'king', note: 'A Sumerogram: written in Sumerian, spoken in Akkadian.' },
                        { native: 'alsīkunūši ilī mušīti', translit: 'Maqlû I.1', gloss: 'I call upon you, gods of the night', note: 'The manuscripts write the gods logographically as DINGIR.MEŠ, so the case vowel is not on the tablet.' },
                    ],
                },
                {
                    heading: 'Why a sign has several readings',
                    paragraphs: [
                        'Put those two facts together and you have the central difficulty of reading cuneiform. A sign may be a logogram or a syllable; it may be read in Sumerian or in Akkadian; and by the rebus principle it may have acquired several syllabic values along the way. 𒅗 KA is mouth, and also inim \'word\', and also dug₄ \'to speak\', and also zú \'tooth\' — four readings for one sign, all in Sumerian, before Akkadian is considered.',
                        'The system is therefore radically ambiguous in a way an alphabet is not, and Assyriologists resolve it by context and by convention. Those conventions are the subject of the next lesson, and they are worth an hour of anyone\'s time: without them, a printed edition is unreadable noise.',
                    ],
                    examples: [
                        { native: '𒅗', translit: 'ka, inim, dug₄, zú — Akkadian pû', gloss: 'mouth; word; to speak; tooth', note: 'Four Sumerian readings for one sign. Context decides.' },
                        { native: '𒋾', translit: 'ti, tìl — Akkadian ṣēlu, balāṭu', gloss: 'arrow; rib; to live', note: 'The famous one: rib and life share a sign, which is why Enki heals Ninhursaĝa\'s rib.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒅗', translit: 'ka, inim, dug₄', gloss: 'mouth; word; to speak' },
                { native: '𒋾', translit: 'ti, tìl', gloss: 'arrow; rib; to live' },
                { native: '𒋗', translit: 'šu', gloss: 'hand' },
                { native: '𒅆', translit: 'igi', gloss: 'eye; face, before' },
                { native: '𒍣', translit: 'zi', gloss: 'life, breath, throat' },
                { native: '𒉆', translit: 'nam', gloss: 'fate, destiny; abstract prefix' },
                { native: '𒈨', translit: 'me', gloss: 'divine office, ordinance, rite' },
                { native: '𒆬', translit: 'kù', gloss: 'pure, holy, bright; silver' },
            ],
            exercises: [
                { prompt: 'What kind of language is Sumerian, and what kind is Akkadian?', answer: 'Sumerian is an isolate with no known relatives, and agglutinative. Akkadian is East Semitic, a cousin of Hebrew, Aramaic and Arabic.', hint: null },
                { prompt: 'What happened to Sumerian as a spoken language, and what happened to it afterwards?', answer: 'It died out as a spoken language around the start of the second millennium BC, but continued as a language of learning and liturgy for some two thousand years — the position Latin later held in Europe.', hint: null },
                { prompt: 'What is a Sumerogram?', answer: 'A Sumerian logogram used inside an Akkadian text as shorthand, written in Sumerian but read aloud as the Akkadian word — as an English writer writes & and says \'and\'.', hint: null },
                { prompt: 'Give four Sumerian readings of the sign 𒅗.', answer: 'ka \'mouth\', inim \'word\', dug₄ \'to speak\', zú \'tooth\'.', hint: null },
                { prompt: 'Name three sources of ambiguity in reading a cuneiform sign.', answer: 'It may be a logogram or a syllable; it may be read in Sumerian or Akkadian; and it may have acquired several syllabic values through the rebus principle.', hint: null },
            ],
        },
        {
            number: 4,
            title: 'How Assyriologists Write It Down',
            aim: 'Learn the transliteration conventions every edition uses and almost no book explains, so that ᵈEN.LÍL, lú and gu₄ stop being noise and start carrying information.',
            sections: [
                {
                    heading: 'Capitals, italics and superscripts',
                    paragraphs: [
                        'The conventions are rigid and they are load-bearing. Sumerian is set in spaced or small capitals: EN.LÍL. Akkadian is set in italics: bēlu. Determinatives are raised as superscripts, so a god carries a small d before the name and a city a small ki after it. A reader who knows only this much can already tell, from the typography alone, which language a word belongs to and which signs are silent.',
                        'Two kinds of join do different work. A hyphen means the signs are being read syllabically, one sound after another: nam-ti-la-ni-šè. A full stop means the signs are being cited by their names, without commitment to a reading: EN.LÍL is the sign EN followed by the sign LÍL. The difference matters, and editions observe it strictly.',
                    ],
                    examples: [
                        { native: 'EN.LÍL', translit: 'sign names, joined by full stops', gloss: 'the god Enlil, cited as two signs', note: 'Capitals for Sumerian; full stops because the signs are named, not read out syllabically.' },
                        { native: 'nam-ti-la-ni-šè', translit: 'syllabic reading, joined by hyphens', gloss: 'for the sake of his life', note: 'Hyphens because each piece is a sound in sequence. From the votive formula of lesson seven.' },
                        { native: '𒀭𒂗𒆤', translit: 'the same name in signs', gloss: 'Enlil', note: 'The divine determinative, then EN, then the sign read líl.' },
                    ],
                },
                {
                    heading: 'The little numbers',
                    paragraphs: [
                        'Then the index numbers, which puzzle everyone. Many signs share a reading — there are several signs that can be read e, several that can be read lu — and Assyriology distinguishes them by numbering, in order of how commonly they occur. The first needs no mark. The second takes an acute accent, so é is the same as e₂. The third takes a grave, so tìl is the same as til₃. Everything after that takes a plain subscript numeral: gu₄, ku₇, eri₁₁.',
                        'So the accents are not stress marks and not vowel qualities. They are numerals in disguise, and é does not sound different from e — it is a different sign. Once that clicks, a page of transliteration becomes legible: lú is the second lu-sign, gu₄ is the fourth gu-sign, and the reader knows exactly which wedge-arrangement is meant.',
                    ],
                    examples: [
                        { native: 'é = e₂', translit: 'acute for the second sign', gloss: 'the sign 𒂍, house', note: 'The accent is a numeral, not a pronunciation.' },
                        { native: 'lú = lu₂', translit: 'acute again', gloss: 'the sign 𒇽, man', note: 'The second of the signs readable lu.' },
                        { native: 'tìl = til₃', translit: 'grave for the third', gloss: 'a reading of the sign 𒋾', note: 'Grave accent, therefore the third sign with that reading.' },
                        { native: 'gu₄', translit: 'plain subscript from the fourth on', gloss: 'the sign 𒄞, ox', note: 'Beyond third, the number is simply written.' },
                    ],
                },
                {
                    heading: 'Why editions print letters instead of wedges',
                    paragraphs: [
                        'You will notice that this hall prints cuneiform for some texts and only transliteration for others, and the reason is a discipline worth adopting. The sign-spellings of a composition often differ from manuscript to manuscript; a line may be broken; a reading may be a scholarly restoration. To print a sign is to assert that a particular wedge-arrangement stood on a particular tablet, and that assertion is frequently not available.',
                        'So the hall prints signs only where they are securely read — the votive formula, the first signs of Gudea\'s cylinder — and transliteration everywhere else. The opening of the Babylonian creation epic in lesson eight is given in transliteration for exactly this reason, and so are Gilgameš and Maqlû. That is not a limitation of the hall; it is what an honest edition does.',
                    ],
                    examples: [
                        { native: '𒉆𒋾𒆷𒉌𒂠 𒀀 𒈬𒈾𒊒', translit: 'nam-ti-la-ni-šè a mu-na-ru', gloss: 'for the sake of his life he dedicated it', note: 'Printed in signs: a fixed formula, securely attested on many objects.' },
                        { native: 'enūma eliš lā nabû šamāmū', translit: 'Enūma eliš I.1', gloss: 'when on high the heavens had not been named', note: 'Transliteration only: the sign-spellings differ between manuscripts.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒀭𒂗𒆤', translit: 'Enlil', gloss: 'the god Enlil' },
                { native: '𒀭𒂗𒆠', translit: 'Enki, Ea', gloss: 'lord of the subterranean waters' },
                { native: '𒀭𒌓', translit: 'Utu, Šamaš', gloss: 'the sun god' },
                { native: '𒀭𒈹', translit: 'Inanna, Ištar', gloss: 'the goddess' },
                { native: '𒀭𒀫𒌓', translit: 'Marduk', gloss: 'Marduk — amar-utu, calf of the sun' },
                { native: '𒌉', translit: 'dumu, tur', gloss: 'child, son, daughter; small' },
                { native: '𒊩', translit: 'munus, sal', gloss: 'woman, female' },
                { native: '𒋀', translit: 'šeš', gloss: 'brother' },
            ],
            exercises: [
                { prompt: 'How are Sumerian and Akkadian distinguished typographically in an edition?', answer: 'Sumerian in spaced or small capitals; Akkadian in italics. Determinatives are raised as superscripts.', hint: null },
                { prompt: 'What is the difference between a hyphen and a full stop between signs?', answer: 'A hyphen means the signs are read syllabically as a sequence of sounds; a full stop means they are being cited by sign name without committing to a reading.', hint: null },
                { prompt: 'What does the acute accent in é mean?', answer: 'That it is the second sign with the reading e — é is identical to e₂. The accent is a numeral, not a pronunciation.', hint: 'It is not a stress mark.' },
                { prompt: 'What do lú and tìl tell you?', answer: 'lú is the second sign readable lu (lu₂); tìl, with a grave, is the third sign readable til (til₃).', hint: null },
                { prompt: 'Why does this hall print cuneiform for the votive formula but not for Enūma eliš?', answer: 'Because the votive formula is a fixed text securely attested on many objects, while the epic\'s sign-spellings differ between manuscripts. Printing a sign asserts it stood on a tablet, and that assertion is not always available.', hint: null },
                { prompt: 'Read the typography: ᵈEN.LÍL. What are you being told?', answer: 'A raised d — the silent divine determinative; then two signs cited by name, in capitals, so Sumerian; joined by a full stop rather than a hyphen, so named rather than read syllabically.', hint: null },
            ],
        },
        {
            number: 5,
            title: 'Counting by Sixties',
            aim: 'Learn to read Mesopotamian numbers: two marks, repeated within a place, in true place-value notation to base sixty.',
            sections: [
                {
                    heading: 'Two marks and nothing else',
                    paragraphs: [
                        'The whole numeral system uses two signs. 𒁹, the vertical wedge, is one; 𒌋, the corner wedge or Winkelhaken, is ten. Within a place they are simply repeated and added: three verticals are three, two corners and three verticals are twenty-three. There is no sign for four, or for twenty; you write what you mean by repetition.',
                        'That gets you as far as fifty-nine — five corners and nine verticals — and no further, because at sixty a new place begins to the left. Each place is worth sixty times the one to its right, exactly as each of our places is worth ten times the one to its right.',
                    ],
                    examples: [
                        { native: '𒌋𒌋𒁹𒁹𒁹', translit: '23', gloss: 'twenty-three', note: 'Two corner wedges and three verticals, read by addition.' },
                        { native: '𒐐𒐎', translit: '59', gloss: 'fifty-nine', note: 'Five tens and nine units: the most a single place can hold.' },
                    ],
                },
                {
                    heading: 'A new place at sixty',
                    paragraphs: [
                        'Modern editions write sexagesimal numbers with commas between the places, so 1,30 means one sixty and thirty — ninety. And 1,1 means one sixty and one — sixty-one. On the tablet the places are separated by a space, and that space is doing the work our comma does.',
                        'Which is where the trouble lies. A space is easy to write faintly, easy to miss, and easy to lose to a chipped edge. Two verticals with a space between are sixty-one; the same two verticals without it are two. For most of its history the system had no zero at all, so a blank place had to be inferred from context, and a scribe who wanted 3,0,1 simply left a gap and hoped. A placeholder sign comes into regular use only in the Late Babylonian period, chiefly in the astronomical tablets — and even then it stands between places and, a handful of disputed cases aside, not at the end, so a number still could not be closed off.',
                    ],
                    examples: [
                        { native: '𒁹 𒌋𒌋𒌋', translit: '1,30 = 90', gloss: 'ninety', note: 'One sixty, then thirty. The space marks the change of place.' },
                        { native: '𒁹 𒁹', translit: '1,1 = 61', gloss: 'sixty-one', note: 'Without the space the same two wedges would read simply 2.' },
                        { native: '𒑲', translit: 'the late placeholder', gloss: 'an empty place', note: 'In regular use only from the Late Babylonian period, and standing between places rather than at the end.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒁹', translit: 'diš', gloss: 'one; the vertical wedge' },
                { native: '𒌋', translit: 'u', gloss: 'ten; the corner wedge' },
                { native: '𒐕', translit: 'geš', gloss: 'sixty' },
                { native: '𒐞', translit: 'geš-u', gloss: 'six hundred' },
                { native: '𒊹', translit: 'šár', gloss: 'three thousand six hundred' },
                { native: '𒐬', translit: 'šár-u', gloss: 'thirty-six thousand' },
            ],
            exercises: [
                { prompt: 'How many distinct signs does the numeral system need, and what are they worth?', answer: 'Two: the vertical wedge 𒁹, worth one, and the corner wedge 𒌋, worth ten.', hint: null },
                { prompt: 'Read 𒌋𒌋𒁹𒁹𒁹.', answer: '23 — two tens and three ones, added.', hint: null },
                { prompt: 'What is the largest number a single sexagesimal place can hold, and how is it written?', answer: 'Fifty-nine — five corner wedges and nine verticals.', hint: null },
                { prompt: 'What does 1,30 mean, and what is it in our notation?', answer: 'One sixty and thirty — ninety.', hint: null },
                { prompt: 'Why is 𒁹 𒁹 sixty-one rather than two?', answer: 'Because of the space between them: it marks a change of place, so the first wedge is worth sixty. Without the space the two would simply add to two.', hint: null },
                { prompt: 'What did Mesopotamia use for zero, and for how long?', answer: 'Nothing, for most of its history — an empty place had to be inferred from context. A placeholder comes into regular use only in the Late Babylonian period, and even then it stands between places rather than closing a number off.', hint: null },
            ],
        },
        {
            number: 6,
            title: 'The Square Root of Two',
            aim: 'Read two of the most remarkable tablets ever excavated, and understand why a base of sixty was a better choice than it looks.',
            sections: [
                {
                    heading: 'YBC 7289',
                    paragraphs: [
                        'A small round hand-tablet in the Yale Babylonian Collection, Old Babylonian, roughly eighteen hundred years before Christ. It shows a square with its diagonals drawn, and along the diagonal a number: 1;24,51,10 — one, and twenty-four sixtieths, and fifty-one three-thousand-six-hundredths, and ten more places down.',
                        'Work it out. One, plus 24/60, plus 51/3600, plus 10/216000, comes to 1.4142129630. The square root of two is 1.4142135624. The two agree to six significant figures; the tablet falls short by six ten-millionths, which is about one part in two and a third million. And it was written by a student, on a practice tablet, before 1600 BC. Nobody in Mesopotamia had the concept of an irrational number, and it did not matter: they had a method that converged, and they used it.',
                        'That the tablet is a school exercise is the part worth pausing on. This was not a monument to a discovery. It was homework.',
                    ],
                    examples: [
                        { native: '𒁹 𒌋𒌋𒐉 𒐐𒁹 𒌋', translit: '1;24,51,10', gloss: 'the diagonal figure on YBC 7289', note: '1 + 24/60 + 51/3600 + 10/216000 = 1.4142129630, against a true 1.4142135624 — right to six significant figures.' },
                        { native: '𒌋𒌋𒐉', translit: '24', gloss: 'the first sexagesimal place after the unit', note: 'Two corner wedges and four verticals.' },
                        { native: '𒐐𒁹', translit: '51', gloss: 'the second place', note: 'Five tens and one.' },
                    ],
                },
                {
                    heading: 'Plimpton 322',
                    paragraphs: [
                        'The other famous tablet is a table of numbers in four columns, Old Babylonian, in the George A. Plimpton collection at Columbia. Its rows list what we would call Pythagorean triples — sets of whole numbers where two squares sum to a third — a thousand years before Pythagoras, and there is no mysticism in it: it is a table, laid out for use.',
                        'The second column of the first row reads 1,59. You can now read that: one sixty and fifty-nine, which is a hundred and nineteen. What the table was for is genuinely argued — a trigonometric table, a list of reciprocal pairs, a teacher\'s worked exercises — and the honest position is that we know exactly what the numbers are and not what they were wanted for.',
                    ],
                    examples: [
                        { native: '𒁹 𒐐𒐎', translit: '1,59 = 119', gloss: 'from the second column of Plimpton 322, first row', note: 'One sixty plus fifty-nine. The number is certain; the table\'s purpose is not.' },
                    ],
                },
                {
                    heading: 'Why sixty',
                    paragraphs: [
                        'The old stories are wrong. It is not because the year has three hundred and sixty days, and not because two peoples with different bases met and split the difference. The origin is not settled, and some accounts derive it from the ratios between existing units of weight and capacity.',
                        'The most durable explanation is arithmetical, and it is easy to check. Sixty has twelve divisors — one, two, three, four, five, six, ten, twelve, fifteen, twenty, thirty and sixty. Ten has four. In a system without decimal fractions, a base that divides evenly by three and by four and by six makes a third and a quarter and a sixth into exact figures rather than repeating ones, and a scribe dividing rations or land is doing exactly that all day.',
                        'It never left us. Sixty seconds, sixty minutes, three hundred and sixty degrees, and the twenty-four hours that are two twelves — all of it is Mesopotamian arithmetic still running in the background of every clock.',
                    ],
                    examples: [
                        { native: '𒐕', translit: 'geš₂ — 60', gloss: 'the great unit sixty', note: 'The older, non-positional notation kept a dedicated sign for sixty; the place-value notation of lesson five does not, writing sixty with the same wedge as one, moved a place left. Both were in use, for different purposes.' },
                        { native: '𒊹', translit: '3600', gloss: 'sixty sixties', note: 'The next great unit: šár, which also means \'totality, all\'.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒐉', translit: 'four verticals', gloss: 'four' },
                { native: '𒐐', translit: 'fifty', gloss: 'five corner wedges' },
                { native: '𒐎', translit: 'nine', gloss: 'nine verticals' },
                { native: '𒑲', translit: 'the placeholder', gloss: 'an empty sexagesimal place' },
            ],
            exercises: [
                { prompt: 'What number is written on the diagonal of YBC 7289, and what is it?', answer: '1;24,51,10 — which works out to 1.4142129630, the square root of two to six significant figures, short of the true value by about one part in two and a third million.', hint: null },
                { prompt: 'Compute 1;24,51,10 yourself.', answer: '1 + 24/60 + 51/3600 + 10/216000 = 1.4142129630. Compare 1.4142135624.', hint: 'Each place is a further division by sixty.' },
                { prompt: 'What kind of tablet is YBC 7289, and why is that striking?', answer: 'A school practice tablet — homework. The accuracy was routine enough to be set as an exercise rather than recorded as a discovery.', hint: null },
                { prompt: 'Read 1,59 from Plimpton 322 as an ordinary number.', answer: '119 — one sixty plus fifty-nine.', hint: null },
                { prompt: 'What is honestly known and not known about Plimpton 322?', answer: 'The numbers are certain, and they amount to Pythagorean triples a thousand years before Pythagoras. What the table was for is argued — trigonometry, reciprocal pairs, or teaching exercises.', hint: null },
                { prompt: 'Give the practical argument for base sixty.', answer: 'Sixty has twelve divisors against ten\'s four, so thirds, quarters and sixths come out as exact figures rather than repeating ones — which matters constantly when dividing rations or land.', hint: null },
                { prompt: 'Name three places the base survives today.', answer: 'Sixty seconds in a minute, sixty minutes in an hour, three hundred and sixty degrees in a circle — and the twenty-four-hour day, which is two twelves.', hint: null },
            ],
        },
        {
            number: 7,
            title: 'Short Texts Entire',
            aim: 'Read three short Sumerian texts with every sign accounted for: a votive formula, a line of wisdom literature, and the opening of Gudea\'s cylinder.',
            sections: [
                {
                    heading: 'For the sake of his life',
                    paragraphs: [
                        'The commonest sentence in Sumerian. It closes votive dedications on statues, mace-heads, vessels and foundation figures, from the Early Dynastic period onward, and once you can read it you can read the end of a great many inscribed objects in a great many museums.',
                        '𒉆𒋾𒆷𒉌𒂠 is nam-ti-la-ni-šè: nam-ti(l), \'life\', with the possessive -ani, \'his\', and the terminative -šè, \'for, towards\'. Then 𒀀 a, the dedicated thing, and 𒈬𒈾𒊒 mu-na-ru, \'he dedicated it to him or her\' — the verb ru with the ventive mu- and the dative -na-.',
                        'The rendering \'to him or her\' is not clumsiness. Sumerian\'s dative -na- does not distinguish gender, and the deity\'s identity comes from the opening of the inscription, which the formula assumes you have already read.',
                    ],
                    examples: [
                        { native: '𒉆𒋾𒆷𒉌𒂠 𒀀 𒈬𒈾𒊒', translit: 'nam-ti-la-ni-šè a mu-na-ru', gloss: 'For the sake of his life, he dedicated this to him or her', note: 'The standard closing formula of Sumerian votive dedications.' },
                        { native: '𒉆𒋾𒆷𒉌𒂠', translit: 'nam-ti-la-ni-šè', gloss: 'for the sake of his life', note: 'nam-ti(l) life + -ani his + -šè for. Hyphens: a syllabic reading.' },
                    ],
                },
                {
                    heading: 'Nothing is precious',
                    paragraphs: [
                        'From the Instructions of Šuruppak, line 242, one of the oldest works of literature that survives — a father\'s advice to his son, known chiefly from Old Babylonian school tablets and quoted as a proverb ever since.',
                        'níĝ-nam nu-kal zi ku₇-ku₇-dam. Níĝ-nam is \'anything at all\', from níĝ, \'thing\'. Nu-kal is the negative nu- with kal, \'to be valuable\'. Zi is life or breath — the word you met in lesson three. And ku₇-ku₇-dam is the reduplicated stem ku₇, \'to be sweet\', with an ending of obligation: \'is to be sweet\'.',
                        '\'Nothing at all is precious; but life should be sweet.\' Note the ku₇ — subscript seven, so the seventh sign readable ku, exactly as lesson four taught. The conventions are not decoration; they are how you know which wedge-arrangement is meant.',
                    ],
                    examples: [
                        { native: 'níĝ-nam nu-kal zi ku₇-ku₇-dam', translit: 'Instructions of Šuruppak 242', gloss: 'Nothing at all is precious; but life should be sweet', note: 'Given in transliteration: the school tablets\' sign-spellings vary.' },
                        { native: 'ku₇-ku₇-dam', translit: 'ku-ku-dam', gloss: 'is to be sweet', note: 'A reduplicated stem. The subscript seven identifies which ku-sign.' },
                    ],
                },
                {
                    heading: 'On the day when destinies were determined',
                    paragraphs: [
                        'The first line of Gudea\'s Cylinder A, from Girsu, around 2100 BC — two great inscribed clay cylinders recording the building of a temple, and among the longest Sumerian texts we have.',
                        '𒌓 is u₄, the sign UD, \'day\', here opening a temporal clause: \'on the day that…\'. 𒀭𒆠𒀀 is an-ki-a, \'in heaven and earth\' — AN and KI, the merism for the whole cosmos, with the locative -a. 𒉆 is nam, destiny. Then the verb, which the hall gives in transliteration only, tar-ra-da: from tar, \'to cut\', because nam tar, \'to cut a destiny\', is the standard Sumerian idiom for fixing a fate.',
                        'The verb is left in letters for the reason lesson four gave: its ending is a restoration, editions disagree, and the hall will not print a sign it cannot vouch for. You are looking at the join between what a tablet says and what a scholar supplies, which is a thing worth being able to see.',
                    ],
                    examples: [
                        { native: '𒌓 𒀭𒆠𒀀 𒉆', translit: 'u₄ an-ki-a nam', gloss: 'on the day … in heaven and earth … destiny', note: 'Printed in signs: these are securely read on the cylinder.' },
                        { native: 'tar-ra-da', translit: 'tar-ra-da / tar-re-da', gloss: 'were determined', note: 'In transliteration only — the ending is restored and editions differ.' },
                    ],
                },
            ],
            vocabulary: [
                { native: '𒂠', translit: '-šè', gloss: 'to, for, towards (terminative)' },
                { native: '𒈾', translit: '-na-', gloss: 'to him, to her (dative, no gender)' },
                { native: '𒊒', translit: 'ru', gloss: 'to dedicate, to set up' },
                { native: 'níĝ', translit: 'níĝ', gloss: 'thing' },
                { native: 'kal', translit: 'kal', gloss: 'to be valuable, precious' },
                { native: 'tar', translit: 'tar', gloss: 'to cut; nam tar, to determine a fate' },
                { native: '𒀭𒆠', translit: 'an-ki', gloss: 'heaven and earth — the whole cosmos' },
            ],
            exercises: [
                { prompt: 'Translate 𒉆𒋾𒆷𒉌𒂠 𒀀 𒈬𒈾𒊒 and say where you would meet it.', answer: '\'For the sake of his life, he dedicated this to him or her.\' It closes Sumerian votive dedications on statues, mace-heads, vessels and foundation figures.', hint: null },
                { prompt: 'Why does the translation say \'to him or her\'?', answer: 'Because the Sumerian dative -na- does not distinguish gender. The deity is named earlier in the inscription, which the formula assumes.', hint: null },
                { prompt: 'What does the subscript in ku₇ tell you?', answer: 'That it is the seventh sign with the reading ku — it identifies which wedge-arrangement is meant.', hint: null },
                { prompt: 'Translate níĝ-nam nu-kal zi ku₇-ku₇-dam.', answer: '\'Nothing at all is precious; but life should be sweet.\' From the Instructions of Šuruppak, line 242.', hint: null },
                { prompt: 'What does an-ki mean literally, and what does it stand for?', answer: 'Heaven and earth — a merism for the whole cosmos.', hint: null },
                { prompt: 'What is the Sumerian idiom for fixing a fate, and what does it literally say?', answer: 'nam tar — literally \'to cut a destiny\'.', hint: null },
                { prompt: 'Why is the verb of Gudea\'s first line printed in letters when the rest of the line is in signs?', answer: 'Because its ending is a scholarly restoration and editions disagree, so the hall will not print signs it cannot vouch for.', hint: null },
            ],
        },
        {
            number: 8,
            title: 'When On High',
            aim: 'Read the first line of the Babylonian creation epic word by word, meet the openings of Gilgameš and Maqlû, and take stock of what you can now do.',
            sections: [
                {
                    heading: 'enūma eliš lā nabû šamāmū',
                    paragraphs: [
                        'The Babylonian creation epic takes its name from its first two words, as Genesis is called Bereshit and the Qurʾān\'s first sūra al-Fātiḥa — a Mesopotamian convention of titling a work by its incipit that outlived Mesopotamia by three thousand years.',
                        'Five words. Enūma, \'when, at the time that\'. Eliš, \'above, on high\', an adverb formed to elû, \'upper\'. Lā, \'not\', the negative used with the stative. Nabû, \'were named, had been called\' — a third person plural stative of nabû, \'to name\'. Šamāmū, \'the heavens\', a poetic byword beside the commoner šamû.',
                        '\'When on high the heavens had not been named —\'. The line is a subordinate clause; the sentence does not finish for several more lines, which is itself a statement about how the poem thinks. And the force of it is in the negative: the poem opens before naming, in a condition where the heavens exist and have no name, and therefore in the Mesopotamian understanding do not yet properly exist at all. To be named is to be. That is the thesis of the epic in its first five words, and everything after it is the working out.',
                    ],
                    examples: [
                        { native: 'enūma eliš lā nabû šamāmū', translit: 'Enūma eliš, Tablet I line 1', gloss: 'When on high the heavens had not been named —', note: 'In transliteration: the sign-spellings differ from manuscript to manuscript.' },
                        { native: 'nabû', translit: 'nabû', gloss: 'were named, had been called', note: 'A stative of \'to name\'. The same root gives the god Nabû, the announcer.' },
                        { native: '𒀭𒀝', translit: 'Nabû', gloss: 'the god Nabu', note: 'From Semitic nbʾ, \'to call, to name\' — the same root as the verb in the line above.' },
                    ],
                },
                {
                    heading: 'Two more first lines',
                    paragraphs: [
                        'The Standard Babylonian Gilgameš opens ša nagba īmuru išdī māti — \'he who saw the Deep, the foundations of the land\'. Ša is the relative pronoun, and the poem begins without naming its subject: he who saw. Nagba is the accusative of nagbu, the subterranean water, the source, with a secondary sense of the totality of things. Īmuru is the preterite of amāru, \'to see\', with the final -u of the subordinate clause.',
                        'Maqlû, \'Burning\', the great anti-witchcraft series of eight tablets, opens alsīkunūši ilī mušīti — \'I call upon you, gods of the night\'. Alsi is a preterite of šasû, \'to cry out\', used performatively: saying it does it. Abusch showed the series to be a single ceremony performed through one night and the following morning at the end of the month Abu, in high summer.',
                        'Both are given in transliteration for the reason you now know. Gilgameš is broken at išdī, and nothing is reconstructed here in script.',
                    ],
                    examples: [
                        { native: 'ša nagba īmuru išdī māti', translit: 'Gilgameš I.1', gloss: 'He who saw the Deep, the foundations of the land —', note: 'The poem opens with a relative pronoun and withholds the name.' },
                        { native: 'alsīkunūši ilī mušīti', translit: 'Maqlû I.1', gloss: 'I call upon you, gods of the night', note: 'Performative: the utterance is the act.' },
                    ],
                },
                {
                    heading: 'What you can now do',
                    paragraphs: [
                        'Take stock. You know what a wedge is and why the signs look as they do. You can tell a logogram from a syllable from a silent determinative, and you know that one sign may be all three. You know that two unrelated languages share this script and why a sign therefore carries several readings. You can read a page of transliteration — the capitals, the italics, the raised determinatives, the hyphens against the full stops, and the little numbers that are not accents. You can read a sexagesimal number, and you have taken the square root of two off a school tablet of 1800 BC.',
                        'And you have read, entire, a votive formula, a line of the oldest wisdom literature there is, the opening of Gudea\'s cylinder, and the first lines of three of the great Akkadian compositions.',
                        'What lies beyond is the hall itself. Its currents are where this material becomes the subject this press is here for — the exorcistic series, the omen literature, celestial divination, dream interpretation, the incantations and the demonology, the protective figurines buried under thresholds. You can now read the words on their doors.',
                    ],
                    examples: [
                        { native: '𒈨', translit: 'me — Akkadian parṣu', gloss: 'divine office, ordinance, rite', note: 'The word for the fixed ordinances by which the world runs: the hall\'s currents turn on it.' },
                        { native: '𒉆', translit: 'nam — Akkadian šīmtu', gloss: 'fate, destiny, allotted portion', note: 'What is cut for a person, and the subject of the omen literature.' },
                    ],
                },
            ],
            vocabulary: [
                { native: 'enūma', translit: 'enūma', gloss: 'when, at the time that' },
                { native: 'eliš', translit: 'eliš', gloss: 'above, on high' },
                { native: 'šamāmū', translit: 'šamāmū', gloss: 'the heavens (poetic)' },
                { native: 'nagbu', translit: 'nagbu', gloss: 'the Deep; the subterranean source' },
                { native: 'mušītu', translit: 'mušītu', gloss: 'night' },
                { native: '𒀭𒀝', translit: 'Nabû', gloss: 'the god Nabu, the announcer' },
                { native: '𒈨', translit: 'me', gloss: 'divine office, ordinance, rite' },
                { native: '𒀭𒊩𒌆𒆠𒃲', translit: 'Ereškigal', gloss: 'queen of the great earth' },
            ],
            exercises: [
                { prompt: 'Translate enūma eliš lā nabû šamāmū, and name the part of speech of each word.', answer: '\'When on high the heavens had not been named.\' enūma, conjunction; eliš, adverb; lā, negative; nabû, third plural stative of \'to name\'; šamāmū, noun, \'the heavens\'.', hint: null },
                { prompt: 'Why is the epic called Enūma eliš?', answer: 'Mesopotamian works are titled by their first words, as Genesis is called Bereshit. Enūma eliš is simply \'when on high\'.', hint: null },
                { prompt: 'What is the force of the negative in that first line?', answer: 'The poem opens before naming, when the heavens exist but have no name — and in Mesopotamian thought to be named is to exist. The thesis is in the first five words.', hint: null },
                { prompt: 'How does the Gilgameš epic open, and what does it withhold?', answer: 'ša nagba īmuru — \'he who saw the Deep\'. It opens with a relative pronoun and withholds the subject\'s name.', hint: null },
                { prompt: 'What does alsīkunūši mean, and what is meant by calling it performative?', answer: '\'I call upon you\'. Performative means the utterance is itself the act — saying it is the calling.', hint: null },
                { prompt: 'Why are all three of these lines given in transliteration rather than signs?', answer: 'Because their sign-spellings differ between manuscripts, and Gilgameš is broken at išdī. The hall prints signs only where they are securely read.', hint: null },
                { prompt: 'Translate 𒈨 and 𒉆, and say why the hall\'s currents turn on them.', answer: 'me, the divine offices or ordinances by which the world runs; nam, fate or allotted portion. The omen literature and the ritual currents are about how both are known and altered.', hint: null },
            ],
        },
    ],
};
