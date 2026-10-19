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
};

export default EMBLEMS;
