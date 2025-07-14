<?php
define( 'WP_CACHE', false ); // By SiteGround Optimizer

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'sjd2023' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Go6%t(b(PeJ$H*{%v%[{?{Lu,q/#(%[F@*?AO<[NCDcvUUp3_6}*u[Zh>[0gzH+F' );
define( 'SECURE_AUTH_KEY',  'Kw)_3R[k^.,X;ZxF_f/@3h`_Y:Ms  XO}&McTBu^h1RxX Ig5Idczj(w(+z-ZE5#' );
define( 'LOGGED_IN_KEY',    '-xe~dIFn^X[0]i}UYpOWrQ_%f9hmOOx@YC&(]M7&EC@(r#dA/>Oc|vuFkPE28p.B' );
define( 'NONCE_KEY',        'A&RLp[CmoHcG2j?j?!P_,+zZ37:x9/4B{L#zLue$ECU7E^P=j78L%1}_?<-JvDm?' );
define( 'AUTH_SALT',        'FKpmyL?m6}nE72Zlt>%v!ns</)>jU>,@oMxKR:2_{|xcPS.akV*R&3)DNzw;_13 ' );
define( 'SECURE_AUTH_SALT', '$a^KpFrQ#PouymNM;]YK#P2)%=*_,;?o[<Z0Gjeh1KCyduM&me+JYpH:s]3Nky$^' );
define( 'LOGGED_IN_SALT',   'u;yN87NbL>^m@;jV)`90OVHEJ~P U2a|p%bOBLe )6uG8}Ovb@S6/F5K8W%Gdngd' );
define( 'NONCE_SALT',       'OWC/y1t05WHh6HdJ-!=I`z@bT;|M7R`O,*}$6C9owy 6{O,;(zFx?s@v! @E~7F~' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pork_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define( 'SCRIPT_DEBUG', true );

define('WP_MEMORY_LIMIT', '256M');
define( 'WP_MAX_MEMORY_LIMIT', '256M' );


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

