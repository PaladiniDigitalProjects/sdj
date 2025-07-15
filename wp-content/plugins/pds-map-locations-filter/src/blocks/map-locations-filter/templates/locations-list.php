<?php
/**
 * Template part for displaying the list of locations via AJAX.
 * Expects $locations_query (WP_Query object) to be passed in $variables.
 */

// Ensure $locations_query is set and is a WP_Query object
if ( isset($locations_query) && $locations_query instanceof WP_Query ) :
    if ( $locations_query->have_posts() ) :
        while ($locations_query->have_posts()) : $locations_query->the_post();
            $location_id = get_the_ID();
            // Example image - replace with actual featured image or ACF field
            $image_url = get_the_post_thumbnail_url($location_id, 'medium_large') ?: 'https://via.placeholder.com/300x200.png?text=' . urlencode(get_the_title());
            $address = get_field('ce_direccion', $location_id); // Example: ACF field for address
            $phone = get_field('ce_telefono', $location_id);   // Example: ACF field for phone
            $categories = get_the_term_list($location_id, 'comarca', '', ', ', ''); // Example for category taxonomy
        ?>
        <div class='mlf-location' id='location-<?= esc_attr($location_id) ?>' data-location-id="<?= esc_attr($location_id) ?>">
            <div class="entry-image-wrapper">
                <img src='<?= esc_url($image_url) ?>' alt='<?= esc_attr(get_the_title()) ?>' loading="lazy" />
            </div>
            <div class='entry-content'>
                <?php if ($categories): ?>
                    <p class="entry-categories"><?= wp_kses_post($categories) ?></p>
                <?php endif; ?>
                <h4 class='mlf-location-title'><?= esc_html(get_the_title()) ?></h4>
                <?php if ($address): ?>
                    <p class="mlf-location-address"><?= esc_html($address) ?></p>
                <?php endif; ?>
                <?php if ($phone): ?>
                     <p class="mlf-location-phone"><strong><?php esc_html_e('Tel:', 'pds-map-locations-filter'); ?></strong> <?= esc_html($phone) ?></p>
                <?php endif; ?>
                
                <a href='<?= esc_url(get_permalink()) ?>'><?php esc_html_e('Ver más', 'pds-map-locations-filter'); ?></a>
            </div>
        </div>
        <?php
        endwhile;
        // wp_reset_postdata(); // Not needed if using the main query object passed directly
    else :
        ?>
        <p class="mlf-no-results"><?php esc_html_e('Sorry, no locations match your criteria.', 'pds-map-locations-filter'); ?></p>
        <?php
    endif;
else :
     // Handle case where $locations_query wasn't passed or invalid
     ?>
     <p class="mlf-error"><?php esc_html_e('Error loading locations.', 'pds-map-locations-filter'); ?></p>
     <?php
endif;