// powers/pantheons — the families of the gods. Native script where the
// writing system is attested for the name itself; cult lines give the place
// the god was actually fed, which the map then plots.
export default {
    intro: [
        'A pantheon is not a list of gods but a household — with seniority, marriages, grudges, and a division of labour that tells you what the people who kept it were afraid of. Read the offices and you have read the society: where the storm outranks the sun, the crops depend on rain; where the sun outranks everything, on a river that floods on schedule.',
        'The families below are given with their own names first. The correspondence table beneath them is the ancient world’s own habit — the Greeks called it interpretatio, matching foreign gods to their own — and the portal keeps its caution attached: a correspondence is a working translation, and every translation loses the thing that made the god local.',
    ],
    groups: [
        { key: 'mesopotamian', label: 'Sumer and Akkad', blurb: 'The oldest gods whose names we can read: written with a star before them, fed twice daily in temples that ran like estates.' },
        { key: 'egyptian', image: '3ddabd56b55bf1d9bb444f460f7539d1.webp',
          imageAlt: 'A painted hypostyle hall on the Nile at sunrise: priests censing before a colossal statue, a woman in linen among the columns, and an ibis-headed Thoth seated at the right',
          imageCaption: 'Sunrise offerings in the hypostyle hall, with Thoth seated at the water’s edge — a theology that could hold several creations at once without embarrassment.',
          label: 'The Two Lands', blurb: 'Nine gods of Heliopolis, a hidden one at Thebes, and a theology sophisticated enough to hold several creations at once without embarrassment.' },
        { key: 'levantine', image: '2f17f27124a7fd535bfcd83380aacf4e.webp',
          imageAlt: 'An aged enthroned figure beneath a stone portico above the sea, a striding man with a mace on the cliff, and an armed woman climbing toward them under a breaking storm',
          imageCaption: 'The council of El: the grey father enthroned at the source of the waters, the storm-god striding out with his mace, and Anat coming up the headland — the household the Bible argues with.',
          label: 'Canaan and Ugarit', blurb: 'The pantheon the Bible argues with — recovered in 1929 when a farmer’s plough hit a tomb at Ras Shamra.' },
        { key: 'hellenic', image: '1619a44c6259f6d76461aa368786d3b4.webp',
          imageAlt: 'A colonnaded Greek house at night: a woman at a great loom with a model city, a bearded man enthroned with a staff, a youth playing a lyre, an ivy-crowned reveller reclining with wine, and a torch-bearer in a far doorway',
          imageCaption: 'The household by their attributes: the loom and the city, the staff and the throne, the lyre, the ivy and the cup, and the torches at the threshold — Athena, Zeus, Apollo, Dionysus, Hekate.',
          label: 'Olympus', blurb: 'The best-documented family in the ancient world, and the one whose quarrels the West kept quoting.' },
        { key: 'norse', label: 'Ásgarðr', blurb: 'Æsir and Vanir, written down in Iceland two centuries after the conversion — the record is Christian, the matter is not.' },
        { key: 'vedic', image: '46d3ef2547e831ac42fce5cf8decf09c.webp',
          imageAlt: 'A priest tending a fire altar before a bronze Nataraja at a riverside temple while a canopied Durga image is carried past on the wet ghats under a lightning storm',
          imageCaption: 'Agni first, then the procession: the fire fed before Śiva’s dance while Durgā is carried along the ghats — the one pantheon in this portal that never stopped.',
          label: 'The Vedic and Hindu Gods', blurb: 'From the hymns of the Rigveda to the living devotions of a billion people — the one pantheon in this portal that never stopped.' },
        { key: 'yoruba', label: 'The Òrìṣà', blurb: 'The gods of Ile-Ife and Yorubaland, carried across the Atlantic in the holds of ships and alive on three continents.' },
        { key: 'kami', label: 'The Kami', blurb: 'The powers of Japan — of whom the Kojiki says there are eight million, meaning uncountable.' },
    ],
    entries: [
        {
            slug: 'anu', name: 'An / Anu', native: '𒀭', lang: 'cuneiform',
            domain: 'The sky; the authority behind authority', group: 'mesopotamian',
            exposition: [
                'The sign for his name is the sign for “god.” Every divine name in cuneiform is written with a star-shaped mark before it — the dingir determinative — and that mark is An, the sky, standing for divinity itself. He is the pantheon’s remote chairman: father of the gods, source of legitimacy, seldom acting.',
                'Kings drew their authority through him, and the great transfers of power in Mesopotamian myth are announced as transfers of the anutu, the “Anu-ship”: when Marduk is exalted in Enuma Elish, the point is precisely that he receives what An held.',
            ],
            cult: 'Uruk, the Eanna precinct, shared with Inanna; the Bit Resh temple rebuilt for him in the Seleucid period.',
            interpretatio: 'Called Anu in Akkadian; matched loosely to Ouranos by later Greek observers, though An’s remoteness is the opposite of Ouranos’ violent overthrow.',
        },
        {
            slug: 'enlil', name: 'Enlil', native: '𒀭𒂗𒆤', lang: 'cuneiform',
            domain: 'Wind, command, the destinies', group: 'mesopotamian',
            exposition: [
                'Enlil is the one who actually decides. Lord of the air at Nippur, holder of the Tablet of Destinies, he issues the word that cannot be revoked — including, in Atra-hasis, the Flood, ordered because humanity was too noisy for him to sleep. That the great catastrophe begins as divine insomnia is not a joke the text makes; it is a theology of power that answers to nothing.',
                'His temple, the Ekur at Nippur, was the closest thing Sumer had to a national shrine: kings needed Nippur’s recognition to be kings in more than name.',
            ],
            cult: 'Nippur — the Ekur, “mountain house,” the political centre of Sumerian religion.',
            interpretatio: 'Later absorbed in Babylon by Marduk, who is given Enlil’s functions outright — the clearest case of a theological takeover written down as poetry.',
        },
        {
            slug: 'enki', name: 'Enki / Ea', native: '𒀭𒂗𒆠', lang: 'cuneiform',
            domain: 'The sweet waters under the earth; craft, cunning, magic', group: 'mesopotamian',
            exposition: [
                'Enki is the god who finds the loophole. Sworn not to warn humanity of the Flood, he speaks to a reed wall while a certain man happens to be listening — and the ark gets built on a technicality. He is lord of the abzu, the fresh water beneath the world; patron of incantation, craft, and the me, the hundred-odd offices of civilization that Inanna gets him drunk enough to hand over.',
                'Where Enlil is command, Enki is technique. Every Mesopotamian exorcist worked in his name.',
            ],
            cult: 'Eridu — the E-abzu, held by the tradition to be the oldest city in the world.',
            interpretatio: 'Ea in Akkadian; his water-and-wisdom portfolio drifts toward Greek accounts of Oannes, the fish-sage who taught the arts.',
        },
        {
            slug: 'inanna', name: 'Inanna / Ishtar', native: '𒀭𒌋𒁯', lang: 'cuneiform',
            domain: 'Love and war; the planet Venus', group: 'mesopotamian',
            exposition: [
                'Inanna holds two portfolios the modern eye separates and the ancient one did not: desire and battle, both being the loss of self-command. Her descent to the underworld — through seven gates, stripped of one ornament at each, hung on a hook for three days — is the earliest full resurrection narrative we have, and it costs her husband Dumuzi his freedom to undo.',
                'Her priestess Enheduanna, daughter of Sargon and the first author in history to sign a work, wrote the Exaltation of Inanna around 2300 BCE — which makes the world’s earliest named literature a hymn to this goddess.',
            ],
            cult: 'Uruk (Eanna) above all; Agade, Nineveh and Arbela as Ishtar.',
            interpretatio: 'Ishtar in Akkadian, Astarte in the Levant, Aphrodite to Greek observers — a chain of translation the ancients made themselves, and the Venus-planet identity travels the whole way with her.',
        },
        {
            slug: 'marduk', name: 'Marduk', native: '𒀭𒀫𒌓', lang: 'cuneiform',
            domain: 'Babylon’s champion; order made by force', group: 'mesopotamian',
            exposition: [
                'Marduk’s rise is an argument about empire. In Enuma Elish the gods, terrified of Tiamat, hand supreme power to the young city-god of Babylon on one condition: that he win. He does — splitting Tiamat to make sky and earth — and the fifty names the poem heaps on him at the close are the offices of the older gods, transferred. The poem was recited annually at the New Year festival while the king took the god’s hand.',
                'It is theology as constitutional change, and every later imperial capital that adopted a patron deity followed this template whether or not it knew the poem.',
            ],
            cult: 'Babylon — Esagila, with the ziggurat Etemenanki beside it.',
            interpretatio: 'Bel, “lord,” in later usage — the Bel of the Bible’s taunts; Greek writers matched him to Zeus.',
        },
        {
            slug: 'ra', name: 'Ra', native: '𓂋𓂝', lang: 'hieroglyphic',
            domain: 'The sun; kingship', group: 'egyptian',
            exposition: [
                'Ra sails. The Egyptian sun is not a lamp but a journey: the day-barque across the sky, the night-barque through the twelve hours of the underworld, the nightly battle with the serpent Apep at the fourth hour, and the rebirth at dawn. The great funerary books — Amduat, Book of Gates — are guidebooks to that night voyage, written on royal tomb walls so the king could sail it too.',
                'By the New Kingdom the theology is fluently composite: Ra-Horakhty at dawn, Amun-Ra at Thebes, Atum-Ra at dusk. Egyptian religion had no difficulty holding several true accounts at once — the modern demand that only one be right would have puzzled its priests.',
            ],
            cult: 'Heliopolis (Iunu) — the Benben stone and the sun-temples of the Fifth Dynasty.',
            interpretatio: 'Helios to the Greeks, straightforwardly; the syncretism Ra-Helios-Serapis follows in the Roman period.',
        },
        {
            slug: 'isis', name: 'Isis', native: '𓊨𓏏𓆇', lang: 'hieroglyphic',
            domain: 'Magic, throne, motherhood, the wandering search', group: 'egyptian',
            exposition: [
                'Isis is the great worker of heka. She gathers her murdered husband’s scattered body, conceives Horus by her own art, hides him in the Delta marshes, and pleads his case before the tribunal; and in the most audacious surviving Egyptian myth she poisons Ra himself with a serpent made of his own spittle and refuses the cure until he surrenders his secret name — because to know a name is to hold the thing.',
                'Her cult outlived every other Egyptian god’s: temples from Pompeii to the Rhine, initiations described by Apuleius, and the shrine at Philae still sacrificing into the sixth century CE — the last working Egyptian temple, closed by Justinian.',
            ],
            cult: 'Philae above all; Behbeit el-Hagar; and every port of the Roman Mediterranean.',
            interpretatio: 'Demeter to Herodotus; the Roman Isis absorbs Fortuna and Venus; the “myrionymos,” she of ten thousand names, as her own aretalogies boast.',
        },
        {
            slug: 'osiris', name: 'Osiris', native: '𓁹𓊨𓀭', lang: 'hieroglyphic',
            domain: 'The dead, the grain, the judged and vindicated', group: 'egyptian',
            exposition: [
                'Murdered by his brother, dismembered, reassembled and revived — but not to return: Osiris rules below, and every Egyptian who died hoped to be called “an Osiris” before the tribunal, heart weighed against the feather of Ma‘at, with Thoth recording and the devourer waiting.',
                'He is grain as well as king: the “Osiris beds,” seed sown in a body-shaped tray and left to sprout in the tomb, make the theology literal. The democratization of his afterlife — first a royal privilege, then anyone’s — is one of the great social shifts in the history of religion.',
            ],
            cult: 'Abydos — the Osireion and the annual mystery procession; Busiris in the Delta.',
            interpretatio: 'Dionysus, in Herodotus’ confident equation; Serapis in the Ptolemaic fusion built to be legible to both peoples.',
        },
        {
            slug: 'thoth', name: 'Thoth', native: '𓅜𓏏𓏭', lang: 'hieroglyphic',
            domain: 'Writing, reckoning, the moon, the words of power', group: 'egyptian',
            exposition: [
                'Ibis-headed, the scribe of the tribunal, inventor of writing and of the game the calendar turns on: Thoth wins five extra days from the moon so Nut can bear her children outside the year. He keeps the ledger of the weighing, arbitrates between Horus and Set, and holds the formulae — “the words of god,” medu-netjer, which the Greeks rendered “hieroglyphs.”',
                'Greek Egypt identified him with Hermes, and out of that identification came Hermes Trismegistus and the entire Hermetic corpus — meaning the whole Western esoteric tradition traces one of its main roots to this god’s translation.',
            ],
            cult: 'Hermopolis Magna (Khemenu) — and the ibis catacombs at Tuna el-Gebel, millions of mummified birds.',
            interpretatio: 'Hermes; then Hermes Trismegistus, patron of the alchemists — the single most consequential interpretatio in this table.',
        },
        {
            slug: 'el', name: 'El', native: 'אל', lang: 'hebrew',
            domain: 'The aged father of the gods; the assembly', group: 'levantine',
            exposition: [
                'At Ugarit, El is the grey-bearded king at the source of the two rivers, who does not act so much as authorize: the divine council meets in his presence, and Baal must have his permission for a palace. His epithets — creator of creatures, kindly one, bull — are formulaic and ancient.',
                'The Hebrew Bible uses his name for its own God constantly (El Elyon, El Shaddai, and the plural elohim), and Deuteronomy 32:8–9 preserves, in the older reading now confirmed by a Qumran manuscript, a scene where Elyon allots the nations among the divine sons and takes Jacob as YHWH’s own portion. The relationship between these two Els is one of the liveliest arguments in biblical scholarship, and this portal states it as an argument.',
            ],
            cult: 'Ugarit (Ras Shamra); the wider Levant, in personal names from Canaan to Israel.',
            interpretatio: 'Kronos in Philo of Byblos’ Greek retelling; absorbed into the God of Israel by the biblical writers, in a way scholars debate as identification, inheritance, or takeover.',
        },
        {
            slug: 'baal', name: 'Baal Hadad', native: 'בעל', lang: 'hebrew',
            domain: 'Storm, rain, the rider on the clouds', group: 'levantine',
            exposition: [
                'The Baal Cycle from Ugarit gives the storm-god his epic: he defeats Yam, the Sea; wins a palace with a window; is swallowed by Mot, Death; and returns when his sister Anat splits Mot with a blade and winnows him like grain. It is the rain-cycle told as a war, in a land where rain is not optional.',
                'The Bible fights him constantly and borrows his poetry while doing it — “rider on the clouds” is Baal’s title at Ugarit and YHWH’s in Psalm 68. The clay tablets recovered from 1929 onward turned that quarrel from a monologue into a documented dispute.',
            ],
            cult: 'Ugarit; Mount Sapan (Jebel al-Aqra), his mountain; temples across Canaan and Phoenicia.',
            interpretatio: 'Hadad in Aramaic; Zeus Kasios to the Greeks, from his mountain; Jupiter Heliopolitanus at Baalbek.',
        },
        {
            slug: 'anat', name: 'Anat', native: 'ענת', lang: 'hebrew',
            domain: 'War, the hunt, terrible devotion', group: 'levantine',
            exposition: [
                'Anat wades. The Ugaritic poet describes her fighting knee-deep in blood, hanging heads at her belt and hands at her girdle, and laughing — and the same goddess searches for her dead brother Baal and carries his body up the mountain to bury it. Ferocity and grief in one figure, unresolved by the poet, who evidently found no contradiction.',
                'Her name survives in Israelite place-names (Anathoth, Jeremiah’s village) and in Egypt, where the Ramesside pharaohs adopted her as a war-goddess — a Canaanite import in an Egyptian court.',
            ],
            cult: 'Ugarit; Beth-Anath; an Egyptian following from the Nineteenth Dynasty; and at Elephantine a Judaean garrison invoked Anat-Yahu in the fifth century BCE.',
            interpretatio: 'Athena to some Hellenistic observers, Aphrodite to others — the double portfolio of love and war that Inanna also carries confuses the translators every time.',
        },
        {
            slug: 'zeus', name: 'Zeus', native: 'Ζεύς', lang: 'greek',
            domain: 'Sky, storm, oath, the order of the household of gods', group: 'hellenic',
            exposition: [
                'Zeus is the clearest Indo-European inheritance in the Greek pantheon: his name is the old sky-father, cognate with Latin Iuppiter (Dyēu-pəter, “sky father”) and Vedic Dyaus Pitar — three languages saying one ancient vocative. His Greek career adds the succession myth from the East: Ouranos to Kronos to Zeus, a pattern shared with Hittite and Mesopotamian versions.',
                'His offices are civic before they are cosmic — Zeus Xenios of guest-friendship, Zeus Horkios of oaths, Zeus Herkeios of the courtyard. He is where Greek religion put the rules that let strangers meet without bloodshed.',
            ],
            cult: 'Olympia — the games and the chryselephantine statue; Dodona, the oldest oracle, where the priests read the rustling of an oak.',
            interpretatio: 'Jupiter at Rome; matched to Amun at Siwa (hence Zeus Ammon), to Baal in Syria, to Marduk in Babylon — the busiest node in the whole table.',
        },
        {
            slug: 'athena', name: 'Athena', native: 'Ἀθηνᾶ', lang: 'greek',
            domain: 'Skilled war, craft, the city’s counsel', group: 'hellenic',
            exposition: [
                'Born from the head — after Zeus swallows the pregnant Metis, on a prophecy — Athena is intelligence in armour: not the battle-rage of Ares but tactics, and not craft in general but the weaver’s and shipwright’s exactness. Her city took her name after she gave it the olive.',
                'The Parthenon is a temple to her as maiden; the older, holier shrine was the Erechtheion, where the olive stood and the snake was fed. Greek religion’s centre of gravity was rarely the famous building.',
            ],
            cult: 'Athens — the Acropolis, the Panathenaic procession and the peplos woven for her statue.',
            interpretatio: 'Minerva at Rome; Neith at Sais, an equation Plato repeats in the Timaeus when he sources the Atlantis story to Egyptian priests.',
        },
        {
            slug: 'apollo', name: 'Apollo', native: 'Ἀπόλλων', lang: 'greek',
            domain: 'Prophecy, plague and healing, music, the measured', group: 'hellenic',
            exposition: [
                'Apollo holds the bow that sends plague and the lyre that orders sound, and the Greeks did not consider that a paradox: the god of the far-shot arrow is the god of exactness. His oracle at Delphi, spoken through the Pythia over a chasm, advised colonies, kings and Croesus for a millennium, and carried the two maxims that became philosophy’s doorposts — know thyself, nothing in excess.',
                'His arrival is late and possibly foreign — the etymology is unsettled, with Anatolian derivations still in play — and he takes Delphi by killing the serpent Python, whose name the sanctuary keeps.',
            ],
            cult: 'Delphi and Delos; Didyma and Claros in Asia Minor.',
            interpretatio: 'Apollo at Rome under his own name — the one major Greek god the Romans did not rename; identified with Horus in Egypt and with the Celtic Belenus in Gaul.',
        },
        {
            slug: 'dionysus', name: 'Dionysus', native: 'Διόνυσος', lang: 'greek',
            domain: 'Wine, theatre, ecstasy, the loosening', group: 'hellenic',
            exposition: [
                'Long thought a late immigrant, Dionysus turns out to be old: his name is on Linear B tablets from Mycenaean Pylos, centuries before Homer. He is the god who dissolves boundaries — between man and animal, self and crowd, the living and the dead — and Athens gave him the theatre, so that the city could experience that dissolution safely, once a year, under a roof of laws.',
                'The Orphic mystery-tradition made him more: Dionysus Zagreus, torn by the Titans and reborn, with humanity formed from the Titans’ ashes — soot and spark, the myth that gave Greek thought its doctrine of an immortal something in us.',
            ],
            cult: 'Athens (the City Dionysia); Thebes; the Villa of the Mysteries at Pompeii for the initiations’ best surviving picture.',
            interpretatio: 'Bacchus and Liber at Rome; Osiris in Herodotus; Sabazios in Phrygia — the god who translates most easily and loses most in every translation.',
        },
        {
            slug: 'hekate', name: 'Hekate', native: 'Ἑκάτη', lang: 'greek',
            domain: 'Crossroads, thresholds, the moon, the magical arts', group: 'hellenic',
            exposition: [
                'Hesiod gives Hekate an astonishing hymn — honoured by Zeus above all, with a share in earth, sea and sky — and she never quite fits Olympus afterward. She holds the torches at Persephone’s search, stands three-faced at the crossroads where three roads and three worlds meet, and receives the monthly suppers left at the doorway.',
                'By late antiquity she is the pivot of theurgy: in the Chaldean Oracles she is the World-Soul, the membrane between the transcendent Father and the cosmos — the goddess a philosopher could pray to. The magical papyri call her constantly.',
            ],
            cult: 'Lagina in Caria — her great temple; doorway shrines everywhere; the deipna, monthly meals at the crossroads.',
            interpretatio: 'Trivia at Rome, “of the three ways”; fused with Selene and Artemis in the magical corpus, where the triple moon becomes one operative goddess.',
        },
        {
            slug: 'odin', name: 'Óðinn', native: null, lang: null,
            domain: 'Wisdom bought with sacrifice; poetry, war, the dead', group: 'norse',
            exposition: [
                'Odin pays. He gives an eye at Mímir’s well for a drink of wisdom; he hangs nine nights on the windswept tree, “myself given to myself,” to take up the runes screaming; he steals the mead of poetry in a stolen shape. Every gift he holds was bought at a price he names.',
                'What we have of him is written by Christians: Snorri’s Edda in the 1220s and the poems copied into the Codex Regius. That does not make the matter false, but it makes the record a translation — and the portal says so rather than pretending to a pagan source.',
            ],
            cult: 'Uppsala, where Adam of Bremen reports a great temple and nine-yearly sacrifices — a hostile source, and the archaeology is still argued.',
            interpretatio: 'Mercury in the Roman interpretatio — hence Wednesday, Óðinsdagr, standing where dies Mercurii stands in the Latin week.',
        },
        {
            slug: 'freyja', name: 'Freyja', native: null, lang: null,
            domain: 'Love, gold, war’s chosen dead, seiðr', group: 'norse',
            exposition: [
                'Freyja takes half the slain — the detail that most surprises readers who expect a goddess of love to stay out of the battlefield: her hall Fólkvangr receives them, and Odin’s Valhǫll the rest. She rides a chariot drawn by cats, owns the necklace Brísingamen, and weeps gold for her wandering husband Óðr.',
                'She is of the Vanir, the older fertility family who fought the Æsir to a truce and exchanged hostages, and she teaches Odin seiðr — the trance-magic that the sagas treat as improper for men, which is the sharpest surviving detail about how the Norse ranked their own arts.',
            ],
            cult: 'Place-names across Sweden and Norway; the sagas’ household observances rather than great temples.',
            interpretatio: 'Venus in the Latin week — Friday, Frjádagr — though the philologists still argue whether the day is hers or Frigg’s.',
        },
        {
            slug: 'indra', name: 'Indra', native: 'इन्द्र', lang: 'devanagari',
            domain: 'The thunderbolt; the slaying of the obstruction', group: 'vedic',
            exposition: [
                'A quarter of the Rigveda is his. Indra drinks the soma, takes up the vajra, and kills Vṛtra — the serpent who holds the waters coiled — and the rivers run: a myth of released waters and released order that the hymns replay in a hundred keys.',
                'His later demotion is one of religious history’s most complete: in the epics and Puranas he is a rain-king outranked by Viṣṇu and Śiva, and in the Buddhist texts (as Śakra) he becomes the Buddha’s attentive pupil. The Vedic head of the pantheon ends as a supporting character.',
            ],
            cult: 'Vedic ritual — the soma sacrifice above all; the Indra-dhvaja festival in later India.',
            interpretatio: 'Compared to Zeus and Thor as the Indo-European thunderer, and — pointedly — to Zoroastrian Indra, who appears there among the daevas: the same name kept and inverted across the Iranian border.',
        },
        {
            slug: 'agni', name: 'Agni', native: 'अग्नि', lang: 'devanagari',
            domain: 'Fire; the mouth of the gods', group: 'vedic',
            exposition: [
                'The Rigveda opens with him — “agnim īḷe,” I praise Agni — because without fire there is no offering. He is the priest of the gods and the god of priests, the one who carries what is given here to those who receive it there: every oblation goes into his mouth and out through the smoke.',
                'He is also the most physically present god in the collection: kindled each morning, lodged in the domestic hearth, present at every wedding and every cremation. Vedic religion is a fire cult before it is anything else, and Zoroastrian fire ritual across the Iranian border is a sibling of it.',
            ],
            cult: 'The śrauta and domestic fires — three fires for the full public rite; the tradition of the perpetually maintained hearth.',
            interpretatio: 'Cognate in name with Latin ignis; his function — messenger between altars and heaven — matches Iranian Ātar closely.',
        },
        {
            slug: 'shiva', name: 'Śiva', native: 'शिव', lang: 'devanagari',
            domain: 'Ascetic and dancer; destruction as release', group: 'vedic',
            exposition: [
                'Śiva holds together what other pantheons would split: the ash-smeared ascetic on the mountain and the householder with Pārvatī; the destroyer and the giver of grace; the still yogin and the Naṭarāja whose dance keeps time going. His Vedic ancestor is the fierce outsider Rudra, addressed with careful respect.',
                'His worship is aniconic as often as not: the liṅga in the sanctum, water falling on it all day. Kashmir Śaivism, whose Śiva Sūtras stand in the Scriptorium’s Sanskrit hall, builds from him one of the subtlest non-dual philosophies any tradition has produced.',
            ],
            cult: 'Varanasi above all — the city he is said never to leave; Chidambaram for the dance; the twelve jyotirliṅgas.',
            interpretatio: 'Greeks in India matched him to Dionysus; the correspondence tells you more about the Greeks’ categories than about Śiva.',
        },
        {
            slug: 'devi', name: 'Devī / Durgā', native: 'देवी', lang: 'devanagari',
            domain: 'The Goddess; power itself', group: 'vedic',
            exposition: [
                'The Devī Māhātmya, around the sixth century CE, makes the claim explicit: the Goddess is not a consort but the ground — the gods pool their energies to make her, and she does what they could not, killing the buffalo-demon no male could kill. Śākta theology takes the last step: śakti is the power by which anything acts at all, and the gods are inert without her.',
                'She is one and many: Durgā unassailable, Kālī in the cremation ground, Lakṣmī in the lamps of Diwali, the village goddess with her own field. The living festival scale is enormous — Durgā Pūjā empties and refills a city every autumn.',
            ],
            cult: 'The śakti pīṭhas across the subcontinent; Kolkata’s Durgā Pūjā; Kāmākhyā in Assam.',
            interpretatio: 'Resists it, deliberately: the Māhātmya answers the interpretatio impulse by absorbing all goddesses into herself as forms.',
        },
        {
            slug: 'olodumare', name: 'Olódùmarè', native: null, lang: null,
            domain: 'The owner of the vast expanse; the source', group: 'yoruba',
            exposition: [
                'Above the òrìṣà stands Olódùmarè — also Olórun, owner of the sky — who is not approached directly and has no shrines or offerings of his own. Everything given is given to the òrìṣà; the source is acknowledged, not petitioned. It is a structure that has misled outside observers in both directions: mistaken for a borrowed monotheism, or missed entirely.',
                'Between the source and the world stand the four hundred and one òrìṣà, and between the person and the òrìṣà stands Ifá divination — a system of sixteen principal signs and 256 figures whose corpus the diviner must hold in memory.',
            ],
            cult: 'No direct cult by design; acknowledged in the invocations that open all others.',
            interpretatio: 'Rendered “God” in Christian and Muslim Yoruba usage; the equation is now internal to the tradition and argued within it.',
        },
        {
            slug: 'esu', name: 'Èṣù', native: null, lang: null,
            domain: 'The crossroads; the messenger who must be fed first', group: 'yoruba',
            exposition: [
                'Èṣù carries the offerings and carries the answers; nothing reaches the òrìṣà unless he is served first. He is the principle of contingency — the trickster who proves a point by walking between two friends in a hat red on one side and white on the other until they come to blows over what colour it was.',
                'The missionary translation of his name as “devil” is one of the notorious mistranslations in the history of the study of religion, and Yoruba scholars have been correcting it for a century: he is the guarantor of communication, not its enemy.',
            ],
            cult: 'The doorway, the market, and the crossroads; the first portion at every rite; Èṣù in Cuba as Eleguá, in Brazil as Exu.',
            interpretatio: 'Miscast as Satan by nineteenth-century missionaries; better matched, if a match must be made, to Hermes at the boundary stone.',
        },
        {
            slug: 'sango', name: 'Ṣàngó', native: null, lang: null,
            domain: 'Thunder, the double axe, kingship and justice', group: 'yoruba',
            exposition: [
                'Ṣàngó was a king of Òyó before he was a god — the fourth alaafin, remembered as terrible and magnificent, who took his own life and became thunder. His axe falls on liars and thieves; a house struck by lightning was a house judged, and his priests alone could clear the site.',
                'Carried across the Atlantic, he became Changó in Cuban Lucumí and Xangô in Brazilian Candomblé, and in the syncretism of enslavement he was masked as Saint Barbara — whose legend also turns on lightning.',
            ],
            cult: 'Òyó; the Ṣàngó festival at Koso; and the terreiros and casas of the Americas.',
            interpretatio: 'Paired with Saint Barbara in the Caribbean; the double-axe portfolio invites comparison with Zeus and Thor, and Yoruba scholarship treats such pairing with justified caution.',
        },
        {
            slug: 'amaterasu', name: 'Amaterasu', native: '天照', lang: 'cjk',
            domain: 'The sun; the imperial line', group: 'kami',
            exposition: [
                'The Kojiki (712 CE) tells how Amaterasu, offended by her brother Susanoo’s violence, hid in a cave and left the world in darkness — and how the assembled kami lured her out with a mirror, a jewel-tree and Uzume’s outrageous dance, so that light returned and could not be hidden again. The mirror is one of the three imperial regalia.',
                'She is a rare thing in the world’s pantheons: a female sun at the head of the family, from whom the imperial house traced its descent — a claim with modern political history attached, formally renounced in 1946.',
            ],
            cult: 'Ise Jingū — rebuilt to identical specification every twenty years, a practice running since the seventh century.',
            interpretatio: 'Resisted the Buddhist honji suijaku system unevenly: medieval theology paired her with the cosmic Buddha Dainichi, which Shinto reformers later undid.',
        },
    ],
};
