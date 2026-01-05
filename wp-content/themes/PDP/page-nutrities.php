<?php /* Template Name: Nutrities */
get_header(); ?>
<main id="main" class="site-main nutrities" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<div class="entry-content">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>