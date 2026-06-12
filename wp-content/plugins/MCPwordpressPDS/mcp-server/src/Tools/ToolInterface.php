<?php

namespace McpServer\Tools;

interface ToolInterface {
    public function name(): string;
    public function description(): string;
    public function input_schema(): array;
    public function execute(array $params): array;
}
