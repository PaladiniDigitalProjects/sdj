<?php

namespace McpServer;

use Dotenv\Dotenv;

class Config {
    private static ?array $config = null;

    public static function load() {
        if (self::$config !== null) {
            return self::$config;
        }

        $env_file = dirname(__DIR__) . '/.env';
        
        if (file_exists($env_file)) {
            $dotenv = Dotenv::createImmutable(dirname(__DIR__));
            $dotenv->load();
        }

        self::$config = [
            'wp_url' => $_ENV['WP_URL'] ?? 'http://localhost',
            'wp_user' => $_ENV['WP_USER'] ?? 'admin',
            'wp_app_password' => $_ENV['WP_APP_PASSWORD'] ?? '',
        ];

        return self::$config;
    }

    public static function get($key) {
        $config = self::load();
        return $config[$key] ?? null;
    }

    public static function wp_url() {
        return rtrim(self::get('wp_url'), '/');
    }

    public static function wp_user() {
        return self::get('wp_user');
    }

    public static function wp_app_password() {
        return self::get('wp_app_password');
    }

    public static function api_base() {
        return self::wp_url() . '/wp-json/mcp/v1';
    }
}
