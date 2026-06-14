<?php
/**
 * Plugin Name:       PDS WPML Tools
 * Description:       Utilidades WPML para el tema: bloque "Logo multiidioma" (gemelo de Site Logo con una imagen por idioma) y panel de idioma del Editor del sitio (selector de idioma admin + traducciones vinculadas de plantillas, partes de plantilla y patrones).
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Paladini Digital Solutions
 * License:           GPL-2.0-or-later
 * Text Domain:       pds-wpml-tools
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registra el bloque dinámico "Logo multiidioma".
 */
function pds_wpml_tools_register_logo_block() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'pds_wpml_tools_register_logo_block' );

/**
 * Aviso en admin si WPML no está activo. El bloque "Logo multiidioma" sigue
 * funcionando en modo de idioma único; el panel de idioma del Editor del
 * sitio no tiene sentido sin WPML y no se encola.
 */
function pds_wpml_tools_admin_notice() {
    if ( class_exists( 'SitePress' ) ) {
        return;
    }

    echo '<div class="notice notice-warning"><p><strong>PDS WPML Tools</strong>: ';
    esc_html_e( 'WPML (sitepress-multilingual-cms) no está activo. El bloque "Logo multiidioma" funcionará en modo de idioma único y el panel de idioma del Editor del sitio no se mostrará.', 'pds-wpml-tools' );
    echo '</p></div>';
}
add_action( 'admin_notices', 'pds_wpml_tools_admin_notice' );

/**
 * Expone los idiomas activos de WPML al editor de bloques (bloque "Logo multiidioma").
 */
function pds_wpml_tools_enqueue_logo_block_assets() {
    $active_languages = apply_filters( 'wpml_active_languages', null, [ 'skip_missing' => 0 ] );
    $default_language = apply_filters( 'wpml_default_language', null );

    $languages = [];
    if ( is_array( $active_languages ) ) {
        foreach ( $active_languages as $code => $language ) {
            $languages[] = [
                'code'             => $code,
                'native_name'      => $language['native_name'] ?? $code,
                'translated_name'  => $language['translated_name'] ?? $code,
                'country_flag_url' => $language['country_flag_url'] ?? '',
            ];
        }
    }

    $data = [
        'languages'       => $languages,
        'defaultLanguage' => $default_language ?: 'es',
    ];

    wp_add_inline_script(
        'pds-multilang-logo-editor-script',
        'window.pdsMultilangLogo = ' . wp_json_encode( $data ) . ';',
        'before'
    );
}
add_action( 'enqueue_block_editor_assets', 'pds_wpml_tools_enqueue_logo_block_assets' );

/**
 * Encola el panel de idioma en cualquier pantalla con editor de bloques: el
 * Editor del sitio (site-editor.php) y también el editor de entradas/páginas
 * cuando se edita una plantilla desde "Plantilla → Editar".
 */
function pds_wpml_tools_enqueue_template_lang_panel() {
    if ( ! class_exists( 'SitePress' ) ) {
        return;
    }

    $screen = get_current_screen();
    if ( ! $screen || ! $screen->is_block_editor() ) {
        return;
    }

    wp_enqueue_style(
        'pds-wpml-template-lang',
        plugins_url( 'css/template-lang-panel.css', __FILE__ ),
        [],
        filemtime( __DIR__ . '/css/template-lang-panel.css' )
    );

    wp_enqueue_script(
        'pds-wpml-template-lang',
        plugins_url( 'js/template-lang-panel.js', __FILE__ ),
        [ 'wp-data', 'wp-element', 'wp-api-fetch', 'wp-i18n', 'wp-plugins', 'wp-editor' ],
        filemtime( __DIR__ . '/js/template-lang-panel.js' ),
        true
    );

    $active_languages = apply_filters( 'wpml_active_languages', null, [ 'skip_missing' => 0 ] );

    $languages = [];
    if ( is_array( $active_languages ) ) {
        foreach ( $active_languages as $code => $language ) {
            $languages[] = [
                'code'             => $code,
                'native_name'      => $language['native_name'] ?? $code,
                'country_flag_url' => $language['country_flag_url'] ?? '',
            ];
        }
    }

    $data = [
        'languages'   => $languages,
        'currentLang' => apply_filters( 'wpml_current_language', null ),
        'theme'       => get_stylesheet(),
    ];

    wp_add_inline_script(
        'pds-wpml-template-lang',
        'window.pdsWpmlTemplateLang = ' . wp_json_encode( $data ) . ';',
        'before'
    );
}
add_action( 'enqueue_block_editor_assets', 'pds_wpml_tools_enqueue_template_lang_panel' );

/**
 * Oculta del listado de plantillas del Editor del sitio (`GET /wp/v2/templates`)
 * las plantillas "de fábrica" del theme que nunca se han personalizado
 * (`source === 'theme'` sin `wp_id`): Índice, Inicio del blog, Página: 404,
 * Page No Title, Resultados de búsqueda, single-location, archive-events.
 * No tienen traducción WPML propia y solo generan ruido en el listado. Si en
 * algún momento se necesita personalizar alguna, se puede volver a añadir
 * desde "Añadir plantilla" en el Editor del sitio.
 */
function pds_wpml_tools_hide_default_templates( $response, $server, $request ) {
    if ( 'GET' !== $request->get_method() || '/wp/v2/templates' !== $request->get_route() ) {
        return $response;
    }

    $data = $response->get_data();
    if ( ! is_array( $data ) ) {
        return $response;
    }

    $data = array_values(
        array_filter(
            $data,
            function ( $item ) {
                return ! ( ( $item['source'] ?? '' ) === 'theme' && empty( $item['wp_id'] ) );
            }
        )
    );

    $response->set_data( $data );

    return $response;
}
add_filter( 'rest_post_dispatch', 'pds_wpml_tools_hide_default_templates', 9, 3 );

/**
 * Añade el código de idioma WPML (p.ej. " [CA]") como sufijo al título de
 * cada plantilla/parte de plantilla/patrón sincronizado en los listados del
 * Editor del sitio (`GET /wp/v2/templates`, `/wp/v2/template-parts` y
 * `/wp/v2/blocks`), para distinguir de un vistazo elementos con el mismo
 * nombre en distintos idiomas (especialmente útil con las plantillas
 * duplicadas de "Calendar Views" / "Single Event"). Se usa como sufijo (no
 * prefijo) para no interferir con la búsqueda por nombre del listado. Solo
 * afecta a `title.rendered` en peticiones de listado, no a `title.raw` ni a
 * la petición de un elemento concreto, por lo que no interfiere al editar
 * o renombrar.
 */
function pds_wpml_tools_prefix_template_titles( $response, $server, $request ) {
    if ( ! class_exists( 'SitePress' ) || 'GET' !== $request->get_method() ) {
        return $response;
    }

    $route = $request->get_route();
    if ( ! in_array( $route, [ '/wp/v2/templates', '/wp/v2/template-parts', '/wp/v2/blocks' ], true ) ) {
        return $response;
    }

    $data = $response->get_data();
    if ( ! is_array( $data ) ) {
        return $response;
    }

    global $wpdb;

    $ids_by_type = [];
    foreach ( $data as $item ) {
        $numeric_id = '/wp/v2/blocks' === $route
            ? ( $item['id'] ?? 0 )
            : ( $item['wp_id'] ?? 0 );

        if ( ! $numeric_id || empty( $item['type'] ) ) {
            continue;
        }
        $ids_by_type[ 'post_' . $item['type'] ][] = (int) $numeric_id;
    }

    $lang_by_element = [];
    foreach ( $ids_by_type as $element_type => $ids ) {
        $ids = array_unique( $ids );
        $placeholders = implode( ',', array_fill( 0, count( $ids ), '%d' ) );

        $rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT element_id, language_code FROM {$wpdb->prefix}icl_translations WHERE element_type = %s AND element_id IN ({$placeholders})",
                array_merge( [ $element_type ], $ids )
            )
        );

        foreach ( $rows as $row ) {
            $lang_by_element[ (int) $row->element_id ] = strtoupper( $row->language_code );
        }
    }

    if ( empty( $lang_by_element ) ) {
        return $response;
    }

    foreach ( $data as &$item ) {
        $numeric_id = '/wp/v2/blocks' === $route
            ? ( $item['id'] ?? 0 )
            : ( $item['wp_id'] ?? 0 );
        $numeric_id = (int) $numeric_id;

        if ( ! $numeric_id || empty( $lang_by_element[ $numeric_id ] ) ) {
            continue;
        }

        $suffix = ' [' . $lang_by_element[ $numeric_id ] . ']';

        // Las plantillas/partes exponen `title.rendered`; los patrones
        // sincronizados (`/wp/v2/blocks`) solo exponen `title.raw`.
        if ( isset( $item['title']['rendered'] ) ) {
            $item['title']['rendered'] = $item['title']['rendered'] . $suffix;
        } elseif ( isset( $item['title']['raw'] ) ) {
            $item['title']['raw'] = $item['title']['raw'] . $suffix;
        }
    }

    $response->set_data( $data );

    return $response;
}
add_filter( 'rest_post_dispatch', 'pds_wpml_tools_prefix_template_titles', 10, 3 );

/**
 * Ruta REST que devuelve las traducciones WPML (trid) de una plantilla, parte
 * de plantilla o patrón, dado su identificador tal como lo expone core/edit-site.
 */
function pds_wpml_tools_register_routes() {
    register_rest_route(
        'pds/v1',
        '/wpml-template-translations',
        [
            'methods'             => 'GET',
            'callback'            => 'pds_wpml_tools_translations_callback',
            'permission_callback' => function () {
                return current_user_can( 'edit_theme_options' );
            },
            'args'                => [
                'id'   => [ 'required' => true, 'type' => 'string' ],
                'type' => [
                    'required' => true,
                    'type'     => 'string',
                    'enum'     => [ 'wp_template', 'wp_template_part', 'wp_block' ],
                ],
            ],
        ]
    );

    register_rest_route(
        'pds/v1',
        '/wpml-unlinked-elements',
        [
            'methods'             => 'GET',
            'callback'            => 'pds_wpml_tools_unlinked_elements_callback',
            'permission_callback' => function () {
                return current_user_can( 'edit_theme_options' );
            },
            'args'                => [
                'type' => [
                    'required' => true,
                    'type'     => 'string',
                    'enum'     => [ 'wp_template', 'wp_template_part', 'wp_block' ],
                ],
                'trid' => [
                    'required' => true,
                    'type'     => 'integer',
                ],
            ],
        ]
    );

    register_rest_route(
        'pds/v1',
        '/wpml-link-translation',
        [
            'methods'             => 'POST',
            'callback'            => 'pds_wpml_tools_link_translation_callback',
            'permission_callback' => function () {
                return current_user_can( 'edit_theme_options' );
            },
            'args'                => [
                'element_id'           => [ 'required' => true, 'type' => 'integer' ],
                'current_element_id'   => [ 'required' => true, 'type' => 'integer' ],
                'type'                 => [
                    'required' => true,
                    'type'     => 'string',
                    'enum'     => [ 'wp_template', 'wp_template_part', 'wp_block' ],
                ],
                'trid'                 => [ 'required' => true, 'type' => 'integer' ],
                'language_code'        => [ 'required' => true, 'type' => 'string' ],
                'source_language_code' => [ 'required' => false, 'type' => 'string' ],
            ],
        ]
    );
}
add_action( 'rest_api_init', 'pds_wpml_tools_register_routes' );

/**
 * Callback de la ruta REST `pds/v1/wpml-unlinked-elements`.
 *
 * Devuelve las plantillas/partes/patrones del mismo tipo que no forman parte
 * (todavía) de un grupo de traducción con más de un elemento, para poder
 * ofrecerlas como candidatas a vincular como traducción del trid indicado.
 *
 * @param WP_REST_Request $request Petición REST.
 * @return WP_REST_Response
 */
function pds_wpml_tools_unlinked_elements_callback( WP_REST_Request $request ) {
    global $wpdb;

    $type         = (string) $request->get_param( 'type' );
    $trid         = (int) $request->get_param( 'trid' );
    $element_type = 'post_' . $type;

    $trid_counts = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT trid, COUNT(element_id) AS cnt FROM {$wpdb->prefix}icl_translations WHERE element_type = %s AND element_id IS NOT NULL GROUP BY trid",
            $element_type
        ),
        OBJECT_K
    );

    $element_trids = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT element_id, trid, language_code FROM {$wpdb->prefix}icl_translations WHERE element_type = %s AND element_id IS NOT NULL",
            $element_type
        )
    );

    $trid_by_element = [];
    $lang_by_element = [];
    foreach ( $element_trids as $row ) {
        $trid_by_element[ (int) $row->element_id ] = (int) $row->trid;
        $lang_by_element[ (int) $row->element_id ] = $row->language_code;
    }

    $posts = get_posts(
        [
            'post_type'   => $type,
            'post_status' => [ 'publish', 'draft' ],
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
        ]
    );

    $candidates  = [];
    $seen_slugs  = [];
    foreach ( $posts as $post ) {
        $post_trid = $trid_by_element[ $post->ID ] ?? null;

        if ( $post_trid === $trid ) {
            continue;
        }

        if ( null !== $post_trid ) {
            $count = isset( $trid_counts[ $post_trid ] ) ? (int) $trid_counts[ $post_trid ]->cnt : 0;
            if ( $count > 1 ) {
                continue;
            }
        }

        // Evita listar decenas/centenares de copias duplicadas del mismo
        // slug (p.ej. "archive-events" de The Events Calendar) como
        // candidatas repetidas.
        if ( isset( $seen_slugs[ $post->post_name ] ) ) {
            continue;
        }
        $seen_slugs[ $post->post_name ] = true;

        $candidates[] = [
            'id'            => $post->ID,
            'post_title'    => $post->post_title,
            'post_name'     => $post->post_name,
            'post_status'   => $post->post_status,
            'language_code' => $lang_by_element[ $post->ID ] ?? null,
        ];
    }

    return rest_ensure_response( $candidates );
}

/**
 * Callback de la ruta REST `pds/v1/wpml-link-translation`.
 *
 * Vincula un elemento existente como traducción de un idioma concreto dentro
 * de un trid, usando la API de WPML (`wpml_set_element_language_details`).
 *
 * @param WP_REST_Request $request Petición REST.
 * @return WP_REST_Response
 */
function pds_wpml_tools_link_translation_callback( WP_REST_Request $request ) {
    global $wpdb;

    $element_id           = (int) $request->get_param( 'element_id' );
    $current_element_id   = (int) $request->get_param( 'current_element_id' );
    $type                 = (string) $request->get_param( 'type' );
    $trid                 = (int) $request->get_param( 'trid' );
    $language_code        = (string) $request->get_param( 'language_code' );
    $source_language_code = (string) $request->get_param( 'source_language_code' );

    $element_type = 'post_' . $type;

    // Elimina el placeholder vacío de WPML para este trid/idioma, si existe.
    $wpdb->query(
        $wpdb->prepare(
            "DELETE FROM {$wpdb->prefix}icl_translations WHERE trid = %d AND language_code = %s AND element_id IS NULL AND element_type = %s",
            $trid,
            $language_code,
            $element_type
        )
    );

    do_action(
        'wpml_set_element_language_details',
        [
            'element_id'           => $element_id,
            'element_type'         => $element_type,
            'trid'                 => $trid,
            'language_code'        => $language_code,
            'source_language_code' => $source_language_code ?: null,
        ]
    );

    return rest_ensure_response( pds_wpml_tools_build_translations_response( $trid, $element_type, $current_element_id ) );
}

/**
 * Callback de la ruta REST `pds/v1/wpml-template-translations`.
 *
 * @param WP_REST_Request $request Petición REST.
 * @return WP_REST_Response
 */
function pds_wpml_tools_translations_callback( WP_REST_Request $request ) {
    $id   = (string) $request->get_param( 'id' );
    $type = (string) $request->get_param( 'type' );

    if ( 'wp_block' === $type ) {
        $element_id = (int) $id;

        if ( ! $element_id ) {
            return rest_ensure_response( [ 'trid' => null, 'translations' => [] ] );
        }
    } else {
        $template = get_block_template( $id, $type );

        if ( ! $template || empty( $template->wp_id ) ) {
            return rest_ensure_response( [ 'trid' => null, 'translations' => [] ] );
        }

        $element_id = $template->wp_id;
    }

    $element_type = 'post_' . $type;
    $trid         = apply_filters( 'wpml_element_trid', null, $element_id, $element_type );

    if ( ! $trid ) {
        return rest_ensure_response( [ 'trid' => null, 'translations' => [] ] );
    }

    return rest_ensure_response( pds_wpml_tools_build_translations_response( $trid, $element_type, $element_id ) );
}

/**
 * Construye la respuesta `{ trid, currentElementId, translations }` para un
 * trid y tipo de elemento, usada por los endpoints de traducciones y de
 * vinculación.
 *
 * @param int    $trid         Translation group ID de WPML.
 * @param string $element_type Tipo de elemento WPML (p.ej. 'post_wp_template_part').
 * @param int    $element_id   ID del elemento actualmente editado.
 * @return array
 */
function pds_wpml_tools_build_translations_response( $trid, $element_type, $element_id ) {
    $translations_raw = apply_filters( 'wpml_get_element_translations', null, $trid, $element_type );
    $active_languages  = apply_filters( 'wpml_active_languages', null, [ 'skip_missing' => 0 ] );

    $translations = [];
    if ( is_array( $translations_raw ) ) {
        foreach ( $translations_raw as $lang_code => $translation ) {
            $lang_info = $active_languages[ $lang_code ] ?? [];

            $translations[] = [
                'language_code'    => $lang_code,
                'element_id'       => (int) $translation->element_id,
                'post_name'        => get_post_field( 'post_name', (int) $translation->element_id ),
                'post_title'       => $translation->post_title,
                'post_status'      => $translation->post_status,
                'is_original'      => (bool) $translation->original,
                'native_name'      => $lang_info['native_name'] ?? $lang_code,
                'country_flag_url' => $lang_info['country_flag_url'] ?? '',
            ];
        }
    }

    return [
        'trid'             => $trid,
        'currentElementId' => (int) $element_id,
        'translations'     => $translations,
    ];
}
