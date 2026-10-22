// The emblems that stand in the heroes of the portal pages, keyed by page:
// 'christianities', 'powers', and 'powers/<section>'. Each is an original
// composition made for its page from named traditional motifs, and its
// caption says so on its face: these are not historical objects, and the
// site's rule that a drawing say what it was drawn from applies to them as it
// does to the Rosicrucian signs (validate-christianities.mjs checks both).
// Each SVG's own comment records its motifs and sources in full.
//
// A page with no entry here renders its hero exactly as before.

const EMBLEMS = {
    christianities: {
        image: 'emblems/christianities.svg',
        alt: 'A gold roundel: from one bright point in a small banded segment of heaven at the top, twelve thin rays fan down to twelve identical gold flames standing in a horseshoe, each leaning toward the source.',
        caption: 'Made for this page, not copied from any church’s badge: the ‘cloven tongues like as of fire’ of Pentecost (Acts 2:3), twelve as in the Byzantine icon and each one whole, sent down from one point in its banded heaven — a feast every ancient communion keeps.',
    },
    powers: {
        image: 'emblems/powers.svg',
        alt: 'A gold roundel: at the centre a large eight-rayed star; above it a pair of spread wings sending a ray down, below it a matching pair carrying a flame up; small stars on either side, all within a double ring.',
        caption: 'Made for this page, not a historical object: the archaic Sumerian sign AN, written before the gods’ names and repeated small for the many gods, between two winged messengers — one letting a ray down, one carrying a flame up, as Diotima’s daimonic carries between gods and men (Symposium 202e).',
    },
    'powers/hierarchies': {
        image: 'emblems/hierarchies.svg',
        alt: 'A gold roundel: a point of light at the centre, then three bright rings, then two bands of small gold haloes in rows, the outer band larger and more crowded, all within a fine hairline.',
        caption: 'Made for this page: the nine choirs of Dionysius in three triads around a point of light, the Seraphim nearest and brightest as Dante sees them (Paradiso xxviii), the lower six drawn as ranks of gold haloes, more numerous outward, to a hairline where the world begins.',
    },
    'powers/host': {
        image: 'emblems/host.svg',
        alt: 'Gold emblem in a fine ring lined with small beads: four identical pairs of spread wings, top, bottom, left and right, surround a pale wheel set with eight eyes, a smaller wheel and a bright star, with faint light between the wings.',
        caption: 'Made for this page: four pairs of wings for the four presences of 1 Enoch 40, which traditions name differently, about a burning wheel rimmed with eyes (Ezekiel 1, Daniel 7), light at its heart, in a ring of beads for the countless host.',
    },
    'powers/pantheons': {
        image: 'emblems/pantheons.svg',
        alt: 'A gold roundel in a double ring: two stems, one pale and one deep gold, rise from three wavy lines of water, cross at a soft glow and branch through round knots to eight eight-rayed stars, the top two largest; faint beads circle the rim.',
        caption: 'Made for this page: two stems, pale and deep, rise from the first waters, cross at a hearth and branch like a family into eight stars, the sign AN, for the Table of Correspondences’ eight offices, largest where a couple heads the house.',
    },
    'powers/daimons': {
        image: 'emblems/daimons.svg',
        alt: 'A gold roundel in a fine double ring: a pale cord descending from the top and a deep gold cord rising from the bottom interlock in a reef knot at the centre, beneath an eight-rayed star and above a small flame.',
        caption: 'Made for this page: Diotima’s bond of the whole, drawn as a pale cord let down from heaven and a deep one raised from earth, tied in the knot of Herakles, with the sign AN for the gods above and a sacrificial flame below.',
    },
    'powers/texts': {
        image: 'emblems/texts.svg',
        alt: 'A gold roundel holding three equal fine-lined circles: above, a clay tablet pressed with rows of wedges; below left, an open scroll between two rolls; below right, an open book. A pale eight-rayed star clasps the centre where the circles nearly meet.',
        caption: 'Made for this page: a clay tablet pressed with cuneiform wedges, a book-roll open between its two rolls and an open codex, three bodies these works have taken, set as equals and clasped by the archaic sign AN, written before gods’ names.',
    },
    'powers/map': {
        image: 'emblems/map.svg',
        alt: 'A gold roundel in a double ring: a compass rose, its four cardinal points a little longer than the four diagonals, with short half-wind points between and an eight-rayed star at centre, ringed by eight such stars joined by fine lines, the northern larger.',
        caption: 'Made for this page: a portolan wind rose amid eight stars drawn as the cuneiform sign AN, for places from Uruk to Teotihuacan, Delphi to Ise, joined by rhumb lines; the larger north star is the Pole Star, with which the Catalan Atlas marks north.',
    },
};

export default EMBLEMS;
