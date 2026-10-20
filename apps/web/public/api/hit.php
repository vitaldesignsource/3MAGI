<?php
/**
 * Three Magi Press — the analytics beacon receiver.
 *
 * src/lib/analytics.js sends one small JSON event per request with
 * navigator.sendBeacon (Content-Type text/plain, so no CORS preflight). The
 * answer is ALWAYS "204 No Content" with no body, sent before any work is
 * done: a visitor's page never waits on analytics, and an abuser is never
 * told why an event was dropped. The event contract is documented in
 * docs/analytics.md.
 *
 * Drops silently: anything but POST, bodies over 8 KB, a foreign or missing
 * Origin/Referer, more than 240 events per IP per 10 minutes, malformed JSON,
 * unknown event types, and every storage problem.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

header('X-Robots-Tag: noindex, nofollow');
http_response_code(204);
// Out the door first. After this nothing can change what the browser got.
ignore_user_abort(true);
while (ob_get_level() > 0) {
    @ob_end_flush();
}
@flush();

try {
    // Loaded only now, so even a broken deploy of it cannot touch the 204.
    require_once __DIR__ . '/_analytics.php';
    ta_finishRequest();
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        exit;
    }
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > TA_MAX_BODY) {
        exit;
    }
    $body = file_get_contents('php://input', false, null, 0, TA_MAX_BODY + 1);
    if (!is_string($body) || $body === '' || strlen($body) > TA_MAX_BODY) {
        exit;
    }
    if (!ta_beaconOriginOk($_SERVER)) {
        exit;
    }
    if (rateLimitExceeded('analytics-hit', ta_hitLimit())) {
        exit;
    }
    rateLimitRecord('analytics-hit');

    $event = json_decode($body, true, 6);
    if (!is_array($event)) {
        exit;
    }
    $db = ta_db(1500);
    if ($db === null) {
        exit;
    }
    $now = time();
    $ctx = ta_requestContext(ta_adminFromCookie($now) !== null);
    ta_record($db, $event, $ctx);
    if (random_int(1, TA_PRUNE_ODDS) === 1) {
        ta_maintain($db, $now);
    }
} catch (Throwable) {
    // Silent by design.
}
exit;
