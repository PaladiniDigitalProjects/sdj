<?php

class WP_MCP_Posts_Endpoint {
    public static function get_items($request) {
        $params = $request->get_params();
        
        $args = array(
            'post_type' => !empty($params['post_type']) ? $params['post_type'] : 'post',
            'post_status' => !empty($params['post_status']) ? $params['post_status'] : 'publish',
            'posts_per_page' => !empty($params['per_page']) ? intval($params['per_page']) : 10,
        );

        if (!empty($params['search'])) {
            $args['s'] = $params['search'];
        }

        if (!empty($params['author'])) {
            $args['author'] = $params['author'];
        }

        $query = new WP_Query($args);
        $posts = array();

        foreach ($query->posts as $post) {
            $posts[] = self::format_post($post);
        }

        return WP_MCP_Response::success($posts);
    }

    public static function get_item($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        return WP_MCP_Response::success(self::format_post($post, true));
    }

    public static function create_item($request) {
        $params = $request->get_json_params();

        if (empty($params['title'])) {
            return WP_MCP_Response::error('Title is required', 'missing_title');
        }

        $post_data = array(
            'post_title' => $params['title'],
            'post_content' => !empty($params['content']) ? $params['content'] : '',
            'post_status' => !empty($params['status']) ? $params['status'] : 'draft',
            'post_type' => !empty($params['type']) ? $params['type'] : 'post',
        );

        if (!empty($params['meta_input'])) {
            $post_data['meta_input'] = $params['meta_input'];
        }

        $post_id = wp_insert_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'create_failed');
        }

        if (!empty($params['featured_image'])) {
            self::set_featured_image($post_id, $params['featured_image']);
        }

        if (!empty($params['categories'])) {
            self::set_post_terms($post_id, $params['categories'], 'category');
        }

        if (!empty($params['tags'])) {
            self::set_post_terms($post_id, $params['tags'], 'post_tag');
        }

        return WP_MCP_Response::success(array('id' => $post_id), 'Post created successfully');
    }

    public static function update_item($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $params = $request->get_json_params();
        $post_data = array('ID' => $id);

        if (!empty($params['title'])) {
            $post_data['post_title'] = $params['title'];
        }

        if (isset($params['content'])) {
            $post_data['post_content'] = $params['content'];
        }

        if (!empty($params['status'])) {
            $post_data['post_status'] = $params['status'];
        }

        if (!empty($params['meta_input'])) {
            $post_data['meta_input'] = $params['meta_input'];
        }

        $post_id = wp_update_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'update_failed');
        }

        if (isset($params['featured_image'])) {
            self::set_featured_image($post_id, $params['featured_image']);
        }

        if (isset($params['categories'])) {
            self::set_post_terms($post_id, $params['categories'], 'category');
        }

        if (isset($params['tags'])) {
            self::set_post_terms($post_id, $params['tags'], 'post_tag');
        }

        return WP_MCP_Response::success(array('id' => $post_id), 'Post updated successfully');
    }

    public static function delete_item($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $result = wp_trash_post($id);

        if (!$result) {
            return WP_MCP_Response::error('Failed to delete post', 'delete_failed');
        }

        return WP_MCP_Response::success(array('id' => $id), 'Post moved to trash');
    }

    public static function get_meta($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $key = !empty($request['key']) ? sanitize_key($request['key']) : null;

        if ($key) {
            $value = get_post_meta($id, $key, true);
            return WP_MCP_Response::success(array(
                'id' => $id,
                'key' => $key,
                'value' => $value
            ));
        }

        $all_meta = get_post_meta($id);
        $filtered_meta = array();
        
        foreach ($all_meta as $meta_key => $meta_values) {
            if (substr($meta_key, 0, 1) !== '_' || self::is_important_meta($meta_key)) {
                $filtered_meta[$meta_key] = !empty($meta_values) ? $meta_values[0] : '';
            }
        }

        return WP_MCP_Response::success(array(
            'id' => $id,
            'meta' => $filtered_meta
        ));
    }

    public static function update_meta($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $params = $request->get_json_params();

        if (empty($params['meta']) || !is_array($params['meta'])) {
            return WP_MCP_Response::error('Meta data is required', 'missing_meta');
        }

        $updated = array();
        $deleted = array();

        foreach ($params['meta'] as $key => $value) {
            $key = sanitize_key($key);
            
            if ($value === null || $value === '' || $value === false) {
                delete_post_meta($id, $key);
                $deleted[] = $key;
            } else {
                update_post_meta($id, $key, $value);
                $updated[] = $key;
            }
        }

        return WP_MCP_Response::success(array(
            'id' => $id,
            'updated' => $updated,
            'deleted' => $deleted
        ), 'Meta updated successfully');
    }

    public static function get_terms($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $taxonomy = !empty($request['taxonomy']) ? sanitize_key($request['taxonomy']) : null;

        if ($taxonomy) {
            $terms = wp_get_post_terms($id, $taxonomy, array('fields' => 'all'));
            if (is_wp_error($terms)) {
                return WP_MCP_Response::error($terms->get_error_message(), 'terms_error');
            }

            $formatted_terms = array();
            foreach ($terms as $term) {
                $formatted_terms[] = array(
                    'id' => $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                    'taxonomy' => $term->taxonomy
                );
            }

            return WP_MCP_Response::success(array(
                'id' => $id,
                'taxonomy' => $taxonomy,
                'terms' => $formatted_terms
            ));
        }

        $taxonomies = get_object_taxonomies($post->post_type, 'names');
        $all_terms = array();

        foreach ($taxonomies as $taxonomy_name) {
            $terms = wp_get_post_terms($id, $taxonomy_name, array('fields' => 'all'));
            if (!is_wp_error($terms) && !empty($terms)) {
                $all_terms[$taxonomy_name] = array();
                foreach ($terms as $term) {
                    $all_terms[$taxonomy_name][] = array(
                        'id' => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    );
                }
            }
        }

        return WP_MCP_Response::success(array(
            'id' => $id,
            'taxonomies' => $all_terms
        ));
    }

    public static function update_terms($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post) {
            return WP_MCP_Response::not_found('Post not found');
        }

        $params = $request->get_json_params();

        if (empty($params['taxonomy']) || empty($params['terms'])) {
            return WP_MCP_Response::error('Taxonomy and terms are required', 'missing_params');
        }

        $taxonomy = sanitize_key($params['taxonomy']);
        $terms = $params['terms'];

        if (!taxonomy_exists($taxonomy)) {
            return WP_MCP_Response::error('Taxonomy does not exist', 'invalid_taxonomy');
        }

        $term_ids = array();

        foreach ($terms as $term) {
            if (is_numeric($term)) {
                $term_ids[] = absint($term);
            } elseif (is_string($term)) {
                $existing_term = get_term_by('slug', $term, $taxonomy);
                if (!$existing_term) {
                    $existing_term = get_term_by('name', $term, $taxonomy);
                }
                if ($existing_term) {
                    $term_ids[] = $existing_term->term_id;
                } else {
                    $new_term = wp_insert_term($term, $taxonomy);
                    if (!is_wp_error($new_term)) {
                        $term_ids[] = $new_term['term_id'];
                    }
                }
            }
        }

        $result = wp_set_object_terms($id, $term_ids, $taxonomy);

        if (is_wp_error($result)) {
            return WP_MCP_Response::error($result->get_error_message(), 'terms_update_failed');
        }

        return WP_MCP_Response::success(array(
            'id' => $id,
            'taxonomy' => $taxonomy,
            'terms' => $term_ids
        ), 'Terms updated successfully');
    }

    private static function format_post($post, $full = false) {
        $post_id = $post->ID;

        $formatted = array(
            'id' => $post_id,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'status' => $post->post_status,
            'type' => $post->post_type,
            'author' => $post->post_author,
            'author_name' => get_the_author_meta('display_name', $post->post_author),
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'slug' => $post->post_name,
            'link' => get_permalink($post_id)
        );

        $featured_image_id = get_post_thumbnail_id($post_id);
        if ($featured_image_id) {
            $featured_image = wp_get_attachment_image_src($featured_image_id, 'full');
            if ($featured_image) {
                $formatted['featured_image'] = array(
                    'id' => $featured_image_id,
                    'url' => $featured_image[0],
                    'alt' => get_post_meta($featured_image_id, '_wp_attachment_image_alt', true)
                );
            }
        } else {
            $formatted['featured_image'] = null;
        }

        $formatted['thumbnail'] = !empty($formatted['featured_image']) ? $formatted['featured_image'] : null;

        $categories = wp_get_post_terms($post_id, 'category', array('fields' => 'all'));
        $formatted['categories'] = array();
        if (!is_wp_error($categories)) {
            foreach ($categories as $cat) {
                $formatted['categories'][] = array(
                    'id' => $cat->term_id,
                    'name' => $cat->name,
                    'slug' => $cat->slug
                );
            }
        }

        $tags = wp_get_post_terms($post_id, 'post_tag', array('fields' => 'all'));
        $formatted['tags'] = array();
        if (!is_wp_error($tags)) {
            foreach ($tags as $tag) {
                $formatted['tags'][] = array(
                    'id' => $tag->term_id,
                    'name' => $tag->name,
                    'slug' => $tag->slug
                );
            }
        }

        if ($full) {
            $gallery_ids = get_post_meta($post_id, '_product_image_gallery', true);
            if (empty($gallery_ids) && $post->post_type === 'product') {
                $gallery_ids = get_post_meta($post_id, 'gallery', true);
            }
            
            $formatted['gallery_images'] = array();
            if (!empty($gallery_ids)) {
                if (is_string($gallery_ids)) {
                    $gallery_ids = array_map('trim', explode(',', $gallery_ids));
                }
                foreach ($gallery_ids as $gallery_id) {
                    $gallery_id = absint($gallery_id);
                    if ($gallery_id) {
                        $gallery_image = wp_get_attachment_image_src($gallery_id, 'full');
                        if ($gallery_image) {
                            $formatted['gallery_images'][] = array(
                                'id' => $gallery_id,
                                'url' => $gallery_image[0],
                                'alt' => get_post_meta($gallery_id, '_wp_attachment_image_alt', true),
                                'caption' => get_post_field('post_excerpt', $gallery_id)
                            );
                        }
                    }
                }
            }

            $formatted['meta'] = array();
            $all_meta = get_post_meta($post_id);
            foreach ($all_meta as $meta_key => $meta_values) {
                if (substr($meta_key, 0, 1) !== '_') {
                    $formatted['meta'][$meta_key] = !empty($meta_values) ? $meta_values[0] : '';
                }
            }
        }

        return $formatted;
    }

    private static function set_featured_image($post_id, $image_data) {
        if (is_numeric($image_data)) {
            $attachment_id = absint($image_data);
        } elseif (is_string($image_data) && filter_var($image_data, FILTER_VALIDATE_URL)) {
            $attachment_id = self::get_attachment_id_from_url($image_data);
        } else {
            return;
        }

        if ($attachment_id && get_post_type($attachment_id) === 'attachment') {
            set_post_thumbnail($post_id, $attachment_id);
        }
    }

    private static function set_post_terms($post_id, $terms, $taxonomy) {
        $term_ids = array();

        foreach ($terms as $term) {
            if (is_numeric($term)) {
                $term_ids[] = absint($term);
            } elseif (is_string($term)) {
                $existing = get_term_by('slug', $term, $taxonomy);
                if (!$existing) {
                    $existing = get_term_by('name', $term, $taxonomy);
                }
                if ($existing) {
                    $term_ids[] = $existing->term_id;
                }
            }
        }

        if (!empty($term_ids)) {
            wp_set_object_terms($post_id, $term_ids, $taxonomy);
        }
    }

    private static function get_attachment_id_from_url($url) {
        global $wpdb;
        
        $attachment = $wpdb->get_col($wpdb->prepare(
            "SELECT ID FROM $wpdb->posts WHERE guid='%s'",
            $url
        ));

        return !empty($attachment) ? $attachment[0] : 0;
    }

    private static function is_important_meta($key) {
        $important_keys = array(
            '_thumbnail_id',
            '_product_image_gallery',
            '_price',
            '_regular_price',
            '_sale_price',
            '_sku',
            '_stock',
            '_stock_status',
            '_weight',
            '_length',
            '_width',
            '_height'
        );
        
        return in_array($key, $important_keys);
    }
}
