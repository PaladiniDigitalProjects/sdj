<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array, $taxonomies (WP_Taxonomy objects), $block_instance.
 */

$attributes    = $attributes ?? [];
$taxonomies    = $taxonomies ?? [];  // now comes from render_tienda_lista_block
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? [];
$title         = $attributes['title'] ?? __('Our Stores', 'pds-map-locations-filter');
$display_style = in_array( $attributes['displayStyle'] ?? '', [ 'grid', 'list', 'map' ] )
    ? $attributes['displayStyle']
    : 'list';
$enable_map     = $attributes['enableMap'] ?? true;
$initial_center = ( isset( $attributes['initialCenter'] ) && is_array( $attributes['initialCenter'] ) )
    ? $attributes['initialCenter']
    : [ 'lat' => 40.416775, 'lng' => -3.703790 ];
$zoom_level     = isset( $attributes['zoomLevel'] ) ? (int) $attributes['zoomLevel'] : 6;
// Si el mapa está deshabilitado y la vista guardada era "map", cae a "list".
if ( ! $enable_map && $display_style === 'map' ) {
    $display_style = 'list';
}
$num_stores    = $attributes['numStores'] ?? 25;
$show_all_results = $attributes['showAllResults'] ?? false;
if ($show_all_results) {
    $num_stores = -1;
}
$post_type     = 'location';
$taxonomies_objects = $taxonomies ?? [];
$container_id  = 'pds-tienda-lista-block-' . ($block_instance->id ?? bin2hex(random_bytes(4)));
$filtered_taxonomies = [];

if (!empty($selectedTaxonomies)) {
    foreach ($selectedTaxonomies as $slug) {
        if (isset($taxonomies[$slug])) {
            $filtered_taxonomies[$slug] = $taxonomies[$slug];
        }
    }
} else {
    $filtered_taxonomies = $taxonomies;
}

$initial_tax_query = [];
if (!empty($selectedTaxonomies) && is_array($selectedTaxonomies)) {
    foreach ($selectedTaxonomies as $tax_slug) {
        if (taxonomy_exists($tax_slug)) {
            $initial_tax_query[] = [
                'taxonomy' => sanitize_key($tax_slug),
                'field'    => 'slug',
                'terms'    => get_terms([
                    'taxonomy'   => sanitize_key($tax_slug),
                    'fields'     => 'slugs',
                    'hide_empty' => true,
                ]),
                'operator' => 'IN'
            ];
        }
    }
}

$args = [
    'post_type'      => $post_type,
    'posts_per_page' => $num_stores > 0 ? $num_stores : -1,
    'post_status'    => 'publish',
    'tax_query'      => count($initial_tax_query) > 1 ? array_merge(['relation' => 'AND'], $initial_tax_query) : $initial_tax_query,
];

$stores_query = new WP_Query($args);

$block_data = [
    'blockId'          => $container_id,
    'nonce'            => wp_create_nonce('mlf_nonce'),
    'ajaxUrl'          => admin_url('admin-ajax.php'),
    'initialNumStores' => $num_stores,
    'initialStyle'     => $display_style,
    'showAllResults'   => $show_all_results,
    'align'            => $attributes['align'] ?? 'wide',
    'enableMap'        => (bool) $enable_map,
    'initialCenter'    => $initial_center,
    'zoomLevel'        => $zoom_level,
    'i18n' => [
        'loading'               => __('Loading stores...', 'pds-map-locations-filter'),
        'noResults'             => __('No se ha encontrado la localización', 'pds-map-locations-filter'),
        'loadingMap'            => __('Cargando mapa...', 'pds-map-locations-filter'),
        'loadingLocations'      => __('Cargando centros...', 'pds-map-locations-filter'),
        'errorLoadingMap'       => __('Error cargando mapa.', 'pds-map-locations-filter'),
        'errorLoadingLocations' => __('Error cargando centros. Vuelva a intentarlo.', 'pds-map-locations-filter'),
    ]
];
?>
<div id="<?= esc_attr($container_id); ?>"
     class="pds-tiendas pds-tiendas-wrapper <?= esc_attr('align' . ($attributes['align'] ?? 'wide')); ?> <?= esc_attr($display_style); ?>"
     data-block-init='<?= esc_attr(json_encode($block_data)); ?>'>

 

    <div class="pds-tiendas-toolbar">
           <?php if ($title): ?>
                <h3><?= esc_html($title); ?></h3>
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
            <button type="button" class="mlf-view-btn<?= $display_style === 'list' ? ' active' : ''; ?>" data-view="list">
                <?= esc_html__('Listado', 'pds-map-locations-filter'); ?>
            </button>
            <button type="button" class="mlf-view-btn<?= $display_style === 'grid' ? ' active' : ''; ?>" data-view="grid">
                <?= esc_html__('Tabla', 'pds-map-locations-filter'); ?>
            </button>
            <?php if ( $enable_map ) : ?>
                <button type="button" class="mlf-view-btn<?= $display_style === 'map' ? ' active' : ''; ?>" data-view="map">
                    <?= esc_html__('Mapa', 'pds-map-locations-filter'); ?>
                </button>
            <?php endif; ?>
        </div>
    </div>

    <div class="pds-tiendas-results-container">
        <?php
        echo mlf_get_template_part(
            'tienda-list-items.php',
            [
                'stores_query'   => $stores_query,
                'display_style'  => $display_style === 'map' ? 'list' : $display_style,
                'numStores'    => $num_stores,
                'taxonomies'   => $filtered_taxonomies,
            ],
            'tienda-lista'
        );
        ?>
    </div>

    <?php if ( $enable_map ) : ?>
        <div class="mlf-content-area">
            <div class="mlf-map-wrapper">
                <div class="mlf-map-container" aria-hidden="true">
                    <p class="mlf-loading"><?= esc_html__('Cargando mapa...', 'pds-map-locations-filter'); ?></p>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>
