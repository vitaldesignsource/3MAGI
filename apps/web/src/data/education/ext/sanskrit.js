// sanskrit hall extension — numbers and glossed first readings.
// Arithmetic recomputed and every citation checked by the content
// pipeline; scripts verified against unicodedata.
export default {
    numbers: {
        note: 'Sanskrit counts twice over: once in figures, and once in words and syllables that carry the figures hidden inside verse. The figures are the ten Devanagari digits ०१२३४५६७८९ — śūnya, eka, dvi, tri, catur, pañca, ṣaṭ, sapta, aṣṭa, nava — written left to right in strict decimal place value, so that in १०८ the same shapes mean a hundred, no tens, and eight: position, not form, carries the weight. (The forms given are the stems used in counting and composition, not the nominatives; ṣaṭ is the pausal form of ṣaṣ, and the stems pañcan, saptan, aṣṭan, navan and daśan carry a final -n that surfaces in inflexion — pañcānām, \'of five\' — but is lost before a compound\'s second member, as in pañcadaśa, \'fifteen\'.) This is India\'s gift to the world, and the gift is the zero. Place value by itself was not unheard of — Babylonian sexagesimal reckoning had it, and the Maya arrived at a zero independently — but the decimal apparatus now used by every nation on earth, in which zero is a number that may be added to, subtracted from and reasoned about rather than a gap left in a column, came out of India. Brahmagupta\'s Brāhmasphuṭasiddhānta of 628 sets out its arithmetic in the eighteenth chapter, together with the rules for negative quantities and the one celebrated error, that zero divided by zero is zero. The earliest securely dated place-value zero on Indian soil is the inscription of 876 in the Chaturbhuj temple at Gwalior, which records a garden of 270 hastas and a daily gift of 50 garlands — though the earliest dated zero anywhere stands in Sanskrit outside India, on the Cambodian stone K-127 from Sambor, of 683; the birch-bark Bakhshali manuscript writes a dot for the same office and may be older than either, though the radiocarbon results published in 2017 fall into three widely separated ranges and remain contested. The road west runs through Syriac and Arabic. The bishop Severus Sebokht praises Indian computation \'by nine signs\' in 662 — nine, the zero unremarked. Al-Khwārizmī\'s treatise on Indian reckoning, of about 825, survives only in Latin as Algoritmi de numero Indorum, and gave Europe both the method and the word algorithm; Fibonacci\'s Liber Abaci of 1202 argued the case to the merchants. Śūnya was carried into Arabic as ṣifr — a translation rather than a borrowing, the Arabic word meaning \'empty\' as the Sanskrit does — and ṣifr in its turn became both zephirum, whence zero, and cifra, whence cipher: one word for nothing and for secret writing. Europe calls the digits Arabic; Arabic calls them al-arqām al-hindiyya, the Indian figures. The appetite for magnitude is older than the notation. A Yajurvedic litany (Vājasaneyi Saṃhitā 17.2) climbs by powers of ten — eka, daśa, śata, sahasra, ayuta, niyuta, prayuta, arbuda, nyarbuda, samudra, madhya, anta, parārdha — thirteen rungs from one to a million million, centuries before any figure was written for them; and India still groups its digits by that older instinct rather than in threes, a lakh being 1,00,000 and a crore 1,00,00,000. Because the exact sciences travelled in metre and were carried in the memory, a number had to be sayable, and three devices answer the need. Āryabhaṭa built his own alphabetic notation for the Āryabhaṭīya, setting it out at Gītikāpāda 2 — consonants taking values and vowels setting the decimal place — so that at Gītikāpāda 3 the single word khyughṛ says 4,320,000. Bhūtasaṃkhyā, the \'object numbers\', names instead a thing famous for occurring in a certain quantity: kha, ākāśa or śūnya for 0, the sky and the void; candra or śaśin for 1, there being one moon; netra and akṣi for 2, the eyes, or aśvin for the twin horsemen; agni, vahni or guṇa for 3, the three fires and the three strands; veda or yuga for 4; bāṇa, bhūta or indriya for 5, Kāma\'s arrows, the elements, the senses; rasa, ṛtu or aṅga for 6, the tastes, the seasons, the limbs of the Veda; ṛṣi, muni or aśva for 7, the seers and the sun\'s horses; vasu, gaja or nāga for 8; graha, randhra or nanda for 9, the planets and the body\'s openings; diś for 10, rudra for 11, sūrya or arka for 12. Kaṭapayādi is the sharpest of the three, and takes its name from its four starting points: ka kha ga gha ṅa ca cha ja jha ña run 1 to 9 and then 0; ṭa ṭha ḍa ḍha ṇa ta tha da dha na do the same; pa pha ba bha ma give 1 to 5; ya ra la va śa ṣa sa ha give 1 to 8. A vowel standing alone counts as zero, and a vowel attached to a consonant counts for nothing at all, which leaves the encoder free to choose whichever vowel makes a word; within a conjunct only the last consonant counts; a bare halanta consonant, with no vowel after it, is passed over. The digits are then read from the right — aṅkānāṃ vāmato gatiḥ, \'the going of the digits is leftward\' — and the same reversal governs bhūtasaṃkhyā, the two being freely mixed in one verse. Since any number can be spelt thousands of ways, the encoder chooses words that also mean something, and an astronomical constant may be made to read as a hymn. The earliest datable use is Haridatta\'s Grahacāranibandhana of 683, which fixes the parahita parameters in Kerala; an undated tradition ascribes the invention further back, to Vararuci. It served the Kerala school for a millennium, and from the eighteenth century it names the seventy-two melakarta scales of Carnatic music, so that a rāga\'s name states its own number, and its number states its notes.',
        digits: [
            {
                glyph: '०',
                value: 0,
                name: 'śūnya',
                unicodeName: 'DEVANAGARI DIGIT ZERO',
            },
            {
                glyph: '१',
                value: 1,
                name: 'eka',
                unicodeName: 'DEVANAGARI DIGIT ONE',
            },
            {
                glyph: '२',
                value: 2,
                name: 'dvi',
                unicodeName: 'DEVANAGARI DIGIT TWO',
            },
            {
                glyph: '३',
                value: 3,
                name: 'tri',
                unicodeName: 'DEVANAGARI DIGIT THREE',
            },
            {
                glyph: '४',
                value: 4,
                name: 'catur',
                unicodeName: 'DEVANAGARI DIGIT FOUR',
            },
            {
                glyph: '५',
                value: 5,
                name: 'pañca',
                unicodeName: 'DEVANAGARI DIGIT FIVE',
            },
            {
                glyph: '६',
                value: 6,
                name: 'ṣaṭ',
                unicodeName: 'DEVANAGARI DIGIT SIX',
            },
            {
                glyph: '७',
                value: 7,
                name: 'sapta',
                unicodeName: 'DEVANAGARI DIGIT SEVEN',
            },
            {
                glyph: '८',
                value: 8,
                name: 'aṣṭa',
                unicodeName: 'DEVANAGARI DIGIT EIGHT',
            },
            {
                glyph: '९',
                value: 9,
                name: 'nava',
                unicodeName: 'DEVANAGARI DIGIT NINE',
            },
        ],
        examples: [
            {
                native: '१०८',
                value: 108,
                note: 'One hundred and eight, aṣṭottaraśata, \'a hundred increased by eight\' — the count of beads on a japamālā and of the names told upon them. The number is over-determined in the tradition rather than derived from any single source: the twenty-seven nakṣatras of four quarters each give 27 × 4 = 108, and the twelve signs against the nine grahas give 12 × 9 = 108. Note what the ० is doing, or rather not doing: it holds the tens empty, and it is exactly this — a sign for an absence, standing in a column of its own — that no earlier notation could manage without ambiguity.',
            },
            {
                native: '३३३९',
                value: 3339,
                note: '\'Three thousand three hundred and thirty-nine gods served Agni\' (Ṛgveda 3.9.9; the verse recurs at 10.52.6). The hymn states the number additively and in words — three hundreds, three thousands, thirty and nine: 3000 + 300 + 30 + 9 = 3339 — because there was as yet no writing to state it otherwise. The figures ३३३९ are a later convenience the hymn never saw. Beside the standing reckoning of thirty-three gods, the verse is a reminder that Vedic enumeration is liturgical before it is arithmetical.',
            },
            {
                native: '४३२००००',
                value: 4320000,
                note: 'The mahāyuga in human years. Manu 1.69–71 gives the four ages in divine years with their twilights: Kṛta 4000 with a dawn of 400 and a dusk of 400, making 4800; Tretā 3600; Dvāpara 2400; Kali 1200 — together 12,000 divine years. Since one human year is a single day and night of the gods (Manu 1.67), 12,000 × 360 = 4,320,000 human years, and a kalpa of a thousand mahāyugas is 4,320,000,000. Āryabhaṭa states the same figure in one word at Gītikāpāda 3: ख्युघृ khyughṛ, in the alphanumeric notation he had set out one verse earlier. Within a syllable his consonant values add, so the conjunct khy is kh (2) + y (30) = 32, which the vowel u raises to the ten-thousands: 32 × 10,000 = 320,000; and gh (4) is raised by ṛ to the millions, 4,000,000. Together 4,320,000, the revolutions of the sun in a yuga. His system is not Kaṭapayādi but its ancestor in purpose — a number folded small enough to be remembered.',
            },
            {
                native: 'मेचकल्याणि',
                value: 65,
                note: 'Kaṭapayādi worked through. In a melakarta rāga\'s name only the first two syllables carry the number. मे me: the consonant is म ma, fifth of the pa-group, so 5; the vowel े e counts for nothing, being merely what makes the syllable sayable. च ca: sixth of the ka-group, so 6. The digits in the order written are 5 then 6; read from the right, as the rule requires, they give 65 — and Mecakalyāṇi is the sixty-fifth of the seventy-two melakartas, from which a musician can recover the scale itself. (Kalyāṇi alone would decode ka-la as 1, 3 and so read 31; the prefix is there to make the arithmetic come out.) The same key opens the rest of the list: Kanakāṅgi ka-na = 1, 0, hence 01, the first; Māyāmāḷavagauḷa mā-yā = 5, 1, hence 15, the scale beginners are set to first; Kharaharapriyā kha-ra = 2, 2, hence 22; Harikāmbhojī ha-ri = 8, 2, hence 28; Dhīraśaṅkarābharaṇam dhī-ra = 9, 2, hence 29. The seventy-two melas were systematised in Veṅkaṭamakhin\'s Caturdaṇḍīprakāśikā of about 1620; the names in their present numbered form are usually credited to the eighteenth-century Saṅgrahacūḍāmaṇi, and so are later than the scheme they number. These are South Indian names, ordinarily written in Telugu, Tamil or Kannada script; the Devanagari here is the hall\'s convention, not the musicians\'.',
            },
            {
                native: '६२८३२',
                value: 62832,
                note: 'Āryabhaṭīya 2.10 (Gaṇitapāda): caturadhikaṃ śatam aṣṭaguṇaṃ dvāṣaṣṭis tathā sahasrāṇām / ayutadvayaviṣkambhasyāsanno vṛttapariṇāhaḥ — \'a hundred increased by four, multiplied by eight, and sixty-two thousand besides: this is the approximate circumference of a circle whose diameter is twenty thousand.\' Worked out: (100 + 4) × 8 = 832; 832 + 62,000 = 62,832; and 62,832 ÷ 20,000 = 3.1416 exactly. The figure stands high of π by 0.0000073 — seven millionths in absolute terms, which is a relative error of a little over two parts in a million. The load-bearing word is āsanna, \'approached, come near\'. Āryabhaṭa says in so many words that the ratio is only approached; some historians have read the word as the earliest hint in the record that it cannot be reached exactly, while others take it for no more than the ordinary caution of a computer offering a working figure. On either reading it is a hint and not a proof.',
            },
            {
                native: 'भद्राम्बुधिसिद्धजन्मगणितश्रद्धा स्म यद्भूपगीः',
                value: 3.141592653589793,
                note: 'π hidden in a line of verse: bhadrāmbudhi-siddha-janma-gaṇita-śraddhā sma yad bhūpagīḥ, the encoding conventionally quoted from the Sadratnamālā of Śaṅkaravarman (1819), the late Kerala tradition still writing in the old manner. Taken syllable by syllable, only the last consonant of each conjunct counting and the vowels counting for nothing: bha 4, drā 2, mbu 3, dhi 9, si 7, ddha 9, ja 8, nma 5, ga 3, ṇi 5, ta 6, śra 2, ddhā 9, sma 5, ya 1, dbhū 4, pa 1, gī 3. Read from the right, as aṅkānāṃ vāmato gatiḥ requires, the line yields the eighteen digits 314159265358979324 — which is to say 3.14159265358979324, π to seventeen decimal places, correctly rounded at the last (the figure recorded above is that value as far as ordinary machine precision will carry it). Printed texts vary between गीः and गिः at the close; the vowel makes no difference to the value. The far more famous string, gopībhāgya-madhuvrāta-śṛṅgiśo-dadhi-sandhiga | khala-jīvita-khātāva gala-hālā-rasandhara, construed with some strain as an invocation of Kṛṣṇa, is repeated everywhere and ascribed to the Kerala school, but no dated manuscript has been produced for it. Its digits, moreover, run in the order written rather than from the right, against the rule that every attested encoding follows; and while it matches π/10 for thirty-one decimal places, the last of its thirty-two digits is 2 where π has 5. It is a fine mnemonic and should not be cited as a Kerala text.',
            },
        ],
        special: 'Śūnya means \'empty, hollow, deserted\' long before it means \'nought\', and Indian thought never let the coincidence lie idle. In the manuscripts it is written as a dot, bindu, or as the small circle that became our 0 — the shape of a hole. Piṅgala\'s Chandaḥśāstra already uses śūnya as a marker in the procedure for enumerating metres, which some read as the word\'s earliest technical employment. Bhāskara II, in the Bījagaṇita of the twelfth century, calls a quantity with zero for its divisor khahara, \'the zero-divided\', and says of it that it neither grows nor lessens though worlds be poured into it or drawn out of it, comparing it to the infinite and unchanging God through the dissolution and the making of creation. In the same centuries Buddhist philosophy was making śūnyatā, \'emptiness\', the name for the way things actually stand — Nāgārjuna\'s teaching that nothing whatever possesses own-being. The mathematician\'s śūnya and the Madhyamaka\'s śūnyatā are not the same idea, and no line of influence between them has been demonstrated in either direction; the honest statement is that one language handed the calculators and the metaphysicians a single word for the absence that is also a plenitude, and that neither party let it alone. Europe, receiving the sign, found it suspect: the money-changers\' guild of Florence is generally said to have forbidden its members the new figures in 1299, the Roman ones being harder to falsify. A cipher that cannot be trusted, and a void that cannot be exhausted — the same word, travelling west.',
    },
    readings: [
        {
            title: 'The Gāyatrī',
            source: 'Ṛgveda 3.62.10, ascribed to the seer Viśvāmitra Gāthina; the verse recurs in the Yajurveda and Sāmaveda saṃhitās',
            words: [
                {
                    native: 'तत्',
                    translit: 'tat',
                    gloss: 'that (neuter, agreeing with bhargaḥ)',
                },
                {
                    native: 'सवितुः',
                    translit: 'savituḥ',
                    gloss: 'of Savitṛ, the Impeller (genitive)',
                },
                {
                    native: 'वरेण्यम्',
                    translit: 'vareṇyam',
                    gloss: 'to be chosen, most desirable (gerundive of √vṛ, to choose)',
                },
                {
                    native: 'भर्गः',
                    translit: 'bhargaḥ',
                    gloss: 'radiance, burning splendour (neuter s-stem, here accusative)',
                },
                {
                    native: 'देवस्य',
                    translit: 'devasya',
                    gloss: 'of the god',
                },
                {
                    native: 'धीमहि',
                    translit: 'dhīmahi',
                    gloss: 'may we hold in thought — traditionally taken from √dhī, to think; most modern philologists derive the form instead from √dhā, to set, to take to oneself',
                },
                {
                    native: 'धियः',
                    translit: 'dhiyaḥ',
                    gloss: 'thoughts, visions, prayers (accusative plural)',
                },
                {
                    native: 'यः',
                    translit: 'yaḥ',
                    gloss: 'who',
                },
                {
                    native: 'नः',
                    translit: 'naḥ',
                    gloss: 'our, of us (enclitic)',
                },
                {
                    native: 'प्रचोदयात्',
                    translit: 'pracodayāt',
                    gloss: 'may he impel, may he urge forward (pra + √cud, optative)',
                },
            ],
            translation: 'May we hold in thought that desirable radiance of the god Savitṛ — he who shall impel our thoughts.',
            note: 'Properly the Sāvitrī, being addressed to Savitṛ, and called the Gāyatrī after its metre: three pādas of eight syllables, twenty-four in all, set out in the panel beside. The first pāda counts only seven as written — tat sa-vi-tur va-re-ṇyaṃ — and is restored by reading vareṇiyam, one of the many places where the Ṛgvedic metre preserves a pronunciation older than the received text. Savitṛ is the impeller, the sun considered as the power that sets things going, distinguished in the hymns from Sūrya the visible disc; and the verse asks not for light but for the impulsion of thought, which is why it has been treated for three millennia as the seed of the Veda rather than as one verse among ten thousand. Two words are argued over. dhīmahi the Indian commentators take from √dhī, \'to think\', giving \'may we meditate upon\'; modern philology commonly derives it from √dhā, \'to set, to take to oneself\', giving \'may we make our own\' — the difference is real and the translation above leans, deliberately, on the older reading. pracodayāt is an optative, so \'may he impel\' and \'who shall impel\' render it equally. In recitation the verse is preceded by ॐ and the three vyāhṛtis, ॐ भूर्भुवः स्वः; these are liturgical additions from the Yajurvedic tradition and form no part of Ṛgveda 3.62.10. It is traditionally received from a teacher at the upanayana and belongs to the junctures of the day, and in many households it is not printed or spoken lightly: we set it here as text, in a hall of texts.',
            grid: [
                'तत्सवितुर्वरेण्यं',
                'भर्गो देवस्य धीमहि',
                'धियो यो नः प्रचोदयात्',
            ],
        },
        {
            title: 'The First Words of the Veda',
            source: 'Ṛgveda 1.1.1, ascribed to Madhucchandas Vaiśvāmitra; gāyatrī metre',
            words: [
                {
                    native: 'अग्निम्',
                    translit: 'agnim',
                    gloss: 'Agni (accusative)',
                },
                {
                    native: 'ईळे',
                    translit: 'īḷe',
                    gloss: 'I praise, I invoke (√īḍ, first person singular middle)',
                },
                {
                    native: 'पुरोहितम्',
                    translit: 'purohitam',
                    gloss: 'set in front; hence the domestic priest (accusative)',
                },
                {
                    native: 'यज्ञस्य',
                    translit: 'yajñasya',
                    gloss: 'of the sacrifice',
                },
                {
                    native: 'देवम्',
                    translit: 'devam',
                    gloss: 'god (accusative)',
                },
                {
                    native: 'ऋत्विजम्',
                    translit: 'ṛtvijam',
                    gloss: 'priest of the season, who offers at the due time',
                },
                {
                    native: 'होतारम्',
                    translit: 'hotāram',
                    gloss: 'the hotṛ, the priest who summons the gods and offers the oblation — the name is derived both from √hū, to call, and from √hu, to pour, and both derivations are defended',
                },
                {
                    native: 'रत्नधातमम्',
                    translit: 'ratnadhātamam',
                    gloss: 'most bestowing of treasure (ratna-dhā-tama)',
                },
            ],
            translation: 'I praise Agni, set in front, god and priest of the sacrifice, the invoker, most bestowing of treasure.',
            note: 'The Ṛgveda opens with fire, and so does the whole transmitted literature of India: this is the first line of the first hymn of the first of the ten maṇḍalas, of the collection\'s 1,028 hymns. Agni comes first because he is the mouth of the sacrifice, the one who carries what is offered from this world to the other, which is what purohita and hotṛ between them describe — the priest set in front, the priest who calls. Note ईळे with ळ, the retroflex ḷ: in the Ṛgvedic recitation intervocalic ḍ is realised as ḷ, and editions following other traditions accordingly print ईडे — a difference of transmitted sound rather than of sense, and a small witness to an oral tradition that carried the syllables faithfully whether or not they were still understood. Ratna in the Veda is treasure and gift, not the cut jewel of later Sanskrit. The hymn is in the gāyatrī metre, 8 + 8 + 8 = 24 syllables — the same measure as the Sāvitrī above.',
            grid: null,
        },
        {
            title: 'The Lord Enveloping',
            source: 'Īśa Upaniṣad 1, which is Vājasaneyi Saṃhitā 40.1 (Śukla Yajurveda)',
            words: [
                {
                    native: 'ईशा',
                    translit: 'īśā',
                    gloss: 'by the Lord (instrumental of īśa, the ruler; the Vedic ending -ā where classical Sanskrit would have -ena)',
                },
                {
                    native: 'वास्यम्',
                    translit: 'vāsyam',
                    gloss: 'to be clothed, to be enveloped (gerundive of √vas, to clothe)',
                },
                {
                    native: 'इदम्',
                    translit: 'idam',
                    gloss: 'this',
                },
                {
                    native: 'सर्वम्',
                    translit: 'sarvam',
                    gloss: 'all, the whole',
                },
                {
                    native: 'यत्',
                    translit: 'yat',
                    gloss: 'which',
                },
                {
                    native: 'किञ्च',
                    translit: 'kiñca',
                    gloss: 'whatever, anything at all (yat kiñca, \'whatsoever\')',
                },
                {
                    native: 'जगत्याम्',
                    translit: 'jagatyām',
                    gloss: 'in the moving world, upon the earth (locative of jagatī)',
                },
                {
                    native: 'जगत्',
                    translit: 'jagat',
                    gloss: 'that which moves; the world',
                },
            ],
            translation: 'All this is to be enveloped by the Lord — whatever moves in this moving world.',
            note: 'The fortieth and last adhyāya of the Vājasaneyi Saṃhitā, and the only Upaniṣad set inside a Saṃhitā rather than appended to it: scripture and its interpretation bound in one volume. Two readings of vāsyam are old and both defensible, from √vas \'to clothe\' — all this is to be wrapped about with the Lord — and from √vas \'to dwell\' — all this is to be inhabited by him. Jagatyāṃ jagat is a figura etymologica, both words from √gam, \'to go\': the moving within the moving, since jagat names the world precisely as the thing that will not stand still. The second hemistich is its counterweight — तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्, tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam, \'enjoy by that which is relinquished; do not covet — whose, after all, is wealth?\' The verse is anuṣṭubh, four pādas of eight syllables, thirty-two in all. Kāṇva and Mādhyandina recensions differ in small readings throughout the text.',
            grid: null,
        },
        {
            title: 'That Thou Art',
            source: 'Chāndogya Upaniṣad 6.8.7 (Sāmaveda): the refrain of Uddālaka Āruṇi to his son Śvetaketu, repeated through to 6.16.3',
            words: [
                {
                    native: 'तत्',
                    translit: 'tat',
                    gloss: 'that',
                },
                {
                    native: 'सत्यम्',
                    translit: 'satyam',
                    gloss: 'the real, the true',
                },
                {
                    native: 'सः',
                    translit: 'saḥ',
                    gloss: 'that, he (masculine, agreeing with ātmā)',
                },
                {
                    native: 'आत्मा',
                    translit: 'ātmā',
                    gloss: 'the self (nominative of ātman)',
                },
                {
                    native: 'तत्',
                    translit: 'tat',
                    gloss: 'that',
                },
                {
                    native: 'त्वम्',
                    translit: 'tvam',
                    gloss: 'thou',
                },
                {
                    native: 'असि',
                    translit: 'asi',
                    gloss: 'art',
                },
                {
                    native: 'श्वेतकेतो',
                    translit: 'śvetaketo',
                    gloss: 'O Śvetaketu (vocative)',
                },
            ],
            translation: 'That is the real; that is the self; that thou art, Śvetaketu.',
            note: 'The mahāvākya of the Sāmaveda, and the most consequential four syllables in Indian philosophy. It is a refrain rather than a single utterance: nine times over, across sections eight to sixteen, a father answers his grown and rather too well-educated son with a different image and the same conclusion — the honey the bees gather from many trees, which no longer knows which tree it came from (6.9); the rivers that lose their names in the sea (6.10); the fig seed split open to show nothing inside (6.12); the salt dissolved in water, which cannot be seen and can be tasted everywhere (6.13). Advaita takes the sentence as the plain identity of ātman and brahman, the jīva and the absolute; Rāmānuja and the Viśiṣṭādvaita read it within a scheme in which the self is a mode of God and not simply God; and Brereton and Olivelle have argued on grammatical grounds that the neuter tat is adverbial, so that the phrase means something nearer \'that is how you are\'. That last reading is contested rather than settled; if right, it makes the sentence a statement about manner rather than an equation, and loses none of its force.',
            grid: null,
        },
        {
            title: 'I Am Brahman',
            source: 'Bṛhadāraṇyaka Upaniṣad 1.4.10 (Śukla Yajurveda, Kāṇva recension)',
            words: [
                {
                    native: 'अहम्',
                    translit: 'aham',
                    gloss: 'I',
                },
                {
                    native: 'ब्रह्म',
                    translit: 'brahma',
                    gloss: 'brahman, the absolute (neuter nominative)',
                },
                {
                    native: 'अस्मि',
                    translit: 'asmi',
                    gloss: 'am',
                },
                {
                    native: 'इति',
                    translit: 'iti',
                    gloss: 'thus — the particle that closes a quotation, Sanskrit\'s inverted comma',
                },
            ],
            translation: '\'I am brahman.\'',
            note: 'In its setting the sentence is not first spoken by any human being. Brahman alone was this in the beginning; it knew only itself, thus — \'I am brahman\' — and by that knowing became the All; and whoever among the gods or the seers knew it in the same way became it likewise. The iti matters: the words are quoted, being what the absolute says of itself, and the Upaniṣad then leaves them lying where a reader may find them. Note the neuter ब्रह्म brahma, the impersonal absolute, which is not the masculine brahmā, the creator god — a distinction the English \'Brahma\' has muddled for two centuries. This is the mahāvākya of the Yajurveda in the set of four, one to each Veda, that later Advaita arranged: prajñānaṃ brahma (Aitareya 3.3, numbered 3.1.3 in some editions), ahaṃ brahmāsmi here, tat tvam asi (Chāndogya 6.8.7), ayam ātmā brahma (Māṇḍūkya 2). The grouping is the school\'s; the sentences are the Upaniṣads\'.',
            grid: null,
        },
        {
            title: 'The Stilling of Thought',
            source: 'Patañjali, Yoga Sūtra 1.2 (Samādhi Pāda)',
            words: [
                {
                    native: 'योगः',
                    translit: 'yogaḥ',
                    gloss: 'yoga, yoking (√yuj, to join)',
                },
                {
                    native: 'चित्त',
                    translit: 'citta',
                    gloss: 'mind, the thinking organ, consciousness as an instrument',
                },
                {
                    native: 'वृत्ति',
                    translit: 'vṛtti',
                    gloss: 'turning, movement, modification (√vṛt, to turn)',
                },
                {
                    native: 'निरोधः',
                    translit: 'nirodhaḥ',
                    gloss: 'stilling, restraint, cessation',
                },
            ],
            translation: 'Yoga is the stilling of the turnings of thought.',
            note: 'Four words, and the last three are one word in the text: योगश्चित्तवृत्तिनिरोधः, yogaś citta-vṛtti-nirodhaḥ, the compound resolved as the nirodha of the vṛttis of the citta. Yogaḥ becomes yogaś before the following c by sandhi, which is why the printed sūtra shows no seam. Vṛtti is from √vṛt, to turn — cognate with Latin vertere, and so, at a distance, with our vortex — and the image is of a mind that will not stop revolving. Nirodha has been rendered restraint, suppression, cessation and stilling, and the choice is already an interpretation. The sūtra is the most compressed prose Sanskrit possesses, a thread meant to be knotted by a commentary: 1.1 announces atha yogānuśāsanam, \'now, the exposition of yoga\'; 1.3 completes the thought — तदा द्रष्टुः स्वरूपेऽवस्थानम्, tadā draṣṭuḥ svarūpe \'vasthānam, \'then the seer abides in its own form\'; and 1.4 adds that otherwise it takes the form of the turnings. The work is usually placed in the early centuries of the common era, and it was the Yogabhāṣya, ascribed by the tradition to Vyāsa, that made it legible; a substantial body of scholarship now holds sūtras and commentary to be a single composition, the Pātañjalayogaśāstra, by one hand.',
            grid: null,
        },
        {
            title: 'The Full Taken from the Full',
            source: 'Bṛhadāraṇyaka Upaniṣad 5.1.1, opening the Khila-kāṇḍa; used also as the śānti pāṭha before the Īśa Upaniṣad',
            words: [
                {
                    native: 'पूर्णम्',
                    translit: 'pūrṇam',
                    gloss: 'full, complete, filled',
                },
                {
                    native: 'अदः',
                    translit: 'adaḥ',
                    gloss: 'that, yonder',
                },
                {
                    native: 'पूर्णम्',
                    translit: 'pūrṇam',
                    gloss: 'full',
                },
                {
                    native: 'इदम्',
                    translit: 'idam',
                    gloss: 'this, here',
                },
                {
                    native: 'पूर्णात्',
                    translit: 'pūrṇāt',
                    gloss: 'from the full (ablative)',
                },
                {
                    native: 'पूर्णम्',
                    translit: 'pūrṇam',
                    gloss: 'the full',
                },
                {
                    native: 'उदच्यते',
                    translit: 'udacyate',
                    gloss: 'is drawn out, is taken up (ud + √añc, passive)',
                },
                {
                    native: 'पूर्णस्य',
                    translit: 'pūrṇasya',
                    gloss: 'of the full (genitive)',
                },
                {
                    native: 'पूर्णम्',
                    translit: 'pūrṇam',
                    gloss: 'the full',
                },
                {
                    native: 'आदाय',
                    translit: 'ādāya',
                    gloss: 'having taken away (gerund of ā + √dā)',
                },
                {
                    native: 'पूर्णम्',
                    translit: 'pūrṇam',
                    gloss: 'the full',
                },
                {
                    native: 'एव',
                    translit: 'eva',
                    gloss: 'alone, just, indeed',
                },
                {
                    native: 'अवशिष्यते',
                    translit: 'avaśiṣyate',
                    gloss: 'remains over, is left (ava + √śiṣ, passive)',
                },
            ],
            translation: 'That is full; this is full. From the full the full is drawn out. Taking the full from the full, the full alone remains.',
            note: 'The word पूर्ण stands seven times in two lines, and the verse is built of nothing else; the panel beside sets out its members. That and this are commonly read as brahman beyond and the world to hand, the point being that the second does not diminish the first. It is often glossed nowadays as the arithmetic of infinity — infinity taken from infinity leaves infinity — and the gloss is anachronistic: the word is pūrṇa, \'full\', not ananta, \'endless\', and the claim is about a fullness that subtraction cannot reduce rather than about the cardinality of sets. Udacyate is the vocabulary of the well: the full is drawn up out of the full as water is drawn, and the well does not sink. In recitation it is followed by ॐ शान्तिः शान्तिः शान्तिः, the threefold peace. It opens the supplementary book of the Bṛhadāraṇyaka and stands at the head of the Īśa as its invocation — a verse belonging to two Upaniṣads at once, which is itself in keeping.',
            grid: [
                'पूर्णमदः',
                'पूर्णमिदं',
                'पूर्णात्पूर्णमुदच्यते',
                'पूर्णस्य पूर्णमादाय',
                'पूर्णमेवावशिष्यते',
            ],
        },
    ],
    correspondences: null,
};
