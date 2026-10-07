<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://wponetap.com
 * @since      1.0.0
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/includes
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/includes
 * @author     OneTap <support@wponetap.com>
 */
class Accessibility_Plugin_Onetap_Pro {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Accessibility_Plugin_Onetap_Pro_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'ACCESSIBILITY_PLUGIN_ONETAP_PRO_VERSION' ) ) {
			$this->version = ACCESSIBILITY_PLUGIN_ONETAP_PRO_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'accessibility-plugin-onetap-pro';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_alt_text_admin_hooks();
		$this->define_settings_options();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Accessibility_Plugin_Onetap_Pro_Loader. Orchestrates the hooks of the plugin.
	 * - Accessibility_Plugin_Onetap_Pro_I18n. Defines internationalization functionality.
	 * - Accessibility_Plugin_Onetap_Pro_Admin. Defines all hooks for the admin area.
	 * - Onetap_Pro_Accessibility_Settings_Options.
	 * - Accessibility_Pro_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-accessibility-plugin-onetap-pro-loader.php';

		/**
		 * Load the helper functions for template handling (e.g., apop_load_template()).
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/helpers-template.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'includes/class-accessibility-plugin-onetap-pro-i18n.php';

		/**
		 * This allows access to configuration settings.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'inc/class-onetap-pro-config.php';

		/**
		 * The class responsible for call plugin updater.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'inc/plugin-updater/Onetap_Plugin_Updater.php';

		/**
		 * The class responsible for call Settings Manager.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-onetap-pro-accessibility-settings-manager.php';

		/**
		 * The class responsible for call Settings Option.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-onetap-pro-accessibility-settings-options.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-accessibility-plugin-onetap-pro-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area alt text.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'admin/class-onetap-alt-text.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( __DIR__ ) . 'public/class-accessibility-pro-public.php';

		$this->loader = new Accessibility_Plugin_Onetap_Pro_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Note: As of WordPress 4.6, manual loading of text domain is no longer needed
	 * when Text Domain and Domain Path are defined in the plugin header.
	 * WordPress will automatically load translations from the /languages/ directory.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {
		// WordPress automatically loads translations when Text Domain and Domain Path
		// are defined in the plugin header (see accessibility-plugin-onetap-pro.php).
		// No manual hook registration is required.
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Accessibility_Plugin_Onetap_Pro_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_filter( 'plugin_row_meta', $plugin_admin, 'add_row_meta', 10, 2 );
		$this->loader->add_action( 'wp_ajax_apop_activate_license', $plugin_admin, 'handle_ajax_activate_license' );
		$this->loader->add_action( 'wp_ajax_nopriv_apop_activate_license', $plugin_admin, 'handle_ajax_activate_license' );
		$this->loader->add_action( 'wp_ajax_apop_deactivate_license', $plugin_admin, 'handle_ajax_deactivate_license' );
		$this->loader->add_action( 'wp_ajax_nopriv_apop_deactivate_license', $plugin_admin, 'handle_ajax_deactivate_license' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'save_localized_module_labels' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'register_settings_for_accessibility_status' );
		$this->loader->add_action( 'wp_dashboard_setup', $plugin_admin, 'register_missing_alt_text_dashboard_widget' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_dashboard_missing_alt_widget_styles' );
	}

	/**
	 * Register all hooks related to alt text management functionality in the admin area.
	 *
	 * Sets up AJAX handlers for managing image alt text, including saving and updating
	 * alt text for images to improve accessibility compliance.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_alt_text_admin_hooks() {

		// Initialize the alt text management class with plugin details.
		$plugin_admin = new Onetap_Alt_Text( $this->get_plugin_name(), $this->get_version() );

		// Register AJAX action for saving alt text.
		$this->loader->add_action( 'wp_ajax_apop_save_alt_text', $plugin_admin, 'handle_ajax_save_alt_text' );
	}

	/**
	 * Register all of setting options.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_settings_options() {

		$plugin_admin = new Onetap_Pro_Accessibility_Settings_Options( $this->get_plugin_name(), $this->get_version(), new Onetap_Pro_Accessibility_Settings_Manager() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'admin_init' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'register_admin_menu_page' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'hide_notifications_for_onetap_page', 99999 );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'toggle_license' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Accessibility_Pro_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
		$this->loader->add_action( 'wp_footer', $plugin_public, 'render_accessibility_template' );
		$this->loader->add_filter( 'body_class', $plugin_public, 'add_custom_body_class' );
		$this->loader->add_action( 'init', $plugin_public, 'register_shortcodes' );

		// Exclude CSS and JS from WP Rocket optimization.
		$this->loader->add_filter( 'rocket_exclude_css', $plugin_public, 'exclude_css_from_wp_rocket' );
		$this->loader->add_filter( 'rocket_exclude_js', $plugin_public, 'exclude_js_from_wp_rocket' );
		$this->loader->add_filter( 'rocket_exclude_defer_js', $plugin_public, 'exclude_js_from_wp_rocket_defer' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Accessibility_Plugin_Onetap_Pro_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}
}
