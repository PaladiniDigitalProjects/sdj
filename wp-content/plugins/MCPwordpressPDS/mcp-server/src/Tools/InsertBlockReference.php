<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class InsertBlockReference extends AbstractTool {
    public function name(): string {
        return 'insert_block_reference';
    }

    public function description(): string {
        return 'Inserta una referencia a un synced pattern dentro de un post (como bloque reutilizable)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post donde insertar el bloque',
                ],
                'block_ref' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del synced pattern a insertar',
                ],
                'position' => (object) [
                    'type' => 'string',
                    'description' => 'Posición: prepend (inicio), append (final) o after:{block_id}',
                    'enum' => ['prepend', 'append'],
                    'default' => 'append',
                ],
            ],
            'required' => ['id', 'block_ref'],
        ];
    }

    public function execute(array $params): array {
        $post_id = $params['id'];
        $payload = [
            'block_ref' => $params['block_ref'],
        ];
        
        if (!empty($params['position'])) {
            $payload['position'] = $params['position'];
        }
        
        $response = $this->client->post("/posts/{$post_id}/blocks", $payload);
        return $this->unwrap($response);
    }
}
