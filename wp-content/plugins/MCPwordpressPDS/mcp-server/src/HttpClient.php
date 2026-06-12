<?php

namespace McpServer;

class HttpClient {
    private string $base_url;
    private string $user;
    private string $password;
    private bool $verify_ssl;

    public function __construct(string $base_url, string $user, string $password) {
        $this->base_url = rtrim($base_url, '/');
        $this->user = $user;
        $this->password = $password;
        $this->verify_ssl = (strpos($base_url, '.lndo.site') === false);
    }

    private function get_headers(): array {
        $credentials = base64_encode("{$this->user}:{$this->password}");
        
        return [
            "Authorization: Basic {$credentials}",
            'Content-Type: application/json',
            'Accept: application/json',
        ];
    }

    public function request(string $method, string $endpoint, array $data = null): array {
        $url = $this->base_url . $endpoint;
        
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->get_headers());
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $this->verify_ssl);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, $this->verify_ssl ? 2 : 0);

        switch (strtoupper($method)) {
            case 'POST':
                curl_setopt($ch, CURLOPT_POST, true);
                if ($data) {
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
                }
                break;
            case 'PUT':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
                if ($data) {
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
                }
                break;
            case 'DELETE':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
                break;
        }

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        
        curl_close($ch);

        if ($error) {
            return [
                'success' => false,
                'error' => $error,
            ];
        }

        $decoded = json_decode($response, true);
        
        if ($http_code >= 400) {
            return [
                'success' => false,
                'code' => $http_code,
                'message' => $decoded['message'] ?? $decoded['error'] ?? 'Request failed',
            ];
        }

        return [
            'success' => true,
            'data' => $decoded,
        ];
    }

    public function get(string $endpoint): array {
        return $this->request('GET', $endpoint);
    }

    public function post(string $endpoint, array $data = null): array {
        return $this->request('POST', $endpoint, $data);
    }

    public function put(string $endpoint, array $data = null): array {
        return $this->request('PUT', $endpoint, $data);
    }

    public function delete(string $endpoint): array {
        return $this->request('DELETE', $endpoint);
    }
}
