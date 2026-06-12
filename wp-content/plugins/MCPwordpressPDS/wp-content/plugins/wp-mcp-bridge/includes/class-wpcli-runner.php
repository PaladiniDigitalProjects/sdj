<?php

class WP_MCP_WPCli_Runner {
    private $is_lando;

    public function __construct() {
        $this->is_lando = (bool) getenv('LANDO_APP_NAME');
    }

    public function is_lando() {
        return $this->is_lando;
    }

    public function run($command) {
        $escaped_cmd = escapeshellcmd($command);
        
        if ($this->is_lando) {
            $full_command = 'cd ' . escapeshellarg(ABSPATH) . ' && lando wp ' . $escaped_cmd . ' 2>&1';
        } else {
            $full_command = 'wp ' . $escaped_cmd . ' --path=' . escapeshellarg(ABSPATH) . ' 2>&1';
        }

        $output = shell_exec($full_command);
        return $output;
    }

    public function plugin_install($slug) {
        return $this->run("plugin install {$slug} --activate");
    }

    public function plugin_activate($slug) {
        return $this->run("plugin activate {$slug}");
    }

    public function plugin_deactivate($slug) {
        return $this->run("plugin deactivate {$slug}");
    }

    public function plugin_delete($slug) {
        return $this->run("plugin delete {$slug}");
    }

    public function theme_install($slug) {
        return $this->run("theme install {$slug}");
    }

    public function theme_activate($slug) {
        return $this->run("theme activate {$slug}");
    }

    public function cache_flush() {
        return $this->run("cache flush");
    }

    public function rewrite_flush() {
        return $this->run("rewrite flush");
    }
}
