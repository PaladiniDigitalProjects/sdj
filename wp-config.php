<?php
define( 'WP_CACHE', false ); // By Speed Optimizer by SiteGround

$env = getenv('WP_ENV') ?: 'dev';

require_once __DIR__ . '/wp-config.base.php';

if ($env === 'local' && file_exists(__DIR__ . '/wp-config.local.php')) {
    require_once __DIR__ . '/wp-config.local.php';
} else {
    require_once __DIR__ . '/wp-config.dev.php';
}

@include_once('/var/lib/sec/wp-settings-pre.php');
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php');
