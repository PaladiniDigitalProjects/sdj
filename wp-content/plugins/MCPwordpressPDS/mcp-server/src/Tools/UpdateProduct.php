<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class UpdateProduct extends AbstractTool {
    public function name(): string {
        return 'update_product';
    }

    public function description(): string {
        return 'Actualiza un producto WooCommerce completo (título, contenido, precio, stock, imagen destacada, categorías, tags, ACF)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del producto a actualizar',
                ],
                'title' => (object) [
                    'type' => 'string',
                    'description' => 'Nuevo título del producto',
                ],
                'content' => (object) [
                    'type' => 'string',
                    'description' => 'Descripción completa del producto',
                ],
                'status' => (object) [
                    'type' => 'string',
                    'description' => 'Estado (publish, draft, pending, private)',
                ],
                'price' => (object) [
                    'type' => 'string',
                    'description' => 'Precio del producto',
                ],
                'regular_price' => (object) [
                    'type' => 'string',
                    'description' => 'Precio regular',
                ],
                'sale_price' => (object) [
                    'type' => 'string',
                    'description' => 'Precio de oferta',
                ],
                'sku' => (object) [
                    'type' => 'string',
                    'description' => 'SKU del producto',
                ],
                'stock' => (object) [
                    'type' => 'integer',
                    'description' => 'Cantidad en stock',
                ],
                'stock_status' => (object) [
                    'type' => 'string',
                    'description' => 'Estado del stock (instock, outofstock, onbackorder)',
                ],
                'featured_image' => (object) [
                    'type' => ['integer', 'string'],
                    'description' => 'ID o URL de la imagen destacada',
                ],
                'gallery' => (object) [
                    'type' => 'array',
                    'items' => (object) ['type' => 'integer'],
                    'description' => 'Array de IDs de imágenes de la galería',
                ],
                'categories' => (object) [
                    'type' => 'array',
                    'description' => 'Array de IDs o nombres de categorías',
                ],
                'tags' => (object) [
                    'type' => 'array',
                    'description' => 'Array de IDs o nombres de tags',
                ],
                'weight' => (object) [
                    'type' => 'string',
                    'description' => 'Peso del producto',
                ],
                'dimensions' => (object) [
                    'type' => 'object',
                    'description' => 'Dimensiones {length, width, height}',
                ],
                'attributes' => (object) [
                    'type' => 'array',
                    'description' => 'Atributos del producto',
                ],
                'meta' => (object) [
                    'type' => 'object',
                    'description' => 'Meta fields adicionales (ACF)',
                ],
            ],
            'required' => ['id'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        unset($params['id']);
        
        $payload = $params;
        
        if (!empty($payload['meta'])) {
            $payload['meta_input'] = $payload['meta'];
            unset($payload['meta']);
        }
        
        $response = $this->client->put("/products/{$id}", $payload);
        return $this->unwrap($response);
    }
}
