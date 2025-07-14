<?php
/*
Template Name: 404
*/

get_header(); ?>

<main id="main" class="site-main page" role="main">
	<div class="entry-list search">
	<article class="entry">
			<header class="entry-header alignwide">
				<h1 class="entry-title">404</h1>				
			</header>
			<div class="entry-content alignwide">
				<h4><?php _e( '¡Ay! Algo ha fallado... parece que no se encontró nada en esta ubicación', 'PDP' ); ?></h4>
				<br />
				<p><?php _e( 'Pruebe seleccionando una categoría', 'PDP' ); ?></p>	
				<nav class="category-nav">
				<?php
					$category = get_queried_object();
					$cat_args = array(  
						'hide_empty' => true, 
						'exclude' => array( 1, 365),
					);

					$categories = get_categories($cat_args);
					if($categories): ?>
					<ul class="dropdown-container category-list">
					<?php foreach($categories as $categori) {
					echo '<li class="entry-categories"><a href="' . get_category_link($categori->term_id) . '">#' . $categori->name . '</a></li>';
					}
					endif; ?>
					</ul>
				</nav>
			</div>
		</article>
	<br />
	<br />
	<br />
	<br />
	</div>
	<?php get_footer(); ?>
</main>