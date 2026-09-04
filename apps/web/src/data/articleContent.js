// Essay content loading.
//
// Free essays are bundled: Vite emits one small chunk per essay, fetched when
// that essay is opened. Gated essays are NOT in the bundle at all — their text
// lives above the document root on the server and only api/essay.php will part
// with it, and only for a reader holding a valid pass.
//
// So this module has two paths, and which one a slug takes is decided by the
// build (by which directory the file sits in), not by anything the browser
// could talk itself out of.

import { gatedSlugs } from './gatedSlugs.generated.js';

const modules = import.meta.glob('./articles/*.js');

const keyFor = (slug) => `./articles/${slug}.js`;

export function isGated(slug) {
    return gatedSlugs.has(slug);
}

/** True if this essay's text ships in the bundle (free essays only). */
export function hasArticleContent(slug) {
    return Object.prototype.hasOwnProperty.call(modules, keyFor(slug));
}

/**
 * Resolve an essay's content.
 *
 * @returns {Promise<{status: 'ok'|'members_only'|'preview_required'|'not_found'|'error', content: object}>}
 */
export function loadArticleContent(slug) {
    if (isGated(slug)) {
        return fetch(`/api/essay.php?slug=${encodeURIComponent(slug)}`, {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        })
            .then(async (res) => {
                let body = null;
                try {
                    body = await res.json();
                } catch {
                    // A non-JSON body means the endpoint isn't deployed yet
                    // (the SPA fallback returns index.html). Treat as gated
                    // rather than crashing the page.
                }
                if (res.ok && body && body.content) {
                    return { status: 'ok', content: body.content };
                }
                const code = (body && body.code) || (res.status === 401 ? 'preview_required' : res.status === 404 ? 'not_found' : 'members_only');
                return { status: code, content: {} };
            })
            .catch(() => ({ status: 'error', content: {} }));
    }

    const load = modules[keyFor(slug)];
    if (!load) {
        return Promise.resolve({ status: 'ok', content: {} });
    }
    return load().then((m) => ({ status: 'ok', content: m.default || {} }));
}
