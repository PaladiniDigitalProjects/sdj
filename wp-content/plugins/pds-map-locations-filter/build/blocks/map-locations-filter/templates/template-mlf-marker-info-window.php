<?php
/**
 * Template for the content of a Google Maps marker info window.
 *
 * Variables available:
 * - $title (string)
 * - $content (string)
 * - $id (int)
 * - $permalink (string)
 */

// Ensure variables are extracted
if (!empty($variables)) {
    extract($variables, EXTR_SKIP);
}
?>
<div class="mlf-info-window">
    <h5 class="mlf-info-window-title"><a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a></h5>
    <?php if ($content) : ?>
        <p class="mlf-info-window-content"><?php echo wp_kses_post($content); ?></p>
    <?php endif; ?>
    <a href="<?php echo esc_url($permalink); ?>" class="mlf-info-window-link"><?php echo esc_html__('View Details', 'pds-map-locations-filter'); ?></a>
</div>