<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array, $taxonomies (WP_Taxonomy objects), $block_instance.
 */

$attributes    = $attributes ?? [];
$title         = $attributes['title'] ?? __('Our Stores', 'pds-map-locations-filter');
$display_style = in_array($attributes['displayStyle'] ?? '', ['grid','list']) ? $attributes['displayStyle'] : 'grid';
$num_stores    = $attributes['numStores'] ?? 5;
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? [];
$post_type     = 'location';
$taxonomies_objects = $taxonomies ?? []; // These are the WP_Taxonomy objects passed from render callback
$container_id  = 'pds-tienda-lista-block-' . ( $block_instance->id ?? bin2hex(random_bytes(4)) ); // Unique ID for the block instance

// Build initial tax query from selected taxonomies
$initial_tax_query = [];
if (!empty($selectedTaxonomies) && is_array($selectedTaxonomies)) {
    foreach ($selectedTaxonomies as $tax_slug) {
        if (taxonomy_exists($tax_slug)) {
            // Get all terms for this taxonomy initially, as no specific term is selected yet
            // The frontend JS will handle actual term filtering
            $initial_tax_query[] = [
                'taxonomy'   => sanitize_key($tax_slug),
                'field'      => 'slug',
                'terms'      => get_terms(['taxonomy' => sanitize_key($tax_slug), 'fields' => 'slugs', 'hide_empty' => true]),
                'operator'   => 'IN'
            ];
        }
    }
}

// Initial query stores
$args = [
    'post_type'      => $post_type,
    'posts_per_page' => $num_stores > 0 ? $num_stores : -1,
    'post_status'    => 'publish',
    'tax_query'      => count($initial_tax_query) > 1 ? array_merge(['relation' => 'AND'], $initial_tax_query) : $initial_tax_query,
];
$stores_query = new WP_Query($args);

// Data for frontend JavaScript initialization
$block_data = [
    'blockId'          => $container_id,
    'nonce'            => wp_create_nonce('mlf_nonce'),
    'ajaxUrl'          => admin_url('admin-ajax.php'),
    'initialNumStores' => $num_stores, // Pass initial setting
    'initialStyle'     => $display_style,
    'i18n' => [
        'loading' => __('Loading stores...', 'pds-map-locations-filter'),
        'noResults' => __('No stores found matching your criteria.', 'pds-map-locations-filter'),
    ]
];
?>
<div id="<?= esc_attr($container_id); ?>"
     class="pds-tiendas pds-tiendas-wrapper <?php echo esc_attr($display_style); ?>"
     data-block-init='<?php echo json_encode($block_data); ?>'>

    <?php if ($title): ?>
        <h3><?php echo esc_html($title); ?></h3>
    <?php endif; ?>

    <div class="pds-tiendas-toolbar">
        <?php
        // Render Navigation/Filters
        echo mlf_get_template_part(
            'template-mlf-nav.php',
            [
                'title'          => '', // Title already in main block, pass empty to nav template
                'taxonomies'     => $taxonomies_objects, // Pass the prepared taxonomy objects/info
                'container_id'   => $container_id, // Pass container ID for unique element IDs
            ],
            'tienda-lista' // Block name context
        );
        ?>
        <div class="pds-view-switcher">
            <button type="button" class="mlf-view-btn<?php echo $display_style==='grid' ? ' active' : ''; ?>" data-view="grid">
                <?php esc_html_e('Grid View', 'pds-map-locations-filter'); ?>
            </button>
            <button type="button" class="mlf-view-btn<?php echo $display_style==='list' ? ' active' : ''; ?>" data-view="list">
                <?php esc_html_e('List View', 'pds-map-locations-filter'); ?>
            </button>
        </div>
    </div>

    <div class="pds-tiendas-results-container">
        <?php
        // Initial render of list items
        echo mlf_get_template_part('tienda-list-items.php', ['stores_query' => $stores_query, 'display_style' => $display_style], 'tienda-lista');
        ?>
    </div>
</div>
<?php
// Frontend JS will be loaded via viewScript in block.json
// Frontend CSS will be loaded via style in block.json