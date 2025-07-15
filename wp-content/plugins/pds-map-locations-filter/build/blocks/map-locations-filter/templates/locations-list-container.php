<?php
/**
 * Template part for the locations list container.
 * Holds the placeholder and the area where AJAX results are loaded.
 * Expects $container_id from the calling template/function.
 */
$list_container_id = $container_id ?? 'pds-locations-list-fallback-' . bin2hex(random_bytes(3));
?>
<div class="mlf-locations-container" id="<?= esc_attr($list_container_id) ?>">
    <div class="mlf-locations-placeholder" style="text-align: center; padding: 2rem; color: #777; display: block;">
        <?php esc_html_e('Loading locations...', 'pds-map-locations-filter'); ?>
    </div>
    <div class="mlf-locations">
        <!-- Location items will be loaded here via AJAX -->
    </div>
</div>