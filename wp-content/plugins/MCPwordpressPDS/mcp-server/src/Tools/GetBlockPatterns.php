<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetBlockPatterns extends AbstractTool {
    public function name(): string {
        return 'get_block_patterns';
    }

    public function description(): string {
        return 'Lista todos los patrones de bloques disponibles (del tema, plugins y WordPress.org)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'category' => (object) [
                    'type' => 'string',
                    'description' => 'Filtrar por categoría (ej: featured, buttons, columns)',
                ],
                'search' => (object) [
                    'type' => 'string',
                    'description' => 'Buscar en nombre, título o descripción',
                ],
            ],
        ];
    }

    public function execute(array $params): array {
        $query = [];
        if (!empty($params['category'])) {
            $query['category'] = $params['category'];
        }
        if (!empty($params['search'])) {
            $query['search'] = $params['search'];
        }
        
        $endpoint = '/blocks/patterns';
        if (!empty($query)) {
            $endpoint .= '?' . http_build_query($query);
        }
        $response = $this->client->get($endpoint);
        return $this->unwrap($response);
    }
}
