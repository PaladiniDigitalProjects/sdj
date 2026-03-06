<?php /* Template Name: mapa */
get_header(); 
?>
<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
	
		<article class="entry mapa">
			<header class="entry-header">
				<a href="<?php echo get_home_url(); ?>/centros/listado-de-centros/" class="entry-antetitle back next"><?php _e('Listado de centros', 'PDP'); ?></a>
				<h1 class="entry-title"><?php the_title();?></h1>
			</header>
			<div class="entry-content">
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>