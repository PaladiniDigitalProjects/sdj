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
// REST API — limitar el cost de les peticions públiques
//
// Aquest endpoint NO es cacheja mai (`cache-control: no-store`), així
// que cada petició és PHP+MySQL en viu. Cost mesurat a producció
// (04-08-2026), sobre 783 posts:
//
//   per_page   sense _embed      amb _embed
//      20      0,74 s ·  447 KB   2,82 s · 1,0 MB
//      50      2,20 s ·  1,1 MB   6,96 s · 2,5 MB
//     100      4,18 s ·  2,2 MB  13,46 s · 5,0 MB
//
// El multiplicador real és `_embed` (incrusta autor, termes i mèdia de
// CADA element): triplica el cost a tots els trams. Per això es
// desactiva sempre a les peticions anònimes.
//
// `per_page` es deixa a 100 per petició del client (integració amb
// l'app d'INDRA): com que el core ja topa a 100, el límit de sota és
// de facto inoperant i es manté només com a punt únic de configuració
// si algun dia cal abaixar-lo.
//
// Només afecta peticions NO autenticades: l'editor de blocs i les
// crides internes de WPML/Yoast conserven el comportament complet.
// ─────────────────────────────────────────────────────────────

/** Màxim d'elements per pàgina a l'API pública (el core ja en permet 100). */
define( 'SJD_REST_MAX_PER_PAGE', 100 );

/**
 * Rebaixa el màxim de `per_page` dels tipus de contingut públics.
 */
function sjd_rest_limit_per_page() {
    if ( is_user_logged_in() ) {
        return;
    }
    foreach ( [ 'post', 'page', 'attachment' ] as $post_type ) {
        add_filter( "rest_{$post_type}_collection_params", 'sjd_rest_cap_per_page_param' );
    }
}
add_action( 'rest_api_init', 'sjd_rest_limit_per_page' );

function sjd_rest_cap_per_page_param( $params ) {
    if ( isset( $params['per_page'] ) ) {
        $params['per_page']['maximum'] = SJD_REST_MAX_PER_PAGE;
    }
    return $params;
}

/**
 * Retalla les peticions anònimes abans que el core les validi:
 *
 *  - `_embed` → fora. És el que multiplicava el cost per deu (incrusta
 *    autor, termes i mèdia de cada element).
 *  - `per_page` per damunt del màxim → es RETALLA en silenci, no es
 *    rebutja. Un 400 trencaria els clients que ja demanen 100 elements;
 *    així segueixen funcionant, només reben menys per pàgina (el
 *    `X-WP-TotalPages` s'hi ajusta sol i la paginació continua sent
 *    coherent).
 */
function sjd_rest_throttle_anonymous_request( $result, $server, $request ) {
    if ( is_user_logged_in() ) {
        return $result;
    }

    // El core llegeix `_embed` del request i, segons la versió, de $_GET.
    unset( $_GET['_embed'] );
    $request->set_param( '_embed', null );

    $per_page = (int) $request->get_param( 'per_page' );
    if ( $per_page > SJD_REST_MAX_PER_PAGE ) {
        $request->set_param( 'per_page', SJD_REST_MAX_PER_PAGE );
    }

    return $result;
}
add_filter( 'rest_pre_dispatch', 'sjd_rest_throttle_anonymous_request', 10, 3 );


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

/**
 * Abreviatures dels dies de la setmana en català amb el format del client
 * (minúscula + punt): dl., dt., dc., dj., dv., ds., dg.
 *
 * El core català retorna «Dl», «Dt»… (majúscula, sense punt). A la capçalera del
 * calendari mensual de The Events Calendar el text VISIBLE és
 * $wp_locale->get_weekday_initial() i l'atribut abbr= és get_weekday_abbrev().
 *
 * No es pot fer via filtre `gettext_with_context`: WP_Locale es construeix a
 * wp-settings.php (poblant els arrays) ABANS de carregar el functions.php del
 * tema, així que el filtre arribaria tard. Sobreescrivim directament els arrays
 * de $wp_locale al hook `wp` (locale ja resolt a `ca` per WPML, abans de pintar
 * el calendari). Índex de get_weekday(): 0=diumenge … 6=dissabte.
 */
function sjd_ca_weekday_short() {
    if ( get_locale() !== 'ca' ) {
        return;
    }
    global $wp_locale;
    $map = [ 0 => 'dg.', 1 => 'dl.', 2 => 'dt.', 3 => 'dc.', 4 => 'dj.', 5 => 'dv.', 6 => 'ds.' ];
    foreach ( $map as $i => $short ) {
        $name = $wp_locale->get_weekday( $i );
        $wp_locale->weekday_initial[ $name ] = $short;
        $wp_locale->weekday_abbrev[ $name ]  = $short;
    }
}
add_action( 'wp', 'sjd_ca_weekday_short' );

/**
 * Fix navegació / WPML: elimina l'atribut `onclick` legacy que el switcher
 * d'idiomes de WPML (LanguageSwitcher/Render.php, mode "open on click") injecta
 * al <li> del submenú. Aquest `onclick` com a STRING trenca la hidratació de la
 * Interactivity API de WordPress 7.0 ("Component's onclick property should be a
 * function, but got [string]"), i això deixava sense funcionar TOTA la navegació
 * del header —inclòs el botó burger en mòbil, que no obria—. Fix a prova
 * d'actualitzacions (no toca els fitxers de WPML). Incidència 2026-07-23.
 */
function sjd_strip_wpml_switcher_onclick( $block_content ) {
    if ( is_string( $block_content )
        && strpos( $block_content, 'const ariaExpanded = this.children[0]' ) !== false ) {
        $block_content = preg_replace(
            '/\s*onclick="\(\(\)=>\{const ariaExpanded[^"]*"/',
            '',
            $block_content
        );
    }
    return $block_content;
}
add_filter( 'render_block', 'sjd_strip_wpml_switcher_onclick', 20 );

/**
 * Redirecció 301 de la pàgina d'entrades (Noticias / Notícies) cap a la pàgina
 * Actualidad / Actualitat de l'idioma actual. Petició PDS 2026-07-23.
 *   ES: /noticias/    (ID 170)   -> /actualidad/    (ID 19414)
 *   CA: /ca/noticies/ (ID 19801) -> /ca/actualitat/ (ID 47577)
 * Fem servir is_home() perquè /noticias/ és la page_for_posts (arxiu d'entrades).
 */
function sjd_redirect_noticias_to_actualidad() {
    if ( is_admin() || ! is_home() || is_front_page() ) {
        return;
    }
    $lang      = apply_filters( 'wpml_current_language', null );
    $target_id = ( 'ca' === $lang ) ? 47577 : 19414; // actualitat : actualidad
    $url       = get_permalink( $target_id );
    if ( $url ) {
        wp_safe_redirect( $url, 301 );
        exit;
    }
}
add_action( 'template_redirect', 'sjd_redirect_noticias_to_actualidad' );
