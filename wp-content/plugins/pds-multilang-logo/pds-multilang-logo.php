<?php
/**
 * Plugin Name:       PDS Multilang Logo
 * Description:       Bloque Gutenberg "gemelo" de Site Logo que permite definir una imagen de logo distinta por cada idioma activo de WPML.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Paladini Digital Solutions
 * License:           GPL-2.0-or-later
 * Text Domain:       pds-multilang-logo
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registra el bloque dinámico.
 */
function pds_multilang_logo_init() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'pds_multilang_logo_init' );

/**
 * Aviso en admin si WPML no está activo. El bloque sigue funcionando
 * en modo "idioma único" (cae al custom_logo de WordPress).
 */
function pds_multilang_logo_admin_notice() {
    if ( class_exists( 'SitePress' ) ) {
        return;
    }

    echo '<div class="notice notice-warning"><p><strong>PDS Multilang Logo</strong>: ';
    esc_html_e( 'WPML (sitepress-multilingual-cms) no está activo. El bloque "Logo multiidioma" funcionará en modo de idioma único.', 'pds-multilang-logo' );
    echo '</p></div>';
}
add_action( 'admin_notices', 'pds_multilang_logo_admin_notice' );

/**
 * Expone los idiomas activos de WPML al editor de bloques.
 */
function pds_multilang_logo_enqueue_editor_assets() {
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
add_action( 'enqueue_block_editor_assets', 'pds_multilang_logo_enqueue_editor_assets' );
