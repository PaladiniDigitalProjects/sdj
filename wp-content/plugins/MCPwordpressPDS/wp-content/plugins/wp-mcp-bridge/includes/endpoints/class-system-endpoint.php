<?php

class WP_MCP_System_Endpoint {
    public static function flush_cache() {
        global $wpdb;

        $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%'");
        $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_site_transient_%'");

        flush_rewrite_rules();

        return WP_MCP_Response::success(array('flushed' => true), 'Cache flushed successfully');
    }

    public static function get_info() {
        $theme = wp_get_theme();

        $active_plugins = get_option('active_plugins', array());
        $plugins = array();
        
        foreach ($active_plugins as $plugin) {
            $plugins[] = $plugin;
        }

        return WP_MCP_Response::success(array(
            'version' => get_bloginfo('version'),
            'php_version' => PHP_VERSION,
            'language' => get_bloginfo('language'),
            'charset' => get_bloginfo('charset'),
            'url' => get_bloginfo('url'),
            'name' => get_bloginfo('name'),
            'active_theme' => $theme->get('Name'),
            'active_theme_version' => $theme->get('Version'),
            'active_plugins' => $plugins,
            'debug_mode' => (bool) WP_DEBUG,
        ));
    }
}
