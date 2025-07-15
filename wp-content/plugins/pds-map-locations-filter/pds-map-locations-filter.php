<?php
/**
 * Plugin Name:       PDS Map Locations Filter
 * Description:       A PDS map dynamic block for displaying maps with filterable locations.
 * Version:           2.0.6
 * Author:            PDS Ricard
 * Text Domain:       pds-map-locations-filter
 * Requires at least: 5.8
 * Requires PHP:      7.4
 */
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// Ensure no whitespace before this class definition
ob_start();

/**
 * Helper function to load a template.
 *
 * @param string $template_name The name of the template file (e.g., 'map-container.php').
 * @param array  $variables     An array of variables to extract into the template's scope.
 * @param string $block_name    Optional. The name of the block to check specific template folders.
 * @return string The rendered template HTML or an error message.
 */
function mlf_get_template_part($template_name, $variables = [], $block_name = null) {
	$located = '';
	$plugin_base_path = plugin_dir_path(__FILE__);

	// 1. Check theme override folder first.
	$theme_template = locate_template('pds-map-locations-filter/' . $template_name);
	if ($theme_template) {
		$located = $theme_template;
	} else {
		// 2. Check block-specific template folder in build/blocks/{block_name}/templates/
		if ($block_name) {
			 $block_template_path = $plugin_base_path . 'build/blocks/' . $block_name . '/templates/' . $template_name;
			 if (file_exists($block_template_path)) {
				 $located = $block_template_path;
			 }
		}

		// 3. Check generic template folder in build/templates/
		if (!$located) {
			$generic_template_path = $plugin_base_path . 'build/templates/' . $template_name;
			if (file_exists($generic_template_path)) {
				$located = $generic_template_path;
			}
		}

		// Fallbacks for development (checking src/) - Remove these for production releases if desired
		 if (!$located) {
			$src_template_path = $plugin_base_path . 'src/templates/' . $template_name;
			if (file_exists($src_template_path)) {
				 $located = $src_template_path;
			}
		 }
		 if (!$located && $block_name) {
			 $src_block_template_path = $plugin_base_path . 'src/blocks/' . $block_name . '/templates/' . $template_name;
			  if (file_exists($src_block_template_path)) {
				  $located = $src_block_template_path;
			  }
		 }
	}

	if (!$located) {
		error_log('PDS Map Template Error: Template not found: ' . $template_name . ($block_name ? ' for block ' . $block_name : ''));
		return '<div class="error">Template Loader Error: ' . esc_html($template_name) . ' not found.</div>';
	}

	if (!empty($variables)) {
		extract($variables, EXTR_SKIP);
	}

	ob_start();
	include $located;
	return ob_get_clean();
}

// Main Plugin Class
class PDSMLFPlugin {
	protected $post_type_name = 'tienda';
	protected $option_name = 'pds_mlf_google_maps_api_key';
	protected $option_group = 'pds_mlf_settings_group';
	protected $settings_page_slug = 'pds-map-locations-filter-settings';

	public function __construct() {
		register_activation_hook(__FILE__, [$this, 'activate']);
		register_deactivation_hook(__FILE__, [$this, 'deactivate']);

		add_action('init', [$this, 'register_custom_post_type']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
		add_action('enqueue_block_assets', [$this, 'enqueue_block_php_assets']);
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);

		// Admin Settings
		add_action('admin_menu', [$this, 'add_plugin_settings_page']);
		add_action('admin_init', [$this, 'register_plugin_settings']);

		// Ajax
		add_action('wp_ajax_mlf_get_locations_html', [$this, 'ajax_get_list_locations_html']);
		add_action('wp_ajax_nopriv_mlf_get_locations_html', [$this, 'ajax_get_list_locations_html']);
		add_action('wp_ajax_mlf_get_locations_markers', [$this, 'ajax_get_list_locations_markers']);
		add_action('wp_ajax_nopriv_mlf_get_locations_markers', [$this, 'ajax_get_list_locations_markers']);

		// ACF
		add_filter('acf/fields/google_map/api', [$this, 'acf_google_map_api']);
		add_filter('acf/load_field/key=mlf_taxonomies_block', [$this, 'populate_acf_options_in_select']);

		// Register block types AND their render callbacks on init
		add_action('init', function() {
			if (file_exists(__DIR__ . '/build/blocks/map-locations-filter/block.json')) {
				register_block_type( __DIR__ . '/build/blocks/map-locations-filter', [
					'render_callback' => [$this, 'render_map_locations_filter_block'],
				]);
			}
			 if (file_exists(__DIR__ . '/build/blocks/tienda-lista/block.json')) {
				 register_block_type( __DIR__ . '/build/blocks/tienda-lista', [
					 'render_callback' => [$this, 'render_tienda_lista_block'],
				 ]);
			 }
		}, 10);
	}

	public function activate() {
		$this->register_custom_post_type();
		flush_rewrite_rules();
	}

	public function deactivate() {
		flush_rewrite_rules();
	}

	// --- CPT Registration ---
	public function register_custom_post_type() {
		$labels = [
			'name'               => __('Tiendas', 'pds-map-locations-filter'),
			'singular_name'      => __('Tienda', 'pds-map-locations-filter'),
			'add_new'            => __('Add New Tienda', 'pds-map-locations-filter'),
			'add_new_item'       => __('Add New Tienda', 'pds-map-locations-filter'),
			'edit_item'          => __('Edit Tienda', 'pds-map-locations-filter'),
			'new_item'           => __('New Tienda', 'pds-map-locations-filter'),
			'all_items'          => __('All Tiendas', 'pds-map-locations-filter'),
			'view_item'          => __('View Tienda', 'pds-map-locations-filter'),
			'search_items'       => __('Search Tiendas', 'pds-map-locations-filter'),
			'not_found'          => __('No Tiendas found', 'pds-map-locations-filter'),
			'not_found_in_trash' => __('No Tiendas found in Trash', 'pds-map-locations-filter'),
			'menu_name'          => __('Tiendas', 'pds-map-locations-filter'),
		];
		$args = [
			'labels'             => $labels,
			'public'             => true,
			'has_archive'        => true,
			'rewrite'            => ['slug' => $this->post_type_name],
			'menu_position'      => 25, // Adjust position if needed
			'menu_icon'          => 'dashicons-store',
			'supports'           => ['title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'],
			'show_in_rest'       => true,
			'taxonomies'         => ['category'], // Add others if needed
		];
		register_post_type($this->post_type_name, $args);
	}

	// --- Settings Page ---
	public function add_plugin_settings_page() {
		add_options_page(
			__('PDS Map Locations Settings', 'pds-map-locations-filter'),
			__('PDS Map Locations', 'pds-map-locations-filter'),
			'manage_options',
			$this->settings_page_slug,
			[$this, 'render_plugin_settings_page']
		);
	}

	public function register_plugin_settings() {
		register_setting(
			$this->option_group,
			$this->option_name,
			[$this, 'sanitize_api_key']
		);
		add_settings_section(
			'pds_mlf_api_key_section',
			__('API Key Settings', 'pds-map-locations-filter'),
			null,
			$this->settings_page_slug
		);
		add_settings_field(
			'pds_mlf_google_maps_api_key_field',
			__('Google Maps API Key', 'pds-map-locations-filter'),
			[$this, 'render_api_key_field'],
			$this->settings_page_slug,
			'pds_mlf_api_key_section'
		);
	}

	public function sanitize_api_key($input) {
		return preg_replace('/[^a-zA-Z0-9_\-\s]/', '', sanitize_text_field(trim($input)));
	}

	public function render_api_key_field() {
		$api_key = get_option($this->option_name, '');
		?>
		<input type='text'
			   name='<?php echo esc_attr($this->option_name); ?>'
			   value='<?php echo esc_attr($api_key); ?>'
			   class='regular-text'
			   placeholder='<?php esc_attr_e('Enter your Google Maps API Key', 'pds-map-locations-filter'); ?>' />
		<p class="description">
			<?php
			printf(
				/* translators: %s: Link to Google Cloud Console */
				wp_kses_post(__('Get your key from the <a href="%s" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>. Ensure it has permissions for Maps JavaScript API and Geocoding API (if used by ACF).', 'pds-map-locations-filter')),
				'https://console.cloud.google.com/google/maps-apis/overview'
			);
			?>
		</p>
		<?php
	}

	public function render_plugin_settings_page() {
		?>
		<div class="wrap">
			<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields($this->option_group);
				do_settings_sections($this->settings_page_slug);
				submit_button(__('Save API Key', 'pds-map-locations-filter'));
				?>
			</form>
		</div>
		<?php
	}

	// --- API Key Retrieval ---
	public function get_public_safe_api_key() {
		 $key = get_option($this->option_name, '');
		return $key ?: '';
	}

	// --- ACF Integration ---
	public function acf_google_map_api($api) {
		 $api_key = $this->get_public_safe_api_key();
		 if ($api_key) {
			 $api['key'] = $api_key;
		 } else {
			 // Key not set - ACF Map field in admin might not fully work
			 // Avoid outputting errors directly here unless necessary
			 error_log('PDS Map Locations: Google Maps API Key not configured in Settings > PDS Map Locations.');
		 }
		return $api;
	}

	public function populate_acf_options_in_select($field) {
		if ($field['key'] !== 'mlf_taxonomies_block') {
			 return $field;
		 }
		$field['choices'] = [];
		$taxonomies = get_object_taxonomies(['post_type' => $this->post_type_name], 'objects');
		if ($taxonomies) {
			foreach ($taxonomies as $taxonomy) {
				if (!$taxonomy->public || !$taxonomy->show_ui) continue; // Skip non-public/UI taxonomies
				$field['choices'][$taxonomy->name] = $taxonomy->label;
			}
		}
		return $field;
	}

	// --- Asset Enqueueing ---
	public function enqueue_frontend_assets() {
		// Enqueue Frontend Style (style.css)
		$style_asset_path = plugin_dir_path(__FILE__) . 'build/style.asset.php';
		$style_handle = 'pds-mlf-frontend-style';
		if (file_exists($style_asset_path) && file_exists(plugin_dir_path(__FILE__) . 'build/style.css')) {
			$style_asset = require($style_asset_path);
			wp_enqueue_style($style_handle, plugin_dir_url(__FILE__) . 'build/style.css', [], $style_asset['version']);
		} elseif (file_exists(plugin_dir_path(__FILE__) . 'build/style.css')) {
			wp_enqueue_style($style_handle, plugin_dir_url(__FILE__) . 'build/style.css', [], '2.0.6');
		}

		// Enqueue Frontend Script (view.js)
		$script_asset_path = plugin_dir_path(__FILE__) . 'build/view.asset.php';
		$script_handle = 'pds-mlf-view-script';
		if (file_exists($script_asset_path) && file_exists(plugin_dir_path(__FILE__) . 'build/view.js')) {
			$script_asset = require($script_asset_path);
			wp_enqueue_script($script_handle, plugin_dir_url(__FILE__) . 'build/view.js', $script_asset['dependencies'], $script_asset['version'], true);

			wp_localize_script($script_handle, 'mlf_ajax', [
				'ajax_url' => admin_url('admin-ajax.php'),
				'nonce'    => wp_create_nonce('mlf_nonce'),
				'google_maps_api_key' => $this->get_public_safe_api_key(),
				'i18n' => [
                    'loadingMap' => __('Loading Map...', 'pds-map-locations-filter'),
                    'loadingLocations' => __('Loading locations...', 'pds-map-locations-filter'),
                    'errorLoadingMap' => __('Error loading map.', 'pds-map-locations-filter'),
                    'errorLoadingLocations' => __('Error loading locations. Please try again.', 'pds-map-locations-filter'),
                    'noResults' => __('Sorry, no locations match your criteria.', 'pds-map-locations-filter'),
                    'viewDetails' => __('View Details', 'pds-map-locations-filter'),
                ]
			]);
		}
	}

	public function enqueue_block_php_assets() {
		// Generally empty if styles handled by block.json or JS imports
	}

	public function enqueue_block_editor_assets() {
		// Enqueue Editor Script (index.js)
		$script_asset_path = plugin_dir_path(__FILE__) . 'build/index.asset.php';
		$script_handle = 'pds-mlf-editor-script';
		if ( file_exists( $script_asset_path ) && file_exists(plugin_dir_path(__FILE__) . 'build/index.js')) {
			$script_asset = require( $script_asset_path );
			wp_enqueue_script($script_handle, plugin_dir_url( __FILE__ ) . 'build/index.js', $script_asset['dependencies'], $script_asset['version'], true );
		}

		// Enqueue Editor Styles (index.css)
		$style_asset_path = plugin_dir_path(__FILE__) . 'build/index.asset.php'; // Often same asset file as JS
		$style_handle = 'pds-mlf-editor-style';
		 if (file_exists($style_asset_path) && file_exists(plugin_dir_path(__FILE__) . 'build/index.css')) {
			 $style_asset = require($style_asset_path);
			 wp_enqueue_style($style_handle, plugin_dir_url(__FILE__) . 'build/index.css', ['wp-edit-blocks'], $style_asset['version']);
		 } elseif (file_exists(plugin_dir_path(__FILE__) . 'build/index.css')) {
			wp_enqueue_style($style_handle, plugin_dir_url(__FILE__) . 'build/index.css', ['wp-edit-blocks'], '2.0.6');
		 }

		 // Also enqueue frontend styles in the editor
		 $frontend_style_handle = 'pds-mlf-frontend-style';
		 if (wp_style_is($frontend_style_handle, 'registered')) {
			 wp_enqueue_style($frontend_style_handle);
		 } else {
			 $fe_style_asset_path = plugin_dir_path(__FILE__) . 'build/style.asset.php';
			 if (file_exists($fe_style_asset_path) && file_exists(plugin_dir_path(__FILE__) . 'build/style.css')) {
				$fe_style_asset = require($fe_style_asset_path);
				 wp_enqueue_style($frontend_style_handle, plugin_dir_url(__FILE__) . 'build/style.css', [], $fe_style_asset['version']);
			 } elseif (file_exists(plugin_dir_path(__FILE__) . 'build/style.css')) {
				wp_enqueue_style($frontend_style_handle, plugin_dir_url(__FILE__) . 'build/style.css', [], '2.0.6');
			 }
		 }
	}

	// --- AJAX Handlers ---
	public function ajax_get_list_locations_html() {
		check_ajax_referer('mlf_nonce', 'nonce');
		$search_term = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';
		$tax_query = $this->build_tax_query_from_post('taxonomies');
		$query_args = [
			'post_type'      => $this->post_type_name,
			'posts_per_page' => -1,
			's'              => $search_term,
			'tax_query'      => count($tax_query) > 1 ? array_merge(['relation' => 'AND'], $tax_query) : $tax_query,
		];
		$locations_query = new WP_Query($query_args);
		$html = mlf_get_template_part('locations-list.php', ['locations_query' => $locations_query], 'map-locations-filter');
		wp_send_json_success(['html' => $html]);
	}

	public function ajax_get_list_locations_markers() {
		check_ajax_referer('mlf_nonce', 'nonce');
		$search_term = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';
		$tax_query = $this->build_tax_query_from_post('taxonomies');
		$query_args = [
			'post_type'      => $this->post_type_name,
			'posts_per_page' => -1,
			's'              => $search_term,
			'tax_query'      => count($tax_query) > 1 ? array_merge(['relation' => 'AND'], $tax_query) : $tax_query,
			'meta_query'     => [
				'relation' => 'AND',
				['key' => 'latitude', 'compare' => 'EXISTS', 'type' => 'NUMERIC'],
				['key' => 'longitude', 'compare' => 'EXISTS', 'type' => 'NUMERIC'],
				['key' => 'latitude', 'value' => array('', 0), 'compare' => 'NOT IN'],
				['key' => 'longitude', 'value' => array('', 0), 'compare' => 'NOT IN'],
			]
		];
		$locations = new WP_Query($query_args);
		$markers = [];
		if ($locations->have_posts()) {
			while ($locations->have_posts()) {
				$locations->the_post();
				$lat = get_field('latitude', get_the_ID());
				$lng = get_field('longitude', get_the_ID());
				if (is_numeric($lat) && is_numeric($lng) && $lat != 0 && $lng != 0) {
					$info_window_content = mlf_get_template_part('template-mlf-marker-info-window.php', [
						'title'     => get_the_title(),
						'content'   => get_the_excerpt() ?: wp_trim_words(strip_shortcodes(get_the_content()), 20),
						'id'        => get_the_ID(),
						'permalink' => get_permalink(),
					], 'map-locations-filter');
					$markers[] = [
						'id'       => get_the_ID(),
						'title'    => get_the_title(),
						'position' => ['lat' => (float) $lat, 'lng' => (float) $lng],
						'infoWindowContent' => $info_window_content,
					];
				}
			}
			wp_reset_postdata();
		}
		wp_send_json_success($markers);
	}

	// Helper to build tax query from POST data
	private function build_tax_query_from_post($post_key) {
		$tax_query = [];
		$posted_taxonomies = isset($_POST[$post_key]) ? json_decode(stripslashes($_POST[$post_key]), true) : [];
		
          // ---> ADD THIS DEBUG LINE <---
    error_log('[MLF Debug] Received POST['.$post_key.']: ' . print_r($_POST[$post_key] ?? 'Not set', true));
    error_log('[MLF Debug] Decoded Taxonomies: ' . print_r($posted_taxonomies, true));
    // ---> END DEBUG LINES <---
        
        if (!is_array($posted_taxonomies)) {
			$posted_taxonomies = [];
		}
		foreach ($posted_taxonomies as $taxonomy => $term_slug) {
			$taxonomy = sanitize_key($taxonomy);
			$term_slug = sanitize_title($term_slug);
			if ($term_slug !== 'all' && taxonomy_exists($taxonomy)) {
				$tax_query[] = ['taxonomy' => $taxonomy, 'field' => 'slug', 'terms' => $term_slug];
			}
		}
		return $tax_query;
	}

	// --- Block Rendering Callbacks ---
	public function render_map_locations_filter_block($attributes, $content = '', $block = null) {
		$selected_taxonomies = $attributes['selectedTaxonomies'] ?? [];
		$nav_taxonomies = [];
		if (is_array($selected_taxonomies)) {
			foreach ($selected_taxonomies as $tax_slug) {
				$taxonomy_object = get_taxonomy(sanitize_key($tax_slug));
				if ($taxonomy_object && $taxonomy_object->public && $taxonomy_object->show_ui) { // Check if usable on frontend
					 $nav_taxonomies[$tax_slug] = $taxonomy_object;
				}
			}
		}
		$template_vars = [
			'attributes'     => $attributes,
			'title'          => $attributes['title'] ?? __('Locations', 'pds-map-locations-filter'),
			'taxonomies'     => $nav_taxonomies,
			'is_preview'     => isset($block->context['postId']) ? false : true,
			'block_instance' => $block,
			'container_id'   => 'pds-map-block-' . bin2hex(random_bytes(4)),
		];
		return mlf_get_template_part('map-container.php', $template_vars, 'map-locations-filter');
	}

	public function render_tienda_lista_block($attributes) {
		 return mlf_get_template_part('tienda-lista.php', ['attributes' => $attributes], 'tienda-lista');
	 }
}

// Clean output buffer before instantiation
ob_end_clean();

// Initialize plugin
new PDSMLFPlugin();