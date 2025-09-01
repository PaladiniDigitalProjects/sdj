<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array, $taxonomies (WP_Taxonomy objects), $block_instance.
 */

$attributes   = isset( $attributes ) && is_array( $attributes ) ? $attributes : [];
$taxonomies   = isset( $taxonomies ) && is_array( $taxonomies ) ? $taxonomies : [];
$selectedTaxonomies = isset( $attributes['selectedTaxonomies'] ) && is_array( $attributes['selectedTaxonomies'] ) ? $attributes['selectedTaxonomies'] : [];

$title = isset( $attributes['title'] ) ? $attributes['title'] : __( 'Our Stores', 'pds-map-locations-filter' );

$display_style = isset( $attributes['displayStyle'] ) && in_array( $attributes['displayStyle'], [ 'grid', 'list' ], true )
    ? $attributes['displayStyle']
    : 'grid';

$num_stores = isset( $attributes['numStores'] ) && is_numeric( $attributes['numStores'] ) ? intval( $attributes['numStores'] ) : 5;
$post_type  = 'location';

$container_id = isset( $block_instance ) && isset( $block_instance->id ) ? $block_instance->id : 'pds-tienda-lista-block-' . bin2hex( random_bytes( 4 ) );

$filtered_taxonomies = [];
if ( ! empty( $selectedTaxonomies ) ) {
    foreach ( $selectedTaxonomies as $slug ) {
        if ( isset( $taxonomies[ $slug ] ) ) {
            $filtered_taxonomies[ $slug ] = $taxonomies[ $slug ];
        } else {
            $t = get_taxonomy( sanitize_key( $slug ) );
            if ( $t ) {
                $filtered_taxonomies[ $slug ] = $t;
            }
        }
    }
} else {
    $filtered_taxonomies = $taxonomies;
}

// Prepare initial tax_query if selected taxonomies should be pre-applied
$initial_tax_query = [];
if ( ! empty( $selectedTaxonomies ) ) {
    foreach ( $selectedTaxonomies as $tax_slug ) {
        if ( taxonomy_exists( $tax_slug ) ) {
            $terms = get_terms( [
                'taxonomy'   => sanitize_key( $tax_slug ),
                'fields'     => 'slugs',
                'hide_empty' => true,
            ] );
            if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
                $initial_tax_query[] = [
                    'taxonomy' => sanitize_key( $tax_slug ),
                    'field'    => 'slug',
                    'terms'    => $terms,
                    'operator' => 'IN',
                ];
            }
        }
    }
}

$args = [
    'post_type'      => $post_type,
    'posts_per_page' => $num_stores > 0 ? $num_stores : -1,
    'post_status'    => 'publish',
];

if ( ! empty( $initial_tax_query ) ) {
    $args['tax_query'] = count( $initial_tax_query ) > 1 ? array_merge( [ 'relation' => 'AND' ], $initial_tax_query ) : $initial_tax_query;
}

$stores_query = new WP_Query( $args );

$block_data = [
    'blockId'          => $container_id,
    'nonce'            => wp_create_nonce( 'mlf_nonce' ),
    'ajaxUrl'          => admin_url( 'admin-ajax.php' ),
    'initialNumStores' => $num_stores,
    'initialStyle'     => $display_style,
    'align'            => isset( $attributes['align'] ) ? $attributes['align'] : 'wide',
    'i18n' => [
        'loading'   => __( 'Loading stores...', 'pds-map-locations-filter' ),
        'noResults' => __( 'No stores found matching your criteria.', 'pds-map-locations-filter' ),
    ],
];

$block_data_json = wp_json_encode( $block_data );
?>
<div id="<?php echo esc_attr( $container_id ); ?>"
     class="pds-tiendas pds-tiendas-wrapper <?php echo esc_attr( 'align' . ( $attributes['align'] ?? 'wide' ) ); ?> <?php echo esc_attr( $display_style ); ?>"
     data-block-init="<?php echo esc_attr( $block_data_json ); ?>">

    <div class="pds-tiendas-toolbar">
        <?php if ( ! empty( $title ) ) : ?>
            <h3><?php echo esc_html( $title ); ?></h3>
        <?php endif; ?>

        <?php
        echo mlf_get_template_part(
            'template-mlf-nav.php',
            [
                'title'        => '',
                'taxonomies'   => $filtered_taxonomies,
                'container_id' => $container_id,
                'displayStyle' => $display_style,
                'numStores'    => $num_stores,
            ],
            'tienda-lista'
        );
        ?>

        <div class="pds-view-switcher">
            <button type="button" class="mlf-view-btn<?php echo $display_style === 'grid' ? ' active' : ''; ?>" data-view="grid">
                <?php echo esc_html__( 'Tabla', 'pds-map-locations-filter' ); ?>
            </button>
            <button type="button" class="mlf-view-btn<?php echo $display_style === 'list' ? ' active' : ''; ?>" data-view="list">
                <?php echo esc_html__( 'Lista', 'pds-map-locations-filter' ); ?>
            </button>
        </div>
    </div>

    <div class="pds-tiendas-results-container">
        <?php
        echo mlf_get_template_part(
            'tienda-list-items.php',
            [
                'stores_query'  => $stores_query,
                'display_style' => $display_style,
                'numStores'     => $num_stores,
                'taxonomies'    => $filtered_taxonomies,
            ],
            'tienda-lista'
        );
        ?>
    </div>
</div>
