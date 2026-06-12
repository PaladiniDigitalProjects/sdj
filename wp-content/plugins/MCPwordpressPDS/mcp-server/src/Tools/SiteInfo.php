<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class SiteInfo extends AbstractTool {
    public function name(): string {
        return 'site_info';
    }

    public function description(): string {
        return 'Obtiene información general del sitio WordPress incluyendo versión, PHP, plugins activos y tema';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [],
        ];
    }

    public function execute(array $params): array {
        $response = $this->client->get('/info');
        return $this->unwrap($response);
    }
}
