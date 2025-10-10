<?php
/**
 * Plugin Name: PDS Query Loop Taxonomy Filter
 * Plugin URI: https://example.com
 * Description: Extiende el Query Loop Block para filtrar por las etiquetas primero, y si no hay por categorías, respetando la configuración del bloque.
 * Version: 1.2.0
 * Author: Tu Nombre
 * License: GPL v2 or later
 * Text Domain: query-loop-taxonomy-filter
 */

if (!defined('ABSPATH')) {
    exit;
}

class Query_Loop_Taxonomy_Filter {

    public function __construct() {
        // Admin settings
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));

        // Filtro para modificar el Query Loop
        add_filter('query_loop_block_query_vars', array($this, 'filter_query_loop'), 10, 2);
    }

    /**
     * Añade menú de administración
     */
    public function add_admin_menu() {
        add_options_page(
            __('Query Loop Taxonomy Filter', 'query-loop-taxonomy-filter'),
            __('Query Loop Filter', 'query-loop-taxonomy-filter'),
            'manage_options',
            'query-loop-taxonomy-filter',
            array($this, 'admin_page')
        );
    }

    /**
     * Registra las opciones del plugin con sanitización
     */
    public function register_settings() {
        register_setting('qltf_settings', 'qltf_enable_filter', array(
            'sanitize_callback' => 'absint'
        ));

        register_setting('qltf_settings', 'qltf_post_types', array(
            'sanitize_callback' => function($input) {
                return array_map('sanitize_text_field', (array) $input);
            }
        ));
    }

    /**
     * Página de administración
     */
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('Query Loop Taxonomy Filter - Configuración', 'query-loop-taxonomy-filter'); ?></h1>
            <form method="post" action="options.php">
                <?php settings_fields('qltf_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Activar filtro por taxonomía', 'query-loop-taxonomy-filter'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="qltf_enable_filter" value="1"
                                    <?php checked(get_option('qltf_enable_filter', 1), 1); ?> />
                                <?php _e('Filtrar Query Loop blocks por etiquetas o categorías del post actual', 'query-loop-taxonomy-filter'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Post Types habilitados', 'query-loop-taxonomy-filter'); ?></th>
                        <td>
                            <?php
                            $post_types = get_post_types(array('public' => true), 'objects');
                            $enabled_types = get_option('qltf_post_types', array('post', 'page'));
                            if (!is_array($enabled_types)) $enabled_types = array('post', 'page');

                            foreach ($post_types as $type) {
                                if ($type->name !== 'attachment') {
                                    ?>
                                    <label style="display: block; margin-bottom: 5px;">
                                        <input type="checkbox" name="qltf_post_types[]"
                                            value="<?php echo esc_attr($type->name); ?>"
                                            <?php checked(in_array($type->name, $enabled_types)); ?> />
                                        <?php echo esc_html($type->label); ?>
                                    </label>
                                    <?php
                                }
                            }
                            ?>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    /**
     * Obtiene la taxonomía según prioridad:
     * 1. post_tag (todas las etiquetas)
     * 2. category (todas las categorías)
     */
    private function get_taxonomy_priority() {
        global $post;

        // Fallback para editor de bloques
        if (!$post && defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && $_REQUEST['context'] === 'edit') {
            $post_id = isset($_REQUEST['post_id']) ? intval($_REQUEST['post_id']) : 0;
            if ($post_id) {
                $post = get_post($post_id);
            }
        }

        if (!$post) return null;

        // Verificar si el filtro está activado
        if (!get_option('qltf_enable_filter', 1)) return null;

        // Verificar si el post type está habilitado
        $enabled_types = get_option('qltf_post_types', array('post', 'page'));
        if (!is_array($enabled_types)) $enabled_types = array('post', 'page');

        if (!in_array($post->post_type, $enabled_types)) return null;

        // 1️⃣ Intentar primero con todas las etiquetas
        $tags = wp_get_post_terms($post->ID, 'post_tag');
        if (!empty($tags) && !is_wp_error($tags)) {
            $tag_ids = wp_list_pluck($tags, 'term_id');
            return array(
                'taxonomy' => 'post_tag',
                'terms' => $tag_ids
            );
        }

        // 2️⃣ Si no hay etiquetas, intentar con todas las categorías
        $cats = wp_get_post_terms($post->ID, 'category');
        if (!empty($cats) && !is_wp_error($cats)) {
            $cat_ids = wp_list_pluck($cats, 'term_id');
            return array(
                'taxonomy' => 'category',
                'terms' => $cat_ids
            );
        }

        return null;
    }

    /**
     * Filtra el Query Loop Block
     */
    public function filter_query_loop($query, $block) {
        global $post;

        // Aplicar solo en singular o editor de plantillas
        if (
            !is_singular() &&
            !(defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && $_REQUEST['context'] === 'edit')
        ) {
            return $query;
        }

        // 🚫 Si el bloque ya tiene un filtro de taxonomía definido, no tocarlo
        if (!empty($query['tax_query'])) {
            return $query;
        }

        $taxonomy_data = $this->get_taxonomy_priority();
        if (!$taxonomy_data) return $query;

        // Excluir el post actual
        if (!isset($query['post__not_in'])) $query['post__not_in'] = array();
        if ($post && !in_array($post->ID, $query['post__not_in'])) {
            $query['post__not_in'][] = $post->ID;
        }

        // Añadir el filtro de taxonomía detectado (todas las etiquetas o categorías)
        $query['tax_query'][] = array(
            'taxonomy' => $taxonomy_data['taxonomy'],
            'field' => 'term_id',
            'terms' => $taxonomy_data['terms'],
            'operator' => 'IN',
        );

        return $query;
    }
}

// Inicializar el plugin
new Query_Loop_Taxonomy_Filter();
