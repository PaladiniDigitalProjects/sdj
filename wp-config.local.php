<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

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

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '!mtN=8+Tyl:gJHMR%-U}CBm(]uLcw5fa6Mg}6lxu6eONTckv(Y9K.M!)=&$^*6]e' );
define( 'SECURE_AUTH_KEY',   '!tC^#un_8puxQw@%/Z/,a*[+xNd`llo6]+DwWXgCu?^[7WAsvr8GJ6,1Z;x99;;K' );
define( 'LOGGED_IN_KEY',     'u=FP.b*xnC[ol^.gAp4yxP3u2_~S=#Z~Cr5OmMbMj+?=^odUJX~!uL|u;!ScHojt' );
define( 'NONCE_KEY',         'y&Te6LH-l1?Bd4-:%2Y9q[tK b9fVElI 7qcE|`y^Q:`I*AjF4Pg>HRwTU4kb5vn' );
define( 'AUTH_SALT',         '|Vzlc$*4U2obFUO(2GMkLyTn/S&1430GEEVb;W$<ur>dNG[@#R:ZZ<mbT3]6Mh,d' );
define( 'SECURE_AUTH_SALT',  'P,3P1||=nc$J3bOT@hfJNOib(^QdLH5Un7;I,94b^AP}5<z7 )%c!o*e%3/H)mAF' );
define( 'LOGGED_IN_SALT',    '`w$&X@>XQW;CP8C-+b+?sIQi<*UY^O80@@jv9./#N[+?Zt;`1UcOMx-d0hGL!~V}' );
define( 'NONCE_SALT',        '`6FvjlT~Q+;eWhRWQi.EqW3D#]_CwApy;pG|@=`M|rp8+DR`YriO>1Q}ZJG{#)}T' );
define( 'WP_CACHE_KEY_SALT', '%l2>K;86&[$ucV5i+$9jWR3?#|RI}Ikb!d;dZAU$qItA19mn{}sAsu-*,p3RnhV&' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pork_';


/* Add any custom values between this line and the "stop editing" line. */



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
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}
// Disable display of errors and warnings
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
@include_once('/var/lib/sec/wp-settings-pre.php'); // Added by SiteGround WordPress management system
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system
