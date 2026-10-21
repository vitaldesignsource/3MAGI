// Fixtures for the Magical Scriptorium's glyph and URL rules (magic-lib.mjs).
// validate-magic.mjs runs them before it reads a single module: every glyph
// and URL listed as bad must be refused, and every one listed as good must
// pass, so a rule cannot be loosened by accident without the build saying so.
// The bad glyphs are the ones a review found the earlier rules let through:
// each draws nothing, or makes the browser log an SVG error, or breaks the
// kit's rule that a stroke stops at the edge of its ring. The filled glyphs'
// cases hold the rules of the kit's "Filled glyphs" (magic-lib.mjs
// fillProblems): the commands, the closed subpaths, the 0–100 box, the ink
// inside the body box (curves' extrema included), a fill that draws something
// under evenodd, and fill alone.

const TRI = 'M 20 20 L 60 20 L 40 60 Z';

export const BAD_GLYPHS = [
    ['draws nothing: no path, no rings, no dots', { d: '', rings: [], dots: [] }],
    ['the path only moves the pen', { d: 'M 50 50', rings: [], dots: [] }],
    ['a moveto and a close draw nothing', { d: 'M 50 50 Z' }],
    ['a relative command', { d: 'M 10 10 l 20 20' }],
    ['an arc flag of 2', { d: 'M 20 20 A 10 10 0 2 1 50 50' }],
    ['an arc of radius 0', { d: 'M 20 20 A 0 10 0 0 1 50 50' }],
    ['a coordinate of 120', { d: 'M 10 10 L 120 20' }],
    ['a malformed number', { d: 'M 10 10 L 2- 20' }],
    ['a negative dot radius', { d: '', dots: [[50, 22, -6.5]] }],
    ['a dot of radius 300', { d: '', dots: [[50, 50, 300]] }],
    ['a dot whose disc leaves the box', { d: '', dots: [[97, 50, 6]] }],
    ['a dot given as an object', { d: '', dots: [{ x: 50, y: 50 }] }],
    ['a pen heavier than the house pen', { d: 'M 10 10 L 20 20', pen: 8 }],
    ['a pen given as a string', { d: 'M 10 10 L 20 20', pen: '2.4' }],
    ['a text pen heavier than the house pen', { d: 'M 10 10 L 20 20', pen: 1, textPen: 6 }],
    ['a text pen with no plaque pen', { d: 'M 10 10 L 20 20', textPen: 2 }],
    ['a plaque pen heavier than the text pen', { d: 'M 10 10 L 20 20', pen: 3, textPen: 2 }],
    ['text rings with no text pen', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], textRings: [[51.8, 50, 3]] }],
    ['text rings that do not match the traced rings', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5, textRings: [] }],
    ['a text ring smaller than its traced ring', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5, textRings: [[49.8, 50, 1]] }],
    ['a text ring set back over its stroke', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5, textRings: [[48.8, 50, 3]] }],
    ['text rings scaled by different factors', { d: 'M 20 50 L 48.8 50 M 51.2 20 L 80 20', rings: [[50, 50, 1.2], [50, 20, 1.2]], pen: 1, textPen: 1.5, textRings: [[51.8, 50, 3], [46.2, 20, 5]] }],
    ['a negative ring radius', { d: 'M 20 20 L 50 50', rings: [[50, 50, -6]] }],
    ['a ring centred on the stroke end, so the stroke crosses its hole', { d: 'M 20 20 L 50 50', rings: [[50, 50]] }],
    ['a ring eleven units past the stroke end', { d: 'M 20 50 L 50 50', rings: [[61, 50]] }],
    ['a ring with no stroke to end', { d: '', rings: [[50, 50]], dots: [[20, 20]] }],
    ['a ring given as an object', { d: 'M 20 20 L 50 50', rings: [{ x: 50, y: 50 }] }],
    ['rings that are not a list', { d: 'M 20 20 L 50 50', rings: { x: 50 } }],
    // filled glyphs
    ['an empty fill', { fill: '' }],
    ['a fill that is not a string', { fill: 42 }],
    ['a fill with relative commands', { fill: 'm 20 20 l 40 0 l -20 40 z' }],
    ['a fill closed with a lower-case z', { fill: 'M 20 20 L 60 20 L 40 60 z' }],
    ['a fill with H and V', { fill: 'M 20 20 H 60 V 60 Z' }],
    ['a fill with S', { fill: 'M 20 20 C 30 10 40 10 50 20 S 60 40 50 50 Z' }],
    ['a fill with an arc', { fill: 'M 20 20 A 10 10 0 0 1 40 40 Z' }],
    ['a fill that does not start with M', { fill: 'L 20 20 L 60 20 L 40 60 Z' }],
    ['a fill left open at the end', { fill: 'M 20 20 L 60 20 L 40 60' }],
    ['a fill whose second subpath is left open', { fill: `${TRI} M 50 50 L 70 50 L 60 70` }],
    ['a fill with an open subpath before the next M', { fill: 'M 20 20 L 60 20 L 40 60 M 50 50 L 70 50 L 60 70 Z' }],
    ['a fill drawing on after Z without M', { fill: 'M 20 20 L 60 20 L 40 60 Z L 70 70 L 20 70 Z' }],
    ['a fill closed with nothing drawn', { fill: 'M 20 20 Z' }],
    ['a fill closed twice', { fill: `${TRI} Z` }],
    ['a fill curve short of numbers', { fill: 'M 20 20 C 30 30 40 Z' }],
    ['a fill with a stray character', { fill: 'M 20 20 L 60 2x0 L 40 60 Z' }],
    ['a fill subpath with no area', { fill: 'M 20 20 L 60 60 Z' }],
    ['a fill with one subpath of no area', { fill: `${TRI} M 30 70 L 40 75 L 50 80 Z` }],
    ['a fill whose two subpaths cancel under evenodd', { fill: `${TRI} ${TRI}` }],
    // its control points leave 0–100 while its ink (down to y 15.25) stays in the
    // body box, so only the 0–100 rule refuses it
    ['a fill control point out of 0–100', { fill: 'M 20 64 C 20 -1 80 -1 80 64 Z' }],
    ['a fill end point out of 0–100', { fill: 'M 20 20 L 120 20 L 40 60 Z' }],
    ['fill ink left of the body box', { fill: 'M 8 30 L 40 30 L 40 60 Z' }],
    ['fill ink below the body box', { fill: 'M 20 30 L 60 30 L 40 86 Z' }],
    ['a fill curve bulging above the body box between points inside it', { fill: 'M 20 40 C 20 2 80 2 80 40 Z' }],
    ['fill and d both', { fill: TRI, d: 'M 20 70 L 60 70' }],
    ['fill and an empty d', { fill: TRI, d: '' }],
    ['fill with rings', { fill: TRI, rings: [[70, 70]] }],
    ['fill with dots', { fill: TRI, dots: [[70, 70]] }],
    ['fill with a pen', { fill: TRI, pen: 2 }],
    ['fill with a text pen', { fill: TRI, pen: 1, textPen: 2 }],
];

export const GOOD_GLYPHS = [
    ['one straight stroke', { d: 'M 30 20 L 70 80', rings: [], dots: [] }],
    ['a stroke that stops at the edge of its ring', { d: 'M 20 50 L 44 50', rings: [[50, 50]] }],
    ['a larger ring, the stroke stopping at its edge', { d: 'M 20 50 L 42 50', rings: [[50, 50, 8]] }],
    ['an arc', { d: 'M 20 50 A 30 30 0 0 1 80 50' }],
    ['a fine-lined figure with its own pens', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5 }],
    ['a fine-lined figure with larger rings at text size', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5, textRings: [[51.8, 50, 3]] }],
    ['a figure of points only', { d: '', rings: [], dots: [[34, 14, 8], [66, 14, 8], [50, 38, 8], [50, 62, 8], [50, 86, 8]] }],
    // filled glyphs
    ['a filled triangle', { fill: TRI }],
    ['a filled outline with a counter, in C, Q and L', { fill: 'M 50 23 C 62.2 23 72 32.8 72 45 C 72 53.5 67.6 60.4 61 64 Q 60 75 67 80 L 33 80 Q 40 75 39 64 C 32.4 60.4 28 53.5 28 45 C 28 32.8 37.8 23 50 23 Z M 51 31 C 57.1 31 62 36.8 62 44 C 62 51.2 57.1 57 51 57 C 44.9 57 40 51.2 40 44 C 40 36.8 44.9 31 51 31 Z' }],
    ['a fill whose counter is wound as its outline is', { fill: 'M 20 20 L 80 20 L 80 80 L 20 80 Z M 40 40 L 60 40 L 60 60 L 40 60 Z' }],
    ['a fill whose counter is wound the other way', { fill: 'M 20 20 L 80 20 L 80 80 L 20 80 Z M 40 40 L 40 60 L 60 60 L 60 40 Z' }],
    ['a fill of two separate pieces', { fill: 'M 20 20 L 50 20 L 35 50 Z M 60 60 L 80 60 L 80 80 L 60 80 Z' }],
    ['a fill whose pairs after M are lines', { fill: 'M 20 20 60 20 40 60 Z' }],
    ['a fill with commas and no spaces', { fill: 'M20,20L60,20L40,60Z' }],
    ['a fill touching the body box on every side', { fill: 'M 10 15 L 90 15 L 90 85 L 10 85 Z' }],
    ['a fill curve whose control points leave the body box but whose ink does not', { fill: 'M 20 40 C 20 8 80 8 80 40 Z' }],
    ['a fill number in e-notation', { fill: 'M 2e1 20 L 60 20 L 40 60 Z' }],
];

export const BAD_URLS = [
    'https://loc.gov:item/32017914',
    'http://archive.org/details/b30335231',
    'https://[bad',
    'ftp://archive.org/',
    'archive.org/details/b30335231',
];

export const GOOD_URLS = [
    'https://archive.org/details/DeOccultaPhilosophiaLoc1533',
    'https://www.unicode.org/charts/PDF/U1680.pdf',
];
