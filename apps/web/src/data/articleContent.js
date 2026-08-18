// On-demand loader for essay content.
//
// articles.js holds only the card/metadata fields for every essay (~24KB).
// The heavy fields — body, sections, marginalia, figures — live one file per
// essay in ./articles/<slug>.js. Vite turns this glob into one small chunk per
// essay, fetched only when that essay is opened, so the archive, homepage and
// every other route never download essay text.

const modules = import.meta.glob('./articles/*.js');

const keyFor = (slug) => `./articles/${slug}.js`;

/** True if this essay has a content module (a few very short entries keep
 *  everything in the index and have none). */
export function hasArticleContent(slug) {
    return Object.prototype.hasOwnProperty.call(modules, keyFor(slug));
}

/** Resolve to the essay's heavy fields, or {} if it has none. */
export function loadArticleContent(slug) {
    const load = modules[keyFor(slug)];
    if (!load) return Promise.resolve({});
    return load().then((m) => m.default || {});
}
