<?php /* Template Name: Llistado centros */
get_header(); 
?>
<main id="main" class="site-main" role="main">
	<header class="entry-header alignwide">
		<a href="<?php echo get_home_url(); ?>/donde-estamos/mapa-de-centros-sjd/" class="entry-antetitle back"><?php _e('Mapa de centros', 'PDP'); ?></a>
		<h1 class="entry-title"><?php the_title();?></h1>
	</header>
	<section class="content listado-mapa alignwide">
	<nav class="search-nav alignwide">
		<input type="text" id="seachInput" onkeyup="myFunction()" placeholder="<?php _e('Filtrar listado por ciudad, comunidad o ámbito...','PDP');?>" title="<?php _e('Filtrar listado por ciudad, comunidad o ámbito...','PDP');?>"><img src="<?php echo get_template_directory_uri(); ?>/img/ico-lupa.svg" alt="<?php _e('Buscar','PDP');?>" width="24px" height="24px">
	</nav>
	<?php
 		$args = array(
			'post_type' => 'location',
			'post_status' => 'publish',
			'posts_per_page' => -1, 
			'orderby' => 'title',
			'order' => 'ASC', 
		);

		$the_query = new WP_Query( $args ); ?>
		<?php if ( $the_query->have_posts() ) : ?>
			<ul id="myUL">
			<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
			
			<?php
            $localidad = get_the_terms( $post->ID , 'localidad');
            $comunidad = get_the_terms( $post->ID , 'comunidad_autonoma'); 
            $ciudad = get_the_terms( $post->ID , 'localidad');
            $ambito = get_the_terms( $post->ID , 'ambito');
            $telefono = get_field('ce_telefono');
            ?>
			<li>
            <article class='entry mlf-location<?php if($localidad):?><?php foreach ($localidad as $lo):?> <?php echo $lo->slug;?><?php endforeach;?><?php endif;?>' id="location-<?=get_the_ID() ?>">
                <?php if ( has_post_thumbnail()): ?>
                    <div class="entry-image" style="background: url('<?php the_post_thumbnail_url('thumbnail'); ?>') center no-repeat;"></div>                    
                <?php endif; ?>
                <div class="entry-content">
					<div>
                    <p class="entry-categories"><?php if($localidad):?><?php foreach ($localidad as $lo):?><?php echo $lo->name;?><?php endforeach; ?><?php endif;?><?php if($comunidad):?><?php foreach ($comunidad as $co):?><?php if($localidad and $comunidad): ?><span>, </span><?php endif;?><?php echo $co->name;?><?php endforeach;?><?php endif;?></p>
                    	<h3 class="entry-title"><?php the_title(); ?></h3>
					</div>
					<div>
                    	<?php if($ambito):?><dl class="entry-categories"><dt class="hide"><?php _e('Ámbitos de actuación', 'PDP');?></dt><?php foreach ($ambito as $amb):?><dd><?php echo $amb->name;?></dd><?php endforeach; ?></dl><?php endif;?>
					</div>
					<div>
						<?php if($telefono): ?><a class="telefon" href="tel:<?php echo($telefono);?>"><?php echo($telefono);?></a><?php endif; ?>
					</div>
				</div>
                <a class="entry-link" href="<?php the_permalink(); ?>"></a>
            </article>
			</li>
			<?php endwhile; ?>
			</ul>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<?php get_template_part( 'template-parts/content', 'none' ); ?>
		<?php endif; ?>
	
	</section>
	
	<?php get_footer(); ?>
	<script>
	function myFunction() {
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById("seachInput");
		filter = input.value.toUpperCase();
		ul = document.getElementById("myUL");
		li = ul.getElementsByTagName("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("article")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}
	</script>
</main>