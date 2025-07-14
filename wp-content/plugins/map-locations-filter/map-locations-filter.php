<?php

/**
 *
 * Plugin Name: MLF
 * Description: Show a map and filter blocks on map selection
 * Author: Nicolás Guglielmi
 *
 */

function mlf_get_template_part($template_name, $variables=array()) {
    $template_path = locate_template($template_name);

    if ( ! $template_path) {
        $template_path = plugin_dir_path(__FILE__) . $template_name;
    }

    ob_start();
    include $template_path;
    return ob_get_clean();
}


class MLFPlugin
{
    protected $post_type_name = 'location';
    protected $options = [
        [
            'name' => 'google_maps_key',
            'label' => 'Google Maps Key',
            'type' => 'string',
            'description' => '',
            'sanitize_callback' => NULL,
            'show_in_rest' => FALSE,
            'default' => '',
        ],
    ];

    public function __construct() {
        register_activation_hook(__FILE__, array($this, 'mlf_activate'));
        register_deactivation_hook(__FILE__, array($this, 'mlf_deactivate'));

        add_action('admin_menu', array($this, 'mlf_menu'), 99);
        add_action('init', array($this, 'mlf_init'), 99);

        add_action('wp_enqueue_scripts', array($this, 'mlf_enqueue_scripts'));
        add_action('wp_ajax_get_locations', array($this, 'mlf_get_list_locations_html'));
        add_action('wp_ajax_nopriv_get_locations', array($this, 'mlf_get_list_locations_html'));
        add_action('wp_ajax_get_locations_markers', array($this, 'mlf_get_list_locations_markers'));
        add_action('wp_ajax_nopriv_get_locations_markers', array($this, 'mlf_get_list_locations_markers'));

        add_filter('acf/fields/google_map/api', array($this, 'acf_google_map_api'));

        add_action('acf/init', array($this, 'acf_init'));
        add_filter('acf/load_field/key=mlf_taxonomies_block', array($this, 'populate_acf_options_in_select'));
    }

    public function populate_acf_options_in_select($field) {
        $field['choices'] = array();
        foreach (get_object_taxonomies(array('post_type' => $this->post_type_name), 'object') as $taxonomy) {
            $field['choices'][$taxonomy->name] = $taxonomy->label;
        }
        return $field;
    }

    public function mlf_get_list_locations_html() {
        global $wpdb; // this is how you get access to the database

        $filters_taxonomies = array();
        $taxonomies = $_POST['taxonomies'];
        foreach ($taxonomies as $taxonomy => $value) {
            if ($value === 'all') continue;
            $filters_taxonomies[] = array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $value,
            );
        }

        $s = $_POST['search'];
        $locations_query = new WP_Query(
            array(
                'post_type' => $this->post_type_name,
                'tax_query' => $filters_taxonomies,
                's' => $s,
            )
        );

        $html = mlf_get_template_part('template-mlf-list-locations.php', array(
            'locations_query' => $locations_query,
        ));

        echo $html;

        wp_die(); // this is required to terminate immediately and return a proper response
    }

    public function mlf_get_list_locations_markers()
    {
        global $wpdb; // this is how you get access to the database

        $filters_taxonomies = array();
        $taxonomies = $_POST['taxonomies'];
        foreach ($taxonomies as $taxonomy => $value) {
            if ($value === 'all') continue;
            $filters_taxonomies[] = array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $value,
            );
        }

        $s = $_POST['search'];
        $query = apply_filters('mlf/ajax/markers/query', array(
            'post_type' => $this->post_type_name,
            'tax_query' => $filters_taxonomies,
            's' => $s,
        ));

        $locations_query = new WP_Query($query);

        $locations = [];
        wp_reset_postdata();
        if ($locations_query->have_posts()) {
            while ($locations_query->have_posts()) {
                $locations_query->the_post();

                $info_window = mlf_get_template_part(
                    'template-mlf-marker-info-window.php',
                    apply_filters(
                        'mlf/ajax/markers/marker/infowindow',
                        array(
                            'id' => get_the_ID(),
                            'title' => get_the_title(),
                            'content' => get_the_content(),
                            'meta' => get_post_meta(get_the_ID()),
                        )
                    )
                );

                $locations[] = apply_filters('mlf/ajax/markers/marker', array(
                    'id' => get_the_ID(),
                    'title' => get_the_title(),
                    'infoWindow' => $info_window,
                    'meta' => get_post_meta(get_the_ID()),
                    'color' => '#00ffff',
                    'position' => array(
                        'lat' => (float) get_field('latitude'),
                        'lng' => (float) get_field('longitude'),
                    ),
                ));
            }
        }

        echo wp_json_encode(apply_filters('mlf/ajax/markers', $locations));

        wp_die(); // this is required to terminate immediately and return a proper response
    }

    public function acf_init() {

        // check function exists
        if( function_exists('acf_register_block') ) {

            // register a testimonial block
            acf_register_block(array(
                'name'				=> 'mlf',
                'title'				=> __('Map Locations Filter'),
                'description'		=> __('Locations in a map.'),
                'render_callback'	=> array($this, 'acf_block'),
                'category'			=> 'layout',
                'mode'              => 'edit',
                'icon'				=> 'location-alt',
                'keywords'			=> array( 'map', 'locations', 'filter' ),
            ));
        }

        if (function_exists('acf_add_local_field_group')) {
            acf_add_local_field_group(array(
                'key' => 'mlf_lat_lng',
                'title' => 'Position',
                'fields' => array(
                    array(
                        'key' => 'mlf_lat',
                        'label' => 'Latitude',
                        'name' => 'latitude',
                        'type' => 'number',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => '',
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'min' => '',
                        'max' => '',
                        'step' => '',
                    ),
                    array(
                        'key' => 'mlf_lng',
                        'label' => 'Longitude',
                        'name' => 'longitude',
                        'type' => 'number',
                        'instructions' => '',
                        'required' => 0,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => '',
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'min' => '',
                        'max' => '',
                        'step' => '',
                    ),
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => $this->post_type_name,
                        ),
                    ),
                ),
                'menu_order' => 0,
                'position' => 'normal',
                'style' => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'hide_on_screen' => '',
                'active' => true,
                'description' => '',
            ));

            acf_add_local_field_group(array(
                'key' => 'mlf_block_options',
                'title' => 'Map Locations Filter Block',
                'fields' => array(
                    array(
                        'key' => 'mlf_title_block',
                        'label' => 'Title',
                        'name' => 'title',
                        'type' => 'text',
                        'instructions' => '',
                        'required' => 1,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => '',
                        ),
                        'default_value' => 'Locations',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'maxlength' => '',
                    ),
                    array(
                        'key' => 'mlf_taxonomies_block',
                        'label' => 'Taxonomies',
                        'name' => 'taxonomies',
                        'type' => 'checkbox',
                        'instructions' => '',
                        'required' => 1,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => '',
                        ),
                        'choices' => array(),
                        'allow_custom' => 0,
                        'default_value' => array(),
                        'layout' => 'vertical',
                        'toggle' => 0,
                        'return_format' => 'value',
                        'save_custom' => 0,
                    ),
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'block',
                            'operator' => '==',
                            'value' => 'acf/mlf',
                        ),
                    ),
                ),
                'menu_order' => 0,
                'position' => 'normal',
                'style' => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'hide_on_screen' => '',
                'active' => true,
                'description' => '',
            ));
        }
    }

    public function acf_block( $block, $content = '', $is_preview = false, $post_id = 0 ) {
        $title = get_field('title');
        $taxonomies = get_field('taxonomies');
        $nav = mlf_get_template_part('template-mlf-nav.php', array(
            'taxonomies' => $taxonomies,
            'title' => $title,
        ));
        $container = mlf_get_template_part('template-mlf-list-locations-container.php');

        ?>
        <div class='mlf-map'></div>
        <div class='mlf-container'>
            <?=$nav; ?>
            <?=$container; ?>
        </div>
        <?php
    }

    public function acf_google_map_api($api) {
        $api['key'] = get_option('google_maps_key', '');
        return $api;
    }

    /**
     * Register the "location" custom post type
     */
    public function mlf_init() {
        $args = array(
            'label' => 'Locations',
            'public' => true,
            'show_ui' => true,
            'capability_type' => 'post',
            'hierarchical' => false,
            'rewrite' => array(
                'slug' => $this->post_type_name,
                'with_front' => false
            ),
            'query_var' => true,
            'show_in_rest' => true,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'trackbacks',
                'custom-fields',
                'revisions',
                'thumbnail',
                'author',
                'page-attributes'
            )
        );
        register_post_type(
            $this->post_type_name,
            $args,
        );
    }

    public function mlf_enqueue_scripts() {
        wp_enqueue_style('mlf-styles', plugin_dir_url(__FILE__) . '/styles.css');

        $google_map_key = get_option('google_maps_key', '');
        wp_enqueue_script(
            'mlf-google-map',
            "https://maps.googleapis.com/maps/api/js?key={$google_map_key}&libraries=&v=weekly",
            array(),
            null,
            true
        );

        wp_enqueue_script('mlf-script', plugin_dir_url(__FILE__) . 'block.js', array('jquery', 'mlf-google-map'), null, true);
        wp_localize_script(
            'mlf-script',
            'mlfData',
            array('ajaxUrl' => admin_url('admin-ajax.php'))
        );
    }

    /**
     * Activate the plugin.
     */
    public function mlf_activate() {
        flush_rewrite_rules();
    }

    /**
     * Deactivation hook.
     */
    public function mlf_deactivate() {
        unregister_post_type($this->post_type_name);
        flush_rewrite_rules();
    }

    public function mlf_menu() {
        add_submenu_page(
            'options-general.php',
            'Map Locations Filter Options',
            'MLF Options',
            'manage_options',
            'mlf-options',
            array($this, 'admin_page_contents'),
        );

        add_settings_section(
            'mlf_settings_page',
            __('Settings', 'mlf'),
            array($this, 'mlf_settings_section_callback'),
            'mlf'
        );

        foreach ($this->options as $option) {
            register_setting(
                'mlf',
                $option['name'],
                [
                    'type' => $option['name'],
                    'description' => $option['description'],
                    'sanitize_callback' => $option['sanitize_callback'],
                    'show_in_rest' => $option['show_in_rest'],
                    'default' => $option['default'],
                ]
            );

            add_settings_field(
                $option['name'],
                __($option['label'], 'mlf'),
                array($this, 'create_form_field_' . $option['type']),
                'mlf',
                'mlf_settings_page',
                array(
                    'label_for' => $option['name'],
                    'option'    => $option['name'],
                    'class'     => 'mlf_row',
                )
            );
        }
    }

    public function admin_page_contents() {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <h1>
            <?php esc_html_e('MLF Options', 'textdomain'); ?>
        </h1>
        <?php
            if (isset($_GET['settings-updated'])) {
                add_settings_error('mlf_messages', 'mlf_message', __('Settings Saved', 'mlf'), 'updated');
            }
            settings_errors( 'wporg_messages' );
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                // output security fields for the registered setting "wporg"
                settings_fields('mlf');
                // output setting sections and their fields
                // (sections are registered for "wporg", each field is registered to a specific section)
                do_settings_sections('mlf');
                // output save settings button
                submit_button('Save Settings');
                ?>
            </form>
        </div>
        <?php

    }

    public function mlf_settings_section_callback($args) {}

    public function create_form_field_string($args) {
        $value = get_option($args['option']);
        ?>
        <input
            type='text'
            id="<?php echo esc_attr($args['label_for']); ?>"
            name="<?php echo esc_attr($args['label_for']); ?>"
            value="<?php echo esc_attr($value);?>"
        />
        <?php
    }
}

new MLFPlugin();
