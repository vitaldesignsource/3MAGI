<?php
/**
 * Write a THROWAWAY secrets file for local runs of the dashboard.
 *
 *   php make-secrets.php /tmp/somewhere/tl-secrets.php [email]
 *
 * The email defaults to test-owner@example.test. The password is taken from
 * TL_DEV_PASSWORD, or generated and printed once to the terminal. Only its
 * bcrypt hash is written. Never point this at the real tl-secrets.php and
 * never use the owner's real credentials here: production secrets are made by
 * hand on the server (docs/analytics.md).
 */

declare(strict_types=1);

$out = $argv[1] ?? '';
if ($out === '' || str_contains($out, 'public_html') || str_contains($out, '/public/')) {
    fwrite(STDERR, "usage: php make-secrets.php <file outside any web root> [email]\n");
    exit(2);
}
$email = $argv[2] ?? 'test-owner@example.test';
$env = getenv('TL_DEV_PASSWORD');
$password = is_string($env) && $env !== '' ? $env : 'dev-' . bin2hex(random_bytes(9));
$values = [
    'cookie_secret' => bin2hex(random_bytes(32)),
    'admin_email' => $email,
    'admin_password_hash' => password_hash($password, PASSWORD_DEFAULT),
];
@mkdir(dirname($out), 0700, true);
file_put_contents($out, "<?php\n// Throwaway local secrets (make-secrets.php). Not for production.\nreturn " . var_export($values, true) . ";\n");
chmod($out, 0600);
echo "wrote $out\n";
echo "sign in at /admin with:\n  email:    $email\n";
echo $env !== false && $env !== '' ? "  password: (TL_DEV_PASSWORD)\n" : "  password: $password\n";
