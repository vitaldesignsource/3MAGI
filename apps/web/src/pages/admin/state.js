import { createContext, useContext } from 'react';

// Everything about what the owner is looking at lives in the URL's query
// string (/admin?v=pages&range=30d&path=/books), so Back works, a view can be
// bookmarked, and the path stays exactly /admin.

export const DashContext = createContext(null);
export const useDash = () => useContext(DashContext);

export const SECTIONS = [
    { key: 'overview', label: 'Overview' },
    { key: 'pages', label: 'Pages' },
    { key: 'sources', label: 'Sources' },
    { key: 'visitors', label: 'Visitors' },
    { key: 'search', label: 'Search' },
    { key: 'seo', label: 'SEO' },
    { key: 'technology', label: 'Technology' },
    { key: 'settings', label: 'Settings' },
];
export const SECTION_KEYS = SECTIONS.map((s) => s.key);

export const RANGES = [
    { value: 'today', short: 'Today', long: 'Today' },
    { value: 'yesterday', short: 'Yest.', long: 'Yesterday' },
    { value: '7d', short: '7 d', long: 'Last 7 days' },
    { value: '30d', short: '30 d', long: 'Last 30 days' },
    { value: '90d', short: '90 d', long: 'Last 90 days' },
    { value: '12m', short: '12 m', long: 'Last 12 months' },
    { value: 'custom', short: 'Custom', long: 'Custom range' },
];
export const RANGE_KEYS = RANGES.map((r) => r.value);

// Keys that belong to the whole dashboard; everything else is a section's own
// state and is dropped when the section changes.
export const GLOBAL_KEYS = ['v', 'range', 'from', 'to', 'owner', 'cmp'];

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Read the global view state from the query string, whitelisting every value. */
export function readGlobal(sp) {
    const v = SECTION_KEYS.includes(sp.get('v')) ? sp.get('v') : 'overview';
    let range = RANGE_KEYS.includes(sp.get('range')) ? sp.get('range') : '7d';
    let from = sp.get('from') || '';
    let to = sp.get('to') || '';
    if (range === 'custom' && !(DAY.test(from) && DAY.test(to))) {
        range = '7d';
    }
    if (range !== 'custom') {
        from = '';
        to = '';
    }
    return {
        v,
        range,
        from,
        to,
        owner: sp.get('owner') === '1',
        compare: sp.get('cmp') !== '0',
    };
}

/** The common range parameters every range-based API action takes. */
export function rangeParams(g, tz) {
    return {
        range: g.range,
        from: g.range === 'custom' ? g.from : undefined,
        to: g.range === 'custom' ? g.to : undefined,
        tz,
        include_owner: g.owner ? 1 : undefined,
    };
}

/** A new query string: the current one with `patch` applied (null deletes). */
export function patchSearch(sp, patch) {
    const next = new URLSearchParams(sp);
    if (patch.v && patch.v !== sp.get('v')) {
        for (const k of [...next.keys()]) {
            if (!GLOBAL_KEYS.includes(k)) next.delete(k);
        }
    }
    for (const [k, val] of Object.entries(patch)) {
        if (val === null || val === undefined || val === '' || val === false) next.delete(k);
        else next.set(k, String(val));
    }
    if (next.get('v') === 'overview') next.delete('v');
    if (next.get('range') === '7d') next.delete('range');
    const s = next.toString();
    return s ? `?${s}` : '';
}
