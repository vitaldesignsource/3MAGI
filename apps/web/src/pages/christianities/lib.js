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
      blurb: 'Every major answer the centuries gave — Ebionite to Chalcedonian, Arian to kenotic — each stated as its holders stated it, with the scripture each side carried into the argument.' },
    { slug: 'branches', title: 'The Branches', kicker: 'One Family, Many Houses',
      blurb: 'From the first communities to the newest movements: the churches, schools and sects, each with its own name for itself, its lineage, and what became of it.' },
    { slug: 'councils', title: 'The Councils and the Arguments', kicker: 'Where It Was Decided',
      blurb: 'Jerusalem to Vatican II — what question each council faced, what it decided, who refused, and which church exists today because of that refusal.' },
    { slug: 'canon', title: 'The Making of the Bibles', kicker: 'What Is In, and According to Whom',
      blurb: 'There is no single Bible; there are Bibles. The criteria, the lists, the councils and the printers — and a table of every book against every canon.' },
    { slug: 'figures', title: 'The Figures', kicker: 'Fathers, Mothers, Heresiarchs, Reformers',
      blurb: 'The people the arguments happened through: apostles and apologists, desert mothers and doctors, the condemned and the canonized.' },
    { slug: 'symbols', title: 'The Symbolism', kicker: 'Signs of the Fish',
      blurb: 'Chi-Rho to khachkar: where each sign came from, what it meant, who used it — and how long the cross itself took to become an image anyone would draw.' },
    { slug: 'map', title: 'The Map', kicker: 'Where It Happened',
      blurb: 'An interactive map of the Christianities: councils and patriarchates, missions and martyrdoms, from the Cradle of the first millennium to the world.' },
];

export const SECTION_BY_SLUG = Object.fromEntries(SECTIONS.map((s) => [s.slug, s]));
