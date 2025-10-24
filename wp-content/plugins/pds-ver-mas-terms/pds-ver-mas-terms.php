<?php
/**
 * Plugin Name: PDS Ver Más Terms
 * Plugin URI:  https://example.com/
 * Description: Lista términos con límite y opción Ver más / Ver menos.
 * Version:     1.1.2
 * Author:      Ricard PDS
 * Text Domain: pds-ver-mas-terms
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registrar bloque y REST API
 */
add_action( 'init', 'pds_terms_register_block' );
function pds_terms_register_block() {
	$dir = plugin_dir_path( __FILE__ );
	$url = plugin_dir_url( __FILE__ );

	// --- Scripts Frontend ---
	if ( file_exists( $dir . 'build/frontend.js' ) ) {
		$ver = filemtime( $dir . 'build/frontend.js' );
		wp_register_script(
			'pds-terms-frontend',
			$url . 'build/frontend.js',
			array(),
			$ver,
			true
		);
		wp_set_script_translations( 'pds-terms-frontend', 'pds-ver-mas-terms', $dir . 'languages' );
	}

	// --- Scripts Editor ---
	if ( file_exists( $dir . 'build/editor.js' ) ) {
		$ver = filemtime( $dir . 'build/editor.js' );
		wp_register_script(
			'pds-terms-editor',
			$url . 'build/editor.js',
			array(
				'wp-blocks',
				'wp-element',
				'wp-i18n',
				'wp-components',
				'wp-editor',
				'wp-server-side-render',
			),
			$ver,
			true
		);
		wp_set_script_translations( 'pds-terms-editor', 'pds-ver-mas-terms', $dir . 'languages' );
	}

	// --- Estilos ---
	if ( file_exists( $dir . 'build/style-style.css' ) ) {
		wp_register_style(
			'pds-terms-style',
			$url . 'build/style-style.css',
			array(),
			filemtime( $dir . 'build/style-style.css' )
		);
	}

	// --- Registro del bloque ---
	register_block_type(
		__DIR__,
		array(
			'editor_script'   => 'pds-terms-editor',
			'script'          => 'pds-terms-frontend',
			'editor_style'    => 'pds-terms-style',
			'style'           => 'pds-terms-style',
			'render_callback' => 'pds_terms_render_callback',
		)
	);
}

/**
 * Registrar REST API route
 */
add_action( 'rest_api_init', function () {
	register_rest_route(
		'pds/v1',
		'/terms',
		array(
			'methods'             => 'GET',
			'callback'            => 'pds_get_terms_rest',
			'permission_callback' => '__return_true',
		)
	);
});

/**
 * Callback REST API
 */
function pds_get_terms_rest( WP_REST_Request $request ) {
	$taxonomy = sanitize_text_field( $request->get_param( 'taxonomy' ) );
	$page = intval( $request->get_param( 'page' ) ?? 1 );
	$per_page = intval( $request->get_param( 'per_page' ) ?? 20 );
	$offset = ($page - 1) * $per_page;

	if ( ! taxonomy_exists( $taxonomy ) ) {
		return new WP_Error( 'invalid_taxonomy', 'Taxonomía no válida', array( 'status' => 400 ) );
	}

	$args = array(
		'taxonomy'   => $taxonomy,
		'number'     => $per_page,
		'offset'     => $offset,
		'hide_empty' => false,
	);

	$terms = get_terms( $args );

	if ( is_wp_error( $terms ) ) {
		return new WP_Error( 'get_terms_failed', $terms->get_error_message(), array( 'status' => 500 ) );
	}

	$data = array_map(
		function ( $t ) {
			return array(
				'term_id' => $t->term_id,
				'name'    => $t->name,
				'slug'    => $t->slug,
				'link'    => get_term_link( $t ),
				'count'   => $t->count,
			);
		},
		$terms
	);

	return array(
		'terms' => $data,
		'total' => count( $data ),
	);
}

/**
 * Renderizado del bloque
 */
function pds_terms_render_callback( $attributes ) {
	$dir = plugin_dir_path( __FILE__ );

	// --- Atributos (coinciden con block.json) ---
	$taxonomy   = isset( $attributes['taxonomy'] ) ? sanitize_text_field( $attributes['taxonomy'] ) : 'ambito';
	$limit      = absint( $attributes['limit'] ?? 5 );
	$show_more  = (bool) ( $attributes['show_more'] ?? true );
	$show_count = (bool) ( $attributes['show_count'] ?? false );
	$show_desc  = (bool) ( $attributes['show_description'] ?? false );

	$instance_id = 'pds-terms-' . wp_unique_id();

	// --- Enqueue scripts ---
	if ( wp_script_is( 'pds-terms-frontend', 'registered' ) ) {
		if ( $show_more ) {
			wp_enqueue_script( 'pds-terms-frontend' );
		}
		$data = array(
			'instance'    => $instance_id,
			'rest_base'   => esc_url_raw( rest_url( 'pds/v1/terms' ) ),
			'taxonomy'    => $taxonomy,
			'per_page'    => $limit,
			'total_terms' => (int) wp_count_terms( $taxonomy, array( 'hide_empty' => false ) ),
			'strings'     => array(
				'ver_mas'   => __( 'Ver más', 'pds-ver-mas-terms' ),
				'ver_menos' => __( 'Ver menos', 'pds-ver-mas-terms' ),
				'cargando'  => __( 'Cargando…', 'pds-ver-mas-terms' ),
			),
		);
		wp_add_inline_script(
			'pds-terms-frontend',
			sprintf(
				'window.PDS_TERMS_DATA = window.PDS_TERMS_DATA || {}; window.PDS_TERMS_DATA["%s"] = %s;',
				esc_js( $instance_id ),
				wp_json_encode( $data )
			)
		);
	}

	if ( wp_style_is( 'pds-terms-style', 'registered' ) ) {
		wp_enqueue_style( 'pds-terms-style' );
	}

	// --- Obtener términos iniciales ---
	$total_terms = wp_count_terms( $taxonomy, [ 'hide_empty' => false ] );

		$terms_args = array(
		'taxonomy'   => $taxonomy,
		'hide_empty' => false,
		'orderby'    => 'name',
		'order'      => 'ASC',
		'number'     => $limit,
		);

		$all_terms = get_terms( $terms_args );
		$has_more  = $total_terms > $limit;

	

	$list_id = $instance_id . '-list';
	$btn_id  = $instance_id . '-btn';

	$out = sprintf( '<div class="wp-block-categories-list pds-terms-wrapper" id="%s">', esc_attr( $instance_id ) );
	$out .= sprintf(
		'<ul id="%s" class="pds-terms-list" data-limit="%d" data-taxonomy="%s" data-instance="%s" aria-live="polite">',
		esc_attr( $list_id ),
		$limit,
		esc_attr( $taxonomy ),
		esc_attr( $instance_id )
	);

	$shown = 0;
	foreach ( $all_terms as $t ) {
		if ( $shown >= $limit ) {
			break;
		}
		$out .= sprintf(
			'<li class="pds-terms-item cat-item"><a href="%s">%s</a>%s</li>',
			esc_url( get_term_link( $t ) ),
			esc_html( $t->name ),
			$show_count ? ' <span class="pds-terms-count">(' . esc_html( $t->count ) . ')</span>' : ''
		);
		if ( $show_desc && ! empty( $t->description ) ) {
			$out .= sprintf( '<div class="pds-terms-desc">%s</div>', esc_html( $t->description ) );
		}
		$shown++;
	}
	$out .= '</ul>';

	if ( $total_terms > $limit && $show_more ) {
		$out .= sprintf(
			'<button id="%s" type="button" class="pds-terms-toggle wp-block-button__link" aria-controls="%s" aria-expanded="false">%s</button>',
			esc_attr( $btn_id ),
			esc_attr( $list_id ),
			esc_html__( 'Ver más', 'pds-ver-mas-terms' )
		);
		}

	$out .= '</div>';

	return $out;
}
