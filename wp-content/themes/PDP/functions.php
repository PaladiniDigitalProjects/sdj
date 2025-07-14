<?php

/* PATTERNS */

require get_template_directory() . '/inc/patterns.php';

/* LOGO */

function pdp_custom_logo_setup() {
    $defaults = array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    );
    add_theme_support( 'custom-logo', $defaults );
}
add_action( 'after_setup_theme', 'pdp_custom_logo_setup' );

function m1_customize_register( $wp_customize ) {
    $wp_customize->add_setting( 'm1_logo' ); // Add setting for logo uploader
    // Add control for logo uploader (actual uploader)
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'm1_logo', array(
        'label'    => __( 'Upload secodary Logo', 'm1' ),
        'section'  => 'title_tagline',
        'settings' => 'm1_logo',
    ) ) );
}
add_action( 'customize_register', 'm1_customize_register' );


if ( ! function_exists( 'gutenbergtheme_setup' ) ) :

	function gutenbergtheme_setup() {
		load_theme_textdomain( 'gutenbergtheme', get_template_directory() . '/languages' );
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '_s_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Adding support for core block visual styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

		// Add support for custom color scheme.
		add_theme_support( 'editor-color-palette', array(

      array(
        'name'  => __( 'Azul', 'PDP' ),
        'slug'  => 'primario',
        'color' => '#007FAD',
      ),

      array(
        'name'  => __( 'Turquesa', 'PDP' ),
		'slug'  => 'acundario',
        'color' => '#2fa2b8',
      ),

      array(
        'name'  => __( 'Rojo', 'PDP' ),
		'slug'  => 'terciario',
		'color' => '#DD1115',
      ),

      array(
        'name'  => __( 'Arena', 'PDP' ),
		'slug'  => 'quaternario',
		'color' => '#fdf1e6',
      ),


      array(
        'name'  => __( 'Blanco', 'PDP' ),
		'slug'  => 'blanco',
		'color' => '#FFFFFF',
      ),

	  array(
        'name'  => __( 'Gris', 'PDP' ),
		'slug'  => 'gris',
		'color' => '#939393',
      ),

      array(
        'name'  => __( 'Negro', 'PDP' ),
		'slug'  => 'negro',
		'color' => '#000000',
      ),


	) );
}
endif;
add_action( 'after_setup_theme', 'gutenbergtheme_setup' );


/* SCRIPTS */

function PDP_scripts() {
	// Load main theme stylesheet
	wp_enqueue_style( 'style', get_stylesheet_uri() );
	wp_enqueue_style( 'estilos', get_template_directory_uri() . '/css/estils.css', false, '2.0');

	wp_enqueue_style( 'owl-css', get_template_directory_uri() . '/css/owl.carousel.min.css');
	wp_enqueue_style( 'owl-theme', get_template_directory_uri() . '/css/owl.theme.default.min.css');
	//  wp_enqueue_style( 'css-animate', get_template_directory_uri() . '/css/animate.min.css');
	
	wp_enqueue_script( 'jqueries', get_template_directory_uri() . '/js/jquery.min.js');
	wp_enqueue_script( 'owl-carrousell', get_template_directory_uri() . '/js/owl.carousel.js');
	// wp_enqueue_script( 'jqheadroom', get_template_directory_uri() . '/js/jQuery.headroom.js');
	// wp_enqueue_script( 'headroom', get_template_directory_uri() . '/js/headroom.min.js');
	// wp_enqueue_script( 'isotope', get_template_directory_uri() . '/js/isotope.pkgd.js');
	// wp_enqueue_script( 'imagemaps', get_template_directory_uri() . '/js/jquery.rwdImageMaps.min.js');
	wp_enqueue_script( 'main', get_template_directory_uri() . '/js/scripts.js');

}
add_action( 'wp_enqueue_scripts', 'PDP_scripts' );


/* LOGIN STYLES */

function my_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );
function my_login_logo_url_title() {
    return 'Sant Juan de Dios';
}
add_filter( 'login_headertext ', 'my_login_logo_url_title' );
function my_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/css/login-styles.css' );
}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );



/* NAV MENUS */

register_nav_menus( array(
'primary' => __( 'Primary Menu', 'PDP' ),
'secondary' => __( 'Secondary Menu', 'PDP' ),
'tertiary' => __( 'Tertiary Menu', 'PDP' ),
'footer' => __( 'Footer Menu', 'PDP' ),
) );



// MENU NAV

class Description_Walker extends Walker_Nav_Menu {

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item));
        $class_attr = !empty($class_names) ? ' class="' . esc_attr($class_names) . '"' : '';

        $attributes  = '';
        !empty($item->attr_title) && $attributes .= ' title="' . esc_attr($item->attr_title) . '"';
        !empty($item->target)     && $attributes .= ' target="' . esc_attr($item->target) . '"';
        !empty($item->xfn)        && $attributes .= ' rel="' . esc_attr($item->xfn) . '"';
        !empty($item->url)        && $attributes .= ' href="' . esc_attr($item->url) . '"';

        $title = apply_filters('the_title', $item->title, $item->ID);

       
        $item_output  = $args->before;
        $item_output .= '<a' . $attributes . '>';               
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;
        $output .= '<li' . $class_attr . '>';
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

    function end_el(&$output, $item, $depth = 0, $args = array()) {
        $output .= "</li>\n";
    }

    function start_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"sub-menu\">\n";
    }

    function end_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }
}




  // WALLKER MENU

// $custom_walker = __DIR__ . '/inc/wp-custom-navwalker.php';
// if ( is_readable( $custom_walker ) ) {
//  require_once $custom_walker;
// }





// REPLACE H1 for H2

add_filter('render_block', function($block_content, $block) {
    if ( $block['blockName'] === 'core/heading' ) {
        $block_content = str_replace('<h1', '<h2', $block_content);
        $block_content = str_replace('</h1', '</h2', $block_content);
    }

    return $block_content;
}, 10, 2);
  

// THUMBNAILS
add_theme_support('post-thumbnails');


// SIDEBARS
// Register widgetized locations
if(function_exists('register_sidebar')) {

    register_sidebar(array(
		'name' => 'Numeros menu',
		'id' => 'widgets-menu',
		'before_widget' => '<div class="entry-menu">',
		'after_widget' => '</div>',
    	'before_title' => '<h5>',
		'after_title' => '</h5>',
	));


    register_sidebar(array(
		'name' => 'Aside',
		'id' => 'widgets-aside',
		'before_widget' => '<article class="entry-aside">',
		'after_widget' => '</article>',
    	'before_title' => '<h5>',
		'after_title' => '</h5>',
	));

    register_sidebar(array(
		'name' => 'Newsletter',
		'id' => 'widgets-newsletter',
		'before_widget' => '<article class="entry-newsletter">',
		'after_widget' => '</article>',
    	'before_title' => '<h5>',
		'after_title' => '</h5>',
	));

    register_sidebar(array(
		'name' => 'Page Footer',
		'id' => 'widgets-footer',
		'before_widget' => '<article class="entry-footer">',
		'after_widget' => '</article>',
    	'before_title' => '<h5>',
		'after_title' => '</h5>',
	));

    register_sidebar(array(
		'name' => 'La Casa de Todos',
		'id' => 'widgets-lacasadetodos',
		'before_widget' => '<article class="entry-aside">',
		'after_widget' => '</article>',
    	'before_title' => '<h5>',
		'after_title' => '</h5>',
	));

}

/* BLOCKS */

add_action('acf/init', 'my_acf_init');
function my_acf_init() {

	// check function exists
	if( function_exists('acf_register_block') ) {

    // register related content
    acf_register_block(array(
      'name'				=> 'related',
      'title'				=> __('Related'),
      'description'			=> __('Related content'),
      'render_callback'		=> 'my_acf_block_render_callback',
      'category'			=> 'formatting',
      'icon'				=> 'welcome-add-page',
      'keywords'			=> array( 'Content', 'Related', 'Sponsors' ),
    ));

	// register a editorial block.
	acf_register_block_type(array(
        'name'              => 'block',
        'title'             => __('Editorial Block'),
        'description'       => __('A custom Editorial block.'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'button',
        'align'				=> 'full',
	  ));
	  
	// register a editorial block Slider FP.
	acf_register_block_type(array(
        'name'              => 'blockslider',
        'title'             => __('Editorial Block FP Slider'),
        'description'       => __('A custom Editorial block with.'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'arrow-right-alt',
        'align'				=> 'full',
	  ));

		  
	// register carrusel.
	acf_register_block_type(array(
        'name'              => 'carussel',
        'title'             => __('Carussel'),
        'description'       => __('Carussel slides.'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'button',
        'align'				=> 'full',
	  ));
	
	// register a Slider.
	acf_register_block_type(array(
        'name'              => 'Slider',
        'title'             => __('Slider Block'),
        'description'       => __('Custom Banner / Slider.'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'dashicons-button',
		'keywords'			=> array( 'Content', 'Related', 'Sponsors' ),
      ));

	// register  contact block.
	acf_register_block_type(array(
        'name'              => 'contact',
        'title'             => __('Contact Block'),
        'description'       => __('Contact'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'phone',
		'keywords'			=> array( 'Contact' ),
      ));


	// register  team block.
	acf_register_block_type(array(
        'name'              => 'team',
        'title'             => __('Team'),
        'description'       => __('Team image'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'admin-users',
		'keywords'			=> array('Team image'),
      ));

	// register  team list.
	acf_register_block_type(array(
        'name'              => 'teamlist',
        'title'             => __('Team list'),
        'description'       => __('Team persons list'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'admin-users',
		'keywords'			=> array('Team'),
      ));


	  // register  projects slider.
	acf_register_block_type(array(
        'name'              => 'projects-slider',
        'title'             => __('Projects slider'),
        'description'       => __('Projects slider'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'slides',
		'keywords'			=> array('Projects, Slider'),
      ));


        // register  events list.
	acf_register_block_type(array(
        'name'              => 'events',
        'title'             => __('Events list'),
        'description'       => __('Event list'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'formatting',
        'icon' 				=> 'calendar-alt',
		'keywords'			=> array('Events'),
      ));


    // register  events list.
	acf_register_block_type(array(
        'name'              => 'ticker',
        'title'             => __('Ticker list'),
        'description'       => __('Ticker list'),
        'render_callback'	=> 'my_acf_block_render_callback',
        'category'          => 'Banner',
        'icon' 				=> 'sticky',
		'keywords'			=> array('Ticker'),
      ));

    
    // register related content slider
    acf_register_block(array(
        'name'				=> 'noticias',
        'title'				=> __('Noticias relacionadas'),
        'description'			=> __('Noticias relacionadas'),
        'render_callback'		=> 'my_acf_block_render_callback',
        'category'			=> 'formatting',
        'icon'				=> 'media-spreadsheet',
        'keywords'			=> array( 'Content', 'Related' ),
      ));

      // Contenidos relacionados
    acf_register_block(array(
        'name'				=> 'relacionado',
        'title'				=> __('Contenidos relacionados'),
        'description'			=> __('Contenidos relacionados'),
        'render_callback'		=> 'my_acf_block_render_callback',
        'category'			=> 'formatting',
        'icon'				=> 'pressthis',
        'keywords'			=> array( 'Content', 'Relacionado' ),
      ));

    // Validacion CP
    
    acf_register_block(array(
        'name'				=> 'donaciones',
        'title'				=> __('Quiero Donar'),
        'description'			=> __('Donaciones'),
        'render_callback'		=> 'my_acf_block_render_callback',
        'category'			=> 'formatting',
        'icon'				=> 'pressthis',
        'keywords'			=> array( 'Donaciones', 'Código postal' ),
      ));

    // REDES SOCIALES
    
    acf_register_block(array(
        'name'				=> 'redes-sociales',
        'title'				=> __('Redes Sociales'),
        'description'			=> __('Archivos para descargar'),
        'render_callback'		=> 'my_acf_block_render_callback',
        'category'			=> 'formatting',
        'icon'				=> 'pressthis',
        'keywords'			=> array( 'Redes sociales', 'Social' ),
      ));
	


    
    // DESCARGAS
    
    acf_register_block(array(
        'name'				=> 'descargas',
        'title'				=> __('Descargas'),
        'description'			=> __('Archivos para descargar'),
        'render_callback'		=> 'my_acf_block_render_callback',
        'category'			=> 'formatting',
        'icon'				=> 'pressthis',
        'keywords'			=> array( 'Descargas', 'PDF' ),
      ));
	
	}

  acf_update_setting('google_api_key', 'AIzaSyDacDNyKQJywprc8azrpouCDgMonQSlbmY');
}

add_theme_support( 'wp-block-styles' );

function my_acf_block_render_callback( $block ) {
	$slug = str_replace('acf/', '', $block['name']);
	// include a template part from within the "template-parts/block" folder
	if( file_exists( get_theme_file_path("/template-parts/block/content-{$slug}.php") ) ) {
		include( get_theme_file_path("/template-parts/block/content-{$slug}.php") );
	}
}




/* ADMIN STYLES */
/**
 * Register and enqueue a custom stylesheet in the WordPress admin.
 */
function wpdocs_enqueue_custom_admin_style() {
        wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/css/admin-styles.css', false, '1.0.0' );
        wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );



/* POSTYPE CAT ARCHIVE */


add_filter( 'pre_get_posts', 'namespace_add_custom_types' );

function namespace_add_custom_types( $query ) {
  if( is_archive() && (is_category() || is_tag()) && empty( $query->query_vars['suppress_filters'] ) ) {

    $query->set( 'post_type', array(
                'post',
                'page',
				'tribe_events',
				'publicaciones',
            ));
        return $query;
    }
}
add_filter( 'pre_get_posts', 'namespace_add_custom_types' );


/* EVENTS CATEGORIES */

function wpa_categories_for_events(){
    register_taxonomy_for_object_type( 'category', 'tribe_events' );
}
add_action( 'init', 'wpa_categories_for_events' );


/* PAGE CATEGORY */

// function add_taxonomies_to_pages() {
//     register_taxonomy_for_object_type( 'post_tag', 'page' );
//     register_taxonomy_for_object_type( 'category', 'page' );
//     }
//    add_action( 'init', 'add_taxonomies_to_pages' );



// add featured thumbnail to admin post columns
function wpcs_add_thumbnail_columns( $columns ) {
    $columns = array(
        'cb' => '<input type="checkbox" />',
        'featured_thumb' => 'Thumbnail',
        'title' => 'Title',
        'author' => 'Author',
        'categories' => 'Categories',
        'tags' => 'Tags',
        'comments' => '<span class="vers"><div title="Comments" class="comment-grey-bubble"></div></span>',
        'date' => 'Date'
    );
    return $columns;
}

function wpcs_add_thumbnail_columns_data( $column, $post_id ) {
    switch ( $column ) {
    case 'featured_thumb':
        echo '<a href="' . get_edit_post_link() . '">';
        echo the_post_thumbnail( 'admin-list-thumb' );
        echo '</a>';
        break;
    }
}

if ( function_exists( 'add_theme_support' ) ) {
    add_filter( 'manage_posts_columns' , 'wpcs_add_thumbnail_columns' );
    add_action( 'manage_posts_custom_column' , 'wpcs_add_thumbnail_columns_data', 10, 2 );
    add_filter( 'manage_pages_columns' , 'wpcs_add_thumbnail_columns' );
    add_action( 'manage_pages_custom_column' , 'wpcs_add_thumbnail_columns_data', 10, 2 );
}

/* CLAS CURRENT MENU ITEM */

function add_custom_class($classes=array(), $menu_item=false) {
    if ( !is_page() && 'Blog' == $menu_item->title &&
            !in_array( 'current-menu-item', $classes ) ) {
        $classes[] = 'current-menu-item';
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_custom_class', 100, 2);


/* MENUS FOR EDITOR PROFIULE */


// Allow editors to see access the Menus page under Appearance but hide other options
// Note that users who know the correct path to the hidden options can still access them
function hide_menu() {
 	$user = wp_get_current_user();

	// Check if the current user is an Editor
	if ( in_array( 'editor', (array) $user->roles ) ) {

		// They're an editor, so grant the edit_theme_options capability if they don't have it
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			$role_object = get_role( 'editor' );
			$role_object->add_cap( 'edit_theme_options' );
		}

		// Hide the Themes page
	    remove_submenu_page( 'themes.php', 'themes.php' );

	    // Hide the Widgets page
	    remove_submenu_page( 'themes.php', 'widgets.php' );

	    // Hide the Customize page
	    remove_submenu_page( 'themes.php', 'customize.php' );

	    // Remove Customize from the Appearance submenu
	    global $submenu;
	    unset($submenu['themes.php'][6]);
	}
}

add_action('admin_menu', 'hide_menu', 10);

add_theme_support( 'experimental-custom-spacing' );
add_theme_support( 'experimental-link-color' );
add_theme_support( 'custom-units' );
add_theme_support( 'custom-units', 'rem' );
add_theme_support( 'custom-line-height' );

/* TREURE P i BR  del content */
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );


/* EXCERT FROM THE CONTEnT */

function get_excerpt($limit, $source = null){

    $excerpt = $source == "content" ? get_the_content() : get_the_excerpt();
    $excerpt = preg_replace(" (\[.*?\])",'',$excerpt);
    $excerpt = strip_shortcodes($excerpt);
    $excerpt = strip_tags($excerpt);
    $excerpt = substr($excerpt, 0, $limit);
    $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
    $excerpt = trim(preg_replace( '/\s+/', ' ', $excerpt));
    $excerpt = $excerpt.'... <a href="'.get_permalink($post->ID).'">more</a>';
    return $excerpt;
}

function custom_excerpt_length( $length ) {
	return 10;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );


/* PAGINATION NAV */

function pagination_nav() {
    global $wp_query;
    if ( $wp_query->max_num_pages > 1 ) { ?>
      <nav class="pagination" role="navigation">
          <div class="nav-next button"><?php previous_posts_link( 'Anterior' ); ?></div>
          <div class="nav-previous button"><?php next_posts_link( 'Siguiente' ); ?></div>
      </nav>
<?php }
}


/* REMOVE HTTPS */


function remove_http($url) {
    $disallowed = array('http://', 'https://');
    foreach($disallowed as $d) {
       if(strpos($url, $d) === 0) {
          return str_replace($d, '', $url);
       }
    }
    return $url;
 }


/* POST TO CRETIVITY */

function wd_admin_menu_rename() {
  global $menu; // Global to get menu array
  $menu[5][0] = 'Noticias'; // Change name of posts to Creative diary
}
add_action( 'admin_menu', 'wd_admin_menu_rename' );


/* HIDE ARCHIVE LABERL */

add_filter( 'get_the_archive_title', function ($title) {
       if ( is_category() ) {
               $title = single_cat_title( '', false );
           } elseif ( is_tag() ) {
               $title = single_tag_title( '', false );
           } elseif ( is_author() ) {
               $title = '<span class="vcard">' . get_the_author() . '</span>' ;
           } elseif ( is_tax() ) { //for custom post types
               $title = sprintf( __( '%1$s' ), single_term_title( '', false ) );
           } elseif (is_post_type_archive()) {
               $title = post_type_archive_title( '', false );
           }
       return $title;
   });


/* EXCLUD FROM ARXIVER */

function my_custom_get_posts( $query ) {
    if ( is_admin() || ! $query->is_main_query() )
        return;

    if ( $query->is_archive() ) {
        $query->set( 'post__not_in', array( 1808 ) );
    }
}
add_action( 'pre_get_posts', 'my_custom_get_posts', 1 );


/* SHARE */

function jptweak_remove_share() {
    remove_filter( 'the_content', 'sharing_display', 19 );
    remove_filter( 'the_excerpt', 'sharing_display', 19 );
    if ( class_exists( 'Jetpack_Likes' ) ) {
        remove_filter( 'the_content', array( Jetpack_Likes::init(), 'post_likes' ), 30, 1 );
    }
}
add_action( 'loop_start', 'jptweak_remove_share' );


/* SEARCH */


function html5_search_form( $form ) { 
	$form = '<form role="search" method="get" id="search-form" action="' . home_url( '/' ) . '" >
        <label for="search" class="hide">Buscar</label>
	    <input type="search" value="' . get_search_query() . '" name="s" id="search" placeholder="Buscar" />
        <button type="submit" id="searchsubmit"><img src="'. get_template_directory_uri() .'/img/ico-lupa.svg" width="24px" height="24px" alt="Buscar" /></button>
	</form>';
	return $form;
}

add_filter( 'get_search_form', 'html5_search_form' );

/* IMAGES LIGHTBOX */

// add_action( 'wp_enqueue_scripts', function () { wp_enqueue_script( 'baguettebox' ); wp_enqueue_style( 'baguettebox-css' ); } );

// function wpb_autolink_featured_images( $html, $post_id, $post_image_id ) {
    
//     $html = '<a href="' . get_the_post_thumbnail_url(($post_id),'full') . '" class="wp-block-kadence-advancedgallery" title="' . esc_attr( get_the_title( $post_id ) ) . '">' . $html . '</a>';
//     return $html;
//     }
//     add_filter( 'post_thumbnail_html', 'wpb_autolink_featured_images', 10, 3 );

/* DISPLAY PAGE TEMPLATE IN COSOLE LOG */

function show_template() {
	global $template;
    $output = "<script>console.log('TEMPLATE in USE:". $template ."');</script>";
    echo $output;
}
add_action('wp_footer', 'show_template');