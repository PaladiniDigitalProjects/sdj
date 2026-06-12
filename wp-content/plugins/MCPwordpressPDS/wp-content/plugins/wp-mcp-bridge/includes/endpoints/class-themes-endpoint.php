<?php

class WP_MCP_Themes_Endpoint {
    public static function get_items() {
        if (!function_exists('wp_get_themes')) {
            require_once ABSPATH . 'wp-includes/theme.php';
        }

        $themes = wp_get_themes();
        $current_theme = wp_get_theme();
        $result = array();

        foreach ($themes as $slug => $theme) {
            $result[] = array(
                'slug' => $slug,
                'name' => $theme->get('Name'),
                'version' => $theme->get('Version'),
                'active' => ($slug === $current_theme->get_stylesheet()),
            );
        }

        return WP_MCP_Response::success($result);
    }

    public static function install($request) {
        $params = $request->get_json_params();

        if (empty($params['slug'])) {
            return WP_MCP_Response::error('Theme slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->theme_install($params['slug']);

        if (strpos($output, 'Success') !== false) {
            return WP_MCP_Response::success(array('slug' => $params['slug']), 'Theme installed successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to install theme', 'install_failed');
    }

    public static function activate($request) {
        $params = $request->get_json_params();

        if (empty($params['slug'])) {
            return WP_MCP_Response::error('Theme slug is required', 'missing_slug');
        }

        $runner = new WP_MCP_WPCli_Runner();
        $output = $runner->theme_activate($params['slug']);

        if (strpos($output, 'Activated') !== false) {
            return WP_MCP_Response::success(array('slug' => $params['slug']), 'Theme activated successfully');
        }

        return WP_MCP_Response::error($output ?: 'Failed to activate theme', 'activate_failed');
    }
}
