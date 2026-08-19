<?php
/**
 * Three Magi Press — shared helpers for the membership endpoints.
 *
 * The membership system has no user accounts and no local database. A reader
 * pays through a Stripe Payment Link; Stripe redirects back with a checkout
 * session id; redeem.php verifies that id against Stripe's API and issues a
 * signed cookie ("the pass"). Every later request re-verifies the pass's
 * signature locally and, periodically, re-checks the underlying subscription
 * with Stripe. Stripe is the member database.
 *
 * Deliberate choices:
 *  - Secrets live in a file ABOVE the document root, never in git. Same
 *    placement the form handler already uses for its submission log.
 *  - The Stripe key is expected to be a RESTRICTED, read-only key. If it
 *    leaks, an attacker can read customer records but cannot move money.
 *  - The pass is a bearer token by design. Whoever holds it is a member.
 *    That is the price of having no accounts, and it is documented in
 *    docs/membership.md rather than pretended away.
 *  - Signature comparison uses hash_equals(); payloads are base64url so the
 *    value survives a cookie round-trip untouched.
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

const JSON_FLAGS = JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE;

/** Cookie carrying the signed pass. HttpOnly — JS must never read it. */
const PASS_COOKIE = 'tl_pass';

/** Cosmetic, JS-readable companion so the header can say "Member" without a
 *  round-trip. Forging it changes a word in a menu and grants nothing. */
const MEMBER_COOKIE = 'tl_member';

/** Lets the owner read unpublished drafts. Replaces the dead PocketBase admin login. */
const PREVIEW_COOKIE = 'tl_preview';

/** Browsers cap persistent cookies at 400 days (Chrome). Match it. */
const PASS_MAX_AGE = 400 * 86400;

/** How long a pass is trusted before we ask Stripe about it again. The price
 *  of having no webhooks: a cancellation takes up to this long to bite. */
const RECHECK_SUBSCRIPTION = 7 * 86400;

/** Lifetime purchases can still be refunded or charged back, so they are
 *  re-checked too, just far less often. */
const RECHECK_LIFETIME = 30 * 86400;

/** If Stripe is unreachable we serve the essay rather than lock out paying
 *  members over an outage — but not forever. */
const FAIL_OPEN_LIMIT = 60 * 86400;

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 600;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

// ------------------------------------------------------------- responses ---

function respond(int $status, array $body): void
{
    http_response_code($status);
    $json = json_encode($body, JSON_FLAGS);
    echo $json === false ? '{"ok":false,"error":"Unexpected error."}' : $json;
    exit;
}

function fail(int $status, string $message, string $code = ''): void
{
    $body = ['ok' => false, 'error' => $message];
    if ($code !== '') {
        $body['code'] = $code;
    }
    respond($status, $body);
}

// --------------------------------------------------------------- secrets ---

/**
 * Load the secrets file from one level above the document root.
 *
 * Expected to `return` an array with: stripe_key (restricted, read-only),
 * cookie_secret (long random string), preview_key. See docs/membership.md.
 */
function secrets(): array
{
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }

    $root = $_SERVER['DOCUMENT_ROOT'] ?? '';
    $candidates = [];
    if ($root !== '') {
        $candidates[] = dirname($root) . '/tl-secrets.php';
    }
    // Local development: tests and `php -S` run with a different docroot.
    $candidates[] = dirname(__DIR__, 2) . '/tl-secrets.php';
    $env = getenv('TL_SECRETS_FILE');
    if (is_string($env) && $env !== '') {
        array_unshift($candidates, $env);
    }

    foreach ($candidates as $path) {
        if (is_file($path) && is_readable($path)) {
            /** @noinspection PhpIncludeInspection */
            $data = require $path;
            if (is_array($data)) {
                return $cache = $data;
            }
        }
    }

    return $cache = [];
}

function secret(string $key): string
{
    $all = secrets();
    $value = $all[$key] ?? '';
    return is_string($value) ? $value : '';
}

/** True when the server is configured enough to answer membership questions. */
function membershipConfigured(): bool
{
    return secret('stripe_key') !== '' && secret('cookie_secret') !== '';
}

// ------------------------------------------------------------ signing ------

function b64urlEncode(string $raw): string
{
    return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
}

function b64urlDecode(string $value): string
{
    $pad = strlen($value) % 4;
    if ($pad !== 0) {
        $value .= str_repeat('=', 4 - $pad);
    }
    $decoded = base64_decode(strtr($value, '-_', '+/'), true);
    return $decoded === false ? '' : $decoded;
}

/** payload -> "<b64url payload>.<b64url hmac>" */
function signPayload(array $payload): string
{
    $json = json_encode($payload, JSON_FLAGS);
    if ($json === false) {
        return '';
    }
    $body = b64urlEncode($json);
    $mac = hash_hmac('sha256', $body, secret('cookie_secret'), true);
    return $body . '.' . b64urlEncode($mac);
}

/** Verify signature and return the payload, or null if anything is off. */
function verifyToken(string $token): ?array
{
    if ($token === '' || secret('cookie_secret') === '') {
        return null;
    }
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return null;
    }
    [$body, $mac] = $parts;
    $expected = hash_hmac('sha256', $body, secret('cookie_secret'), true);
    $given = b64urlDecode($mac);
    // Length check first: hash_equals returns false on length mismatch anyway,
    // but this keeps the comparison on equal-length strings.
    if (strlen($given) !== strlen($expected) || !hash_equals($expected, $given)) {
        return null;
    }
    $payload = json_decode(b64urlDecode($body), true);
    return is_array($payload) ? $payload : null;
}

// ------------------------------------------------------------- the pass ----

/**
 * @param string $ref   Stripe object to re-verify against (sub_… or ch_…)
 * @param string $tier  'supporter' | 'lifetime'
 * @param string $email buyer's address (stored only as a hash)
 */
function makePass(string $ref, string $tier, string $email, ?int $checkedAt = null): string
{
    return signPayload([
        'v' => 1,
        'k' => $ref,
        't' => $tier,
        'c' => $checkedAt ?? time(),
        'e' => $email === '' ? '' : hash('sha256', strtolower(trim($email))),
    ]);
}

function sendPassCookie(string $token, string $tier): void
{
    $opts = [
        'expires'  => time() + PASS_MAX_AGE,
        'path'     => '/',
        'secure'   => !isLocalRequest(),
        'httponly' => true,
        'samesite' => 'Lax',
    ];
    setcookie(PASS_COOKIE, $token, $opts);
    // Cosmetic twin, readable by JS. Not HttpOnly on purpose.
    setcookie(MEMBER_COOKIE, $tier, ['expires' => time() + PASS_MAX_AGE, 'path' => '/', 'secure' => !isLocalRequest(), 'httponly' => false, 'samesite' => 'Lax']);
}

function clearPassCookies(): void
{
    $opts = ['expires' => time() - 3600, 'path' => '/', 'secure' => !isLocalRequest(), 'samesite' => 'Lax'];
    setcookie(PASS_COOKIE, '', $opts + ['httponly' => true]);
    setcookie(MEMBER_COOKIE, '', $opts + ['httponly' => false]);
}

function isLocalRequest(): bool
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    return str_starts_with($host, 'localhost') || str_starts_with($host, '127.0.0.1');
}

function currentPass(): ?array
{
    $raw = $_COOKIE[PASS_COOKIE] ?? '';
    return is_string($raw) ? verifyToken($raw) : null;
}

// ---------------------------------------------------------------- stripe ---

/**
 * GET a Stripe resource. Returns [httpCode, decodedBody]. httpCode 0 means the
 * request never completed (DNS, TLS, timeout) — the caller must treat that as
 * "unknown", NOT as "not a member".
 */
function stripeGet(string $path, array $query = []): array
{
    $key = secret('stripe_key');
    if ($key === '') {
        return [0, null];
    }
    $url = 'https://api.stripe.com/v1/' . ltrim($path, '/');
    if ($query !== []) {
        $url .= '?' . http_build_query($query);
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $key],
        CURLOPT_USERAGENT      => 'ThreeMagiPress/1.0',
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body === false || $code === 0) {
        return [0, null];
    }
    $decoded = json_decode((string) $body, true);
    return [$code, is_array($decoded) ? $decoded : null];
}

/** Subscription statuses that keep a reader inside. past_due is deliberate:
 *  a bounced card is a person, not a thief. */
const SUBSCRIPTION_OK = ['active', 'trialing', 'past_due'];

// ----------------------------------------------------------------- files ---

/** Directory holding gated essay JSON, deployed ABOVE the document root so
 *  Apache cannot serve it at any URL. */
function privateEssayDir(): string
{
    $env = getenv('TL_ESSAY_DIR');
    if (is_string($env) && $env !== '') {
        return rtrim($env, '/');
    }
    $root = $_SERVER['DOCUMENT_ROOT'] ?? '';
    if ($root !== '') {
        return dirname($root) . '/tl-essays';
    }
    return dirname(__DIR__, 2) . '/tl-essays';
}

/** Append-only record kept outside the web root. */
function appendLog(string $name, array $row): void
{
    $root = $_SERVER['DOCUMENT_ROOT'] ?? '';
    $dir = $root !== '' ? dirname($root) : dirname(__DIR__, 2);
    $line = json_encode($row + ['at' => gmdate('c')], JSON_FLAGS);
    if ($line !== false) {
        @file_put_contents($dir . '/' . $name, $line . "\n", FILE_APPEND | LOCK_EX);
    }
}

// ------------------------------------------------------------ validation ---

function validSlug(string $slug): bool
{
    return $slug !== '' && preg_match('/^[a-z0-9][a-z0-9-]{0,63}$/', $slug) === 1;
}

function validSessionId(string $id): bool
{
    return preg_match('/^cs_[A-Za-z0-9_]{1,80}$/', $id) === 1;
}

function clientIp(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

// ------------------------------------------------------------ rate limit ---

function rateLimitFile(string $bucket): ?string
{
    $dir = sys_get_temp_dir() . '/tl-membership-rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return null;
    }
    return $dir . '/' . $bucket . '-' . hash('sha256', clientIp()) . '.json';
}

function rateLimitExceeded(string $bucket, int $max = RATE_LIMIT_MAX): bool
{
    $file = rateLimitFile($bucket);
    if ($file === null) {
        return false; // can't track — fail open rather than block real people
    }
    $raw = @file_get_contents($file);
    $stamps = $raw === false ? [] : json_decode($raw, true);
    $stamps = is_array($stamps) ? $stamps : [];
    $floor = time() - RATE_LIMIT_WINDOW;
    $stamps = array_values(array_filter($stamps, static fn($t) => is_int($t) && $t > $floor));
    return count($stamps) >= $max;
}

function rateLimitRecord(string $bucket): void
{
    $file = rateLimitFile($bucket);
    if ($file === null) {
        return;
    }
    $raw = @file_get_contents($file);
    $stamps = $raw === false ? [] : json_decode($raw, true);
    $stamps = is_array($stamps) ? $stamps : [];
    $floor = time() - RATE_LIMIT_WINDOW;
    $stamps = array_values(array_filter($stamps, static fn($t) => is_int($t) && $t > $floor));
    $stamps[] = time();
    @file_put_contents($file, json_encode($stamps), LOCK_EX);

    if (random_int(1, 50) === 1) {
        $cutoff = time() - RATE_LIMIT_WINDOW * 2;
        foreach (glob(dirname($file) . '/*.json') ?: [] as $old) {
            if (@filemtime($old) < $cutoff) {
                @unlink($old);
            }
        }
    }
}
