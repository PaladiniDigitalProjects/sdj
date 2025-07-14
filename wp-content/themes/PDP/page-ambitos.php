<?php
/* Template Name: Ámbitos */

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
				<?php
					if ($post->post_parent) {
						$page = $post->post_parent;
					} else {
						$page = $post->ID;
					}
					$children = wp_list_pages(array(
						'child_of' => $page,
						'echo' => '0',
						'title_li' => ''
					));

					?>
					<span><?php _e('En esta sección','PDP'); ?></span>
					<?php
					if ($children) {
						echo "<ul class='menu-nav'>\n".$children."</ul>\n";
					} 
				?>
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
