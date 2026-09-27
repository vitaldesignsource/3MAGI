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
    // The six agreements. The page had been diagramming the Fama for three
    // sections without ever printing a word of it, which is an odd way to treat
    // the founding document. The wording is Vaughan's English of 1652 — the
    // hall's rule holds, and the note says where it comes from. What stands
    // under each article is the site's own and is marked as such by being a
    // separate field.
    rulesIntro: [
        'In the middle of the story of the founder’s death the Fama stops and lists, in six numbered articles, what the brothers agreed among themselves. It is the only place in the founding documents where the brotherhood says plainly what it is, and what it turns out to be is an administrative document: a constitution for eight people, with a meeting, a succession procedure and an absence note.',
        'The wording below is Thomas Vaughan’s English of 1652, printed at London as *The Fame and Confession of the Fraternity of R:C:*, which is how the Fama has been read in English ever since. Everything under an article is this page’s, not the Fama’s.',
    ],
    rules: [
        {
            n: 1,
            label: 'To cure the sick, and that gratis',
            text: 'That none of them should profess any other thing, then to cure the sick, and that gratis.',
            after: 'The first article and the only one nobody ever dropped. It comes back as an oath in the Chymical Wedding, where the new-made Knights of the Golden Stone swear to serve the sick freely and to take no worldly rank for it; Maier expounds it at length in the Themis aurea; and it is still being kept — Heindel’s Rosicrucian Fellowship has run a healing department out of Oceanside for more than a century. A movement with no verifiable founder has held to its first rule for four hundred years.',
        },
        {
            n: 2,
            label: 'No habit, but the custom of the country',
            text: 'None of the Posterity should be constrained to wear one certain kind of habit, but therein to follow the custom of the Country.',
            after: 'This is the whole of the brotherhood’s famous invisibility: not a magical property but a rule about clothes. Wear what the locals wear and you cannot be picked out of a crowd. The Paris placards of 1623 took the word at its other value and announced deputies of the College *visible and invisible* in the city, and the pun has been read as sorcery ever since. Every order that later took the name broke this article first — the Societas Rosicruciana, the Golden Dawn and AMORC all vest, and the robes are the most recognisable thing about them.',
        },
        {
            n: 3,
            label: 'The day C., at the house S. Spiritus',
            text: 'That every year upon the day C. they should meet together at the house S. Spiritus, or to write the cause of his absence.',
            after: 'The one article that would have left a record. A named building and a fixed date, both given as initials: the house Sancti Spiritus has never been identified with any real place, and the day C. has been read as Corpus Christi, as the C of the founder’s own name, and as nothing in particular. An annual general meeting with an attendance requirement and a written excuse for absence is precisely the sort of arrangement that generates paper. No paper exists.',
        },
        {
            n: 4,
            label: 'Each to find the one who succeeds him',
            text: 'Every Brother should look out for a worthy person, who after his discease might succeed him.',
            after: 'Succession by co-option, which fixes the membership for good: eight men, replaced one at a time. It is the article that makes the brotherhood impossible to join, and it explains the strangest fact of the furore — several hundred open letters, and not one answer. There was no procedure for answering them even in the brotherhood’s own constitution. It is also the first article every real order abandoned; the Gold- und Rosenkreuz recruited in the thousands out of the Masonic lodges.',
        },
        {
            n: 5,
            label: 'C. R. their seal, mark and character',
            text: 'The word C. R. should be their Seal, Mark, and Character.',
            after: 'Kept, and kept visibly. The altar in the vault carries initials and not a name, the Fama calls its own founder Fra. C.R.C. through most of its length, and initial-for-name becomes a habit the tradition never loses — down to the Latin mottoes of the Golden Dawn grades. The man who put this article into English did it under the name Eugenius Philalethes, which on the evidence of article five is entirely in order.',
        },
        {
            n: 6,
            label: 'Secret one hundred years',
            text: 'The Fraternity should remain secret one hundred years.',
            after: 'The only article with arithmetic in it, and the arithmetic does not close. The brothers agree to a hundred years of silence in the founder’s lifetime; the door of the vault promises a hundred and twenty; the founder dies in 1484 and the tomb is opened in 1604; the Fama is in print in 1614 and was circulating in manuscript by about 1610. Whichever clock you start, the brotherhood is late. The discrepancy has been read as careless composition and as deliberate cipher, and there is no settling it from inside the text.',
        },
    ],
    rulesCoda: 'Michael Maier wrote a book about these six sentences. The *Themis aurea* of 1618 — *the laws of the fraternity of the Rosie Crosse* in the English of 1656 — takes the articles in turn and expounds each at length, and it is worth being clear about what that means. The fullest account of Rosicrucian practice printed in the seventeenth century is a commentary, by a man who stated he was not a member, on six sentences from a book whose probable author would declare the whole business a chaos the following year.',

    // The furore. The ledger's last row rests on a number — four hundred works
    // in a decade — and a number on its own is not evidence. These are the
    // books the number is made of, with their side declared, because who was
    // on which side is the most misremembered thing about the affair.
    furoreIntro: [
        'Europe answered the manifestos in print, and the answer is the phenomenon. What follows is not the four hundred; it is the dozen that set the terms, in the order they appeared. Watch who is on which side. The two men who built the doctrine were not members and said so in the books that built it; the man who wrote the third manifesto spent 1619 disowning it; and the most serious attack came from a chemist who objected to the chemistry.',
    ],
    sides: [
        { key: 'for', label: 'In its defence', note: 'Written to answer the attacks — in every case by someone who denied being a member.' },
        { key: 'doctrine', label: 'Where the doctrine came from', note: 'Not arguments about the brotherhood, but the books an educated public mistook for its teaching.' },
        { key: 'against', label: 'Against it', note: 'Written to refute, on theological or medical grounds.' },
        { key: 'apart', label: 'Taken apart', note: 'Written to establish what had actually happened, by the methods of the archive.' },
        { key: 'satire', label: 'At its expense', note: 'Written to make it ridiculous — sometimes by people who had wanted to believe it.' },
        { key: 'disowned', label: 'Disowning it', note: 'Written by its own author, to be rid of it.' },
        { key: 'instead', label: 'Instead of it', note: 'The thing he wrote once he had given up on the brotherhood.' },
        { key: 'english', label: 'Into English', note: 'The translation that carried the manifestos into the language that would take them furthest.' },
    ],
    furore: [
        {
            year: '1612',
            author: 'Adam Haslmayr',
            slug: 'haslmayr-antwort',
            title: 'Antwort an die lobwürdige Brüderschafft der Theosophen vom RosenCreutz',
            side: 'for',
            note: 'The first public word about the brotherhood, printed two years before the Fama itself, by a Tyrolean schoolmaster and notary who had read a manuscript copy and answered it in print. In August of the same year the authorities took him, and he went to the Genoese galleys for four and a half years. The earliest hard fact in Rosicrucian history is a man punished for wanting to join.',
        },
        {
            year: '1615',
            author: 'Andreas Libavius',
            slug: 'libavius-analysis',
            title: 'Analysis confessionis Fraternitatis de Rosea Cruce',
            side: 'against',
            note: 'The most serious attack, and the only one from inside a laboratory. Libavius had written what is generally counted the first systematic chemistry textbook, the *Alchemia* of 1597, and he was rector of the Gymnasium at Coburg and an Aristotelian. He read the Confessio twice over: as theology, where he held that Scripture promises no perfection of the world before the Second Coming, and as medicine, where he held the Paracelsian cures to be dangerous quackery. Both Fludd and Maier answered him.',
        },
        {
            year: '1616',
            author: 'Robert Fludd',
            slug: 'fludd-apologia',
            title: 'Apologia Compendiaria Fraternitatem de Rosea Cruce ... abluens',
            side: 'for',
            note: 'An English physician, writing in Latin at Leiden, defends a German brotherhood he has never met against a German chemist — and says in the text that he is not one of them. Expanded the next year into the *Tractatus Apologeticus*. It made his reputation across Europe as a Rosicrucian, which he was not, and the reputation outlived every argument in the book.',
        },
        {
            year: '1617',
            author: 'Michael Maier',
            slug: 'maier-silentium',
            title: 'Silentium post clamores',
            side: 'for',
            note: 'Silence after the clamour, and Maier has the awkward brief: the brotherhood has been shouted at for three years and has not replied. His answer is that the silence is proper — the wise do not answer a crowd, and the worthy are found without advertisement. It is the argument every unfalsifiable tradition has made since, and he makes it well. He also states plainly that he is not a member and has met none.',
        },
        {
            year: '1617',
            author: 'Michael Maier',
            slug: 'maier-atalanta',
            title: 'Atalanta fugiens',
            side: 'doctrine',
            note: 'Not a defence, and the most beautiful book in the whole controversy: fifty emblems, each with a motto, an epigram, a prose discourse, and a fugue in three voices to be sung — Atalanta fleeing, Hippomenes pursuing, the golden apple falling behind. Printed at Oppenheim for Johann Theodore de Bry, with the plates engraved after Matthäus Merian. What the seventeenth century took Rosicrucianism to *be*, it largely learnt here, from a book that never argues for it.',
        },
        {
            year: '1618',
            author: 'Michael Maier',
            slug: 'maier-themis',
            title: 'Themis aurea',
            side: 'for',
            note: 'The laws of the fraternity, article by article — a full commentary on the six agreements above, and the most substantial account of Rosicrucian practice printed in the century. The English of 1656 has, bound in at the back, an epistle to the Fraternity in Latin *from some here in England*: a letter to nobody, printed and sold with the book.',
        },
        {
            year: '1619',
            author: 'Johann Valentin Andreae',
            slug: 'andreae-turris-babel',
            title: 'Turris Babel sive judiciorum de Fraternitate Rosaceae Crucis chaos',
            side: 'disowned',
            note: 'The Tower of Babel, or the chaos of judgements concerning the Fraternity of the Rosy Cross: twenty-five dialogues in which the author of the Chymical Wedding surveys five years of argument and walks out of it. He does not stop wanting the general reformation — he wants it for the rest of his life — he stops believing there is anybody there to do it. The founding author is the tradition’s first debunker, and the hunt went on without him for four centuries.',
        },
        {
            year: '1619',
            author: 'Johann Valentin Andreae',
            slug: 'andreae-christianopolis',
            title: 'Reipublicae Christianopolitanae descriptio',
            side: 'instead',
            note: 'Christianopolis: a city on a square island, a hundred citizens, government by the learned, and a curriculum set out room by room. Printed at Strasbourg by the heirs of Lazarus Zetzner, who had printed the Chymical Wedding three years before. It is everything the manifestos promised, with a street plan and no secret — the same year he printed the book giving up on the secret.',
        },
        {
            year: '1623',
            author: 'Gabriel Naudé',
            slug: 'naude-instruction',
            title: 'Instruction à la France sur la vérité de l’histoire des Frères de la Roze-Croix',
            side: 'apart',
            note: 'The placards go up in Paris in the summer; by the end of the year a twenty-three-year-old medical student — later librarian to Mazarin, and the man who wrote the first treatise on how to build a library — has published the book that ends the affair in France. His method is the modern one: read the documents, date them, ask who profits. He does it without believing in magic and without much moral heat, which is why it still reads well. Descartes, back from Germany and rumoured to be one of them, took care to be seen about town.',
        },
        {
            year: '1631',
            author: 'Jan Amos Comenius',
            slug: 'comenius-labyrint',
            title: 'Labyrint světa a ráj srdce',
            side: 'satire',
            note: 'The Labyrinth of the World and the Paradise of the Heart, in Czech, with a whole chapter on the brotherhood. The pilgrim watches the Rose Brethren open their treasury and put painted boxes up for sale under splendid titles — a guide to the great world and the little, a harmony of the two cosmoses, the Christian Cabala, which are Fludd’s titles with the serial numbers filed off — and the buyers who cannot resist opening them find nothing inside at all. The dealer explains that the contents are invisible to any but the sons of science. Comenius had been close enough to the movement that the opening of his own first chapter is a paraphrase of Andreae.',
        },
        {
            year: '1652',
            author: 'Thomas Vaughan, as Eugenius Philalethes',
            slug: 'vaughan-fame-and-confession',
            title: 'The Fame and Confession of the Fraternity of R:C:',
            side: 'english',
            note: 'The manifestos into English at last, thirty-eight years late, in the middle of the English revolution, by a Welsh alchemist and clergyman writing under a pseudonym. Every English sentence of the Fama on this page is his. The tradition arrived in the language that would carry it furthest by way of a translator who did not use his own name.',
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
    // The descent. The ledger adjudicates claims one at a time; this takes the
    // line as a whole, and its shape is the argument. Left column is what each
    // body says about where it came from, right column is what can be shown,
    // and the row in the middle carries nothing on the right — because nothing
    // is there. The gap is drawn rather than described.
    descentIntro: [
        'Every Rosicrucian body has an account of where it came from, and the accounts are meant to join up into one line running from a tomb in Germany to a lodge room in London or a campus in California. Set the claim beside the record and the line is legible for what it is.',
        'Read down the left and you have four centuries of continuous transmission. Read down the right and there is a seventy-year hole in the middle that nothing crosses.',
    ],
    descent: [
        {
            era: '1378–1484',
            claimed: 'Christian Rosenkreuz travels to Damascus, Damcar, Egypt and Fez, returns with a philosophy, and founds a brotherhood of eight sworn to the six articles.',
            documented: 'Nothing. No trace of the man, the journey or the brotherhood exists outside the manifestos and what descends from them. The earliest physical trace of any of it is a manuscript circulating in Tyrol around 1610.',
        },
        {
            era: '1610–1616',
            claimed: 'The brotherhood breaks its silence and publishes its report, its confession, and the account of its founder’s wedding.',
            documented: 'Three anonymous books out of Kassel and Strasbourg, from a circle of Lutheran reformers around Tübingen. The third is claimed by Andreae in his own autobiography among the writings of his youth, and called a jest.',
        },
        {
            era: '1616–1623',
            claimed: 'Brothers of the order write publicly in its defence, and what they write is its teaching.',
            documented: 'Maier and Fludd write at great length and both state in the texts that they are not members and have met none. The doctrine an educated public took to be Rosicrucian was manufactured in the defence of it, by outsiders, after the fact.',
        },
        {
            era: '1710',
            claimed: 'Sincerus Renatus publishes the order’s real constitutions, as held.',
            documented: 'Samuel Richter, a Silesian pastor, prints degrees, officers and rules for a Brotherhood of the Golden and Rosy Cross — the first workable constitution the tradition ever had, and a century later than the manifestos. Nothing connects it to 1614 but the name.',
        },
        {
            era: '1757–1790s',
            claimed: 'The Gold- und Rosenkreuz is the brotherhood of the Fama, continuing under another name.',
            documented: 'A real order at last — thousands of members, recruiting out of the Masonic lodges of Germany and Austria, with a functioning grade system. Its grade system is a Masonic invention of the 1750s, and its one link to 1614 is Richter’s book, which it used as a source. Its most powerful member put the Edict on Religion through the Prussian ministry in 1788.',
        },
        {
            era: '1790s–1866',
            gap: true,
            claimed: 'The chain is unbroken. The order did not end; it withdrew, and worked invisibly until the time was right to appear again.',
            documented: null,
            note: 'Seventy-odd years in which no Rosicrucian organisation can be shown to have existed anywhere. The Gold- und Rosenkreuz goes quiet within a few years of the Edict and nothing takes its place. Every modern body crosses this silence, and every one of them crosses it by assertion.',
        },
        {
            era: '1866–67',
            claimed: 'The Societas Rosicruciana in Anglia revives the society on older Rosicrucian authority — rituals recovered, and an initiation received abroad.',
            documented: 'Robert Wentworth Little, who had worked in the office of the Grand Secretary at Freemasons’ Hall, produced four rituals he said he had found there; Kenneth Mackenzie said he had been initiated by an adept in Austria. Master Masons only, and no document from before Little’s own hand. The society itself, to its credit, has never claimed a provable link. Westcott and Mathers met inside it.',
        },
        {
            era: '1888',
            claimed: 'The Golden Dawn opens under a warrant from Fräulein Anna Sprengel of Nuremberg, chief of a German Rosicrucian order.',
            documented: 'Westcott wrote the letters himself; Ellic Howe and R. A. Gilbert traced the forgery in the archives, and no trace of Sprengel has ever been found. The Cipher Manuscripts are real objects of uncertain origin. What was built on the forged warrant is the most influential magical system in the English language, and it works on people who know the warrant was forged.',
        },
        {
            era: '1909–1911',
            claimed: 'Max Heindel receives the Western Wisdom Teachings directly from an Elder Brother of the Rose Cross in 1908, and founds the Rosicrucian Fellowship to give them out.',
            documented: 'Heindel travelled to Germany in 1907 with Alma von Brandis to hear Rudolf Steiner lecture, and published the *Rosicrucian Cosmo-Conception* in 1909 with a dedication to Steiner in the first edition. Steiner called it plagiarism outright. The Fellowship settled at Oceanside and has run a healing department there ever since — the only body in the succession that visibly keeps the Fama’s first article.',
        },
        {
            era: '1909–1915',
            claimed: 'H. Spencer Lewis is initiated at Toulouse in 1909 by members of an international Rosicrucian council and given the mission of reactivating the order in America, which descends from the mystery schools of Egypt.',
            documented: 'AMORC is founded in New York in 1915 by a successful advertising man, and grows by the methods of his trade into the largest Rosicrucian body in the world. The Toulouse initiation rests on Lewis’s own account and no second witness. The Egyptian descent has no historical support of any kind, and the order’s later writers have quietly softened it.',
        },
        {
            era: '1924 / 1935',
            claimed: 'The Lectorium Rosicrucianum was founded at Haarlem on 24 August 1924.',
            documented: '1924 is the year the Leene brothers *joined* Max Heindel’s Rosicrucian Fellowship. They were given charge of its Dutch branch in 1929 and left in 1935, with Catharose de Petri, to found a body of their own. The founding date was fixed afterwards, on the year of the joining — a documented case of a Rosicrucian origin being moved backwards in the record, with the paperwork on both sides of the move still extant.',
        },
    ],
    descentCoda: 'The hole is the interesting part. Every modern Rosicrucian body is post-1866, and every one of them crosses the seventy years by assertion — a charter from a person who cannot be found, an initiation abroad with no second witness, teachings from an Elder Brother who happens to agree with a lecturer the author had gone to hear, a founding date set on the year of a joining. It does not follow that they are frauds; three of them have outlasted most of the churches that condemned them, and the first article is better kept among them than among their critics. What follows is that Rosicrucian descent is a literary genre with settled conventions, and that the conventions were fixed in 1614 by a book about a door that opened after a hundred and twenty years.',
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
    // The seven days. The book is the only one of the three that anybody reads
    // for pleasure, and the page was describing it without letting anyone read
    // it. The hall's rule holds: quotation is printed only where the wording is
    // attested, and Foxcroft's English of 1690 — the version in which the book
    // entered the language — is the text quoted. Everywhere else the day is
    // summarised in the site's own words and says so.
    weddingIntro: [
        'The Chymical Wedding is told in the first person over seven days, and the shape is Genesis: a week of work ending in a new creation. It is also, and at the same time, an alchemical operation — the sequence of the days is the sequence of the work — and a comedy, in which the narrator is repeatedly the least impressive person in the room.',
        'What follows is the story as it runs, with what each day is doing beneath it. Quotation is from Ezechiel Foxcroft’s English of 1690, which is where the book entered the language; where no wording is given, the day is summarised here rather than quoted, and the difference is deliberate.',
    ],
    days: [
        {
            n: 1,
            title: 'The Invitation',
            story: 'On the eve of Easter, at his table, an old man is interrupted by a storm and a winged herald who leaves him a letter written in gold on an azure ground. It invites him to a royal wedding, warns him to prepare, and is signed by the Bridegroom and the Bride. He is frightened rather than delighted, and remembers a vision of seven years in a tower.',
            work: 'The call, and the fear of it. Note that the invitation already contains the test of the third day — the reader is told the terms before the narrator understands them.',
            quote: {
                text: 'This day, this day, this, this / The Royal Wedding is. / Art thou thereto by birth inclined, / And unto joy of God designed? / Then mayest thou to the mountain tend, / Whereon three stately Temples stand, / And there see all from end to end. / Keep watch, and ward, / Thy self regard; / Unless with diligence thou bathe, / The Wedding can’t thee harmless save; / He will damage that here delays; / Let him beware too light that weighs.',
                note: 'The last line is the whole of the third day, announced on the first. Underneath the verse stood *Sponsus and Sponsa* — the Bridegroom and the Bride.',
            },
        },
        {
            n: 2,
            title: 'The Road, and the Gates',
            story: 'He dresses for it — a white linen coat, a blood-red ribbon bound cross-ways over the shoulder, and four red roses in his hat — takes bread, salt and water, and goes out into a forest where four ways part. He is deliberating when he throws his bread to a white dove, a raven comes to drive her off, he chases the raven, and finds he has been carried onto the right road by the pursuit. Three gates admit him, each taking one of his tokens; at the last a virgin writes down his name.',
            work: 'He arrives at the right road by accident, chasing a bird, having not chosen it. This is the book being funny and serious at once, and it is why the narrator is not a hero.',
            quote: {
                text: 'He put on his white linen coat, girded his loins with a blood-red ribbon bound cross-ways over his shoulder, and in his hat he stuck four red roses, that he might the sooner by this token be taken notice of amongst the throng.',
                note: 'The rose and the cross, worn on the body, in the only one of the three books whose author is known. It is the nearest thing the founding texts have to an explanation of the name — and it explains nothing, being simply what he put on.',
            },
        },
        {
            n: 3,
            title: 'The Weighing',
            story: 'In a great hall hung with golden scales, watched by a virgin in red velvet and two hundred armed men, every guest is weighed against seven weights. Most of the company — who spent the previous night boasting of the arts they commanded — prove too light. They are stripped of their pretensions and put out, some ransomed, some scourged. The narrator, who had thought himself the least qualified man present, holds every weight.',
            work: 'The hinge of the book, and the reason it survives as literature: the test is not of knowledge but of not having claimed any. Those who came to display an art fail; the one who came expecting to be turned away passes.',
            quote: null,
        },
        {
            n: 4,
            title: 'The Comedy, and the Beheading',
            story: 'The survivors climb to the royal hall and watch a play in seven acts — a princess cast into the sea, stolen by a Moor, recovered and married. When it ends, the six royal persons are beheaded in earnest by the same black executioner, their blood caught in golden cups, and the executioner is then beheaded himself. The bodies are coffined. The company is told the royal persons will be restored, and is not told how.',
            work: 'The *nigredo* — the blackening, the death of the material. An alchemical operation cannot proceed without the dissolution of what it starts from, and the play immediately before it is not decoration: the audience is shown the story as fiction and then made to watch it happen.',
            quote: null,
        },
        {
            n: 5,
            title: 'Venus, and the Voyage',
            story: 'Exploring below the castle with a page, the narrator finds a chamber where Lady Venus lies asleep and uncovered, and looks. The page is appalled. Afterwards the coffins are carried down to the shore and the company sails across a lake in ships bearing lanterns, one of them made in the shape of a five-pointed star, while sirens sing them a song about love. They reach the Tower of Olympus.',
            work: 'The lapse, and the narrator does not yet know it is one. Everything that happens to him on the seventh day is settled here, in a room he was not stopped from entering.',
            quote: null,
        },
        {
            n: 6,
            title: 'The Tower of Olympus',
            story: 'Seven storeys of work, and the guests are the labourers. The bodies are reduced, distilled, and the essence drawn off; an egg is made and hatched; the bird that comes out is fed on the blood of the beheaded kings, grows, is bathed, loses its feathers, and is itself killed and burnt. From its ashes two small bodies are moulded, a boy and a girl, grown to full size by degrees, and their souls are brought down and blown into them with a trumpet. The royal pair wake.',
            work: 'The whole operation, in one day: dissolution, conjunction, the whitening, the feeding of the tincture, and the resurrection of the King and Queen — the *rebis*, the two made one and living. And it is done by hand, by tired people carrying things up stairs.',
            quote: null,
        },
        {
            n: 7,
            title: 'The Doorkeeper',
            story: 'The company sails home in twelve ships under flags of the zodiac and is made Knights of the Golden Stone, swearing to ascribe all to God, to serve the sick freely, to keep the order’s secrets, and not to use their standing for worldly rank. Then the narrator is asked about the chamber below, and says what he saw. He is condemned to be the doorkeeper of the door he had opened — taking the place of the porter he had himself been permitted to release, who had been serving the same sentence for the same offence. The text breaks off before the morning.',
            work: 'The ending refuses the reward it has spent six days promising, and the loop is exact: the man he freed was there for looking at Venus, and now he stands in his place. The book’s last joke is also its doctrine — the one who sees the mystery does not get to leave it.',
            quote: null,
        },
    ],
    weddingCoda: 'The 1616 printing ends in mid-air, with a note that some leaves are wanting and the narrator returning home, and the interruption is so well placed that readers have argued ever since about whether it is an accident. It is the same question the whole tradition raises in miniature: a door that stops exactly where it would have to open.',

    // The vault, drawn from the Fama's own measurements. Labelled for what it
    // is — a diagram of a description. Nothing of the kind has been found, and
    // the page says so on the figure rather than in a footnote.
    vaultIntro: [
        'The Fama describes the tomb with the precision of a surveyor, and that precision is the point: it is not a vision but a room, with dimensions. Whoever wrote it wanted the reader to be able to build it.',
        'The plan below is drawn from those measurements and from nothing else. No such vault has ever been found, and none is expected; what is being diagrammed is a paragraph.',
    ],
    vault: {
        sides: 7,
        sideWidth: 'five foot broad',
        height: 'eight foot high',
        caption: 'The vault in plan, at the measurements the Fama gives. A diagram of a text, not of an excavation.',
        parts: [
            { key: 'walls', label: 'Seven walls', note: 'Each five foot broad and eight foot high, and each divided and figured over its whole surface — the seven sides carrying books, instruments, mirrors, bells and burning lamps.' },
            { key: 'sun', label: 'The sun in the roof', note: 'No daylight reaches the chamber. It is lit from the ceiling by a sun of the builders’ own making, still burning after a hundred and twenty years — the detail that tells you what kind of text this is.' },
            { key: 'altar', label: 'The round altar', note: 'At the centre, carrying a brass plate and the founder’s inscription, and standing directly over the body.' },
            { key: 'body', label: 'The body beneath', note: 'Found whole and uncorrupted under the altar, holding a book of vellum lettered in gold.' },
            { key: 'floor', label: 'Floor and ceiling', note: 'Divided and figured like the walls, and read by the brothers as a map of the upper and lower worlds — the room built as a model of the whole.' },
        ],
        inscriptions: [
            { latin: 'Post CXX Annos Patebo', english: 'After a hundred and twenty years I shall open.', where: 'On the door, found behind the plaster.' },
            { latin: 'Hoc universi compendium unius mihi sepulchrum feci', english: 'This compendium of the universe I made in my lifetime to be my tomb.', where: 'On the altar, with the founder’s initials.' },
            { latin: 'Ex Deo nascimur, in Jesu morimur, per Spiritum Sanctum reviviscimus', english: 'Of God we are born, in Jesus we die, by the Holy Spirit we live again.', where: 'The order’s motto, taken from the vault.' },
        ],
    },
    afterword: [
        'The honest summary is the uncomfortable one. The brotherhood was invented; the invention was serious; and the effects are real, continuous, and still running. Its authors wanted a reformation of learning and got, instead, four centuries of people looking for a door.',
        'The emblem itself was to hand before any of it. Luther designed a seal in 1530 — a black cross in a red heart, on a white rose — and explained every element of it in a letter. Andreae’s family arms are a St Andrew’s cross with four roses. A Württemberg Lutheran writing under the sign of a rosy cross was writing under two signs already his own, and the manifestos never explain the name because they did not have to.',
    ],
};
