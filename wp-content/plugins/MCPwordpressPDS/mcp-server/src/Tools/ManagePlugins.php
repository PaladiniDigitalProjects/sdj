<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class ManagePlugins extends AbstractTool {
    public function name(): string {
        return 'manage_plugins';
    }

    public function description(): string {
        return 'Instala, activa, desactiva o elimina plugins de WordPress';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'action' => (object) [
                    'type' => 'string',
                    'enum' => ['list', 'install', 'activate', 'deactivate', 'delete'],
                    'description' => 'Acción a realizar',
                ],
                'slug' => (object) [
                    'type' => 'string',
                    'description' => 'Slug del plugin (requerido para todas las acciones excepto list)',
                ],
            ],
            'required' => ['action'],
        ];
    }

    public function execute(array $params): array {
        $action = $params['action'];
        $slug = $params['slug'] ?? null;

        $endpoint = match($action) {
            'list' => '/plugins',
            'install' => '/plugins/install',
            'activate' => '/plugins/activate',
            'deactivate' => '/plugins/deactivate',
            'delete' => "/plugins/{$slug}",
            default => '/plugins',
        };

        $data = null;
        if (in_array($action, ['install', 'activate', 'deactivate']) && $slug) {
            $data = ['slug' => $slug];
        }

        $response = match($action) {
            'list' => $this->client->get($endpoint),
            'delete' => $this->client->delete($endpoint),
            default => $this->client->post($endpoint, $data),
        };

        return $this->unwrap($response);
    }
}
