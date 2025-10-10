<?php
/**
 * Plugin Name: Terms Ver Más
 * Plugin URI: https://devsjd.com
 * Description: Plugin que modifica get_the_terms para añadir un botón "Ver más" cuando hay más de 10 términos, ocultando las categorías restantes.
 * Version: 1.0.0
 * Author: DEVSJD
 * Author URI: https://devsjd.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: terms-ver-mas
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Definir constantes del plugin
define('TERMS_VER_MAS_VERSION', '1.0.0');
define('TERMS_VER_MAS_PLUGIN_FILE', __FILE__);
define('TERMS_VER_MAS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TERMS_VER_MAS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Clase principal del plugin
 */
class Terms_Ver_Mas {
    
    /**
     * Instancia única del plugin
     */
    private static $instance = null;
    
    /**
     * Obtener instancia única del plugin
     */
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor privado para patrón singleton
     */
    private function __construct() {
        $this->init();
    }
    
    /**
     * Inicializar el plugin
     */
    private function init() {
        // Hooks de activación y desactivación
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Encolar scripts y estilos
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Modificar get_the_terms para añadir funcionalidad "Ver más"
        add_filter('get_the_terms', array($this, 'modify_get_the_terms'), 10, 3);
        
        // Modificar el output de términos
        add_filter('the_terms', array($this, 'modify_terms_output'), 10, 3);
        
        // Handler AJAX
        add_action('wp_ajax_get_all_terms', array($this, 'ajax_get_all_terms'));
        add_action('wp_ajax_nopriv_get_all_terms', array($this, 'ajax_get_all_terms'));
        
        // Shortcode
        add_shortcode('terms_ver_mas', array($this, 'shortcode_terms_ver_mas'));
        
        // Widget
        add_action('widgets_init', array($this, 'register_widget'));
        
        // Admin
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    /**
     * Activar plugin
     */
    public function activate() {
        // Crear opciones por defecto
        add_option('terms_ver_mas_version', TERMS_VER_MAS_VERSION);
        add_option('terms_ver_mas_limit', 10);
        add_option('terms_ver_mas_excluded_terms', array('ohsjd'));
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Desactivar plugin
     */
    public function deactivate() {
        // Limpiar cache
        wp_cache_flush();
    }
    
    /**
     * Encolar scripts y estilos
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'terms-ver-mas-js',
            TERMS_VER_MAS_PLUGIN_URL . 'assets/js/terms-ver-mas.js',
            array('jquery'),
            TERMS_VER_MAS_VERSION,
            true
        );
        
        wp_enqueue_style(
            'terms-ver-mas-css',
            TERMS_VER_MAS_PLUGIN_URL . 'assets/css/terms-ver-mas.css',
            array(),
            TERMS_VER_MAS_VERSION
        );
        
        // Localizar script para AJAX
        wp_localize_script('terms-ver-mas-js', 'termsVerMas', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('terms_ver_mas_nonce'),
            'limit' => get_option('terms_ver_mas_limit', 10),
            'strings' => array(
                'verMas' => __('Ver más...', 'terms-ver-mas'),
                'verMenos' => __('Ver menos', 'terms-ver-mas'),
                'cargando' => __('Cargando...', 'terms-ver-mas')
            )
        ));
    }
    
    /**
     * Modificar get_the_terms para añadir funcionalidad "Ver más"
     */
    public function modify_get_the_terms($terms, $post_id, $taxonomy) {
        if (!empty($terms) && is_array($terms)) {
            // Obtener términos excluidos
            $excluded_terms = get_option('terms_ver_mas_excluded_terms', array('ohsjd'));
            $limit = get_option('terms_ver_mas_limit', 10);
            
            // Filtrar términos excluidos
            foreach ($terms as $key => $term) {
                if (in_array($term->slug, $excluded_terms) || in_array(strtolower($term->name), $excluded_terms)) {
                    unset($terms[$key]);
                }
            }
            
            $terms = array_values($terms);
            
            // Si hay más términos que el límite, añadir "Ver más"
            if (count($terms) > $limit) {
                // Crear término personalizado para "Ver más"
                $ver_mas_term = new stdClass();
                $ver_mas_term->term_id = 'ver_mas_' . $post_id . '_' . $taxonomy;
                $ver_mas_term->name = __('Ver más...', 'terms-ver-mas');
                $ver_mas_term->slug = 'ver-mas-' . $post_id . '-' . $taxonomy;
                $ver_mas_term->taxonomy = $taxonomy;
                $ver_mas_term->description = '';
                $ver_mas_term->parent = 0;
                $ver_mas_term->count = count($terms) - $limit;
                $ver_mas_term->filter = 'raw';
                $ver_mas_term->meta_value = count($terms) - $limit;
                $ver_mas_term->is_ver_mas = true; // Flag personalizado
                
                // Limitar términos visibles
                $visible_terms = array_slice($terms, 0, $limit);
                $visible_terms[] = $ver_mas_term;
                
                return $visible_terms;
            }
        }
        
        return $terms;
    }
    
    /**
     * Modificar el output de términos
     */
    public function modify_terms_output($term_list, $post_id, $taxonomy) {
        if (empty($term_list)) {
            return $term_list;
        }
        
        // Verificar si hay un término "Ver más"
        if (strpos($term_list, 'ver-mas-') !== false) {
            // Envolver con contenedor especial
            $term_list = '<div class="terms-ver-mas-container" data-post-id="' . esc_attr($post_id) . '" data-taxonomy="' . esc_attr($taxonomy) . '">' . $term_list . '</div>';
        }
        
        return $term_list;
    }
    
    /**
     * Handler AJAX para obtener todos los términos
     */
    public function ajax_get_all_terms() {
        // Verificar nonce
        if (!wp_verify_nonce($_POST['nonce'], 'terms_ver_mas_nonce')) {
            wp_send_json_error(__('Error de seguridad', 'terms-ver-mas'));
        }
        
        $post_id = intval($_POST['post_id']);
        $taxonomy = sanitize_text_field($_POST['taxonomy']);
        
        if (!$post_id || !$taxonomy) {
            wp_send_json_error(__('Parámetros inválidos', 'terms-ver-mas'));
        }
        
        // Obtener todos los términos
        $terms = get_the_terms($post_id, $taxonomy);
        
        if (is_wp_error($terms) || empty($terms)) {
            wp_send_json_error(__('No se encontraron términos', 'terms-ver-mas'));
        }
        
        // Filtrar términos excluidos
        $excluded_terms = get_option('terms_ver_mas_excluded_terms', array('ohsjd'));
        $filtered_terms = array();
        
        foreach ($terms as $term) {
            if (!in_array($term->slug, $excluded_terms) && !in_array(strtolower($term->name), $excluded_terms)) {
                $filtered_terms[] = $term;
            }
        }
        
        // Generar HTML
        $term_list = '';
        foreach ($filtered_terms as $term) {
            $term_list .= '<a href="' . esc_url(get_term_link($term)) . '" class="term-link">' . esc_html($term->name) . '</a>';
        }
        
        wp_send_json_success($term_list);
    }
    
    /**
     * Shortcode para mostrar términos con "Ver más"
     */
    public function shortcode_terms_ver_mas($atts) {
        $atts = shortcode_atts(array(
            'post_id' => get_the_ID(),
            'taxonomy' => 'category',
            'limit' => get_option('terms_ver_mas_limit', 10),
            'separator' => ', ',
            'class' => 'terms-ver-mas-container',
            'show_count' => false,
            'exclude' => ''
        ), $atts);
        
        $post_id = intval($atts['post_id']);
        $taxonomy = sanitize_text_field($atts['taxonomy']);
        $limit = intval($atts['limit']);
        $separator = $atts['separator'];
        $class = sanitize_html_class($atts['class']);
        $show_count = filter_var($atts['show_count'], FILTER_VALIDATE_BOOLEAN);
        $exclude = sanitize_text_field($atts['exclude']);
        
        if (!$post_id || !$taxonomy) {
            return '<p>' . __('Error: Parámetros inválidos', 'terms-ver-mas') . '</p>';
        }
        
        $terms = get_the_terms($post_id, $taxonomy);
        
        if (is_wp_error($terms) || empty($terms)) {
            return '';
        }
        
        // Filtrar términos excluidos
        $excluded_terms = array_merge(
            get_option('terms_ver_mas_excluded_terms', array('ohsjd')),
            !empty($exclude) ? explode(',', $exclude) : array()
        );
        
        $filtered_terms = array();
        foreach ($terms as $term) {
            if (!in_array($term->slug, $excluded_terms) && !in_array(strtolower($term->name), $excluded_terms)) {
                $filtered_terms[] = $term;
            }
        }
        
        if (empty($filtered_terms)) {
            return '';
        }
        
        $term_links = array();
        $total_terms = count($filtered_terms);
        
        // Mostrar términos según el límite
        $terms_to_show = array_slice($filtered_terms, 0, $limit);
        
        foreach ($terms_to_show as $term) {
            $link_text = esc_html($term->name);
            if ($show_count) {
                $link_text .= ' (' . $term->count . ')';
            }
            $term_links[] = '<a href="' . esc_url(get_term_link($term)) . '">' . $link_text . '</a>';
        }
        
        $output = '<div class="' . $class . '" data-post-id="' . $post_id . '" data-taxonomy="' . $taxonomy . '">';
        $output .= implode($separator, $term_links);
        
        // Si hay más términos, añadir botón "Ver más"
        if ($total_terms > $limit) {
            $hidden_count = $total_terms - $limit;
            $output .= $separator . '<button type="button" class="terms-ver-mas-btn" data-hidden-count="' . $hidden_count . '">';
            $output .= sprintf(__('Ver más (%d)...', 'terms-ver-mas'), $hidden_count);
            $output .= '</button>';
        }
        
        $output .= '</div>';
        
        return $output;
    }
    
    /**
     * Registrar widget
     */
    public function register_widget() {
        register_widget('Terms_Ver_Mas_Widget');
    }
    
    /**
     * Añadir menú de administración
     */
    public function add_admin_menu() {
        add_options_page(
            __('Terms Ver Más', 'terms-ver-mas'),
            __('Terms Ver Más', 'terms-ver-mas'),
            'manage_options',
            'terms-ver-mas',
            array($this, 'admin_page')
        );
    }
    
    /**
     * Página de administración
     */
    public function admin_page() {
        if (isset($_POST['submit'])) {
            // Guardar configuración
            $limit = intval($_POST['limit']);
            $excluded_terms = array_map('trim', explode(',', sanitize_text_field($_POST['excluded_terms'])));
            
            update_option('terms_ver_mas_limit', $limit);
            update_option('terms_ver_mas_excluded_terms', $excluded_terms);
            
            echo '<div class="notice notice-success"><p>' . __('Configuración guardada.', 'terms-ver-mas') . '</p></div>';
        }
        
        $limit = get_option('terms_ver_mas_limit', 10);
        $excluded_terms = get_option('terms_ver_mas_excluded_terms', array('ohsjd'));
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="limit"><?php _e('Límite de términos', 'terms-ver-mas'); ?></label>
                        </th>
                        <td>
                            <input type="number" id="limit" name="limit" value="<?php echo esc_attr($limit); ?>" min="1" max="50" class="small-text">
                            <p class="description"><?php _e('Número de términos a mostrar antes de mostrar "Ver más"', 'terms-ver-mas'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="excluded_terms"><?php _e('Términos excluidos', 'terms-ver-mas'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="excluded_terms" name="excluded_terms" value="<?php echo esc_attr(implode(', ', $excluded_terms)); ?>" class="regular-text">
                            <p class="description"><?php _e('Separar con comas los slugs o nombres de términos a excluir', 'terms-ver-mas'); ?></p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <h2><?php _e('Uso del Plugin', 'terms-ver-mas'); ?></h2>
            <div class="card">
                <h3><?php _e('Shortcode', 'terms-ver-mas'); ?></h3>
                <p><?php _e('Usa el shortcode [terms_ver_mas] en cualquier lugar:', 'terms-ver-mas'); ?></p>
                <code>[terms_ver_mas taxonomy="category" limit="5" separator=" | " show_count="true"]</code>
                
                <h3><?php _e('Parámetros del Shortcode', 'terms-ver-mas'); ?></h3>
                <ul>
                    <li><strong>post_id</strong>: ID del post (por defecto: post actual)</li>
                    <li><strong>taxonomy</strong>: Taxonomía (por defecto: "category")</li>
                    <li><strong>limit</strong>: Límite de términos (por defecto: valor configurado)</li>
                    <li><strong>separator</strong>: Separador entre términos (por defecto: ", ")</li>
                    <li><strong>class</strong>: Clase CSS personalizada</li>
                    <li><strong>show_count</strong>: Mostrar conteo de posts (true/false)</li>
                    <li><strong>exclude</strong>: Términos adicionales a excluir (separados por comas)</li>
                </ul>
            </div>
        </div>
        <?php
    }
}

/**
 * Widget para mostrar términos con "Ver más"
 */
class Terms_Ver_Mas_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'terms_ver_mas_widget',
            __('Términos con Ver Más', 'terms-ver-mas'),
            array('description' => __('Muestra términos de una taxonomía con funcionalidad "Ver más"', 'terms-ver-mas'))
        );
    }
    
    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        $shortcode_atts = array(
            'post_id' => !empty($instance['post_id']) ? $instance['post_id'] : get_the_ID(),
            'taxonomy' => !empty($instance['taxonomy']) ? $instance['taxonomy'] : 'category',
            'limit' => !empty($instance['limit']) ? $instance['limit'] : get_option('terms_ver_mas_limit', 10),
            'separator' => !empty($instance['separator']) ? $instance['separator'] : ', ',
            'class' => 'terms-ver-mas-container widget-terms',
            'show_count' => !empty($instance['show_count']) ? $instance['show_count'] : false
        );
        
        $shortcode_string = '[terms_ver_mas';
        foreach ($shortcode_atts as $key => $value) {
            if (is_bool($value)) {
                $shortcode_string .= ' ' . $key . '="' . ($value ? 'true' : 'false') . '"';
            } else {
                $shortcode_string .= ' ' . $key . '="' . esc_attr($value) . '"';
            }
        }
        $shortcode_string .= ']';
        
        echo do_shortcode($shortcode_string);
        
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : '';
        $taxonomy = !empty($instance['taxonomy']) ? $instance['taxonomy'] : 'category';
        $limit = !empty($instance['limit']) ? $instance['limit'] : get_option('terms_ver_mas_limit', 10);
        $separator = !empty($instance['separator']) ? $instance['separator'] : ', ';
        $show_count = !empty($instance['show_count']) ? $instance['show_count'] : false;
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Título:', 'terms-ver-mas'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('taxonomy'); ?>"><?php _e('Taxonomía:', 'terms-ver-mas'); ?></label>
            <select class="widefat" id="<?php echo $this->get_field_id('taxonomy'); ?>" name="<?php echo $this->get_field_name('taxonomy'); ?>">
                <option value="category" <?php selected($taxonomy, 'category'); ?>><?php _e('Categorías', 'terms-ver-mas'); ?></option>
                <option value="post_tag" <?php selected($taxonomy, 'post_tag'); ?>><?php _e('Etiquetas', 'terms-ver-mas'); ?></option>
                <?php
                $custom_taxonomies = get_taxonomies(array('public' => true, '_builtin' => false), 'objects');
                foreach ($custom_taxonomies as $custom_taxonomy) {
                    echo '<option value="' . esc_attr($custom_taxonomy->name) . '" ' . selected($taxonomy, $custom_taxonomy->name, false) . '>' . esc_html($custom_taxonomy->label) . '</option>';
                }
                ?>
            </select>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('limit'); ?>"><?php _e('Límite inicial:', 'terms-ver-mas'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('limit'); ?>" name="<?php echo $this->get_field_name('limit'); ?>" type="number" min="1" max="50" value="<?php echo esc_attr($limit); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('separator'); ?>"><?php _e('Separador:', 'terms-ver-mas'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('separator'); ?>" name="<?php echo $this->get_field_name('separator'); ?>" type="text" value="<?php echo esc_attr($separator); ?>">
        </p>
        <p>
            <label>
                <input type="checkbox" id="<?php echo $this->get_field_id('show_count'); ?>" name="<?php echo $this->get_field_name('show_count'); ?>" value="1" <?php checked($show_count, 1); ?>>
                <?php _e('Mostrar conteo de posts', 'terms-ver-mas'); ?>
            </label>
        </p>
        <?php
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['taxonomy'] = (!empty($new_instance['taxonomy'])) ? sanitize_text_field($new_instance['taxonomy']) : 'category';
        $instance['limit'] = (!empty($new_instance['limit'])) ? intval($new_instance['limit']) : get_option('terms_ver_mas_limit', 10);
        $instance['separator'] = (!empty($new_instance['separator'])) ? sanitize_text_field($new_instance['separator']) : ', ';
        $instance['show_count'] = (!empty($new_instance['show_count'])) ? true : false;
        return $instance;
    }
}

// Inicializar el plugin
Terms_Ver_Mas::get_instance();

