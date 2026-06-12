<?php

class WP_MCP_Plugins_Endpoint {
    private $runner;

    public function __construct() {
        $this->runner = new WP_MCP_WPCli_Runner();
    }

    public static function get_items() {
        if (!function_exists('get_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $plugins = get_plugins();
        $active_plugins = get_option('active_plugins', array());
        $result = array();

        foreach ($plugins as $slug => $plugin) {
            $result[] = array(
                'slug' => dirname($slug),
                'name' => $plugin['Name'],
                'version' => $plugin['Version'],
                'active' => in_array($slug, $active_plugins),
            );
        }

        return WP_MCP_Response::success($result);
    }

    public static function install($request) {
        $params = $request->get_json_params();

        if (empty($params['slug'])) {
            return WP_MCP_Response::error('Plugin slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->plugin_install($params['slug']);

        if (strpos($output, 'Success') !== false || strpos($output, 'Activated') !== false) {
            return WP_MCP_Response::success(array('slug' => $params['slug']), 'Plugin installed successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to install plugin', 'install_failed');
    }

    public static function activate($request) {
        $params = $request->get_json_params();

        if (empty($params['slug'])) {
            return WP_MCP_Response::error('Plugin slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->plugin_activate($params['slug']);

        if (strpos($output, 'Activated') !== false) {
            return WP_MCP_Response::success(array('slug' => $params['slug']), 'Plugin activated successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to activate plugin', 'activate_failed');
    }

    public static function deactivate($request) {
        $params = $request->get_json_params();

        if (empty($params['slug'])) {
            return WP_MCP_Response::error('Plugin slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->plugin_deactivate($params['slug']);

        if (strpos($output, 'Deactivated') !== false) {
            return WP_MCP_Response::success(array('slug' => $params['slug']), 'Plugin deactivated successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to deactivate plugin', 'deactivate_failed');
    }

    public static function delete_item($request) {
        $slug = $request['slug'];

        if (empty($slug)) {
            return WP_MCP_Response::error('Plugin slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->plugin_delete($slug);

        if (strpos($output, 'Deleted') !== false) {
            return WP_MCP_Response::success(array('slug' => $slug), 'Plugin deleted successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to delete plugin', 'delete_failed');
    }
}
