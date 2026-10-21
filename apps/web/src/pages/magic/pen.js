// The pen the wing's drawn letters are drawn with — plain JavaScript, with no
// import, so the glyph renderer (MagicGlyph.jsx) and the build's tools read
// the same numbers: a sign on a card and the same sign anywhere else it is
// made from the traced data are drawn with one pen.
//
// All values are in the glyph kit's viewBox units (0–100, glyphkit/README.md).

// the strokes' pen: round caps and round joins
export const HOUSE_PEN = 5.5;

// a ring's radius (a Brille) where the data give none
export const HOUSE_RING = 6;

// a dot's radius where the data give none
export const HOUSE_DOT = 2.6;

// A ring's pen. A ring drawn smaller than the house size — the crowded rings of
// the Malachim, the River's rings — takes a lighter pen, 2.6 for 3.6, so that
// its hole stays open at the sizes the pages use.
export const ringPen = (r) => (r < HOUSE_RING ? 2.6 : 3.6);
