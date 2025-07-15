<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array.
 */

$attributes    = $attributes ?? []; // Use null coalescing operator
$title         = $attributes['title'] ?? __('Our Stores', 'pds-map-locations-filter');
$display_style = $attributes['displayStyle'] ?? 'grid';
$num_stores    = $attributes['numStores'] ?? 5;
$post_type     = 'tienda'; // Use the CPT name

// Query stores
$args = array(
    'post_type'      => $post_type,
    'posts_per_page' => $num_stores > 0 ? $num_stores : -1, // Handle -1 for all
    'post_status'    => 'publish',
);
$stores_query = new WP_Query( $args );

?>
<div class="pds-tiendas <?php echo esc_attr( $display_style ); ?>">
    <?php if (!empty($title)): ?>
        <h3><?php echo esc_html($title); ?></h3>
    <?php endif; ?>

    <?php if ( $stores_query->have_posts() ) : ?>
        <ul>
            <?php while ( $stores_query->have_posts() ) : $stores_query->the_post(); ?>
                <li>
                    <a href="<?php echo esc_url(get_permalink()); ?>">
                        <?php echo esc_html(get_the_title()); ?>
                    </a>
                    <?php /* Optional: Add more info like address here if needed */ ?>
                </li>
            <?php endwhile; ?>
        </ul>
        <?php wp_reset_postdata(); ?>
    <?php else : ?>
        <p><?php esc_html_e('No stores found.', 'pds-map-locations-filter'); ?></p>
    <?php endif; ?>
</div>