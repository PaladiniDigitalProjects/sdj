<?php
/**
 * Clase para indexar contenido
 */

if (!defined('ABSPATH')) {
    exit;
}

class PS_Indexer {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('ps_daily_indexing', array($this, 'create_index'));
        add_action('ps_rebuild_index', array($this, 'create_index'));
        add_action('transition_post_status', array($this, 'update_index_on_save'), 10, 3);
        add_action('deleted_post', array($this, 'update_index_on_delete'), 10, 2);
    }

    /**
     * Texto normalizado para comparar: minúsculas y sin acentos, así
     * «MÉDICO», «Médico» y «medico» coinciden
     */
    public static function plain_text($text) {
        return html_entity_decode(wp_strip_all_tags((string) $text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    public static function normalize($text) {
        $text = self::plain_text($text);
        // Apóstrofos y comillas tipográficas = rectos: «l'hospital» encuentra «L’Hospital»
        $text = str_replace(array("\u{2019}", "\u{2018}", "\u{201C}", "\u{201D}"), array("'", "'", '"', '"'), $text);
        $text = remove_accents(mb_strtolower($text, 'UTF-8'));
        return trim(preg_replace('/\s+/u', ' ', $text));
    }
    
    /**
     * Crear el índice completo
     */
    public function create_index() {
        $index_data = array();
        
        // Obtener post types habilitados por el usuario
        $enabled_post_types = get_option('ps_enabled_post_types', array());
        
        // Si no hay configuración, usar todos los post types públicos
        if (empty($enabled_post_types)) {
            $enabled_post_types = get_post_types(array('public' => true), 'names');
        }
        
        // Obtener configuración de campos por post type
        $post_type_fields = get_option('ps_post_type_fields', array());
        
        $args = array(
            'post_type' => $enabled_post_types,
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC'
        );
        
        // Sin esto WPML limita la consulta al idioma actual y el índice
        // pierde las traducciones. Con 'all' tampoco basta: excluye los
        // post types no traducibles (notas-prensa, publicaciones).
        $args['suppress_filters'] = true;

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                
                $post_id = get_the_ID();
                $post_type = get_post_type($post_id);
                
                // Obtener campos excluidos para este post type específico
                $excluded_fields = isset($post_type_fields[$post_type]) ? $post_type_fields[$post_type] : array();
                
                $post_data = $this->get_post_data($post_id, $excluded_fields);
                
                if (!empty($post_data)) {
                    $index_data[] = $post_data;
                }
            }
            wp_reset_postdata();
        } else {
            $error_msg = 'No se encontraron posts publicados para indexar.';
            error_log('Predictive Search Warning: ' . $error_msg);
            update_option('ps_last_error', $error_msg);
        }
        
        // Guardar índice en JSON
        $json_success = $this->save_index($index_data, 'json');
        
        // Guardar índice en XML
        $xml_success = $this->save_index($index_data, 'xml');
        
        // Índice compacto que lee la búsqueda
        $this->save_search_data($index_data);

        if ($json_success || $xml_success) {
            return true;
        } else {
            error_log('Predictive Search Error: No se pudo crear ningún índice');
            return false;
        }
    }
    
    /**
     * Obtener datos del post para indexar
     */
    private function get_post_data($post_id, $excluded_fields = array()) {
        $post = get_post($post_id);
        
        if (!$post) {
            return null;
        }
        
        $data = array(
            'id' => $post_id,
            'type' => $post->post_type,
            'url' => get_permalink($post_id),
            'date' => $post->post_date
        );
        
        // WPML - Información de idioma (mejorado)
        $data['language'] = '';
        $data['language_name'] = '';
        
        // Obtener el tipo de elemento formateado para WPML (ej: 'post' -> 'post_post')
        $wpml_element_type = '';
        if (function_exists('apply_filters')) {
            $wpml_element_type = apply_filters('wpml_element_type', $post->post_type);
        } else {
            $wpml_element_type = 'post_' . $post->post_type;
        }
        
        // Tipos que WPML no traduce (en SJD: location, notas-prensa,
        // publicaciones) son el mismo contenido en todos los idiomas: sin
        // idioma, para que la búsqueda los muestre en cualquiera. Si se les
        // pusiera el de por defecto, en catalán no saldría ninguno.
        $untranslated = defined('ICL_SITEPRESS_VERSION')
            && !apply_filters('wpml_is_translated_post_type', null, $post->post_type);

        // Método 1: WPML usando apply_filters con parámetros correctos
        if ($untranslated) {
            $wpml_element_type = '';
        } elseif (function_exists('apply_filters') && !empty($wpml_element_type)) {
            // Intentar con array (versión más reciente de WPML)
            $wpml_language = apply_filters('wpml_element_language_code', null, array(
                'element_id' => $post_id,
                'element_type' => $post->post_type
            ));
            
            // Si no funciona, intentar método alternativo
            if (empty($wpml_language) && class_exists('SitePress')) {
                global $sitepress;
                if ($sitepress) {
                    $lang_details = $sitepress->get_element_language_details($post_id, $wpml_element_type);
                    if ($lang_details && isset($lang_details->language_code)) {
                        $wpml_language = $lang_details->language_code;
                    }
                }
            }
            
            if (!empty($wpml_language)) {
                $data['language'] = $wpml_language;
            }
        }
        
        // Método 2: WPML usando wpml_get_language_information
        if (!$untranslated && empty($data['language']) && function_exists('wpml_get_language_information')) {
            $lang_info = wpml_get_language_information($post_id);
            if (!is_wp_error($lang_info) && isset($lang_info['language_code'])) {
                $data['language'] = $lang_info['language_code'];
                $data['language_name'] = isset($lang_info['display_name']) ? $lang_info['display_name'] : '';
            }
        }
        
        // Método 3: WPML constante ICL_LANGUAGE_CODE (fallback)
        if (!$untranslated && empty($data['language']) && defined('ICL_LANGUAGE_CODE')) {
            $data['language'] = ICL_LANGUAGE_CODE;
        }
        
        // Método 4: Polylang
        if (!$untranslated && empty($data['language']) && function_exists('pll_get_post_language')) {
            $polylang_code = pll_get_post_language($post_id);
            if (!empty($polylang_code)) {
                $data['language'] = $polylang_code;
            }
        }
        
        // Si no hay plugin de idiomas, usar locale de WordPress
        if (!$untranslated && empty($data['language'])) {
            $locale = get_locale();
            $data['language'] = substr($locale, 0, 2); // Solo código de idioma (es, en, etc.)
        }
        
        // Guardar también el ID de traducción de WPML si existe (usando sintaxis correcta)
        if (function_exists('apply_filters') && !empty($wpml_element_type)) {
            try {
                // Sintaxis correcta: apply_filters('wpml_element_trid', null, $element_id, $element_type)
                $trid = apply_filters('wpml_element_trid', null, $post_id, $wpml_element_type);
                if ($trid) {
                    $data['wpml_trid'] = $trid;
                }
            } catch (Exception $e) {
                // Silenciar errores si WPML no está completamente inicializado
                error_log('Predictive Search WPML Error: ' . $e->getMessage());
            }
        }
        
        // Título
        if (!in_array('title', $excluded_fields)) {
            // Texto plano: get_the_title() devuelve entidades (&#8217;) y el
            // JS escapa el HTML, así que se veían en la tarjeta
            $data['title'] = self::plain_text(get_the_title($post_id));
        }
        
        // Contenido
        if (!in_array('content', $excluded_fields)) {
            $data['content'] = wp_strip_all_tags($post->post_content);
        }
        
        // Excerpt
        if (!in_array('excerpt', $excluded_fields)) {
            $data['excerpt'] = self::plain_text(get_the_excerpt($post_id));
        }
        
        // Categorías
        if (!in_array('categories', $excluded_fields)) {
            $categories = wp_get_post_categories($post_id, array('fields' => 'names'));
            $data['categories'] = implode(', ', $categories);
        }
        
        // Tags
        if (!in_array('tags', $excluded_fields)) {
            $tags = wp_get_post_tags($post_id, array('fields' => 'names'));
            $data['tags'] = implode(', ', $tags);
        }
        
        // Autor
        if (!in_array('author', $excluded_fields)) {
            $data['author'] = get_the_author_meta('display_name', $post->post_author);
        }
        
        // ACF Fields
        if (!in_array('acf', $excluded_fields) && function_exists('get_fields')) {
            $acf_fields = get_fields($post_id);
            if ($acf_fields) {
                $acf_data = array();
                foreach ($acf_fields as $key => $value) {
                    if (is_string($value) || is_numeric($value)) {
                        $acf_data[$key] = $value;
                    } elseif (is_array($value)) {
                        $acf_data[$key] = implode(', ', array_filter($value, 'is_scalar'));
                    }
                }
                $data['acf'] = $acf_data;
            }
        }
        
        // The Events Calendar
        if (!in_array('events', $excluded_fields) && function_exists('tribe_get_event')) {
            if ($post->post_type === 'tribe_events') {
                $data['event_start'] = tribe_get_start_date($post_id, false, 'Y-m-d H:i:s');
                $data['event_end'] = tribe_get_end_date($post_id, false, 'Y-m-d H:i:s');
                $data['event_venue'] = tribe_get_venue($post_id);
            }
        }
        
        // WooCommerce Products
        if ($post->post_type === 'product' && class_exists('WooCommerce')) {
            $product = wc_get_product($post_id);
            
            if ($product) {
                // SKU
                if (!in_array('product_sku', $excluded_fields)) {
                    $sku = $product->get_sku();
                    if ($sku) {
                        $data['product_sku'] = $sku;
                    }
                }
                
                // Precio
                if (!in_array('product_price', $excluded_fields)) {
                    $data['product_price'] = $product->get_price();
                    $data['product_regular_price'] = $product->get_regular_price();
                    $data['product_sale_price'] = $product->get_sale_price();
                }
                
                // Atributos
                if (!in_array('product_attributes', $excluded_fields)) {
                    $attributes = $product->get_attributes();
                    $attr_data = array();
                    
                    foreach ($attributes as $attribute) {
                        if ($attribute->is_taxonomy()) {
                            $terms = wp_get_post_terms($post_id, $attribute->get_name(), array('fields' => 'names'));
                            $attr_data[] = implode(', ', $terms);
                        } else {
                            $attr_data[] = $attribute->get_options();
                        }
                    }
                    
                    if (!empty($attr_data)) {
                        $data['product_attributes'] = implode(' | ', array_filter($attr_data));
                    }
                }
                
                // Categorías de producto
                if (!in_array('categories', $excluded_fields)) {
                    $product_cats = wp_get_post_terms($post_id, 'product_cat', array('fields' => 'names'));
                    if (!empty($product_cats)) {
                        $data['categories'] = implode(', ', $product_cats);
                    }
                }
                
                // Tags de producto
                if (!in_array('tags', $excluded_fields)) {
                    $product_tags = wp_get_post_terms($post_id, 'product_tag', array('fields' => 'names'));
                    if (!empty($product_tags)) {
                        $data['tags'] = implode(', ', $product_tags);
                    }
                }
            }
        }
        
        // Metadatos personalizados
        if (!in_array('custom_fields', $excluded_fields)) {
            $custom_fields = get_post_custom($post_id);
            $data['meta'] = array();
            
            foreach ($custom_fields as $key => $value) {
                // Excluir campos privados (que empiezan con _)
                if (substr($key, 0, 1) !== '_') {
                    $data['meta'][$key] = is_array($value) ? implode(', ', $value) : $value;
                }
            }
        }
        
        // Imagen destacada
        if (!in_array('thumbnail', $excluded_fields)) {
            $thumbnail_id = get_post_thumbnail_id($post_id);
            if ($thumbnail_id) {
                $data['thumbnail'] = wp_get_attachment_image_url($thumbnail_id, 'thumbnail');
            }
        }
        
        return $data;
    }
    
    /**
     * Guardar índice en archivo dentro del directorio del plugin
     */
    private function save_index($data, $format = 'json') {
        // Guardar índice dentro del directorio del plugin
        $index_dir = PS_PLUGIN_DIR . 'index';
        
        // Verificar y crear directorio
        if (!file_exists($index_dir)) {
            // Intentar wp_mkdir_p primero
            $created = wp_mkdir_p($index_dir);
            
            if (!$created) {
                // Intentar crear con mkdir nativo de PHP
                $created = @mkdir($index_dir, 0755, true);
            }
            
            if (!$created) {
                $error_msg = sprintf(
                    'No se pudo crear el directorio: %s. Verifica los permisos del directorio del plugin.',
                    $index_dir
                );
                error_log('Predictive Search Error: ' . $error_msg);
                update_option('ps_last_error', $error_msg);
                return false;
            } else {
                // Crear archivo .htaccess para proteger el directorio
                $htaccess_content = "Order deny,allow\nDeny from all\n";
                @file_put_contents($index_dir . '/.htaccess', $htaccess_content);
            }
            
            // Verificar que se creó
            if (!file_exists($index_dir)) {
                $error_msg = 'El directorio no existe después de intentar crearlo: ' . $index_dir;
                error_log('Predictive Search Error: ' . $error_msg);
                update_option('ps_last_error', $error_msg);
                return false;
            }
        }
        
        // Verificar permisos de escritura
        if (!is_writable($index_dir)) {
            $error_msg = sprintf(
                'El directorio no tiene permisos de escritura: %s',
                $index_dir
            );
            error_log('Predictive Search Error: ' . $error_msg);
            update_option('ps_last_error', $error_msg);
            return false;
        }
        
        // Preparar contenido según formato
        if ($format === 'json') {
            $file_path = $index_dir . '/search-index.json';
            $content = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            
            if ($content === false) {
                $error_msg = 'Error al codificar datos a JSON: ' . json_last_error_msg();
                error_log('Predictive Search Error: ' . $error_msg);
                update_option('ps_last_error', $error_msg);
                return false;
            }
        } else {
            $file_path = $index_dir . '/search-index.xml';
            $content = $this->array_to_xml($data);
            
            if ($content === false) {
                $error_msg = 'Error al crear XML';
                error_log('Predictive Search Error: ' . $error_msg);
                update_option('ps_last_error', $error_msg);
                return false;
            }
        }
        
        // Intentar escribir el archivo
        $bytes_written = @file_put_contents($file_path, $content);
        
        if ($bytes_written === false) {
            $error_msg = sprintf(
                'No se pudo escribir el archivo: %s. Verifica permisos.',
                $file_path
            );
            error_log('Predictive Search Error: ' . $error_msg);
            update_option('ps_last_error', $error_msg);
            return false;
        }
        
        // Verificar que el archivo se creó correctamente
        if (!file_exists($file_path)) {
            $error_msg = sprintf(
                'El archivo no existe después de escribir: %s',
                $file_path
            );
            error_log('Predictive Search Error: ' . $error_msg);
            update_option('ps_last_error', $error_msg);
            return false;
        }
        
        // Todo bien - actualizar timestamp y limpiar error
        update_option('ps_last_index_time', current_time('mysql'));
        update_option('ps_last_index_count', count($data));
        update_option('ps_last_index_path', $file_path); // Guardar ruta para verificación
        delete_option('ps_last_error');
        
        return true;
    }
    
    /**
     * Convertir array a XML
     */
    private function array_to_xml($data) {
        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><search_index></search_index>');
        
        foreach ($data as $item) {
            $post = $xml->addChild('post');
            foreach ($item as $key => $value) {
                if (is_array($value)) {
                    $child = $post->addChild($key);
                    foreach ($value as $subkey => $subvalue) {
                        $child->addChild($subkey, htmlspecialchars($subvalue));
                    }
                } else {
                    $post->addChild($key, htmlspecialchars($value));
                }
            }
        }
        
        return $xml->asXML();
    }
    
    /**
     * Guardar el índice que usa la búsqueda: solo lo que se muestra y el
     * texto ya normalizado de cada campo puntuable. Es un fichero PHP para
     * que OPcache lo tenga en memoria y la búsqueda no decodifique 8 MB
     * de JSON en cada petición.
     */
    private function save_search_data($index_data) {
        $data = array();
        foreach ($index_data as $item) {
            $acf  = isset($item['acf']) && is_array($item['acf']) ? implode(' | ', array_filter($item['acf'], 'is_scalar')) : '';
            $meta = isset($item['meta']) && is_array($item['meta']) ? implode(' | ', array_filter($item['meta'], 'is_scalar')) : '';
            $data[] = array(
                'id'        => $item['id'],
                'type'      => $item['type'],
                'url'       => $item['url'],
                'date'      => $item['date'],
                'language'  => $item['language'],
                'title'     => isset($item['title']) ? $item['title'] : '',
                'excerpt'   => isset($item['excerpt']) ? $item['excerpt'] : '',
                'thumbnail' => isset($item['thumbnail']) ? $item['thumbnail'] : '',
                'n'         => array_filter(array(
                    'title'      => self::normalize(isset($item['title']) ? $item['title'] : ''),
                    'excerpt'    => self::normalize(isset($item['excerpt']) ? $item['excerpt'] : ''),
                    'content'    => self::normalize(isset($item['content']) ? $item['content'] : ''),
                    'categories' => self::normalize(isset($item['categories']) ? $item['categories'] : ''),
                    'tags'       => self::normalize(isset($item['tags']) ? $item['tags'] : ''),
                    'author'     => self::normalize(isset($item['author']) ? $item['author'] : ''),
                    'venue'      => self::normalize(isset($item['event_venue']) ? $item['event_venue'] : ''),
                    'acf'        => self::normalize($acf),
                    'meta'       => self::normalize($meta),
                ), 'strlen'),
            );
        }

        $file = PS_PLUGIN_DIR . 'index/search-data.php';
        $tmp  = $file . '.tmp';
        $php  = "<?php\n// Generado por Predictive Search. No editar.\nif (!defined('ABSPATH')) exit;\nreturn " . var_export($data, true) . ";\n";
        // Escribir aparte y renombrar: una búsqueda nunca lee un fichero a medias
        if (@file_put_contents($tmp, $php) === false || !@rename($tmp, $file)) {
            error_log('Predictive Search Error: no se pudo escribir ' . $file);
            return false;
        }
        if (function_exists('opcache_invalidate')) {
            opcache_invalidate($file, true);
        }
        return true;
    }

    /**
     * Índice compacto para la búsqueda (ver save_search_data)
     */
    public function get_search_data() {
        $file = PS_PLUGIN_DIR . 'index/search-data.php';
        if (!file_exists($file)) {
            // No regenerar aquí: tardaría segundos dentro de una búsqueda
            $this->schedule_rebuild();
            return array();
        }
        $data = include $file;
        return is_array($data) ? $data : array();
    }

    /**
     * Pedir una regeneración en segundo plano. Varias peticiones seguidas
     * (un guardado con revisiones, un borrado masivo) dan una sola.
     */
    public function schedule_rebuild() {
        if (!wp_next_scheduled('ps_rebuild_index')) {
            wp_schedule_single_event(time() + 60, 'ps_rebuild_index');
        }
    }

    private function is_indexed_type($post_type) {
        $enabled = get_option('ps_enabled_post_types', array());
        if (empty($enabled)) {
            $enabled = get_post_types(array('public' => true), 'names');
        }
        return in_array($post_type, (array) $enabled, true);
    }

    /**
     * Actualizar índice cuando un post entra o sale de «publicado»
     */
    public function update_index_on_save($new_status, $old_status, $post) {
        if ($new_status !== 'publish' && $old_status !== 'publish') {
            return;
        }
        if (wp_is_post_revision($post) || wp_is_post_autosave($post) || !$this->is_indexed_type($post->post_type)) {
            return;
        }
        $this->schedule_rebuild();
    }

    /**
     * Actualizar índice cuando se borra un post publicado (los que pasan
     * por la papelera ya salieron del índice al cambiar de estado)
     */
    public function update_index_on_delete($post_id, $post = null) {
        if ($post && $post->post_status === 'publish' && $this->is_indexed_type($post->post_type)) {
            $this->schedule_rebuild();
        }
    }
    
    /**
     * Obtener el índice desde el directorio del plugin
     */
    public function get_index($format = 'json') {
        $index_dir = PS_PLUGIN_DIR . 'index';
        $file_path = $index_dir . '/search-index.' . $format;
        
        if (!file_exists($file_path)) {
            $this->create_index();
            // Intentar leer de nuevo después de crear
            if (!file_exists($file_path)) {
                return array();
            }
        }
        
        if ($format === 'json') {
            $content = file_get_contents($file_path);
            $decoded = json_decode($content, true);
            return $decoded !== null ? $decoded : array();
        } else {
            $xml = @simplexml_load_file($file_path);
            return $xml !== false ? $xml : array();
        }
    }
}
