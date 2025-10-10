<?php
/**
 * Plugin Name: Tienda Block
 * Description: A custom Gutenberg block for tienda posts.
 * Version: 1.0.0
 * Author: Your Name
 */

defined('ABSPATH') || exit;

/**
 * Registers the block's assets.
 */
function register_tienda_block_assets() {
    // Automatically load dependencies and version.
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    // Enqueue block script.
    wp_register_script(
        'tienda-block-editor',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    // Enqueue block editor styles.
    wp_register_style(
        'tienda-block-editor-style',
        plugins_url('build/index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // Enqueue block front-end styles.
    wp_register_style(
        'tienda-block-style',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    // Register the block.
    register_block_type(plugin_dir_path(__FILE__) . 'build', array(
        'editor_script' => 'tienda-block-editor',
        'editor_style'  => 'tienda-block-editor-style',
        'style'         => 'tienda-block-style',
    ));
}
add_action('init', 'register_tienda_block_assets');

