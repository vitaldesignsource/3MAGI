<?php
/**
 * Three Magi Press — the crawler log.
 *
 * The crawler-log block in public/.htaccess sends requests from known
 * crawlers here for app routes, "/", robots.txt, sitemap.xml and llms.txt.
 * People never come here. This script answers with exactly the file Apache
 * would have served — same bytes, same Content-Type, same Cache-Control,
 * status 200 — and only AFTER the response is complete does it try to record
 * the visit. Nothing about analytics can turn a crawler's page into an error:
 * the streaming half below has no dependencies at all, and the logging half
 * is wrapped in try/catch (a missing or broken _analytics.php included).
 *
 * It must not include _lib.php, which sends a JSON Content-Type on include.
 * To switch the crawler log off, delete the marked block in .htaccess.
 */

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

$webRoot = dirname(__DIR__);
$uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
$path = parse_url($uri, PHP_URL_PATH);
$path = is_string($path) && $path !== '' ? $path : '/';
$method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));

// The files .htaccess would serve, and the headers it gives each.
// index.html, sitemap.xml and robots.txt get "no-cache" from the FilesMatch
// rule; llms.txt gets no Cache-Control at all, as when Apache serves it.
$files = [
    '/robots.txt'  => ['robots.txt',  'text/plain; charset=UTF-8',      'no-cache'],
    '/sitemap.xml' => ['sitemap.xml', 'application/xml; charset=UTF-8', 'no-cache'],
    '/llms.txt'    => ['llms.txt',    'text/plain; charset=UTF-8',      null],
];
$app = ['index.html', 'text/html; charset=UTF-8', 'no-cache'];

$pick = $files[$path] ?? $app;
// A missing robots.txt/sitemap.xml/llms.txt falls through to the app shell,
// exactly as the SPA rule would hand it index.html without this block.
if (!is_file($webRoot . '/' . $pick[0])) {
    $pick = $app;
}
[$name, $type, $cache] = $pick;
$file = $webRoot . '/' . $name;
$status = is_file($file) && is_readable($file) ? 200 : 404;

if (function_exists('header_remove')) {
    header_remove('X-Powered-By');
}
// Where PHP cannot end the request before the logging below (Apache with
// mod_php has neither finish function), a compressed reply would be sent
// chunked, and its last chunk would wait for this script to exit, logging
// included. Uncompressed, the Content-Length set below ends the reply as soon
// as the file is out. LiteSpeed and PHP-FPM end the request early instead
// and keep their compression.
if (!function_exists('litespeed_finish_request') && !function_exists('fastcgi_finish_request') && function_exists('apache_setenv')) {
    @apache_setenv('no-gzip', '1');
}
http_response_code($status);
if ($status === 200) {
    header('Content-Type: ' . $type);
    if ($cache !== null) {
        header('Cache-Control: ' . $cache);
    }
    $size = @filesize($file);
    if (is_int($size)) {
        header('Content-Length: ' . $size);
    }
    $mtime = @filemtime($file);
    if (is_int($mtime)) {
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $mtime) . ' GMT');
    }
    // The owner's dashboard is never for search engines.
    if ($name === 'index.html' && preg_match('#^/admin(/|$)#', $path)) {
        header('X-Robots-Tag: noindex, nofollow');
    }
    if ($method !== 'HEAD') {
        readfile($file);
    }
} else {
    // The deploy is broken (no index.html). Say so plainly, as Apache would.
    header('Content-Type: text/plain; charset=UTF-8');
    if ($method !== 'HEAD') {
        echo "Not Found\n";
    }
}

// ---------------------------------------------------------------------------
// Push the response out NOW. Once headers have been sent, not even a fatal
// error below (which PHP would otherwise turn into a 500 while the reply is
// still buffered) can change what the crawler received.
ignore_user_abort(true);
while (ob_get_level() > 0) {
    @ob_end_flush();
}
@flush();

// The response is complete. Everything below is best effort and silent.
try {
    if (function_exists('litespeed_finish_request')) {
        @litespeed_finish_request();
    } elseif (function_exists('fastcgi_finish_request')) {
        @fastcgi_finish_request();
    } else {
        @flush();
    }
    require_once __DIR__ . '/_analytics.php';
    // A short wait for the write lock: a busy database costs one crawl row,
    // not a PHP worker held while a crawler's next request queues behind it.
    // Maintenance never runs from here (hit.php and the dashboard run it).
    $db = ta_db(TA_CRAWL_BUSY_MS);
    if ($db !== null) {
        ta_logCrawl($db, [
            'now' => time(),
            'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'),
            'ua' => (string) ($_SERVER['HTTP_USER_AGENT'] ?? ''),
            'path' => $path,
            'status' => $status,
            'method' => $method,
        ]);
    }
} catch (Throwable) {
    // Never let the crawler log be the reason anything fails.
}
