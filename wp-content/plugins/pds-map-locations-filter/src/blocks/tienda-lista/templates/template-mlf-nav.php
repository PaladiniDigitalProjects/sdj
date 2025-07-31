<?php
/**
 * Template part for the map navigation and filters.
 * Expects $title and $taxonomies [slug => WP_Taxonomy object].
 */
$title      = $title ?? '';
$taxonomies = $taxonomies ?? [];
?>
<nav class="pds-map-filters">
    <?php if ($title): ?>
        <div class="mlf-title"><?= esc_html($title); ?></div>
    <?php endif; ?>

    <div class="mlf-filters">
        <div class="mlf-search-wrapper">
            <label for="mlf-search-input-<?= esc_attr(uniqid()) ?>" class="screen-reader-text"><?php esc_html_e('Search Locations', 'pds-map-locations-filter'); ?></label>
            <input type="text" id="mlf-search-input-<?= esc_attr(uniqid()) ?>" class="mlf-search" placeholder="<?= esc_attr__('Search...', 'pds-map-locations-filter'); ?>" />
        </div>

        <?php if (!empty($taxonomies)): ?>
            <?php foreach ($taxonomies as $slug => $taxonomy_object): ?>
                <?php if ($taxonomy_object instanceof WP_Taxonomy): // Add check ?>
                    <div class="mlf-taxonomy">
                        <label for="filter-<?= esc_attr($slug); ?>-<?= esc_attr(uniqid()) ?>"><?= esc_html($taxonomy_object->labels->singular_name); ?></label>
                        <select class="filters" name="<?= esc_attr($slug); ?>" id="filter-<?= esc_attr($slug); ?>-<?= esc_attr(uniqid()) ?>">
                            <option value="all"><?= sprintf(esc_html__('All %s', 'pds-map-locations-filter'), esc_html($taxonomy_object->labels->name)); ?></option>
                            <?php
                            $terms = get_terms([
                                'taxonomy'   => $slug,
                                'hide_empty' => true, // Typically hide empty terms on frontend
                            ]);
                            if (!is_wp_error($terms) && !empty($terms)):
                                foreach ($terms as $term): ?>
                                    <option value="<?= esc_attr($term->slug); ?>"><?= esc_html($term->name); ?></option>
                                <?php endforeach;
                            endif;
                            ?>
                        </select>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        <?php elseif (current_user_can('edit_posts')): // Show message only in backend/preview if needed ?>
             <p class="mlf-no-filters-selected"><?php esc_html_e('No filterable taxonomies selected in block settings.', 'pds-map-locations-filter'); ?></p>
        <?php endif; ?>
    </div>
</nav>