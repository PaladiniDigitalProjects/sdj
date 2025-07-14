<?php $proyectos_relacionados = get_field( 'related_content' ); ?>
<?php if ( $proyectos_relacionados ): ?>
<section class="related-content">
	<header class="section-header">
		<h2 class="section-title"><?php _e('Related content', '_PDP'); ?></h2>
	</header>
	<div class="article-list">
		<?php foreach ( $proyectos_relacionados as $post ):  ?>
				<?php get_template_part('template-parts/article'); ?>
		<?php endforeach; ?>
	</div>
<?php wp_reset_postdata(); ?>
</section>
<?php endif; ?>
