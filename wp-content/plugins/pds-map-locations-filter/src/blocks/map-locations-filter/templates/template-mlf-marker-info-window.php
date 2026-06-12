<?php
/**
 * Template for marker info window / card.
 *
 * Variables:
 * - $id         (int)    : Post/Location ID
 * - $title      (string) : Location title
 * - $thumbnail  (string) : Image URL
 * - $ambito     (string) : Ámbito taxonomy term name(s)
 * - $provincia  (string) : Provincia taxonomy term name
 * - $permalink  (string) : Link to full location page
 * - $direccion  (string) : Address
 * - $telefono   (string) : Phone number
 * - $email      (string) : Email address
 * - $web        (string) : Website URL
 */

$id        = $id ?? 0;
$title     = $title ?? '';
$thumbnail = $thumbnail ?? '';
$ambito    = $ambito ?? '';
$provincia = $provincia ?? '';
$permalink = $permalink ?? '#';
$direccion = $direccion ?? '';
$telefono  = $telefono ?? '';
$email     = $email ?? '';
$web       = $web ?? '';
?>
<div class="mlf-infowindow" data-location-id="<?php echo esc_attr($id); ?>">
    <?php if ($thumbnail): ?>
        <div class="mlf-infowindow-image">
            <img src="<?php echo esc_url($thumbnail); ?>" alt="<?php echo esc_attr($title); ?>">
        </div>
    <?php endif; ?>
    
    <div class="mlf-infowindow-content">
        <?php if ($provincia): ?>
            <span class="mlf-infowindow-provincia"><?php echo esc_html($provincia); ?></span>
        <?php endif; ?>
        
        <h3 class="mlf-infowindow-title">
            <a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a>
        </h3>
        
        <?php if ($ambito): ?>
            <span class="mlf-infowindow-ambito"><?php echo esc_html($ambito); ?></span>
        <?php endif; ?>
        
        <div class="mlf-infowindow-contact">
            <?php if ($telefono): ?>
                <p><strong><?php esc_html_e('Teléfono:', 'pds-map-locations-filter'); ?></strong> <?php echo esc_html($telefono); ?></p>
            <?php endif; ?>
            <?php if ($web): ?>
                <p><strong><?php esc_html_e('Sitio Web:', 'pds-map-locations-filter'); ?></strong> 
                    <a href="<?php echo esc_url($web); ?>" target="_blank" rel="noopener"><?php echo esc_html($web); ?></a>
                </p>
            <?php endif; ?>
            <?php if ($email): ?>
                <p><strong><?php esc_html_e('Correo electrónico:', 'pds-map-locations-filter'); ?></strong> 
                    <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
                </p>
            <?php endif; ?>
        </div>
        
        <?php if ($direccion): ?>
            <div class="mlf-infowindow-address">
                <strong><?php esc_html_e('Dirección', 'pds-map-locations-filter'); ?></strong>
                <p><?php echo esc_html($direccion); ?></p>
            </div>
        <?php endif; ?>
        
        <a href="<?php echo esc_url($permalink); ?>" class="mlf-infowindow-btn">
            <?php esc_html_e('Ver detalles', 'pds-map-locations-filter'); ?>
        </a>
    </div>
</div>
