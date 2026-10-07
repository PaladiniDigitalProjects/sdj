<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://wponetap.com
 * @since             1.0.0
 * @package           Accessibility_Plugin_Onetap_Pro
 *
 * @wordpress-plugin
 * Plugin Name:       OneTap Pro (for WordPress OneTap Pro - #1 Accessibility)
 * Plugin URI:        https://wponetap.com
 * Description:       OneTap is a multilingual WordPress plugin designed for seamless website accessibility. With a simple one-click installation, it ensures your site meets accessibility standards without any hassle. Built for performance, providing an inclusive, user-friendly web environment for all visitors.
 * Version:           6.15.1
 * Author:            OneTap
 * Author URI:        https://wponetap.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       accessibility-plugin-onetap-pro
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_VERSION', '6.15.1' );
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL', plugins_url( 'accessibility-plugin-onetap-pro/' ) );
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_PRODUCT_ID', 8437 );
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_PRODUCT_NAME', 'OneTap Pro Single' );
define( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_STORE_URL', 'https://wponetap.com' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-accessibility-plugin-onetap-pro-activator.php
 */
function accessibility_plugin_onetap_pro_activate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-accessibility-plugin-onetap-pro-activator.php';
	Accessibility_Plugin_Onetap_Pro_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-accessibility-plugin-onetap-pro-deactivator.php
 */
function accessibility_plugin_onetap_pro_deactivate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-accessibility-plugin-onetap-pro-deactivator.php';
	Accessibility_Plugin_Onetap_Pro_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'accessibility_plugin_onetap_pro_activate' );
register_deactivation_hook( __FILE__, 'accessibility_plugin_onetap_pro_deactivate' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-accessibility-plugin-onetap-pro.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_accessibility_plugin_onetap_pro() {

	$plugin = new Accessibility_Plugin_Onetap_Pro();
	$plugin->run();
}
run_accessibility_plugin_onetap_pro();

/**
 * Handles the plugin updater functionality.
 *
 * This method checks if the current user has the appropriate capabilities
 * or if the code is being run during a cron job for privileged users.
 * It retrieves the license key from the 'onetap_original_license' option
 * and initializes the plugin updater using the Easy Digital Downloads (EDD) updater class.
 *
 * @return void
 */
function initialize_plugin_updater() {
	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;

	// Check if the current user has the capability to manage options or if this is a cron job.
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return; // Exit if the user does not have permission and it's not a cron job.
	}

	// Retrieve the license key from the database.
	$license_key = get_option( 'onetap_original_license' );

	// Check if the license key is valid (not empty and is a string).
	if ( empty( $license_key ) || ! is_string( $license_key ) ) {
		$license_key = '';
	} else {
		$license_key = trim( $license_key );
	}

	// Setup the updater.
	$edd_updater = new Onetap_Plugin_Updater(
		ACCESSIBILITY_PLUGIN_ONETAP_PRO_STORE_URL,
		__FILE__,
		array(
			'version' => ACCESSIBILITY_PLUGIN_ONETAP_PRO_VERSION, // Current version number.
			'license' => $license_key, // License key retrieved from the database.
			'item_id' => ACCESSIBILITY_PLUGIN_ONETAP_PRO_PRODUCT_ID, // ID of the product.
			'author'  => 'OneTap', // Author of this plugin.
			'beta'    => false, // Indicates whether this is a beta version.
		)
	);
}
add_action( 'init', 'initialize_plugin_updater' );
