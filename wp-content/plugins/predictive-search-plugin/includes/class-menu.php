<?php
/**
 * Insertar el buscador como un ítem más de los menús elegidos en el admin.
 *
 * Se añade al pintar la página (no se guarda en el menú): en los menús de
 * bloques (wp_navigation) con el mismo marcado que un core/navigation-link,
 * y en los clásicos (wp_nav_menu) como un li.menu-item. Lleva la clase
 * search-nav, así que lo abre el mismo JS que ya abría el overlay global.
 */

if (!defined('ABSPATH')) {
    exit;
}

class PS_Menu {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_filter('render_block_core/navigation', array($this, 'inject_block_navigation'), 10, 2);
        add_filter('wp_nav_menu_items', array($this, 'inject_classic_menu'), 10, 2);
        add_action('update_option_ps_menu_label', array($this, 'register_label_string'), 10, 2);
        add_action('add_option_ps_menu_label', array($this, 'register_label_string'), 10, 2);
    }

    /**
     * Menús elegidos: 'nav:<ID>' (wp_navigation) o 'classic:<term_id>'
     */
    private function targets() {
        return (array) get_option('ps_menu_targets', array());
    }

    private function position() {
        return get_option('ps_menu_position', 'end') === 'start' ? 'start' : 'end';
    }

    private function display() {
        $display = get_option('ps_menu_display', 'both');
        return in_array($display, array('icon', 'text', 'both'), true) ? $display : 'both';
    }

    private function label() {
        $label = get_option('ps_menu_label', '');
        if ($label === '') {
            $label = __('Buscar', 'predictive-search');
        }
        // Traducible desde WPML → Traducción de cadenas
        return apply_filters('wpml_translate_single_string', $label, 'predictive-search', 'Menu label');
    }

    public function register_label_string($old_value, $value = null) {
        // add_option pasa (nombre, valor); update_option pasa (viejo, nuevo)
        $label = is_string($value) ? $value : $old_value;
        if (is_string($label) && $label !== '') {
            do_action('wpml_register_single_string', 'predictive-search', 'Menu label', $label);
        }
    }

    /**
     * Contenido del <a>: icono y/o texto. Con solo icono, el texto queda
     * oculto a la vista pero lo siguen leyendo los lectores de pantalla.
     */
    private function link_inner($label_class) {
        $display = $this->display();
        $html    = '';
        if ($display !== 'text') {
            $html .= '<span class="ps-menu-item__icon" aria-hidden="true">'
                . '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
                . '</span>';
        }
        $classes = $label_class . ($display === 'icon' ? ' ps-visually-hidden' : '');
        $html   .= '<span class="' . esc_attr(trim($classes)) . '">' . esc_html($this->label()) . '</span>';
        return $html;
    }

    private function item_classes($extra) {
        return trim($extra . ' search-nav ps-menu-item ps-menu-item--' . $this->display());
    }

    /**
     * Menú de bloques: el li va dentro del ul.wp-block-navigation__container
     * de primer nivel, al principio o al final
     */
    public function inject_block_navigation($content, $block) {
        $ref = isset($block['attrs']['ref']) ? (int) $block['attrs']['ref'] : 0;
        if (!$ref || !in_array('nav:' . $ref, $this->targets(), true)) {
            return $content;
        }
        if (!preg_match('/<ul[^>]*class="[^"]*wp-block-navigation__container[^"]*"[^>]*>/', $content, $open, PREG_OFFSET_CAPTURE)) {
            return $content;
        }
        $open_end = $open[0][1] + strlen($open[0][0]);

        // Mismas clases de tamaño y color que el primer ítem del menú
        $inherit = '';
        if (preg_match('/<li[^>]*class="([^"]*)"/', $content, $first_li, 0, $open_end)) {
            $inherit = implode(' ', preg_grep('/^has-[a-z0-9-]+-(font-size|color)$/', explode(' ', $first_li[1])));
        }

        $li = '<li class="' . esc_attr($this->item_classes('wp-block-navigation-item wp-block-navigation-link ' . $inherit)) . '">'
            . '<a class="wp-block-navigation-item__content" href="#" role="button" data-ps-trigger>'
            . $this->link_inner('wp-block-navigation-item__label')
            . '</a></li>';

        if ($this->position() === 'start') {
            return substr_replace($content, $li, $open_end, 0);
        }
        // Cierre del mismo ul, contando anidados. No vale el último </ul>
        // del bloque: con un overlay personalizado, dentro va otra
        // navegación (la del móvil) y el ítem acababa ahí
        $close = $this->matching_ul_close($content, $open_end);
        return $close === false ? $content : substr_replace($content, $li, $close, 0);
    }

    private function matching_ul_close($content, $offset) {
        $depth = 1;
        while (preg_match('#<(/?)ul\b#i', $content, $tag, PREG_OFFSET_CAPTURE, $offset)) {
            $depth += $tag[1][0] === '/' ? -1 : 1;
            if ($depth === 0) {
                return $tag[0][1];
            }
            $offset = $tag[0][1] + strlen($tag[0][0]);
        }
        return false;
    }

    /**
     * Menú clásico (wp_nav_menu)
     */
    public function inject_classic_menu($items, $args) {
        $menu = isset($args->menu) ? wp_get_nav_menu_object($args->menu) : false;
        if (!$menu && !empty($args->theme_location)) {
            $locations = get_nav_menu_locations();
            if (isset($locations[$args->theme_location])) {
                $menu = wp_get_nav_menu_object($locations[$args->theme_location]);
            }
        }
        if (!$menu || !in_array('classic:' . $menu->term_id, $this->targets(), true)) {
            return $items;
        }

        $li = '<li class="' . esc_attr($this->item_classes('menu-item menu-item-type-custom')) . '">'
            . '<a href="#" role="button" data-ps-trigger>' . $this->link_inner('ps-menu-item__label') . '</a></li>';

        return $this->position() === 'start' ? $li . $items : $items . $li;
    }

    /**
     * Idiomas activos de WPML (código => nombre). Sin WPML, uno vacío.
     */
    public static function languages() {
        $active = apply_filters('wpml_active_languages', null, array('skip_missing' => 0));
        if (empty($active) || !is_array($active)) {
            return array('' => '');
        }
        $languages = array();
        foreach ($active as $code => $lang) {
            $languages[$code] = !empty($lang['translated_name']) ? $lang['translated_name'] : (!empty($lang['native_name']) ? $lang['native_name'] : $code);
        }
        return $languages;
    }

    /**
     * Menús disponibles para el admin, agrupados por tipo, con su idioma
     */
    public static function available_menus() {
        $menus = array('nav' => array(), 'classic' => array());

        $navs = get_posts(array(
            'post_type'        => 'wp_navigation',
            'post_status'      => 'publish',
            'numberposts'      => -1,
            'orderby'          => 'title',
            'order'            => 'ASC',
            'suppress_filters' => true, // todos los idiomas de WPML
        ));
        foreach ($navs as $nav) {
            $menus['nav']['nav:' . $nav->ID] = array(
                'name' => $nav->post_title !== '' ? $nav->post_title : '#' . $nav->ID,
                'lang' => (string) apply_filters('wpml_element_language_code', null, array('element_id' => $nav->ID, 'element_type' => 'wp_navigation')),
            );
        }

        foreach (wp_get_nav_menus() as $menu) {
            $menus['classic']['classic:' . $menu->term_id] = array(
                'name' => $menu->name,
                'lang' => (string) apply_filters('wpml_element_language_code', null, array('element_id' => $menu->term_taxonomy_id, 'element_type' => 'nav_menu')),
            );
        }

        return $menus;
    }
}
