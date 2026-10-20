# The owner's dashboard — analytics without third parties

`/admin` is a private dashboard for the site's owner: traffic, sources, SEO,
the IP addresses visiting and the pages they read, what is popular, crawler
activity. Everything is collected and stored on this server. No Google
Analytics, no external scripts, no IP-lookup service: nothing about a visitor
ever leaves Hostinger.

## What is collected, and why

| What | How | Why |
|---|---|---|
| Each page viewed: path, time, previous page, external referrer (host and path, never its query string), UTM tags | the beacon (`src/lib/analytics.js`) after each route change | traffic, popular pages, sources |
| Time the tab was visible on a page, how far it was scrolled | the beacon, when the page is hidden or left | engagement |
| Screen and window width, browser language, time zone | the beacon | devices; the country (see below) |
| Core Web Vitals (LCP, CLS, INP, FCP, TTFB) once per landing | the beacon | page speed per page |
| The page's own SEO facts: title, description, canonical, robots, `<html lang>`, number of h1, Open Graph tags present, images without alt | the beacon reads them from the rendered page | the SEO health list |
| Site searches (trimmed, lower-cased, ≤ 80 characters) and their result counts | the beacon | top queries and content gaps |
| Pages that showed "not found", with the referrer | the beacon | broken links to fix |
| The host of an outbound link clicked | the beacon | where readers go next |
| IP address and User-Agent | the request itself, server-side | the visitor log the owner asked for; bot detection; the visitor hash |
| Crawler requests: path, bot name, IP, User-Agent, status | `api/crawl.php`, server-side | what search engines and AI crawlers read |

**No cookies or storage on visitors' devices.** Unique visitors and visits are
worked out on the server: a visitor is `HMAC(salt-of-the-day, IP | User-Agent)`,
and 30 minutes of silence ends a visit. The salt is random, kept in the
database, replaced every day (UTC), and the old one deleted — so the hash
cannot follow anyone from one day to the next. (The same person on three days
counts as three visitors; the dashboard says so.) This is the method Plausible
uses and it needs no consent banner. The only cookie this feature sets is the
owner's own sign-in cookie, on the owner's browser.

**Country is guessed from the time zone** (`Europe/London` → GB), not from the
IP address, and is labelled that way. No geolocation database or service.

**Global Privacy Control is honoured.** When a browser sends
`navigator.globalPrivacyControl`, its visit is still counted but its IP address
is masked before it is ever written (IPv4 last octet → 0, IPv6 → /48), and its
raw User-Agent string is not kept (the browser/OS/device summary is). The
visitor hash for that day is computed from the full address and then thrown
away with the day's salt.

**Who is excluded from the numbers.** The owner, while signed in to the
dashboard on that browser (the sign-in cookie travels with the beacon and marks
those views); known crawlers, other bots and headless browsers (stored and
counted separately, never in the human stats). The beacon itself never runs
in development, on `/admin`, or under automation (`navigator.webdriver`).

## Where it is stored

A single SQLite file, **above the web root**:

```
/home/u…/domains/threemagipress.com/
├── public_html/               ← the site (web-visible)
├── tl-secrets.php             ← secrets (never in git)
└── tl-analytics/              ← created automatically, permissions 700
    ├── .htaccess              ← "Require all denied", a second lock
    └── analytics.sqlite       ← permissions 600
```

The folder is `dirname(DOCUMENT_ROOT)/tl-analytics` unless `analytics_dir` is set
in the secrets file. If it cannot be created, or PHP's `pdo_sqlite` extension is
missing, nothing is recorded, the site carries on normally, and the dashboard's
**Settings** section says exactly what is wrong and how to fix it. The code
refuses to put the database anywhere inside `public_html`, whatever the setting.

## Retention

| | Default | Secret to change it |
|---|---|---|
| Full IP addresses | 90 days, then masked in place (IPv4 → x.x.x.0, IPv6 → /48), and the raw User-Agent string with them | `analytics_ip_days` |
| Everything else | 730 days, then deleted | `analytics_keep_days` |

Pruning runs by itself — on about one hit in two hundred, at most once an hour —
and from the dashboard's **Prune now** button. There is no cron job to set up.

## Setting it up

### 1. PHP extension

hPanel → **Advanced → PHP Configuration → PHP Extensions**: make sure
**pdo_sqlite** (and sqlite3, mbstring, intl) are ticked. They usually are.

### 2. A password hash

The password itself is never stored anywhere — only a bcrypt hash of it. Make
the hash on any computer with PHP, or over SSH on Hostinger (hPanel → Advanced
→ SSH Access):

```sh
php -r 'echo password_hash(trim(fgets(STDIN)), PASSWORD_DEFAULT), PHP_EOL;'
```

type the password, press Enter, and copy the line that starts with `$2y$`.
(The one-line form `php -r 'echo password_hash("…", PASSWORD_DEFAULT);'` also
works, but it leaves the password in your shell history, and a `$` or `"` in the
password breaks it.) Do not use an online "bcrypt generator": that hands the
password to a stranger.

### 3. The secrets file

Add these keys to `tl-secrets.php` (one level above `public_html`, beside
`form-submissions.log` — the same file the membership setup uses, see
`docs/membership.md`). Placeholders only — put your own values in:

```php
<?php
return [
    // … the membership keys already here: stripe_key, cookie_secret, preview_key, …

    // The dashboard sign-in.
    'admin_email'         => 'you@example.com',
    'admin_password_hash' => '$2y$10$replace.this.with.the.hash.you.made.in.step.2',

    // Optional (the defaults are shown):
    // 'analytics_ip_days'   => 90,
    // 'analytics_keep_days' => 730,
    // 'analytics_timezone'  => 'America/New_York',   // the dashboard's default day boundaries
    // 'analytics_dir'       => '/home/u…/domains/threemagipress.com/tl-analytics',
    // 'site_url'            => 'https://threemagipress.com',
];
```

- Keep the hash in **single quotes**: inside double quotes PHP would read `$2y…`
  as a variable and the sign-in would never work.
- `cookie_secret` (already there for membership) also signs the dashboard
  session; tokens carry their own purpose, so a member's pass can never act as
  a dashboard session or the reverse. Changing `cookie_secret` signs out every
  member *and* the dashboard.
- Until `cookie_secret`, `admin_email` and `admin_password_hash` are all present,
  the dashboard shows these setup steps instead of a login form; the beacon and
  the crawler log work regardless.

### 4. Sign in

Open `https://threemagipress.com/admin` and sign in with that email (any
capitalisation) and password. The session lasts 7 days on that browser.

## Signing in, and changing the password

- Five failed attempts from one address lock sign-in for 15 minutes. Every
  failure gives the same message, whether the email or the password was wrong.
- The session is a signed, HttpOnly, SameSite=Strict cookie limited to `/api/`.
  It carries a fingerprint of the password hash, so **changing the password
  signs every browser out**.
- To change the password: make a new hash (step 2), replace
  `admin_password_hash`, save. The dashboard's **Settings** section also says
  when PHP recommends re-hashing (a newer default cost); it never rewrites the
  secrets file itself.
- Every POST to the API must be JSON from this site's own origin, so another
  site cannot act on the owner's behalf.

## The crawler log

Known crawlers (Googlebot, Bingbot, Applebot, DuckDuckBot, GPTBot, ClaudeBot,
PerplexityBot and some forty more — the list is `TA_CRAWLERS` in
`api/_analytics.php`) asking for an app route, `/`, `robots.txt`, `sitemap.xml`
or `llms.txt` are handed by `.htaccess` to `api/crawl.php`. It streams exactly
the file Apache would have served — same bytes, type and caching, status 200 —
and only after the response is complete does it try to record the visit. A
crawler can never be shown an error because of analytics: the tests run it
with the data folder unwritable, the database corrupt and the analytics
library itself broken, and it still serves the right bytes. People never pass
through it.

Crawlers can lie about who they are. The dashboard's **Verify** button checks
Google, Bing, Apple (and Yandex, Baidu) the documented way — reverse DNS, the
name under the operator's domain, then forward DNS back to the same address —
caches the verdict, and shows "verified" or "claims to be". DuckDuckGo and the
AI crawlers publish IP lists instead, which would mean fetching from a third
party, so they always show "claims to be".

**To switch the crawler log off**, delete the block in `public/.htaccess` from
the line `# >>> crawler log >>>` to the line `# <<< crawler log <<<` (inclusive)
and deploy. Every other rule is untouched by it.

`robots.txt` disallows `/admin` and `/api/`; the dashboard is also `noindex`
(meta tag, and `X-Robots-Tag` on every API answer and on `/admin` for crawlers),
and it is not in `sitemap.xml`, `llms.txt` or the site search.

## Privacy notes

- **IP addresses are personal data under the GDPR** (and the UK GDPR). Keeping
  them for 90 days to see who is visiting is a legitimate-interest purpose the
  owner can defend, but the site should say so in a privacy notice. Something
  covering: what is collected (the table above), that it stays on this server,
  how long IPs are kept (90 days) and the rest (2 years), that no cookies are
  used for it, that Global Privacy Control is honoured, and whom to write to.
  **The owner decides the wording**; nothing here publishes one.
- Without consent, storing an identifier on a visitor's device would need a
  banner under the ePrivacy rules. This design stores nothing on visitors'
  devices, so it needs none.
- A visitor who asks for their data to be deleted: their visits can be found by
  IP in the Visitors section; deleting rows means opening the SQLite file
  (hPanel File Manager → download, or `sqlite3` over SSH). Masked rows are no
  longer about an identifiable person.
- The CSV export contains IP addresses. Treat downloaded files accordingly.

## The dashboard, section by section

Open `/admin` (on a phone too). One row of controls scopes everything below
it: the range (today, yesterday, 7, 30 or 90 days, 12 months, or two chosen
days), "Compare with previous period" (the same length of time just before)
and "Include my own visits". Days and hours follow the browser's time zone.
Every chart can be read with the arrow keys and opened as a table.

| Section | What it shows |
|---|---|
| Overview | visitors, visits, pageviews, views per visit, bounce rate, average visit, live now; traffic per hour (ranges of two days or less) or per day; top pages, sources, countries |
| Pages | every page with views, visitors, entries, exits, engaged time, scroll depth and change; groups (essays, Scriptorium, portals …) and "under a path"; the biggest risers. Click a page for where its readers came from, the pages before and after it, its daily trend, its page facts, speed and crawler fetches |
| Sources | channels (search engines, social, AI assistants, other sites, direct), each source opening onto its hosts, referring pages and landing pages; UTM campaigns |
| Visitors | the live panel (last five minutes, refreshed every 15 s while the tab is visible) and the visit log, filterable by IP, page, country, device, channel, source and kind (people, bots, headless). Click an address for everything it did within the retention period |
| Search | the site search's top queries, the queries that found nothing, searches per day |
| SEO | search-engine visits and landing pages; crawlers (per day, per page, robots.txt / sitemap.xml / llms.txt fetches, addresses with the reverse-DNS check); page health; Core Web Vitals; not-found pages and who links to them; sitemap coverage; links to Search Console, Bing Webmaster Tools and PageSpeed Insights |
| Technology | devices, browsers and versions, systems, window widths, screens, languages, countries |
| Settings | storage, record counts, retention and the last prune, **Prune now**, **Export CSV** (for the range chosen above), the server, which secrets are set (never their values), password re-hash advice, and whether this browser is excluded |

## Troubleshooting (what the Settings section can say)

| Message | Fix |
|---|---|
| pdo_sqlite is not enabled | hPanel → Advanced → PHP Configuration → PHP Extensions → tick pdo_sqlite, save |
| folder could not be created or written | hPanel → File Manager → one level above `public_html` → New Folder `tl-analytics`, permissions 700 |
| folder is inside the web root | remove or correct `analytics_dir` in `tl-secrets.php` |
| database could not be opened / prepared | rename `tl-analytics/analytics.sqlite` (keep it if you want the history); a new one is created on the next visit |
| "The dashboard is not configured" | add the keys in step 3 |

## For developers

| File | Role |
|---|---|
| `public/api/_analytics.php` | header-free shared code: secrets, storage + schema/migrations, UA/bot/device parsing, referrer channels, tz → country, daily salt and visits, the event recorder, crawler log, rDNS verification, retention, admin session tokens (signing reused from `_lib.php`) |
| `public/api/_analytics_report.php` | the dashboard's queries, one function per section |
| `public/api/hit.php` | beacon receiver; always 204 |
| `public/api/crawl.php` | crawler log; always the real file |
| `public/api/admin.php` | the dashboard API (`?a=login|logout|me|stats|visitors|visitor|live|crawlers|seo|export|verify-bot|prune|health`) |
| `tests/analytics-php/` | `run-tests.php` (all behaviour, ~470 checks), `router.php` (`.htaccess` for `php -S`), `seed.php` (weeks of synthetic traffic), `serve.sh`, `make-secrets.php` (throwaway credentials) |
| `src/pages/admin/` | the `/admin` UI: its own lazy chunk and stylesheet. `AdminPage.jsx` (sign-in, setup steps, the shell), `sections/*.jsx`, `charts.jsx` (hand-drawn SVG), `api.js` (the only network code) |
| `tests/analytics-e2e/` | `run.sh`: seeds a database, serves the build, and drives Chromium through every section at 1280 and 390 px, checking figures against SQL; screenshots in `TL_E2E_SHOTS` |

The beacon's event format and every API response are specified field by field
in the contract the beacon and UI were built against; the tests pin it.

```sh
php apps/web/tests/analytics-php/run-tests.php        # needs PHP 8 with pdo_sqlite and curl; port 4301
cd apps/web && npm run build && tests/analytics-php/serve.sh   # the built site + a seeded dashboard on :4301
apps/web/tests/analytics-e2e/run.sh                   # the dashboard UI end to end (after a build); port 4303
```

Adding a crawler: add a row to `TA_CRAWLERS` and the same token, in the same
place, to both `RewriteCond %{HTTP_USER_AGENT}` lines in `.htaccess` — the tests
fail if the two lists differ. Changing the schema: append a step to
`ta_migrations()`; never edit a shipped one.
