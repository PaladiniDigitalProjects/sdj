<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class UpdatePost extends AbstractTool {
    public function name(): string {
        return 'update_post';
    }

    public function description(): string {
        return 'Actualiza título, contenido o estado de un post existente';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post a actualizar',
                ],
                'title' => (object) [
                    'type' => 'string',
                    'description' => 'Nuevo título',
                ],
                'content' => (object) [
                    'type' => 'string',
                    'description' => 'Nuevo contenido',
                ],
                'status' => (object) [
                    'type' => 'string',
                    'description' => 'Nuevo estado (publish, draft, etc)',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        unset($params['id']);
        
        $response = $this->client->put("/posts/{$id}", $params);
        return $this->unwrap($response);
    }
}
