<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<title><?php bloginfo( 'name' );?> · <?php bloginfo('description'); ?></title>
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<?php wp_head(); ?>
	<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="3a28165c-8ecc-4b8c-874e-c2fdb7b0624b" data-blockingmode="auto" type="text/javascript"></script>
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S65SCT3ECC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S65SCT3ECC');
</script>

<body <?php body_class(); ?>>
	<php header("Cache-Control: no-cache"); ?>
	<header class="header site-header" id="header">
		<div class="header-content">
			<div class="header-top">
				<div class="site-branding">
					
				<?php if ( is_home() || is_front_page() ) : ?>
						<h1 class="site-title logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' );?> | <?php bloginfo('description'); ?>"><span><?php bloginfo( 'name' );?>, <?php bloginfo('description'); ?></span></a></h1>
					<?php else: ?>
						<div class="site-title logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' );?> | <?php bloginfo('description'); ?>"><span><?php bloginfo( 'name' );?>, <?php bloginfo('description'); ?></span></a></div>
					<?php endif; ?>

					<?php
						$custom_logo_id = get_theme_mod( 'custom_logo' );
						$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
						$custom_w = get_theme_mod('m1_logo' );
						$image_cat = "https://sjd.es/wp-content/uploads/2023/01/LOGO_SJD_CAT.svg";
					?>

					<style type="text/css">
						.site-header .logo,
						body.black .site-header.headroom--pinned .logo,
						body.black .site-header.active .logo {
							background: url('<?php echo $image[0];?>') center no-repeat;
							background-size: 100% 100%;
						}

						html:lang(ca) .site-header .logo,
						html:lang(ca) body.black .site-header.headroom--pinned .logo,
						html:lang(ca) body.black .site-header.active .logo {
							background: url('<?php echo $image_cat;?>') center no-repeat;
							background-size: 100% 100%;
						}


						body.black .site-header.active .logo {
							background: url('<?php echo $image[0];?>') center no-repeat !important;
							background-size: 100% 100% !important;
						}

						html:lang(ca) body.black .site-header.active .logo {
							background: url('<?php echo $image_cat;?>') center no-repeat;
							background-size: 100% 100%;
						}

						body.black .site-header .logo,
						body.black .site-header.headroom--top .logo {
							background: url('<?php echo $custom_w;?>') center no-repeat;
							background-size: 100% 100%;
						}

						html:lang(ca) body.black .site-header .logo,
						html:lang(ca) body.black .site-header.headroom--top .logo {
							background: url('<?php echo $image_cat;?>') center no-repeat;
							background-size: 100% 100%;
						}

						html:lang(ca) .logo-footer-es{
							display:none !important
						}

						html:lang(es-ES) .logo-footer-ca{
							display:none !important
						}

					</style>
				</div><!-- .site-branding -->
				<div id="burguer" class="burguer">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<!-- end burguer -->
				<div class="search-lenguage">
					<!-- <div class="lenguage"> -->
						<?php //echo do_shortcode('[wpml_language_switcher flags=0 native=1 translated=0]');?>
					<!-- </div> -->
				<style>
				.tooltip {
					position: relative;
					display: inline-block;
				}
				
				.tooltip .tooltiptext {
					visibility: hidden;
					width: 120px;
					background-color: #00a0df;
					color: #fff;
					text-align: center;
					border-radius: 3px;
					padding: 5px 0;
					position: absolute;
					z-index: 1;
					top: 125%;
					left: 50%;
					margin-left: -60px;
					opacity: 0;
					transition: opacity 0.5s;
				}
				
				/* .tooltip .tooltiptext::after {
					content: "";
					position: absolute;
					bottom: calc(100% + 5px);
					left: 50%;
					margin-right: -5px;
					border-width: 5px;
					border-style: solid;
					border-color: #00a0df transparent transparent transparent;
				} */
				
				.tooltip:hover .tooltiptext {
					visibility: visible;
					opacity: 1;
				}
				</style>
				<div class="lenguage">
					<?php echo do_shortcode('[wpml_language_switcher flags=0 native=1 translated=0]');?>
				</div>
				<div class="search-nav">
					<?php get_search_form();?>
				</div>
				<!-- end login search nav -->
			</div>
			<!-- end search lenguage -->
			
			<?php
			$my_current_lang = apply_filters( 'wpml_current_language', NULL );
			if ($my_current_lang == 'es') {
				$catIDS = 34; 
			} elseif ($my_current_lang == 'ca') {
				$catIDS = 394;
			}
			$CatArgs = array('child_of' => $catIDS); if($CatArgs):?>
			<div class="menu-categorias">
				<dl>
					<dt><strong><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>"><?php _e('Actualidad:', 'PDP'); ?></a></strong></dt>
					<?php
						$CatArgsHome = get_categories( $CatArgs );
						foreach($CatArgsHome as $CatAH) { 
							echo '<dd><a href="' . get_category_link( $CatAH->term_id ) . '" title="' . sprintf( __( "View all posts in %s" ), $CatAH->name ) . '" ' . '>#' . $CatAH->name.'</a></dd>';
						}
					?>
				</dl>
				</div>
			<?php endif; ?>
			</div>
			<!-- end header-top -->
			<?php
			$menu = wp_nav_menu( array(
				'menu'              => 'primary',
				'theme_location'    => 'primary',
				'container' => 'div', 
				'items_wrap' => '<nav id="%1$s" class="%2$s"><ul class="menu-list">%3$s</ul></nav>', // replacing the ul with nav
				'walker' => new Description_Walker,
				'menu_class' => "menu-nav",
				'item_spacing' => 'discard',
			));
			?>
			<!-- end menu nav -->

			<hr/>
			<?php
			$menu = wp_nav_menu( array(
				'menu'              => 'tertiary',
				'theme_location'    => 'tertiary',
				'container' => 'div', 
				'items_wrap' => '<nav id="%1$s" class="%2$s"><ul class="menu-list">%3$s</ul></nav>', 
				'walker' => new Description_Walker,
				'menu_class' => "menu-contact",
				'item_spacing' => 'discard',
			));
			?>
		<!-- end menu contact -->
		</div>
		<!-- end header content -->
	</header><!-- #masthead -->
	
	<script>

	$( "a.wpml-ls-link" ).click(function( event ) {
		event.preventDefault();
	});

	var menuon = document.getElementsByClassName("menu-item-has-children");
	var a;

	for (a = 0; a < menuon.length; a++) {
		menuon[a].addEventListener("mouseenter", function() {
		this.classList.toggle("open");
		});

		menuon[a].addEventListener("mouseleave", function() {
		this.classList.toggle("open");
		});
	}
</script>