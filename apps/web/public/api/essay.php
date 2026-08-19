<?php
/**
 * Three Magi Press — the gate.
 *
 * Serves the body of a gated essay, but only to a reader holding a valid pass.
 * Gated essay text is NOT bundled into the site's JavaScript: the build writes
 * it above the document root, where Apache cannot serve it at any URL, and
 * this file is the only way to read it.
 *
 * That is the difference between this and the paywall it replaces, which
 * shipped the full text of "Members Only" essays to every visitor inside a
 * public .js file and merely declined to render it.
 *
 * Responses:
 *   200 { ok, slug, content }        — here is the essay
 *   401 { code: "preview_required" } — unpublished draft, no preview cookie
 *   402 { code: "members_only" }     — real essay, reader is not a member
 *   404 { code: "not_found" }        — no such gated essay
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    fail(405, 'Method not allowed.');
}

$slug = (string) ($_GET['slug'] ?? '');
if (!validSlug($slug)) {
    fail(400, 'Unknown essay.', 'not_found');
}

// A slug that passed validSlug() cannot contain a slash or a dot, so it cannot
// traverse out of the directory. basename() is belt-and-braces.
$file = privateEssayDir() . '/' . basename($slug) . '.json';
if (!is_file($file)) {
    fail(404, 'Unknown essay.', 'not_found');
}

$raw = @file_get_contents($file);
if ($raw === false) {
    fail(500, 'The essay could not be retrieved.');
}
$record = json_decode($raw, true);
if (!is_array($record)) {
    fail(500, 'The essay could not be retrieved.');
}

$isDraft = !empty($record['comingSoon']);
$content = $record['content'] ?? [];

// -- drafts: owner-only, never a paying-reader question ---------------------

if ($isDraft) {
    $token = (string) ($_COOKIE[PREVIEW_COOKIE] ?? '');
    $payload = verifyToken($token);
    if ($payload === null || ($payload['p'] ?? '') !== 1) {
        fail(401, 'This essay is not published yet.', 'preview_required');
    }
    respond(200, ['ok' => true, 'slug' => $slug, 'content' => $content]);
}

// -- published-but-gated: needs a valid, still-current pass -----------------

$pass = currentPass();
if ($pass === null) {
    fail(402, 'This essay is reserved for members.', 'members_only');
}

$tier = (string) ($pass['t'] ?? '');
$ref = (string) ($pass['k'] ?? '');
$checked = (int) ($pass['c'] ?? 0);
$age = time() - $checked;
$window = $tier === 'lifetime' ? RECHECK_LIFETIME : RECHECK_SUBSCRIPTION;

if ($age > $window) {
    // The pass is stale. Ask Stripe whether this reader is still a member.
    [$code, $body] = $tier === 'lifetime'
        ? stripeGet('charges/' . urlencode($ref))
        : stripeGet('subscriptions/' . urlencode($ref));

    if ($code === 0) {
        // Stripe unreachable. Serve the essay rather than lock out a paying
        // member over an outage — but do not refresh the timestamp, and stop
        // extending indefinitely.
        if ($age > FAIL_OPEN_LIMIT) {
            fail(402, 'Your membership could not be confirmed. Please try again shortly.', 'members_only');
        }
    } elseif ($code === 200 && is_array($body)) {
        $stillValid = $tier === 'lifetime'
            ? (($body['refunded'] ?? false) === false && ($body['status'] ?? '') !== 'failed')
            : in_array((string) ($body['status'] ?? ''), SUBSCRIPTION_OK, true);

        if (!$stillValid) {
            clearPassCookies();
            fail(402, 'This essay is reserved for members.', 'members_only');
        }
        // Confirmed. Re-issue the pass with a fresh timestamp so the next
        // read is cheap.
        sendPassCookie(makePass($ref, $tier, '', time()), $tier);
    } else {
        // A definitive "no" from Stripe (404 = object gone, 401 = bad key).
        // Treat a missing object as revoked; treat auth failure as an outage.
        if ($code === 404) {
            clearPassCookies();
            fail(402, 'This essay is reserved for members.', 'members_only');
        }
        if ($age > FAIL_OPEN_LIMIT) {
            fail(402, 'Your membership could not be confirmed. Please try again shortly.', 'members_only');
        }
    }
}

respond(200, ['ok' => true, 'slug' => $slug, 'content' => $content]);
