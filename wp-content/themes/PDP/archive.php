<?php get_header(); ?>

<div class="container">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<br />
			<p class="previous"><a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>">< <?php _e('More News','PDP');?></a></p>
			<br />
			<header class="page-header">
				<h2 class="page-title"><?php the_archive_title();?></h2>
			</header>

			<div class="content grid">
		 	<?php if ( have_posts() ) : while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content', 'excerpt' );
				endwhile;
				else :
				get_template_part( 'template-parts/content', 'none' );
				endif;
			?>
			</div>
			<!-- end content -->
	</main><?php if ( is_active_sidebar( 'widgets-footer' ) ) : ?>
<aside id="twitter-widget-area" class="twitter-area" role="complementary">
	<?php dynamic_sidebar( 'widgets-twitter' ); ?>
</aside>
<?php endif; ?><!-- end main -->
	</div><!-- end primary -->

</div><!-- end container -->
<?php get_template_part( 'footer', 'contact' ); ?>
<?php get_footer(); ?>