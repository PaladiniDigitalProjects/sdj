<?php
/**
 * Default Events Template
 * This file is the basic wrapper template for all the views if 'Default Events Template'
 * is selected in Events -> Settings -> Display -> Events Template.
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/default-template.php
 *
 * @package TribeEventsCalendar
 * @version 4.6.23
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

get_header();
?>
<main id="main" class="site-main" role="main">

<?php tribe_events_before_html();
$events_label_singular = tribe_get_event_label_singular();
$events_label_plural   = tribe_get_event_label_plural();
$event_id = get_the_ID();
?>

<div id="tribe-events-content" class="alignwide tribe-events-single entry-content">
	
	<header class="entry-header">
		<p><a style="color:black" href="<?php echo get_site_url(); ?>/eventos/">< <?php _e('Eventos', 'PDP');?></a></p>
		<div class="entry-antetitle">
		<?php echo tribe_get_event_categories(
			get_the_id(),
			[
				'before'       => '',
				'sep'          => ', ',
				'after'        => '',
				'label'        =>  'Tipo de evento', // An appropriate plural/singular label will be provided
				'label_before' => '<span class="label">',
				'label_after'  => '</span>',
				'wrap_before'  => '<span class="antetitle">',
				'wrap_after'   => '</span>',
			]
		);
		?>
		</div>
		<?php the_title( '<h1 class="entry-title tribe-events-single-event-title">', '</h1>' ); ?>
	</header>

	<?php if ( tribe_event_featured_image()) : ?>
		<?php 
		$thumb_id = get_post_thumbnail_id();
		$thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
		$thumb_url = $thumb_url_array[0];
		?>
		<figure class="entry-image"><img class="img-responsive" src="<?php echo($thumb_url); ?>" /></figure>
	<?php endif; ?>

	<div class="event-date-detail">
		<div class="entry-antetitle">
		<?php echo tribe_get_event_categories(
			get_the_id(),
			[
				'before'       => '',
				'sep'          => ', ',
				'after'        => '',
				'label'        =>  'Tipo de evento', // An appropriate plural/singular label will be provided
				'label_before' => '<span class="label">',
				'label_after'  => '</span>',
				'wrap_before'  => '<span class="antetitle">',
				'wrap_after'   => '</span>',
			]
		);
		?>
		</div>
		<?php do_action( 'tribe_events_single_event_before_the_meta' ) ?>
		<?php tribe_get_template_part( 'modules/meta/details'); ?>
		<?php tribe_get_template_part( 'modules/meta/organizer'); ?>
		<?php tribe_get_template_part( 'modules/meta/venue'); ?>
		<?php do_action( 'tribe_events_single_event_after_the_meta' ) ?>
		<?php do_action( 'tribe_events_single_event_after_the_content' ) ?>
	</div>

	<div class="tribe-events-schedule tribe-clearfix">
		<?php if ( tribe_get_cost() ) : ?>
			<span class="tribe-events-cost"><?php echo tribe_get_cost( null, true ) ?></span>
		<?php endif; ?>
	</div>

	<?php while ( have_posts() ) :  the_post(); ?>
		<div class="post-content">
			<div class="entry-paragraph">
				<?php the_content(); ?>
				<div class="event-location">
					<?php tribe_get_template_part( 'modules/meta/map'); ?>
				</div>
			</div>
		</div> <!-- #post content -->

	<?php endwhile; ?>


	<!-- Event header -->
	<div id="tribe-events-header" <?php tribe_events_the_header_attributes() ?>>
		<!-- Navigation -->
		<nav class="tribe-events-nav-pagination" aria-label="<?php printf( esc_html__( '%s Navigation', 'the-events-calendar' ), $events_label_singular ); ?>">
			<ul class="tribe-events-sub-nav">
				<li class="tribe-events-nav-previous"><?php tribe_the_prev_event_link( '<span>&laquo;</span> %title%' ) ?></li>
				<li class="tribe-events-nav-next"><?php tribe_the_next_event_link( '%title% <span>&raquo;</span>' ) ?></li>
			</ul>
			<!-- .tribe-events-sub-nav -->
		</nav>
	</div>
	<!-- #tribe-events-header -->

</div><!-- #tribe-events-content -->
<?php tribe_events_after_html(); ?>

<?php if ( is_active_sidebar( 'widgets-aside' ) ) : ?>
	<aside>
		<?php dynamic_sidebar( 'widgets-aside' ); ?>
	</aside>
<?php endif; ?>

<?php get_footer();?>
</main> <!-- #tribe-events-pg-template -->

