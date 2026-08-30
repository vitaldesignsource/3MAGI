// christianities/esoteric — the inner tradition.
//
// House disciplines apply with extra force here, because this is the door
// most easily written badly. Every current is given as its own practitioners
// stated it; what the churches ruled is recorded plainly beside it, neither
// softened nor used as a verdict; and where a claim is historically shaky —
// a forged pedigree, a legend of transmission — it is named as such rather
// than repeated. Reception is a field, not an opinion.
export default {
    intro: [
        'Every large tradition grows an inner one: a body of teaching and practice held to go further than the catechism, usually by people who insisted they were not leaving the church. Christianity’s inner tradition is unusually well documented and unusually badly served, because it is claimed by enthusiasts who overstate its unity and dismissed by historians who overstate its marginality.',
        'What follows is neither. These are currents that ran inside Christian institutions and often against them, from Alexandrian speculation on the pre-existence of souls to a Nobel-shortlisted Russian priest arguing that Wisdom is a person. Each entry gives the teaching, its sources, what the church authorities did about it, and where it stands now — and where a lineage is a legend, it says so.',
    ],
    groups: [
        { key: 'alexandrian', label: 'The Speculative Fathers', blurb: 'The first Christian intellectuals to read scripture as a body with an inside, and to follow the argument past where the later councils would allow.' },
        { key: 'apophatic', label: 'The Way of Unknowing', blurb: 'The tradition that says the last thing you can do with God is describe him — and builds a discipline out of that.' },
        { key: 'monastic', label: 'The Prayer of the Heart', blurb: 'The Eastern practice of ceaseless prayer, its physiology, and the theology of uncreated light that defended it.' },
        { key: 'renaissance', label: 'The Renaissance Synthesis', blurb: 'When Greek, Hebrew and Hermetic texts arrived together in Florence and a generation tried to fit them all inside Christianity.' },
        { key: 'theosophy', label: 'The Theosophers', blurb: 'Protestant Europe’s visionary underground: a shoemaker, a scientist, a Masonic magistrate, and the churches that could not quite expel them.' },
        { key: 'modern', label: 'The Modern Recovery', blurb: 'Sophia in Russia, Christ in anthroposophy, and the Hermetic Christianity of the twentieth century.' },
    ],
    entries: [
        {
            slug: 'alexandrian-allegory', name: 'The Alexandrian Reading', era: '2nd–3rd centuries', group: 'alexandrian',
            claim: 'Scripture has a body, a soul and a spirit, and the literal sense is only the first of them.',
            exposition: [
                'Clement and Origen inherited from Philo a way of reading that took the letter seriously and refused to stop there. Origen’s De principiis sets it out as a doctrine: as a human being is body, soul and spirit, so scripture has a bodily sense for the simple, a moral sense for the advancing, and a spiritual sense for the perfect — and some passages, he says bluntly, have no bodily sense at all, because their impossibility as history is precisely the signal to read deeper.',
                'This is the root of the whole Western inner tradition. Every later esoteric Christian reading — the fourfold sense of the medievals, the alchemists’ scriptural emblems, Swedenborg’s correspondences — is a descendant of the Alexandrian claim that the text is built to be opened.',
            ],
            sources: 'Origen, De principiis IV; Clement, Stromateis; Philo of Alexandria behind both.',
            reception: 'Never condemned as a method — Ambrose and Augustine carried it into the Latin West and the fourfold sense became standard medieval practice. Origen’s particular conclusions were another matter.',
            today: 'Universally acknowledged as the foundation of patristic exegesis, and the point where academic study and esoteric reading still share a starting position.',
        },
        {
            slug: 'apokatastasis', name: 'Apokatastasis: the Restoration of All Things', era: '3rd century onward', group: 'alexandrian',
            claim: 'That in the end all rational creatures — every soul, and on some readings the devil himself — return to God.',
            exposition: [
                'The word is from Acts 3:21, “the restoration of all things,” and Origen built on it the boldest hope in Christian theology: punishment is medicinal and therefore finite, and the end must answer to the beginning, so nothing rational is finally lost. Gregory of Nyssa held a version of it without ever being condemned for it, which is the fact that keeps the argument alive.',
                'The Emperor Justinian moved against it in 543, and the Fifth Ecumenical Council of 553 is traditionally said to have anathematized Origen — though whether those anathemas were an act of the council itself or of a preceding synod is disputed by historians, and the distinction is not academic: it decides whether the hope is heresy or merely a minority opinion. The portal keeps the dispute open because the scholarship does.',
            ],
            sources: 'Origen, De principiis; Gregory of Nyssa, De anima et resurrectione and In illud: Tunc et ipse Filius; the anathemas attached to Constantinople II (553).',
            reception: 'Condemned in Origen’s name; never condemned in Gregory’s. Formally rejected by the Catholic and most Protestant traditions, and never formally defined against in the East.',
            today: 'Argued seriously again: Balthasar’s “dare we hope,” Kallistos Ware’s cautious openness, and David Bentley Hart’s outright defence have put it back in mainstream theological debate.',
        },
        {
            slug: 'pre-existence', name: 'The Pre-existence of Souls', era: '3rd century', group: 'alexandrian',
            claim: 'That souls existed before bodies, and that embodiment follows from a prior turning away.',
            exposition: [
                'Origen’s cosmology begins with a community of rational beings contemplating God, who cool from that contemplation in varying degrees — and the degree of cooling determines whether one becomes an angel, a human being or a demon. The material world is therefore both a consequence of the fall and a school for return.',
                'It is the most systematically anathematized proposition in this door, and also the one modern readers most often encounter without knowing its source. It is not reincarnation, and Origen did not teach transmigration; the distinction is regularly lost in popular accounts, which is why it is stated here.',
            ],
            sources: 'Origen, De principiis I–II; the anathemas of 553 target it explicitly.',
            reception: 'Condemned, unambiguously, and by name. This is the clearest case in the door of a teaching the church actually ruled against rather than merely distrusted.',
            today: 'Held by no major communion. Alive in esoteric Christianity and in Latter-day Saint theology, which arrived at a version of it independently.',
        },
        {
            slug: 'dionysian-apophasis', name: 'The Divine Darkness', era: 'c. 500', group: 'apophatic',
            claim: 'God is beyond assertion and beyond denial, and the ascent ends in a darkness brighter than light.',
            exposition: [
                'The Mystical Theology is three pages long and among the most consequential documents in Christian history. Its author strips away every name from God — not merely the unworthy ones but the worthy ones, and finally the denials themselves — until the soul enters “the divine darkness” where it knows by unknowing.',
                'Written by the same Syrian who arranged the nine angelic choirs, under the borrowed name of Paul’s Athenian convert. The Renaissance proved the pseudonym; the theology outlived the proof entirely, and the negative way it charted runs straight through Eriugena, Eckhart, the Cloud author and John of the Cross.',
            ],
            sources: 'Pseudo-Dionysius, De mystica theologia and De divinis nominibus; Eriugena’s 9th-century Latin translation carried it west.',
            reception: 'Received as near-apostolic for a millennium, cited by Aquinas some seventeen hundred times, and never repudiated when the attribution collapsed.',
            today: 'Standard in Orthodox theology and in Catholic mystical theology; the founding text of Christian apophaticism.',
        },
        {
            slug: 'eriugena', name: 'Eriugena and the Division of Nature', era: '9th century', group: 'apophatic',
            claim: 'That God is not a being among beings, and that creation is God’s self-manifestation, returning at last to its source.',
            exposition: [
                'An Irishman at the Carolingian court who read Greek when almost nobody in the West could, translated Dionysius, and then wrote the Periphyseon — a systematic cosmology in which nature divides fourfold, from the uncreated creator through the created creating and created non-creating to the uncreated non-creating, which is God again as the end of all things.',
                'His God does not know himself as an object because there is nothing outside him to know him by; his creation is theophany. The system is closer to later German idealism than to anything else in the ninth century, which is part of why it was so hard to place.',
            ],
            sources: 'Eriugena, Periphyseon (De divisione naturae); his translations of Dionysius and Maximus.',
            reception: 'Condemned at Paris in 1210 and again in 1225, when Honorius III ordered copies burned — four centuries after the author’s death, and largely because the Amalricians had taken him in a pantheist direction.',
            today: 'A major figure in medieval philosophy; his influence on Eckhart and on Nicholas of Cusa is direct and acknowledged.',
        },
        {
            slug: 'eckhart', name: 'Eckhart and the Ground of the Soul', era: 'c. 1300', group: 'apophatic',
            claim: 'That there is something in the soul uncreated and uncreatable, and that God is born there.',
            exposition: [
                'A Dominican master preaching in German to nuns and beguines, using ordinary words for extraordinary claims: the birth of the Word in the soul, the ground where God and the soul are one ground, and detachment — Abgeschiedenheit — as the highest virtue, higher even than love. He asks God to rid him of God, meaning the God he has made an object.',
                'The vernacular is the danger. A Latin proposition can be qualified; a German sermon cannot, and Eckhart’s defence at Cologne was substantially that his hearers had taken literally what he meant formally.',
            ],
            sources: 'The German sermons and treatises; the Latin Opus tripartitum; the bull In agro dominico (1329).',
            reception: 'Twenty-eight propositions censured in 1329, a year after his death — seventeen as heretical, eleven as suspect. He had already submitted in advance to the church’s judgement, and the bull records that submission.',
            today: 'Never formally rehabilitated, though the Dominicans have petitioned; enormously influential on Tauler, Suso, Cusa, German idealism, and twentieth-century interfaith contemplation.',
        },
        {
            slug: 'cloud-of-unknowing', name: 'The Cloud of Unknowing', era: 'late 14th century', group: 'apophatic',
            claim: 'That God is reached by love and not by thought, through a cloud of forgetting laid over everything created.',
            exposition: [
                'An anonymous English director writing to a young contemplative: between you and God is a cloud of unknowing that no thinking will pierce, and beneath you must place a cloud of forgetting over every created thing, even the good ones, even the saints. What crosses the first cloud is “a sharp dart of longing love,” and the book recommends holding one short word in the mind — a syllable, not a meditation.',
                'It is Dionysius rendered into practical English, unmistakably a manual rather than a treatise, and its refusal of imagery is what makes it the ancestor of modern centring prayer.',
            ],
            sources: 'The Cloud of Unknowing and The Book of Privy Counselling, anonymous, Middle English; the author also translated Dionysius as Deonise Hid Divinite.',
            reception: 'Never condemned; circulated quietly in monastic and lay contemplative circles.',
            today: 'The direct source of the Centering Prayer movement of Thomas Keating and Basil Pennington, and among the most widely read of all Christian mystical texts.',
        },
        {
            slug: 'hesychasm', name: 'Hesychasm and the Jesus Prayer', era: '4th century onward', group: 'monastic',
            claim: 'That ceaseless invocation of the Name, with the mind descended into the heart, opens the person to the uncreated light.',
            exposition: [
                'From the desert: pray without ceasing, taken as an instruction rather than a figure. The practice narrows to a single sentence — Lord Jesus Christ, Son of God, have mercy on me, a sinner — repeated until it says itself, with attention placed in the heart and, in the later manuals, coordinated with the breath and a bowed posture.',
                'The physical technique is what drew the attack: Barlaam of Calabria mocked the monks as omphalopsychoi, navel-souls. What defended them was not a defence of the posture but a theology of God — see the entry beside this one.',
            ],
            sources: 'Evagrius and the Macarian homilies; John Climacus; the Philokalia, compiled 1782; The Way of a Pilgrim for its 19th-century popular diffusion.',
            reception: 'Vindicated by the Councils of Constantinople in 1341, 1347 and 1351 — a rare case of a contemplative practice formally upheld by councils.',
            today: 'Central and living in Orthodoxy, on Athos and far beyond it; widely adopted by Western Christians through the Philokalia’s translation.',
        },
        {
            slug: 'palamas-energies', name: 'The Essence and the Energies', era: '14th century', group: 'monastic',
            claim: 'That God’s essence is forever unknowable, and his energies are truly God and truly participable.',
            exposition: [
                'Gregory Palamas answered the charge against the hesychasts with a distinction: God in his essence cannot be known or shared by any creature, but God’s energies — his operations, his glory, the light of Tabor — are not created effects but God himself, and in them a human being genuinely participates in the divine.',
                'It resolves the whole difficulty. The monks were not claiming to see God’s essence, which would be blasphemy, but to be given God’s uncreated light, which is deification. The West, working with a different account of divine simplicity, has largely not accepted the distinction, and it remains among the deepest live differences between the traditions.',
            ],
            sources: 'Palamas, Triads in Defence of the Holy Hesychasts; the Hagioritic Tome; the Councils of 1341–1351.',
            reception: 'Dogma in the Orthodox churches; Palamas is commemorated on the second Sunday of Great Lent. Long rejected in Catholic theology, though contemporary Catholic scholarship treats it more sympathetically.',
            today: 'The theological foundation of Orthodox spirituality, and one of the clearest doctrinal fault lines between East and West that is not about authority.',
        },
        {
            slug: 'joachim', name: 'Joachim of Fiore and the Third Age', era: 'c. 1200', group: 'apophatic',
            claim: 'That history unfolds in three ages — of the Father, the Son, and a coming age of the Spirit.',
            exposition: [
                'A Calabrian abbot who read scripture as a set of concordances between the testaments and derived from them a periodization: the age of the Father under law, the age of the Son under grace and clergy, and a third age of the Spirit in which the church would become contemplative and the letter give way to spiritual understanding. He calculated its arrival at around 1260.',
                'The consequences were enormous and largely unintended. The Spiritual Franciscans read themselves into the third age; the schema echoes through Münzer, through Lessing and Schelling, and into every later secular three-stage philosophy of history. Aquinas argued against him; Dante put him in paradise.',
            ],
            sources: 'Joachim, Liber de Concordia, Expositio in Apocalypsim, Psalterium decem chordarum; Dante, Paradiso XII.',
            reception: 'His trinitarian treatise against Peter Lombard was condemned at Lateran IV in 1215; Joachim himself was not, and his order was explicitly protected. Later Joachimite writings were condemned at Arles in 1263.',
            today: 'A major subject in intellectual history — Löwith and Voegelin both treat modern progressive historiography as secularized Joachimism.',
        },
        {
            slug: 'christian-cabala', name: 'The Christian Cabala', era: '1486 onward', group: 'renaissance',
            claim: 'That the Jewish mystical tradition, rightly read, confirms the Trinity and the messiahship of Jesus.',
            exposition: [
                'Pico della Mirandola announced it in his nine hundred theses: no science better proves the divinity of Christ than magic and Kabbalah. Reuchlin gave it substance in De arte cabalistica and defended Jewish books against burning in the process — the most consequential act of Christian Hebraism in the period.',
                'Its central manoeuvre is the pentagrammaton: inserting shin into the Tetragrammaton to make YHShVH, read as Jesus, so that the Name itself is claimed to contain him. Jewish scholars have consistently regarded this as an appropriation rather than an interpretation, and the portal records that judgement as part of the record rather than as a footnote.',
            ],
            sources: 'Pico, Conclusiones and Oratio; Reuchlin, De verbo mirifico and De arte cabalistica; Kircher’s Oedipus Aegyptiacus for the baroque continuation.',
            reception: 'Thirteen of Pico’s theses were condemned in 1487; he was absolved by Alexander VI in 1493. Reuchlin’s defence of Jewish books cost him a decade of litigation.',
            today: 'A major field in the study of Western esotericism; the source of most Kabbalistic vocabulary in later occultism, usually at several removes and considerably garbled.',
        },
        {
            slug: 'ficino-hermetic', name: 'The Hermetic Christ', era: '1463 onward', group: 'renaissance',
            claim: 'That an ancient Egyptian theology, older than Moses, foretold Christianity and can be read alongside it.',
            exposition: [
                'Cosimo de’ Medici had Ficino set Plato aside and translate the Corpus Hermeticum first, because Hermes Trismegistus was believed a contemporary of Moses and therefore the older witness. Ficino read the Poimandres as a pagan Genesis and built from it a Christian Platonism with an astral medicine attached — planetary music, talismanic images, and a theory of spiritus linking soul to body.',
                'Casaubon dated the texts to the Roman period in 1614 and the pedigree collapsed. The tradition did not: Hermetic Christianity carried on through the seventeenth century and into the present, which is the single most instructive episode in this whole door about the relationship between a tradition’s history and its life.',
            ],
            sources: 'Ficino, Pimander (1471) and De vita coelitus comparanda; Casaubon, De rebus sacris (1614); Frances Yates’ Giordano Bruno and the Hermetic Tradition (1964) for the modern historiography.',
            reception: 'Never condemned as such; Ficino was a priest in good standing, though his astral magic drew scrutiny and he defended it carefully.',
            today: 'Foundational for the academic study of esotericism; Yates’ thesis is now heavily qualified by scholars but remains the frame most readers meet first.',
        },
        {
            slug: 'christian-alchemy', name: 'The Work as Passion', era: '15th–17th centuries', group: 'renaissance',
            claim: 'That the transmutation of metals and the redemption of the soul are one operation described twice.',
            exposition: [
                'Alchemical imagery and Christian doctrine converge so completely in this period that the emblem books cannot be sorted into the sacred and the profane: the blackening is the death, the whitening the resurrection, the stone is Christ, the vessel is the Virgin. The Rosarium philosophorum and the Aurora consurgens — a commentary on Wisdom literature attributed, disputedly, to Aquinas — read as devotional works with a laboratory attached.',
                'Whether the operations were chemical, spiritual or deliberately both is the field’s standing question. The best current scholarship resists the old split: most practitioners were doing real chemistry and meaning it theologically at the same time, and the assumption that they must have meant only one is a modern imposition.',
            ],
            sources: 'Rosarium philosophorum (1550); Aurora consurgens; Khunrath’s Amphitheatrum sapientiae aeternae (1595); Jung’s Psychology and Alchemy for the modern reading.',
            reception: 'Alchemy as such was never condemned doctrinally; particular practitioners were prosecuted for fraud, and John XXII’s Spondent quas non exhibent (1317) targets counterfeiting rather than theology.',
            today: 'A serious historical discipline — Principe and Newman have shown how much real chemistry the texts encode — and simultaneously a living spiritual practice for many readers.',
        },
        {
            slug: 'rosicrucian', name: 'The Rosicrucian Manifestos', era: '1614–1616', group: 'theosophy',
            claim: 'That an invisible brotherhood held a reformation of the whole wide world in secret, and was ready to declare it.',
            exposition: [
                'Three anonymous texts out of Lutheran Württemberg: the Fama announcing the brotherhood and the tomb of Christian Rosenkreuz found intact after a hundred and twenty years; the Confessio elaborating; and the Chymical Wedding, an alchemical romance of startling literary quality. All Europe answered them, and nobody could find the brotherhood.',
                'Johann Valentin Andreae later called the Chymical Wedding a ludibrium — a jest, or a play — and the scholarly consensus is that the manifestos were a utopian provocation from a circle around Tübingen rather than a report of an existing order. The provocation worked: every later Rosicrucian body traces itself to documents that were, by their probable author’s own account, fiction.',
            ],
            sources: 'Fama Fraternitatis (1614), Confessio Fraternitatis (1615), Chymische Hochzeit (1616); Andreae’s later writings.',
            reception: 'Attacked from both confessional sides; the manifestos are explicitly Protestant and violently anti-papal, which shaped their reception entirely.',
            today: 'The founding myth of the entire modern initiatic landscape — Rosicrucian orders, Masonic higher degrees, the Golden Dawn and their descendants.',
        },
        {
            slug: 'boehme', name: 'Jacob Böhme and the Ungrund', era: '1600–1624', group: 'theosophy',
            claim: 'That God contains an abyss without ground in which the origin of evil, and of all difference, lies.',
            exposition: [
                'A shoemaker at Görlitz saw sunlight flash on a pewter dish in 1600 and spent the rest of his life describing what it opened. His Ungrund is a groundless ground prior to God as we speak of him, in which a dark principle and a light principle stand in tension — which lets him locate the possibility of evil inside the divine life rather than blaming a creature for it.',
                'The prose is nearly impenetrable and the influence is immense: William Law in England, the Pietists in Germany, Gichtel and Pordage, Blake, Hegel and Schelling, and Berdyaev in Russia. He is the most consequential Protestant mystic and the least readable.',
            ],
            sources: 'Aurora (1612); The Way to Christ; Mysterium Magnum; De signatura rerum.',
            reception: 'Silenced by the Görlitz town council and the Lutheran pastor Gregorius Richter; his books circulated in manuscript and were printed abroad after his death.',
            today: 'A major figure in the history of philosophy — Hegel called him the first German philosopher — and a continuing presence in Christian theosophy.',
        },
        {
            slug: 'swedenborg', name: 'Swedenborg and the Correspondences', era: '1745–1772', group: 'theosophy',
            claim: 'That scripture is written throughout in correspondences, and that the spiritual world can be observed.',
            exposition: [
                'One of Europe’s leading scientists — assessor of mines, anatomist, author on metallurgy and the brain — began at fifty-seven to have visions, and spent his remaining twenty-seven years reporting the spiritual world with the same methodical prose he had used for iron and copper. Heaven and its societies, hell chosen rather than imposed, marriage continuing after death, and the whole of scripture decoded by a systematic doctrine of correspondence between natural and spiritual things.',
                'He denied the Trinity of persons, teaching instead that the one God is Jesus Christ in whom the trine is essence, and he read the Last Judgement as having occurred in the spiritual world in 1757. He never founded a church; his readers did, after his death.',
            ],
            sources: 'Arcana Coelestia (1749–56); Heaven and Hell (1758); True Christian Religion (1771).',
            reception: 'Tried for heresy in Sweden in absentia in the 1760s — the case fell on his colleagues rather than on him; his books were impounded in Gothenburg.',
            today: 'The New Church continues; his influence on Blake, Emerson, the Transcendentalists, Baudelaire, Yeats and Borges is direct and documented, and considerably larger than his denominations.',
        },
        {
            slug: 'martinism', name: 'Martinism and the Reintegration', era: '1760s onward', group: 'theosophy',
            claim: 'That humanity fell from a glorious original state and can be reintegrated into it, by rite or by the inner way.',
            exposition: [
                'Martinès de Pasqually taught a system of theurgic operations within a Masonic frame — the Élus Coëns, with invocations aimed at obtaining a visible sign of reconciliation. His pupil Louis-Claude de Saint-Martin, the Unknown Philosopher, turned away from the ceremonial toward what he called the inner way: the same reintegration sought through the heart rather than the ritual.',
                'The split between the two men is the clearest fork in Western esotericism between operative theurgy and interior mysticism, and it happened inside one lineage within a single generation.',
            ],
            sources: 'Pasqually, Traité de la réintégration des êtres; Saint-Martin, Des erreurs et de la vérité (1775) and Le Ministère de l’Homme-Esprit; Papus for the 19th-century revival.',
            reception: 'Condemned along with all Masonic bodies by successive papal bulls from 1738 onward; Saint-Martin himself remained a professing Christian throughout.',
            today: 'Martinist orders continue; Saint-Martin is read as a Christian mystic well outside esoteric circles, and Joseph de Maistre took him seriously enough to argue with at length.',
        },
        {
            slug: 'sophiology', name: 'Russian Sophiology', era: '1877–1944', group: 'modern',
            claim: 'That Wisdom — Sophia — is not merely an attribute of God but has a personal reality mediating between God and the world.',
            exposition: [
                'Vladimir Solovyov reported three visions of a feminine figure of Wisdom, in a Moscow church as a boy, in the British Museum reading room, and in the Egyptian desert, and built from them a philosophy of all-unity and Godmanhood. Florensky and Bulgakov developed it into a full theological system in which Sophia stands at the meeting of the divine and created orders.',
                'It is the most serious modern attempt to give the biblical Wisdom of Proverbs 8 a place in dogmatic theology, and it ran directly into the charge of introducing a fourth hypostasis into the Trinity.',
            ],
            sources: 'Solovyov, Lectures on Godmanhood and Three Encounters; Florensky, The Pillar and Ground of the Truth (1914); Bulgakov, The Wisdom of God and the great trilogy.',
            reception: 'Bulgakov’s sophiology was condemned by the Moscow Patriarchate and by the Karlovtsy Synod in 1935; his own bishop, Metropolitan Evlogy, defended him and no heresy was ever established against him personally.',
            today: 'A living argument in Orthodox theology, and the direct ancestor of most modern Christian language about the divine feminine.',
        },
        {
            slug: 'anthroposophy', name: 'Anthroposophy and the Cosmic Christ', era: '1913 onward', group: 'modern',
            claim: 'That spiritual research can be conducted with scientific rigour, and that the Incarnation is the turning point of cosmic evolution.',
            exposition: [
                'Rudolf Steiner left the Theosophical Society when it proclaimed Krishnamurti the vehicle of the world teacher, and founded a movement centred instead on Christ as a cosmic event: the Mystery of Golgotha as the pivot of earth evolution, with a detailed account of spiritual hierarchies drawn from Dionysius and elaborated far beyond him.',
                'The practical results are its most visible legacy and are largely independent of assent to the cosmology: Waldorf education, biodynamic agriculture, anthroposophic medicine, and the Camphill communities. The Christian Community, founded in 1922 with Steiner’s help, is a distinct church with its own sacramental rite.',
            ],
            sources: 'Steiner, Occult Science: An Outline; Christianity as Mystical Fact; The Fifth Gospel lectures.',
            reception: 'Rejected by the mainstream churches; the Catholic Church has warned against it repeatedly. The Christian Community is not in communion with any historic church.',
            today: 'The most institutionally successful esoteric Christianity of the modern era, measured in schools, farms and clinics rather than in adherents.',
        },
        {
            slug: 'tomberg-tarot', name: 'The Hermetic Christianity of the Meditations', era: '1967, published 1980', group: 'modern',
            claim: 'That the Hermetic tradition finds its completion, rather than its rival, in Catholic Christianity.',
            exposition: [
                'Valentin Tomberg — an anthroposophist who converted to Catholicism — wrote twenty-two letters on the major arcana of the Tarot and left instructions that they appear anonymously and only after his death. They are not a divinatory manual: the cards are used as a sequence of meditations on Christian mysteries, read through Hermetic, kabbalistic and Catholic sources at once.',
                'The book’s standing is genuinely unusual: it carries an afterword by Hans Urs von Balthasar, one of the most eminent Catholic theologians of the century — a fact its admirers cite as endorsement and its critics note was never a magisterial approval of anything.',
            ],
            sources: 'Meditations on the Tarot: A Journey into Christian Hermeticism, published anonymously in French in 1980; Balthasar’s afterword.',
            reception: 'No formal condemnation; regarded with suspicion by traditionalists and with interest by others. The Balthasar afterword is contested ground in both directions.',
            today: 'The most widely read work of esoteric Christianity written in the twentieth century, and the clearest modern statement of a Hermetic Christianity that claims to be orthodox.',
        },
        {
            slug: 'gnostic-revival', name: 'The Gnostic Revival', era: '1890 onward', group: 'modern',
            claim: 'That the suppressed gnostic strand carries something Christianity needs, and that it can be recovered.',
            exposition: [
                'G. R. S. Mead translated Pistis Sophia and made the gnostics readable in English; Jung bought a Nag Hammadi codex for his institute, wrote the Seven Sermons to the Dead under Basilides’ name, and read the gnostic material as a psychological document of the first order. Then in 1945 the actual library came out of the ground and the argument changed from speculation to philology.',
                'What the revival wants varies sharply. Some want a lost church restored; some want a corrective to a tradition they find too external; some, following Jung, want the material as psychology and are indifferent to its religious claims. These are different projects and the portal does not merge them.',
            ],
            sources: 'Mead, Fragments of a Faith Forgotten (1900); Jung, Seven Sermons to the Dead (1916) and Aion; the Nag Hammadi library from 1945; Pagels, The Gnostic Gospels (1979).',
            reception: 'Historic churches regard the ancient movements as heresies and the modern revival as a novelty; the Ecclesia Gnostica and related bodies exist regardless.',
            today: 'Academically flourishing, and the source of most popular ideas about “lost gospels” — usually at a considerable distance from what the codices actually say.',
        },
    ],
};
