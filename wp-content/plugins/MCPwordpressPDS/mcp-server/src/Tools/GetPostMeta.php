<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetPostMeta extends AbstractTool {
    public function name(): string {
        return 'get_post_meta';
    }

    public function description(): string {
        return 'Lee meta fields de un post (incluye ACF fields)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post',
                ],
                'key' => (object) [
                    'type' => 'string',
                    'description' => 'Clave específica del meta (opcional, si se omite devuelve todos)',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        $endpoint = "/posts/{$id}/meta";
        
        if (!empty($params['key'])) {
            $endpoint .= '?key=' . urlencode($params['key']);
        }
        
        $response = $this->client->get($endpoint);
        return $this->unwrap($response);
    }
}
