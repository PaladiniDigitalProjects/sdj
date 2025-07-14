<?php
/* Template Name: Notas prensa */

get_header();
?>

<main id="main" class="site-main" role="main">
	<?php while ( have_posts() ) : the_post(); ?>
		<section class="entry">
			<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "size" ); ?>
			<?php if($thumbnail): ?>
				<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
			<?php endif; ?>
			<header class="entry-header alignwide">
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

			<div class="entry-content notas-prensa alignwide">
				<!-- query -->
				<?php
					$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;    
					$query = new WP_Query( array(
						'post_type' => 'notas-prensa',
						'posts_per_page' => 6,
						'paged' => $paged,
					) );
				?>

				<?php if ( $query->have_posts() ) : ?>
				
				<div class="entry-list">
				
				<?php while ( $query->have_posts() ) : $query->the_post(); ?>
				<?php
				$pdfnota = get_field('pdf-nota');
				$pdfdosier = get_field('pdf-dossier');
				$recursonota = get_field('recurso-nota');
				$recursoinfografia = get_field('recurso-infografia');
				$videonota = get_field('video-nota');				
				?>
				<article class="entry">
				<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $query->ID ), "size" ); ?>
				<?php if($thumbnail): ?>
					<div class="entry-image" style="background: url('<?php echo ($thumbnail[0]); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div>
					<?php endif; ?>
					<div class="entry-content<?php if($thumbnail == false): ?> no-image<?php endif; ?>">
						<span class="data"><?php echo get_the_date(); ?></span>		
						<h3 class="entry-title"><?php the_title(); ?></h3>
						<div class="content"><?php echo the_content(); ?></div>
					</div>
					<!-- end entry-content -->
					<?php if ($pdfnota or $recursonota or $videonota == true): ?>
					<ul class="entry-footer">
						<?php if($pdfnota): ?><li><a href="<?php echo($pdfnota); ?>" target="_blank"><?php _e('Nota de prensa [PDF]','PDP'); ?></a></li><?php endif;?>
						<?php if($pdfdosier): ?><li><a href="<?php echo($pdfdosier); ?>" target="_blank"><?php _e('Dossier de prensa [PDF]','PDP'); ?></a></li><?php endif;?>
						<?php if ($videonota): ?><li><a href="<?php echo($videonota); ?>" target="_blank"><?php _e('Video [Link]','PDP'); ?></a></li><?php endif;?>
						<?php if ($recursoinfografia): ?><li><a href="<?php echo($recursoinfografia); ?>" target="_blank"><?php _e('Infografía [Link]','PDP'); ?></a></li><?php endif;?>
						<?php if($recursonota): ?>
						<li class="recursos-graficos"><a class="more" href="#"><?php _e('Recursos gráficos [JPG]','PDP'); ?></a>
							<figure class="block-gallery hide">
								<ul class="blocks-gallery-grid">
									<?php foreach( $recursonota as $image ) : ?>
										<li class="blocks-gallery-item">
											<a download="<?php echo $image['alt']; ?>" href="<?php echo $image['url']; ?>" title="<?php echo $image['title']; ?>" rel="gallery">
												<img src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" />
											</a>
										</li>
									<?php endforeach; ?>
								</ul><!-- / .gallery-grid -->
							</figure>
							<?php else : ?>
						</li>
						<?php endif; ?>
					</ul>
				<?php endif;?>
				</article>
				<!-- item post -->
				<?php endwhile; ?>
				<!-- end loop -->
				
				</div>
				<!-- end entry-list -->
				<script>
				jQuery(document).ready(function($) {
					$( ".more" ).click(function(event) { 
						event.preventDefault();
						$(this).next('.block-gallery').toggleClass('hide');
						$(this).toggleClass('open')
					});               
				});
				</script>


				<nav class="pagination">
				<?php $big = 999999999; // need an unlikely integer
					echo paginate_links( array(
						'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
						'format' => '?paged=%#%',
						'current' => max( 1, get_query_var('paged') ),
						'total' => $query->max_num_pages
					) );
				?>
				</nav>  
			<?php wp_reset_postdata(); ?>
			<?php else : ?>
				<p><?php _e( 'Lo sentimos, no hay entradas que coincidan.','PDP' ); ?></p>
			<?php endif; ?>
		</div>
		<!-- end entry-cpntent -->
		</section>
	<?php endwhile; ?>
	<?php get_footer(); ?>
</main>