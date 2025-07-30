
<?php
/**
 * Plugin Name: PDS Categories
 * Description: Bloque dinámico Gutenberg que lista todas las categorías/taxonomías de los posts en un archive.
 * Version:     1.0.1
 * Author:      Ricard PDS
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', function() {
    register_block_type( __DIR__ . '/build', [
        'api_version'     => 2,
        'render_callback' => 'pds_render_callback',
        'attributes'      => [
            'taxonomy' => [
                'type'    => 'string',
                'default' => 'category',
            ],
            'style'    => [
                'type'    => 'string',
                'default' => 'pill',
            ],
        ],
    ] );
} );

/**
 * Render callback: lista categorías únicas de todos los posts en la query global.
 */
function pds_render_callback( $attributes ) {
    // Solo en archive o search
   
    if ( ! is_archive() && ! is_search() ) {
        return '<p>Este bloque solo funciona en archivos o búsquedas.</p>';
    }

    global $wp_query;
    $taxonomy = sanitize_text_field( $attributes['taxonomy'] );
    $style    = sanitize_text_field( $attributes['style'] );

    // Reunir términos únicos
    $terms_agg = [];
    foreach ( $wp_query->posts as $post ) {
        $terms = get_the_terms( $post->ID, $taxonomy );
        if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
            foreach ( $terms as $term ) {
                $terms_agg[ $term->term_id ] = $term;
            }
        }
    }

    if ( empty( $terms_agg ) ) {
        return '<p>No hay términos encontrados.</p>';
    }

    // Generar HTML
    ob_start();
    echo '<div class="pds-categories-list">';
    foreach ( $terms_agg as $term ) {
        $link = esc_url( get_term_link( $term ) );
        $name = esc_html( $term->name );
        if ( 'pill' === $style ) {
            echo "<a class='pds-pill' href='{$link}'>{$name}</a> ";
        } else {
            echo "<a href='{$link}'>{$name}</a><br>";
        }
    }
    echo '</div>';


    if ( 'pill' === $style ) {
        echo "<style>
            .pds-pill{ display:inline-block; background:#ff5200; padding:5px 10px; border-radius:0.6rem; margin:2px; text-decoration:none;   color: #fff; }
            .pds-pill:hover{ background:#ddd; }
        </style>";
    }

    return ob_get_clean();
}