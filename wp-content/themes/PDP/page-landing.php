<?php /* Template Name: Landing Page */
get_header(); ?>
<main id="main" class="site-main landing-page" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<header class="entry-header hide">
				<h1 class="entry-title"><?php the_title();?></h1>
			</header>
			<div class="entry-content">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>