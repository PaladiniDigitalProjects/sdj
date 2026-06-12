<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class GetOption extends AbstractTool {
    public function name(): string {
        return 'get_option';
    }

    public function description(): string {
        return 'Lee el valor de una opción de WordPress desde wp_options';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'key' => (object) [
                    'type' => 'string',
                    'description' => 'Clave de la opción',
                ],
            ],
            'required' => ['key'],
        ];
    }

    public function execute(array $params): array {
        $key = $params['key'];
        $response = $this->client->get("/options/{$key}");
        return $this->unwrap($response);
    }
}
