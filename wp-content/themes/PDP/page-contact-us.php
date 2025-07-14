<?php get_header(); ?>
	<main class="container" role="main">
		<div id="primary" class="content-area contact">
			<article class="entry">
				<div class="entry-container">
					<div class="entry-content">
						<?php while ( have_posts() ) : the_post(); ?>
							<?php the_content(); ?>
						<?php endwhile; ?>
					</div>
					<!-- end entry content -->
				</div>
				<!-- end entry container -->
			</article>
		</div><!-- end page content -->
	</main>
<?php get_footer(); ?>