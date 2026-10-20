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

// The note most letters share. While an alphabet's forms are being traced it
// is the reason for the gap, the same for every letter: the notice above the
// register gives it once, and the register prints only the notes that say
// something of their own letter. The search index applies the same rule, so a
// result never repeats it either.
export function sharedNote(letters) {
    const counts = new Map();
    for (const l of letters) if (l.note) counts.set(l.note, (counts.get(l.note) || 0) + 1);
    let best = null;
    let n = 0;
    for (const [note, c] of counts) if (c > n) { best = note; n = c; }
    return n >= 3 && n * 3 >= letters.length ? best : null;
}
