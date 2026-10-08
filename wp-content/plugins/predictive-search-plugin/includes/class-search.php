<?php
/**
 * Clase para manejar búsquedas
 */

if (!defined('ABSPATH')) {
    exit;
}

class PS_Search {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // AJAX para usuarios logueados
        add_action('wp_ajax_ps_search', array($this, 'ajax_search'));
        add_action('wp_ajax_ps_diagnostic', array($this, 'ajax_diagnostic'));
        
        // AJAX para usuarios no logueados (el diagnóstico es solo para administradores)
        add_action('wp_ajax_nopriv_ps_search', array($this, 'ajax_search'));
    }
    
    /**
     * Diagnóstico para el checklist del frontend (índice, backend, nonce)
     */
    public function ajax_diagnostic() {
        if (!current_user_can('manage_options')) {
            wp_send_json_error(null, 403);
        }

        $result = array(
            'ok'            => true,
            'checks'        => array(),
            'index_count'   => 0,
            'index_exists'   => false,
            'last_index'    => '',
            'message'       => '',
        );
        
        $index_dir  = PS_PLUGIN_DIR . 'index';
        $index_file = $index_dir . '/search-index.json';
        
        $result['checks']['backend'] = array(
            'name' => 'Backend AJAX',
            'ok'   => true,
            'msg'  => 'Endpoint de diagnóstico responde',
        );
        
        $result['checks']['nonce'] = array(
            'name' => 'Nonce búsqueda',
            'ok'   => false,
            'msg'  => '',
        );
        if (isset($_POST['nonce']) && wp_verify_nonce($_POST['nonce'], 'ps_search_nonce')) {
            $result['checks']['nonce']['ok'] = true;
            $result['checks']['nonce']['msg'] = 'Nonce válido';
        } else {
            $result['checks']['nonce']['msg'] = 'Nonce inválido o no enviado';
        }
        
        $result['checks']['index_dir'] = array(
            'name' => 'Directorio índice',
            'ok'   => file_exists($index_dir) && is_readable($index_dir),
            'msg'  => file_exists($index_dir) ? (is_readable($index_dir) ? 'Directorio existe y es legible' : 'Directorio existe pero no es legible') : 'Directorio del índice no existe',
        );
        
        $result['checks']['index_file'] = array(
            'name' => 'Archivo índice JSON',
            'ok'   => file_exists($index_file) && is_readable($index_file),
            'msg'  => '',
        );
        if (file_exists($index_file)) {
            $result['index_exists'] = true;
            $result['checks']['index_file']['msg'] = 'Archivo existe y es legible';
            $content = @file_get_contents($index_file);
            $decoded = $content ? json_decode($content, true) : null;
            $result['index_count'] = is_array($decoded) ? count($decoded) : 0;
            $result['checks']['index_data'] = array(
                'name' => 'Índice con datos',
                'ok'   => $result['index_count'] > 0,
                'msg'  => $result['index_count'] > 0 ? $result['index_count'] . ' elementos indexados' : 'Índice vacío o JSON inválido',
            );
        } else {
            $result['checks']['index_file']['msg'] = 'Archivo search-index.json no existe';
        }
        
        $result['last_index'] = get_option('ps_last_index_time', '');
        
        foreach ($result['checks'] as $c) {
            if (!$c['ok']) {
                $result['ok'] = false;
                break;
            }
        }
        
        $result['message'] = $result['ok'] ? 'Todos los checks correctos' : 'Revisa los checks fallidos en la consola';
        
        wp_send_json_success($result);
    }
    
    /**
     * Manejar búsqueda AJAX
     */
    public function ajax_search() {
        // Sin nonce: es una búsqueda pública de solo lectura, y con la
        // página en caché el nonce caduca y la búsqueda daba 403
        // wp_unslash: WordPress añade \ a las comillas de $_POST («l\'hospital»)
        $query = isset($_POST['query']) ? sanitize_text_field(wp_unslash($_POST['query'])) : '';
        $language = isset($_POST['language']) ? sanitize_key(wp_unslash($_POST['language'])) : '';
        $min_chars = get_option('ps_min_chars', 3);
        
        if (mb_strlen($query) < $min_chars) {
            wp_send_json_success(array(
                'results' => array(),
                'message' => sprintf(__('Escribe al menos %d caracteres', 'predictive-search'), $min_chars)
            ));
        }
        
        $results = $this->search($query, $language);
        
        wp_send_json_success(array(
            'results' => $results,
            'total' => count($results),
            'language' => $language
        ));
    }
    
    /**
     * Realizar búsqueda en el índice
     */
    public function search($query, $language = '') {
        $index = PS_Indexer::get_instance()->get_search_data();
        
        if (empty($index)) {
            return array();
        }
        
        // Detectar idioma actual si no se proporcionó (mejorado para WPML)
        if (empty($language)) {
            // Método 1: WPML usando apply_filters (más confiable)
            if (function_exists('apply_filters')) {
                $wpml_current_lang = apply_filters('wpml_current_language', null);
                if (!empty($wpml_current_lang)) {
                    $language = $wpml_current_lang;
                }
            }
            
            // Método 2: WPML constante ICL_LANGUAGE_CODE
            if (empty($language) && defined('ICL_LANGUAGE_CODE')) {
                $language = ICL_LANGUAGE_CODE;
            }
            
            // Método 3: Polylang
            if (empty($language) && function_exists('pll_current_language')) {
                $language = pll_current_language();
            }
        }
        
        $query = PS_Indexer::normalize($query);
        if ($query === '') {
            return array();
        }
        $results = array();
        $max_results = get_option('ps_max_results', 10);
        
        foreach ($index as $item) {
            // Filtrar por idioma si está definido (compatibilidad WPML mejorada)
            // Sin idioma = contenido que WPML no traduce: sale en todos
            if (!empty($language) && !empty($item['language'])) {
                // Comparación flexible: puede ser 'es' vs 'es-ES' o viceversa
                $item_lang = substr($item['language'], 0, 2);
                $current_lang = substr($language, 0, 2);
                
                if ($item_lang !== $current_lang && $item['language'] !== $language) {
                    continue; // Saltar este resultado si no coincide el idioma
                }
            }
            
            $score = $this->calculate_relevance($item, $query);
            
            if ($score > 0) {
                $results[] = array(
                    'id' => $item['id'],
                    'title' => isset($item['title']) ? $item['title'] : '',
                    'excerpt' => isset($item['excerpt']) ? $item['excerpt'] : '',
                    'url' => $item['url'],
                    'type' => $item['type'],
                    'type_label' => $this->type_label($item['type'], $language),
                    'thumbnail' => isset($item['thumbnail']) ? $item['thumbnail'] : '',
                    'score' => $score,
                    'date' => isset($item['date']) ? $item['date'] : '',
                    'language' => isset($item['language']) ? $item['language'] : ''
                );
            }
        }
        
        // Ordenar por relevancia
        usort($results, function($a, $b) {
            return $b['score'] - $a['score'];
        });
        
        // Limitar resultados
        return array_slice($results, 0, $max_results);
    }
    
    /**
     * Etiqueta del tipo para la tarjeta: la del admin (traducida con WPML
     * al idioma de la búsqueda) o, si no hay, el nombre en singular
     */
    private function type_label($post_type, $language) {
        static $cache = array();
        if (isset($cache[$post_type])) {
            return $cache[$post_type];
        }
        $labels = (array) get_option('ps_type_labels', array());
        if (!empty($labels[$post_type])) {
            $label = apply_filters('wpml_translate_single_string', $labels[$post_type], 'predictive-search', 'Type label: ' . $post_type, $language ?: null);
        } else {
            $object = get_post_type_object($post_type);
            $label  = $object ? $object->labels->singular_name : $post_type;
        }
        return $cache[$post_type] = $label;
    }

    /**
     * Calcular relevancia de un elemento. Compara contra el texto
     * normalizado del índice (sin acentos ni mayúsculas); $query ya viene
     * normalizada.
     */
    private function calculate_relevance($item, $query) {
        if (empty($item['n'])) {
            return 0;
        }
        $n     = $item['n'];
        $score = 0;

        // Título (peso 10, +5 si empieza por la búsqueda)
        if (isset($n['title'])) {
            $pos = strpos($n['title'], $query);
            if ($pos !== false) {
                $score += 10 + ($pos === 0 ? 5 : 0);
            }
        }

        // Contenido (peso 3 + ocurrencias, máximo 5 extra)
        if (isset($n['content']) && strpos($n['content'], $query) !== false) {
            $score += 3 + min(substr_count($n['content'], $query), 5);
        }

        // Resto de campos: peso fijo si contienen la búsqueda
        $weights = array(
            'excerpt'    => 5,
            'categories' => 4,
            'tags'       => 4,
            'author'     => 2,
            'acf'        => 3,
            'venue'      => 6,
            'meta'       => 2,
        );
        foreach ($weights as $field => $weight) {
            if (isset($n[$field]) && strpos($n[$field], $query) !== false) {
                $score += $weight;
            }
        }

        return $score;
    }
}
