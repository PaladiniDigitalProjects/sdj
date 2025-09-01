<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array, $taxonomies (WP_Taxonomy objects), $block_instance.
 */

$attributes    = $attributes ?? [];
$taxonomies    = $taxonomies ?? [];  // now comes from render_tienda_lista_block
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? [];
$title         = $attributes['title'] ?? __('Our Stores', 'pds-map-locations-filter');
$display_style = in_array( $attributes['displayStyle'] ?? '', [ 'grid', 'list' ] )
    ? $attributes['displayStyle']
    : 'grid';
$num_stores    = $attributes['numStores'] ?? 5;
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
    'align'            => $attributes['align'] ?? 'wide',
    'i18n' => [
        'loading'    => __('Loading stores...', 'pds-map-locations-filter'),
        'noResults'  => __('No stores found matching your criteria.', 'pds-map-locations-filter'),
    ]
];
?>
<div id="<?= esc_attr($container_id); ?>"
     class="pds-tiendas pds-tiendas-wrapper <?= esc_attr('align' . ($attributes['align'] ?? 'wide')); ?> "
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
            <button type="button" class="mlf-view-btn<?= $display_style === 'grid' ? ' active' : ''; ?>" data-view="grid">
                <?= esc_html__('Tabla', 'pds-map-locations-filter'); ?>
            </button>
            <button type="button" class="mlf-view-btn<?= $display_style === 'list' ? ' active' : ''; ?>" data-view="list">
                <?= esc_html__('Lista', 'pds-map-locations-filter'); ?>
            </button>
        </div>
    </div>

    <div class="pds-tiendas-results-container">
        <?php
        echo mlf_get_template_part(
            'tienda-list-items.php',
            [
                'stores_query'   => $stores_query,
                'display_style'  => $display_style,
                'numStores'    => $num_stores,
                'taxonomies'   => $filtered_taxonomies,
            ],
            'tienda-lista'
        );
        ?>
    </div>
</div>
