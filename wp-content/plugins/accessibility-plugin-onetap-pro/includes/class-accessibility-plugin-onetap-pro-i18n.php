<?php
/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://wponetap.com
 * @since      1.0.0
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/includes
 * @author     OneTap <support@wponetap.com>
 */
class Accessibility_Plugin_Onetap_Pro_I18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * Note: As of WordPress 4.6, load_plugin_textdomain() is no longer needed
	 * when Text Domain and Domain Path are defined in the plugin header.
	 * WordPress will automatically load translations from the /languages/ directory.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {
		// WordPress automatically loads translations when Text Domain and Domain Path
		// are defined in the plugin header (see accessibility-plugin-onetap-pro.php).
		// No manual loading is required.
	}
}
