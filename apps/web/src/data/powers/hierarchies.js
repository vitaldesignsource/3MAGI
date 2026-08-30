// powers/hierarchies — the ladders. How the traditions ordered the unseen.
// House disciplines: every ladder cites its source; where the tradition's
// account and the scholars' account differ, both are stated; ranks carry
// native script where the script is certain, romanization where it is not.
export default {
    intro: [
        'A hierarchy is an answer to a dangerous question: if the unseen world is populated, who reports to whom? Every tradition that counted its spirits eventually ranked them, and the rankings are arguments — about mediation, about whether prayer may stop partway up, about how far below the One the world begins.',
        'The word itself is part of the story. Hierarchia — sacred order — was coined, so far as the record shows, by the anonymous Syrian who wrote under the name of Paul’s Athenian convert around the year 500. He invented the word for the angels, and the bishops inherited it.',
    ],
    entries: [
        {
            slug: 'dionysian-ninefold', name: 'The Nine Choirs of Dionysius',
            era: 'c. 500 CE', tradition: 'Christian',
            exposition: [
                'The most influential angelology ever written is pseudonymous. Its author writes as Dionysius the Areopagite, converted by Paul in Athens; his actual Greek is saturated with Proclus, and the church has known since scholars pressed the point in the Renaissance that he worked around the year 500, probably in Syria. The pseudonym succeeded so completely that for a thousand years the book carried near-apostolic weight.',
                'The Celestial Hierarchy arranges the angels in three triads of three — not as bureaucracy but as optics: each rank receives the divine light and passes it down in a form the rank below can bear. Nothing skips a step. The scheme is Neoplatonic mediation baptized, and it governed angelology in Greek and Latin alike once Eriugena translated it in the ninth century.',
            ],
            ranks: [
                { native: 'Σεραφίμ', lang: 'greek', name: 'Seraphim', gloss: 'the burning ones, from Isaiah 6 — nearest the fire' },
                { native: 'Χερουβίμ', lang: 'greek', name: 'Cherubim', gloss: 'fullness of knowledge, the throne-bearers of Ezekiel' },
                { native: 'Θρόνοι', lang: 'greek', name: 'Thrones', gloss: 'the seats of God, perfectly receptive' },
                { native: 'Κυριότητες', lang: 'greek', name: 'Dominions', gloss: 'lordships — the first rank of the middle triad' },
                { native: 'Δυνάμεις', lang: 'greek', name: 'Virtues', gloss: 'powers in the sense of energies; workers of wonders' },
                { native: 'Ἐξουσίαι', lang: 'greek', name: 'Powers', gloss: 'authorities — order against disorder' },
                { native: 'Ἀρχαί', lang: 'greek', name: 'Principalities', gloss: 'princedoms over nations and rulers' },
                { native: 'Ἀρχάγγελοι', lang: 'greek', name: 'Archangels', gloss: 'chief messengers for the great announcements' },
                { native: 'Ἄγγελοι', lang: 'greek', name: 'Angels', gloss: 'the messengers nearest to us' },
            ],
            source: 'Pseudo-Dionysius, De caelesti hierarchia, chapters 6–9; first securely cited at the Constantinople colloquy of 532.',
            stakes: 'Whether creation is reached by cascade — every later dispute about mediation, sacrament and priesthood borrowed this ladder’s logic, as the author intended: his church hierarchy mirrors his celestial one.',
        },
        {
            slug: 'gregory-variant', name: 'Gregory’s Rearrangement',
            era: 'c. 591 CE', tradition: 'Christian (Latin)',
            exposition: [
                'Gregory the Great preached the nine choirs to Rome in his thirty-fourth Gospel homily and quietly moved two rungs: his ascending order runs angels, archangels, virtues, powers, principalities, dominions, thrones, cherubim, seraphim — swapping virtues and principalities against the Dionysian scheme. Dante follows Dionysius in the Paradiso and has Gregory laugh at his own error on arriving in heaven.',
                'The disagreement mattered less than the agreement: by 600 the Latin West and Greek East both took nine choirs as read, and the medieval argument moved to finer questions — what the orders are made of, whether each angel is its own species (Aquinas: yes), and which choir fell.',
            ],
            ranks: [],
            source: 'Gregory the Great, Homiliae in Evangelia 34; Dante, Paradiso XXVIII, 130–135.',
            stakes: 'A reminder the ladders were living arguments: even two saints reading the same scriptures could not hold the middle rungs still.',
        },
        {
            slug: 'maimonides-ten', name: 'The Ten Ranks of Maimonides',
            era: 'c. 1170s CE', tradition: 'Jewish',
            exposition: [
                'In the Mishneh Torah’s opening laws, Maimonides — no friend of angelic mythology — sets out ten degrees of angels, each a grade of created intellect, none corporeal, the names denoting their apprehension of God rather than their shape. It is angelology for philosophers: the winged figures of scripture become metaphors the Guide will later unpack.',
                'The list is his ordering of names the tradition already carried — from the ḥayyot of Ezekiel’s chariot at the summit to the ishim, the “men,” the rank that speaks with prophets, at the base.',
            ],
            ranks: [
                { native: 'חיות הקודש', lang: 'hebrew', name: 'ḥayyot ha-qodesh', gloss: 'the holy living creatures of the chariot' },
                { native: 'אופנים', lang: 'hebrew', name: 'ofanim', gloss: 'the wheels' },
                { native: 'אראלים', lang: 'hebrew', name: 'er’elim', gloss: 'the valiant — mourners in Isaiah 33:7' },
                { native: 'חשמלים', lang: 'hebrew', name: 'ḥashmalim', gloss: 'of the ḥashmal, Ezekiel’s amber radiance' },
                { native: 'שרפים', lang: 'hebrew', name: 'serafim', gloss: 'the burning ones' },
                { native: 'מלאכים', lang: 'hebrew', name: 'mal’akhim', gloss: 'the messengers proper' },
                { native: 'אלהים', lang: 'hebrew', name: 'elohim', gloss: 'the “gods” of the Psalms, read as a rank' },
                { native: 'בני אלהים', lang: 'hebrew', name: 'benei elohim', gloss: 'sons of God' },
                { native: 'כרובים', lang: 'hebrew', name: 'keruvim', gloss: 'the cherubim' },
                { native: 'אישים', lang: 'hebrew', name: 'ishim', gloss: 'the “men” who address the prophets' },
            ],
            source: 'Mishneh Torah, Hilkhot Yesodei ha-Torah 2:7.',
            stakes: 'Whether angels are persons or intellects: Maimonides’ ladder rationalizes the host, and the kabbalists spent the next centuries re-enchanting every rung he had cooled.',
        },
        {
            slug: 'enochic-order', name: 'The Watchers and the Four',
            era: '3rd century BCE', tradition: 'Jewish (Enochic)',
            exposition: [
                'The oldest elaborated angelology in the Jewish world is not in the Bible. The Book of the Watchers — the opening of 1 Enoch, third century BCE by the Aramaic fragments found at Qumran — knows archangels who stand before the Glory and watchers (ʿirin) who were set over the earth and fell: two hundred, under Shemihazah, swearing their oath on Mount Hermon, teaching forbidden arts, fathering the giants whose ghosts become the evil spirits of the world.',
                'The command structure is explicit: four (elsewhere seven) holy ones — Michael, Sariel, Raphael, Gabriel in the oldest lists — look down, intercede, and are dispatched to bind the rebels. Nearly everything later angelology assumes — names, ranks, a fall, imprisoned rebels awaiting judgement — is on stage here first.',
            ],
            ranks: [
                { native: null, name: 'The Four Presences', gloss: 'Michael, Sariel (later Uriel or Phanuel), Raphael, Gabriel — before the throne' },
                { native: 'עירין', lang: 'hebrew', name: 'ʿirin — the Watchers', gloss: 'the wakeful ones set over the earth; two hundred fell' },
                { native: null, name: 'The Giants and their ghosts', gloss: 'the Watchers’ sons; their disembodied dead become the demons' },
            ],
            source: '1 Enoch 1–36; Aramaic fragments 4Q201–202 date the tradition to the third century BCE at latest.',
            stakes: 'Where evil spirits come from without blaming God: the Enochic answer — a broken chain of command — competed for centuries with Eden, and Jude quotes it inside the New Testament.',
        },
        {
            slug: 'qumran-priesthood', name: 'The Angelic Priesthood of Qumran',
            era: '1st century BCE', tradition: 'Jewish (Dead Sea Scrolls)',
            exposition: [
                'The Songs of the Sabbath Sacrifice — thirteen songs, one for each sabbath of a quarter — walk the worshipper through the heavenly temple where seven sovereign princes bless in sequence and the chariot-throne itself is liturgically described. The community that kept these songs understood itself to be praying with the angels, in one choir.',
                'This is hierarchy as liturgy rather than metaphysics: the ranks exist because the service requires them, seven priesthoods for seven sanctuaries. When the songs were recovered, the missing bridge between Ezekiel and the later merkavah literature was suddenly on the table.',
            ],
            ranks: [],
            source: 'Songs of the Sabbath Sacrifice (4Q400–407, 11Q17, and a copy found at Masada), 1st century BCE copies.',
            stakes: 'Whether the angelic world is somewhere you go or something you join: Qumran answers that the congregation below and the host above are one service.',
        },
        {
            slug: 'hekhalot-palaces', name: 'The Seven Palaces',
            era: 'redacted 5th–9th centuries CE', tradition: 'Jewish (merkavah)',
            exposition: [
                'The hekhalot literature maps ascent: seven palaces, each gate held by terrifying gatekeepers whose names must be shown like passports, with seals and songs for every stage, until the traveller stands before the chariot. 3 Enoch crowns the scheme with a transformed man: Enoch, taken up and enthroned as Metatron, “the lesser YHWH” — a phrase the texts themselves handle like live current.',
                'Scholarship dates the redaction of these texts to late antiquity and the early Islamic centuries, drawing on older traditions; the practitioners dated them to the rabbis whose names they carry. Both datings are part of the record.',
            ],
            ranks: [],
            source: 'Hekhalot Rabbati, Hekhalot Zutarti, Sefer Hekhalot (3 Enoch); Scholem’s and Schäfer’s editions frame the modern dating.',
            stakes: 'How high a human can go: the palaces make ascent a discipline with technique, and Metatron is the standing scandal — the tradition’s own warning (the heretic Aḥer sees him seated and cries “there are two powers in heaven!”) is preserved inside the literature.',
        },
        {
            slug: 'islamic-ranks', name: 'The Angels of Islam',
            era: '7th century CE onward', tradition: 'Islamic',
            exposition: [
                'The Quran’s angels are made of light (so the hadith in Muslim), do not disobey, and hold offices: Jibril brings the revelation, Mika’il the provision, Israfil waits with the trumpet at his lips, and the angel of death — named ʿAzra’il only in later tradition — takes the souls. Eight bearers will carry the Throne on the Day; nineteen stand over the Fire under stern Malik; Munkar and Nakir question the dead in the grave; and over every person sit two noble writers, the kiraman katibin, recording.',
                'Systematic ranking on the Dionysian scale is late and scholastic; the compiler al-Suyuti gathered the angel-traditions in the fifteenth century into al-Haba’ik fi akhbar al-mala’ik, the fullest single shelf of Islamic angelology.',
            ],
            ranks: [
                { native: 'جبريل', lang: 'arabic', name: 'Jibril', gloss: 'the Spirit of revelation; Gabriel' },
                { native: 'ميكائيل', lang: 'arabic', name: 'Mika’il', gloss: 'provision and rain; Michael' },
                { native: 'إسرافيل', lang: 'arabic', name: 'Israfil', gloss: 'the trumpet of the Hour' },
                { native: 'عزرائيل', lang: 'arabic', name: 'ʿAzra’il', gloss: 'the angel of death — Quranically only malak al-mawt' },
                { native: 'مالك', lang: 'arabic', name: 'Malik', gloss: 'warden of the Fire (Q 43:77)' },
                { native: null, name: 'Kiraman katibin', gloss: 'the two noble recorders on every shoulder (Q 82:10–11)' },
            ],
            source: 'Qur’an 2:97–98, 35:1, 43:77, 69:17, 82:10–11; al-Suyuti, al-Haba’ik fi akhbar al-mala’ik.',
            stakes: 'A host with offices but no fallen angels in the strict sense — Iblis is of the jinn (Q 18:50) — which changes the whole shape of the problem of evil.',
        },
        {
            slug: 'amesha-spentas', name: 'The Bounteous Immortals',
            era: 'Old Avestan, dating disputed', tradition: 'Zoroastrian',
            exposition: [
                'Around Ahura Mazda stand six Amesha Spentas — Bounteous Immortals — who are at once persons, powers, and the patrons of the good creation: Vohu Manah (Good Mind, cattle), Asha Vahishta (Best Truth, fire), Khshathra Vairya (Desirable Dominion, metals), Spenta Armaiti (Holy Devotion, earth), Haurvatat (Wholeness, water), Ameretat (Immortality, plants). Below them the yazatas, “beings worthy of worship” — Mithra of the contract, Sraosha of obedience, Anahita of the waters — and the fravashis, the pre-existent souls that fight on the side of order.',
                'The dating of Zarathustra himself is the widest respectable dispute this portal contains: the tradition’s own late reckoning put him “258 years before Alexander” (sixth century BCE), while the linguistic argument places the Old Avestan hymns near 1000 BCE or earlier. Both positions are stated here because both are held.',
            ],
            ranks: [
                { native: null, name: 'Ahura Mazda', gloss: 'the Wise Lord' },
                { native: null, name: 'The six Amesha Spentas', gloss: 'Good Mind, Best Truth, Desirable Dominion, Holy Devotion, Wholeness, Immortality' },
                { native: null, name: 'The yazatas', gloss: 'Mithra, Sraosha, Anahita, Verethragna and the rest — worshipful powers' },
                { native: null, name: 'The fravashis', gloss: 'the pre-existent guardian souls' },
            ],
            source: 'The Gathas and Younger Avesta (Yasna, Yashts); the Pahlavi Bundahishn systematizes the correspondences.',
            stakes: 'Perhaps the oldest surviving ladder in which the high god’s aspects are personified and ranked — and, in the daevas it condemns, the mirror-image proof that one tradition’s gods can be written down as another’s demons.',
        },
        {
            slug: 'gnostic-pleroma', name: 'Aeons and Archons',
            era: '2nd–3rd centuries CE', tradition: 'Gnostic',
            exposition: [
                'The gnostic ladders run both ways. Above: the Pleroma, the fullness — in the Valentinian scheme thirty aeons in paired emanations, Depth and Silence unfolding through Mind, Truth, Word, Life, down to Sophia, whose crisis begins the world. Below: the archons, the rulers — in the Sethian texts seven, under Yaldabaoth the blind maker, holding the planetary gates against the ascending soul.',
                'It is Dionysius inverted before Dionysius existed: mediation not as blessing but as toll-booth. The password literature — which name to speak at which gate — is the dark twin of the hekhalot seals, and the polemic runs in both directions: these texts call the god of Genesis a jailer, and the bishops called these texts poison. Both voices are in the record.',
            ],
            ranks: [],
            source: 'The Apocryphon of John and The Hypostasis of the Archons (Nag Hammadi); Irenaeus, Against Heresies I, for the Valentinian thirty.',
            stakes: 'Whether the powers between us and God are for us or against us — the sharpest form the question ever took.',
        },
        {
            slug: 'iamblichean-taxonomy', name: 'The Theurgist’s Ladder',
            era: 'c. 300 CE', tradition: 'Neoplatonist',
            exposition: [
                'Answering Porphyry’s skeptical letter, Iamblichus laid out the full pagan taxonomy of the unseen: gods, archangels, angels, daimones, heroes, archons, souls — each class with its own manner of appearing, its own light, its own effect on the theurgist who meets it. The De mysteriis is, among its other feats, a field guide: how to tell a god’s epiphany from a daimon’s by the quality of the fire.',
                'Here the pagan and biblical vocabularies openly interbreed — archangels standing inside a Hellenic ladder — and theurgy’s claim is precise: rite, not thought alone, moves the soul up the ranks, because the gods themselves seeded the rites.',
            ],
            ranks: [],
            source: 'Iamblichus, De mysteriis (Reply of Abamon), especially book II; Proclus’ commentaries extend the scheme.',
            stakes: 'The ladder as curriculum: late antiquity’s last great pagan philosophy staked itself on the claim that the ranks can be climbed in this life, by rite.',
        },
        {
            slug: 'enochian-dee', name: 'The Watchtowers of Dr. Dee',
            era: '1582–1587 CE', tradition: 'Early modern angel magic',
            exposition: [
                'In the spring of 1582 John Dee, the most learned man in England, began receiving — through the scryer Edward Kelley — an entire angelic system: a language with its own letters and syntax, four great Watchtowers of the quarters governed by ranked seniors and kings, ninety-one parts of the earth with their governors, and thirty concentric Aethyrs to be entered by the Calls. Dee recorded everything in meticulous diaries, certain he was recovering the tongue Adam spoke and the knowledge Enoch was shown.',
                'The material lay in manuscript until Casaubon printed a portion in 1659 to discredit it; the Golden Dawn recovered it in the 1880s and built it into the most elaborate practical angelology of the modern West. Whether Kelley channelled, composed, or something stranger is an argument the diaries themselves keep alive.',
            ],
            ranks: [],
            source: 'Dee’s Libri Mysteriorum (British Library Sloane MSS); Casaubon, A True & Faithful Relation (1659).',
            stakes: 'The hierarchies as living practice into modernity: a Renaissance polymath, an Elizabethan court, and a system still worked today — the portal’s proof that angelology never became a museum.',
        },
    ],
};
