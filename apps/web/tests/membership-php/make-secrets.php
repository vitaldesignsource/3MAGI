<?php
// Test secrets. Never used in production — the real file lives above the
// document root on the server and is not in git.
return [
    'stripe_key'    => 'rk_test_fake_for_local_tests',
    'cookie_secret' => 'test-cookie-secret-0123456789abcdef0123456789abcdef',
    'preview_key'   => 'test-preview-key',
    // Lifetime Payment Link price in the smallest currency unit ($333.00).
    'lifetime_min_amount' => 33300,
];
