#!/usr/bin/env node
/**
 * End-to-end test of the owner's dashboard UI (/admin) against the real PHP
 * API, a seeded SQLite database and the built site.
 *
 *   cd apps/web && npm run build
 *   node --no-warnings apps/web/tests/analytics-e2e/dashboard.e2e.mjs
 *
 * What it does:
 *  - writes THROWAWAY secrets (test-owner@example.test and a random password
 *    generated here, held only in memory; the file gets its bcrypt hash),
 *  - seeds six weeks of synthetic traffic with tests/analytics-php/seed.php,
 *  - serves dist/apps/web with `php -S` and tests/analytics-php/router.php,
 *  - drives Chromium (Playwright) through the sign-in screens and every
 *    section and drill-down at 1280 px and 390 px, screenshotting each,
 *  - asserts no console errors, no horizontal overflow, labelled controls,
 *  - cross-checks the Overview KPIs, the top pages, the live panel, the
 *    channels and one IP's history against direct SQL on the database,
 *  - checks that stored strings render as text (an HTML payload stays inert),
 *    the CSV export, Prune now, the "not configured" screen and the lockout.
 *
 * Environment: TL_E2E_PORT (4303; the not-configured server uses +1),
 * TL_E2E_SHOTS (screenshot folder, default <work>/shots), TL_E2E_WORK (scratch
 * folder, default a new temp dir), PHP (php), PLAYWRIGHT_MODULE (path to
 * playwright's index.js), TL_E2E_VERIFY=1 to also press the reverse-DNS
 * "Check" button (needs working DNS).
 */

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(HERE, '../..');
const REPO = path.resolve(WEB, '../..');
const DIST = path.join(REPO, 'dist/apps/web');
const PHPDIR = path.join(WEB, 'tests/analytics-php');
const PHP = process.env.PHP || 'php';
const PORT = Number(process.env.TL_E2E_PORT || 4303);
const BASE = `http://127.0.0.1:${PORT}`;
const BASE2 = `http://127.0.0.1:${PORT + 1}`;
const WORK = process.env.TL_E2E_WORK || mkdtempSync(path.join(tmpdir(), 'tl-dash-e2e-'));
const SHOTS = process.env.TL_E2E_SHOTS || path.join(WORK, 'shots');
const PW_MODULE = process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const EMAIL = 'test-owner@example.test';
const PASSWORD = `e2e-${randomBytes(12).toString('hex')}`; // throwaway, memory only
const TZ = 'Europe/London';
const LOCALE = 'en-US';

// ------------------------------------------------------------- reporting ---

let passed = 0;
const failures = [];
function check(name, ok, detail = '') {
    if (ok) {
        passed += 1;
        console.log(`  ok   ${name}`);
    } else {
        failures.push(name);
        const d = typeof detail === 'string' ? detail : JSON.stringify(detail);
        console.log(`  FAIL ${name}  ${String(d).slice(0, 600)}`);
    }
}
function section(t) { console.log(`\n# ${t}`); }

// ---------------------------------------------------------------- set-up ---

if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error(`No build at ${DIST}: run "npm run build" in apps/web first.`);
    process.exit(2);
}
mkdirSync(SHOTS, { recursive: true });
const DATA = path.join(WORK, 'data');
const SECRETS = path.join(WORK, 'tl-secrets.php');
const SECRETS2 = path.join(WORK, 'tl-secrets-unconfigured.php');

execFileSync(PHP, [path.join(PHPDIR, 'make-secrets.php'), SECRETS, EMAIL], { env: { ...process.env, TL_DEV_PASSWORD: PASSWORD }, stdio: 'pipe' });
// A server whose secrets lack the dashboard keys: the setup screen.
writeFileSync(SECRETS2, `<?php\nreturn ['cookie_secret' => '${randomBytes(32).toString('hex')}'];\n`, { mode: 0o600 });
execFileSync(PHP, [path.join(PHPDIR, 'seed.php'), '--fresh', `--docroot=${DIST}`], { env: { ...process.env, TL_ANALYTICS_DIR: DATA }, stdio: 'pipe' });

const servers = [];
function serve(port, secrets, data, name) {
    const p = spawn(PHP, ['-S', `127.0.0.1:${port}`, '-t', DIST, '-d', 'display_errors=0', '-d', 'log_errors=1',
        '-d', `error_log=${path.join(WORK, `${name}-php-error.log`)}`, '-d', `sys_temp_dir=${path.join(WORK, name)}`,
        path.join(PHPDIR, 'router.php')], {
        env: { ...process.env, TL_SECRETS_FILE: secrets, TL_ANALYTICS_DIR: data },
        stdio: 'ignore',
    });
    mkdirSync(path.join(WORK, name), { recursive: true });
    servers.push(p);
    return p;
}
async function waitUp(base) {
    for (let i = 0; i < 100; i += 1) {
        try {
            const r = await fetch(`${base}/robots.txt`);
            if (r.ok) return;
        } catch { /* not yet */ }
        await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`server at ${base} did not start`);
}
serve(PORT, SECRETS, DATA, 'main');
serve(PORT + 1, SECRETS2, path.join(WORK, 'data2'), 'unconfigured');
await waitUp(BASE);
await waitUp(BASE2);
const cleanup = () => { for (const s of servers) { try { s.kill(); } catch { /* gone */ } } };
process.on('exit', cleanup);

const db = new DatabaseSync(path.join(DATA, 'analytics.sqlite'));
const HUMAN = "agent = 'human' AND owner = 0";

// An HTML payload in stored strings: it must come out as inert text.
const now0 = Math.floor(Date.now() / 1000);
const XSS = '<img src=x onerror="window.__xss=1">';
db.prepare(`INSERT OR REPLACE INTO page_facts (path, ts, view_id, title, description, canonical, robots, lang, h1_count, og_title, og_image, img_no_alt)
    VALUES ('/xss-check', ?, NULL, ?, ?, NULL, NULL, 'en', 1, 1, 1, 0)`).run(now0, XSS, '<script>window.__xss=2</script>');
db.prepare(`INSERT INTO searches (ts, session_id, visitor, path, query, results, agent, owner) VALUES (?, NULL, 'x', '/', ?, 0, 'human', 0)`)
    .run(now0 - 60, '<b onmouseover="window.__xss=3">gap</b>');

// ------------------------------------------------------------- helpers ---

const pw = (await import(PW_MODULE)).default;
const browser = await pw.chromium.launch();

function num(text) {
    const t = String(text).replace(/[,\s%]/g, '').replace('−', '-');
    return Number(t);
}
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
const fmtDT = new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

/** Elements past the viewport's edge that no scrolling box of their own contains. */
async function overflow(page) {
    return page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad = [];
        if (document.documentElement.scrollWidth > vw + 1) bad.push(`document ${document.documentElement.scrollWidth} > ${vw}`);
        for (const el of document.querySelectorAll('.adm *')) {
            if (el.closest('.adm-sr')) continue;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) continue;
            if (r.right <= vw + 1 && r.left >= -1) continue;
            let a = el.parentElement;
            let contained = false;
            while (a && a !== document.body) {
                const ox = getComputedStyle(a).overflowX;
                if (/(auto|scroll|hidden|clip)/.test(ox)) {
                    const ar = a.getBoundingClientRect();
                    if (ar.right <= vw + 1 && ar.left >= -1) { contained = true; break; }
                }
                a = a.parentElement;
            }
            if (!contained) bad.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${Math.round(r.left)}..${Math.round(r.right)}`);
            if (bad.length > 6) break;
        }
        // Content wider than its own table cell (it would paint over its neighbour).
        for (const td of document.querySelectorAll('.adm td, .adm th')) {
            if (td.closest('.adm-sr')) continue;
            const head = td.closest('thead');
            if (head && getComputedStyle(head).position === 'absolute') continue; // a stacked table's hidden header row
            if (td.scrollWidth > td.clientWidth + 2) {
                bad.push(`cell overflow: ${td.getAttribute('data-label') || td.tagName} "${td.textContent.trim().slice(0, 40)}" ${td.scrollWidth} > ${td.clientWidth}`);
            }
            if (bad.length > 10) break;
        }
        return bad;
    });
}

/** Every form control labelled, every button named, no image without alt. */
async function a11y(page) {
    return page.evaluate(() => {
        const bad = [];
        for (const el of document.querySelectorAll('.adm input, .adm select, .adm textarea')) {
            if (el.type === 'hidden') continue;
            const named = (el.labels && el.labels.length) || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')
                || (el.type === 'radio' && el.closest('label'));
            if (!named) bad.push(`unlabelled ${el.tagName} ${el.id || el.name}`);
        }
        for (const el of document.querySelectorAll('.adm button, .adm a')) {
            const name = (el.getAttribute('aria-label') || el.textContent || '').trim();
            if (!name) bad.push(`unnamed ${el.tagName} ${el.className}`);
        }
        if (!document.querySelector('#adm-h2, h1')) bad.push('no heading');
        return bad;
    });
}

function watch(page, label) {
    const state = { errors: [], allow: null };
    page.on('console', (m) => {
        if (m.type() !== 'error') return;
        const t = m.text();
        if (state.allow && state.allow.test(t)) return;
        state.errors.push(`${label}: ${t}`);
    });
    page.on('pageerror', (e) => state.errors.push(`${label} pageerror: ${e.message}`));
    return state;
}

/** Remember every admin API answer, by action/section, latest wins. */
function recordApi(page) {
    const seen = new Map();
    page.on('response', async (r) => {
        const u = r.url();
        if (!u.includes('/api/admin.php')) return;
        const q = new URL(u).searchParams;
        const key = [q.get('a'), q.get('section')].filter(Boolean).join(':');
        try {
            if ((r.headers()['content-type'] || '').includes('json')) seen.set(key, { url: u, status: r.status(), body: await r.json() });
        } catch { /* body gone */ }
    });
    return seen;
}

async function settle(page) {
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => !document.querySelector('.adm-loadable.is-loading, .adm-loading'), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(150);
}

async function shot(page, name) {
    await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function inspect(page, name, { a11yCheck = true } = {}) {
    await settle(page);
    await shot(page, name);
    const o = await overflow(page);
    check(`${name}: no horizontal overflow`, o.length === 0, o);
    if (a11yCheck) {
        const a = await a11y(page);
        check(`${name}: controls labelled`, a.length === 0, a);
    }
}

async function signIn(page, base = BASE) {
    await page.goto(`${base}/admin`);
    await page.waitForSelector('#adm-email');
    await page.fill('#adm-email', EMAIL.toUpperCase()); // any capitalisation
    await page.fill('#adm-password', PASSWORD);
    await page.click('.adm-login button[type=submit]');
    await page.waitForSelector('.adm-tabs');
}

async function tab(page, label) {
    await page.click(`.adm-tabs a:text-is("${label}")`);
    await page.waitForFunction((l) => document.querySelector('.adm-tabs a[aria-current="page"]')?.textContent === l, label);
    await settle(page);
}

async function kpis(page) {
    return page.$$eval('.adm-kpis .adm-kpi', (els) => Object.fromEntries(els.map((e) => [
        e.querySelector('.adm-kpi-label').textContent.trim(),
        e.querySelector('.adm-kpi-value').textContent.trim(),
    ])));
}

// --------------------------------------------------------- SQL truths ---

function sqlKpis(from, to) {
    const p = db.prepare(`SELECT COUNT(*) AS n, COUNT(DISTINCT visitor) AS v FROM pageviews WHERE ts >= ? AND ts < ? AND ${HUMAN}`).get(from, to);
    const s = db.prepare(`SELECT COUNT(*) AS n, COALESCE(SUM(pageviews = 1), 0) AS b, COALESCE(SUM(pageviews), 0) AS p, AVG(last_ts - start_ts) AS d
        FROM sessions WHERE start_ts >= ? AND start_ts < ? AND ${HUMAN}`).get(from, to);
    return {
        visitors: p.v,
        pageviews: p.n,
        visits: s.n,
        vpv: s.n ? Math.round((s.p / s.n) * 100) / 100 : 0,
        bounce: s.n ? Math.round((s.b * 1000) / s.n) / 10 : 0,
        avg: s.n ? Math.round(s.d) : 0,
    };
}

async function crossCheckOverview(page, api, label) {
    const ov = api.get('stats:overview');
    check(`${label}: overview answer captured`, !!ov && ov.status === 200);
    if (!ov) return;
    const r = ov.body.range;
    const truth = sqlKpis(r.from, r.to);
    const k = await kpis(page);
    check(`${label}: KPI visitors = SQL (${truth.visitors})`, num(k.Visitors) === truth.visitors, k.Visitors);
    check(`${label}: KPI visits = SQL (${truth.visits})`, num(k.Visits) === truth.visits, k.Visits);
    check(`${label}: KPI pageviews = SQL (${truth.pageviews})`, num(k.Pageviews) === truth.pageviews, k.Pageviews);
    check(`${label}: KPI views per visit = SQL (${truth.vpv})`, Math.abs(num(k['Views per visit']) - truth.vpv) < 0.006, k['Views per visit']);
    check(`${label}: KPI bounce rate = SQL (${truth.bounce}%)`, Math.abs(num(k['Bounce rate']) - truth.bounce) < 0.06, k['Bounce rate']);
    check(`${label}: KPI average visit = SQL (${truth.avg}s)`, seconds(k['Average visit']) === truth.avg, k['Average visit']);

    const rows = await page.$$eval('[aria-labelledby="ov-pages-h"] table.adm-rank tbody tr', (trs) => trs.map((tr) => {
        const td = tr.querySelectorAll('td');
        return [td[0].querySelector('.adm-rank-label').textContent.trim(), td[1].textContent.trim(), td[2].textContent.trim()];
    }));
    const top = db.prepare(`SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors FROM pageviews
        WHERE ts >= ? AND ts < ? AND ${HUMAN} GROUP BY path ORDER BY views DESC, path LIMIT 10`).all(r.from, r.to);
    const same = rows.length === top.length && rows.every((row, i) => row[0] === top[i].path && num(row[1]) === top[i].views && num(row[2]) === top[i].visitors);
    check(`${label}: top pages = SQL (${top.length} rows)`, same, { ui: rows.slice(0, 3), sql: top.slice(0, 3) });
}

// ============================================================= desktop ===

async function desktop() {
    section('desktop, 1280 px');
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, timezoneId: TZ, locale: LOCALE });
    const page = await ctx.newPage();
    const con = watch(page, 'desktop');
    const api = recordApi(page);

    // Signed out: the sign-in form, noindex, no failed request.
    await page.goto(`${BASE}/admin`);
    await page.waitForSelector('#adm-email');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    check('signed out: robots meta is noindex, nofollow', /noindex/.test(robots || '') && /nofollow/.test(robots || ''), robots);
    check('signed out: sign-in form shown', await page.isVisible('#adm-password'));
    await inspect(page, 'desktop-01-sign-in');

    // A wrong password: one clear message, the same for every failure.
    con.allow = /status of 401|Fetch error from .*admin\.php/;
    await page.fill('#adm-email', EMAIL);
    await page.fill('#adm-password', 'not-the-password');
    await page.click('.adm-login button[type=submit]');
    await page.waitForSelector('#adm-login-error p');
    const msg = await page.textContent('#adm-login-error');
    check('wrong password: says the email and password do not match', /do not match/.test(msg), msg);
    await shot(page, 'desktop-02-sign-in-wrong-password');
    con.allow = null;

    await page.fill('#adm-email', EMAIL.toUpperCase());
    await page.fill('#adm-password', PASSWORD);
    await page.click('.adm-login button[type=submit]');
    await page.waitForSelector('.adm-tabs');
    check('signed in with throwaway credentials', true);
    const cookie = (await ctx.cookies(`${BASE}/api/admin.php`)).find((c) => c.name === 'tl_admin');
    check('session cookie is HttpOnly, SameSite=Strict, Path=/api/', !!cookie && cookie.httpOnly && cookie.sameSite === 'Strict' && cookie.path === '/api/', cookie);

    // Overview, 7 days.
    await settle(page);
    await inspect(page, 'desktop-03-overview-7d');
    await crossCheckOverview(page, api, 'overview 7d');

    // Keyboard: every stop from the top shows a focus ring.
    await page.focus('.adm-skip'); // the first stop on the page
    const stops = [];
    for (let i = 0; i < 24; i += 1) {
        await page.keyboard.press('Tab');
        const st = await page.evaluate(() => {
            const a = document.activeElement;
            if (!a || a === document.body) return null; // past the last control
            const ring = (el) => { const cs = el && getComputedStyle(el); return !!cs && cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0; };
            return { what: `${a.tagName.toLowerCase()} ${(a.getAttribute('aria-label') || a.textContent || a.value || '').trim().slice(0, 24)}`, ring: ring(a) || ring(a.nextElementSibling) };
        });
        if (!st) break;
        stops.push(st);
    }
    check(`keyboard: ${stops.length} focus stops walked`, stops.length >= 15, stops.length);
    const noRing = stops.filter((st) => !st.ring);
    check('keyboard: every focus stop shows a ring', noRing.length === 0, noRing);

    // Chart by keyboard.
    await page.focus('.adm-chart-plot');
    await page.keyboard.press('ArrowLeft');
    check('chart: arrow keys show a reading', await page.isVisible('.adm-tip'));
    const spoken = await page.$eval('.adm-chart [aria-live]', (e) => e.textContent);
    check('chart: the reading is announced', spoken.length > 10, spoken);
    check('chart: a table of the values exists', (await page.$$('.adm-chart-table table tbody tr')).length >= 7);
    await page.keyboard.press('Escape');

    // Range picker: 30 days, with the previous period.
    await page.click('.adm-seg-range label:has-text("30 d")');
    await page.waitForURL(/range=30d/);
    await settle(page);
    check('range 30d: the previous period is drawn', (await page.$$('.adm-line-prev')).length === 1);
    await inspect(page, 'desktop-04-overview-30d');
    await crossCheckOverview(page, api, 'overview 30d');
    await page.click('.adm-seg-range label:has-text("Today")');
    await page.waitForURL(/range=today/);
    await settle(page);
    await inspect(page, 'desktop-05-overview-today-hourly');
    await crossCheckOverview(page, api, 'overview today');
    // Custom range.
    await page.click('.adm-seg-range label:has-text("Custom")');
    await page.fill('#adm-from', '2026-10-01');
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
    await page.fill('#adm-to', today);
    await page.click('.adm-custom button[type=submit]');
    await page.waitForURL(/range=custom/);
    await settle(page);
    check('custom range: the heading shows its first day', /1 Oct/.test(await page.textContent('.adm-section-sub')), await page.textContent('.adm-section-sub'));
    await page.click('.adm-seg-range label:has-text("7 d")');
    await settle(page);

    // Pages, and one page's drill-down.
    await tab(page, 'Pages');
    await inspect(page, 'desktop-06-pages');
    const pagesApi = api.get('stats:pages').body;
    const nPages = db.prepare(`SELECT COUNT(DISTINCT path) AS n FROM pageviews WHERE ts >= ? AND ts < ? AND ${HUMAN}`).get(pagesApi.range.from, pagesApi.range.to).n;
    check(`pages: total = SQL distinct paths (${nPages})`, pagesApi.total_pages === nPages && (await page.textContent('#pg-all-h')).includes(String(nPages)), pagesApi.total_pages);
    await page.click('[aria-labelledby="pg-all-h"] th:has-text("Visitors") button');
    await page.waitForURL(/sort=visitors/);
    await settle(page);
    check('pages: sorting by visitors goes to the server', /sort=visitors/.test(api.get('stats:pages').url));
    await page.click('.adm-chip:has-text("Essays")');
    await page.waitForURL(/group=essays/);
    await settle(page);
    const essayPaths = await page.$$eval('[aria-labelledby="pg-all-h"] tbody .adm-page-cell .adm-link', (b) => b.map((x) => x.textContent));
    check('pages: the Essays group shows only /articles/ pages', essayPaths.length > 0 && essayPaths.every((p) => p.startsWith('/articles/')), essayPaths.slice(0, 3));
    await inspect(page, 'desktop-07-pages-essays');
    const firstPath = essayPaths[0];
    await page.click(`[aria-labelledby="pg-all-h"] tbody .adm-link:text-is("${firstPath}")`);
    await page.waitForURL(/path=/);
    await settle(page);
    check('page detail: shows the page', (await page.textContent('.adm-page-path')).includes(firstPath));
    const pd = api.get('stats:page').body;
    const pv = db.prepare(`SELECT COUNT(*) AS n FROM pageviews WHERE path = ? AND ts >= ? AND ts < ? AND ${HUMAN}`).get(firstPath, pd.range.from, pd.range.to).n;
    const shownViews = await page.$eval('.adm-kpis .adm-kpi .adm-kpi-value', (e) => e.textContent);
    check(`page detail: views = SQL (${pv})`, num(shownViews) === pv, shownViews);
    await inspect(page, 'desktop-08-page-detail');

    // Sources.
    await tab(page, 'Sources');
    const src = api.get('stats:sources').body;
    const chan = db.prepare(`SELECT channel, COUNT(*) AS n FROM sessions WHERE start_ts >= ? AND start_ts < ? AND ${HUMAN} GROUP BY channel`).all(src.range.from, src.range.to);
    const chanUi = await page.$$eval('[aria-labelledby="src-channels-h"] tbody tr', (trs) => trs.map((tr) => [tr.querySelector('td .adm-link').textContent, tr.querySelectorAll('td')[1].textContent]));
    const labels = { search: 'Search engines', social: 'Social', ai: 'AI assistants', other: 'Other sites', direct: 'Direct / none' };
    check('sources: channel visits = SQL', chan.every((c) => chanUi.some(([l, v]) => l === labels[c.channel] && num(v) === c.n)), { chan, chanUi });
    await page.click('.adm-source-row summary >> nth=1');
    await inspect(page, 'desktop-09-sources');

    // Visitors: the live panel, the log, a filter, one address.
    await tab(page, 'Visitors');
    await page.waitForSelector('.adm-live-nums');
    await page.waitForTimeout(300);
    const live = api.get('live').body;
    const liveTruth = db.prepare(`SELECT COUNT(DISTINCT visitor) AS v FROM sessions WHERE last_ts >= ? AND ${HUMAN}`).get(live.now - 300).v;
    const liveUi = await page.$eval('.adm-live-nums div:first-child dd', (e) => e.textContent);
    check(`live: visitors now = SQL (${liveTruth})`, num(liveUi) === liveTruth && live.visitors === liveTruth, { liveUi, api: live.visitors });
    check('live: seeded readers are on the site now', liveTruth > 0);
    await inspect(page, 'desktop-10-visitors');
    const vis = api.get('visitors').body;
    const nVisits = db.prepare(`SELECT COUNT(*) AS n FROM sessions WHERE start_ts >= ? AND start_ts < ? AND ${HUMAN}`).get(vis.range.from, vis.range.to).n;
    check(`visitors: total = SQL (${nVisits})`, vis.total === nVisits && (await page.textContent('[aria-labelledby="vis-log-h"] .adm-pager-info')).includes(nVisits.toLocaleString(LOCALE)), vis.total);
    await page.click('[aria-labelledby="vis-log-h"] .adm-pager button:has-text("Next")');
    await page.waitForURL(/off=50/);
    await settle(page);
    check('visitors: page two comes from the server', /offset=50/.test(api.get('visitors').url));

    const who = db.prepare(`SELECT ip, COUNT(*) AS n FROM sessions WHERE ip_masked = 0 AND ${HUMAN} AND start_ts >= ? GROUP BY ip ORDER BY n DESC, ip LIMIT 1`).get(vis.range.from);
    await page.fill('#vf-ip', who.ip);
    await page.click('.adm-filters-form button[type=submit]');
    await page.waitForURL(/f_ip=/);
    await settle(page);
    const ipsShown = await page.$$eval('[aria-labelledby="vis-log-h"] tbody .adm-ip', (b) => [...new Set(b.map((x) => x.textContent))]);
    check(`visitors: the IP filter shows only ${who.ip}`, ipsShown.length === 1 && ipsShown[0] === who.ip, ipsShown);
    await inspect(page, 'desktop-11-visitors-filtered');
    await page.click(`[aria-labelledby="vis-log-h"] tbody .adm-ip >> nth=0`);
    await page.waitForURL(/[?&]ip=/);
    await settle(page);
    await crossCheckIp(page, who.ip, 'desktop');
    await inspect(page, 'desktop-12-ip-history');

    // Search.
    await tab(page, 'Search');
    await inspect(page, 'desktop-13-search');
    const gapText = await page.textContent('[aria-labelledby="se-gaps-h"]');
    check('search: an HTML payload in a query shows as text', gapText.includes('<b onmouseover='), gapText.slice(0, 120));

    // SEO, all seven parts.
    await tab(page, 'SEO');
    const parts = [['Search engines', 'engines'], ['Crawlers', 'crawlers'], ['Page health', 'health'], ['Web vitals', 'vitals'], ['Not found', 'notfound'], ['Sitemap', 'sitemap'], ['Tools', 'tools']];
    for (const [i, [label, key]] of parts.entries()) {
        await page.click(`.adm-subtabs button:text-is("${label}")`);
        await settle(page);
        await inspect(page, `desktop-14-seo-${i + 1}-${key}`);
    }
    await page.click('.adm-subtabs button:text-is("Page health")');
    await settle(page);
    await page.click('.adm-chip:has-text("Title over 60")');
    const healthText = await page.textContent('[aria-labelledby="seo-health-h"]');
    check('seo health: the issue filter works', /Title over 60 characters/.test(healthText));
    await page.click('.adm-chips .adm-chip >> nth=0');
    // The XSS page sorts by issue count; find it on any page of the table.
    let found = false;
    for (let i = 0; i < 6 && !found; i += 1) {
        found = (await page.textContent('[aria-labelledby="seo-health-h"]')).includes(XSS);
        if (!found && await page.isEnabled('[aria-labelledby="seo-health-h"] .adm-pager button:has-text("Next")')) {
            await page.click('[aria-labelledby="seo-health-h"] .adm-pager button:has-text("Next")');
        } else break;
    }
    check('seo health: an HTML payload in a title shows as text', found);
    check('stored HTML never ran', await page.evaluate(() => window.__xss === undefined));
    check('stored HTML made no element', (await page.$$('.adm img[src="x"], .adm script')).length === 0);
    await page.click('.adm-subtabs button:text-is("Tools")');
    await settle(page);
    const hrefs = await page.$$eval('.adm-main a[href]', (as) => as.map((a) => a.getAttribute('href')));
    check('seo tools: every link out is https to a search-engine tool', hrefs.length > 3 && hrefs.every((h) => /^https:\/\/(search\.google\.com|www\.bing\.com|pagespeed\.web\.dev)\//.test(h)), hrefs.slice(0, 4));
    if (process.env.TL_E2E_VERIFY === '1') {
        await page.click('.adm-subtabs button:text-is("Crawlers")');
        await settle(page);
        await page.click('button:has-text("Check 5 unverified")');
        await page.waitForFunction(() => !document.querySelector('.adm-verify-status .adm-spinner'), null, { timeout: 120000 });
        check('crawlers: the reverse-DNS check reports back', (await page.textContent('.adm-verify-status')).length > 5);
        await shot(page, 'desktop-15-seo-crawlers-verified');
    }

    // Technology.
    await tab(page, 'Technology');
    await inspect(page, 'desktop-16-technology');

    // Settings: health, Prune now, Export CSV.
    await tab(page, 'Settings');
    await inspect(page, 'desktop-17-settings');
    const settingsText = await page.textContent('.adm-main');
    check('settings: secrets are listed as set, never shown', /admin_password_hash/.test(settingsText) && !/\$2y\$/.test(settingsText));
    check('settings: this browser is excluded while signed in', /excluded from the stats/.test(settingsText));
    await page.click('button:has-text("Prune now")');
    await page.waitForSelector('.adm-ok');
    check('settings: Prune now reports what it did', /Done at/.test(await page.textContent('.adm-ok')));
    const exportHref = await page.getAttribute('a:has-text("Download CSV")', 'href');
    check('settings: the export link is the API export', /^\/api\/admin\.php\?a=export&table=pageviews/.test(exportHref), exportHref);
    const csv = await page.request.get(`${BASE}${exportHref}`);
    const csvBody = await csv.body();
    check('export: CSV with a BOM and a header row', csv.status() === 200 && /text\/csv/.test(csv.headers()['content-type'] || '')
        && csvBody[0] === 0xef && /^﻿?[a-z_]+,/.test(csvBody.toString('utf8')), csv.status());
    await shot(page, 'desktop-18-settings-pruned');

    // Sign out.
    await page.click('.adm-top button:has-text("Sign out")');
    await page.waitForSelector('#adm-email');
    check('sign out: back to the sign-in form, with a note', /signed out/i.test(await page.textContent('.adm-gate')));
    const after = await page.request.get(`${BASE}/api/admin.php?a=me`);
    check('sign out: the session no longer works', after.status() === 401);

    check('desktop: no console errors', con.errors.length === 0, con.errors);
    await ctx.close();
}

async function crossCheckIp(page, ip, label) {
    const s = db.prepare('SELECT COUNT(*) AS n, COALESCE(SUM(pageviews), 0) AS pv, MIN(start_ts) AS f, MAX(last_ts) AS l FROM sessions WHERE ip = ?').get(ip);
    const c = db.prepare('SELECT MIN(ts) AS f, MAX(ts) AS l FROM crawls WHERE ip = ?').get(ip);
    const first = Math.min(...[s.f, c.f].filter((x) => x !== null));
    const last = Math.max(...[s.l, c.l].filter((x) => x !== null));
    const facts = await page.$$eval('.adm-facts-row .adm-fact', (els) => Object.fromEntries(els.map((e) => [e.querySelector('dt').textContent, e.querySelector('dd').textContent])));
    check(`${label} ip ${ip}: address shown`, (await page.textContent('.adm-ip-big')) === ip);
    check(`${label} ip ${ip}: visits = SQL (${s.n})`, num(facts.Visits) === s.n, facts.Visits);
    check(`${label} ip ${ip}: pageviews = SQL (${s.pv})`, num(facts.Pageviews) === s.pv, facts.Pageviews);
    check(`${label} ip ${ip}: first seen = SQL`, facts['First seen'] === fmtDT.format(new Date(first * 1000)), [facts['First seen'], fmtDT.format(new Date(first * 1000))]);
    check(`${label} ip ${ip}: last seen = SQL`, facts['Last seen'] === fmtDT.format(new Date(last * 1000)), [facts['Last seen'], fmtDT.format(new Date(last * 1000))]);
    const newest = db.prepare('SELECT id FROM sessions WHERE ip = ? ORDER BY start_ts DESC LIMIT 1').get(ip);
    const paths = db.prepare('SELECT path FROM pageviews WHERE session_id = ? ORDER BY ts, seq').all(newest.id).map((r) => r.path);
    const firstVisitPaths = await page.$eval('.adm-visit', (v) => [...v.querySelectorAll('.adm-pageviews li .adm-link')].map((b) => b.textContent));
    check(`${label} ip ${ip}: newest visit's pages = SQL`, JSON.stringify(firstVisitPaths) === JSON.stringify(paths), { ui: firstVisitPaths, sql: paths });
    const shownVisits = await page.$$eval('.adm-visit', (v) => v.length);
    check(`${label} ip ${ip}: one card per visit (first page)`, shownVisits === Math.min(20, s.n), shownVisits);
}

// =============================================================== phone ===

async function phone() {
    section('phone, 390 px');
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, timezoneId: TZ, locale: LOCALE });
    const page = await ctx.newPage();
    const con = watch(page, 'phone');
    const api = recordApi(page);
    await page.goto(`${BASE}/admin`);
    await page.waitForSelector('#adm-email');
    await inspect(page, 'phone-01-sign-in');
    await signIn(page);
    await settle(page);
    const tabsScroll = await page.$eval('.adm-tabs ul', (u) => ({ sw: u.scrollWidth, cw: u.clientWidth, ox: getComputedStyle(u).overflowX }));
    check('phone: the section bar scrolls in its own box', tabsScroll.ox === 'auto', tabsScroll);
    await inspect(page, 'phone-02-overview');
    await crossCheckOverview(page, api, 'phone overview 7d');

    const views = [
        ['Pages', 'phone-03-pages'], ['Sources', 'phone-05-sources'], ['Visitors', 'phone-06-visitors'], ['Search', 'phone-08-search'],
        ['SEO', 'phone-09-seo'], ['Technology', 'phone-10-technology'], ['Settings', 'phone-11-settings'],
    ];
    for (const [label, name] of views) {
        await page.$eval('.adm-tabs ul', (u, l) => [...u.querySelectorAll('a')].find((a) => a.textContent === l)?.scrollIntoView({ inline: 'center', block: 'nearest' }), label);
        await tab(page, label);
        await inspect(page, name);
        if (label === 'Pages') {
            await page.click('[aria-labelledby="pg-all-h"] tbody .adm-page-cell .adm-link >> nth=0');
            await page.waitForURL(/path=/);
            await inspect(page, 'phone-04-page-detail');
            await page.click('.adm-back');
            await settle(page);
        }
        if (label === 'Visitors') {
            await page.click('[aria-labelledby="vis-log-h"] tbody .adm-ip >> nth=0');
            await page.waitForURL(/[?&]ip=/);
            await settle(page);
            const ip = await page.textContent('.adm-ip-big');
            await crossCheckIp(page, ip, 'phone');
            await inspect(page, 'phone-07-ip-history');
            await page.click('.adm-back');
            await settle(page);
        }
        if (label === 'SEO') {
            const parts = ['Crawlers', 'Page health', 'Web vitals', 'Not found', 'Sitemap', 'Tools'];
            for (const [i, p] of parts.entries()) {
                await page.click(`.adm-subtabs button:text-is("${p}")`);
                await inspect(page, `phone-09-seo-${i + 2}-${p.toLowerCase().replace(/\s+/g, '-')}`);
            }
        }
    }
    check('phone: no console errors', con.errors.length === 0, con.errors);
    await ctx.close();
}

// ============================================ setup screen and lockout ===

async function gates() {
    section('not configured, and the lockout');
    for (const [w, h, name] of [[1280, 900, 'desktop-19-not-configured'], [390, 844, 'phone-12-not-configured']]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, timezoneId: TZ, locale: LOCALE });
        const page = await ctx.newPage();
        const con = watch(page, name);
        await page.goto(`${BASE2}/admin`);
        await page.waitForSelector('.adm-steps');
        const t = await page.textContent('.adm-gate');
        check(`${name}: says it is not set up, lists the missing keys`, /not set up yet/.test(t) && /admin_email/.test(t) && /admin_password_hash/.test(t));
        check(`${name}: placeholders only`, /you@example\.com/.test(t) && !/@gmail|3magipress/i.test(t));
        await inspect(page, name);
        check(`${name}: no console errors`, con.errors.length === 0, con.errors);
        await ctx.close();
    }

    {
        // Inside another site's frame the dashboard offers no sign-in form.
        const fctx = await browser.newContext({ viewport: { width: 1000, height: 700 } });
        const fpage = await fctx.newPage();
        await fpage.setContent(`<iframe src="${BASE}/admin" style="width:900px;height:600px"></iframe>`);
        const frame = await (await fpage.waitForSelector('iframe')).contentFrame();
        await frame.waitForSelector('.adm-gate-title');
        check('framed: refuses to show the sign-in form', /its own tab/.test(await frame.textContent('.adm-gate-title')) && !(await frame.$('#adm-email')));
        await fctx.close();
    }

    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, timezoneId: TZ, locale: LOCALE });
    const page = await ctx.newPage();
    const con = watch(page, 'lockout');
    con.allow = /status of 40[13]|status of 429|Fetch error from .*admin\.php/;
    await page.goto(`${BASE}/admin`);
    await page.waitForSelector('#adm-email');
    for (let i = 0; i < 6; i += 1) {
        await page.fill('#adm-email', EMAIL);
        await page.fill('#adm-password', `wrong-${i}`);
        await page.click('.adm-login button[type=submit]');
        await page.waitForFunction(() => !document.querySelector('.adm-login button[type=submit]').textContent.includes('Signing'));
        await page.waitForTimeout(100);
        if (await page.isDisabled('#adm-password')) break;
    }
    const text = await page.textContent('#adm-login-error');
    check('lockout: says sign-in is paused, with a countdown', /Too many failed attempts/.test(text) && /Try again in 1[45] min/.test(text), text);
    check('lockout: the form is disabled', await page.isDisabled('.adm-login button[type=submit]'));
    await inspect(page, 'phone-13-locked-out');
    check('lockout: no unexpected console errors', con.errors.length === 0, con.errors);
    await ctx.close();
}

// ======================================================== static checks ===

function statics() {
    section('static checks');
    const dir = path.join(WEB, 'src/pages/admin');
    const files = [];
    const walk = (d) => readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : files.push(path.join(d, e.name))));
    walk(dir);
    const src = files.map((f) => readFileSync(f, 'utf8')).join('\n');
    check('admin UI never sets HTML', !/dangerouslySetInnerHTML|innerHTML|outerHTML|insertAdjacentHTML/.test(src));
    const index = readFileSync(path.join(DIST, 'index.html'), 'utf8');
    const entries = [...index.matchAll(/assets\/(index-[\w-]+\.js)/g)].map((m) => m[1]);
    const entry = entries.map((e) => readFileSync(path.join(DIST, 'assets', e), 'utf8')).join('\n');
    check('admin UI is not in the entry bundle', entries.length > 0 && !entry.includes('/api/admin.php') && !entry.includes('adm-kpi'));
    check('admin UI has its own chunk', readdirSync(path.join(DIST, 'assets')).some((f) => /^AdminPage-.*\.js$/.test(f)));
    const sitemap = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
    const llms = existsSync(path.join(DIST, 'llms.txt')) ? readFileSync(path.join(DIST, 'llms.txt'), 'utf8') : '';
    const idx = existsSync(path.join(DIST, 'scriptorium-index.json')) ? readFileSync(path.join(DIST, 'scriptorium-index.json'), 'utf8') : '';
    check('/admin is not in sitemap.xml, llms.txt or the search index', !/\/admin\b/.test(sitemap) && !/\/admin\b/.test(llms) && !/"\/admin/.test(idx));
    check('robots.txt disallows /admin', /Disallow: \/admin/.test(readFileSync(path.join(DIST, 'robots.txt'), 'utf8')));
}

// ================================================================ run ===

try {
    statics();
    await desktop();
    await phone();
    await gates();
} catch (e) {
    failures.push(`crashed: ${e.message}`);
    console.error(e);
} finally {
    await browser.close();
    cleanup();
}
console.log(`\n${passed} passed, ${failures.length} failed. Screenshots: ${SHOTS}`);
if (failures.length) {
    console.log(failures.map((f) => `  - ${f}`).join('\n'));
    process.exit(1);
}
