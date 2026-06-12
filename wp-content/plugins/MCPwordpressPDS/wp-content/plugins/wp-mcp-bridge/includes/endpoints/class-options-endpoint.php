<?php

class WP_MCP_Options_Endpoint {
    const BLOCKLIST = array(
        'auth_key',
        'secure_auth_key',
        'logged_in_key',
        'nonce_key',
        'auth_salt',
        'secure_auth_salt',
        'logged_in_salt',
        'nonce_salt',
        'database_password',
        'db_password',
        'admin_email',
    );

    public static function get_item($request) {
        $key = $request['key'];

        if (self::is_blocked($key)) {
            return WP_MCP_Response::forbidden('This option is protected');
        }

        $value = get_option($key);

        if ($value === false) {
            return WP_MCP_Response::not_found('Option not found');
        }

        return WP_MCP_Response::success(array(
            'key' => $key,
            'value' => $value,
        ));
    }

    public static function update_item($request) {
        $key = $request['key'];
        $params = $request->get_json_params();

        if (self::is_blocked($key)) {
            return WP_MCP_Response::forbidden('This option is protected');
        }

        if (!isset($params['value'])) {
            return WP_MCP_Response::error('Value is required', 'missing_value');
        }

        $result = update_option($key, $params['value']);

        if ($result) {
            return WP_MCP_Response::success(array('key' => $key), 'Option updated successfully');
        }

        return WP_MCP_Response::error('Failed to update option', 'update_failed');
    }

    private static function is_blocked($key) {
        $key_lower = strtolower($key);
        foreach (self::BLOCKLIST as $blocked) {
            if (strpos($key_lower, $blocked) !== false) {
                return true;
            }
        }
        return false;
    }
}
