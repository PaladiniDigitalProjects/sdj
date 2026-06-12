<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Determine if the block should be displayed.
$should_render = true;
$visibility_class = ''; 


if ( wp_is_mobile() ) {
    if ( empty( $attributes['visibilityMobile'] ) ) {
        $should_render = false;
    } else {
        $visibility_class = 'visible-mobile';
    }
} else {
    if ( empty( $attributes['visibilityDesktop'] ) ) {
        $should_render = false;
    } else {
        $visibility_class = 'visible-desktop';
    }
}

// Render the block only if it should be displayed.
if ( $should_render ) {
    echo '<div' . ( $visibility_class ? ' class="' . esc_attr( $visibility_class ) . '"' : '' ) . '>' . $content . '</div>';
}

?>
