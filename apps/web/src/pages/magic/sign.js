// How a letter of the wing is shown — plain JavaScript, imported by the glyph
// renderer and the pages alike, with no registry and no import.meta, so the
// shared search box can draw a sign without pulling in the wing.

// The zodiac signs default to emoji presentation on phones. A text-
// presentation selector after each keeps them in the site's own face.
const VS15 = String.fromCodePoint(0xFE0E);
const emojiDefault = (char) => {
    const cp = char.codePointAt(0);
    return char.length === 1 && cp >= 0x2648 && cp <= 0x2653;
};
export const textOf = (char) => (emojiDefault(char) ? char + VS15 : char);

// Drawn path data, a character set in a vendored face, or nothing yet — an
// honest gap. Takes a letter or a sign ({ glyph } | { char } | null).
export function modeOf(letter) {
    if (!letter) return 'gap';
    if (letter.glyph) return 'glyph';
    if (letter.char) return 'char';
    return 'gap';
}
