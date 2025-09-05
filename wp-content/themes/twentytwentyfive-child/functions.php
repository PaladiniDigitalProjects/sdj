<?php
function my_theme_enqueue_assets() {
    // Parent theme stylesheet.
    $parent_handle = 'parent-style';
    wp_enqueue_style(
        $parent_handle,
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( get_template() )->get( 'Version' )
    );

    // Child theme stylesheet.
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [ $parent_handle ],
        wp_get_theme()->get( 'Version' )
    );

    // Extra child CSS (estils.css).
    wp_enqueue_style(
        'child-estils',
        get_stylesheet_directory_uri() . '/assets/css/estils.css',
        [ 'child-style' ],
        wp_get_theme()->get( 'Version' )
    );

    // Ensure jQuery is available.
    wp_enqueue_script( 'jquery' );

    // Main JS, loaded in footer, depends on jQuery.
    wp_enqueue_script(
        'child-main-js',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        [ 'jquery' ],
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_assets' );


/* REGISTER NEWS STYLE */

function prefix_register_block_styles() {
	register_block_style(
		array( 'core/button' ),
		array(
			'name'         => 'button-icon-right',
			'label'        => __( 'Icon Right', 'PDS' ),
		)
	);

	register_block_style(
		array( 'core/button' ),
		array(
			'name'         => 'button-icon-left',
			'label'        => __( 'Icon Left', 'PDS' ),
		)
	);

	register_block_style(
		array( 'core/list' ),
		array(
			'name'         => 'list-clean',
			'label'        => __( 'Llistat net', 'PDS' ),
		)
	);
	register_block_style(
		array( 'core/list' ),
		array(
			'name'         => 'list-ratllat',
			'label'        => __( 'Llistat underline', 'PDS' ),
		)
	);
}
add_action( 'init', 'prefix_register_block_styles' );


/* ADD ADMIN AND LOGIN STYLES */

function wpdocs_enqueue_custom_admin_style() {
	wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '-child/assets/css/admin-styles.css', false, '1.0.0' );
	wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );

function login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/assets/css/login-styles.css' );
}
add_action( 'login_enqueue_scripts', 'login_stylesheet' );

/* HIDE JSON API */

add_filter( 'rest_authentication_errors', function( $result ) {
    if ( ! is_user_logged_in() ) {
        return new WP_Error( 'rest_disabled', 'REST API restricted to authenticated users.', array( 'status' => 401 ) );
    }
    return $result;
});

/* LOGIN H1 URL */


function my_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'Your Site Name and Info';
}
add_filter( 'login_headertext', 'my_login_logo_url_title' );


/* EDIT PAGE */

edit_post_link( __( 'Editar', 'textdomain' ), '<p>', '</p>', null, 'btn btn-primary btn-edit-post-link' );
add_filter('the_content', 'mycontent');
add_filter('avf_template_builder_content', 'mycontent');

function mycontent( $content ) {
	if( is_singular() && is_user_logged_in() ) {
		$content = $content . '<div class="btn btn-primary edit-post-link" style="background-color:red; display:block; border-radius:50%; width:100px; height:100px; position: fixed; right:2rem; bottom:2rem; z-index:999"><a style="display:block; text-align:center; line-height:100px; color:white;" href="' . get_edit_post_link( get_the_ID(), 'Editar') . '">Editar</a></div>';
	}
	return $content;
}