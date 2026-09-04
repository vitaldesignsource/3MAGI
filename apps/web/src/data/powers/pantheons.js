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
        { key: 'roman', label: 'Rome', blurb: 'A pantheon of magistrates: gods bound by procedure, addressed by exact formula, and expanded by treaty whenever Rome absorbed a people who had their own.' },
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

        {
            slug: 'utu', name: 'Utu / Shamash', native: '𒀭𒌓', lang: 'cuneiform',
            domain: 'The sun; and therefore justice', group: 'mesopotamian',
            exposition: [
                'The logic is unanswerable: the sun sees everything, so the sun judges. Utu crosses the sky each day and looks into every courtyard, which makes him the god oaths are sworn by, the patron of the wronged, and the one to whom the wandering and the cheated appeal.',
                'That is why Hammurabi is carved receiving the law from him on the stele now in the Louvre — not as decoration but as jurisdiction. He also opens the mountain gates each dawn and closes them at dusk, and in the epic he is the one who helps Gilgamesh against Huwawa.',
            ],
            cult: 'Sippar and Larsa — the twin Ebabbar, “white house,” temples.',
            interpretatio: 'Shamash in Akkadian; matched to Helios by later observers, though the Greek sun-god carries none of his judicial office.',
        },
        {
            slug: 'ereshkigal', name: 'Ereshkigal', native: '𒀭𒊩𒌆𒆠𒃲', lang: 'cuneiform',
            domain: 'Queen of the great below', group: 'mesopotamian',
            exposition: [
                'Her name says her office: lady of the great earth. She rules the land of no return in her own right, not as anyone’s consort, and when her sister Inanna comes down uninvited it is Ereshkigal who has her stripped at each of the seven gates and hung on a hook.',
                'The most human moment in Mesopotamian literature may be hers: in one text she is found groaning, in labour with grief, and the clever creatures Enki sends win Inanna’s corpse simply by echoing her cries back to her until she is grateful enough to give it up.',
            ],
            cult: 'Kutha, shared with Nergal, who becomes her husband in the poem of that marriage.',
            interpretatio: 'Named directly in the Greek magical papyri, where Ereschigal is invoked alongside Hekate — one of the few Mesopotamian goddesses whose name survived into late-antique magic intact.',
        },
        {
            slug: 'nabu', name: 'Nabu', native: '𒀭𒀝', lang: 'cuneiform',
            domain: 'The stylus; writing, wisdom, and the fixing of destinies', group: 'mesopotamian',
            exposition: [
                'Marduk’s son holds the reed pen and the Tablet of Destinies, and what he writes at the New Year stands for the year. Scribes signed themselves his servants; the stylus on a clay tablet is his emblem on a thousand boundary stones.',
                'His star rose with Babylon’s: by the first millennium his procession from Borsippa to Babylon for the festival was among the great public events of the region, and “Nabu” stands inside the names of kings — Nabu-kudurri-usur, whom the Bible calls Nebuchadnezzar.',
            ],
            cult: 'Borsippa — the Ezida temple; and the New Year procession to Babylon.',
            interpretatio: 'Matched to Apollo by Hellenistic writers for prophecy, and to Hermes-Mercury for the stylus; the planet Mercury is his.',
        },
        {
            slug: 'amun', name: 'Amun', native: '𓇋𓏠𓈖', lang: 'hieroglyphic',
            domain: 'The hidden one; breath, and later empire', group: 'egyptian',
            exposition: [
                'His name means hidden, and Egyptian theology took that seriously: he is the god whose true form is not known even to the other gods, present as air is present. A local Theban deity for centuries, he rose with Thebes to become Amun-Ra, king of the gods and the god of an empire.',
                'His priesthood at Karnak grew rich enough to rival the throne, which is part of the background to Akhenaten’s attempt to erase him — and to the thoroughness with which Amun’s name was recut everywhere after that experiment failed.',
            ],
            cult: 'Karnak and Luxor, with the annual Opet procession between them; the oracle at Siwa.',
            interpretatio: 'Zeus Ammon to the Greeks — Alexander went to Siwa to be greeted as his son, and the ram’s horns on Alexander’s coin portraits are Amun’s.',
        },
        {
            slug: 'hathor', name: 'Hathor', native: '𓉡', lang: 'hieroglyphic',
            domain: 'Love, music, drunkenness — and slaughter, when unleashed', group: 'egyptian',
            exposition: [
                'Hathor is joy with a blade inside it. She is the sky-cow who suckles the king, the lady of the sycamore who meets the dead with bread and water, the patroness of music and intoxication whose festivals were loud and drunken by design.',
                'And she is the Eye of Ra: sent out to punish humanity, she cannot be stopped by argument, only by trickery — seven thousand jars of beer dyed red with ochre, poured across the fields, which she drinks believing it blood and falls asleep. The Egyptians kept both halves of her without embarrassment.',
            ],
            cult: 'Dendera — the temple whose ceiling carries the zodiac now in the Louvre; Deir el-Bahari; the turquoise mines of Sinai.',
            interpretatio: 'Aphrodite to the Greeks, which captures the love and loses the lioness entirely.',
        },
        {
            slug: 'set', name: 'Set', native: '𓃩', lang: 'hieroglyphic',
            domain: 'Storm, desert, disorder — and the defence of the sun', group: 'egyptian',
            exposition: [
                'Set murders his brother Osiris and contends with Horus for eighty years, and he is also the one who stands in the prow of the night-barque and spears the serpent Apep, without whom the sun would not rise. Egypt kept a god who was both, and for long stretches he was respectable: the Ramesside pharaohs are named for him.',
                'His demonization is late and political, hardening under Persian and Greek rule until his images were defaced. The animal that writes his name — long-snouted, square-eared, forked-tailed — matches no creature anyone has identified, and Egyptologists still argue about what it is.',
            ],
            cult: 'Ombos (Naqada) and Avaris; strong in the eastern Delta and the oases.',
            interpretatio: 'Typhon to the Greeks — the monster who fought Zeus, which is how thoroughly the late reading won.',
        },
        {
            slug: 'mot', name: 'Mot', native: 'מת', lang: 'hebrew',
            domain: 'Death itself — appetite rather than rule', group: 'levantine',
            exposition: [
                'Mot is not a lord of the dead but a throat. The Ugaritic poet gives him a gullet reaching from earth to sky and a lip to the stars, and he swallows Baal whole; the land dries. He is hunger as a cosmic principle, and the harvest is his negotiation.',
                'Anat ends him with agricultural violence — she splits him with a blade, winnows him, burns him, grinds him, sows him in a field — which is either the threshing of grain read as myth or myth read into the threshing, and the poem does not choose.',
            ],
            cult: 'No temple is attested: one does not build for Death. He appears in the myth and in personal names.',
            interpretatio: 'The Hebrew word for death is the same word, and Death personified in Hosea, Job and Habakkuk keeps his outline.',
        },
        {
            slug: 'athtart', name: 'Athtart / Astarte', native: 'עשתרת', lang: 'hebrew',
            domain: 'Desire, war, and the evening star', group: 'levantine',
            exposition: [
                'The Levantine link in the longest chain of translation in this portal: Inanna to Ishtar to Athtart to Astarte to Aphrodite, one goddess of love-and-war walked west across three language families with the planet Venus travelling beside her the whole way.',
                'She is one of the Hebrew Bible’s standing complaints — Ashtoreth, deliberately mispointed with the vowels of bosheth, “shame” — and Solomon is charged with building her a high place. Egypt adopted her as a war-goddess of chariots; Sidon called her its lady.',
            ],
            cult: 'Sidon and Tyre above all; Ugarit; an Egyptian following from the Nineteenth Dynasty.',
            interpretatio: 'Aphrodite to the Greeks, Venus to Rome; Herodotus traces the oldest temple of “Aphrodite Ourania” to Ascalon on this coast.',
        },
        {
            slug: 'kothar', name: 'Kothar-wa-Khasis', native: 'כתר', lang: 'hebrew',
            domain: 'The divine craftsman; skill as a power', group: 'levantine',
            exposition: [
                'His double name means Skilful-and-Wise, and the wisdom meant is technical: he forges the two clubs, Yagrush and Ayyamur — Driver and Chaser — with which Baal beats the Sea, and he builds Baal’s palace, insisting against the owner’s wishes that it have a window.',
                'He works from Memphis and from Crete in the poem, which is a Bronze Age statement about where the best craftsmen came from: the god of skill is an import, and the tradition says so plainly.',
            ],
            cult: 'Attested in the Ugaritic texts rather than by temple; invoked in incantation.',
            interpretatio: 'Hephaestus and Ptah both stand behind and beside him — the smith-god is one of the most portable offices in this table.',
        },
        {
            slug: 'aphrodite', name: 'Aphrodite', native: 'Ἀφροδίτη', lang: 'greek',
            domain: 'Desire — the force, not the sentiment', group: 'hellenic',
            exposition: [
                'Hesiod has her born from the severed genitals of Ouranos thrown into the sea, and the Greeks did not find that pretty: Aphrodite is the compulsion that overrides judgement, which is why she starts the Trojan War with a bribe and why Sappho begs her to come as an ally rather than an affliction.',
                'The Greeks themselves knew she came from the east — Herodotus traces her cult back through Cyprus to Ascalon — and Aphrodite Ourania, the heavenly one, was distinguished from Pandemos, the common one, in a split the philosophers later made into a whole theory of love.',
            ],
            cult: 'Paphos on Cyprus, where the cult stone was aniconic; Cythera; Corinth.',
            interpretatio: 'Venus at Rome, and back along the chain to Astarte, Ishtar and Inanna — the same office, five languages deep.',
        },
        {
            slug: 'hermes', name: 'Hermes', native: 'Ἑρμῆς', lang: 'greek',
            domain: 'Boundaries, messages, cunning, and the road down', group: 'hellenic',
            exposition: [
                'Hermes begins as a heap of stones marking a boundary — the herm — and never stops being the god of edges: between properties, between languages, between the living and the dead. He is the only Olympian who moves freely into Hades, and the souls go with him.',
                'On his first day alive he steals Apollo’s cattle, invents the lyre from a tortoise, and talks his way out of the charge. Patron of merchants and thieves alike, because the Greeks understood those to be adjacent trades — and of interpreters, which is why the science of interpretation is called hermeneutics.',
            ],
            cult: 'Herms at every doorway and crossroads in Athens; Mount Cyllene; Kyllenian shrines and the Hermaia games.',
            interpretatio: 'Mercury at Rome; matched to Thoth in Egypt, and out of that identification came Hermes Trismegistus and the entire Hermetic corpus.',
        },
        {
            slug: 'demeter-persephone', name: 'Demeter and Persephone', native: 'Περσεφόνη', lang: 'greek',
            domain: 'Grain, grief, and the returning year', group: 'hellenic',
            exposition: [
                'A mother searches with torches while the earth goes barren, and a daughter, having eaten some pomegranate seeds below, must spend part of each year in the dark. It is the plainest agricultural myth in Greece and also the most emotionally exact one about losing a child.',
                'At Eleusis it became the Mysteries: nearly two thousand years of initiations, tens of thousands of initiates, and a secret so well kept that we still do not know what was shown in the telesterion. What the initiates said afterwards was that they no longer feared death.',
            ],
            cult: 'Eleusis; the Thesmophoria, a women-only festival kept across the Greek world.',
            interpretatio: 'Ceres and Proserpina at Rome; Herodotus matched Demeter to Isis, and the two searching, mourning, restoring goddesses do rhyme.',
        },
        {
            slug: 'hades', name: 'Hades', native: 'Ἅιδης', lang: 'greek',
            domain: 'The rule of the dead; and, by euphemism, wealth', group: 'hellenic',
            exposition: [
                'The unseen one — that is what the name appears to mean — got the underworld by lot when the three brothers divided the cosmos, and he keeps it strictly. He is not evil and not a tempter; he is a warden who does not release what is his, and Greek religion had almost no cult for him because there is nothing to ask him for.',
                'He was so unlucky to name aloud that the Greeks called him Plouton, the wealthy, on the reasoning that everything grows out of the ground he owns — and the euphemism became the name, which is why Rome says Pluto.',
            ],
            cult: 'Almost none by design; a temple at Elis reportedly opened one day a year, and necromantic oracles at Ephyra and Cumae approached him sideways.',
            interpretatio: 'Pluto and Dis Pater at Rome; Serapis absorbed part of his office in Ptolemaic Egypt.',
        },
        {
            slug: 'thor', name: 'Þórr', native: null, lang: null,
            domain: 'Thunder, the hammer, and the defence of the enclosure', group: 'norse',
            exposition: [
                'The archaeology disagrees with the literature about who mattered most. The sagas and the Edda are full of Odin, a god for kings and poets; the ground is full of Thor’s hammers — small silver Mjǫllnir pendants worn at the neck, especially as Christianity advanced and a cross was the alternative.',
                'He is the farmer’s god and the boundary’s: he fights giants, hallows with the hammer, blesses marriages and land, and at the end of the world he kills the Midgard Serpent and walks nine steps before its venom takes him. Thursday is his.',
            ],
            cult: 'Amulets across Scandinavia and the Danelaw; Adam of Bremen puts him at the centre of the Uppsala temple, above Odin.',
            interpretatio: 'Jupiter in the Latin week — Þórsdagr where Latin has dies Iovis — and one of the clearest Indo-European thunderers beside Indra and Zeus.',
        },
        {
            slug: 'loki', name: 'Loki', native: null, lang: null,
            domain: 'The flaw in the plan; and eventually the end of the world', group: 'norse',
            exposition: [
                'Loki solves the problems he causes, which is the whole shape of him: he gets Thor’s hammer stolen and recovers it, loses the gods their goddess and wins her back, and fathers, in various shapes, the wolf that will eat Odin, the serpent that circles the world, and the eight-legged horse Odin rides. He is not the gods’ enemy; he is their liability.',
                'Then he engineers Baldr’s death and the tone changes: bound beneath a dripping serpent until Ragnarǫk, when he steers the ship of the dead. Whether he was ever worshipped is doubtful — no place-names, no cult — which makes him a rare thing, a major god of story and not of altar.',
            ],
            cult: 'None attested — no temples, no place-names, no dedications.',
            interpretatio: 'Resists it. Comparisons to Prometheus and to trickster figures elsewhere are made constantly and hold only in fragments.',
        },
        {
            slug: 'tyr', name: 'Týr', native: null, lang: null,
            domain: 'The oath, and what keeping it costs', group: 'norse',
            exposition: [
                'The gods needed to bind the wolf Fenrir, and Fenrir would only submit to the fetter if one of them put a hand in his mouth as a pledge of good faith. Týr did, knowing the pledge was false. The wolf was bound; the hand was bitten off. He is the god of the oath and the only one willing to pay for one.',
                'His name is the oldest thing about him: Týr is cognate with Zeus, Jupiter and Dyaus — the Indo-European sky-father word — which suggests he was once the head of the pantheon and was displaced by Odin long before anything was written down.',
            ],
            cult: 'Place-names in Denmark; Tuesday, Týsdagr, standing where Latin has dies Martis.',
            interpretatio: 'Mars in the Roman interpretatio, which reads the war and misses the law.',
        },
        {
            slug: 'sarasvati', name: 'Sarasvatī', native: 'सरस्वती', lang: 'devanagari',
            domain: 'Speech, learning, music — and a river', group: 'vedic',
            exposition: [
                'She begins as a river, praised in the Rigveda as the best of mothers, rivers and goddesses, and the river is gone: the Sarasvatī of the hymns dried or shifted, and locating it is one of the live arguments of South Asian archaeology. What remained was the goddess of everything that flows — speech first of all.',
                'By the classical period she holds the vīṇā and the book: patron of Sanskrit, of poets and of students, honoured on Vasant Panchami when children are taught to write their first letters. Her worship crossed with Buddhism into Japan, where she is Benzaiten.',
            ],
            cult: 'Vasant Panchami across India; shrines wherever there are schools; Benzaiten shrines in Japan.',
            interpretatio: 'Named beside the Muses by comparatists, though her office is broader — she is the ground of articulate speech, not its inspiration.',
        },
        {
            slug: 'vishnu', name: 'Viṣṇu', native: 'विष्णु', lang: 'devanagari',
            domain: 'Preservation; and the descent into the world', group: 'vedic',
            exposition: [
                'Minor in the Rigveda — three strides that measure out the cosmos — and supreme in the Purāṇas, Viṣṇu is the god who keeps things going and, crucially, comes down: the avatāras, of whom Rāma and Kṛṣṇa are the great ones, are the doctrine that God intervenes in history in a body.',
                'That doctrine, arrived at independently, is the closest structural parallel in world religion to incarnation, and it has occupied comparative theology for two centuries. Vaiṣṇava devotion — the bhakti of surrender to a personal, loving God — is among the largest religious movements on earth.',
            ],
            cult: 'Tirupati, the most visited pilgrimage site in the world; Srirangam; Puri; Badrinath.',
            interpretatio: 'The Greeks in India matched Kṛṣṇa to Herakles; the parallel that matters to this portal is with incarnation rather than with any single god.',
        },
        {
            slug: 'yama', name: 'Yama', native: 'यम', lang: 'devanagari',
            domain: 'The first to die, and therefore the king of the dead', group: 'vedic',
            exposition: [
                'Yama’s claim on the underworld is unlike any other in this table: he rules the road because he walked it first. The Rigveda says he chose death and found the path, and every mortal after him follows a way he opened.',
                'In the Kaṭha Upaniṣad he is the teacher: the boy Naciketas waits three nights at his door and refuses every bribe until Yama tells him what happens after death — one of the foundational texts on the self, taught by Death because Death is the only one qualified.',
            ],
            cult: 'Invoked in funerary rite rather than temple; the southern quarter is his.',
            interpretatio: 'Cognate with Iranian Yima, the first king; passes into Buddhism as Yama the judge, and into China and Japan as Yanluo and Enma.',
        },
        {
            slug: 'ogun', name: 'Ògún', native: null, lang: null,
            domain: 'Iron, and every trade that uses it', group: 'yoruba',
            exposition: [
                'Ògún cleared the road. In the founding narrative the other òrìṣà cannot descend through the bush until he cuts the path with iron, and the office has expanded with the metal ever since: he is the god of blacksmiths, hunters and warriors, and equally of surgeons, mechanics, lorry drivers and soldiers.',
                'To swear on iron is to swear on him, and Nigerian courts have accepted an oath taken on a piece of iron from Yoruba witnesses — a working legal recognition of an òrìṣà, in a modern state, today.',
            ],
            cult: 'Ire and Ondo; the forge and the roadside; Ogun in Haitian Vodou, Ogum in Brazil.',
            interpretatio: 'Paired with Saint George and Saint James in the diaspora; comparisons to Hephaestus catch the forge and miss the road.',
        },
        {
            slug: 'osun', name: 'Ọ̀ṣun', native: null, lang: null,
            domain: 'Fresh water, sweetness, fertility, wealth', group: 'yoruba',
            exposition: [
                'The most consequential story about Ọ̀ṣun is a story about exclusion: when the male òrìṣà came down to order the world and left her out of their councils, nothing they attempted would hold together, and the work resumed only when they turned back and included her. It is a myth about who is required.',
                'Her river runs at Osogbo, and the sacred grove there — replanted and re-sculpted from the 1950s by the Austrian-born artist and priestess Susanne Wenger with local artists — is now a UNESCO World Heritage site and the centre of an annual festival drawing hundreds of thousands.',
            ],
            cult: 'The Osun-Osogbo grove and its August festival; Oshun in Cuba, Oxum in Brazil.',
            interpretatio: 'Paired with Our Lady of Charity in Cuba; the Aphrodite comparison catches the sweetness and misses the sovereignty.',
        },
        {
            slug: 'orunmila', name: 'Ọ̀rúnmìlà', native: null, lang: null,
            domain: 'Wisdom, divination, and the witness of destiny', group: 'yoruba',
            exposition: [
                'Ọ̀rúnmìlà was present when each person’s destiny was chosen, and that is his qualification: he alone can say what was agreed. The system that consults him is Ifá, and it is one of the great intellectual structures of the continent — sixteen principal odù squared into two hundred and fifty-six figures, each with a body of verse, stories and prescriptions the babaláwo must hold by heart.',
                'The corpus is oral, enormous, and formally taught over years. UNESCO inscribed Ifá on its list of Intangible Cultural Heritage in 2005, and the divination is practised now in Nigeria, Benin, Cuba, Brazil and the United States.',
            ],
            cult: 'Ilé-Ifè and Òkè-Ìtasè; wherever a babaláwo casts the opele chain or the palm nuts.',
            interpretatio: 'Compared to Thoth and to Hermes for the office of recorded wisdom; the comparison is fair on function and thin on everything else.',
        },
        {
            slug: 'susanoo', name: 'Susanoo', native: '須佐之男', lang: 'cjk',
            domain: 'Storm, the sea, and disruption that turns out useful', group: 'kami',
            exposition: [
                'Amaterasu’s brother is the wrecker: he ruins her rice fields, breaks the irrigation channels and flings a flayed horse through the roof of her weaving hall, which is what drives her into the cave and the world into darkness. He is expelled from heaven for it.',
                'Then, in exile at Izumo, he kills the eight-headed serpent Yamata-no-Orochi by getting it drunk, and finds in its tail the sword that becomes one of the three imperial regalia. He also composes what the Kojiki presents as the first Japanese poem. Disorder in this pantheon is not simply the enemy.',
            ],
            cult: 'Yasaka Shrine in Kyoto and the Gion Matsuri; Susa and the Izumo region.',
            interpretatio: 'Conflated with the Buddhist Gozu Tennō in the medieval period, and disentangled again by the Meiji separation of kami and buddhas.',
        },
        {
            slug: 'izanagi-izanami', name: 'Izanagi and Izanami', native: '伊邪那岐', lang: 'cjk',
            domain: 'The making of the islands, and the bargain with death', group: 'kami',
            exposition: [
                'They stand on the floating bridge of heaven, stir the brine with a jewelled spear, and the first island forms from what drips off the point. Their courtship has a false start the text takes seriously — the woman speaks first, the child is malformed, they begin again — and then the islands and the kami are born.',
                'Izanami dies bearing fire. Izanagi follows her into Yomi and looks at her against her word, sees corruption, and flees; she pursues him to the pass and they end it there with a bargain — she will take a thousand lives a day, he will cause fifteen hundred births. It is a creation myth that ends by explaining the population.',
            ],
            cult: 'Taga Taisha in Shiga; Yomotsu Hirasaka in Shimane, where the pass is pointed out.',
            interpretatio: 'The descent-and-looking-back is compared to Orpheus constantly; the comparison is old, honest, and unresolved.',
        },
        {
            slug: 'inari', name: 'Inari', native: '稲荷', lang: 'cjk',
            domain: 'Rice, and therefore prosperity and business', group: 'kami',
            exposition: [
                'Roughly a third of all Shinto shrines in Japan are Inari shrines — tens of thousands of them — which makes this the most widely worshipped kami in the country by simple count. Rice was wealth, so the god of rice became the god of commerce, and companies still maintain small Inari shrines on office rooftops.',
                'The foxes at the gate are messengers rather than the kami, a distinction the tradition insists on and popular usage constantly blurs. Inari is variously male, female, or both, and the tradition is comfortable leaving it there.',
            ],
            cult: 'Fushimi Inari Taisha in Kyoto, with its corridors of donated vermilion torii climbing the mountain.',
            interpretatio: 'Identified with the Buddhist Dakiniten in the syncretic period; the fox-messenger has no clean parallel elsewhere in this table.',
        },
        {
            slug: 'hachiman', name: 'Hachiman', native: '八幡', lang: 'cjk',
            domain: 'War, archery, and the protection of the nation', group: 'kami',
            exposition: [
                'Hachiman is a deified emperor — Ōjin, by identification — and the patron of the samurai from the Minamoto onward, which made him for centuries the most politically consequential kami in Japan. Second only to Inari in number of shrines.',
                'He is also the textbook case of honji suijaku, the medieval theology in which kami are local traces of buddhas: he was styled Hachiman Daibosatsu, a Great Bodhisattva, and worshipped as kami and buddha together for a thousand years until the Meiji government forcibly separated the two in 1868.',
            ],
            cult: 'Usa Jingū in Kyushu; Iwashimizu near Kyoto; Tsurugaoka Hachimangū at Kamakura.',
            interpretatio: 'The clearest instance in this table of a god who was simultaneously and officially a figure in two religions.',
        },
        {
            slug: 'jupiter', name: 'Jupiter', native: 'IVPPITER', lang: 'latin',
            domain: 'The sky, the oath, and the Roman state', group: 'roman',
            exposition: [
                'The name is the oldest word in this table still in ordinary use: Dyēu-pəter, sky father, the same ancestor as Zeus, Dyaus and Týr. But the Roman god is not Zeus in a toga — he is a magistrate. Jupiter Optimus Maximus on the Capitol is approached by formula, consulted through auspices, and bound to procedure.',
                'A place struck by lightning was fenced off as a bidental and left to him; treaties were sworn by him; and his priest, the flamen Dialis, lived under a hedge of ritual prohibitions so dense he could not sleep three nights outside his own bed or see an army in array.',
            ],
            cult: 'The Capitoline temple, shared with Juno and Minerva; the Feriae Latinae on the Alban Mount.',
            interpretatio: 'Equated with Zeus, and through Rome with Baal at Baalbek, Amun at Siwa and the Germanic thunderer of Thursday.',
        },
        {
            slug: 'venus', name: 'Venus', native: 'VENVS', lang: 'latin',
            domain: 'Desire, charm, and the ancestry of a family', group: 'roman',
            exposition: [
                'Venus began as something closer to garden charm — the noun venus means allure — and was reshaped by contact with the Greek Aphrodite into a full goddess of desire. Then politics took her: through Aeneas she is the ancestress of the Julian family, which made her the divine grandmother of Julius Caesar and Augustus.',
                'Caesar built her a temple as Venus Genetrix, mother of the line, in his new forum. It is the most successful use of a genealogy in Roman history, and the Aeneid is in part its literature.',
            ],
            cult: 'Venus Genetrix in Caesar’s forum; Venus Erycina from Sicily; the Veneralia in April.',
            interpretatio: 'Aphrodite, and behind her Astarte, Ishtar and Inanna — this cell is the western end of the portal’s longest chain.',
        },
        {
            slug: 'mars', name: 'Mars', native: 'MARS', lang: 'latin',
            domain: 'War — and, older than that, the fields', group: 'roman',
            exposition: [
                'Mars is not Ares in Latin. Ares is slaughter and the Greeks disliked him; Mars is a father of the Roman people, invoked in an old farmer’s prayer preserved by Cato to keep sickness and bad weather off the land, and honoured at the opening and closing of the campaigning season because armies and harvests share a calendar.',
                'He fathers Romulus and Remus, which makes him the ancestor of the city itself, and March is his. The Roman soldier’s god is also the Roman farmer’s, and they were generally the same man.',
            ],
            cult: 'The Campus Martius; the Salian priests’ dances in March and October; Mars Ultor in Augustus’ forum.',
            interpretatio: 'Ares by convention; matched to Týr in the Germanic week — Tuesday standing where Latin has dies Martis.',
        },
        {
            slug: 'mercury', name: 'Mercury', native: 'MERCVRIVS', lang: 'latin',
            domain: 'Trade, profit, and the crossing of borders', group: 'roman',
            exposition: [
                'His name is built on merx, merchandise: where Hermes is a boundary stone that acquired a personality, Mercury is a commercial function that acquired a god. His temple was dedicated in 495 BCE together with the guild of merchants, and his festival in May involved sprinkling goods and the merchant himself with water from his spring.',
                'He then absorbed all of Hermes — the caduceus, the winged sandals, the leading of souls — and travelled: Tacitus reports that the Germans worship Mercury above all, and the god he means is almost certainly Odin, which is why Wednesday sits where dies Mercurii does.',
            ],
            cult: 'The temple on the Aventine; Mercuralia in May; and shrines the length of the Rhine frontier.',
            interpretatio: 'Hermes outright; Odin by Roman report; and, through Hermes, the ancestor of Hermes Trismegistus.',
        },
    ],
};
