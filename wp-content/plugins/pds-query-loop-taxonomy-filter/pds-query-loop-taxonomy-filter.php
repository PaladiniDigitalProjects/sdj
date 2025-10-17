<?php
/**
 * Plugin Name: PDS Query Loop Taxonomy Filter
 * Plugin URI: https://example.com
 * Description: Extiende el Query Loop Block para filtrar por la taxonomía 'ámbito' primero, y si no hay, por categorías, respetando la configuración del bloque. Muestra un indicador visual del estado del filtro.
 * Version: 1.3.0
 * Author: RicardPDS
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

        // Filtro del Query Loop
        add_filter('query_loop_block_query_vars', array($this, 'filter_query_loop'), 10, 2);

        // Indicador global en la barra de administración
        add_action('admin_bar_menu', array($this, 'add_admin_bar_indicator'), 100);
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
     * Página de administración del plugin
     */
    public function admin_page() {
        $is_active = get_option('qltf_enable_filter', 1);
        ?>
        <div class="wrap">
            <h1><?php _e('Query Loop Taxonomy Filter - Configuración', 'query-loop-taxonomy-filter'); ?></h1>

            <!-- Indicador de estado -->
            <div style="margin: 10px 0; padding: 10px; border-left: 4px solid <?php echo $is_active ? '#46b450' : '#dc3232'; ?>; background: #fff;">
                <?php if ($is_active): ?>
                    <strong style="color:#46b450;">✅ <?php _e('Filtrado de taxonomías activo', 'query-loop-taxonomy-filter'); ?></strong>
                <?php else: ?>
                    <strong style="color:#dc3232;">❌ <?php _e('Filtrado de taxonomías desactivado', 'query-loop-taxonomy-filter'); ?></strong>
                <?php endif; ?>
            </div>

            <form method="post" action="options.php">
                <?php settings_fields('qltf_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Activar filtro por taxonomía', 'query-loop-taxonomy-filter'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="qltf_enable_filter" value="1"
                                    <?php checked($is_active, 1); ?> />
                                <?php _e('Filtrar Query Loop blocks por "ámbito" o categorías del post actual', 'query-loop-taxonomy-filter'); ?>
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
     * Indicador global en la barra de administración
     */
    public function add_admin_bar_indicator($wp_admin_bar) {
        if (!current_user_can('manage_options')) {
            return;
        }

        $is_active = get_option('qltf_enable_filter', 1);
        $color = $is_active ? '#46b450' : '#dc3232';
        $text = $is_active
            ? '✅ Filtrado taxonomías activo'
            : '❌ Filtrado taxonomías desactivado';

        $args = array(
            'id'    => 'qltf_status',
            'title' => '<span style="color:' . esc_attr($color) . '; font-weight:bold;">' . esc_html($text) . '</span>',
            'href'  => admin_url('options-general.php?page=query-loop-taxonomy-filter'),
            'meta'  => array('class' => 'qltf-status-indicator')
        );

        $wp_admin_bar->add_node($args);
    }

    /**
     * Obtiene la taxonomía según prioridad:
     * 1. ámbito (todas las etiquetas)
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

        // 1️⃣ Intentar primero con todas las etiquetas "ámbito"
        $tags = wp_get_post_terms($post->ID, 'ambito');
        if (!empty($tags) && !is_wp_error($tags)) {
            $tag_ids = wp_list_pluck($tags, 'term_id');
            return array(
                'taxonomy' => 'ambito',
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

        // Añadir el filtro de taxonomía detectado
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


/**
 * 🔍 Show console message for logged-in users (frontend only)
 */
add_action('wp_footer', function() {
    // Show only to logged-in users, and not in admin
    if (!is_user_logged_in() || is_admin()) {
        return;
    }

    $is_active = get_option('qltf_enable_filter', 1);

    $message = $is_active
        ? '✅ [PDS Query Loop Filter] Taxonomy filtering is ACTIVE.'
        : '❌ [PDS Query Loop Filter] Taxonomy filtering is INACTIVE.';

    $color = $is_active ? 'green' : 'red';
    ?>
    <script>
        console.log('%c<?php echo esc_js($message); ?>', 'color: <?php echo esc_js($color); ?>; font-weight:bold;');
    </script>
    <?php
});
