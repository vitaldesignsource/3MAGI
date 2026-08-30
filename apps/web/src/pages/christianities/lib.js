// Shared machinery for the Christianities portal.
//
// Every section's data is its own chunk, loaded when the section is entered —
// the lesson of the Scriptorium's 2.2MB page applied from day one here.

export const LOADERS = import.meta.glob('../../data/christianities/*.js');

export const loadData = async (name) => {
    const mod = LOADERS[`../../data/christianities/${name}.js`];
    return mod ? (await mod()).default : null;
};

export const SECTIONS = [
    { slug: 'christologies', title: 'The Understandings of Christ', kicker: 'Who Do You Say That I Am',
        heroEffect: 'censer',
        hero: '12cd99dadaf3915fa3b394824e83b0ad.webp',
        heroAlt: 'Christ enthroned on an icon screen, censed by clergy at the royal doors',
      blurb: 'Every major answer the centuries gave — Ebionite to Chalcedonian, Arian to kenotic — each stated as its holders stated it, with the scripture each side carried into the argument.' },
    { slug: 'branches', title: 'The Branches', kicker: 'One Family, Many Houses',
        heroEffect: 'trench',
        hero: '1d5ac948dc068719a0f6667f3b8b8679.webp',
        heroAlt: 'An Ethiopian procession with gilded crosses climbing the rock-cut trench at Lalibela',
      blurb: 'From the first communities to the newest movements: the churches, schools and sects, each with its own name for itself, its lineage, and what became of it.' },
    { slug: 'councils', title: 'The Councils and the Arguments', kicker: 'Where It Was Decided',
        heroEffect: 'incense',
        hero: '0157ef068dfa207b7e6e12c60ce4a597.webp',
        heroAlt: 'Two confessors standing before a seated Roman magistrate, an incense bowl between them',
      blurb: 'Jerusalem to Vatican II — what question each council faced, what it decided, who refused, and which church exists today because of that refusal.' },
    { slug: 'canon', title: 'The Making of the Bibles', kicker: 'What Is In, and According to Whom',
        heroEffect: 'press',
        hero: '0a5fc321c40a2bb3c0fe4a85dc82f795.webp',
        heroAlt: 'A sixteenth-century printing house pulling sheets from the press as townspeople carry off books',
      blurb: 'There is no single Bible; there are Bibles. The criteria, the lists, the councils and the printers — and a table of every book against every canon.' },
    { slug: 'figures', title: 'The Figures', kicker: 'Fathers, Mothers, Heresiarchs, Reformers',
        heroEffect: 'harbour',
        hero: 'b5dd6f7dc534e3b94cfdd403485c85b7.webp',
        heroAlt: 'A teacher with a scroll among students in a room of scroll shelves above the Alexandrian harbour',
      blurb: 'The people the arguments happened through: apostles and apologists, desert mothers and doctors, the condemned and the canonized.' },
    { slug: 'symbols', title: 'The Symbolism', kicker: 'Signs of the Fish',
        heroEffect: 'flicker',
        hero: '78596ff5b2f53470309a6504f91a34b7.webp',
        heroAlt: 'A painter working the Good Shepherd onto a catacomb wall by lamplight',
      blurb: 'Chi-Rho to khachkar: where each sign came from, what it meant, who used it — and how long the cross itself took to become an image anyone would draw.' },
    {
        slug: 'esoteric', title: 'The Inner Tradition', kicker: 'The Christianity Behind the Catechism',
        heroEffect: 'flicker',
        hero: '3c02c02618c631f0a11d10fd90b4c1f0.webp',
        heroAlt: 'A scholar in dark dress praying at a desk before a vine-grown window whose mullions form a cross with a red rose at the crossing, flasks and an armillary sphere beside him',
        blurb: 'Origen’s restoration of all things, the divine darkness of Dionysius, '
            + 'Eckhart’s ground of the soul, the Jesus Prayer, the Christian Cabala, '
            + 'Böhme, Swedenborg, Russian Sophia — the inner tradition, with what the '
            + 'churches actually ruled about each of them recorded beside it.',
    },
    { slug: 'map', title: 'The Map', kicker: 'Where It Happened',
        heroEffect: 'snow',
        hero: '1a1fcfb2cdfb76ef8852b7ffc361e837.webp',
        heroAlt: 'Monks in a snowbound mountain chapel handing bread to a traveller with pack horses',
      blurb: 'An interactive map of the Christianities: councils and patriarchates, missions and martyrdoms, from the Cradle of the first millennium to the world.' },
];

export const SECTION_BY_SLUG = Object.fromEntries(SECTIONS.map((s) => [s.slug, s]));
