<?php
/**
 * Plugin Name: WP MCP Bridge
 * Plugin URI: https://github.com/pds/wp-mcp-bridge
 * Description: Plugin bridge that exposes WordPress functionality via REST API for MCP integration
 * Version: 0.3.0
 * Author: PDS
 * Requires at least: 5.6
 * Requires PHP: 8.1
 */

if (!defined('ABSPATH')) {
    exit;
}

define('WP_MCP_VERSION', '0.3.0');
define('WP_MCP_REST_PREFIX', 'mcp/v1');

require_once plugin_dir_path(__FILE__) . 'includes/class-response.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-wpcli-runner.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-router.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-admin.php';

add_action('rest_api_init', function() {
    $router = new WP_MCP_Router();
    $router->register_routes();
});

add_action('init', function() {
    $admin = new WP_MCP_Admin();
    $admin->init();
});
