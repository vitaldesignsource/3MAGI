#!/usr/bin/env node
/**
 * The whole analytics system end to end, from an EMPTY database: the built
 * site, the beacon, hit.php, crawl.php, admin.php and the /admin UI, with no
 * seeded data, so every figure on the dashboard can be traced to something
 * this script did.
 *
 *   cd apps/web && npm run build
 *   node --no-warnings apps/web/tests/analytics-e2e/system.e2e.mjs [--port=4305]
 *
 * 1. Serves dist/apps/web with `php -S` + tests/analytics-php/router.php
 *    (the .htaccess rules), THROWAWAY secrets (test-owner@example.test and a
 *    random password held in memory) and a data folder that does not exist yet.
 * 2. Six people read the site in Chromium, each from their own address (the
 *    router's loopback-only X-TL-Test-Client-IP hook), User-Agent, window,
 *    language and time zone: a Google landing, a newsletter link with UTM tags,
 *    a Reddit link and the Scriptorium search (one query that finds things,
 *    one that finds nothing), a ChatGPT link and a broken in-app link, a
 *    reader whose browser sends Global Privacy Control, and a broken link from
 *    another site. Their browser clocks are run forward (Playwright's clock),
 *    so the reading time the beacon reports is minutes long while the run
 *    takes about two; the server's own timestamps are real time.
 * 3. A fake Googlebot and GPTBot crawl with curl (robots.txt, sitemap.xml,
 *    llms.txt, pages, a HEAD, a missing asset).
 * 4. The owner signs in and reads two pages while signed in.
 * 5. The dashboard, at 1280 px and at 390 px: every section is checked
 *    against what the script did (the expected figures are worked out from
 *    the journeys, not read back) AND against direct SQL on the database AND
 *    against the API answer the UI rendered.
 * 6. The owner's pageviews are excluded (and counted with include_owner=1);
 *    the GPC visit is stored masked; with the data folder made unwritable
 *    (the server restarted without CAP_DAC_OVERRIDE, so root obeys file
 *    modes), crawl.php still serves the identical files with 200.
 *
 * Environment: TL_E2E_PORT (default 4305), TL_E2E_WORK (scratch folder),
 * PHP, PLAYWRIGHT_MODULE. Needs curl, and setpriv for step 6 (skipped, and
 * said so, without it).
 */

import { spawn, execFileSync, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(HERE, '../..');
const REPO = path.resolve(WEB, '../..');
const DIST = path.join(REPO, 'dist/apps/web');
const PHPDIR = path.join(WEB, 'tests/analytics-php');
const PHP = process.env.PHP || 'php';
const argPort = process.argv.find((a) => a.startsWith('--port='));
const PORT = Number(argPort ? argPort.slice(7) : (process.env.TL_E2E_PORT || 4305));
const BASE = `http://127.0.0.1:${PORT}`;
const WORK = process.env.TL_E2E_WORK || mkdtempSync(path.join(tmpdir(), 'tl-system-e2e-'));
const SHOTS = path.join(WORK, 'shots');
const DATA = path.join(WORK, 'data');                 // does not exist yet: a fresh, empty database
const DBFILE = path.join(DATA, 'analytics.sqlite');
const SECRETS = path.join(WORK, 'tl-secrets.php');
const PHPLOG = path.join(WORK, 'php-error.log');
const PHPTMP = path.join(WORK, 'php-tmp');            // rate-limit buckets of this run only
const PW_MODULE = process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const EMAIL = 'test-owner@example.test';
const PASSWORD = `sys-${randomBytes(12).toString('hex')}`; // throwaway, memory only
const ADMIN_TZ = 'Europe/London';
const ADMIN_LOCALE = 'en-GB';
const IP_HEADER = 'X-TL-Test-Client-IP';

// ------------------------------------------------------------- reporting ---

let passed = 0;
const failures = [];
const notes = [];
function check(name, ok, detail = '') {
    if (ok) {
        passed += 1;
        console.log(`  ok   ${name}`);
    } else {
        failures.push(name);
        const d = typeof detail === 'string' ? detail : JSON.stringify(detail);
        console.log(`  FAIL ${name}  ${String(d).slice(0, 700)}`);
    }
    return ok;
}
const section = (t) => console.log(`\n# ${t}`);
const note = (t) => { notes.push(t); console.log(`  note ${t}`); };
const sleep = (ms) => new Promise((r) => { setTimeout(r, ms); });
const canon = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) : x);
const same = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
const sortBy = (rows, ...keys) => [...rows].sort((x, y) => {
    for (const k of keys) {
        const [key, dir] = k.startsWith('-') ? [k.slice(1), -1] : [k, 1];
        if (x[key] < y[key]) return -dir;
        if (x[key] > y[key]) return dir;
    }
    return 0;
});

// ---------------------------------------------------------------- set-up ---

if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error(`No build at ${DIST}: run "npm run build" in apps/web first.`);
    process.exit(2);
}
if (existsSync(DATA)) {
    console.error(`${DATA} already exists: this test needs an empty data folder (use a new TL_E2E_WORK).`);
    process.exit(2);
}
mkdirSync(SHOTS, { recursive: true });
mkdirSync(PHPTMP, { recursive: true });
execFileSync(PHP, [path.join(PHPDIR, 'make-secrets.php'), SECRETS, EMAIL], { env: { ...process.env, TL_DEV_PASSWORD: PASSWORD }, stdio: 'pipe' });

let server = null;
function startServer({ capped = false } = {}) {
    const php = [PHP, '-S', `127.0.0.1:${PORT}`, '-t', DIST, '-d', 'display_errors=0', '-d', 'log_errors=1',
        '-d', `error_log=${PHPLOG}`, '-d', `sys_temp_dir=${PHPTMP}`, path.join(PHPDIR, 'router.php')];
    // capped: root without the capabilities that let it ignore file modes.
    const cmd = capped ? ['setpriv', '--bounding-set', '-dac_override,-dac_read_search,-fowner', '--', ...php] : php;
    server = spawn(cmd[0], cmd.slice(1), {
        env: { ...process.env, TL_SECRETS_FILE: SECRETS, TL_ANALYTICS_DIR: DATA },
        stdio: ['ignore', 'ignore', 'ignore'],
    });
}
async function stopServer() {
    if (!server || server.exitCode !== null || server.signalCode !== null) return;
    const gone = new Promise((r) => { server.once('exit', r); });
    server.kill('SIGTERM');
    await gone;
}
async function waitUp() {
    for (let i = 0; i < 100; i += 1) {
        try {
            const r = await fetch(`${BASE}/favicon.png`);
            if (r.ok) return;
        } catch { /* not yet */ }
        await sleep(100);
    }
    throw new Error(`server at ${BASE} did not start`);
}
process.on('exit', () => { try { server && server.kill(); } catch { /* gone */ } });

let dbh = null;
function db() {
    if (!dbh) dbh = new DatabaseSync(DBFILE);
    return dbh;
}
const q = (sql, ...p) => db().prepare(sql).all(...p).map((r) => ({ ...r }));
const q1 = (sql, ...p) => q(sql, ...p)[0];
const HUMAN = "agent = 'human' AND owner = 0";

async function waitFor(label, fn, timeout = 12000) {
    const until = Date.now() + timeout;
    let last;
    for (;;) {
        try {
            last = existsSync(DBFILE) ? fn() : null;
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

/** curl, as a crawler (or anyone) would: status, headers, body bytes. */
function curl(urlPath, { ua, ip, method = 'GET' } = {}) {
    const args = ['-s', '-S', '-D', '-', '-o', path.join(WORK, 'curl-body'), '-H', `User-Agent: ${ua}`];
    if (ip) args.push('-H', `${IP_HEADER}: ${ip}`);
    if (method === 'HEAD') args.push('-I');
    args.push(`${BASE}${urlPath}`);
    const r = spawnSync('curl', args, { encoding: 'utf8' });
    const raw = r.stdout || '';
    const lines = raw.split(/\r?\n/);
    const status = Number((/^HTTP\/[\d.]+ (\d+)/.exec(lines[0]) || [])[1] || 0);
    const headers = {};
    for (const l of lines.slice(1)) {
        const m = /^([^:]+):\s*(.*)$/.exec(l);
        if (m) headers[m[1].toLowerCase()] = m[2];
    }
    const body = method === 'HEAD' ? Buffer.alloc(0) : readFileSync(path.join(WORK, 'curl-body'));
    return { status, headers, body };
}

// --------------------------------------------------------- the visitors ---

const pw = (await import(PW_MODULE)).default;
const browser = await pw.chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] });
const pageErrors = [];

const UA = {
    ada: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    ben: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1',
    chie: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:143.0) Gecko/20100101 Firefox/143.0',
    dirk: 'Mozilla/5.0 (iPad; CPU OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1',
    eve: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    finn: 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36',
    owner: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    ownerPhone: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36',
    googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    gptbot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
    curlHuman: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0',
};

// Each person: who they are, and (filled in as they read) what they did.
const PEOPLE = [
    {
        key: 'ada', ua: UA.ada, ip: '203.0.113.10', stored: '203.0.113.10', lang: 'en-GB', tz: 'Europe/London', country: 'GB',
        viewport: { width: 1440, height: 900 }, screen: { width: 1920, height: 1080 }, device: 'desktop', browser: 'Chrome', os: 'Windows',
        channel: 'search', source: 'Google', refHost: 'www.google.com',
    },
    {
        key: 'ben', ua: UA.ben, ip: '198.51.100.23', stored: '198.51.100.23', lang: 'en-US', tz: 'America/New_York', country: 'US',
        viewport: { width: 390, height: 664 }, screen: { width: 390, height: 844 }, mobile: true, dpr: 3, device: 'mobile', browser: 'Safari', os: 'iOS',
        channel: 'other', source: 'newsletter', utm: { source: 'newsletter', medium: 'email', campaign: 'equinox' },
    },
    {
        key: 'chie', ua: UA.chie, ip: '2001:db8:85a3::8a2e:370:7334', stored: '2001:db8:85a3::8a2e:370:7334', lang: 'ja-JP', tz: 'Asia/Tokyo', country: 'JP',
        viewport: { width: 1280, height: 800 }, screen: { width: 1512, height: 982 }, device: 'desktop', browser: 'Firefox', os: 'macOS',
        channel: 'social', source: 'Reddit', refHost: 'www.reddit.com',
    },
    {
        key: 'dirk', ua: UA.dirk, ip: '192.0.2.44', stored: '192.0.2.44', lang: 'de-DE', tz: 'Europe/Berlin', country: 'DE',
        viewport: { width: 820, height: 1180 }, screen: { width: 820, height: 1180 }, mobile: true, dpr: 2, device: 'tablet', browser: 'Safari',
        channel: 'ai', source: 'ChatGPT', refHost: 'chatgpt.com',
    },
    {
        key: 'eve', ua: UA.eve, ip: '203.0.113.77', stored: '203.0.113.0', gpc: true, lang: 'fr-FR', tz: 'Europe/Paris', country: 'FR',
        viewport: { width: 1366, height: 768 }, screen: { width: 1366, height: 768 }, device: 'desktop', browser: 'Chrome', os: 'Linux',
        channel: 'direct', source: 'Direct',
    },
    {
        key: 'finn', ua: UA.finn, ip: '198.51.100.200', stored: '198.51.100.200', lang: 'en-AU', tz: 'Australia/Sydney', country: 'AU',
        viewport: { width: 412, height: 839 }, screen: { width: 412, height: 915 }, mobile: true, dpr: 2.625, device: 'mobile', browser: 'Chrome', os: 'Android',
        channel: 'other', source: 'example.org', refHost: 'example.org',
    },
];
for (const p of PEOPLE) Object.assign(p, { pages: [], searches: [], notfound: [] });
// The owner's browsers keep the loopback address: the test header would also
// go to the web-font host, whose CORS preflight refuses unknown headers.
const OWNER = { ip: '127.0.0.1', pages: [] };

async function personContext(p) {
    const ctx = await browser.newContext({
        userAgent: p.ua, viewport: p.viewport, screen: p.screen, isMobile: !!p.mobile, hasTouch: !!p.mobile,
        deviceScaleFactor: p.dpr || 1, locale: p.lang, timezoneId: p.tz, extraHTTPHeaders: { [IP_HEADER]: p.ip },
    });
    if (p.gpc) {
        await ctx.addInitScript(() => Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { configurable: true, get: () => true }));
    }
    await ctx.clock.install();
    const page = await ctx.newPage();
    page.on('pageerror', (e) => pageErrors.push(`${p.key}: ${e.message}`));
    return { ctx, page };
}

/** An in-app navigation as the router sees a link or the back button. */
async function appNavigate(page, to) {
    await page.evaluate((x) => {
        window.history.pushState({}, '', x);
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }, to);
}

/** Follow an in-app link to `href` (a real click when one is on screen). */
async function follow(page, href) {
    const link = page.locator(`a[href="${href}"]`).filter({ visible: true }).first();
    let clicked = false;
    if (await link.count()) {
        try {
            await link.click({ timeout: 5000 });
            clicked = true;
        } catch { /* covered or moving: navigate as the router would */ }
    }
    if (!clicked) await appNavigate(page, href);
    await page.waitForURL((u) => u.pathname === href, { timeout: 10000 });
    return clicked;
}

/** The reader stays on the page: the pageview goes out (real time), then the clock runs on. */
async function read(p, page, seconds, { notFound = false, scroll = 0 } = {}) {
    const here = new URL(page.url()).pathname;
    await sleep(1800); // the beacon sends ~1.2 s after the route change, once the route settles
    const stored = await waitFor(`${p.key}: pageview ${here} stored`, () => q1(
        'SELECT p.* FROM pageviews p JOIN sessions s ON s.id = p.session_id WHERE s.ip = ? AND p.path = ? ORDER BY p.id DESC LIMIT 1', p.stored, here,
    ));
    if (scroll) {
        // At once, not smoothly: a smooth scroll still running when the clock
        // jumps would leave the depth wherever the animation had got to.
        await page.evaluate((f) => window.scrollTo({ top: Math.round((document.documentElement.scrollHeight - window.innerHeight) * f), behavior: 'instant' }), scroll);
        await sleep(400);
    }
    if (seconds) await page.clock.fastForward(seconds * 1000);
    p.pages.push({ path: here, notFound, seconds, viewId: stored && stored.view_id });
    return stored;
}

async function leave(p, ctx, page) {
    await page.close(); // pagehide: the last engage and the landing's vitals
    await sleep(700);
    await ctx.close();
}

async function journeys() {
    section('people read the site (one address, browser, window, language and time zone each)');
    const t0 = Date.now();

    // Ada: from Google to the home page, the magazine, then an essay read to the end.
    {
        const p = PEOPLE[0];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/`, { referer: 'https://www.google.com/' });
        await read(p, page, 40);
        await follow(page, '/third-lamp');
        await read(p, page, 30, { scroll: 0.4 });
        // A link out to another site (the visit to it is stopped here; the click is what counts).
        await page.evaluate(() => window.addEventListener('click', (e) => {
            const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (a && a.host !== window.location.host) e.preventDefault();
        }, true));
        const out = page.locator('a[href^="https://"]').filter({ visible: true }).first();
        p.outbound = { host: new URL(await out.getAttribute('href')).hostname, path: '/third-lamp' };
        await out.click();
        await waitFor('ada: the outbound click stored', () => q1('SELECT * FROM outbound'));
        const essay = await page.locator('a[href^="/articles/"]').filter({ visible: true }).first().getAttribute('href');
        await follow(page, essay);
        await read(p, page, 150, { scroll: 0.9 });
        p.essay = essay;
        await leave(p, ctx, page);
    }
    // Ben: a newsletter link (UTM tags, no referrer) on an iPhone; one page.
    {
        const p = PEOPLE[1];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/books?utm_source=newsletter&utm_medium=email&utm_campaign=equinox`);
        await read(p, page, 25, { scroll: 0.3 });
        await leave(p, ctx, page);
    }
    // Chie: from Reddit to the Scriptorium; two searches; on to one hall.
    {
        const p = PEOPLE[2];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/third-lamp/education`, { referer: 'https://www.reddit.com/r/occult/comments/abc123/scriptorium/' });
        await read(p, page, 20);
        const box = page.getByRole('searchbox', { name: 'Search the Scriptorium' });
        await box.click();
        await box.pressSequentially('hebrew', { delay: 90 });
        await page.waitForFunction(() => /\d+\+? found/.test(document.getElementById('edu-search-status')?.textContent || ''));
        const found = Number((await page.locator('#edu-search-status').textContent()).match(/(\d+)/)[1]);
        await sleep(2200); // the reader pauses on it: the query is sent after 1.5 s
        p.searches.push({ query: 'hebrew', results: found });
        await box.fill('');
        await box.pressSequentially('qqxzv', { delay: 90 });
        await page.waitForFunction(() => /^0 found|\b0 found/.test(document.getElementById('edu-search-status')?.textContent || ''));
        await box.press('Enter');
        p.searches.push({ query: 'qqxzv', results: 0 });
        await waitFor('chie: both searches stored', () => q('SELECT * FROM searches').length === 2);
        await box.fill('');
        await follow(page, '/third-lamp/education/hebrew');
        await read(p, page, 60, { scroll: 0.5 });
        await leave(p, ctx, page);
    }
    // Dirk: from ChatGPT to the Powers on an iPad, one door, then a broken in-app link.
    {
        const p = PEOPLE[3];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/powers`, { referer: 'https://chatgpt.com/' });
        await read(p, page, 20);
        await follow(page, '/powers/hierarchies');
        await read(p, page, 45, { scroll: 0.6 });
        await appNavigate(page, '/old-catalogue');
        await page.waitForURL((u) => u.pathname === '/old-catalogue');
        await read(p, page, 5, { notFound: true });
        p.notfound.push({ path: '/old-catalogue', ref: '/powers/hierarchies' });
        await leave(p, ctx, page);
    }
    // Eve: Global Privacy Control on; typed the address; home, then Christianities.
    {
        const p = PEOPLE[4];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/`);
        await read(p, page, 15);
        await follow(page, '/christianities');
        await read(p, page, 35, { scroll: 0.5 });
        await leave(p, ctx, page);
    }
    // Finn: a broken link on another site lands on a page that does not exist.
    {
        const p = PEOPLE[5];
        const { ctx, page } = await personContext(p);
        await page.goto(`${BASE}/no-such-page`, { referer: 'https://example.org/links/reading.html?from=list' });
        await read(p, page, 3, { notFound: true });
        p.notfound.push({ path: '/no-such-page', ref: 'example.org/links/reading.html' });
        await leave(p, ctx, page);
    }
    const simulated = PEOPLE.reduce((a, p) => a + p.pages.reduce((b, v) => b + v.seconds, 0), 0);
    note(`browsing took ${Math.round((Date.now() - t0) / 1000)} s of real time; the readers' clocks ran ${Math.round(simulated / 60)} min of reading`);
}

// ------------------------------------------------------------ crawlers ---

const CRAWLS = [];
function crawlerRun() {
    section('crawlers (curl): Googlebot and GPTBot');
    const index = readFileSync(path.join(DIST, 'index.html'));
    const files = {
        '/robots.txt': [readFileSync(path.join(DIST, 'robots.txt')), /^text\/plain/, 'no-cache', 'robots'],
        '/sitemap.xml': [readFileSync(path.join(DIST, 'sitemap.xml')), /^application\/xml/, 'no-cache', 'sitemap'],
        '/llms.txt': [readFileSync(path.join(DIST, 'llms.txt')), /^text\/plain/, undefined, 'llms'],
    };
    const plan = [
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/robots.txt'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/sitemap.xml'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/books'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/third-lamp/education'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'GET', '/articles/the-stars-of-the-dead'],
        ['googlebot', '66.249.66.1', 'Googlebot', 'HEAD', '/powers'],
        ['gptbot', '20.171.207.10', 'GPTBot', 'GET', '/robots.txt'],
        ['gptbot', '20.171.207.10', 'GPTBot', 'GET', '/llms.txt'],
        ['gptbot', '20.171.207.10', 'GPTBot', 'GET', '/'],
        ['gptbot', '20.171.207.10', 'GPTBot', 'GET', '/powers/hierarchies'],
    ];
    for (const [who, ip, bot, method, p] of plan) {
        const r = curl(p, { ua: UA[who], ip, method });
        const [bytes, type, cache, kind] = files[p] || [index, /^text\/html/, 'no-cache', 'page'];
        const okBody = method === 'HEAD' ? true : Buffer.compare(r.body, bytes) === 0;
        check(`${bot} ${method} ${p}: 200, the real file's bytes, ${type.source.slice(1)}, Cache-Control ${cache || 'none'}`,
            r.status === 200 && okBody && type.test(r.headers['content-type'] || '') && r.headers['cache-control'] === cache,
            { status: r.status, okBody, type: r.headers['content-type'], cache: r.headers['cache-control'] });
        CRAWLS.push({ bot, ip, method, path: p, kind });
    }
    const miss = curl('/assets/no-such-chunk-123.js', { ua: UA.googlebot, ip: '66.249.66.1' });
    check('Googlebot asking for a missing asset gets the plain 404 (not the app, not logged)', miss.status === 404, miss.status);
    const person = curl('/books', { ua: UA.curlHuman, ip: '198.51.100.99' });
    check('a person (non-crawler UA) gets the app shell from the static rule, not crawl.php', person.status === 200
        && Buffer.compare(person.body, index) === 0, person.status);
}

// ---------------------------------------------------------- the owner ---

async function signIn(page) {
    await page.goto(`${BASE}/admin`);
    await page.waitForSelector('#adm-email');
    await page.fill('#adm-email', EMAIL);
    await page.fill('#adm-password', PASSWORD);
    await page.click('.adm-login button[type=submit]');
    await page.waitForSelector('.adm-tabs');
}

async function ownerContext() {
    const ctx = await browser.newContext({
        userAgent: UA.owner, viewport: { width: 1280, height: 900 }, locale: ADMIN_LOCALE, timezoneId: ADMIN_TZ,
    });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => pageErrors.push(`owner: ${e.message}`));
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    return { ctx, page, errors };
}

async function ownerBrowses(page) {
    section('the owner, signed in, reads two pages');
    await page.goto(`${BASE}/`);
    await sleep(2200);
    await waitFor('owner: home pageview stored, flagged owner', () => q1("SELECT * FROM pageviews WHERE owner = 1 AND path = '/'"));
    await follow(page, '/books');
    await sleep(2200);
    await waitFor('owner: /books pageview stored, flagged owner', () => q1("SELECT * FROM pageviews WHERE owner = 1 AND path = '/books'"));
    OWNER.pages = ['/', '/books'];
    await page.goto(`${BASE}/admin`); // leaving /books: its engage goes out with the cookie
    await page.waitForSelector('.adm-tabs');
    await sleep(800);
    const s = q('SELECT * FROM sessions WHERE owner = 1');
    check('owner: one visit, two pageviews, all flagged owner = 1', s.length === 1 && s[0].pageviews === 2
        && q1('SELECT COUNT(*) AS n FROM pageviews WHERE owner = 1').n === 2, s);
    check('owner: the /admin pages themselves sent nothing', q1("SELECT COUNT(*) AS n FROM pageviews WHERE path LIKE '/admin%'").n === 0);
}

// ----------------------------------------------- dashboard UI helpers ---

function recordApi(page) {
    const seen = new Map();
    page.on('response', async (r) => {
        const u = r.url();
        if (!u.includes('/api/admin.php')) return;
        const sp = new URL(u).searchParams;
        const key = [sp.get('a'), sp.get('section')].filter(Boolean).join(':');
        try {
            if ((r.headers()['content-type'] || '').includes('json')) seen.set(key, { url: u, status: r.status(), body: await r.json() });
        } catch { /* body gone */ }
    });
    return seen;
}
async function settle(page) {
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => !document.querySelector('.adm-loadable.is-loading, .adm-loading'), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(200);
}
async function view(page, query) {
    await page.goto(`${BASE}/admin?${query}`);
    await page.waitForSelector('.adm-tabs');
    await settle(page);
}
const num = (t) => Number(String(t).replace(/[,\s%]/g, '').replace('−', '-'));
function seconds(text) {
    let s = 0;
    const h = /(\d+)\s*h/.exec(text);
    const m = /(\d+)\s*m(?!s)/.exec(text);
    const sec = /(\d+)\s*s/.exec(text);
    if (h) s += 3600 * Number(h[1]);
    if (m) s += 60 * Number(m[1]);
    if (sec) s += Number(sec[1]);
    return s;
}
const kpis = (page, scope = '') => page.$$eval(`${scope} .adm-kpis .adm-kpi`, (els) => Object.fromEntries(els.map((e) => [
    e.querySelector('.adm-kpi-label').textContent.trim(), e.querySelector('.adm-kpi-value').textContent.trim(),
])));
const rankRows = (page, id) => page.$$eval(`[aria-labelledby="${id}-h"] table.adm-rank tbody tr`, (trs) => trs.map((tr) => {
    const td = tr.querySelectorAll('td');
    return { label: td[0].querySelector('.adm-rank-label').textContent.trim(), value: td[1].textContent.trim(), second: td[2] ? td[2].textContent.trim() : null };
}));
const dataRows = (page, id) => page.$$eval(`[aria-labelledby="${id}-h"] table.adm-table tbody tr`, (trs) => trs.map((tr) => {
    const o = {};
    tr.querySelectorAll('td').forEach((td) => { o[td.getAttribute('data-label') || '*'] = td.textContent.trim(); });
    return o;
}));
const cardText = (page, id) => page.textContent(`[aria-labelledby="${id}-h"]`);

async function overflow(page) {
    return page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad = [];
        if (document.documentElement.scrollWidth > vw + 1) bad.push(`document ${document.documentElement.scrollWidth} > ${vw}`);
        for (const el of document.querySelectorAll('.adm *')) {
            if (el.closest('.adm-sr')) continue;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height || (r.right <= vw + 1 && r.left >= -1)) continue;
            let a = el.parentElement;
            let contained = false;
            while (a && a !== document.body) {
                if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(a).overflowX)) {
                    const ar = a.getBoundingClientRect();
                    if (ar.right <= vw + 1 && ar.left >= -1) { contained = true; break; }
                }
                a = a.parentElement;
            }
            if (!contained) bad.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${Math.round(r.left)}..${Math.round(r.right)}`);
            if (bad.length > 6) break;
        }
        for (const td of document.querySelectorAll('.adm td, .adm th')) {
            if (td.closest('.adm-sr')) continue;
            const head = td.closest('thead');
            if (head && getComputedStyle(head).position === 'absolute') continue;
            if (td.scrollWidth > td.clientWidth + 2) bad.push(`cell overflow: "${td.textContent.trim().slice(0, 40)}" ${td.scrollWidth} > ${td.clientWidth}`);
            if (bad.length > 10) break;
        }
        return bad;
    });
}
async function shot(page, name) {
    await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

// ---------------------------------------------------- expected figures ---

const humans = () => PEOPLE;
function expected() {
    const views = [];
    for (const p of humans()) p.pages.forEach((v, i) => views.push({ ...v, who: p.key, entry: i === 0, exit: i === p.pages.length - 1 }));
    const byPath = new Map();
    for (const v of views) {
        const r = byPath.get(v.path) || { path: v.path, views: 0, visitors: new Set(), entries: 0, exits: 0, notFound: v.notFound };
        r.views += 1;
        r.visitors.add(v.who);
        if (v.entry) r.entries += 1;
        if (v.exit) r.exits += 1;
        byPath.set(v.path, r);
    }
    const pages = [...byPath.values()].map((r) => ({ ...r, visitors: r.visitors.size }));
    const count = (key) => {
        const m = new Map();
        for (const p of humans()) m.set(p[key], (m.get(p[key]) || 0) + 1);
        return Object.fromEntries([...m.entries()].sort());
    };
    const visits = humans().length;
    const bounces = humans().filter((p) => p.pages.length === 1).length;
    return {
        visitors: visits, visits, pageviews: views.length, bounces,
        vpv: Math.round((views.length / visits) * 100) / 100,
        bounce: Math.round((bounces * 1000) / visits) / 10,
        pages, views,
        channels: count('channel'), sources: count('source'), countries: count('country'), devices: count('device'),
        browsers: count('browser'), langs: count('lang'),
        searches: humans().flatMap((p) => p.searches),
        notfound: humans().flatMap((p) => p.notfound),
    };
}
const tally = (rows, key, val = 'visits') => Object.fromEntries(rows.map((r) => [r[key], r[val]]).sort());

// ======================================================= the dashboard ===

async function dashboardDesktop(page, api, E) {
    section('dashboard, 1280 px: Overview');
    await view(page, 'range=today');
    await shot(page, 'd01-overview');
    const ov = api.get('stats:overview').body;
    const r = ov.range;
    const sql = {
        visitors: q1(`SELECT COUNT(DISTINCT visitor) AS n FROM pageviews WHERE ts >= ? AND ts < ? AND ${HUMAN}`, r.from, r.to).n,
        pageviews: q1(`SELECT COUNT(*) AS n FROM pageviews WHERE ts >= ? AND ts < ? AND ${HUMAN}`, r.from, r.to).n,
        ...q1(`SELECT COUNT(*) AS visits, SUM(pageviews = 1) AS bounces, AVG(last_ts - start_ts) AS avg FROM sessions WHERE start_ts >= ? AND start_ts < ? AND ${HUMAN}`, r.from, r.to),
    };
    const k = ov.kpis;
    check(`overview: visitors = ${E.visitors} people (SQL ${sql.visitors}, API ${k.visitors.value})`, k.visitors.value === E.visitors && sql.visitors === E.visitors);
    check(`overview: visits = ${E.visits} (SQL ${sql.visits}, API ${k.visits.value})`, k.visits.value === E.visits && sql.visits === E.visits);
    check(`overview: pageviews = ${E.pageviews} pages read (SQL ${sql.pageviews}, API ${k.pageviews.value})`, k.pageviews.value === E.pageviews && sql.pageviews === E.pageviews);
    check(`overview: views per visit ${E.vpv}`, Math.abs(k.views_per_visit.value - E.vpv) < 0.006, k.views_per_visit);
    check(`overview: bounce rate ${E.bounce}% (${E.bounces} one-page visits)`, Math.abs(k.bounce_rate.value - E.bounce) < 0.06 && sql.bounces === E.bounces, k.bounce_rate);
    check(`overview: average visit = SQL (${Math.round(sql.avg)} s)`, k.avg_visit_s.value === Math.round(sql.avg), k.avg_visit_s);
    check('overview: nothing before today (previous period empty)', k.visits.previous === 0 && k.pageviews.previous === 0);
    const ui = await kpis(page);
    check('overview UI: the KPI tiles show the API figures', num(ui.Visitors) === E.visitors && num(ui.Visits) === E.visits && num(ui.Pageviews) === E.pageviews
        && Math.abs(num(ui['Views per visit']) - E.vpv) < 0.006 && Math.abs(num(ui['Bounce rate']) - E.bounce) < 0.06 && seconds(ui['Average visit']) === k.avg_visit_s.value, ui);
    const liveSql = q1(`SELECT COUNT(DISTINCT visitor) AS n FROM sessions WHERE last_ts >= ? AND ${HUMAN}`, ov.range.to - 1 - 300).n;
    check(`overview: live now = SQL (${liveSql} active in the last 5 min)`, ov.live.visitors === liveSql && num(ui['Live now']) === liveSql, { api: ov.live, ui: ui['Live now'] });
    check('overview: hourly chart for today, every pageview in it', ov.series.granularity === 'hour'
        && ov.series.points.reduce((a, pt) => a + pt.pageviews, 0) === E.pageviews, ov.series.points.filter((pt) => pt.pageviews));

    const topE = sortBy(E.pages, '-views', 'path').slice(0, 10).map((x) => [x.path, x.views, x.visitors]);
    const topApi = ov.top_pages.map((x) => [x.path, x.views, x.visitors]);
    check('overview: top pages = the pages read (views, visitors)', same(sortBy(topApi.map(([a, b, c]) => ({ a, b, c })), '-b', 'a'), sortBy(topE.map(([a, b, c]) => ({ a, b, c })), '-b', 'a')), { api: topApi, expected: topE });
    const topUi = (await rankRows(page, 'ov-pages')).map((x) => [x.label, num(x.value), num(x.second)]);
    check('overview UI: top pages as the API gave them', same(topUi, topApi), { ui: topUi, api: topApi });
    const srcApi = tally(ov.top_sources, 'name');
    check('overview: top sources = Google, Reddit, ChatGPT, newsletter, example.org, Direct (one visit each)', same(srcApi, E.sources), { api: srcApi, expected: E.sources });
    const srcUi = (await rankRows(page, 'ov-sources')).map((x) => [x.label, num(x.value)]);
    check('overview UI: top sources as the API gave them', same(srcUi, ov.top_sources.map((x) => [`${{ search: 'Search', social: 'Social', ai: 'AI', other: 'Site', direct: 'Direct' }[x.channel]}${x.name}`, x.visits])), srcUi);
    const ctyApi = tally(ov.top_countries, 'country');
    check('overview: countries from the time zones (GB, US, JP, DE, FR, AU)', same(ctyApi, E.countries), { api: ctyApi, expected: E.countries });
    const ctyUi = (await rankRows(page, 'ov-countries')).map((x) => x.label);
    check('overview UI: countries by code and name', ['GBUnited Kingdom', 'USUnited States', 'JPJapan', 'DEGermany', 'FRFrance', 'AUAustralia'].every((n) => ctyUi.includes(n)) && ctyUi.length === 6, ctyUi);
    check('overview: owner, bot and headless pageviews are excluded and counted apart', ov.excluded.owner_pageviews === OWNER.pages.length
        && ov.excluded.bot_pageviews === 0 && ov.excluded.headless_pageviews === 0, ov.excluded);
    const foot = await page.textContent('.adm-footnote');
    check('overview UI: says how many of your own pageviews were left out', foot.includes(`${OWNER.pages.length} of your own pageviews`), foot);

    // ------------------------------------------------------------ Pages
    section('dashboard, 1280 px: Pages');
    await view(page, 'v=pages&range=today');
    await shot(page, 'd02-pages');
    const pg = api.get('stats:pages').body;
    check(`pages: ${E.pages.length} distinct pages`, pg.total_pages === E.pages.length && (await page.textContent('#pg-all-h')).includes(String(E.pages.length)), pg.total_pages);
    const pgApi = sortBy(pg.pages.map((x) => ({ path: x.path, views: x.views, visitors: x.visitors, entries: x.entries, exits: x.exits, nf: x.not_found })), 'path');
    const pgE = sortBy(E.pages.map((x) => ({ path: x.path, views: x.views, visitors: x.visitors, entries: x.entries, exits: x.exits, nf: x.notFound })), 'path');
    check('pages: views, visitors, entries, exits and 404 flag per page = the journeys', same(pgApi, pgE), { api: pgApi, expected: pgE });
    const eng = q(`SELECT path, AVG(engaged_s) AS e, AVG(scroll_pct) AS s FROM pageviews WHERE ts >= ? AND ts < ? AND ${HUMAN} GROUP BY path`, pg.range.from, pg.range.to);
    const engOk = eng.every((row) => {
        const a = pg.pages.find((x) => x.path === row.path);
        return a && (row.e === null ? a.avg_engaged_s === null : a.avg_engaged_s === Math.round(row.e));
    });
    check('pages: average engaged time per page = SQL', engOk, { sql: eng, api: pg.pages.map((x) => [x.path, x.avg_engaged_s, x.avg_scroll_pct]) });
    const essayRow = pg.pages.find((x) => x.path === PEOPLE[0].essay);
    check(`pages: the essay Ada read for 2½ min of her clock shows ≥ 150 s engaged (${essayRow && essayRow.avg_engaged_s} s), scrolled to the end (${essayRow && essayRow.avg_scroll_pct}%)`,
        essayRow && essayRow.avg_engaged_s >= 150 && essayRow.avg_engaged_s < 200 && essayRow.avg_scroll_pct >= 85, essayRow);
    const pgUi = await dataRows(page, 'pg-all');
    const pgUiOk = pg.pages.every((a) => pgUi.some((u) => u['*'].startsWith(a.path) && num(u.Views) === a.views && num(u.Visitors) === a.visitors
        && num(u.Entries) === a.entries && num(u.Exits) === a.exits));
    check('pages UI: every row shows the API figures', pgUi.length === pg.pages.length && pgUiOk, pgUi.slice(0, 4));
    // One page in detail: the home page (Ada from Google, Eve direct).
    await view(page, `v=pages&range=today&path=${encodeURIComponent('/')}`);
    await shot(page, 'd03-page-home');
    const pd = api.get('stats:page').body;
    check('page /: 2 views, 2 visitors, 2 entries, 0 exits', pd.totals.views === 2 && pd.totals.visitors === 2 && pd.totals.entries === 2 && pd.totals.exits === 0, pd.totals);
    check('page /: arrived from Google 1 and Direct 1', same(tally(pd.sources, 'name', 'entries'), { Direct: 1, Google: 1 }), pd.sources);
    check('page /: went on to /third-lamp and /christianities', same(tally(pd.next_pages, 'path', 'views'), { '/christianities': 1, '/third-lamp': 1 }) && pd.left_site === 0, pd.next_pages);
    check('page /: crawled by Googlebot and GPTBot once each', pd.crawls && pd.crawls.hits === 2 && same(tally(pd.crawls.bots, 'bot', 'hits'), { GPTBot: 1, Googlebot: 1 }), pd.crawls);
    check('page /: facts reported (title, h1), in the sitemap', pd.facts && pd.facts.title && pd.facts.h1_count >= 1 && pd.in_sitemap === true, pd.facts);
    const pdUi = await kpis(page);
    check('page / UI: Views 2, Visitors 2, Entries 2, Exits 0', num(pdUi.Views) === 2 && num(pdUi.Visitors) === 2 && num(pdUi.Entries) === 2 && num(pdUi.Exits) === 0, pdUi);
    const nextUi = (await rankRows(page, 'pd-next')).map((x) => x.label).sort();
    check('page / UI: the next pages listed', same(nextUi, ['/christianities', '/third-lamp']), nextUi);

    // ---------------------------------------------------------- Sources
    section('dashboard, 1280 px: Sources');
    await view(page, 'v=sources&range=today');
    const src = api.get('stats:sources').body;
    const chApi = tally(src.channels.filter((c) => c.visits), 'channel');
    check('sources: channels search 1, social 1, ai 1, other 2, direct 1', same(chApi, E.channels), { api: chApi, expected: E.channels });
    const chSql = Object.fromEntries(q(`SELECT channel, COUNT(*) AS n FROM sessions WHERE start_ts >= ? AND start_ts < ? AND ${HUMAN} GROUP BY channel ORDER BY channel`, src.range.from, src.range.to).map((x) => [x.channel, x.n]));
    check('sources: channels = SQL', same(chSql, E.channels), chSql);
    const chUi = await dataRows(page, 'src-channels');
    const labels = { search: 'Search engines', social: 'Social', ai: 'AI assistants', other: 'Other sites', direct: 'Direct / none' };
    check('sources UI: the channel table', src.channels.every((c) => chUi.some((u) => u['*'] === labels[c.channel] && num(u.Visits) === c.visits && num(u.Pageviews) === c.pageviews)), chUi);
    const google = src.sources.find((s) => s.name === 'Google');
    check('sources: Google → host www.google.com, referrer www.google.com/, landing /', google && google.hosts[0]?.host === 'www.google.com'
        && google.hosts[0].referrers[0]?.ref === 'www.google.com/' && google.landing_pages[0]?.path === '/', google);
    const reddit = src.sources.find((s) => s.name === 'Reddit');
    check('sources: Reddit → the thread path without its query, landing the Scriptorium', reddit && reddit.hosts[0]?.referrers[0]?.ref === 'www.reddit.com/r/occult/comments/abc123/scriptorium/'
        && reddit.landing_pages[0]?.path === '/third-lamp/education', reddit);
    const finnSrc = src.sources.find((s) => s.name === 'example.org');
    check('sources: example.org → the linking page, no query', finnSrc && finnSrc.hosts[0]?.referrers[0]?.ref === 'example.org/links/reading.html', finnSrc);
    check('sources: one campaign, newsletter / email / equinox, 1 visit, 1 pageview', src.campaigns.length === 1 && same(
        [src.campaigns[0].source, src.campaigns[0].medium, src.campaigns[0].campaign, src.campaigns[0].visits, src.campaigns[0].pageviews], ['newsletter', 'email', 'equinox', 1, 1]), src.campaigns);
    const cmpUi = await dataRows(page, 'src-utm');
    check('sources UI: the campaign row', cmpUi.length === 1 && cmpUi[0]['*'] === 'newsletter' && cmpUi[0].Medium === 'email' && cmpUi[0].Campaign === 'equinox' && num(cmpUi[0].Visits) === 1, cmpUi);
    const names = await page.$$eval('.adm-source-row summary .adm-source-name', (els) => els.map((e) => e.textContent.trim()));
    check('sources UI: every source listed', E.sources && Object.keys(E.sources).every((n) => names.some((x) => x.endsWith(n))), names);
    await page.click('.adm-source-row summary >> nth=0');
    await shot(page, 'd04-sources');

    // --------------------------------------------------------- Visitors
    section('dashboard, 1280 px: Visitors');
    await view(page, 'v=visitors&range=today');
    await shot(page, 'd05-visitors');
    const vis = api.get('visitors').body;
    check(`visitors: ${E.visits} visits in the log`, vis.total === E.visits && vis.visits.length === E.visits, vis.total);
    for (const p of humans()) {
        const v = vis.visits.find((x) => x.ip === p.stored);
        const want = { ip: p.stored, masked: !!p.gpc, gpc: !!p.gpc, country: p.country, device: p.device, browser: p.browser, lang: p.lang, tz: p.tz,
            landing: p.pages[0].path, exit: p.pages[p.pages.length - 1].path, pages: p.pages.length, channel: p.channel, source: p.source === 'Direct' ? null : p.source };
        const got = v && { ip: v.ip, masked: v.ip_masked, gpc: v.gpc, country: v.country, device: v.device, browser: v.browser, lang: v.lang, tz: v.tz,
            landing: v.landing, exit: v.exit, pages: v.pages, channel: v.channel, source: v.channel === 'direct' ? null : v.source };
        check(`visitors: ${p.key} — ${p.stored}${p.gpc ? ' (masked: GPC)' : ''}, ${p.country}, ${p.device} ${p.browser}, ${p.lang}, ${p.pages.length} page(s), ${p.channel}`, same(got, want), { got, want });
        if (p.os) check(`visitors: ${p.key} — system ${p.os}`, v && v.os === p.os, v && v.os);
    }
    const ben = vis.visits.find((x) => x.ip === PEOPLE[1].stored);
    check('visitors: Ben\'s visit carries its UTM tags and screen', ben && same(ben.utm, { source: 'newsletter', medium: 'email', campaign: 'equinox' }) && ben.screen === '390×844', ben && [ben.utm, ben.screen]);
    const durSql = Object.fromEntries(q(`SELECT ip, last_ts - start_ts AS d FROM sessions WHERE ${HUMAN}`).map((x) => [x.ip, x.d]));
    check('visitors: each visit\'s duration = SQL (server time)', vis.visits.every((x) => x.duration_s === durSql[x.ip]), { api: vis.visits.map((x) => [x.ip, x.duration_s]), sql: durSql });
    const visUi = await dataRows(page, 'vis-log');
    const ipsUi = await page.$$eval('[aria-labelledby="vis-log-h"] tbody .adm-ip', (b) => b.map((x) => x.textContent));
    check('visitors UI: one row per visit, every address shown', visUi.length === E.visits && humans().every((p) => ipsUi.includes(p.stored)), ipsUi);
    const eveRow = visUi.find((u) => u.Address.startsWith('203.0.113.0'));
    check('visitors UI: the GPC visit shows the masked address with "masked" and "GPC"', eveRow && /masked/.test(eveRow.Address) && /GPC/.test(eveRow.Address), eveRow);
    check('visitors UI: no full address of the GPC reader anywhere', !(await page.textContent('.adm-main')).includes('203.0.113.77'));
    const liveApi = api.get('live').body;
    const liveNow = q1(`SELECT COUNT(DISTINCT visitor) AS n FROM sessions WHERE last_ts >= ? AND ${HUMAN}`, liveApi.now - 300).n;
    const liveUi = await page.$eval('.adm-live-nums div:first-child dd', (e) => e.textContent);
    check(`visitors: live panel = SQL (${liveNow} in the last 5 min)`, liveApi.visitors === liveNow && num(liveUi) === liveNow, { api: liveApi.visitors, ui: liveUi });
    // Filter by address, then the address's history.
    await page.fill('#vf-ip', PEOPLE[0].ip);
    await page.click('.adm-filters-form button[type=submit]');
    await page.waitForURL(/f_ip=/);
    await settle(page);
    const filtered = await page.$$eval('[aria-labelledby="vis-log-h"] tbody .adm-ip', (b) => [...new Set(b.map((x) => x.textContent))]);
    check('visitors UI: the address filter shows only Ada', same(filtered, [PEOPLE[0].ip]) && api.get('visitors').body.total === 1, filtered);
    await page.click('[aria-labelledby="vis-log-h"] tbody .adm-ip >> nth=0');
    await page.waitForURL(/[?&]ip=/);
    await settle(page);
    await shot(page, 'd06-ip-ada');
    const who = api.get('visitor').body;
    check('ip history (Ada): 1 visit, 3 pageviews, her User-Agent, United Kingdom', who.visits_count === 1 && who.pageviews_count === 3
        && who.user_agents.length === 1 && who.user_agents[0].ua === UA.ada && who.countries[0]?.country === 'GB', who);
    const pvs = who.visits[0].page_views;
    check('ip history (Ada): her pages in order, with the reading time her clock ran', same(pvs.map((x) => x.path), PEOPLE[0].pages.map((x) => x.path))
        && pvs.every((x, i) => x.engaged_s >= PEOPLE[0].pages[i].seconds), pvs);
    const facts = await page.$$eval('.adm-facts-row .adm-fact', (els) => Object.fromEntries(els.map((e) => [e.querySelector('dt').textContent, e.querySelector('dd').textContent])));
    const listed = await page.$$eval('.adm-visit .adm-pageviews li .adm-link', (b) => b.map((x) => x.textContent));
    check('ip history UI: 1 visit, 3 pageviews, the three pages', num(facts.Visits) === 1 && num(facts.Pageviews) === 3 && same(listed, PEOPLE[0].pages.map((x) => x.path)), { facts, listed });
    await view(page, `v=visitors&ip=${encodeURIComponent('203.0.113.0')}`);
    const gpcWho = api.get('visitor').body;
    check('ip history (GPC): masked, no User-Agent kept, 2 pageviews', gpcWho.masked === true && gpcWho.user_agents.length === 1
        && gpcWho.user_agents[0].ua === null && gpcWho.pageviews_count === 2, gpcWho.user_agents);
    check('ip history UI (GPC): "not kept" in place of the User-Agent', /not kept/.test(await cardText(page, 'ip-uas')));
    await view(page, `v=visitors&ip=${encodeURIComponent('66.249.66.1')}`);
    const gb = api.get('visitor').body;
    check('ip history (66.249.66.1): no visits, 7 Googlebot fetches', gb.visits_count === 0 && gb.crawls.hits === 7 && gb.crawls.bots[0]?.bot === 'Googlebot', gb.crawls);
    check('ip history UI: "also crawled", the fetches listed', /also crawled/.test(await page.textContent('.adm-badges')) && (await dataRows(page, 'ip-crawls')).length === 7);
    await shot(page, 'd07-ip-googlebot');

    // ----------------------------------------------------------- Search
    section('dashboard, 1280 px: Search');
    await view(page, 'v=search&range=today');
    await shot(page, 'd08-search');
    const se = api.get('stats:search').body;
    const [hit, gap] = E.searches;
    check('search: 2 searches, 2 queries, 1 found nothing, 1 searcher', se.totals.searches === 2 && se.totals.unique_queries === 2
        && se.totals.no_result_searches === 1 && se.totals.searchers === 1, se.totals);
    check(`search: top queries "${hit.query}" (${hit.results} results) and "${gap.query}" (0)`, se.top.length === 2
        && se.top.some((x) => x.query === hit.query && x.avg_results === hit.results) && se.top.some((x) => x.query === gap.query && x.avg_results === 0), se.top);
    check(`search: the content gap is "${gap.query}"`, se.no_results.length === 1 && se.no_results[0].query === gap.query && se.no_results[0].searches === 1, se.no_results);
    const seSql = q('SELECT query, results, path FROM searches ORDER BY id');
    check('search: SQL holds exactly those two, from the Scriptorium', same(seSql, [{ query: hit.query, results: hit.results, path: '/third-lamp/education' }, { query: gap.query, results: 0, path: '/third-lamp/education' }]), seSql);
    const seUi = await kpis(page);
    const queriesUi = (await dataRows(page, 'se-top')).map((x) => x['*']);
    const gapUi = (await dataRows(page, 'se-gaps')).map((x) => x['*']);
    check('search UI: the tiles and both tables', num(seUi.Searches) === 2 && num(seUi['Found nothing']) === 1 && same(queriesUi.sort(), [hit.query, gap.query].sort()) && same(gapUi, [gap.query]), { seUi, queriesUi, gapUi });

    // -------------------------------------------------------------- SEO
    section('dashboard, 1280 px: SEO');
    await view(page, 'v=seo&range=today');
    const seo = api.get('seo').body;
    check('seo: 1 visit from search engines (Google), landing /', seo.search_engines.visits === 1 && same(tally(seo.search_engines.engines, 'name'), { Google: 1 })
        && same(seo.search_engines.landing_pages.map((x) => [x.path, x.visits]), [['/', 1]]), seo.search_engines);
    const engUi = await kpis(page);
    check('seo UI: "Visits from search engines" 1', num(engUi['Visits from search engines']) === 1, engUi);
    await shot(page, 'd09-seo-engines');

    await view(page, 'v=seo&part=crawlers&range=today');
    await shot(page, 'd10-seo-crawlers');
    const cr = api.get('crawlers').body;
    const crE = { GPTBot: CRAWLS.filter((c) => c.bot === 'GPTBot').length, Googlebot: CRAWLS.filter((c) => c.bot === 'Googlebot').length };
    check(`crawlers: ${CRAWLS.length} fetches, 2 crawlers (Googlebot ${crE.Googlebot}, GPTBot ${crE.GPTBot})`, cr.totals.hits === CRAWLS.length && cr.totals.bots === 2
        && same(tally(cr.bots, 'bot', 'hits'), crE), { totals: cr.totals, bots: cr.bots });
    const crSql = q('SELECT bot, ip, method, path, kind, status FROM crawls ORDER BY id');
    check('crawlers: SQL holds exactly the curl fetches (bot, address, method, path, kind, status 200), not the missing asset or the person',
        same(crSql, CRAWLS.map((c) => ({ bot: c.bot, ip: c.ip, method: c.method, path: c.path, kind: c.kind, status: 200 }))), crSql);
    check('crawlers: robots.txt 2 (both), sitemap.xml 1 (Googlebot), llms.txt 1 (GPTBot)', cr.files.robots.hits === 2 && cr.files.sitemap.hits === 1 && cr.files.llms.hits === 1
        && same(tally(cr.files.robots.bots, 'bot', 'hits'), { GPTBot: 1, Googlebot: 1 }) && cr.files.sitemap.bots[0]?.bot === 'Googlebot' && cr.files.llms.bots[0]?.bot === 'GPTBot', cr.files);
    const crawledPages = [...new Set(CRAWLS.filter((c) => c.kind === 'page').map((c) => c.path))].sort();
    check('crawlers: the pages crawled, with their crawlers', same(cr.pages.map((x) => x.path).sort(), crawledPages)
        && cr.pages.find((x) => x.path === '/')?.bots.slice().sort().join() === 'GPTBot,Googlebot', cr.pages);
    const gIp = cr.ips.find((x) => x.ip === '66.249.66.1');
    const oIp = cr.ips.find((x) => x.ip === '20.171.207.10');
    check('crawlers: Googlebot\'s address can be checked, GPTBot\'s cannot; neither checked yet → "claims to be"', gIp && gIp.verifiable === true && gIp.verdict === null
        && oIp && oIp.verifiable === false && cr.bots.find((b) => b.bot === 'Googlebot').verification === 'claimed' && cr.bots.find((b) => b.bot === 'GPTBot').verification === 'unverifiable', cr.ips);
    check('crawlers: no bot ran the beacon', cr.beacon_bots.length === 0, cr.beacon_bots);
    const botsUi = await dataRows(page, 'cr-bots');
    check('crawlers UI: the crawler table (fetches, identity "claims to be")', botsUi.length === 2 && botsUi.every((u) => /claims to be/.test(u.Identity) && num(u.Fetches) === crE[u['*']]), botsUi);
    check('crawlers UI: robots.txt, sitemap.xml and llms.txt cards', /2 fetches/.test(await cardText(page, 'cr-robots')) && /1 fetches/.test(await cardText(page, 'cr-sitemap')) && /1 fetches/.test(await cardText(page, 'cr-llms')));
    check('crawlers UI: the recent fetches, all 200', (await dataRows(page, 'cr-recent')).every((u) => num(u.Status) === 200) && (await dataRows(page, 'cr-recent')).length === CRAWLS.length);

    await view(page, 'v=seo&part=health&range=today');
    await shot(page, 'd11-seo-health');
    const seo2 = api.get('seo').body;
    const notFoundPaths = new Set(E.views.filter((v) => v.notFound).map((v) => v.path));
    const factsSql = q('SELECT path FROM page_facts ORDER BY path').map((x) => x.path).filter((x) => !notFoundPaths.has(x));
    const auditable = [...new Set(E.views.filter((v) => !v.notFound).map((v) => v.path))].sort();
    check('health: audited = every page read, the 404s left out (their facts may be stored, never audited)', same(factsSql, auditable) && seo2.health.pages_checked === auditable.length
        && same(seo2.health.pages.map((x) => x.path).sort(), auditable), { sql: factsSql, expected: auditable, api: seo2.health.pages.map((x) => x.path) });
    const issuesSql = Object.fromEntries(Object.keys(seo2.health.summary).map((k) => [k, seo2.health.pages.filter((x) => x.issues.includes(k)).length]));
    check('health: the issue counts add up per page', same(issuesSql, seo2.health.summary), { summary: seo2.health.summary, recount: issuesSql });
    const longTitles = q('SELECT path FROM page_facts WHERE length(title) > 60').map((x) => x.path).sort();
    check('health: "title over 60" = SQL on the stored titles', same(seo2.health.pages.filter((x) => x.issues.includes('title_long')).map((x) => x.path).sort(), longTitles), longTitles);
    const healthUi = await dataRows(page, 'seo-health');
    check('health UI: one row per audited page', healthUi.length === auditable.length, healthUi.length);

    await view(page, 'v=seo&part=vitals&range=today');
    await shot(page, 'd12-seo-vitals');
    const vt = api.get('seo').body.vitals;
    const vtSql = q(`SELECT path, device FROM vitals WHERE ts >= ? AND ts < ? AND ${HUMAN}`, seo2.range.from, seo2.range.to);
    const landings = humans().map((p) => p.pages[0].path);
    check(`vitals: one measurement per landing (${vtSql.length} of ${landings.length}), on the landing page`, vtSql.length === vt.site.n && vtSql.length >= landings.length - 1
        && vtSql.every((x) => landings.includes(x.path)), { sql: vtSql, landings });
    const lcpSql = q(`SELECT lcp FROM vitals WHERE lcp IS NOT NULL AND ${HUMAN} ORDER BY lcp`).map((x) => x.lcp);
    check('vitals: site LCP p75 comes from those measurements', lcpSql.length === 0 ? !vt.site.lcp || vt.site.lcp.p75 === null
        : vt.site.lcp.n === lcpSql.length && vt.site.lcp.p75 >= lcpSql[0] && vt.site.lcp.p75 <= lcpSql[lcpSql.length - 1], { api: vt.site.lcp, sql: lcpSql });
    check('vitals UI: the per-page table', (await dataRows(page, 'seo-vit-pages')).length === vt.pages.length);

    await view(page, 'v=seo&part=notfound&range=today');
    await shot(page, 'd13-seo-404');
    const nf = api.get('seo').body.not_found;
    check('not found: 2 readers, /no-such-page from example.org and /old-catalogue from /powers/hierarchies', nf.hits === 2 && same(
        sortBy(nf.pages.map((x) => ({ path: x.path, hits: x.hits, refs: x.referrers.map((y) => y.ref) })), 'path'),
        sortBy(E.notfound.map((x) => ({ path: x.path, hits: 1, refs: [x.ref] })), 'path'),
    ), nf.pages);
    const nfUi = await dataRows(page, 'seo-404');
    check('not found UI: both paths with their referrers', nfUi.length === 2 && nfUi.some((u) => u['*'] === '/no-such-page' && u['Linked from'].includes('example.org/links/reading.html'))
        && nfUi.some((u) => u['*'] === '/old-catalogue' && u['Linked from'].includes('/powers/hierarchies') && u['Linked from'].includes('on this site')), nfUi);

    await view(page, 'v=seo&part=sitemap&range=today');
    await shot(page, 'd14-seo-sitemap');
    const sm = api.get('seo').body.sitemap;
    const listedUrls = [...readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => (m[1].replace(/\/+$/, '') || '/'));
    const visited = new Set(E.views.map((v) => v.path));
    const crawled = new Set(CRAWLS.filter((c) => c.kind === 'page').map((c) => c.path));
    const nv = listedUrls.filter((u) => !visited.has(u)).sort();
    const nc = listedUrls.filter((u) => !crawled.has(u)).sort();
    const nis = [...visited].filter((u) => !listedUrls.includes(u) && !E.views.find((v) => v.path === u).notFound).sort();
    check(`sitemap: ${listedUrls.length} URLs; never visited = the ${nv.length} nobody read`, sm.url_count === listedUrls.length && same([...sm.never_visited].sort(), nv), { api: sm.never_visited.length, expected: nv.length });
    check(`sitemap: never crawled = the ${nc.length} the bots skipped`, same([...sm.never_crawled].sort(), nc), { api: sm.never_crawled.length, expected: nc.length });
    check(`sitemap: visited but not listed = ${JSON.stringify(nis)}`, same(sm.not_in_sitemap.map((x) => x.path).sort(), nis), sm.not_in_sitemap);
    const smUi = await page.$$eval('.adm-facts-row .adm-fact', (els) => Object.fromEntries(els.map((e) => [e.querySelector('dt').textContent, e.querySelector('dd').textContent])));
    check('sitemap UI: the four counts', num(smUi['URLs in sitemap.xml']) === listedUrls.length && num(smUi['Never visited in the range']) === nv.length
        && num(smUi['Never crawled in the range']) === nc.length && num(smUi['Visited but not listed']) === nis.length, smUi);

    await view(page, 'v=seo&part=tools&range=today');
    const tools = api.get('seo').body.links;
    const hrefs = await page.$$eval('.adm-main a[href]', (as) => as.map((a) => a.getAttribute('href')));
    check('tools: links out for pages that were read, https to the engines\' tools only', tools.pages.length > 0 && tools.pages.every((x) => visited.has(x.path))
        && hrefs.length >= 3 && hrefs.every((h) => /^https:\/\/(search\.google\.com|www\.bing\.com|pagespeed\.web\.dev)\//.test(h)), { pages: tools.pages.map((x) => x.path), hrefs: hrefs.slice(0, 4) });

    // ------------------------------------------------------- Technology
    section('dashboard, 1280 px: Technology');
    await view(page, 'v=technology&range=today');
    await shot(page, 'd15-technology');
    const te = api.get('stats:technology').body;
    check(`technology: ${E.visits} visits`, te.visits === E.visits && (await page.textContent('.adm-lede')).startsWith(`${E.visits} visits`));
    check('technology: devices desktop 3, mobile 2, tablet 1', same(tally(te.devices, 'name'), E.devices), te.devices);
    check('technology: browsers Chrome 3, Safari 2, Firefox 1', same(tally(te.browsers, 'name'), E.browsers), te.browsers);
    check('technology: languages, one each', same(tally(te.languages, 'name'), E.langs), te.languages);
    check('technology: countries from the time zones', same(tally(te.countries, 'country'), E.countries), te.countries);
    const osSql = Object.fromEntries(q(`SELECT os, COUNT(*) AS n FROM sessions WHERE ${HUMAN} GROUP BY os ORDER BY os`).map((x) => [x.os, x.n]));
    check('technology: systems = SQL', same(tally(te.os, 'name'), osSql), { api: te.os, sql: osSql });
    const scrSql = Object.fromEntries(q(`SELECT screen_w || '×' || screen_h AS s, COUNT(*) AS n FROM sessions WHERE ${HUMAN} GROUP BY s ORDER BY s`).map((x) => [x.s, x.n]));
    check('technology: screens = the windows the people used', same(tally(te.screens, 'name'), scrSql)
        && same(Object.keys(scrSql).sort(), [...new Set(humans().map((p) => `${p.screen.width}×${p.screen.height}`))].sort()), { api: te.screens, sql: scrSql });
    const devUi = Object.fromEntries((await rankRows(page, 'tech-devices')).map((x) => [x.label, num(x.value)]));
    const brUi = Object.fromEntries((await rankRows(page, 'tech-browsers')).map((x) => [x.label.split(' ')[0], num(x.value)]));
    const lgUi = Object.fromEntries((await rankRows(page, 'tech-lang')).map((x) => [x.label, num(x.value)]));
    check('technology UI: devices, browsers, languages as the API gave them', same(devUi, { Desktop: 3, Mobile: 2, Tablet: 1 }) && same(brUi, { Chrome: 3, Firefox: 1, Safari: 2 })
        && same(Object.keys(lgUi).sort(), Object.keys(E.langs).sort()), { devUi, brUi, lgUi });

    // --------------------------------------------------------- Settings
    section('dashboard, 1280 px: Settings');
    await view(page, 'v=settings');
    await shot(page, 'd16-settings');
    const h = api.get('health').body;
    const tables = ['pageviews', 'sessions', 'vitals', 'searches', 'notfound', 'outbound', 'crawls', 'page_facts', 'bot_verdicts'];
    const rows = Object.fromEntries(tables.map((t) => [t, q1(`SELECT COUNT(*) AS n FROM ${t}`).n]));
    check('settings: row counts = SQL (owner and bots included)', same(h.rows, rows), { api: h.rows, sql: rows });
    check(`settings: pageviews ${E.pageviews} + ${OWNER.pages.length} of the owner's; sessions ${E.visits} + 1`, rows.pageviews === E.pageviews + OWNER.pages.length && rows.sessions === E.visits + 1, rows);
    check('settings: storage from TL_ANALYTICS_DIR, working, schema 1', h.storage.ok === true && h.storage.source === 'env' && h.storage.dir === DATA, h.storage);
    check('settings: secrets set (never shown), no rehash needed', h.keys.cookie_secret && h.keys.admin_email && h.keys.admin_password_hash && h.password_needs_rehash === false);
    check(`settings: this browser excluded while signed in; ${OWNER.pages.length} own pageviews`, h.this_browser.excluded === true && h.this_browser.owner_pageviews_30d === OWNER.pages.length, h.this_browser);
    const rowsUi = Object.fromEntries((await page.$$eval('[aria-labelledby="set-rows-h"] tbody tr', (trs) => trs.map((tr) => [tr.children[0].textContent, tr.children[1].textContent]))).map(([a, b]) => [a.replace(/ /g, '_'), num(b)]));
    check('settings UI: the record counts', same(rowsUi, rows), rowsUi);
    const youText = await cardText(page, 'set-you');
    check('settings UI: "excluded from the stats", own pageviews', /excluded from the stats/.test(youText) && youText.includes(`last 30 days${OWNER.pages.length}`), youText.slice(0, 300));
    const all = await page.textContent('.adm-main');
    check('settings UI: no secret value on the page', !all.includes(PASSWORD) && !/\$2y\$/.test(all));
    const exportHref = await page.getAttribute('[aria-labelledby="set-export-h"] a[href*="a=export"]', 'href');
    check('settings UI: Export CSV is a plain link to the API', /^\/api\/admin\.php\?a=export&table=pageviews/.test(exportHref || ''), exportHref);
    const csv = async (table) => {
        const r = await page.request.get(`${BASE}/api/admin.php?a=export&table=${table}&range=today&tz=${encodeURIComponent(ADMIN_TZ)}`);
        const text = (await r.body()).toString('utf8');
        const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
        return { status: r.status(), type: r.headers()['content-type'] || '', bom: text.charCodeAt(0) === 0xfeff, header: lines[0].split(','), rows: lines.slice(1) };
    };
    const pvCsv = await csv('pageviews');
    check(`export: pageviews CSV, BOM, header, ${E.pageviews + OWNER.pages.length} rows (owner included, flagged)`, pvCsv.status === 200 && /text\/csv/.test(pvCsv.type) && pvCsv.bom
        && pvCsv.rows.length === E.pageviews + OWNER.pages.length && pvCsv.header.includes('owner') && pvCsv.header.includes('path'), { status: pvCsv.status, n: pvCsv.rows.length, header: pvCsv.header });
    const outCsv = await csv('outbound');
    const o = PEOPLE[0].outbound;
    check(`export: the one outbound click, to ${o.host} from ${o.path}`, outCsv.rows.length === 1 && outCsv.rows[0].includes(o.host) && outCsv.rows[0].includes(o.path), outCsv.rows);
    check('outbound: SQL holds exactly that click (host only, the page it came from)', same(q('SELECT host, path FROM outbound'), [o]), q('SELECT host, path FROM outbound'));
    const crCsv = await csv('crawls');
    check(`export: crawls CSV has the ${CRAWLS.length} crawler fetches`, crCsv.rows.length === CRAWLS.length, crCsv.rows.length);

    // The owner's own views, asked for.
    section('dashboard: the owner\'s own pageviews, only when asked');
    await view(page, 'range=today&owner=1');
    const withOwner = api.get('stats:overview').body.kpis;
    const k2 = await kpis(page);
    check(`include_owner=1: pageviews ${E.pageviews} + ${OWNER.pages.length}, visits + 1, visitors + 1`, withOwner.pageviews.value === E.pageviews + OWNER.pages.length
        && withOwner.visits.value === E.visits + 1 && withOwner.visitors.value === E.visitors + 1 && num(k2.Pageviews) === E.pageviews + OWNER.pages.length, { api: withOwner.pageviews, ui: k2.Pageviews });
}

async function dashboardPhone(E) {
    section('dashboard, 390 px (the owner\'s phone)');
    const ctx = await browser.newContext({
        userAgent: UA.ownerPhone, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3,
        locale: ADMIN_LOCALE, timezoneId: ADMIN_TZ,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    const api = recordApi(page);
    await signIn(page);
    const stops = [
        ['range=today', 'overview'], ['v=pages&range=today', 'pages'], ['v=sources&range=today', 'sources'], ['v=visitors&range=today', 'visitors'],
        [`v=visitors&ip=${encodeURIComponent(PEOPLE[2].stored)}`, 'ip-chie'], ['v=search&range=today', 'search'], ['v=seo&range=today', 'seo-engines'],
        ['v=seo&part=crawlers&range=today', 'seo-crawlers'], ['v=seo&part=health&range=today', 'seo-health'], ['v=seo&part=vitals&range=today', 'seo-vitals'],
        ['v=seo&part=notfound&range=today', 'seo-404'], ['v=seo&part=sitemap&range=today', 'seo-sitemap'], ['v=technology&range=today', 'technology'], ['v=settings', 'settings'],
    ];
    for (const [qs, name] of stops) {
        await view(page, qs);
        await shot(page, `p-${name}`);
        const o = await overflow(page);
        check(`390 px ${name}: no horizontal overflow`, o.length === 0, o);
        if (name === 'overview') {
            const k = await kpis(page);
            check('390 px overview: the same figures', num(k.Visitors) === E.visitors && num(k.Visits) === E.visits && num(k.Pageviews) === E.pageviews, k);
        }
        if (name === 'visitors') {
            check('390 px visitors: the log has every visit', api.get('visitors').body.total === E.visits && (await dataRows(page, 'vis-log')).length === E.visits);
        }
        if (name === 'ip-chie') {
            const who = api.get('visitor').body;
            check('390 px ip history (Chie, IPv6): 1 visit, 2 pages, Firefox on macOS', who.visits_count === 1 && who.pageviews_count === 2
                && who.user_agents[0]?.browser === 'Firefox' && (await page.textContent('.adm-ip-big')) === PEOPLE[2].stored, who.user_agents);
        }
    }
    check('390 px: no console errors', errors.length === 0, errors);
    await ctx.close();
}

// ======================================== storage unwritable: crawl.php ===

async function unwritable() {
    section('the data folder made unwritable: crawlers still get every file, 200');
    if (spawnSync('setpriv', ['--version']).status !== 0) {
        note('setpriv is missing: the unwritable-folder run was skipped (root ignores file modes without it)');
        return;
    }
    const before = q1('SELECT COUNT(*) AS n FROM crawls').n;
    if (dbh) dbh.close();
    dbh = null;
    await stopServer();
    const files = readdirSync(DATA);
    for (const f of files) chmodSync(path.join(DATA, f), f === '.htaccess' ? 0o444 : 0o400);
    chmodSync(DATA, 0o500);
    startServer({ capped: true });
    try {
        await waitUp();
        const probe = spawnSync('setpriv', ['--bounding-set', '-dac_override,-dac_read_search,-fowner', '--', 'sh', '-c', `touch '${DATA}/probe' 2>/dev/null && echo writable || echo unwritable`], { encoding: 'utf8' }).stdout.trim();
        check('the capped server really cannot write the data folder', probe === 'unwritable', probe);
        const index = readFileSync(path.join(DIST, 'index.html'));
        for (const [p, file, type] of [['/', 'index.html', /^text\/html/], ['/books', 'index.html', /^text\/html/], ['/articles/the-stars-of-the-dead', 'index.html', /^text\/html/],
            ['/robots.txt', 'robots.txt', /^text\/plain/], ['/sitemap.xml', 'sitemap.xml', /^application\/xml/], ['/llms.txt', 'llms.txt', /^text\/plain/]]) {
            const r = curl(p, { ua: UA.googlebot, ip: '66.249.66.1' });
            check(`unwritable: Googlebot ${p} → 200, identical bytes, ${type.source.slice(1)}`, r.status === 200 && Buffer.compare(r.body, readFileSync(path.join(DIST, file))) === 0
                && type.test(r.headers['content-type'] || ''), { status: r.status, type: r.headers['content-type'] });
        }
        const head = curl('/', { ua: UA.gptbot, ip: '20.171.207.10', method: 'HEAD' });
        check('unwritable: GPTBot HEAD / → 200, the right length', head.status === 200 && Number(head.headers['content-length']) === index.length, head);
        const hit = spawnSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '-H', `Origin: ${BASE}`, '-H', `${IP_HEADER}: 198.51.100.7`, '-H', 'Content-Type: text/plain',
            '--data', JSON.stringify({ type: 'pageview', view: 'unwritableview01', path: '/' }), `${BASE}/api/hit.php`], { encoding: 'utf8' }).stdout;
        check('unwritable: the beacon still gets its silent 204', hit === '204', hit);
        const login = spawnSync('curl', ['-s', '-H', `Origin: ${BASE}`, '-H', 'Content-Type: application/json', '-H', `${IP_HEADER}: 192.0.2.12`,
            '-c', path.join(WORK, 'jar'), '--data', JSON.stringify({ email: EMAIL, password: PASSWORD }), `${BASE}/api/admin.php?a=login`], { encoding: 'utf8' }).stdout;
        const health = JSON.parse(spawnSync('curl', ['-s', '-b', path.join(WORK, 'jar'), '-H', `${IP_HEADER}: 192.0.2.12`, `${BASE}/api/admin.php?a=health`], { encoding: 'utf8' }).stdout || '{}');
        check('unwritable: the dashboard can still sign in and says storage is not working, with a fix', /"ok":true/.test(login) && health.storage && health.storage.ok === false
            && typeof health.storage.fix === 'string' && health.storage.fix.length > 10, health.storage);
        note(`unwritable: the dashboard reported storage code "${health.storage && health.storage.code}": ${health.storage && health.storage.message}`);
    } finally {
        await stopServer();
        chmodSync(DATA, 0o700);
        for (const f of readdirSync(DATA)) chmodSync(path.join(DATA, f), 0o600);
    }
    const after = q1('SELECT COUNT(*) AS n FROM crawls').n;
    check('unwritable: nothing was written (crawls unchanged)', after === before, { before, after });
}

// ================================================================ run ===

try {
    section('static: the beacon is a lazy chunk, the dashboard too');
    const index = readFileSync(path.join(DIST, 'index.html'), 'utf8');
    const entries = [...index.matchAll(/assets\/(index-[\w-]+\.js)/g)].map((m) => m[1]);
    const entry = entries.map((e) => readFileSync(path.join(DIST, 'assets', e))).reduce((a, b) => Buffer.concat([a, b]), Buffer.alloc(0));
    const chunk = readdirSync(path.join(DIST, 'assets')).find((f) => /^analytics-[\w-]+\.js$/.test(f));
    check('the beacon has its own chunk', !!chunk, chunk);
    check('the entry bundle holds neither the beacon nor the dashboard', !entry.includes('tl_analytics_test') && !entry.includes('/api/hit.php') && !entry.includes('/api/admin.php'));
    note(`entry bundle ${entries.join(', ')}: ${(entry.length / 1024).toFixed(1)} KB, ${(gzipSync(entry, { level: 9 }).length / 1024).toFixed(2)} KB gzip; beacon chunk ${chunk}: ${(gzipSync(readFileSync(path.join(DIST, 'assets', chunk)), { level: 9 }).length / 1024).toFixed(2)} KB gzip`);

    startServer();
    await waitUp();
    check('a fresh start: no database until the first hit', !existsSync(DBFILE));

    await journeys();
    crawlerRun();
    await sleep(1500);

    section('what was stored, before anyone looks at the dashboard');
    const gpc = q('SELECT ip, ip_masked, ua, gpc, browser FROM sessions WHERE gpc = 1');
    check('GPC: one visit, stored masked (203.0.113.0), no User-Agent kept, still counted as Chrome', gpc.length === 1 && gpc[0].ip === '203.0.113.0'
        && gpc[0].ip_masked === 1 && gpc[0].ua === '' && gpc[0].browser === 'Chrome', gpc);
    check('GPC: the full address is nowhere in the database', q1("SELECT (SELECT COUNT(*) FROM sessions WHERE ip = '203.0.113.77') + (SELECT COUNT(*) FROM crawls WHERE ip = '203.0.113.77') AS n").n === 0);
    check('every other visit keeps its full address (within retention)', q("SELECT ip FROM sessions WHERE gpc = 0 AND ip_masked = 0").length === PEOPLE.length - 1);
    check('the data folder was created 0700 with its own "Require all denied"', (statSync(DATA).mode & 0o777) === 0o700 && readdirSync(DATA).includes('.htaccess')
        && /Require all denied/.test(readFileSync(path.join(DATA, '.htaccess'), 'utf8')), (statSync(DATA).mode & 0o777).toString(8));

    const owner = await ownerContext();
    const api = recordApi(owner.page);
    await signIn(owner.page);
    await ownerBrowses(owner.page);
    const E = expected();
    note(`journeys: ${PEOPLE.map((p) => `${p.key} ${p.pages.map((v) => v.path).join(' → ')}`).join('; ')}`);
    await dashboardDesktop(owner.page, api, E);
    check('desktop: no console errors', owner.errors.length === 0, owner.errors);
    await owner.ctx.close();
    await dashboardPhone(E);
    await unwritable();

    check('no page error in any visitor\'s browser', pageErrors.length === 0, pageErrors);
    const phpLog = existsSync(PHPLOG) ? readFileSync(PHPLOG, 'utf8') : '';
    check('no PHP warning or error in the server log', phpLog.trim() === '', phpLog.slice(0, 600));
} catch (e) {
    failures.push(`crashed: ${e.message}`);
    console.error(e);
} finally {
    await browser.close();
    await stopServer();
}
console.log(`\n${passed} passed, ${failures.length} failed. Work dir: ${WORK}`);
if (failures.length) {
    console.log(failures.map((f) => `  - ${f}`).join('\n'));
    process.exit(1);
}
