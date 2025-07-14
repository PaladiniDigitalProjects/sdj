<?php
/* Template Name: Contact */
get_header();
?>

	<script type="text/javascript">
		  $('body').removeClass('black');
			$('body').addClass('contact-page');
	</script>

	<main id="main" class="site-main" role="main">
	<?php	while ( have_posts() ) : the_post(); ?>
		<header class="page-header">
			<h1 class="page-title"><?php the_title();?></h1>
		</header>
		<article class="entry entry-about">

		<?php
			if ( is_active_sidebar( 'contat-form' ) ) {
				if ( ! is_active_sidebar( 'contat-form' ) ) {
					return;
				}
			 dynamic_sidebar( 'contat-form' );
			} ?>

				<div class="entry-content">
					<div class="entry-text">
						<?php $page_subtitle = get_field('page-subtitle');
						if ($page_subtitle): ?>
							<?php echo($page_subtitle);?>
						<?php endif; ?>
						<?php do_shortcode('[editorial-content]'); ?>
					</div>
					<br />
					<br />
					<p  class="site-description">
						<?php echo get_theme_mod( "mytheme_company-name" ); ?>
					</p>
					<br />
					<br />
				</div>

		</article>
	<?php endwhile; ?>
</main>
<?php get_footer(); ?>
