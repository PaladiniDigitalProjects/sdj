<?php
/**
 * render.php — Renderizado en servidor del logo multiidioma.
 *
 * @var array    $attributes  Atributos del bloque
 * @var string   $content     Contenido interior (vacío)
 * @var WP_Block $block       Objeto bloque con contexto
 */

$images      = is_array( $attributes['images'] ?? null ) ? $attributes['images'] : [];
$width       = isset( $attributes['width'] ) ? (int) $attributes['width'] : 240;
$is_link     = $attributes['isLink'] ?? true;
$link_target = in_array( $attributes['linkTarget'] ?? '_self', [ '_self', '_blank' ], true )
               ? $attributes['linkTarget'] : '_self';

// ── Resolución del idioma actual y de respaldo (WPML) ──────────────────────────
$current_lang = apply_filters( 'wpml_current_language', null );
$default_lang  = apply_filters( 'wpml_default_language', null );

$attachment_id = $images[ $current_lang ] ?? $images[ $default_lang ] ?? null;

if ( ! $attachment_id ) {
    $attachment_id = get_theme_mod( 'custom_logo' );
}

if ( ! $attachment_id ) {
    if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
        $wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'wp-block-site-logo pds-multilang-logo pds-multilang-logo--empty' ] );
        printf(
            '<div %s><span class="pds-multilang-logo__placeholder">%s</span></div>',
            $wrapper_attrs,
            esc_html__( 'Logo multiidioma — configura las imágenes por idioma en la barra lateral', 'pds-multilang-logo' )
        );
    }
    return;
}

$image_html = wp_get_attachment_image( (int) $attachment_id, 'full', false, [ 'class' => 'custom-logo' ] );

if ( ! $image_html ) {
    return;
}

$wrapper_attrs = get_block_wrapper_attributes( [
    'class' => 'wp-block-site-logo pds-multilang-logo',
    'style' => sprintf( 'width:%dpx', $width ),
] );

if ( $is_link ) {
    $rel = '_blank' === $link_target ? ' rel="home noopener noreferrer"' : ' rel="home"';
    printf(
        '<div %s><a href="%s" target="%s"%s>%s</a></div>',
        $wrapper_attrs,
        esc_url( home_url( '/' ) ),
        esc_attr( $link_target ),
        $rel,
        $image_html
    );
} else {
    printf( '<div %s>%s</div>', $wrapper_attrs, $image_html );
}
