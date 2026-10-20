<?php
/**
 * A router for PHP's built-in server that behaves like public/.htaccess on
 * Hostinger, for local end-to-end runs of the built site:
 *
 *   php -S 127.0.0.1:4301 -t dist/apps/web apps/web/tests/analytics-php/router.php
 *
 * Reproduced, in the .htaccess order:
 *  1. a missing file under /assets/, /media/ or /fonts/ is a 404, never the app;
 *  2. /tl-essays is a 404;
 *  3. the crawler-log block: a known crawler's GET/HEAD for an app route, "/",
 *     robots.txt, sitemap.xml or llms.txt goes to api/crawl.php. The crawler
 *     pattern is read from the docroot's own .htaccess, so the router follows
 *     the file and an .htaccess without the block disables it here too;
 *  4. real files are served as they are (PHP under /api/ is executed), with
 *     the .htaccess Cache-Control rules; .ht* files are refused (403);
 *  5. anything else is the SPA shell, index.html.
 *
 * Environment for the API (TL_SECRETS_FILE, TL_ANALYTICS_DIR) is inherited
 * from the shell that starts the server.
 *
 * Test hook: a request from this machine (127.0.0.1 / ::1) may carry
 * `X-TL-Test-Client-IP: <address>` to stand for a visitor at that address,
 * so one run can play several people (tests/analytics-e2e/system.e2e.mjs).
 * It only rewrites REMOTE_ADDR for the scripts behind this router; this
 * router is never deployed (the live site runs .htaccess), and the shipped
 * PHP has no such override.
 */

declare(strict_types=1);

$testIp = $_SERVER['HTTP_X_TL_TEST_CLIENT_IP'] ?? null;
unset($_SERVER['HTTP_X_TL_TEST_CLIENT_IP']);
if (is_string($testIp) && in_array((string) ($_SERVER['REMOTE_ADDR'] ?? ''), ['127.0.0.1', '::1'], true)
    && filter_var($testIp, FILTER_VALIDATE_IP) !== false) {
    $_SERVER['REMOTE_ADDR'] = $testIp;
}
unset($testIp);

$root = rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/');
$uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
$path = rawurldecode((string) (parse_url($uri, PHP_URL_PATH) ?? '/'));
if ($path === '' || $path[0] !== '/') {
    $path = '/' . $path;
}
$rel = ltrim($path, '/');
$method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));

function router_status(int $code, string $text): bool
{
    http_response_code($code);
    header('Content-Type: text/plain; charset=UTF-8');
    echo $text, "\n";
    return true;
}

function router_type(string $file): string
{
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    return [
        'html' => 'text/html; charset=UTF-8', 'js' => 'text/javascript; charset=UTF-8', 'mjs' => 'text/javascript; charset=UTF-8',
        'css' => 'text/css; charset=UTF-8', 'json' => 'application/json', 'xml' => 'application/xml; charset=UTF-8',
        'txt' => 'text/plain; charset=UTF-8', 'svg' => 'image/svg+xml', 'png' => 'image/png', 'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg', 'gif' => 'image/gif', 'webp' => 'image/webp', 'avif' => 'image/avif', 'ico' => 'image/x-icon',
        'woff2' => 'font/woff2', 'woff' => 'font/woff', 'ttf' => 'font/ttf', 'otf' => 'font/otf', 'mp3' => 'audio/mpeg',
        'm4a' => 'audio/mp4', 'ogg' => 'audio/ogg', 'wav' => 'audio/wav', 'mp4' => 'video/mp4', 'webm' => 'video/webm',
        'pdf' => 'application/pdf', 'map' => 'application/json',
    ][$ext] ?? 'application/octet-stream';
}

/** Serve a static file with the .htaccess caching rules. */
function router_static(string $file, string $rel, string $method): bool
{
    http_response_code(200);
    header('Content-Type: ' . router_type($file));
    $base = basename($file);
    if (preg_match('#^assets/#', $rel)) {
        header('Cache-Control: public, max-age=31536000, immutable');
    } elseif (preg_match('#^(media|fonts)/#', $rel)) {
        header('Cache-Control: public, max-age=604800');
    }
    if (in_array($base, ['index.html', 'sitemap.xml', 'robots.txt'], true)) {
        header('Cache-Control: no-cache');
    }
    header('Content-Length: ' . filesize($file));
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', (int) filemtime($file)) . ' GMT');
    if ($method !== 'HEAD') {
        readfile($file);
    }
    return true;
}

/** The crawler pattern from the docroot's .htaccess, or null if the block is gone. */
function router_crawlerPattern(string $root): ?string
{
    $ht = @file_get_contents($root . '/.htaccess');
    if (!is_string($ht) || !preg_match('/>>> crawler log >>>(.*?)<<< crawler log <<</s', $ht, $block)) {
        return null;
    }
    if (!preg_match('/RewriteCond %\{HTTP_USER_AGENT\} (\S+) \[NC\]/', $block[1], $m)) {
        return null;
    }
    return '#' . str_replace('#', '\#', $m[1]) . '#i';
}

$file = $root . '/' . $rel;
$real = @realpath($file);
if ($real !== false && !str_starts_with($real . '/', $root . '/')) {
    return router_status(403, 'Forbidden'); // traversal outside the docroot
}
$isFile = $rel !== '' && is_file($file);
$isDir = is_dir($file);

if (preg_match('#(^|/)\.ht#', $rel)) {
    return router_status(403, 'Forbidden');
}
// 1–2. The genuine 404s.
if (!$isFile && preg_match('#^(assets|media|fonts)/#', $rel)) {
    return router_status(404, 'Not Found');
}
if (preg_match('#^tl-essays(/|$)#', $rel)) {
    return router_status(404, 'Not Found');
}
// 3. The crawler log.
$pattern = router_crawlerPattern($root);
$ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
if ($pattern !== null && in_array($method, ['GET', 'HEAD'], true) && is_file($root . '/api/crawl.php') && preg_match($pattern, $ua)) {
    $appRoute = !str_starts_with($path, '/api/') && !$isFile && !$isDir;
    $named = preg_match('#^(robots\.txt|sitemap\.xml|llms\.txt)?$#', $rel) === 1;
    if ($appRoute || $named) {
        $_SERVER['SCRIPT_NAME'] = '/api/crawl.php';
        $_SERVER['SCRIPT_FILENAME'] = $root . '/api/crawl.php';
        $_SERVER['PHP_SELF'] = '/api/crawl.php';
        chdir($root . '/api');
        require $root . '/api/crawl.php';
        return true;
    }
}
// 4. Real files.
if ($isFile) {
    if (str_ends_with($rel, '.php')) {
        return false; // the built-in server executes it
    }
    return router_static($file, $rel, $method);
}
if ($isDir) {
    if (is_file(rtrim($file, '/') . '/index.html')) {
        return router_static(rtrim($file, '/') . '/index.html', ltrim($rel . '/index.html', '/'), $method);
    }
    return router_status(403, 'Forbidden');
}
// 5. The app shell.
if (!is_file($root . '/index.html')) {
    return router_status(404, 'Not Found');
}
return router_static($root . '/index.html', 'index.html', $method);
