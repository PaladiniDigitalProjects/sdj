<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	<article itemscope itemtype="http://schema.org/Article" id="post-<?php the_ID(); ?>" class="article">
		<picture class="thumb">
			<a href="<?php echo get_permalink(); ?>">
				<?php the_post_thumbnail(); ?>
			</a>
		</picture>
		<a href="<?php echo get_permalink(); ?>">
			<div class="txt obra-info">
				<h1 class="article-title"><?php the_title(); ?></h1>
				<p><?php the_content(); ?></p>
				<p><?php echo the_field('obra_tecnica'); ?> </p>
				<p><?php echo the_field('obra_medida'); ?> </p>
			</div>
		</a>
	</article>
<?php endwhile; // end of the loop.
