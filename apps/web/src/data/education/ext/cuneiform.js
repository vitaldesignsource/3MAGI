// cuneiform hall extension — numbers and glossed first readings.
// Arithmetic recomputed and every citation checked by the content
// pipeline; scripts verified against unicodedata.
export default {
    numbers: {
        note: 'Mesopotamia counted by sixties, and did so positionally. The mature place-value notation is generally placed in the Ur III and Old Babylonian scribal schools, from around 2000 BC — though the earliest evidence is thinner than the textbooks imply, and the exact moment of invention is argued. A numeral was written with only two marks: the vertical wedge diš for one and the corner wedge (Winkelhaken) u for ten. Within a place these were simply repeated, up to fifty-nine; a fresh place began further to the left, each worth sixty times the one before. This is true place-value notation, and it is the first in the world, by a margin of well over a millennium: Chinese rod numerals, also positional, belong to the later first millennium BC, and Indian decimal place-value writing is later still, coming into clear view only in the first millennium AD. Two absences make the system strange to modern eyes. The first is zero. For most of its life the notation had no sign for an empty place at all; the scribe left a gap, or trusted the reader. Only in the Late Babylonian period, chiefly in the astronomical tablets of the later first millennium BC, does a placeholder come into regular use — a small mark of two oblique wedges, taken over from the scribe\'s separation sign — and even then it stands between places and, save for a handful of disputed cases, not at the end, so that a number could still not be closed off. The second absence is the sexagesimal point. Nothing in the writing says where the units place falls. The single wedge 𒁹 may stand for 1, or 60, or 3600, or one-sixtieth; a numeral\'s absolute magnitude has to be inferred from the problem it belongs to. This is not a modern quibble but a real and famous difficulty of the tablets, and Assyriologists supply the missing point in their editions with a semicolon of their own devising, separating the further places by commas. It is worth adding that the place-value system was a calculator\'s tool rather than an accountant\'s: administrative documents went on using the older, non-positional number and metrological notations, with their distinct signs for sixty (geš₂), six hundred (geš-u), three thousand six hundred (šar₂) and thirty-six thousand (šar-u), while the two-wedge positional notation belonged to the mathematical and astronomical tablets, to the reciprocal tables, and to the scribe reckoning on a scratch surface.',
        digits: [
            {
                glyph: '𒁹',
                value: 1,
                name: 'diš — the vertical wedge, the unit of the place-value notation',
                unicodeName: 'CUNEIFORM SIGN DISH',
            },
            {
                glyph: '𒀸',
                value: 1,
                name: 'aš — the horizontal wedge, the older unit of the archaic and non-positional counting notations',
                unicodeName: 'CUNEIFORM SIGN ASH',
            },
            {
                glyph: '𒌋',
                value: 10,
                name: 'u — the corner wedge, the Winkelhaken, impressed with the tip of the stylus',
                unicodeName: 'CUNEIFORM SIGN U',
            },
            {
                glyph: '𒐕',
                value: 60,
                name: 'geš₂ — the great unit; in place-value writing sixty is instead written with the same wedge as one, moved a place to the left',
                unicodeName: 'CUNEIFORM NUMERIC SIGN ONE GESH2',
            },
            {
                glyph: '𒐞',
                value: 600,
                name: 'geš-u — ten sixties, the large wedge with its corner-wedge multiplier',
                unicodeName: 'CUNEIFORM NUMERIC SIGN ONE GESHU',
            },
            {
                glyph: '𒊹',
                value: 3600,
                name: 'šar₂ — sixty sixties; Unicode encodes no \'ONE SHAR2\' numeral, so the sign SHAR2 itself stands here. Its round form is often traced to the large circular impressions of the archaic accounting tokens, on a reconstruction that remains debated',
                unicodeName: 'CUNEIFORM SIGN SHAR2',
            },
            {
                glyph: '𒐬',
                value: 36000,
                name: 'šar-u — ten šar₂, the highest unit in common use; higher signs exist (šar₂-gal, 216,000) but are rare',
                unicodeName: 'CUNEIFORM NUMERIC SIGN ONE SHARU',
            },
            {
                glyph: '𒑲',
                value: 0,
                name: 'the empty place — the Late Babylonian placeholder, written with the two oblique wedges the scribes also used to separate; shown here with Unicode\'s diagonal colon, the nearest coded form, as no dedicated sign is encoded',
                unicodeName: 'CUNEIFORM PUNCTUATION SIGN DIAGONAL COLON',
            },
        ],
        examples: [
            {
                native: '𒌋𒌋𒁹𒁹𒁹',
                value: 23,
                note: 'Twenty-three: two corner wedges (20) and three vertical wedges (3), read simply by addition. Within a single place the notation is not positional at all but cumulative, exactly as Roman numerals are — the arrangement of the wedges into neat groups is a scribal convenience for the eye.',
            },
            {
                native: '𒐐𒐎',
                value: 59,
                note: 'Fifty-nine — five tens and nine units — the largest quantity a single sexagesimal place can hold. One more, and the scribe must open a new place to the left.',
            },
            {
                native: '𒁹 𒌋𒌋𒌋',
                value: 90,
                note: 'Written 1,30 in the modern convention that separates places by commas: one sixty and thirty, that is 1 × 60 + 30 = 90. The gap between the wedge and the three corner wedges is the whole of the notation\'s machinery — there is no sign for \'times sixty\', only position.',
            },
            {
                native: '𒁹 𒁹',
                value: 61,
                note: 'Two vertical wedges with a space between them: 1,1, that is 1 × 60 + 1 = 61. Without the space they would read two. And even with it, nothing on the tablet forbids the readings 1;1 (one and a sixtieth) or 1,0,0 (one × 3600). The value is settled by the problem, never by the writing.',
            },
            {
                native: '𒁹 𒌋𒌋𒐉 𒐐𒁹 𒌋',
                value: 1.414212962962963,
                note: 'The number 1;24,51,10 inscribed on YBC 7289, a small Old Babylonian round hand-tablet in the Yale Babylonian Collection. It is written along the diagonal of a drawn square, and it is the square root of two given to three sexagesimal places: 1 + 24/60 + 51/3600 + 10/216000 = 1.41421296…. The true value is 1.41421356…, so the tablet falls short by about 0.0000006 — six parts in ten million of a unit, or four parts in ten million of the value. It is therefore exact to five decimal places (1.41421), and among the most accurate approximations of √2 to survive from antiquity; the same three-place value was still in use in Greek astronomy. Beneath it the tablet gives the diagonal of a square of side 30 as 42;25,35, which is exactly 30 × 1;24,51,10 = 42.4263889, against the true 42.4264069.',
            },
            {
                native: '𒁹 𒐐𒐎',
                value: 119,
                note: 'The number 1,59 — that is 1 × 60 + 59 = 119 — standing in the second column of the first row of Plimpton 322, the Old Babylonian tablet in the George A. Plimpton Collection at Columbia, generally assigned to Larsa around 1800 BC. Its fifteen rows tabulate quantities belonging to Pythagorean triples; beside 1,59 stands 2,49, which is 2 × 60 + 49 = 169, and the pair is the short side and the diagonal of a right triangle whose remaining side is 120 — for 119² + 120² = 14161 + 14400 = 28561 = 169². Whether the tablet is a trigonometric table, a teacher\'s list of exercises generated from reciprocal pairs, or something else again is still argued.',
            },
        ],
        special: 'Why sixty? Not, as an old story had it, because the year has three hundred and sixty days, nor because two peoples with different bases met and compromised. The origin is not settled — some accounts derive the base from the ratios between existing units of weight and capacity — but the most durable explanation is arithmetical convenience of a very practical kind. Sixty has twelve divisors — 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 and 60 — against ten\'s meagre four; it is the smallest number divisible by each of one through six. In a system without fractions as we write them, division was performed by multiplying by a tabulated reciprocal, and only \'regular\' numbers, whose prime factors are those of the base, have reciprocals that terminate. With sixty, halves, thirds, quarters, fifths, sixths, tenths, twelfths, fifteenths, twentieths and thirtieths all come out clean. Seven does not, and the scribes said so plainly: the standard Old Babylonian reciprocal table records that seven has no reciprocal. The base outlived the tablets. Greek astronomers took sexagesimal fractions from Babylon; Ptolemy reckons in them throughout the Almagest; from Greek into Arabic and from Arabic into Latin they came down to us with their names intact, the first small part and the second small part — pars minuta prima, pars minuta secunda — which are our minute and our second. Every clock face, every ship\'s bearing, every circle divided into three hundred and sixty degrees, which is six sixties, still keeps the reckoning of the Old Babylonian scribal school.',
    },
    readings: [
        {
            title: 'When on high — the opening of Enūma eliš',
            source: 'Enūma eliš (the Babylonian Epic of Creation), Tablet I, line 1: e-nu-ma e-liš la na-bu-ú šá-ma-mu. Standard Babylonian; the principal manuscripts are Neo-Assyrian tablets from Nineveh and Aššur, with Late Babylonian copies from Babylon, Kish, Sippar and Uruk. Edited by W. G. Lambert, Babylonian Creation Myths (2013).',
            words: [
                {
                    native: 'enūma',
                    translit: 'enuma',
                    gloss: 'when, at the time that — the epic is named from this first word, as Genesis is called Bereshit',
                },
                {
                    native: 'eliš',
                    translit: 'elish',
                    gloss: 'above, on high — the adverb in -iš formed to elû, \'upper\'',
                },
                {
                    native: 'lā',
                    translit: 'la',
                    gloss: 'not — the negative used with the stative and in subordinate clauses',
                },
                {
                    native: 'nabû',
                    translit: 'nabu',
                    gloss: 'were named, had been called — third person plural stative of nabû, \'to name, to call\'',
                },
                {
                    native: 'šamāmū',
                    translit: 'shamamu',
                    gloss: 'the heavens — a poetic byform beside the commoner šamû',
                },
            ],
            translation: 'When on high the heavens had not been named —',
            note: 'The words are given here in scholarly transliteration rather than in cuneiform, since the sign-spellings differ from manuscript to manuscript and the hall will not print a sign it cannot vouch for. The line\'s force lies in its negative: the poem opens before naming. That to be named is to exist is the reading usually drawn from the couplet, and it is an interpretation rather than something the grammar states; Lambert renders the line simply \'When the heavens above did not exist\'. The second line completes the pair — šapliš ammatum šuma lā zakrat, below, the ground had not been called by name — and the whole first tablet proceeds by such pairings of above and below. The epic was recited during the akītu festival at Babylon; a text of the highest liturgical seriousness, and the ancestor of a good deal of later cosmogony.',
            grid: null,
        },
        {
            title: 'He who saw the Deep — the opening of Gilgameš',
            source: 'The Standard Babylonian Epic of Gilgameš, Tablet I, line 1. Reconstructed chiefly from Neo-Assyrian manuscripts from Nineveh with Late Babylonian witnesses; edited by A. R. George, The Babylonian Gilgamesh Epic: Introduction, Critical Edition and Cuneiform Texts (2003).',
            words: [
                {
                    native: 'ša',
                    translit: 'sha',
                    gloss: 'he who, the one who — the relative pronoun, opening the poem without naming its subject',
                },
                {
                    native: 'nagba',
                    translit: 'nagba',
                    gloss: 'the Deep (accusative) — nagbu, the subterranean water, the source; the sense \'the totality, everything\' is equally defensible and is preferred by some. Normalised nagba by George; the spelling naqba is also current',
                },
                {
                    native: 'īmuru',
                    translit: 'imuru',
                    gloss: 'he saw — preterite of amāru, \'to see\'; in the subordinate clause it takes the final -u',
                },
                {
                    native: 'išdī',
                    translit: 'ishdi',
                    gloss: 'the foundations of — construct plural of išdu, \'base, foundation\'. The signs are damaged at this point and the word is a restoration, though a widely accepted one',
                },
                {
                    native: 'māti',
                    translit: 'mati',
                    gloss: 'of the land, of the country — genitive of mātu',
                },
            ],
            translation: 'He who saw the Deep, the foundations of the land —',
            note: 'Given in transliteration; the cuneiform spellings vary between the surviving manuscripts and the line is broken at išdī, so nothing is reconstructed here in script. George translates \'He who saw the Deep, the country\'s foundation\'. The line is the incipit of the twelve-tablet recension attributed by the ancient catalogue of texts and authors to the exorcist Sîn-lēqi-unninni — the poem proper closing with Tablet XI, Tablet XII being an appended translation of a Sumerian composition — and by these first words the epic was catalogued and shelved. The ambiguity of nagba is genuine and unresolved: either the hero saw the abyssal waters at the world\'s root, or he saw everything there is; and the epic, which sends him to the edge of the world and back, can bear either sense.',
            grid: null,
        },
        {
            title: 'I call upon you, gods of the night — the opening of Maqlû',
            source: 'Maqlû (\'Burning\'), Tablet I, line 1: ÉN al-si-ku-nu-ši DINGIR.MEŠ mu-ši-ti. An Akkadian anti-witchcraft series of eight tablets of incantations together with a ritual tablet, known chiefly from first-millennium Assyrian and Babylonian manuscripts; edited by T. Abusch, The Magical Ceremony Maqlû: A Critical Edition (2016).',
            words: [
                {
                    native: 'alsīkunūši',
                    translit: 'alsikunushi',
                    gloss: 'I call upon you (plural) — alsi, preterite of šasû, \'to cry out, to call\', used performatively and so rendered as a present, with the suffix -kunūši, \'to you\'',
                },
                {
                    native: 'ilī',
                    translit: 'ili',
                    gloss: 'gods — plural of ilu. The manuscripts write the logogram DINGIR.MEŠ, so the case vowel is the editor\'s: ilī and ilū are both met with in print',
                },
                {
                    native: 'mušīti',
                    translit: 'mushiti',
                    gloss: 'of the night — genitive of mušītu, \'night\', the night here personified and addressed',
                },
            ],
            translation: 'I call upon you, gods of the night.',
            note: 'In transliteration; the sign-spellings differ across the manuscripts and the divine plural is written logographically. Abusch\'s reconstruction of the series showed it to be a single ceremony performed through one night and the following morning at the end of the month Abu, in high summer; its first words summon the astral powers who preside over that night as a court before which a case is to be heard. The second line goes on to call the night herself, veiled like a bride. The text is described here as a historical document: its words are recorded, not offered as a procedure.',
            grid: null,
        },
        {
            title: 'On the day when destinies were determined — Gudea',
            source: 'Gudea, Cylinder A, column i, line 1. Sumerian; the two great inscribed clay cylinders were found at Girsu (Telloh) and belong to the reign of Gudea of Lagaš, c. 2100 BC. ETCSL 2.1.7; RIME 3/1.1.7 CylA.',
            words: [
                {
                    native: '𒌓',
                    translit: 'u₄',
                    gloss: 'day, when — the sign UD, \'sun, day\'; here opening a temporal clause, \'on the day that…\'',
                },
                {
                    native: '𒀭𒆠𒀀',
                    translit: 'an-ki-a',
                    gloss: 'in heaven and earth — AN \'heaven\' and KI \'earth\', the merism for the whole cosmos, with the locative -a. The two signs are damaged on the cylinder but legible',
                },
                {
                    native: '𒉆',
                    translit: 'nam',
                    gloss: 'destiny, fate — the element that elsewhere forms abstract nouns, standing here as a noun in its own right',
                },
                {
                    native: 'tar-ra-da / tar-re-da',
                    translit: 'tar-ra-da / tar-re-da',
                    gloss: 'were determined — tar, \'to cut\'; nam tar, \'to cut a destiny\', is the standard Sumerian idiom for the decreeing of fate. Given in transliteration only: the end of the line is broken and editors restore it differently — tar-ra-da, tar-re-da, and the reduplicated tar-tar-re-da are all in print',
                },
            ],
            translation: 'On the day when in heaven and earth destinies were determined —',
            note: 'Cuneiform is printed here only for the signs actually read on the cylinder; the verb\'s ending is a restoration and is therefore left in transliteration, since editions disagree and the hall will not print a sign it cannot vouch for. The -da is generally taken as the prospective or imperfective -ed-a, which is why some renderings give \'were being determined\' and others \'had been decided\'. Cylinders A and B together carry the longest surviving Sumerian literary composition: an account of the building of the Eninnu, the temple of Ningirsu, set in motion by a dream. The idiom nam tar, to cut or determine a destiny, is the ordinary Sumerian way of speaking of what the gods do in assembly, and it recurs throughout the temple hymns.',
            grid: null,
        },
        {
            title: 'Nothing is precious — from the Instructions of Šuruppak',
            source: 'The Instructions of Šuruppak, line 242: niĝ₂-nam nu-kal zi ku₇-ku₇-dam (the CDLI composite reads ku₇-ku₇-da). Sumerian wisdom literature; ETCSL 5.6.1. Known chiefly from Old Babylonian school tablets, many from Nippur, with much older Early Dynastic versions from Abu Salabikh and Adab. Edited by B. Alster, The Instructions of Suruppak (1974) and Wisdom of Ancient Sumer (2005).',
            words: [
                {
                    native: 'níĝ-nam',
                    translit: 'nig-nam',
                    gloss: 'anything at all, whatever there is — an indefinite compounded from níĝ, \'thing\'',
                },
                {
                    native: 'nu-kal',
                    translit: 'nu-kal',
                    gloss: 'is not precious, is not to be valued — the negative nu- with kal, \'to be valuable, costly, rare\'',
                },
                {
                    native: 'zi',
                    translit: 'zi',
                    gloss: 'life, breath — Sumerian zi, \'breath, life\'; the throat-and-breathing sense belongs properly to the compound zi-pa-áĝ, and the Akkadian equivalent napištu likewise joins \'throat\' and \'life\'',
                },
                {
                    native: 'ku₇-ku₇-dam',
                    translit: 'ku-ku-dam',
                    gloss: 'is to be sweet — the reduplicated stem ku₇, \'to be sweet\', with the -dam of obligation or propriety; some manuscripts and the CDLI composite give ku₇-ku₇-da',
                },
            ],
            translation: 'Nothing at all is precious; but life should be sweet.',
            note: 'In transliteration; the sign-spellings of the school tablets are not reproduced here. The line is often quoted as a Sumerian proverb, and the Instructions were indeed edited by Alster under the subtitle \'A Sumerian Proverb Collection\', but it belongs to the Instructions of Šuruppak and not to the numbered proverb collections proper. Copied out by pupils in the edubba, the tablet house, as an exercise, the composition preserves a register quite unlike the hymns — dry, worldly, often funny — and its Early Dynastic forerunners make it one of the oldest works of literature to survive anywhere. This line\'s two halves turn on each other: the first denies value to things, the second grants it to the fact of breathing.',
            grid: null,
        },
        {
            title: 'For his life he dedicated it — the votive formula',
            source: 'The standard closing formula of Sumerian votive dedications, recurring on very many inscribed objects — statues, mace-heads, vessels, foundation figures — from the Early Dynastic period through Ur III and into the Old Babylonian; see the royal and private dedications collected in D. Frayne, The Royal Inscriptions of Mesopotamia, Early Periods 3/2 (Ur III) and 4 (Old Babylonian).',
            words: [
                {
                    native: '𒉆𒋾𒆷𒉌𒂠',
                    translit: 'nam-ti-la-ni-šè',
                    gloss: 'for the sake of his life — nam-ti(l), \'life\', with the possessive -ani, \'his\', and the terminative -šè, \'towards, for\'',
                },
                {
                    native: '𒀀',
                    translit: 'a',
                    gloss: 'the dedicated thing, taken with the verb below in the fixed idiom a … ru, \'to dedicate\'',
                },
                {
                    native: '𒈬𒈾𒊒',
                    translit: 'mu-na-ru',
                    gloss: 'he dedicated it to him or her — the verb ru with the ventive mu- and the dative -na-, which is animate but not marked for gender, pointing back to the deity named at the head of the inscription',
                },
            ],
            translation: 'For the sake of his life, he dedicated (this) to him or her.',
            note: 'This is a formula rather than a single composition: the lines that close a dedication once the god, the donor and the object have been named. The awkward \'him or her\' in the rendering is faithful — the Sumerian dative -na- does not distinguish gender, and the deity\'s identity is supplied by the opening of the inscription, not by this clause. Cuneiform is given here because these spellings are standard and abundantly attested undamaged, each sign verified against its Unicode name. Learning the formula is the quickest way into a museum case, since the same words stand at the foot of an enormous number of inscribed objects, and once the eye finds nam-ti-la-ni-šè it can usually work backwards to the donor\'s name. Recorded here as an ancient scribal convention.',
            grid: null,
        },
    ],
    correspondences: null,
};
