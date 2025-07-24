<?php

/**
 * Plugin Name: Query Taxonomy By GutenbergHub 
 * Description: The Query Taxonomy Block allows users to search posts or pages by category or tags, improving the site's functionality and user experience.
 * Author: GutenbergHub
 * Author URI:  https://shop.gutenberghub.com/
 * Version: 1.0.3
 * Requires at least: 6.1
 * Requires PHP: 7.0
 * Text Domain: gutenberghub-query-taxonomy
 * Domain Path: /languages
 * Tested up to: 6.3
 *
 * @package GutenberghubQueryTaxonomy
 */

if (!defined('ABSPATH')) {
	die('No direct access');
}

if (!defined('GHQT_DIR_PATH')) {
	define('GHQT_DIR_PATH', \plugin_dir_path(__FILE__));
}

if (!defined('GHQT_PLUGIN_URL')) {
	define('GHQT_PLUGIN_URL', \plugins_url('/', __FILE__));
}

if (!defined('GHQT_PLUGIN_BASE_NAME')) {
	define('GHQT_PLUGIN_BASE_NAME', \plugin_basename(__FILE__));
}

if (!class_exists('Gutenberghub_Query_Taxonomy')) {
	/**
	 * Main plugin class
	 */
	final class Gutenberghub_Query_Taxonomy {
		/**
		 * Var to make sure we only load once
		 *
		 * @var boolean $loaded
		 */
		public static $loaded = false;

		/**
		 * Constructor
		 *
		 * @return void
		 */
		public function __construct() {
			// GutenbergHub SDk
			require_once GHQT_DIR_PATH . 'gutenberghub-sdk/loader.php';

			// Utils.
			require_once GHQT_DIR_PATH . 'includes/utils.php';

			// Core.
			require_once GHQT_DIR_PATH . 'includes/class-gutenberghub-query-taxonomy-assets.php';

			// Extensions.
			require_once GHQT_DIR_PATH . 'includes/class-gutenberghub-query.php';

			// Blocks.
			require_once GHQT_DIR_PATH . 'includes/blocks/class-gutenberghub-filter-by-taxonomy.php';

			// Taxonomy
			add_filter('block_categories_all', array($this, 'register_category'));
		}

		/**
		 * Register custom category
		 * 
		 */
		public function register_category($categories) {
			// Check if "GutenbergHub" category already exists
			foreach ($categories as $category) {
				if ($category['slug'] === 'ghub-products') {
					// "GutenbergHub" category already exists, do not add again
					return $categories;
				}
			}

			// Adding "GutenbergHub" category.
			$categories[] = array(
				'slug'  => 'ghub-products',
				'title' => 'GutenbergHub'
			);

			return $categories;
		}
	}

	new Gutenberghub_Query_Taxonomy();
}
