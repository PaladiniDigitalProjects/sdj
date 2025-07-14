<footer id="colophon" class="site-footer">
	<?php if ( is_active_sidebar( 'widgets-newsletter' ) ) : ?>
		<div class="content-area alignwide">
			<section id="footer-newsletter" class="content-newsletter-area" role="complementary">
				<?php dynamic_sidebar( 'widgets-newsletter' ); ?>
			</section>
		</div>
	<?php endif; ?>
	
	<?php if ( is_active_sidebar( 'widgets-lacasadetodos' ) ) : ?>
		<div class="content-area">
			<section id="footer-widget-area" class="widget-area widget-area" role="complementary">
				<?php dynamic_sidebar( 'widgets-lacasadetodos' ); ?>
			</section>
		</div>
	<?php endif; ?>
	
		<?php if ( is_active_sidebar( 'widgets-footer' ) ) : ?>
			<div class="content-area alignwide">
				<section id="footer-widget-area" class="widget-area widget-area" role="complementary">
					<?php dynamic_sidebar( 'widgets-footer' ); ?>
				</section>
			</div>º
		<?php endif; ?>
	</div>
</div>
	<!-- end content area-->
</footer><!-- #colophon -->
<?php edit_post_link( __( 'Editar', 'PDP' ), '<div class="editar-entrada">', '</div>' );?>
<?php wp_footer(); ?>
</html>