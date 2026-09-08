// christianities/rosicrucian — the dedicated page behind the Rose and the Cross.
//
// The current itself lives in esoteric.js and is not duplicated here. What
// this file carries is the material the entry list cannot hold: the three
// founding texts set beside each other as physical books, and a ledger that
// states, claim by claim, what the record will bear. The section's own rule
// applies with force — every claim is given as its holders make it, and the
// standing beside it is the evidence, not an opinion about the people.
export default {
    kicker: 'Christianities · The Inner Tradition',
    title: 'The Rose and the Cross',
    intro: [
        'Between 1614 and 1616 three anonymous pamphlets came out of Lutheran Württemberg announcing a secret brotherhood, a hundred and twenty years old, holding the reformation of the whole wide world and ready at last to declare it. Europe answered in print — several hundred books and open letters within a decade — and nobody found them.',
        'Almost everything written about the Rosicrucians since has failed in one of two directions: taking the brotherhood at its word, or dismissing the whole thing as a hoax and stopping there. Both are wrong, and the second is now the commoner error. There was no order. There was, demonstrably, a movement — and the search for a brotherhood that did not exist built Freemasonry’s higher degrees, the Golden Dawn, and a good deal of what the modern West means by initiation.',
    ],
    manifestoIntro: 'Three books, two cities, two languages, three years. Only the third has an author who admitted to it.',
    manifestos: [
        {
            slug: 'fama',
            title: 'Fama Fraternitatis',
            sub: 'The Report of the Brotherhood',
            year: '1614',
            place: 'Kassel',
            printer: 'Wilhelm Wessel',
            language: 'German',
            circulating: 'In manuscript from about 1610',
            says: 'Tells the life of Christian Rosenkreuz — his travels to Damascus, Damcar, Egypt and Fez, the brotherhood of eight he founded on his return, his death at a hundred and six — and the finding of his tomb, intact, a hundred and twenty years later. Calls for the learned of Europe to join a general reformation.',
            authorship: 'Anonymous. Placed by scholarship with a circle at Tübingen around Andreae, Tobias Hess and Christoph Besold; no one hand is demonstrable.',
            oddity: 'It was not published alone. The 1614 volume opens with the *Allgemeine und General Reformation* — a German rendering of a satire by Trajano Boccalini in which Apollo summons the sages to reform the world and the whole enterprise collapses into farce. The founding document of Rosicrucianism went to press as an appendix to a joke about the impossibility of reforming anything.',
        },
        {
            slug: 'confessio',
            title: 'Confessio Fraternitatis',
            sub: 'The Confession of the Brotherhood',
            year: '1615',
            place: 'Kassel',
            printer: 'Wilhelm Wessel',
            language: 'Latin, with a German edition following',
            circulating: 'Printed with a second edition of the Fama',
            says: 'The doctrinal companion. Gives Rosenkreuz’s birth year as 1378, promises a secret philosophy and a Book M, and is millenarian and violently anti-papal — it calls the Pope Antichrist outright, which fixed how the manifestos were received in every Catholic territory.',
            authorship: 'Anonymous, and from the same circle. The Latin is more learned than the Fama’s German, which has been used to argue for a different hand without settling it.',
            oddity: 'It dates itself by the sky. The Confessio points to the new stars seen in Serpentarius and Cygnus as the sign that the time had come — the supernova of October 1604, which Kepler observed and which was the last seen in this galaxy with the naked eye. A hundred and twenty years after 1484 is 1604. The tomb opens in the year the heavens changed, and every reader had seen it happen.',
        },
        {
            slug: 'chymical-wedding-book',
            title: 'Chymische Hochzeit',
            sub: 'The Chymical Wedding of Christian Rosenkreutz, Anno 1459',
            year: '1616',
            place: 'Strasbourg',
            printer: 'Lazarus Zetzner',
            language: 'German',
            circulating: 'Written about 1605, a decade before it was printed',
            says: 'Not a manifesto at all but a novel: seven days, told in the first person, in which an old man is summoned to a royal wedding, weighed, made to watch a king and queen killed and distilled into a new pair, and created a Knight of the Golden Stone — then fails at the last through a lapse of curiosity and is appointed doorkeeper.',
            authorship: 'Johann Valentin Andreae, who claimed it in his own autobiography among the writings of his youth — and called it a *ludibrium*, a word that carries jest, farce, trifle, and stage-play, and which has been made to bear enormous weight in both directions since.',
            oddity: 'It is the only one of the three that anybody reads for pleasure. Formally strange, frequently funny, and structurally an alchemical operation in which the reader who wants the recipe is handed a moral education instead — it is the direct ancestor of the initiatic narrative as a genre.',
        },
    ],
    ledgerIntro: [
        'The Rosicrucian literature is unusually rich in claims that can actually be checked, and checking them is more interesting than either believing or debunking. What follows is every load-bearing claim made about the tradition’s origins — by its adherents and by its detractors — with what the record will bear beside it.',
        'The ledger is not a debunk. Two of these rows come out in the tradition’s favour, and the last one is as firmly established as anything here.',
    ],
    standings: [
        { key: 'legend', label: 'Legend', note: 'Asserted by the tradition; no evidence outside its own documents.' },
        { key: 'false', label: 'Contradicted', note: 'The record positively says otherwise.' },
        { key: 'inverted', label: 'Inverted', note: 'The evidence shows the opposite of the claim.' },
        { key: 'open', label: 'Undocumented', note: 'Suggestive, and not demonstrated either way.' },
        { key: 'sound', label: 'Sound', note: 'The claim holds.' },
    ],
    ledger: [
        {
            claim: 'An order stood behind the manifestos, and the manifestos are its announcement.',
            standing: 'legend',
            verdict: 'No evidence, and good evidence against. The texts belong to a circle of Lutheran reformers at Tübingen; Andreae claimed the third of them and called it a jest, and spent much of his later life mocking those still hunting the brotherhood.',
        },
        {
            claim: 'Christian Rosenkreuz lived from 1378 to 1484 and founded the order.',
            standing: 'legend',
            verdict: 'No trace of him outside the manifestos and what descends from them. A constructed figure, and a well-constructed one — the chronology is internally consistent and lands the tomb on a real and significant date.',
        },
        {
            claim: 'His tomb was opened in 1604 and found lit, seven-sided, and uncorrupted.',
            standing: 'legend',
            verdict: 'Narrative, not report. But 1604 is doing deliberate work: a new star appeared in Ophiuchus that October — Kepler’s supernova, the last in this galaxy seen with the naked eye — and the Confessio names it as the sign that the time had come.',
        },
        {
            claim: 'The story begins in 1614, when the Fama was printed.',
            standing: 'false',
            verdict: 'Adam Haslmayr answered a manuscript Fama in print in 1612, and in August of that year was sentenced to four and a half years on the Genoese galleys. The manuscript circulation is firmly established and pushes composition back to about 1610.',
        },
        {
            claim: 'Michael Maier and Robert Fludd were brothers of the order.',
            standing: 'false',
            verdict: 'Both defended the brotherhood at length and both stated plainly that they were not members and had met none. The doctrine an educated public took to be Rosicrucian it learnt from these two — not from the manifestos, which teach almost nothing.',
        },
        {
            claim: 'The Golden Dawn held a charter from Fräulein Anna Sprengel of Nuremberg.',
            standing: 'false',
            verdict: 'Forged. No trace of Sprengel has ever been found, and the archival work of Ellic Howe and R. A. Gilbert concluded that Westcott wrote the letters himself. The most consequential magical order of the modern West rested its authority on a fake.',
        },
        {
            claim: 'AMORC descends from the mystery schools of ancient Egypt.',
            standing: 'legend',
            verdict: 'No historical support whatever, and the claim has been softened by the order’s own later writers. AMORC is nonetheless the largest Rosicrucian body in the world; what a group teaches and where it says it came from are separate questions, and only the second one keeps failing.',
        },
        {
            claim: 'A Rosicrucian body founded the Royal Society, by way of the Invisible College.',
            standing: 'open',
            verdict: 'No transmission is documented, and the strong form has no defenders among historians of the period. What is documented is weaker and more interesting: Boyle’s “invisible college” in letters of 1646–47, and Elias Ashmole — founding fellow, made a Freemason in 1646 — transcribing the manifestos and drafting a letter to the Fraternity that was never answered, and perhaps never sent.',
        },
        {
            claim: 'Rosicrucianism was a hidden engine of the Enlightenment.',
            standing: 'inverted',
            verdict: 'The one Rosicrucian order whose existence is beyond argument — the Gold- und Rosenkreuz — put Wöllner into the Prussian ministry of religion, and on 9 July 1788 he issued the Edict on Religion forbidding Protestant clergy to preach beyond their confessional books. Kant was silenced under it in 1794. The real order was an instrument of reaction against Enlightenment theology.',
        },
        {
            claim: 'The emblem was Lutheran before it was Rosicrucian.',
            standing: 'sound',
            verdict: 'Luther designed his seal in 1530 — a black cross in a red heart, on a white rose — and glossed every element of it in a letter to Lazarus Spengler. Andreae’s family arms are a St Andrew’s cross with four roses. Both are documented, and they explain why the manifestos never trouble to justify the name.',
        },
        {
            claim: 'The manifestos changed European culture, and the modern initiatic tradition descends from them.',
            standing: 'sound',
            verdict: 'Something like four hundred works appeared within a decade, and Gilly’s catalogue lists over three hundred and fifty for 1610 to 1660. Freemasonry’s higher degrees, the Golden Dawn and their descendants all trace to documents that were, by their probable author’s own account, fiction. The search for the brotherhood is the phenomenon — and a fiction a continent takes seriously has stopped being only a fiction.',
        },
    ],
    chronologyIntro: 'What actually happened, in order.',
    chronology: [
        { year: 'c. 1610', label: 'The Fama circulates in manuscript', note: 'Copies are moving in Tyrol and beyond, years before any printing.' },
        { year: '1612', label: 'Haslmayr answers, and is sent to the galleys', note: 'The first public reply to the brotherhood, printed two years before the Fama itself. Four and a half years at the oar.' },
        { year: '1614', label: 'Fama Fraternitatis printed at Kassel', note: 'Bound behind a translated satire about the impossibility of reforming the world.' },
        { year: '1615', label: 'Confessio Fraternitatis', note: 'Anti-papal, millenarian, and dated by the new star of 1604.' },
        { year: '1616', label: 'The Chymical Wedding, at Strasbourg', note: 'Andreae’s, and admitted to be his.' },
        { year: '1616–21', label: 'Maier and Fludd build the doctrine', note: 'Atalanta fugiens; the Utriusque Cosmi Historia. Neither man claims membership.' },
        { year: '1623', label: 'The placards go up in Paris', note: 'Deputies of the principal College, visible and invisible in the city. Naudé takes it apart in print; Descartes has to shed the rumour.' },
        { year: '1710', label: 'Sincerus Renatus prints the rules', note: 'Samuel Richter gives degrees and officers for a Brotherhood of the Golden and Rosy Cross — a century after the manifestos, and the first workable constitution.' },
        { year: '1757–1780s', label: 'The Gold- und Rosenkreuz actually operates', note: 'A real order at last, recruiting out of the Masonic lodges in Germany and Austria.' },
        { year: '1788', label: 'The Edict on Religion', note: 'Wöllner, a member, closes Prussian pulpits to Enlightenment theology. The order goes quiet within a few years.' },
        { year: '1866–67', label: 'Societas Rosicruciana in Anglia', note: 'Master Masons only. Westcott and Mathers meet inside it.' },
        { year: '1888', label: 'The Golden Dawn opens on a forged warrant', note: 'The Cipher Manuscripts, and letters from a Nuremberg adept who never existed.' },
        { year: '1909–1945', label: 'The modern bodies', note: 'Heindel’s Rosicrucian Fellowship, Lewis’s AMORC, and the Lectorium Rosicrucianum in the Netherlands — three quite different religions under one emblem.' },
        { year: '1972', label: 'Yates publishes, and the field argues', note: 'The Rosicrucian Enlightenment convinces a generation of readers and few specialists; what survives is that magic belongs in intellectual history.' },
    ],
    afterword: [
        'The honest summary is the uncomfortable one. The brotherhood was invented; the invention was serious; and the effects are real, continuous, and still running. Its authors wanted a reformation of learning and got, instead, four centuries of people looking for a door.',
        'The emblem itself was to hand before any of it. Luther designed a seal in 1530 — a black cross in a red heart, on a white rose — and explained every element of it in a letter. Andreae’s family arms are a St Andrew’s cross with four roses. A Württemberg Lutheran writing under the sign of a rosy cross was writing under two signs already his own, and the manifestos never explain the name because they did not have to.',
    ],
};
