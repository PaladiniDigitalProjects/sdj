<?php get_header(); ?>
<main id="main" class="site-main page" role="main">
	<section class="section">
		<header class="section-header">
			<?php if ( have_posts() ) : ?>
				<br />
				<h3 class="has-primario-color has-text-color"><?php printf( __( 'Resultados de búsqueda para: %s', 'PDP' ), '<span>"' . get_search_query() . '"</span>' ); ?></h3>
				<br />
			<?php else : ?>
				<h2 class="section-title"><?php _e('Búsqueda', 'PDP'); ?></h2>
				<h4 class="has-primario-color has-text-color"><?php _e( 'Vaya... no se ha encontrado nada', 'PDP' ); ?></h4>
				<br />
			<?php endif; ?>
		</header>
		<?php if ( have_posts() ) : ?>
		<div id="entry-list" class="entry-list">
			<?php echo do_shortcode('[ajax_load_more post_type="post, page, tribe_events, location" posts_per_page="10" search="'. $_GET['s'] .'" orderby="relevance" scroll="false" button_label="Cargas más..."]'); ?>
		</div>
		<?php else : ?>
		<div id="entry-list" class="entry-list">	
			<p class="resum"><?php _e( 'Lo sentimos, pero nada coincide con los términos de búsqueda. Vuelva a intentarlo con algunas palabras clave diferentes.', 'PDP' ); ?></p>
			<div class="search-nav">
				<?php get_search_form(); ?>
			</div>
			<br />
			<br />
			<p class="resum"><?php _e( 'Tambien puede buscar por categorias:', 'PDP' ); ?></p>
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
		
		<?php endif; ?>
		</section>
	<br />
	<br />
	<br />
	<?php get_footer(); ?>
</main>