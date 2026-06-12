<?php
/**
 * Template for rendering the map-locations-filter block container.
 * Loaded via the 'render' attribute in block.json.
 * Expects $attributes, $block_instance, $taxonomies (WP_Taxonomy objects) from render_callback.
 */

// Defensive defaults (avoid undefined variable warnings)
$attributes     = isset( $attributes ) ? (array) $attributes : [];
$taxonomies     = isset( $taxonomies ) ? (array) $taxonomies : [];
$is_preview     = isset( $is_preview ) ? (bool) $is_preview : false;
$container_id   = isset( $container_id ) ? $container_id : 'pds-map-block-fallback-' . bin2hex( random_bytes( 4 ) );

// Extract attributes with safe defaults
$title               = isset( $attributes['title'] ) ? $attributes['title'] : __( 'Our Locations', 'pds-map-locations-filter' );
$initialCenter       = isset( $attributes['initialCenter'] ) && is_array( $attributes['initialCenter'] )
                        ? $attributes['initialCenter']
                        : [ 'lat' => 40.416775, 'lng' => -3.703790 ];
$zoomLevel           = isset( $attributes['zoomLevel'] ) ? (int) $attributes['zoomLevel'] : 6;
$selectedTaxonomies  = isset( $attributes['selectedTaxonomies'] ) && is_array( $attributes['selectedTaxonomies'] )
                        ? $attributes['selectedTaxonomies']
                        : [];
$show_list           = isset( $attributes['showList'] ) ? (bool) $attributes['showList'] : true;

$filtered_taxonomies = [];

// Prepare taxonomy objects (only include selected ones if provided)
if ( ! empty( $selectedTaxonomies ) ) {
    foreach ( $selectedTaxonomies as $slug ) {
        if ( isset( $taxonomies[ $slug ] ) ) {
            $filtered_taxonomies[ $slug ] = $taxonomies[ $slug ];
        } else {
            // Try to fetch taxonomy object by slug as a fallback
            $t = get_taxonomy( sanitize_key( $slug ) );
            if ( $t ) {
                $filtered_taxonomies[ $slug ] = $t;
            }
        }
    }
} else {
    $filtered_taxonomies = $taxonomies;
}

// Build init data array (use wp_json_encode for safe JSON)
$block_init = [
    'blockId'       => $container_id,
    'nonce'         => wp_create_nonce( 'mlf_nonce' ),
    'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
    'initialCenter' => $initialCenter,
    'zoomLevel'     => $zoomLevel,
    'showList'      => $show_list,
    'i18n' => [
        'loadingMap'            => __( 'Cargando mapa...', 'pds-map-locations-filter' ),
        'loadingLocations'      => __( 'Cargando centros...', 'pds-map-locations-filter' ),
        'errorLoadingMap'       => __( 'Error cargando mapa.', 'pds-map-locations-filter' ),
        'errorLoadingLocations' => __( 'Error cargando centros. Vuelva a intentarlo.', 'pds-map-locations-filter' ),
        'noResults'             => __( ' ', 'pds-map-locations-filter' ),
        'viewDetails'           => __( 'View Details', 'pds-map-locations-filter' ),
        'hideDetails'           => __( 'Hide Details', 'pds-map-locations-filter' ),
    ],
];

$block_init_json = wp_json_encode( $block_init );

$wrapper_attributes = get_block_wrapper_attributes( [
    'class'           => 'pds-map-block-wrapper',
    'id'              => esc_attr( $container_id ),
    'data-block-init' => esc_attr( $block_init_json ),
] );

// Only create the query when we actually need to render a server-side list:
$locations_query = null;
if ( $show_list ) {
    $args = [
        'post_type'      => 'location',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ];
    $locations_query = new WP_Query( $args );
}
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( ! empty( $title ) ) : ?>
        <h3><?php echo esc_html( $title ); ?></h3>
    <?php endif; ?>

    <div class="pds-map-toolbar">
        <?php
        echo mlf_get_template_part(
            'template-mlf-nav.php',
            [
                'title'        => '',
                'taxonomies'   => $filtered_taxonomies,
                'container_id' => $container_id,
                'is_preview'   => $is_preview,
            ],
            'map-locations-filter'
        );
        ?>
    </div>

    <div class="mlf-content-area">
        <div class="mlf-map-wrapper">
            <div class="mlf-map-container" aria-hidden="false">
                <?php
                $loading_text = $block_init['i18n']['loadingMap'] ?? __( 'Cargando mapa...', 'pds-map-locations-filter' );
                ?>
                <p class="mlf-loading"><?php echo esc_html( $loading_text ); ?></p>
            </div>
            <div class="mlf-overlay-container"></div>
        </div>

        <?php if ( $show_list ) : ?>
            <div class="mlf-locations-list-container">
                <?php
                echo mlf_get_template_part(
                    'locations-list.php',
                    [
                        'locations_query' => $locations_query,
                        'taxonomies'      => $filtered_taxonomies,
                        'show_list'      => $show_list,
                    ],
                    'map-locations-filter'
                );
                ?>
            </div>
        <?php endif; ?>
    </div>
</div>
