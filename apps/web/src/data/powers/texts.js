// powers/texts — the primary works. Each carries its dating with the dispute
// stated, what it actually contains, and where a reader can get at it.
export default {
    intro: [
        'Everything in this portal rests on documents, and the documents are of wildly different kinds: a poem recited at a New Year festival, a book of astronomy attributed to a man who did not die, a Syrian monk’s forgery that ruled Christian angelology for a millennium, a bundle of Greek spell-recipes recovered from an Egyptian tomb.',
        'What follows is the shelf. Datings give the scholarly reckoning and, where the tradition dates a work differently, both — because a book’s claimed age is itself part of its history.',
    ],
    entries: [
        {
            slug: 'enuma-elish', name: 'Enūma Eliš', native: '𒂊𒉡𒈠𒂊𒇺', lang: 'cuneiform',
            dating: 'Composed probably in the later second millennium BCE; the fullest copies come from Ashurbanipal’s library, 7th century BCE',
            tradition: 'Babylonian',
            exposition: [
                'Seven tablets, opening “when on high” — the sky not yet named, the earth not yet named — and running from the first mingling of fresh and salt water to Marduk’s coronation and the recitation of his fifty names. Tiamat is split to make the vault; humanity is fashioned from the blood of the rebel Kingu to do the gods’ labour so the gods can rest.',
                'It was read aloud on the fourth day of the Babylonian New Year festival, in the temple, with the king present. That liturgical setting is the key to the poem: it is not myth in the sense of a story told for pleasure, but a charter recited annually to keep the world and its kingship in force.',
            ],
            carries: 'The creation of the ordered world by combat; the transfer of supreme office from the old gods to a city’s patron; the reason humanity exists.',
            access: 'Recovered by George Smith at the British Museum in the 1870s; standard translations in Lambert’s Babylonian Creation Myths (2013) and Foster’s Before the Muses.',
        },
        {
            slug: 'book-of-watchers', name: 'The Book of the Watchers', native: null, lang: null,
            dating: 'Third century BCE, established by the Aramaic fragments from Qumran cave 4',
            tradition: 'Jewish (Enochic)',
            exposition: [
                'The first thirty-six chapters of 1 Enoch, and the fountainhead of Western angelology: the descent of two hundred watchers under Shemihazah, the oath on Hermon, the teaching of metallurgy, cosmetics, sorcery and astrology, the giants and their devastation, the appeal of the four archangels, the binding of Azazel, and Enoch’s own tour of the ends of the earth and the places prepared for the dead.',
                'The whole work survives complete only in Ge‘ez, preserved by the Ethiopian church, which canonized it; the Aramaic originals came back in fragments from the Dead Sea caves. Jude quotes it as prophecy, which makes it the only book cited as scripture inside the New Testament that most churches do not accept as scripture.',
            ],
            carries: 'Named archangels; the fall of the watchers; the origin of evil spirits; the first heavenly journey with an angelic guide.',
            access: 'Nickelsburg’s Hermeneia commentary is the standard; the Ethiopic text is canonical in the Tewahedo churches and stands on the Scriptorium’s Ge‘ez shelf.',
        },
        {
            slug: 'sefer-hekhalot', name: 'Sefer Hekhalot (3 Enoch)', native: 'ספר היכלות', lang: 'hebrew',
            dating: 'Redacted between the 5th and 9th centuries CE from older traditions; the text presents itself as R. Ishmael’s, 2nd century',
            tradition: 'Jewish (merkavah)',
            exposition: [
                'Rabbi Ishmael ascends, is met at the seventh palace, and is shown the court by Metatron, who explains that he was once Enoch son of Jared: taken up, enlarged to the measure of the world, crowned, and set on a throne at the door of the seventh hall. The book is the fullest surviving account of the transformation of a man into the highest of the angels.',
                'It also preserves its own warning: the story of Aḥer, who saw Metatron seated and concluded there were two powers in heaven. The tradition kept the danger in the text rather than editing it out.',
            ],
            carries: 'The seven palaces; Metatron’s seventy names and enthronement; the seals and songs of ascent.',
            access: 'Odeberg’s edition and Alexander’s translation in Charlesworth; Schäfer’s Synopse zur Hekhalot-Literatur for the manuscript reality behind the printed “books.”',
        },
        {
            slug: 'celestial-hierarchy', name: 'De caelesti hierarchia', native: 'Περὶ τῆς οὐρανίας ἱεραρχίας', lang: 'greek',
            dating: 'Around 500 CE; first cited in 532. The author writes as Paul’s convert of Acts 17, first century',
            tradition: 'Christian (Greek)',
            exposition: [
                'The book that fixed the nine choirs. Its author, writing in Greek saturated with Proclus, arranges the angels in three triads and explains the whole arrangement as a hierarchy of illumination: each rank receives light in the measure it can bear and passes it down. He also coins the word hierarchia to say it.',
                'The pseudonym gave the work near-apostolic authority for a thousand years. When Renaissance scholars — Valla and Erasmus among them — showed the attribution could not stand, the angelology survived the demolition of its author’s credentials almost untouched, which is itself a fact about how doctrine holds.',
            ],
            carries: 'Seraphim to angels in nine ranks; the theology of mediated light; the vocabulary of hierarchy itself.',
            access: 'Luibheid’s Classics of Western Spirituality translation; Eriugena’s ninth-century Latin version is what the medieval West actually read.',
        },
        {
            slug: 'greek-magical-papyri', name: 'The Greek Magical Papyri', native: 'Παπυρὶ Γραικαὶ Μαγικαί', lang: 'greek',
            dating: 'Manuscripts 2nd century BCE–5th century CE; the great cache assembled in Egypt and dispersed in the 19th century',
            tradition: 'Greco-Egyptian',
            exposition: [
                'Working manuals, not treatises: recipes for dream-oracles, bindings, protections, and the summoning of a personal daimon, written by practitioners who cheerfully mixed Greek gods, Egyptian gods, Jewish divine names and pure vowel-strings in a single formula. Iao, Sabaoth, Abrasax and Osiris share a page without apology.',
                'They are the best evidence we have for what ancient religion looked like at the level of practice rather than doctrine — and the reason the Scriptorium’s Greek hall carries them too: this portal and that one meet on these pages.',
            ],
            carries: 'The names actually invoked; the technique of the assistant daimon; the vowel-chains and the voces magicae.',
            access: 'Betz, The Greek Magical Papyri in Translation (2nd ed. 1992), the standard English collection.',
        },
        {
            slug: 'apocryphon-of-john', name: 'The Apocryphon of John', native: null, lang: null,
            dating: 'Composed 2nd century CE; the Nag Hammadi copies are 4th-century Coptic',
            tradition: 'Gnostic (Sethian)',
            exposition: [
                'The fullest account of the gnostic cosmos: the unknowable Invisible Spirit, the emanation of the aeons, Sophia’s solitary act, the birth of the lion-faced Yaldabaoth, his boast that there is no god beside him, the answer from above — “you are mistaken, Samael” — and the making of Adam by three hundred and sixty-five angels, each named, each responsible for a part of the body.',
                'Irenaeus knew a version of it around 180, which anchors the dating; four copies survived in the jar at Nag Hammadi, so it was central to whoever buried them.',
            ],
            carries: 'The aeons and archons; the demiurge’s ignorance; the divine spark in matter; the ascent past the planetary rulers.',
            access: 'Meyer’s Nag Hammadi Scriptures; the Berlin Codex preserves an independent version.',
        },
        {
            slug: 'de-mysteriis', name: 'De mysteriis', native: null, lang: null,
            dating: 'Around 300 CE',
            tradition: 'Neoplatonist',
            exposition: [
                'Porphyry wrote to an Egyptian priest with sceptical questions about ritual: if the gods are impassive, why do rites move them? Iamblichus answered in the persona of Abamon, and the reply became the manifesto of theurgy — that the rites work not by persuading the gods but because the gods themselves seeded matter with tokens that draw the soul upward.',
                'Along the way he set out the full taxonomy of the unseen — gods, archangels, angels, daimones, heroes, archons, souls — with the signs by which each is recognized. It is the classification the Renaissance magi inherited when Ficino translated it.',
            ],
            carries: 'The defence of ritual; the classes of divine beings and how to tell them apart; the theory of the token in matter.',
            access: 'Clarke, Dillon and Hershbell’s translation (2003); Ficino’s 1497 Latin made it available to the Renaissance.',
        },
        {
            slug: 'sefer-raziel', name: 'Sefer Raziel ha-Malakh', native: 'ספר רזיאל המלאך', lang: 'hebrew',
            dating: 'Compiled from materials of the 12th–13th centuries and earlier; printed Amsterdam 1701',
            tradition: 'Jewish (esoteric)',
            exposition: [
                'A composite: angelic names and seals, astrological and calendrical material, protective formulae, and the legend of its own transmission — the book Raziel gave Adam, stolen by jealous angels, thrown into the sea, recovered for Noah, inherited by Solomon.',
                'The printed edition became a household amulet: possession of the volume was believed to protect a house from fire, which meant copies were bought by people who never opened them — one of the few books in this portal whose physical presence was the point.',
            ],
            carries: 'Angel names and sigils; the transmission legend; practical protective magic.',
            access: 'The Amsterdam 1701 printing and its many reprints; discussed in Trachtenberg, Jewish Magic and Superstition.',
        },
        {
            slug: 'lemegeton', name: 'Lemegeton Clavicula Salomonis', native: null, lang: null,
            dating: 'Compiled in the 17th century from materials reaching back to the medieval Ars Notoria; the spirit-catalogue is printed by Weyer in 1577',
            tradition: 'European grimoire',
            exposition: [
                'Five books under Solomon’s name, of which the first — the Goetia — is the famous one: seventy-two spirits, each with a rank (king, duke, president, marquis), a seal to be drawn in metal, a legion count, and an office ranging from teaching languages to finding treasure. The operator stands in a circle; the spirit is constrained to a triangle outside it.',
                'Its immediate ancestor is the catalogue in Johann Weyer’s Pseudomonarchia daemonum — printed, remarkably, inside an argument for mercy toward women accused of witchcraft. Mathers and Crowley’s 1904 edition made it the reference text of the modern occult revival.',
            ],
            carries: 'The seventy-two spirits with seals and offices; the circle-and-triangle method; the whole later vocabulary of “goetia.”',
            access: 'Peterson’s critical edition (2001) is the scholarly one; the Mathers–Crowley text is the historically influential one.',
        },
        {
            slug: 'kojiki', name: 'Kojiki', native: '古事記', lang: 'cjk',
            dating: '712 CE, presented to the court by Ō no Yasumaro',
            tradition: 'Japanese',
            exposition: [
                'Japan’s oldest surviving book: the separation of heaven and earth, the island-making of Izanagi and Izanami, the death that sends her to Yomi, the purification that produces Amaterasu, Tsukuyomi and Susanoo, the cave and the mirror, the descent of the heavenly grandchild, and the lineage that runs down to the reigning house.',
                'It is compiled to legitimate that lineage — a political document as much as a sacred one — and it is also where an entire pantheon becomes readable to us. Motoori Norinaga’s vast eighteenth-century commentary made it central again after centuries of Buddhist overlay.',
            ],
            carries: 'The kami of the creation; the cave narrative; the imperial descent claim; the three regalia.',
            access: 'Philippi’s and Heldt’s translations; the Nihon Shoki of 720 gives variant versions, often side by side, which is itself instructive.',
        },
        {
            slug: 'avesta-yashts', name: 'The Yashts', native: null, lang: null,
            dating: 'Old Avestan material possibly near 1000 BCE by linguistic argument; the tradition reckons Zarathustra “258 years before Alexander”',
            tradition: 'Zoroastrian',
            exposition: [
                'Hymns to individual yazatas — Mithra of the wide pastures and the ten thousand eyes, Anahita of the waters, Tishtrya the rain-star who fights the drought-demon in the shape of a white horse, the fravashis who fight for their own descendants. They preserve Iranian religion older than the reform and carried through it.',
                'The dating gap here is the widest in this portal, and it is not a minor technicality: it decides whether Zarathustra preceded the Buddha by centuries or was roughly his contemporary. The portal states both and crowns neither.',
            ],
            carries: 'The yazatas in their own hymns; the fravashis; the fight of order against the Lie in cosmic and agricultural terms.',
            access: 'Darmesteter’s Sacred Books of the East translations remain the accessible ones; Malandra and Skjærvø for modern scholarship.',
        },
        {
            slug: 'dee-diaries', name: 'The Angelic Diaries of John Dee', native: null, lang: null,
            dating: '1582–1587, contemporaneous manuscripts',
            tradition: 'Early modern angel magic',
            exposition: [
                'Dee kept minutes. Date, hour, who was present, what the scryer reported, the letters dictated one at a time from tables the angels insisted be transcribed backwards to render them safe. Out of five years of sessions came an angelic language with its own grammar, the Watchtower tables, the ninety-one parts of the earth and the Calls of the thirty Aethyrs.',
                'Casaubon printed a portion in 1659 hoping to expose the whole business as delusion or fraud; the effect was to preserve it. The Golden Dawn built the modern Enochian system on that inheritance three centuries later.',
            ],
            carries: 'The Enochian language and tables; the hierarchy of the Watchtowers; a uniquely detailed record of what angel-working actually looked like session by session.',
            access: 'Sloane MSS at the British Library; Casaubon’s A True & Faithful Relation (1659); Peterson’s John Dee’s Five Books of Mystery (2003).',
        },
    ],
};
