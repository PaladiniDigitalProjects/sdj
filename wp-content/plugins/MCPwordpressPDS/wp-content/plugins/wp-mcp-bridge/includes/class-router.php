<?php

require_once plugin_dir_path(__FILE__) . 'class-settings.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-posts-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-products-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-plugins-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-themes-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-options-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-system-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'endpoints/class-blocks-endpoint.php';

class WP_MCP_Router {
    private $namespace = 'mcp/v1';

    public function register_routes() {
        if (WP_MCP_Settings::is_group_enabled('posts')) {
            $this->register_posts_routes();
        }

        if (WP_MCP_Settings::is_group_enabled('products')) {
            $this->register_products_routes();
        }

        if (WP_MCP_Settings::is_group_enabled('plugins')) {
            $this->register_plugins_routes();
            $this->register_themes_routes();
        }

        if (WP_MCP_Settings::is_group_enabled('options')) {
            $this->register_options_routes();
        }

        if (WP_MCP_Settings::is_group_enabled('system')) {
            $this->register_system_routes();
        }

        if (WP_MCP_Settings::is_group_enabled('blocks')) {
            $this->register_blocks_routes();
        }
    }

    private function register_posts_routes() {
        register_rest_route($this->namespace, '/posts', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Posts_Endpoint', 'get_items'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Posts_Endpoint', 'create_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/posts/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Posts_Endpoint', 'get_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Posts_Endpoint', 'update_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'DELETE',
                'callback' => array('WP_MCP_Posts_Endpoint', 'delete_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/posts/(?P<id>\d+)/meta', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Posts_Endpoint', 'get_meta'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Posts_Endpoint', 'update_meta'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/posts/(?P<id>\d+)/terms', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Posts_Endpoint', 'get_terms'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Posts_Endpoint', 'update_terms'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_products_routes() {
        register_rest_route($this->namespace, '/products', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Products_Endpoint', 'get_items'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Products_Endpoint', 'create_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/products/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Products_Endpoint', 'get_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Products_Endpoint', 'update_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_plugins_routes() {
        register_rest_route($this->namespace, '/plugins', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Plugins_Endpoint', 'get_items'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/plugins/install', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Plugins_Endpoint', 'install'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/plugins/activate', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Plugins_Endpoint', 'activate'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/plugins/deactivate', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Plugins_Endpoint', 'deactivate'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/plugins/(?P<slug>[a-z0-9-]+)', array(
            array(
                'methods' => 'DELETE',
                'callback' => array('WP_MCP_Plugins_Endpoint', 'delete_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_themes_routes() {
        register_rest_route($this->namespace, '/themes', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Themes_Endpoint', 'get_items'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/themes/install', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Themes_Endpoint', 'install'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/themes/activate', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Themes_Endpoint', 'activate'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_options_routes() {
        register_rest_route($this->namespace, '/options/(?P<key>.+)', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Options_Endpoint', 'get_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Options_Endpoint', 'update_item'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_system_routes() {
        register_rest_route($this->namespace, '/cache/flush', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_System_Endpoint', 'flush_cache'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/info', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_System_Endpoint', 'get_info'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    private function register_blocks_routes() {
        register_rest_route($this->namespace, '/blocks/types', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'get_block_types'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/blocks/patterns', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'get_block_patterns'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/blocks/synced', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'get_synced_patterns'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'create_synced_pattern'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/blocks/synced/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'get_synced_pattern'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'update_synced_pattern'),
                'permission_callback' => array($this, 'check_auth'),
            ),
            array(
                'methods' => 'DELETE',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'delete_synced_pattern'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));

        register_rest_route($this->namespace, '/posts/(?P<id>\d+)/blocks', array(
            array(
                'methods' => 'POST',
                'callback' => array('WP_MCP_Blocks_Endpoint', 'insert_block_reference'),
                'permission_callback' => array($this, 'check_auth'),
            ),
        ));
    }

    public function check_auth() {
        return current_user_can('manage_options');
    }
}
