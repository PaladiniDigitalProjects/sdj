<?php get_header(); ?>
	<main id="main" class="site-main nutrities" role="main">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<article class="nutrities-single">
				<div class="entry-content">
					<?php the_content(); ?>
				</div>
				<?php endwhile; else: ?>
					<p>Sorry, no posts matched your criteria.</p>
			</article>
		<?php endif; ?>
	</main>
<?php get_footer(); ?>