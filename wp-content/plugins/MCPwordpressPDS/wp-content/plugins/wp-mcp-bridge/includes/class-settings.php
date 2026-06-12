<?php

class WP_MCP_Settings {
    const OPTION_NAME = 'wp_mcp_enabled_groups';
    const VERSION = '0.4.0';

    const GROUPS = array(
        'posts' => array(
            'label' => 'Posts & Pages',
            'description' => 'Gestión de posts, páginas, meta fields y taxonomías',
            'endpoints' => 4,
            'routes' => array(
                '/posts',
                '/posts/(?P<id>\d+)',
                '/posts/(?P<id>\d+)/meta',
                '/posts/(?P<id>\d+)/terms'
            )
        ),
        'products' => array(
            'label' => 'WooCommerce Products',
            'description' => 'Gestión de productos WooCommerce',
            'endpoints' => 2,
            'routes' => array(
                '/products',
                '/products/(?P<id>\d+)'
            )
        ),
        'plugins' => array(
            'label' => 'Plugins & Themes',
            'description' => 'Instalación y gestión de plugins y temas',
            'endpoints' => 7,
            'routes' => array(
                '/plugins',
                '/plugins/install',
                '/plugins/activate',
                '/plugins/deactivate',
                '/plugins/(?P<slug>[a-z0-9-]+)',
                '/themes',
                '/themes/install',
                '/themes/activate'
            )
        ),
        'options' => array(
            'label' => 'WordPress Options',
            'description' => 'Lectura y modificación de opciones de WP',
            'endpoints' => 1,
            'routes' => array(
                '/options/(?P<key>.+)'
            )
        ),
        'system' => array(
            'label' => 'System',
            'description' => 'Info del sitio y flushing de caché',
            'endpoints' => 2,
            'routes' => array(
                '/info',
                '/cache/flush'
            )
        ),
        'blocks' => array(
            'label' => 'Blocks & Patterns',
            'description' => 'Gutenberg blocks, patrones y synced patterns',
            'endpoints' => 5,
            'routes' => array(
                '/blocks/types',
                '/blocks/patterns',
                '/blocks/synced',
                '/blocks/synced/(?P<id>\d+)',
                '/posts/(?P<id>\d+)/blocks'
            )
        )
    );

    public static function is_group_enabled($group) {
        $enabled_groups = self::get_enabled_groups();
        return isset($enabled_groups[$group]) && $enabled_groups[$group] === true;
    }

    public static function get_enabled_groups() {
        $defaults = self::get_defaults();
        $saved = get_option(self::OPTION_NAME, array());
        
        if (empty($saved)) {
            return $defaults;
        }

        return wp_parse_args($saved, $defaults);
    }

    public static function set_enabled_groups($groups) {
        $defaults = self::get_defaults();
        $groups = wp_parse_args($groups, $defaults);
        
        return update_option(self::OPTION_NAME, $groups);
    }

    public static function get_defaults() {
        $defaults = array();
        foreach (self::GROUPS as $key => $group) {
            $defaults[$key] = true;
        }
        return $defaults;
    }

    public static function get_all_groups() {
        return self::GROUPS;
    }

    public static function get_stats() {
        $enabled = self::get_enabled_groups();
        $total_groups = count(self::GROUPS);
        $total_endpoints = 0;
        $enabled_groups_count = 0;
        $enabled_endpoints = 0;

        foreach (self::GROUPS as $key => $group) {
            $total_endpoints += $group['endpoints'];
            if (!empty($enabled[$key])) {
                $enabled_groups_count++;
                $enabled_endpoints += $group['endpoints'];
            }
        }

        return array(
            'total_groups' => $total_groups,
            'total_endpoints' => $total_endpoints,
            'enabled_groups' => $enabled_groups_count,
            'enabled_endpoints' => $enabled_endpoints
        );
    }
}
