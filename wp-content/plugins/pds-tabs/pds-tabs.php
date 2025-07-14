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

// Check if the main GutenbergHub Tabs plugin is active.
add_action( 'plugins_loaded', function () {
	if ( ! defined( 'GUTENBERGHUB_TABS_DIR_PATH' ) ) {
		// Show admin notice if the dependency is missing.
		add_action( 'admin_notices', function () {
			echo '<div class="notice notice-error"><p><strong>PDS Tabs</strong> requires the <strong>GutenbergHub Tabs</strong> plugin to be installed and active.</p></div>';
		} );
		return;
	}

	// Load PDS Tabs extension functionality.
	require_once plugin_dir_path( __FILE__ ) . 'includes/init.php';
} );
