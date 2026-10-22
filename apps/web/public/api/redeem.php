<?php
/**
 * Three Magi Press — redeem a completed Stripe checkout.
 *
 * Stripe redirects here after payment with ?session_id=cs_…. We ask Stripe
 * whether that session is genuinely paid, and if so issue the pass cookie and
 * email the buyer a permanent access link — which is how they get back in on
 * another device, since there are no accounts.
 *
 * A session id can be redeemed once. Otherwise anyone who saw a buyer's
 * redirect URL (over someone's shoulder, in a screenshot, in a shared browser
 * history) could mint themselves a pass from it.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

const MAIL_FROM = 'noreply@3magipress.com';
const MAIL_FROM_NAME = 'The Third Lamp';
const SITE_URL = 'https://threemagipress.com';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    fail(405, 'Method not allowed.');
}

if (!membershipConfigured()) {
    fail(503, 'Membership is not configured on this server yet.');
}

if (rateLimitExceeded('redeem', 10)) {
    fail(429, 'Too many attempts. Please wait a few minutes.');
}

$sessionId = (string) ($_GET['session_id'] ?? '');
if (!validSessionId($sessionId)) {
    fail(400, 'That payment reference is not valid.');
}

rateLimitRecord('redeem');

// -- single use -------------------------------------------------------------

$root = $_SERVER['DOCUMENT_ROOT'] ?? '';
$redeemedFile = ($root !== '' ? dirname($root) : dirname(__DIR__, 2)) . '/tl-redeemed.log';
// Session ids are recorded as one SHA-256 per line, and matched whole-line.
// Storing them raw and testing with str_contains() would make this endpoint a
// prefix oracle: an attacker submitting a growing prefix could read a real
// buyer's session id out of the log one character at a time, and an id that
// merely appeared inside another line would falsely read as already used.
$sessionHash = hash('sha256', $sessionId);
$seen = @file($redeemedFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if (is_array($seen) && in_array($sessionHash, $seen, true)) {
    fail(409, 'That payment link has already been used. Use "Restore access" to have your link re-sent.', 'already_redeemed');
}

// -- ask Stripe -------------------------------------------------------------

[$code, $session] = stripeGet('checkout/sessions/' . urlencode($sessionId), [
    'expand' => ['subscription', 'payment_intent'],
]);

if ($code === 0) {
    fail(503, 'We could not reach Stripe to confirm your payment. Your card has not been charged twice — please reload in a moment.');
}
if ($code !== 200 || !is_array($session)) {
    fail(404, 'That payment could not be found.');
}
if ((string) ($session['payment_status'] ?? '') !== 'paid') {
    fail(402, 'That payment has not completed.');
}

$email = (string) ($session['customer_details']['email'] ?? $session['customer_email'] ?? '');

// A subscription session carries a subscription object; a one-off carries a
// payment intent whose latest_charge is what we re-check later.
$subscription = $session['subscription'] ?? null;
if (is_array($subscription) && isset($subscription['id'])) {
    $tier = 'supporter';
    $ref = (string) $subscription['id'];
} else {
    $tier = 'lifetime';
    $intent = $session['payment_intent'] ?? null;
    // The pass must reference a CHARGE, because that is what the periodic
    // re-check queries. Storing a pi_… here would make every later re-check
    // 404 and revoke a legitimate member.
    $ref = '';
    if (is_array($intent) && !empty($intent['latest_charge'])) {
        $charge = $intent['latest_charge'];
        $ref = is_array($charge) ? (string) ($charge['id'] ?? '') : (string) $charge;
    }
    if (!str_starts_with($ref, 'ch_')) {
        // Not expanded, or an unexpected shape — ask Stripe directly rather
        // than guessing.
        $intentId = is_array($intent) ? (string) ($intent['id'] ?? '') : (string) ($intent ?? '');
        if ($intentId !== '') {
            [$ic, $ib] = stripeGet('payment_intents/' . urlencode($intentId));
            if ($ic === 200 && is_array($ib) && !empty($ib['latest_charge'])) {
                $lc = $ib['latest_charge'];
                $ref = is_array($lc) ? (string) ($lc['id'] ?? '') : (string) $lc;
            }
        }
    }
    if (!str_starts_with($ref, 'ch_')) {
        fail(500, 'That payment could not be matched to a membership. Please write to 3rdlamp@3magipress.com and we will sort it out.');
    }
}

if ($ref === '') {
    fail(500, 'That payment could not be matched to a membership.');
}

// -- issue the pass ---------------------------------------------------------

$token = makePass($ref, $tier, $email);
sendPassCookie($token, $tier);

@file_put_contents($redeemedFile, $sessionHash . "\n", FILE_APPEND | LOCK_EX);

// The only local record of who paid. If Stripe ever closes the account this
// file is the difference between "email my members" and "I have no idea who
// they were".
appendLog('tl-members.log', [
    'tier'  => $tier,
    'ref'   => $ref,
    'email' => $email,
]);

// -- email the permanent access link ---------------------------------------

$accessUrl = SITE_URL . '/api/pass.php?t=' . rawurlencode($token);
$mailed = false;

if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $subject = '=?UTF-8?B?' . base64_encode('Your access to The Third Lamp') . '?=';
    $body = "Thank you for supporting The Third Lamp.\n\n"
        . "This link restores your access on any device. Keep it somewhere safe —\n"
        . "it is how you get back in if you clear your cookies or read on a phone:\n\n"
        . $accessUrl . "\n\n"
        . "You can manage or cancel your membership from the receipt Stripe sent you.\n\n"
        . "— The Third Lamp\n";
    $headers = 'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . ">\n"
        . 'Reply-To: 3rdlamp@3magipress.com' . "\n"
        . 'MIME-Version: 1.0' . "\n"
        . 'Content-Type: text/plain; charset=UTF-8' . "\n"
        . 'X-Mailer: ThreeMagiPress';
    $mailed = @mail($email, $subject, $body, $headers, '-f' . MAIL_FROM);
}

respond(200, [
    'ok'      => true,
    'tier'    => $tier,
    'emailed' => $mailed,
    'email'   => $email,
    // Shown on the welcome page so the reader can bookmark it immediately,
    // rather than depending on an email that may be slow or spam-foldered.
    'access'  => $accessUrl,
]);
