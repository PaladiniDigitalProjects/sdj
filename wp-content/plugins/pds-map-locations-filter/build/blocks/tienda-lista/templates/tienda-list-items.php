<?php
/**
 * Template part for displaying a list/grid of store items.
 *
 * Variables:
 *  - $stores_query   (WP_Query) Query with store posts.
 *  - $display_style  (string)   Either 'list' or 'grid'.
 */

$stores_query  = $stores_query ?? new WP_Query([]);
$display_style = $display_style ?? 'list';

if ($stores_query->have_posts()): ?>
    <div class="pds-tiendas-list <?= esc_attr($display_style); ?>">

        <?php while ($stores_query->have_posts()): $stores_query->the_post();
            $provincia_terms = get_the_terms(get_the_ID(), 'provincia');
            $ambitos_terms   = get_the_terms(get_the_ID(), 'ambito');
            $direccion  = function_exists('get_field') ? get_field('ce_direccion') : '';
            $telefono   = function_exists('get_field') ? get_field('ce_telefono') : '';
            $email      = function_exists('get_field') ? get_field('ce_email') : '';
            $web        = function_exists('get_field') ? get_field('ce_web') : '';
            $thumb_html = has_post_thumbnail() ? get_the_post_thumbnail(get_the_ID(), 'thumbnail', ['class' => 'wp-post-image']) : '';
            
            // Process taxonomy terms 
            $provincia_names = !is_wp_error($provincia_terms) && !empty($provincia_terms)
                ? implode(' · ', wp_list_pluck($provincia_terms, 'name'))
                : '';

            $ambitos_names = !is_wp_error($ambitos_terms) && !empty($ambitos_terms)
                ? implode(' · ', wp_list_pluck($ambitos_terms, 'name'))
                : '';
        ?>

            <?php if ($display_style === 'list'): ?>
                <!-- ===== LIST VIEW ===== -->
                <div class="pds-tiendas-row">
                    <!-- Column 1: Image -->
                    <div class="pds-column pds-col-1">
                        <div class="pds-col-thumb">
                            <?= $thumb_html; ?>
                        </div>
                    </div>

                    <!-- Column 2: Title + meta -->
                    <div class="pds-column pds-col-2">
                        <div class="pds-col-text">
                            <?php if ($provincia_names): ?>
                               <strong> <span class="pds-provincia"><?= esc_html($provincia_names); ?></span> </strong>
                            <?php endif; ?>
                            <h3 class="pds-title">
                                <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
                            </h3>
                            <?php if ($ambitos_names): ?>
                               <strong>  <span class="pds-ambitos"><?= esc_html($ambitos_names); ?></span></strong>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Column 3: Contact info -->
                    <div class="pds-column pds-col-3">
                        <h4><?php esc_html_e( 'Contacto', 'pds-map-locations-filter' ); ?></h4>
                        <?php if ($telefono): ?>
                            <p><strong><?php esc_html_e( 'Teléfono:', 'pds-map-locations-filter' ); ?></strong> <?= esc_html($telefono); ?></p>
                        <?php endif; ?>
                        <?php if ($web): ?>
                            <p><strong><?php esc_html_e( 'Sitio Web:', 'pds-map-locations-filter' ); ?></strong> 
                                <a href="<?= esc_url($web); ?>" target="_blank" rel="noopener"><?= esc_html($web); ?></a>
                            </p>
                        <?php endif; ?>
                        <?php if ($email): ?>
                            <p><strong><?php esc_html_e( 'Correo electrónico:', 'pds-map-locations-filter' ); ?></strong> 
                                <a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a>
                            </p>
                        <?php endif; ?>
                    </div>

                    <!-- Column 4: Address -->
                    <div class="pds-column pds-col-4">
                        <h4><?php esc_html_e( 'Dirección', 'pds-map-locations-filter' ); ?></h4>
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
                        <?php if ($provincia_names): ?>
                           <strong> <span class="pds-provincia"><?= esc_html($provincia_names); ?></span>  </strong>
                        <?php endif; ?>
                        <h3 class="pds-title">
                            <a href="<?= esc_url(get_permalink()); ?>"><?= esc_html(get_the_title()); ?></a>
                        </h3>
                        <?php if ($ambitos_names): ?>
                          <strong>   <span class="pds-ambitos"><?= esc_html($ambitos_names); ?></span> </strong>
                        <?php endif; ?>
                    </div>
                    <div class="pds-col-2">
                        <?php if ($telefono): ?>
                            <p><strong><?php esc_html_e( 'Teléfono:', 'pds-map-locations-filter' ); ?> <?= esc_html($telefono); ?></strong></p>
                        <?php endif; ?>
                        <?php if ($web): ?>
                            <p><strong><?php esc_html_e( 'Sitio Web:', 'pds-map-locations-filter' ); ?>
                                <a href="<?= esc_url($web); ?>" target="_blank" rel="noopener"><?= esc_html($web); ?></a>
                            </strong>
                            </p>
                        <?php endif; ?>
                        <?php if ($email): ?>
                            <p><strong><?php esc_html_e( 'Correo electrónico:', 'pds-map-locations-filter' ); ?>
                                <a href="mailto:<?= esc_attr($email); ?>"><?= esc_html($email); ?></a>
                            </strong>
                            </p>
                        <?php endif; ?>
                    </div>
                    <div class="pds-col-3">
                        <h4><?php esc_html_e( 'Dirección', 'pds-map-locations-filter' ); ?></h4>
                        <?= esc_html($direccion); ?>
                    </div>
                </div>
            <?php endif; ?>

        <?php endwhile; ?>

    </div>
<?php else: ?>
    <p class="pds-tiendas-no-results">
        <?php esc_html_e( 'No stores found.', 'pds-map-locations-filter' ); ?>
    </p>
<?php endif; ?>
