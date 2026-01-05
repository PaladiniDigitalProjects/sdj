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
	<meta name="facebook-domain-verification" content="eshqc68n6x0i333yhsoaekronm0kdn" />
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
	<header class="header site-header" id="header">
		<div class="header-content">
			<div class="header-top">
				<div class="site-branding">
					
				<?php if ( is_home() || is_front_page() ) : ?>
						<h1 class="site-title logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' );?> | <?php bloginfo('description'); ?>"><span><?php bloginfo( 'name' );?>, <?php bloginfo('description'); ?></span></a></h1>
						<?php if ( 'lacasadetodos' == get_post_type() ): ?><br /><?php endif; ?>
					<?php else: ?>
						<div class="site-title logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' );?> | <?php bloginfo('description'); ?>"><span><?php bloginfo( 'name' );?>, <?php bloginfo('description'); ?></span></a></div>
						<?php if ( 'lacasadetodos' == get_post_type() ): ?><br /><?php endif; ?>
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
				
				
				.tooltip:hover .tooltiptext {
					visibility: visible;
					opacity: 1;
				}
				</style>
				<div class="lenguage">
					<?php if ( 'lacasadetodos' == get_post_type() ): ?><br /><?php endif; ?>
					<?php echo do_shortcode('[wpml_language_switcher flags=0 native=1 translated=0]');?>
				</div>
				<div class="search-nav">
					<?php get_search_form();?>
				</div>
				<!-- end login search nav -->
			</div>
			<!-- end search lenguage -->
			</div>
			<!-- end header-top -->
			<?php if ( 'lacasadetodos' == get_post_type() ): ?>
				<div class="menu-menu-nav-container" style="display:block; padding-top: 0;"><nav id="menu-menu-nav" style="display:block; background-color:#007FAD;" class="menu-nav align-left"><a href="https://sjd.es/la-casa-de-todos/" style="color:white;font-size:2rem;line-height:150%;padding: 1rem;display: block;"><?php _e('< La Casa de Todos', 'PDP'); ?></a></nav></div>
			<?php else: ?>
			<br />
			<?php endif;?>
			
		</div>
		<!-- end header content -->
	</header><!-- #masthead -->
	
	<script>

	$( ".wpml-ls-item-eu a.wpml-ls-link" ).click(function( event ) {
		event.preventDefault();
	});

	$( ".wpml-ls-item-gl a.wpml-ls-link" ).click(function( event ) {
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