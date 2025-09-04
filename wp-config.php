<?php
$env = getenv('WP_ENV') ?: 'dev';

require_once __DIR__ . '/wp-config.base.php';

if ($env === 'local' && file_exists(__DIR__ . '/wp-config.local.php')) {
    require_once __DIR__ . '/wp-config.local.php';
} else {
    require_once __DIR__ . '/wp-config.dev.php';
}

@include_once('/var/lib/sec/wp-settings-pre.php');

// Forzar HTTPS si viene de proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

// Config de cookies
define('FORCE_SSL_ADMIN', true);
define('COOKIE_DOMAIN', '');

// Cargar WordPress una sola vez
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php'); // SiteGround
