<?php  
   $telefono =get_field( 'ce_telefono');
   $direccion =get_field('ce_direccion');
   $correo = get_field('ce_email');
   $web= get_field('ce_web');
$google_maps_link = get_field('ce_google_maps');
?>
	<div <?php echo get_block_wrapper_attributes(); ?> class="site-main" role="main"> <div>	
		
		<?php// $comarca = get_the_terms( $post->ID , 'comarca'); ?>
			<?php //$caractersticas = get_the_terms( $post->ID , 'caracteristica'); ?>
			<article class="entry entry-single tienda_single">
				<div class="entry-content <?php if($comarca):?><?php foreach ($comarca as $c):?> <?php echo $c->slug;?><?php endforeach;?><?php endif;?>">
					
						
					<div class="post-content-tienda">
					<div class="content-tenda ">
						
						<?php
						//$comarca = get_the_terms( $post->ID , 'comarca');
						//$caracts = get_the_terms( $post->ID , 'caracteristica');
						?>

						<div class="entry-description">
						<div class="section-header">
							<?php if( $comarca ): ?>
								<h3 class="section-title"><?php foreach ($comarca as $ci):?><?php echo $ci->name;?><?php endforeach; ?></h3>
							<?php endif;?>
							<h1 class="store-title" ><?php the_title(); ?></h1>
						</div>
						<!-- end section header -->	
						<div class="content">
							<?php the_content(); ?>	
							<?php if ($caracts) {
								// Check if tags are found
								if (!empty($caracts)) {
									// Output each tag
									echo '<ul class="caracteristicas">';
									foreach ($caracts as $caract) {
										echo '<li class="caracteristica">
											<img src="'. z_taxonomy_image_url($caract->term_id) .'" />
											<span>'. $caract->name .'</span>
											</li>';
									}
									echo '</ul>';
								} else {
									echo 'No tags found for the term "caracteristicas".';
								}
							} else {
								echo 'Sin características';
							}
							?>
							</div>
							<!-- end entry description -->
						</div>
						<!-- end content -->
							<div class='flex-v info-store'>
						
								
								<div class="data"><a href=" <?php echo $google_maps_link ;?> " target="_blank" title="<?php the_title(); ?>"><img src="https://veritas.es/wp-content/uploads/2024/03/LOCATION.png" width="26px" height="36.45px" alt="<?php _e('Dirección: ', 'PDP');?>" /></a><p><a href=" <?php echo $google_maps_link ;?> " target="_blank" title="<?php the_title(); ?>"><?php echo $direccion ;?></a></p></div>
								<div class="data"><a href="tel:<?php echo $telefono;?>"><img src="https://veritas.es/wp-content/uploads/2024/03/TELEFON.png" alt="<?php _e('Teléfono: ', 'PDP');?>" width="36px" height="36px" /></a><p><?php echo $telefono ;?></p></div>
							
							</div>
						<!-- end info-store -->
					</div>
					

					
				</div>
				<!-- end post content -->
			</div>
			<!-- end entry content -->
		</article>
					</div><!-- #main -->
