// Church Slavonic corpus — the Slavic shelf.
// Every link verified; a null contents field means the work's divisions
// could not be confirmed, not that it has none.
export default {
    note: 'The glory of this shelf is preservation. A large part of what stands on it belongs by right to Jewish and early Christian antiquity and survives in Slavonic in no other complete form, because a translation made in a Bulgarian, Serbian or Rus\' scriptorium outlived the Greek parent that begot it: the Book of the Secrets of Enoch, the Apocalypse of Abraham and the Ladder are here because a monk copying somewhere north of the Balkans went on copying after Byzantium had let the exemplar go. But the manuscripts in which they survive are late — the fourteenth century at the earliest and, for much of the material, the sixteenth and seventeenth — so that the textual history of these books is not a stemma reaching back towards an original but a chain of copies whose earlier links have perished, and where a reading is corrupt there is frequently nothing left to correct it from. This is also a living language and not only an archive: Church Slavonic, the daughter of the Old Church Slavonic these books are written in, is sung in the Divine Liturgy of several Orthodox churches this morning, and the Glagolitic gospel-books at the end of the shelf are the ancestors of that voice. Alongside the apocrypha, bound in the same miscellanies and often written by the same hand, sit the divinatory handbooks — the thunder-book, the tremor-book, the lot-books — together with the indices of renounced books that name and forbid them, so that the condemnation and the thing condemned lie between one pair of boards. And two of these works are the property of a persecuted people: the Bogomils, who were burned, anathematised and hunted, and whose own writing survives almost entirely in copies made by the men who were hunting them. A word on the headwords. Where an entry\'s title could be checked against the page of a printed edition, it is given in the spelling that edition prints — Лѣствица and Откровеніе Авраама as Tikhonravov heads them, Книга Голубиная as Bezsonov heads it, Громникъ as it stands in the second volume of the renounced books. Where no such form could be verified, the title is given in the modern Russian or Bulgarian civil orthography under which the work is customarily cited, and the entry says so; a headword of that kind is a scholar\'s convenience and must not be mistaken for a manuscript reading. What follows gives each work in its own letters where those letters can be verified, states plainly what is known and what is argued, describes the divinatory books historically without setting out any of their operative rubrics, and sends the reader only to texts that can actually be opened.',
    works: [
        {
            slug: 'kniga-enoha',
            native: 'Книга Еноха',
            translit: 'Kniga Enocha',
            english: 'The Book of Enoch, called in English the Book of the Secrets of Enoch (2 Enoch)',
            author: 'Anonymous and pseudepigraphic. The book speaks throughout in the voice of the patriarch Enoch; no author, redactor or translator is named anywhere in the tradition.',
            date: 'Radically contested. R. H. Charles placed the Greek original before the destruction of the Temple in AD 70; others have argued for the second century, for a late-antique Christian setting, and — with J. T. Milik — for a mediaeval Byzantine composition altogether. The Slavonic manuscripts themselves run from the fourteenth century to the seventeenth.',
            language: 'Church Slavonic, in South Russian, Middle Bulgarian and Serbian recensions; the Greek from which it was translated is lost',
            volume: null,
            description: 'The account of Enoch\'s ascent, of what he was shown and of what he came back to say. The shorter form carries him through seven heavens; the longer adds an eighth, a ninth and a tenth, sets him before the face of God, has him anointed and transfigured until he is indistinguishable from the glorious ones, and gives him the archangel Vretil (Vrevoil) as dictating angel, at whose mouth he writes three hundred and sixty-six books. He is then returned to earth for thirty days to instruct his sons, and the instruction — on mercy to the poor, on the treatment of beasts, on the folly of swearing — is the ethical heart of the work. The longer manuscripts append the strange narrative of the priesthood of Methuselah and Nir and the miraculous birth of Melchizedek, which does not properly belong to the book. Two matters are genuinely open: how old it is, and what language it was first written in. Greek is the usual answer, with Hebrew or Aramaic behind it for some scholars and a purely Slavonic composition for others; and although 2 Enoch was long the standard example of a work surviving in Slavonic alone, fragments in Coptic have since been identified, which complicates that claim without overturning the shelf\'s general truth. The headword above is the modern citation form. In the Slavonic collections the book is headed simply Енохъ, and the second of the pieces Tikhonravov prints under that head opens with a rubric naming it as from the books of Enoch the righteous, who was before the flood and is alive still.',
            incipit: null,
            contents: [
                {
                    heading: 'The ascent (long recension, chapters i–xxi in Morfill and Charles)',
                    english: 'Enoch is taken by two immense men from his bed and borne up through the heavens: the storehouses of snow and dew, the fallen watchers and the place of the condemned, paradise and the place of torment, the courses of the luminaries, the Grigori, and at last the tenth heaven and the face of the Lord.',
                },
                {
                    heading: 'The revelation and the writing (roughly chapters xxii–xxxviii)',
                    english: 'Enoch is anointed and clothed in glory; the archangel Vretil dictates to him for thirty days and thirty nights, and he writes three hundred and sixty-six books. God then narrates to him, alone, the making of the world out of the invisible and the creation and fall of Adam.',
                },
                {
                    heading: 'The instruction of the sons (roughly chapters xxxix–lxvi)',
                    english: 'Returned to earth for a fixed term, Enoch gathers Methuselah, his brothers and the elders and delivers his admonitions: on almsgiving and the poor, on the souls of animals, on not swearing, on the folly of sacrifice offered without mercy, and on the judgement that is prepared.',
                },
                {
                    heading: 'The assumption, and the Melchizedek appendix (roughly chapters lxvii–lxxiii)',
                    english: 'Enoch is taken up in darkness; the people build an altar at the place. In the fuller manuscripts there follows the account of the priesthood of Methuselah and of Nir, the birth of Melchizedek from a dead woman, and the Flood — matter which Morfill and Charles print, correctly, as an appendix rather than as part of the book.',
                },
            ],
            contentsNote: 'These are movements of the narrative, not divisions the manuscripts carry. The chapter numbering by which 2 Enoch is universally cited is editorial, established in the printed editions, and the two recensions do not distribute their material identically: the longer form has whole passages, including the eighth, ninth and tenth heavens, that the shorter simply lacks, and Morfill and Charles print such matter in brackets and smaller type. Anyone citing a chapter must say which recension is meant.',
            editions: [
                {
                    label: 'W. R. Morfill and R. H. Charles, The Book of the Secrets of Enoch, Translated from the Slavonic (Oxford: Clarendon Press, 1896)',
                    url: 'https://archive.org/details/bookofsecretsofe00morf',
                    note: 'The first English translation, Morfill rendering the Slavonic and Charles supplying introduction and notes. Made from four manuscripts: the Khludov codex (a South Russian recension of the second half of the seventeenth century, printed by A. Popov at Moscow in 1880) is the base, corrected where corrupt from the Belgrade manuscript found by Sokolov in 1886 and from Sokolov\'s collated text. Charles is candid that the base manuscript is \'in many places very corrupt\'. The Internet Archive record confirms the imprint: Oxford, The Clarendon Press, 1896.',
                },
                {
                    label: 'R. H. Charles (ed.), The Apocrypha and Pseudepigrapha of the Old Testament in English, vol. II: Pseudepigrapha (Oxford: Clarendon Press, 1913)',
                    url: 'https://archive.org/details/apocryphapseudep02char',
                    note: 'The great collection, in which 2 Enoch appears in the revised translation of N. Forbes and R. H. Charles, set among its relatives. This is the volume to reach for if the point is comparison rather than the book alone. Verified as volume 2 of the 1913 Clarendon printing.',
                },
                {
                    label: 'G. N. Bonwetsch, Die Bücher der Geheimnisse Henochs: das sogenannte slavische Henochbuch (Leipzig: J. C. Hinrichs, 1922)',
                    url: 'https://archive.org/details/diebcherdergeh00bonwuoft',
                    note: 'Bonwetsch\'s German rendering, the second of his two attempts at the book and the more considered. He was the scholar who did most to bring the Slavonic pseudepigrapha into Western view, and his handling of the recensions is more disciplined than Morfill\'s. The publisher, absent from our earlier note, is Hinrichs of Leipzig.',
                },
                {
                    label: 'Stojan Novaković\'s edition of the shorter Slavonic recension, in Starine XVI (Zagreb: Jugoslavenska akademija znanosti i umjetnosti, 1884)',
                    url: 'https://archive.org/details/starine_knjiga_15-17-jazu',
                    note: 'The Slavonic itself, and not a translation of it: Novaković printed the Serbian short redaction from the Belgrade Public Library manuscript here, under the heading \'Apokrif o Enohu\'. Charles cites it as his manuscript B. A caution about the link: the Internet Archive item bundles Starine XV, XVI and XVII in one file and its catalogue record dates the whole bundle 1883, the year of the fifteenth volume. The Enoch text stands in the sixteenth, which is of 1884; the reader must page past the first volume to reach it.',
                },
            ],
        },
        {
            slug: 'otkrovenie-avraama',
            native: 'Откровеніе Авраама',
            translit: 'Otkrovenie Avraama',
            english: 'The Apocalypse of Abraham',
            author: 'Anonymous and pseudepigraphic; Abraham speaks in the first person throughout.',
            date: 'Usually placed at the end of the first century or the beginning of the second, after the destruction of the Temple, which chapter xxvii appears to describe. The oldest Slavonic witness, the Codex Sylvester, is of the fourteenth century — Tikhonravov\'s own heading calls it a parchment copy of the fourteenth.',
            language: 'Church Slavonic; the original was probably Hebrew, on the argument of Box and Landsman, perhaps by way of Greek',
            volume: null,
            description: 'A book in two unequal halves. The first eight chapters are a haggadic tale of Abraham in his father\'s house: Terah the maker of idols, the wooden god that falls and burns, the stone god broken in the road, and the young man\'s slow reasoning from the destructibility of the images to the God who made fire, water and the stars and is not any of them. From chapter nine the tone changes utterly. Abraham is commanded to a sacrifice, given the angel Iaoel as guide, borne up on the wing of the turtle-dove and the pigeon, and shown the throne, the living creatures full of eyes, the picture of the world\'s whole history spread out beneath him, the sin in the garden, the Temple and its desecration, and the ten plagues of the last age. Azazel appears as the adversary in the form of an unclean bird. It survives in Slavonic alone, in the Codex Sylvester and in copies embedded in the Palaea, the Slavonic Old Testament history; one passage in chapter xxix is a Christian interpolation, and is generally recognised as such. The title above is given as Tikhonravov heads it, in the pre-reform orthography of his 1863 volume.',
            incipit: null,
            contents: [
                {
                    heading: 'Chapters i–viii: Abraham and the idols of Terah',
                    english: 'The legend of the young Abraham in his father\'s workshop: Merumath the stone god, the five idols burnt in the fire, the argument from their perishability, and the voice from heaven calling him out of his father\'s house before it is consumed.',
                },
                {
                    heading: 'Chapters ix–xxxii: the sacrifice, the ascent and the vision',
                    english: 'The command to sacrifice; the angel Iaoel; the ascent on the wings of the birds; the song before the throne; the vision of the living creatures and the chariot; the picture of the world beneath the firmament, with Adam and Eve and Azazel, the Temple, its defilement and the burning; the appearing of the Chosen One; and the eschatological reckoning with the ten plagues.',
                },
            ],
            contentsNote: 'The two-part shape is genuine and is universally recognised; the chapter numbering is editorial. The end of the book is missing from the Codex Sylvester and has to be supplied from the Palaea copies, which are on the whole a less good text but preserve what the oldest manuscript has lost — a small and characteristic instance of how this literature has come down.',
            editions: [
                {
                    label: 'G. H. Box and J. I. Landsman, The Apocalypse of Abraham, edited with a translation from the Slavonic text and notes (London: SPCK; New York: Macmillan, 1918)',
                    url: 'https://archive.org/details/cu31924010244048',
                    note: 'The standard English translation, in the SPCK Translations of Early Documents series, and verified as the 1918 SPCK–Macmillan printing. Landsman worked from the Slavonic, Box supplied the apparatus, and the introduction sets out the manuscripts with unusual clarity: Codex Sylvester (S) as the oldest and best, the Palaea texts (A and K) supplying what S has lost, and Pypin\'s partial Palaea text of chapters i–viii. Matter absent from S is printed in brackets and smaller type.',
                },
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. I (St Petersburg: Типографія Товарищества «Общественная Польза», 1863)',
                    url: 'https://archive.org/details/20200408_20200408_1154',
                    note: 'The Slavonic. The imprint matters and we had it wrong before: the first volume is St Petersburg, not Moscow — only the second volume is Moscow. Tikhonravov\'s own table of contents, checked against the scan, gives section V, Откровеніе Авраама, in two texts: the fourteenth-century parchment copy of the Sylvester collection beginning at page 32, and the fifteenth-century ustav Palaea of the Joseph-Volokolamsk monastery, no. 549, following it — the two running to page 77 in all. The same volume carries the Slavonic indices of renounced books, in which the Apocalypse of Abraham is itself listed among the forbidden titles: a book condemned and preserved by the same tradition.',
                },
                {
                    label: 'G. N. Bonwetsch, Die Apokalypse Abrahams; Das Testament der vierzig Märtyrer (Leipzig: A. Deichert, 1897)',
                    url: 'https://archive.org/details/dieapokalypseabr0000unse',
                    note: 'Bonwetsch\'s German translation with commentary, the work that first put the book securely into Western scholarship; Box and Landsman depend on it repeatedly even where they differ from it. The library record for this scan states outright that his rendering is made from the Church Slavonic version as published by Tikhonravov, pages 32 to 77, and by Sreznevsky — which independently confirms the pagination given above.',
                },
                {
                    label: 'I. Porfir\'ev, Апокрифическія сказанія о ветхозавѣтныхъ лицахъ и событіяхъ (Kazan, 1872)',
                    url: 'https://archive.org/details/20200429_porfiriev',
                    note: 'Porfir\'ev\'s study volume, which discusses the Old Testament apocrypha in Slavonic at length; verified as the Kazan investigation of 1872. Note that this is not the Petrograd volume of 1877 in which he printed the texts themselves from Solovetsky manuscripts; that second book is a different publication, and we have not found a verified free scan of it.',
                },
            ],
        },
        {
            slug: 'lestvica-iakova',
            native: 'Лѣствица',
            translit: 'Lěstvica',
            english: 'The Ladder, cited in scholarship as the Ladder of Jacob',
            author: 'Anonymous; Jacob speaks in the first person. No attribution of any kind attaches to it in the manuscripts.',
            date: 'Undetermined. The Jewish core is generally placed in the first or second century AD; the closing sections, which are plainly Christian, are later and stand only in the second recension. The oldest manuscript of the fuller recension is dated 1494.',
            language: 'Church Slavonic; a Greek intermediary is assumed and a Semitic original often argued, but nothing earlier survives',
            volume: null,
            description: 'A short and badly damaged text, and one of the purest instances of what this shelf is for: it exists in Slavonic and nowhere else. It expands Genesis 28. Jacob sees the ladder, but the ladder here has twelve steps, and on each step two human faces to right and left — twenty-four faces seen down to the breast — with a thirteenth face at the summit, hewn out of fire, more terrible than the rest. Jacob wakes, sets up the stone, and prays a long invocation heaped with divine names, a prayer which Montague Rhodes James noticed resembles the one in the Apocalypse of Abraham. The archangel Sariel is sent to interpret: the ladder is this age, the twelve steps its times, the twenty-four faces the kings of the lawless nations, and there follows a compressed prophecy of Temple, exile, Rome and Egypt. The oldest manuscript breaks off there. The second recension continues into an explicitly Christian conclusion about the one who joins the upper to the lower. The headword above is what the Slavonic collections actually print: simply Лѣствица, the Ladder, without Jacob\'s name. The name under which the indices of renounced books condemned it is different again — Іаковичи, a single title covering this book and the Apocalypse of Abraham together.',
            incipit: null,
            contents: [
                {
                    heading: 'Sections 1–2',
                    english: 'The ladder set up on the earth with twelve steps and twenty-four faces, the face of fire at its summit, the angels ascending and descending, and the Lord\'s promise of the land and of seed as the stars; Jacob\'s waking, the pillar and the oil.',
                },
                {
                    heading: 'Section 2 (continued): the prayer',
                    english: 'The invocation of the God of Adam, of Abraham and of Isaac, enthroned upon the cherubim, who spread out the heavens and appointed the courses of sun, moon and stars lest these be taken for gods; a heaping of names — Jaoel, Sabaoth, Chabod and the rest — and the petition for the interpretation of the dream.',
                },
                {
                    heading: 'Section 3: the coming of Sariel',
                    english: 'The voice sends Sariel, prince of those over visions, to make Jacob understand; the angel\'s terrible face, the giving of the name Israel, and a passage in which the incidents of the ladder and of the wrestling appear to have been confused by a damaged exemplar.',
                },
                {
                    heading: 'Sections 4–6: the interpretation',
                    english: 'The ladder is this age, the steps its times, the faces the kings of the lawless nations. James read section 4 as touching the Temple and the Exile, section 5 as more clearly Roman, and section 6 as certainly Egyptian: the bondage, the crying of the afflicted, and the Lord\'s fighting for the seed of Jacob. The oldest manuscript ends here.',
                },
                {
                    heading: 'Sections 7–8 (second recension only): the Christian conclusion',
                    english: 'A man from the Most High who will desire to join the upper with the lower; the signs at his coming, the star, the falling of the idols and the renewing of humankind. James states flatly that this matter is Christian and stands only in the second recension.',
                },
            ],
            contentsNote: 'The numbering is Bonwetsch\'s, taken over by James, and rests on the two Slavonic recensions rather than on any division the scribes marked. The first recension survives in a single mutilated manuscript of 1494 in the Rumyantsev collection at Moscow and gives the most original text; the second is the version embedded in the Palaea and has been printed by several Russian scholars. Lines are simply gone in places, and both James and Bonwetsch mark the gaps rather than filling them.',
            editions: [
                {
                    label: 'M. R. James, The Lost Apocrypha of the Old Testament: Their Titles and Fragments (London: SPCK, 1920), Appendix',
                    url: 'https://archive.org/details/lostapocryphaofo00jame',
                    note: 'James\'s English, printed as an appendix to the volume because, as he says, it did not quite fit the framework of the main book. He works from Bonwetsch\'s text and translation in the Göttingen Nachrichten for 1900, p. 76, marks the lacunae, and gives the variants of the second recension in square brackets. We have found no free scan of the Göttingen volume itself, so this is the accessible route to Bonwetsch\'s work. Verified as the 1920 SPCK–Macmillan printing.',
                },
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. I (St Petersburg: Типографія Товарищества «Общественная Польза», 1863)',
                    url: 'https://archive.org/details/20200408_20200408_1154',
                    note: 'The Slavonic, and the imprint is St Petersburg rather than Moscow, as we had it. Checked against the scan: Tikhonravov\'s table of contents gives section VII, Лѣствица, at page 91, printed from the parchment Palaea of the Trinity–Sergius Lavra, no. 38, written at Kolomna in 1406. His own footnote to the indices of renounced books is worth having verbatim in substance: the book called Іаковичи, he says, comprised the Откровеніе Авраама and the Лѣствица, and for that reason he divides the indices\' entry into two parts. These are the two works of this shelf that were condemned together under one name.',
                },
            ],
        },
        {
            slug: 'tajnaja-kniga',
            native: 'Тайна книга',
            translit: 'Tajna kniga',
            english: 'The Secret Book, known in Latin as the Interrogatio Iohannis and in older literature as the Liber Sancti Johannis or the Secret Supper',
            author: 'Anonymous, and Bogomil. The Carcassonne copy carries an inquisitor\'s note connecting it with Nazarius, bishop of the dualist church of Concorezzo in Lombardy, who is said to have brought it out of Bulgaria; whether Nazarius also made one of the Latin translations is unknown.',
            date: 'The Bogomil original is generally assigned to the twelfth century, but the assignment is an inference and not a datum: no copy of that original exists, and Nazarius, on whose testimony the connection with Bulgaria rests, is a thirteenth-century figure whom Rainerius Sacconi mentions. The Vienna witness is a fourteenth-century parchment; the Carcassonne witness comes to us through an inquisitorial register.',
            language: 'None. This book has no Slavonic text: not a leaf, not a fragment, not a citation in Slavonic has ever been found. It survives only in two Latin translations, and both reached the modern world through the anti-heretical archives of the Latin West — the one from the inquisition\'s own register at Carcassonne, the other in a Vienna codex of material gathered against the dualists. It is placed on a Slavonic shelf because its lost original was Bulgarian, and for no other reason; the entry says this at the outset so that no reader takes the Cyrillic headword above for a witness.',
            volume: null,
            description: 'The one substantial Bogomil book that has come down entire, and it has come down in the archives of the men who suppressed the movement. It is a dialogue at the Last Supper: John, leaning on his master\'s breast, asks and Christ answers, and the answers set out the moderate dualist account of things — the pre-eternal world; the revolt and fall of Satan, who nevertheless retains power enough to fashion this world and the body of man; the sending of Christ into that fashioned world; and the end, when Satan is destroyed and the righteous saved. Two Latin copies exist and no Slavonic one. The first was found in the inquisitorial archive at Carcassonne and has since gone to Paris; the second is the Vienna parchment codex 1137 of the fourteenth century, a manuscript of anti-heretical matter whose margins carry annotations — we do not repeat the claim, which we cannot support, that its scribe was himself a dualist. The two render the same work but differ in wording and detail enough that they were probably made from different exemplars. The Carcassonne copy has no title: its first editor, the Dominican Benoist, called it the Faux Évangile, and Thilo renamed it the Liber Sancti Johannis, which is the name it now bears in scholarship; the Vienna copy\'s own heading begins Joannis et Apostoli et Evangelistae Interrogatio. On the Carcassonne text an inquisitor wrote that this was the secret of the heretics of Concorezzo, brought out of Bulgaria by Nazarius their bishop, and full of errors. That is the annotation of an enemy — the voice of the apparatus that hunted these people, not a description we adopt — and it is also the reason the book exists at all. The headword above is not a title from any manuscript. It is the Bulgarian designation, Тайна книга, under which Ivanov printed the work in 1925, and it belongs to modern scholarship rather than to the tradition.',
            incipit: null,
            contents: [
                {
                    heading: 'The pre-eternal world and the fall of Satan',
                    english: 'John\'s question about the state of things before the present order; the account of the first, unfallen world, and of the revolt of the steward of heaven, his fall and the fall of the powers with him.',
                },
                {
                    heading: 'The making of this world and of the body of man',
                    english: 'Satan\'s fashioning of the visible creation and of the human body, into which a fallen spirit is set — the doctrine on which the whole ethic of the movement turned, and which its opponents reported with more heat than accuracy.',
                },
                {
                    heading: 'The mission of Christ',
                    english: 'How Christ was sent into the world that Satan had made, and what his coming, his baptism and his passion accomplished within it.',
                },
                {
                    heading: 'The end',
                    english: 'The apocalyptic close: the second coming, the destruction of Satan, the judgement, and the salvation of the righteous.',
                },
            ],
            contentsNote: 'The book is a continuous dialogue and carries no internal divisions; the four movements above summarise its argument as Ivanov analysed it, and are not headings a manuscript supplies. The two Latin copies also differ in what they contain, so any summary is a summary of a family rather than of a text. It should be said once more, because the shape of this entry might otherwise mislead: there is no Slavonic manuscript behind these headings.',
            editions: [
                {
                    label: 'Йор. Ивановъ, Богомилски книги и легенди (Sofia: Придворна печатница, 1925)',
                    url: 'https://archive.org/details/bogomilskiknigii0000ivan',
                    note: 'The indispensable volume, and the best single place to meet this literature; verified as the 1925 Sofia printing, issued under the auspices of the Bulgarian Academy of Sciences, and freely readable in full. Ivanov prints both Latin copies from their oldest editions, discusses the manuscripts, the titles and the transmission with great care, and shows that a supposed Greek original in Venice, Marciana Nanni 128, has in fact nothing to do with the book. The same volume prints the Slavonic texts of the Vision of Isaiah, Enoch, the Revelation of Baruch, Adam and Eve, the Sea of Tiberias, the Razumnik and the Bulgarian apocryphal chronicle.',
                },
                {
                    label: 'J. C. Thilo, Codex apocryphus Novi Testamenti, vol. I (Leipzig: F. C. G. Vogel, 1832)',
                    url: 'https://archive.org/details/codexapocryphusn00thil',
                    note: 'The Latin of the Carcassonne copy, printed under the heading Liber S. Joannis apocryphus — the printing that gave the work the name by which it is now generally known. Thilo reprints Benoist\'s Paris text of 1691. Verified as the 1832 Leipzig printing; the publisher is Vogel, which our earlier note omitted.',
                },
                {
                    label: 'I. von Döllinger, Beiträge zur Sektengeschichte des Mittelalters, vol. II: Dokumente (Munich: Beck, 1890)',
                    url: 'https://archive.org/details/beitsektenmittel02dolluoft',
                    note: 'The Vienna copy, in the great documentary volume of inquisitorial and heresiological material; verified as volume II of the 1890 Munich printing. Ivanov notes that Sokolov\'s 1910 reprint of Döllinger\'s text is disfigured by errors that Döllinger\'s own corrigenda would have prevented; go to Döllinger. The reader should hold in view what kind of book this is — a collection assembled by prosecutors, in which the dualists appear only as defendants.',
                },
                {
                    label: 'M. R. James, The Apocryphal New Testament (Oxford: Clarendon Press, 1924)',
                    url: 'https://archive.org/details/JAMESApocryphalNewTestament1924',
                    note: 'An English rendering, printed as \'The Book of the Evangelist\'. James introduces it as a Bogomil production which denies that this world was made by God, and notes its use among the Albigensian heretics of southern France. The shortest way in for a reader without Latin. Verified as the 1924 printing.',
                },
            ],
        },
        {
            slug: 'beseda-kozmy-presvitera',
            native: 'Бесѣда на новоявившуюся ересь Богумилу',
            translit: 'Besěda na novojavivšujusja eres\' Bogumilu',
            english: 'The Discourse Against the Newly Appeared Heresy of Bogomil, commonly the Sermon Against the Heretics',
            author: 'Cosmas the Priest (Козма Пресвитеръ), a Bulgarian presbyter. Nothing is known of him beyond this work; the attribution is the manuscripts\' own and has not been seriously doubted, though his identity has occasionally been reopened in twentieth-century Bulgarian scholarship. We give no date for that reopening, having been unable to verify one.',
            date: 'Second half of the tenth century, in the Bulgarian lands, within living memory of the priest Bogomil himself. The surviving copies are chiefly Russian and late.',
            language: 'Church Slavonic, of Bulgarian composition, transmitted in Russian recension',
            volume: null,
            description: 'The earliest sustained account of the Bogomils by anyone, and the fullest that survives in Slavonic. Cosmas writes as a churchman appalled: he describes the heretics\' rejection of the Old Testament, of the cross, of the icons, of the sacraments and of the priesthood, their attribution of the visible world to the devil, their fasting and abstinence, their refusal of marriage and of meat, and — what evidently frightened him most — their outward humility and the impression of holiness they made on ordinary people. But the Discourse is a double-edged document, and honest readers have always said so, because its second and longer movement turns on Cosmas\'s own church: idle priests, drunken and greedy monks, bishops who neglect their flocks, the failure of instruction that he takes to be the reason the heresy spread at all. He is a hostile witness and the principal one, and this is the difficulty that runs through the whole subject: nearly everything we are told about Bogomil belief comes from men writing to have it extirpated, and the believers themselves are almost entirely voiceless. What was done to them is not in dispute. The Synodikon of Tsar Boril anathematised them in 1211; Basil, called the Physician, was burned at Constantinople under Alexios I; the hunting went on for centuries in the Balkans and in Lombardy, and the Latin inquisition\'s registers are the reason a Bogomil book survives at all. Cosmas\'s own text should be read as evidence about its author as well as about its subject, and the people he describes should be granted the dignity of having believed something, rather than of having merely erred.',
            incipit: null,
            contents: [
                {
                    heading: 'Against the heretics',
                    english: 'The account of the appearing of the priest Bogomil in the days of the Bulgarian tsar Peter, and of what his followers teach and refuse: the Old Testament, the cross, the images, the eucharist, the ordained priesthood, marriage, the eating of flesh, and the goodness of the visible creation.',
                },
                {
                    heading: 'The instruction from the divine books',
                    english: 'The longer admonitory part, addressed to the orthodox and above all to their clergy and monks: on the duties of priests, on false and idle monasticism, on wealth, on the reading of scripture, and on the pastoral negligence which Cosmas holds responsible for the heresy\'s success.',
                },
            ],
            contentsNote: 'The two-part shape is signalled by the title under which Popruzhenko published it — a word against the heretics and an instruction from the divine books — and is the shape the copies keep, but the divisions are not numbered chapters and the manuscripts vary in what they include and in what order. The headword above is given with the yat, as the Slavonic title stands; the modern Russian civil spelling Беседа will be met everywhere in secondary literature.',
            editions: [
                {
                    label: 'Йор. Ивановъ, Богомилски книги и легенди (Sofia: Придворна печатница, 1925)',
                    url: 'https://archive.org/details/bogomilskiknigii0000ivan',
                    note: 'Ivanov does not print Cosmas\'s text, but he quotes and weighs it continuously through his opening chapters, and his bibliography is the map of the whole subject. It is from him that one gets the exact reference for the standard Russian edition: Св. Козмы Пресвитера Слово на еретики и поученіе отъ божественныхъ книгъ, ed. M. G. Popruzhenko, St Petersburg, 1907, in the Памятники древней письменности и искусства series.',
                },
                {
                    label: 'Franjo Rački, Bogomili i patareni, in Rad Jugoslavenske akademije znanosti i umjetnosti, knjiga VIII (Zagreb, 1869)',
                    url: 'https://archive.org/details/rad_jugoslavenske_akademije_znanosti_knjiga_8_1869',
                    note: 'The nineteenth century\'s most influential treatment of the Balkan dualists, and the one that put Cosmas into general European circulation; verified as knjiga 8 of Rad, 1869, Rački\'s study running across more than one volume of the series. Rački is a Catholic priest writing in 1869 and his sympathies are not with his subjects; read him for the documents he assembles rather than for his verdicts, and do not mistake his judgements for the judgement of history.',
                },
                {
                    label: 'I. von Döllinger, Beiträge zur Sektengeschichte des Mittelalters, vol. I (Munich: Beck, 1890)',
                    url: 'https://archive.org/details/beitrgezursekt01dl',
                    note: 'The narrative volume of Döllinger\'s Beiträge, tracing the dualist sects from the Gnostic and Manichaean past through the Bogomils to the Cathars; verified as volume 1 of the 1890 Munich printing. Useful as a frame around Cosmas; and, like Rački, a document of nineteenth-century confessional history as much as a history of the twelfth century.',
                },
                {
                    label: 'Popruzhenko\'s editions, noted here without a link',
                    url: 'https://archive.org/details/bogomilskiknigii0000ivan',
                    note: 'We have searched the Internet Archive for M. G. Popruzhenko\'s edition of the Slavonic text — the St Petersburg printing of 1907, and the fuller Sofia edition of 1936 in the Български старини series — and found no free scan of either. Readers wanting the Slavonic itself will have to go to a research library. The link here is to Ivanov, where the references are set out; we would rather say this than send the reader to something else.',
                },
            ],
        },
        {
            slug: 'izbornik-1073',
            native: 'Изборник Святослава 1073 года',
            translit: 'Izbornik Svjatoslava 1073 goda',
            english: 'The Miscellany of Svyatoslav of 1073',
            author: 'A compilation, not a composition. The exemplar was a Bulgarian florilegium made in the tenth century for Tsar Symeon; the Kiev copy names its scribe, the deacon John, and its patron, Prince Svyatoslav Yaroslavich.',
            date: '1073, at Kiev; the Bulgarian original from which it was copied belongs to the first quarter of the tenth century',
            language: 'Church Slavonic, East Slavic recension',
            volume: null,
            description: 'One of the oldest dated books of Rus\', and the nearest thing the Slavonic world has to a one-volume library of Greek learning. It is a florilegium of several hundred short articles — questions and answers, definitions, patristic extracts — drawn chiefly from the Questions and Answers of Anastasius of Sinai and from a few dozen other Greek fathers, and translated wholesale in Bulgaria for Symeon before being copied at Kiev with Svyatoslav\'s name substituted for the tsar\'s. It carries a famous frontispiece miniature of the prince and his family. Two of its articles matter more than their length suggests. One is the treatise of George Choiroboskos on the figures of speech, О образѣхъ, which is the first work of poetics in a Slavonic language and gave the Slavs their vocabulary for metaphor, allegory and irony. The other is the article on true, hidden and false books — the index which lists what may be read and what may not, and which is the ancestor of every later Slavonic index of renounced books. It is worth pausing on what that means for this shelf: the same manuscript culture that copied the Apocalypse of Abraham also drew up, and copied, the list forbidding it. The headword above is the modern short designation; the 1880 facsimile\'s own title-page reads Изборникъ Великаго Князя Святослава Ярославича 1073 г.',
            incipit: null,
            contents: [
                {
                    heading: 'The questions and answers',
                    english: 'The bulk of the book: several hundred short articles of doctrinal, exegetical and moral instruction, drawn largely from the Questions and Answers attributed to Anastasius of Sinai and from other Greek fathers, translated as a body from a Greek anthology.',
                },
                {
                    heading: 'О образѣхъ — On figures',
                    english: 'George Choiroboskos\'s treatise on the tropes of speech, giving in Slavonic the terminology of metaphor, allegory, irony and the rest. The first poetics in the language.',
                },
                {
                    heading: 'The article on true, hidden and false books',
                    english: 'The list of the canonical scriptures, of the \'hidden\' books and of the false ones — the earliest Slavonic index of renounced books, and the source of a tradition of such indices running down to the sixteenth century.',
                },
                {
                    heading: 'The scribal colophon and the frontispiece',
                    english: 'The verses naming the deacon John as copyist and Svyatoslav as patron, and the miniature of the prince with his wife and sons — matter added at Kiev, on top of a book that was Bulgarian in everything else.',
                },
            ],
            contentsNote: 'The Izbornik is not a book with a table of contents in the modern sense; it is a mass of short articles, and no summary of four heads can represent it. What is listed above are the components by which it is known and cited. The manuscript is now in the State Historical Museum in Moscow; the article on true and false books is what makes it belong on a shelf of hidden books at all.',
            editions: [
                {
                    label: 'Изборникъ Великаго Князя Святослава Ярославича 1073 г. (St Petersburg: тип. Ѳ. Г. Елеонскаго и Ко, 1880)',
                    url: 'https://archive.org/details/1073_izbornik',
                    note: 'The photolithographic facsimile published for the Society of Lovers of Ancient Letters — the whole codex, page by page, as the eleventh-century scribe left it. Verified as the 1880 publication, catalogued under Church Slavonic. There is no substitute for looking at it: the reader who has only read about the Izbornik has not met the object. (Our earlier rendering of the printer\'s name used a masculine ordinal indicator in place of a Cyrillic letter; it is corrected here.)',
                },
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. I (St Petersburg: Типографія Товарищества «Общественная Польза», 1863)',
                    url: 'https://archive.org/details/20200408_20200408_1154',
                    note: 'For the index tradition specifically, and with the imprint corrected to St Petersburg. Tikhonravov prints and collates the Slavonic articles on true and false books, and his notes track particular titles — the Enoch books, the Іаковичи, the Лѣствица — from index to index. The essential companion to this entry.',
                },
                {
                    label: 'Іван Огієнко (Іларіон), Історія церковнослов\'янської мови: Пам\'ятки старослов\'янські X–XI віків (Warsaw, 1929)',
                    url: 'https://archive.org/details/ogiienkoPamyatki',
                    note: 'Ohienko\'s survey of the oldest monuments of the language, in Ukrainian, describing manuscript by manuscript; verified as the 1929 publication. Its centre of gravity is the South Slavonic canon rather than Kiev, but it is the best free introduction to the palaeography and the recensions among which the Izbornik stands. We drop the volume number we gave before, the catalogue record for this scan not stating one.',
                },
            ],
        },
        {
            slug: 'golubinaja-kniga',
            native: 'Книга Голубиная',
            translit: 'Kniga Golubinaja',
            english: 'The Book of the Dove',
            author: 'Anonymous and traditional. It was not written but sung, by the kaliki perekhozhie — the blind and crippled wandering pilgrim-singers who carried the spiritual verses through the Russian countryside.',
            date: 'Written down from oral singing in the eighteenth and nineteenth centuries. Its materials are far older, and descend from the mediaeval Slavonic question-and-answer literature; no mediaeval text of the poem exists.',
            language: 'Russian, in the traditional literary dialect of the spiritual verses, with Church Slavonic vocabulary throughout. It is the one item on this shelf that is not a Church Slavonic text at all, and stands here for its descent rather than its language.',
            volume: null,
            description: 'Not a book at all, but a song about a book, and the most extraordinary thing on this shelf. A great volume comes to earth in the Saracen field and cannot be lifted, cannot be carried round, cannot be read; forty tsars with their sons and forty princes with theirs gather to it. Where it comes from depends on who is singing. In the Vokshino text the book falls by the Alatyr stone and the head of Adam; in another of Bezsonov\'s variants it falls out of the heavens; the thundercloud belongs to some tellings and not to others, and we no longer state it as though it belonged to all. Vladimir — called tsar, not prince, in the Vokshino singing — asks the all-wise Davyd Evseevich to read the book, and Davyd answers instead out of memory, and the answering is the poem: which city is mother of cities, which tsar is tsar over tsars, which is the mother of rivers, of mountains, of beasts, of birds, of stones, of trees. The catechism is cosmological and its answers are Christian in vocabulary and something older in shape. Most variants close with the dream of the combat between Pravda and Krivda, Truth and Falsehood, in which Truth goes up into heaven and Falsehood remains on the damp earth. Even the title is unsettled: Голубиная from голубь, the dove, or Глубинная, of the depths — the manuscripts and the singers give both, and scholarship has not decided. Bezsonov printed more than a dozen variants and no two say the same thing. The headword above is given in his word order, Книга Голубиная, which is how he heads the poem; the inverted form Голубиная книга is the modern citation habit.',
            incipit: {
                native: 'Выпадала Книга Голубиная',
                english: 'The Book of the Dove fell down',
                note: 'Checked against the scan of Bezsonov\'s first volume. This is the fourth line of the Vokshino text, from the Serpukhov district, printed there under the heading КНИГА ГОЛУБИНАЯ; the three lines before it place the falling by the Alatyr and the head of Adam in the midst of the Saracen field, and the line following begins the gathering of the forty tsars. We had earlier given the words in lower case; Bezsonov capitalises the book\'s name, and the capitals are restored. Another of his variants opens instead with the book falling from the heavens. The verse exists in many recorded variants and no single opening line can be called its own: what is constant is the falling of the book, not the words that carry it there. The line contains no character that differs between the pre-revolutionary orthography Bezsonov printed and the modern one.',
            },
            contents: [
                {
                    heading: 'The falling of the book and the gathering',
                    english: 'The book comes to earth in the Saracen field — by the Alatyr and Adam\'s head in some tellings, out of the heavens in others; forty tsars with their sons and forty princes with theirs come together to it; its dimensions are given in fathoms, and it is established that no one can lift it, encompass it or read it.',
                },
                {
                    heading: 'The questioning of Davyd Evseevich',
                    english: 'Vladimir asks the all-wise Davyd to read the book; Davyd answers from memory instead, and the poem becomes a catechism about the origin of the white world, the sun, the moon, the dawn, the stars, the winds, and the peoples.',
                },
                {
                    heading: 'The hierarchies',
                    english: 'The series of \'which is mother of\' questions and their answers — the tsar over tsars, the city over cities, the church over churches, the river, the mountain, the tree, the beast, the bird, the stone — each answer grounded in a scriptural or legendary reason.',
                },
                {
                    heading: 'The dream of Pravda and Krivda',
                    english: 'The closing vision of two hares, or two beasts, contending on the open field: Truth and Falsehood, after which Truth departs into the heavens and Falsehood remains upon the damp earth. Present in most but not all variants; in the Vokshino singing the grey hare is named as Krivda, and Krivda is left upon the damp earth.',
                },
            ],
            contentsNote: 'This is the shape the poem usually takes, not a division any singer marked. Bezsonov\'s variants differ in the order of the questions, in which questions appear at all, in the names given to the questioner, and in whether the Pravda and Krivda episode is present. His text also records, in the singer\'s own words, that the Book of the Dove is kept in old Jerusalem — a remark we have now verified on the page rather than reporting at second hand.',
            editions: [
                {
                    label: 'П. Безсоновъ, Калѣки перехожіе: сборникъ стиховъ и изслѣдованіе, vol. I (Moscow: А. Семенъ, 1861)',
                    url: 'https://archive.org/details/kaliekiperekhoz01bezsgoog',
                    note: 'The great collection of the Russian spiritual verses, and where the Book of the Dove is to be read; verified as volume 1, Moscow, A. Semen, 1861. Bezsonov prints the variants one after another with their provenances — Vokshino in the Serpukhov district and others — so that the reader watches the same poem come apart and reassemble across a hundred miles of country. His own commentary is of its period and should be read as such.',
                },
                {
                    label: 'П. Безсоновъ, Калѣки перехожіе, vol. II (Moscow: А. Семенъ; issued in parts during the 1860s)',
                    url: 'https://archive.org/details/kaliekiperekhoz02bezsgoog',
                    note: 'The continuation, for the wider repertory of the wandering singers into which the Book of the Dove fits: the verses on Alexis the Man of God, on Joseph the Fair, on the Last Judgement. We no longer give a flat year for this volume. The collection appeared in fascicles over several years, and the catalogue record for this scan is itself inconsistent, giving 1861 in one field and 1868 in another; we would rather report the uncertainty than print a date we cannot stand behind.',
                },
                {
                    label: 'Ѳ. И. Буслаевъ, Историческая хрестоматія церковнославянскаго и древнерусскаго языковъ (Moscow, 1861)',
                    url: 'https://archive.org/details/istoricheskajahrestomatijatserkovnoslavj44',
                    note: 'Buslaev\'s anthology, verified as the 1861 publication, which sets the spiritual verses in the same volume as the mediaeval Slavonic prose from which their questions descend, and mentions the Book of the Dove in that connection. The best way to see the continuity between the manuscript question-books and the sung ones.',
                },
            ],
        },
        {
            slug: 'gromnik',
            native: 'Громникъ',
            translit: 'Gromnikъ',
            english: 'The Thunder-Book',
            author: 'Anonymous. The Slavonic copies carry no author; some Greek brontologia bear imperial or prophetic names, but we have not been able to verify such an ascription in the Slavonic text and therefore do not report one.',
            date: 'Descended from the Byzantine brontologia; when it entered Slavonic is not established. It is named in the Slavonic indices of renounced books, and the copies that survive are of the fifteenth century and later.',
            language: 'Church Slavonic, in Serbian and Russian recensions',
            volume: null,
            description: 'A book of prognostication from thunder. Its articles are arranged by the sign of the zodiac in which the moon or the sun stands when thunder is heard, and by the month, and each article predicts the year that follows: the wheat and the barley, the vines and the pulse, the sickness of cattle, the mortality among men, war in one quarter and peace in another, the fate of some king or some region. It belongs to a whole family of small divinatory handbooks that travelled together in Slavonic miscellanies — the Kolyadnik, which prognosticates from the day of the week on which Christmas falls; the Trepetnik, from involuntary twitchings of the body; the Lunnik, from the moon; the Volkhovnik, the Ptichnik, the Snosudets, the Myslenik — and it is named alongside them in the indices of forbidden books, which is very largely how we know it was read. It was, that is, a working book: copied because someone meant to consult it, and condemned because someone else knew that. We describe it here and print none of its rubrics. The headword is given as it is actually printed in the renounced-books collection, with the final hard sign.',
            incipit: null,
            contents: null,
            contentsNote: 'The Gromnik is a series of short prognostic articles indexed by zodiacal sign and by month, and its copies differ in how many articles they carry and in what order. We give no table of them and no specimen of their wording. The house rule for this shelf is that divinatory material is described historically and never set out in a form that could be used, and the Gromnik is exactly the case that rule exists for.',
            editions: [
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. II (Moscow: Университетская типографія, 1863)',
                    url: 'https://archive.org/details/2_20200410',
                    note: 'Where the Slavonic Громникъ is printed, among the renounced books of the second volume — confirmed by searching the scan, in which the heading ГРОМНИКЪ stands twice, with the Колядникъ following a little after. (Our earlier text of this note contained a Coptic letter in place of the Cyrillic em in Громникъ; it is corrected.) The second volume, and this one only, carries the Moscow imprint. Tikhonravov\'s collection is the foundation of all study of this material and prints the divinatory handbooks alongside the apocrypha with which they shared their manuscripts. The reader should know before opening it that the operative text is there on the page.',
                },
                {
                    label: 'М. Сперанскій, Изъ исторіи отреченныхъ книгъ, I: Гаданія по Псалтыри (St Petersburg, 1899)',
                    url: 'https://archive.org/details/1.-1899',
                    note: 'The first of Speranskij\'s four studies of the Slavonic renounced books, on divination by the Psalter. He is the scholar who established how these handbooks travelled, and his method — text, manuscript history, and the indices that condemn them, all together — is the model. A note on the link: this is not a library scan but a copy uploaded by a private individual in 2021, of the 1899 printing; the file is a legible facsimile and the volume and year are stated on it, but the reader should know what kind of item it is.',
                },
                {
                    label: 'М. Сперанскій, Изъ исторіи отреченныхъ книгъ, II: Трепетники (St Petersburg, 1899)',
                    url: 'https://archive.org/details/2.-1899',
                    note: 'On the Trepetnik, the Gromnik\'s nearest neighbour in the miscellanies and in the indices: prognostication from the twitching of the limbs. Between this and the volume above, the family to which the thunder-book belongs comes clearly into view. As with the first volume, this is a privately uploaded scan of the 1899 printing rather than an institutional digitisation.',
                },
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. I (St Petersburg: Типографія Товарищества «Общественная Польза», 1863)',
                    url: 'https://archive.org/details/20200408_20200408_1154',
                    note: 'For the indices themselves, in which the Громникъ is listed with the Колядникъ, the Волховникъ, the Птичникъ, the Сносудецъ and the Мысленикъ. The imprint is St Petersburg; only the second volume is Moscow. The list of prohibitions is often the only evidence that a given handbook was circulating at a given date.',
                },
            ],
        },
        {
            slug: 'fiziolog',
            native: 'Физиолог',
            translit: 'Fiziolog',
            english: 'The Physiologus',
            author: 'Anonymous. The Greek original bears no author\'s name; mediaeval copies variously invoke Basil, Epiphanius, Ambrose and others, all of them false.',
            date: 'The Greek original is of the second to fourth century and probably Alexandrian. The Slavonic translation was made from Greek, presumably in Bulgaria; the surviving Slavonic copies are late, and more than one Slavonic redaction is distinguished.',
            language: 'Church Slavonic, translated from Greek',
            volume: null,
            description: 'The book from which mediaeval Europe learned to read animals. Each chapter names a creature, describes a single arresting property of it, and then turns the property into doctrine: the pelican that revives its young with its own blood, the phoenix that burns and rises, the lion whose cubs are born dead and breathed into life on the third day, the unicorn that can be taken only in a virgin\'s lap, the panther whose breath is sweet, the siren and the onocentaur, the eagle that renews its youth at the sun. It passed from Greek into Latin, Syriac, Armenian, Ethiopic, Arabic and Slavonic, and out of the Latin into the whole bestiary tradition of the West; its Slavonic career supplied Balkan and Russian scribes, and after them icon-painters and carvers, with a stock of readable beasts. It is the counter-example to the rest of this shelf in one respect and its confirmation in another: the Physiologus is not a work preserved in Slavonic alone — it survives abundantly elsewhere — but the Slavonic branch has its own recensions and its own history, and is the least accessible of them all in print. The headword is the modern Russian citation form; we have verified no Slavonic manuscript heading for it and do not invent one.',
            incipit: null,
            contents: null,
            contentsNote: 'The Physiologus is a series of independent chapters, one to a creature, and no two branches of the tradition agree on how many there are or in what order they stand: the Greek recensions run from some thirty chapters to nearly fifty, and the Slavonic redactions differ again. To print a table of contents would be to print one manuscript\'s table and call it the book\'s. The Slavonic redactions were sorted out by A. Karneev in his Матеріалы и замѣтки по литературной исторіи Физіолога (St Petersburg, 1890), which we have not been able to find in any free digitisation.',
            editions: [
                {
                    label: 'Friedrich Lauchert, Geschichte des Physiologus (Strassburg: K. J. Trübner, 1889)',
                    url: 'https://archive.org/details/bub_gb_wvlfAAAAMAAJ',
                    note: 'The nineteenth century\'s standard history of the book and its versions, with the Greek text printed in an appendix; verified as Lauchert\'s 1889 Strassburg volume from Trübner. His treatment of the Slavonic branch is brief — a few pages against his long chapters on the Latin and German — but he places it, and he is the accessible starting point.',
                },
                {
                    label: 'J. B. Pitra, Spicilegium Solesmense, vol. III (Paris: Firmin Didot, 1855)',
                    url: 'https://archive.org/details/spicilegiumsoles03pitr',
                    note: 'Pitra prints the Greek Physiologus with a substantial commentary, and it is his edition that carried the text to most nineteenth-century readers. For the Greek behind the Slavonic, this is the volume. One caution about the catalogue: the Internet Archive dates all four volumes of the Spicilegium 1852, the year the set opened, so the record for this third volume will not match the 1855 date under which it is normally cited. The item is genuinely volume 3, and the publisher is Firmin Didot.',
                },
                {
                    label: 'On the Slavonic text itself, and why there is no link to it',
                    url: 'https://archive.org/details/bub_gb_wvlfAAAAMAAJ',
                    note: 'We have searched the Internet Archive for Karneev\'s 1890 edition of the Slavonic redactions, and for any other free scan of a Slavonic Physiologus, and found none: the Slavonic branch of this very widely diffused book is, oddly, the hardest of all to reach. The link repeats Lauchert rather than sending the reader somewhere that is not what it claims to be. A research library is the only route to the Slavonic.',
                },
            ],
        },
        {
            slug: 'aleksandrija',
            native: 'Александрия',
            translit: 'Aleksandrija',
            english: 'The Slavonic Alexander Romance',
            author: 'Anonymous, and pseudepigraphic at the root: the Greek original goes under the name of Callisthenes, Alexander\'s own historian, who cannot have written it. The Slavonic translators are unknown.',
            date: 'The Greek Pseudo-Callisthenes belongs to late antiquity. The chronographic Slavonic Alexandria travelled into Slavonic inside the translated Byzantine chronicles; the later Serbian Alexandria is of the fourteenth century and reached Rus\' in the fifteenth.',
            language: 'Church Slavonic, in Serbian and Russian recensions',
            volume: null,
            description: 'Alexander of Macedon as the Middle Ages preferred him: not the general but the wonder-seeker. The Slavonic tradition runs in two channels. The older, the so-called chronographic Alexandria, came in with the Slavonic versions of the Byzantine world-chronicles and passed thence into the Russian chronographs, where Alexander stands as one reign among many in the history of the world. The later and far more popular is the Serbian Alexandria, or Aleksandrida, a romance proper, which crossed from the South Slavs into Rus\' in the fifteenth century and was copied for three hundred years. Its Alexander is begotten by the exiled Egyptian magician Nectanebo, tames Bucephalus, conquers Darius and Porus, writes to his master Aristotle about the marvels of India, disputes with the naked philosophers of the Rachmani, passes into the land of darkness in search of the water of life, hears the speaking trees foretell his death, shuts Gog and Magog behind a wall, and dies of poison at Babylon far too young. It is the ancestor of nearly every later Slavonic notion of the wonders of the East. The headword is the modern citation form; Jagić\'s edition heads the text in Croatian, as the life of Alexander the Great.',
            incipit: null,
            contents: null,
            contentsNote: 'The Alexandria exists in several distinct Slavonic recensions which do not share a division of the text, and the chronographic version is not even a separate book but a stretch of a chronicle. Jagić\'s edition, made from the Rudnik manuscript collated with several others, prints the Serbian romance continuously. Rather than impose a chapter scheme that no branch of the tradition carries, we leave this null and describe the narrative in the entry above.',
            editions: [
                {
                    label: 'V. Jagić, \'Ogledi stare hrvatske proze IV: Život Aleksandra Velikoga\', in Starine, knjiga III (Zagreb: Jugoslavenska akademija znanosti i umjetnosti, 1871)',
                    url: 'https://archive.org/details/starine_knjiga_1_2_3_1869_1870_1871-jazu',
                    note: 'The Slavonic text of the Serbian Alexandria, edited by Jagić from the Rudnik manuscript and collated with several others, and prefaced by a long comparative essay on the Alexander literature of Greek, Czech and Slavonic. The Internet Archive item is verified as containing Starine I, II and III bound together, for 1869, 1870 and 1871; the Alexandria stands in the third, so the reader must page well in.',
                },
                {
                    label: 'Йор. Ивановъ, Богомилски книги и легенди (Sofia, 1925)',
                    url: 'https://archive.org/details/bogomilskiknigii0000ivan',
                    note: 'Not for Alexander, but for the company he kept: Ivanov prints the Slavonic apocryphal narratives that circulated in the same miscellanies and shows how freely such material moved between the Balkans and Rus\'. Useful for seeing the Alexandria as one item in a travelling repertory rather than as a book on its own.',
                },
                {
                    label: 'On the chronographic Alexandria',
                    url: 'https://archive.org/details/starine_knjiga_1_2_3_1869_1870_1871-jazu',
                    note: 'V. M. Istrin\'s Александрія русскихъ хронографовъ (Moscow, 1893) remains the study of the older, chronicle-borne version, and A. N. Veselovsky\'s work on the Greek and Byzantine romance stands behind Jagić\'s. We have found no verified free scan of either, and repeat the Jagić link rather than direct the reader to something that is not what it claims to be.',
                },
            ],
        },
        {
            slug: 'tajnaja-tajnyh',
            native: 'Тайная тайных',
            translit: 'Tajnaja tajnych',
            english: 'The Secret of Secrets, also known as the Gates of Aristotle (Аристотелевы врата) — the Slavonic Secretum secretorum',
            author: 'Pseudepigraphic. The work presents itself as Aristotle\'s private counsel to Alexander; behind it stands the Arabic Sirr al-asrar, and behind the Slavonic version, on Speranskij\'s argument, a Hebrew intermediary.',
            date: 'Translated in the fifteenth or the first half of the sixteenth century in the Rus\' lands. Speranskij places it no later than the middle of the sixteenth century, since Maksim Grek appears already to have it in view in his epistle to Fyodor Karpov; copies were still being made into the middle of the eighteenth.',
            language: 'Church Slavonic of the East Slavonic recension, translated from Hebrew',
            volume: null,
            description: 'The most famous secret book of Muscovy, and the only work on this shelf that arrived in Slavonic by way of Arabic and Hebrew rather than Greek. It is a letter of counsel from Aristotle to Alexander, divided into \'gates\' — врата — and it moves without embarrassment from the conduct of a king and the choosing of counsellors to physiognomy, the regimen of health, the seasons and their diets, the virtues of stones and herbs, astrology, and talismanic matter. Speranskij\'s study established the Hebrew intermediary and connected the translation with the milieu of the Novgorod and Muscovite \'Judaizers\', the circle around which so much learned foreign material entered Russian in that generation — a circle that was itself hunted, and whose name is a label given by prosecutors rather than one its members chose. It is exactly the kind of book that the Slavonic indices were written to stop. The Stoglav, the acts of the Muscovite council of 1551, names the Aristotelian gates in its seventeenth question among the evil heresies to be trodden out, in a list with the rafli, the shestokryl, the voronograi, the ostromii, the zodei, the almanac and the star-gazers\' books; and it was still being copied, quietly, two centuries later. As with the thunder-book, we describe its contents and set out none of its operative matter.',
            incipit: null,
            contents: null,
            contentsNote: 'The work is divided into врата, gates, but the number and the arrangement differ between copies, and the Russian text is not a simple translation of any one foreign exemplar: Speranskij prints it alongside the Arabic-Latin text and the older Czech translation precisely so that the divergences can be seen. Some manuscripts add matter from elsewhere — one Synodal copy has headings over its gates borrowed from the Alexandria. We give no scheme rather than a false one.',
            editions: [
                {
                    label: 'М. Сперанскій, Изъ исторіи отреченныхъ книгъ, IV: Аристотелевы врата или Тайная тайныхъ (St Petersburg, 1908)',
                    url: 'https://archive.org/details/4.-1908',
                    note: 'The edition and the study together: number CLXXI of the Памятники древней письменности и искусства. Speranskij surveys the Russian, Slavonic and Western literature, prints the Russian text with the older Czech translation of the Secreta secretorum beside it, traces the connection with the literature of the Judaizers, and follows the book\'s fortunes down to the eighteenth century. Everything solid that is known about the Slavonic Secretum begins here. The scan is a privately uploaded copy of the 1908 printing, not an institutional digitisation; the title and year are legible on it and match.',
                },
                {
                    label: 'М. Сперанскій, Изъ исторіи отреченныхъ книгъ, III: Лопаточникъ (St Petersburg, 1900)',
                    url: 'https://archive.org/details/3.-1900',
                    note: 'The third of the series, on scapulimancy — divination from the shoulder-blade. Worth having beside the fourth because it shows the same scholar\'s method on a humbler book, and because the Lopatochnik and the Aristotelian gates are named in the same prohibitions. Again a private upload of the 1900 printing.',
                },
                {
                    label: 'N. S. Tikhonravov, Памятники отреченной русской литературы, vol. I (St Petersburg: Типографія Товарищества «Общественная Польза», 1863)',
                    url: 'https://archive.org/details/20200408_20200408_1154',
                    note: 'For the indices in which the Aristotelian gates are condemned, and for the wider context of what Muscovite churchmen thought they were forbidding. The imprint is St Petersburg, corrected here. Tikhonravov\'s collation of the lists is still the way to see how the prohibitions grew.',
                },
            ],
        },
        {
            slug: 'gramoty-na-bereste',
            native: 'Новгородские грамоты на бересте',
            translit: 'Novgorodskie gramoty na bereste',
            english: 'The Novgorod Birch-Bark Letters',
            author: 'Some hundreds of named and unnamed individuals: merchants, peasants, priests, wives, stewards, debtors, a schoolboy. Almost none of them is otherwise known to history, and that is the point of them.',
            date: 'Eleventh to fifteenth centuries, dated by stratigraphy and dendrochronology. The first was found on 26 July 1951, in the Nerevsky excavation at Novgorod under A. V. Artsikhovsky.',
            language: 'The Old Novgorod dialect of Old East Slavic, with Church Slavonic in the liturgical and devotional pieces; a few letters in other languages',
            volume: null,
            description: 'A manuscript corpus of a wholly different kind, and the correction this shelf needs. Everything else here is a text preserved by copying — a chain of scribes, each of whom could and did alter what he received. The birch-bark letters were never copied at all. They were scratched with a stylus onto strips of bark, used, thrown away, and preserved by the waterlogged clay of the Novgorod soil exactly as written, so that we read the eleventh century\'s own hand and not a seventeenth century\'s memory of it. Well over a thousand have come from Novgorod, with further finds at Staraya Russa, Pskov, Smolensk, Torzhok, Vitebsk and elsewhere. Most are business: debts, inventories, instructions to stewards, complaints about a price. But among them are marriage proposals, a furious letter from a woman to the man who has wronged her, liturgical and devotional texts, alphabets and school exercises — the sheets of the boy Onfim, who wrote out his syllabary in the mid-thirteenth century and then drew himself as a horseman spearing an enemy — and a number of charms and protective prayers, which we note as a genre and do not transcribe. They also settled a long argument: they show that literacy in mediaeval Rus\' was not the property of monks, and that the language ordinary Novgorodians wrote was not the Church Slavonic of the books.',
            incipit: null,
            contents: null,
            contentsNote: 'There is no table of contents to a corpus of this kind. The letters are cited by find-place and running number, and the numbering grows with every excavation season; a list would be out of date before it was printed. The searchable catalogue linked below is the standard reference.',
            editions: [
                {
                    label: 'Древнерусские берестяные грамоты — the birch-bark letters database, gramoty.ru',
                    url: 'https://gramoty.ru/birchbark/',
                    note: 'The scholarly catalogue of the corpus, freely readable and confirmed live, giving for each letter its find-place, stratigraphic date, drawing, photograph, transcription and translation, with the linguistic commentary of the Zaliznyak school. This is a modern resource and not a public-domain publication; we link it because there is no honest alternative, and we say what it is.',
                },
                {
                    label: 'Browsable list of documents, gramoty.ru',
                    url: 'https://gramoty.ru/birchbark/document/list/',
                    note: 'The list view, for readers who want to move through the corpus rather than look up a single letter. The Onfim sheets and the charms are found here among the accounts and the debt-lists, which is how they were found in the ground.',
                },
                {
                    label: 'Why there is no printed edition linked here',
                    url: 'https://gramoty.ru/birchbark/',
                    note: 'This is the one corpus on the shelf for which no public-domain edition can exist: the first letter was not found until 1951, and every printed volume of the series Новгородскія грамоты на бересте, begun by Artsikhovsky, is within copyright, as is A. A. Zaliznyak\'s Древненовгородский диалект, the grammar that made the letters legible. We link the open database and say so plainly rather than direct the reader to an uploaded scan of a book still in copyright.',
                },
            ],
        },
        {
            slug: 'glagoliticheskie-evangelija',
            native: 'Зографское евангелие · Мариинское четвероевангелие',
            translit: 'Zografskoe evangelie · Mariinskoe četveroevangelie',
            english: 'The Codex Zographensis and the Codex Marianus',
            author: 'Anonymous scribes. The translation they transmit goes back to the mission of Constantine-Cyril and Methodius; the codices themselves name no one, though Jagić identified the Cyrillic annotator of the Zographensis as a presbyter John, and placed him at the end of the twelfth century.',
            date: 'End of the tenth or beginning of the eleventh century. The Zographensis was written in Bulgaria; Jagić placed the writing of the Marianus in Serbo-Croatian territory.',
            language: 'Old Church Slavonic, written in round Glagolitic — the older of the two Slavonic alphabets, whose first letters are ⰀⰁⰂⰃ, azъ, buky, vědě, glagoli',
            volume: null,
            description: 'The two great four-gospel books of the Old Church Slavonic canon, and the point at which this shelf touches bedrock: everything else here is written in the language these codices established. Both are Glagolitic, and Glagolitic is the alphabet Constantine-Cyril devised, older than the Cyrillic that displaced it and unlike any other script in Europe. The Zographensis has 304 leaves, the Gospels in Glagolitic on the first 288 and a Cyrillic synaxarion, later than the body of the book, on the last sixteen. Where the original quires covering Matthew 16:20 to 24:20 were lost, a younger Glagolitic hand supplied the gap: Jagić counted eighteen leaves in that supplement, of which the one containing Matthew 17:6–23 has since itself fallen out, leaving seventeen, and he calculated that the original stretch had run to twenty-four. The supplement is easy to tell apart — thick, rough parchment bearing the traces of erased Glagolitic beneath, and crude angular letters cut by an unpractised hand with a blunt stylus. The codex was kept at the Zograf monastery on Athos, latterly chained, until the monastery presented it to Alexander II in 1860; it is now in St Petersburg. The Marianus was found by Viktor Grigorovich on his journey through Athos and the Balkans in 1844–45, at the Athonite skete of the Most Holy Mother of God; he had been directed there by Antun Mihanović, whom he had met at Salonica, and the codex\'s first leaves had been detached before he saw it and went their own way through Mihanović\'s hands. The body of the codex passed to the Moscow Public and Rumyantsev Museum. Neither book preserves its opening: the Zographensis begins at Matthew 3:11 and the Marianus at Matthew 5:23. To read either in print is to read Jagić, who transcribed both out of Glagolitic into Cyrillic characters for his editions — so that most students meet these Glagolitic books in Cyrillic dress, a fact worth knowing before one cites them.',
            incipit: {
                native: 'іскони бѣаше слово',
                english: 'In the beginning was the Word',
                note: 'John 1:1, checked letter by letter against the text of Jagić\'s 1879 edition of the Codex Zographensis, where it stands at the head of the fourth Gospel. Two things are corrected from our earlier reading. The initial word is іскони, with the decimal i that Jagić uses throughout to render the Glagolitic letter, not the modern и we had printed. The reading бѣаше, which we had asserted without support, is confirmed on the page; other witnesses of the Slavonic gospel read бѣ, and Jagić\'s own text has бѣ two verses later. Three cautions remain. This is not the incipit of the codex: neither manuscript keeps its first leaves, and the Zographensis begins in the middle of Matthew 3. The manuscript is written in Glagolitic, and the Cyrillic here is the editor\'s transposition, as his title-page states — characteribus cyrillicis transcriptum. And the divine names in the continuation of the verse stand contracted under a titlo in the manuscript, as nomina sacra, and are expanded in printed editions.',
            },
            contents: [
                {
                    heading: 'Evangelium secundum Matthaeum',
                    english: 'Matthew. In the Zographensis the text begins at 3:11, the earlier leaves being lost — Jagić\'s running head over his first page of text reads Matth. III. 11. In the Marianus it begins at 5:23, and Jagić supplied chapters 1 to 5:23 from a Dečani manuscript, a Bulgarian-Slavonic four-gospel book of the thirteenth century.',
                },
                {
                    heading: 'Evangelium secundum Marcum',
                    english: 'Mark, complete in both codices, preceded in the Marianus by a list of the Gospel\'s chapters.',
                },
                {
                    heading: 'Evangelium secundum Lucam',
                    english: 'Luke, preceded in both by a summary of chapters; in the Zographensis this summary occupies the leaves between the end of Mark and the beginning of Luke, which is why Jagić\'s pagination jumps at that point.',
                },
                {
                    heading: 'Evangelium secundum Joannem',
                    english: 'John, preceded in the Marianus by its own chapter-list. Complete in the Zographensis; in the Marianus, 1:1–23, 18:13–29 and 21:17–25 are lacking and were supplied by Jagić from the Zographensis — the three supplements are itemised as such in his table of contents.',
                },
                {
                    heading: 'The Cyrillic synaxarion (Zographensis only)',
                    english: 'The calendar of Gospel readings, added on the final sixteen leaves in Cyrillic, not Glagolitic, and later than the body of the codex; Jagić connected the Cyrillic hand and its marginal rubrics with a presbyter John, who he argues lived at the end of the twelfth century, and held those additions to be very much later than the Glagolitic text.',
                },
            ],
            contentsNote: 'These are the genuine divisions of the books — they are gospel-books, and the four evangelists in order are their contents. What is worth noticing is the pattern of what is missing: both codices have lost leaves at the beginning, the Marianus in the middle and at the end as well, and both editions are therefore composite objects in which one manuscript\'s gaps are filled from another\'s text — the Marianus from a Dečani codex at the start and from the Zographensis in John. Jagić marks every such supplement in his contents list, which is a small model of editorial honesty, and the details above are taken from that list rather than from secondary report.',
            editions: [
                {
                    label: 'V. Jagić (ed.), Quattuor evangeliorum codex glagoliticus olim Zographensis nunc Petropolitanus (Berlin: Weidmann, 1879)',
                    url: 'https://archive.org/details/quattuorevangeli00jagiuoft',
                    note: 'The Zographensis, transcribed into Cyrillic characters with critical notes, long prolegomena, appendices and plates of the Glagolitic script; verified as the 1879 Weidmann printing, the text in Church Slavonic with preface and footnotes in Latin. The prolegomena settle the codex\'s history: written in Bulgaria at the end of the tenth or beginning of the eleventh century, augmented with Cyrillic additions by the presbyter John, kept at the Zograf monastery on Athos, presented in 1860 to Alexander II, and now at St Petersburg. This is also the volume against which the incipit above was checked.',
                },
                {
                    label: 'V. Jagić (ed.), Quattuor evangeliorum versionis palaeoslovenicae codex Marianus glagoliticus (Berlin: Weidmann, 1883)',
                    url: 'https://archive.org/details/quattuorevangel00unkngoog',
                    note: 'The companion volume, the Marianus, again in Cyrillic transcription; verified as the 1883 Berlin printing. Its contents list is exemplary in stating exactly which passages are supplied from elsewhere and from what. We separate this from the St Petersburg issue below, having earlier run the two imprints together in one line: they are two title-pages of the same edition, not a joint publication.',
                },
                {
                    label: 'Мариинское четвероевангеліе съ примѣчаніями и приложеніями, ed. V. Jagić (St Petersburg: типографія Императорской академіи наукъ, 1883)',
                    url: 'https://archive.org/details/mariinskoechetve00jagi',
                    note: 'The same edition under its Russian title-page, issued by the Division of Russian Language and Letters of the Imperial Academy of Sciences and headed \'a monument of Glagolitic writing\'. It carries Jagić\'s introduction — the account of Grigorovich, Mihanović and the skete of the Mother of God comes from here — his notes on the palaeography and grammar, and a full word-index which makes the volume a lexicon of Old Church Slavonic as well as an edition.',
                },
                {
                    label: 'Codex Zographensis: facsimile images of the manuscript',
                    url: 'https://archive.org/details/codex-zographensis',
                    note: 'Images of the codex itself, leaf by leaf: the round Glagolitic of the older hand, the different and cruder hand of the replacement quires, and the Cyrillic of the synaxarion at the end. Anyone who has only read Jagić\'s transcription should spend ten minutes here. Two honest qualifications. This is not a printed edition and carries no imprint at all — it is a copy of the Russian National Library\'s own digitisation, uploaded to the Internet Archive by a private individual under a public-domain mark, and the catalogue dates the item to the manuscript, about the year 1000, rather than to any publication. And the machine-generated text attached to the scan is meaningless, being an attempt to read Glagolitic manuscript photography as printed Cyrillic; ignore it and look at the pictures.',
                },
                {
                    label: 'Іван Огієнко (Іларіон), Історія церковнослов\'янської мови: Пам\'ятки старослов\'янські X–XI віків (Warsaw, 1929)',
                    url: 'https://archive.org/details/ogiienkoPamyatki',
                    note: 'Ohienko\'s description of both codices in Ukrainian, monument by monument: the Zograf monastery, the chain, Mihanović and Grigorovich, the presentation to Alexander II in 1860, the quire structure of the Marianus and the fate of its detached leaves. Verified as the 1929 publication. The best free narrative account of how these books came out of Athos and into the libraries.',
                },
            ],
        },
    ],
};
