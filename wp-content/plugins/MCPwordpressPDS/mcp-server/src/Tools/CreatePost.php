<?php

namespace McpServer\Tools;

use McpServer\HttpClient;

class CreatePost extends AbstractTool {
    public function name(): string {
        return 'create_post';
    }

    public function description(): string {
        return 'Crea un nuevo post o página en WordPress';
    }

    public function input_schema(): array {
        return [
            'type' => 'object',
            'properties' => (object) [
                'title' => (object) [
                    'type' => 'string',
                    'description' => 'Título del post',
                ],
                'content' => (object) [
                    'type' => 'string',
                    'description' => 'Contenido del post',
                ],
                'status' => (object) [
                    'type' => 'string',
                    'default' => 'draft',
                    'description' => 'Estado (draft, publish, pending)',
                ],
                'type' => (object) [
                    'type' => 'string',
                    'default' => 'post',
                    'description' => 'Tipo de post (post, page)',
                ],
            ],
            'required' => ['title'],
        ];
    }

    public function execute(array $params): array {
        $response = $this->client->post('/posts', $params);
        return $this->unwrap($response);
    }
}
