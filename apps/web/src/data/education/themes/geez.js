// geez — The Currents: thematic essays on this tradition's esoteric
// disciplines. Fact-checked by the content pipeline: scripts verified
// against unicodedata, sources and attributions audited, and practice
// described historically rather than prescribed.
export default {
    note: 'Independent fact-checking pass over the Geʿez Currents. SCRIPT: every native-script string in the batch — theme headers, term entries and every Ethiopic word embedded in the prose — was run character by character through python3 unicodedata.name(). Sixty-eight distinct strings were tested; sixty-seven resolved entirely inside the Ethiopic block (U+1200–U+137F) with no lookalikes, no unnamed codepoints and no stray combining marks. One defect was found and removed: a ZERO WIDTH SPACE (U+200B) had been left immediately before መስቀል in the Exorcism essay, invisible on the page and silently corrupting the string. Five fields carry transliteration rather than script, each with a gloss that says so: Semyaza and ʿAzazʾel, whose Geʿez forms in the Enoch manuscripts could not be confirmed; Wərzəlya, whose orthography varies between manuscripts; ʿƏrgätä Isayəyas, the Geʿez title of the Ascension of Isaiah; and the Arabic-derived planet names of the divinatory literature. SOURCES: the one substantive error of fact was in the archangel calendar. The draft placed Raphael\'s monthly commemoration on the third of the month; that is Phanuel\'s day. Raphael\'s monthly day is the thirteenth, and the third of Ṗagʷəmen is his annual feast — the draft had folded the annual feast into the monthly cycle. The correction has been made and the passage deepened with the church\'s full reckoning of seven archangels and their days. The Qumran sigla have been made exact: eleven Enochic manuscripts, not the whole run 4Q201–4Q212, since 4Q203 belongs to the Book of Giants. Editions, series and dates have been checked where checkable, and several have been given fuller identity. HEDGES: the date of the Parables is presented as contested and Milik\'s Book of Giants substitution as his hypothesis rather than as an established fact; the Kəbrä Nägäśt colophon is reported as a claim and distinguished from the scholarly dating; the Enochic 364-day year is held apart from the Ethiopian civil calendar rather than blurred into it; the church\'s position on zar is stated as its consistent official position, and lay attendance is attributed to ethnographers rather than quantified. Rhetorical flourishes that outran the evidence have been cut. Buda is described throughout as an accusation levelled at people, never as a property anyone has, and the harm it has done — above all to the Beta Israel — is stated. Zar, ṣäbäl and the Marian Kidan are living practice and are written about in the present tense. No formula, name-list, recipe, dosage or procedure is reproduced anywhere in these essays.',
    themes: [
        {
            slug: 'enochic-literature',
            title: 'The Enochic Literature',
            native: 'መጽሐፈ ሄኖክ',
            translit: 'Mäṣḥafä Henok — the Book of Enoch',
            summary: 'A book the whole world lost and one church kept: the five Enochic writings, complete in Geʿez alone until the Aramaic came up out of the Judaean desert.',
            paragraphs: [
                'For the better part of a thousand years the Book of Enoch survived entire in one language and one church. The Greek from which the Geʿez had been made went to pieces, surviving in a single mutilated codex, a papyrus of the last third, and the excerpts the Byzantine chronographer George Syncellus copied out around the year 810. The Aramaic beneath the Greek vanished altogether. The Latin West kept the name, the memory of a book the Epistle of Jude had quoted as prophecy, and the settled decision of the Fathers to do without it. In Ethiopia nothing of the kind happened, because there the book was never marginal. መጽሐፈ ሄኖክ stands in the Old Testament of the Ethiopian Orthodox Täwaḥədo Church as scripture, copied among the prophets, read, expounded, quarried for prayer. The modern study of Second Temple apocalyptic therefore rests, at its very foundation, on the copying habits of Ethiopian scribes who went on transcribing a book for fourteen centuries after everyone else had let it fall out of their hands.',
                'What they transcribed is not one work but five, gathered under a single name. The Book of the Watchers (chapters 1–36) tells of the angels who came down, and takes Enoch on a guided journey to the ends of the earth, the storehouses of the winds, the prison of the stars and the places where the dead are kept in separate hollows. The Book of Parables or Similitudes (37–71) is the visionary heart, with its pre-existent Elect One and its ወልደ ሰብእ, the Son of Man, seated on the throne of glory to judge the kings and the mighty. The Astronomical Book (72–82) is the driest and in some ways the most consequential, a schematic cosmology of gates and courses dictated to Enoch by the archangel Uriel. The Book of Dream Visions (83–90) contains the Animal Apocalypse, in which the whole history of Israel is retold with its actors as sheep, bulls and wild beasts, running down to the Maccabean revolt with a precision that has long been used to date it. The Epistle of Enoch (91–108) closes the collection with the Apocalypse of Weeks, a periodisation of history into ten weeks, and a long testamentary denunciation of the rich.',
                'The book came back to Europe in luggage. James Bruce of Kinnaird, who had spent the years 1769 to 1772 in Ethiopia looking for the source of the Nile, returned in 1773 with three manuscripts of Enoch; one went to the royal library in Paris, one to the Bodleian, one he kept. It took nearly half a century for anyone to do anything with them. Richard Laurence, then Regius Professor of Hebrew at Oxford and afterwards Archbishop of Cashel, published the first English translation from the Bodleian copy in 1821, and the Geʿez text itself in 1838; August Dillmann\'s edition of 1851 and German version of 1853 put the study on a professional footing, and R. H. Charles carried it into the twentieth century. Then, from 1952, Cave 4 at Qumran gave up Aramaic fragments of Enoch — eleven manuscripts in the end, the earliest assigned on palaeographic grounds to the early second century before Christ or earlier — and the long argument about whether the Ethiopic could be trusted was largely settled. J. T. Milik\'s edition of 1976 showed a Geʿez text that, for all the slips of a translation of a translation, had held its shape.',
                'The narrative that made the book notorious occupies its first section. Two hundred of the Watchers, angels set to observe, descend upon Mount Hermon and bind themselves by a mutual oath not to draw back; their chief the Geʿez calls Semyaza. They take wives among the daughters of men, and another of their number teaches what ought not to have been taught — metalwork and the making of weapons, the cutting of stones, and the arts by which women are made beautiful. The offspring are giants, who consume everything and at last turn upon humanity, and the earth cries out. Four archangels bring the cry before the throne; the sentence is bondage for the Watchers and destruction for their sons. What matters for everything that follows in this hall is the clause about the aftermath: the spirits that came out of the bodies of the dead giants do not go anywhere. They remain on the earth, hungry and disembodied, and they afflict the living. That is an aetiology of demons, given as scripture, and it is the reason Ethiopian demonology has a canonical charter that most other churches lack.',
                'One honest caution belongs at the end. The Parables, the section containing the Son of Man, are the one book of the five with no Aramaic representative at Qumran. Milik took the silence as decisive, suggested that the Book of Giants had occupied their place in an Aramaic Enochic collection, and proposed for the Parables a Christian composition of the third century after Christ; that reconstruction rests on an argument from silence and has found almost no support. The internal indications usually adduced — an allusion to Parthians and Medes overrunning the land, a passage about the hot springs frequented by the kings and the mighty — point rather to the last decades before Christ or the first after, and the discussion gathered in Gabriele Boccaccini\'s Enoch Seminar volume of 2007 converged on that range without claiming to have closed the question. The date matters because it decides whether the Parables are evidence for the world in which the Gospels use the phrase Son of Man, or evidence of that phrase being read back. The Geʿez manuscripts cannot answer the question; they only preserve it.',
            ],
            terms: [
                {
                    native: 'መጽሐፈ ሄኖክ',
                    translit: 'Mäṣḥafä Henok',
                    gloss: 'The Book of Enoch. Mäṣḥaf, book, in the construct state before the prophet\'s name. Canonical scripture in the Ethiopian Orthodox Täwaḥədo Church, and the only complete witness to the work in any language until the twentieth century.',
                },
                {
                    native: 'ወልደ ሰብእ',
                    translit: 'wäldä säbʾ',
                    gloss: 'Son of Man, literally son of humankind; the enthroned judge of the Parables, and the point on which the dating of that section turns.',
                },
                {
                    native: 'ብርሃናት',
                    translit: 'bərhanat',
                    gloss: 'Luminaries, plural of bərhan, light. The subject of chapters 72–82, which the manuscripts head with a phrase about the courses of the luminaries of heaven; the Geʿez wording of that heading varies and is not given here in script.',
                },
                {
                    native: 'Semyaza',
                    translit: 'Semyaza (Aramaic Šemiḥazah)',
                    gloss: 'Given in transliteration only: the Geʿez orthography of the name in the Enoch manuscripts could not be confirmed. The leader of the two hundred Watchers who descend on Hermon and bind themselves by oath.',
                },
                {
                    native: 'ʿAzazʾel',
                    translit: 'ʿAzazʾel (Aramaic ʿAsaʾel)',
                    gloss: 'Given in transliteration only, for the same reason. The Watcher who teaches metallurgy, weaponry and the arts of ornament, and who is bound in the desert place the text calls Dudael.',
                },
                {
                    native: 'መጽሐፍ',
                    translit: 'mäṣḥaf',
                    gloss: 'Book, volume, writing. The word that opens a great proportion of Geʿez titles, and by extension the codex itself — in Ethiopia a wooden-boarded, leather-covered parchment book of a kind still made.',
                },
                {
                    native: 'ግዕዝ',
                    translit: 'Gəʿəz',
                    gloss: 'The language: a South Semitic tongue, the vehicle of the Aksumite kingdom, no longer spoken but never dead, retained as the language of scripture, liturgy and learning much as Latin was retained in the West.',
                },
            ],
            texts: [
                {
                    title: '1 Enoch (Mäṣḥafä Henok)',
                    note: 'Complete only in Geʿez, in manuscripts of the fifteenth century and later; two recensions are distinguished, an older and a later vulgate. Standard modern editions: Michael A. Knibb, The Ethiopic Book of Enoch (2 vols, Oxford, 1978), printed from Rylands Ethiopic MS 23 with full apparatus; commentary by George W. E. Nickelsburg and James C. VanderKam in the Hermeneia series (2001, 2012).',
                },
                {
                    title: 'The Aramaic fragments, Qumran Cave 4',
                    note: 'Eleven Aramaic manuscripts of Enochic material: seven of the Enoch books proper (4Q201–202, 204–207, 212) and four of the Astronomical Book (4Q208–211). 4Q203, from the same cave, belongs to the Book of Giants rather than to Enoch. Edited by J. T. Milik, The Books of Enoch: Aramaic Fragments of Qumrân Cave 4 (Oxford, 1976). No fragment of the Parables is among them.',
                },
                {
                    title: 'Codex Panopolitanus (the Akhmim Greek Enoch)',
                    note: 'Found in a Christian grave at Akhmim in Upper Egypt during the French mission\'s season of 1886–87, together with fragments of the Gospel and Apocalypse of Peter; contains 1 Enoch 1:1–32:6 in Greek. Published by Urbain Bouriant in 1892.',
                },
                {
                    title: 'The Chester Beatty–Michigan papyrus',
                    note: 'A fourth-century Greek codex carrying much of the Epistle of Enoch (roughly chapters 97–107) alongside Melito of Sardis on the Passover; published by Campbell Bonner as The Last Chapters of Enoch in Greek (1937).',
                },
                {
                    title: 'Richard Laurence, The Book of Enoch the Prophet (Oxford, 1821)',
                    note: 'The first translation into a European language, made from one of the manuscripts James Bruce deposited at the Bodleian after his return from Ethiopia in 1773. Laurence followed it with the Geʿez text, Libri Enoch versio aethiopica, in 1838.',
                },
                {
                    title: 'August Dillmann, Liber Henoch aethiopice (Leipzig, 1851)',
                    note: 'The critical edition that made Enoch a subject of scholarship rather than a curiosity, with Dillmann\'s German translation and commentary, Das Buch Henoch, following in 1853.',
                },
            ],
        },
        {
            slug: 'biblical-apocrypha',
            title: 'Biblical Apocrypha',
            native: 'ክብረ ነገሥት',
            translit: 'Kəbrä Nägäśt — the Glory of Kings',
            summary: 'The widest canon in Christendom, the books no one else kept, and the national epic that made a dynasty out of a queen\'s journey.',
            paragraphs: [
                'The Ethiopian Orthodox Täwaḥədo Church is commonly said to receive eighty-one books. The number is traditional and much repeated; the lists behind it are not uniform, and no single authoritative enumeration exists, a point R. W. Cowley established in a careful article of 1974 and which Ethiopian scholars themselves make without embarrassment. What is beyond argument is the breadth. The Old Testament includes Enoch and Jubilees as scripture; it includes 4 Ezra, which Ethiopian usage calls Ezra Sutuʾel, and three books of Meqabyan. The broader reckoning of the New Testament adds to the twenty-seven a set of church orders and disciplinary writings — the Sinodos in four parts, the Mäṣḥafä Kidan or Testament of the Lord in two, the Ethiopic Clement and the Ethiopic Didascalia — which elsewhere would be filed under canon law rather than scripture. The effect is that texts the rest of Christendom debated and then let go were in Ethiopia simply copied, bound and read, and are therefore extant.',
                'Jubilees is the clearest case. In Geʿez it is መጽሐፈ ኩፋሌ, the Book of Divisions, and it survives complete only there. It retells Genesis and the opening of Exodus as a revelation dictated to Moses on Sinai by the Angel of the Presence, laying the whole of sacred history out on a grid of jubilees of forty-nine years, insisting on a 364-day solar calendar and denouncing those who keep any other, and supplying a good deal that Genesis omits — the names of the patriarchs\' wives, the origin of the festivals, and, in its tenth chapter, an episode of the first importance for this hall: Noah petitions against the spirits that came from the giants, nine-tenths of them are bound, a tenth is left to the prince named Mastema, and the angels teach Noah the remedies against them, which he writes down and gives to Shem. Medicine, in the Ethiopian canon, has an angelic charter and a book. Hebrew fragments of some fourteen or fifteen manuscripts of Jubilees have since come out of Qumran, and about a quarter of the text survives in a Latin palimpsest at the Ambrosiana; the whole of it survives only in Geʿez, in the edition James VanderKam published in 1989.',
                'The three books of Meqabyan require a warning that catalogues have not always given. መቃብያን is not the Ethiopic version of the Greek books of Maccabees. There is no textual relation whatever: the Ethiopian books tell a different story, of martyrs under a persecuting king, and pass into long homiletic reflection on the resurrection of the body and the vanity of the world. The similarity of name has caused real confusion in library records and in older scholarship, where Ethiopic Maccabees have been listed as though they translated the familiar text. They were described in Europe from the middle of the nineteenth century in August Dillmann\'s catalogues of the Ethiopic manuscripts of the British Museum and the Bodleian, but critical editions and translations have appeared only recently, and they remain among the least read books of any living biblical canon. The Ascension of Isaiah is another survival of the same kind: a composite work whose first half narrates the prophet\'s death, sawn asunder at the instigation of a false prophet, and whose second half carries him up through seven heavens and shows him the Beloved descending through them in disguise. Greek, Latin, Coptic and Slavonic preserve fragments and portions; the whole exists in Geʿez.',
                'Beside the canon stands the book that is not canonical and yet has weighed more on Ethiopian self-understanding than most books that are. ክብረ ነገሥት, the Glory of Kings, tells how Makədda, queen of the south, hearing of Solomon\'s wisdom from the merchant Tamrin, goes up to Jerusalem; how Solomon obtains her by a stratagem over a dish of spiced food and a jar of water; how their son, called in the book Bäynä Ləḥkəm and afterwards Mənilək, returns to his father and is anointed; and how the young man\'s companions, the sons of the elders of Israel, carry off the Ark of the Covenant and bring it to Aksum, so that the presence departs from Zion and settles in Ethiopia. Its colophon claims that the work passed from Coptic into Arabic in the year 1225 and thence into Geʿez by the hand of Yəsḥaq, nəburä əd of Aksum; scholarship places the compilation in the early fourteenth century, under the restored Solomonic line, which had every reason to want such a book. Its afterlife is not literary. The claim of descent from Solomon through Mənilək was written into the imperial constitutions of 1931 and 1955, and remained the formal basis of the Ethiopian throne until 1974. And the Ark is not a memory: every Ethiopian church contains its ታቦት, the consecrated tablet that makes it a church, kept veiled in the sanctuary and carried in procession under cloth at Ṭəmqät, and the Church of Mary of Zion at Aksum is held to hold the original.',
            ],
            terms: [
                {
                    native: 'ክብረ ነገሥት',
                    translit: 'Kəbrä Nägäśt',
                    gloss: 'The Glory of Kings. Kəbr, glory or honour, in construct with nägäśt, the plural of nəguś, king. The national epic and the charter of the Solomonic dynasty.',
                },
                {
                    native: 'መጽሐፈ ኩፋሌ',
                    translit: 'Mäṣḥafä Kufale',
                    gloss: 'The Book of Divisions — Jubilees. Kufale from the root käfälä, to divide, naming the work\'s division of history into jubilee periods of forty-nine years.',
                },
                {
                    native: 'መቃብያን',
                    translit: 'Mäqabyan',
                    gloss: 'The three Ethiopic books of that name, canonical in the Ethiopian Old Testament and unrelated in content to the Greek books of Maccabees despite the resemblance of the title.',
                },
                {
                    native: 'ታቦት',
                    translit: 'tabot',
                    gloss: 'The consecrated altar tablet, one in every Ethiopian church, standing for the Ark and making the building a church. Kept in the sanctuary, seen by clergy alone, and borne out veiled in procession at the great feasts. A living object of reverence, not an antiquity.',
                },
                {
                    native: 'ጽዮን',
                    translit: 'Ṣəyon',
                    gloss: 'Zion. In Ethiopian usage at once the Jerusalem of scripture, the Ark itself, the Virgin, and the church at Aksum dedicated to Mary of Zion; the ambiguity is doctrinal rather than careless.',
                },
                {
                    native: 'ተዋሕዶ',
                    translit: 'Täwaḥədo',
                    gloss: 'Union, being made one: the Christological term the Ethiopian and Eritrean churches carry in their names, affirming the single united nature of the incarnate Word.',
                },
                {
                    native: 'ʿƏrgätä Isayəyas',
                    translit: 'ʿƏrgätä Isayəyas',
                    gloss: 'The Ascension of Isaiah, given here in transliteration because the Geʿez spelling of the title as it stands in the manuscripts could not be confirmed. The work survives complete in Geʿez alone.',
                },
            ],
            texts: [
                {
                    title: 'The Book of Jubilees (Mäṣḥafä Kufale)',
                    note: 'Complete only in Geʿez; some fourteen or fifteen fragmentary Hebrew manuscripts from Qumran, about a quarter of the text in a Latin palimpsest at the Ambrosiana. Critical edition and translation by James C. VanderKam, CSCO 510–511 (1989). Composed in Hebrew, commonly dated to the middle of the second century before Christ.',
                },
                {
                    title: 'The Ascension of Isaiah',
                    note: 'Complete only in Geʿez; partial Greek, Latin, Coptic and Old Church Slavonic witnesses. A composite of a Jewish martyrdom narrative and a Christian visionary ascent through seven heavens. Critical edition in Corpus Christianorum Series Apocryphorum 7–8 (1995), the commentary volume by Enrico Norelli.',
                },
                {
                    title: 'Kəbrä Nägäśt',
                    note: 'Edited with a German translation by Carl Bezold (Munich, 1905); an English version by E. A. Wallis Budge appeared in 1922. The Geʿez compilation belongs to the early fourteenth century, whatever the colophon\'s account of a Coptic original.',
                },
                {
                    title: 'The three books of Meqabyan',
                    note: 'Canonical in the Ethiopian Old Testament, without textual relation to 1–4 Maccabees. Described in August Dillmann\'s catalogues of the Ethiopic manuscripts of the British Museum (1847) and the Bodleian (1848); critical editing and translation are recent and still in progress.',
                },
                {
                    title: 'Ezra Sutuʾel (4 Ezra)',
                    note: 'The apocalypse of Ezra, canonical in Ethiopian usage; the Geʿez is one of the principal versional witnesses to a work lost in its Greek original and known chiefly through Latin, Syriac, Ethiopic, Armenian, Georgian and Arabic.',
                },
                {
                    title: 'R. W. Cowley, \'The Biblical Canon of the Ethiopian Orthodox Church Today\'',
                    note: 'Ostkirchliche Studien 23 (1974), 318–23: the article that set out clearly what the traditional figure of eighty-one books does and does not mean, distinguished the narrower from the broader canon, and showed why the surviving lists differ from one another.',
                },
            ],
        },
        {
            slug: 'angelology',
            title: 'Angelology',
            native: 'መላእክት',
            translit: 'mälaʾəkt — angels',
            summary: 'Seven names, a day in every month for each of them, and the two intercessors on whom Ethiopian devotion actually rests.',
            paragraphs: [
                'Ethiopian Christianity is populated. The angels are not an abstraction to be affirmed in a creed but named persons with feasts, homilies, hymns, dedications and namesakes, and the four whose names are heard most are ሚካኤል, ገብርኤል, ሩፋኤል and ኡራኤል. They are in the churches, painted on the walls in ranks with drawn swords, and they are in the population: Gäbrä Mikaʾel, servant of Michael, and Haylä Mikaʾel, strength of Michael, and Wäldä Gäbrəʾel, son of Gabriel, are ordinary Ethiopian names, given at baptism and carried for life. To name a child for an archangel is to place him under a patron in a quite specific sense — the patron whose day the household will keep, whose feast it will observe with bread and drink for the neighbours, and to whom it will turn when something goes wrong. This is the ground on which everything else in this hall stands, and it should be understood before the amulets and the exorcisms are approached, because the amulets and the exorcisms invoke exactly these names and nothing stranger.',
                'The commemorations are monthly, not annual, which changes their weight entirely. Michael is kept on the twelfth day of every Ethiopian month, Gabriel on the nineteenth, Raphael on the thirteenth; a feast that returns twelve or thirteen times a year is not an anniversary but a rhythm. The church\'s own reckoning names seven archangels and gives each of them a day — Raguel the first, Phanuel the third, Saqʷeʾel the eighth, Uriel the twenty-second — so that the month is scanned by angels from beginning to end. Certain recurrences carry more than others. Ḫədar Mikaʾel, the twelfth day of the third month, and Säne Mikaʾel in the ninth are Michael\'s great days; Taḫśaś Gäbrəʾel, the nineteenth of the fourth month, draws to the shrine at Kulubi in the eastern highlands one of the largest pilgrimages in the country, tens of thousands walking the last stretch of road. Raphael\'s annual feast falls not on his monthly day but on the third of ጳጉሜን, the short thirteenth month, for which the synaxary supplies the account of his church on an island outside Alexandria. The Ethiopian ስንክሳር, the synaxary translated from Arabic and then enlarged with Ethiopian saints, provides the readings for all these days, and beside it stands a body of homiletic literature written for them: the ድርሳነ ሚካኤል, a collection of discourses on Michael arranged for the monthly rounds, and the mälkəʾ hymns, a distinctively Ethiopian genre in which stanza after stanza salutes a different part of the honoured one\'s body, working downward from the hair of the head. Above the archangels the liturgy sets the ካህናተ ሰማይ, the twenty-four priests of heaven taken from the fourth chapter of the Apocalypse, who appear in the anaphoras, in the painted ceilings, and in the great intercessory prayers.',
                'Uriel has a particular office in this tradition, and it comes out of Enoch. Through chapters 72 to 82 it is Uriel who conducts the patriarch, shows him the gates by which the sun goes out and comes in, gives him the reckoning of the moon\'s light, and identifies himself as the one whom the Lord has set over the luminaries; earlier, in the tour of the ends of the earth, he goes before Enoch through the places of punishment and explains what is being punished there. He is thus the angel of measure and of the calendar, and it is not accidental that his name recurs in Ethiopian texts concerned with computation and with the ordering of time. That an archangel guides the seer, names the mechanism and answers the questions is the model on which a great deal of later Ethiopian visionary and protective literature is built: knowledge is not seized, it is shown, and it is shown by a named angel who can be addressed afterwards.',
                'And yet it would misrepresent Ethiopian devotion badly to describe its angelology without ማርያም standing beside it, because in practice the two are inseparable and Mary is the greater. She has thirty-three annual feasts, instituted by the emperor Zärʾa Yaʿəqob in the fifteenth century; she has a monthly commemoration of her own on the sixteenth, the Covenant of Mercy; she has the Praises recited daily through the week; she has a corpus of miracles read aloud in church. A protective text that invokes Michael will invoke Mary in the same breath, and the ordinary Ethiopian oath and ordinary Ethiopian exclamation are both by her name. The relation between the two devotions is complementary rather than competitive: the archangel is the executive power, the one who strikes, who guards the gate, who carries the soul across; the Mother of God is the one who asks. It is worth stating plainly, since a reader coming to the amulet literature first may take Ethiopian religion to be a business of angel names, that it is in fact a business of intercession, and that the angels are one half of it.',
            ],
            terms: [
                {
                    native: 'መላእክት',
                    translit: 'mälaʾəkt',
                    gloss: 'Angels, plural of mälaʾək, messenger — the same Semitic root that gives Hebrew malʾakh and Arabic malak.',
                },
                {
                    native: 'ሚካኤል',
                    translit: 'Mikaʾel',
                    gloss: 'Michael. Commemorated on the twelfth of every Ethiopian month, with great annual feasts in Ḫədar and Säne; among the commonest elements in Ethiopian personal names and church dedications.',
                },
                {
                    native: 'ገብርኤል',
                    translit: 'Gäbrəʾel',
                    gloss: 'Gabriel. Commemorated on the nineteenth of every month; the shrine at Kulubi in eastern Ethiopia draws a mass pilgrimage on the nineteenth of Taḫśaś.',
                },
                {
                    native: 'ሩፋኤል',
                    translit: 'Rufaʾel',
                    gloss: 'Raphael. Commemorated on the thirteenth of every month; his annual feast falls separately on the third of Ṗagʷəmen, the short thirteenth month, when the synaxary reading is the account of his church on an island outside Alexandria.',
                },
                {
                    native: 'ኡራኤል',
                    translit: 'Uraʾel',
                    gloss: 'Uriel, kept on the twenty-second of the month in the church\'s reckoning of the seven archangels. In Enoch the guide who shows the patriarch the courses of the luminaries and declares himself set over them — the archangel of measure, and so of the calendar.',
                },
                {
                    native: 'ስንክሳር',
                    translit: 'Sənkəssar',
                    gloss: 'The synaxary, from the Greek synaxarion by way of Arabic: the book of daily commemorations, translated into Geʿez in the fourteenth or fifteenth century and enlarged with Ethiopian saints thereafter.',
                },
                {
                    native: 'ካህናተ ሰማይ',
                    translit: 'kahənatä sämay',
                    gloss: 'The priests of heaven — the twenty-four elders of Apocalypse 4, a fixed presence in Ethiopian liturgy, iconography and intercessory prayer.',
                },
                {
                    native: 'መልክእ',
                    translit: 'mälkəʾ',
                    gloss: 'Image, likeness, effigy; and by extension the hymn genre that salutes the parts of a holy person\'s body in successive five-line stanzas. Mälkəʾa Mikaʾel and Mälkəʾa Maryam are among the most copied poems in Geʿez.',
                },
            ],
            texts: [
                {
                    title: 'Dərsanä Mikaʾel',
                    note: 'The Homiliary of Michael: discourses assigned to the monthly commemorations of the archangel, one of the most widely copied devotional collections in Geʿez, frequently illuminated.',
                },
                {
                    title: 'The Ethiopian Sənkəssar (Synaxarium)',
                    note: 'Translated from a Copto-Arabic original and progressively expanded with Ethiopian material; the source of the daily readings that fix the archangels\' monthly days. E. A. W. Budge\'s English version, The Book of the Saints of the Ethiopian Church (4 vols, 1928), remains the fullest in a European language.',
                },
                {
                    title: '1 Enoch 72–82 (the Astronomical Book)',
                    note: 'Uriel\'s dictation to Enoch of the gates of the sun, the phases of the moon and the reckoning of the year: the textual basis of Uriel\'s Ethiopian character as the angel who measures.',
                },
                {
                    title: 'Mälkəʾa Mikaʾel',
                    note: 'A mälkəʾ hymn to the archangel in the standard five-line stanzas, saluting his features and members in turn; representative of a genre that runs to hundreds of surviving poems for Christ, Mary, angels and saints.',
                },
                {
                    title: 'The Ethiopian Manuscript Microfilm Library (EMML)',
                    note: 'Not a text but the reason so many of these texts can be studied: the great microfilming campaign of Ethiopian manuscripts, catalogued over decades by William Macomber, Getatchew Haile and others and held at the Hill Museum and Manuscript Library, Collegeville, Minnesota.',
                },
                {
                    title: 'Encyclopaedia Aethiopica, ed. Siegbert Uhlig et al.',
                    note: 'Five volumes, 2003–2014, the last edited by Alessandro Bausi: the standard reference for every name, feast, text and practice in this hall, and the first place to check any claim made about them.',
                },
            ],
        },
        {
            slug: 'demonology',
            title: 'Demonology',
            native: 'አጋንንት',
            translit: 'aganənt — demons',
            summary: 'Spirits out of the giants, a demoness ridden down by a saint, an accusation that has ruined lives, and a possession cult the church condemns and many of its people know at first hand.',
            paragraphs: [
                'Ethiopian demonology begins where few other Christian demonologies can, in its own canon. Because Enoch and Jubilees are scripture in this church, the origin of the አጋንንት is not a matter of speculation or of borrowed rabbinic tradition but of a text read in the assembly: the spirits that came out of the bodies of the dead giants remained upon the earth, disembodied and unsatisfied, and a tenth of them were left unbound under the prince Mastema for the trial of the living. This gives the whole subject a particular shape. A ጋኔን is not simply a fallen angel; it is a hybrid remainder, a thing that had a body and lost it, and its characteristic action is to want one. Against that background the gospel exorcisms read less as anomalies than as the expected consequence, and the encounter in the country of the Gerasenes — where the unclean spirit is made to give its name, answers Legion because they are many, and begs not to be sent out of the country but into bodies of some kind — is treated in Ethiopian practice as the paradigm case rather than as an isolated marvel.',
                'The demon Ethiopian scrolls name most often is not from the Bible. Wərzəlya, sister of the soldier-saint Susənyos, became after her death a killer of infants and of women in childbed, and the legend has her brother ride her down and transfix her with his spear. The scene is among the commonest images in the whole corpus of Ethiopian protective art: the mounted saint above, the spear descending, the female figure beneath. It belongs to a family of Near Eastern child-protection traditions that runs from the Jewish Lilith bowls through the Byzantine Sisinnios-and-Gylou legend to Coptic and Syriac parallels, and it survives in Ethiopia in a form as vigorous as any of them. Alongside her the texts name ሰይጣን and ዲያብሎስ in their scriptural senses, and then descend into long lists of names, some transparently Semitic, many not, whose origins are irrecoverable. What such lists are for belongs to the essay on the scrolls; what they show here is that the tradition thought of the demonic as a population with individuals in it, and that naming an individual was the point.',
                'ቡዳ is a different and more painful matter, and it must be described with care, because it concerns not spirits but people. The word denotes the possessor of an involuntary and destructive gaze — the evil eye — and the belief attaches it not to individuals identified by conduct but to whole hereditary groups: the smiths, potters and tanners of the countryside, and, historically and most damagingly, the Beta Israel, the Jews of Ethiopia. The accusation carries a further charge, that the person so named takes the form of a hyena by night. It is essential to be exact about what is being described: this is an accusation levelled at people, not a property that anyone has, and its consequences have been real — exclusion, refusal of marriage, occasional violence, and a stigma that travelled with the Beta Israel to Israel after the airlifts of the 1980s and 1990s. Hagar Salamon\'s The Hyena People (1999) is the fullest study of how Christian neighbours and Jewish neighbours each remembered the same set of accusations, and Ronald Reminick\'s fieldwork of the early 1970s set out the everyday mechanics of suspicion among the Amhara. The etymological detail is worth registering: the artisan is called ṭäbib, skilled, from the same root that gives ṭəbäb, wisdom or craft, the very word that names the magico-medical books. Skill and danger are one word in this language.',
                'ዛር belongs to a different order again, and it sits outside official religion in a way that ought to be stated plainly rather than luridly. Zar spirits are characteristically not exorcised but negotiated with. A person falls ill in ways that do not answer to ordinary treatment; a spirit is diagnosed; and the resolution sought is not expulsion but a lasting accommodation in which the spirit is given what it asks — a garment, a perfume, an observance, a share of the household\'s attention — and in return leaves the host alone or protects them. In the ceremony, conducted under a leader whose authority rests on their own relationship with the spirits, drumming and incense bring the zar to mount its host, who is spoken of as the spirit\'s horse, and the spirit speaks in its own voice, makes demands and can be bargained with. Michel Leiris observed and described the Gondar ceremonies during the Dakar–Djibouti mission of 1931–33 in a study published in 1958; Simon Messing wrote on the cult\'s therapeutic and social functions in the same year; I. M. Lewis placed it at the centre of his argument about peripheral possession among the socially marginal, particularly women, in Ecstatic Religion (1971), a reading later scholarship has complicated without discarding. Zar crosses the lines that otherwise divide the region, being practised among Christians, among Muslims and among the Beta Israel, and it stands alongside the Amhara categories of ውቃቢ, the guardian spirit inherited in a family, and አድባር, the tutelary powers of particular places. The Ethiopian Orthodox Church\'s position is that zar is commerce with demons, and it has condemned the practice consistently; ethnographers nonetheless record Orthodox Christians attending, sometimes on the way to or from the holy water. That tension is not a scholarly construction, and honest description has to report it without resolving it on anyone\'s behalf.',
            ],
            terms: [
                {
                    native: 'አጋንንት',
                    translit: 'aganənt',
                    gloss: 'Demons, plural of gänen. In the Ethiopian canon their origin is scriptural: the spirits that left the bodies of the giants of Enoch and were partly loosed again in Jubilees.',
                },
                {
                    native: 'ጋኔን',
                    translit: 'gänen',
                    gloss: 'A demon, singular. Also used of the condition — to be seized by a gänen — so that the agent and the affliction share a word.',
                },
                {
                    native: 'ሰይጣን',
                    translit: 'säyṭan',
                    gloss: 'Satan; the adversary of scripture, distinguished in usage from the swarm of lesser spirits.',
                },
                {
                    native: 'ዲያብሎስ',
                    translit: 'diyabəlos',
                    gloss: 'The devil, taken directly from the Greek diabolos through the biblical translations.',
                },
                {
                    native: 'ቡዳ',
                    translit: 'buda',
                    gloss: 'The evil eye, and the person accused of possessing it. An accusation directed at hereditary artisan groups and, most destructively, at the Beta Israel; described here as an accusation and a social fact, never as a property anyone has.',
                },
                {
                    native: 'ዛር',
                    translit: 'zar',
                    gloss: 'A possessing spirit, and the practice built around relations with such spirits. Characteristically accommodated rather than expelled; found across the region\'s religious divisions and condemned by the church.',
                },
                {
                    native: 'ውቃቢ',
                    translit: 'wəqabi',
                    gloss: 'Guardian spirit, in Amharic usage: a power inherited within a family or lineage, attached to a person and requiring recognition.',
                },
                {
                    native: 'Wərzəlya',
                    translit: 'Wərzəlya',
                    gloss: 'Given in transliteration only: the Geʿez spelling varies from manuscript to manuscript and no standard form could be confirmed. The sister of Saint Susənyos, who after death kills infants and women in childbed, and whom the saint rides down with a spear in the commonest of all Ethiopian talismanic images.',
                },
            ],
            texts: [
                {
                    title: '1 Enoch 15–16',
                    note: 'The passage that supplies Ethiopian demonology with its aetiology: the spirits that came from the bodies of the giants remain upon the earth and afflict the living. Scripture in this church, not apocryphon.',
                },
                {
                    title: 'Jubilees 10',
                    note: 'Noah\'s petition against the spirits; nine parts of them bound, a tenth left to Mastema; and the angels\' instruction of Noah in the remedies, which he writes in a book. The canonical warrant for both demonology and medicine.',
                },
                {
                    title: 'The legend of Susənyos and Wərzəlya',
                    note: 'The Ethiopian recension of a Near Eastern child-protection legend also attested in Jewish, Byzantine, Coptic and Syriac forms; recited and depicted on protective scrolls more often than any other narrative.',
                },
                {
                    title: 'Michel Leiris, La possession et ses aspects théâtraux chez les Éthiopiens de Gondar (Paris, 1958)',
                    note: 'The classic ethnography of the Gondar zar ceremonies, based on observation during the Dakar–Djibouti mission of 1931–33; attentive above all to the performance and the bargaining.',
                },
                {
                    title: 'I. M. Lewis, Ecstatic Religion (1971), and Women\'s Medicine: The Zar-Bori Cult in Africa and Beyond, ed. Lewis, al-Safi and Hurreiz (1991)',
                    note: 'The comparative frame that set zar beside the bori of the Hausa and the possession practices of the Sudan and Egypt, and argued for possession as an idiom of the socially peripheral — an argument since qualified rather than overturned.',
                },
                {
                    title: 'Hagar Salamon, The Hyena People: Ethiopian Jews in Christian Ethiopia (Berkeley, 1999)',
                    note: 'An account of the buda accusation from both sides of it, based on interviews with Beta Israel in Israel and with their former Christian neighbours; the indispensable book on what the belief did to people.',
                },
            ],
        },
        {
            slug: 'protective-scrolls',
            title: 'Protective Scrolls',
            native: 'ክታብ',
            translit: 'kətab — the amulet scroll',
            summary: 'A strip of parchment cut to the height of the body it defends, painted with eyes that stare back, and written with names its owner is not expected to understand.',
            paragraphs: [
                'The ክታብ is the most immediately recognisable object in Ethiopian religious material culture and among the least understood outside it. It is a strip of parchment, usually two or three sheets sewn end to end, written in Geʿez in the small hand used for such things, painted at intervals with figures, and rolled into a leather case to be worn about the neck or the waist, or kept unrolled at the head of a bed or hung on the wall of a house. The governing fact of its construction is its length. The scroll is made to the height of the person for whom it is made: it is measured against the body, and the correspondence is not decorative but functional. Jacques Mercier, who did the fieldwork on which all serious understanding of these objects rests, put the logic plainly — the scroll is a substitute body, standing between its owner and what comes at them, and its dimensions are its owner\'s dimensions because that is what it is for.',
                'The parchment itself was traditionally taken from an animal killed for the commission, and in the accounts ethnographers have recorded the killing belongs to the remedy rather than merely preceding it: the affliction is understood to pass into the animal, so that the material carrying the cure is the material that carried the illness away. Sheep and goat both served, according to the client\'s means. Once prepared, the parchment was written by a ደብተራ, and the commission was personal — the client\'s name and often the mother\'s name were written into the text at the points where the formulae required a name, so that a finished scroll is not a generic object but something closer to a legal instrument made out to a particular party. Unfinished scrolls with blank spaces awaiting a name survive in collections, and are among the more revealing items in them.',
                'What is written on it is prayer and አስማት. The prayers are recognisably the church\'s — invocations of the Trinity, of Mary, of the archangels, of the cross — and the ʾasmat are names: names of God, names of angels, and long sequences of names that mean nothing in Geʿez or in any other known language, transmitted as sound and copied as shapes. The Ethiopian tradition inherits the word itself from Arabic, and the practice belongs to the whole late-antique and mediaeval Near East, where the efficacy of a name lies precisely in its being the true one and therefore not the ordinary one. Beside the names stand the ሥዕል, the painted images, and Mercier\'s central argument concerns them: they are not illustrations of the text but instruments in their own right. The recurring motif is a face, frontal and symmetrical, dominated by enormous open eyes, and it is placed where it will be looked at. Against ቡዳ, an affliction transmitted by looking, the scroll answers with a gaze that does not blink. Other figures recur — an angel with a drawn sword, Susənyos riding down the demoness, and above all the interlaced lattice of knotted bands, understood as a trap in which a spirit is caught and held, and commonly described in the literature as a net or snare and associated with Solomon.',
                'The scrolls left Ethiopia in very large numbers, and where they now are is not a neutral question. The Wellcome Collection in London holds one of the great assemblages, gathered through the medical-historical collecting of the early twentieth century; the Ethiopian material brought back by Marcel Griaule and the Dakar–Djibouti mission of 1931–33 is divided between the Bibliothèque nationale de France and the Musée du quai Branly; the British Library, Princeton University Library and a number of American and European museums hold others. The British Library\'s Ethiopic holdings include several hundred manuscripts taken from Mäqdäla in 1868 after the British expedition against the emperor Tewodros II, and restitution claims over that material are live and unresolved. Meanwhile the largest and most important collection is in Ethiopia itself, at the Institute of Ethiopian Studies in Addis Ababa, and the practice these objects come from has not stopped. Scrolls are still made. It is worth saying that a scroll in a vitrine is a scroll that has been separated from the person it was cut to fit, and that this is a loss of information as well as of property.',
            ],
            terms: [
                {
                    native: 'ክታብ',
                    translit: 'kətab',
                    gloss: 'The amulet scroll or written charm, from Arabic kitāb, writing. Made to the height of its owner, worn in a leather case or hung in the house.',
                },
                {
                    native: 'አስማት',
                    translit: 'ʾasmat',
                    gloss: 'Names — from Arabic asmāʾ. The powerful and secret names written on scrolls: names of God, of angels, and long sequences transmitted as sound alone, whose sense is not recoverable and was not expected to be.',
                },
                {
                    native: 'ደብተራ',
                    translit: 'däbtära',
                    gloss: 'The unordained cleric-scholar: trained in the church schools in chant, poetry and Geʿez, employed in the liturgy, dependent on commissions, and the maker of scrolls and remedies. Indispensable, learned, and regarded with a wariness that the tradition itself has never resolved.',
                },
                {
                    native: 'ሥዕል',
                    translit: 'śəʿəl',
                    gloss: 'Image, picture. On a scroll the painted figures — the frontal face with its great eyes, the angel with the sword, the interlaced lattice — which the tradition treats as operative rather than illustrative.',
                },
                {
                    native: 'ብራና',
                    translit: 'bəranna',
                    gloss: 'Parchment. The support of every Ethiopian manuscript and every scroll, prepared from sheep or goat; a scroll\'s parchment was traditionally taken from an animal killed for that commission.',
                },
                {
                    native: 'ልፋፈ ጽድቅ',
                    translit: 'Ləfafä Ṣədq',
                    gloss: 'The Bandlet of Righteousness: a scroll of secret names placed with the dead to protect the soul in its passage. Its names are presented as revealed by Christ to his mother, which ties the amulet tradition directly to Marian devotion.',
                },
                {
                    native: 'ሱስንዮስ',
                    translit: 'Susənyos',
                    gloss: 'The soldier-saint who rides down the child-killing demoness; the commonest painted subject on Ethiopian protective scrolls, and the standard recourse against danger to infants and to women in childbirth.',
                },
            ],
            texts: [
                {
                    title: 'Jacques Mercier, Ethiopian Magic Scrolls (New York: George Braziller, 1979)',
                    note: 'The book that established the subject: fieldwork with practising däbtära, an account of how a scroll is commissioned, measured and made, and the argument that the images are instruments rather than decoration.',
                },
                {
                    title: 'Jacques Mercier, Art That Heals: The Image as Medicine in Ethiopia (New York, 1997)',
                    note: 'The exhibition volume that developed the argument at length, with the fullest published reproduction of scroll imagery and its analysis.',
                },
                {
                    title: 'E. A. Wallis Budge, The Bandlet of Righteousness: An Ethiopian Book of the Dead (London, 1929)',
                    note: 'Translation and study of the Ləfafä Ṣədq, the scroll of names buried with the dead. Budge\'s framing is of its period and should be read with that in mind, but the text and plates remain useful.',
                },
                {
                    title: 'Marcel Griaule, Le livre de recettes d\'un dabtara abyssin (Paris, 1930)',
                    note: 'A däbtära\'s own working notebook, published with translation: the single most direct witness to what such a practitioner actually kept written down.',
                },
                {
                    title: 'The Wellcome Collection Ethiopian scrolls, London',
                    note: 'One of the largest assemblages outside Ethiopia, acquired through Henry Wellcome\'s medical-historical collecting; catalogued in part by Stefan Strelcyn and increasingly digitised.',
                },
                {
                    title: 'The Institute of Ethiopian Studies, Addis Ababa University',
                    note: 'The principal collection in Ethiopia itself, of manuscripts, scrolls, icons and ritual objects, and the necessary corrective to studying this material only through European holdings.',
                },
            ],
        },
        {
            slug: 'magical-medicine',
            title: 'Magical Medicine',
            native: 'መጽሐፈ ጥበብ',
            translit: 'Mäṣḥafä Ṭəbäb — the book of craft-wisdom',
            summary: 'Recipe books in which a root, a prayer and the name of the disease are three parts of one prescription, and the man who wrote them was the same man who sang the office.',
            paragraphs: [
                'The Ethiopian magico-medical books are working documents and look like it. They are small, often unbound or crudely bound, written in a rapid hand in Geʿez with Amharic intruding wherever precision about a plant or a symptom is needed, and they are organised by complaint. An entry gives the ailment, names what is to be gathered or ground or infused, and gives the prayer or the name that accompanies it — and the three elements are not separable into a medical part and a magical part. That distinction is ours. In the logic of the books the plant works, and the name works, and they work together, in the same way that a dose and a time of day work together. What such a book is called varies: scribes head them differently, and Western scholarship has used the general term ጥበብ, craft-wisdom, and the phrase መጽሐፈ ጥበብ, for a genre with no single fixed title. Stefan Strelcyn\'s Médecine et plantes d\'Éthiopie catalogued and analysed these texts more thoroughly than anyone before or since, and Marcel Griaule\'s publication in 1930 of one däbtära\'s actual notebook remains the most intimate document we have of the practice.',
                'The materia medica is real and, in a good many cases, effective. The flowers of ኮሶ, Hagenia abyssinica, were the standard Ethiopian remedy against tapeworm — a condition endemic where raw beef is eaten — and were exported, examined by European pharmacologists in the nineteenth century, and found to work. Endod, Phytolacca dodecandra, was studied in the twentieth century for its molluscicidal properties against the snails that carry schistosomiasis. Rue, garden cress, and a range of aromatic herbs appear constantly. So do minerals, animal substances, smoke and water: fumigation with ዕጣን, incense, and washing with ጸበል, holy water, sit in the same lists as decoctions, and the entry will often specify how many times something is to be said over the preparation. Richard Pankhurst\'s medical history of Ethiopia sets this pharmacopoeia against the epidemiological realities it was addressed to, and the fit is closer than a dismissive reading would expect.',
                'Two features of these books deserve particular attention because they show the underlying theory. The first is the naming of the illness. The prayer does not ask vaguely for healing; it identifies the complaint by name and addresses it, in the second person, as something that has come and can be told to go. The disease is treated as an agent with a name, and the prayer\'s leverage is that the name is known — the same logic that governs the ʾasmat of the scrolls, transposed from demons to fevers. The second is the drinking of the writing. Text is written in ink on a surface, the ink is then washed off with water, and the water is drunk, so that what was written enters the body. This is not a peculiarity of Ethiopian Christianity; it is one of the most widely shared practices of the whole region, performed with Qurʾanic text on wooden writing boards across Muslim Africa from Senegal to the Horn, and with Christian text in Ethiopia and Egypt. Behind it lies a proposition about scripture that both traditions hold and that neither states as a doctrine: that the words are not only meaningful but substantial, and that the ink is a carrier.',
                'The man who did all this was the ደብተራ, and his position is the most interesting sociological fact in this hall. He is a product of the church\'s own educational system, which is long and demanding — years in the school of reading, then the school of chant, then, for the ambitious, the school of qəne, the improvised religious poetry with its double meanings of gold and wax, and the school of interpretation. He serves the liturgy, sings the antiphons, carries the prayer-staff and the sistrum, and is not ordained. He is not paid a salary either. What he sells is his literacy: he writes scrolls, compounds remedies, casts the letters of a name into a calculation, and is consulted by people who would not readily admit to consulting him. The church has periodically moved against the practice — the fifteenth-century campaign of the emperor Zärʾa Yaʿəqob, whose መጽሐፈ ብርሃን and homiletic writings refute diviners, charmers and sorcerers at length and press instead the open profession of the divine names, is the great instance — and the practice has periodically continued. It should also be said that the same word, ṭäbib, means the smith and the wise man, and that the smith is the man most often accused of ቡዳ. The tradition has never been comfortable with people who know how to make things.',
            ],
            terms: [
                {
                    native: 'መጽሐፈ ጥበብ',
                    translit: 'Mäṣḥafä Ṭəbäb',
                    gloss: 'Book of craft-wisdom. Used broadly of the magico-medical recipe literature; these books have no single fixed title and scribes head them variously.',
                },
                {
                    native: 'ጥበብ',
                    translit: 'ṭəbäb',
                    gloss: 'Wisdom, skill, craft, artifice. The root covers learned wisdom and manual cunning together, which is why the same family of words produces both the book of remedies and the smith.',
                },
                {
                    native: 'ጠቢብ',
                    translit: 'ṭäbib',
                    gloss: 'Wise man; skilled craftsman; smith. That the word for the artisan is the word for the sage, and that artisans are the group most often accused of the evil eye, is the knot at the centre of this subject.',
                },
                {
                    native: 'ሥራይ',
                    translit: 'śəray',
                    gloss: 'Sorcery, enchantment — and also remedy, medicine. One Geʿez word for both, which tells the reader most of what needs saying about the boundary.',
                },
                {
                    native: 'ፈውስ',
                    translit: 'fäws',
                    gloss: 'Healing, cure, remedy. The word used of what a prescription is meant to accomplish, in prayer as in pharmacy.',
                },
                {
                    native: 'ሕመም',
                    translit: 'ḥəmam',
                    gloss: 'Illness, pain, suffering. In the recipe literature the complaint is named at the head of the entry and then addressed directly in the prayer, as an agent rather than a condition.',
                },
                {
                    native: 'ኮሶ',
                    translit: 'kosso',
                    gloss: 'Hagenia abyssinica, whose flowers were the standard Ethiopian anthelmintic against tapeworm; examined by nineteenth-century European pharmacology and found genuinely active.',
                },
                {
                    native: 'ዕጣን',
                    translit: 'əṭan',
                    gloss: 'Incense. Fumigation belongs to the same prescriptions as decoctions and washings, and is not distinguished from them as a different order of treatment.',
                },
            ],
            texts: [
                {
                    title: 'Stefan Strelcyn, Médecine et plantes d\'Éthiopie (Warsaw, 1968; Naples, 1973)',
                    note: 'Two volumes editing, translating and analysing Ethiopian medico-magical recipe texts and identifying their plants; the foundation of the subject and still unsuperseded in scope.',
                },
                {
                    title: 'Marcel Griaule, Le livre de recettes d\'un dabtara abyssin (Paris, 1930)',
                    note: 'One practitioner\'s own notebook, reproduced and translated: entries by ailment, materials, prayers and names, in the state in which he kept them.',
                },
                {
                    title: 'Jubilees 10:10–14',
                    note: 'The canonical charter for the whole enterprise: the angels teach Noah the remedies against the spirits, and he writes them in a book and gives it to Shem. In Ethiopia this is scripture, and the recipe book is its continuation.',
                },
                {
                    title: 'Richard Pankhurst, An Introduction to the Medical History of Ethiopia (Trenton, 1990)',
                    note: 'The standard survey: epidemics, famines, the indigenous pharmacopoeia, the practitioners, and the arrival of foreign medicine, by the historian who did most to make Ethiopian social history accessible.',
                },
                {
                    title: 'Mäṣḥafä Bərhan, of the emperor Zärʾa Yaʿəqob',
                    note: 'The Book of Light, mid-fifteenth century: doctrinal and disciplinary writing which among much else condemns sacrifice to spirits and the resort to charmers and diviners. Partly edited in CSCO; Getatchew Haile edited its homily on baptism and religious instruction. The clearest statement of the official position against which the däbtära\'s practice ran.',
                },
                {
                    title: 'Ethiopian magico-medical manuscripts, Wellcome Collection and Bibliothèque nationale de France',
                    note: 'The principal European holdings of the recipe literature, catalogued in part by Strelcyn, whose manuscript catalogues for the Wellcome, the British Library and the Accademia dei Lincei remain working tools of the field.',
                },
            ],
        },
        {
            slug: 'marian-magic',
            title: 'Marian Magic',
            native: 'ተአምረ ማርያም',
            translit: 'Täʾammərä Maryam — the Miracles of Mary',
            summary: 'A book of miracles that works by being read, a covenant with terms, and a devotion that is not a department of Ethiopian Christianity but very nearly the whole of it.',
            paragraphs: [
                'Nothing in Ethiopian religion is read, sung, copied or invoked as much as ተአምረ ማርያም. The collection arrived from Arabic in the fourteenth century, and Enrico Cerulli demonstrated in 1943 that its core was European: the Latin Marian miracle collections of the twelfth and thirteenth centuries, the world of Gautier de Coinci, passing through Arabic into Geʿez and arriving in the Ethiopian highlands with their French and Spanish settings intact but their names worn down. What happened next is the interesting part. The collection did not stay the size it arrived at. Miracles were added — miracles set in Ethiopia, involving Ethiopian kings, Ethiopian monasteries, Ethiopian peasants and Ethiopian famine — until manuscripts of several hundred were normal, and the emperor Zärʾa Yaʿəqob in the fifteenth century made its liturgical reading obligatory, penalised those who impugned its authority, and instituted thirty-three annual Marian feasts. A book that begins as a translation ends as a national archive of divine intervention, and it is still growing.',
                'The mechanism by which the Miracles are supposed to work is stated inside them, and it is what makes this a subject for this hall rather than for a general history of devotion. It is the ኪዳን, the covenant: the promise, made by Christ to his mother, that whoever calls upon her name, or gives alms in her name, or writes her miracles, or reads them, or hears them read, will be granted mercy. The promise has terms, and it works performatively — the act of reading the miracle is itself the act that invokes the guarantee. This is why the Miracles are read aloud in church rather than merely known, why individuals commission copies as a work of merit, and why the covenant has its own commemoration, ኪዳነ ምሕረት, the Covenant of Mercy, kept on the sixteenth of every month with a great feast in Yäkkatit. A reader used to thinking of magic as something that happens outside a church will want to note that this is not outside anything. It is the church\'s own liturgy, and its logic — a named power, a fixed formula, a promised effect — is the same logic the scrolls use.',
                'Which is precisely why Mary\'s names travel into the protective texts. The scroll writers draw on Marian material as freely as on angelic: her name stands among the ʾasmat, the Miracles supply narratives to be invoked as precedents, and the ልፋፈ ጽድቅ, the scroll of names buried with the dead, presents its whole contents as names revealed by Christ to his mother for the protection of those who carry them. Two devotional works of the highest standing sit at the head of this literature. ውዳሴ ማርያም, the Praises of Mary, attributed in Ethiopian tradition to Ephrem the Syrian, is distributed across the seven days of the week and recited daily; it is commonly the first book after the Psalter that a child in the church schools learns by heart, which means that a very large number of Ethiopians know a Marian office before they know anything else in Geʿez. And አርጋኖን, the Organ of Praise, is the masterpiece: composed by Abba Giyorgis of Sägla, who died in 1425 and who was also the author of the Mäṣḥafä Məśṭir and of a recension of the Horologium, it is a sustained Marian poem in seven parts for the seven days, dense with typological imagery, and among the finest things written in the language.',
                'It remains only to insist on the proportion. In much of Christendom Marian devotion is one strand among several, and in some of it a contested one. In Ethiopia it is the ground. Churches are dedicated to her by preference; the church of Mary of Zion at Aksum, where the Ark is held to rest, is the holiest place in the country; her feasts fill the calendar; her image is on the walls, in the manuscripts, on the ceilings and in the hands of the priests; the mälkəʾ hymns salute her feature by feature; the ordinary oath and the ordinary cry of alarm are both by her name; and children are called Wälättä Maryam, daughter of Mary, and Gäbrä Maryam, servant of Mary. To treat Ethiopian Marian practice as a species of folk magic with a Christian veneer would be to invert the actual relation. The protective and healing practices described elsewhere in this hall are, in very large part, downstream applications of a Marian theology which is entirely explicit, entirely public and entirely orthodox by its own church\'s lights — and which is held now, today, by tens of millions of people who would not recognise the word magic as having anything to do with it.',
            ],
            terms: [
                {
                    native: 'ተአምረ ማርያም',
                    translit: 'Täʾammərä Maryam',
                    gloss: 'The Miracles of Mary. Translated from Arabic in the fourteenth century over a European core, then indefinitely expanded with Ethiopian material; read aloud in church, and continually recopied.',
                },
                {
                    native: 'ኪዳን',
                    translit: 'kidan',
                    gloss: 'Covenant, pact, testament. In Marian usage the promise of mercy granted by Christ to his mother on behalf of all who invoke her; the operative clause of the whole devotion.',
                },
                {
                    native: 'ኪዳነ ምሕረት',
                    translit: 'Kidanä Məḥrät',
                    gloss: 'The Covenant of Mercy: the commemoration of that promise, kept on the sixteenth of every Ethiopian month, with its great feast in the month of Yäkkatit. Countless churches bear the name.',
                },
                {
                    native: 'ውዳሴ ማርያም',
                    translit: 'Wəddase Maryam',
                    gloss: 'The Praises of Mary, attributed in Ethiopian tradition to Ephrem the Syrian and arranged for the seven days of the week; recited daily, and generally the first Geʿez text learned by heart after the Psalter.',
                },
                {
                    native: 'አርጋኖን',
                    translit: 'Arganon',
                    gloss: 'The Organ — from Greek organon — of the praise of Mary: the great Marian poem of Abba Giyorgis of Sägla, in seven parts for the seven days.',
                },
                {
                    native: 'መልክአ ማርያም',
                    translit: 'Mälkəʾa Maryam',
                    gloss: 'The Image of Mary: a hymn in the mälkəʾ form, saluting the Virgin\'s features and members in successive five-line stanzas, each opening with a greeting.',
                },
                {
                    native: 'ማርያም',
                    translit: 'Maryam',
                    gloss: 'Mary. The commonest dedication of Ethiopian churches, the commonest element in personal names, and the name in which oaths are sworn and alarm is cried.',
                },
            ],
            texts: [
                {
                    title: 'Täʾammərä Maryam (The Miracles of Mary)',
                    note: 'The great Ethiopian Marian collection, frequently illuminated; manuscripts range from a few dozen miracles to several hundred. Its European sources were traced by Enrico Cerulli in Il libro etiopico dei Miracoli di Maria e le sue fonti nelle letterature del Medio Evo latino (Rome: Bardi, 1943).',
                },
                {
                    title: 'Arganonä Wəddase, by Abba Giyorgis of Sägla',
                    note: 'A Marian poem in seven daily parts by the greatest Geʿez author of the early fifteenth century (d. 1425), who also wrote the Mäṣḥafä Məśṭir against heresies and a recension of the Book of Hours.',
                },
                {
                    title: 'Wəddase Maryam',
                    note: 'The weekly Praises of Mary, attributed in Ethiopian tradition to Ephrem the Syrian, recited in the daily office and memorised in the church schools; printed and reprinted more often than any other Geʿez devotional text.',
                },
                {
                    title: 'Ləfafä Ṣədq (The Bandlet of Righteousness)',
                    note: 'A scroll of secret names, presented as revealed by Christ to his mother, placed with the dead for the protection of the soul; the clearest point of contact between Marian devotion and the amulet tradition.',
                },
                {
                    title: 'The Marian legislation of Zärʾa Yaʿəqob',
                    note: 'Fifteenth-century measures making the reading of the Miracles obligatory, penalising denial of their authority, and instituting thirty-three annual Marian feasts; set out in the emperor\'s own writings and discussed in Taddesse Tamrat, Church and State in Ethiopia 1270–1527 (Oxford, 1972).',
                },
                {
                    title: 'Nägärä Maryam (The Story of Mary)',
                    note: 'A separate Geʿez Marian narrative read at the Nativity, drawing on the infancy traditions; part of the broader corpus that surrounds the Miracles.',
                },
            ],
        },
        {
            slug: 'exorcism',
            title: 'Exorcism',
            native: 'መፍትሔ ሥራይ',
            translit: 'mäftəḥe śəray — the loosing of enchantment',
            summary: 'Binding and loosing as a technical vocabulary, the divine names as the instrument, and the holy water where people still go and still stay.',
            paragraphs: [
                'The Ethiopian vocabulary of deliverance is a vocabulary of knots. Something has been bound, and something must be loosed; the affliction is a binding and the remedy an untying, and the technical name of a whole class of prayers is መፍትሔ ሥራይ, the loosing or undoing of enchantment. Stefan Strelcyn published a study of these prayers in 1955 under the title Prières magiques éthiopiennes pour délier les charmes, and their structure is consistent. They rehearse who God is, they recite the names, they name what is to be loosed, and they command it. The scriptural warrant is the promise of the keys — whatever you bind, whatever you loose — and the model in practice is the Gerasene demoniac, whose spirit is first made to answer the question of its name and only then dismissed. That order is not incidental. Across this tradition the pivot of an exorcism is the moment the spirit is compelled to identify itself, because until it has a name it cannot be addressed, and until it can be addressed it cannot be commanded.',
                'The instrument throughout is the name of God. እግዚአብሔር stands at the head of these texts, with the biblical names beside it in their Geʿez forms and the ʾasmat behind them, and the operative claim is that the name is not a label for the power but a handle on it. Every Ethiopian text of any kind opens በስመ አብ ወወልድ ወመንፈስ ቅዱስ, in the name of the Father and the Son and the Holy Spirit, and in an exorcistic text that opening is understood to be doing work rather than observing form. To this are joined the names of the archangels, whose function here is executive — Michael in particular is invoked as the one who strikes and drives out — and the material instruments of the church: the መስቀል, the hand cross with which the priest blesses and signs; the gospel book, read over the afflicted; incense; and water. The word ግዝት, adjuration or ban, covers the formal act of conjuring by these names, and it is the same word the church uses of its own censures, which is a fair indication of how the operation was understood: not as a spell but as a judicial order issued under authority.',
                'Beside the däbtära\'s private practice stands the church\'s own, and the two should not be confused. Formal exorcism in the Ethiopian Orthodox Täwaḥədo Church is clerical, and its ordinary setting is ጸበል — holy water, from the springs at churches and monasteries, blessed and used for washing, sprinkling and drinking. In Amharic the word is more often written ጠበል. The sick come to these places, and the striking thing about Ethiopian practice, by comparison with most Western Christian equivalents, is duration: people do not attend an exorcism, they go and stay, sometimes for weeks or months, living at the site, present at the morning prayers and the washing, in the company of others doing the same. The great sites — Ǝntoṭo above Addis Ababa among the best known — support standing populations of the afflicted and their families. Where a spirit is diagnosed, the pattern is the one described above: it is addressed, made to declare itself, and dismissed, and the person is then reincorporated into the ordinary sacramental life of the church, which is the point of the exercise. This is pastoral care of suffering people, conducted by clergy, in the church\'s own house, and it is described here as such.',
                'It is living, and the reader should understand it as present tense. Ethiopian holy-water sites are busy now; they have been the subject of serious medical anthropology over the last two decades, particularly concerning how people move between ṣäbäl and hospital treatment, and the relation has proved more various and more negotiated than either a triumphalist or a dismissive account would predict. Priests have advised patients to continue their medication; patients have suspended it; both have happened, and guidance within the Ethiopian church has shifted over the period. Tom Boylston\'s ethnography of an Orthodox community on Lake Ṭana, from fieldwork between 2008 and 2014 and published in 2018, is a good place to see the ordinary texture of this — how holy water sits inside a whole economy of fasting, blessing, prohibition and mediation rather than standing apart from it as a resort of last hope. There is a real tension in the material, between the church\'s condemnation of the däbtära\'s amulets and its own use of names and water, and between clerical deliverance and the accommodations of ዛር. Ethiopian Christians are perfectly aware of these tensions and argue about them. What would be false is to resolve the argument on their behalf, in either direction, from outside.',
            ],
            terms: [
                {
                    native: 'መፍትሔ ሥራይ',
                    translit: 'mäftəḥe śəray',
                    gloss: 'The loosing, opening or undoing of enchantment: the technical name of a class of Geʿez prayers for the release of a person held by sorcery or binding. Mäftəḥe from the root fätḥa, to open or loose. Strelcyn transliterates it maftəḥe šəray; the two spellings render the same Geʿez.',
                },
                {
                    native: 'ጸበል',
                    translit: 'ṣäbäl',
                    gloss: 'Holy water: from the springs at churches and monasteries, blessed for washing, sprinkling and drinking, and the ordinary setting of exorcistic and healing practice. Amharic usage more often writes ጠበል, ṭäbäl; both refer to the same thing.',
                },
                {
                    native: 'እግዚአብሔር',
                    translit: 'Ǝgziʾabḥer',
                    gloss: 'God — traditionally parsed as the lord of the nations or of the land. The name that heads these texts, and in their own understanding not a label for the power but the means of applying it.',
                },
                {
                    native: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ',
                    translit: 'bäsəmä ʾab wäwäld wämänfäs qəddus',
                    gloss: 'In the name of the Father and the Son and the Holy Spirit: the invocation with which nearly every Geʿez text of any kind begins, and which in an exorcistic prayer is understood to be performing rather than announcing.',
                },
                {
                    native: 'ግዝት',
                    translit: 'gəzt',
                    gloss: 'Adjuration, conjuration, ban. The same word covers the church\'s formal censure and the exorcist\'s binding command, which is a fair guide to how the act was conceived: an order issued under authority.',
                },
                {
                    native: 'መስቀል',
                    translit: 'mäsqäl',
                    gloss: 'Cross. The hand cross carried by priests and däbtära, used to bless, to sign the afflicted and to touch the sick; also the name of the great September feast of the Finding of the True Cross.',
                },
                {
                    native: 'ጸሎት',
                    translit: 'ṣälot',
                    gloss: 'Prayer. In this literature the word covers the whole range from the daily office to the specific formula written on a scroll, with no lexical break between them.',
                },
            ],
            texts: [
                {
                    title: 'Stefan Strelcyn, Prières magiques éthiopiennes pour délier les charmes (Rocznik Orientalistyczny XVIII, Warsaw, 1955)',
                    note: 'Edition, translation and study of the loosing prayers, from a Sorbonne thesis of 1950: the fundamental work on the Geʿez exorcistic formulary and its structure.',
                },
                {
                    title: 'Mark 5:1–20 (the Gerasene demoniac)',
                    note: 'The gospel model. The demand for the name, the answer Legion, and the dismissal: the sequence on which the tradition\'s practice is patterned, read in the Geʿez gospels and expounded in the commentaries.',
                },
                {
                    title: 'Ṣälotä Kidan (The Prayer of the Covenant)',
                    note: 'A prayer of the Ethiopian daily office, recited morning and evening, which passes readily into use as an intercession for the afflicted; an instance of the continuity between the ordinary office and deliverance practice.',
                },
                {
                    title: 'Mäṣḥafä Qəddase (The Book of the Liturgy)',
                    note: 'The Ethiopian anaphoras, some fourteen in number and including several composed in Geʿez rather than translated; the setting into which a person delivered at the holy water is reincorporated, and the reason that reincorporation is the point.',
                },
                {
                    title: 'Tom Boylston, The Stranger at the Feast: Prohibition and Mediation in an Ethiopian Orthodox Christian Community (Berkeley, 2018)',
                    note: 'An ethnography of Orthodox life on the Zäge peninsula of Lake Ṭana, from fieldwork between 2008 and 2014, attentive to how holy water, fasting and blessing form one connected economy of mediation rather than separate practices.',
                },
                {
                    title: 'Mäṣḥafä Bərhan, of Zärʾa Yaʿəqob',
                    note: 'The fifteenth-century writing that drew the line between the church\'s authorised use of the divine names and the private practice of the däbtära — and, by the vehemence with which it drew it, showed how blurred the line was.',
                },
            ],
        },
        {
            slug: 'astrology-and-calendar',
            title: 'Astrology and Calendar',
            native: 'ባሕረ ሐሳብ',
            translit: 'Bahrä Ḥasab — the sea of reckoning',
            summary: 'A schematic year dictated by an archangel, thirteen months that still govern a country\'s business, and the divinatory manual that travels in the same codex as the computus.',
            paragraphs: [
                'The oldest calendrical text in the Ethiopian canon is Enoch\'s, and it is a polemic. Chapters 72 to 82 of መጽሐፈ ሄኖክ set out a year of three hundred and sixty-four days: twelve months of thirty, with four additional days standing at the turns of the seasons and belonging to no month, which the text is at pains to say are not to be omitted. The sun passes out and in through six gates in the east and six in the west, moving from gate to gate as the seasons turn; the moon\'s light is described as growing and diminishing in fourteen parts; the leaders of the seasons are named and their subordinates listed. Uriel dictates all of it. The polemical edge is unmistakable — those who err concerning the four days are denounced, and the reader who reckons the year rightly is blessed — and Jubilees, also canonical here, makes the same argument in its sixth chapter with the same numbers. The point of a 364-day year is that it divides exactly by seven: the festivals fall on the same weekday every year, permanently. It is also, of course, a day and a quarter short, a problem the Geʿez text does not solve. The Aramaic version recovered from Qumran turns out to be considerably longer and more technical than the Geʿez, tabulating the moon\'s visibility against the solar year day by day; the Ethiopic preserves an abridgement of a real astronomical document.',
                'The Ethiopian civil calendar is a different scheme, and the resemblance should not be allowed to collapse into an identity. It has twelve months of thirty days and then ጳጉሜን — from the Greek epagomenai, the days brought in — of five days, or six in the fourth year of the cycle. That structure descends from the Egyptian civil calendar rather than from Enoch, and unlike the Enochic year it intercalates, so that it keeps pace with the sun. The year begins on the first of Mäskäräm, at the end of the rains, corresponding to 11 September in the Gregorian calendar, or 12 September in the year preceding a Gregorian leap year. The era is the ዓመተ ምሕረት, the Year of Mercy, reckoned from the Incarnation as computed by Annianus of Alexandria, which sets it seven to eight years behind the Common Era — so that Ethiopia kept its millennium in September 2007. Years are named in a four-fold cycle for the evangelists, and it is the year of Luke that carries the sixth epagomenal day. The day, likewise, begins at dawn and the hours are numbered from there, so that the Ethiopian one o\'clock is seven in the morning and a foreigner reading an Ethiopian appointment without adjustment will be six hours wrong.',
                'ባሕረ ሐሳብ, the sea of reckoning, is the computus that runs this system, and it is a genuine science taught as a discipline in the church schools. Its business is the movable feasts. The reckoner determines the evangelist of the year, then the አበቅቴ, the epact, and the መጥቅዕ, its complement — the two sum to thirty — and from these the date of ነነዌ, the Fast of Nineveh, is derived. Nineveh is the hinge: once it is fixed, every other movable observance follows from it at an interval that does not change. The Great Fast begins fourteen days later; Easter falls sixty-nine days after Nineveh, the Great Fast running fifty-five days to reach it; Ascension is thirty-nine days after Easter and Pentecost forty-nine. Behind the arithmetic stand the nineteen-year lunar cycle and the twenty-eight-year solar cycle, whose product of five hundred and thirty-two years is the great period after which the whole pattern repeats. This is Alexandrian computus, inherited with the Alexandrian faith and maintained in Ethiopia after the Latin West had gone over to Gregory\'s correction, which is one reason the two calendars have drifted apart.',
                'And travelling in the same manuscripts, often in the same hand, is ዐውደ ነገሥት, the Cycle of Kings. This is not computus but divination: a manual of Arabic derivation for reading the character of a coming year from the weekday on which it opens, for distinguishing propitious from unpropitious days, and for computing outcomes — an illness, a journey, a marriage, a battle, the fate of a ruler — from the numerical values of names. To it belong the traditions of unlucky days that Ethiopian texts inherit through Coptic and Arabic channels from the late-antique dies aegyptiaci, and the assignment of the hours of day and night to the seven planets in their standard sequence, the planets appearing under Arabic-derived names which are given here in transliteration only, since their Geʿez orthography could not be confirmed: Zuḥal for Saturn, Muštäri for Jupiter, Mərriḫ for Mars, Zuhära for Venus, ʿUṭarəd for Mercury. The church has never approved the Awdä Nägäśt and has periodically condemned it, while continuing to teach the ባሕረ ሐሳብ as a monastic accomplishment. The two nonetheless share a codex, a script and a body of arithmetic — which is as exact a picture as this hall affords of what it contains: a licit science of time and an illicit one, copied onto the same parchment, and often enough by the same hand.',
            ],
            terms: [
                {
                    native: 'ባሕረ ሐሳብ',
                    translit: 'Bahrä Ḥasab',
                    gloss: 'The sea of reckoning: the Ethiopian computus, the discipline of calculating the calendar and the movable feasts. Taught in the church schools as a branch of learning in its own right.',
                },
                {
                    native: 'ዐውደ ነገሥት',
                    translit: 'ʿAwdä Nägäśt',
                    gloss: 'The Cycle of Kings: a divinatory and prognosticatory manual of Arabic derivation, used to read the year, choose days, and compute fates from the numerical values of names. Condemned by the church and copied anyway.',
                },
                {
                    native: 'ጳጉሜን',
                    translit: 'Ṗagʷəmen',
                    gloss: 'The thirteenth month, of five days and of six in the year of Luke; from Greek epagomenai, the days brought in. Amharic commonly writes and says Ṗagume.',
                },
                {
                    native: 'አበቅቴ',
                    translit: 'abäqte',
                    gloss: 'The epact, the accumulated difference between solar and lunar years; the first quantity a reckoner computes for a given year.',
                },
                {
                    native: 'መጥቅዕ',
                    translit: 'mäṭqəʿ',
                    gloss: 'The complement of the epact, the two together making thirty; from the pair the date of the Fast of Nineveh, and thence every movable feast, is derived.',
                },
                {
                    native: 'ነነዌ',
                    translit: 'Nənäwe',
                    gloss: 'Nineveh: the three-day fast commemorating Jonah\'s preaching, and the hinge of the Ethiopian calendar — once its date is fixed, all the movable feasts follow at unchanging intervals.',
                },
                {
                    native: 'ዓመተ ምሕረት',
                    translit: 'ʿAmätä Məḥrät',
                    gloss: 'The Year of Mercy: the Ethiopian era, reckoned from the Incarnation as Annianus of Alexandria computed it, and running some seven to eight years behind the Common Era.',
                },
                {
                    native: 'ሰዓት',
                    translit: 'säʿat',
                    gloss: 'Hour. The Ethiopian day is counted from dawn, so that the first hour is about seven in the morning; the same word names the canonical hours of the office and the Horologium that contains them.',
                },
            ],
            texts: [
                {
                    title: '1 Enoch 72–82 (the Astronomical Book)',
                    note: 'Uriel\'s dictation of the gates of the sun, the phases of the moon and the 364-day year, with its denunciation of those who omit the four additional days. The Aramaic version from Qumran (4Q208–4Q211) is longer and more technical; the Geʿez preserves an abridgement.',
                },
                {
                    title: 'Jubilees 6',
                    note: 'The same calendrical argument in the same numbers, made canonical scripture in Ethiopia: a year of three hundred and sixty-four days divisible by seven, so that no festival ever changes its weekday.',
                },
                {
                    title: 'Bahrä Ḥasab',
                    note: 'The Ethiopian computus, transmitted in numerous manuscripts and taught in the church schools; determines the evangelist of the year, the epact and its complement, the date of Nineveh, and from it the whole movable cycle.',
                },
                {
                    title: 'ʿAwdä Nägäśt (The Cycle of Kings)',
                    note: 'The Ethiopian divinatory manual, of Arabic origin, for prognostication from days, names and numbers; frequently bound with computistical and devotional texts despite ecclesiastical disapproval. See the entry in the Encyclopaedia Aethiopica.',
                },
                {
                    title: 'Mäṣḥafä Säʿatat (The Book of the Hours)',
                    note: 'The Ethiopian Horologium, existing in more than one recension, one of them the work of Abba Giyorgis of Sägla; the liturgical ordering of the day against which the calendrical sciences are set.',
                },
                {
                    title: 'Otto Neugebauer, Ethiopic Astronomy and Computus (Vienna: Österreichische Akademie der Wissenschaften, 1979)',
                    note: 'The historian of ancient exact sciences turning to the Ethiopian material: the technical analysis of the computus and of the astronomy behind it, and the standard reference for anyone checking the arithmetic.',
                },
            ],
        },
    ],
};
