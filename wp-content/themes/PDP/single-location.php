<?php get_header(); ?>
	<main id="main" class="site-main" role="main">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<?php $provincia = get_the_terms( $post->ID , 'provincia'); ?>
			<article class="entry entry-single single-location">
				<div class="entry-content">
					<?php
						$localidad = get_the_terms( $post->ID , 'localidad');
						$comunidad = get_the_terms( $post->ID , 'comunidad_autonoma');
						$ambito = get_the_terms( $post->ID , 'ambito');
						$direccion = get_field('ce_direccion');
						$telefono = get_field('ce_telefono');
						$email = get_field('ce_email');
						$web = get_field('ce_web');
						$googlemaps = get_field('ce_google_maps');
						?>
					<header class="entry-header">
						<?php if ( has_post_thumbnail()) : ?>
							<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); ?>
							<figure class="entry-image">
								<img class="img-responsive" src="<?php echo ($featured_img_url); ?>" />
							</figure>
						<?php endif; ?>
						<a href="<?php echo get_home_url(); ?>/centros/mapa-de-centros-sjd/" class="entry-antetitle back"><?php _e('Mapa de centros', 'PDP'); ?></a>
						<h1 class="entry-title"><?php the_title(); ?></h1>
						<?php if($localidad or $comunidad ):?>
							<h4><?php if($comunidad):?><?php foreach ($comunidad as $ci):?><?php echo $ci->name;?><?php endforeach; ?><?php endif;?><?php if($localidad):?><?php foreach ($localidad as $c):?><?php if($localidad and $comunidad): ?><span>, </span><?php endif;?><?php echo $c->name;?><?php endforeach;?><?php endif;?></h4>
							<br />
						<?php endif;?>
					</header>
					<div class="post-content">
						<div class="entry-paragraph">
						<div class="entry-info">
							<?php if ($direccion or $googlemaps) : ?>
								<h5><?php _e('Dirección y datos de interés:','PDP'); ?></h5>
								<br />
								<p><?php echo($direccion);?></p>
							<?php endif; ?>
							<?php if ($telefono or $web or $email) : ?>
								<h5><?php _e('Contactar con este centro:','PDP'); ?></h5>
								<br />
								<br />
							<?php endif; ?>
							<p>
							<?php if($telefono): ?>
								<strong><?php _e('Teléfono:','PDP');?></strong> <a href="tel:<?php echo($telefono);?>"><?php echo($telefono);?></a><br />
							<?php endif; ?>
							<?php if($web): ?>
								<strong><?php _e('Website:','PDP');?></strong> <a href="<?php echo($web);?>" target="_blank"><?php echo remove_http($web);?></a><br />
							<?php endif; ?>
							<?php if($email): ?>
								<strong><?php _e('Email:','PDP');?></strong> <?php echo($email);?><br />
							<?php endif; ?>
							</p>
				
							<?php if($googlemaps): ?>
								<br /><br />
								<a class="button button-outline" href="<?php echo($googlemaps);?>" target="_blank"><?php _e('Ver en Google maps','PDP');?></a>
								<br />
								<br />
							<?php endif; ?>
							
							<?php if ($ambito) : ?>
								<br />
								<br />
								<h5><?php _e('Ámbitos de actuación:','PDP'); ?></h5>
								<br />
								<p><?php foreach ($ambito as $amb):?><?php echo $amb->name;?>, <?php endforeach; ?></p>
								<br />
							<?php endif;?>
							
						</div>

						<div class="entry-description">
							<h5><?php _e('Descripción del centro','PDP');?></h5><br />
							<p><?php the_content(); ?></p>
							</div>
						</div>
						<!-- End entry-paragraph -->
						

					</div>
					<!-- end entry-content -->
					<?php endwhile; else: ?>
					    <p>Sorry, no posts matched your criteria.</p>
					<?php endif; ?>
				</div>
				<!-- end entry content -->
			</article>
			<?php if ( is_active_sidebar( 'widgets-aside' ) ) : ?>
				<aside>
					<?php dynamic_sidebar( 'widgets-aside' ); ?>
				</aside>
			<?php endif; ?>
			

			<?php get_footer(); ?>
		</main>