<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class CreateSyncedPattern extends AbstractTool {
    public function name(): string {
        return 'create_synced_pattern';
    }

    public function description(): string {
        return 'Crea un nuevo patrón sincronizado (reusable block)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'title' => (object) [
                    'type' => 'string',
                    'description' => 'Título del patrón',
                ],
                'content' => (object) [
                    'type' => 'string',
                    'description' => 'Contenido del patrón en formato Gutenberg blocks (HTML comments)',
                ],
                'sync_status' => (object) [
                    'type' => 'string',
                    'description' => 'Estado de sincronización: synced o unsynced',
                    'enum' => ['synced', 'unsynced'],
                    'default' => 'synced',
                ],
            ],
            'required' => ['title', 'content'],
        ];
    }

    public function execute(array $params): array {
        $payload = [
            'title' => $params['title'],
            'content' => $params['content'],
        ];
        
        if (!empty($params['sync_status'])) {
            $payload['sync_status'] = $params['sync_status'];
        }
        
        $response = $this->client->post('/blocks/synced', $payload);
        return $this->unwrap($response);
    }
}
