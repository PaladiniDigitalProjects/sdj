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
		plugin_dir_url( __DIR__ ) . 'build/frontend.js',
		[],
		filemtime( plugin_dir_path( __DIR__ ) . 'build/frontend.js' ),
		true
	);

	wp_enqueue_style(
		'pds-tabs-style',
		plugin_dir_url( __DIR__ ) . 'style.css',
		[],
		filemtime( plugin_dir_path( __DIR__ ) . 'style.css' )
	);
} );

/**
 * Enqueue block editor assets (for user settings like duration and pause-on-hover)
 */
add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script(
		'pds-tabs-editor',
		plugin_dir_url( __DIR__ ) . 'build/editor.js',
		[ 'wp-blocks', 'wp-element', 'wp-components', 'wp-compose', 'wp-data' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'build/editor.js' ),
		true
	);
} );

/**
 * Add data attributes to the tab container markup
 */
add_filter( 'render_block', function ( $content, $block ) {
	if ( $block['blockName'] !== 'gutenberghub-tabs/tab-container' ) {
		return $content;
	}

	$attrs          = $block['attrs'] ?? [];
	$duration       = isset( $attrs['autoSlideDuration'] ) ? intval( $attrs['autoSlideDuration'] ) : 5000;
	$pause_on_hover = ! empty( $attrs['pauseOnHover'] ) ? 'true' : 'false';

	return preg_replace(
		'/^<([a-zA-Z0-9\-]+)/',
		sprintf( '<$1 data-auto-duration="%d" data-pause-hover="%s"', $duration, $pause_on_hover ),
		$content,
		1
	);
}, 10, 2 );
