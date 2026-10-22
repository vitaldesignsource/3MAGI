// armenian — The Currents: thematic essays on this tradition's esoteric
// disciplines. Fact-checked by the content pipeline: scripts verified
// against unicodedata, sources and attributions audited, and practice
// described historically rather than prescribed.
export default {
    note: 'Audited Armenian (grabar) hall. SCRIPT: every native-script string in this batch was written to a file and run character by character through python3 unicodedata.name() (UCD 15.1). All strings resolve exclusively to ARMENIAN CAPITAL/SMALL LETTER names — no Latin, Greek or Cyrillic look-alikes, no stray combining marks, no unnamed code points. Orthography is classical throughout: ւ (yiwn), է (eh), օ (oh) and ռ (ra) stand where the classical spelling has them, so the forms read as in the manuscripts and the Mekhitarist editions rather than in reformed orthography. unicodedata confirms the block, not the spelling; where a title is less securely attested in a single classical form — Քննիկոն for Anania\'s compendium, Ախրապատին for Amirdovlat\'s formulary, Կիպրիանոս for Cyprian, and the John 1:1 incipit as it is customarily cited — the gloss says so. SOURCES: eight substantive corrections were made against the record. Irenaeus\'s Demonstration was not found at Etchmiadzin but in December 1904 in the Church of the Blessed Virgin at Erevan, and was published in 1907; \'the Armenian Josephus\' could not be verified and has been removed; the Zohrab Bible of 1805 carries its apocrypha in an appendix, not interleaved; the Seventh Vision of Daniel is now generally placed in the late fifth century, composed in Greek and surviving only in Armenian, with its apparent allusion to the Arab conquests usually judged a later interpolation — the draft\'s dating to the conquests has been reversed; the prophecy under the name of Nerses the Great is now described as the scholarship describes it, first attested in a tenth-century vita attributed to Mesrop Erets and redacted in its surviving form in the decades after the First Crusade, and the unverifiable claim about its nineteenth-century political use has been cut; the Homiliary of Mush is given at its documented 27.5 kg in two parts rather than \'some twenty-eight\'; the Matenadaran\'s holdings are given as the institution itself reports them, including its 462 Armenian hmayils; and the smallest manuscript is a church calendar of 1436. OVERSTATEMENT: the Syriac origin of the first Armenian Bible is now marked as the traditional account rather than a settled one; the standing of Third Corinthians, the universality of Narek use, the comparative claim that no tradition honours angels more elaborately, the etymology of Նեռ, and the \'consistently ineffective\' verdict on the canons have all been downgraded to what the evidence supports. NO INSTRUCTION: practice is described bibliographically and historically — what the books contain, who copied them, how they were carried and worn — and at no point operatively; the Solomonic and amulet material is described in terms of its own stated logic of citation, and the fifteenth-century pharmacological recipes are explicitly flagged as historical evidence and not to be attempted. RESPECT: the Armenian Apostolic Church, the Mekhitarist congregations and the families who still keep a hmayil are living; where a practice sits outside official religion — the Grogh, the amulet scrolls, the Al — it is named as folk tradition without relish. The Currents are written on the assumption that an Armenian reader is reading.',
    themes: [
        {
            slug: 'apocrypha',
            title: 'The Apocrypha',
            native: 'Անկանոն գիրք',
            translit: 'Ankanon girk\' — \'uncanonical books\'',
            summary: 'A language invented to carry scripture, which ended by holding books that every other tradition lost, and a canon whose margins were deliberately kept wide.',
            paragraphs: [
                'Armenian became a written language in order to be a Christian one. Tradition places the invention of the alphabet at about 405, and its earliest witness — Koriwn\'s Life of Mashtots, composed within a generation of the event — presents the letters not as a cultural ornament but as an instrument made for a single task: to carry scripture into a tongue that had until then borrowed Syriac and Greek in order to worship. The consequences for textual transmission were peculiar and permanent. The traditional account, which goes back to Koriwn himself, holds that the first Armenian rendering was made from Syriac; how much of the earliest version came from Syriac and how much from Greek is still argued. What is not argued is what happened next: after the Council of Ephesus in 431, exemplars brought back from Constantinople were used to revise the existing version against the Greek, and the revised text kept traces of both operations. Armenian therefore does not descend cleanly from either of the two great eastern transmissions but sits at their junction. A second and later phase of translating, the work of what scholarship calls the Hellenophile school, went further still, calquing Greek word-formation and syntax with such exactitude that an Armenian sentence can often be run backwards into its Greek original almost mechanically. Early access, wide reading and an eventually mechanical fidelity: that combination is why Armenian ended up keeping books nobody else kept.',
                'The list of such books is not a curiosity but a foundation of patristic and Second Temple scholarship. Philo of Alexandria\'s Questions on Genesis and Questions on Exodus, together with On Providence and On Animals, survive complete only in Armenian. The first book of Eusebius of Caesarea\'s Chronicle is preserved entire in Armenian and in no other language. Irenaeus of Lyons\' Demonstration of the Apostolic Preaching, lost to Greek altogether, came to light in December 1904 when Karapet Ter-Mkrtchian found it in a manuscript in the Church of the Blessed Virgin at Erevan; he published it in 1907 with Erwand Ter-Minassiantz, and the discovery reorganised the study of second-century theology. Ephrem the Syrian\'s commentary on the Diatessaron was known in its Armenian dress for more than a century before Syriac leaves of it surfaced. The Armenian version of the Alexander Romance, the Refutation of Timothy Aelurus, the philosophical corpus that travels under the name of David the Invincible: the pattern repeats. A tradition on the edge of two empires, translating hard for two centuries and then copying faithfully for fifteen more, functions as a library of last resort.',
                'The canon itself was drawn with unusually generous margins. Third Corinthians — the exchange of letters between Paul and the Corinthian church that belongs to the Acts of Paul — was read, commented upon and copied in Armenian biblical manuscripts long after the Greek and Latin churches had set it aside, and it was treated in Armenia with a seriousness it received nowhere else, though it was not in the end retained as canonical. Biblical codices routinely carry apocryphal matter in their outer quires: the Repose of St John, prayers, testaments, histories of the patriarchs. When Yovhannes Zohrapean produced at Venice in 1805 the first critical printed Armenian Bible — built on a fourteenth-century Venetian codex collated against a substantial body of further manuscripts — he gave the apocrypha an appendix of their own rather than suppressing them, and that edition is still the working text. The corpus itself was gathered by the Mekhitarists of San Lazzaro in three volumes that remain the point of departure: the uncanonical books of the Old Testament, edited by Sargis Yovsēp\'ianc\' in 1896; those of the New Testament, edited by Esayi Tayets\'i in 1898; and the uncanonical apostolic books, edited by Kerovbe Ch\'rak\'ian in 1904.',
                'What is in them repays the attention. Fourth Ezra survives in Armenian in a version so freely expanded — whole speeches added, the seer\'s argument recast — that Michael E. Stone, whose 1979 edition is standard, treats it as evidence for Armenian apocalyptic thought quite as much as for the lost Greek behind it; the same tradition produced the short Armenian apocryphon known as the Questions of Ezra. The Testaments of the Twelve Patriarchs exist in an Armenian recension whose shorter readings have been central to the long argument over how much of that work is Jewish and how much Christian; Stone\'s study of the Testament of Levi manuscripts in the convent of St James in Jerusalem opened that file in 1969. Joseph and Aseneth is preserved in an Armenian version that editors treat as a primary witness. The Paralipomena of Jeremiah, the Lives of the Prophets, and the fifteen patriarchal and prophetic apocrypha Stone edited in 1982 from the Jerusalem and Yerevan collections, all but two of them printed there for the first time — all are here. So is the Armenian Gospel of the Infancy, translated in all probability from a Syriac original, which fills the silent years with narrative and which names the magi as three brother-kings: Melkon of the Persians, Gaspar of the Indians, Baltasar of the Arabs. Abraham Terian\'s translation of 2008 made it available in English at last.',
                'Because the translators worked so close to their exemplars, the Armenian version is evidence in its own right, and the discipline that studies it is a discipline of triangulation. A Syriacism surviving under a Greek revision is a fingerprint of the two-stage history and can date a stratum. Where the Armenian and the Georgian agree against the Greek, the agreement usually points not to contamination between them but to a common ancestor older than either. A Hellenophile calque can restore, letter by letter, a Greek compound that no Greek manuscript preserves. The rule that follows is that no single version is ever trusted alone: Armenian is read against Syriac, Greek, Georgian, Ethiopic and Slavonic until the outline of the lost original shows in the places where the versions converge — and the places where they do not converge are, more often than not, where the interesting history lies.',
            ],
            terms: [
                {
                    native: 'Անկանոն գիրք',
                    translit: 'ankanon girk\'',
                    gloss: '\'Uncanonical books\'. The title under which the Mekhitarists of Venice published the Armenian apocrypha in three volumes (1896, 1898, 1904), and still the standard designation of the corpus.',
                },
                {
                    native: 'Ոսկեդար',
                    translit: 'Voskedar',
                    gloss: '\'Golden age\'. The fifth century, the era of the alphabet and of the great translations, treated in Armenian literary history as the classical measure against which all later prose is set.',
                },
                {
                    native: 'Թարգմանիչք',
                    translit: 'T\'argmanich\'k\'',
                    gloss: '\'The Translators\'. Mashtots, Sahak and their pupils, commemorated with a feast of their own in the Armenian calendar — a church that keeps a liturgical festival for its translators.',
                },
                {
                    native: 'Աստուածաշունչ',
                    translit: 'Astuatsashunch\'',
                    gloss: '\'God-breathed\', the ordinary Armenian name for the Bible, a single word rendering the theopneustos of 2 Timothy 3:16.',
                },
                {
                    native: 'Աւետարան',
                    translit: 'Awetaran',
                    gloss: '\'Gospel\', literally \'good tidings\'. Also the name of the book as an object: the Awetaran of a village church was its treasure, its oath-stone and, on occasion, its ransom.',
                },
                {
                    native: 'Մանկութեան աւետարան',
                    translit: 'Mankut\'ean awetaran',
                    gloss: '\'Gospel of the Infancy\', the Armenian infancy gospel, extant in many manuscripts and in more than one recension; probably rendered from Syriac. Translated into English by Abraham Terian (2008).',
                },
                {
                    native: 'Մատենադարան',
                    translit: 'Matenadaran',
                    gloss: '\'Repository of writings\'. Generic for a manuscript library, but used absolutely of the Mesrop Mashtots Institute of Ancient Manuscripts in Yerevan, whose holdings run to some seventeen thousand items, of which more than eleven thousand are complete Armenian manuscripts.',
                },
            ],
            texts: [
                {
                    title: 'The Armenian Bible (Zohrab edition)',
                    note: 'Yovhannes Zohrapean, Venice: San Lazzaro, 1805 — the first critical printed Armenian Bible, based on a fourteenth-century Venetian codex collated against further manuscripts, with the apocryphal writings in an appendix. Still the working edition.',
                },
                {
                    title: 'Ankanon girk\' — the Venice Mekhitarist apocrypha',
                    note: 'Three volumes: Old Testament apocrypha ed. S. Yovsēp\'ianc\' (1896); New Testament apocrypha ed. E. Tayets\'i (1898); apostolic apocrypha ed. K. Ch\'rak\'ian (1904). The foundation of the field.',
                },
                {
                    title: 'The Armenian Version of IV Ezra',
                    note: 'Edited by Michael E. Stone (University of Pennsylvania Armenian Texts and Studies, 1979). A greatly expanded recension whose additions are themselves an Armenian apocalyptic document.',
                },
                {
                    title: 'Armenian Apocrypha Relating to the Patriarchs and Prophets',
                    note: 'Michael E. Stone (Israel Academy of Sciences and Humanities, Jerusalem, 1982). Fifteen texts from the Jerusalem and Yerevan collections, all but two printed here for the first time.',
                },
                {
                    title: 'Irenaeus, Demonstration of the Apostolic Preaching',
                    note: 'Lost in Greek; found by Karapet Ter-Mkrtchian in December 1904 in a manuscript in the Church of the Blessed Virgin at Erevan, and published with Erwand Ter-Minassiantz in 1907.',
                },
                {
                    title: 'Philo Armenus',
                    note: 'Questions on Genesis and Exodus, On Providence and On Animals survive complete only in Armenian, in the exact renderings of the Hellenophile school — the version through which much of Philo is read at all.',
                },
            ],
        },
        {
            slug: 'adam-eve',
            title: 'Adam and Eve Traditions',
            native: 'Ապաշխարութիւն Ադամայ',
            translit: 'Apashkharut\'iwn Adamay — \'the Penitence of Adam\'',
            summary: 'A body of literature about the first parents in which the Armenian witnesses are not derivative but primary: the penance in the river, the bond given to Satan, and the knowledge Adam is said to have handed on.',
            paragraphs: [
                'The Life of Adam and Eve is not a book but a family of books. Its members are the Greek text conventionally called the Apocalypse of Moses, the Latin Vita Adae et Evae, the Armenian, the Georgian, the Slavonic, with Coptic fragments at the edges, and they overlap without any one of them containing the whole. The map of this territory was drawn by Michael E. Stone, whose History of the Literature of Adam and Eve (1992) remains the indispensable orientation, and whose edition of the Armenian Penitence of Adam, made from manuscripts of the Armenian Patriarchate of Jerusalem and published in the Corpus Scriptorum Christianorum Orientalium in 1981, established the Armenian text on a proper footing. What that edition showed is that the Armenian stands very close to the Georgian Book of Adam, that the two together transmit a form of the narrative fuller at several points than the Greek, and that the Armenian is therefore not a late offshoot to be consulted for variants but one of the principal witnesses to the whole tradition. Stone gathered the surrounding Armenian Adam literature — the Words of Adam to Seth, the Book of Adam, the History of the Repentance, the Death of Adam and their relations — in a further volume in 1996.',
                'The narrative that these books share begins after the expulsion, with hunger. The pair search for food fit to eat and find only what the beasts eat; Adam proposes penance, and assigns it in the form of an immersion, himself in the Jordan and Eve in the Tigris, each for a set number of days, silent, the water up to the neck. The rivers respond. In the Armenian and Georgian telling the Jordan halts its current and its creatures gather round Adam and mourn with him, which is the point of the episode: penance is not a private transaction but something the created order joins, because the created order was damaged along with the man. Then Satan comes to Eve in the appearance of an angel of light and tells her that God has heard, that the penance is accomplished, that she may come out — and she comes out before her term. Adam\'s grief at this second deception is the emotional centre of the whole literature, and its logic is precise. The first temptation worked through appetite; the second works through consolation, which is far harder to detect, and the text is candid that the appearance of an angel is exactly what a soul in the middle of a hard penance most wants to see.',
                'Out of this soil grows the legend of Adam\'s bond. In the Armenian and neighbouring traditions Adam gives Satan a written instrument — a bond, a signed obligation, a document of the kind an Armenian scribe would call a murhak — in exchange for permission to work the ground, or for light, or for release from the darkness of exile; and Satan keeps it. The instrument is not annulled by argument. It is annulled physically, when Christ goes down into the same Jordan in which Adam stood, and the document, held under the water or hidden in the stones, is dissolved by the descent; other versions place its destruction at the harrowing of hell. Behind the whole complex stands a single verse of Colossians, which speaks of the handwriting that was against us being blotted out and nailed to the cross. Michael Stone traced this legend from its Adamic origins through its liturgical and iconographic afterlife in Adam\'s Contract with Satan (2002), and the study is worth reading for what it demonstrates about how a scriptural metaphor becomes a narrative, and then a picture, and then a reason for the shape of a baptismal rite.',
                'The other great theme of the Armenian Adam books is transmitted knowledge. Adam is imagined not merely as the first sinner but as the first knower — the man who named the animals, who saw paradise, who was told what would happen — and his knowledge has to reach the reader somehow. Hence the Words of Adam to Seth, the deathbed testament, the instruction handed to the third son; hence the recurrent motif of writing set down before the flood so that it might survive it; hence the Testament of Adam, which exists in Syriac, Greek, Armenian, Arabic and Georgian and whose first section is a horarium assigning to each hour of the night and the day its own creature or order of being whose praise ascends at that hour — the doves at one hour, the fish at another, the fire and the angels at theirs. It is a cosmology in the shape of a timetable, and it says that the world is never silent. This literature was not scripture, and the Armenian church did not treat it so; it was read as commentary, homiletic material and instruction, and it is best read now in that spirit, as the record of how a Christian people thought about the beginning of things and about what could still be recovered from it.',
            ],
            terms: [
                {
                    native: 'Ապաշխարութիւն Ադամայ',
                    translit: 'Apashkharut\'iwn Adamay',
                    gloss: '\'The Penitence of Adam\', the Armenian form of the Life of Adam and Eve; edited by Michael E. Stone in CSCO 429–430 (Scriptores Armeniaci 13–14, 1981).',
                },
                {
                    native: 'ապաշխարութիւն',
                    translit: 'apashkharut\'iwn',
                    gloss: 'Penance, penitential discipline. The ordinary ecclesiastical word, here doing narrative work: the story\'s central act is a penance measured in days and rivers.',
                },
                {
                    native: 'Յորդանան',
                    translit: 'Yordanan',
                    gloss: 'The Jordan. In this literature it is the river of Adam\'s expiation before it is the river of Christ\'s baptism, and the two immersions are read as one event completed.',
                },
                {
                    native: 'դրախտ',
                    translit: 'drakht',
                    gloss: 'Garden, paradise — an Iranian loanword taken into Armenian before Christianity and then used for Eden, so that the Armenian Eden carries a Persian park inside its name.',
                },
                {
                    native: 'մուրհակ',
                    translit: 'murhak',
                    gloss: 'A bond, a written obligation, a note of debt; the Armenian term for the kind of signed instrument Adam is said to have given Satan, and the kind of document Colossians 2:14 speaks of as blotted out.',
                },
                {
                    native: 'Գիրք Ադամայ',
                    translit: 'Girk\' Adamay',
                    gloss: '\'The Book of Adam\' — one of the titles under which pieces of the Armenian Adam cycle circulate; the corpus is gathered in Stone\'s Armenian Apocrypha Relating to Adam and Eve (1996).',
                },
                {
                    native: 'Ադամ',
                    translit: 'Adam',
                    gloss: 'Adam. In the a-declension, so that the genitive is Ադամայ, Adamay — the form that stands in the titles of the Armenian Adam books.',
                },
                {
                    native: 'Եւա',
                    translit: 'Ewa',
                    gloss: 'Eve. In the Armenian Penitence hers is the longer speech: the account of the fall is given in her voice, to her children, as testimony.',
                },
            ],
            texts: [
                {
                    title: 'The Penitence of Adam',
                    note: 'Edited and translated by Michael E. Stone, CSCO 429–430 (Scriptores Armeniaci 13–14, Louvain, 1981), from manuscripts of the Armenian Patriarchate of Jerusalem. The primary Armenian witness to the Life of Adam and Eve.',
                },
                {
                    title: 'Armenian Apocrypha Relating to Adam and Eve',
                    note: 'Michael E. Stone (Studia in Veteris Testamenti Pseudepigrapha 14, Brill, 1996). Texts and translations of the shorter Armenian Adam pieces — the Words of Adam to Seth, the Book of Adam, the Death of Adam and their kin.',
                },
                {
                    title: 'A History of the Literature of Adam and Eve',
                    note: 'Michael E. Stone (Society of Biblical Literature, 1992). The standard survey of the whole multilingual family and the relations of its members; the map anyone entering the field begins from.',
                },
                {
                    title: 'Adam\'s Contract with Satan: The Legend of the Cheirograph of Adam',
                    note: 'Michael E. Stone (Indiana University Press, 2002). Traces the bond from its apocryphal origins into liturgy and iconography, and its dissolution in the Jordan.',
                },
                {
                    title: 'The Testament of Adam',
                    note: 'Extant in Syriac, Greek, Armenian, Arabic and Georgian; the Syriac and Greek traditions edited by S. E. Robinson (1982). Its horarium assigns each hour of night and day to an order of creation whose praise rises at that hour.',
                },
                {
                    title: 'Ankanon girk\' hin ktakaranats\'',
                    note: 'Ed. Sargis Yovsēp\'ianc\', Venice: San Lazzaro, 1896. Where several of the Armenian Adam pieces were first printed, and still a point of first reference for the corpus.',
                },
            ],
        },
        {
            slug: 'solomonic-magic',
            title: 'Solomonic Magic',
            native: 'Կնիք Սողոմոնի',
            translit: 'Knik\' Soghomoni — \'the seal of Solomon\'',
            summary: 'The king who compelled demons to give their names, the ring that authorised him, and the awkward fact that in Armenia the men who copied the binding-formulae were often the men whose canons condemned them.',
            paragraphs: [
                'Solomon becomes a master of demons by a series of small exegetical steps. Scripture gives him wisdom that extends over beasts, birds and plants, and gives him the Temple; the step from wisdom over creatures to authority over spirits was taken early, and by the first century Josephus could report, in the eighth book of the Antiquities, that God had granted Solomon knowledge of the art of expelling demons, that the formulae and the exorcisms he composed were still in use, and that a certain Eleazar had drawn a spirit out of a possessed man by means of a ring containing a root Solomon had prescribed, in the presence of Vespasian and his officers. The literary crystallisation of that tradition is the Greek Testament of Solomon, edited by C. C. McCown in 1922, a text of much-argued date in which an angel brings Solomon a ring, the demons are summoned one by one to build the Temple, and each in turn is compelled to give three things: its name, the harm it does, and the name of the angel or power by whom it is frustrated. That triad — name, activity, antidote — is the organising grammar of a great deal of eastern Christian demonological writing, and what follows in Armenian presupposes it.',
                'No complete Armenian translation of the Testament of Solomon is known to have been published, and it is worth saying so plainly, because the temptation to assume one is strong. What Armenian has is the same complex of motifs, arriving by other routes and lodged in other kinds of book: Solomon\'s seal invoked in the amulet scrolls; the demon that must declare itself before it can be dismissed; the angel set opposite each spirit as its counterweight; the ring, the seal, the binding. The specifically Armenian demon of this literature is the Al, a figure of long standing in the region, described as red and fiery, held to threaten women in childbirth and the newborn, and a large part of the surviving protective apparatus is directed against it. There are Armenian magical handbooks as well, of which the best known is the collection called the Six Thousand, brought to scholarly notice by James R. Russell in the Mekhitarist review Bazmavep; but the honest position is that the Armenian magical corpus in the Matenadaran and in the Jerusalem and Venice collections remains for the most part unedited, and that the field is younger than the material.',
                'The operative logic, as the texts themselves present it, is not that the practitioner has power. It is that he has access to a delegated authority already established: the demon is bound because Solomon bound it, because the angel named in the formula outranks it, and above all because the name of Christ stands over the whole. Hence the characteristic form of these texts, which is narrative before it is imperative — the story of the binding is told, and the telling is understood to renew it. Hence, too, the importance of writing. A formula recited passes; a formula written and carried is continuously present, which is one reason the Armenian protective tradition took the form of a scroll rather than a spoken charm, and why length was a virtue in it. Nothing here needs to be reconstructed operationally to be understood, and this magazine does not reconstruct it: the mechanism is stated in the sources themselves, and it is a mechanism of citation.',
                'Official Armenian opinion was consistently hostile, and the fact that the prohibitions had to be repeated suggests it was not consistently obeyed. The Kanonagirk\' Hayots\', the Armenian Book of Canons compiled in the early eighth century under the catholicos Yovhannes Odznetsi and issued in conjunction with the canons of his council at Dvin, legislates against sorcerers, diviners and those who resort to them, and later collections restate the prohibition. Eznik of Kolb had already, in the fifth century, devoted long stretches of his Refutation of the Sects to demolishing popular beliefs about spirits, fate and charms. At the far end of the medieval tradition, Grigor Tatevatsi\'s Book of Questions, completed at Tatev in 1397 and printed at Constantinople in the eighteenth century, treats angels and demons with scholastic thoroughness and rejects magical practice with equal thoroughness. And yet the hmayil scrolls that carry the demon-binding material are, on the evidence of their own colophons, very often the work of priests, deacons and monastic scribes. The condemnation was not aimed at some pagan remnant outside the church. It ran through the middle of the church\'s own scriptorium, and both sides of the line were held by the same hands.',
            ],
            terms: [
                {
                    native: 'Սողոմոն',
                    translit: 'Soghomon',
                    gloss: 'Solomon. In this literature not the wise judge or the builder but the binder: the king to whom the spirits were subjected and in whose name later formulae claim to act.',
                },
                {
                    native: 'կնիք',
                    translit: 'knik\'',
                    gloss: 'Seal, signet, and by extension an impressed mark or authenticating sign. The seal of Solomon is the emblem of delegated authority over spirits; the word also does heavy theological work elsewhere, as in the title of the seventh-century dogmatic florilegium Կնիք հաւատոյ, \'the Seal of Faith\'.',
                },
                {
                    native: 'մատանի',
                    translit: 'matani',
                    gloss: 'Ring. The object by which the authority is held and transferred; in Josephus\'s account of Eleazar it is the ring, not the word, that is credited with drawing the spirit out.',
                },
                {
                    native: 'դեւ',
                    translit: 'dew',
                    gloss: 'Demon — an Iranian inheritance, from daēva, the word for the gods the Zoroastrian reform had demoted. Armenian Christianity received its vocabulary for evil spirits from a religion that had already reclassified them.',
                },
                {
                    native: 'կախարդ',
                    translit: 'kakhard',
                    gloss: 'Sorcerer, witch. The term the canons prohibit and the term the folk tradition uses; the same word covers the professional and the accused neighbour.',
                },
                {
                    native: 'Ալ',
                    translit: 'Al',
                    gloss: 'The Al, the demon of childbirth in Armenian folk tradition, held hostile to the mother and the newborn. A large proportion of the surviving protective texts is directed against this figure.',
                },
                {
                    native: 'Գիրք հարցմանց',
                    translit: 'Girk\' hartsmants\'',
                    gloss: '\'The Book of Questions\', the great summa of Grigor Tatevatsi, completed at Tatev in 1397, which treats angels, demons and the illicit arts within a fully scholastic framework.',
                },
            ],
            texts: [
                {
                    title: 'The Testament of Solomon',
                    note: 'Greek; edited by C. C. McCown (Leipzig, 1922). The literary matrix of the tradition — the ring from the archangel, the demons compelled to name themselves, their works and the powers that thwart them. No complete published Armenian version is known.',
                },
                {
                    title: 'Josephus, Jewish Antiquities, Book VIII',
                    note: 'The earliest full statement that Solomon composed exorcistic formulae still in use, with the account of Eleazar and the ring performed before Vespasian. The bridge between the biblical Solomon and the Solomon of the later magical literature.',
                },
                {
                    title: 'Kanonagirk\' Hayots\' (The Armenian Book of Canons)',
                    note: 'Compiled in the early eighth century under Catholicos Yovhannes Odznetsi; critical edition by V. Hakobyan, 2 vols (Yerevan, 1964–71). Contains the canonical prohibitions of sorcery and divination.',
                },
                {
                    title: 'Grigor Tatevatsi, Girk\' hartsmants\'',
                    note: 'Completed at Tatev, 1397; printed at Constantinople in the eighteenth century. Scholastic treatment of angelic and demonic natures and a systematic rejection of divinatory and magical practice.',
                },
                {
                    title: 'James R. Russell, \'The Book of the Six Thousand\'',
                    note: 'Published in Bazmavep, the review of the Mekhitarist congregation of Venice. One of the few Armenian magical handbooks to have received a scholarly presentation; most of the corpus is still unedited.',
                },
                {
                    title: 'Frédéric Feydit, Amulettes de l\'Arménie chrétienne',
                    note: 'Venice: San Lazzaro, 1986. The standard descriptive study of the Armenian amulet scrolls, and the readiest access to the demon-binding material as it actually circulated.',
                },
            ],
        },
        {
            slug: 'astrology',
            title: 'Astrology',
            native: 'Աստղագուշակութիւն',
            translit: 'Astghagushakut\'iwn — \'star-divination\'',
            summary: 'A seventh-century mathematician who separated the science of the heavens from the reading of fates, a calendar that wandered through the seasons for fourteen centuries, and the almanacs that went on ignoring the distinction.',
            paragraphs: [
                'Anania Shirakatsi is the point at which Armenian exact science becomes a person. Born in the district of Shirak early in the seventh century, dissatisfied with what could be learned at home, he went in search of a teacher, and found one at last in Tychicus at Trebizond, with whom by his own account he studied for eight years before returning to Armenia to teach. That account survives: Anania wrote an autobiographical preface, and it is among the most engaging documents of the Armenian middle ages, not least for its complaint that his countrymen wanted the prestige of learning without the labour of it. His compendium of the sciences is known as the K\'nnikon, a title formed on Greek; his cosmography sets out a spherical earth, explains that the moon has no light of its own but is illuminated by the sun, accounts for eclipses without recourse to portents, and describes the Milky Way as a mass of densely crowded faint stars — a position stated in seventh-century Armenia with no instrument to support it. He compiled tables and a set of arithmetical problems that is among the earliest such collections to survive anywhere. The geographical treatise called the Ashkharhats\'oyts\', edited and translated by Robert H. Hewsen, is generally assigned to him.',
                'The calendar was not an antiquarian matter but an ecclesiastical emergency, because Easter depends on it. The Armenian year was of an Egyptian type: twelve months of thirty days, beginning with Nawasard, plus five supplementary days, the aweleats\', making three hundred and sixty-five — and no intercalation whatever. A year without a leap day slips a full day every four years, and the Armenian new year accordingly wandered backwards through the seasons, completing a circuit in something over fourteen centuries. The Great Armenian Era was reckoned from 11 July 552, a date fixed at Dvin in connection with precisely these computistical difficulties. The catholicos Anastas commissioned Anania to construct a fixed calendar that would stop the drift; Anastas died, and the reform lapsed with him. It was left to Yovhannes Sarkavag, the polymath of Haghpat, to carry out a reform in 1084, at the opening of a new great cycle, inaugurating what is called the Lesser Armenian Era. One further feature deserves notice: each of the thirty days of the Armenian month bears its own name, and among those names stand Aramazd, Anahit, Vahagn, Astghik and Mihr — the gods of pre-Christian Armenia, surviving as units of time inside the reckoning of the Christian church.',
                'The zodiac reached Armenian manuscripts in the ordinary medieval way, through calendrical and computistical miscellanies, through translated and adapted material of Persian and Arabic provenance, and through the compilations of good and evil days, moon-books and lot-books that are common to every eastern Christian manuscript tradition. The signs are the kendanakerp, the \'animal-forms\'; they are drawn in the margins of calendars, tabulated against months and against the ages of the moon, and pressed into service in the amulet scrolls, where a birth-sign or a lunar day can determine which prayer is prescribed. It is worth pausing on what the Matenadaran\'s own holdings say about the standing of the calendar in this culture. Its largest manuscript is the Homiliary of Mush, MS 7729, written and illuminated between 1200 and 1202, its six hundred-odd parchment leaves cut from the skins of some six hundred calves and weighing, in the two parts in which it is now kept, about twenty-seven and a half kilograms; the account preserved with it is that it was carried out of Mush in 1915 in two halves by two women. Its smallest is a church calendar of 1436 weighing some nineteen grams. The one is a church\'s memory; the other went in a pocket.',
                'The church\'s objection to astrology was never that the stars are unreal or unimportant, and this is why the objection could be sustained without damage to astronomy. Eznik of Kolb, writing in the fifth century, argued in his Refutation of the Sects against fate, against the horoscope and against the whole proposition that the configuration of the heavens at a birth determines a life, on the grounds that the stars are creatures like any other, that a creature cannot bind the will of another creature, and that a God who judges cannot have arranged in advance the acts he judges. Anania holds the same line and holds it as a working scientist: the heavens are to be measured, and their measure tells the time, the season and the feast — not the fortune. Grigor Tatevatsi restates it in scholastic form seven centuries later. The line, as usual, was clearer in the treatises than in the villages. Almanacs, prognostics of the birth-hour, lunaria and zodiacal rubrics went on being copied, went into print with the rest of the popular literature, and turn up in the middle of scrolls that also carry the opening of the gospel of John.',
            ],
            terms: [
                {
                    native: 'տոմար',
                    translit: 'tomar',
                    gloss: 'Calendar, and by extension the whole discipline of computus — the reckoning of the movable feasts. Armenian tomaragitut\'iwn is a recognised branch of learning with its own literature.',
                },
                {
                    native: 'Նաւասարդ',
                    translit: 'Nawasard',
                    gloss: 'The first month of the Armenian year, its name Iranian in origin (\'new year\'). Its opening day was the great festival of the pre-Christian year and remained a date of celebration long after.',
                },
                {
                    native: 'աւելեաց',
                    translit: 'aweleats\'',
                    gloss: '\'Of the added [days]\' — the five supplementary or epagomenal days that follow the twelve thirty-day months and complete the year at three hundred and sixty-five.',
                },
                {
                    native: 'կենդանակերպ',
                    translit: 'kendanakerp',
                    gloss: '\'Animal-form\': a sign of the zodiac, and in the plural the zodiac itself, as drawn and tabulated in Armenian calendrical manuscripts.',
                },
                {
                    native: 'աստղ',
                    translit: 'astgh',
                    gloss: 'Star. The root of the goddess-name Astghik (\'little star\') and of the vocabulary of both the permitted science and the forbidden one.',
                },
                {
                    native: 'աստղագուշակութիւն',
                    translit: 'astghagushakut\'iwn',
                    gloss: 'Star-divination, astrology — formed on astgh, \'star\', and gushak, \'diviner, foreteller\'. The word carries its condemnation inside it: what is objected to is the gushak, not the astgh.',
                },
                {
                    native: 'Քննիկոն',
                    translit: 'K\'nnikon',
                    gloss: 'The name given to Anania Shirakatsi\'s compendium of the sciences, formed on a Greek base. Given here in the form under which it is customarily cited; the spelling varies in the manuscripts.',
                },
                {
                    native: 'Եղծ աղանդոց',
                    translit: 'Eghts aghandots\'',
                    gloss: '\'Refutation of the Sects\', the fifth-century polemic of Eznik of Kolb, which contains the classical Armenian argument against astral fatalism and against popular divinatory practice.',
                },
            ],
            texts: [
                {
                    title: 'The works of Anania Shirakatsi',
                    note: 'Cosmography, computistical treatises, tables and arithmetical problems, together with his autobiographical preface; collected by A. G. Abrahamyan (Yerevan, 1944). The foundation of Armenian exact science.',
                },
                {
                    title: 'Ashkharhats\'oyts\' (the Armenian Geography)',
                    note: 'Attributed to Anania Shirakatsi; edited and translated by Robert H. Hewsen as The Geography of Ananias of Širak (Wiesbaden, 1992). A seventh-century world description built on Ptolemaic materials.',
                },
                {
                    title: 'Eznik of Kolb, Eghts aghandots\'',
                    note: 'Fifth century; English translation by M. J. Blanchard and R. D. Young, A Treatise on God Written in Armenian by Eznik of Kołb (Peeters, 1998). Contains the sustained refutation of fate and the horoscope.',
                },
                {
                    title: 'The Armenian calendar and the Great Era',
                    note: 'Reckoned from 11 July 552; a wandering year of 365 days with no intercalation, which drifts one day in four years and completes its circuit of the seasons in something over fourteen centuries.',
                },
                {
                    title: 'The calendar reform of Yovhannes Sarkavag (1084)',
                    note: 'The fixed calendar and the Lesser Armenian Era, instituted by the scholar of Haghpat at the opening of a new cycle, four centuries after the reform Anania had designed for the catholicos Anastas lapsed unexecuted.',
                },
                {
                    title: 'Calendrical and astrological manuscripts of the Matenadaran',
                    note: 'Miscellanies carrying zodiacal tables, moon-books, lot-books and prognostics, largely unedited. The smallest manuscript in the collection, at some nineteen grams, is a church calendar of 1436.',
                },
            ],
        },
        {
            slug: 'alchemy',
            title: 'Alchemy',
            native: 'Բժշկարան',
            translit: 'Bzhshkaran — \'the medical book\'',
            summary: 'Armenia produced no great alchemical corpus. What it produced was a substantial pharmacology in which the operative chemistry of the Islamic world arrives as therapy, and a workshop literature of pigments, inks and metals.',
            paragraphs: [
                'It is best to begin with what is not there. Armenian has no Jabirian corpus, no body of transmutational theory, no native tradition of the philosophers\' stone comparable to what Arabic, Greek, Syriac or Latin can show. Claims to the contrary should be treated sceptically. What Armenian does have, and has in quantity, is a medical literature — the bzhshkaran, the practical handbook of the physician — into which the operative chemistry of the Islamic world flowed as pharmacy: distillations, calcinations, sublimations, the preparation of mineral simples, the compounding of electuaries and pastilles, the whole apparatus of a working dispensary. Alongside it runs a technical literature of the scriptorium and the workshop, concerned with inks, gold-writing, pigments and metals. Between the two lies the honest Armenian equivalent of alchemy: a chemistry with hands, learned from Arabic and Persian masters, written down because it had to be repeatable. Everything described below is described historically and bibliographically. These are recipes of the twelfth to fifteenth centuries, many of them employing substances now known to be poisonous, and they are set out here as evidence of how a tradition thought, not as anything to be attempted.',
                'The turning point is Cilicia, where Armenian physicians worked in daily contact with Arabic, Persian, Greek and Frankish medicine. Mkhitar Heratsi\'s Consolation of Fevers, completed in 1184, is the first great monument of the tradition: a systematic treatise on the fevers, written not in classical grabar but in the middle Armenian of its own day so that practitioners could use it, distinguishing types of fever, proposing a doctrine of putrefactive causation, and prescribing regimen — air, diet, sleep, the affections of the soul, and music — before drugs. The choice of language is itself a statement about what the book was for. Around it stand the anonymous bzhshkarans, the compilations of simples and compounds, the herbals, the veterinary manuals, most of them still in manuscript in the Matenadaran and most of them still unpublished.',
                'Amirdovlat Amasiatsi is the tradition\'s great figure. Born at Amasya about 1420 and dead in 1496, he practised in Constantinople and served as a physician at the court of Mehmed II; he read Greek, Arabic, Persian and Turkish, and his books absorb the pharmacological learning of all four. The Teaching of Medicine and the Akhrapatin, a formulary named after the Arabic aqrābādhīn tradition of compound-drug books, both belong to 1459; Useful for Medicine followed in the 1460s; and at the end of his life, between 1478 and 1482, he compiled the vast alphabetical materia medica called Angitats\' anpet, \'Useless to the Ignorant\' — a title that is a warning rather than a boast, since the book refuses to be used by anyone who has not learned the art. It runs to some three and a half thousand entries, and its distinguishing feature is the synonymy: each substance is given with its names in Armenian, Greek, Latin, Arabic and Persian, which makes the book a lexicographical instrument as well as a pharmacological one. Its mineral entries are where the chemistry shows — the alums and the vitriols, sal ammoniac, the calcined metals, the stones with their attributed virtues — and they are inseparable from the Arabic tradition of ṣanʿa out of which they came. Stella Vardanyan\'s studies and translations are the modern gateway to this material.',
                'The workshop side of the tradition deserves equal notice, because it is where the Armenian handling of matter is most visible. Manuscripts carry recipes for the preparation of inks, of gold for writing, of glues and grounds and pigments; and the pigment that made Armenian illumination famous is vordan karmir, the crimson taken from a scale insect of the Ararat plain, prized across the Near East and used for both manuscripts and textiles. The vocabulary of these recipes is the vocabulary of the drug book — grind, dissolve, wash, burn, cool, purify — and it belongs to the same intellectual world in which a mineral can be corrected of its harmfulness by preparation and thereby made useful. There is a further edge to this, where pharmacy meets the amulet: the virtues of stones are recorded in the medical books, and stones and metals appear in the protective apparatus as things to be worn as well as things to be taken. A late medieval Armenian physician who set a mineral simple in a compound and a scribe who noted which stone was good against which trouble were working with the same assumption, which is that matter has properties beyond the obvious ones and that knowing them is a craft with a literature.',
            ],
            terms: [
                {
                    native: 'բժշկարան',
                    translit: 'bzhshkaran',
                    gloss: 'A medical book, the practical handbook of the physician. The generic term for the largest single genre of Armenian technical manuscript, most of it still unedited.',
                },
                {
                    native: 'բժշկութիւն',
                    translit: 'bzhshkut\'iwn',
                    gloss: 'The art of healing, medicine; also, in religious registers, healing in the broader sense. A bzhishk is a physician.',
                },
                {
                    native: 'դեղ',
                    translit: 'degh',
                    gloss: 'Drug, remedy, and also poison — the ambiguity familiar from Greek pharmakon. The word governs the whole vocabulary of preparation.',
                },
                {
                    native: 'Անգիտաց անպէտ',
                    translit: 'Angitats\' anpet',
                    gloss: '\'Useless to the Ignorant\', Amirdovlat Amasiatsi\'s alphabetical materia medica of 1478–82, with some three and a half thousand entries and their synonyms in Armenian, Greek, Latin, Arabic and Persian.',
                },
                {
                    native: 'Ախրապատին',
                    translit: 'Akhrapatin',
                    gloss: 'Amirdovlat\'s formulary of 1459, its title the Armenian form of the Arabic aqrābādhīn, the standard eastern designation for a book of compound drugs. Given in the form under which the work is customarily cited.',
                },
                {
                    native: 'Ջերմանց մխիթարութիւն',
                    translit: 'Jermants\' mkhit\'arut\'iwn',
                    gloss: '\'Consolation of Fevers\', Mkhitar Heratsi\'s treatise of 1184, written in the middle Armenian of its day rather than in grabar so that practitioners could read it.',
                },
                {
                    native: 'ոսկի',
                    translit: 'voski',
                    gloss: 'Gold. In the Armenian technical manuscripts it appears chiefly as a material of the scriptorium — the preparation of gold for writing and illumination — rather than as the object of transmutation.',
                },
                {
                    native: 'որդան կարմիր',
                    translit: 'vordan karmir',
                    gloss: '\'Worm\'s red\', the crimson dye obtained from a scale insect of the Ararat plain; the celebrated red of Armenian manuscripts and textiles, and the best-known product of Armenian applied chemistry.',
                },
            ],
            texts: [
                {
                    title: 'Mkhitar Heratsi, Jermants\' mkhit\'arut\'iwn',
                    note: 'Cilicia, 1184. The \'Consolation of Fevers\', the first systematic Armenian medical treatise, written in middle Armenian; distinguishes the fevers and prescribes regimen before pharmacy.',
                },
                {
                    title: 'Amirdovlat Amasiatsi, Angitats\' anpet',
                    note: 'Compiled 1478–82; edition by K. Basmajian (Vienna, 1926). Alphabetical materia medica of some three and a half thousand entries, each with its names in Armenian, Greek, Latin, Arabic and Persian.',
                },
                {
                    title: 'Amirdovlat Amasiatsi, Akhrapatin',
                    note: '1459. A formulary of compound medicines in the Arabic aqrābādhīn tradition, and the clearest evidence of how directly the Armenian pharmacological literature depends on Arabic models.',
                },
                {
                    title: 'Amirdovlat Amasiatsi, Ogut bzhshkut\'ean',
                    note: '\'Useful for Medicine\', of the 1460s. A general practical medicine from the physician who served at the court of Mehmed II; with the Teaching of Medicine of 1459 it frames his career on either side of the great materia medica.',
                },
                {
                    title: 'The bzhshkaran manuscripts of the Matenadaran',
                    note: 'Anonymous compilations of simples and compounds, herbals and veterinary handbooks, forming the largest body of Armenian technical writing; the greater part remains unpublished.',
                },
                {
                    title: 'The studies of Stella Vardanyan',
                    note: 'Modern editions, Russian translations and studies of the Armenian medieval medical corpus, and the standard route into Amirdovlat and Mkhitar for readers without classical and middle Armenian.',
                },
            ],
        },
        {
            slug: 'angelology',
            title: 'Angelology',
            native: 'Հրեշտակք',
            translit: 'Hreshtakk\' — \'the angels\'',
            summary: 'A word that means both angel and envoy, a Greek hierarchy translated into Armenian in the eighth century, the angel who keeps and the angel who writes, and the long lists of names in the scrolls.',
            paragraphs: [
                'The Armenian word for an angel, hreshtak, is also the word for a messenger and an ambassador, and the double sense is not a pun but the whole doctrine in miniature: an angel is defined by being sent. From that plain functional beginning the tradition built upward, and the instrument of the building was the Corpus Dionysiacum. The works attributed to Dionysius the Areopagite were rendered into Armenian in the early eighth century by Stepanos Siwnetsi, working with Dawit\' Hiwpatos — an early translation by the standards of the whole Dionysian tradition, and correspondingly valuable as a textual witness, which is why Robert W. Thomson\'s edition of it appeared in the CSCO in 1987. With it came the Celestial Hierarchy and its nine orders arranged in three triads, and with the orders came a whole way of thinking about mediation: that light and knowledge descend by degrees, that each rank receives from the rank above and imparts to the rank below, and that the visible church images the invisible order. Armenian theology absorbed it thoroughly. Grigor Tatevatsi\'s Book of Questions catechises the nine orders as settled doctrine seven centuries later.',
                'In worship and in painting the angels are everywhere. The Sharaknots\', the Armenian hymnal, carries canons for the feast of the holy archangels and of the heavenly hosts, and the liturgy is saturated with the assumption that the human assembly is the smaller half of a congregation. Gabriel dominates the iconography by way of the Annunciation: the Etchmiadzin Gospel of 989, Matenadaran MS 2374, is celebrated for the group of much earlier miniatures bound at its end, among them the Annunciation and the Adoration of the Magi, and it stands at the head of a long Armenian tradition of the annunciate angel in movement, one wing still lifted. Michael appears as captain and as the one who contends; in the amulet scrolls he is drawn armed. The archangels flank sanctuary hangings and doorways, which is a statement about thresholds: the point at which the holy begins is the point at which a guard is posted.',
                'Two angels belong particularly to the individual. The first is the guardian, the pahapan hreshtak, whose keeping is asked in the night offices of the Book of Hours and in the private prayers that accompany them — the angel appointed to one person, present at the bedside, grieved by sin, invoked by name of office rather than by proper name. The second is the angel of death, and here Armenian preserves something distinctive. In the folk tradition, rather than in the church\'s own teaching, he is the Grogh, \'the Writer\', the one who records, who sets down what is allotted and who comes at the end to collect it; the name survives in living Armenian in the imprecation Գրողը տանի, \'may the Grogh take it\', which most speakers now use without thinking about what it says. The pairing of the recording angel and the taking angel in a single figure is worth sitting with. It makes death an act of accounting rather than of violence, and it makes the whole of a life a document.',
                'The amulet scrolls are where angelology becomes operative, and where the church\'s disquiet concentrates. The hmayils carry lists of angelic names, headed by the archangels of scripture and continued with names drawn from the apocryphal stock and from further afield, sometimes in ranks of seven, sometimes at much greater length. The reasoning behind the lists is the reasoning of the Solomonic literature: every hostile power has a power set over it, so to write the name of the counterweight is to place the counterweight. The church\'s objection was not to angels, which it honours as elaborately as any tradition of the Christian east, but to two things: to names that stand in no scripture and can be vouched for by no one, and to the treatment of a name as a device that operates by being written. Both objections are old, both are canonical, and both were made repeatedly by clergy who then, in their capacity as scribes, wrote the lists out. The Armenian material offers no resolution of that contradiction, only a very full record of it.',
            ],
            terms: [
                {
                    native: 'հրեշտակ',
                    translit: 'hreshtak',
                    gloss: 'Angel; also messenger, envoy, ambassador. The same word serves for the diplomatic and the celestial errand, which is the definition doing its own work.',
                },
                {
                    native: 'հրեշտակապետ',
                    translit: 'hreshtakapet',
                    gloss: 'Archangel — \'chief of angels\', formed with the element -pet, \'head, chief\', the same that gives nahapet, patriarch, and sparapet, commander-in-chief.',
                },
                {
                    native: 'Միքայէլ',
                    translit: 'Mik\'ayel',
                    gloss: 'Michael. Captain of the hosts and the contender; in the Adam literature he is the angel who instructs Seth and who attends the burial of Adam, and in the scrolls he is drawn under arms.',
                },
                {
                    native: 'Գաբրիէլ',
                    translit: 'Gabriel',
                    gloss: 'Gabriel. The angel of the Annunciation and therefore the most frequently painted figure in Armenian manuscript illumination after Christ and the Virgin.',
                },
                {
                    native: 'պահապան հրեշտակ',
                    translit: 'pahapan hreshtak',
                    gloss: 'Guardian angel — pahapan, \'keeper, watchman\', from pahel, \'to keep\'. Invoked in the night offices and in private prayer, by office rather than by proper name.',
                },
                {
                    native: 'Գրող',
                    translit: 'Grogh',
                    gloss: '\'The Writer\'. The angel of death in Armenian folk tradition rather than in official teaching, who both records what is allotted and comes to take it; surviving in the modern imprecation Գրողը տանի, \'may the Grogh take it\'.',
                },
                {
                    native: 'Շարակնոց',
                    translit: 'Sharaknots\'',
                    gloss: 'The Armenian hymnal, the collection of sharakans — the proper hymns of the office, including the canons for the feast of the holy archangels and the heavenly hosts.',
                },
                {
                    native: 'Ժամագիրք',
                    translit: 'Zhamagirk\'',
                    gloss: 'The Book of Hours, the Armenian breviary; its night and rest offices carry the prayers that commit the sleeper to angelic keeping.',
                },
            ],
            texts: [
                {
                    title: 'The Armenian Dionysius the Areopagite',
                    note: 'Translated in the early eighth century by Stepanos Siwnetsi with Dawit\' Hiwpatos; edited by R. W. Thomson, CSCO 488–489 (1987). An early and textually significant witness to the Corpus Dionysiacum.',
                },
                {
                    title: 'Sharaknots\' (the Armenian Hymnal)',
                    note: 'The proper hymns of the Armenian office, including the canons for the archangels and the heavenly hosts; the principal place where the angelology of the tradition is sung rather than argued.',
                },
                {
                    title: 'Zhamagirk\' (the Book of Hours)',
                    note: 'The Armenian breviary. Its night and rest offices contain the prayers to the guardian angel that carried the doctrine into daily private use.',
                },
                {
                    title: 'The Etchmiadzin Gospel, Matenadaran MS 2374',
                    note: 'Dated 989, with a group of considerably earlier miniatures bound at the end — among them the Annunciation and the Adoration of the Magi — and celebrated late-antique ivory covers.',
                },
                {
                    title: 'Grigor Tatevatsi, Girk\' hartsmants\'',
                    note: 'Tatev, 1397. Sets out the nine orders of the Dionysian hierarchy, the nature and knowledge of angels, and the fall of the demons, in full scholastic order.',
                },
                {
                    title: 'Frédéric Feydit, Amulettes de l\'Arménie chrétienne',
                    note: 'Venice, 1986. The readiest published access to the angelic name-lists as they actually stand in the scrolls, with their apocryphal and unvouched-for members.',
                },
            ],
        },
        {
            slug: 'protective-prayers',
            title: 'Protective Prayers',
            native: 'Աղօթք',
            translit: 'Aghot\'k\' — \'prayers\'',
            summary: 'The summit of Armenian devotional writing was also, for a thousand years, laid under the pillows of the sick — and the church has gone on insisting that the two facts are not the same fact.',
            paragraphs: [
                'Gregory of Narek, born about 950 in Andzevatsik, was a monk of Narekavank on the southern shore of Lake Van, son of a bishop, pupil of his kinsman Anania, and a commentator on the Song of Songs before he was anything else. At the end of his life, in the first years of the eleventh century, he composed the book that Armenians simply call the Narek: the Matean voghbergut\'ean, the Book of Lamentation, ninety-five chapters each headed Ban, \'discourse\', each addressed directly to God, and each an unbroken act of self-accusation in which the writer heaps upon himself every image of failure the language will bear and then, having exhausted them, does not despair. There is nothing else quite like it. Its power is cumulative and lexical — it coins words, it piles up epithets past the point of decorum, it refuses the consolations it keeps naming — and it is, at the same time, entirely orthodox in structure, a penitent standing before God with nothing to offer but the accuracy of his account of himself. Gregory speaks of the book as something he leaves behind for others to use, a legacy and a remedy for souls. On 12 April 2015, the day he also addressed the Armenian people on the centenary of the Metz Yeghern, Pope Francis declared him a Doctor of the Church — an act of the Roman communion concerning a saint the Armenian Apostolic Church had venerated for a thousand years already.',
                'And the book became an object. A Narek was copied as a votive gift and commissioned in thanksgiving; a Narek was kept in the house; a Narek was laid at the head of a sick person, or under the pillow, or read aloud over them chapter by chapter through the night, sometimes by a priest and often by a family. Certain chapters acquired reputations for particular troubles, and manuscripts and early printings sometimes carry notes to that effect. People swore on it. People were buried with it. The Matenadaran holds it in great numbers, and the colophons record what the copies were for: for the health of so-and-so, for the soul of so-and-so, for a household in danger. None of this was marginal or furtive; it was how the book was used, at every level of society and for centuries, and any account of Armenian devotion that leaves it out is describing a different religion from the one that was practised.',
                'The Narek does not stand alone. Nerses Shnorhali, catholicos and poet of the twelfth century, composed Hawatov khostovanim, \'I Confess with Faith\', twenty-four stanzas for the twenty-four hours, which has been printed more often than almost any other Armenian text and which is recited in Armenian homes still. The Book of Hours supplies the offices and the prayers for the night. The long apotropaic prayer attributed to Cyprian of Antioch — the sorcerer who became a bishop and a martyr, and whose conversion made him the natural patron for a prayer against sorcery — circulated very widely. And there is a fact about Armenian printing worth pausing on: the first book ever printed in Armenian was the Urbat\'agirk\', the \'Friday Book\', produced at Venice in 1512 by the printer known as Yakob Meghapart, and it is not a Bible, not a liturgy, not a grammar. It is a small handbook of prayers and remedies, containing among other things an extract from the Narek and the prayer of Cyprian. The first thing Armenian print did was make the protective book portable.',
                'The church\'s position on all this has been consistent and is worth stating exactly, because it is easy to caricature in either direction. It has never denied that God heals through prayer, never discouraged the reading of the Narek over the sick, never treated the veneration of holy books as superstition in itself. What it has insisted upon is the direction of the causation: that the words avail because God hears them and because the person praying turns towards him, and not because the ink is present in the room. The canons that condemn the making and wearing of amulets are aimed at exactly the point where the second understanding replaces the first. The tension is real, it is old, and it has never been tidily resolved, in part because the same clergy who preached the distinction also wrote out the scrolls. Gregory himself, if the book is read rather than handled, settles the question in his own way: what he asks of the reader is attention, and what he offers is words to say — the book is a voice lent, and a voice must be used to work.',
            ],
            terms: [
                {
                    native: 'Մատեան ողբերգութեան',
                    translit: 'Matean voghbergut\'ean',
                    gloss: '\'Book of Lamentation\', the ninety-five-chapter masterwork of Gregory of Narek, composed at the beginning of the eleventh century.',
                },
                {
                    native: 'Նարեկ',
                    translit: 'Narek',
                    gloss: 'The book, called by the name of its author\'s monastery; and, in ordinary speech, the act of reading it — \'to read a Narek\' over someone is a recognised thing to do.',
                },
                {
                    native: 'Բան',
                    translit: 'Ban',
                    gloss: '\'Word, discourse, reason\' — the term for each of the ninety-five chapters, and the same word that renders Logos in the opening of John\'s gospel.',
                },
                {
                    native: 'աղօթք',
                    translit: 'aghot\'k\'',
                    gloss: 'Prayer, prayers. The plural is the ordinary form; an aghot\'k\' is both the act and the text that carries it.',
                },
                {
                    native: 'Աղօթք Կիպրիանոսի',
                    translit: 'Aghot\'k\' Kiprianosi',
                    gloss: 'The prayer ascribed to Cyprian of Antioch, the converted magician; among the most widely diffused Armenian protective prayers, standard in the amulet scrolls and printed in the Urbat\'agirk\'. The saint\'s name is given in its usual Armenian form.',
                },
                {
                    native: 'Հաւատով խոստովանիմ',
                    translit: 'Hawatov khostovanim',
                    gloss: '\'I Confess with Faith\', the twenty-four-stanza prayer of Nerses Shnorhali, one for each hour of the day; among the most frequently printed and most widely used of all Armenian texts.',
                },
                {
                    native: 'Ուրբաթագիրք',
                    translit: 'Urbat\'agirk\'',
                    gloss: 'The \'Friday Book\', Venice 1512, the first printed Armenian book — a handbook of prayers and remedies, including an extract from the Narek and the prayer of Cyprian.',
                },
                {
                    native: 'Նարեկավանք',
                    translit: 'Narekavank\'',
                    gloss: 'The monastery of Narek, on the southern shore of Lake Van, where Gregory lived, taught and wrote, and from which both he and his book take their name.',
                },
            ],
            texts: [
                {
                    title: 'Grigor Narekatsi, Matean voghbergut\'ean',
                    note: 'Composed c. 1002–03. Critical edition, Yerevan, 1985; English translation by Thomas J. Samuelian, Speaking with God from the Depths of the Heart (Yerevan, 2001). The summit of Armenian devotional writing.',
                },
                {
                    title: 'Narek manuscripts of the Matenadaran',
                    note: 'Held in great numbers, their colophons recording the purposes for which copies were made — for the health of the sick, for a soul, for a household in danger. The documentary record of how the book was used.',
                },
                {
                    title: 'Nerses Shnorhali, Hawatov khostovanim',
                    note: 'Twelfth century. Twenty-four stanzas for the twenty-four hours, by the catholicos-poet; among the most printed and most recited texts in the language.',
                },
                {
                    title: 'Urbat\'agirk\' (the \'Friday Book\')',
                    note: 'Venice, 1512, printed by Yakob Meghapart. The first book printed in Armenian: a small collection of prayers and remedies including the prayer of Cyprian and an extract from the Narek.',
                },
                {
                    title: 'The Prayer of Cyprian',
                    note: 'Attributed to Cyprian of Antioch, the magician turned bishop and martyr. Among the standard Armenian protective prayers, transmitted in prayer books, in print, and at length in the amulet scrolls.',
                },
                {
                    title: 'Zhamagirk\' (the Book of Hours)',
                    note: 'The Armenian breviary, source of the daily and nightly offices within which the private protective prayers of the tradition are set and from which they draw their language.',
                },
            ],
        },
        {
            slug: 'amulet-texts',
            title: 'Amulet Texts',
            native: 'Հմայիլ',
            translit: 'Hmayil — \'the amulet scroll\'',
            summary: 'A roll of paper strips a few inches wide and several metres long, illustrated, worn at the neck in a case, written for one named person, and handed down.',
            paragraphs: [
                'The hmayil is a physical form before it is a genre. Strips of paper — occasionally parchment — are glued end to end into a continuous band, commonly between five and twelve centimetres wide and running from a metre to five metres and sometimes considerably beyond; the text is written in the small hands of the later Armenian manuscript tradition, chiefly the compressed cursives descended from bolorgir; and the whole is illuminated at intervals with small framed miniatures. Rolled tight, the scroll fits in a case of leather, wood, tin or silver, and it was worn on a cord at the neck, carried in the breast, taken on journeys and to war. The crucial detail is that a manuscript hmayil was normally not generic. It was commissioned for a person, and that person\'s name is written into the prayers at the points where the formula requires a name, so that the text becomes, in the strict sense, theirs. From that follows the second crucial detail: it was inherited. Scrolls pass from a mother to a daughter, from a household to its heirs, and are still in families now. This is not an extinct practice being examined at a distance.',
                'The contents are an anthology of much of what the tradition regarded as strong. At the head, most often, the opening of John\'s gospel; then the incipits of the other three; psalms, the ninetieth above all in the Armenian numbering that follows the Septuagint; the creed; the correspondence of King Abgar of Edessa with Christ, which Armenian tradition transmits by way of Movses Khorenatsi and which functions across the Christian east as a letter with protective force; the long prayer of Cyprian; prayers of Sargis, of George, of the Virgin; catalogues of the names of God and of the angels; and the demon-binding narratives, chief among them the widely diffused eastern legend of the saint who overtakes the child-stealing demon at the water and compels her to surrender her names, which in Armenian attaches to the Al. Between the texts stand rubrics — brief notes of what a given section is good for — and pictures which are themselves part of the apparatus: the mounted saint with his lance in the demon, the Crucifixion, the Virgin and Child, the archangels armed. A hmayil is a portable church, arranged in the order in which its owner would need it.',
                'The logic of the object is presence rather than performance, and that is the single most important thing to grasp about it. A prayer said aloud is over when it is finished; a prayer written, carried and never unrolled is understood to be continuously in effect, because the text is there. This is why length is a virtue in the genre and why abridgement is rare — completeness is itself a form of security — and why the personal name matters so much, since it is what fastens a general formula to one particular body. It also explains the ambivalence of the church, which is documented in the same manuscripts. The canons prohibit the making and wearing of amulets and class the practice with sorcery; the colophons of the scrolls show priests, deacons and monastic scribes making them, sometimes signing their names, sometimes asking the reader\'s prayers for their own souls. The line between prayer and charm was not drawn between the clergy and the people. It was drawn inside the profession of the scribe, and it moved.',
                'The corpus is large and unevenly studied. The Matenadaran in Yerevan counts four hundred and sixty-two Armenian hmayils in its holdings, catalogued separately from its manuscripts and fragments; further collections are at the Armenian Patriarchate of Jerusalem, at San Lazzaro in Venice and at the Mekhitarist house in Vienna, with scattered examples in the British Library, the Bodleian and elsewhere in Europe and America. Frédéric Feydit\'s Amulettes de l\'Arménie chrétienne, published at Venice in 1986, remains the fullest descriptive treatment and the natural point of entry. From the eighteenth century onward hmayils were printed as well as written, chiefly at Constantinople, which multiplied them enormously and standardised their contents — the printed sheets leaving a blank where the manuscript would have carried the owner\'s name; manuscript production nevertheless continued alongside. Most of the corpus has never been edited, the illustrated scrolls have attracted more art-historical than textual attention, and a proper critical study of the whole tradition is still to be written. Anyone who works on it should bear in mind what these objects were and remain: not curiosities of superstition, but the things people took with them when they had to leave.',
            ],
            terms: [
                {
                    native: 'հմայիլ',
                    translit: 'hmayil',
                    gloss: 'The Armenian amulet scroll: a long narrow roll of glued paper strips, written and illustrated, carried in a case and, in its manuscript form, made for a named individual.',
                },
                {
                    native: 'գրիչ',
                    translit: 'grich\'',
                    gloss: 'Scribe; also the pen itself. The colophons of the scrolls are signed by grich\'s who are frequently in orders, which is the crux of the whole problem the amulets present to the canons.',
                },
                {
                    native: 'բոլորգիր',
                    translit: 'bolorgir',
                    gloss: '\'Round writing\', the compact minuscule that succeeded the monumental erkat\'agir and, with the cursives descended from it, supplied the small hands in which the scrolls are written.',
                },
                {
                    native: 'Ի սկզբանէ էր Բանն',
                    translit: 'I skzbane er Bann',
                    gloss: '\'In the beginning was the Word\' — John 1:1, given here as the incipit is customarily cited. The commonest opening text of a hmayil, set at the head of the roll.',
                },
                {
                    native: 'Աբգար',
                    translit: 'Abgar',
                    gloss: 'Abgar of Edessa, whose correspondence with Christ is transmitted by Movses Khorenatsi and copied into the scrolls; the letter is treated across the Christian east as protective in itself.',
                },
                {
                    native: 'Կիպրիանոս',
                    translit: 'Kiprianos',
                    gloss: 'Cyprian of Antioch, the magician who became bishop and martyr, and the patron of the great Armenian protective prayer. Given in its usual Armenian form.',
                },
                {
                    native: 'չար աչք',
                    translit: 'ch\'ar ach\'k\'',
                    gloss: '\'Evil eye\' — among the commonest of the harms the scrolls are made against, and the one whose remedies survive most vigorously into modern practice.',
                },
                {
                    native: 'Մատենադարան',
                    translit: 'Matenadaran',
                    gloss: 'The Mesrop Mashtots Institute of Ancient Manuscripts, Yerevan, which holds four hundred and sixty-two Armenian hmayils alongside more than eleven thousand complete Armenian manuscripts.',
                },
            ],
            texts: [
                {
                    title: 'Frédéric Feydit, Amulettes de l\'Arménie chrétienne',
                    note: 'Venice: San Lazzaro, 1986, in the Bazmavep armenological series. The fullest descriptive study of the Armenian amulet scrolls and the standard point of entry to them.',
                },
                {
                    title: 'The hmayil collection of the Matenadaran',
                    note: 'Four hundred and sixty-two Armenian scrolls in Yerevan, the majority unedited; further collections at the Armenian Patriarchate of Jerusalem, at Venice and Vienna, and scattered across European and American libraries.',
                },
                {
                    title: 'The Prayer of Cyprian',
                    note: 'The long apotropaic prayer ascribed to Cyprian of Antioch — among the most frequently copied texts in the scrolls, and among the contents of the first Armenian printed book.',
                },
                {
                    title: 'The Abgar correspondence',
                    note: 'Transmitted in Armenian by Movses Khorenatsi, History of the Armenians, Book II (trans. R. W. Thomson, Harvard, 1978). Copied into the scrolls as a protective letter in its own right.',
                },
                {
                    title: 'The Sisinnios legend in Armenian',
                    note: 'The eastern Christian narrative of the saint who overtakes the child-stealing demon and forces her to surrender her names; in Armenian it attaches to the Al, the demon of childbirth.',
                },
                {
                    title: 'Printed hmayils of Constantinople',
                    note: 'From the eighteenth century onward the scrolls were printed as well as copied, which standardised their contents and multiplied them, leaving a blank for the owner\'s name; manuscript production continued in parallel.',
                },
            ],
        },
        {
            slug: 'visionary-apocalyptic',
            title: 'Visionary and Apocalyptic Literature',
            native: 'Տեսիլք',
            translit: 'Tesilk\' — \'visions\'',
            summary: 'A visionary literature that is corporate from the start: it founds a church, explains the loss of a kingdom, and keeps assigning a name to whoever currently rules.',
            paragraphs: [
                'Armenian visionary literature begins with a vision that founds an institution. In the History attributed to Agathangelos, which gives the classical account of the conversion of Armenia, Gregory the Illuminator sees the heavens open over Vagharshapat and the Only-Begotten descend with a hammer of gold, striking the ground to mark where the church is to stand; columns of light and crosses rise over the places where the martyred virgins lie, and the whole plan of the future cathedral and its martyria is laid out in advance. From that vision the mother church of the Armenians takes the name it still bears, Etchmiadzin, \'the Only-Begotten descended\'. The character of the episode sets the pattern for much of what follows. This is not a mystic\'s private ascent and it does not concern the seer\'s own soul; it is architectural, public, and about the future of a people, and Armenian visionary writing remains corporate in that way for a very long time afterwards.',
                'The Vision of St Sahak is the hinge text. It is preserved not as an independent apocryphon but embedded in the History of Ghazar Parpetsi, written at the end of the fifth century, and it is attributed to Sahak Partev — catholicos, last of the line of Gregory the Illuminator, and the man under whom the alphabet was made and the Bible translated. In the vision he is shown the state of the sanctuary and the throne, and told what is to come: that the royal line of the Arsacids and his own patriarchal line will both fail, that a long affliction will follow, and that at the end there will be restoration. Ghazar wrote after both lines had in fact failed — the Arsacid kingdom extinguished in 428, the patriarchate passed out of Gregory\'s family — and after Avarayr. The vision is therefore a theodicy composed in retrospect for a nation that has lost its king and must go on existing anyway, and it does the work that all such texts do: it converts catastrophe from meaningless accident into a foretold stage, which is a way of surviving it. The Armenian church\'s later self-understanding as the carrier of national identity in the absence of a state has one of its roots in this passage.',
                'The technical apocalyptic corpus proper is smaller. Its best-known member is the Seventh Vision of Daniel, which survives only in Armenian, in a handful of manuscripts, though it was composed in Greek; Grigor Kalemkiar edited it with a German translation in 1892, and Sergio La Porta translated it into English in the More Noncanonical Scriptures volume of 2013. It runs the standard machinery — the sequence of kingdoms, the tribulation, the Antichrist, the last things — and it is now generally placed in the late fifth century, with the apparent allusion to the Arab conquests treated as a later interpolation rather than as the crisis that produced the text. Alongside it Armenian transmits versions of the Apocalypse of Pseudo-Methodius, circulating in Armenian by the early eighth century, with its Last Emperor who surrenders his crown at Golgotha; the apocalypse known as the Vision of Enoch the Just, whose surviving redaction belongs to Cilicia and reads as an expression of Rubenid royal ideology; and the prophecy circulating under the name of Nerses the Great, first attested in a tenth-century vita ascribed to Mesrop Erets and given its surviving shape in the decades after the First Crusade, which foretells the fall of the Arsacid and Gregorid houses, the coming of the \'nation of the archers\' and the arrival of the Franks. The Antichrist in this literature is the Nerr, whose etymology is disputed, and the observation that has to be made about him is that he tends to resemble whoever is currently in charge.',
                'There is one further genre that belongs here although it is not apocalyptic by form, and that is the colophon. Armenian scribes wrote long memorials at the ends of their manuscripts — the yishatakaran — recording who paid for the book, who copied it, and what was happening while it was being copied; and because of when and where they were written, an extraordinary number of them record invasion, siege, famine, plague and massacre. Avedis Sanjian\'s Colophons of Armenian Manuscripts, 1301–1480 assembled them for the worst of the medieval centuries, and reading them in sequence is a particular experience: the scribes reach again and again for the language of the last days, because it is the only register adequate to what they are describing, and then finish the book anyway. That combination — apocalyptic vocabulary in the service of continued work — is probably the truest description of the genre in Armenian. It should be read as the record of a people\'s endurance under other people\'s rule, and read carefully, because a literature that names the enemy of God has always been available for reuse, and has been reused.',
            ],
            terms: [
                {
                    native: 'տեսիլ',
                    translit: 'tesil',
                    gloss: 'A vision; the standard term for the genre, from tesanel, \'to see\'. The plural, տեսիլք, tesilk\', names the corpus.',
                },
                {
                    native: 'Տեսիլ Գրիգորի',
                    translit: 'Tesil Grigori',
                    gloss: 'The Vision of Gregory the Illuminator, in the History of Agathangelos: the descent of the Only-Begotten with the golden hammer at Vagharshapat, marking out the ground plan of the mother church.',
                },
                {
                    native: 'Էջմիածին',
                    translit: 'Ejmiatsin',
                    gloss: '\'The Only-Begotten descended\' — the name of the mother see of the Armenian Church, taken directly from the vision that founded it.',
                },
                {
                    native: 'Տեսիլ Սահակայ',
                    translit: 'Tesil Sahakay',
                    gloss: 'The Vision of St Sahak, preserved in the History of Ghazar Parpetsi: the foretelling of the failure of the Arsacid kingdom and of the Gregorid patriarchate, and of restoration at the end.',
                },
                {
                    native: 'Դանիէլ',
                    translit: 'Daniel',
                    gloss: 'Daniel. The patron of the whole eastern apocalyptic tradition; the Armenian Seventh Vision, composed in Greek, survives in Armenian alone.',
                },
                {
                    native: 'Նեռ',
                    translit: 'Nerr',
                    gloss: 'The Antichrist. A short, blunt word whose derivation is disputed; whatever its origin, it is the form in which the figure entered ordinary Armenian speech.',
                },
                {
                    native: 'յիշատակարան',
                    translit: 'yishatakaran',
                    gloss: 'A colophon, literally a \'memorial\': the long scribal note at the end of an Armenian manuscript recording patron, scribe, place, date and circumstances — often the circumstances of catastrophe.',
                },
                {
                    native: 'Ղազար Փարպեցի',
                    translit: 'Ghazar Parpetsi',
                    gloss: 'Ghazar of Parpi, historian of the late fifth century, in whose History of the Armenians the Vision of St Sahak is preserved.',
                },
            ],
            texts: [
                {
                    title: 'Agathangelos, History of the Armenians',
                    note: 'Edited and translated by R. W. Thomson (SUNY Press, 1976). Contains the Vision of St Gregory at Vagharshapat, from which Etchmiadzin takes its name — the founding vision of the tradition.',
                },
                {
                    title: 'Ghazar Parpetsi, History of the Armenians',
                    note: 'Late fifth century; translated by R. W. Thomson (Scholars Press, 1991). Preserves the Vision of St Sahak on the fate of the kingdom and the patriarchate.',
                },
                {
                    title: 'The Seventh Vision of Daniel',
                    note: 'Composed in Greek, extant only in Armenian; edited with German translation by G. Kalemkiar (1892); English translation by Sergio La Porta in Old Testament Pseudepigrapha: More Noncanonical Scriptures, vol. 1 (2013), which argues for a late fifth-century date.',
                },
                {
                    title: 'The Armenian Apocalyptic Tradition: A Comparative Perspective',
                    note: 'Ed. Kevork B. Bardakjian and Sergio La Porta (Brill, 2014). The standard modern collection on the Armenian apocalyptic corpus, including the Seventh Vision and the Cilician apocalypses.',
                },
                {
                    title: 'The Vision of Enoch the Just',
                    note: 'An Armenian political apocalypse whose surviving redaction belongs to the Cilician kingdom and expresses the aspirations of its Rubenid rulers; studied in recent scholarship by Zaroui Pogossian.',
                },
                {
                    title: 'Avedis K. Sanjian, Colophons of Armenian Manuscripts, 1301–1480',
                    note: 'Harvard University Press, 1969. Scribal memorials from the worst of the medieval centuries, in which invasion, famine and massacre are recorded in the vocabulary of the last days.',
                },
            ],
        },
    ],
};
