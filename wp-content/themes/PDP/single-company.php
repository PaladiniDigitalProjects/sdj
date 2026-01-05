<div class="single">
	<a id="claca"><img src="<?php echo get_stylesheet_directory_uri(); ?>/img/ico-close.svg" width="30px" height="30px" alt="Close" /></a>
	<?php while ( have_posts() ) : the_post(); ?>
		<article class="entry">
		<?php $header_image = get_field('company-cs-bkg-img');?>
		<header class="entry-header<?php if( $header_image ) : ?> company-header-image<?php endif; ?>">
			<div class="company-exlibris">
				<div>
					<?php $company_logo_b = get_field('company-logo-b'); if ($company_logo_b) : ?><img class="company-logo" src="<?php echo the_field('company-logo-b'); ?>" title="<?php the_field('company-name'); ?>" /><?php endif; ?>	
				</div>
				<div>
					<span class="category"><?php foreach((get_the_category()) as $category){ echo $category->name; } ?></span>
					<ul class="antetitle"><?php $posttags = wp_get_post_terms( $post->ID, 'post_tag', array( 'fields' => 'names' ) ); if ($posttags): ?><?php foreach($posttags as $tag){echo '<li>' .$tag. '</li>';} ?><?php endif;?></ul>
				</div>
			</div>
			<!-- end exlibris -->
			<h1 class="entry-title"><?php echo the_title();?></h1>
		</header>
		<div class="entry-content">
			<?php if( !empty(the_content()) ): ?>
				<?php the_content(); ?>
			<?php endif; ?>
		</div>
		<!-- entry content -->
		<aside class="aside-content">
		<?php if( have_rows('company-team-person') ): ?>
			<ul class="company-components">
			<?php while( have_rows('company-team-person') ): the_row(); 
				$co_image = get_sub_field('comany-team-picture');
				$co_size = 'full';
				?>
				<li class="component center">
					<?php if( $co_image ) : ?>
						<img class="img-responsive img-circular" src="<?php the_sub_field('comany-team-picture'); ?>" alt="<?php the_sub_field('comany-team-name');?>, <?php the_sub_field('comany-team-position'); ?>" />	
					<?php endif; ?>
					<p><strong><?php the_sub_field('comany-team-name'); ?></strong> <?php the_sub_field('comany-team-position'); ?></p>
				</li>
			<?php endwhile; ?>
			</ul>
		<?php endif; ?>
		<!-- end components -->
		<div class="company-data">
			<?php $c_location = get_field('company-loactions'); if ($c_location) : ?>
			<div class="location">
				<h4><?php _e('Location', 'PDP'); ?></h4>
				<p><?php the_field('company-loactions'); ?></p>
			</div>
			<?php endif; ?>
			
			<?php $c_timeline = get_field('company-timeline'); if ($c_timeline) : ?>
			<div class="timeline">
				<h4><?php _e('Timeline', 'PDP'); ?></h4>
				<p><?php the_field('company-timeline'); ?></p>
			</div>
			<?php endif; ?>

			<?php $c_sector = get_field('company-sectors'); if ($c_sector) : ?>
			<div class="sector">
				<h4><?php _e('Sector', 'PDP'); ?></h4>
				<p><?php the_field('company-sectors'); ?></p>
			</div>
			<?php endif; ?>

			<?php $c_inversors = get_field('company-inverors'); if ($c_inversors) : ?>
			<div class="inversors">
				<h4><?php _e('Co-investors', 'PDP'); ?></h4>
				<p><?php the_field('company-inverors'); ?></p>
			</div>
			<?php endif; ?>

			<?php $c_adquired = get_field('company-adquired'); if ($c_adquired) : ?>
			<div class="adquired">
				<h4><?php _e('Acquired by', 'PDP'); ?></h4>
				<p><?php the_field('company-adquired'); ?></p>
			</div>
			<?php endif; ?>
		</div>
		<!-- end metadata -->
		</aside>
		</article>
	<?php endwhile; ?>
	
	<?php if( $header_image ) : ?>
	<style type="text/css">
		.company-header-image {
			background: url('<?php echo($header_image);?>') top right no-repeat;
		}
	</style>
	<?php endif; ?>
</div>

<script>
  $('#case-study > .single').on('click', function(){
    $(this).closest('#case-study').toggleClass("active");
	$("body").toggleClass("body-fixed");
  });
</script>