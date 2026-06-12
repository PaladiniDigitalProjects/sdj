<?php
// ─────────────────────────────────────────────────────────────
// ENQUEUE ASSETS
// ─────────────────────────────────────────────────────────────

function my_theme_enqueue_assets() {

    $theme_dir = get_stylesheet_directory();
    $theme_uri = get_stylesheet_directory_uri();

    // Parent theme stylesheet
    $parent_handle = 'parent-style';
    wp_enqueue_style(
        $parent_handle,
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( get_template() )->get( 'Version' )
    );

    // Child theme stylesheet
    wp_enqueue_style(
        'child-style',
        $theme_uri . '/style.css',
        [ $parent_handle ],
        wp_get_theme()->get( 'Version' )
    );

    // Extra child CSS
    wp_enqueue_style(
        'child-estils',
        $theme_uri . '/assets/css/estils.css',
        [ $parent_handle ],
        filemtime( $theme_dir . '/assets/css/estils.css' )
    );

    // OWL Carousel CSS
    wp_enqueue_style(
        'owl-css',
        $theme_uri . '/assets/css/owl.carousel.min.css',
        [],
        '2.3.4'
    );
    wp_enqueue_style(
        'owl-theme',
        $theme_uri . '/assets/css/owl.theme.default.min.css',
        [ 'owl-css' ],
        '2.3.4'
    );

    // Admin styles (login)
    wp_enqueue_script( 'jquery' );

    // Main JS
    wp_enqueue_script(
        'child-main-js',
        $theme_uri . '/assets/js/main.js',
        [ 'jquery' ],
        filemtime( $theme_dir . '/assets/js/main.js' ),
        true
    );

    // OWL Carousel JS
    wp_enqueue_script(
        'owl-carousel',
        $theme_uri . '/assets/js/owl.carousel.js',
        [ 'jquery' ],
        '2.3.4',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_assets' );


// ─────────────────────────────────────────────────────────────
// ADMIN STYLES
// ─────────────────────────────────────────────────────────────

function wpdocs_enqueue_custom_admin_style() {
    $theme_dir = get_stylesheet_directory();
    $theme_uri = get_stylesheet_directory_uri();
    wp_register_style(
        'custom_wp_admin_css',
        $theme_uri . '/assets/css/admin-styles.css',
        [],
        filemtime( $theme_dir . '/assets/css/admin-styles.css' )
    );
    wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );


// ─────────────────────────────────────────────────────────────
// LOGIN STYLES
// ─────────────────────────────────────────────────────────────

function login_stylesheet() {
    wp_enqueue_style(
        'custom-login',
        get_stylesheet_directory_uri() . '/assets/css/login-styles.css',
        [],
        filemtime( get_stylesheet_directory() . '/assets/css/login-styles.css' )
    );
}
add_action( 'login_enqueue_scripts', 'login_stylesheet' );


// ─────────────────────────────────────────────────────────────
// LOGIN — URL i títol del logo
// ─────────────────────────────────────────────────────────────

function my_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return get_bloginfo( 'name' );
}
add_filter( 'login_headertext', 'my_login_logo_url_title' );


// ─────────────────────────────────────────────────────────────
// REST API — restringir a usuaris autenticats
// (permet peticions internes de plugins com WPML, Yoast, etc.)
// ─────────────────────────────────────────────────────────────

add_filter( 'rest_authentication_errors', function( $result ) {
    // Si ja hi ha un error o autenticació, no intervenim
    if ( ! empty( $result ) ) {
        return $result;
    }
    // Bloquejar només peticions externes no autenticades
    if ( ! is_user_logged_in() && ! defined( 'REST_REQUEST' ) ) {
        return new WP_Error(
            'rest_disabled',
            'REST API restricted to authenticated users.',
            [ 'status' => 401 ]
        );
    }
    return $result;
} );


// ─────────────────────────────────────────────────────────────
// BLOCK STYLES
// ─────────────────────────────────────────────────────────────

function prefix_register_block_styles() {
    register_block_style( 'core/button', [
        'name'  => 'button-icon-right',
        'label' => __( 'Icon Right', 'PDS' ),
    ] );
    register_block_style( 'core/button', [
        'name'  => 'button-icon-left',
        'label' => __( 'Icon Left', 'PDS' ),
    ] );
    register_block_style( 'core/list', [
        'name'  => 'list-clean',
        'label' => __( 'Llistat net', 'PDS' ),
    ] );
    register_block_style( 'core/list', [
        'name'  => 'list-ratllat',
        'label' => __( 'Llistat underline', 'PDS' ),
    ] );
}
add_action( 'init', 'prefix_register_block_styles' );

add_theme_support( 'wp-block-styles' );


// ─────────────────────────────────────────────────────────────
// SKIP LINK
// ─────────────────────────────────────────────────────────────

function sjd_skip_link() {
    echo '<a class="skip-link" href="#main">' . esc_html__( 'Saltar al contenido', 'PDS' ) . '</a>';
}
add_action( 'wp_body_open', 'sjd_skip_link' );


// ─────────────────────────────────────────────────────────────
// BOTÓ EDITAR (només usuaris autenticats, en singular)
// ─────────────────────────────────────────────────────────────

function mycontent( $content ) {
    if ( is_singular() && is_user_logged_in() ) {
        $content .= '<div class="btn btn-primary edit-post-link" style="background-color:red;display:block;border-radius:50%;width:100px;height:100px;position:fixed;right:2rem;bottom:2rem;z-index:999">'
            . '<a style="display:block;text-align:center;line-height:100px;color:white;" href="' . get_edit_post_link( get_the_ID() ) . '">Editar</a>'
            . '</div>';
    }
    return $content;
}
add_filter( 'the_content', 'mycontent' );
add_filter( 'avf_template_builder_content', 'mycontent' );


// ─────────────────────────────────────────────────────────────
// OCULTAR CATEGORIA OHSJD
// ─────────────────────────────────────────────────────────────

add_filter( 'get_the_terms', 'ocultar_categoria_ohsjd', 10, 3 );

function ocultar_categoria_ohsjd( $terms, $post_id, $taxonomy ) {
    if ( ! empty( $terms ) && is_array( $terms ) ) {
        $terms = array_values( array_filter( $terms, function( $term ) {
            return $term->slug !== 'ohsjd' && $term->name !== 'OHSJD';
        } ) );
    }
    return $terms;
}


// ─────────────────────────────────────────────────────────────
// ACF — BLOCS I CONFIGURACIÓ
// ─────────────────────────────────────────────────────────────

add_action( 'acf/init', 'my_acf_init' );

function my_acf_init() {

    if ( ! function_exists( 'acf_register_block_type' ) ) return;

    $blocks = [
        [ 'name' => 'related',          'title' => 'Related',                   'icon' => 'welcome-add-page',    'keywords' => [ 'Content', 'Related' ] ],
        [ 'name' => 'block',            'title' => 'Editorial Block',           'icon' => 'button',              'keywords' => [ 'Editorial' ] ],
        [ 'name' => 'blockslider',      'title' => 'Editorial Block FP Slider', 'icon' => 'arrow-right-alt',     'keywords' => [ 'Editorial', 'Slider' ] ],
        [ 'name' => 'carussel',         'title' => 'Carussel',                  'icon' => 'button',              'keywords' => [ 'Carrusel' ] ],
        [ 'name' => 'Slider',           'title' => 'Slider Block',              'icon' => 'slides',              'keywords' => [ 'Slider', 'Banner' ] ],
        [ 'name' => 'contact',          'title' => 'Contact Block',             'icon' => 'phone',               'keywords' => [ 'Contact' ] ],
        [ 'name' => 'team',             'title' => 'Team',                      'icon' => 'admin-users',         'keywords' => [ 'Team' ] ],
        [ 'name' => 'teamlist',         'title' => 'Team list',                 'icon' => 'admin-users',         'keywords' => [ 'Team' ] ],
        [ 'name' => 'projects-slider',  'title' => 'Projects slider',           'icon' => 'slides',              'keywords' => [ 'Projects', 'Slider' ] ],
        [ 'name' => 'events',           'title' => 'Events list',               'icon' => 'calendar-alt',        'keywords' => [ 'Events' ] ],
        [ 'name' => 'ticker',           'title' => 'Ticker list',               'icon' => 'sticky',              'keywords' => [ 'Ticker' ] ],
        [ 'name' => 'noticias',         'title' => 'Noticias relacionadas',      'icon' => 'media-spreadsheet',  'keywords' => [ 'Noticias' ] ],
        [ 'name' => 'relacionado',      'title' => 'Contenidos relacionados',   'icon' => 'pressthis',           'keywords' => [ 'Relacionado' ] ],
        [ 'name' => 'donaciones',       'title' => 'Quiero Donar',              'icon' => 'pressthis',           'keywords' => [ 'Donaciones' ] ],
        [ 'name' => 'redes-sociales',   'title' => 'Redes Sociales',            'icon' => 'share',               'keywords' => [ 'Social' ] ],
        [ 'name' => 'descargas',        'title' => 'Descargas',                 'icon' => 'download',            'keywords' => [ 'Descargas', 'PDF' ] ],
    ];

    foreach ( $blocks as $block ) {
        acf_register_block_type( [
            'name'             => $block['name'],
            'title'            => __( $block['title'], 'PDS' ),
            'render_callback'  => 'my_acf_block_render_callback',
            'category'         => 'formatting',
            'icon'             => $block['icon'],
            'keywords'         => $block['keywords'],
            'align'            => 'full',
        ] );
    }

    // Google Maps API key — definida a wp-config.php com a GOOGLE_MAPS_API_KEY
    if ( defined( 'GOOGLE_MAPS_API_KEY' ) ) {
        acf_update_setting( 'google_api_key', GOOGLE_MAPS_API_KEY );
    }
}

function my_acf_block_render_callback( $block ) {
    $slug = str_replace( 'acf/', '', $block['name'] );
    $template = get_theme_file_path( "/template-parts/block/content-{$slug}.php" );
    if ( file_exists( $template ) ) {
        include $template;
    }
}
