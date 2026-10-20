<?php
/**
 * Tests for the owner's analytics: api/_analytics.php, hit.php, crawl.php,
 * admin.php, the .htaccess crawler-log block and robots.txt.
 *
 *   php apps/web/tests/analytics-php/run-tests.php            # everything
 *   php apps/web/tests/analytics-php/run-tests.php --no-dist  # skip the built-site run
 *
 * Part one runs the library in this process. Part two serves a copy of
 * public/ with PHP's built-in server and router.php (which reproduces the
 * .htaccess rules), with the secrets file and the data directory OUTSIDE the
 * document root exactly as in production, and drives it over HTTP. The last
 * part does the same against the built site in dist/apps/web when it exists.
 *
 * Credentials are throwaway: an example.test address and a random password
 * that only ever lives in this process's memory (the secrets file holds its
 * bcrypt hash). Nothing here knows, or needs, the owner's real ones.
 *
 * Environment: TL_TEST_PORT (default 4301), TL_TEST_WORK (scratch folder).
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', 'stderr');

$HERE = __DIR__;
$WEB = dirname(__DIR__, 2);
$REPO = dirname($WEB, 2);
$PUBLIC = $WEB . '/public';
$PORT = (string) (getenv('TL_TEST_PORT') ?: '4301');
$BASE = "http://127.0.0.1:$PORT";
$WORK = rtrim((string) (getenv('TL_TEST_WORK') ?: sys_get_temp_dir() . '/tl-analytics-tests'), '/');
$RUN_DIST = !in_array('--no-dist', $argv, true);
$KEEP = in_array('--keep', $argv, true);
if (str_contains($WORK, ' ')) {
    fwrite(STDERR, "work dir must not contain spaces: $WORK\n");
    exit(2);
}

// The .htaccess as it was before the crawler-log block: removing the block
// must give back exactly this file, so no existing rule can have changed.
const ADMIN_FAIL_MESSAGE_TEST = 'That email and password do not match.';
const ORIGINAL_HTACCESS_SHA256 = 'f037011f70f3ab0888939df08d9bae96b4911ae9ad1f429b7efe5a539f7a2f44';

$passed = 0;
$failed = 0;
$failures = [];

function check(string $name, bool $ok, $detail = ''): void
{
    global $passed, $failed, $failures;
    if ($ok) {
        $passed++;
        echo "  ok   $name\n";
    } else {
        $failed++;
        $d = is_string($detail) ? $detail : json_encode($detail, JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR);
        $failures[] = $name;
        echo "  FAIL $name  " . substr((string) $d, 0, 400) . "\n";
    }
}

function section(string $title): void
{
    echo "\n# $title\n";
}

function rrmdir(string $dir): void
{
    if (!file_exists($dir) && !is_link($dir)) {
        return;
    }
    if (is_file($dir) || is_link($dir)) {
        @unlink($dir);
        return;
    }
    foreach (scandir($dir) ?: [] as $f) {
        if ($f !== '.' && $f !== '..') {
            rrmdir("$dir/$f");
        }
    }
    @rmdir($dir);
}

function copyTree(string $from, string $to): void
{
    @mkdir($to, 0755, true);
    foreach (scandir($from) ?: [] as $f) {
        if ($f === '.' || $f === '..') {
            continue;
        }
        is_dir("$from/$f") ? copyTree("$from/$f", "$to/$f") : copy("$from/$f", "$to/$f");
    }
}

// ------------------------------------------------------------- fixtures ---

rrmdir($WORK);
@mkdir("$WORK/www/assets", 0755, true);
@mkdir("$WORK/www/media", 0755, true);
@mkdir("$WORK/www/fonts", 0755, true);
@mkdir("$WORK/tmp", 0755, true);
copyTree("$PUBLIC/api", "$WORK/www/api");
copy("$PUBLIC/.htaccess", "$WORK/www/.htaccess");
copy("$PUBLIC/robots.txt", "$WORK/www/robots.txt");

// An app shell bigger than PHP's 4 KB output buffer, with multi-byte text.
$INDEX = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\" />\n<title></title>\n"
    . "<script type=\"module\" crossorigin src=\"/assets/app-abc123.js\"></script>\n</head>\n<body>\n<div id=\"root\"></div>\n"
    . "<!-- Three Magi Press — fixture shell. " . str_repeat('ἀρχή · ', 900) . "-->\n</body>\n</html>\n";
file_put_contents("$WORK/www/index.html", $INDEX);
$SITEMAP_PATHS = ['/', '/books', '/third-lamp', '/third-lamp/archive', '/third-lamp/about', '/third-lamp/contact', '/third-lamp/education',
    '/third-lamp/education/latin', '/third-lamp/education/greek', '/third-lamp/education/hebrew', '/third-lamp/education/coptic',
    '/third-lamp/education/latin/course', '/powers', '/powers/hierarchies', '/powers/host', '/powers/map', '/christianities',
    '/christianities/rosicrucian', '/christianities/canon', '/christianities/map', '/articles/the-stars-of-the-dead',
    '/articles/black-mirror-of-fire', '/articles/the-twice-born', '/articles/fire-above-the-stars', '/articles/ways-of-being',
    '/articles/the-world-is-an-offering', '/articles/unfamiliar-territory', '/articles/the-right-to-question'];
$SITEMAP = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
    . implode('', array_map(static fn($p) => "  <url><loc>https://threemagipress.com$p</loc></url>\n", $SITEMAP_PATHS)) . "</urlset>\n";
file_put_contents("$WORK/www/sitemap.xml", $SITEMAP);
$LLMS = "# Three Magi Press\n\n> Fixture llms.txt — hermetic books and The Third Lamp.\n";
file_put_contents("$WORK/www/llms.txt", $LLMS);
file_put_contents("$WORK/www/assets/app-abc123.js", "console.log('app');\n");
file_put_contents("$WORK/www/media/plate.png", base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='));
$ROBOTS = (string) file_get_contents("$WORK/www/robots.txt");

// Throwaway credentials. The password exists only in this process.
$EMAIL = 'test-owner@example.test';
$PASSWORD = 'pw-' . bin2hex(random_bytes(12));
$HASH = password_hash($PASSWORD, PASSWORD_DEFAULT);
$COOKIE_SECRET = bin2hex(random_bytes(32));
$SECRETS = "$WORK/tl-secrets.php";

function writeSecrets(string $file, array $values): void
{
    static $bump = 0;
    file_put_contents($file, "<?php\n// Throwaway test secrets, generated by run-tests.php.\nreturn " . var_export($values, true) . ";\n");
    // The built-in server runs opcache, which notices a changed file by its
    // mtime in whole seconds; give every rewrite a distinct one.
    touch($file, time() + 10 + (++$bump));
    clearstatcache();
}

$SECRET_VALUES = [
    'cookie_secret' => $COOKIE_SECRET,
    'admin_email' => $EMAIL,
    'admin_password_hash' => $HASH,
    'analytics_ip_days' => 90,
    'analytics_keep_days' => 730,
];
writeSecrets($SECRETS, $SECRET_VALUES);

putenv("TL_SECRETS_FILE=$SECRETS");
$_SERVER['DOCUMENT_ROOT'] = "$WORK/www";
$_SERVER['HTTP_HOST'] = '127.0.0.1';

require "$PUBLIC/api/_lib.php";
require_once "$PUBLIC/api/_analytics_report.php";
require_once "$HERE/seed.php";

function useDataDir(string $dir): ?PDO
{
    putenv("TL_ANALYTICS_DIR=$dir");
    ta_db(1500, true);
    return ta_db();
}

function ctx(array $over = []): array
{
    return $over + [
        'now' => 1790000000,
        'ip' => '203.0.113.7',
        'ua' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'host' => 'threemagipress.com',
        'owner' => false,
    ];
}

function pv(string $path, array $over = []): array
{
    return $over + ['type' => 'pageview', 'view' => 'v' . bin2hex(random_bytes(6)), 'path' => $path, 'tz' => 'Europe/London', 'lang' => 'en-GB'];
}

function qv(PDO $db, string $sql, array $args = [])
{
    $st = $db->prepare($sql);
    $st->execute($args);
    return $st->fetchColumn();
}

function qa(PDO $db, string $sql, array $args = []): array
{
    $st = $db->prepare($sql);
    $st->execute($args);
    return $st->fetchAll(PDO::FETCH_ASSOC);
}

$CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
$IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1';
$GOOGLEBOT = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.89 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

echo 'php: ', PHP_VERSION, ', sqlite ', (new PDO('sqlite::memory:'))->query('select sqlite_version()')->fetchColumn(), "\n";
echo "work: $WORK\n";

// =================================================================== unit ===

section('php -l on every endpoint and test file');
foreach (array_merge(glob("$PUBLIC/api/*.php") ?: [], glob("$HERE/*.php") ?: []) as $f) {
    exec(escapeshellarg(PHP_BINARY) . ' -l ' . escapeshellarg($f) . ' 2>&1', $out, $code);
    check('parses: ' . basename(dirname($f)) . '/' . basename($f), $code === 0, implode("\n", $out));
}

section('schema creation and storage placement');
$dir = "$WORK/data-unit/schema";
$db = useDataDir($dir);
check('database opens in a fresh folder', $db instanceof PDO, ta_storageError());
$tables = array_column(qa($db, "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"), 'name');
$want = ['bot_verdicts', 'crawls', 'meta', 'notfound', 'outbound', 'page_facts', 'pageviews', 'searches', 'sessions', 'vitals'];
check('every table is created', array_values(array_intersect($want, $tables)) === $want, $tables);
check('schema version recorded (PRAGMA user_version)', (int) $db->query('PRAGMA user_version')->fetchColumn() === TA_SCHEMA_VERSION);
check('data folder is 0700', (fileperms($dir) & 0777) === 0700, decoct(fileperms($dir) & 0777));
check('database file is 0600', (fileperms("$dir/analytics.sqlite") & 0777) === 0600, decoct(fileperms("$dir/analytics.sqlite") & 0777));
check('folder carries its own "Require all denied"', str_contains((string) @file_get_contents("$dir/.htaccess"), 'Require all denied'));
ta_migrate($db);
$db2 = useDataDir($dir);
check('reopening and re-migrating is harmless', $db2 instanceof PDO && (int) $db2->query('PRAGMA user_version')->fetchColumn() === TA_SCHEMA_VERSION);

$inside = "$WORK/www/tl-analytics";
check('refuses a folder inside the document root', useDataDir($inside) === null && (ta_storageError()['code'] ?? '') === 'inside_docroot', ta_storageError());
check('  …and creates nothing there', !file_exists($inside));
check('refuses a ../ path that lands inside the document root', useDataDir("$WORK/www/api/../stash") === null && (ta_storageError()['code'] ?? '') === 'inside_docroot');
check('refuses the folder this code is deployed in, whatever DOCUMENT_ROOT says', useDataDir("$PUBLIC/tl-analytics-test") === null && !file_exists("$PUBLIC/tl-analytics-test"));
file_put_contents("$WORK/afile", 'not a folder');
check('unwritable location → null with dir_unwritable', useDataDir("$WORK/afile/sub") === null && (ta_storageError()['code'] ?? '') === 'dir_unwritable', ta_storageError());
check('  …and the error explains the fix', str_contains((string) (ta_storageError()['fix'] ?? ''), 'hPanel'));
@mkdir("$WORK/data-unit/corrupt", 0700, true);
file_put_contents("$WORK/data-unit/corrupt/analytics.sqlite", str_repeat("garbage\0", 512));
check('corrupt database file → null, not an exception', useDataDir("$WORK/data-unit/corrupt") === null && in_array(ta_storageError()['code'] ?? '', ['open_failed', 'migration_failed'], true), ta_storageError());

section('bot / headless / human classification');
$cases = [
    [$GOOGLEBOT, 'bot', 'Googlebot'],
    ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'bot', 'Googlebot'],
    ['Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)', 'bot', 'Google-InspectionTool'],
    ['Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'bot', 'Bingbot'],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)', 'bot', 'GPTBot'],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot', 'bot', 'ChatGPT-User'],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 'bot', 'ClaudeBot'],
    ['Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)', 'bot', 'Claude-User'],
    ['facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)', 'bot', 'Facebook'],
    ['Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)', 'bot', 'Slackbot'],
    ['Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)', 'bot', 'AhrefsBot'],
    ['Mozilla/5.0 (compatible; SomeNewCrawler/2.0; +https://example.org/bot)', 'bot', null],
    ['curl/8.5.0', 'bot', null],
    ['python-requests/2.32.3', 'bot', null],
    ['Go-http-client/1.1', 'bot', null],
    ['', 'bot', 'No user agent'],
    ['Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/129.0.0.0 Safari/537.36', 'headless', null],
    ['Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse', 'headless', null],
    [$CHROME, 'human', null],
    [$IPHONE, 'human', null],
    ['Mozilla/5.0 (Linux; Android 10; CUBOT X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36', 'human', null],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0', 'human', null],
];
foreach ($cases as [$ua, $class, $bot]) {
    $got = ta_classifyAgent($ua);
    check(sprintf('%-9s %s', $class, $ua === '' ? '(empty UA)' : substr($ua, 0, 70)), $got['class'] === $class && $got['bot'] === $bot, $got);
}

section('browser, OS and device parsing');
$ua = [
    [$CHROME, 'Chrome', 'Windows', 'desktop'],
    [$IPHONE, 'Safari', 'iOS', 'mobile'],
    ['Mozilla/5.0 (iPad; CPU OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1', 'Safari', 'iOS', 'tablet'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36', 'Chrome', 'Android', 'mobile'],
    ['Mozilla/5.0 (Linux; Android 13; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'Chrome', 'Android', 'tablet'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0', 'Edge', 'Windows', 'desktop'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0', 'Firefox', 'macOS', 'desktop'],
    ['Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36', 'Samsung Internet', 'Android', 'mobile'],
    ['Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'Chrome', 'Chrome OS', 'desktop'],
];
foreach ($ua as [$s, $b, $o, $d]) {
    $p = ta_parseUa($s);
    check("$b / $o / $d", $p['browser'] === $b && $p['os'] === $o && $p['device'] === $d, $p);
}
check('Windows NT 10.0 is reported as "10/11"', ta_parseUa($CHROME)['os_ver'] === '10/11');

section('referrers, UTM and channels');
$refs = [
    ['https://www.google.com/', 'external', 'search', 'Google'],
    ['https://www.google.co.uk/search?q=hermes', 'external', 'search', 'Google'],
    ['https://gemini.google.com/app/abc', 'external', 'ai', 'Gemini'],
    ['https://chatgpt.com/', 'external', 'ai', 'ChatGPT'],
    ['https://www.perplexity.ai/search/x', 'external', 'ai', 'Perplexity'],
    ['https://claude.ai/chat/1', 'external', 'ai', 'Claude'],
    ['https://duckduckgo.com/', 'external', 'search', 'DuckDuckGo'],
    ['https://www.bing.com/', 'external', 'search', 'Bing'],
    ['https://t.co/xyz', 'external', 'social', 'X (Twitter)'],
    ['https://old.reddit.com/r/occult/', 'external', 'social', 'Reddit'],
    ['android-app://com.google.android.googlequicksearchbox/', 'external', 'search', 'Google'],
    ['https://en.wikipedia.org/wiki/Hermeticism', 'external', 'other', 'en.wikipedia.org'],
    ['https://threemagipress.com/books', 'internal', null, null],
    ['https://www.3magipress.com/', 'internal', null, null],
    ['javascript:alert(1)', 'none', null, null],
    ['', 'none', null, null],
];
foreach ($refs as [$r, $kind, $channel, $name]) {
    $p = ta_parseReferrer($r, false, 'threemagipress.com');
    check(sprintf('%-50s → %s %s', $r === '' ? '(none)' : $r, $kind, $name ?? ''), $p['kind'] === $kind && $p['channel'] === $channel && $p['name'] === $name, $p);
}
$p = ta_parseReferrer('https://www.google.com/search?q=secret+query&client=x', false, 'threemagipress.com');
check('the referrer query string is never kept', $p['ref'] === 'www.google.com/search', $p);
check('an in-app path flagged internal is the previous page', ta_parseReferrer('/powers/map', true, 'x')['path'] === '/powers/map');
check('utm_source=chatgpt.com with no referrer → AI / ChatGPT', ta_classifyUtm('chatgpt.com', null) === ['ai', 'ChatGPT']);
check('utm_source=newsletter → other / newsletter', ta_classifyUtm('newsletter', 'email') === ['other', 'newsletter']);

section('country from the time zone');
foreach ([['Europe/London', 'GB'], ['America/New_York', 'US'], ['Asia/Kolkata', 'IN'], ['Asia/Calcutta', 'IN'], ['Europe/Kiev', 'UA'],
          ['Australia/Sydney', 'AU'], ['UTC', null], ['Etc/GMT+5', null], ['Not/AZone', null], ['../../etc/passwd', null], ['', null]] as [$tz, $cc]) {
    check(sprintf('%-18s → %s', $tz === '' ? '(empty)' : $tz, $cc ?? 'unknown'), ta_countryFromTz($tz) === $cc, ta_countryFromTz($tz));
}

section('IP masking');
foreach ([['203.0.113.77', '203.0.113.0'], ['2001:db8:1234:5678:9abc::1', '2001:db8:1234::'], ['::ffff:198.51.100.9', '198.51.100.0'],
          ['203.0.113.0', '203.0.113.0'], ['not-an-ip', '0.0.0.0']] as [$in, $out]) {
    check("$in → $out", ta_maskIp($in) === $out, ta_maskIp($in));
}

section('paths');
foreach ([['/a/b/', '/a/b'], ['/', '/'], ['/a?x=1&utm_source=y#h', '/a'], ['/a%20b', '/a b'], ['/a//b', '/a/b'], ['//evil.example/x', null],
          ['https://evil.example/', null], ['relative', null], ['/a%00b', null], ['/' . str_repeat('x', 301), null], [42, null]] as [$in, $out]) {
    check(sprintf('%-26s → %s', is_string($in) ? substr($in, 0, 26) : json_encode($in), $out ?? 'rejected'), ta_cleanPath($in) === $out, ta_cleanPath($in));
}

section('visitors and visits (daily salt, 30-minute gap)');
$db = useDataDir("$WORK/data-unit/sessions");
$t0 = gmmktime(23, 40, 0, 10, 1, 2026);
$v1 = pv('/', ['ref' => 'https://www.google.com/']);
check('pageview stored', ta_record($db, $v1, ctx(['now' => $t0])) === 'stored');
check('same view id again → duplicate', ta_record($db, $v1, ctx(['now' => $t0 + 1])) === 'duplicate');
ta_record($db, pv('/books', ['ref' => '/', 'ref_internal' => true]), ctx(['now' => $t0 + 60]));
$s = qa($db, 'SELECT * FROM sessions');
check('two views, one visit', count($s) === 1 && (int) $s[0]['pageviews'] === 2, $s);
check('  …landing, exit, source from the first view', $s[0]['landing'] === '/' && $s[0]['exit_path'] === '/books' && $s[0]['channel'] === 'search' && $s[0]['source'] === 'Google');
$pvs = qa($db, 'SELECT * FROM pageviews ORDER BY seq');
check('  …seq 1, 2 and the in-app previous path', (int) $pvs[0]['seq'] === 1 && (int) $pvs[1]['seq'] === 2 && $pvs[1]['prev_path'] === '/');
check('  …both views share the visitor hash', $pvs[0]['visitor'] === $pvs[1]['visitor'] && strlen((string) $pvs[0]['visitor']) === 16);
check('the visitor hash is not the IP or UA in any form', !str_contains((string) $pvs[0]['visitor'], '203') && !preg_match('/^[0-9.]+$/', (string) $pvs[0]['visitor']));
ta_record($db, pv('/powers'), ctx(['now' => $t0 + 120, 'ua' => $IPHONE]));
check('another browser on the same IP is another visitor and visit', (int) qv($db, 'SELECT COUNT(*) FROM sessions') === 2 && (int) qv($db, 'SELECT COUNT(DISTINCT visitor) FROM pageviews') === 2);
// Across midnight: 23:40 + 25 min → 00:05 the next day, inside the 30-minute window.
ta_record($db, pv('/third-lamp'), ctx(['now' => $t0 + 1500]));
$s = qa($db, "SELECT * FROM sessions WHERE landing = '/'");
check('a visit that runs across midnight stays one visit', count($s) === 1 && (int) $s[0]['pageviews'] === 3, $s);
$hashes = array_column(qa($db, "SELECT visitor FROM pageviews WHERE session_id = ? ORDER BY seq", [$s[0]['id']]), 'visitor');
// One visit is one visitor: the view after midnight keeps the visit's hash, so
// the visitor is not counted twice (once per UTC day) for a single visit.
check('  …and keeps one visitor hash, so it is not counted twice', count($hashes) === 3 && count(array_unique($hashes)) === 1, $hashes);
ta_record($db, pv('/'), ctx(['now' => $t0 + 1500 + TA_SESSION_GAP + 1]));
check('30 minutes of silence ends the visit', (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE ip = '203.0.113.7' AND ua LIKE '%Windows%'") === 2);
// That fresh visit falls on the new day, so it takes the new day's hash.
$next = (string) qv($db, 'SELECT visitor FROM pageviews ORDER BY ts DESC, rowid DESC LIMIT 1');
check('  …and a new visit on the new day has the new day\'s visitor hash', $next !== '' && $next !== $hashes[0], [$hashes[0], $next]);
ta_record($db, pv('/'), ctx(['now' => $t0 + 3 * 86400]));
$salts = array_column(qa($db, "SELECT key FROM meta WHERE key LIKE 'salt:%' ORDER BY key"), 'key');
check('old daily salts are deleted (today and yesterday at most)', count($salts) <= 2 && end($salts) === 'salt:' . gmdate('Y-m-d', $t0 + 3 * 86400), $salts);
$salt = ta_salt($db, $t0 + 3 * 86400);
check('salts are 256-bit random hex', (bool) preg_match('/^[0-9a-f]{64}$/', $salt));
check('the same person on another day cannot be linked by hash',
    ta_visitorHash($salt, '203.0.113.7', ctx()['ua']) !== $hashes[0] && ta_visitorHash($salt, '203.0.113.7', ctx()['ua']) !== $hashes[2]);

section('engagement, vitals, search, 404 and outbound events');
$db = useDataDir("$WORK/data-unit/events");
$t = 1790100000;
$view = 'view-engage-1';
ta_record($db, pv('/articles/x', ['view' => $view]), ctx(['now' => $t]));
check('engage from another visitor is refused', ta_record($db, ['type' => 'engage', 'view' => $view, 'seconds' => 99, 'scroll' => 50], ctx(['now' => $t + 99, 'ip' => '198.51.100.1'])) === 'unknown_view');
check('engage for an unknown view is refused', ta_record($db, ['type' => 'engage', 'view' => 'nope-nope-1', 'seconds' => 5], ctx(['now' => $t + 5])) === 'unknown_view');
ta_record($db, ['type' => 'engage', 'view' => $view, 'seconds' => 40, 'scroll' => 30], ctx(['now' => $t + 40]));
ta_record($db, ['type' => 'engage', 'view' => $view, 'seconds' => 25, 'scroll' => 80], ctx(['now' => $t + 3600]));
$row = qa($db, 'SELECT engaged_s, scroll_pct FROM pageviews WHERE view_id = ?', [$view])[0];
check('engaged seconds and scroll keep their maximum', (int) $row['engaged_s'] === 40 && (int) $row['scroll_pct'] === 80, $row);
check('visible time, not wall time, extends the visit', (int) qv($db, 'SELECT last_ts - start_ts FROM sessions') === 40);
check('vitals stored with the view\'s path', ta_record($db, ['type' => 'vitals', 'view' => $view, 'path' => '/ignored', 'lcp' => 2100.4, 'cls' => 0.031, 'inp' => 120, 'ttfb' => 300, 'fcp' => 900, 'nav' => 'back-forward'], ctx(['now' => $t + 5])) === 'stored'
    && qv($db, 'SELECT path FROM vitals') === '/articles/x' && qv($db, 'SELECT nav FROM vitals') === 'back_forward');
check('vitals once per view', ta_record($db, ['type' => 'vitals', 'view' => $view, 'lcp' => 1], ctx(['now' => $t + 6])) === 'duplicate');
check('vitals values are clamped', ta_record($db, ['type' => 'vitals', 'view' => 'view-vit-2', 'path' => '/', 'lcp' => 1e12, 'cls' => -4], ctx(['now' => $t + 7])) === 'stored'
    && (int) qv($db, "SELECT lcp FROM vitals WHERE view_id = 'view-vit-2'") === 120000 && (float) qv($db, "SELECT cls FROM vitals WHERE view_id = 'view-vit-2'") === 0.0);
ta_record($db, ['type' => 'search', 'query' => "  Hermes\tTRISMEGISTUS  " . str_repeat('x', 200), 'results' => 0, 'path' => '/third-lamp/education'], ctx(['now' => $t + 8]));
$q = (string) qv($db, 'SELECT query FROM searches');
check('search queries are trimmed, lower-cased, capped at 80', str_starts_with($q, 'hermes trismegistus xxx') && mb_strlen($q) === 80, $q);
check('an empty search is not stored', ta_record($db, ['type' => 'search', 'query' => '   '], ctx()) === 'empty');
// The not-found event may arrive before its pageview, or after.
ta_record($db, ['type' => 'notfound', 'view' => 'view-nf-before', 'path' => '/nope', 'ref' => 'https://www.google.com/'], ctx(['now' => $t + 9]));
ta_record($db, pv('/nope', ['view' => 'view-nf-before']), ctx(['now' => $t + 10]));
ta_record($db, pv('/gone', ['view' => 'view-nf-after']), ctx(['now' => $t + 11]));
ta_record($db, ['type' => 'notfound', 'view' => 'view-nf-after', 'path' => '/gone', 'ref' => '/books', 'ref_internal' => true], ctx(['now' => $t + 12]));
check('a 404 is linked to its pageview whichever arrives first', (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE is_404 = 1") === 2);
check('404 referrers are kept (host+path, or the in-app path)', qa($db, 'SELECT ref FROM notfound ORDER BY ts') === [['ref' => 'www.google.com/'], ['ref' => '/books']]);
check('outbound click stored with host only', ta_record($db, ['type' => 'outbound', 'host' => 'Archive.org', 'path' => '/books'], ctx(['now' => $t + 13])) === 'stored' && qv($db, 'SELECT host FROM outbound') === 'archive.org');
check('outbound to a bogus host is refused', ta_record($db, ['type' => 'outbound', 'host' => 'javascript:alert(1)'], ctx()) === 'bad_host');
check('unknown event type is refused', ta_record($db, ['type' => 'drop table'], ctx()) === 'bad_type');
ta_record($db, pv('/facts', ['view' => 'view-facts-1', 'facts' => ['title' => "<script>alert('x')</script>", 'description' => 'd', 'h1' => 3, 'og_title' => true, 'og_image' => false, 'img_no_alt' => 2, 'canonical' => 'https://threemagipress.com/elsewhere', 'robots' => 'noindex']]), ctx(['now' => $t + 14]));
$f = qa($db, "SELECT * FROM page_facts WHERE path = '/facts'")[0] ?? [];
check('page facts stored as given (text, never interpreted)', ($f['title'] ?? '') === "<script>alert('x')</script>" && (int) $f['h1_count'] === 3 && (int) $f['og_image'] === 0, $f);
ta_record($db, pv('/facts', ['facts' => ['title' => 'bot title']]), ctx(['now' => $t + 15, 'ua' => $GOOGLEBOT]));
check('page facts from a bot do not overwrite', qv($db, "SELECT title FROM page_facts WHERE path = '/facts'") === "<script>alert('x')</script>");
check('a bot\'s beacon is stored as agent=bot, device=bot', qv($db, "SELECT agent || '/' || device || '/' || bot FROM sessions WHERE ua LIKE '%Googlebot%'") === 'bot/bot/Googlebot');

section('Global Privacy Control');
$db = useDataDir("$WORK/data-unit/gpc");
ta_record($db, pv('/', ['gpc' => true]), ctx(['now' => 1790200000, 'ip' => '198.51.100.77']));
ta_record($db, pv('/', ['gpc' => false]), ctx(['now' => 1790200000, 'ip' => '198.51.100.78']));
ta_record($db, pv('/', ['gpc' => 'yes']), ctx(['now' => 1790200000, 'ip' => '198.51.100.79']));
$g = qa($db, 'SELECT ip, ip_masked, gpc, ua FROM sessions ORDER BY ip');
check('GPC visit: IP stored masked from the first write', $g[0]['ip'] === '198.51.100.0' && (int) $g[0]['ip_masked'] === 1 && (int) $g[0]['gpc'] === 1, $g);
check('GPC visit: the raw user-agent string is not kept', $g[0]['ua'] === '');
check('GPC visit is still counted', (int) qv($db, 'SELECT COUNT(*) FROM pageviews') === 3);
check('without GPC the full IP is kept (the owner\'s request)', $g[1]['ip'] === '198.51.100.78' && (int) $g[1]['ip_masked'] === 0);
check('only a literal true counts as GPC', $g[2]['ip'] === '198.51.100.79');

section('owner exclusion');
$db = useDataDir("$WORK/data-unit/owner");
$t = 1790300000;
ta_record($db, pv('/'), ctx(['now' => $t, 'ip' => '192.0.2.9']));
ta_record($db, pv('/books'), ctx(['now' => $t + 30, 'ip' => '192.0.2.9', 'owner' => true]));
check('signing in mid-visit marks the whole visit as the owner\'s', (int) qv($db, 'SELECT SUM(owner) FROM pageviews') === 2 && (int) qv($db, 'SELECT owner FROM sessions') === 1);
$r = ta_range('custom', '2026-09-01', gmdate('Y-m-d', $t + 86400), 'UTC', $t + 86400);
check('owner traffic is excluded from stats by default', ta_kpiNumbers($db, $r['from'], $r['to'], false)['pageviews'] === 0);
check('  …and included on request', ta_kpiNumbers($db, $r['from'], $r['to'], true)['pageviews'] === 2);

section('retention: masking and pruning');
$db = useDataDir("$WORK/data-unit/retention");
$now = 1790400000;
$ins = static function (PDO $db, string $id, int $last, string $ip): void {
    $db->prepare("INSERT INTO sessions (id, visitor, start_ts, last_ts, pageviews, landing, exit_path, ip, ua) VALUES (?, 'v', ?, ?, 1, '/', '/', ?, 'UA string')")
        ->execute([$id, $last, $last, $ip]);
    $db->prepare("INSERT INTO pageviews (view_id, ts, session_id, visitor, seq, path) VALUES (?, ?, ?, 'v', 1, '/')")->execute(["pv-$id", $last, $id]);
    $db->prepare("INSERT INTO crawls (ts, path, kind, bot, ua, ip, status) VALUES (?, '/', 'page', 'Googlebot', 'g', ?, 200)")->execute([$last, $ip]);
};
$ins($db, 'recent', $now - 89 * 86400, '203.0.113.50');
$ins($db, 'old', $now - 91 * 86400, '203.0.113.51');
$ins($db, 'old6', $now - 91 * 86400, '2001:db8:aaaa:bbbb::5');
$ins($db, 'ancient', $now - 731 * 86400, '203.0.113.52');
$ins($db, 'kept', $now - 729 * 86400, '203.0.113.53');
$db->prepare("INSERT INTO bot_verdicts (ip, bot, verdict, ptr, checked_ts) VALUES ('203.0.113.51', 'Googlebot', 'failed', null, ?)")->execute([$now - 91 * 86400]);
$sum = ta_maintain($db, $now, true);
$ips = array_column(qa($db, 'SELECT id, ip FROM sessions'), 'ip', 'id');
check('IPs inside the window stay whole', ($ips['recent'] ?? '') === '203.0.113.50', $ips);
check('IPv4 past the window → last octet 0, flagged', ($ips['old'] ?? '') === '203.0.113.0' && (int) qv($db, "SELECT ip_masked FROM sessions WHERE id = 'old'") === 1, $ips);
check('IPv6 past the window → /48', ($ips['old6'] ?? '') === '2001:db8:aaaa::', $ips);
check('masked visits lose the raw user-agent string', qv($db, "SELECT ua FROM sessions WHERE id = 'old'") === '');
check('crawler IPs are masked the same way', (int) qv($db, "SELECT COUNT(*) FROM crawls WHERE ip_masked = 1") === 3);
check('cached verdicts for masked addresses are dropped', (int) qv($db, 'SELECT COUNT(*) FROM bot_verdicts') === 0);
check('events past the keep window are deleted', !isset($ips['ancient']) && (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE view_id = 'pv-ancient'") === 0);
check('events inside the keep window are kept (masked)', ($ips['kept'] ?? '') === '203.0.113.0');
check('the summary reports what was done', ($sum['masked']['sessions'] ?? 0) === 4 && ($sum['deleted']['sessions'] ?? 0) === 1 && ($sum['verdicts_dropped'] ?? 0) === 1, $sum);
check('last_prune is recorded', (int) (json_decode((string) ta_meta($db, 'last_prune'), true)['ts'] ?? 0) === $now);
check('opportunistic runs are throttled to one an hour', ta_maintain($db, $now + 60) === null && ta_maintain($db, $now + 3601) !== null);

section('crawler log: per-IP cap on what is written');
$db = useDataDir("$WORK/data-unit/crawlcap");
$t = 1790500000;
ta_txBegin($db);
for ($i = 0; $i < TA_CRAWL_LOG_LIMIT; $i++) {
    ta_logCrawl($db, ['now' => $t + $i, 'ip' => '203.0.113.200', 'ua' => $GOOGLEBOT, 'path' => '/p' . $i, 'status' => 200]);
}
ta_txCommit($db);
check('one address can log 300 rows in ten minutes…', (int) qv($db, 'SELECT COUNT(*) FROM crawls') === TA_CRAWL_LOG_LIMIT);
check('  …the next is not written', ta_logCrawl($db, ['now' => $t + 301, 'ip' => '203.0.113.200', 'ua' => $GOOGLEBOT, 'path' => '/x', 'status' => 200]) === 'rate_limited');
check('  …other addresses are unaffected', ta_logCrawl($db, ['now' => $t + 301, 'ip' => '203.0.113.201', 'ua' => $GOOGLEBOT, 'path' => '/x', 'status' => 200]) === 'stored');
check('  …and the cap lifts after ten minutes', ta_logCrawl($db, ['now' => $t + 1200, 'ip' => '203.0.113.200', 'ua' => $GOOGLEBOT, 'path' => '/x', 'status' => 200]) === 'stored');
check('a non-crawler user agent is never logged', ta_logCrawl($db, ['now' => $t, 'ip' => '203.0.113.9', 'ua' => $CHROME, 'path' => '/x']) === 'not_a_crawler');

section('CSV formula injection');
foreach (['=1+1', '+SUM(A1)', '-2+3', '@cmd', "\tx", "\rx"] as $bad) {
    check('neutralised: ' . json_encode($bad), ta_csvCell($bad) === "'" . $bad);
}
check('plain text untouched', ta_csvCell('/articles/x') === '/articles/x');
check('numbers untouched', ta_csvCell(-5) === '-5' && ta_csvCell(12) === '12' && ta_csvCell(null) === '');

section('date ranges');
$now = gmmktime(15, 30, 0, 10, 20, 2026);
$r = ta_range('today', null, null, 'UTC', $now);
check('today: midnight → now (this second included), hourly', $r['from'] === gmmktime(0, 0, 0, 10, 20, 2026) && $r['to'] === $now + 1 && $r['granularity'] === 'hour');
check('today compares with yesterday up to the same time', $r['prev_from'] === $r['from'] - 86400 && $r['prev_to'] === $now - 86400 + 1);
$r = ta_range('yesterday', null, null, 'UTC', $now);
check('yesterday: a whole day, previous is the day before', $r['to'] - $r['from'] === 86400 && $r['prev_to'] === $r['from']);
$r = ta_range('7d', null, null, 'UTC', $now);
check('7d: seven calendar days ending now, daily', $r['from'] === gmmktime(0, 0, 0, 10, 14, 2026) && $r['granularity'] === 'day' && count(ta_buckets($r['from'], $r['to'], 'day', 'UTC')) === 7);
$r = ta_range('12m', null, null, 'UTC', $now);
check('12m: 365 days', $r['days'] === 365);
$r = ta_range('7d', null, null, 'America/New_York', $now);
check('day boundaries follow the requested time zone', (new DateTime('@' . $r['from']))->setTimezone(new DateTimeZone('America/New_York'))->format('H:i') === '00:00');
$r = ta_range('custom', '2026-10-01', '2026-10-10', 'UTC', $now);
check('custom: inclusive dates', $r['from'] === gmmktime(0, 0, 0, 10, 1, 2026) && $r['to'] === gmmktime(0, 0, 0, 10, 11, 2026) && $r['days'] === 10 && $r['prev_to'] === $r['from']);
check('custom: to before from → "to"', ta_range('custom', '2026-10-10', '2026-10-01', 'UTC', $now) === 'to');
check('custom: the future → "to"', ta_range('custom', '2026-10-01', '2026-12-01', 'UTC', $now) === 'to');
check('custom: over two years → "from"', ta_range('custom', '2020-01-01', '2026-10-01', 'UTC', $now) === 'from');
check('custom: not a date → "from"', ta_range('custom', '2026-02-30', '2026-03-01', 'UTC', $now) === 'from');
check('unknown range → "range"', ta_range('forever', null, null, 'UTC', $now) === 'range');
check('bad time zone → "tz"', ta_range('7d', null, null, 'Mars/Olympus', $now) === 'tz');
$b = ta_buckets(gmmktime(0, 0, 0, 3, 29, 2026), gmmktime(0, 0, 0, 3, 30, 2026) - 3600, 'day', 'Europe/London');
check('a DST day is one bucket of 23 hours', count($b) === 1 && $b[0]['end'] - $b[0]['ts'] === 23 * 3600, $b);
$b = ta_buckets(gmmktime(18, 30, 0, 10, 19, 2026), gmmktime(20, 0, 0, 10, 19, 2026), 'hour', 'Asia/Kolkata');
check('hour buckets align to local hours in half-hour zones', $b[0]['label'] === '2026-10-20 00:00' && count($b) === 2, $b);

section('crawler verification (reverse DNS + forward-confirm)');
$rev = static fn(string $ptr) => static fn(string $ip) => $ptr;
$fwd = static fn(array $ips) => static fn(string $h) => $ips;
check('Googlebot, googlebot.com PTR that resolves back → verified',
    ta_verifyCrawlerIp('66.249.66.1', 'Googlebot', $rev('crawl-66-249-66-1.googlebot.com.'), $fwd(['66.249.66.1']))['verdict'] === 'verified');
check('Googlebot, PTR under google.com → verified', ta_verifyCrawlerIp('66.249.66.2', 'Googlebot', $rev('rate-limited-proxy-66-249-66-2.google.com'), $fwd(['66.249.66.2']))['verdict'] === 'verified');
check('Googlebot, PTR that does not resolve back → failed', ta_verifyCrawlerIp('66.249.66.1', 'Googlebot', $rev('crawl-66-249-66-1.googlebot.com'), $fwd(['66.249.66.99']))['verdict'] === 'failed');
check('Googlebot from a cloud VM (googleusercontent.com) → failed', ta_verifyCrawlerIp('34.1.2.3', 'Googlebot', $rev('3.2.1.34.bc.googleusercontent.com'), $fwd(['34.1.2.3']))['verdict'] === 'failed');
check('look-alike domain (googlebot.com.evil.example) → failed', ta_verifyCrawlerIp('203.0.113.9', 'Googlebot', $rev('crawl.googlebot.com.evil.example'), $fwd(['203.0.113.9']))['verdict'] === 'failed');
check('Bingbot under search.msn.com → verified', ta_verifyCrawlerIp('157.55.39.1', 'Bingbot', $rev('msnbot-157-55-39-1.search.msn.com'), $fwd(['157.55.39.1']))['verdict'] === 'verified');
check('Applebot under applebot.apple.com → verified', ta_verifyCrawlerIp('17.241.75.1', 'Applebot', $rev('17-241-75-1.applebot.apple.com'), $fwd(['17.241.75.1']))['verdict'] === 'verified');
check('IPv6 forward-confirm compares addresses, not strings', ta_verifyCrawlerIp('2001:4860:4801:10::1', 'Googlebot', $rev('crawl.googlebot.com'), $fwd(['2001:4860:4801:0010:0000:0000:0000:0001']))['verdict'] === 'verified');
check('no PTR at all → error (retried later)', ta_verifyCrawlerIp('66.249.66.1', 'Googlebot', static fn($i) => false, $fwd([]))['verdict'] === 'error');
check('GPTBot (no rDNS method) → unverifiable', ta_verifyCrawlerIp('20.171.207.1', 'GPTBot', $rev('x'), $fwd([]))['verdict'] === 'unverifiable');
check('DuckDuckBot (publishes an IP list only) → unverifiable', ta_verifyCrawlerIp('20.191.45.1', 'DuckDuckBot', $rev('x'), $fwd([]))['verdict'] === 'unverifiable');
check('a masked address cannot be verified', ta_verifyCrawlerIp('66.249.66.0', 'Googlebot', $rev('crawl.googlebot.com'), $fwd(['66.249.66.0']))['verdict'] === 'unverifiable');

section('admin tokens (signing reused from _lib.php, own domain)');
$now = time();
$tok = ta_adminIssue($now);
check('issued token verifies', is_array(ta_adminVerify($tok, $now)));
check('payload carries iat, exp (7 days) and the password fingerprint', ($p = ta_adminVerify($tok, $now)) !== null && $p['exp'] - $p['iat'] === 7 * 86400 && $p['ph'] === substr(hash('sha256', $HASH), 0, 16) && $p['d'] === 'admin');
[$body, $sig] = explode('.', $tok);
$payload = json_decode(b64urlDecode($body), true);
$payload['exp'] = $now + 999999;
check('tampered payload → refused', ta_adminVerify(b64urlEncode((string) json_encode($payload)) . '.' . $sig, $now) === null);
check('tampered signature → refused', ta_adminVerify($body . '.' . strrev($sig), $now) === null);
check('expired → refused', ta_adminVerify(signPayload(['v' => 1, 'iat' => $now - 8 * 86400, 'exp' => $now - 86400, 'ph' => ta_adminFingerprint()], 'admin'), $now) === null);
check('issued in the future → refused', ta_adminVerify(signPayload(['v' => 1, 'iat' => $now + 3600, 'exp' => $now + 7200, 'ph' => ta_adminFingerprint()], 'admin'), $now) === null);
check('lifetime longer than 7 days → refused', ta_adminVerify(signPayload(['v' => 1, 'iat' => $now, 'exp' => $now + 30 * 86400, 'ph' => ta_adminFingerprint()], 'admin'), $now) === null);
check('another password\'s fingerprint → refused', ta_adminVerify(signPayload(['v' => 1, 'iat' => $now, 'exp' => $now + 3600, 'ph' => str_repeat('0', 16)], 'admin'), $now) === null);
check('a membership pass signed with the same secret is not an admin session', ta_adminVerify(makePass('sub_x', 'supporter', ''), $now) === null);
check('a preview token is not an admin session', ta_adminVerify(signPayload(['v' => 1, 'p' => 1, 'c' => $now], 'preview'), $now) === null);
check('an admin session is not a membership pass', verifyToken($tok, 'pass') === null && currentPassFromToken($tok) === null);
function currentPassFromToken(string $t): ?array
{
    $p = verifyToken($t, 'pass');
    return validPassShape($p) ? $p : null;
}

// ------------------------------------- regressions for the review findings ---
section('review fixes: CSV quoting, User-Agent cleaning, networks');
check('a text field is always quoted, so a ";" cannot split it in semicolon-locale Excel', ta_csvField('x;=1+1;') === '"x;=1+1;"', ta_csvField('x;=1+1;'));
check('  …the formula guard still applies inside the quotes', ta_csvField('=1+1;x') === "\"'=1+1;x\"", ta_csvField('=1+1;x'));
check('  …inner quotes are doubled; numbers stay bare', ta_csvField('a"b') === '"a""b"' && ta_csvField(42) === '42');
$dirty = ta_cleanUa("Mozilla/5.0 \x1b[31mRED\x1b[0m \x07\x01\x7f end");
check('control characters leave a User-Agent before it is stored', !preg_match('/[\x00-\x1F\x7F]/', $dirty) && str_contains($dirty, 'RED'), $dirty);
check('IPv6 addresses in one /64 share a limit key', ta_netKey('2001:db8:1:2::1') === ta_netKey('2001:db8:1:2:ffff:ffff:ffff:9'));
check('  …a different /64 does not', ta_netKey('2001:db8:1:2::1') !== ta_netKey('2001:db8:1:3::1'));
check('  …an IPv4-mapped address counts as its IPv4 address', ta_netKey('::ffff:203.0.113.5') === ta_netKey('203.0.113.5'));
check('  …each IPv4 address is its own network', ta_netKey('203.0.113.5') !== ta_netKey('203.0.113.6'));

section('review fixes: the sign-in limit holds under parallel attempts');
// Twelve processes take from one bucket at the same instant; with the lock
// held across read, check and write, exactly the limit (5) get a slot.
$raceFile = "$WORK/race-login.json";
@unlink($raceFile);
$start = microtime(true) + 0.6;
$code = 'require ' . var_export("$PUBLIC/api/_lib.php", true) . '; time_sleep_until(' . var_export($start, true) . '); echo var_export(rateLimitTake(' . var_export($raceFile, true) . ', 5, 900), true);';
$procs = [];
$pipes = [];
for ($i = 0; $i < 12; $i++) {
    $procs[$i] = proc_open([PHP_BINARY, '-r', $code], [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes[$i]);
}
$taken = 0;
$outs = [];
foreach ($procs as $i => $p) {
    $out = trim((string) stream_get_contents($pipes[$i][1]));
    fclose($pipes[$i][1]);
    fclose($pipes[$i][2]);
    proc_close($p);
    $outs[] = $out;
    $taken += $out === 'true' ? 1 : 0;
}
check('12 attempts at the same instant: exactly 5 take a slot', $taken === 5, $outs);
check('  …and the file holds exactly 5 stamps', count(json_decode((string) file_get_contents($raceFile), true) ?: []) === 5);

section('review fixes: crawler checks, page facts, unmeasured scroll');
check('a PTR lookup that returns the address itself (no answer) → error, not failed',
    ta_verifyCrawlerIp('66.249.66.1', 'Googlebot', $rev('66.249.66.1'), $fwd(['66.249.66.1']))['verdict'] === 'error');
$db = useDataDir("$WORK/data-unit/facts");
$facts = static fn(string $t) => ['title' => $t, 'description' => 'About the books.', 'canonical' => 'https://threemagipress.com/books',
    'robots' => '', 'lang' => 'en', 'h1' => 1, 'og_title' => true, 'og_image' => true, 'img_no_alt' => 0];
$title = static fn() => qv($db, "SELECT title FROM page_facts WHERE path = '/books'");
ta_record($db, pv('/books', ['facts' => $facts('Books')]), ctx(['now' => 1790000000, 'ip' => '203.0.113.7']));
check('the first report of a page\'s facts is kept', $title() === 'Books', $title());
ta_record($db, pv('/books', ['facts' => $facts('FORGED')]), ctx(['now' => 1790000100, 'ip' => '198.51.100.9']));
check('one different report does not replace them', $title() === 'Books', $title());
ta_record($db, pv('/books', ['facts' => $facts('FORGED')]), ctx(['now' => 1790000200, 'ip' => '198.51.100.77']));
check('  …nor does the same network again (one witness)', $title() === 'Books', $title());
ta_record($db, pv('/books', ['facts' => $facts('FORGED')]), ctx(['now' => 1790000300, 'ip' => '192.0.2.5']));
check('  …a second network reporting the same does', $title() === 'FORGED', $title());
$db = useDataDir("$WORK/data-unit/scroll");
$sv = pv('/books');
ta_record($db, $sv, ctx());
ta_record($db, ['type' => 'engage', 'view' => $sv['view'], 'seconds' => 12], ctx(['now' => 1790000030]));
$row = qa($db, 'SELECT engaged_s, scroll_pct FROM pageviews WHERE view_id = ?', [$sv['view']])[0] ?? [];
check('an engagement with time but no scroll measurement leaves scroll unknown (NULL), not 0',
    (int) ($row['engaged_s'] ?? -1) === 12 && array_key_exists('scroll_pct', $row) && $row['scroll_pct'] === null, $row);

section('.htaccess crawler-log block and robots.txt');
$ht = (string) file_get_contents("$PUBLIC/.htaccess");
check('block is clearly marked', substr_count($ht, '>>> crawler log >>>') === 1 && substr_count($ht, '<<< crawler log <<<') === 1);
$stripped = preg_replace('/^[ \t]*# >>> crawler log >>>.*?# <<< crawler log <<<[^\n]*\n/ms', '', $ht);
check('deleting the block gives back the original file byte for byte (no existing rule changed)', hash('sha256', (string) $stripped) === ORIGINAL_HTACCESS_SHA256, hash('sha256', (string) $stripped));
$posEssays = strpos($ht, 'RewriteRule ^tl-essays');
$posBlock = strpos($ht, '>>> crawler log >>>');
$posSpa = strpos($ht, 'RewriteRule ^ index.html');
check('block sits after the static-folder 404s and before the SPA fallback', $posEssays < $posBlock && $posBlock < $posSpa);
preg_match_all('/RewriteCond %\{HTTP_USER_AGENT\} \((\S+)\) \[NC\]/', $ht, $m);
check('both crawler conditions use the same list', count($m[1]) === 2 && $m[1][0] === $m[1][1]);
$listed = array_map(static fn($s) => str_replace('\.', '.', $s), explode('|', $m[1][0] ?? ''));
check('the list is TA_CRAWLERS, in order (keeps .htaccess and PHP in step)', $listed === array_column(TA_CRAWLERS, 0), array_diff(array_column(TA_CRAWLERS, 0), $listed));
check('only GET and HEAD are rewritten', substr_count($ht, 'RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$') === 2);
check('a missing crawl.php switches the block off instead of looping', substr_count($ht, 'RewriteCond %{DOCUMENT_ROOT}/api/crawl.php -f') === 2);
foreach (['Googlebot', 'Google-InspectionTool', 'Storebot-Google', 'AdsBot-Google', 'bingbot', 'msnbot', 'DuckDuckBot', 'YandexBot', 'Baiduspider',
          'Applebot', 'facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'Slackbot', 'Discordbot', 'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
          'ClaudeBot', 'Claude-User', 'PerplexityBot', 'CCBot', 'Amazonbot', 'Bytespider', 'SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot',
          'PetalBot', 'SeznamBot', 'Qwantbot'] as $name) {
    if (!in_array($name, $listed, true)) {
        check("spec crawler listed: $name", false);
    }
}
check('every crawler the spec names is listed', true);
$robots = file((string) "$PUBLIC/robots.txt", FILE_IGNORE_NEW_LINES);
check('robots.txt keeps its lines in order', array_values(array_intersect($robots, ['User-agent: *', 'Allow: /', 'Sitemap: https://threemagipress.com/sitemap.xml'])) === ['User-agent: *', 'Allow: /', 'Sitemap: https://threemagipress.com/sitemap.xml']);
check('robots.txt disallows /admin and /api/', in_array('Disallow: /admin', $robots, true) && in_array('Disallow: /api/', $robots, true));

// ================================================================== http ===

$SERVER = null;

function serverStart(string $docroot, array $env, string $tag): void
{
    global $SERVER, $PORT, $WORK, $HERE;
    serverStop();
    @mkdir("$WORK/tmp", 0755, true);
    $cmd = [PHP_BINARY, '-S', "127.0.0.1:$PORT", '-t', $docroot,
        '-d', 'display_errors=0', '-d', 'log_errors=1', '-d', "error_log=$WORK/php-error-$tag.log", '-d', "sys_temp_dir=$WORK/tmp",
        '-d', 'opcache.revalidate_freq=0',
        "$HERE/router.php"];
    $fullEnv = array_merge(getenv(), $env);
    $SERVER = proc_open($cmd, [0 => ['file', '/dev/null', 'r'], 1 => ['file', "$WORK/server-$tag.log", 'a'], 2 => ['file', "$WORK/server-$tag.log", 'a']], $pipes, $docroot, $fullEnv);
    for ($i = 0; $i < 100; $i++) {
        $s = @fsockopen('127.0.0.1', (int) $PORT, $en, $es, 0.1);
        if ($s) {
            fclose($s);
            return;
        }
        usleep(50000);
    }
    fwrite(STDERR, "server did not start on $PORT\n");
    exit(2);
}

function serverStop(): void
{
    global $SERVER;
    if (is_resource($SERVER)) {
        proc_terminate($SERVER);
        proc_close($SERVER);
    }
    $SERVER = null;
}

register_shutdown_function('serverStop');

function http(string $method, string $path, array $o = []): array
{
    global $BASE;
    $ch = curl_init($BASE . $path);
    $headers = array_merge(['Expect:'], $o['headers'] ?? []);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_USERAGENT => $o['ua'] ?? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    ]);
    if ($method === 'HEAD') {
        curl_setopt($ch, CURLOPT_NOBODY, true);
    }
    if (array_key_exists('body', $o)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $o['body']);
    }
    if (isset($o['cookie'])) {
        curl_setopt($ch, CURLOPT_COOKIE, $o['cookie']);
    }
    $t = microtime(true);
    $raw = (string) curl_exec($ch);
    $elapsed = microtime(true) - $t;
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $hsize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    curl_close($ch);
    $head = substr($raw, 0, $hsize);
    $body = (string) substr($raw, $hsize);
    $hdrs = [];
    foreach (preg_split('/\r?\n/', $head) ?: [] as $line) {
        if (str_contains($line, ':')) {
            [$k, $v] = explode(':', $line, 2);
            $hdrs[strtolower(trim($k))][] = trim($v);
        }
    }
    return ['status' => $status, 'headers' => $hdrs, 'body' => $body, 'json' => json_decode($body, true), 'time' => $elapsed];
}

function hdr(array $r, string $name): ?string
{
    return $r['headers'][strtolower($name)][0] ?? null;
}

/** The built-in server is single-threaded: once any later request returns,
 *  the work a previous script did after answering (logging) is finished. */
function barrier(): void
{
    http('GET', '/assets/app-abc123.js');
}

function beacon(array $event, ?array $headers = null, ?string $cookie = null, ?string $ua = null, ?string $raw = null): array
{
    global $BASE;
    $headers ??= ['Origin: ' . $BASE, 'Content-Type: text/plain;charset=UTF-8'];
    $o = ['headers' => $headers, 'body' => $raw ?? (string) json_encode($event)];
    if ($cookie !== null) {
        $o['cookie'] = $cookie;
    }
    if ($ua !== null) {
        $o['ua'] = $ua;
    }
    $r = http('POST', '/api/hit.php', $o);
    barrier();
    return $r;
}

function adminGet(string $q, string $cookie): array
{
    return http('GET', '/api/admin.php?' . $q, ['cookie' => $cookie]);
}

function adminPost(string $action, array $body, ?string $cookie = null, ?array $headers = null): array
{
    global $BASE;
    $o = ['headers' => $headers ?? ['Content-Type: application/json', 'Origin: ' . $BASE], 'body' => (string) json_encode($body)];
    if ($cookie !== null) {
        $o['cookie'] = $cookie;
    }
    return http('POST', '/api/admin.php?a=' . $action, $o);
}

function clearRate(): void
{
    global $WORK, $DATA;
    foreach (array_merge(glob("$WORK/tmp/tl-membership-rate/*") ?: [], glob("$WORK/tmp/tl-admin-rate/*") ?: []) as $f) {
        @unlink($f);
    }
    // The collection limits live in the analytics database (rate_log).
    $file = isset($DATA) ? "$DATA/analytics.sqlite" : '';
    if ($file !== '' && is_file($file)) {
        try {
            $pdo = new PDO('sqlite:' . $file);
            $pdo->setAttribute(PDO::ATTR_TIMEOUT, 5);
            $pdo->exec('DELETE FROM rate_log');
        } catch (Throwable) {
            // no rate_log yet: nothing to clear
        }
    }
}

function cookieFrom(array $r): ?string
{
    foreach ($r['headers']['set-cookie'] ?? [] as $c) {
        if (str_starts_with($c, TA_ADMIN_COOKIE . '=')) {
            return explode(';', $c, 2)[0];
        }
    }
    return null;
}

$DATA = "$WORK/data";
$ENV = ['TL_SECRETS_FILE' => $SECRETS, 'TL_ANALYTICS_DIR' => $DATA];
serverStart("$WORK/www", $ENV, 'main');
$sdb = function () use ($DATA): PDO {
    $p = new PDO('sqlite:' . $DATA . '/analytics.sqlite');
    $p->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $p->exec('PRAGMA busy_timeout = 5000');
    return $p;
};

section('router.php reproduces the .htaccess rules for people');
$r = http('GET', '/');
check('/ → the app shell, no-cache', $r['status'] === 200 && $r['body'] === $INDEX && hdr($r, 'cache-control') === 'no-cache');
$r = http('GET', '/third-lamp/archive');
check('an app route → the app shell', $r['status'] === 200 && $r['body'] === $INDEX);
$r = http('GET', '/assets/app-abc123.js');
check('a real asset → itself, immutable', $r['status'] === 200 && hdr($r, 'cache-control') === 'public, max-age=31536000, immutable');
check('a missing asset → 404, never the shell', http('GET', '/assets/app-old999.js')['status'] === 404);
check('a missing /media/ file → 404', http('GET', '/media/nope.png')['status'] === 404);
check('/tl-essays → 404', http('GET', '/tl-essays/x.json')['status'] === 404);
check('/.htaccess → 403', http('GET', '/.htaccess')['status'] === 403);
$r = http('GET', '/api/_analytics.php');
check('/api/_analytics.php over HTTP → 404, empty', $r['status'] === 404 && $r['body'] === '');
check('/api/_analytics_report.php over HTTP → 404', http('GET', '/api/_analytics_report.php')['status'] === 404);

section('crawl.php: crawlers get the real files, always 200');
$bots = [$GOOGLEBOT, 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)', 'facebookexternalhit/1.1'];
$files = ['/' => [$INDEX, 'text/html', 'no-cache'], '/books' => [$INDEX, 'text/html', 'no-cache'], '/articles/the-twice-born' => [$INDEX, 'text/html', 'no-cache'],
    '/robots.txt' => [$ROBOTS, 'text/plain', 'no-cache'], '/sitemap.xml' => [$SITEMAP, 'application/xml', 'no-cache'], '/llms.txt' => [$LLMS, 'text/plain', null]];
foreach ($bots as $bi => $bua) {
    foreach ($files as $path => [$bytes, $type, $cache]) {
        if ($bi > 0 && !in_array($path, ['/', '/robots.txt'], true)) {
            continue;
        }
        $r = http('GET', $path, ['ua' => $bua]);
        $human = http('GET', $path);
        check(sprintf('%-22s %-26s 200, same bytes, %s', ta_knownCrawler($bua)[0], $path, $type),
            $r['status'] === 200 && $r['body'] === $bytes && str_starts_with((string) hdr($r, 'content-type'), $type) && $r['body'] === $human['body'],
            [$r['status'], hdr($r, 'content-type'), strlen($r['body'])]);
        check(sprintf('%-22s %-26s Cache-Control as .htaccess gives it (%s)', '', $path, $cache ?? 'none'), hdr($r, 'cache-control') === $cache && hdr($human, 'cache-control') === $cache, [hdr($r, 'cache-control'), hdr($human, 'cache-control')]);
    }
}
$r = http('HEAD', '/', ['ua' => $GOOGLEBOT]);
check('HEAD / for Googlebot → 200, no body, the right length', $r['status'] === 200 && $r['body'] === '' && (int) hdr($r, 'content-length') === strlen($INDEX));
check('a missing asset is still a 404 for crawlers', http('GET', '/assets/app-old999.js', ['ua' => $GOOGLEBOT])['status'] === 404);
check('a real asset is still served as itself to crawlers', hdr(http('GET', '/assets/app-abc123.js', ['ua' => $GOOGLEBOT]), 'cache-control') === 'public, max-age=31536000, immutable');
$r = http('GET', '/admin', ['ua' => $GOOGLEBOT]);
check('/admin for a crawler → the shell with X-Robots-Tag noindex', $r['status'] === 200 && $r['body'] === $INDEX && hdr($r, 'x-robots-tag') === 'noindex, nofollow');
http('GET', '/api/crawl.php');                 // a person, directly
http('GET', '/api/crawl.php', ['ua' => $GOOGLEBOT]);
http('POST', '/books', ['ua' => $GOOGLEBOT, 'body' => 'x']);
barrier();
$db = $sdb();
$crawls = qa($db, 'SELECT path, kind, bot, method, status, ip FROM crawls ORDER BY id');
$n = count($crawls);
check('every crawler request was logged (and nothing else)', $n === 6 + 2 * 3 + 2, array_map(static fn($c) => $c['bot'] . ' ' . $c['path'], $crawls));
check('kinds: page / robots / sitemap / llms', array_count_values(array_column($crawls, 'kind')) == ['page' => 3 + 3 + 1 + 1, 'robots' => 4, 'sitemap' => 1, 'llms' => 1], array_count_values(array_column($crawls, 'kind')));
check('bot names recorded', in_array('Bingbot', array_column($crawls, 'bot'), true) && in_array('GPTBot', array_column($crawls, 'bot'), true) && in_array('Facebook', array_column($crawls, 'bot'), true));
check('HEAD is logged as HEAD', in_array('HEAD', array_column($crawls, 'method'), true));
check('status and IP recorded', $crawls[0]['status'] == 200 && $crawls[0]['ip'] === '127.0.0.1');
check('people and direct /api/crawl.php requests leave no crawl row', !in_array('/api/crawl.php', array_column($crawls, 'path'), true));

section('hit.php: validation and rejection (always 204, never a body)');
$count = static fn() => (int) qv($sdb(), 'SELECT COUNT(*) FROM pageviews');
$before = $count();
$r = beacon(pv('/books', ['view' => 'http-view-1', 'ref' => 'https://www.bing.com/']));
check('valid pageview → 204, empty body', $r['status'] === 204 && $r['body'] === '', [$r['status'], $r['body']]);
check('  …stored', $count() === $before + 1);
check('  …answered fast', $r['time'] < 2.0, $r['time']);
$r = http('GET', '/api/hit.php');
check('GET → 204 and nothing stored', $r['status'] === 204 && $count() === $before + 1);
$rows = $count();
$rej = [
    'foreign Origin' => [pv('/x'), ['Origin: https://evil.example', 'Content-Type: text/plain']],
    'Origin "null"' => [pv('/x'), ['Origin: null', 'Content-Type: text/plain']],
    'no Origin and no Referer' => [pv('/x'), ['Content-Type: text/plain']],
    'foreign Referer, no Origin' => [pv('/x'), ['Referer: https://evil.example/page', 'Content-Type: text/plain']],
    'look-alike host' => [pv('/x'), ['Origin: https://threemagipress.com.evil.example']],
    'unknown type' => [['type' => 'pwn', 'path' => '/x'], null],
    'path without a leading slash' => [pv('x'), null],
    'protocol-relative path' => [pv('//evil.example/'), null],
    'bad view id' => [pv('/x', ['view' => '<script>']), null],
];
foreach ($rej as $label => [$ev, $h]) {
    $r = beacon($ev, $h);
    check("rejected silently: $label", $r['status'] === 204 && $r['body'] === '' && $count() === $rows, [$r['status'], $count() - $rows]);
}
foreach (['malformed JSON' => '{"type":"pageview",', 'a JSON array' => '[1,2,3]', 'a JSON string' => '"pageview"', 'empty body' => '',
          'over 8 KB' => (string) json_encode(pv('/x', ['pad' => str_repeat('a', 8300)]))] as $label => $raw) {
    $r = beacon([], null, null, null, $raw);
    check("rejected silently: $label", $r['status'] === 204 && $r['body'] === '' && $count() === $rows);
}
$r = beacon(pv('/via-referer'), ['Referer: http://127.0.0.1:' . $PORT . '/books', 'Content-Type: text/plain']);
check('no Origin but a same-site Referer → accepted', $count() === $rows + 1);
$r = beacon(pv('/via-site-host'), ['Origin: https://www.threemagipress.com', 'Content-Type: text/plain']);
check('Origin of one of the site\'s hosts → accepted', $count() === $rows + 2);
$r = beacon(pv('/headers'));
check('hit.php is noindex and no-store', hdr($r, 'x-robots-tag') === 'noindex, nofollow' && hdr($r, 'cache-control') === 'no-store');

section('hit.php: per-IP rate limit (240 events / 10 minutes)');
clearRate();
$start = $count();
$t = microtime(true);
for ($i = 0; $i < TA_HIT_LIMIT + 5; $i++) {
    http('POST', '/api/hit.php', ['headers' => ['Origin: ' . $BASE, 'Content-Type: text/plain'], 'ua' => 'RateTest/1.0 (Windows NT 10.0) Chrome/129.0',
        'body' => (string) json_encode(pv('/rate', ['view' => sprintf('rate-view-%04d', $i)]))]);
}
barrier();
check('exactly 240 stored, the rest dropped', $count() - $start === TA_HIT_LIMIT, $count() - $start);
printf("       (%d beacons in %.1fs)\n", TA_HIT_LIMIT + 5, microtime(true) - $t);
clearRate();

section('login: success, failure, lockout');
clearRate();
$r = adminPost('login', ['email' => $EMAIL, 'password' => 'wrong-' . $PASSWORD]);
check('wrong password → 401', $r['status'] === 401 && ($r['json']['code'] ?? '') === 'bad_credentials');
$r2 = adminPost('login', ['email' => 'someone@example.test', 'password' => $PASSWORD]);
check('wrong email → 401 with the very same message', $r2['status'] === 401 && $r2['json'] == $r['json'], [$r['json'], $r2['json']]);
$times = ['email' => [], 'password' => []];
foreach ([1, 2] as $_) {
    $times['password'][] = adminPost('login', ['email' => $EMAIL, 'password' => 'nope'])['time'];
}
foreach ([1] as $_) {
    $times['email'][] = adminPost('login', ['email' => 'nobody@example.test', 'password' => 'nope'])['time'];
}
$te = min($times['email']);
$tp = min($times['password']);
check(sprintf('wrong email costs a password_verify too (%.0f ms vs %.0f ms)', $te * 1000, $tp * 1000), $te > 0.5 * $tp, $times);
clearRate();
$r = adminPost('login', ['email' => '  ' . strtoupper($EMAIL) . ' ', 'password' => $PASSWORD]);
check('right email (any case, spaces) and password → 200', $r['status'] === 200 && ($r['json']['ok'] ?? false) === true, $r['json']);
$COOKIE = cookieFrom($r);
$set = implode(' | ', $r['headers']['set-cookie'] ?? []);
check('session cookie is HttpOnly', stripos($set, 'httponly') !== false, $set);
check('  …SameSite=Strict', stripos($set, 'samesite=strict') !== false);
check('  …Path=/api/', stripos($set, 'path=/api/') !== false);
check('  …Max-Age 7 days', stripos($set, 'max-age=604800') !== false);
check('  …not Secure on localhost (Secure elsewhere)', stripos($set, 'secure') === false);
check('the login response never echoes the password', !str_contains($r['body'], $PASSWORD));
clearRate();
for ($i = 1; $i <= 5; $i++) {
    $r = adminPost('login', ['email' => $EMAIL, 'password' => "bad-$i"]);
}
check('five failures are all 401', $r['status'] === 401);
$r = adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD]);
check('the sixth attempt is 429 even with the right password', $r['status'] === 429 && ($r['json']['code'] ?? '') === 'locked' && hdr($r, 'retry-after') === '900', [$r['status'], $r['json']]);
check('  …and sets no cookie', cookieFrom($r) === null);
clearRate();
$r = adminPost('login', ['email' => $EMAIL, 'password' => str_repeat('a', 2000)]);
check('an absurdly long password is refused like any other', $r['status'] === 401 && $r['json']['error'] === ADMIN_FAIL_MESSAGE_TEST);
check('a login body over 4 KB → 413', adminPost('login', ['email' => $EMAIL, 'password' => str_repeat('a', 5000)])['status'] === 413);
clearRate();

section('sessions: tamper, expiry, password change');
check('me with the cookie → 200', adminGet('a=me', $COOKIE)['status'] === 200);
check('me without it → 401', http('GET', '/api/admin.php?a=me')['status'] === 401);
[$cname, $cval] = explode('=', $COOKIE, 2);
[$cb, $cs] = explode('.', $cval);
$pl = json_decode(b64urlDecode($cb), true);
$pl['exp'] += 86400 * 365;
check('tampered payload → 401', adminGet('a=me', "$cname=" . b64urlEncode((string) json_encode($pl)) . ".$cs")['status'] === 401);
check('tampered signature → 401', adminGet('a=me', "$cname=$cb." . strrev($cs))['status'] === 401);
check('expired token → 401', adminGet('a=me', "$cname=" . signPayload(['v' => 1, 'iat' => time() - 8 * 86400, 'exp' => time() - 60, 'ph' => ta_adminFingerprint()], 'admin'))['status'] === 401);
check('a membership pass in the admin cookie → 401', adminGet('a=me', "$cname=" . makePass('sub_x', 'supporter', ''))['status'] === 401);
check('the admin cookie is not a membership pass', (http('GET', '/api/pass.php', ['cookie' => "tl_pass=$cval"])['json']['member'] ?? null) === false);
writeSecrets($SECRETS, ['admin_password_hash' => password_hash('changed-' . $PASSWORD, PASSWORD_DEFAULT)] + $SECRET_VALUES);
check('changing the password signs every session out', adminGet('a=me', $COOKIE)['status'] === 401);
writeSecrets($SECRETS, $SECRET_VALUES);
check('  …(and restoring it brings this one back)', adminGet('a=me', $COOKIE)['status'] === 200);
$r = adminPost('logout', [], $COOKIE);
check('logout → 200 and the cookie is cleared', $r['status'] === 200 && preg_match('/^tl_admin=(deleted)?;.*(max-age=0|expires=)/i', implode(' ', $r['headers']['set-cookie'] ?? [])) === 1, $r['headers']['set-cookie'] ?? []);

section('CSRF: JSON content type and this site\'s Origin on every POST');
clearRate();
$good = ['Content-Type: application/json', 'Origin: ' . $BASE];
$csrfCases = [
    'no Origin' => ['Content-Type: application/json'],
    'foreign Origin' => ['Content-Type: application/json', 'Origin: https://evil.example'],
    'same host, other port' => ['Content-Type: application/json', 'Origin: http://127.0.0.1:1'],
    'Origin "null"' => ['Content-Type: application/json', 'Origin: null'],
    'text/plain body' => ['Content-Type: text/plain', 'Origin: ' . $BASE],
    'form body' => ['Content-Type: application/x-www-form-urlencoded', 'Origin: ' . $BASE],
];
foreach ($csrfCases as $label => $h) {
    $r = adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD], null, $h);
    check("login refused: $label → 403", $r['status'] === 403 && ($r['json']['code'] ?? '') === 'csrf' && cookieFrom($r) === null, [$r['status'], $r['json']]);
}
$COOKIE = cookieFrom(adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD], null, $good));
check('with both, login works', $COOKIE !== null);
check('prune with a valid session but a foreign Origin → 403', adminPost('prune', [], $COOKIE, ['Content-Type: application/json', 'Origin: https://evil.example'])['status'] === 403);
check('verify-bot with a valid session but text/plain → 403', adminPost('verify-bot', [], $COOKIE, ['Content-Type: text/plain', 'Origin: ' . $BASE])['status'] === 403);

section('admin.php: headers, methods, parameters');
foreach (['a=me' => null, 'a=me&x' => $COOKIE, 'a=nope' => $COOKIE, 'a=health' => null] as $q => $c) {
    $r = $c === null ? http('GET', "/api/admin.php?$q") : adminGet($q, $c);
    $ok = hdr($r, 'cache-control') === 'no-store' && hdr($r, 'x-robots-tag') === 'noindex, nofollow' && hdr($r, 'x-content-type-options') === 'nosniff'
        && hdr($r, 'referrer-policy') === 'same-origin' && hdr($r, 'x-frame-options') === 'DENY';
    check("security headers on $q (" . $r['status'] . ')', $ok, $r['headers']);
}
check('GET login → 405', http('GET', '/api/admin.php?a=login')['status'] === 405);
check('POST stats → 405', adminPost('stats', [], $COOKIE)['status'] === 405);
check('unknown action → 404', adminGet('a=../../etc', $COOKIE)['status'] === 404);
check('stats without a session → 401', http('GET', '/api/admin.php?a=stats')['status'] === 401);
foreach (['a=stats&range=forever' => 'range', 'a=stats&section=secrets' => 'section', 'a=stats&tz=Mars/Base' => 'tz',
          'a=stats&range=custom&from=2026-10-10&to=2026-10-01' => 'to', 'a=stats&section=pages&sort=1;DROP' => 'sort',
          'a=stats&section=pages&limit=0' => 'limit', 'a=stats&section=page' => 'path', 'a=stats&section=page&path=x' => 'path',
          'a=visitors&ip=1.2.3.999' => 'ip', 'a=visitors&country=usa' => 'country', 'a=visitors&device=fridge' => 'device',
          'a=visitors&channel=tv' => 'channel', 'a=visitor' => 'ip', 'a=export&table=meta' => 'table', 'a=stats&include_owner=yes' => 'include_owner',
          'a=stats&range[]=7d' => 'range', 'a=crawlers&bot=%3Cscript%3E' => 'bot'] as $q => $param) {
    $r = adminGet($q, $COOKIE);
    check("400 for $q", $r['status'] === 400 && ($r['json']['param'] ?? '') === $param, [$r['status'], $r['json']]);
}

section('review fixes: sign-out ends every session; plain HTTP is refused');
clearRate();
$c1 = cookieFrom(adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD]));
$c2 = cookieFrom(adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD]));
check('two browsers signed in', $c1 !== null && $c2 !== null && adminGet('a=me', (string) $c2)['status'] === 200);
$r = adminPost('logout', [], $c1);
check('sign-out answers that it revoked the sessions', $r['status'] === 200 && ($r['json']['revoked'] ?? false) === true, $r['json']);
check('  …a saved copy of that cookie no longer works', adminGet('a=me', (string) $c1)['status'] === 401);
check('  …nor does the other browser\'s session', adminGet('a=me', (string) $c2)['status'] === 401);
$r = http('POST', '/api/admin.php?a=login', ['headers' => ['Host: threemagipress.com', 'Origin: https://threemagipress.com', 'Content-Type: application/json'],
    'body' => (string) json_encode(['email' => $EMAIL, 'password' => $PASSWORD])]);
check('sign-in over plain HTTP from a real host → 403 https_required', $r['status'] === 403 && ($r['json']['code'] ?? '') === 'https_required', [$r['status'], $r['json']]);
check('  …and sets no cookie', cookieFrom($r) === null);
clearRate();
$COOKIE = cookieFrom(adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD]));

section('owner hits are flagged (the admin cookie rides along to /api/hit.php)');
$r = beacon(pv('/owner-was-here', ['view' => 'owner-view-1']), null, $COOKIE);
check('a beacon carrying the admin cookie is stored with owner = 1', (int) qv($sdb(), "SELECT owner FROM pageviews WHERE view_id = 'owner-view-1'") === 1);
$r = beacon(pv('/owner-was-here', ['view' => 'owner-view-2']), null, "$cname=$cb." . strrev($cs), 'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0');
check('a forged admin cookie does not make an owner hit', (int) qv($sdb(), "SELECT owner FROM pageviews WHERE view_id = 'owner-view-2'") === 0);

section('CSV export neutralises formula injection');
beacon(['type' => 'search', 'query' => '=HYPERLINK("http://evil.example","x")', 'results' => 0, 'path' => '/third-lamp/education']);
beacon(['type' => 'search', 'query' => '@SUM(1+1)', 'results' => 2]);
$r = adminGet('a=export&table=searches&range=today', $COOKIE);
check('export → text/csv attachment', $r['status'] === 200 && str_starts_with((string) hdr($r, 'content-type'), 'text/csv') && str_contains((string) hdr($r, 'content-disposition'), 'attachment; filename="tl-analytics-searches-'));
check('export is no-store and noindex too', hdr($r, 'cache-control') === 'no-store' && hdr($r, 'x-robots-tag') === 'noindex, nofollow');
$lines = array_map('str_getcsv', array_filter(explode("\n", preg_replace('/^\xEF\xBB\xBF/', '', $r['body']))));
$cells = array_merge(...$lines);
check('"=" cell is prefixed with an apostrophe', in_array("'=hyperlink(\"http://evil.example\",\"x\")", $cells, true), $cells);
check('"@" cell is prefixed with an apostrophe', in_array("'@sum(1+1)", $cells, true));
check('no cell starts with a formula character', array_filter($cells, static fn($c) => $c !== '' && strpbrk($c[0], "=+-@\t\r") !== false) === []);

// ------------------------------------------- stats vs direct SQL, seeded ---
section('dashboard numbers cross-checked against direct SQL (seeded traffic)');
$NOW = time();
$seedDb = useDataDir($DATA);
$seed = sd_seed($seedDb, ['days' => 21, 'visits' => 40, 'seed' => 11, 'now' => $NOW, 'docroot' => "$WORK/www", 'host' => '127.0.0.1', 'live' => 3]);
ta_db(1500, true);
check(sprintf('seeded %d events (%d visits, %d crawls)', $seed['events'], $seed['visits'], $seed['crawls']), $seed['stored'] === $seed['events'] && $seed['events'] > 1000, $seed);
$db = $sdb();
$h = "agent = 'human' AND owner = 0";
$ov = adminGet('a=stats&section=overview&range=7d&tz=UTC', $COOKIE);
$rg = $ov['json']['range'] ?? [];
$F = (int) ($rg['from'] ?? 0);
$T = (int) ($rg['to'] ?? 0);
$k = $ov['json']['kpis'] ?? [];
check('overview → 200', $ov['status'] === 200, $ov['json']);
check('pageviews = SQL', ($k['pageviews']['value'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE ts >= ? AND ts < ? AND $h", [$F, $T]));
check('visitors = SQL (distinct daily hashes)', ($k['visitors']['value'] ?? -1) === (int) qv($db, "SELECT COUNT(DISTINCT visitor) FROM pageviews WHERE ts >= ? AND ts < ? AND $h", [$F, $T]));
$vis = (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h", [$F, $T]);
check('visits = SQL', ($k['visits']['value'] ?? -1) === $vis);
check('bounce rate = SQL', abs(($k['bounce_rate']['value'] ?? -1) - round(100 * (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE pageviews = 1 AND start_ts >= ? AND start_ts < ? AND $h", [$F, $T]) / max(1, $vis), 1)) < 0.001);
check('average visit length = SQL', ($k['avg_visit_s']['value'] ?? -1) === (int) round((float) qv($db, "SELECT AVG(last_ts - start_ts) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h", [$F, $T])));
check('views per visit = SQL', abs(($k['views_per_visit']['value'] ?? -1) - round((int) qv($db, "SELECT SUM(pageviews) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h", [$F, $T]) / max(1, $vis), 2)) < 0.001);
check('previous-period pageviews = SQL', ($k['pageviews']['previous'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE ts >= ? AND ts < ? AND $h", [$rg['prev_from'], $rg['prev_to']]));
$pts = $ov['json']['series']['points'] ?? [];
check('daily chart: 7 points summing to the KPIs', count($pts) === 7 && array_sum(array_column($pts, 'pageviews')) === $k['pageviews']['value'] && array_sum(array_column($pts, 'visits')) === $vis);
check('previous series is drawn too', count($ov['json']['series']['previous'] ?? []) === 7);
check('live = SQL (last 5 minutes)', ($ov['json']['live']['visitors'] ?? -1) === (int) qv($db, "SELECT COUNT(DISTINCT visitor) FROM sessions WHERE last_ts >= ? AND $h", [time() - 300]) && $ov['json']['live']['visitors'] >= 1);
check('top pages are the SQL top pages', array_column($ov['json']['top_pages'] ?? [], 'views') === array_map('intval', array_column(qa($db, "SELECT COUNT(*) AS n FROM pageviews WHERE ts >= ? AND ts < ? AND $h GROUP BY path ORDER BY n DESC, path LIMIT 10", [$F, $T]), 'n')));
check('excluded counts = SQL', ($ov['json']['excluded']['bot_pageviews'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE agent = 'bot' AND ts >= ? AND ts < ?", [$F, $T]));
$ow = adminGet('a=stats&section=overview&range=7d&tz=UTC&include_owner=1', $COOKIE);
check('include_owner=1 adds the owner\'s views', ($ow['json']['kpis']['pageviews']['value'] ?? 0) === (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE ts >= ? AND ts < ? AND agent = 'human'", [$F, $T]) && $ow['json']['kpis']['pageviews']['value'] > $k['pageviews']['value']);
$td = adminGet('a=stats&section=overview&range=today&tz=UTC', $COOKIE);
check('today is hourly', ($td['json']['series']['granularity'] ?? '') === 'hour' && count($td['json']['series']['points'] ?? []) === (int) gmdate('G', $NOW) + 1);

$pg = adminGet('a=stats&section=pages&range=30d&tz=UTC&limit=2000', $COOKIE);
$rg = $pg['json']['range'] ?? [];
[$F, $T] = [(int) $rg['from'], (int) $rg['to']];
$allViews = (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE ts >= ? AND ts < ? AND $h", [$F, $T]);
check('pages: views add up to all pageviews', array_sum(array_column($pg['json']['pages'] ?? [], 'views')) === $allViews);
check('pages: entries add up to visits', array_sum(array_column($pg['json']['pages'] ?? [], 'entries')) === (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h AND landing IN (SELECT DISTINCT path FROM pageviews WHERE ts >= ? AND ts < ? AND $h)", [$F, $T, $F, $T]));
check('pages: groups add up to all pageviews', array_sum(array_column($pg['json']['groups'] ?? [], 'views')) === $allViews);
check('pages: the Scriptorium is its own group', in_array('scriptorium', array_column($pg['json']['groups'] ?? [], 'group'), true));
check('pages: "rising" lists gains', ($pg['json']['rising'][0]['gain'] ?? 0) > 0);
$sorted = adminGet('a=stats&section=pages&range=30d&sort=path&dir=asc', $COOKIE)['json']['pages'] ?? [];
$paths = array_column($sorted, 'path');
$copy = $paths;
sort($copy, SORT_STRING);
check('pages: sort=path&dir=asc', $paths === $copy && $paths !== []);
$grp = adminGet('a=stats&section=pages&range=30d&group=essays', $COOKIE)['json']['pages'] ?? [];
check('pages: group filter', $grp !== [] && array_unique(array_column($grp, 'group')) === ['essays']);
$top = $pg['json']['pages'][0]['path'] ?? '/';
$one = adminGet('a=stats&section=page&range=30d&tz=UTC&path=' . rawurlencode($top), $COOKIE)['json'] ?? [];
check("page drill-down ($top): views = SQL", ($one['totals']['views'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM pageviews WHERE path = ? AND ts >= ? AND ts < ? AND $h", [$top, $F, $T]));
check('page drill-down: next pages + left the site = views', array_sum(array_column($one['next_pages'] ?? [], 'views')) + ($one['left_site'] ?? 0) === ($one['totals']['views'] ?? -1));
check('page drill-down: entries by source = entries', array_sum(array_column($one['sources'] ?? [], 'entries')) === ($one['totals']['entries'] ?? -1));
check('page drill-down: daily trend sums to views', array_sum(array_column($one['series']['points'] ?? [], 'views')) === ($one['totals']['views'] ?? -1));

$src = adminGet('a=stats&section=sources&range=30d&tz=UTC', $COOKIE)['json'] ?? [];
$byCh = [];
foreach (qa($db, "SELECT channel, COUNT(*) AS n FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h GROUP BY channel", [$F, $T]) as $row) {
    $byCh[$row['channel']] = (int) $row['n'];
}
$got = [];
foreach ($src['channels'] ?? [] as $c) {
    if ($c['visits'] > 0) {
        $got[$c['channel']] = $c['visits'];
    }
}
ksort($byCh);
ksort($got);
check('sources: visits per channel = SQL', $got === $byCh, [$got, $byCh]);
check('sources: all five channels are always listed', array_column($src['channels'] ?? [], 'channel') === TA_CHANNELS);
$google = array_values(array_filter($src['sources'] ?? [], static fn($s) => $s['name'] === 'Google'))[0] ?? null;
check('sources: Google expands to hosts and referrer paths', $google !== null && $google['hosts'] !== [] && $google['hosts'][0]['referrers'] !== [] && $google['landing_pages'] !== []);
check('sources: UTM campaigns listed', in_array('issue-14', array_column($src['campaigns'] ?? [], 'campaign'), true));

$vz = adminGet('a=visitors&range=30d&tz=UTC&limit=200', $COOKIE)['json'] ?? [];
check('visitors: total = SQL', ($vz['total'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h", [$F, $T]));
$v0 = $vz['visits'][0] ?? [];
check('visitors: newest first, with IP, country (from the time zone), device, landing', isset($v0['ip'], $v0['country_source'], $v0['device'], $v0['landing']) && $v0['country_source'] === 'time_zone');
$us = adminGet('a=visitors&range=30d&tz=UTC&country=US', $COOKIE)['json'] ?? [];
check('visitors: filter by country = SQL', ($us['total'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE country = 'US' AND start_ts >= ? AND start_ts < ? AND $h", [$F, $T]));
$byPage = adminGet('a=visitors&range=30d&tz=UTC&page=' . rawurlencode($top), $COOKIE)['json'] ?? [];
check('visitors: filter by page = SQL', ($byPage['total'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM sessions s WHERE start_ts >= ? AND start_ts < ? AND $h AND EXISTS (SELECT 1 FROM pageviews p WHERE p.session_id = s.id AND p.path = ?)", [$F, $T, $top]));
$byCh = adminGet('a=visitors&range=30d&tz=UTC&channel=ai', $COOKIE)['json'] ?? [];
check('visitors: filter by source channel = SQL', ($byCh['total'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE channel = 'ai' AND start_ts >= ? AND start_ts < ? AND $h", [$F, $T]));
$page2 = adminGet('a=visitors&range=30d&tz=UTC&limit=5&offset=5', $COOKIE)['json']['visits'] ?? [];
check('visitors: offset pages through the log', ($page2[0]['id'] ?? '') === ($vz['visits'][5]['id'] ?? 'x'));
$ip = (string) qv($db, "SELECT ip FROM sessions WHERE $h GROUP BY ip ORDER BY COUNT(*) DESC LIMIT 1");
$one = adminGet('a=visitor&ip=' . rawurlencode($ip), $COOKIE)['json'] ?? [];
check("one IP's history ($ip): every visit = SQL", ($one['visits_count'] ?? -1) === (int) qv($db, 'SELECT COUNT(*) FROM sessions WHERE ip = ?', [$ip]));
check('  …with its pages, first/last seen and user agents', ($one['visits'][0]['page_views'] ?? []) !== [] && ($one['first_seen'] ?? 0) > 0 && ($one['user_agents'] ?? []) !== []);
$lv = adminGet('a=live', $COOKIE)['json'] ?? [];
check('live: visitors = SQL, with current pages', ($lv['visitors'] ?? -1) === (int) qv($db, "SELECT COUNT(DISTINCT visitor) FROM sessions WHERE last_ts >= ? AND $h", [time() - 300]) && ($lv['visits'][0]['current_path'] ?? '') !== '');

$se = adminGet('a=stats&section=search&range=30d&tz=UTC', $COOKIE)['json'] ?? [];
check('search: totals = SQL', ($se['totals']['searches'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM searches WHERE ts >= ? AND ts < ? AND $h", [$F, $T])
    && ($se['totals']['no_result_searches'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM searches WHERE results = 0 AND ts >= ? AND ts < ? AND $h", [$F, $T]));
check('search: content gaps (no results) listed', ($se['no_results'] ?? []) !== [] && array_sum(array_column($se['per_day']['points'] ?? [], 'searches')) === $se['totals']['searches']);

$te = adminGet('a=stats&section=technology&range=30d&tz=UTC', $COOKIE)['json'] ?? [];
$visits30 = (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE start_ts >= ? AND start_ts < ? AND $h", [$F, $T]);
check('technology: devices add up to visits', array_sum(array_column($te['devices'] ?? [], 'visits')) === $visits30);
check('technology: browsers, OS, screens, languages present', ($te['browsers'][0]['versions'] ?? []) !== [] && ($te['os'] ?? []) !== [] && ($te['screens'] ?? []) !== [] && ($te['languages'] ?? []) !== []);

$cr = adminGet('a=crawlers&range=30d&tz=UTC', $COOKIE)['json'] ?? [];
check('crawlers: hits = SQL', ($cr['totals']['hits'] ?? -1) === (int) qv($db, 'SELECT COUNT(*) FROM crawls WHERE ts >= ? AND ts < ?', [$F, $T]));
check('crawlers: robots.txt fetches = SQL', ($cr['files']['robots']['hits'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM crawls WHERE kind = 'robots' AND ts >= ? AND ts < ?", [$F, $T]));
$gb = array_values(array_filter($cr['bots'] ?? [], static fn($b) => $b['bot'] === 'Googlebot'))[0] ?? [];
check('crawlers: Googlebot is "mixed" (verified IPs and an impostor)', ($gb['verification'] ?? '') === 'mixed' && $gb['verified_hits'] > 0 && $gb['failed_hits'] > 0, $gb);
check('crawlers: GPTBot is "unverifiable" (claims to be)', (array_values(array_filter($cr['bots'] ?? [], static fn($b) => $b['bot'] === 'GPTBot'))[0]['verification'] ?? '') === 'unverifiable');
check('crawlers: per-day series per bot', count($cr['series']['buckets'] ?? []) === 30 && array_sum(array_map(static fn($s) => array_sum($s['counts']), $cr['series']['bots'] ?? [])) === $cr['totals']['hits']);
check('crawlers: last crawl per page with sitemap membership', isset($cr['pages'][0]['last'], $cr['pages'][0]['in_sitemap']));
check('crawlers: JS-running bots that sent beacons are listed', ($cr['beacon_bots'][0]['bot'] ?? '') === 'Googlebot');

$seo = adminGet('a=seo&range=30d&tz=UTC', $COOKIE)['json'] ?? [];
check('seo → 200', ($seo['ok'] ?? false) === true, $seo);
check('seo: search-engine visits = SQL', ($seo['search_engines']['visits'] ?? -1) === (int) qv($db, "SELECT COUNT(*) FROM sessions WHERE channel = 'search' AND start_ts >= ? AND start_ts < ? AND $h", [$F, $T]));
$sum = $seo['health']['summary'] ?? [];
foreach (['title_long', 'title_duplicate', 'description_missing', 'description_short', 'description_long', 'canonical_elsewhere', 'canonical_missing', 'noindex', 'h1_missing', 'h1_multiple', 'img_no_alt', 'og_image_missing'] as $issue) {
    check("seo health finds $issue", ($sum[$issue] ?? 0) > 0, $sum);
}
check('seo health: the 404 page is not audited', !in_array('/articles/the-emerald-tablet', array_column($seo['health']['pages'] ?? [], 'path'), true));
check('seo: vitals p75 with ratings', is_int($seo['vitals']['site']['lcp']['p75'] ?? null) && in_array($seo['vitals']['site']['lcp']['rating'] ?? '', ['good', 'needs-improvement', 'poor'], true));
$lcps = array_map('intval', array_column(qa($db, "SELECT lcp FROM vitals WHERE lcp IS NOT NULL AND ts >= ? AND ts < ? AND $h ORDER BY lcp", [$F, $T]), 'lcp'));
check('seo: site LCP p75 = nearest-rank over SQL', ($seo['vitals']['site']['lcp']['p75'] ?? -1) === ($lcps[(int) ceil(0.75 * count($lcps)) - 1] ?? -2));
check('seo: 404s with referrers', ($seo['not_found']['pages'][0]['referrers'] ?? []) !== [] && ($seo['not_found']['hits'] ?? 0) === (int) qv($db, "SELECT COUNT(*) FROM notfound WHERE ts >= ? AND ts < ? AND $h", [$F, $T]));
check('seo: sitemap read from disk', ($seo['sitemap']['available'] ?? false) === true && ($seo['sitemap']['url_count'] ?? 0) === count($SITEMAP_PATHS));
check('seo: sitemap pages never visited are listed', array_intersect($seed['never_visited'], $seo['sitemap']['never_visited'] ?? []) === $seed['never_visited'], [$seed['never_visited'], $seo['sitemap']['never_visited'] ?? null]);
check('seo: sitemap pages never crawled are listed', array_intersect($seed['never_crawled'], $seo['sitemap']['never_crawled'] ?? []) !== []);
check('seo: visited pages missing from the sitemap are listed', in_array('/plans', array_column($seo['sitemap']['not_in_sitemap'] ?? [], 'path'), true));
check('seo: links out are plain URLs (Search Console, Bing, PageSpeed)', str_starts_with($seo['links']['search_console'] ?? '', 'https://search.google.com/') && str_starts_with($seo['links']['pages'][0]['pagespeed'] ?? '', 'https://pagespeed.web.dev/'));

$ex = adminGet('a=export&table=pageviews&range=30d&tz=UTC', $COOKIE);
$exRows = count(array_filter(explode("\n", $ex['body']))) - 1;
check('export pageviews: one row per pageview in range', $exRows === (int) qv($db, 'SELECT COUNT(*) FROM pageviews WHERE ts >= ? AND ts < ?', [$F, $T]), [$exRows]);

$vb = adminPost('verify-bot', ['ip' => '127.0.0.1'], $COOKIE);
check('verify-bot: 127.0.0.1 claiming Googlebot → failed (PTR is not googlebot.com)', ($vb['json']['results'][0]['verdict'] ?? '') === 'failed', $vb['json']);
check('  …and the verdict is stamped on its logged crawls', (int) qv($sdb(), "SELECT COUNT(*) FROM crawls WHERE ip = '127.0.0.1' AND verdict = 'failed'") > 0);
check('verify-bot: an address with no crawl on record → 404', adminPost('verify-bot', ['ip' => '192.0.2.123'], $COOKIE)['status'] === 404);
check('verify-bot: a bad address → 400', adminPost('verify-bot', ['ip' => 'localhost'], $COOKIE)['status'] === 400);

$pr = adminPost('prune', [], $COOKIE);
check('prune now → 200 with what it masked and deleted', $pr['status'] === 200 && isset($pr['json']['masked'], $pr['json']['deleted']), $pr['json']);
$he = adminGet('a=health', $COOKIE)['json'] ?? [];
check('health (signed in): storage, rows, retention, last prune', ($he['storage']['ok'] ?? false) === true && ($he['rows']['pageviews'] ?? 0) > 0
    && ($he['retention']['ip_days'] ?? 0) === 90 && ($he['last_prune']['ts'] ?? 0) === $pr['json']['ran_at']);
check('health: secrets reported yes/no, never their values', ($he['keys']['admin_password_hash'] ?? null) === true && !str_contains(json_encode($he), $HASH) && !str_contains(json_encode($he), $COOKIE_SECRET));
check('health: crawler-log block detected, PHP and pdo_sqlite reported', ($he['crawler_log']['htaccess_block'] ?? false) === true && ($he['pdo_sqlite'] ?? false) === true && isset($he['php_version']));
check('health: this browser is excluded while signed in', ($he['this_browser']['excluded'] ?? false) === true);
check('health: rehash advice for an old-cost hash', ($he['password_needs_rehash'] ?? null) === false && password_needs_rehash(password_hash('x', PASSWORD_BCRYPT, ['cost' => 4]), PASSWORD_DEFAULT));
$hr = http('GET', '/api/admin.php?a=health')['json'] ?? [];
check('health signed out: only whether setup is complete', $hr === ['ok' => true, 'authenticated' => false, 'configured' => true, 'missing' => []], $hr);

// =============================================== failure modes, isolated ===

section('not configured: admin keys missing');
writeSecrets("$WORK/tl-secrets-partial.php", ['cookie_secret' => $COOKIE_SECRET]);
serverStart("$WORK/www", ['TL_SECRETS_FILE' => "$WORK/tl-secrets-partial.php", 'TL_ANALYTICS_DIR' => "$WORK/data-partial"], 'partial');
$r = http('GET', '/api/admin.php?a=me');
check('me → 503 not_configured, naming the missing keys', $r['status'] === 503 && ($r['json']['code'] ?? '') === 'not_configured' && ($r['json']['missing'] ?? []) === ['admin_email', 'admin_password_hash'], $r['json']);
check('login → 503', adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD])['status'] === 503);
check('health → configured: false', (http('GET', '/api/admin.php?a=health')['json']['configured'] ?? null) === false);
beacon(pv('/still-counting', ['view' => 'partial-view']));
check('collection does not depend on the dashboard being set up', (int) qv(useDataDir("$WORK/data-partial"), "SELECT COUNT(*) FROM pageviews WHERE view_id = 'partial-view'") === 1);

$crawlerChecks = static function (string $label) use ($INDEX, $ROBOTS, $SITEMAP, $GOOGLEBOT) {
    foreach (['/' => $INDEX, '/powers/map' => $INDEX, '/robots.txt' => $ROBOTS, '/sitemap.xml' => $SITEMAP] as $path => $bytes) {
        $r = http('GET', $path, ['ua' => $GOOGLEBOT]);
        check("$label: Googlebot $path → 200, correct bytes", $r['status'] === 200 && $r['body'] === $bytes, [$r['status'], strlen($r['body']), substr($r['body'], 0, 120)]);
    }
    $r = beacon(pv('/x'));
    check("$label: hit.php → 204, empty", $r['status'] === 204 && $r['body'] === '');
};

section('data folder unwritable');
serverStart("$WORK/www", ['TL_SECRETS_FILE' => $SECRETS, 'TL_ANALYTICS_DIR' => "$WORK/afile/sub"], 'unwritable');
$crawlerChecks('unwritable');
clearRate();
$C2 = cookieFrom(adminPost('login', ['email' => $EMAIL, 'password' => $PASSWORD]));
$r = adminGet('a=stats', (string) $C2);
check('stats → 503 storage_unavailable with the reason and the fix', $r['status'] === 503 && ($r['json']['storage']['code'] ?? '') === 'dir_unwritable' && str_contains($r['json']['storage']['fix'] ?? '', 'hPanel'), $r['json']);
$r = adminGet('a=health', (string) $C2);
check('health → storage.ok false, says why', ($r['json']['storage']['ok'] ?? null) === false && ($r['json']['storage']['code'] ?? '') === 'dir_unwritable');
check('nothing was created inside the web root', !file_exists("$WORK/www/tl-analytics") && glob("$WORK/www/*.sqlite") === []);

section('database file corrupt');
@mkdir("$WORK/data-corrupt", 0700, true);
file_put_contents("$WORK/data-corrupt/analytics.sqlite", str_repeat("not a database\n", 400));
serverStart("$WORK/www", ['TL_SECRETS_FILE' => $SECRETS, 'TL_ANALYTICS_DIR' => "$WORK/data-corrupt"], 'corrupt');
$crawlerChecks('corrupt db');

section('_analytics.php broken by a bad deploy');
copyTree("$WORK/www", "$WORK/www-broken");
file_put_contents("$WORK/www-broken/api/_analytics.php", "<?php\nthis is not php (\n");
serverStart("$WORK/www-broken", $ENV, 'broken');
$crawlerChecks('broken library');

section('index.html missing (a broken deploy): an honest 404, not a 500');
copyTree("$WORK/www", "$WORK/www-noindex");
unlink("$WORK/www-noindex/index.html");
serverStart("$WORK/www-noindex", $ENV, 'noindex');
$r = http('GET', '/books', ['ua' => $GOOGLEBOT]);
check('Googlebot /books → 404', $r['status'] === 404, $r['status']);
check('robots.txt still served', http('GET', '/robots.txt', ['ua' => $GOOGLEBOT])['body'] === $ROBOTS);
serverStop();

foreach (['main', 'partial', 'unwritable', 'corrupt', 'broken', 'noindex'] as $tag) {
    $log = (string) @file_get_contents("$WORK/php-error-$tag.log");
    $fatal = preg_grep('/PHP (Fatal|Parse) error/', explode("\n", $log)) ?: [];
    if ($tag === 'broken') {
        $fatal = array_filter($fatal, static fn($l) => !str_contains($l, '_analytics.php'));
    }
    check("no unexpected PHP fatal errors ($tag)", $fatal === [], array_slice($fatal, 0, 3));
}

// ========================================================== built site ===

$DIST = "$REPO/dist/apps/web";
if ($RUN_DIST && is_file("$DIST/index.html")) {
    section('the built site (dist/apps/web) through router.php');
    serverStart($DIST, ['TL_SECRETS_FILE' => $SECRETS, 'TL_ANALYTICS_DIR' => "$WORK/data-dist"], 'dist');
    $idx = (string) file_get_contents("$DIST/index.html");
    foreach (['/', '/books', '/articles/the-twice-born', '/third-lamp/education/latin'] as $p) {
        $r = http('GET', $p, ['ua' => $GOOGLEBOT]);
        check("Googlebot $p → 200, exactly dist/index.html", $r['status'] === 200 && $r['body'] === $idx && hdr($r, 'cache-control') === 'no-cache');
    }
    foreach (['robots.txt', 'sitemap.xml', 'llms.txt'] as $f) {
        if (is_file("$DIST/$f")) {
            $r = http('GET', "/$f", ['ua' => 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)']);
            check("Bingbot /$f → 200, exact bytes", $r['status'] === 200 && $r['body'] === file_get_contents("$DIST/$f"));
        }
    }
    check('built robots.txt disallows /admin and /api/', str_contains((string) @file_get_contents("$DIST/robots.txt"), "Disallow: /admin\nDisallow: /api/"));
    check('built sitemap.xml does not list /admin', !str_contains((string) @file_get_contents("$DIST/sitemap.xml"), '/admin'));
    $asset = basename((string) (glob("$DIST/assets/*.js")[0] ?? ''));
    check("a real built asset → immutable ($asset)", $asset !== '' && hdr(http('GET', "/assets/$asset", ['ua' => $GOOGLEBOT]), 'cache-control') === 'public, max-age=31536000, immutable');
    check('a stale chunk → 404 for people and crawlers', http('GET', '/assets/index-OLD.js')['status'] === 404 && http('GET', '/assets/index-OLD.js', ['ua' => $GOOGLEBOT])['status'] === 404);
    check('people get the shell for app routes', http('GET', '/powers/map')['body'] === $idx);
    barrier();
    $ddb = useDataDir("$WORK/data-dist");
    $present = count(array_filter(['robots.txt', 'sitemap.xml', 'llms.txt'], static fn($f) => is_file("$DIST/$f")));
    check('crawler visits to the built site were logged', (int) qv($ddb, 'SELECT COUNT(*) FROM crawls') === 4 + $present);
    serverStop();
} elseif ($RUN_DIST) {
    section('the built site');
    echo "  skip  dist/apps/web not built (cd apps/web && npm run build)\n";
}

printf("\n%s\npassed %d, failed %d\n", str_repeat('=', 60), $passed, $failed);
if ($failed > 0) {
    echo "failed:\n  - " . implode("\n  - ", $failures) . "\n";
}
if (!$KEEP && $failed === 0) {
    rrmdir($WORK);
}
exit($failed > 0 ? 1 : 0);
