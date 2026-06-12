<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetSyncedPattern extends AbstractTool {
    public function name(): string {
        return 'get_synced_pattern';
    }

    public function description(): string {
        return 'Obtiene el contenido completo de un synced pattern por su ID';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del synced pattern (tipo wp_block)',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        $response = $this->client->get("/blocks/synced/{$id}");
        return $this->unwrap($response);
    }
}
