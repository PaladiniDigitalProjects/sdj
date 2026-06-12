<?php
define( 'WP_CACHE', false ); // By Speed Optimizer by SiteGround




// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'wordpress' );

/** Database hostname */
define( 'DB_HOST', 'database' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );


/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pork_';


// Configuración de cookies
define( 'FORCE_SSL_ADMIN', true );

// Google Maps API Key
define( 'GOOGLE_MAPS_API_KEY', 'AIzaSyDacDNyKQJywprc8azrpouCDgMonQSlbmY' );




// Cargar WordPress una sola vez
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php'); // SiteGround
