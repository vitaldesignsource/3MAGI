// powers/middleworld — the middle world scored across traditions.
//
// The daimons door tells the demotion as a narrative, entry by entry. This
// table asks the same questions of each tradition side by side, because the
// interesting differences are structural: whether the middle beings are
// morally mixed or uniformly hostile, whether they can be bargained with,
// and whether anyone is still allowed to have one of their own.
export default {
    intro: [
        'A narrative shows the fall; a table shows the shape of what fell. Each tradition below was asked the same six questions about the beings between the high god and the human world, and the answers diverge in ways the story alone does not make obvious.',
        'The column that matters most is the last one. A tradition that lets a person have a spirit of their own — a genius, a guardian, a fravashi, an inner sign — is describing something very different from one in which every middle being is an enemy, however similar the vocabulary looks from outside.',
    ],
    questions: [
        { key: 'mixed', label: 'Morally mixed?', gloss: 'Are these beings good and bad both, or uniformly one or the other?' },
        { key: 'mortal', label: 'Do they die?', gloss: 'Are they subject to death, judgement or an end?' },
        { key: 'human', label: 'Once human?', gloss: 'Can a middle being be a person who died, or a person transformed?' },
        { key: 'treat', label: 'Can be treated with?', gloss: 'Is negotiation, offering or compact legitimate — or forbidden?' },
        { key: 'ranked', label: 'Formally ranked?', gloss: 'Is there a stated hierarchy of these beings, as against a crowd?' },
        { key: 'personal', label: 'One of your own?', gloss: 'Does the tradition give an individual a companion spirit?' },
    ],
    traditions: [
        {
            key: 'archaic-greek', label: 'Archaic Greece', era: 'Hesiod, 8th–7th c. BCE',
            cells: {
                mixed: { v: 'q', note: 'Overwhelmingly benign in Hesiod — the golden race become “givers of wealth” and watchers of justice — but the word already covers whatever unaccountable force takes a life, which is why it can also mean simply “fate.”' },
                mortal: { v: 'no', note: 'They are what remains after death, so death is behind them rather than ahead.' },
                human: { v: 'yes', note: 'Emphatically: they are dead humans promoted. This is the single largest difference from later demonology.' },
                treat: { v: 'yes', note: 'Offerings at the boundary, the hearth and the tomb — the daimon is fed, not exorcized.' },
                ranked: { v: 'no', note: 'A crowd of thirty thousand, not a hierarchy. Ranking arrives with the philosophers.' },
                personal: { v: 'q', note: 'Not yet systematically; the personal daimon becomes explicit with Socrates and is formalized by the Platonists.' },
            },
        },
        {
            key: 'platonist', label: 'Platonism & Theurgy', era: 'Plato to Iamblichus, 4th c. BCE–4th c. CE',
            cells: {
                mixed: { v: 'yes', note: 'Iamblichus insists the classes can be told apart by their effects — gods bring stillness, lesser beings agitate — which presumes both kinds exist and can be met.' },
                mortal: { v: 'no', note: 'The middle beings are longer-lived than men and are not subject to human death.' },
                human: { v: 'q', note: 'The soul may ascend into the daimonic order, which makes the boundary permeable upward rather than a matter of species.' },
                treat: { v: 'yes', note: 'Theurgy is precisely the technique for it, and the De mysteriis is a defence of the practice against the charge that it is mere trafficking.' },
                ranked: { v: 'yes', note: 'Gods, archangels, angels, daimones, heroes, archons, souls — the taxonomy that the Renaissance magi inherit through Ficino.' },
                personal: { v: 'yes', note: 'The personal daimon is a doctrine here, with treatises devoted to Socrates’ case by Plutarch and Apuleius.' },
            },
        },
        {
            key: 'enochic', label: 'Enochic Judaism', era: '3rd c. BCE onward',
            cells: {
                mixed: { v: 'no', note: 'The spirits of the giants are uniformly hostile — “they afflict, oppress, destroy” — because they are contamination rather than creation.' },
                mortal: { v: 'q', note: 'They persist until the judgement, which is an end appointed but not yet arrived: a suspended sentence rather than immortality.' },
                human: { v: 'q', note: 'Half: they are the ghosts of a hybrid race, human on the mother’s side. That genealogy is the whole explanation of where they come from.' },
                treat: { v: 'no', note: 'Binding and adjuration, not offering. The Qumran incantations are defensive throughout.' },
                ranked: { v: 'yes', note: 'The Watchers have named leaders and a chain of command — which is exactly what makes their fall a mutiny.' },
                personal: { v: 'no', note: 'Guardianship belongs to the angels here, not to the middle spirits; the two classes are kept firmly apart.' },
            },
        },
        {
            key: 'zoroastrian', label: 'Zoroastrian Iran', era: 'Old Avestan onward',
            cells: {
                mixed: { v: 'no', note: 'The sharpest dualism in the table: daevas belong to the Lie, yazatas to the Truth, and the confession of faith includes renouncing the first.' },
                mortal: { v: 'q', note: 'They are to be defeated at the Renovation rather than to die in the ordinary sense.' },
                human: { v: 'no', note: 'The daevas are not the dead. Human souls have their own order entirely — the fravashis, who fight on the side of order.' },
                treat: { v: 'no', note: 'Worship of daevas is the defining apostasy; there is no legitimate transaction with them.' },
                ranked: { v: 'yes', note: 'Amesha Spentas, yazatas, fravashis on one side, and a mirrored hierarchy of daevas on the other.' },
                personal: { v: 'yes', note: 'The fravashi — each person’s pre-existent guardian soul, honoured at the year’s end. One of the oldest personal-spirit doctrines anywhere.' },
            },
        },
        {
            key: 'christian', label: 'Christian Late Antiquity', era: '2nd–5th c. CE',
            cells: {
                mixed: { v: 'no', note: 'The apologists’ move is precisely to collapse the category: every daimon is a fallen spirit, and the gods of the nations are among them.' },
                mortal: { v: 'no', note: 'They await judgement rather than death, which is the Enochic scheme inherited whole.' },
                human: { v: 'no', note: 'Explicitly not the dead — impersonating the dead is one of the charges laid against them, since the alternative would concede necromancy works.' },
                treat: { v: 'no', note: 'Sacrifice to them is the sin at issue in 1 Corinthians 10; exorcism replaces negotiation entirely.' },
                ranked: { v: 'yes', note: 'The fallen are ranked as a mirror of the nine choirs, an ordering the medieval demonologies elaborate at length.' },
                personal: { v: 'yes', note: 'But under a new name: the guardian angel takes the personal office, and the daimon keeps only the hostile half. The office survives; the word does not.' },
            },
        },
        {
            key: 'islamic', label: 'Islam', era: '7th c. CE onward',
            cells: {
                mixed: { v: 'yes', note: 'The most explicit answer in the table: a whole sura opens with jinn who overhear the recitation and believe. Some are Muslim, some are not, and they say so themselves.' },
                mortal: { v: 'yes', note: 'They live long and they die, and they are raised for judgement like anyone else — the only row in this table where the middle beings are simply mortal.' },
                human: { v: 'no', note: 'A separate creation entirely — of smokeless fire, where humanity is of clay. Not the dead, and not a hybrid.' },
                treat: { v: 'q', note: 'They can be dealt with as neighbours are, and there is a jurisprudence of it — marriage, property, injury — but seeking power through them is condemned.' },
                ranked: { v: 'no', note: 'They have tribes and rulers rather than a cosmic hierarchy; the ranking in Islam belongs to the angels.' },
                personal: { v: 'yes', note: 'Every person is said to have a qarin, a jinn companion — and the hadith that the Prophet’s had submitted is among the most discussed sentences on the subject.' },
            },
        },
        {
            key: 'roman', label: 'Roman Household Religion', era: 'Republic and Empire',
            cells: {
                mixed: { v: 'q', note: 'The lares and the genius are benign; the lemures and larvae, the restless dead, are not — and the Lemuria in May exists to put them out of the house.' },
                mortal: { v: 'no', note: 'The household spirits persist with the household, which is rather the point of them.' },
                human: { v: 'yes', note: 'The di manes are the ancestral dead as a class, and the lares are widely understood as ancestors kept at the hearth.' },
                treat: { v: 'yes', note: 'Daily, and by exact formula: wine, incense, a portion at the meal. Roman religion is transactional without apology.' },
                ranked: { v: 'no', note: 'Offices rather than ranks — the genius of a man, of a place, of a legion, of the emperor.' },
                personal: { v: 'yes', note: 'The genius for a man and the iuno for a woman, honoured on the birthday and sworn by. The direct ancestor of the guardian angel’s job description.' },
            },
        },
        {
            key: 'grimoire', label: 'European Grimoires', era: '13th–18th c. CE',
            cells: {
                mixed: { v: 'q', note: 'Doctrinally the spirits are fallen; operationally the texts sort them into helpful and dangerous and give each an office, which is a distinction the theology does not license.' },
                mortal: { v: 'no', note: 'Bound until judgement, per the inherited scheme.' },
                human: { v: 'no', note: 'Not the dead — though the necromantic literature that does traffic with the dead sits on the same shelf and was condemned together with it.' },
                treat: { v: 'q', note: 'The operator commands rather than bargains, and in divine names — which is either an exorcism run backwards or exactly what the church said it was.' },
                ranked: { v: 'yes', note: 'Obsessively: kings, dukes, presidents, marquises, each with a seal and a legion count. The Goetia is an administrative document as much as a magical one.' },
                personal: { v: 'q', note: 'The Abramelin operation aims at knowledge and conversation of the Holy Guardian Angel — the personal spirit recovered as the whole goal of the work.' },
            },
        },
        {
            key: 'modern', label: 'The Modern Recovery', era: '19th–20th c.',
            cells: {
                mixed: { v: 'yes', note: 'Goethe’s Dämonische is neither good nor evil but ungovernable, and Jung insisted the figures he met were autonomous without being demons.' },
                mortal: { v: 'q', note: 'The question changes shape: what is at stake is whether they are real independently of the psyche, which is the live argument rather than a settled answer.' },
                human: { v: 'q', note: 'Yeats’s anti-self is drawn from human material; Jung’s Philemon insisted he was not Jung. The traditions here disagree with each other.' },
                treat: { v: 'yes', note: 'Active imagination is a technique for exactly that, and its practitioners describe it in terms a theurgist would recognize.' },
                ranked: { v: 'no', note: 'Deliberately not: the modern recovery is anti-systematic, and treats the ladders as historical artefacts rather than maps.' },
                personal: { v: 'yes', note: 'This is the whole of it. After two thousand years of demotion, the daimon comes back precisely as the thing that is one’s own — vocation, genius, the voice that will not permit otherwise.' },
            },
        },
    ],
    legend: '● yes · ◐ qualified — open the row for how · a dot means no. Every qualified answer carries its qualification, because in this table the qualifications are the content.',
};
