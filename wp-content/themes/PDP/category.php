<?php get_header(); ?>
<main id="main" class="site-main <?php echo basename(get_permalink()); ?>" role="main">
	<header class="section-header">
		<h2 class="section-title">#<?php single_term_title(); ?></h2>
		<?php if (get_the_archive_description()) : ?>
			<div class="taxonomy-description"><?php echo the_archive_description(); ?></div>
		<?php endif; ?>
	</header>
	<nav class="category-nav">
		<button class="btn dropdown-btn has-primario-color"><?php _e('Más categorias', 'PDP'); ?></button>
		<?php

			$category = get_queried_object();
			$cat_args = array(  
				'hide_empty'=> true,    
				'exclude' => array($category->term_id, 1, 365),
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
	
	<?php if ( have_posts() ) : ?>
	<div id="entry-list" class="entry-list">
		<?php echo do_shortcode('[ajax_load_more id="7350557918" category__not_in="365" post_type="post" category="'. $category->name .'" posts_per_page="6" scroll="false" button_label="Cargar más..." button_loading_label="Cargando..."]'); ?>
	</div>
	<!-- end entry-list -->
	<?php endif; ?>
	<?php get_footer(); ?>
</main><?php if ( is_active_sidebar( 'widgets-footer' ) ) : ?>
<aside id="twitter-widget-area" class="twitter-area" role="complementary">
	<?php dynamic_sidebar( 'widgets-twitter' ); ?>
</aside>
<?php endif; ?><!-- #main -->

<script>
/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}
</script>