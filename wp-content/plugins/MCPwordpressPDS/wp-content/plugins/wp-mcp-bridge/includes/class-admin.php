<?php

require_once plugin_dir_path(__FILE__) . 'class-settings.php';
require_once plugin_dir_path(__FILE__) . 'admin/class-admin-page.php';

class WP_MCP_Admin {
    private $admin_page;

    public function __construct() {
        $this->admin_page = new WP_MCP_Admin_Page();
    }

    public function init() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    public function add_admin_menu() {
        add_options_page(
            'WP MCP Bridge Settings',
            'MCP Bridge',
            'manage_options',
            'wp-mcp-settings',
            array($this->admin_page, 'render_page')
        );
    }

    public function enqueue_assets($hook) {
        if ('settings_page_wp-mcp-settings' !== $hook) {
            return;
        }

        wp_enqueue_style(
            'wp-mcp-admin',
            plugin_dir_url(dirname(__FILE__)) . 'assets/css/admin.css',
            array(),
            WP_MCP_Settings::VERSION
        );
    }
}
