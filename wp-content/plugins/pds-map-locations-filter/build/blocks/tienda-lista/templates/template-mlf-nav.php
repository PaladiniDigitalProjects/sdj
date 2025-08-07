<?php
/**
 * Template part for the map navigation and filters.
 * Expects $title (optional), $taxonomies [slug => WP_Taxonomy object], and $container_id.
 */

$title        = $title ?? '';
$taxonomies   = $taxonomies ?? [];
$container_id = $container_id ?? uniqid('mlf-');
$is_preview   = $is_preview ?? false;
?>
<nav class="pds-map-filters">
    <?php if ($title): ?>
        <div class="mlf-title"><?= esc_html($title); ?></div>
    <?php endif; ?>

    <div class="mlf-filters">
        <div class="mlf-search-wrapper">
            <label for="<?= esc_attr($container_id); ?>-mlf-search-input" class="screen-reader-text">
                <?= esc_html__('Search Locations', 'pds-map-locations-filter'); ?>
            </label>
            <input
                type="text"
                id="<?= esc_attr($container_id); ?>-mlf-search-input"
                class="mlf-search"
                placeholder="<?= esc_attr__('Search...', 'pds-map-locations-filter'); ?>"
            />
        </div>

        <?php if (!empty($taxonomies)): ?>
            <?php foreach ($taxonomies as $slug => $taxonomy_object): ?>
                <?php if ($taxonomy_object instanceof WP_Taxonomy): ?>
                    <div class="mlf-taxonomy">
                        <label for="<?= esc_attr($container_id); ?>-filter-<?= esc_attr($slug); ?>">
                            <?= esc_html($taxonomy_object->labels->singular_name); ?>
                        </label>
                        <select
                            class="mlf-filters-select"
                            name="<?= esc_attr($slug); ?>"
                            id="<?= esc_attr($container_id); ?>-filter-<?= esc_attr($slug); ?>"
                        >
                            <option value="all">
                                <?= sprintf(esc_html__('All %s', 'pds-map-locations-filter'), esc_html($taxonomy_object->labels->name)); ?>
                            </option>
                            <?php
                            $terms = get_terms([
                                'taxonomy'   => $slug,
                                'hide_empty' => true,
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
        <?php elseif (!$is_preview && current_user_can('edit_posts')): ?>
            <p class="mlf-no-filters-selected">
                <?= esc_html__('No filterable taxonomies selected in block settings.', 'pds-map-locations-filter'); ?>
            </p>
        <?php endif; ?>
    </div>
</nav>
