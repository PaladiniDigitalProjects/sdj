<?php
/**
 * Template for displaying locations list in the map block.
 *
 * Variables:
 *  - $locations_query   (WP_Query) Query with location posts.
 *  - $taxonomies        (array)    Taxonomy objects for display.
 *  - $show_list         (bool)     Whether to show the list.
 */

$locations_query = $locations_query ?? new WP_Query([]);
$show_list       = $show_list ?? true;

if ($show_list && $locations_query->have_posts()): ?>
    <div class="mlf-locations-list">
        <?php while ($locations_query->have_posts()): $locations_query->the_post();
            $post_id = get_the_ID();
            
            $provincia_terms = get_the_terms($post_id, 'provincia');
            $ambitos_terms   = get_the_terms($post_id, 'ambito');
            
            $direccion  = function_exists('get_field') ? get_field('ce_direccion', $post_id) : '';
            $telefono   = function_exists('get_field') ? get_field('ce_telefono', $post_id) : '';
            $email      = function_exists('get_field') ? get_field('ce_email', $post_id) : '';
            $web        = function_exists('get_field') ? get_field('ce_web', $post_id) : '';
            $thumb_html = has_post_thumbnail() ? get_the_post_thumbnail($post_id, 'thumbnail', ['class' => 'wp-post-image']) : '';
            
            $provincia_names = !is_wp_error($provincia_terms) && !empty($provincia_terms)
                ? implode(', ', wp_list_pluck($provincia_terms, 'name'))
                : '';

            $ambitos_names = !is_wp_error($ambitos_terms) && !empty($ambitos_terms)
                ? implode(', ', wp_list_pluck($ambitos_terms, 'name'))
                : '';
        ?>
            <div class="mlf-location-item" data-location-id="<?php echo esc_attr($post_id); ?>">
                <div class="mlf-location-inner">
                    <?php if ($thumb_html): ?>
                        <div class="mlf-location-image">
                            <?php echo $thumb_html; ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="mlf-location-content">
                        <?php if ($provincia_names): ?>
                            <span class="mlf-location-provincia"><?php echo esc_html($provincia_names); ?></span>
                        <?php endif; ?>
                        
                        <h3 class="mlf-location-title">
                            <a href="<?php echo esc_url(get_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a>
                        </h3>
                        
                        <?php if ($ambitos_names): ?>
                            <span class="mlf-location-ambitos"><?php echo esc_html($ambitos_names); ?></span>
                        <?php endif; ?>
                        
                        <div class="mlf-location-contact">
                            <?php if ($telefono): ?>
                                <p class="mlf-contact-item">
                                    <strong><?php esc_html_e('Teléfono:', 'pds-map-locations-filter'); ?></strong>
                                    <a href="tel:<?php echo esc_attr(preg_replace('/\s+/', '', $telefono)); ?>"><?php echo esc_html($telefono); ?></a>
                                </p>
                            <?php endif; ?>
                            
                            <?php if ($email): ?>
                                <p class="mlf-contact-item">
                                    <strong><?php esc_html_e('Email:', 'pds-map-locations-filter'); ?></strong>
                                    <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
                                </p>
                            <?php endif; ?>
                            
                            <?php if ($web): ?>
                                <p class="mlf-contact-item">
                                    <strong><?php esc_html_e('Web:', 'pds-map-locations-filter'); ?></strong>
                                    <a href="<?php echo esc_url($web); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($web); ?></a>
                                </p>
                            <?php endif; ?>
                        </div>
                        
                        <?php if ($direccion): ?>
                            <div class="mlf-location-address">
                                <strong><?php esc_html_e('Dirección:', 'pds-map-locations-filter'); ?></strong>
                                <span><?php echo esc_html($direccion); ?></span>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
<?php else: ?>
    <p class="mlf-no-results">
        <?php esc_html_e('No se encontraron centros.', 'pds-map-locations-filter'); ?>
    </p>
<?php endif; ?>
<?php wp_reset_postdata();
