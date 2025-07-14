<?php
/* Template Name: La Casa de Todos */

get_header('lacasadetodos');
?>

<main id="main" class="site-main la-casa-de-todos" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<header class="entry-header alignwide" style="display:none;">
				<h1 class="entry-title"><?php the_title();?></h1>
			</header>
			<div class="entry-content">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer('lacasadetodos'); ?>
</main>
