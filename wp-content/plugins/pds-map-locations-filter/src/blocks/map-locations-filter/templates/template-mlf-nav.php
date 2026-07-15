<?php
/**
 * Template part for the map navigation and filters.
 * Expected variables:
 * - $title (string): Optional title for the nav section.
 * - $taxonomies (array): Array of WP_Taxonomy objects to display as filters.
 * - $container_id (string): Unique ID of the parent block wrapper for consistent element IDs.
 * - $is_preview (bool): True if rendered in the block editor, false otherwise.
 *
 * IMPORTANT: No closing PHP tag (?>) to prevent accidental whitespace output.
 */
$title        = $title ?? '';
$taxonomies   = $taxonomies ?? [];
$container_id = $container_id ?? uniqid('mlf-nav-fallback-'); // Fallback unique ID
$is_preview   = $is_preview ?? false; // Default to false if not passed

?>
<nav class="pds-map-filters">
  

    <div class="mlf-filters">
          <?php if ($title): ?>
                <div class="mlf-title"><?= esc_html($title); ?></div>
            <?php endif; ?>
        <div class="mlf-search-wrapper">
            <label for="<?= esc_attr($container_id); ?>-mlf-search-input" class="screen-reader-text"><?php esc_html_e('Buscar centros', 'pds-map-locations-filter'); ?></label>
            <input type="text" id="<?= esc_attr($container_id); ?>-mlf-search-input" class="mlf-search" placeholder="<?= esc_attr__('Buscando...', 'pds-map-locations-filter'); ?>" />
        </div>

        <?php if (!empty($taxonomies)): ?>
            <?php foreach ($taxonomies as $slug => $taxonomy_object): ?>
                <?php if ($taxonomy_object instanceof WP_Taxonomy):
                    // Use $container_id to create unique and stable IDs for elements within this specific block instance
                    $select_id = esc_attr($container_id) . '-filter-' . esc_attr($slug);
                ?>
                    <div class="mlf-taxonomy">
                        
                        <select class="mlf-filters-select" name="<?= esc_attr($slug); ?>" id="<?= $select_id ?>">
                            <option value="all"><?php
                                // Etiqueta "todos" com a cadena completa i traduïble per taxonomia
                                // (permet a WPML String Translation traduir-la amb la capitalització
                                // exacta: «Veure àmbits», etc.). Fallback genèric per a altres taxonomies.
                                $mlf_all_labels = [
                                    'ambito'             => esc_html__('Ver Ámbitos', 'pds-map-locations-filter'),
                                    'comunidad_autonoma' => esc_html__('Ver Comunidades Autónomas', 'pds-map-locations-filter'),
                                    'localidad'          => esc_html__('Ver Localidades', 'pds-map-locations-filter'),
                                    'provincia'          => esc_html__('Ver Provincias', 'pds-map-locations-filter'),
                                ];
                                echo $mlf_all_labels[$slug] ?? sprintf('%s %s', esc_html__('Ver', 'pds-map-locations-filter'), esc_html($taxonomy_object->labels->name));
                            ?></option>                            <?php
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
        <?php elseif ($is_preview && current_user_can('edit_posts')):  ?>
             <p class="mlf-no-filters-selected"><?php esc_html_e('No filterable taxonomies selected in block settings.', 'pds-map-locations-filter'); ?></p>
        <?php endif; ?>
    </div>
</nav>
<?php 