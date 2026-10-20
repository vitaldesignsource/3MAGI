/**
 * Three Magi Press — the visitor-side analytics beacon.
 *
 * Feeds the owner's private dashboard (/admin) through /api/hit.php. Nothing
 * here touches the page: no element is added, no cookie or storage is used,
 * and nothing is sent to anyone but this site. The visitor, the visit and the
 * country are worked out on the server; the beacon only says what was viewed
 * and how. The event format is the contract in docs/analytics.md.
 *
 * Events, one small JSON object per request (sendBeacon, text/plain, so no
 * CORS preflight; fetch keepalive as the fallback):
 *   pageview  ~1.2 s after a route change, once react-helmet has set the
 *             title and meta, carrying the page's SEO facts;
 *   engage    when the page is hidden or the route changes: visible seconds
 *             and the deepest scroll on that view;
 *   vitals    once per landing, when the page is first hidden;
 *   search    a Scriptorium query the reader paused on (1.5 s) or submitted;
 *   notfound  when the app renders its not-found page;
 *   outbound  a click on a link to another site (its host only).
 *
 * It never runs in development, on /admin, under automation
 * (navigator.webdriver), in a headless browser, or while the page is only
 * being prerendered. End-to-end tests get in with ?tl_analytics_test=1, which
 * is honoured on localhost / 127.0.0.1 / [::1] and nowhere else.
 *
 * Every entry point is wrapped: an analytics fault is swallowed, never thrown
 * into the app. The work itself is a handful of reads on idle.
 */

const ENDPOINT = '/api/hit.php';
const FACTS_DELAY_MS = 1200;   // react-helmet sets title and meta just after render
const SETTLE_RETRY_MS = 600;   // the route is still loading (aria-busy): look again…
const SETTLE_GIVE_UP_MS = 8000; // …but not forever; then send without facts
const SEARCH_PAUSE_MS = 1500;
const ENGAGE_REPEAT_MS = 1000; // see sendEngage
const MAX_BYTES = 4096;
const HEADLESS = /HeadlessChrome|Chrome-Lighthouse|PhantomJS|Puppeteer|Playwright/i;
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];
const SITE_HOSTS = ['threemagipress.com', '3magipress.com'];
const ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

let status = 0;        // 0 not started, 1 running, -1 off for this page load
let gpc = false;
let current = null;    // the view on screen
let landing = null;    // the document's first tracked view: the vitals belong to it
let vitalsStarted = false;
let vitalsSent = false;
let waitingForActivation = false;
let pendingSearch = null;
let searchTimer = 0;
let lastSearch = '';
let scrollQueued = false;

const noop = () => {};
const clock = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now());

/** Run fn, swallowing anything it throws. Analytics must never break a page. */
function guard(fn) {
    return function guarded(...args) {
        try {
            return fn(...args);
        } catch {
            return undefined;
        }
    };
}

function cap(value, max) {
    return typeof value === 'string' ? value.slice(0, max) : null;
}

function normPath(path) {
    const p = typeof path === 'string' && path.startsWith('/') ? path : '/';
    return p.length > 1 ? (p.replace(/\/+$/, '') || '/') : p;
}

function isAdmin(path) {
    return /^\/admin(\/|$)/i.test(path);
}

function viewId() {
    const n = 20;
    let bytes = null;
    try {
        bytes = new Uint8Array(n);
        crypto.getRandomValues(bytes);
    } catch {
        bytes = null;
    }
    let id = '';
    for (let i = 0; i < n; i += 1) {
        id += ID_ALPHABET[bytes ? bytes[i] & 63 : Math.floor(Math.random() * 64)];
    }
    return id;
}

// ------------------------------------------------------------- the gate ---

/** The end-to-end tests' way in: a query flag, on a loopback host only. */
function testDoor() {
    try {
        return LOCAL_HOSTS.includes(location.hostname)
            && new URLSearchParams(location.search).get('tl_analytics_test') === '1';
    } catch {
        return false;
    }
}

function start() {
    if (status !== 0) return status === 1;
    status = -1;
    if (import.meta.env.DEV) return false;
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof navigator === 'undefined') return false;
    if (location.protocol !== 'https:' && location.protocol !== 'http:') return false;
    if (!testDoor() && (navigator.webdriver === true || HEADLESS.test(navigator.userAgent || ''))) return false;
    if (typeof navigator.sendBeacon !== 'function' && typeof fetch !== 'function') return false;
    gpc = navigator.globalPrivacyControl === true;
    status = 1;
    listen();
    return true;
}

// ------------------------------------------------------------ transport ---

function send(event) {
    const ev = event;
    ev.gpc = gpc;
    let body = JSON.stringify(ev);
    let blob = new Blob([body], { type: 'text/plain' });
    if (blob.size > MAX_BYTES && ev.facts) {
        delete ev.facts;
        body = JSON.stringify(ev);
        blob = new Blob([body], { type: 'text/plain' });
    }
    if (blob.size > MAX_BYTES) return;
    let queued = false;
    try {
        queued = typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(ENDPOINT, blob) === true;
    } catch {
        queued = false;
    }
    if (!queued && typeof fetch === 'function') {
        try {
            fetch(ENDPOINT, {
                method: 'POST', body, keepalive: true, credentials: 'same-origin',
                headers: { 'Content-Type': 'text/plain' },
            }).catch(noop);
        } catch {
            // nothing more to try
        }
    }
}

// --------------------------------------------------------- page reading ---

/** A route still loading marks itself aria-busy (the Suspense fallback, the
 *  portals' data loads, an essay's text). Its facts would be the wrong page's. */
function busy() {
    return document.querySelector('[aria-busy="true"]') !== null;
}

function settled(view) {
    if (!view.settled && !busy()) view.settled = true;
    return view.settled;
}

/**
 * Is the DOM this view's? Between the router's commit of the next page and
 * its effect telling the beacon (a frame or so), `current` is still the old
 * view while the address bar and the DOM already belong to the new one.
 */
function onScreen(view) {
    return current === view && normPath(location.pathname) === view.path;
}

function metaContent(selector) {
    const el = document.querySelector(selector);
    return el ? cap(el.getAttribute('content') || '', 500) : null;
}

function readFacts() {
    const canonical = document.querySelector('link[rel="canonical"]');
    let imgNoAlt = 0;
    const imgs = document.images;
    for (let i = 0; i < imgs.length; i += 1) {
        if (!imgs[i].hasAttribute('alt')) imgNoAlt += 1;
    }
    return {
        title: cap(document.title || '', 300),
        description: metaContent('meta[name="description"]'),
        canonical: canonical ? cap(canonical.href || '', 500) : null,
        robots: cap(metaContent('meta[name="robots"]'), 100),
        lang: cap(document.documentElement.getAttribute('lang'), 35),
        h1: document.getElementsByTagName('h1').length,
        og_title: document.querySelector('meta[property="og:title"]') !== null,
        og_image: document.querySelector('meta[property="og:image"]') !== null,
        img_no_alt: imgNoAlt,
    };
}

function scrollDepth() {
    const el = document.documentElement;
    const height = Math.max(el.scrollHeight, document.body ? document.body.scrollHeight : 0);
    const viewport = window.innerHeight || el.clientHeight;
    if (!height || !viewport) return 0;
    const top = window.scrollY || window.pageYOffset || el.scrollTop || 0;
    return Math.max(0, Math.min(100, Math.round(((top + viewport) / height) * 100)));
}

function noteScroll(view) {
    const depth = scrollDepth();
    if (view.scroll === null || depth > view.scroll) view.scroll = depth;
}

function timeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch {
        return '';
    }
}

function utmFrom(search) {
    const utm = {};
    try {
        const params = new URLSearchParams(search);
        ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
            const v = params.get(key);
            if (v) utm[key] = v.slice(0, 100);
        });
    } catch {
        // no tags, then
    }
    return utm;
}

// ---------------------------------------------------------------- views ---

function makeView(path) {
    return {
        id: viewId(), path, skip: isAdmin(path),
        ref: '', internal: false, utm: null,
        born: clock(), timer: 0,
        sent: false, sentAt: 0, notFound: false, settled: false,
        visibleMs: 0, visibleSince: null, scroll: null,
        sentSeconds: -1, sentScroll: -2,
    };
}

function resumeClock(view) {
    if (view && !view.skip && view.visibleSince === null && document.visibilityState === 'visible') {
        view.visibleSince = clock();
    }
}

function pauseClock(view) {
    if (view && view.visibleSince !== null) {
        view.visibleMs += clock() - view.visibleSince;
        view.visibleSince = null;
    }
}

function visibleSeconds(view) {
    const ms = view.visibleMs + (view.visibleSince !== null ? clock() - view.visibleSince : 0);
    return Math.max(0, Math.min(86400, Math.round(ms / 1000)));
}

function idle(fn) {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(fn, { timeout: 2000 });
    else setTimeout(fn, 0);
}

/** Send the pageview once the route has rendered and helmet has run. */
function schedule(view, delay) {
    view.timer = setTimeout(guard(() => {
        if (current !== view || view.sent) return;
        if (!settled(view) && clock() - view.born < SETTLE_GIVE_UP_MS) {
            schedule(view, SETTLE_RETRY_MS);
            return;
        }
        idle(guard(() => {
            if (current === view && !view.sent) sendPageview(view, settled(view));
        }));
    }), delay);
}

function sendPageview(view, withFacts) {
    view.sent = true;
    view.sentAt = clock();
    clearTimeout(view.timer);
    const ev = { type: 'pageview', view: view.id, path: view.path, ref: cap(view.ref || '', 500) };
    if (view.internal) ev.ref_internal = true;
    if (view.utm) Object.assign(ev, view.utm);
    if (window.screen) {
        ev.screen_w = Math.round(window.screen.width) || 0;
        ev.screen_h = Math.round(window.screen.height) || 0;
    }
    ev.viewport_w = Math.round(window.innerWidth) || 0;
    ev.lang = cap(navigator.language || '', 35);
    ev.tz = timeZone();
    if (view.notFound) ev.not_found = true;
    // Facts only while this view is the page on screen; after a route change
    // the DOM already belongs to the next one.
    if (withFacts && onScreen(view)) {
        ev.facts = readFacts();
        noteScroll(view);
    }
    send(ev);
}

/**
 * Visible seconds and scroll depth so far (the server keeps the maximum).
 * Right after its pageview went out, the engage is sent again a moment later:
 * on a host that runs requests side by side it could otherwise be read before
 * the pageview it belongs to is stored, and be dropped.
 */
function sendEngage(view, force) {
    if (!view.sent) return;
    const seconds = visibleSeconds(view);
    if (!force && seconds === view.sentSeconds && view.scroll === view.sentScroll) return;
    view.sentSeconds = seconds;
    view.sentScroll = view.scroll;
    const ev = { type: 'engage', view: view.id, seconds };
    if (view.scroll !== null) ev.scroll = view.scroll;
    send(ev);
    if (!force && clock() - view.sentAt < ENGAGE_REPEAT_MS) {
        setTimeout(guard(() => sendEngage(view, true)), ENGAGE_REPEAT_MS);
    }
}

function closeView(view) {
    if (view.skip) return;
    clearTimeout(view.timer);
    pauseClock(view);
    if (!view.sent) sendPageview(view, false);
    sendEngage(view, false);
}

function flushSearch() {
    clearTimeout(searchTimer);
    const s = pendingSearch;
    pendingSearch = null;
    if (!s) return;
    const key = `${s.path}\n${s.query}`;
    if (key === lastSearch) return;
    lastSearch = key;
    send({ type: 'search', query: s.query, results: s.results, path: s.path });
}

// --------------------------------------------------------------- events ---

function onHidden() {
    if (status !== 1) return;
    flushSearch();
    const view = current;
    if (view && !view.skip) {
        pauseClock(view);
        if (!view.sent) sendPageview(view, settled(view));
        sendEngage(view, false);
    }
    sendVitals();
}

function onVisibility() {
    if (document.visibilityState === 'hidden') onHidden();
    else resumeClock(current);
}

/** Back from the back/forward cache: the reader is looking at the page again. */
function onPageShow(e) {
    if (!e.persisted || status !== 1) return;
    const path = normPath(location.pathname);
    const view = makeView(path); // no referrer: the reader came back, nobody sent them
    current = view;
    if (view.skip) return;
    resumeClock(view);
    schedule(view, FACTS_DELAY_MS);
}

function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    const measure = guard(() => {
        scrollQueued = false;
        const view = current;
        if (view && !view.skip && onScreen(view) && settled(view)) noteScroll(view);
    });
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(measure);
    else setTimeout(measure, 100);
}

function sameSite(host) {
    const bare = (h) => String(h || '').toLowerCase().replace(/^www\./, '');
    const h = bare(host);
    return h === bare(location.hostname) || SITE_HOSTS.includes(h);
}

/** One delegated listener for every link on every page, present and future. */
function onClick(e) {
    if (e.type === 'auxclick' && e.button !== 1) return;
    if (!current || current.skip) return;
    const target = e.target;
    const link = target && typeof target.closest === 'function' ? target.closest('a[href]') : null;
    if (!link) return;
    let url;
    try {
        url = new URL(link.getAttribute('href'), location.href);
    } catch {
        return;
    }
    if ((url.protocol !== 'https:' && url.protocol !== 'http:') || sameSite(url.hostname)) return;
    send({ type: 'outbound', host: url.hostname.toLowerCase(), path: current.path });
}

function listen() {
    const passive = { capture: true, passive: true };
    document.addEventListener('visibilitychange', guard(onVisibility), true);
    // pagehide covers browsers that skip visibilitychange on unload. Never
    // `unload`: it would keep the page out of the back/forward cache.
    window.addEventListener('pagehide', guard(onHidden), true);
    window.addEventListener('pageshow', guard(onPageShow), true);
    window.addEventListener('scroll', guard(onScroll), { passive: true });
    document.addEventListener('click', guard(onClick), passive);
    document.addEventListener('auxclick', guard(onClick), passive);
}

// ---------------------------------------------------------- web vitals ---

const vitals = { ttfb: null, fcp: null, lcp: null, cls: null, nav: null };
let interactions = [];   // the longest few, { id, duration }
let interactionCount = 0;

function startVitals() {
    if (typeof PerformanceObserver !== 'function' || typeof performance === 'undefined') return;
    const types = PerformanceObserver.supportedEntryTypes || [];
    const nav = typeof performance.getEntriesByType === 'function' ? performance.getEntriesByType('navigation')[0] : null;
    // A prerendered page's clock starts when the reader actually opens it.
    const activation = nav && nav.activationStart > 0 ? nav.activationStart : 0;
    if (nav) {
        vitals.ttfb = nav.responseStart > 0 ? Math.max(0, nav.responseStart - activation) : null;
        vitals.nav = document.prerendering || activation > 0 ? 'prerender' : String(nav.type || 'navigate').replace('-', '_');
    }
    const observe = (type, fn, extra) => {
        if (!types.includes(type)) return;
        try {
            new PerformanceObserver(guard((list) => fn(list.getEntries())))
                .observe({ type, buffered: true, ...extra });
        } catch {
            // an engine that lists the type but refuses the options
        }
    };
    observe('paint', (entries) => {
        entries.forEach((e) => {
            if (e.name === 'first-contentful-paint') vitals.fcp = Math.max(0, e.startTime - activation);
        });
    });
    observe('largest-contentful-paint', (entries) => {
        const last = entries[entries.length - 1];
        if (last) vitals.lcp = Math.max(0, last.startTime - activation);
    });
    // CLS: the worst burst of shifts (gaps < 1 s, at most 5 s long), as Chrome defines it.
    if (types.includes('layout-shift')) vitals.cls = 0;
    let windowValue = 0;
    let windowFirst = 0;
    let windowLast = 0;
    observe('layout-shift', (entries) => {
        entries.forEach((e) => {
            if (e.hadRecentInput) return;
            if (windowValue && e.startTime - windowLast < 1000 && e.startTime - windowFirst < 5000) {
                windowValue += e.value;
            } else {
                windowValue = e.value;
                windowFirst = e.startTime;
            }
            windowLast = e.startTime;
            if (windowValue > vitals.cls) vitals.cls = windowValue;
        });
    });
    const onEvents = (entries) => {
        entries.forEach((e) => {
            if (!e.interactionId) return;
            const known = interactions.find((x) => x.id === e.interactionId);
            if (known) {
                if (e.duration > known.duration) known.duration = e.duration;
            } else {
                interactionCount += 1;
                interactions.push({ id: e.interactionId, duration: e.duration });
            }
        });
        interactions.sort((a, b) => b.duration - a.duration);
        if (interactions.length > 10) interactions = interactions.slice(0, 10);
    };
    observe('event', onEvents, { durationThreshold: 40 });
    observe('first-input', onEvents);
}

/** INP: the worst interaction, or near it (one in fifty ignored) on busy pages. */
function inp() {
    if (!interactions.length) return null;
    const count = typeof performance.interactionCount === 'number' && performance.interactionCount > 0
        ? performance.interactionCount : interactionCount;
    return interactions[Math.min(interactions.length - 1, Math.floor(count / 50))].duration;
}

function sendVitals() {
    if (vitalsSent || !landing || !landing.sent) return;
    vitalsSent = true;
    const ms = (v) => (typeof v === 'number' && Number.isFinite(v) ? Math.round(v) : null);
    const ev = {
        type: 'vitals', view: landing.id, path: landing.path, nav: vitals.nav,
        ttfb: ms(vitals.ttfb), fcp: ms(vitals.fcp), lcp: ms(vitals.lcp), inp: ms(inp()),
        cls: typeof vitals.cls === 'number' ? Math.round(vitals.cls * 1000) / 1000 : null,
    };
    if (ev.ttfb === null && ev.fcp === null && ev.lcp === null && ev.inp === null && ev.cls === null) return;
    send(ev);
}

// -------------------------------------------------------------- the API ---

/**
 * The router's location changed (or the app mounted). `navigationType` is
 * react-router's: a REPLACE before the old view was even reported is a
 * redirect, so the old path was never really seen and the new one inherits
 * its referrer.
 */
export const pageChanged = guard((navigationType) => {
    if (!start()) return;
    if (document.prerendering) {
        if (!waitingForActivation) {
            waitingForActivation = true;
            document.addEventListener('prerenderingchange', guard(() => {
                waitingForActivation = false;
                pageChanged('POP');
            }), { once: true });
        }
        return;
    }
    if (!vitalsStarted) {
        // Only now: a prerendered page's activationStart is known once it is shown.
        vitalsStarted = true;
        startVitals();
    }
    const path = normPath(location.pathname);
    if (current && current.path === path) return; // a hash or query change is the same view
    flushSearch();
    const prev = current;
    let heir = null;
    if (prev) {
        if (!prev.skip && !prev.sent && navigationType === 'REPLACE') {
            clearTimeout(prev.timer);
            heir = prev;
        } else {
            closeView(prev);
        }
    }
    const view = makeView(path);
    if (heir) {
        view.ref = heir.ref;
        view.internal = heir.internal;
        view.utm = heir.utm;
    } else if (prev) {
        view.ref = prev.path;
        view.internal = true;
    } else {
        view.ref = document.referrer || '';
        view.utm = utmFrom(location.search);
    }
    current = view;
    if (view.skip) return;
    if (!prev || (heir && heir === landing)) landing = view;
    resumeClock(view);
    schedule(view, FACTS_DELAY_MS);
});

/** The site search ran: `query` as typed, `results` found, `submitted` on Enter. */
export const trackSearch = guard((query, results, submitted) => {
    if (status !== 1 || !current || current.skip) return;
    const q = String(query == null ? '' : query).trim().replace(/\s+/g, ' ').toLowerCase().slice(0, 80).trim();
    clearTimeout(searchTimer);
    pendingSearch = null;
    if (q.length < 2) return;
    pendingSearch = { query: q, results: Math.max(0, Math.floor(Number(results) || 0)), path: current.path };
    if (submitted) flushSearch();
    else searchTimer = setTimeout(guard(flushSearch), SEARCH_PAUSE_MS);
});

/** The app rendered its not-found page for the current URL. */
export const trackNotFound = guard(() => {
    if (status !== 1) return;
    if (!current || current.path !== normPath(location.pathname)) pageChanged('PUSH');
    const view = current;
    if (!view || view.skip || view.notFound) return;
    view.notFound = true;
    const ev = { type: 'notfound', path: view.path, ref: cap(view.ref || '', 500), view: view.id };
    if (view.internal) ev.ref_internal = true;
    send(ev);
});
