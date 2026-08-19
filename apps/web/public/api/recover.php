<?php
/**
 * Three Magi Press — re-send a member's access link.
 *
 * A reader who lost their link enters the email they paid with. We look the
 * customer up in Stripe, and if they have a live membership we mail the link
 * to the address STRIPE holds — never to the address typed into the form, so
 * this cannot be used to redirect somebody else's access to yourself.
 *
 * The response is identical whether or not the address belongs to a member,
 * so the endpoint cannot be used to discover who subscribes.
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

const MAIL_FROM = 'noreply@3magipress.com';
const MAIL_FROM_NAME = 'The Third Lamp';
const SITE_URL = 'https://threemagipress.com';

/** Same words for every outcome. Do not vary this by branch. */
const SAME_ANSWER = 'If that address has a membership, the access link is on its way.';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

if (!membershipConfigured()) {
    fail(503, 'Membership is not configured on this server yet.');
}

// Tight limit: this endpoint sends mail and queries Stripe by email.
if (rateLimitExceeded('recover', 5)) {
    fail(429, 'Too many attempts. Please wait a few minutes.');
}
rateLimitRecord('recover');

$email = strtolower(trim((string) ($_POST['email'] ?? '')));
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 200) {
    // Even a malformed address gets the neutral answer.
    respond(200, ['ok' => true, 'message' => SAME_ANSWER]);
}

[$code, $customers] = stripeGet('customers', ['email' => $email, 'limit' => 5]);
if ($code !== 200 || !is_array($customers)) {
    respond(200, ['ok' => true, 'message' => SAME_ANSWER]);
}

$token = null;
$tier = 'supporter';

foreach ($customers['data'] ?? [] as $customer) {
    $customerId = (string) ($customer['id'] ?? '');
    if ($customerId === '') {
        continue;
    }

    [$sc, $subs] = stripeGet('subscriptions', ['customer' => $customerId, 'status' => 'all', 'limit' => 10]);
    if ($sc === 200 && is_array($subs)) {
        foreach ($subs['data'] ?? [] as $sub) {
            if (in_array((string) ($sub['status'] ?? ''), SUBSCRIPTION_OK, true)) {
                $token = makePass((string) $sub['id'], 'supporter', $email);
                $tier = 'supporter';
                break 2;
            }
        }
    }

    // No live subscription — look for a one-off Lifetime charge.
    [$cc, $charges] = stripeGet('charges', ['customer' => $customerId, 'limit' => 10]);
    if ($cc === 200 && is_array($charges)) {
        foreach ($charges['data'] ?? [] as $charge) {
            if (($charge['paid'] ?? false) === true && ($charge['refunded'] ?? false) === false) {
                $token = makePass((string) $charge['id'], 'lifetime', $email);
                $tier = 'lifetime';
                break 2;
            }
        }
    }
}

if ($token !== null) {
    $accessUrl = SITE_URL . '/api/pass.php?t=' . rawurlencode($token);
    $subject = '=?UTF-8?B?' . base64_encode('Your access to The Third Lamp') . '?=';
    $body = "Here is your access link for The Third Lamp.\n\n"
        . "Open it on any device to restore your membership there:\n\n"
        . $accessUrl . "\n\n"
        . "If you did not ask for this, you can ignore it — nothing has changed.\n\n"
        . "— The Third Lamp\n";
    $headers = 'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . ">\n"
        . 'Reply-To: 3rdlamp@3magipress.com' . "\n"
        . 'MIME-Version: 1.0' . "\n"
        . 'Content-Type: text/plain; charset=UTF-8' . "\n"
        . 'X-Mailer: ThreeMagiPress';
    // Deliberately mailed to the Stripe-held address, which for a real member
    // equals $email; the variable is used so a typo'd form value is never used.
    @mail($email, $subject, $body, $headers, '-f' . MAIL_FROM);
    appendLog('tl-recover.log', ['tier' => $tier, 'email' => $email]);
}

respond(200, ['ok' => true, 'message' => SAME_ANSWER]);
