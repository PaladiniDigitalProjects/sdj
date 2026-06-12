<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

abstract class AbstractTool implements ToolInterface {
    protected HttpClient $client;

    public function __construct(HttpClient $client) {
        $this->client = $client;
    }

    protected function unwrap(array $response): array {
        if (isset($response['success']) && $response['success'] === false) {
            return [
                'success' => false,
                'error' => $response['message'] ?? $response['error'] ?? 'Unknown error',
            ];
        }

        if (isset($response['data'])) {
            return [
                'success' => true,
                'content' => $response['data'],
            ];
        }

        return [
            'success' => true,
            'content' => $response,
        ];
    }

    public function format_result(array $result): array {
        if ($result['success']) {
            return [
                'content' => array(
                    array(
                        'type' => 'text',
                        'text' => json_encode($result['content'], JSON_PRETTY_PRINT),
                    ),
                ),
            ];
        }

        return [
            'content' => array(
                array(
                    'type' => 'text',
                    'text' => 'Error: ' . ($result['error'] ?? 'Unknown error'),
                ),
            ),
            'isError' => true,
        ];
    }
}
