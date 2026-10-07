<?php
/**
 * Plugin Name: WPForms Multilingual
 * Plugin URI: https://wpml.org/documentation/wpml-core-and-add-on-plugins/wpforms-multilingual/?utm_source=plugin&utm_medium=gui&utm_campaign=wpforms
 * Description: Add multilingual support for WPForms | <a href="https://wpml.org/documentation/wpml-core-and-add-on-plugins/wpforms-multilingual/?utm_source=plugin&utm_medium=gui&utm_campaign=wpforms">Documentation</a>
 * Author: OnTheGoSystems
 * Author URI: https://www.onthegosystems.com/
 * Version: 5.1.0
 * Plugin Slug: wpml-wpforms
 * Text Domain: wpml-wpforms
 * Domain Path: /languages
 */

define( 'WPML_WP_FORMS_VERSION', '5.1.0' );
define( 'WPML_WP_FORMS_FILE', __FILE__ );
define( 'WPML_WP_FORMS_PATH', dirname( WPML_WP_FORMS_FILE ) );
define( 'WPML_WP_FORMS_VENDOR_PATH', WPML_WP_FORMS_PATH . '/vendor' );

function wpml_wpforms_load_textdomain() {
	load_plugin_textdomain(
		'wpml-wpforms',
		false,
		dirname( plugin_basename( WPML_WP_FORMS_FILE ) ) . '/languages'
	);

	wpml_wpforms_load_shared_package_textdomain();
}

function wpml_wpforms_load_shared_package_textdomain() {
	$locale = determine_locale();
	$file   = 'wpml-wpforms-' . $locale . '.mo';

	$mofile = WP_LANG_DIR . '/plugins/' . $file;
	if ( ! is_readable( $mofile ) ) {
		$mofile = WPML_WP_FORMS_PATH . '/languages/' . $file;
	}

	load_textdomain( 'wpml-forms', $mofile, $locale );
}

add_action( 'init', 'wpml_wpforms_load_textdomain' );

require_once WPML_WP_FORMS_VENDOR_PATH . '/wpml/forms/loader.php';
wpml_forms_initialize(
	WPML_WP_FORMS_VENDOR_PATH . '/wpml/forms',
	untrailingslashit( plugin_dir_url( WPML_WP_FORMS_FILE ) ) . '/vendor/wpml/forms'
);

function wpml_wpforms_activation_hook() {
	update_option( wpml_forms_bulk_registration_option_name( WPML_WP_FORMS_FILE ), true );
}

register_activation_hook( WPML_WP_FORMS_FILE, 'wpml_wpforms_activation_hook' );

add_action( 'plugins_loaded', function () {

	$hasWPMLRequirements = function () {
		if ( ! class_exists( WPML_Core_Version_Check::class ) ) {
			require_once WPML_WP_FORMS_VENDOR_PATH . '/wpml-shared/wpml-lib-dependencies/src/dependencies/class-wpml-core-version-check.php';
		}

		return WPML_Core_Version_Check::is_ok( WPML_WP_FORMS_PATH . '/wpml-dependencies.json' );
	};

	if ( $hasWPMLRequirements() ) {
		add_action( 'wpforms_loaded', function () {
			require_once WPML_WP_FORMS_VENDOR_PATH . '/autoload.php';
			\WPML\Forms\WPForms\App::init();
		} );
	}
}, 9 );
