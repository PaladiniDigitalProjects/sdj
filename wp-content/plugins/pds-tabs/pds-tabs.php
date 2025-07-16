<?php
/**
 * Plugin Name:       PDS Tabs
 * Description:       Extension de GutenbergHub Tabs plugin. Agrega funcionalidades adicionales a gutenberghub tabs
 * Requires at least: 6.1
 * Tested up to:      6.2
 * Requires PHP:      7.3
 * Version:           1.0.0
 * Author:            Paladini Digital Solutions
 * Author URI:        https://paladinidigital.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pds-tabs
 *
 * @package           PDS_Tabs
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants for paths and URLs for consistent use.
if ( ! defined( 'PDS_TABS_DIR_PATH' ) ) {
	define( 'PDS_TABS_DIR_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'PDS_TABS_URL' ) ) {
	define( 'PDS_TABS_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'PDS_TABS_FILE' ) ) {
	define( 'PDS_TABS_FILE', __FILE__ );
}


/**
 * Check for the dependency (GutenbergHub Tabs) and load extension functionality.
 */
add_action( 'plugins_loaded', function () {
	// Check if the main GutenbergHub Tabs plugin's constant is defined.
	// This ensures GutenbergHub Tabs is active before PDS Tabs tries to extend it.
	if ( ! defined( 'GUTENBERGHUB_TABS_DIR_PATH' ) ) {
		// If dependency is missing, show an admin notice.
		add_action( 'admin_notices', function () {
			echo '<div class="notice notice-error"><p><strong>PDS Tabs</strong> requires the <strong>GutenbergHub Tabs</strong> plugin to be installed and active.</p></div>';
		} );
		return; // Stop execution if the dependency is not met.
	}

	// If the dependency is met, load the extension's core functionality.
	require_once PDS_TABS_DIR_PATH . 'includes/init.php';
} );