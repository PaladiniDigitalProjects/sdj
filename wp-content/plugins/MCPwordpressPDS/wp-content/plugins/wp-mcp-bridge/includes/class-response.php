<?php

class WP_MCP_Response {
    public static function success($data, $message = null) {
        $response = array(
            'success' => true,
            'data' => $data,
        );
        if ($message !== null) {
            $response['message'] = $message;
        }
        return $response;
    }

    public static function error($message, $code = 'error', $status = 400) {
        return new WP_Error($code, $message, array('status' => $status));
    }

    public static function not_found($message = 'Resource not found') {
        return new WP_Error('not_found', $message, array('status' => 404));
    }

    public static function forbidden($message = 'Forbidden') {
        return new WP_Error('forbidden', $message, array('status' => 403));
    }

    public static function unauthorized($message = 'Unauthorized') {
        return new WP_Error('unauthorized', $message, array('status' => 401));
    }
}
