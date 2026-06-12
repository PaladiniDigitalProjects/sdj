<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class SetPostTerms extends AbstractTool {
    public function name(): string {
        return 'set_post_terms';
    }

    public function description(): string {
        return 'Asigna términos a taxonomías específicas de un post (categorías, tags, o taxonomías personalizadas)';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'id' => (object) [
                    'type' => 'integer',
                    'description' => 'ID del post',
                ],
                'taxonomy' => (object) [
                    'type' => 'string',
                    'description' => 'Taxonomía (category, post_tag, product_cat, product_tag, o taxonomía personalizada)',
                ],
                'terms' => (object) [
                    'type' => 'array',
                    'description' => 'Array de IDs numéricos o nombres/slugs de términos',
                    'items' => (object) [
                        'oneOf' => [
                            ['type' => 'integer'],
                            ['type' => 'string']
                        ]
                    ],
                ],
            ],
            'required' => ['id', 'taxonomy', 'terms'],
        ];
    }

    public function execute(array $params): array {
        $id = $params['id'];
        
        $payload = array(
            'taxonomy' => $params['taxonomy'],
            'terms' => $params['terms'],
        );
        
        $response = $this->client->put("/posts/{$id}/terms", $payload);
        return $this->unwrap($response);
    }
}
