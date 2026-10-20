<?php
/**
 * Three Magi Press — the owner's dashboard API.
 *
 *   /api/admin.php?a=<action>
 *
 * Actions and their JSON are specified in docs/analytics.md. The owner signs
 * in with the email and password whose hash is in tl-secrets.php (above the
 * document root, never in git); the session is a signed token in the
 * HttpOnly cookie tl_admin, scoped to /api/ and SameSite=Strict.
 *
 * Every POST must be Content-Type: application/json with an Origin equal to
 * this site's own. Every response is no-store and noindex. Every query is a
 * prepared statement and every range, sort and filter is whitelisted here
 * before it reaches _analytics_report.php.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';
require __DIR__ . '/_analytics.php';
require __DIR__ . '/_analytics_report.php';

// _lib.php has already sent Content-Type (JSON), nosniff, Referrer-Policy
// same-origin and Cache-Control no-store.
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");

const ADMIN_ACTIONS = [
    'login' => 'POST',
    'logout' => 'POST',
    'me' => 'GET',
    'stats' => 'GET',
    'visitors' => 'GET',
    'visitor' => 'GET',
    'live' => 'GET',
    'crawlers' => 'GET',
    'seo' => 'GET',
    'export' => 'GET',
    'verify-bot' => 'POST',
    'prune' => 'POST',
    'health' => 'GET',
    'setup-file' => 'POST',
];
const ADMIN_SECTIONS = ['overview', 'pages', 'page', 'sources', 'search', 'technology'];
const ADMIN_LOGIN_MAX = 5;            // failed sign-ins per network (IPv4 address, IPv6 /64)…
const ADMIN_LOGIN_WINDOW = 900;       // …in 15 minutes
const ADMIN_LOGIN_GLOBAL_MAX = 30;    // failed sign-ins from everyone together…
const ADMIN_LOGIN_GLOBAL_WINDOW = 3600; // …in an hour
const ADMIN_FAIL_MESSAGE = 'That email and password do not match.';

// ------------------------------------------------------------- helpers ---

function admin_badParam(string $name): void
{
    respond(400, ['ok' => false, 'error' => "Bad value for \"$name\".", 'code' => 'bad_param', 'param' => $name]);
}

/** A query-string value, or null when absent/empty. Arrays are refused. */
function admin_q(string $name): ?string
{
    if (!isset($_GET[$name])) {
        return null;
    }
    $v = $_GET[$name];
    if (!is_string($v)) {
        admin_badParam($name);
    }
    $v = trim($v);
    return $v === '' ? null : $v;
}

function admin_enum(string $name, array $allowed, ?string $default): ?string
{
    $v = admin_q($name);
    if ($v === null) {
        return $default;
    }
    if (!in_array($v, $allowed, true)) {
        admin_badParam($name);
    }
    return $v;
}

function admin_intParam(string $name, int $min, int $max, int $default): int
{
    $v = admin_q($name);
    if ($v === null) {
        return $default;
    }
    if (!preg_match('/^\d{1,9}$/', $v) || (int) $v < $min || (int) $v > $max) {
        admin_badParam($name);
    }
    return (int) $v;
}

function admin_pathParam(string $name, bool $required = false): ?string
{
    $v = admin_q($name);
    if ($v === null) {
        if ($required) {
            admin_badParam($name);
        }
        return null;
    }
    $p = ta_cleanPath($v);
    if ($p === null) {
        admin_badParam($name);
    }
    return $p;
}

function admin_ipParam(string $name, bool $required = false): ?string
{
    $v = admin_q($name);
    if ($v === null) {
        if ($required) {
            admin_badParam($name);
        }
        return null;
    }
    if (!ta_validIp($v)) {
        admin_badParam($name);
    }
    return $v;
}

function admin_range(int $now): array
{
    $key = admin_enum('range', TA_RANGES, '7d');
    $tz = admin_q('tz') ?? ta_defaultTz();
    $r = ta_range((string) $key, admin_q('from'), admin_q('to'), $tz, $now);
    if (is_string($r)) {
        admin_badParam($r);
    }
    return $r;
}

function admin_includeOwner(): bool
{
    return admin_enum('include_owner', ['0', '1'], '0') === '1';
}

function admin_db(): PDO
{
    $db = ta_db(5000);
    if ($db === null) {
        respond(503, ['ok' => false, 'error' => 'Analytics storage is not available.', 'code' => 'storage_unavailable', 'storage' => ta_storageError()]);
    }
    return $db;
}

/** Host[:port] with the scheme's default port removed. */
function admin_hostKey(string $host, ?int $port, string $scheme): string
{
    $host = strtolower(rtrim($host, '.'));
    if ($port === null || ($scheme === 'https' && $port === 443) || ($scheme === 'http' && $port === 80)) {
        return $host;
    }
    return $host . ':' . $port;
}

/** CSRF: JSON content type and an Origin that is this very site. */
function admin_sameOriginPost(): bool
{
    $ct = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? ''));
    if (!preg_match('#^application/json\s*(;|$)#', $ct)) {
        return false;
    }
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin === '' || $origin === 'null') {
        return false;
    }
    $o = parse_url($origin);
    if (!is_array($o) || !isset($o['host'], $o['scheme']) || isset($o['path']) && $o['path'] !== '' && $o['path'] !== '/') {
        return false;
    }
    $scheme = strtolower((string) $o['scheme']);
    if (!in_array($scheme, ['http', 'https'], true)) {
        return false;
    }
    $hostHeader = (string) ($_SERVER['HTTP_HOST'] ?? '');
    if ($hostHeader === '') {
        return false;
    }
    $h = parse_url($scheme . '://' . $hostHeader);
    if (!is_array($h) || !isset($h['host'])) {
        return false;
    }
    $want = admin_hostKey((string) $h['host'], isset($h['port']) ? (int) $h['port'] : null, $scheme);
    $got = admin_hostKey((string) $o['host'], isset($o['port']) ? (int) $o['port'] : null, $scheme);
    return hash_equals($want, $got);
}

function admin_jsonBody(): array
{
    $raw = file_get_contents('php://input', false, null, 0, 4097);
    if (!is_string($raw) || strlen($raw) > 4096) {
        respond(413, ['ok' => false, 'error' => 'Request too large.', 'code' => 'too_large']);
    }
    if (trim($raw) === '') {
        return [];
    }
    $body = json_decode($raw, true, 4);
    if (!is_array($body)) {
        respond(400, ['ok' => false, 'error' => 'Send a JSON object.', 'code' => 'bad_request']);
    }
    return $body;
}

function admin_cookie(string $value, int $expires): void
{
    setcookie(TA_ADMIN_COOKIE, $value, [
        'expires' => $expires,
        'path' => '/api/',
        'secure' => !isLocalRequest(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function admin_normEmail(string $e): string
{
    return strtolower(trim($e));
}

/** Did this request reach the server over HTTPS? X-Forwarded-Proto counts
 *  only from a proxy on this machine or the host's private network, where a
 *  visitor cannot be: from anyone else it is just a header they chose. */
function admin_isHttps(): bool
{
    $https = strtolower((string) ($_SERVER['HTTPS'] ?? ''));
    if ($https !== '' && $https !== 'off') {
        return true;
    }
    if ((string) ($_SERVER['SERVER_PORT'] ?? '') === '443' || strtolower((string) ($_SERVER['REQUEST_SCHEME'] ?? '')) === 'https') {
        return true;
    }
    $proto = strtolower(trim(explode(',', (string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? ''))[0]));
    $peer = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    $internal = filter_var($peer, FILTER_VALIDATE_IP) !== false
        && filter_var($peer, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false;
    return $proto === 'https' && $internal;
}

/** Where the sign-in limits are counted: files of their own (not shared with
 *  the membership endpoints' limits), outside the web root. */
function admin_rateDir(): ?string
{
    $dir = sys_get_temp_dir() . '/tl-admin-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return null;
    }
    return $dir;
}

/** [this network's file, everyone's file], or nulls when the folder is unusable. */
function admin_loginFiles(): array
{
    $dir = admin_rateDir();
    if ($dir === null) {
        return [null, null];
    }
    if (random_int(1, 20) === 1) {
        $cutoff = time() - 2 * ADMIN_LOGIN_GLOBAL_WINDOW;
        foreach (glob($dir . '/login-*.json') ?: [] as $old) {
            if (@filemtime($old) < $cutoff) {
                @unlink($old);
            }
        }
    }
    return [$dir . '/login-' . hash('sha256', ta_netKey(clientIp())) . '.json', $dir . '/login-all.json'];
}

/** For the Settings page: failed sign-ins from everyone in the last hour. */
function admin_loginStatus(int $now): array
{
    [, $all] = admin_loginFiles();
    $n = $all === null ? 0 : rateLimitCount($all, ADMIN_LOGIN_GLOBAL_WINDOW, $now);
    return ['failures_last_hour' => $n, 'limit_per_hour' => ADMIN_LOGIN_GLOBAL_MAX, 'per_network' => ADMIN_LOGIN_MAX,
        'per_network_window_s' => ADMIN_LOGIN_WINDOW, 'under_attack' => $n >= ADMIN_LOGIN_GLOBAL_MAX];
}

/** A hash of the same algorithm and cost as the real one, that no password
 *  matches. Verifying against it when the email is wrong makes both failures
 *  cost the same time. */
function admin_dummyHash(string $real): string
{
    if (preg_match('/^\$2[aby]\$(\d{2})\$/', $real, $m)) {
        return '$2y$' . $m[1] . '$' . 'Q3VtbXlTYWx0Rm9yVGlt' . 'aW' . 'ngdummyhashthatmatchesnothing00';
    }
    // argon2 and others: the real hash, with the result discarded below.
    return $real;
}

// -------------------------------------------------------------- routing ---

$now = time();
$action = $_GET['a'] ?? '';
if (!is_string($action) || !isset(ADMIN_ACTIONS[$action])) {
    fail(404, 'Unknown action.', 'unknown_action');
}
$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');
if ($method !== ADMIN_ACTIONS[$action]) {
    header('Allow: ' . ADMIN_ACTIONS[$action]);
    fail(405, 'Method not allowed.', 'method');
}

// Over plain HTTP the email, the password and the session token would cross
// the network readable by anyone on the way (and the browser would drop the
// Secure cookie anyway). Only localhost is exempt, for development and tests.
if (!admin_isHttps() && !isLocalRequest()) {
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $url = preg_match('/^[a-z0-9.-]{1,253}$/', $host) ? 'https://' . $host . '/admin' : null;
    respond(403, ['ok' => false, 'error' => 'The dashboard works only over HTTPS.' . ($url !== null ? " Open $url instead." : ''),
        'code' => 'https_required', 'https_url' => $url]);
}

$missing = ta_adminMissing();
if ($missing === []) {
    ta_db(5000); // opened once here, so every check below shares it
}

if ($action === 'health') {
    $session = $missing === [] ? ta_adminFromCookie($now) : null;
    if ($session === null) {
        // Signed out (or not set up): only whether setup is complete.
        respond(200, ['ok' => true, 'authenticated' => false, 'configured' => $missing === [], 'missing' => $missing]);
    }
    respond(200, ['ok' => true] + ta_reportHealth(ta_db(5000), $now, $session) + ['login' => admin_loginStatus($now)]);
}

// While the dashboard is not set up, the setup page can write the secrets
// file for the owner: they type the email and password once (over HTTPS, as
// at sign-in), and get back the lines to paste into tl-secrets.php: the email,
// a bcrypt hash of the password and, when missing, a fresh cookie_secret.
// Nothing is stored and nothing is granted: the answer is only text, useful
// to whoever can write the file above public_html. Once the keys are in place
// the action is gone (404).
if ($action === 'setup-file') {
    if ($missing === []) {
        fail(404, 'The dashboard is already set up.', 'configured');
    }
    if (!admin_sameOriginPost()) {
        fail(403, 'Request refused.', 'csrf');
    }
    // bcrypt is slow on purpose: the same per-network allowance as sign-in.
    [$netFile] = admin_loginFiles();
    if ($netFile !== null && rateLimitTake($netFile, ADMIN_LOGIN_MAX, ADMIN_LOGIN_WINDOW, $now) === false) {
        header('Retry-After: ' . ADMIN_LOGIN_WINDOW);
        respond(429, ['ok' => false, 'error' => 'Too many attempts. Try again in 15 minutes.', 'code' => 'locked', 'retry_after' => ADMIN_LOGIN_WINDOW]);
    }
    $body = admin_jsonBody();
    $email = is_string($body['email'] ?? null) ? trim((string) $body['email']) : '';
    $password = is_string($body['password'] ?? null) ? (string) $body['password'] : '';
    if ($email === '' || strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        fail(400, 'Enter the email address you will sign in with.', 'bad_email');
    }
    if (mb_strlen($password) < 12 || strlen($password) > 1024) {
        fail(400, 'Choose a password of at least 12 characters.', 'weak_password');
    }
    $q = static fn(string $v) => "'" . str_replace(['\\', "'"], ['\\\\', "\\'"], $v) . "'";
    $lines = [
        "    'admin_email'         => " . $q(strtolower($email)) . ',',
        "    'admin_password_hash' => " . $q((string) password_hash($password, PASSWORD_DEFAULT)) . ',',
    ];
    if (in_array('cookie_secret', $missing, true)) {
        $lines[] = "    'cookie_secret'       => " . $q(bin2hex(random_bytes(32))) . ', // signs sessions; changing it signs everyone out';
    }
    $file = "<?php\n// Three Magi Press: server secrets. Keep this file ONE LEVEL ABOVE public_html,\n"
        . "// named tl-secrets.php. Never put it inside public_html; never commit it.\n"
        . "// admin_password_hash is a one-way hash: the password itself is not here.\n"
        . "return [\n" . implode("\n", $lines) . "\n];\n";
    respond(200, ['ok' => true, 'file' => $file, 'lines' => implode("\n", $lines), 'new_cookie_secret' => in_array('cookie_secret', $missing, true)]);
}

if ($missing !== []) {
    respond(503, ['ok' => false, 'error' => 'The dashboard is not configured on this server.', 'code' => 'not_configured', 'missing' => $missing]);
}

$body = [];
if ($method === 'POST') {
    if (!admin_sameOriginPost()) {
        fail(403, 'Request refused.', 'csrf');
    }
    $body = admin_jsonBody();
}

if ($action === 'login') {
    // Every attempt takes its slot BEFORE the password is checked, in one
    // locked step per bucket, so a burst of parallel guesses cannot all slip
    // past the count while each is still being verified. A sign-in that
    // succeeds gives its slots back: the buckets count failures.
    [$netFile, $allFile] = admin_loginFiles();
    $mine = $netFile === null ? null : rateLimitTake($netFile, ADMIN_LOGIN_MAX, ADMIN_LOGIN_WINDOW, $now);
    if ($mine === false) {
        header('Retry-After: ' . ADMIN_LOGIN_WINDOW);
        respond(429, ['ok' => false, 'error' => 'Too many attempts. Try again in 15 minutes.', 'code' => 'locked', 'retry_after' => ADMIN_LOGIN_WINDOW]);
    }
    // Rotating addresses (every IPv6 /64, a proxy pool) meets a ceiling for
    // the whole site; a signed-in browser keeps working meanwhile.
    $all = $allFile === null ? null : rateLimitTake($allFile, ADMIN_LOGIN_GLOBAL_MAX, ADMIN_LOGIN_GLOBAL_WINDOW, $now);
    if ($all === false) {
        if ($mine === true) {
            rateLimitGiveBack((string) $netFile, $now);
        }
        header('Retry-After: ' . ADMIN_LOGIN_GLOBAL_WINDOW);
        respond(429, ['ok' => false, 'error' => 'Sign-in is paused: too many failed attempts from many addresses in the last hour. Try again later.',
            'code' => 'locked_all', 'retry_after' => ADMIN_LOGIN_GLOBAL_WINDOW]);
    }
    $email = is_string($body['email'] ?? null) ? (string) $body['email'] : '';
    $password = is_string($body['password'] ?? null) ? (string) $body['password'] : '';
    $realHash = ta_secret('admin_password_hash');
    $emailOk = $email !== '' && hash_equals(admin_normEmail(ta_secret('admin_email')), admin_normEmail($email));
    $tooLong = strlen($password) > 1024;
    // Exactly one password_verify on every path, against a hash of the same cost.
    $verified = password_verify($tooLong ? '' : $password, $emailOk ? $realHash : admin_dummyHash($realHash));
    if (!$emailOk || $tooLong || $password === '' || !$verified) {
        fail(401, ADMIN_FAIL_MESSAGE, 'bad_credentials'); // the slots taken above stay: they are the failure
    }
    if ($mine === true) {
        rateLimitGiveBack((string) $netFile, $now);
    }
    if ($all === true) {
        rateLimitGiveBack((string) $allFile, $now);
    }
    $token = ta_adminIssue($now);
    if ($token === '') {
        fail(503, 'The dashboard is not configured on this server.', 'not_configured');
    }
    admin_cookie($token, $now + TA_ADMIN_TTL);
    respond(200, ['ok' => true, 'email' => ta_secret('admin_email'), 'issued' => $now, 'expires' => $now + TA_ADMIN_TTL]);
}

if ($action === 'logout') {
    // Signing out with a valid session ends every session, here and on any
    // copy of the cookie (ta_adminRevokeAll). A request without one only
    // clears this browser's cookie: a stranger cannot sign the owner out.
    $revoked = false;
    if (ta_adminFromCookie($now) !== null) {
        $db = ta_db(5000);
        if ($db !== null) {
            try {
                ta_adminRevokeAll($db);
                $revoked = true;
            } catch (Throwable) {
                $revoked = false;
            }
        }
    }
    admin_cookie('', $now - 3600);
    respond(200, ['ok' => true, 'revoked' => $revoked]);
}

$session = ta_adminFromCookie($now);
if ($session === null) {
    respond(401, ['ok' => false, 'error' => 'Please sign in.', 'code' => 'unauthenticated']);
}

switch ($action) {
    case 'me':
        respond(200, ['ok' => true, 'email' => ta_secret('admin_email'), 'issued' => (int) $session['iat'], 'expires' => (int) $session['exp']]);
        // no break: respond() exits
    case 'stats':
        $section = admin_enum('section', ADMIN_SECTIONS, 'overview');
        $range = admin_range($now);
        $owner = admin_includeOwner();
        if ($section === 'page') {
            $path = admin_pathParam('path', true);
            $db = admin_db();
            respond(200, ['ok' => true, 'section' => 'page'] + ta_reportPage($db, $range, $owner, (string) $path, ta_sitemapPaths()));
        }
        if ($section === 'pages') {
            $group = admin_q('group');
            if ($group !== null && $group !== 'other' && !in_array($group, array_column(TA_PAGE_GROUPS, 0), true)) {
                admin_badParam('group');
            }
            $opt = [
                'sort' => admin_enum('sort', array_keys(TA_PAGE_SORTS), 'views'),
                'dir' => admin_enum('dir', ['asc', 'desc'], 'desc'),
                'limit' => admin_intParam('limit', 1, 2000, 500),
                'group' => $group,
                'prefix' => admin_pathParam('prefix'),
            ];
            respond(200, ['ok' => true, 'section' => 'pages'] + ta_reportPages(admin_db(), $range, $owner, $opt));
        }
        $db = admin_db();
        switch ($section) {
            case 'sources':
                respond(200, ['ok' => true, 'section' => 'sources'] + ta_reportSources($db, $range, $owner));
            case 'search':
                respond(200, ['ok' => true, 'section' => 'search'] + ta_reportSearch($db, $range, $owner));
            case 'technology':
                respond(200, ['ok' => true, 'section' => 'technology'] + ta_reportTechnology($db, $range, $owner));
            default:
                respond(200, ['ok' => true, 'section' => 'overview'] + ta_reportOverview($db, $range, $owner, $now));
        }
        // no break
    case 'visitors':
        $range = admin_range($now);
        $country = admin_q('country');
        if ($country !== null && !preg_match('/^[A-Z]{2}$/', $country)) {
            admin_badParam('country');
        }
        $source = admin_q('source');
        if ($source !== null && mb_strlen($source) > 100) {
            admin_badParam('source');
        }
        $f = [
            'ip' => admin_ipParam('ip'),
            'page' => admin_pathParam('page'),
            'country' => $country,
            'device' => admin_enum('device', ['desktop', 'mobile', 'tablet', 'bot'], null),
            'channel' => admin_enum('channel', TA_CHANNELS, null),
            'source' => $source,
            'agent' => admin_enum('agent', ['human', 'bot', 'headless', 'all'], 'human'),
            'limit' => admin_intParam('limit', 1, 200, 50),
            'offset' => admin_intParam('offset', 0, 100000, 0),
        ];
        respond(200, ['ok' => true] + ta_reportVisitors(admin_db(), $range, admin_includeOwner(), $f));
        // no break
    case 'visitor':
        $ip = (string) admin_ipParam('ip', true);
        respond(200, ['ok' => true] + ta_reportVisitor(admin_db(), $ip));
        // no break
    case 'live':
        respond(200, ['ok' => true] + ta_reportLive(admin_db(), $now, admin_includeOwner()));
        // no break
    case 'crawlers':
        $range = admin_range($now);
        $bot = admin_q('bot');
        if ($bot !== null && (mb_strlen($bot) > 60 || !preg_match('/^[\pL\pN ._()\/-]+$/u', $bot))) {
            admin_badParam('bot');
        }
        respond(200, ['ok' => true] + ta_reportCrawlers(admin_db(), $range, $bot, ta_sitemapPaths()));
        // no break
    case 'seo':
        $range = admin_range($now);
        respond(200, ['ok' => true] + ta_reportSeo(admin_db(), $range, admin_includeOwner()));
        // no break
    case 'export':
        $table = admin_enum('table', array_keys(TA_EXPORTS), 'pageviews');
        $range = admin_range($now);
        $db = admin_db();
        $name = sprintf('tl-analytics-%s-%s_%s.csv', $table, $range['label_from'], $range['label_to']);
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $name . '"');
        $out = fopen('php://output', 'wb');
        if ($out === false) {
            fail(500, 'Could not write the export.');
        }
        fwrite($out, "\xEF\xBB\xBF"); // so spreadsheet apps read UTF-8
        ta_exportCsv($db, (string) $table, $range['from'], $range['to'], $out);
        fclose($out);
        exit;
    case 'verify-bot':
        @set_time_limit(90);
        $db = admin_db();
        $results = [];
        $verifiable = [];
        foreach (TA_CRAWLERS as [, $name, $family]) {
            if (isset(TA_VERIFY_DOMAINS[$family])) {
                $verifiable[] = $name;
            }
        }
        if (isset($body['ip'])) {
            $ip = is_string($body['ip']) ? trim($body['ip']) : '';
            if (!ta_validIp($ip)) {
                respond(400, ['ok' => false, 'error' => 'Bad value for "ip".', 'code' => 'bad_param', 'param' => 'ip']);
            }
            $row = ta_one($db, 'SELECT bot FROM crawls WHERE ip = ? AND ip_masked = 0 ORDER BY ts DESC LIMIT 1', [$ip]);
            if ($row === []) {
                respond(404, ['ok' => false, 'error' => 'No crawler visit from that address is on record.', 'code' => 'unknown_ip']);
            }
            $targets = [['ip' => $ip, 'bot' => (string) $row['bot']]];
        } else {
            $ph = implode(',', array_fill(0, count($verifiable), '?'));
            $sql = "SELECT c.ip, c.bot, MAX(c.ts) AS last FROM crawls c WHERE c.ip_masked = 0 AND c.ts >= ? AND c.bot IN ($ph)
                AND NOT EXISTS (SELECT 1 FROM bot_verdicts v WHERE v.ip = c.ip AND v.verdict <> 'error' AND v.checked_ts >= ?)
                GROUP BY c.ip, c.bot ORDER BY last DESC";
            $args = array_merge([$now - ta_ipDays() * 86400], $verifiable, [$now - 30 * 86400]);
            $all = ta_all($db, $sql, $args);
            $targets = array_slice($all, 0, 5);
        }
        foreach ($targets as $t) {
            $v = ta_verifyCrawlerIp((string) $t['ip'], (string) $t['bot']);
            ta_saveVerdict($db, (string) $t['ip'], (string) $t['bot'], $v, $now);
            $results[] = ['ip' => $t['ip'], 'bot' => $t['bot'], 'verdict' => $v['verdict'], 'ptr' => $v['ptr'], 'checked' => $now];
        }
        $remaining = isset($all) ? max(0, count($all) - count($targets)) : 0;
        respond(200, ['ok' => true, 'results' => $results, 'remaining' => $remaining]);
        // no break
    case 'prune':
        $summary = ta_maintain(admin_db(), $now, true);
        respond(200, ['ok' => true, 'ran_at' => $now] + (array) $summary);
}

fail(404, 'Unknown action.', 'unknown_action');
