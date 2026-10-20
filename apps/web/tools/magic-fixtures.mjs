// Fixtures for the Magical Scriptorium's glyph and URL rules (magic-lib.mjs).
// validate-magic.mjs runs them before it reads a single module: every glyph
// and URL listed as bad must be refused, and every one listed as good must
// pass, so a rule cannot be loosened by accident without the build saying so.
// The bad glyphs are the ones a review found the earlier rules let through:
// each draws nothing, or makes the browser log an SVG error, or breaks the
// kit's rule that a stroke stops at the edge of its ring.

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
];

export const GOOD_GLYPHS = [
    ['one straight stroke', { d: 'M 30 20 L 70 80', rings: [], dots: [] }],
    ['a stroke that stops at the edge of its ring', { d: 'M 20 50 L 44 50', rings: [[50, 50]] }],
    ['a larger ring, the stroke stopping at its edge', { d: 'M 20 50 L 42 50', rings: [[50, 50, 8]] }],
    ['an arc', { d: 'M 20 50 A 30 30 0 0 1 80 50' }],
    ['a fine-lined figure with its own pens', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5 }],
    ['a fine-lined figure with larger rings at text size', { d: 'M 20 50 L 48.8 50', rings: [[50, 50, 1.2]], pen: 1, textPen: 1.5, textRings: [[51.8, 50, 3]] }],
    ['a figure of points only', { d: '', rings: [], dots: [[34, 14, 8], [66, 14, 8], [50, 38, 8], [50, 62, 8], [50, 86, 8]] }],
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
