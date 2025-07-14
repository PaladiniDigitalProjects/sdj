<?php 

/* Template Name: Attención Intermedia */

get_header(); ?>
<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<div class="entry-image attheader" id="AttHeader">
				<div class="alignwide">
					<a href="<?php echo esc_url( get_permalink(28470) ); ?>" class="logito"><img src="https://sjd.es/wp-content/uploads/2024/02/ico-sjd.webp" /></a>
					<h1 class="entry-title " style="color:#ffffff"><?php _e('Atención intermedia', 'PDP');?></h1>
				</div>
			</div>
			<div class="entry-content">
			<header class="entry-header hide">
				<h2 class="entry-title hide"><?php the_title();?></h2>
			</header>
				<?php the_content();?>
			</div>
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>

<script type="text/javascript">
window.onscroll = function() {myFunction()};
var header = document.getElementById("AttHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

</script>