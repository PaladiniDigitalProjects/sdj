<?php

namespace WPForms\Pro\Emails;

use WPForms\Emails\Templates\Summary;

/**
 * Re-engagement alert box for the weekly summary email.
 *
 * Renders a tenure-based blue alert for paid users with forms but zero entries.
 * Stateless — relies on the weekly cron cadence to fire each variant at most once.
 *
 * @since 1.10.1.1
 */
class ReengagementAlert {

	/**
	 * Hard stop day. No alerts after this tenure.
	 *
	 * @since 1.10.1.1
	 */
	private const HARD_STOP_DAY = 270;

	/**
	 * Cron cadence in days. Used as the trigger-window width.
	 *
	 * @since 1.10.1.1
	 */
	private const WINDOW_DAYS = 7;

	/**
	 * Variant definitions: slug => [ trigger_days, utm_content ].
	 *
	 * @since 1.10.1.1
	 */
	private const VARIANTS = [
		'phase-a-early' => [
			'trigger_days' => [ 30, 60, 90 ],
			'utm_content'  => '0entries-phase-a-early',
		],
		'phase-a-late'  => [
			'trigger_days' => [ 120, 150 ],
			'utm_content'  => '0entries-phase-a-late',
		],
		'phase-b'       => [
			'trigger_days' => [ 180, 210, 240, 270 ],
			'utm_content'  => '0entries-phase-b',
		],
	];

	/**
	 * Initialize the class.
	 *
	 * @since 1.10.1.1
	 */
	public function init(): void {

		$this->hooks();
	}

	/**
	 * Register hooks.
	 *
	 * @since 1.10.1.1
	 */
	private function hooks(): void {

		add_filter( 'wpforms_emails_summaries_template', [ $this, 'maybe_add_alert_args' ] );
		add_filter( 'wpforms_emails_summaries_cron_skip_empty', [ $this, 'maybe_allow_empty_entries' ] );
	}

	/**
	 * Resolve the active variant for the current site, or null when no alert should fire.
	 *
	 * @since 1.10.1.1
	 *
	 * @return string|null Variant slug or null.
	 */
	private function get_active_variant(): ?string {

		$tenure_days = $this->get_tenure_days();

		if ( $tenure_days < 0 ) {
			return null;
		}

		$variant = $this->resolve_variant( $tenure_days );

		if ( $variant === null ) {
			return null;
		}

		if ( ! $this->has_forms() || ! $this->has_zero_entries() ) {
			return null;
		}

		return $variant;
	}

	/**
	 * Allow the weekly summary cron to send when this site qualifies for a re-engagement alert.
	 *
	 * @since 1.10.1.1
	 *
	 * @param bool $skip_empty Whether to skip sending when entries are empty.
	 *
	 * @return bool
	 */
	public function maybe_allow_empty_entries( $skip_empty ): bool {

		$skip_empty = (bool) $skip_empty;

		if ( ! $skip_empty ) {
			return false;
		}

		return $this->get_active_variant() === null;
	}

	/**
	 * Resolve the active variant slug for the given tenure days, or null if none.
	 *
	 * @since 1.10.1.1
	 *
	 * @param int $tenure_days Days since Pro plugin activation.
	 *
	 * @return string|null Variant slug or null when outside all trigger windows.
	 */
	private function resolve_variant( int $tenure_days ): ?string {

		if ( $tenure_days < 30 || $tenure_days >= self::HARD_STOP_DAY + self::WINDOW_DAYS ) {
			return null;
		}

		foreach ( self::VARIANTS as $slug => $config ) {
			foreach ( $config['trigger_days'] as $trigger ) {
				if ( $tenure_days >= $trigger && $tenure_days < $trigger + self::WINDOW_DAYS ) {
					return $slug;
				}
			}
		}

		return null;
	}

	/**
	 * Days elapsed since Pro plugin activation. Returns -1 if activation timestamp is missing.
	 *
	 * @since 1.10.1.1
	 *
	 * @return int
	 */
	private function get_tenure_days(): int {

		$activated        = get_option( 'wpforms_activated', [] );
		$pro_activated_at = isset( $activated['pro'] ) ? (int) $activated['pro'] : 0;

		if ( $pro_activated_at <= 0 ) {
			return -1;
		}

		return (int) floor( ( time() - $pro_activated_at ) / DAY_IN_SECONDS );
	}

	/**
	 * Whether the site has at least one form.
	 *
	 * @since 1.10.1.1
	 *
	 * @return bool
	 */
	private function has_forms(): bool {

		$form_obj = wpforms()->obj( 'form' );

		if ( ! $form_obj ) {
			return false;
		}

		$forms = $form_obj->get(
			'',
			[
				'fields'      => 'ids',
				'numberposts' => 1,
			]
		);

		return ! empty( $forms );
	}

	/**
	 * Whether the site has zero entries across all forms.
	 *
	 * @since 1.10.1.1
	 *
	 * @return bool
	 */
	private function has_zero_entries(): bool {

		$entry_obj = wpforms()->obj( 'entry' );

		if ( ! $entry_obj ) {
			return false;
		}

		return (int) $entry_obj->get_entries( [], true ) === 0;
	}

	/**
	 * Build the alert template args for the resolved variant.
	 *
	 * @since 1.10.1.1
	 *
	 * @param string $variant Variant slug.
	 *
	 * @return array Alert args (slug, title, content, button_text, button_url).
	 */
	private function build_args( string $variant ): array {

		$utm_content  = self::VARIANTS[ $variant ]['utm_content'];
		$utm_medium   = 'email';
		$utm_campaign = 'weekly-summary-reengagement';

		// Copy table per issue #17326.
		$copy = [
			'phase-a-early' => [
				'title'       => __( 'Your forms aren\'t collecting entries yet', 'wpforms' ),
				'content'     => __( 'Forms only collect entries when they\'re embedded on a page visitors can see. Check that each form is added to a page (via shortcode or block) and that the page actually gets traffic.', 'wpforms' ),
				'button_text' => __( 'Check Your Forms', 'wpforms' ),
				'admin_path'  => 'admin.php?page=wpforms-overview',
			],
			'phase-a-late'  => [
				'title'       => __( 'Your forms have been quiet for a while', 'wpforms' ),
				'content'     => __( 'After a few months at zero, the most common cause is page placement. Try moving your form to a higher-traffic page: homepage, pricing, or a top blog post.', 'wpforms' ),
				'button_text' => __( 'Check Your Forms', 'wpforms' ),
				'admin_path'  => 'admin.php?page=wpforms-overview',
			],
			'phase-b'       => [
				'title'       => __( 'Still no entries? Try a different form type.', 'wpforms' ),
				'content'     => __( 'When placement isn\'t the issue, matching the form to visitor intent usually unsticks things: quote request for services, newsletter signup for content, or demo booking for software.', 'wpforms' ),
				'button_text' => __( 'Browse Templates', 'wpforms' ),
				'admin_path'  => 'admin.php?page=wpforms-builder',
			],
		][ $variant ];

		$button_url = add_query_arg(
			[
				'utm_source'   => 'wpforms-plugin',
				'utm_medium'   => $utm_medium,
				'utm_campaign' => $utm_campaign,
				'utm_content'  => $utm_content,
			],
			admin_url( $copy['admin_path'] )
		);

		return [
			'slug'        => $variant,
			'title'       => $copy['title'],
			'content'     => $copy['content'],
			'button_text' => $copy['button_text'],
			'button_url'  => $button_url,
		];
	}

	/**
	 * Inject the re-engagement alert args into the summary template when conditions are met.
	 *
	 * @since 1.10.1.1
	 *
	 * @param Summary $template Summary email template.
	 *
	 * @return Summary
	 */
	public function maybe_add_alert_args( $template ) {

		if ( ! $template instanceof Summary ) {
			return $template;
		}

		$variant = $this->get_active_variant();

		if ( $variant === null ) {
			return $template;
		}

		$template->set_args(
			[
				'body' => [
					'reengagement_alert' => $this->build_args( $variant ),
				],
			]
		);

		return $template;
	}
}
