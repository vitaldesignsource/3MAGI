// The Magical Scriptorium — shared plumbing for the wing's pages.
//
// The same discipline as the Powers and Christianities libs: every module its
// own lazily loaded chunk, absent files resolve to null, and the entries are
// declared once, in the registry, which node tools import too. The registry
// and the generated comparison data are left out of the glob, so neither is
// ever offered as an alphabet.

import registry from '../../data/education/magic/registry';

export const LOADERS = import.meta.glob([
    '../../data/education/magic/*.js',
    '!../../data/education/magic/registry.js',
    '!../../data/education/magic/*.generated.js',
]);

export const loadEntry = async (slug) => {
    const mod = LOADERS[`../../data/education/magic/${slug}.js`];
    return mod ? (await mod()).default : null;
};

export const WING = registry.wing;
export const GROUPS = registry.groups;
export const ALPHABETS = registry.alphabets;
export const PAGES = registry.pages;
export const ENTRIES = [...registry.alphabets, ...registry.pages];
export const ENTRY_BY_SLUG = Object.fromEntries(ENTRIES.map((e) => [e.slug, e]));
export const MAGIC_PATH = registry.wing.path;
export const entryPath = (slug) => `${MAGIC_PATH}/${slug}`;

// Number words for derived counts (shared with the node tools).
export { numberWord, capitalise } from './words';

// How a letter is shown (shared with the glyph renderer and the search box).
export { textOf, modeOf } from './sign';

// The halls' hero titles are single words. A wing title is split where it
// names its subject and then describes it — at a colon or a comma, or before
// "and the …" after a one-word name — and the description is set beneath the
// name at a smaller size: "Malachim," / "the Writing of the Angels".
export function titleParts(title) {
    const t = String(title);
    const m = /^(.+?[:,])\s+(.+)$/.exec(t) || /^(\S+)\s+(and the\s.+)$/.exec(t);
    return m ? [m[1], m[2]] : [t, null];
}

// The name is then sized to the column (magic.css), in ems of Cinzel's
// capitals (about 0.62em a letter, measured): by the longest line of the best
// split of its words into two lines on a wide screen (--mg-fit) and into three
// on a phone (--mg-fit-sm). A one-word name is sized by that word, so
// "Transliterator" sets as large as the column allows and never runs past it,
// and a long name such as "The Ancient Alphabets of Ibn Waḥshiyya" never
// fills the first screen.
const EM_PER_CHAR = 0.63;
function longestLine(words, lines) {
    // the shortest possible longest line, splitting the words into at most
    // `lines` lines in order (titles are a few words, so this tries them all)
    const width = (from, to) => words.slice(from, to).reduce((a, w) => a + w, 0) + (to - from - 1);
    const best = (from, left) => {
        if (left === 1 || from === words.length - 1) return width(from, words.length);
        let min = width(from, words.length);
        for (let cut = from + 1; cut < words.length; cut++) min = Math.min(min, Math.max(width(from, cut), best(cut, left - 1)));
        return min;
    };
    return best(0, lines);
}
export const fitStyle = (title) => {
    const words = String(title).split(/\s+/).filter(Boolean).map((w) => Array.from(w).length);
    return {
        '--mg-fit': (longestLine(words, 2) * EM_PER_CHAR).toFixed(2),
        '--mg-fit-sm': (longestLine(words, 3) * EM_PER_CHAR).toFixed(2),
    };
};

export const STATUS_LABEL = {
    'ready': 'Ready',
    'forms-pending': 'Forms being traced',
};

export const STANDINGS = [
    { key: 'documented', label: 'Documented', note: 'the record shows it' },
    { key: 'attributed', label: 'Attributed', note: 'a named source says so; the record does not show it' },
    { key: 'disputed', label: 'Disputed', note: 'argued both ways in the scholarship' },
    { key: 'legend', label: 'Legend', note: 'a story told about it' },
];
