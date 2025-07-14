<?php get_header(); ?>
	<main id="main" class="site-main" role="main">
		<article class="detall-obra">
		<?php
			while ( have_posts() ) : the_post(); ?>

					<picture class="thumb">
						<?php echo get_the_post_thumbnail( $post_id, 'post_thumbnail', array( 'class' => 'img-responsive' ) ); ?>
					</picture>
					<div class="txt">
						<header>
							<!-- <span><?php
							    foreach((get_the_category()) as $category){
							        echo $category->name.", ";
							        }
							    ?></span> -->
							<h1 class="entry-title"><?php the_title(); ?></h1>
						</header>
					<div class="info-obra">
					<?php if( !empty(the_content()) ): ?>
						<?php the_content(); ?>
					<?php endif; ?>

					<?php $tecnica = get_field('obra_tecnica');
						if( !empty($tecnica) ): ?>
							<p><?php the_field('obra_any'); ?><br>
							<?php the_field('obra_mida'); ?><br>
							<?php the_field('obra_tecnica'); ?></p>
						<?php endif; ?>
						</div>
					</div>
					<!-- end txt -->

				<?php endwhile; ?>
			</article>
			

		</main>
	<?php get_footer(); ?>
