<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class CacheFlush extends AbstractTool {
    public function name(): string {
        return 'cache_flush';
    }

    public function description(): string {
        return 'Vacía la caché del sitio y regenera las reglas de rewrite';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [],
        ];
    }

    public function execute(array $params): array {
        $response = $this->client->post('/cache/flush');
        return $this->unwrap($response);
    }
}
