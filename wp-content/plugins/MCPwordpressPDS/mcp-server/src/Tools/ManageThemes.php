<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class ManageThemes extends AbstractTool {
    public function name(): string {
        return 'manage_themes';
    }

    public function description(): string {
        return 'Instala o activa temas de WordPress';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'action' => (object) [
                    'type' => 'string',
                    'enum' => ['list', 'install', 'activate'],
                    'description' => 'Acción a realizar',
                ],
                'slug' => (object) [
                    'type' => 'string',
                    'description' => 'Slug del tema (requerido para install y activate)',
                ],
            ],
            'required' => ['action'],
        ];
    }

    public function execute(array $params): array {
        $action = $params['action'];
        $slug = $params['slug'] ?? null;

        $endpoint = match($action) {
            'list' => '/themes',
            'install' => '/themes/install',
            'activate' => '/themes/activate',
            default => '/themes',
        };

        $data = null;
        if (in_array($action, ['install', 'activate']) && $slug) {
            $data = ['slug' => $slug];
        }

        $response = match($action) {
            'list' => $this->client->get($endpoint),
            default => $this->client->post($endpoint, $data),
        };

        return $this->unwrap($response);
    }
}
