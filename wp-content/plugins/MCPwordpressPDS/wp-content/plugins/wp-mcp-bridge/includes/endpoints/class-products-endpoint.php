<?php

class WP_MCP_Products_Endpoint {
    
    public static function get_items($request) {
        $params = $request->get_params();
        
        $args = array(
            'post_type' => 'product',
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
        $products = array();

        foreach ($query->posts as $post) {
            $products[] = self::format_product($post);
        }

        return WP_MCP_Response::success($products);
    }

    public static function get_item($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post || $post->post_type !== 'product') {
            return WP_MCP_Response::not_found('Product not found');
        }

        return WP_MCP_Response::success(self::format_product($post, true));
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
            'post_type' => 'product',
        );

        $post_id = wp_insert_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'create_failed');
        }

        if (!empty($params['featured_image'])) {
            self::set_featured_image($post_id, $params['featured_image']);
        }

        if (!empty($params['gallery'])) {
            self::set_gallery($post_id, $params['gallery']);
        }

        if (!empty($params['categories'])) {
            self::set_product_categories($post_id, $params['categories']);
        }

        if (!empty($params['price'])) {
            update_post_meta($post_id, '_price', $params['price']);
            update_post_meta($post_id, '_regular_price', $params['price']);
        }

        if (!empty($params['sku'])) {
            update_post_meta($post_id, '_sku', $params['sku']);
        }

        if (isset($params['stock'])) {
            update_post_meta($post_id, '_stock', $params['stock']);
            update_post_meta($post_id, '_stock_status', $params['stock'] > 0 ? 'instock' : 'outofstock');
        }

        if (isset($params['meta_input'])) {
            foreach ($params['meta_input'] as $key => $value) {
                update_post_meta($post_id, $key, $value);
            }
        }

        return WP_MCP_Response::success(
            array('id' => $post_id),
            'Product created successfully'
        );
    }

    public static function update_item($request) {
        $id = intval($request['id']);
        $post = get_post($id);

        if (!$post || $post->post_type !== 'product') {
            return WP_MCP_Response::not_found('Product not found');
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

        $post_id = wp_update_post($post_data);

        if (is_wp_error($post_id)) {
            return WP_MCP_Response::error($post_id->get_error_message(), 'update_failed');
        }

        if (isset($params['featured_image'])) {
            self::set_featured_image($post_id, $params['featured_image']);
        }

        if (isset($params['gallery'])) {
            self::set_gallery($post_id, $params['gallery']);
        }

        if (isset($params['categories'])) {
            self::set_product_categories($post_id, $params['categories']);
        }

        if (isset($params['tags'])) {
            self::set_product_tags($post_id, $params['tags']);
        }

        if (isset($params['price'])) {
            update_post_meta($post_id, '_price', $params['price']);
        }

        if (isset($params['regular_price'])) {
            update_post_meta($post_id, '_regular_price', $params['regular_price']);
        }

        if (isset($params['sale_price'])) {
            update_post_meta($post_id, '_sale_price', $params['sale_price']);
        }

        if (!empty($params['sku'])) {
            update_post_meta($post_id, '_sku', $params['sku']);
        }

        if (isset($params['stock'])) {
            update_post_meta($post_id, '_stock', $params['stock']);
            update_post_meta($post_id, '_stock_status', $params['stock'] > 0 ? 'instock' : 'outofstock');
        }

        if (isset($params['stock_status'])) {
            update_post_meta($post_id, '_stock_status', $params['stock_status']);
        }

        if (!empty($params['weight'])) {
            update_post_meta($post_id, '_weight', $params['weight']);
        }

        if (!empty($params['dimensions'])) {
            $dimensions = $params['dimensions'];
            if (is_array($dimensions)) {
                update_post_meta($post_id, '_length', !empty($dimensions['length']) ? $dimensions['length'] : '');
                update_post_meta($post_id, '_width', !empty($dimensions['width']) ? $dimensions['width'] : '');
                update_post_meta($post_id, '_height', !empty($dimensions['height']) ? $dimensions['height'] : '');
            }
        }

        if (!empty($params['attributes'])) {
            self::set_product_attributes($post_id, $params['attributes']);
        }

        if (isset($params['meta_input'])) {
            foreach ($params['meta_input'] as $key => $value) {
                update_post_meta($post_id, $key, $value);
            }
        }

        return WP_MCP_Response::success(array('id' => $post_id), 'Product updated successfully');
    }

    private static function format_product($post, $full = false) {
        $product_id = $post->ID;
        
        $formatted = array(
            'id' => $product_id,
            'title' => $post->post_title,
            'content' => $post->post_content,
            'excerpt' => $post->post_excerpt,
            'status' => $post->post_status,
            'type' => $post->post_type,
            'author' => $post->post_author,
            'author_name' => get_the_author_meta('display_name', $post->post_author),
            'date' => $post->post_date,
            'modified' => $post->post_modified,
            'slug' => $post->post_name,
        );

        if (class_exists('WooCommerce')) {
            $formatted['price'] = get_post_meta($product_id, '_price', true);
            $formatted['regular_price'] = get_post_meta($product_id, '_regular_price', true);
            $formatted['sale_price'] = get_post_meta($product_id, '_sale_price', true);
            $formatted['sku'] = get_post_meta($product_id, '_sku', true);
            $formatted['stock_status'] = get_post_meta($product_id, '_stock_status', true);
            $formatted['stock_quantity'] = get_post_meta($product_id, '_stock', true);
            $formatted['weight'] = get_post_meta($product_id, '_weight', true);
            $formatted['weight_unit'] = get_option('woocommerce_weight_unit', 'kg');
            
            $dimensions = array(
                'length' => get_post_meta($product_id, '_length', true),
                'width' => get_post_meta($product_id, '_width', true),
                'height' => get_post_meta($product_id, '_height', true),
                'unit' => get_option('woocommerce_dimension_unit', 'cm')
            );
            $formatted['dimensions'] = $dimensions;

            $formatted['attributes'] = self::get_product_attributes($product_id);
        }

        $featured_image_id = get_post_thumbnail_id($product_id);
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

        $categories = wp_get_post_terms($product_id, 'product_cat', array('fields' => 'all'));
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

        $tags = wp_get_post_terms($product_id, 'product_tag', array('fields' => 'all'));
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
            $gallery_ids = get_post_meta($product_id, '_product_image_gallery', true);
            $formatted['gallery'] = array();
            if (!empty($gallery_ids)) {
                $gallery_ids = explode(',', $gallery_ids);
                foreach ($gallery_ids as $gallery_id) {
                    $gallery_id = absint($gallery_id);
                    if ($gallery_id) {
                        $gallery_image = wp_get_attachment_image_src($gallery_id, 'full');
                        if ($gallery_image) {
                            $formatted['gallery'][] = array(
                                'id' => $gallery_id,
                                'url' => $gallery_image[0],
                                'alt' => get_post_meta($gallery_id, '_wp_attachment_image_alt', true),
                                'caption' => get_post_field('post_excerpt', $gallery_id)
                            );
                        }
                    }
                }
            }
        }

        $formatted['thumbnail'] = !empty($formatted['featured_image']) ? $formatted['featured_image'] : null;

        return $formatted;
    }

    private static function get_product_attributes($product_id) {
        $attributes = array();
        
        if (function_exists('wc_get_product')) {
            $product = wc_get_product($product_id);
            if ($product) {
                $wc_attributes = $product->get_attributes();
                foreach ($wc_attributes as $name => $attribute) {
                    if ($attribute->get_id()) {
                        $attributes[] = array(
                            'id' => $attribute->get_id(),
                            'name' => $name,
                            'value' => $attribute->get_options() ? implode(', ', $attribute->get_options()) : '',
                            'is_visible' => $attribute->get_visible(),
                            'is_taxonomy' => $attribute->get_id() > 0
                        );
                    }
                }
            }
        }
        
        return $attributes;
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

    private static function set_gallery($post_id, $gallery_ids) {
        if (!is_array($gallery_ids)) {
            $gallery_ids = array($gallery_ids);
        }

        $gallery_ids = array_filter(array_map('absint', $gallery_ids));
        $gallery_string = implode(',', $gallery_ids);

        update_post_meta($post_id, '_product_image_gallery', $gallery_string);
    }

    private static function set_product_categories($post_id, $categories) {
        $category_ids = array();

        foreach ($categories as $category) {
            if (is_numeric($category)) {
                $category_ids[] = absint($category);
            } elseif (is_string($category)) {
                $term = get_term_by('slug', $category, 'product_cat');
                if ($term) {
                    $category_ids[] = $term->term_id;
                } else {
                    $new_term = wp_insert_term($category, 'product_cat');
                    if (!is_wp_error($new_term)) {
                        $category_ids[] = $new_term['term_id'];
                    }
                }
            }
        }

        if (!empty($category_ids)) {
            wp_set_object_terms($post_id, $category_ids, 'product_cat');
        }
    }

    private static function set_product_tags($post_id, $tags) {
        $tag_ids = array();

        foreach ($tags as $tag) {
            if (is_numeric($tag)) {
                $tag_ids[] = absint($tag);
            } elseif (is_string($tag)) {
                $term = get_term_by('slug', $tag, 'product_tag');
                if ($term) {
                    $tag_ids[] = $term->term_id;
                } else {
                    $new_term = wp_insert_term($tag, 'product_tag');
                    if (!is_wp_error($new_term)) {
                        $tag_ids[] = $new_term['term_id'];
                    }
                }
            }
        }

        if (!empty($tag_ids)) {
            wp_set_object_terms($post_id, $tag_ids, 'product_tag');
        }
    }

    private static function set_product_attributes($post_id, $attributes) {
        if (!is_array($attributes)) {
            return;
        }

        $attribute_data = array();

        foreach ($attributes as $attribute) {
            if (is_array($attribute) && !empty($attribute['name'])) {
                $attribute_data[sanitize_title($attribute['name'])] = array(
                    'name' => $attribute['name'],
                    'value' => !empty($attribute['value']) ? $attribute['value'] : '',
                    'position' => !empty($attribute['position']) ? $attribute['position'] : 0,
                    'is_visible' => !empty($attribute['is_visible']) ? 1 : 0,
                    'is_variation' => !empty($attribute['is_variation']) ? 1 : 0,
                    'is_taxonomy' => 0
                );
            }
        }

        if (!empty($attribute_data)) {
            update_post_meta($post_id, '_product_attributes', $attribute_data);
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
}
