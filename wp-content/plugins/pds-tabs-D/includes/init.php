<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! defined( 'PDS_TABS_URL' ) ) {
	define( 'PDS_TABS_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'PDS_TABS_DIR_PATH' ) ) {
	define( 'PDS_TABS_DIR_PATH', plugin_dir_path( __FILE__ ) );
}




add_action( 'init', function() {
    register_block_type( __DIR__ . '/..', [
    'render_callback' => 'pds_render_tabs_container_block'
] );
} );

wp_enqueue_script( 'pds-tabs-editor',   PDS_TABS_URL . 'build/editor.js',   [/* deps */], filemtime( PDS_TABS_DIR_PATH . 'build/editor.js' ), true );
wp_enqueue_script( 'pds-tabs-frontend', PDS_TABS_URL . 'build/frontend.js', [], filemtime( PDS_TABS_DIR_PATH . 'build/frontend.js' ), true );
wp_enqueue_style(  'pds-tabs-style',    PDS_TABS_URL . 'style.css', [], filemtime( PDS_TABS_DIR_PATH . 'style.css' ) );




