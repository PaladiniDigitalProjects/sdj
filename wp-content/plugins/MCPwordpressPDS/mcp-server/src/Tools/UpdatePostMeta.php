<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class UpdatePostMeta extends AbstractTool {
    public function name(): string {
        return 'update_post_meta';
    }

    public function description(): string {
        return 'Actualiza meta fields específicos de un post (incluye ACF fields)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post',
                ],
                'meta' => (object) [
                    'type' => 'object',
                    'description' => 'Objeto con las claves y valores a actualizar. Usar null o string vacío para eliminar.',
                    'additionalProperties' => true,
                ],
            ],
            'required' => ['id', 'meta'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        
        $payload = array(
            'meta' => $params['meta'],
        );
        
        $response = $this->client->put("/posts/{$id}/meta", $payload);
        return $this->unwrap($response);
    }
}
