import { useCallback, useEffect, useRef, useState } from 'react';

// The dashboard's only door to the server: /api/admin.php?a=<action>.
// Same origin, so the HttpOnly session cookie (Path=/api/) rides along and
// the browser's own Origin header satisfies the server's CSRF check. Every
// POST is JSON, as the server insists.

const ENDPOINT = '/api/admin.php';

export class ApiError extends Error {
    constructor(status, body) {
        super((body && typeof body.error === 'string' && body.error) || `The server answered ${status}.`);
        this.name = 'ApiError';
        this.status = status;
        this.code = (body && body.code) || (status === 0 ? 'network' : 'http_' + status);
        this.body = body || null;
    }
}

/** The browser's IANA time zone: day boundaries and chart labels follow it. */
export function browserTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
        return 'UTC';
    }
}

/** A query string from a plain object; empty values are left out. */
export function query(params) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params || {})) {
        if (v === undefined || v === null || v === '' || v === false) continue;
        q.set(k, v === true ? '1' : String(v));
    }
    return q.toString();
}

export function actionUrl(action, params) {
    const q = query({ a: action, ...params });
    return `${ENDPOINT}?${q}`;
}

async function readJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

async function request(url, init) {
    let res;
    try {
        res = await fetch(url, { credentials: 'same-origin', cache: 'no-store', ...init });
    } catch (e) {
        if (e && e.name === 'AbortError') throw e;
        throw new ApiError(0, { error: 'The server could not be reached. Check the connection and try again.', code: 'network' });
    }
    const body = await readJson(res);
    if (!res.ok || !body || body.ok !== true) {
        throw new ApiError(res.status, body);
    }
    return body;
}

export function apiGet(action, params, signal) {
    return request(actionUrl(action, params), { method: 'GET', headers: { Accept: 'application/json' }, signal });
}

export function apiPost(action, body) {
    return request(actionUrl(action), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body || {}),
    });
}

// ------------------------------------------------------------------ cache ---
// Reports are aggregated on the server and can take a moment on a large
// database. A short-lived cache makes moving between sections instant without
// showing stale numbers for long.

const CACHE_MS = 60_000;
const cache = new Map();

export function clearCache() {
    cache.clear();
}

function cached(url) {
    const hit = cache.get(url);
    if (hit && Date.now() - hit.t < CACHE_MS) return hit.data;
    return undefined;
}

let unauthenticatedHandler = null;
/** The shell registers what to do when the session has ended (show sign-in). */
export function onUnauthenticated(fn) {
    unauthenticatedHandler = fn;
}

/**
 * GET an action with params. Keeps the previous answer on screen while a new
 * one loads (the caller dims it), so a range change never flashes or jumps.
 * `params === null` means "not yet": nothing is fetched.
 */
export function useApi(action, params, { cache: useCache = true } = {}) {
    const url = params === null ? null : actionUrl(action, params);
    const [state, setState] = useState(() => ({ data: url && useCache ? cached(url) : undefined, error: null, loading: !!url, url }));
    const [nonce, setNonce] = useState(0);
    const lastNonce = useRef(0);

    useEffect(() => {
        if (!url) return undefined;
        const forced = nonce !== lastNonce.current;
        lastNonce.current = nonce;
        const hit = useCache && !forced ? cached(url) : undefined;
        if (hit !== undefined) {
            setState({ data: hit, error: null, loading: false, url });
            return undefined;
        }
        const ctrl = new AbortController();
        setState((s) => ({ ...s, loading: true, error: null }));
        const qs = url.slice(url.indexOf('?') + 1);
        const p = Object.fromEntries(new URLSearchParams(qs));
        delete p.a;
        apiGet(action, p, ctrl.signal)
            .then((data) => {
                cache.set(url, { t: Date.now(), data });
                setState({ data, error: null, loading: false, url });
            })
            .catch((error) => {
                if (error && error.name === 'AbortError') return;
                if (error instanceof ApiError && error.code === 'unauthenticated' && unauthenticatedHandler) {
                    unauthenticatedHandler();
                }
                setState((s) => ({ ...s, error, loading: false, url }));
            });
        return () => ctrl.abort();
    }, [url, nonce, action, useCache]);

    const reload = useCallback(() => {
        if (url) cache.delete(url);
        setNonce((n) => n + 1);
    }, [url]);

    return { data: state.data, error: state.error, loading: state.loading, reload };
}
