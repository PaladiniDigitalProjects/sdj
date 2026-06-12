<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetPosts extends AbstractTool {
    public function name(): string {
        return 'get_posts';
    }

    public function description(): string {
        return 'Lista posts o páginas de WordPress con filtros opcionales';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'post_type' => (object) [
                    'type' => 'string',
                    'default' => 'post',
                    'description' => 'Tipo de post (post, page, o CPT)',
                ],
                'post_status' => (object) [
                    'type' => 'string',
                    'default' => 'publish',
                    'description' => 'Estado del post (publish, draft, etc)',
                ],
                'per_page' => (object) [
                    'type' => 'integer',
                    'default' => 10,
                    'maximum' => 100,
                    'description' => 'Número de posts a obtener',
                ],
                'search' => (object) [
                    'type' => 'string',
                    'description' => 'Buscar en título y contenido',
                ],
                'author' => (object) [
                    'type' => 'integer',
                    'description' => 'Filtrar por ID de autor',
                ],
            ],
        ];
    }

    public function execute(array $params): array {
        $query = http_build_query($params);
        $endpoint = '/posts?' . $query;
        
        $response = $this->client->get($endpoint);
        return $this->unwrap($response);
    }
}
