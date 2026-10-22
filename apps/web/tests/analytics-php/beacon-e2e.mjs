#!/usr/bin/env node
/**
 * End-to-end test of the visitor-side beacon (src/lib/analytics.js) against
 * the BUILT site, with real browsers, checking the rows that land in SQLite.
 *
 *   cd apps/web && npm run build
 *   node apps/web/tests/analytics-php/beacon-e2e.mjs [--port=4302] [--docroot=dist/apps/web] [--keep]
 *
 * It serves dist/apps/web with `php -S` and router.php (the .htaccess rules),
 * throwaway secrets from make-secrets.php and a temporary data folder, both
 * outside the document root (TL_SECRETS_FILE, TL_ANALYTICS_DIR). Then
 * Playwright's Chromium reads the site as people do — a landing from a search
 * engine with UTM tags, in-app navigation, a scroll, the Scriptorium search
 * (paused on, and submitted), a click out to another site, a hidden tab, a
 * not-found page reached in the app and one landed on, leaving the page — on
 * a desktop and at 390 px, and every expected row is read back from the
 * database: pageview (with referrer, UTM and page facts), engage (visible
 * seconds, scroll), vitals, search, notfound, outbound.
 *
 * Also: the gates (no beacon under webdriver, in a headless UA, on /admin;
 * the ?tl_analytics_test=1 door works on 127.0.0.1 and nowhere else; a
 * non-automated browser on a non-local host is counted), Global Privacy
 * Control, the fetch fallback, broken browser APIs (nothing thrown), payload
 * shape and size, and no cookies or storage.
 *
 * The browser under automation reports navigator.webdriver, which the beacon
 * refuses; the tests get in through ?tl_analytics_test=1 on 127.0.0.1 (see
 * docs/analytics.md). Visitors are told apart by User-Agent (one IP here).
 */

import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import pw from '/opt/node22/lib/node_modules/playwright/index.js';

const { chromium } = pw;
const HERE = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(HERE, '../..');
const REPO = resolve(WEB, '../..');
const arg = (name, fallback) => {
    const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : fallback;
};
const PORT = Number(arg('port', process.env.TL_TEST_PORT || '4302'));
const DOCROOT = resolve(arg('docroot', join(REPO, 'dist/apps/web')));
const KEEP = process.argv.includes('--keep');
const PHP = process.env.PHP || 'php';
const BASE = `http://127.0.0.1:${PORT}`;
const FAKE_HOST = 'tl-beacon.test'; // resolves to 127.0.0.1 inside the browsers only
const FAKE_BASE = `http://${FAKE_HOST}:${PORT}`;
const DOOR = 'tl_analytics_test=1';

const UA = {
    desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    phone: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36',
    webdriverNoDoor: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    doorFarHost: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    realFarHost: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    admin: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    gpc: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    fallback: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    broken: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    quick: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
};

// ------------------------------------------------------------- harness ---

let passed = 0;
const failures = [];
function check(name, ok, detail = '') {
    if (ok) {
        passed += 1;
        console.log(`  ok   ${name}`);
    } else {
        failures.push(name);
        const d = typeof detail === 'string' ? detail : JSON.stringify(detail);
        console.log(`  FAIL ${name}  ${String(d).slice(0, 500)}`);
    }
}
const section = (title) => console.log(`\n${title}`);
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });

if (!existsSync(join(DOCROOT, 'index.html'))) {
    console.error(`no build at ${DOCROOT} — run: cd apps/web && npm run build`);
    process.exit(2);
}
if (!readdirSync(join(DOCROOT, 'assets')).some((f) => f.endsWith('.js') && readFileSync(join(DOCROOT, 'assets', f), 'utf8').includes(DOOR.split('=')[0]))) {
    console.error('the build does not contain the beacon (src/lib/analytics.js) — rebuild');
    process.exit(2);
}

const WORK = mkdtempSync(join(tmpdir(), 'tl-beacon-e2e-'));
if (WORK.startsWith(DOCROOT)) throw new Error('work dir inside the docroot');
const SECRETS = join(WORK, 'tl-secrets.php');
const DATA = join(WORK, 'data');
const DB = join(DATA, 'analytics.sqlite');
// Throwaway credentials: the dashboard is not exercised here, but hit.php
// reads the secrets file (the owner cookie check), so it must exist.
execFileSync(PHP, [join(HERE, 'make-secrets.php'), SECRETS], {
    env: { ...process.env, TL_DEV_PASSWORD: `e2e-${randomBytes(12).toString('hex')}` },
    stdio: 'ignore',
});

/** Rows from the analytics database (read-only; [] before it exists). */
function sql(query, params = []) {
    const code = 'if (!is_file($argv[1])) { echo "[]"; exit; }'
        + '$db = new PDO("sqlite:" . $argv[1], null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::SQLITE_ATTR_OPEN_FLAGS => PDO::SQLITE_OPEN_READONLY]);'
        + '$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);'
        + '$st = $db->prepare($argv[2]); $st->execute(json_decode($argv[3], true)); echo json_encode($st->fetchAll());';
    return JSON.parse(execFileSync(PHP, ['-r', code, '--', DB, query, JSON.stringify(params)], { encoding: 'utf8' }));
}

async function waitFor(label, fn, timeout = 10000) {
    const until = Date.now() + timeout;
    let last;
    for (;;) {
        try {
            last = fn();
            if (last) return last;
        } catch (e) {
            last = e;
        }
        if (Date.now() > until) {
            check(`${label} (waited ${timeout} ms)`, false, last instanceof Error ? last.message : last);
            return null;
        }
        await sleep(200);
    }
}

// Rows by visitor: every context has its own User-Agent.
const sessionsOf = (ua) => sql('SELECT * FROM sessions WHERE ua = ? ORDER BY start_ts, rowid', [ua]);
const viewsOf = (ua) => sql('SELECT p.* FROM pageviews p JOIN sessions s ON s.id = p.session_id WHERE s.ua = ? ORDER BY p.id', [ua]);
const rowsOf = (table, ua) => sql(`SELECT t.* FROM ${table} t JOIN sessions s ON s.id = t.session_id WHERE s.ua = ? ORDER BY t.id`, [ua]);
const viewAt = (ua, path) => viewsOf(ua).filter((v) => v.path === path);

// ---------------------------------------------------------------- server ---

// Every beacon is noted as the server received it (body, size, headers) by a
// thin router in front of router.php: intercepting in the browser instead
// would hold up the beacons a closing page sends, which is part of the test.
const BEACON_LOG = join(WORK, 'beacons.jsonl');
const ROUTER = join(WORK, 'router-with-beacon-log.php');
const phpQuote = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
writeFileSync(ROUTER, `<?php
if (parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH) === '/api/hit.php') {
    $body = (string) file_get_contents('php://input');
    file_put_contents(${phpQuote(BEACON_LOG)}, json_encode([
        'at' => microtime(true), 'method' => $_SERVER['REQUEST_METHOD'] ?? '', 'ua' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'type' => $_SERVER['CONTENT_TYPE'] ?? '', 'mode' => $_SERVER['HTTP_SEC_FETCH_MODE'] ?? '',
        'origin' => $_SERVER['HTTP_ORIGIN'] ?? '', 'cookie' => $_SERVER['HTTP_COOKIE'] ?? '', 'bytes' => strlen($body), 'body' => $body,
    ], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE) . "\\n", FILE_APPEND | LOCK_EX);
}
return require ${phpQuote(join(HERE, 'router.php'))};
`);

const server = spawn(PHP, [
    '-S', `127.0.0.1:${PORT}`, '-t', DOCROOT,
    '-d', 'display_errors=0', '-d', 'log_errors=1', '-d', `error_log=${join(WORK, 'php-error.log')}`,
    '-d', `sys_temp_dir=${WORK}`, ROUTER,
], { env: { ...process.env, TL_SECRETS_FILE: SECRETS, TL_ANALYTICS_DIR: DATA }, stdio: ['ignore', 'ignore', 'pipe'] });
let serverErr = '';
server.stderr.on('data', (d) => { serverErr += d; });

let browsers = [];
async function cleanup() {
    for (const b of browsers) await b.close().catch(() => {});
    server.kill('SIGTERM');
    if (!KEEP && failures.length === 0) rmSync(WORK, { recursive: true, force: true });
}

const pageErrors = [];
const LABELS = new Map(); // User-Agent → the run it belongs to

/** Every request that reached /api/hit.php, oldest first. */
function beacons() {
    if (!existsSync(BEACON_LOG)) return [];
    return readFileSync(BEACON_LOG, 'utf8').split('\n').filter(Boolean).map((line) => {
        const r = JSON.parse(line);
        let json = null;
        try { json = JSON.parse(r.body); } catch { json = null; }
        return {
            ...r, json, at: r.at * 1000,
            // Sec-Fetch-Mode: no-cors is sendBeacon's, cors a fetch's; browsers
            // send it only to secure origins (127.0.0.1 counts, the test host not).
            kind: { 'no-cors': 'sendBeacon', cors: 'fetch' }[r.mode] || 'unknown',
            label: LABELS.get(r.ua) || (/HeadlessChrome/.test(r.ua) ? 'headless-ua' : 'unknown'),
        };
    });
}
const beaconsOf = (label) => beacons().filter((b) => b.label === label);

/** A browser context whose beacons are labelled by its User-Agent. */
async function newContext(browser, options, label) {
    const ctx = await browser.newContext({ locale: 'en-GB', timezoneId: 'Europe/London', ...options });
    if (options.userAgent) LABELS.set(options.userAgent, label);
    ctx.on('page', (p) => p.on('pageerror', (e) => pageErrors.push(`${label}: ${e.message}`)));
    return ctx;
}
/** The page's visibility, the way a tab switch changes it (headless never does). */
async function setHidden(page, hidden) {
    await page.evaluate((h) => {
        if (h) Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
        else delete document.visibilityState;
        document.dispatchEvent(new Event('visibilitychange'));
    }, hidden);
}

/** An in-app navigation the way the router sees a link or the back button. */
async function appNavigate(page, path) {
    await page.evaluate((p) => {
        window.history.pushState({}, '', p);
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }, path);
}

/** Follow the magazine header's link to the Scriptorium (it lives behind the Menu button). */
async function toScriptorium(page) {
    const link = page.getByRole('link', { name: 'The Scriptorium' }).first();
    if (!(await link.isVisible())) await page.getByRole('button', { name: 'Open navigation' }).click();
    await link.click();
}

/** What the beacon should have reported as the page's facts. */
function domFacts(page) {
    return page.evaluate(() => {
        const meta = (s) => { const el = document.querySelector(s); return el ? el.getAttribute('content') : null; };
        const canon = document.querySelector('link[rel="canonical"]');
        return {
            title: document.title || null,
            description: meta('meta[name="description"]') || null,
            canonical: canon ? canon.href : null,
            robots: meta('meta[name="robots"]') || null,
            lang: document.documentElement.getAttribute('lang'),
            h1_count: document.getElementsByTagName('h1').length,
            og_title: document.querySelector('meta[property="og:title"]') ? 1 : 0,
            og_image: document.querySelector('meta[property="og:image"]') ? 1 : 0,
            img_no_alt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        };
    });
}

async function noStorage(page, ctx, label) {
    const s = await page.evaluate(() => ({
        cookie: document.cookie, local: Object.keys(localStorage), session: Object.keys(sessionStorage),
    }));
    const cookies = await ctx.cookies();
    check(`${label}: no cookies (document and jar)`, s.cookie === '' && cookies.length === 0, { cookie: s.cookie, cookies });
    check(`${label}: no localStorage or sessionStorage`, s.local.length === 0 && s.session.length === 0, s);
}

const near = (a, b, slack) => typeof a === 'number' && Math.abs(a - b) <= slack;

try {
    // Wait for the server.
    const ready = Date.now() + 10000;
    for (;;) {
        try {
            const r = await fetch(`${BASE}/robots.txt`);
            if (r.ok) break;
        } catch { /* not yet */ }
        if (Date.now() > ready) throw new Error(`php -S did not start on ${PORT}: ${serverErr}`);
        await sleep(150);
    }

    // Nothing leaves the machine: every name but the test host fails to
    // resolve, so a click out opens an error page instead of the real site.
    // (No page.route() anywhere: Playwright's interception would hold the
    // beacons a closing page sends, and they are part of what is tested.)
    const shared = ['--no-proxy-server', `--host-resolver-rules=MAP ${FAKE_HOST} 127.0.0.1, MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`];
    // `automated` is Playwright's usual browser: navigator.webdriver is true.
    const automated = await chromium.launch({ args: shared });
    // `person` hides automation, the way the CONTRACT describes for runs that
    // should look like a reader.
    const person = await chromium.launch({ args: [...shared, '--disable-blink-features=AutomationControlled'] });
    browsers = [automated, person];

    // ------------------------------------------------------------------
    section('Static: the beacon module');
    {
        const src = readFileSync(join(WEB, 'src/lib/analytics.js'), 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
        for (const [what, re] of [
            ['cookies', /document\.cookie/], ['localStorage', /localStorage/], ['sessionStorage', /sessionStorage/],
            ['IndexedDB', /indexedDB/i], ['DOM insertion', /appendChild|insertBefore|insertAdjacent|\.innerHTML|\.outerHTML|createElement|\.append\(|\.prepend\(/],
            ['a third-party URL', /https?:\/\//], ['an unload listener', /['"]unload['"]|['"]beforeunload['"]/],
        ]) check(`analytics.js uses no ${what}`, !re.test(src));
        check('analytics.js has no import (no dependencies)', !/^\s*import\s/m.test(src));
        check('analytics.js posts to /api/hit.php only', (src.match(/\/api\/[\w.]+/g) || []).every((u) => u === '/api/hit.php'));
    }

    // ------------------------------------------------------------------
    section('The gate, the module run on its own (a development build too)');
    {
        // Built twice, as Vite would for `vite` (DEV true) and `vite build`,
        // then run in a bare sandbox with a fake page around it.
        const esbuild = createRequire(join(WEB, 'package.json'))('esbuild');
        const bundle = (dev) => esbuild.buildSync({
            entryPoints: [join(WEB, 'src/lib/analytics.js')], bundle: true, format: 'iife', globalName: 'TA',
            write: false, define: { 'import.meta.env.DEV': dev ? 'true' : 'false' }, logLevel: 'silent',
        }).outputFiles[0].text;
        const code = { dev: bundle(true), prod: bundle(false) };
        const run = ({ dev = false, href, webdriver = false, ua = UA.desktop, prerendering = false, steps = [], perf = null }) => {
            const u = new URL(href);
            const sent = [];
            const on = [];
            const noop = () => {};
            const doc = {
                visibilityState: 'visible', prerendering, referrer: 'https://www.google.com/', title: 'A page',
                documentElement: { getAttribute: () => 'en', scrollHeight: 2000, clientHeight: 800, scrollTop: 0 },
                body: { scrollHeight: 2000 }, images: [], querySelector: () => null, getElementsByTagName: () => [],
                addEventListener: (type, fn) => on.push({ type, fn }),
            };
            const sandbox = {
                document: doc, location: { href, hostname: u.hostname, pathname: u.pathname, search: u.search, protocol: u.protocol },
                navigator: { userAgent: ua, webdriver, language: 'en-GB', sendBeacon: (url, blob) => { sent.push({ url, body: blob.text }); return true; } },
                screen: { width: 1920, height: 1080 }, innerWidth: 1280, innerHeight: 800, scrollY: 0,
                // Timers run at once: the pageview goes out inside the call.
                setTimeout: (fn) => { fn(); return 1; }, clearTimeout: noop,
                Blob: class { constructor(parts) { this.text = parts.join(''); this.size = Buffer.byteLength(this.text); } },
                URLSearchParams, URL, Intl, JSON, Math, Date, Number, String, Object, Array, Uint8Array,
                addEventListener: (type, fn) => on.push({ type, fn }),
            };
            if (perf) Object.assign(sandbox, perf(doc));
            sandbox.window = sandbox;
            vm.runInNewContext(`${dev ? code.dev : code.prod};globalThis.TA = TA;`, sandbox);
            sandbox.TA.pageChanged('POP');
            for (const step of steps) step(sandbox, on);
            return sent;
        };
        const fire = (type, event = {}) => (sb, on) => on.filter((l) => l.type === type).forEach((l) => l.fn({ type, ...event }));
        const kinds = (sent) => sent.map((x) => JSON.parse(x.body).type).join(',');
        check('a development build (import.meta.env.DEV) never sends, even with the door on 127.0.0.1', run({ dev: true, href: `http://127.0.0.1:3000/?${DOOR}` }).length === 0);
        check('production build, a reader on threemagipress.com: the pageview goes out', kinds(run({ href: 'https://threemagipress.com/books' })) === 'pageview');
        check('…to /api/hit.php, same origin', run({ href: 'https://threemagipress.com/books' })[0]?.url === '/api/hit.php');
        check('navigator.webdriver: nothing', run({ href: 'https://threemagipress.com/books', webdriver: true }).length === 0);
        check('navigator.webdriver with the door on the live host: nothing', run({ href: `https://threemagipress.com/books?${DOOR}`, webdriver: true }).length === 0);
        for (const host of ['127.0.0.1:4302', 'localhost:4302', '[::1]:4302']) {
            check(`the door opens on ${host}`, run({ href: `http://${host}/books?${DOOR}`, webdriver: true }).length === 1);
        }
        for (const href of [`http://127.0.0.1.example.com/books?${DOOR}`, `http://localhost.example.com/?${DOOR}`, `http://127.0.0.1/?${DOOR.replace('=1', '=yes')}`, `http://127.0.0.1/#${DOOR}`]) {
            check(`the door stays shut for ${href}`, run({ href, webdriver: true }).length === 0);
        }
        check('a HeadlessChrome User-Agent: nothing', run({ href: 'https://threemagipress.com/', ua: UA.desktop.replace('Chrome/', 'HeadlessChrome/') }).length === 0);
        check('Lighthouse (PageSpeed) User-Agent: nothing', run({ href: 'https://threemagipress.com/', ua: `${UA.desktop} Chrome-Lighthouse` }).length === 0);
        check('/admin: nothing', run({ href: 'https://threemagipress.com/admin' }).length === 0);
        check('/admin/…: nothing', run({ href: 'https://threemagipress.com/admin/anything' }).length === 0);
        check('not http(s) (a saved file): nothing', run({ href: 'file:///home/me/index.html' }).length === 0);
        check('a prerendered page waits until it is shown', run({ href: 'https://threemagipress.com/', prerendering: true }).length === 0
            && kinds(run({ href: 'https://threemagipress.com/', prerendering: true, steps: [(sb) => { sb.document.prerendering = false; }, fire('prerenderingchange')] })) === 'pageview');
        // (Timers run at once here, so the engage's one-second repeat shows up as a second engage.)
        const restored = run({ href: 'https://threemagipress.com/', steps: [fire('pagehide'), fire('pageshow', { persisted: true })] }).map((x) => JSON.parse(x.body));
        const restoredViews = restored.filter((e) => e.type === 'pageview');
        check('back from the back/forward cache: a new view, with no referrer of its own', /^pageview,(engage,)+pageview$/.test(restored.map((e) => e.type).join(','))
            && restoredViews[0].view !== restoredViews[1].view && restoredViews[1].ref === '', restored.map((e) => e.type));
        check('an ordinary pageshow is not a new view', kinds(run({ href: 'https://threemagipress.com/', steps: [fire('pageshow', { persisted: false })] })) === 'pageview');
        const landing = JSON.parse(run({ href: 'https://threemagipress.com/a/?utm_source=x' })[0].body);
        check('the landing carries document.referrer, its UTM tags, one trailing slash dropped', landing.ref === 'https://www.google.com/'
            && landing.utm_source === 'x' && landing.path === '/a' && !('ref_internal' in landing), landing);
        // A prerendered page: its vitals count from the moment it was shown.
        const nav = { type: 'navigate', activationStart: 0, responseStart: 600 };
        const perf = () => ({
            performance: { now: () => Date.now(), getEntriesByType: (t) => (t === 'navigation' ? [nav] : []) },
            PerformanceObserver: class {
                static supportedEntryTypes = ['paint', 'layout-shift'];
                constructor(cb) { this.cb = cb; }
                observe({ type }) {
                    const entries = type === 'paint' ? [{ name: 'first-contentful-paint', startTime: 900 }]
                        : [{ value: 0.05, startTime: 950, hadRecentInput: false }, { value: 0.5, startTime: 960, hadRecentInput: true }];
                    this.cb({ getEntries: () => entries });
                }
            },
        });
        const pre = run({
            href: 'https://threemagipress.com/', prerendering: true, perf,
            steps: [(sb) => { sb.document.prerendering = false; nav.activationStart = 500; }, fire('prerenderingchange'), fire('pagehide')],
        }).map((x) => JSON.parse(x.body)).find((e) => e.type === 'vitals');
        check('prerendered: vitals measured from activation, nav "prerender", CLS ignores shifts after input', pre && pre.nav === 'prerender'
            && pre.ttfb === 100 && pre.fcp === 400 && pre.lcp === null && pre.cls === 0.05, pre);
        const shiftless = run({ href: 'https://threemagipress.com/', steps: [fire('pagehide')] }).map((x) => JSON.parse(x.body));
        check('no PerformanceObserver here: no vitals beacon, nothing thrown', shiftless.every((e) => e.type !== 'vitals'), shiftless.map((e) => e.type));
    }

    // ------------------------------------------------------------------
    section('Desktop 1280 px: a landing from Google with UTM tags');
    const desk = await newContext(automated, {
        userAgent: UA.desktop, viewport: { width: 1280, height: 800 }, screen: { width: 1920, height: 1080 },
    }, 'desktop');
    const page = await desk.newPage();
    const tLand = Date.now();
    await page.goto(`${BASE}/?${DOOR}&utm_source=newsletter&utm_medium=email&utm_campaign=autumn-equinox`, {
        referer: 'https://www.google.com/search?q=three+magi+press',
    });
    check('the page under automation reports navigator.webdriver (the door is what lets the beacon in)', await page.evaluate(() => navigator.webdriver === true));
    const landView = (await waitFor('landing pageview stored', () => viewAt(UA.desktop, '/')[0])) || {};
    const firstPv = beaconsOf('desktop').find((b) => b.json && b.json.type === 'pageview');
    check('the landing pageview waits ~1.2 s for helmet (sent ≥ 1 s after navigation)', firstPv && firstPv.at - tLand >= 1000, firstPv && firstPv.at - tLand);
    const [deskSession] = sessionsOf(UA.desktop);
    check('one visit for the desktop reader', sessionsOf(UA.desktop).length === 1);
    check('visit: from search / Google, external referrer without its query', deskSession && deskSession.channel === 'search' && deskSession.source === 'Google'
        && deskSession.ref === 'www.google.com/search' && deskSession.ref_host === 'www.google.com', deskSession);
    check('visit: UTM source / medium / campaign from the landing URL', deskSession && deskSession.utm_source === 'newsletter'
        && deskSession.utm_medium === 'email' && deskSession.utm_campaign === 'autumn-equinox', deskSession);
    check('visit: landing "/" — the test flag and the query are not part of the path', deskSession && deskSession.landing === '/');
    check('visit: screen 1920×1080, viewport 1280, desktop, Chrome on Windows', deskSession && deskSession.screen_w === 1920
        && deskSession.screen_h === 1080 && deskSession.viewport_w === 1280 && deskSession.device === 'desktop'
        && deskSession.browser === 'Chrome' && deskSession.os === 'Windows', deskSession);
    check('visit: language en-GB, time zone Europe/London → GB', deskSession && deskSession.lang === 'en-GB'
        && deskSession.tz === 'Europe/London' && deskSession.country === 'GB', deskSession);
    check('visit: human, not owner, full IP (no GPC)', deskSession && deskSession.agent === 'human' && deskSession.owner === 0
        && deskSession.gpc === 0 && deskSession.ip === '127.0.0.1' && deskSession.ip_masked === 0, deskSession);
    check('landing pageview: seq 1, no previous path, external referrer on the view', landView.seq === 1 && landView.prev_path === null
        && landView.channel === 'search' && landView.ref_host === 'www.google.com' && landView.is_404 === 0, landView);
    const factsRow = sql('SELECT * FROM page_facts WHERE path = ?', ['/'])[0];
    const factsDom = await domFacts(page);
    check('page facts for "/" stored from the landing view', factsRow && factsRow.view_id === landView.view_id, factsRow);
    if (factsRow) {
        for (const k of Object.keys(factsDom)) {
            check(`page facts "/": ${k} matches the rendered page`, factsRow[k] === factsDom[k], { db: factsRow[k], dom: factsDom[k] });
        }
        check('page facts "/": helmet had set the title before they were read', typeof factsRow.title === 'string' && factsRow.title.length > 10, factsRow.title);
    }

    // Scroll to the foot, linger, then follow an in-app link.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await sleep(1500);
    const tLeftHome = Date.now();
    await page.locator('a[href="/third-lamp"]').filter({ hasText: 'Enter the Magazine' }).first().click();
    await page.waitForURL(`${BASE}/third-lamp`);
    const tEnterMag = Date.now();

    section('Desktop: in-app navigation');
    const magView = (await waitFor('pageview /third-lamp stored', () => viewAt(UA.desktop, '/third-lamp')[0])) || {};
    check('in-app pageview: seq 2, same visit, previous path "/", no external referrer', magView.seq === 2
        && magView.session_id === landView.session_id && magView.prev_path === '/' && magView.channel === null && magView.ref === null, magView);
    const homeEngaged = await waitFor('engage for "/" stored on the route change', () => {
        const v = viewAt(UA.desktop, '/')[0];
        return v && v.engaged_s !== null ? v : null;
    });
    if (homeEngaged) {
        const wall = (tLeftHome - tLand) / 1000;
        check('engage "/": visible seconds ≈ the time on the page', homeEngaged.engaged_s >= 2 && homeEngaged.engaged_s <= wall + 1, { engaged: homeEngaged.engaged_s, wall });
        check('engage "/": scrolled to the foot (≥ 95 %)', homeEngaged.scroll_pct >= 95, homeEngaged.scroll_pct);
    }

    section('Desktop: a hidden tab');
    await sleep(1500);
    const tHide = Date.now();
    await setHidden(page, true);
    const tHidden = Date.now();
    const magHidden = await waitFor('engage for /third-lamp sent when the page is hidden', () => {
        const v = viewAt(UA.desktop, '/third-lamp')[0];
        return v && v.engaged_s !== null ? v : null;
    });
    const vit = await waitFor('vitals for the landing sent on the first hide', () => rowsOf('vitals', UA.desktop)[0]);
    if (vit) {
        check('vitals: tied to the landing view and its path', vit.view_id === landView.view_id && vit.path === '/', vit);
        check('vitals: navigation type "navigate", desktop', vit.nav === 'navigate' && vit.device === 'desktop', vit);
        check('vitals: TTFB, FCP, LCP in ms (LCP ≥ FCP), CLS a number', Number.isInteger(vit.ttfb) && vit.ttfb >= 0
            && Number.isInteger(vit.fcp) && vit.fcp > 0 && Number.isInteger(vit.lcp) && vit.lcp >= vit.fcp
            && typeof vit.cls === 'number' && vit.cls >= 0, vit);
        check('vitals: INP absent or a duration', vit.inp === null || (Number.isInteger(vit.inp) && vit.inp >= 0), vit.inp);
    }
    await sleep(3000); // hidden time must not count
    const tShow = Date.now();
    await setHidden(page, false);
    const tShown = Date.now();
    await sleep(1200);

    section('Desktop: a click out to another site');
    const [popup] = await Promise.all([
        desk.waitForEvent('page'),
        page.locator('a[href^="https://www.instagram.com/"]').first().click(),
    ]);
    await popup.close();
    const out = await waitFor('outbound click stored', () => rowsOf('outbound', UA.desktop)[0]);
    check('outbound: target host only, and the path it was clicked from', out && out.host === 'www.instagram.com' && out.path === '/third-lamp', out);
    const outBeacon = beaconsOf('desktop').find((b) => b.json && b.json.type === 'outbound');
    check('outbound: the beacon carries no URL beyond the host', outBeacon && Object.keys(outBeacon.json).sort().join(',') === 'gpc,host,path,type', outBeacon && outBeacon.json);

    const tLeaveMag = Date.now();
    await toScriptorium(page);
    await page.waitForURL(`${BASE}/third-lamp/education`);
    const tLeftMag = Date.now();
    const eduView = (await waitFor('pageview /third-lamp/education stored', () => viewAt(UA.desktop, '/third-lamp/education')[0])) || {};
    check('Scriptorium pageview: seq 3, previous path /third-lamp', eduView.seq === 3 && eduView.prev_path === '/third-lamp', eduView);
    check('internal link clicks are not outbound', rowsOf('outbound', UA.desktop).length === 1);
    const magFinal = await waitFor('final engage for /third-lamp', () => {
        const v = viewAt(UA.desktop, '/third-lamp')[0];
        return v && magHidden && v.engaged_s >= magHidden.engaged_s && Date.now() - tLeaveMag > 1500 ? v : null;
    });
    if (magFinal) {
        // The view starts somewhere between the click and the new URL, and
        // ends between the next click starting and its URL: bound both ways.
        const least = ((tHide - tEnterMag) + (tLeaveMag - tShown)) / 1000;
        const most = ((tHidden - tLeftHome) + (tLeftMag - tShow)) / 1000;
        const wallLeast = (tLeaveMag - tEnterMag) / 1000;
        check('engage /third-lamp: visible time only — the 3 s hidden are not counted', most + 1 < wallLeast
            && magFinal.engaged_s >= Math.floor(least) - 1 && magFinal.engaged_s <= Math.ceil(most) + 1,
        { engaged: magFinal.engaged_s, least, most, wallLeast });
        check('engage /third-lamp: the hide sent a partial total first', magHidden.engaged_s >= 1 && magHidden.engaged_s <= magFinal.engaged_s, magHidden.engaged_s);
    }

    section('Desktop: same path, new hash or query — one view');
    await page.evaluate(() => {
        window.history.pushState({}, '', '/third-lamp/education?tab=halls#hebrew');
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    });
    await sleep(1800);
    check('a hash/query change on the same path is not a new pageview', viewAt(UA.desktop, '/third-lamp/education').length === 1);

    section('Desktop: the Scriptorium search');
    const box = page.getByRole('searchbox', { name: 'Search the Scriptorium' });
    await box.click();
    await box.pressSequentially('sefirah', { delay: 120 });
    await page.waitForFunction(() => /\d+\+? found/.test(document.getElementById('edu-search-status')?.textContent || ''));
    const shown = Number((await page.locator('#edu-search-status').textContent()).match(/(\d+)/)[1]);
    const s1 = await waitFor('search stored after a 1.5 s pause', () => rowsOf('searches', UA.desktop).find((r) => r.query === 'sefirah'), 6000);
    check('search: query, result count as shown, where it ran', s1 && s1.results === shown && shown > 0 && s1.path === '/third-lamp/education', { row: s1, shown });
    check('search: nothing stored for the keystrokes on the way (no pause)', rowsOf('searches', UA.desktop).length === 1, rowsOf('searches', UA.desktop).map((r) => r.query));
    await box.fill('');
    await box.pressSequentially('  QQXZV  ', { delay: 60 });
    await page.waitForFunction(() => /0 found/.test(document.getElementById('edu-search-status')?.textContent || ''));
    const tEnter = Date.now();
    await box.press('Enter');
    const s2 = await waitFor('submitted search stored at once', () => rowsOf('searches', UA.desktop).find((r) => r.query === 'qqxzv'), 3000);
    check('submitted search: trimmed, lower-cased, 0 results (a content gap), before the pause would end', s2 && s2.results === 0
        && Date.now() - tEnter < 2500, s2);
    await sleep(2200);
    check('submitted search: not stored twice when the pause timer would have fired', rowsOf('searches', UA.desktop).filter((r) => r.query === 'qqxzv').length === 1);
    const long = `${'Ab'.repeat(30)} ${'c'.repeat(60)}`;
    await box.fill(long);
    await page.waitForFunction(() => /\d+\+? found/.test(document.getElementById('edu-search-status')?.textContent || ''));
    await box.press('Enter');
    const s3 = await waitFor('a long query stored', () => rowsOf('searches', UA.desktop).find((r) => r.query.startsWith('abab')), 3000);
    check('a long query is capped at 80 characters', s3 && s3.query === long.toLowerCase().slice(0, 80), s3 && s3.query);

    section('Desktop: not found, reached in the app');
    await appNavigate(page, '/articles/no-such-essay');
    await page.getByText('This essay has not yet been catalogued.').waitFor();
    const nf1 = await waitFor('notfound stored for /articles/no-such-essay', () => rowsOf('notfound', UA.desktop).find((r) => r.path === '/articles/no-such-essay'));
    const nfView = await waitFor('its pageview marked as a 404', () => {
        const v = viewAt(UA.desktop, '/articles/no-such-essay')[0];
        return v && v.is_404 === 1 ? v : null;
    });
    check('notfound (in-app): referrer is the previous path, flagged internal', nf1 && nf1.ref === '/third-lamp/education' && nf1.ref_host === '(internal)', nf1);
    check('notfound (in-app): linked to its view, which came from the Scriptorium', nf1 && nfView && nf1.view_id === nfView.view_id
        && nfView.prev_path === '/third-lamp/education', { nf1, nfView });
    await noStorage(page, desk, 'desktop');

    section('Desktop: not found, landed on from another site');
    const page2 = await desk.newPage();
    await page2.goto(`${BASE}/no-such-page?${DOOR}`, { referer: 'https://example.org/links/reading.html?from=list' });
    const nf2 = await waitFor('notfound stored for the landing /no-such-page', () => rowsOf('notfound', UA.desktop).find((r) => r.path === '/no-such-page'));
    const nf2View = await waitFor('the landing 404 pageview stored', () => {
        const v = viewAt(UA.desktop, '/no-such-page')[0];
        return v && v.is_404 === 1 ? v : null;
    });
    check('notfound (landing): referrer is document.referrer, host and path without the query', nf2 && nf2.ref === 'example.org/links/reading.html'
        && nf2.ref_host === 'example.org', nf2);
    check('landing 404 pageview: same visit (30 min), external referrer on the view, no previous path', nf2View && nf2View.session_id === landView.session_id
        && nf2View.prev_path === null && nf2View.channel === 'other' && nf2View.ref_host === 'example.org', nf2View);
    check('the visit keeps the source it started with', sessionsOf(UA.desktop)[0].channel === 'search');
    check('the unmatched route still renders nothing visible', (await page2.evaluate(() => document.getElementById('root').innerText.trim())) === '');

    section('Desktop: leaving');
    await page.close();
    await page2.close();
    const nfEngaged = await waitFor('engage for the in-app 404 view sent on close', () => {
        const v = viewAt(UA.desktop, '/articles/no-such-essay')[0];
        return v && v.engaged_s !== null ? v : null;
    });
    check('engage on close: seconds and scroll recorded', nfEngaged && nfEngaged.engaged_s >= 0 && nfEngaged.scroll_pct !== null, nfEngaged);
    const vit2 = await waitFor('vitals for the second landing (the 404) sent on close', () => rowsOf('vitals', UA.desktop).find((r) => r.path === '/no-such-page'));
    check('vitals: one per landing (two landings, two rows, each its own view)', rowsOf('vitals', UA.desktop).length === 2
        && vit2 && vit2.view_id === nf2View.view_id, rowsOf('vitals', UA.desktop));
    const deskViews = viewsOf(UA.desktop);
    check('desktop: exactly the pages read, in order', deskViews.map((v) => v.path).join(' ') === '/ /third-lamp /third-lamp/education /articles/no-such-essay /no-such-page', deskViews.map((v) => v.path));
    await desk.close();

    // ------------------------------------------------------------------
    section('Phone 390 px: a redirect landing with a UTM source and no referrer');
    const phone = await newContext(automated, {
        userAgent: UA.phone, viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 },
        deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'fr-FR', timezoneId: 'Europe/Paris',
    }, 'phone');
    const mob = await phone.newPage();
    await mob.goto(`${BASE}/third-lamp/education/xx-unknown?${DOOR}&utm_source=mastodon`);
    await mob.waitForURL(`${BASE}/third-lamp/education`);
    const mLand = (await waitFor('phone landing pageview stored', () => viewAt(UA.phone, '/third-lamp/education')[0])) || {};
    const [mSession] = sessionsOf(UA.phone);
    check('redirect: only the page the reader saw is a view (the unknown hall redirected away)', viewsOf(UA.phone).length === 1
        && viewAt(UA.phone, '/third-lamp/education/xx-unknown').length === 0, viewsOf(UA.phone).map((v) => v.path));
    check('redirect: the view kept the landing\'s UTM source → Mastodon (social), direct referrer', mSession && mSession.landing === '/third-lamp/education'
        && mSession.utm_source === 'mastodon' && mSession.channel === 'social' && mSession.source === 'Mastodon' && mSession.ref === null, mSession);
    check('phone: mobile, Android, screen 390×844, viewport 390, fr-FR, Europe/Paris → FR', mSession && mSession.device === 'mobile'
        && mSession.os === 'Android' && mSession.screen_w === 390 && mSession.screen_h === 844 && mSession.viewport_w === 390
        && mSession.lang === 'fr-FR' && mSession.tz === 'Europe/Paris' && mSession.country === 'FR', mSession);
    check('phone: page facts for the Scriptorium recorded', sql('SELECT * FROM page_facts WHERE path = ?', ['/third-lamp/education'])[0]?.h1_count >= 1);

    await mob.evaluate(() => window.scrollTo(0, (document.documentElement.scrollHeight - window.innerHeight) / 2));
    await sleep(800);
    const mBox = mob.getByRole('searchbox', { name: 'Search the Scriptorium' });
    await mBox.tap();
    await mBox.pressSequentially('Haqq', { delay: 80 });
    await mob.waitForFunction(() => /\d+\+? found/.test(document.getElementById('edu-search-status')?.textContent || ''));
    const mShown = Number((await mob.locator('#edu-search-status').textContent()).match(/(\d+)/)[1]);
    await mBox.press('Enter');
    const ms = await waitFor('phone search stored', () => rowsOf('searches', UA.phone)[0], 3000);
    check('phone search: "haqq" with the count shown', ms && ms.query === 'haqq' && ms.results === mShown, { ms, mShown });

    const card = mob.locator('a.edu-hall-card').first();
    const hall = await card.getAttribute('href');
    await card.tap();
    await mob.waitForURL(`${BASE}${hall}`);
    const mHall = await waitFor('phone hall pageview stored', () => viewAt(UA.phone, hall)[0]);
    check('phone in-app pageview: previous path the Scriptorium', mHall && mHall.prev_path === '/third-lamp/education' && mHall.seq === 2, mHall);
    const mLandEngaged = await waitFor('phone landing engage stored', () => {
        const v = viewAt(UA.phone, '/third-lamp/education')[0];
        return v && v.engaged_s !== null ? v : null;
    });
    check('phone engage: scrolled about half way (30–90 %)', mLandEngaged && mLandEngaged.scroll_pct >= 30 && mLandEngaged.scroll_pct <= 90, mLandEngaged);

    await mob.goBack();
    await mob.waitForURL(`${BASE}/third-lamp/education`);
    await waitFor('back button: a new view of the Scriptorium', () => viewAt(UA.phone, '/third-lamp/education').length === 2);
    const back = viewAt(UA.phone, '/third-lamp/education')[1];
    check('back button: previous path is the hall', back && back.prev_path === hall, back);
    await sleep(1400);
    const xLink = mob.locator('a[href^="https://x.com/"]').first();
    await xLink.scrollIntoViewIfNeeded();
    const [mPopup] = await Promise.all([phone.waitForEvent('page'), xLink.tap()]);
    await mPopup.close();
    const mOut = await waitFor('phone outbound stored', () => rowsOf('outbound', UA.phone)[0]);
    check('phone outbound: x.com from the Scriptorium', mOut && mOut.host === 'x.com' && mOut.path === '/third-lamp/education', mOut);

    await appNavigate(mob, '/third-lamp/nowhere');
    const mNf = await waitFor('phone in-app 404 (unmatched route) stored', () => rowsOf('notfound', UA.phone)[0]);
    check('phone notfound: the unmatched route, referrer the previous path', mNf && mNf.path === '/third-lamp/nowhere'
        && mNf.ref === '/third-lamp/education' && mNf.ref_host === '(internal)', mNf);
    // Closing a view whose pageview has not gone out yet sends both beacons at
    // unload, and they may reach the server in either order (an engage before
    // its pageview is dropped). Let the pageview land first, as a reader
    // lingering a second would.
    await waitFor('phone 404 pageview stored and marked', () => viewAt(UA.phone, '/third-lamp/nowhere')[0]?.is_404 === 1);
    await noStorage(mob, phone, 'phone');
    await mob.close();
    const mVit = await waitFor('phone vitals sent on close', () => rowsOf('vitals', UA.phone)[0]);
    check('phone vitals: the landing view, mobile', mVit && mVit.view_id === mLand.view_id && mVit.path === '/third-lamp/education'
        && mVit.device === 'mobile' && mVit.fcp > 0, mVit);
    const mNfView = await waitFor('phone 404 view engaged on close', () => {
        const v = viewAt(UA.phone, '/third-lamp/nowhere')[0];
        return v && v.engaged_s !== null && v.is_404 === 1 ? v : null;
    });
    check('phone 404 view: marked and engaged', !!mNfView);
    await phone.close();

    // ------------------------------------------------------------------
    section('Gates');
    {
        const ctx = await newContext(automated, { userAgent: UA.webdriverNoDoor }, 'webdriver-no-door');
        const p = await ctx.newPage();
        await p.goto(`${BASE}/third-lamp`);
        await sleep(2000);
        await toScriptorium(p);
        await sleep(1800);
        await p.close();
        await sleep(600);
        await ctx.close();
        check('webdriver without the door: no beacon at all', beaconsOf('webdriver-no-door').length === 0, beaconsOf('webdriver-no-door').length);
        check('webdriver without the door: nothing stored', sessionsOf(UA.webdriverNoDoor).length === 0);
    }
    {
        const ctx = await newContext(automated, { userAgent: UA.doorFarHost }, 'door-far-host');
        const p = await ctx.newPage();
        await p.goto(`${FAKE_BASE}/?${DOOR}`);
        check('the far host is served by the same site', (await p.title()).length > 0);
        await sleep(2000);
        await p.close();
        await sleep(600);
        await ctx.close();
        check('the test door is ignored off localhost (webdriver on tl-beacon.test)', beaconsOf('door-far-host').length === 0 && sessionsOf(UA.doorFarHost).length === 0);
    }
    {
        const ctx = await newContext(person, { userAgent: UA.realFarHost }, 'person-far-host');
        const p = await ctx.newPage();
        await p.goto(`${FAKE_BASE}/third-lamp`);
        check('the non-automated browser reports no webdriver', await p.evaluate(() => navigator.webdriver === false));
        const v = await waitFor('a reader on a non-local host is counted without any flag', () => viewAt(UA.realFarHost, '/third-lamp')[0]);
        check('the reader on tl-beacon.test: pageview stored, direct', v && sessionsOf(UA.realFarHost)[0].channel === 'direct');
        await p.close();
        await ctx.close();
    }
    {
        const ctx = await newContext(person, {}, 'headless-ua');
        const p = await ctx.newPage();
        await p.goto(`${BASE}/third-lamp`);
        const ua = await p.evaluate(() => navigator.userAgent);
        await sleep(2000);
        await p.close();
        await sleep(600);
        await ctx.close();
        check('a headless User-Agent: no beacon (the browser says HeadlessChrome)', /HeadlessChrome/.test(ua) && beaconsOf('headless-ua').length === 0, ua);
    }
    {
        const ctx = await newContext(automated, { userAgent: UA.admin }, 'admin');
        const p = await ctx.newPage();
        await p.goto(`${BASE}/admin?${DOOR}`);
        await sleep(2200);
        check('/admin: no beacon while the dashboard is on screen', beaconsOf('admin').length === 0, beaconsOf('admin').map((b) => b.json));
        await appNavigate(p, '/books');
        const v = await waitFor('leaving /admin for a site page counts that page', () => viewAt(UA.admin, '/books')[0]);
        check('…referred internally from /admin, and /admin itself never stored', v && v.prev_path === '/admin'
            && sql("SELECT COUNT(*) AS n FROM pageviews WHERE path LIKE '/admin%'")[0].n === 0, v);
        await p.close();
        await sleep(800);
        check('/admin landing: no vitals (they would be the dashboard\'s)', rowsOf('vitals', UA.admin).length === 0);
        await ctx.close();
    }

    // ------------------------------------------------------------------
    section('Global Privacy Control');
    {
        const ctx = await newContext(automated, { userAgent: UA.gpc }, 'gpc');
        await ctx.addInitScript(() => Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { configurable: true, get: () => true }));
        const p = await ctx.newPage();
        await p.goto(`${BASE}/books?${DOOR}`);
        const s = await waitFor('the GPC visit is stored', () => sql('SELECT * FROM sessions WHERE gpc = 1 AND landing = ?', ['/books'])[0]);
        check('GPC: counted, IP masked before it was written, no raw User-Agent', s && s.ip === '127.0.0.0' && s.ip_masked === 1 && s.ua === '' && s.browser === 'Chrome', s);
        await p.close();
        await sleep(600);
        const gb = beaconsOf('gpc').filter((b) => b.json);
        check('GPC: every event says gpc: true', gb.length >= 1 && gb.every((b) => b.json.gpc === true), gb.map((b) => b.json.gpc));
        await ctx.close();
    }

    // ------------------------------------------------------------------
    section('Resilience');
    {
        const ctx = await newContext(automated, { userAgent: UA.fallback }, 'fallback');
        await ctx.addInitScript(() => {
            navigator.sendBeacon = () => { throw new Error('sendBeacon blocked by an extension'); };
            window.PerformanceObserver = undefined;
        });
        const p = await ctx.newPage();
        await p.goto(`${BASE}/third-lamp?${DOOR}`);
        const v = await waitFor('without sendBeacon the pageview still arrives (fetch keepalive)', () => viewAt(UA.fallback, '/third-lamp')[0]);
        const fb = beaconsOf('fallback').find((b) => b.json && b.json.type === 'pageview');
        check('fallback: a fetch, text/plain', v && fb && fb.kind === 'fetch' && fb.type.startsWith('text/plain'), fb && { kind: fb.kind, type: fb.type });
        await toScriptorium(p);
        await waitFor('fallback: the route change engages the first view', () => {
            const r = viewAt(UA.fallback, '/third-lamp')[0];
            return r && r.engaged_s !== null;
        });
        await p.close();
        await sleep(600);
        check('fallback: no PerformanceObserver → no vitals, and no error', rowsOf('vitals', UA.fallback).length === 0);
        await ctx.close();
    }
    {
        const ctx = await newContext(automated, { userAgent: UA.quick }, 'quick');
        const p = await ctx.newPage();
        await p.goto(`${BASE}/third-lamp?${DOOR}`);
        await waitFor('quick: landing stored', () => viewAt(UA.quick, '/third-lamp')[0]);
        await toScriptorium(p);
        await p.waitForURL(`${BASE}/third-lamp/education`);
        await sleep(300);
        await setHidden(p, true); // hidden before its pageview's 1.2 s were up
        const v = await waitFor('a view hidden at once: pageview flushed, engage re-sent a second later', () => {
            const r = viewAt(UA.quick, '/third-lamp/education')[0];
            return r && r.engaged_s !== null ? r : null;
        }, 5000);
        const eduTitle = await p.title();
        const pv = beaconsOf('quick').find((b) => b.json && b.json.type === 'pageview' && v && b.json.view === v.view_id);
        check('quick: a pageview flushed early carries no facts, or this page\'s own (never the previous page\'s)', pv
            && (!pv.json.facts || pv.json.facts.title === eduTitle), pv && pv.json.facts && { sent: pv.json.facts.title, page: eduTitle });
        await sleep(1600);
        const engages = beaconsOf('quick').filter((b) => b.json && b.json.type === 'engage' && v && b.json.view === v.view_id);
        check('quick: the engage went out twice (the repeat guards against arriving before its pageview)', engages.length === 2, engages.length);
        await p.close();
        await ctx.close();
    }
    {
        const ctx = await newContext(automated, { userAgent: UA.broken }, 'broken');
        await ctx.addInitScript(() => {
            navigator.sendBeacon = () => { throw new Error('no'); };
            window.fetch = () => Promise.reject(new TypeError('offline'));
            window.requestIdleCallback = () => { throw new Error('no idle'); };
            Object.defineProperty(window, 'crypto', { configurable: true, get: () => { throw new Error('no crypto'); } });
            Intl.DateTimeFormat = () => { throw new Error('no Intl'); };
        });
        const p = await ctx.newPage();
        const before = pageErrors.length;
        await p.goto(`${BASE}/?${DOOR}`);
        await sleep(1800);
        await p.locator('a[href="/third-lamp"]').filter({ hasText: 'Enter the Magazine' }).first().click();
        await p.waitForURL(`${BASE}/third-lamp`);
        await setHidden(p, true);
        await setHidden(p, false);
        check('broken browser APIs: the site still renders and navigates', await p.locator('h1').first().isVisible());
        check('broken browser APIs: nothing thrown into the page', pageErrors.length === before, pageErrors.slice(before));
        await p.close();
        await ctx.close();
    }

    // ------------------------------------------------------------------
    section('Every beacon');
    {
        const sent = beacons().filter((b) => b.label !== 'broken');
        const types = new Set(['pageview', 'engage', 'vitals', 'search', 'notfound', 'outbound']);
        check(`${sent.length} beacons, all POST`, sent.length > 20 && sent.every((b) => b.method === 'POST'));
        const local = sent.filter((b) => b.origin === BASE);
        check('all sent with navigator.sendBeacon, except where it was taken away', local.every((b) => b.kind === (b.label === 'fallback' ? 'fetch' : 'sendBeacon')),
            local.filter((b) => b.kind !== (b.label === 'fallback' ? 'fetch' : 'sendBeacon')).map((b) => [b.label, b.kind]));
        check('all from the page\'s own origin', sent.every((b) => [BASE, FAKE_BASE].includes(b.origin)), [...new Set(sent.map((b) => b.origin))]);
        check('no cookie rides along (visitors have none)', sent.every((b) => b.cookie === ''), sent.filter((b) => b.cookie).map((b) => b.cookie));
        check('every run accounted for', sent.every((b) => b.label !== 'unknown'), sent.filter((b) => b.label === 'unknown').map((b) => b.ua));
        check('all text/plain (no CORS preflight)', sent.every((b) => b.type.startsWith('text/plain')), sent.map((b) => b.type).filter((t) => !t.startsWith('text/plain')));
        check('all a JSON object with a known type', sent.every((b) => b.json && types.has(b.json.type)));
        check('all ≤ 4 KB', sent.every((b) => b.bytes > 0 && b.bytes <= 4096), Math.max(...sent.map((b) => b.bytes)));
        check('all carry a gpc boolean', sent.every((b) => typeof b.json.gpc === 'boolean'));
        const pvs = sent.filter((b) => b.json.type === 'pageview' || b.json.type === 'engage');
        check('pageview and engage carry a view id the server accepts', pvs.every((b) => /^[A-Za-z0-9_-]{8,40}$/.test(b.json.view)));
        const paths = sent.filter((b) => typeof b.json.path === 'string').map((b) => b.json.path);
        check('paths are pathnames: no query, no hash, never the test flag', paths.every((p) => p.startsWith('/') && !/[?#]/.test(p)));
        check('the test flag is never reported anywhere', sent.every((b) => !JSON.stringify(b.json).includes('tl_analytics_test')));
        const facts = sent.filter((b) => b.json.type === 'pageview' && b.json.facts);
        check('pageviews carry page facts', facts.length >= 5, facts.length);
        const utm = sent.filter((b) => b.json.utm_source);
        check('UTM tags only on landing views', utm.length === 2 && utm.every((b) => !b.json.ref_internal), utm.map((b) => b.json.path));
        const ids = sent.filter((b) => b.json.type === 'pageview').map((b) => b.json.view);
        check('every view id is unique', new Set(ids).size === ids.length);
    }
    check('no page error in any run', pageErrors.length === 0, pageErrors);
    const phpLog = existsSync(join(WORK, 'php-error.log')) ? readFileSync(join(WORK, 'php-error.log'), 'utf8') : '';
    check('no PHP warnings or errors', phpLog.trim() === '', phpLog.slice(0, 400));
} catch (e) {
    check('the run completed', false, e && e.stack ? e.stack : String(e));
} finally {
    await cleanup();
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
    console.log(`work dir kept: ${WORK}`);
    process.exit(1);
}
