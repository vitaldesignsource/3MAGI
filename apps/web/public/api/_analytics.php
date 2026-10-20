<?php
/**
 * Three Magi Press — the owner's analytics: shared, header-free code.
 *
 * Used by hit.php (the beacon receiver), crawl.php (the crawler log) and
 * admin.php (the dashboard API). Unlike _lib.php this file sends no headers
 * and prints nothing when included, so crawl.php can use it without turning a
 * crawler's HTML page into JSON. It never calls anything outside this server.
 *
 * What it keeps, and why, is written up in docs/analytics.md. In short:
 *  - no cookies or storage on visitors' devices; visitors and visits are a
 *    keyed hash of IP + User-Agent with a salt that is replaced every day;
 *  - the full IP address is kept for `analytics_ip_days` (default 90) because
 *    the owner asked to see it, then masked in place; GPC visitors' addresses
 *    are masked before they are ever written;
 *  - the database lives ABOVE the document root and is never created inside it.
 *
 * Every public function here is prefixed ta_. The admin token helpers call
 * _lib.php's signPayload()/verifyToken(); only files that include _lib.php
 * (hit.php, admin.php) may call them. crawl.php never does.
 */

declare(strict_types=1);

// Requested directly over HTTP (/api/_analytics.php): there is nothing here.
if (PHP_SAPI !== 'cli' && isset($_SERVER['SCRIPT_FILENAME'])
    && @realpath((string) $_SERVER['SCRIPT_FILENAME']) === __FILE__) {
    http_response_code(404);
    exit;
}

const TA_SCHEMA_VERSION = 2;
const TA_DB_FILE = 'analytics.sqlite';
const TA_SESSION_GAP = 1800;          // 30 minutes of silence ends a visit
const TA_LIVE_WINDOW = 300;           // "live now" = the last 5 minutes
const TA_IP_DAYS_DEFAULT = 90;
const TA_KEEP_DAYS_DEFAULT = 730;
const TA_HIT_LIMIT = 240;             // events per network (IPv4 address, IPv6 /64) per 10 minutes
const TA_CRAWL_LOG_LIMIT = 300;       // crawl rows logged per network per 10 minutes (serving is never limited)
const TA_RATE_WINDOW = 600;           // the per-network windows above
const TA_HIT_GLOBAL_PER_MIN = 600;    // beacon events stored per minute, all networks together
const TA_CRAWL_GLOBAL_PER_MIN = 600;  // crawl rows logged per minute, all networks together
const TA_MAX_MB_DEFAULT = 1024;       // collection stops once the database reaches this size
const TA_FACTS_NEW_PER_DAY = 50;      // paths outside sitemap.xml that may gain page facts per day
const TA_FACTS_CONFIRM_DAYS = 14;     // how long a changed report waits for a second network to agree
const TA_HIT_BUSY_MS = 250;           // collection waits this long for the write lock, then drops the event
const TA_CRAWL_BUSY_MS = 100;
const TA_MAINTAIN_BATCH = 500;        // rows masked or deleted per transaction
const TA_MAX_BODY = 8192;
const TA_PRUNE_ODDS = 200;            // about one hit in 200 runs maintenance
const TA_PRUNE_MIN_GAP = 3600;        // …but not more than once an hour
const TA_ADMIN_COOKIE = 'tl_admin';
const TA_ADMIN_TTL = 7 * 86400;
const TA_ADMIN_DOMAIN = 'admin';

/** Hosts the site answers on. Beacons from these (or from the request's own
 *  host) are accepted; the same list submit.php uses. */
const TA_SITE_HOSTS = [
    'threemagipress.com',
    'www.threemagipress.com',
    '3magipress.com',
    'www.3magipress.com',
];
const TA_DEFAULT_SITE_URL = 'https://threemagipress.com';

// ------------------------------------------------------------- secrets ---

/**
 * The secrets file, without _lib.php. When _lib.php is loaded its secrets()
 * is used so the file is read once; otherwise the same three candidates are
 * tried in the same order (TL_SECRETS_FILE, above the document root, two
 * levels above this file).
 */
function ta_secrets(): array
{
    if (function_exists('secrets')) {
        $all = secrets();
        return is_array($all) ? $all : [];
    }
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }
    $candidates = [];
    $env = getenv('TL_SECRETS_FILE');
    if (is_string($env) && $env !== '') {
        $candidates[] = $env;
    }
    $root = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($root !== '') {
        $candidates[] = dirname($root) . '/tl-secrets.php';
    }
    $candidates[] = dirname(__DIR__, 2) . '/tl-secrets.php';
    foreach ($candidates as $path) {
        if (is_file($path) && is_readable($path)) {
            $data = require $path;
            if (is_array($data)) {
                return $cache = $data;
            }
        }
    }
    return $cache = [];
}

function ta_secret(string $key): string
{
    $v = ta_secrets()[$key] ?? '';
    return is_string($v) ? $v : '';
}

/** Integer setting, clamped. Reads the raw value: an int in the file must not
 *  be narrowed away the way secret() would. */
function ta_secretInt(string $key, int $default, int $min, int $max): int
{
    $v = ta_secrets()[$key] ?? null;
    if (!is_int($v) && !(is_string($v) && preg_match('/^\d+$/', $v))) {
        return $default;
    }
    return max($min, min($max, (int) $v));
}

function ta_ipDays(): int
{
    return min(ta_secretInt('analytics_ip_days', TA_IP_DAYS_DEFAULT, 1, 3650), ta_keepDays());
}

function ta_keepDays(): int
{
    return ta_secretInt('analytics_keep_days', TA_KEEP_DAYS_DEFAULT, 1, 3650);
}

function ta_hitLimit(): int
{
    return ta_secretInt('analytics_hit_limit', TA_HIT_LIMIT, 10, 100000);
}

/** The database size at which collection stops (bytes; analytics_max_mb). */
function ta_maxBytes(): int
{
    return ta_secretInt('analytics_max_mb', TA_MAX_MB_DEFAULT, 1, 1048576) * 1048576;
}

/** The public origin, for building links out (Search Console, PageSpeed). */
function ta_siteUrl(): string
{
    $v = rtrim(ta_secret('site_url'), '/');
    if ($v !== '' && preg_match('#^https?://[a-z0-9.-]+(:\d+)?$#i', $v)) {
        return $v;
    }
    return TA_DEFAULT_SITE_URL;
}

/** Default reporting time zone for the dashboard. */
function ta_defaultTz(): string
{
    $tz = ta_secret('analytics_timezone');
    return $tz !== '' && ta_validTz($tz) ? $tz : 'UTC';
}

// ------------------------------------------------------------- storage ---

/** Where the data lives, and who said so: 'env' | 'secrets' | 'default'. */
function ta_dataDir(): array
{
    $env = getenv('TL_ANALYTICS_DIR');
    if (is_string($env) && $env !== '') {
        return [rtrim($env, '/'), 'env'];
    }
    $cfg = ta_secret('analytics_dir');
    if ($cfg !== '') {
        return [rtrim($cfg, '/'), 'secrets'];
    }
    $root = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($root !== '') {
        return [dirname(rtrim($root, '/')) . '/tl-analytics', 'default'];
    }
    return [dirname(__DIR__, 2) . '/tl-analytics', 'default'];
}

/** Resolve a path that may not exist yet against its nearest real ancestor. */
function ta_resolvePath(string $path): string
{
    $path = rtrim($path, '/');
    $tail = [];
    $probe = $path;
    while ($probe !== '' && $probe !== '/' && $probe !== '.' && @realpath($probe) === false) {
        array_unshift($tail, basename($probe));
        $probe = dirname($probe);
    }
    $real = @realpath($probe === '' ? '.' : $probe);
    if ($real === false) {
        return $path;
    }
    $out = rtrim($real, '/');
    foreach ($tail as $part) {
        if ($part === '..') {
            $out = dirname($out);
        } elseif ($part !== '.' && $part !== '') {
            $out .= '/' . $part;
        }
    }
    return $out === '' ? '/' : $out;
}

/** True if $dir is the web root or inside it. The data must never be there. */
function ta_insideWebRoot(string $dir): bool
{
    $target = ta_resolvePath($dir) . '/';
    $roots = [dirname(__DIR__)];
    $docroot = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($docroot !== '') {
        $roots[] = $docroot;
    }
    foreach ($roots as $root) {
        $real = @realpath($root);
        if ($real !== false && str_starts_with($target, rtrim($real, '/') . '/')) {
            return true;
        }
    }
    return false;
}

/** Last storage problem: ['code' => …, 'message' => …, 'fix' => …] or null. */
function ta_storageError(?array $set = null, bool $clear = false): ?array
{
    static $err = null;
    if ($clear) {
        $err = null;
    }
    if ($set !== null) {
        $err = $set;
    }
    return $err;
}

function ta_storageProblem(string $code, string $dir, string $detail = ''): array
{
    $file = $dir . '/' . TA_DB_FILE;
    switch ($code) {
        case 'no_pdo_sqlite':
            $msg = 'PHP\'s pdo_sqlite extension is not enabled, so nothing can be recorded.';
            $fix = 'In hPanel open Advanced → PHP Configuration → PHP Extensions, tick "pdo_sqlite" (and "sqlite3"), save, and reload this page.';
            break;
        case 'inside_docroot':
            $msg = "The analytics folder ($dir) is inside the web root, where it could be downloaded. Nothing is recorded there.";
            $fix = 'Set analytics_dir in tl-secrets.php to a folder OUTSIDE public_html (for example the tl-analytics folder beside it), or remove the setting to use that default.';
            break;
        case 'dir_unwritable':
            $msg = "The analytics folder ($dir) does not exist and could not be created, or PHP cannot write to it.";
            $fix = 'In hPanel → File Manager, go one level above public_html, create a folder named tl-analytics and set its permissions to 700. Then reload this page.';
            break;
        case 'open_failed':
            $msg = "The database file ($file) could not be opened" . ($detail !== '' ? ": $detail" : '.');
            $fix = 'In hPanel → File Manager, check that tl-analytics/ and analytics.sqlite are owned by your account and writable (700 for the folder, 600 for the file). If the file is damaged, rename it (for example to analytics.sqlite.old); a fresh one is created on the next visit.';
            break;
        default:
            $msg = "The database could not be prepared" . ($detail !== '' ? ": $detail" : '.');
            $fix = 'Rename tl-analytics/analytics.sqlite (for example to analytics.sqlite.old) in hPanel → File Manager; a fresh database is created on the next visit. Keep the old file if you want its history.';
    }
    return ['code' => $code, 'message' => $msg, 'fix' => $fix];
}

/**
 * The database, opened, migrated and ready, or null if anything stands in the
 * way. Never throws. ta_storageError() then says why.
 *
 * @param int $busyMs how long to wait on a lock; collection paths keep it short
 */
function ta_db(int $busyMs = 1500, bool $reset = false): ?PDO
{
    static $pdo = null;
    static $failed = false;
    if ($reset) {
        $pdo = null;
        $failed = false;
        ta_storageError(null, true);
        return null;
    }
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    if ($failed) {
        return null;
    }
    [$dir] = ta_dataDir();
    try {
        if (!extension_loaded('pdo_sqlite') || !in_array('sqlite', PDO::getAvailableDrivers(), true)) {
            ta_storageError(ta_storageProblem('no_pdo_sqlite', $dir));
            $failed = true;
            return null;
        }
        if (ta_insideWebRoot($dir)) {
            ta_storageError(ta_storageProblem('inside_docroot', $dir));
            $failed = true;
            return null;
        }
        if (!is_dir($dir)) {
            $old = umask(0077);
            $made = @mkdir($dir, 0700, true);
            umask($old);
            if (!$made && !is_dir($dir)) {
                ta_storageError(ta_storageProblem('dir_unwritable', $dir));
                $failed = true;
                return null;
            }
        }
        if (!is_writable($dir)) {
            ta_storageError(ta_storageProblem('dir_unwritable', $dir));
            $failed = true;
            return null;
        }
        // A second lock in case a host ever maps this folder to a URL.
        $guard = $dir . '/.htaccess';
        if (!is_file($guard)) {
            @file_put_contents($guard, "# Analytics data. Never served.\n<IfModule mod_authz_core.c>\n  Require all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\n  Order allow,deny\n  Deny from all\n</IfModule>\n");
        }
        $file = $dir . '/' . TA_DB_FILE;
        $fresh = !is_file($file);
        $old = umask(0077);
        try {
            $db = new PDO('sqlite:' . $file, null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => max(1, (int) ceil($busyMs / 1000)),
            ]);
        } finally {
            umask($old);
        }
        $db->exec('PRAGMA busy_timeout = ' . max(50, $busyMs));
        if ($fresh) {
            @chmod($file, 0600);
            $db->exec('PRAGMA auto_vacuum = INCREMENTAL');
        }
        // WAL lets the dashboard read while hits are written. Some file
        // systems refuse it; the default journal then still works.
        try {
            $db->query('PRAGMA journal_mode = WAL')->fetchAll();
        } catch (Throwable) {
        }
        $db->exec('PRAGMA synchronous = NORMAL');
        ta_migrate($db);
        return $pdo = $db;
    } catch (Throwable $e) {
        ta_storageError(ta_storageProblem(
            isset($db) ? 'migration_failed' : 'open_failed',
            $dir,
            preg_replace('/\s+/', ' ', substr($e->getMessage(), 0, 200)) ?? ''
        ));
        $failed = true;
        return null;
    }
}

/** Schema, version by version. Append; never edit a shipped step. */
function ta_migrations(): array
{
    return [
        1 => [
            'CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
            // One row per visit. ip is masked in place after the retention window.
            'CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                visitor TEXT NOT NULL,
                start_ts INTEGER NOT NULL,
                last_ts INTEGER NOT NULL,
                pageviews INTEGER NOT NULL DEFAULT 0,
                landing TEXT NOT NULL,
                exit_path TEXT NOT NULL,
                ip TEXT NOT NULL,
                ip_masked INTEGER NOT NULL DEFAULT 0,
                ua TEXT NOT NULL DEFAULT \'\',
                agent TEXT NOT NULL DEFAULT \'human\',
                bot TEXT,
                browser TEXT, browser_ver TEXT, os TEXT, os_ver TEXT, device TEXT,
                lang TEXT, tz TEXT, country TEXT,
                screen_w INTEGER, screen_h INTEGER, viewport_w INTEGER,
                channel TEXT NOT NULL DEFAULT \'direct\',
                source TEXT, ref TEXT, ref_host TEXT,
                utm_source TEXT, utm_medium TEXT, utm_campaign TEXT,
                gpc INTEGER NOT NULL DEFAULT 0,
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS sessions_start ON sessions(start_ts)',
            'CREATE INDEX IF NOT EXISTS sessions_last ON sessions(last_ts)',
            'CREATE INDEX IF NOT EXISTS sessions_visitor ON sessions(visitor, last_ts)',
            'CREATE INDEX IF NOT EXISTS sessions_ip ON sessions(ip)',
            'CREATE TABLE IF NOT EXISTS pageviews (
                id INTEGER PRIMARY KEY,
                view_id TEXT NOT NULL UNIQUE,
                ts INTEGER NOT NULL,
                session_id TEXT NOT NULL,
                visitor TEXT NOT NULL,
                seq INTEGER NOT NULL,
                path TEXT NOT NULL,
                prev_path TEXT,
                channel TEXT, source TEXT, ref TEXT, ref_host TEXT,
                engaged_s INTEGER, scroll_pct INTEGER,
                is_404 INTEGER NOT NULL DEFAULT 0,
                agent TEXT NOT NULL DEFAULT \'human\',
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS pageviews_ts ON pageviews(ts)',
            'CREATE INDEX IF NOT EXISTS pageviews_path ON pageviews(path, ts)',
            'CREATE INDEX IF NOT EXISTS pageviews_session ON pageviews(session_id, seq)',
            // The latest page facts the beacon reported for each path.
            'CREATE TABLE IF NOT EXISTS page_facts (
                path TEXT PRIMARY KEY,
                ts INTEGER NOT NULL,
                view_id TEXT,
                title TEXT, description TEXT, canonical TEXT, robots TEXT, lang TEXT,
                h1_count INTEGER, og_title INTEGER, og_image INTEGER, img_no_alt INTEGER
            )',
            'CREATE TABLE IF NOT EXISTS vitals (
                id INTEGER PRIMARY KEY,
                ts INTEGER NOT NULL,
                view_id TEXT, session_id TEXT,
                path TEXT NOT NULL,
                device TEXT, nav TEXT,
                ttfb INTEGER, fcp INTEGER, lcp INTEGER, cls REAL, inp INTEGER,
                agent TEXT NOT NULL DEFAULT \'human\',
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS vitals_ts ON vitals(ts)',
            'CREATE TABLE IF NOT EXISTS searches (
                id INTEGER PRIMARY KEY,
                ts INTEGER NOT NULL,
                session_id TEXT, visitor TEXT,
                path TEXT,
                query TEXT NOT NULL,
                results INTEGER,
                agent TEXT NOT NULL DEFAULT \'human\',
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS searches_ts ON searches(ts)',
            'CREATE TABLE IF NOT EXISTS notfound (
                id INTEGER PRIMARY KEY,
                ts INTEGER NOT NULL,
                path TEXT NOT NULL,
                ref TEXT, ref_host TEXT,
                session_id TEXT, view_id TEXT,
                agent TEXT NOT NULL DEFAULT \'human\',
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS notfound_ts ON notfound(ts)',
            'CREATE INDEX IF NOT EXISTS notfound_view ON notfound(view_id)',
            'CREATE TABLE IF NOT EXISTS outbound (
                id INTEGER PRIMARY KEY,
                ts INTEGER NOT NULL,
                session_id TEXT,
                path TEXT,
                host TEXT NOT NULL,
                agent TEXT NOT NULL DEFAULT \'human\',
                owner INTEGER NOT NULL DEFAULT 0
            )',
            'CREATE INDEX IF NOT EXISTS outbound_ts ON outbound(ts)',
            // Requests from known crawlers, logged by crawl.php.
            'CREATE TABLE IF NOT EXISTS crawls (
                id INTEGER PRIMARY KEY,
                ts INTEGER NOT NULL,
                path TEXT NOT NULL,
                kind TEXT NOT NULL,
                bot TEXT NOT NULL,
                ua TEXT NOT NULL,
                ip TEXT NOT NULL,
                ip_masked INTEGER NOT NULL DEFAULT 0,
                status INTEGER NOT NULL,
                method TEXT NOT NULL DEFAULT \'GET\',
                verdict TEXT
            )',
            'CREATE INDEX IF NOT EXISTS crawls_ts ON crawls(ts)',
            'CREATE INDEX IF NOT EXISTS crawls_bot ON crawls(bot, ts)',
            'CREATE INDEX IF NOT EXISTS crawls_path ON crawls(path, ts)',
            'CREATE INDEX IF NOT EXISTS crawls_ip ON crawls(ip, ts)',
            // Reverse-DNS verdicts, cached per address.
            'CREATE TABLE IF NOT EXISTS bot_verdicts (
                ip TEXT PRIMARY KEY,
                bot TEXT NOT NULL,
                verdict TEXT NOT NULL,
                ptr TEXT,
                checked_ts INTEGER NOT NULL
            )',
        ],
        2 => [
            // The collection limits: one row per admitted event, keyed on a
            // hash of the network (never the address), deleted after an hour.
            'CREATE TABLE IF NOT EXISTS rate_log (k TEXT NOT NULL, ts INTEGER NOT NULL)',
            'CREATE INDEX IF NOT EXISTS rate_log_k ON rate_log(k, ts)',
            'CREATE INDEX IF NOT EXISTS rate_log_ts ON rate_log(ts)',
            // Lookups that ran inside the write lock as full scans.
            'CREATE INDEX IF NOT EXISTS vitals_view ON vitals(view_id)',
            'CREATE INDEX IF NOT EXISTS vitals_session ON vitals(session_id)',
            'CREATE INDEX IF NOT EXISTS searches_session ON searches(session_id)',
            // Maintenance reads only the rows it has work for.
            'CREATE INDEX IF NOT EXISTS sessions_unmasked ON sessions(last_ts) WHERE ip_masked = 0',
            'CREATE INDEX IF NOT EXISTS crawls_unmasked ON crawls(ts) WHERE ip_masked = 0',
            "CREATE INDEX IF NOT EXISTS sessions_ua_left ON sessions(last_ts) WHERE ip_masked = 1 AND ua <> ''",
            // A changed page-facts report waits here until a reader on a second
            // network reports the same (ta_storeFacts).
            'ALTER TABLE page_facts ADD COLUMN cand_hash TEXT',
            'ALTER TABLE page_facts ADD COLUMN cand_net TEXT',
            'ALTER TABLE page_facts ADD COLUMN cand_ts INTEGER',
        ],
    ];
}

function ta_migrate(PDO $db): void
{
    $version = (int) $db->query('PRAGMA user_version')->fetchColumn();
    if ($version >= TA_SCHEMA_VERSION) {
        return;
    }
    $db->exec('BEGIN IMMEDIATE');
    try {
        // Another request may have migrated while this one waited for the lock.
        $version = (int) $db->query('PRAGMA user_version')->fetchColumn();
        foreach (ta_migrations() as $to => $steps) {
            if ($to <= $version) {
                continue;
            }
            foreach ($steps as $sql) {
                $db->exec($sql);
            }
            $db->exec('PRAGMA user_version = ' . (int) $to);
        }
        $db->exec('COMMIT');
    } catch (Throwable $e) {
        try {
            $db->exec('ROLLBACK');
        } catch (Throwable) {
        }
        throw $e;
    }
}

/** The database and its write-ahead journal, in bytes, as on disk now. */
function ta_storageBytes(): int
{
    [$dir] = ta_dataDir();
    $file = $dir . '/' . TA_DB_FILE;
    $n = 0;
    foreach ([$file, $file . '-wal'] as $f) {
        clearstatcache(true, $f);
        $s = @filesize($f);
        $n += is_int($s) ? $s : 0;
    }
    return $n;
}

/** Past the size ceiling nothing more is written: a flood can fill the
 *  dashboard with junk, but never the hosting account's disk. */
function ta_storageFull(?int $maxBytes = null): bool
{
    return ta_storageBytes() >= ($maxBytes ?? ta_maxBytes());
}

function ta_meta(PDO $db, string $key): ?string
{
    $st = $db->prepare('SELECT value FROM meta WHERE key = ?');
    $st->execute([$key]);
    $v = $st->fetchColumn();
    return $v === false ? null : (string) $v;
}

function ta_setMeta(PDO $db, string $key, string $value): void
{
    $db->prepare('INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
        ->execute([$key, $value]);
}

/** How many ta_tx/ta_txBegin levels are open. PDO::inTransaction() does not
 *  see a transaction opened with "BEGIN IMMEDIATE", so this keeps count. */
function ta_txDepth(int $delta = 0): int
{
    static $depth = 0;
    $depth = max(0, $depth + $delta);
    return $depth;
}

/** Open a write transaction for a batch (the seed script wraps thousands of
 *  events in one). IMMEDIATE takes the write lock up front, so two writers
 *  wait on busy_timeout instead of deadlocking on a lock upgrade. */
function ta_txBegin(PDO $db): void
{
    $db->exec('BEGIN IMMEDIATE');
    ta_txDepth(1);
}

function ta_txCommit(PDO $db): void
{
    $db->exec('COMMIT');
    ta_txDepth(-1);
}

/** Run $fn inside a write transaction unless one is already open.
 *
 *  A trap worth knowing in this file: PDO binds every execute() value as
 *  TEXT, and SQLite's scalar MAX()/MIN() order TEXT above any number, so a
 *  bound value inside MAX() must be CAST(? AS INTEGER). Comparisons against
 *  INTEGER columns (ts >= ?) are safe: the column's affinity converts them. */
function ta_tx(PDO $db, callable $fn)
{
    if (ta_txDepth() > 0) {
        return $fn();
    }
    ta_txBegin($db);
    try {
        $out = $fn();
        ta_txCommit($db);
        return $out;
    } catch (Throwable $e) {
        ta_txDepth(-1);
        try {
            $db->exec('ROLLBACK');
        } catch (Throwable) {
        }
        throw $e;
    }
}

// ---------------------------------------------------------- validation ---

/** Control characters (C0, DEL, C1): a terminal reading an export or the
 *  database would act on them (clear the screen, rewrite earlier lines). */
const TA_CONTROL_RE = '/[\x00-\x1F\x7F\x{80}-\x{9F}]+/u';
/** Bidirectional overrides and isolates: they reorder how text is shown. */
const TA_BIDI_RE = '/[\x{202A}-\x{202E}\x{2066}-\x{2069}]/u';

/** Untrusted text: valid UTF-8, no control characters or bidi overrides,
 *  trimmed, capped. */
function ta_text($v, int $max): ?string
{
    if (!is_string($v)) {
        return null;
    }
    if (!mb_check_encoding($v, 'UTF-8')) {
        $v = mb_convert_encoding($v, 'UTF-8', 'UTF-8');
    }
    $v = preg_replace(TA_CONTROL_RE, ' ', $v) ?? '';
    $v = preg_replace(TA_BIDI_RE, '', $v) ?? '';
    $v = trim(preg_replace('/\s{2,}/u', ' ', $v) ?? '');
    if ($v === '') {
        return null;
    }
    return mb_substr($v, 0, $max);
}

/** A User-Agent header as it may be stored: valid UTF-8, control characters
 *  and bidi overrides replaced by spaces, at most 500 characters. Every other
 *  stored string goes through ta_text() or ta_cleanPath(); this is the same
 *  rule for the one header kept verbatim. */
function ta_cleanUa($v): string
{
    $v = is_string($v) ? $v : '';
    if (!mb_check_encoding($v, 'UTF-8')) {
        $v = mb_convert_encoding($v, 'UTF-8', 'UTF-8');
    }
    $v = preg_replace(TA_CONTROL_RE, ' ', $v) ?? '';
    $v = preg_replace(TA_BIDI_RE, ' ', $v) ?? '';
    return mb_substr(trim($v), 0, 500);
}

function ta_int($v, int $min, int $max): ?int
{
    if (is_int($v) || (is_float($v) && is_finite($v))) {
        return max($min, min($max, (int) round($v)));
    }
    if (is_string($v) && preg_match('/^-?\d+(\.\d+)?$/', $v)) {
        return max($min, min($max, (int) round((float) $v)));
    }
    return null;
}

function ta_float($v, float $min, float $max): ?float
{
    if (is_int($v) || (is_float($v) && is_finite($v)) || (is_string($v) && is_numeric($v))) {
        return max($min, min($max, (float) $v));
    }
    return null;
}

/**
 * A pathname as the site sees it: starts with "/", no query, no fragment, no
 * control characters, at most 300 characters, one trailing slash removed.
 * Percent-encoding is decoded once so /a%20b and "/a b" are one page.
 */
function ta_cleanPath($v): ?string
{
    if (!is_string($v) || $v === '' || $v[0] !== '/' || str_starts_with($v, '//')) {
        return null;
    }
    $v = preg_replace('/[?#].*$/s', '', $v) ?? '';
    $decoded = rawurldecode($v);
    if (mb_check_encoding($decoded, 'UTF-8')) {
        $v = $decoded;
    }
    if (preg_match('/[\x00-\x1F\x7F]/', $v)) {
        return null;
    }
    // C1 controls and bidi overrides: no real path has them, and they make a
    // stored path display as something else (U+202E flips the text after it).
    if (preg_match('/[\x{80}-\x{9F}\x{202A}-\x{202E}\x{2066}-\x{2069}]/u', $v) === 1) {
        return null;
    }
    $v = preg_replace('#/{2,}#', '/', $v) ?? $v;
    if (strlen($v) > 1) {
        $v = rtrim($v, '/');
        if ($v === '') {
            $v = '/';
        }
    }
    return mb_strlen($v) > 300 ? null : $v;
}

function ta_cleanId($v): ?string
{
    return is_string($v) && preg_match('/^[A-Za-z0-9_-]{8,40}$/', $v) ? $v : null;
}

function ta_cleanHost($v): ?string
{
    if (!is_string($v)) {
        return null;
    }
    $v = strtolower(trim($v));
    $v = rtrim($v, '.');
    return preg_match('/^[a-z0-9](?:[a-z0-9-]{0,62}\.)*[a-z0-9-]{1,63}$/', $v) && strlen($v) <= 253 ? $v : null;
}

function ta_validIp(string $ip): bool
{
    return filter_var($ip, FILTER_VALIDATE_IP) !== false;
}

/** IPv4: last octet → 0. IPv6: keep the first 48 bits. IPv4-mapped IPv6 is
 *  treated as the IPv4 address it carries. Anything unparseable → "0.0.0.0". */
function ta_maskIp(string $ip): string
{
    if (preg_match('/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i', $ip, $m)) {
        $ip = $m[1];
    }
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) {
        $parts = explode('.', $ip);
        $parts[3] = '0';
        return implode('.', $parts);
    }
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) !== false) {
        $bin = inet_pton($ip);
        if ($bin !== false && strlen($bin) === 16) {
            $masked = inet_ntop(substr($bin, 0, 6) . str_repeat("\0", 10));
            if ($masked !== false) {
                return $masked;
            }
        }
    }
    return '0.0.0.0';
}

function ta_isMaskedForm(string $ip): bool
{
    return ta_maskIp($ip) === $ip;
}

/**
 * The network a limit counts, as text: IPv4 as it is; IPv4-mapped IPv6 as the
 * IPv4 address it carries; any other IPv6 as its /64. A home connection or a
 * VPS is normally handed a whole /64 (2^64 addresses), so counting each IPv6
 * address on its own would give one machine an endless supply of fresh limits.
 */
function ta_netKey(string $ip): string
{
    $bin = @inet_pton($ip);
    if ($bin === false) {
        return $ip;
    }
    if (strlen($bin) === 4) {
        return (string) inet_ntop($bin);
    }
    if (strlen($bin) === 16) {
        if (str_starts_with($bin, str_repeat("\0", 10) . "\xff\xff")) {
            return (string) inet_ntop(substr($bin, 12));
        }
        $net = inet_ntop(substr($bin, 0, 8) . str_repeat("\0", 8));
        return ($net === false ? $ip : $net) . '/64';
    }
    return $ip;
}

// --------------------------------------------------- user agents, bots ---

/**
 * Known crawlers: [substring (case-insensitive), name, verification family].
 * The same substrings, in the same order, are the alternation in the
 * crawler-log block of public/.htaccess (a test keeps the two in step). First
 * match wins, so the more specific names come first.
 *
 * Families with documented reverse-DNS verification: google, bing, apple,
 * yandex, baidu. DuckDuckGo publishes an IP list instead, and the AI crawlers
 * publish IP ranges as JSON; fetching those would be a call to a third party,
 * so their verdict is "unverifiable" and the dashboard says "claims to be".
 */
const TA_CRAWLERS = [
    ['Google-InspectionTool', 'Google-InspectionTool', 'google'],
    ['Storebot-Google', 'Storebot-Google', 'google'],
    ['AdsBot-Google', 'AdsBot-Google', 'google'],
    ['Mediapartners-Google', 'Mediapartners-Google', 'google'],
    ['GoogleOther', 'GoogleOther', 'google'],
    ['Googlebot', 'Googlebot', 'google'],
    ['bingbot', 'Bingbot', 'bing'],
    ['BingPreview', 'BingPreview', 'bing'],
    ['adidxbot', 'AdIdxBot', 'bing'],
    ['msnbot', 'msnbot', 'bing'],
    ['DuckDuckBot', 'DuckDuckBot', 'duckduckgo'],
    ['DuckAssistBot', 'DuckAssistBot', 'duckduckgo'],
    ['YandexBot', 'YandexBot', 'yandex'],
    ['YandexImages', 'YandexImages', 'yandex'],
    ['Baiduspider', 'Baiduspider', 'baidu'],
    ['Applebot', 'Applebot', 'apple'],
    ['facebookexternalhit', 'Facebook', 'meta'],
    ['facebookcatalog', 'Facebook catalog', 'meta'],
    ['meta-externalagent', 'Meta-ExternalAgent', 'meta'],
    ['Twitterbot', 'Twitterbot', 'x'],
    ['LinkedInBot', 'LinkedInBot', 'linkedin'],
    ['Slackbot', 'Slackbot', 'slack'],
    ['Discordbot', 'Discordbot', 'discord'],
    ['TelegramBot', 'TelegramBot', 'telegram'],
    ['Pinterestbot', 'Pinterestbot', 'pinterest'],
    ['redditbot', 'redditbot', 'reddit'],
    ['ChatGPT-User', 'ChatGPT-User', 'openai'],
    ['OAI-SearchBot', 'OAI-SearchBot', 'openai'],
    ['GPTBot', 'GPTBot', 'openai'],
    ['Claude-User', 'Claude-User', 'anthropic'],
    ['Claude-SearchBot', 'Claude-SearchBot', 'anthropic'],
    ['ClaudeBot', 'ClaudeBot', 'anthropic'],
    ['Perplexity-User', 'Perplexity-User', 'perplexity'],
    ['PerplexityBot', 'PerplexityBot', 'perplexity'],
    ['CCBot', 'CCBot', 'commoncrawl'],
    ['Amazonbot', 'Amazonbot', 'amazon'],
    ['Bytespider', 'Bytespider', 'bytedance'],
    ['SemrushBot', 'SemrushBot', 'semrush'],
    ['AhrefsBot', 'AhrefsBot', 'ahrefs'],
    ['MJ12bot', 'MJ12bot', 'majestic'],
    ['DotBot', 'DotBot', 'moz'],
    ['PetalBot', 'PetalBot', 'huawei'],
    ['SeznamBot', 'SeznamBot', 'seznam'],
    ['Qwantbot', 'Qwantbot', 'qwant'],
    ['archive.org_bot', 'Internet Archive', 'archive'],
];

/** rDNS suffixes per family, from each operator's documentation. Note that
 *  googleusercontent.com is deliberately absent: Google Cloud customers' VMs
 *  resolve there too, so it proves nothing about Googlebot. */
const TA_VERIFY_DOMAINS = [
    'google' => ['googlebot.com', 'google.com'],
    'bing'   => ['search.msn.com'],
    'apple'  => ['applebot.apple.com'],
    'yandex' => ['yandex.ru', 'yandex.net', 'yandex.com'],
    'baidu'  => ['baidu.com', 'baidu.jp'],
];

/** @return array{0:string,1:string}|null [name, family] */
function ta_knownCrawler(string $ua): ?array
{
    if ($ua === '') {
        return null;
    }
    foreach (TA_CRAWLERS as [$needle, $name, $family]) {
        if (stripos($ua, $needle) !== false) {
            return [$name, $family];
        }
    }
    return null;
}

function ta_crawlerFamily(string $bot): string
{
    foreach (TA_CRAWLERS as [, $name, $family]) {
        if ($name === $bot) {
            return $family;
        }
    }
    return '';
}

/**
 * human | bot | headless, with the bot's name when it has one.
 * @return array{class:string,bot:?string}
 */
function ta_classifyAgent(string $ua): array
{
    if (trim($ua) === '') {
        return ['class' => 'bot', 'bot' => 'No user agent'];
    }
    $known = ta_knownCrawler($ua);
    if ($known !== null) {
        return ['class' => 'bot', 'bot' => $known[0]];
    }
    if (preg_match('/HeadlessChrome|PhantomJS|Puppeteer|Playwright|Selenium|SlimerJS|Chrome-Lighthouse|Lighthouse\/|Google Page Speed|PTST\/|GTmetrix|Prerender|Rendertron/i', $ua)) {
        return ['class' => 'headless', 'bot' => null];
    }
    // Generic automation. Word boundaries matter: "CUBOT" is a phone brand.
    if (preg_match('~(?:^|[\s;(+_/-])(?:bot|crawler|spider|scraper)\b|[a-z0-9](?:bot|crawler|spider)/|crawl|slurp|archiver|scrapy|python-|python/|aiohttp|httpx|curl/|wget/|go-http-client|java/|okhttp|libwww|httpclient|axios/|node-fetch|undici|feedfetcher|uptimerobot|pingdom|statuscake|^mozilla/5\.0$~i', $ua)) {
        return ['class' => 'bot', 'bot' => null];
    }
    return ['class' => 'human', 'bot' => null];
}

/** Browser, OS and device class from a small, readable table. */
function ta_parseUa(string $ua, ?int $screenW = null): array
{
    $browser = 'Other';
    $bver = null;
    $browsers = [
        ['Edge', '~Edg(?:e|A|iOS)?/(\d+)~'],
        ['Opera', '~(?:OPR|Opera)/(\d+)~'],
        ['Samsung Internet', '~SamsungBrowser/(\d+)~'],
        ['Yandex Browser', '~YaBrowser/(\d+)~'],
        ['UC Browser', '~UCBrowser/(\d+)~'],
        ['Vivaldi', '~Vivaldi/(\d+)~'],
        ['DuckDuckGo', '~(?:DuckDuckGo|Ddg)/(\d+)~'],
        ['Facebook app', '~FB(?:AV|_IAB)/(\d+)?~'],
        ['Instagram app', '~Instagram (\d+)~'],
        ['Firefox', '~(?:Firefox|FxiOS)/(\d+)~'],
        ['Android WebView', '~; wv\).*Chrome/(\d+)~'],
        ['Chrome', '~(?:Chrome|CriOS)/(\d+)~'],
        ['Safari', '~Version/(\d+(?:\.\d+)?).*Safari/~'],
        ['Safari (in-app)', '~AppleWebKit/.*Mobile/~'],
        ['Internet Explorer', '~(?:MSIE |Trident/.*rv:)(\d+)~'],
    ];
    foreach ($browsers as [$name, $re]) {
        if (preg_match($re, $ua, $m)) {
            $browser = $name;
            $bver = isset($m[1]) && $m[1] !== '' ? $m[1] : null;
            break;
        }
    }

    $os = 'Other';
    $over = null;
    if (preg_match('~(?:iPhone|iPad|iPod).*? OS (\d+)(?:[_.](\d+))?~', $ua, $m)) {
        $os = 'iOS';
        $over = $m[1] . (isset($m[2]) ? '.' . $m[2] : '');
    } elseif (preg_match('~Android (\d+(?:\.\d+)?)~', $ua, $m)) {
        $os = 'Android';
        $over = $m[1];
    } elseif (stripos($ua, 'Android') !== false) {
        $os = 'Android';
    } elseif (preg_match('~Windows NT (\d+\.\d+)~', $ua, $m)) {
        $os = 'Windows';
        $over = ['10.0' => '10/11', '6.3' => '8.1', '6.2' => '8', '6.1' => '7', '6.0' => 'Vista', '5.1' => 'XP'][$m[1]] ?? $m[1];
    } elseif (stripos($ua, 'Windows') !== false) {
        $os = 'Windows';
    } elseif (stripos($ua, 'CrOS') !== false) {
        $os = 'Chrome OS';
    } elseif (preg_match('~Mac OS X (\d+)[_.](\d+)~', $ua, $m)) {
        $os = 'macOS';
        $over = $m[1] . '.' . $m[2];
    } elseif (stripos($ua, 'Macintosh') !== false) {
        $os = 'macOS';
    } elseif (stripos($ua, 'Linux') !== false || stripos($ua, 'X11') !== false) {
        $os = 'Linux';
    }

    if (preg_match('~iPad|Tablet|PlayBook|Silk/|Kindle|Nexus (?:7|9|10)\b~i', $ua)
        || ($os === 'Android' && stripos($ua, 'Mobile') === false)) {
        $device = 'tablet';
    } elseif (preg_match('~Mobi|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile~i', $ua)) {
        $device = 'mobile';
    } else {
        $device = 'desktop';
    }
    if ($device === 'desktop' && $screenW !== null && $screenW > 0 && $screenW <= 600) {
        $device = 'mobile';
    }
    return ['browser' => $browser, 'browser_ver' => $bver, 'os' => $os, 'os_ver' => $over, 'device' => $device];
}

// ------------------------------------------------------------ referrers ---

/**
 * [pattern, channel, name]. A pattern ending in "." matches that label with
 * any suffix (google. → google.com, google.co.uk); otherwise the host or any
 * subdomain of it. First match wins, so assistants that live on a search
 * engine's domain (gemini.google.com) come before the engine.
 */
const TA_SOURCES = [
    ['chatgpt.com', 'ai', 'ChatGPT'],
    ['chat.openai.com', 'ai', 'ChatGPT'],
    ['perplexity.ai', 'ai', 'Perplexity'],
    ['claude.ai', 'ai', 'Claude'],
    ['gemini.google.com', 'ai', 'Gemini'],
    ['bard.google.com', 'ai', 'Gemini'],
    ['copilot.microsoft.com', 'ai', 'Copilot'],
    ['copilot.cloud.microsoft', 'ai', 'Copilot'],
    ['you.com', 'ai', 'You.com'],
    ['phind.com', 'ai', 'Phind'],
    ['poe.com', 'ai', 'Poe'],
    ['deepseek.com', 'ai', 'DeepSeek'],
    ['chat.mistral.ai', 'ai', 'Le Chat'],
    ['meta.ai', 'ai', 'Meta AI'],
    ['grok.com', 'ai', 'Grok'],
    ['kagi.com', 'search', 'Kagi'],
    ['news.google.', 'other', 'Google News'],
    ['mail.google.com', 'other', 'Gmail'],
    ['google.', 'search', 'Google'],
    ['bing.com', 'search', 'Bing'],
    ['duckduckgo.com', 'search', 'DuckDuckGo'],
    ['search.yahoo.', 'search', 'Yahoo'],
    ['yahoo.', 'search', 'Yahoo'],
    ['yandex.', 'search', 'Yandex'],
    ['ya.ru', 'search', 'Yandex'],
    ['baidu.com', 'search', 'Baidu'],
    ['ecosia.org', 'search', 'Ecosia'],
    ['qwant.com', 'search', 'Qwant'],
    ['search.brave.com', 'search', 'Brave Search'],
    ['startpage.com', 'search', 'Startpage'],
    ['seznam.cz', 'search', 'Seznam'],
    ['naver.com', 'search', 'Naver'],
    ['ask.com', 'search', 'Ask'],
    ['search.aol.com', 'search', 'AOL'],
    ['mojeek.com', 'search', 'Mojeek'],
    ['facebook.com', 'social', 'Facebook'],
    ['fb.com', 'social', 'Facebook'],
    ['fb.me', 'social', 'Facebook'],
    ['messenger.com', 'social', 'Facebook'],
    ['instagram.com', 'social', 'Instagram'],
    ['threads.net', 'social', 'Threads'],
    ['threads.com', 'social', 'Threads'],
    ['t.co', 'social', 'X (Twitter)'],
    ['twitter.com', 'social', 'X (Twitter)'],
    ['x.com', 'social', 'X (Twitter)'],
    ['linkedin.com', 'social', 'LinkedIn'],
    ['lnkd.in', 'social', 'LinkedIn'],
    ['reddit.com', 'social', 'Reddit'],
    ['pinterest.', 'social', 'Pinterest'],
    ['pin.it', 'social', 'Pinterest'],
    ['tiktok.com', 'social', 'TikTok'],
    ['youtube.com', 'social', 'YouTube'],
    ['youtu.be', 'social', 'YouTube'],
    ['bsky.app', 'social', 'Bluesky'],
    ['tumblr.com', 'social', 'Tumblr'],
    ['news.ycombinator.com', 'social', 'Hacker News'],
    ['discord.com', 'social', 'Discord'],
    ['discordapp.com', 'social', 'Discord'],
    ['t.me', 'social', 'Telegram'],
    ['telegram.org', 'social', 'Telegram'],
    ['whatsapp.com', 'social', 'WhatsApp'],
    ['wa.me', 'social', 'WhatsApp'],
    ['quora.com', 'social', 'Quora'],
    ['substack.com', 'social', 'Substack'],
    ['mastodon.social', 'social', 'Mastodon'],
    ['vk.com', 'social', 'VK'],
];

/** Android apps send android-app://<package>/ as the referrer. */
const TA_ANDROID_APPS = [
    'com.google.android.googlequicksearchbox' => ['search', 'Google'],
    'com.google.android.gm' => ['other', 'Gmail'],
    'com.linkedin.android' => ['social', 'LinkedIn'],
    'com.reddit.frontpage' => ['social', 'Reddit'],
    'org.telegram.messenger' => ['social', 'Telegram'],
    'com.twitter.android' => ['social', 'X (Twitter)'],
    'com.facebook.katana' => ['social', 'Facebook'],
    'com.instagram.android' => ['social', 'Instagram'],
    'com.slack' => ['other', 'Slack'],
];

const TA_CHANNELS = ['search', 'social', 'ai', 'other', 'direct'];

function ta_hostMatches(string $host, string $pattern): bool
{
    if (str_ends_with($pattern, '.')) {
        return str_starts_with($host, $pattern) || str_contains($host, '.' . $pattern);
    }
    return $host === $pattern || str_ends_with($host, '.' . $pattern);
}

/** @return array{0:string,1:string} [channel, name] for a referring host. */
function ta_classifyHost(string $host): array
{
    $host = strtolower($host);
    if (str_starts_with($host, 'www.')) {
        $host = substr($host, 4);
    }
    foreach (TA_SOURCES as [$pattern, $channel, $name]) {
        if (ta_hostMatches($host, $pattern)) {
            return [$channel, $name];
        }
    }
    return ['other', $host];
}

/** Is this host one of the site's own? */
function ta_isOwnHost(string $host, string $selfHost): bool
{
    $host = strtolower(rtrim($host, '.'));
    $selfHost = strtolower(rtrim(preg_replace('/:\d+$/', '', $selfHost) ?? '', '.'));
    return $host !== '' && ($host === $selfHost || in_array($host, TA_SITE_HOSTS, true));
}

/**
 * Parse a referrer. Returns ['kind' => 'none'|'internal'|'external',
 * 'path' (internal), 'host', 'ref' (host + path, no query), 'channel', 'name'].
 */
function ta_parseReferrer(?string $ref, bool $flaggedInternal, string $selfHost): array
{
    $none = ['kind' => 'none', 'path' => null, 'host' => null, 'ref' => null, 'channel' => null, 'name' => null];
    if ($ref === null || $ref === '') {
        return $none;
    }
    if ($flaggedInternal || $ref[0] === '/') {
        $p = ta_cleanPath($ref);
        return $p === null ? $none : ['kind' => 'internal', 'path' => $p] + $none;
    }
    if (preg_match('#^android-app://([a-z0-9_.]+)#i', $ref, $m)) {
        $pkg = strtolower($m[1]);
        [$channel, $name] = TA_ANDROID_APPS[$pkg] ?? ['other', $pkg];
        return ['kind' => 'external', 'path' => null, 'host' => $pkg, 'ref' => 'android-app://' . $pkg, 'channel' => $channel, 'name' => $name];
    }
    $parts = @parse_url($ref);
    if (!is_array($parts) || !isset($parts['host']) || !in_array(strtolower($parts['scheme'] ?? ''), ['http', 'https'], true)) {
        return $none;
    }
    $host = ta_cleanHost((string) $parts['host']);
    if ($host === null) {
        return $none;
    }
    if (ta_isOwnHost($host, $selfHost)) {
        $p = ta_cleanPath($parts['path'] ?? '/') ?? '/';
        return ['kind' => 'internal', 'path' => $p] + $none;
    }
    $path = (string) ($parts['path'] ?? '/');
    $path = preg_replace('/[\x00-\x1F\x7F]/', '', $path) ?? '/';
    $short = mb_substr(($host . ($path === '' ? '/' : $path)), 0, 300);
    [$channel, $name] = ta_classifyHost($host);
    return ['kind' => 'external', 'path' => null, 'host' => $host, 'ref' => $short, 'channel' => $channel, 'name' => $name];
}

/** A visit with no referrer but UTM tags is attributed by utm_source. */
function ta_classifyUtm(?string $source, ?string $medium): ?array
{
    if ($source === null || $source === '') {
        return null;
    }
    $s = strtolower($source);
    if (str_contains($s, '.')) {
        $h = ta_cleanHost(preg_replace('#^https?://#', '', $s) ?? $s);
        if ($h !== null) {
            [$channel, $name] = ta_classifyHost($h);
            return $channel === 'other' ? ['other', $source] : [$channel, $name];
        }
    }
    $named = [
        'google' => ['search', 'Google'], 'bing' => ['search', 'Bing'], 'duckduckgo' => ['search', 'DuckDuckGo'],
        'facebook' => ['social', 'Facebook'], 'fb' => ['social', 'Facebook'], 'instagram' => ['social', 'Instagram'],
        'twitter' => ['social', 'X (Twitter)'], 'x' => ['social', 'X (Twitter)'], 'linkedin' => ['social', 'LinkedIn'],
        'reddit' => ['social', 'Reddit'], 'bluesky' => ['social', 'Bluesky'], 'mastodon' => ['social', 'Mastodon'],
        'threads' => ['social', 'Threads'], 'youtube' => ['social', 'YouTube'], 'pinterest' => ['social', 'Pinterest'],
        'chatgpt' => ['ai', 'ChatGPT'], 'openai' => ['ai', 'ChatGPT'], 'perplexity' => ['ai', 'Perplexity'],
        'claude' => ['ai', 'Claude'], 'gemini' => ['ai', 'Gemini'], 'copilot' => ['ai', 'Copilot'],
    ];
    if (isset($named[$s])) {
        return $named[$s];
    }
    return ['other', $source];
}

// ----------------------------------------------------- time zone, country ---

/** Legacy names some browsers still report, for PHP builds without them. */
const TA_TZ_ALIASES = [
    'Asia/Calcutta' => 'Asia/Kolkata', 'Asia/Katmandu' => 'Asia/Kathmandu', 'Asia/Saigon' => 'Asia/Ho_Chi_Minh',
    'Asia/Rangoon' => 'Asia/Yangon', 'Asia/Dacca' => 'Asia/Dhaka', 'Asia/Thimbu' => 'Asia/Thimphu',
    'Asia/Macao' => 'Asia/Macau', 'Asia/Ulan_Bator' => 'Asia/Ulaanbaatar', 'Europe/Kiev' => 'Europe/Kyiv',
    'Europe/Uzhgorod' => 'Europe/Kyiv', 'Europe/Zaporozhye' => 'Europe/Kyiv', 'America/Godthab' => 'America/Nuuk',
    'America/Buenos_Aires' => 'America/Argentina/Buenos_Aires', 'America/Indianapolis' => 'America/Indiana/Indianapolis',
    'America/Louisville' => 'America/Kentucky/Louisville', 'Atlantic/Faeroe' => 'Atlantic/Faroe',
    'Pacific/Truk' => 'Pacific/Chuuk', 'Pacific/Ponape' => 'Pacific/Pohnpei', 'Pacific/Enderbury' => 'Pacific/Kanton',
];

function ta_canonicalTz(string $tz): ?string
{
    if (strlen($tz) > 64 || !preg_match('~^[A-Za-z][A-Za-z0-9_+-]*(?:/[A-Za-z0-9_+-]+){0,2}$~', $tz)) {
        return null;
    }
    $tz = TA_TZ_ALIASES[$tz] ?? $tz;
    static $known = null;
    if ($known === null) {
        $known = array_flip(DateTimeZone::listIdentifiers(DateTimeZone::ALL_WITH_BC));
    }
    return isset($known[$tz]) ? $tz : null;
}

function ta_validTz(string $tz): bool
{
    return ta_canonicalTz($tz) === $tz;
}

/** ISO 3166 country of a time zone, or null (UTC, Etc/*, unknown). */
function ta_countryFromTz(?string $tz): ?string
{
    if ($tz === null) {
        return null;
    }
    $tz = ta_canonicalTz($tz);
    if ($tz === null) {
        return null;
    }
    try {
        $loc = (new DateTimeZone($tz))->getLocation();
    } catch (Throwable) {
        return null;
    }
    $cc = is_array($loc) ? (string) ($loc['country_code'] ?? '') : '';
    return preg_match('/^[A-Z]{2}$/', $cc) ? $cc : null;
}

function ta_countryName(?string $cc): ?string
{
    if ($cc === null) {
        return null;
    }
    if (class_exists('Locale')) {
        $name = \Locale::getDisplayRegion('-' . $cc, 'en');
        if (is_string($name) && $name !== '' && $name !== $cc) {
            return $name;
        }
    }
    return $cc;
}

// ------------------------------------------------------ visitors, salts ---

/** Today's salt (UTC day of $now), created on first use; salts older than
 *  yesterday are deleted so yesterday's hashes can never be recomputed. */
function ta_salt(PDO $db, int $now, int $dayOffset = 0): string
{
    $day = gmdate('Y-m-d', $now + $dayOffset * 86400);
    $key = 'salt:' . $day;
    $salt = ta_meta($db, $key);
    if ($salt !== null) {
        return $salt;
    }
    if ($dayOffset < 0) {
        return ''; // never invent a past salt
    }
    $salt = bin2hex(random_bytes(32));
    $db->prepare('INSERT OR IGNORE INTO meta (key, value) VALUES (?, ?)')->execute([$key, $salt]);
    $yesterday = gmdate('Y-m-d', $now - 86400);
    $db->prepare("DELETE FROM meta WHERE key LIKE 'salt:%' AND key < ?")->execute(['salt:' . $yesterday]);
    return (string) ta_meta($db, $key);
}

function ta_visitorHash(string $salt, string $ip, string $ua): string
{
    return substr(hash_hmac('sha256', $ip . '|' . $ua, $salt), 0, 16);
}

/** [today's hash, yesterday's hash or ''] — a visit can run across midnight. */
function ta_visitorIds(PDO $db, array $ctx): array
{
    $today = ta_visitorHash(ta_salt($db, $ctx['now']), $ctx['ip'], $ctx['ua']);
    $ySalt = ta_salt($db, $ctx['now'], -1);
    $yesterday = $ySalt === '' ? '' : ta_visitorHash($ySalt, $ctx['ip'], $ctx['ua']);
    return [$today, $yesterday];
}

function ta_activeSession(PDO $db, array $visitors, int $now): ?array
{
    $st = $db->prepare('SELECT * FROM sessions WHERE visitor IN (?, ?) AND last_ts >= ? AND start_ts <= ? ORDER BY last_ts DESC LIMIT 1');
    $st->execute([$visitors[0], $visitors[1] !== '' ? $visitors[1] : $visitors[0], $now - TA_SESSION_GAP, $now]);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

// ------------------------------------------------------------- recording ---

/**
 * The request as the recorder needs it. hit.php builds this from $_SERVER;
 * tests and the seed script build it by hand.
 */
function ta_requestContext(bool $owner = false): array
{
    return [
        'now' => time(),
        'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'),
        'ua' => ta_cleanUa($_SERVER['HTTP_USER_AGENT'] ?? ''),
        'host' => strtolower((string) ($_SERVER['HTTP_HOST'] ?? '')),
        'accept_language' => (string) ($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? ''),
        'owner' => $owner,
    ];
}

const TA_EVENT_TYPES = ['pageview', 'engage', 'vitals', 'search', 'notfound', 'outbound'];

// ----------------------------------------------------- collection limits ---

/** The rate_log key for a kind of event ('h' beacon, 'c' crawl) from one
 *  network. A hash, so the table never holds an address. */
function ta_rateKey(string $kind, string $ip): string
{
    return $kind . ':' . substr(hash('sha256', ta_netKey($ip)), 0, 20);
}

/** Would one more event be admitted? A read, outside any write lock, so a
 *  flood that is over its limit costs no lock at all. */
function ta_admitPeek(PDO $db, string $kind, string $ip, int $now, int $perNet, int $perMinute): bool
{
    $st = $db->prepare('SELECT COUNT(*) FROM rate_log WHERE k = ? AND ts > ?');
    $st->execute([ta_rateKey($kind, $ip), $now - TA_RATE_WINDOW]);
    if ((int) $st->fetchColumn() >= $perNet) {
        return false;
    }
    $st = $db->prepare('SELECT COUNT(*) FROM rate_log WHERE ts > ? AND substr(k, 1, 2) = ?');
    $st->execute([$now - 60, $kind . ':']);
    return (int) $st->fetchColumn() < $perMinute;
}

/**
 * Admit one event: at most $perNet per network in TA_RATE_WINDOW and at most
 * $perMinute from everyone together in the last minute. Call inside the write
 * transaction that stores the event, so the check and the count are one step.
 */
function ta_admit(PDO $db, string $kind, string $ip, int $now, int $perNet, int $perMinute): bool
{
    return ta_tx($db, function () use ($db, $kind, $ip, $now, $perNet, $perMinute) {
        if (!ta_admitPeek($db, $kind, $ip, $now, $perNet, $perMinute)) {
            return false;
        }
        $db->prepare('INSERT INTO rate_log (k, ts) VALUES (?, ?)')->execute([ta_rateKey($kind, $ip), $now]);
        if (random_int(1, 100) === 1) {
            $db->prepare('DELETE FROM rate_log WHERE ts <= ?')->execute([$now - TA_RATE_WINDOW]);
        }
        return true;
    });
}

/**
 * hit.php's door: the limits, then the event, in one write transaction.
 * Returns what ta_record() returns, or 'rate_limited' / 'storage_full'.
 *
 * @param array{per_net?:int,per_minute?:int,max_bytes?:int} $limits (tests)
 */
function ta_recordLimited(PDO $db, array $ev, array $ctx, array $limits = []): string
{
    $now = (int) ($ctx['now'] ?? time());
    $ctx['now'] = $now;
    $ip = (string) ($ctx['ip'] ?? '0.0.0.0');
    $perNet = $limits['per_net'] ?? ta_hitLimit();
    $perMinute = $limits['per_minute'] ?? TA_HIT_GLOBAL_PER_MIN;
    if (ta_storageFull($limits['max_bytes'] ?? null)) {
        return 'storage_full';
    }
    if (!ta_admitPeek($db, 'h', $ip, $now, $perNet, $perMinute)) {
        return 'rate_limited';
    }
    return ta_tx($db, function () use ($db, $ev, $ctx, $ip, $now, $perNet, $perMinute) {
        if (!ta_admit($db, 'h', $ip, $now, $perNet, $perMinute)) {
            return 'rate_limited';
        }
        return ta_record($db, $ev, $ctx);
    });
}

/**
 * Store one beacon event. Returns 'stored' or the reason it was dropped
 * ('bad_type', 'bad_path', 'bad_view', 'duplicate', 'unknown_view', …).
 * hit.php ignores the answer; tests read it.
 */
function ta_record(PDO $db, array $ev, array $ctx): string
{
    $type = $ev['type'] ?? null;
    if (!is_string($type) || !in_array($type, TA_EVENT_TYPES, true)) {
        return 'bad_type';
    }
    $ctx += ['now' => time(), 'ip' => '0.0.0.0', 'ua' => '', 'host' => '', 'accept_language' => '', 'owner' => false];
    $ctx['ua'] = ta_cleanUa($ctx['ua']);
    $agent = ta_classifyAgent($ctx['ua']);
    $ctx['agent'] = $agent['class'];
    $ctx['bot'] = $agent['bot'];
    $ctx['owner'] = (bool) $ctx['owner'];
    switch ($type) {
        case 'pageview':
            return ta_recordPageview($db, $ev, $ctx);
        case 'engage':
            return ta_recordEngage($db, $ev, $ctx);
        case 'vitals':
            return ta_recordVitals($db, $ev, $ctx);
        case 'search':
            return ta_recordSearch($db, $ev, $ctx);
        case 'notfound':
            return ta_recordNotFound($db, $ev, $ctx);
        default:
            return ta_recordOutbound($db, $ev, $ctx);
    }
}

function ta_cleanFacts($f): ?array
{
    if (!is_array($f)) {
        return null;
    }
    return [
        'title' => ta_text($f['title'] ?? null, 300),
        'description' => ta_text($f['description'] ?? null, 500),
        'canonical' => ta_text($f['canonical'] ?? null, 500),
        'robots' => ta_text($f['robots'] ?? null, 100),
        'lang' => ta_text($f['lang'] ?? null, 35),
        'h1_count' => ta_int($f['h1'] ?? null, 0, 1000),
        'og_title' => array_key_exists('og_title', $f) ? (!empty($f['og_title']) ? 1 : 0) : null,
        'og_image' => array_key_exists('og_image', $f) ? (!empty($f['og_image']) ? 1 : 0) : null,
        'img_no_alt' => ta_int($f['img_no_alt'] ?? null, 0, 100000),
    ];
}

function ta_cleanLang($v, string $acceptLanguage = ''): ?string
{
    $v = is_string($v) ? trim($v) : '';
    if ($v === '' && $acceptLanguage !== '') {
        $v = trim(explode(',', explode(';', $acceptLanguage)[0])[0]);
    }
    if ($v === '' || strlen($v) > 35 || !preg_match('/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{1,8})*$/', $v)) {
        return null;
    }
    $parts = explode('-', $v);
    $parts[0] = strtolower($parts[0]);
    foreach ($parts as $i => $p) {
        if ($i > 0 && strlen($p) === 2) {
            $parts[$i] = strtoupper($p);
        }
    }
    return implode('-', $parts);
}

function ta_recordPageview(PDO $db, array $ev, array $ctx): string
{
    $path = ta_cleanPath($ev['path'] ?? null);
    if ($path === null) {
        return 'bad_path';
    }
    $view = ta_cleanId($ev['view'] ?? null);
    if ($view === null) {
        return 'bad_view';
    }
    $now = (int) $ctx['now'];
    $gpc = ($ev['gpc'] ?? false) === true;
    $screenW = ta_int($ev['screen_w'] ?? null, 0, 20000);
    $screenH = ta_int($ev['screen_h'] ?? null, 0, 20000);
    $viewportW = ta_int($ev['viewport_w'] ?? null, 0, 20000);
    $ua = ta_parseUa($ctx['ua'], $screenW);
    if ($ctx['agent'] === 'bot') {
        $ua['device'] = 'bot';
    }
    $tz = is_string($ev['tz'] ?? null) ? ta_canonicalTz((string) $ev['tz']) : null;
    $lang = ta_cleanLang($ev['lang'] ?? null, (string) $ctx['accept_language']);
    $ref = ta_parseReferrer(ta_text($ev['ref'] ?? null, 500), ($ev['ref_internal'] ?? false) === true, (string) $ctx['host']);
    $utm = [
        'source' => ta_text($ev['utm_source'] ?? null, 100),
        'medium' => ta_text($ev['utm_medium'] ?? null, 100),
        'campaign' => ta_text($ev['utm_campaign'] ?? null, 100),
    ];
    $facts = ta_cleanFacts($ev['facts'] ?? null);
    $notFound = ($ev['not_found'] ?? false) === true;

    return ta_tx($db, function () use ($db, $ctx, $now, $path, $view, $gpc, $screenW, $screenH, $viewportW, $ua, $tz, $lang, $ref, $utm, $facts, $notFound) {
        $dup = $db->prepare('SELECT 1 FROM pageviews WHERE view_id = ?');
        $dup->execute([$view]);
        if ($dup->fetchColumn() !== false) {
            return 'duplicate';
        }
        $visitors = ta_visitorIds($db, $ctx);
        $session = ta_activeSession($db, $visitors, $now);
        $owner = $ctx['owner'] ? 1 : 0;
        // A visit keeps the visitor hash it began with, also when it runs past
        // midnight UTC (when the salt changes): one visit is one visitor.
        $visitor = $session !== null ? (string) $session['visitor'] : $visitors[0];

        if ($session !== null) {
            $sid = (string) $session['id'];
            $seq = (int) $session['pageviews'] + 1;
            $db->prepare('UPDATE sessions SET pageviews = ?, last_ts = MAX(last_ts, CAST(? AS INTEGER)), exit_path = ?, owner = MAX(owner, CAST(? AS INTEGER)) WHERE id = ?')
                ->execute([$seq, $now, $path, $owner, $sid]);
            if ($owner && !(int) $session['owner']) {
                // The owner signed in mid-visit: the whole visit is theirs.
                $db->prepare('UPDATE pageviews SET owner = 1 WHERE session_id = ?')->execute([$sid]);
                $db->prepare('UPDATE vitals SET owner = 1 WHERE session_id = ?')->execute([$sid]);
                $db->prepare('UPDATE searches SET owner = 1 WHERE session_id = ?')->execute([$sid]);
            }
            $owner = max($owner, (int) $session['owner']);
        } else {
            $sid = bin2hex(random_bytes(8));
            $seq = 1;
            if ($ref['kind'] === 'external') {
                $channel = $ref['channel'];
                $source = $ref['name'];
            } else {
                $u = ta_classifyUtm($utm['source'], $utm['medium']);
                $channel = $u[0] ?? 'direct';
                $source = $u[1] ?? null;
            }
            $ip = $gpc ? ta_maskIp($ctx['ip']) : $ctx['ip'];
            $db->prepare('INSERT INTO sessions (id, visitor, start_ts, last_ts, pageviews, landing, exit_path, ip, ip_masked, ua, agent, bot,
                    browser, browser_ver, os, os_ver, device, lang, tz, country, screen_w, screen_h, viewport_w,
                    channel, source, ref, ref_host, utm_source, utm_medium, utm_campaign, gpc, owner)
                VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
                ->execute([
                    $sid, $visitors[0], $now, $now, $path, $path, $ip, $gpc ? 1 : 0,
                    // A GPC visitor's full user-agent string is not kept either.
                    $gpc ? '' : $ctx['ua'], $ctx['agent'], $ctx['bot'],
                    $ua['browser'], $ua['browser_ver'], $ua['os'], $ua['os_ver'], $ua['device'],
                    $lang, $tz, ta_countryFromTz($tz), $screenW, $screenH, $viewportW,
                    $channel, $source, $ref['kind'] === 'external' ? $ref['ref'] : null, $ref['kind'] === 'external' ? $ref['host'] : null,
                    $utm['source'], $utm['medium'], $utm['campaign'], $gpc ? 1 : 0, $owner,
                ]);
        }

        $is404 = $notFound;
        if (!$is404) {
            $nf = $db->prepare('SELECT 1 FROM notfound WHERE view_id = ?');
            $nf->execute([$view]);
            $is404 = $nf->fetchColumn() !== false;
        }
        $db->prepare('INSERT INTO pageviews (view_id, ts, session_id, visitor, seq, path, prev_path, channel, source, ref, ref_host, is_404, agent, owner)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                $view, $now, $sid, $visitor, $seq, $path,
                $ref['kind'] === 'internal' ? $ref['path'] : null,
                $ref['kind'] === 'external' ? $ref['channel'] : null,
                $ref['kind'] === 'external' ? $ref['name'] : null,
                $ref['kind'] === 'external' ? $ref['ref'] : null,
                $ref['kind'] === 'external' ? $ref['host'] : null,
                $is404 ? 1 : 0, $ctx['agent'], $owner,
            ]);

        if ($facts !== null && $ctx['agent'] === 'human') {
            ta_storeFacts($db, $path, $view, $facts, (string) $ctx['ip'], $now);
        }
        return 'stored';
    });
}

const TA_FACT_FIELDS = ['title', 'description', 'canonical', 'robots', 'lang', 'h1_count', 'og_title', 'og_image', 'img_no_alt'];

/** One fingerprint for a set of facts (a ta_cleanFacts() array or a row). */
function ta_factsHash(array $f): string
{
    $vals = [];
    foreach (TA_FACT_FIELDS as $k) {
        $v = $f[$k] ?? null;
        $vals[] = $v === null ? null : (string) $v;
    }
    return substr(hash('sha256', (string) json_encode($vals)), 0, 16);
}

/** The reporter's network for agreeing on facts: IPv4 /24, IPv6 /48 (the
 *  masked form), hashed. Two reports from one network are one witness. */
function ta_factsNet(string $ip): string
{
    return substr(hash('sha256', 'facts|' . ta_maskIp($ip)), 0, 16);
}

/**
 * Store a report of a page's facts. A browser's report is not proof: anyone
 * can send one. So the first report for a path is kept; a report that agrees
 * with what is stored refreshes it (and dismisses any pending challenger); a
 * report that differs waits as the challenger until a reader on another
 * network reports the very same facts, and only then replaces them. Paths
 * outside sitemap.xml gain facts at most TA_FACTS_NEW_PER_DAY a day, so a
 * flood of invented paths cannot fill the table.
 *
 * @return string facts_new | facts_confirmed | facts_changed | facts_pending | facts_capped
 */
function ta_storeFacts(PDO $db, string $path, ?string $view, array $facts, string $ip, int $now): string
{
    $hash = ta_factsHash($facts);
    $net = ta_factsNet($ip);
    $st = $db->prepare('SELECT * FROM page_facts WHERE path = ?');
    $st->execute([$path]);
    $cur = $st->fetch();
    $set = static fn() => $db->prepare('UPDATE page_facts SET ts = ?, view_id = ?, title = ?, description = ?, canonical = ?, robots = ?,
            lang = ?, h1_count = ?, og_title = ?, og_image = ?, img_no_alt = ?, cand_hash = NULL, cand_net = NULL, cand_ts = NULL WHERE path = ?')
        ->execute([$now, $view, $facts['title'], $facts['description'], $facts['canonical'], $facts['robots'], $facts['lang'],
            $facts['h1_count'], $facts['og_title'], $facts['og_image'], $facts['img_no_alt'], $path]);
    if ($cur === false) {
        if (!in_array($path, ta_sitemapPaths() ?? [], true) && !ta_factsNewToday($db, $now)) {
            return 'facts_capped';
        }
        $db->prepare('INSERT INTO page_facts (path, ts, view_id, title, description, canonical, robots, lang, h1_count, og_title, og_image, img_no_alt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([$path, $now, $view, $facts['title'], $facts['description'], $facts['canonical'], $facts['robots'],
                $facts['lang'], $facts['h1_count'], $facts['og_title'], $facts['og_image'], $facts['img_no_alt']]);
        return 'facts_new';
    }
    if (ta_factsHash($cur) === $hash) {
        $db->prepare('UPDATE page_facts SET ts = MAX(ts, CAST(? AS INTEGER)), view_id = ?, cand_hash = NULL, cand_net = NULL, cand_ts = NULL WHERE path = ?')
            ->execute([$now, $view, $path]);
        return 'facts_confirmed';
    }
    $fresh = $cur['cand_ts'] !== null && (int) $cur['cand_ts'] >= $now - TA_FACTS_CONFIRM_DAYS * 86400;
    if ($fresh && $cur['cand_hash'] === $hash) {
        if ($cur['cand_net'] !== $net) {
            $set();
            return 'facts_changed';
        }
        return 'facts_pending'; // the same network again is still one witness
    }
    $db->prepare('UPDATE page_facts SET cand_hash = ?, cand_net = ?, cand_ts = ? WHERE path = ?')->execute([$hash, $net, $now, $path]);
    return 'facts_pending';
}

/** Count one new non-sitemap path with facts today; false once the day's
 *  allowance is spent. */
function ta_factsNewToday(PDO $db, int $now): bool
{
    $key = 'facts_new:' . gmdate('Y-m-d', $now);
    $n = (int) (ta_meta($db, $key) ?? 0);
    if ($n >= TA_FACTS_NEW_PER_DAY) {
        return false;
    }
    if ($n === 0) {
        $db->prepare("DELETE FROM meta WHERE key LIKE 'facts_new:%' AND key < ?")->execute([$key]);
    }
    ta_setMeta($db, $key, (string) ($n + 1));
    return true;
}

/** Paths listed in sitemap.xml on disk (read once per request), or null with
 *  the reason. */
function ta_sitemapPaths(?string &$error = null): ?array
{
    static $cache = [];
    $root = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    $file = ($root !== '' ? rtrim($root, '/') : dirname(__DIR__)) . '/sitemap.xml';
    if (array_key_exists($file, $cache)) {
        [$paths, $error] = $cache[$file];
        return $paths;
    }
    $paths = null;
    $error = null;
    if (!is_file($file) || !is_readable($file)) {
        $error = 'sitemap.xml was not found in the web root.';
    } else {
        $xml = (string) @file_get_contents($file, false, null, 0, 10 * 1024 * 1024);
        if (!preg_match_all('#<loc>\s*([^<\s]+)\s*</loc>#i', $xml, $m)) {
            $error = 'sitemap.xml lists no URLs.';
        } else {
            $set = [];
            foreach ($m[1] as $loc) {
                $loc = html_entity_decode($loc, ENT_QUOTES | ENT_XML1, 'UTF-8');
                $p = ta_cleanPath((string) (parse_url($loc, PHP_URL_PATH) ?? '/') ?: '/');
                if ($p !== null) {
                    $set[$p] = true;
                }
            }
            $paths = array_keys($set);
        }
    }
    $cache[$file] = [$paths, $error];
    return $paths;
}

/** The pageview an event refers to, if it belongs to the same visitor. */
function ta_ownView(PDO $db, ?string $view, array $visitors): ?array
{
    if ($view === null) {
        return null;
    }
    $st = $db->prepare('SELECT id, session_id, visitor, ts, path, owner FROM pageviews WHERE view_id = ?');
    $st->execute([$view]);
    $pv = $st->fetch();
    if ($pv === false) {
        return null;
    }
    $v = (string) $pv['visitor'];
    return ($v === $visitors[0] || ($visitors[1] !== '' && $v === $visitors[1])) ? $pv : null;
}

function ta_recordEngage(PDO $db, array $ev, array $ctx): string
{
    $view = ta_cleanId($ev['view'] ?? null);
    if ($view === null) {
        return 'bad_view';
    }
    $seconds = ta_int($ev['seconds'] ?? null, 0, 86400);
    $scroll = ta_int($ev['scroll'] ?? null, 0, 100);
    if ($seconds === null && $scroll === null) {
        return 'empty';
    }
    return ta_tx($db, function () use ($db, $ctx, $view, $seconds, $scroll) {
        $pv = ta_ownView($db, $view, ta_visitorIds($db, $ctx));
        if ($pv === null) {
            return 'unknown_view';
        }
        // A figure the beacon did not measure stays unknown (NULL, which the
        // averages leave out); it is never stored as 0.
        $set = [];
        $args = [];
        if ($seconds !== null) {
            $set[] = 'engaged_s = MAX(COALESCE(engaged_s, 0), CAST(? AS INTEGER))';
            $args[] = $seconds;
        }
        if ($scroll !== null) {
            $set[] = 'scroll_pct = MAX(COALESCE(scroll_pct, 0), CAST(? AS INTEGER))';
            $args[] = $scroll;
        }
        $args[] = $pv['id'];
        $db->prepare('UPDATE pageviews SET ' . implode(', ', $set) . ' WHERE id = ?')->execute($args);
        if ($seconds !== null) {
            // Visible time only: a tab left in the background does not stretch the visit.
            $until = min((int) $ctx['now'], (int) $pv['ts'] + $seconds);
            $db->prepare('UPDATE sessions SET last_ts = MAX(last_ts, CAST(? AS INTEGER)) WHERE id = ?')->execute([$until, $pv['session_id']]);
        }
        return 'stored';
    });
}

function ta_recordVitals(PDO $db, array $ev, array $ctx): string
{
    $view = ta_cleanId($ev['view'] ?? null);
    $metrics = [
        'ttfb' => ta_int($ev['ttfb'] ?? null, 0, 120000),
        'fcp' => ta_int($ev['fcp'] ?? null, 0, 120000),
        'lcp' => ta_int($ev['lcp'] ?? null, 0, 120000),
        'inp' => ta_int($ev['inp'] ?? null, 0, 120000),
    ];
    $cls = ta_float($ev['cls'] ?? null, 0.0, 10.0);
    if ($cls !== null) {
        $cls = round($cls, 4);
    }
    if ($cls === null && count(array_filter($metrics, static fn($v) => $v !== null)) === 0) {
        return 'empty';
    }
    $nav = is_string($ev['nav'] ?? null) ? strtolower(str_replace('-', '_', (string) $ev['nav'])) : null;
    if (!in_array($nav, ['navigate', 'reload', 'back_forward', 'prerender', 'restore'], true)) {
        $nav = null;
    }
    $path = ta_cleanPath($ev['path'] ?? null);
    return ta_tx($db, function () use ($db, $ctx, $view, $metrics, $cls, $nav, $path) {
        $visitors = ta_visitorIds($db, $ctx);
        $pv = ta_ownView($db, $view, $visitors);
        $path = $pv !== null ? (string) $pv['path'] : $path;
        if ($path === null) {
            return 'bad_path';
        }
        if ($view !== null) {
            $dup = $db->prepare('SELECT 1 FROM vitals WHERE view_id = ?');
            $dup->execute([$view]);
            if ($dup->fetchColumn() !== false) {
                return 'duplicate';
            }
        }
        $session = $pv !== null ? ['id' => $pv['session_id'], 'owner' => $pv['owner']] : ta_activeSession($db, $visitors, (int) $ctx['now']);
        $device = $ctx['agent'] === 'bot' ? 'bot' : ta_parseUa($ctx['ua'])['device'];
        $db->prepare('INSERT INTO vitals (ts, view_id, session_id, path, device, nav, ttfb, fcp, lcp, cls, inp, agent, owner)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                (int) $ctx['now'], $view, $session['id'] ?? null, $path, $device, $nav,
                $metrics['ttfb'], $metrics['fcp'], $metrics['lcp'], $cls, $metrics['inp'],
                $ctx['agent'], max($ctx['owner'] ? 1 : 0, (int) ($session['owner'] ?? 0)),
            ]);
        return 'stored';
    });
}

function ta_cleanQuery($v): ?string
{
    $q = ta_text($v, 400);
    if ($q === null) {
        return null;
    }
    $q = mb_strtolower($q);
    $q = trim(mb_substr($q, 0, 80));
    return $q === '' ? null : $q;
}

function ta_recordSearch(PDO $db, array $ev, array $ctx): string
{
    $q = ta_cleanQuery($ev['query'] ?? null);
    if ($q === null) {
        return 'empty';
    }
    $results = ta_int($ev['results'] ?? null, 0, 1000000);
    $path = ta_cleanPath($ev['path'] ?? null);
    return ta_tx($db, function () use ($db, $ctx, $q, $results, $path) {
        $visitors = ta_visitorIds($db, $ctx);
        $session = ta_activeSession($db, $visitors, (int) $ctx['now']);
        $db->prepare('INSERT INTO searches (ts, session_id, visitor, path, query, results, agent, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                (int) $ctx['now'], $session['id'] ?? null, $visitors[0], $path, $q, $results,
                $ctx['agent'], max($ctx['owner'] ? 1 : 0, (int) ($session['owner'] ?? 0)),
            ]);
        return 'stored';
    });
}

function ta_recordNotFound(PDO $db, array $ev, array $ctx): string
{
    $path = ta_cleanPath($ev['path'] ?? null);
    if ($path === null) {
        return 'bad_path';
    }
    $view = ta_cleanId($ev['view'] ?? null);
    $ref = ta_parseReferrer(ta_text($ev['ref'] ?? null, 500), ($ev['ref_internal'] ?? false) === true, (string) $ctx['host']);
    $refText = $ref['kind'] === 'external' ? $ref['ref'] : ($ref['kind'] === 'internal' ? $ref['path'] : null);
    return ta_tx($db, function () use ($db, $ctx, $path, $view, $ref, $refText) {
        $visitors = ta_visitorIds($db, $ctx);
        if ($view !== null) {
            $dup = $db->prepare('SELECT 1 FROM notfound WHERE view_id = ?');
            $dup->execute([$view]);
            if ($dup->fetchColumn() !== false) {
                return 'duplicate';
            }
        }
        $pv = ta_ownView($db, $view, $visitors);
        $session = $pv !== null ? ['id' => $pv['session_id'], 'owner' => $pv['owner']] : ta_activeSession($db, $visitors, (int) $ctx['now']);
        $db->prepare('INSERT INTO notfound (ts, path, ref, ref_host, session_id, view_id, agent, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([
                (int) $ctx['now'], $path, $refText, $ref['kind'] === 'external' ? $ref['host'] : ($ref['kind'] === 'internal' ? '(internal)' : null),
                $session['id'] ?? null, $view, $ctx['agent'], max($ctx['owner'] ? 1 : 0, (int) ($session['owner'] ?? 0)),
            ]);
        if ($pv !== null) {
            $db->prepare('UPDATE pageviews SET is_404 = 1 WHERE id = ?')->execute([$pv['id']]);
        }
        return 'stored';
    });
}

function ta_recordOutbound(PDO $db, array $ev, array $ctx): string
{
    $host = ta_cleanHost($ev['host'] ?? null);
    if ($host === null) {
        return 'bad_host';
    }
    $path = ta_cleanPath($ev['path'] ?? null);
    return ta_tx($db, function () use ($db, $ctx, $host, $path) {
        $session = ta_activeSession($db, ta_visitorIds($db, $ctx), (int) $ctx['now']);
        $db->prepare('INSERT INTO outbound (ts, session_id, path, host, agent, owner) VALUES (?, ?, ?, ?, ?, ?)')
            ->execute([
                (int) $ctx['now'], $session['id'] ?? null, $path, $host,
                $ctx['agent'], max($ctx['owner'] ? 1 : 0, (int) ($session['owner'] ?? 0)),
            ]);
        return 'stored';
    });
}

// --------------------------------------------------------- crawler log ---

/** What crawl.php answers for a path: [file name, kind]. */
function ta_crawlKind(string $path): string
{
    switch ($path) {
        case '/robots.txt':
            return 'robots';
        case '/sitemap.xml':
            return 'sitemap';
        case '/llms.txt':
            return 'llms';
        default:
            return 'page';
    }
}

/**
 * Record one crawler request. $c: now, ip, ua, path, status, method.
 * Returns 'stored' or why not.
 */
function ta_logCrawl(PDO $db, array $c, array $limits = []): string
{
    $ua = ta_cleanUa($c['ua'] ?? '');
    $known = ta_knownCrawler($ua);
    if ($known === null) {
        // Only the .htaccess block's crawlers are logged; a person or script
        // requesting /api/crawl.php directly gets the page and leaves no row.
        return 'not_a_crawler';
    }
    $bot = $known[0];
    $path = ta_cleanPath((string) ($c['path'] ?? '/')) ?? '/';
    if (str_starts_with($path, '/api/')) {
        return 'skipped';
    }
    $ip = (string) ($c['ip'] ?? '0.0.0.0');
    $method = strtoupper((string) ($c['method'] ?? 'GET')) === 'HEAD' ? 'HEAD' : 'GET';
    $now = (int) ($c['now'] ?? time());
    if (ta_storageFull($limits['max_bytes'] ?? null)) {
        return 'storage_full';
    }
    // Anyone can claim to be Googlebot. Past this many rows from one network
    // (an IPv4 address, an IPv6 /64) in ten minutes, or from everyone in a
    // minute, the visit is still served, just no longer written down.
    $perNet = $limits['per_net'] ?? TA_CRAWL_LOG_LIMIT;
    $perMinute = $limits['per_minute'] ?? TA_CRAWL_GLOBAL_PER_MIN;
    if (!ta_admitPeek($db, 'c', $ip, $now, $perNet, $perMinute)) {
        return 'rate_limited';
    }
    return ta_tx($db, function () use ($db, $ip, $now, $perNet, $perMinute, $bot, $path, $ua, $method, $c) {
        if (!ta_admit($db, 'c', $ip, $now, $perNet, $perMinute)) {
            return 'rate_limited';
        }
        // The reverse-DNS verdict belongs to the address and the operator: a
        // Google address checked as Googlebot is as verified when it fetches
        // as Google-InspectionTool.
        $st = $db->prepare('SELECT bot, verdict FROM bot_verdicts WHERE ip = ?');
        $st->execute([$ip]);
        $v = $st->fetch();
        $verdict = $v !== false && $v['verdict'] !== 'error' && ta_sameOperator((string) $v['bot'], $bot) ? (string) $v['verdict'] : null;
        $db->prepare('INSERT INTO crawls (ts, path, kind, bot, ua, ip, ip_masked, status, method, verdict) VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?)')
            ->execute([$now, $path, ta_crawlKind($path), $bot, $ua, $ip, (int) ($c['status'] ?? 200), $method, $verdict]);
        return 'stored';
    });
}

/** Two crawler names from the same operator (the same verification family). */
function ta_sameOperator(string $a, string $b): bool
{
    if ($a === $b) {
        return true;
    }
    $fa = ta_crawlerFamily($a);
    return $fa !== '' && $fa === ta_crawlerFamily($b);
}

/** Every crawler name of $bot's operator. */
function ta_operatorNames(string $bot): array
{
    $family = ta_crawlerFamily($bot);
    if ($family === '') {
        return [$bot];
    }
    $names = [];
    foreach (TA_CRAWLERS as [, $name, $f]) {
        if ($f === $family) {
            $names[] = $name;
        }
    }
    return $names;
}

// ----------------------------------------------------- bot verification ---

/**
 * Reverse DNS, then forward-confirm: the PTR name must sit under one of the
 * operator's documented domains AND resolve back to the same address.
 *
 * @param callable|null $reverse fn(string $ip): string|false  (default gethostbyaddr)
 * @param callable|null $forward fn(string $host): string[]     (default A/AAAA lookup)
 * @return array{verdict:string,ptr:?string}
 *   verdict: verified | failed | unverifiable | error
 */
function ta_verifyCrawlerIp(string $ip, string $bot, ?callable $reverse = null, ?callable $forward = null): array
{
    $family = ta_crawlerFamily($bot);
    $domains = TA_VERIFY_DOMAINS[$family] ?? null;
    if ($domains === null) {
        return ['verdict' => 'unverifiable', 'ptr' => null];
    }
    if (!ta_validIp($ip) || ta_isMaskedForm($ip)) {
        return ['verdict' => 'unverifiable', 'ptr' => null];
    }
    $reverse = $reverse ?? static fn(string $a) => @gethostbyaddr($a);
    $forward = $forward ?? static function (string $h): array {
        $out = @gethostbynamel($h) ?: [];
        $aaaa = @dns_get_record($h, DNS_AAAA);
        foreach (is_array($aaaa) ? $aaaa : [] as $r) {
            if (isset($r['ipv6'])) {
                $out[] = $r['ipv6'];
            }
        }
        return $out;
    };
    $ptr = $reverse($ip);
    // gethostbyaddr() answers with the address itself both when there is no
    // PTR record and when the resolver timed out or could not be reached, so
    // that answer proves nothing either way: "error", checked again later,
    // never "failed" (which the dashboard reads as "impostor, likely").
    if (!is_string($ptr) || $ptr === '' || $ptr === $ip) {
        return ['verdict' => 'error', 'ptr' => null];
    }
    $ptr = strtolower(rtrim($ptr, '.'));
    $under = false;
    foreach ($domains as $d) {
        if (str_ends_with($ptr, '.' . $d)) {
            $under = true;
            break;
        }
    }
    if (!$under) {
        return ['verdict' => 'failed', 'ptr' => $ptr];
    }
    $want = @inet_pton($ip);
    foreach ($forward($ptr) as $addr) {
        $got = @inet_pton((string) $addr);
        if ($got !== false && $want !== false && hash_equals($want, $got)) {
            return ['verdict' => 'verified', 'ptr' => $ptr];
        }
    }
    return ['verdict' => 'failed', 'ptr' => $ptr];
}

/** Store a verdict and stamp it on every logged crawl from that address by a
 *  crawler of the same operator (Google's crawlers share their addresses). */
function ta_saveVerdict(PDO $db, string $ip, string $bot, array $v, int $now): void
{
    ta_tx($db, function () use ($db, $ip, $bot, $v, $now) {
        $db->prepare('INSERT INTO bot_verdicts (ip, bot, verdict, ptr, checked_ts) VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(ip) DO UPDATE SET bot = excluded.bot, verdict = excluded.verdict, ptr = excluded.ptr, checked_ts = excluded.checked_ts')
            ->execute([$ip, $bot, $v['verdict'], $v['ptr'], $now]);
        if ($v['verdict'] !== 'error') {
            $names = ta_operatorNames($bot);
            $ph = implode(',', array_fill(0, count($names), '?'));
            $db->prepare("UPDATE crawls SET verdict = ? WHERE ip = ? AND ip_masked = 0 AND bot IN ($ph)")
                ->execute(array_merge([$v['verdict'], $ip], $names));
        }
    });
}

// ------------------------------------------------------------ retention ---

/**
 * Mask full IPs past the IP window, delete events past the keep window, drop
 * cached verdicts whose address is no longer kept whole. Throttled unless
 * $force. Returns the summary (also stored as meta last_prune) or null if
 * skipped.
 *
 * The work is done TA_MAINTAIN_BATCH rows per transaction, each step reading
 * only the rows it has work for (the partial indexes of schema 2), so the
 * write lock that beacons and crawler rows wait on is held for milliseconds
 * at a time, however large the database has grown.
 */
function ta_maintain(PDO $db, int $now, bool $force = false): ?array
{
    $claimed = ta_tx($db, function () use ($db, $now, $force) {
        if (!$force) {
            $last = json_decode((string) ta_meta($db, 'last_prune'), true);
            $claim = (int) (ta_meta($db, 'prune_claim') ?? 0);
            if ((is_array($last) && (int) ($last['ts'] ?? 0) > $now - TA_PRUNE_MIN_GAP) || $claim > $now - TA_PRUNE_MIN_GAP) {
                return false;
            }
        }
        ta_setMeta($db, 'prune_claim', (string) $now);
        return true;
    });
    if (!$claimed) {
        return null;
    }
    $ipCut = $now - ta_ipDays() * 86400;
    $keepCut = $now - ta_keepDays() * 86400;
    $batch = TA_MAINTAIN_BATCH;
    // Run $step (one batch, in its own transaction) until it does less than a batch.
    $loop = static function (callable $step) use ($db, $batch): int {
        $total = 0;
        do {
            $n = (int) ta_tx($db, $step);
            $total += $n;
        } while ($n >= $batch);
        return $total;
    };

    $masked = ['sessions' => 0, 'crawls' => 0];
    // Masked sessions keep their parsed browser and OS; the raw UA string,
    // which can be close to unique, goes with the address.
    $masked['sessions'] = $loop(static function () use ($db, $ipCut, $batch) {
        $st = $db->prepare('SELECT rowid AS r, ip FROM sessions INDEXED BY sessions_unmasked WHERE ip_masked = 0 AND last_ts < ? LIMIT ' . $batch);
        $st->execute([$ipCut]);
        $up = $db->prepare("UPDATE sessions SET ip = ?, ip_masked = 1, ua = '' WHERE rowid = ?");
        $rows = $st->fetchAll();
        foreach ($rows as $r) {
            $up->execute([ta_maskIp((string) $r['ip']), $r['r']]);
        }
        return count($rows);
    });
    $masked['crawls'] = $loop(static function () use ($db, $ipCut, $batch) {
        $st = $db->prepare('SELECT rowid AS r, ip FROM crawls INDEXED BY crawls_unmasked WHERE ip_masked = 0 AND ts < ? LIMIT ' . $batch);
        $st->execute([$ipCut]);
        $up = $db->prepare('UPDATE crawls SET ip = ?, ip_masked = 1 WHERE rowid = ?');
        $rows = $st->fetchAll();
        foreach ($rows as $r) {
            $up->execute([ta_maskIp((string) $r['ip']), $r['r']]);
        }
        return count($rows);
    });
    // Masked before the raw UA went with the address (older versions).
    $loop(static function () use ($db, $ipCut, $batch) {
        $st = $db->prepare("UPDATE sessions SET ua = '' WHERE rowid IN (SELECT rowid FROM sessions INDEXED BY sessions_ua_left
            WHERE ip_masked = 1 AND ua <> '' AND last_ts < ? LIMIT $batch)");
        $st->execute([$ipCut]);
        return $st->rowCount();
    });

    // A verdict names a full address (and its PTR often spells it out): it
    // goes when no crawl from that address is kept unmasked, or when it is as
    // old as the IP window itself.
    $verdicts = (int) ta_tx($db, static function () use ($db, $ipCut) {
        $st = $db->prepare('DELETE FROM bot_verdicts WHERE checked_ts < ?
            OR NOT EXISTS (SELECT 1 FROM crawls c WHERE c.ip = bot_verdicts.ip AND c.ip_masked = 0)');
        $st->execute([$ipCut]);
        return $st->rowCount();
    });

    $deleted = [];
    foreach (['pageviews' => 'ts', 'sessions' => 'last_ts', 'vitals' => 'ts', 'searches' => 'ts', 'notfound' => 'ts',
              'outbound' => 'ts', 'crawls' => 'ts', 'page_facts' => 'ts'] as $table => $col) {
        $deleted[$table] = $loop(static function () use ($db, $table, $col, $keepCut, $batch) {
            $st = $db->prepare("DELETE FROM $table WHERE rowid IN (SELECT rowid FROM $table WHERE $col < ? LIMIT $batch)");
            $st->execute([$keepCut]);
            return $st->rowCount();
        });
    }
    $summary = ['ts' => $now, 'masked' => $masked, 'deleted' => $deleted, 'verdicts_dropped' => $verdicts,
                'ip_days' => ta_ipDays(), 'keep_days' => ta_keepDays()];
    ta_tx($db, static function () use ($db, $now, $summary) {
        $db->prepare('DELETE FROM rate_log WHERE ts <= ?')->execute([$now - TA_RATE_WINDOW]);
        ta_setMeta($db, 'last_prune', (string) json_encode($summary));
    });
    try {
        $db->exec('PRAGMA incremental_vacuum');
    } catch (Throwable) {
    }
    return $summary;
}

/**
 * A beacon must come from one of the site's own pages: the Origin header's
 * host (or, when a browser sends no Origin, the Referer's) must be the
 * request's own host or one of the site's hosts. localhost passes only when
 * the request itself was made to localhost, so tests and dev servers work.
 */
function ta_beaconOriginOk(array $server): bool
{
    $self = strtolower(rtrim((string) preg_replace('/:\d+$/', '', (string) ($server['HTTP_HOST'] ?? '')), '.'));
    $origin = (string) ($server['HTTP_ORIGIN'] ?? '');
    $candidate = $origin !== '' ? $origin : (string) ($server['HTTP_REFERER'] ?? '');
    if ($candidate === '' || $candidate === 'null') {
        return false;
    }
    $host = parse_url($candidate, PHP_URL_HOST);
    $scheme = strtolower((string) parse_url($candidate, PHP_URL_SCHEME));
    if (!is_string($host) || !in_array($scheme, ['http', 'https'], true)) {
        return false;
    }
    $host = strtolower(rtrim($host, '.'));
    return ($self !== '' && $host === $self) || in_array($host, TA_SITE_HOSTS, true);
}

// --------------------------------------------------------- the response ---

/** Let the client go before the work: LiteSpeed and PHP-FPM can close the
 *  connection early. Elsewhere this is a flush and the work follows. */
function ta_finishRequest(): void
{
    if (function_exists('litespeed_finish_request')) {
        @litespeed_finish_request();
    } elseif (function_exists('fastcgi_finish_request')) {
        @fastcgi_finish_request();
    } else {
        @flush();
    }
}

// ------------------------------------------------------- admin sessions ---

/** Keys the dashboard needs that the secrets file lacks. */
function ta_adminMissing(): array
{
    $missing = [];
    foreach (['cookie_secret', 'admin_email', 'admin_password_hash'] as $k) {
        if (ta_secret($k) === '') {
            $missing[] = $k;
        }
    }
    return $missing;
}

/** Changes whenever the password hash changes, signing every session out. */
function ta_adminFingerprint(): string
{
    return substr(hash('sha256', ta_secret('admin_password_hash')), 0, 16);
}

/**
 * The sign-out generation: every session token carries the generation it was
 * issued in, and signing out moves the generation on, so every token issued
 * before — on this browser or copied off it — stops working at once ("sign
 * out everywhere"; there is one owner). Kept in the analytics database; null
 * when the database cannot be read.
 */
function ta_adminGeneration(?PDO $db): ?int
{
    if ($db === null) {
        return null;
    }
    try {
        return (int) (ta_meta($db, 'admin_generation') ?? 0);
    } catch (Throwable) {
        return null;
    }
}

/** Sign every session out. Returns the new generation. */
function ta_adminRevokeAll(PDO $db): int
{
    return (int) ta_tx($db, static function () use ($db) {
        $g = (int) (ta_meta($db, 'admin_generation') ?? 0) + 1;
        ta_setMeta($db, 'admin_generation', (string) $g);
        return $g;
    });
}

/** Needs _lib.php (signPayload). */
function ta_adminIssue(int $now, ?PDO $db = null): string
{
    if (!function_exists('signPayload') || ta_adminMissing() !== []) {
        return '';
    }
    $g = ta_adminGeneration($db ?? ta_db()) ?? 0;
    return signPayload(['v' => 1, 'iat' => $now, 'exp' => $now + TA_ADMIN_TTL, 'ph' => ta_adminFingerprint(), 'g' => $g], TA_ADMIN_DOMAIN);
}

/** The verified admin session payload, or null. Needs _lib.php (verifyToken). */
function ta_adminVerify(string $token, int $now, ?PDO $db = null): ?array
{
    if ($token === '' || strlen($token) > 1024 || !function_exists('verifyToken') || ta_adminMissing() !== []) {
        return null;
    }
    $p = verifyToken($token, TA_ADMIN_DOMAIN);
    if (!is_array($p)) {
        return null;
    }
    $iat = $p['iat'] ?? null;
    $exp = $p['exp'] ?? null;
    $ph = $p['ph'] ?? null;
    $g = $p['g'] ?? 0;
    if (!is_int($iat) || !is_int($exp) || !is_string($ph) || !is_int($g)) {
        return null;
    }
    if ($exp <= $now || $iat > $now + 60 || $exp - $iat > TA_ADMIN_TTL) {
        return null;
    }
    if (!hash_equals(ta_adminFingerprint(), $ph)) {
        return null;
    }
    // Signed out since this token was issued. (With the database unreadable
    // the generation is unknown and the other checks stand alone: the owner
    // must still reach the health page that says what is wrong.)
    $current = ta_adminGeneration($db ?? ta_db());
    if ($current !== null && $g !== $current) {
        return null;
    }
    return $p;
}

function ta_adminFromCookie(int $now, ?PDO $db = null): ?array
{
    $raw = $_COOKIE[TA_ADMIN_COOKIE] ?? '';
    return is_string($raw) ? ta_adminVerify($raw, $now, $db) : null;
}
