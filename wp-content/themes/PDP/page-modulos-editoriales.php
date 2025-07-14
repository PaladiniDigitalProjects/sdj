<?php get_header(); ?>
<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry modulos-edioriales">
			<header class="entry-header">
				<h1 class="entry-title"><?php the_title();?></h1>
			</header>
			<div class="entry-content">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>