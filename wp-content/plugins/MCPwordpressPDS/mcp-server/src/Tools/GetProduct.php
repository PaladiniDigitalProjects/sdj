<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetProduct extends AbstractTool {
    public function name(): string {
        return 'get_product';
    }

    public function description(): string {
        return 'Obtiene un producto WooCommerce completo con precio, SKU, stock, imágenes, categorías y meta fields';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del producto WooCommerce',
                ],
                'per_page' => (object) [
                    'type' => 'integer',
                    'description' => 'Número de productos a obtener (para listar)',
                    'default' => 10,
                ],
                'search' => (object) [
                    'type' => 'string',
                    'description' => 'Buscar por título',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $endpoint = '/products';
        
        if (!empty($params['id'])) {
            $endpoint = "/products/{$params['id']}";
            unset($params['id']);
        }
        
        $response = $this->client->get($endpoint, $params);
        return $this->unwrap($response);
    }
}
