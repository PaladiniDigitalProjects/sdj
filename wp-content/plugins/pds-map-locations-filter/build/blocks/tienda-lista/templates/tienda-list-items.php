<?php
/**
 * Template part for displaying a list/grid of store items.
 *
 * Variables:
 *  - $stores_query   (WP_Query) Query with store posts.
 *  - $display_style  (string)   Either 'list' or 'grid'.
 */

$stores_query = $stores_query ?? new WP_Query([]);
$display_style = $display_style ?? 'list';

if ($stores_query->have_posts()): ?>
    <div class="pds-tiendas-list <?= esc_attr($display_style); ?>">

        <?php while ($stores_query->have_posts()): $stores_query->the_post();
            $provincia  = function_exists('get_field') ? get_field('ce_provincia') : '';
            $ambitos    = function_exists('get_field') ? get_field('ce_ambitos') : '';
            $direccion  = function_exists('get_field') ? get_field('ce_direccion') : '';
            $telefono   = function_exists('get_field') ? get_field('ce_telefono') : '';
            $email      = function_exists('get_field') ? get_field('ce_email') : '';
            $web        = function_exists('get_field') ? get_field('ce_web') : '';
            $thumb_html = has_post_thumbnail() ? get_the_post_thumbnail(get_the_ID(), 'thumbnail', ['class' => 'wp-post-image']) : '';
        ?>

            <?php if ($display_style === 'list'): ?>
                <!-- ===== LIST VIEW ===== -->
                <div class="pds-tiendas-row">
                    <!-- Column 1: Image + title + meta -->
                    <div class="pds-column pds-col-1">
                        <div class="pds-col-thumb">
                            <?= $thumb_html; ?>
                        </div>
                        <div class="pds-col-text">
                            <?php if ($provincia): ?>
                                <span class="pds-provincia"><?= esc_html($provincia); ?></span>
                            <?php endif; ?>
                            <h3 class="pds-title">
                                <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
                            </h3>
                            <?php if ($ambitos): ?>
                                <span class="pds-ambitos"><?= esc_html($ambitos); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Column 2: Contact info -->
                    <div class="pds-column pds-col-2">
                        <?php if ($telefono): ?>
                            <p><strong>Teléfono:</strong> <?= esc_html($telefono); ?></p>
                        <?php endif; ?>
                        <?php if ($web): ?>
                            <p><strong>Sitio Web:</strong> <a href="<?= esc_url($web); ?>" target="_blank" rel="noopener"><?= esc_html($web); ?></a></p>
                        <?php endif; ?>
                        <?php if ($email): ?>
                            <p><strong>Correo electrónico:</strong> <a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a></p>
                        <?php endif; ?>
                    </div>

                    <!-- Column 3: Address -->
                    <div class="pds-column pds-col-3">
                        <?= esc_html($direccion); ?>
                    </div>
                </div>

            <?php else: ?>
                <!-- ===== GRID VIEW ===== -->
                <div class="pds-tiendas-row">
                    <div class="pds-col-thumb">
                        <?= $thumb_html; ?>
                    </div>
                    <div class="pds-col-text">
                        <?php if ($provincia): ?>
                            <span class="pds-provincia"><?= esc_html($provincia); ?></span>
                        <?php endif; ?>
                        <h3 class="pds-title">
                            <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
                        </h3>
                        <?php if ($ambitos): ?>
                            <span class="pds-ambitos"><?= esc_html($ambitos); ?></span>
                        <?php endif; ?>
                    </div>
                    <div class="pds-col-2">
                        <?php if ($telefono): ?>
                            <p><strong>Teléfono:</strong> <?= esc_html($telefono); ?></p>
                        <?php endif; ?>
                        <?php if ($web): ?>
                            <p><strong>Sitio Web:</strong> <a href="<?= esc_url($web); ?>" target="_blank" rel="noopener"><?= esc_html($web); ?></a></p>
                        <?php endif; ?>
                        <?php if ($email): ?>
                            <p><strong>Correo electrónico:</strong> <a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a></p>
                        <?php endif; ?>
                    </div>
                    <div class="pds-col-3">
                        <?= esc_html($direccion); ?>
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
