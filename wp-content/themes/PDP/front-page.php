<?php get_header(); 
/* Template Name: Pagina inici */
?>
<main class="home" role="main">
	<div class="page-content">
		<?php while ( have_posts() ) : the_post(); ?>
			<?php the_content(); ?>
		<?php endwhile; ?>
	</div><!-- end page content -->
	<?php get_footer(); ?>
</main><!-- #main -->

