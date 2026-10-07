<?php
/**
 * Plugin Name: PDS Ver Más Terms
 * Plugin URI:  https://example.com/
 * Description: Lista términos con límite y opción Ver más / Ver menos. Permite elegir todos, específicos o excluir algunos.
 * Version:     1.2.0
 * Author:      Dariush Lotfi
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
				'wp-api-fetch',
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
 * Callback REST API.
 *
 * Acepta opcionalmente `include` o `exclude` (listas de term_id separadas por
 * coma) para que la paginación del botón "Ver más" respete la misma selección
 * de términos configurada en el bloque.
 */
function pds_get_terms_rest( WP_REST_Request $request ) {
	$taxonomy     = sanitize_text_field( $request->get_param( 'taxonomy' ) );
	$per_page     = intval( $request->get_param( 'per_page' ) ?? 20 ); // 0 = sin límite (todos desde offset).
	$offset_param = $request->get_param( 'offset' );
	if ( null !== $offset_param && '' !== $offset_param ) {
		$offset = intval( $offset_param );
	} else {
		$page   = intval( $request->get_param( 'page' ) ?? 1 );
		$offset = ( $page - 1 ) * $per_page;
	}

	if ( ! taxonomy_exists( $taxonomy ) ) {
		return new WP_Error( 'invalid_taxonomy', 'Taxonomía no válida', array( 'status' => 400 ) );
	}

	$args = array(
		'taxonomy'   => $taxonomy,
		'hide_empty' => false,
		'orderby'    => 'name',
		'order'      => 'ASC',
	);
	// WP_Term_Query ignora 'offset' cuando 'number' es 0 (sin límite), así que en ese
	// caso pedimos todo y recortamos nosotros mismos desde $offset.
	if ( $per_page > 0 ) {
		$args['number'] = $per_page;
		$args['offset'] = $offset;
	}

	$include = $request->get_param( 'include' );
	$exclude = $request->get_param( 'exclude' );
	if ( ! empty( $include ) ) {
		$args['include'] = array_map( 'absint', explode( ',', sanitize_text_field( $include ) ) );
	} elseif ( ! empty( $exclude ) ) {
		$args['exclude'] = array_map( 'absint', explode( ',', sanitize_text_field( $exclude ) ) );
	}

	$terms = get_terms( $args );

	if ( is_wp_error( $terms ) ) {
		return new WP_Error( 'get_terms_failed', $terms->get_error_message(), array( 'status' => 500 ) );
	}

	if ( 0 === $per_page && $offset > 0 ) {
		$terms = array_slice( $terms, $offset );
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

	// Total de términos que cumplen el mismo filtro, para saber si quedan más páginas.
	$count_args = $args;
	unset( $count_args['taxonomy'], $count_args['number'], $count_args['offset'] );
	$total       = (int) wp_count_terms( $taxonomy, $count_args );
	$total_pages = $per_page > 0 ? (int) ceil( $total / $per_page ) : 1;

	return array(
		'terms'      => $data,
		'total'      => count( $data ),
		'totalItems' => $total,
		'totalPage'  => max( 1, $total_pages ),
	);
}

/**
 * Renderizado del bloque
 */
function pds_terms_render_callback( $attributes ) {
	// --- Atributos (coinciden con block.json) ---
	$taxonomy       = isset( $attributes['taxonomy'] ) ? sanitize_text_field( $attributes['taxonomy'] ) : 'ambito';
	$limit          = absint( $attributes['limit'] ?? 5 );
	$show_more      = (bool) ( $attributes['show_more'] ?? true );
	$show_count     = (bool) ( $attributes['show_count'] ?? false );
	$show_desc      = (bool) ( $attributes['show_description'] ?? false );
	$selection_mode = isset( $attributes['selection_mode'] ) && 'selected' === $attributes['selection_mode'] ? 'selected' : 'all';
	$term_ids       = isset( $attributes['term_ids'] ) ? array_map( 'absint', (array) $attributes['term_ids'] ) : array();
	$excluded_ids   = isset( $attributes['excluded_ids'] ) ? array_map( 'absint', (array) $attributes['excluded_ids'] ) : array();

	$instance_id = 'pds-terms-' . wp_unique_id();

	// --- Términos que cumplen la selección configurada (todos / específicos / con exclusiones) ---
	$terms_args = array(
		'taxonomy'   => $taxonomy,
		'hide_empty' => false,
		'orderby'    => 'name',
		'order'      => 'ASC',
	);
	if ( 'selected' === $selection_mode && ! empty( $term_ids ) ) {
		$terms_args['include'] = $term_ids;
	} elseif ( ! empty( $excluded_ids ) ) {
		$terms_args['exclude'] = $excluded_ids;
	}

	$matching_terms = get_terms( $terms_args );
	if ( is_wp_error( $matching_terms ) ) {
		$matching_terms = array();
	}

	$total_terms      = count( $matching_terms );
	$effective_limit  = $limit > 0 ? $limit : $total_terms;
	$all_terms        = array_slice( $matching_terms, 0, $effective_limit );
	$has_more         = $total_terms > count( $all_terms );

	// --- Enqueue scripts ---
	if ( wp_script_is( 'pds-terms-frontend', 'registered' ) ) {
		if ( $show_more && $has_more ) {
			wp_enqueue_script( 'pds-terms-frontend' );
		}
		$data = array(
			'instance'    => $instance_id,
			'rest_base'   => esc_url_raw( rest_url( 'pds/v1/terms' ) ),
			'taxonomy'    => $taxonomy,
			'per_page'    => $limit,
			'include'     => ( 'selected' === $selection_mode && ! empty( $term_ids ) ) ? implode( ',', $term_ids ) : '',
			'exclude'     => ( 'selected' !== $selection_mode && ! empty( $excluded_ids ) ) ? implode( ',', $excluded_ids ) : '',
			'total_terms' => $total_terms,
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

	$list_id = $instance_id . '-list';
	$btn_id  = $instance_id . '-btn';

	$out  = sprintf( '<div class="wp-block-categories-list pds-terms-wrapper" id="%s">', esc_attr( $instance_id ) );
	$out .= sprintf(
		'<ul id="%s" class="pds-terms-list" data-limit="%d" data-taxonomy="%s" data-instance="%s" aria-live="polite">',
		esc_attr( $list_id ),
		$effective_limit,
		esc_attr( $taxonomy ),
		esc_attr( $instance_id )
	);

	foreach ( $all_terms as $t ) {
		$out .= sprintf(
			'<li class="pds-terms-item cat-item"><a href="%s">%s</a>%s</li>',
			esc_url( get_term_link( $t ) ),
			esc_html( $t->name ),
			$show_count ? ' <span class="pds-terms-count">(' . esc_html( $t->count ) . ')</span>' : ''
		);
		if ( $show_desc && ! empty( $t->description ) ) {
			$out .= sprintf( '<div class="pds-terms-desc">%s</div>', esc_html( $t->description ) );
		}
	}
	$out .= '</ul>';

	if ( $has_more && $show_more ) {
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
