<?php
/**
 * Single Event Meta (Details) Template
 *
 * Override this template in your own theme by creating a file at:
 * [your-theme]/tribe-events/modules/meta/details.php
 *
 * @link http://evnt.is/1aiy
 *
 * @package TribeEventsCalendar
 *
 * @version 4.6.19
 */


$event_id             = Tribe__Main::post_id_helper();
$time_format          = get_option( 'time_format', Tribe__Date_Utils::TIMEFORMAT );
$time_range_separator = tribe_get_option( 'timeRangeSeparator', ' - ' );
$show_time_zone       = tribe_get_option( 'tribe_events_timezones_show_zone', false );
$time_zone_label      = Tribe__Events__Timezones::get_event_timezone_abbr( $event_id );

$start_datetime = tribe_get_start_date();
$start_date = tribe_get_start_date( null, false );
$start_time = tribe_get_start_date( null, false, $time_format );
$start_ts = tribe_get_start_date( null, false, Tribe__Date_Utils::DBDATEFORMAT );

$end_datetime = tribe_get_end_date();
$end_date = tribe_get_display_end_date( null, false );
$end_time = tribe_get_end_date( null, false, $time_format );
$end_ts = tribe_get_end_date( null, false, Tribe__Date_Utils::DBDATEFORMAT );

$time_formatted = null;
if ( $start_time == $end_time ) {
	$time_formatted = esc_html( $start_time );
} else {
	$time_formatted = esc_html( $start_time . $time_range_separator . $end_time );
}

/**
 * Returns a formatted time for a single event
 *
 * @var string Formatted time string
 * @var int Event post id
 */
$time_formatted = apply_filters( 'tribe_events_single_event_time_formatted', $time_formatted, $event_id );

/**
 * Returns the title of the "Time" section of event details
 *
 * @var string Time title
 * @var int Event post id
 */
$time_title = apply_filters( 'tribe_events_single_event_time_title', __( 'Hora:', 'PDP' ), $event_id );
$cost    = tribe_get_formatted_cost();
$website = tribe_get_event_website_link( $event_id );
$website_title = tribe_events_get_event_website_title();
?>

<div class="tribe-events-meta-group tribe-events-meta-group-details">
	<dl>
		<?php
		do_action( 'tribe_events_single_meta_details_section_start' );
		// All day (multiday) events
		if ( tribe_event_is_all_day() && tribe_event_is_multiday() ) :
			?>

			<dt class="tribe-events-start-date-label"> <?php _e( 'Inicio:', 'PDP' ); ?> </dt>
			<dd class="entry-day">
				<time><?php echo tribe_get_start_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_start_date( $event_id, false, 'F' ); ?></span></time>
			</dd>

			<dt class="tribe-events-end-date-label"> <?php _e( 'Final:', 'Final' ); ?> </dt>
			<dd class="entry-day">
			<time><?php echo tribe_get_end_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_end_date( $event_id, false, 'F' ); ?></span></time>
			</dd>

		<?php
		// All day (single day) events
		elseif ( tribe_event_is_all_day() ):
			?>
			<dt class="tribe-events-start-date-label"> <?php _e( 'Fecha:', 'PDP' ); ?> </dt>
			<dd class="entry-day">
				<time><?php echo tribe_get_start_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_start_date( $event_id, false, 'F' ); ?></span></time>
			</dd>

		<?php
		// Multiday events
		elseif ( tribe_event_is_multiday() ) :
			?>

			<dt class="tribe-events-start-datetime-label"> <?php _e( 'Inico:', 'PDP' ); ?> </dt>
			<dd class="entry-day">
				<time><?php echo tribe_get_start_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_start_date( $event_id, false, 'F' ); ?></span></time>
				<?php if ( $show_time_zone ) : ?>
					<span class="tribe-events-abbr tribe-events-time-zone published "><?php echo esc_html( $time_zone_label ); ?></span>
				<?php endif; ?>
			</dd>

			<dt class="tribe-events-end-datetime-label"> <?php _e( 'Final:', 'PDP' ); ?> </dt>
			<dd class="entry-day">
				<time><?php echo tribe_get_end_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_end_date( $event_id, false, 'F' ); ?></span></time>
				<?php if ( $show_time_zone ) : ?>
					<span class="tribe-events-abbr tribe-events-time-zone published "><?php echo esc_html( $time_zone_label ); ?></span>
				<?php endif; ?>
			</dd>

		<?php
		// Single day events
		else :
			?>
			<dt class="tribe-events-start-date-label hide"> <?php _e( 'Fecha:', 'PDP' ); ?> </dt>
			<dd class="entry-day">
				<time><?php echo tribe_get_start_date( $event_id, false, 'j' ); ?><span><?php echo tribe_get_start_date( $event_id, false, 'F' ); ?></span></time>
			</dd>

			<dt class="tribe-events-start-time-label"> <?php echo esc_html( $time_title ); ?> </dt>
			<dd>
				<div class="tribe-events-abbr tribe-events-start-time published dtstart" title="<?php echo esc_attr( $end_ts ); ?>">
					<?php echo $time_formatted; ?>
					<?php if ( $show_time_zone ) : ?>
						<span class="tribe-events-abbr tribe-events-time-zone published "><?php echo esc_html( $time_zone_label ); ?></span>
					<?php endif; ?>
				</div>
			</dd>

		<?php endif ?>

		<?php
		// Event Cost
		if ( ! empty( $cost ) ) : ?>

			<dt class="tribe-events-event-cost-label"> <?php _e( 'Coste:', 'PDP' ); ?> </dt>
			<dd class="tribe-events-event-cost"> <?php echo esc_html( $cost ); ?> </dd>
		<?php endif ?>

		

		<?php
		/* Translators: %s: Event (singular) */
		tribe_meta_event_tags( sprintf( esc_html__( '%s Etiquetas:', 'PDP' ), tribe_get_event_label_singular() ), ', ', true );
		?>

	</dl>
</div>
