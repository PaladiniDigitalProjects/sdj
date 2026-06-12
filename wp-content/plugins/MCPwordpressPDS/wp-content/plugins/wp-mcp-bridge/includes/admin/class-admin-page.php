<?php

class WP_MCP_Admin_Page {

    public function render_page() {
        if (isset($_POST['wp_mcp_save_settings']) && isset($_POST['wp_mcp_nonce'])) {
            $this->handle_save();
        }

        $groups = WP_MCP_Settings::get_all_groups();
        $enabled = WP_MCP_Settings::get_enabled_groups();
        $stats = WP_MCP_Settings::get_stats();

        include plugin_dir_path(__FILE__) . 'views/settings-view.php';
    }

    private function handle_save() {
        if (!current_user_can('manage_options')) {
            return;
        }

        if (!wp_verify_nonce($_POST['wp_mcp_nonce'], 'wp_mcp_save_settings')) {
            wp_die('Security check failed');
        }

        $groups = WP_MCP_Settings::get_all_groups();
        $new_settings = array();

        foreach (array_keys($groups) as $group_key) {
            $new_settings[$group_key] = !empty($_POST['wp_mcp_group_' . $group_key]);
        }

        WP_MCP_Settings::set_enabled_groups($new_settings);

        echo '<div class="notice notice-success is-dismissible"><p>Configuración guardada correctamente.</p></div>';
    }
}
