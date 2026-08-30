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
        blurb: 'How the traditions ordered the unseen: the nine choirs of '
            + 'Dionysius, Maimonides’ ten ranks, the Amesha Spentas, the '
            + 'archons and aeons — every ladder set out with its rungs.',
    },
    {
        slug: 'host', title: 'The Host', kicker: 'The Named Ones',
        blurb: 'Michael and Gabriel, Metatron and Raziel, Iblis and Azazel, '
            + 'Sophia and the daimon of Socrates — the beings themselves, '
            + 'each in its own tradition’s words.',
    },
    {
        slug: 'pantheons', title: 'The Pantheons', kicker: 'The Families of the Gods',
        blurb: 'Sumer to Yorubaland, Olympus to the kami — the great '
            + 'families, their members, and the table of correspondences '
            + 'that lets one walk between them.',
    },
    {
        slug: 'daimons', title: 'The Daimons', kicker: 'The Beings Between',
        blurb: 'The daimon before it was a demon: Hesiod’s watchers, '
            + 'Socrates’ inner voice, the jinn, the daeva inversion, and '
            + 'how the middle spirits were pushed down the ladder.',
    },
    {
        slug: 'texts', title: 'The Texts', kicker: 'Where It Is Written',
        blurb: 'The Book of the Watchers to the Celestial Hierarchy, the '
            + 'Enuma Elish to the Kojiki — the primary works, what each '
            + 'one carries, and where to read it.',
    },
    {
        slug: 'map', title: 'The Map', kicker: 'Where They Were Named',
        blurb: 'An interactive map of the cults and visions: Uruk and '
            + 'Heliopolis, Delphi and Dodona, Qumran’s angelic liturgy, '
            + 'Ise and Teotihuacan — from the first named gods to the last '
            + 'angelic grimoires.',
    },
];

export const SECTION_BY_SLUG = Object.fromEntries(SECTIONS.map((s) => [s.slug, s]));
