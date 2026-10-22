<?php
declare(strict_types=1);

/**
 * Unit tests for lifetimeChargeValid() — the predicate that decides whether a
 * Stripe Charge earns a permanent Lifetime pass.
 *
 * This exists because an adversarial review found the original version granted
 * lifetime membership for ANY paid charge on a customer, including the monthly
 * invoice charges a $5 subscriber generates. Cancel after one month, hit
 * "Restore access", and Stripe's own invoice charge minted a pass that never
 * expired. These cases pin that shut.
 */

$secretsFile = getenv('TL_SECRETS_FILE');
require $secretsFile !== false ? $secretsFile : __DIR__ . '/make-secrets.php';
require dirname(__DIR__) . '/../public/api/_lib.php';

$passed = 0;
$failed = 0;
function check(string $name, bool $got, bool $want): void
{
    global $passed, $failed;
    if ($got === $want) {
        $passed++;
        echo "  ok   $name\n";
    } else {
        $failed++;
        printf("  FAIL %s (got %s, expected %s)\n", $name, $got ? 'true' : 'false', $want ? 'true' : 'false');
    }
}

$LIFETIME = ['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'amount' => 33300, 'invoice' => null];

echo "\n# lifetimeChargeValid — issuing a new pass\n";
check('genuine one-off Lifetime charge grants it', lifetimeChargeValid($LIFETIME), true);
check('THE EXPLOIT: subscription invoice charge does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'amount' => 500, 'invoice' => 'in_123']), false);
check('a large subscription charge still does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'amount' => 99900, 'invoice' => 'in_456']), false);
check('one-off below the Lifetime price does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'amount' => 2000, 'invoice' => null]), false);
check('unpaid charge does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => false, 'refunded' => false, 'amount' => 33300]), false);
check('failed charge does NOT', lifetimeChargeValid(['status' => 'failed', 'paid' => true, 'refunded' => false, 'amount' => 33300]), false);
check('pending charge does NOT', lifetimeChargeValid(['status' => 'pending', 'paid' => true, 'refunded' => false, 'amount' => 33300]), false);
check('refunded charge does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => true, 'amount' => 33300]), false);
check('partially refunded charge does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'amount_refunded' => 100, 'amount' => 33300]), false);
check('disputed charge does NOT', lifetimeChargeValid(['status' => 'succeeded', 'paid' => true, 'refunded' => false, 'disputed' => true, 'amount' => 33300]), false);
check('empty array does NOT', lifetimeChargeValid([]), false);

echo "\n# lifetimeChargeValid — periodic re-check (requireOneOff = false)\n";
check('settled Lifetime charge stays valid', lifetimeChargeValid($LIFETIME, false), true);
check('later refunded → revoked', lifetimeChargeValid(array_merge($LIFETIME, ['refunded' => true]), false), false);
check('later partially refunded → revoked', lifetimeChargeValid(array_merge($LIFETIME, ['amount_refunded' => 1]), false), false);
check('later charged back → revoked', lifetimeChargeValid(array_merge($LIFETIME, ['disputed' => true]), false), false);

echo "\n# lifetimeMinAmount reads the secrets file\n";
check('configured floor is honoured', lifetimeMinAmount() > 0, true);

printf("\n%s\npassed %d, failed %d\n", str_repeat('=', 52), $passed, $failed);
exit($failed > 0 ? 1 : 0);
