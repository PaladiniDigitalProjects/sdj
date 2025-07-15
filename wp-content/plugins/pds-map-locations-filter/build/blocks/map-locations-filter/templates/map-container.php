<?php
/**
 * Template for rendering the map-locations-filter block container.
 * Loaded via the 'render' attribute in block.json.
 * Expects $attributes, $content, $block, $container_id, $taxonomies to be available.
 */

// Ensure variables are available (passed from render_callback)
$attributes     = $attributes ?? [];
$title          = $attributes['title'] ?? __('Our Locations', 'pds-map-locations-filter');
$initialCenter  = $attributes['initialCenter'] ?? ['lat' => 40.416775, 'lng' => -3.703790];
$zoomLevel      = $attributes['zoomLevel'] ?? 6;
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? []; // Used for filter_data
$container_id   = $container_id ?? 'pds-map-block-' . bin2hex(random_bytes(4));
$taxonomies     = $taxonomies ?? []; // Prepared taxonomy info for the nav

// Prepare data attributes for JavaScript
$map_options = json_encode([
    'center' => $initialCenter,
    'zoom'   => $zoomLevel,
]);

// Pass selected taxonomies to JS *only if needed* for initial state - often filters start empty
$filter_data = json_encode([
    'selectedTaxonomies' => $selectedTaxonomies, // Or maybe empty array [] if filters should default to 'all'
]);

// Add a specific class based on block attributes if needed
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'pds-map-block',
    'id' => esc_attr($container_id),
    'data-map-options' => esc_attr($map_options),
    'data-filter-options' => esc_attr($filter_data),
]);

?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>

    <?php
    // Render Navigation/Filters
    echo mlf_get_template_part(
        'template-mlf-nav.php',
        [
            'title'      => $title,
            'taxonomies' => $taxonomies // Pass the prepared taxonomy objects/info
        ],
        'map-locations-filter' // Block name context
    );
    ?>

    <div class="mlf-map" style="height: <?php echo esc_attr($attributes['mapHeight'] ?? '60vh'); ?>;">
        <!-- Map will be initialized here by JavaScript -->
        <div class="mlf-map-loading" style="display:flex; align-items:center; justify-content:center; height:100%; color:#666;">
            <?php esc_html_e('Loading Map...', 'pds-map-locations-filter'); ?>
        </div>
    </div>

    <?php
    // Render the locations list container
    echo mlf_get_template_part(
        'locations-list-container.php', // Correct filename
        [
            'container_id' => $container_id . '-list' // Unique ID for list part
        ],
        'map-locations-filter' // Block name context
    );
    ?>

</div>