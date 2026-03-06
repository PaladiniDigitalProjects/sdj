<?php get_header('lacasadetodos'); ?>
<main id="main" class="site-main la-casa-de-todos" role="main">
	<article class="entry entry-single">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<header class="entry-header">
		<ul class="category-list"><?php
		foreach((get_the_category()) as $category){
			if($category->name !== 'No listas'){
				echo '<li class="entry-categories"><a href="'. esc_url( get_category_link( $category->term_id )) .'">#'.$category->name."</a></li>";
			}
		} ?>
		</ul>
		<!-- end entry section -->
			<h1 class="entry-title"><?php the_title(); ?></h1>
		</header>
	
		<?php if ( has_post_thumbnail()) : ?>
			
			<?php the_post_thumbnail(); ?>

		<?php endif; ?>
	
		<div class="entry-content">
			<span style="font-size:18px; margin:0 1rem 1rem 1rem; display:block;"><?php the_date();?></span>
			<?php the_content(); ?>
		</div>
		
		<?php endwhile; else: ?>
			<p><?php _e('Lo sentimos, contenido no disponible', 'PDP');?></p>
		<?php endif; ?>
	</div>
	</article>
	<?php get_footer('lacasadetodos'); ?>
</main>