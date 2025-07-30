<?php

/**
 * Admin Class.
 *
 * @package GutenberghubQueryTaxonomy
 */

if (!defined('ABSPATH')) {
	die('No direct access');
}

/**
 * Main class for handling related assets and functionalities.
 */
class Gutenberghub_Query_Taxonomy_Assets {

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	public function __construct() {

		add_action('init', array($this, 'register_frontend_scripts'));
		add_action('enqueue_block_assets', array($this, 'register_editor_scripts'));
	}

	public function register_frontend_scripts() {
		// Checks if the current enqueue is for the tokengate post type.
		\wp_register_script(
			'gutenberghub-query-taxonomy-frontend-script',
			GHQT_PLUGIN_URL . 'dist/frontend.js',
			array( 'jquery' ),
			uniqid(),
			false
		);

		\wp_register_style(
			'gutenberghub-query-taxonomy-frontend-style',
			GHQT_PLUGIN_URL . 'dist/frontend.css',
			array(),
			uniqid()
		);
	}

	public function register_editor_scripts() {
		// Checks if the current enqueue is for the tokengate post type.
		\wp_register_script(
			'gutenberghub-query-taxonomy-gutenberg-script',
			GHQT_PLUGIN_URL . 'dist/gutenberg.js',
			array(
				'wp-api',
				'wp-i18n',
				'wp-components',
				'wp-element',
				'wp-editor',
				'lodash',
			),
			uniqid(),
			true
		);

		\wp_register_style(
			'gutenberghub-query-taxonomy-gutenberg-style',
			GHQT_PLUGIN_URL . 'dist/gutenberg.css',
			array(),
			uniqid()
		);
	}
}

new Gutenberghub_Query_Taxonomy_Assets();
