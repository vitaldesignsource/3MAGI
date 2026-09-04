<?php
/**
 * Three Magi Press — draft preview for the editor.
 *
 * Visit /api/preview.php?key=<PREVIEW_KEY> once per browser to read essays
 * still marked comingSoon. Replaces the PocketBase admin login that died with
 * the Horizons project and left the owner locked out of their own drafts.
 *
 * The key lives in the secrets file above the document root, never in git.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    fail(405, 'Method not allowed.');
}

if (isset($_GET['logout'])) {
    setcookie(PREVIEW_COOKIE, '', ['expires' => time() - 3600, 'path' => '/', 'secure' => !isLocalRequest(), 'httponly' => true, 'samesite' => 'Lax']);
    respond(200, ['ok' => true, 'preview' => false]);
}

$expected = secret('preview_key');
if ($expected === '') {
    fail(503, 'Preview is not configured on this server.');
}

if (rateLimitExceeded('preview', 10)) {
    fail(429, 'Too many attempts. Please wait a few minutes.');
}
rateLimitRecord('preview');

$given = (string) ($_GET['key'] ?? '');
if ($given === '' || !hash_equals($expected, $given)) {
    fail(403, 'Not permitted.');
}

// Signed like the pass, so essay.php can verify it with the same machinery.
$token = signPayload(['v' => 1, 'p' => 1, 'c' => time()], 'preview');
setcookie(PREVIEW_COOKIE, $token, [
    'expires'  => time() + 365 * 86400,
    'path'     => '/',
    'secure'   => !isLocalRequest(),
    'httponly' => true,
    'samesite' => 'Lax',
]);

respond(200, ['ok' => true, 'preview' => true]);
