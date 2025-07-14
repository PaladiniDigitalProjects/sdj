<footer id="colophon" class="site-footer">
	<?php if ( is_active_sidebar( 'widgets-newsletter' ) ) : ?>
		<section id="footer-newsletter" class="content-newsletter-area" role="complementary">
			<?php dynamic_sidebar( 'widgets-newsletter' ); ?>
		</section>
	<?php endif; ?>

	<div class="content-area alignwide">
	<?php if ( is_active_sidebar( 'widgets-footer' ) ) : ?>
		<section id="footer-widget-area" class="chw-widget-area widget-area" role="complementary">
			<?php dynamic_sidebar( 'widgets-footer' ); ?>
		</section>
	<?php endif; ?>
	<p style="color:#ffffff; font-size:14px; display:block; padding:0 0 2rem 0; margin-bottom:0;">© Orden Hospitaliaria de San Juan de Dios</p>	
</div>
</footer><!-- #colophon -->
<?php edit_post_link( __( 'Editar', 'PDP' ), '<div class="editar-entrada">', '</div>' );?>
<?php wp_footer(); ?>
</html>