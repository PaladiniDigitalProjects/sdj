<?php
/**
 * Plugin Name:       PDS Map Locations Filter
 * Description:       A PDS map dynamic block with filterable locations.
 * Version:           2.1.0
 * Author:            PDS Ricard
 * Text Domain:       pds-map-locations-filter
 * Requires at least: 5.8
 * Requires PHP:      7.4
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants.
if ( ! defined( 'PDS_MLF_PLUGIN_FILE' ) ) {
    define( 'PDS_MLF_PLUGIN_FILE', __FILE__ );
}
if ( ! defined( 'PDS_MLF_PLUGIN_DIR' ) ) {
    define( 'PDS_MLF_PLUGIN_DIR', plugin_dir_path( PDS_MLF_PLUGIN_FILE ) );
}
if ( ! defined( 'PDS_MLF_PLUGIN_URL' ) ) {
    define( 'PDS_MLF_PLUGIN_URL', plugin_dir_url( PDS_MLF_PLUGIN_FILE ) );
}
if ( ! defined( 'PDS_MLF_VERSION' ) ) {
    define( 'PDS_MLF_VERSION', '2.1.0' );
}

/**
 * Helper function to include template parts.
 *
 * @param string $template_name The name of the template file (e.g., 'map-container.php').
 * @param array  $variables     Optional. An associative array of variables to extract for the template.
 * @param string $block_name    Optional. The slug of the block (e.g., 'map-locations-filter') to look in block-specific template folders.
 * @return string The rendered template content, or an error message if not found.
 */
function mlf_get_template_part( $template_name, $variables = [], $block_name = null ) {
    $base_dir = PDS_MLF_PLUGIN_DIR;
    $paths    = [
        locate_template( "pds-map-locations-filter/{$template_name}" ), 
        $block_name ? "{$base_dir}build/blocks/{$block_name}/templates/{$template_name}" : '', 
        "{$base_dir}build/blocks/templates/{$template_name}", 
        "{$base_dir}src/templates/{$template_name}", 
        $block_name ? "{$base_dir}src/blocks/{$block_name}/templates/{$template_name}" : '', 
    ];

    foreach ( $paths as $path ) {
        if ( $path && file_exists( $path ) ) {

            extract( $variables, EXTR_OVERWRITE );
            ob_start();
            include $path;
            return ob_get_clean();
        }
    }

    // Log an error if template is not found.
    error_log( sprintf( 'MLF Template not found: %s (Block: %s)', $template_name, $block_name ?: 'N/A' ) );
    return sprintf( '<div class="error">%s %s %s.</div>', esc_html__( 'Template', 'pds-map-locations-filter' ), esc_html( $template_name ), esc_html__( 'not found', 'pds-map-locations-filter' ) );
}


/**
 * Main plugin class for PDS Map Locations Filter.
 */
class PDSMLFPlugin {
    /**
     * The custom post type slug for locations.
     *
     * @var string
     */
    protected $post_type = 'location';

    /**
     * The option name for storing the Google Maps API key.
     *
     * @var string
     */
    protected $option_name = 'pds_mlf_google_maps_api_key';

    /**
     * The settings page slug.
     *
     * @var string
     */
    protected $settings_slug = 'pds-map-locations-filter-settings';

    /**
     * Constructor. Sets up all hooks and filters.
     */
    public function __construct() {
        // Activation/Deactivation hooks.
        register_activation_hook( PDS_MLF_PLUGIN_FILE, [ $this, 'activate' ] );
        register_deactivation_hook( PDS_MLF_PLUGIN_FILE, [ $this, 'deactivate' ] );

        // WordPress initialization hooks.
        add_action( 'init', [ $this, 'register_post_type' ], 0 );
        add_action( 'init', [ $this, 'register_blocks' ], 10 ); 

        // Enqueue scripts and styles.
        add_action( 'wp_enqueue_scripts',          [ $this, 'enqueue_frontend' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor' ] );

        // Admin settings page.
        add_action( 'admin_menu', [ $this, 'add_settings_page' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );

        // ACF integrations.
        add_action( 'acf/init',                  [ $this, 'acf_init' ] );
        add_filter( 'acf/fields/google_map/api', [ $this, 'acf_google_map_api' ] );
        add_filter( 'acf/load_field/key=mlf_taxonomies_block', [ $this, 'populate_acf_select' ] );

        // AJAX actions.
        add_action( 'wp_ajax_mlf_get_locations_html',        [ $this, 'ajax_locations_html' ] );
        add_action( 'wp_ajax_nopriv_mlf_get_locations_html', [ $this, 'ajax_locations_html' ] );
        add_action( 'wp_ajax_mlf_get_locations_markers',        [ $this, 'ajax_locations_markers' ] );
        add_action( 'wp_ajax_nopriv_mlf_get_locations_markers', [ $this, 'ajax_locations_markers' ] );
        add_action( 'wp_ajax_mlf_get_tienda_list_html',        [ $this, 'ajax_tienda_list' ] );
        add_action( 'wp_ajax_nopriv_mlf_get_tienda_list_html', [ $this, 'ajax_tienda_list' ] );
    }

    /**
     * Runs on plugin activation.
     */
    public function activate() {
        $this->register_post_type();
        flush_rewrite_rules(); 
    }

    /**
     * Runs on plugin deactivation.
     */
    public function deactivate() {
        flush_rewrite_rules(); 
    }

    /**
     * Registers the custom post type 'location'.
     */
    public function register_post_type() {
        $labels = [
            'name'          => __( 'Locations', 'pds-map-locations-filter' ),
            'singular_name' => __( 'Location', 'pds-map-locations-filter' ),
            'add_new'       => __( 'Add New Location', 'pds-map-locations-filter' ),
            'add_new_item'  => __( 'Add New Location', 'pds-map-locations-filter' ),
            'edit_item'     => __( 'Edit Location', 'pds-map-locations-filter' ),
            'new_item'      => __( 'New Location', 'pds-map-locations-filter' ),
            'all_items'     => __( 'All Locations', 'pds-map-locations-filter' ),
            'view_item'     => __( 'View Location', 'pds-map-locations-filter' ),
            'search_items'  => __( 'Search Locations', 'pds-map-locations-filter' ),
            'not_found'     => __( 'No locations found', 'pds-map-locations-filter' ),
            'not_found_in_trash' => __( 'No locations found in Trash', 'pds-map-locations-filter' ),
            'parent_item_colon' => '',
            'menu_name'     => __( 'Locations', 'pds-map-locations-filter' ),
        ];
        $args = [
            'labels'       => $labels,
            'public'       => true,
            'has_archive'  => true,
            'rewrite'      => [ 'slug' => $this->post_type ],
            'menu_icon'    => 'dashicons-store',
            'supports'     => [ 'title','editor','thumbnail','custom-fields','excerpt' ],
            'show_in_rest' => true, 
        ];
        register_post_type( $this->post_type, $args );
    }

    /**
     * Retrieves taxonomies associated with the 'location' post type.
     *
     * @param string $output The output format ('names' or 'objects').
     * @return array An array of taxonomy names or objects.
     */
    public function get_location_taxonomies( $output = 'names' ) {
        return get_object_taxonomies( $this->post_type, $output );
    }

    /**
     * Retrieves terms for all taxonomies associated with a given post ID.
     *
     * @param int   $post_id The ID of the post.
     * @param array $args    Optional. Arguments for get_the_terms.
     * @return array An associative array where keys are taxonomy names and values are arrays of term names/IDs.
     */
    public function get_location_post_terms( $post_id, $args = [] ) {
        $default_args = [ 'hide_empty' => true, 'fields' => 'name' ];
        $args         = wp_parse_args( $args, $default_args );

        $taxes = $this->get_location_taxonomies( 'objects' );
        $map   = [];

        foreach ( $taxes as $tax ) {
            $terms = get_the_terms( $post_id, $tax->name );
            if ( is_array( $terms ) && ! is_wp_error( $terms ) ) {
                $map[ $tax->name ] = wp_list_pluck( $terms, $args['fields'] === 'ids' ? 'term_id' : 'name' );
            }
        }
        return $map;
    }

    /**
     * Registers Gutenberg blocks defined in the plugin.
     */
    public function register_blocks() {
        $blocks_dir = PDS_MLF_PLUGIN_DIR . 'build/blocks/';

        // Register Map Locations Filter block.
        if ( file_exists( $blocks_dir . 'map-locations-filter/block.json' ) ) {
            register_block_type( $blocks_dir . 'map-locations-filter', [
                'render_callback' => [ $this, 'render_map_block' ],
            ] );
        }

        // Register Tienda Lista block.
        if ( file_exists( $blocks_dir . 'tienda-lista/block.json' ) ) {
            register_block_type( $blocks_dir . 'tienda-lista', [
                'render_callback' => [ $this, 'render_tienda_lista_block' ],
            ] );
        }
    }

    /**
     * Enqueues frontend scripts and styles.
     */
    public function enqueue_frontend() {
        $build_url  = PDS_MLF_PLUGIN_URL . 'build/';
        $build_path = PDS_MLF_PLUGIN_DIR . 'build/';

        // Enqueue main stylesheet.
        if ( file_exists( $build_path . 'style.css' ) ) {
            wp_enqueue_style( 'pds-mlf-style', $build_url . 'style.css', [], filemtime( $build_path . 'style.css' ) );
        }

        // El style.css del bloque unificado "Centros SJD" (tienda-lista) WordPress
        // lo encola de forma condicional y poco fiable cuando el bloque va anidado
        // en patrones/otros bloques, así que lo cargamos aquí incondicionalmente.
        // (No hacemos lo mismo con el CSS del bloque map-locations-filter legacy:
        // sus reglas genéricas .mlf-* pisarían las del bloque unificado; ese bloque
        // ya carga su CSS vía WordPress cuando está presente en la página.)
        $tienda_style = 'blocks/tienda-lista/style.css';
        if ( file_exists( $build_path . $tienda_style ) ) {
            wp_enqueue_style( 'pds-mlf-tienda-lista-style', $build_url . $tienda_style, [ 'pds-mlf-style' ], filemtime( $build_path . $tienda_style ) );
        }

        // Enqueue global frontend script and localize data.
        if ( file_exists( $build_path . 'global-frontend.js' ) ) {
            wp_enqueue_script( 'pds-mlf-global', $build_url . 'global-frontend.js', [], filemtime( $build_path . 'global-frontend.js' ), true );
            wp_localize_script( 'pds-mlf-global', 'mlf_ajax', [
                'ajax_url'            => admin_url( 'admin-ajax.php' ),
                'nonce'               => wp_create_nonce( 'mlf_nonce' ),
                'google_maps_api_key' => get_option( $this->option_name ),
                'i18n'                => [
                    'loadingMap'          => __( 'Loading Map...', 'pds-map-locations-filter' ),
                    'loadingLocations'    => __( 'Loading locations...', 'pds-map-locations-filter' ),
                    'errorLoadingMap'     => __( 'Error loading map.', 'pds-map-locations-filter' ),
                    'errorLoadingLocations' => __( 'Error loading locations.', 'pds-map-locations-filter' ),
                    'noResults'           => __( 'No se ha encontrado la localización', 'pds-map-locations-filter' ),
                ],
            ] );
        }
    }

    /**
     * Enqueues scripts and styles for the block editor.
     */
    public function enqueue_editor() {
        $build_url  = PDS_MLF_PLUGIN_URL . 'build/';
        $build_path = PDS_MLF_PLUGIN_DIR . 'build/';


        if ( file_exists( $build_path . 'index.js' ) ) {
            wp_enqueue_script( 'pds-mlf-editor', $build_url . 'index.js', [ 'wp-blocks','wp-element','wp-editor','wp-data' ], filemtime( $build_path . 'index.js' ), true );
        }

        if ( file_exists( $build_path . 'index.css' ) ) {
            wp_enqueue_style( 'pds-mlf-editor-style', $build_url . 'index.css', [ 'wp-edit-blocks' ], filemtime( $build_path . 'index.css' ) );
        }
    }

    /**
     * Adds the plugin settings page to the WordPress admin menu.
     */
    public function add_settings_page() {
        add_options_page(
            __( 'PDS Map Locations', 'pds-map-locations-filter' ),
            __( 'PDS Map Locations', 'pds-map-locations-filter' ),
            'manage_options',
            $this->settings_slug,
            [ $this, 'render_settings' ]
        );
    }

    /**
     * Registers plugin settings.
     */
    public function register_settings() {
        register_setting( $this->settings_slug, $this->option_name );
    }

    /**
     * Renders the plugin settings page content.
     */
    public function render_settings() {
        $api_key = get_option( $this->option_name, '' );
        ?>
        <div class="wrap">
            <h1><?php esc_html_e( 'PDS Map Locations', 'pds-map-locations-filter' ); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields( $this->settings_slug );
                ?>
                <table class="form-table">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="<?php echo esc_attr( $this->option_name ); ?>"><?php esc_html_e( 'Google Maps API Key', 'pds-map-locations-filter' ); ?></label></th>
                            <td>
                                <input type="text" id="<?php echo esc_attr( $this->option_name ); ?>" name="<?php echo esc_attr( $this->option_name ); ?>" value="<?php echo esc_attr( $api_key ); ?>" class="regular-text" />
                                <p class="description">
                                    <?php
                                    echo wp_kses_post(
                                        sprintf(
                                            
                                            __( 'Enter your Google Maps API Key. You can get one from the <a href="%s" target="_blank">Google Cloud Console</a>. Ensure Maps JavaScript API is enabled.', 'pds-map-locations-filter' ),
                                            'https://console.cloud.google.com/apis/credentials'
                                        )
                                    );
                                    ?>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <?php
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Initializes ACF fields for location post type.
     */
    public function acf_init() {
        if ( function_exists( 'acf_add_local_field_group' ) ) {
            acf_add_local_field_group( [
                'key'       => 'mlf_latlng',
                'title'     => __( 'Position', 'pds-map-locations-filter' ),
                'fields'    => [
                    [
                        'key'   => 'field_mlf_latitude',
                        'label' => __( 'Latitude', 'pds-map-locations-filter' ),
                        'name'  => 'latitude',
                        'type'  => 'number',
                    ],
                    [
                        'key'   => 'field_mlf_longitude',
                        'label' => __( 'Longitude', 'pds-map-locations-filter' ),
                        'name'  => 'longitude',
                        'type'  => 'number',
                    ],
                ],
                'location'  => [
                    [
                        [
                            'param'    => 'post_type',
                            'operator' => '==',
                            'value'    => $this->post_type,
                        ],
                    ],
                ],
                'menu_order' => 0,
                'position'   => 'normal',
                'style'      => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'active'     => true,
                'description' => '',
            ] );
        }
    }

    /**
     * Filters the ACF Google Map API key.
     *
     * @param array $api The ACF Google Map API settings.
     * @return array Modified API settings.
     */
    public function acf_google_map_api( $api ) {
        $api_key = get_option( $this->option_name );
        if ( $api_key ) {
            $api['key'] = $api_key;
        }
        return $api;
    }

    /**
     * Populates ACF select field with available taxonomies for the block.
     *
     * @param array $field The ACF field array.
     * @return array Modified ACF field array.
     */
    public function populate_acf_select( $field ) {
        if ( $field['key'] !== 'mlf_taxonomies_block' ) {
            return $field;
        }
        $field['choices'] = [];
       
        foreach ( $this->get_location_taxonomies( 'objects' ) as $tax ) {
            if ( $tax->public && $tax->show_ui && $tax->show_in_rest ) {
                $field['choices'][ $tax->name ] = $tax->labels->singular_name;
            }
        }
        return $field;
    }

   /**
     * AJAX handler for fetching HTML of locations list.
     */
    public function ajax_locations_html() {
        check_ajax_referer( 'mlf_nonce', 'nonce' );

        $search_query      = sanitize_text_field( $_POST['search'] ?? '' );
        $taxonomies_json   = stripslashes( $_POST['taxonomies'] ?? '{}' );
        $taxonomies_filter = json_decode( $taxonomies_json, true );
        $num_stores_raw = $_POST['numStores'] ?? -1;
        $num_stores = is_numeric($num_stores_raw) ? intval($num_stores_raw) : -1;
        $args = [
            'post_type'      => $this->post_type,
            's'              => $search_query,
            'posts_per_page' => ( $num_stores > 0 ) ? $num_stores : -1,
            'post_status'    => 'publish',
        ];

        // Apply taxonomy filters if present
        if ( is_array( $taxonomies_filter ) && ! empty( $taxonomies_filter ) ) {
            $tax_query = [];
            foreach ( $taxonomies_filter as $taxonomy_slug => $term_slug ) {
                if ( ! empty( $term_slug ) ) {
                    $tax_query[] = [
                        'taxonomy' => sanitize_key( $taxonomy_slug ),
                        'field'    => 'slug',
                        'terms'    => sanitize_key( $term_slug ),
                    ];
                }
            }
            if ( ! empty( $tax_query ) ) {
                $args['tax_query'] = [ 'relation' => 'AND', ...$tax_query ];
            }
        }

        // If it's the initial load (no search, no filters) → random order
        if ( empty( $search_query ) && empty( $args['tax_query'] ) ) {
            $args['orderby'] = 'rand';
        }

        $locations_query = new WP_Query( $args );

        // mlf_get_template_part() devuelve el HTML (no lo imprime), así que hay
        // que capturar su valor de retorno directamente.
        $html = mlf_get_template_part( 'locations-list.php', [ 'locations_query' => $locations_query ], 'map-locations-filter' );
        wp_reset_postdata();

        wp_send_json_success( [ 'html' => $html ] );
    }
    

    /**
     * AJAX handler for fetching location markers data.
     */
    public function ajax_locations_markers() {
        check_ajax_referer( 'mlf_nonce', 'nonce' );

        $search_query = sanitize_text_field( $_POST['search'] ?? '' );
        $taxonomies_json = stripslashes( $_POST['taxonomies'] ?? '{}' );
        $taxonomies_filter = json_decode( $taxonomies_json, true );

        $args = [
            'post_type'      => $this->post_type,
            's'              => $search_query,
            'posts_per_page' => -1,
            'post_status'    => 'publish',
            'meta_query'     => [ 
                [
                    'key'     => 'latitude',
                    'compare' => 'EXISTS',
                ],
                [
                    'key'     => 'longitude',
                    'compare' => 'EXISTS',
                ],
            ],
        ];

        if ( is_array( $taxonomies_filter ) && ! empty( $taxonomies_filter ) ) {
            $tax_query = [];
            foreach ( $taxonomies_filter as $taxonomy_slug => $term_slug ) {
                $tax_query[] = [
                    'taxonomy' => sanitize_key( $taxonomy_slug ),
                    'field'    => 'slug',
                    'terms'    => sanitize_key( $term_slug ),
                ];
            }
            if ( ! empty( $tax_query ) ) {
                $args['tax_query'] = [ 'relation' => 'AND', ...$tax_query ];
            }
        }

        $markers_query = new WP_Query( $args );
        $markers       = [];

        while ( $markers_query->have_posts() ) {
            $markers_query->the_post();
            $post_id = get_the_ID();
            $lat     = get_field( 'latitude', $post_id );
            $lng     = get_field( 'longitude', $post_id );

            if ( is_numeric( $lat ) && is_numeric( $lng ) ) {
                $provincia_terms = get_the_terms( $post_id, 'provincia' );
                $ambito_terms    = get_the_terms( $post_id, 'ambito' );

                // mlf_get_template_part() devuelve el HTML (no lo imprime); se
                // captura su valor de retorno. Se pasan los datos que el
                // template de la info window espera (dirección, contacto, etc.).
                $info_window_content = mlf_get_template_part(
                    'template-mlf-marker-info-window.php',
                    [
                        'id'        => $post_id,
                        'title'     => get_the_title(),
                        'thumbnail' => get_the_post_thumbnail_url( $post_id, 'medium' ),
                        'permalink' => get_permalink( $post_id ),
                        'provincia' => ( $provincia_terms && ! is_wp_error( $provincia_terms ) ) ? $provincia_terms[0]->name : '',
                        'ambito'    => ( $ambito_terms && ! is_wp_error( $ambito_terms ) ) ? implode( ', ', wp_list_pluck( $ambito_terms, 'name' ) ) : '',
                        'direccion' => get_post_meta( $post_id, 'ce_direccion', true ),
                        'telefono'  => get_post_meta( $post_id, 'ce_telefono', true ),
                        'email'     => get_post_meta( $post_id, 'ce_email', true ),
                        'web'       => get_post_meta( $post_id, 'ce_web', true ),
                    ],
                    'map-locations-filter'
                );

                $markers[] = [
                    'id'              => $post_id,
                    'title'           => get_the_title(),
                    'position'        => [ 'lat' => floatval( $lat ), 'lng' => floatval( $lng ) ],
                    'infoWindowContent' => $info_window_content,
                    'terms'           => $this->get_location_post_terms( $post_id ), // Include terms for potential JS use.
                ];
            }
        }
        wp_reset_postdata(); // Restore original post data.

        wp_send_json_success( $markers );
    }

    /**
     * AJAX handler for fetching tienda list HTML.
     */
   public function ajax_tienda_list() {
    check_ajax_referer( 'mlf_nonce', 'nonce' );

    $search_query = sanitize_text_field( $_POST['search'] ?? '' );
    $taxonomies_json = stripslashes( $_POST['taxonomies'] ?? '{}' );
    $taxonomies_filter = json_decode( $taxonomies_json, true );
    $num_stores_raw = $_POST['numStores'] ?? -1;
    $num_stores = is_numeric($num_stores_raw) ? intval($num_stores_raw) : -1;
    $display_style     = sanitize_text_field( $_POST['displayStyle'] ?? 'list' );

    $args = [
        'post_type'      => $this->post_type,
        's'              => $search_query,
        'posts_per_page' => ( $num_stores > 0 ) ? $num_stores : -1,
        'post_status'    => 'publish',
    ];

    $tax_query = [];

    if ( is_array( $taxonomies_filter ) && ! empty( $taxonomies_filter ) ) {
        foreach ( $taxonomies_filter as $taxonomy_slug => $term_slug ) {
            $term_slug = sanitize_key( $term_slug );
            if ( $term_slug === 'all' ) {
                continue;
            }

            $tax_query[] = [
                'taxonomy' => sanitize_key( $taxonomy_slug ),
                'field'    => 'slug',
                'post_status'    => 'publish',
                'terms'    => $term_slug,
            ];
        }
    }

    if ( ! empty( $tax_query ) ) {
        $args['tax_query'] = [ 'relation' => 'AND', ...$tax_query ];
    }
    if ( empty( $search_query ) && empty( $args['tax_query'] ) ) {
                $args['orderby'] = 'rand';
            }
    $tienda_query = new WP_Query( $args );

    ob_start();


    $html = mlf_get_template_part(
    'tienda-list-items.php',
    [
        'stores_query'  => $tienda_query,
        'display_style' => $display_style,
    ],
    'tienda-lista'
);
    wp_reset_postdata();

    wp_send_json_success( [ 'html' => $html, 'count' => $tienda_query->found_posts ] );
}

    /**
     * Renders the Map Locations Filter block.
     *
     * @param array $attrs Block attributes.
     * @return string Rendered block HTML.
     */
   public function render_map_block( $attrs ) {
    $selected_tax_slugs = $attrs['selectedTaxonomies'] ?? [];
    $taxonomies_for_template = [];

    // If there are explicit selected slugs, include those taxonomy objects.
    if ( ! empty( $selected_tax_slugs ) ) {
        foreach ( (array) $selected_tax_slugs as $slug ) {
            $taxonomy_obj = get_taxonomy( sanitize_key( $slug ) );
            if ( $taxonomy_obj ) {
                $taxonomies_for_template[ $slug ] = $taxonomy_obj;
            }
        }
    } else {
        // No explicit selection → include all relevant taxonomies for the post type.
        $all = $this->get_location_taxonomies( 'objects' );
        foreach ( (array) $all as $tax ) {
            if ( $tax instanceof WP_Taxonomy ) {
                $taxonomies_for_template[ $tax->name ] = $tax;
            } else {
                // fallback: try to fetch taxonomy object by name
                $t = get_taxonomy( $tax );
                if ( $t ) $taxonomies_for_template[ $tax ] = $t;
            }
        }
    }

    $container_id = 'pds-map-block-' . bin2hex( random_bytes( 4 ) );

    $variables = [
        'attributes'   => $attrs,
        'taxonomies'   => $taxonomies_for_template,
        'container_id' => $container_id,
    ];

    return mlf_get_template_part( 'map-container.php', $variables, 'map-locations-filter' );
}


    /**
     * Renders the Tienda Lista block.
     *
     * @param array $attrs Block attributes.
     * @return string Rendered block HTML.
     */
   public function render_tienda_lista_block( $attrs, $block_instance ) {
   
    $selected_slugs = $attrs['selectedTaxonomies'] ?? [];
    $taxonomies_for_template = [];

    foreach ( (array) $selected_slugs as $slug ) {
   
        if ( $tax = get_taxonomy( sanitize_key( $slug ) ) ) {
            $taxonomies_for_template[ $slug ] = $tax;
        }
    }

    $variables = [
        'attributes'     => $attrs,
        'taxonomies'     => $taxonomies_for_template,
        'block_instance' => $block_instance,
    ];

    $html = mlf_get_template_part( 'tienda-lista.php', $variables, 'tienda-lista' );

    return sprintf(
        '<div class="pds-tienda-block-wrapper" data-block-init="%s">%s</div>',
        esc_attr( wp_json_encode( $attrs ) ),
        $html
    );
}

}

// Initialize the plugin.
new PDSMLFPlugin();
