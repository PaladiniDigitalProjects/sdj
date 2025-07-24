<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue frontend assets
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'pds-tabs-frontend',
		PDS_TABS_URL . 'build/frontend.js',
		[],
		filemtime( PDS_TABS_DIR_PATH . 'build/frontend.js' ),
		true
	);

	wp_enqueue_style(
		'pds-tabs-style',
		PDS_TABS_URL . 'style.css',
		[],
		filemtime( PDS_TABS_DIR_PATH . 'style.css' )
	);
} );

/**
 * Enqueue block editor assets
 */
add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script(
		'pds-tabs-editor',
		PDS_TABS_URL . 'build/editor.js',
		[ 'wp-blocks', 'wp-element', 'wp-components', 'wp-compose', 'wp-data' ],
		filemtime( PDS_TABS_DIR_PATH . 'build/editor.js' ),
		true
	);
} );

/**
 * Add data attributes to the tab container markup
 */
add_filter( 'render_block', function ( $content, $block ) {
	if ( $block['blockName'] !== 'ghub/tabs-container' ) {
		return $content;
	}

	$attrs = $block['attrs'] ?? [];
	$activate = ! empty( $attrs['activate'] ) ? 'true' : 'false';
	$duration       = isset( $attrs['autoSlideDuration'] ) ? intval( $attrs['autoSlideDuration'] ) : 5000;
	$pause_on_hover = ! empty( $attrs['pauseOnHover'] ) ? 'true' : 'false';

	// Inject data attributes into the container
	$content = preg_replace(
		'/class="([^"]*gutenberghub-tabs-frontend-container[^"]*)"/',
		'class="$1" data-auto-slide-duration="' . esc_attr( $duration ) . '" data-pause-hover="' . esc_attr( $pause_on_hover ) . '"',
		$content
	);

	return $content;
}, 10, 2 );

