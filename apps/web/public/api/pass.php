<?php
/**
 * Three Magi Press — pass status, redemption by link, and sign-out.
 *
 *   GET /api/pass.php?t=<token>   redeem an emailed access link, then 302 home
 *   GET /api/pass.php             report membership status as JSON
 *   GET /api/pass.php?logout=1    clear the cookies
 *
 * The emailed access link IS the account system: it is how a reader who paid
 * on a laptop reads on a phone. Anyone holding the link is a member, which is
 * the documented cost of having no passwords.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    fail(405, 'Method not allowed.');
}

// -- sign out ---------------------------------------------------------------

if (isset($_GET['logout'])) {
    clearPassCookies();
    respond(200, ['ok' => true, 'member' => false]);
}

// -- redeem an emailed link -------------------------------------------------

if (isset($_GET['t'])) {
    if (rateLimitExceeded('pass', 20)) {
        fail(429, 'Too many attempts. Please wait a few minutes.');
    }
    rateLimitRecord('pass');

    $payload = verifyToken((string) $_GET['t']);
    if ($payload === null) {
        // Not JSON: this is a link a human clicked, so send them somewhere
        // that explains itself.
        header('Location: /restore?error=invalid');
        http_response_code(302);
        exit;
    }
    sendPassCookie((string) $_GET['t'], (string) ($payload['t'] ?? 'supporter'));
    header('Location: /?welcome=1');
    http_response_code(302);
    exit;
}

// -- status -----------------------------------------------------------------

$pass = currentPass();
if ($pass === null) {
    respond(200, ['ok' => true, 'member' => false]);
}

respond(200, [
    'ok'      => true,
    'member'  => true,
    'tier'    => (string) ($pass['t'] ?? ''),
    'checked' => (int) ($pass['c'] ?? 0),
]);
