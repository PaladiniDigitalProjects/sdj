<?php
/**
 * Plugin Name:     PDS Tabs
 * Description:     Adds auto‑slide controls to GutenbergHub Tabs, static mode.
 * Version:         1.2.0
 * Requires at least: 6.1
 * Requires PHP:    7.3
 * Author:          Paladini Digital Solutions
 * Text Domain:     pds-tabs
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


if ( ! defined( 'PDS_TABS_DIR_PATH' ) ) {
    define( 'PDS_TABS_DIR_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'PDS_TABS_URL' ) ) {
    define( 'PDS_TABS_URL', plugin_dir_url(  __FILE__ ) );
}


add_action( 'init', function() {
    register_block_type( PDS_TABS_DIR_PATH, [
        'editor_script' => 'pds-tabs-editor',
        'script'        => 'pds-tabs-frontend',
        'editor_style'  => 'pds-tabs-editor-style',
        'style'         => 'pds-tabs-style',
    ] );
} );


add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'pds-tabs-editor',
        PDS_TABS_URL . 'build/editor.js',
        [ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-data', 'wp-hooks' ],
        filemtime( PDS_TABS_DIR_PATH . 'build/editor.js' ),
        true
    );
    wp_enqueue_style(
        'pds-tabs-editor-style',
        PDS_TABS_URL . '/editor.css',
        [],
        filemtime( PDS_TABS_DIR_PATH . '/editor.css' )
    );
} );


add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'pds-tabs-frontend',
        PDS_TABS_URL . 'build/frontend.js',
        [],
        filemtime( PDS_TABS_DIR_PATH . 'build/frontend.js' ),
        true
    );
    wp_enqueue_style(
        'pds-tabs-style',
        PDS_TABS_URL . '/style.css',
        [],
        filemtime( PDS_TABS_DIR_PATH . '/style.css' )
    );
} );
