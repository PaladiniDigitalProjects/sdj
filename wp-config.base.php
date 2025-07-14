<?php
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );



define( 'AUTH_KEY',          '!mtN=8+Tyl:gJHMR%-U}CBm(]uLcw5fa6Mg}6lxu6eONTckv(Y9K.M!)=&$^*6]e' );
define( 'SECURE_AUTH_KEY',   '!tC^#un_8puxQw@%/Z/,a*[+xNd`llo6]+DwWXgCu?^[7WAsvr8GJ6,1Z;x99;;K' );
define( 'LOGGED_IN_KEY',     'u=FP.b*xnC[ol^.gAp4yxP3u2_~S=#Z~Cr5OmMbMj+?=^odUJX~!uL|u;!ScHojt' );
define( 'NONCE_KEY',         'y&Te6LH-l1?Bd4-:%2Y9q[tK b9fVElI 7qcE|`y^Q:`I*AjF4Pg>HRwTU4kb5vn' );
define( 'AUTH_SALT',         '|Vzlc$*4U2obFUO(2GMkLyTn/S&1430GEEVb;W$<ur>dNG[@#R:ZZ<mbT3]6Mh,d' );
define( 'SECURE_AUTH_SALT',  'P,3P1||=nc$J3bOT@hfJNOib(^QdLH5Un7;I,94b^AP}5<z7 )%c!o*e%3/H)mAF' );
define( 'LOGGED_IN_SALT',    '`w$&X@>XQW;CP8C-+b+?sIQi<*UY^O80@@jv9./#N[+?Zt;`1UcOMx-d0hGL!~V}' );
define( 'NONCE_SALT',        '`6FvjlT~Q+;eWhRWQi.EqW3D#]_CwApy;pG|@=`M|rp8+DR`YriO>1Q}ZJG{#)}T' );
define( 'WP_CACHE_KEY_SALT', '%l2>K;86&[$ucV5i+$9jWR3?#|RI}Ikb!d;dZAU$qItA19mn{}sAsu-*,p3RnhV&' );

define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
