<?php
/* Template Name: Listado voluntariado */

get_header();
?>

<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "size" ); ?>
			<?php if($thumbnail): ?>
				<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
			<?php endif; ?>
			<header class="entry-header">
			<nav class="page-nav">
				<span><?php _e('Enlaces directos','PDP'); ?></span>
				<ul class='menu-nav'>
				<li><a href="#madrid"><?php _e('Madrid', 'PDP'); ?></a></li>
				<li><a href="#catalunya"><?php _e('Cataluña', 'PDP'); ?></a></li>
				</ul>
			</nav>
			<br />
			<h1 class="entry-title"><?php the_title();?></h1>				
			</header>

			<div class="entry-content">
				<?php the_content();?>
			</div>
			
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>
