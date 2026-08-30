// powers/daimons — the middle world, and the long demotion. Each entry gives
// the source, then what shifted, because the interest here is diachronic: the
// same beings keep changing rank as the ladders are rebuilt around them.
export default {
    intro: [
        'The daimon did not begin as a demon. In Hesiod the men of the golden race become, at death, daimones — guardians who walk the earth wrapped in mist, watching over justice and giving wealth. In Plato’s Symposium, Diotima defines the whole class: everything daimonic is between god and mortal, and by it the universe is bound together, for gods do not mix with men directly. The middle world was the traffic.',
        'What follows is the story of how that middle world was pushed downward — by the Watchers’ giants becoming spirits, by Jewish and Christian apologists reclassifying the pagan gods, by Persia inverting its own word for “god,” and by the Septuagint choosing one Greek word for a Hebrew one. Every demotion here happened in a document that survives, and this door is the record of those documents.',
    ],
    entries: [
        {
            slug: 'hesiodic-guardians', name: 'The Golden Race', era: 'c. 700 BCE', tradition: 'Greek',
            exposition: [
                'Hesiod’s Works and Days gives the oldest surviving account of what a daimon is: the men of the golden age, when they were covered by the earth, became pure spirits — “givers of wealth,” watchers of judgements and cruel deeds, moving over the earth clothed in mist. They are dead humans promoted, benevolent, and thirty thousand strong.',
                'Nothing in the description is sinister. That the same word will be spelled “demon” in English is one of the longest semantic falls any word has taken, and it begins here, at the top.',
            ],
            source: 'Hesiod, Works and Days 121–126.',
            shift: 'From honoured dead to “the demons”: the fall takes a thousand years and three traditions to complete.',
        },
        {
            slug: 'socratic-sign', name: 'The Sign of Socrates', era: '5th century BCE', tradition: 'Greek',
            exposition: [
                'Socrates had a daimonion — a divine something — that had spoken to him since childhood and that only ever forbade, never commanded. It stopped him from entering politics; on the last morning, as he tells the jury, it did not stop him at all, which he takes as evidence that death is no evil.',
                'The charge that killed him was “introducing new daimonia,” so this inner voice is not a footnote to his trial but part of the indictment. Later Platonists wrote treatises on it — Plutarch and Apuleius both — asking whether it was a guardian daimon, the mind at its purest, or a personal god.',
            ],
            source: 'Plato, Apology 31c–d and 40a–c; Xenophon, Memorabilia I.1; Plutarch, On the Sign of Socrates.',
            shift: 'The daimon turned inward — the ancestor of the guardian angel, the genius, the conscience, and every later argument about which of those it was.',
        },
        {
            slug: 'diotima-between', name: 'Diotima’s Definition', era: 'c. 385 BCE', tradition: 'Greek (Platonic)',
            exposition: [
                'In the Symposium, Diotima tells Socrates that Love is not a god but a great daimon, and gives the class its charter: the daimonic is between the divine and the mortal, interpreting and conveying — prayers and sacrifices upward, commands and answers downward — and because god does not mingle with man, all divination and all priestcraft runs through this middle.',
                'This is the doctrine every later mediating hierarchy assumes, pagan and Christian alike. When Pseudo-Dionysius arranges his angels to pass light down rank by rank, he is arguing inside Diotima’s frame.',
            ],
            source: 'Plato, Symposium 202d–203a.',
            shift: 'From a scattered folk-belief to a philosophical office — after this, the middle world has a job description.',
        },
        {
            slug: 'watchers-ghosts', name: 'The Giants’ Ghosts', era: '3rd century BCE', tradition: 'Jewish (Enochic)',
            exposition: [
                'The Book of the Watchers answers the question the Bible leaves hanging — where do evil spirits come from? — with a genealogy: the fallen Watchers fathered giants on human women; the giants were destroyed; and the spirits that came out of their bodies remain on the earth, called evil spirits, afflicting, corrupting, and casting down without eating, because they are the disembodied dead of a hybrid race.',
                'It is a demonology built to protect God’s justice: evil spirits are not creatures God made evil but a contamination left by a broken chain of command. The scheme is assumed throughout the Gospels’ exorcisms and the Qumran incantations alike.',
            ],
            source: '1 Enoch 15:8–12; the same tradition in Jubilees 10.',
            shift: 'The word “spirit” acquires a class of beings that are neither gods nor angels nor human — and are all hostile.',
        },
        {
            slug: 'septuagint-choice', name: 'A Translator’s Decision', era: '3rd–2nd centuries BCE', tradition: 'Jewish (Greek Bible)',
            exposition: [
                'When the Hebrew scriptures were rendered into Greek in Alexandria, the translators needed a word for the shedim and other beings the psalms say the nations sacrificed to. They chose daimonia. Psalm 96:5 in the Greek then reads: “all the gods of the nations are daimonia” — where the Hebrew has elilim, worthless things, idols.',
                'That single lexical choice, multiplied across the Greek Bible and inherited by the New Testament writers, is arguably the hinge of the whole story. After it, a Greek-speaking Christian reading “daimon” hears not Hesiod’s guardian but a false god with a hostile will.',
            ],
            source: 'Septuagint Psalm 95:5 (96:5 in Hebrew numbering); Deuteronomy 32:17; 1 Corinthians 10:20, which follows the Greek.',
            shift: 'The decisive demotion — a translation choice that turned the ancient middle class of beings into the enemy.',
        },
        {
            slug: 'apologists-gods', name: 'The Apologists’ Charge', era: '2nd–4th centuries CE', tradition: 'Christian',
            exposition: [
                'Justin Martyr, Tertullian and Augustine did not argue that the pagan gods were nothing. They argued that they were daimones: real beings, the offspring or agents of the fallen, feeding on sacrificial smoke, inspiring the oracles, and impersonating the dead. The Christian claim was not “your gods do not exist” but “your gods are the wrong kind of being.”',
                'Augustine devotes books of the City of God to it, arguing against Apuleius that no daimon can be a good mediator because the only mediator is Christ. The pagan philosophers replied that the Christians simply could not tell a god from a daimon — precisely Iamblichus’ complaint.',
            ],
            source: 'Justin, First Apology 5; Tertullian, Apology 22–23; Augustine, City of God VIII–IX.',
            shift: 'Every foreign god is reclassified as a demon — the theological move that made the word’s modern sense inevitable.',
        },
        {
            slug: 'daeva-inversion', name: 'The Persian Inversion', era: 'Old Avestan', tradition: 'Zoroastrian',
            exposition: [
                'The Indo-Iranians shared a word for the shining gods: Sanskrit deva, Avestan daeva. In India the devas are the gods. In Zoroastrian Iran the daevas are demons — the beings the Gathas denounce, whose worship is the choice of the Lie, and whose renunciation is part of the confession of faith.',
                'The mirror runs both ways: the Iranian word for a great god, ahura, is Sanskrit asura, which in later India means the gods’ demonic adversaries. Two branches of one family, each other’s gods filed as devils — the clearest surviving proof that “demon” is often just a foreign god with the polemic still attached.',
            ],
            source: 'The Gathas (Yasna 32); the Vendidad’s catalogue of daevas; compare Rigveda passim for deva.',
            shift: 'Not a demotion but an inversion — and the case that explains all the others.',
        },
        {
            slug: 'jinn', name: 'The Jinn', era: '7th century CE onward', tradition: 'Islamic',
            exposition: [
                'Islam did not demote the middle world; it kept it and gave it law. The jinn are created of smokeless fire, live in societies, marry, die, and are morally accountable — some Muslim, some not, some in between. A whole sura is named for them, opening with a company of jinn who overhear the Quran and believe.',
                'This is the most unusual position in this door: a scriptural tradition that preserved the ancient middle class of beings as neighbours rather than converting them into enemies. Iblis is one of them, but he is a criminal, not a species.',
            ],
            source: 'Qur’an 72 (Surat al-Jinn); 55:15; 6:130; 18:50.',
            shift: 'The road not taken: the middle world kept, moralized, and left legally responsible for itself.',
        },
        {
            slug: 'iamblichean-defence', name: 'Iamblichus’ Field Guide', era: 'c. 300 CE', tradition: 'Neoplatonist',
            exposition: [
                'Against the suspicion that theurgists were simply trafficking with spirits, Iamblichus insisted the classes could be told apart — by the quality of the light, the effect on the body, the order or disorder the epiphany leaves behind. Gods bring stillness and unity; daimones agitate; the difference is empirical, in the sense that a trained practitioner can be trained to it.',
                'The stakes were survival: if there is no difference between a god and a daimon, the Christian charge lands. The De mysteriis is late paganism’s most rigorous attempt to keep the middle world honourable.',
            ],
            source: 'Iamblichus, De mysteriis II.3–9.',
            shift: 'The last systematic defence of the daimon as a good and necessary being, written as the classification was already changing under it.',
        },
        {
            slug: 'genius-and-guardian', name: 'The Genius and the Guardian Angel', era: 'Roman and after', tradition: 'Roman · Christian',
            exposition: [
                'Every Roman man had a genius and every woman a iuno — the personal spirit of his or her generative power, honoured on birthdays with wine and incense, and sworn by. Every place had one too: the genius loci, whose altar you did not disturb.',
                'The office survived the conversion with a new name. Christian tradition reads “their angels always behold the face of my Father” as the guardian angel’s charter, and Basil, Jerome and eventually the Catechism affirm the individual guardian. The vocabulary of the pagan middle world was condemned and its structure kept.',
            ],
            source: 'Horace, Epistles II.2.187 for the genius; Matthew 18:10 and Acts 12:15 for the Christian reading; Basil, Against Eunomius III.1.',
            shift: 'Continuity under a new name — the clearest case of a daimonic office surviving the demotion intact.',
        },
        {
            slug: 'grimoire-spirits', name: 'The Spirits of the Grimoires', era: '13th–18th centuries CE', tradition: 'Medieval and early modern Europe',
            exposition: [
                'The magical literature of Christian Europe inherited the whole demoted middle world and put it to work: the Ars Notoria for memory, the Sworn Book of Honorius for the vision of God, the Clavicula Salomonis for the seals, and the Goetia — first book of the Lemegeton — for its seventy-two spirits, each with a rank, a seal, and a legion count, called into a triangle outside the circle.',
                'The theology is strained on purpose: the operator commands in divine names, which makes the rite either an exorcism running in reverse or exactly what the church said it was. Weyer’s Pseudomonarchia daemonum of 1577 printed the catalogue while arguing for mercy toward accused witches — a demonology written to reduce the killing.',
            ],
            source: 'Lemegeton Clavicula Salomonis (17th-century manuscripts of older material); Johann Weyer, Pseudomonarchia daemonum (1577); Ars Notoria, 13th century.',
            shift: 'The demoted beings become an administrative catalogue — named, ranked, sealed, and above all listed.',
        },
        {
            slug: 'daimon-modern', name: 'The Daimon Recovered', era: '19th–20th centuries', tradition: 'Modern',
            exposition: [
                'The word came back up. Goethe wrote of the Dämonische as the ungovernable force in a life; Yeats built a system on the anti-self he called the Daimon; Jung recovered Abraxas and the figure of Philemon and insisted he had not invented him. Twentieth-century writers on vocation reached for the same word for the thing that will not let a person do otherwise.',
                'Whether this is a recovery of Hesiod’s guardian or a metaphor wearing its clothes is exactly the argument, and both sides are worth reading. What is certain is that after two thousand years of demotion, the daimon was readmitted to serious conversation — in psychology and poetry rather than theology.',
            ],
            source: 'Goethe, Dichtung und Wahrheit XX; Yeats, Per Amica Silentia Lunae (1917); Jung, Seven Sermons to the Dead (1916) and Memories, Dreams, Reflections.',
            shift: 'The long fall reversed, at least in the language of the inner life.',
        },
    ],
};
