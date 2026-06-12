<?php

class WP_MCP_Blocks_Endpoint {

    public static function get_block_types($request) {
        $params = $request->get_params();
        $namespace = !empty($params['namespace']) ? sanitize_key($params['namespace']) : null;

        $block_registry = WP_Block_Type_Registry::get_instance();
        $block_types = $block_registry->get_all_registered();

        $result = array();
        foreach ($block_types as $name => $block_type) {
            if ($namespace && strpos($name, $namespace . '/') !== 0) {
                continue;
            }

            $result[] = array(
                'name' => $name,
                'title' => $block_type->title ? $block_type->title : $name,
                'description' => $block_type->description,
                'category' => isset($block_type->block_args['category']) ? $block_type->block_args['category'] : null,
                'icon' => isset($block_type->block_args['icon']) ? $block_type->block_args['icon'] : null,
                'keywords' => $block_type->keywords,
                'styles' => $block_type->styles,
                'variations' => $block_type->variations,
                'supports' => $block_type->supports,
                'api_version' => $block_type->api_version
            );
        }

        return WP_MCP_Response::success($result);
    }

    public static function get_block_patterns($request) {
        $params = $request->get_params();
        $category = !empty($params['category']) ? sanitize_key($params['category']) : null;
        $search = !empty($params['search']) ? sanitize_text_field($params['search']) : null;

        if (function_exists('_load_remote_block_patterns')) {
            _load_remote_block_patterns();
            _load_remote_featured_patterns();
            _register_remote_theme_patterns();
        }

        $pattern_registry = WP_Block_Patterns_Registry::get_instance();
        $patterns = $pattern_registry->get_all_registered();

        $result = array();
        foreach ($patterns as $pattern) {
            if ($category && !in_array($category, $pattern['categories'] ?? array())) {
                continue;
            }

            if ($search) {
                $search_lower = strtolower($search);
                $match = false;
                if (isset($pattern['name']) && strpos(strtolower($pattern['name']), $search_lower) !== false) {
                    $match = true;
                }
                if (isset($pattern['title']) && strpos(strtolower($pattern['title']), $search_lower) !== false) {
                    $match = true;
                }
                if (isset($pattern['description']) && strpos(strtolower($pattern['description']), $search_lower) !== false) {
                    $match = true;
                }
                if (!$match) {
                    continue;
                }
            }

            $result[] = array(
                'name' => $pattern['name'] ?? '',
                'title' => $pattern['title'] ?? '',
                'description' => $pattern['description'] ?? '',
                'categories' => $pattern['categories'] ?? array(),
                'keywords' => $pattern['keywords'] ?? array(),
                'content' => $pattern['content'] ?? '',
                'viewport_width' => isset($pattern['viewportWidth']) ? $pattern['viewportWidth'] : null
            );
        }

        return WP_MCP_Response::success($result);
    }

    public static function get_synced_patterns($request) {
        $params = $request->get_params();
        $per_page = !empty($params['per_page']) ? intval($params['per_page']) : 20;
        $page = !empty($params['page']) ? intval($params['page']) : 1;

        $args = array(
            'post_type' => 'wp_block',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'paged' => $page,
            'orderby' => 'title',
            'order' => 'ASC'
        );

        if (!empty($params['search'])) {
            $args['s'] = sanitize_text_field($params['search']);
        }

        $query = new WP_Query($args);
        $patterns = array();

        foreach ($query->posts as $post) {
            $patterns[] = self::format_synced_pattern($post);
        }

        return WP_MCP_Response::success(array(
            'patterns' => $patterns,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages,
            'page' => $page
        ));
    }

    public static function get_synced_pattern($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post || $post->post_type !== 'wp_block') {
            return WP_MCP_Response::not_found('Synced pattern not found');
        }

        return WP_MCP_Response::success(self::format_synced_pattern($post, true));
    }

    public static function create_synced_pattern($request) {
        $params = $request->get_json_params();

        if (empty($params['title'])) {
            return WP_MCP_Response::error('Title is required', 'missing_title');
        }

        if (empty($params['content'])) {
            return WP_MCP_Response::error('Content is required', 'missing_content');
        }

        $post_data = array(
            'post_title' => sanitize_text_field($params['title']),
            'post_content' => $params['content'],
            'post_status' => 'publish',
            'post_type' => 'wp_block'
        );

        $sync_status = !empty($params['sync_status']) ? sanitize_key($params['sync_status']) : 'synced';

        $post_id = wp_insert_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'create_failed');
        }

        update_post_meta($post_id, 'wp_pattern_sync_status', $sync_status);

        return WP_MCP_Response::success(array(
            'id' => $post_id,
            'title' => $post_data['post_title'],
            'sync_status' => $sync_status
        ), 'Synced pattern created successfully');
    }

    public static function update_synced_pattern($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post || $post->post_type !== 'wp_block') {
            return WP_MCP_Response::not_found('Synced pattern not found');
        }

        $params = $request->get_json_params();
        $post_data = array('ID' => $id);

        if (!empty($params['title'])) {
            $post_data['post_title'] = sanitize_text_field($params['title']);
        }

        if (isset($params['content'])) {
            $post_data['post_content'] = $params['content'];
        }

        if (!empty($params['sync_status'])) {
            update_post_meta($id, 'wp_pattern_sync_status', sanitize_key($params['sync_status']));
        }

        $post_id = wp_update_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'update_failed');
        }

        return WP_MCP_Response::success(array(
            'id' => $post_id,
            'title' => get_post_field('post_title', $post_id)
        ), 'Synced pattern updated successfully');
    }

    public static function delete_synced_pattern($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post || $post->post_type !== 'wp_block') {
            return WP_MCP_Response::not_found('Synced pattern not found');
        }

        $result = wp_delete_post($id, true);

        if (!$result) {
            return WP_MCP_Response::error('Failed to delete synced pattern', 'delete_failed');
        }

        return WP_MCP_Response::success(array('id' => $id), 'Synced pattern deleted');
    }

    public static function insert_block_reference($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $params = $request->get_json_params();

        if (empty($params['block_ref'])) {
            return WP_MCP_Response::error('block_ref is required', 'missing_block_ref');
        }

        $block_ref = intval($params['block_ref']);
        $position = !empty($params['position']) ? sanitize_key($params['position']) : 'append';

        $existing_content = $post->post_content;

        $block_reference = sprintf('<!-- wp:block {"ref":%d} /-->', $block_ref);

        if ($position === 'prepend') {
            $new_content = $block_reference . "\n" . $existing_content;
        } elseif ($position === 'append' || !is_int(strpos($position, 'after:'))) {
            $new_content = $existing_content . "\n" . $block_reference;
        } else {
            $after_block = intval(str_replace('after:', '', $position));
            $pattern = '/(<!-- wp:block \{"ref":\d+" \/-->)/';
            $blocks = preg_split($pattern, $existing_content, -1, PREG_SPLIT_DELIM_CAPTURE);
            $inserted = false;
            $new_blocks = array();

            foreach ($blocks as $block) {
                $new_blocks[] = $block;
                if (preg_match('/<!-- wp:block \{"ref":(\d+)" \/-->/', $block, $matches) && intval($matches[1]) === $after_block) {
                    $new_blocks[] = "\n" . $block_reference;
                    $inserted = true;
                }
            }

            if (!$inserted) {
                $new_blocks[] = "\n" . $block_reference;
            }

            $new_content = implode('', $new_blocks);
        }

        $post_data = array(
            'ID' => $id,
            'post_content' => $new_content
        );

        wp_update_post($post_data);

        return WP_MCP_Response::success(array(
            'id' => $id,
            'block_ref' => $block_ref,
            'position' => $position
        ), 'Block reference inserted successfully');
    }

    private static function format_synced_pattern($post, $full = false) {
        $formatted = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'name' => $post->post_name,
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'link' => get_permalink($post->ID)
        );

        $sync_status = get_post_meta($post->ID, 'wp_pattern_sync_status', true);
        $formatted['sync_status'] = !empty($sync_status) ? $sync_status : 'synced';

        if ($full) {
            $formatted['content'] = $post->post_content;
            $formatted['blocks'] = self::parse_blocks($post->post_content);
        }

        return $formatted;
    }

    private static function parse_blocks($content) {
        if (empty($content)) {
            return array();
        }

        $blocks = parse_blocks($content);
        $parsed = array();

        foreach ($blocks as $index => $block) {
            if (!empty($block['blockName'])) {
                $parsed[] = array(
                    'index' => $index,
                    'name' => $block['blockName'],
                    'attrs' => $block['attrs'] ?? array()
                );
            }
        }

        return $parsed;
    }
}
