<?php
/**
 * Template part for displaying a list of store items.
 * Used by Tienda Lista block (initial render and AJAX).
 * Expects $stores_query (WP_Query object) and $display_style.
 */

$stores_query = $stores_query ?? new WP_Query([]); // Ensure it's a WP_Query object
$display_style = $display_style ?? 'grid'; // Default to grid if not passed

if ($stores_query->have_posts()): ?>
    <div class="pds-tiendas-list">
        <?php if ($display_style === 'list'): ?>
            <div class="pds-tiendas-row pds-tiendas-header">
                <div class="pds-column pds-col-thumb"><?php esc_html_e('Image', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column pds-col-title"><?php esc_html_e('Store', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column"><?php esc_html_e('Dirección', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column"><?php esc_html_e('Teléfono', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column"><?php esc_html_e('Email', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column"><?php esc_html_e('Web', 'pds-map-locations-filter'); ?></div>
                <div class="pds-column"><?php esc_html_e('Google Maps', 'pds-map-locations-filter'); ?></div>
            </div>
        <?php endif; ?>

        <?php while ($stores_query->have_posts()): $stores_query->the_post(); ?>
            <?php
            $direccion       = get_field('ce_direccion') ?: '';
            $telefono        = get_field('ce_telefono') ?: '';
            $email           = get_field('ce_email') ?: '';
            $web             = get_field('ce_web') ?: '';
            $google_maps_url = get_field('ce_google_maps') ?: '';
            $thumb_html      = has_post_thumbnail() ? get_the_post_thumbnail(get_the_ID(), 'thumbnail') : '';
            ?>
            <div class="pds-tiendas-row">
                <div class="pds-column pds-col-thumb">
                    <?php echo $thumb_html; ?>
                </div>
                <div class="pds-column pds-col-title">
                    <a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a>
                </div>
                <div class="pds-column"><?php echo esc_html($direccion); ?></div>
                <div class="pds-column"><?php echo esc_html($telefono); ?></div>
                <div class="pds-column">
                    <?php if ($email): ?>
                        <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
                    <?php endif; ?>
                </div>
                <div class="pds-column">
                    <?php if ($web): ?>
                        <a href="<?php echo esc_url($web); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($web); ?></a>
                    <?php endif; ?>
                </div>
                <div class="pds-column">
                    <?php if ($google_maps_url): ?>
                        <a href="<?php echo esc_url($google_maps_url); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('View', 'pds-map-locations-filter'); ?></a>
                    <?php endif; ?>
                </div>
            </div>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>
<?php else: ?>
    <p class="pds-tiendas-no-results"><?php esc_html_e('No stores found.', 'pds-map-locations-filter'); ?></p>
<?php endif;