<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetBlockTypes extends AbstractTool {
    public function name(): string {
        return 'get_block_types';
    }

    public function description(): string {
        return 'Lista todos los bloques Gutenberg registrados en el sitio (core, plugins, tema)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'namespace' => (object) [
                    'type' => 'string',
                    'description' => 'Filtrar por namespace (ej: core, acf, woocommerce)',
                ],
            ],
        ];
    }

    public function execute(array $params): array {
        $endpoint = '/blocks/types';
        if (!empty($params['namespace'])) {
            $endpoint .= '?namespace=' . urlencode($params['namespace']);
        }
        $response = $this->client->get($endpoint);
        return $this->unwrap($response);
    }
}
