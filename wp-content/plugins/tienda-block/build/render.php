<?php
/**
 * Tienda Block Render — Hero + Map layout
 */

if ( ! defined( 'ABSPATH' ) ) exit;

global $post;
$post_id = isset( $post->ID ) ? $post->ID : get_the_ID();

$telefono  = get_field( 'ce_telefono', $post_id );
$direccion = get_field( 'ce_direccion', $post_id );
$correo    = get_field( 'ce_email', $post_id );
$web       = get_field( 'ce_web', $post_id );
$gm_field  = get_field( 'ce_google_maps', $post_id );
$latitude  = get_field( 'latitude', $post_id );
$longitude = get_field( 'longitude', $post_id );
$imagen    = get_the_post_thumbnail_url( $post_id, 'full' );

$map_zoom  = 14;
if ( ! empty( $latitude ) && ! empty( $longitude ) ) {
    $embed_src = "https://www.google.com/maps?q={$latitude},{$longitude}&z={$map_zoom}&output=embed";
    $google_maps_link = "https://www.google.com/maps?q={$latitude},{$longitude}";
} elseif ( ! empty( $gm_field ) ) {
    $embed_src = "https://www.google.com/maps?q=" . rawurlencode( $gm_field ) . "&z={$map_zoom}&output=embed";
    $google_maps_link = esc_url_raw( $gm_field );
} else {
    $embed_src = '';
    $google_maps_link = '';
}

$comunidad = get_the_terms( $post_id, 'comunidad_autonoma' );
$ambitos   = get_the_terms( $post_id, 'ambito' );

$wrapper_attrs = function_exists( 'get_block_wrapper_attributes' )
    ? get_block_wrapper_attributes( array( 'class' => 'tienda-block site-main' ) )
    : 'class="tienda-block site-main"';
?>

<div <?php echo $wrapper_attrs; ?> role="main">

    <!-- HERO SECTION
    <section class="tienda-hero" style="background-image:url('<?php echo esc_url( $imagen ); ?>');">
        <div class="tienda-hero-overlay">
            <?php if ( ! empty( $comunidad ) ): ?>
                <p class="tienda-hero-subtitle">
                    <?php echo esc_html( implode( ', ', wp_list_pluck( $comunidad, 'name' ) ) ); ?>
                </p>
            <?php endif; ?>

            <h1 class="tienda-hero-title"><?php the_title(); ?></h1>

            <?php if ( ! empty( $ambitos ) ): ?>
                <p class="tienda-hero-tax">
                    Ámbitos de actuación:
                    <strong><?php echo esc_html( implode( ', ', wp_list_pluck( $ambitos, 'name' ) ) ); ?></strong>
                </p>
            <?php endif; ?>
        </div>
    </section>
 -->
    <!-- CONTENT + MAP -->
    <section class="tienda-content-section">
        <div class="tienda-content">
            <?php the_content(); ?>

            <div class="info-store">
                <?php if ( $web ): ?>
                    <div class="data">
						<span class="icon">
    <img src="<?php echo plugin_dir_url( __FILE__ ) . 'assets/ico_web.svg'; ?>" alt="Web icon" width="16" height="16">
</span>
                        <a href="<?php echo esc_url( $web ); ?>" target="_blank"><?php echo esc_html( $web ); ?></a>
                    </div>
                <?php endif; ?>

                <?php if ( $correo ): ?>
                    <div class="data">
						<span class="icon">
    <img src="<?php echo plugin_dir_url( __FILE__ ) . 'assets/ico_email.svg'; ?>" alt="Mail icon" width="16" height="16">
</span>
                        <a href="mailto:<?php echo antispambot( $correo ); ?>"><?php echo esc_html( $correo ); ?></a>
                    </div>
                <?php endif; ?>

                <?php if ( $telefono ): ?>
                    <div class="data">
						<span class="icon">
    <img src="<?php echo plugin_dir_url( __FILE__ ) . 'assets/ico_direccion.svg'; ?>" alt="Phone icon" width="16" height="16">
</span>
                        <a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $telefono ) ); ?>"><?php echo esc_html( $telefono ); ?></a>
                    </div>
                <?php endif; ?>

                <?php if ( $direccion ): ?>
                    <div class="data">
						<span class="icon">
    <img src="<?php echo plugin_dir_url( __FILE__ ) . 'assets/ico_direccion.svg'; ?>" alt="Location icon" width="16" height="16">
</span>
                        <?php echo esc_html( $direccion ); ?>
                    </div>
                <?php endif; ?>

                <?php if ( ! empty( $comunidad ) ): ?>
                    <div class="data">
						
                        <?php echo esc_html( implode( ', ', wp_list_pluck( $comunidad, 'name' ) ) ); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <?php if ( $embed_src ): ?>
            <aside class="tienda-map">
                <iframe src="<?php echo esc_url( $embed_src ); ?>" loading="lazy" allowfullscreen></iframe>
                <?php if ( $google_maps_link ): ?>
                    <a href="<?php echo esc_url( $google_maps_link ); ?>" target="_blank" class="map-button">
                        Cómo llegar →
                    </a>
                <?php endif; ?>
            </aside>
        <?php endif; ?>
    </section>
</div>
