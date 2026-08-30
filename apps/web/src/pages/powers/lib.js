// The Powers — shared plumbing. Same discipline as the Christianities lib:
// every dataset its own lazily-loaded module, absent files resolve to null,
// and the doors are declared once.

export const LOADERS = import.meta.glob('../../data/powers/*.js');

export const loadData = async (name) => {
    const mod = LOADERS[`../../data/powers/${name}.js`];
    return mod ? (await mod()).default : null;
};

export const SECTIONS = [
    {
        slug: 'hierarchies', title: 'The Hierarchies', kicker: 'Rank Upon Rank',
        heroEffect: 'oculus',
        hero: 'f88f1e7b776e8375d5e34cae7f088c5d.webp',
        heroAlt: 'A robed man at an altar beneath a towering wall of graded tiers, each rank carved with its own disc and countenance, light falling from the oculus above',
        blurb: 'How the traditions ordered the unseen: the nine choirs of '
            + 'Dionysius, Maimonides’ ten ranks, the Amesha Spentas, the '
            + 'archons and aeons — every ladder set out with its rungs.',
    },
    {
        slug: 'host', title: 'The Host', kicker: 'The Named Ones',
        heroEffect: 'depth',
        hero: '2d1903a5881088c7560e856a80983f5a.webp',
        heroAlt: 'An endless ranked host of winged figures filling a vast hall, light breaking through smoke above the far throne',
        blurb: 'Michael and Gabriel, Metatron and Raziel, Iblis and Azazel, '
            + 'Sophia and the daimon of Socrates — the beings themselves, '
            + 'each in its own tradition’s words.',
    },
    {
        slug: 'pantheons', title: 'The Pantheons', kicker: 'The Families of the Gods',
        heroEffect: 'gallery',
        hero: '1f42843b12866ffdf955cc3c8f8e851c.webp',
        heroAlt: 'A museum corridor of the gods: a seated Mesopotamian king, a falcon-headed relief, a draped Greek goddess, a crowned African queen',
        blurb: 'Sumer to Yorubaland, Olympus to the kami — the great '
            + 'families, their members, and the table of correspondences '
            + 'that lets one walk between them.',
    },
    {
        slug: 'daimons', title: 'The Daimons', kicker: 'The Beings Between',
        heroEffect: 'drift',
        hero: 'fbb3fbfe09076061ed01862a58c394e9.webp',
        heroAlt: 'A cloaked man among standing stones and bronze cauldrons in a misted grove, a second figure half-visible in the fog',
        blurb: 'The daimon before it was a demon: Hesiod’s watchers, '
            + 'Socrates’ inner voice, the jinn, the daeva inversion, and '
            + 'how the middle spirits were pushed down the ladder.',
    },
    {
        slug: 'texts', title: 'The Texts', kicker: 'Where It Is Written',
        heroEffect: 'lamp',
        hero: '9ad6bf37aaf6af0156ee6d451166ad5e.webp',
        heroAlt: 'Conservators at a dark table over cuneiform tablets, stitched codices, and an illuminated manuscript',
        blurb: 'The Book of the Watchers to the Celestial Hierarchy, the '
            + 'Enuma Elish to the Kojiki — the primary works, what each '
            + 'one carries, and where to read it.',
    },
    {
        slug: 'map', title: 'The Map', kicker: 'Where They Were Named',
        heroEffect: 'table',
        hero: 'cbd7ada725ec97c2d02e2bab099dec62.webp',
        heroAlt: 'A scholar with a lamp bent over a vast circular relief map table in a dark cabinet hall',
        blurb: 'An interactive map of the cults and visions: Uruk and '
            + 'Heliopolis, Delphi and Dodona, Qumran’s angelic liturgy, '
            + 'Ise and Teotihuacan — from the first named gods to the last '
            + 'angelic grimoires.',
    },
];

export const SECTION_BY_SLUG = Object.fromEntries(SECTIONS.map((s) => [s.slug, s]));
