<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetPost extends AbstractTool {
    public function name(): string {
        return 'get_post';
    }

    public function description(): string {
        return 'Obtiene el contenido completo de un post por su ID';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        $response = $this->client->get("/posts/{$id}");
        return $this->unwrap($response);
    }
}
