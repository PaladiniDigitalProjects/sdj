<?php

namespace McpServer;

use McpServer\Tools\ToolInterface;
use McpServer\Tools\SiteInfo;
use McpServer\Tools\GetPosts;
use McpServer\Tools\GetPost;
use McpServer\Tools\CreatePost;
use McpServer\Tools\UpdatePost;
use McpServer\Tools\GetProduct;
use McpServer\Tools\UpdateProduct;
use McpServer\Tools\GetPostMeta;
use McpServer\Tools\UpdatePostMeta;
use McpServer\Tools\SetPostTerms;
use McpServer\Tools\ManagePlugins;
use McpServer\Tools\ManageThemes;
use McpServer\Tools\GetOption;
use McpServer\Tools\UpdateOption;
use McpServer\Tools\CacheFlush;
use McpServer\Tools\GetBlockTypes;
use McpServer\Tools\GetBlockPatterns;
use McpServer\Tools\GetSyncedPatterns;
use McpServer\Tools\GetSyncedPattern;
use McpServer\Tools\CreateSyncedPattern;
use McpServer\Tools\InsertBlockReference;

class Server {
    private HttpClient $client;
    private array $tools = [];

    public function __construct() {
        $config = Config::load();
        
        $this->client = new HttpClient(
            Config::api_base(),
            Config::wp_user(),
            Config::wp_app_password()
        );

        $this->register_tools();
    }

    private function register_tools(): void {
        $tool_classes = [
            new SiteInfo($this->client),
            new GetPosts($this->client),
            new GetPost($this->client),
            new CreatePost($this->client),
            new UpdatePost($this->client),
            new GetProduct($this->client),
            new UpdateProduct($this->client),
            new GetPostMeta($this->client),
            new UpdatePostMeta($this->client),
            new SetPostTerms($this->client),
            new ManagePlugins($this->client),
            new ManageThemes($this->client),
            new GetOption($this->client),
            new UpdateOption($this->client),
            new CacheFlush($this->client),
            new GetBlockTypes($this->client),
            new GetBlockPatterns($this->client),
            new GetSyncedPatterns($this->client),
            new GetSyncedPattern($this->client),
            new CreateSyncedPattern($this->client),
            new InsertBlockReference($this->client),
        ];

        foreach ($tool_classes as $tool) {
            $this->tools[$tool->name()] = $tool;
        }
    }

    public function run(): void {
        $handle = fopen('php://stdin', 'r');
        
        while (!feof($handle)) {
            $line = fgets($handle);
            if (empty(trim($line))) {
                continue;
            }

            $message = json_decode($line, true);
            
            if (!$message) {
                continue;
            }

            $response = $this->handle_message($message);
            
            if ($response) {
                echo json_encode($response) . "\n";
            }
        }
        
        fclose($handle);
    }

    private function handle_message(array $message): ?array {
        $method = $message['method'] ?? '';
        $id = $message['id'] ?? null;

        switch ($method) {
            case 'initialize':
                return $this->handle_initialize($id);
            
            case 'tools/list':
                return $this->handle_tools_list($id);
            
            case 'tools/call':
                return $this->handle_tools_call($message, $id);
            
            default:
                return null;
        }
    }

    private function handle_initialize($id): array {
        return [
            'jsonrpc' => '2.0',
            'id' => $id,
            'result' => [
                'protocolVersion' => '2024-11-05',
                'serverInfo' => [
                    'name' => 'wordpress-mcp',
                    'version' => '0.4.0',
                ],
                'capabilities' => [
                    'tools' => (object) [],
                ],
            ],
        ];
    }

    private function handle_tools_list($id): array {
        $tools = [];
        
        foreach ($this->tools as $tool) {
            $tools[] = [
                'name' => $tool->name(),
                'description' => $tool->description(),
                'inputSchema' => $tool->input_schema(),
            ];
        }

        return [
            'jsonrpc' => '2.0',
            'id' => $id,
            'result' => [
                'tools' => $tools,
            ],
        ];
    }

    private function handle_tools_call(array $message, $id): array {
        $tool_name = $message['params']['name'] ?? '';
        $arguments = $message['params']['arguments'] ?? [];

        if (!isset($this->tools[$tool_name])) {
            return [
                'jsonrpc' => '2.0',
                'id' => $id,
                'error' => [
                    'code' => -32601,
                    'message' => "Tool not found: {$tool_name}",
                ],
            ];
        }

        $tool = $this->tools[$tool_name];
        $result = $tool->execute($arguments);
        $formatted = $tool->format_result($result);

        return [
            'jsonrpc' => '2.0',
            'id' => $id,
            'result' => $formatted,
        ];
    }
}
