<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class UpdateOption extends AbstractTool {
    public function name(): string {
        return 'update_option';
    }

    public function description(): string {
        return 'Actualiza el valor de una opción de WordPress';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'key' => (object) [
                    'type' => 'string',
                    'description' => 'Clave de la opción',
                ],
                'value' => (object) [
                    'description' => 'Nuevo valor',
                ],
            ],
            'required' => ['key', 'value'],
        ];
    }

    public function execute(array $params): array {
        $key = $params['key'];
        $value = $params['value'];
        
        $response = $this->client->put("/options/{$key}", ['value' => $value]);
        return $this->unwrap($response);
    }
}
