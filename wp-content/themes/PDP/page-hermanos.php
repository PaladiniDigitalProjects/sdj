<?php
/* Template Name: Ser Hermano */

get_header();
?>

<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
			<?php
			$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "size" ); 
			$iframe = get_field('video_url');
			?>
			<?php if($thumbnail): ?>
				<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
			<?php endif; ?>
			<?php if($iframe):?>
				<?php
				// Use preg_match to find iframe src.
				preg_match('/src="(.+?)"/', $iframe, $matches);
				$src = $matches[1];
				
				// Add extra parameters to src and replace HTML.
				$params = array(
					'controls'  => 0,
					'hd'        => 1,
					'autohide'  => 1
				);
				$new_src = add_query_arg($params, $src);
				$iframe = str_replace($src, $new_src, $iframe);
				
				$attributes = 'frameborder="0"';
				$iframe = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $iframe);
				?>

				<div class="embed-container">
					<?php echo $iframe; ?>
				</div>

				<style>
					.embed-container { 
						position: relative; 
						padding-bottom: 56.25%;
						overflow: hidden;
						max-width: 100%;
						height: auto;
					} 

					.embed-container iframe,
					.embed-container object,
					.embed-container embed { 
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				</style>
			<?php endif; ?>

			<header class="entry-header">
			<nav class="page-nav">
			<?php
				$my_current_lang = apply_filters( 'wpml_current_language', NULL );
				if ($my_current_lang == 'es') {
					$page = 10195;
				} elseif ($my_current_lang == 'ca') {
					$page = 19406;
				}
					
					$children = wp_list_pages(array(
						'child_of' => $page,
						'echo' => '0',
						'title_li' => '',
						'exclude' => '14859,14884',
					));
					?>
					<span><?php _e('En esta sección','PDP'); ?></span>
					<?php
					if ($children) { ?>
						<ul class='menu-nav'>
							<li class="page_item"><a href="<?php echo get_permalink($page); ?>"><?php echo get_the_title($page); ?></a></li>
							<?php echo ($children);?>
						</ul>
					<?php } ?>
			</nav>

			<h1 class="entry-title"><?php the_title();?></h1>				
			</header>

			<div class="entry-content">
				<?php the_content();?>
			</div>
			
		</article>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>