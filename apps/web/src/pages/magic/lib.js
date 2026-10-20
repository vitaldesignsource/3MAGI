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
export { numberWord, capitalise, listOf } from './words';

// How a letter is shown (shared with the glyph renderer and the search box).
export { textOf, modeOf } from './sign';

// The halls' hero title is sized for short names. A title with one long word
// ("Transliterator", "Galdrastafir:") would run past the column on a phone,
// so the page hands magic.css the em-width of its longest word (Cinzel's
// capitals run about 0.62em a letter) and the title is capped to fit it.
export const fitStyle = (title) => {
    const longest = Math.max(...String(title).split(/\s+/).map((w) => Array.from(w).length));
    return { '--mg-fit': (longest * 0.62).toFixed(2) };
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
