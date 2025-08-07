<?php
/**
 * Template part for displaying a list of store items.
 * Used by Tienda Lista block (initial render and AJAX).
 * Expects $stores_query (WP_Query object) and $display_style (grid or list).
 */

$stores_query   = $stores_query ?? new WP_Query([]);
$display_style  = $display_style ?? 'grid';

if ($stores_query->have_posts()): ?>
    <div class="pds-tiendas-list <?= esc_attr($display_style); ?>">
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
    $direccion       = function_exists('get_field') ? get_field('ce_direccion') : '';
    $telefono        = function_exists('get_field') ? get_field('ce_telefono') : '';
    $email           = function_exists('get_field') ? get_field('ce_email') : '';
    $web             = function_exists('get_field') ? get_field('ce_web') : '';
    $google_maps_url = function_exists('get_field') ? get_field('ce_google_maps') : '';
    $thumb_html      = has_post_thumbnail() ? get_the_post_thumbnail(get_the_ID(), 'thumbnail') : '';
    ?>
    
    <?php if ($display_style === 'list'): ?>
        <div class="pds-tiendas-row">
            <div class="pds-column pds-col-thumb"><?= $thumb_html; ?></div>
            <div class="pds-column pds-col-title">
                <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
            </div>
            <div class="pds-column"><?= esc_html($direccion); ?></div>
            <div class="pds-column"><?= esc_html($telefono); ?></div>
            <div class="pds-column">
                <?php if ($email): ?>
                    <a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a>
                <?php endif; ?>
            </div>
            <div class="pds-column">
                <?php if ($web): ?>
                    <a href="<?= esc_url($web); ?>" target="_blank" rel="noopener noreferrer"><?= esc_html($web); ?></a>
                <?php endif; ?>
            </div>
            <div class="pds-column">
                <?php if ($google_maps_url): ?>
                    <a href="<?= esc_url($google_maps_url); ?>" target="_blank" rel="noopener noreferrer">
                        <?php esc_html_e('View', 'pds-map-locations-filter'); ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>

    <?php else: ?>
        <div class="pds-tiendas-grid-item">
            <div class="pds-grid-thumb"><?= $thumb_html; ?></div>
            <h3 class="pds-grid-title">
                <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
            </h3>
            <div class="pds-grid-info">
                <p><?= esc_html($direccion); ?></p>
                <?php if ($telefono): ?><p><?= esc_html($telefono); ?></p><?php endif; ?>
                <?php if ($email): ?>
                    <p><a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a></p>
                <?php endif; ?>
                <?php if ($web): ?>
                    <p><a href="<?= esc_url($web); ?>" target="_blank" rel="noopener noreferrer"><?= esc_html($web); ?></a></p>
                <?php endif; ?>
                <?php if ($google_maps_url): ?>
                    <p><a href="<?= esc_url($google_maps_url); ?>" target="_blank" rel="noopener noreferrer">
                        <?php esc_html_e('View on map', 'pds-map-locations-filter'); ?>
                    </a></p>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>
<?php endwhile; ?>

    </div>
<?php else: ?>
    <p class="pds-tiendas-no-results">
        <?php esc_html_e('No stores found.', 'pds-map-locations-filter'); ?>
    </p>
<?php endif; ?>
