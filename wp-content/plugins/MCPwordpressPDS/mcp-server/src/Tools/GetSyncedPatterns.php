<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetSyncedPatterns extends AbstractTool {
    public function name(): string {
        return 'get_synced_patterns';
    }

    public function description(): string {
        return 'Lista los patrones sincronizados (reusable blocks) creados por usuarios';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'per_page' => (object) [
                    'type' => 'integer',
                    'description' => 'Número de resultados por página',
                    'default' => 20,
                ],
                'page' => (object) [
                    'type' => 'integer',
                    'description' => 'Número de página',
                    'default' => 1,
                ],
                'search' => (object) [
                    'type' => 'string',
                    'description' => 'Buscar por título',
                ],
            ],
        ];
    }

    public function execute(array $params): array {
        $query = [];
        if (!empty($params['per_page'])) {
            $query['per_page'] = $params['per_page'];
        }
        if (!empty($params['page'])) {
            $query['page'] = $params['page'];
        }
        if (!empty($params['search'])) {
            $query['search'] = $params['search'];
        }
        
        $endpoint = '/blocks/synced';
        if (!empty($query)) {
            $endpoint .= '?' . http_build_query($query);
        }
        $response = $this->client->get($endpoint);
        return $this->unwrap($response);
    }
}
