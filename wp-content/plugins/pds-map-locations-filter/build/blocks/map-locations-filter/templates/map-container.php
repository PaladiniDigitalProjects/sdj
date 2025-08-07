<?php
/**
 * Template for rendering the map-locations-filter block container.
 * Loaded via the 'render' attribute in block.json.
 * Expects $attributes, $block_instance, $taxonomies (WP_Taxonomy objects) from render_callback.
 */

$attributes     = $attributes ?? [];
$title          = $attributes['title'] ?? __('Our Locations', 'pds-map-locations-filter');
$initialCenter  = $attributes['initialCenter'] ?? ['lat' => 40.416775, 'lng' => -3.703790];
$zoomLevel      = $attributes['zoomLevel'] ?? 6;
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? [];
$taxonomies     = $taxonomies ?? [];
$is_preview     = $is_preview ?? false;
$container_id   = $container_id ?? 'pds-map-block-fallback-' . bin2hex(random_bytes(4));
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

$block_init_data = json_encode([
    'blockId'          => $container_id,
    'nonce'            => wp_create_nonce('mlf_nonce'),
    'ajaxUrl'          => admin_url('admin-ajax.php'),
    'initialCenter'    => $initialCenter,
    'zoomLevel'        => $zoomLevel,
    'i18n'             => [
        'loadingMap'           => __('Loading Map...', 'pds-map-locations-filter'),
        'loadingLocations'     => __('Loading locations...', 'pds-map-locations-filter'),
        'errorLoadingMap'      => __('Error loading map.', 'pds-map-locations-filter'),
        'errorLoadingLocations'=> __('Error loading locations. Please try again.', 'pds-map-locations-filter'),
        'noResults'            => __('Sorry, no locations match your criteria.', 'pds-map-locations-filter'),
        'viewDetails'          => __('View Details', 'pds-map-locations-filter'),
        'hideDetails'          => __('Hide Details', 'pds-map-locations-filter'),
    ],
]);

$wrapper_attributes = get_block_wrapper_attributes([
    'class'           => 'pds-map-block-wrapper',
    'id'              => esc_attr($container_id),
    'data-block-init' => esc_attr($block_init_data),
]);

$args = [
    'post_type'      => 'location',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
];
$locations_query = new WP_Query($args);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ($title): ?>
        <h3><?php echo esc_html($title); ?></h3>
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
        <div class="mlf-map-container">
            <p class="mlf-loading"><?= esc_html($block_init_data['i18n']['loadingMap'] ?? __('Loading Map...', 'pds-map-locations-filter')); ?></p>
        </div>
        <div class="mlf-locations-list-container">
            <?php
            echo mlf_get_template_part(
                'locations-list.php',
                [
                    'locations_query' => $locations_query,
                    'taxonomies'      => $filtered_taxonomies,
                ],
                'map-locations-filter'
            );
            ?>
        </div>
    </div>
</div>
