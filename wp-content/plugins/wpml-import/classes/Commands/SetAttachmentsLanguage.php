<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Fields;

class SetAttachmentsLanguage implements Base\Command {

	use Base\Query;
	use Base\HasItemsPerBatch;

	const DEFAULT_LIMIT = 5;

	private $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Setting Attachments\' Language', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Assigning a language to imported attachments.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$items = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		foreach ( $items as $item ) {
			$languageCode = $item->language_code ?: $this->sitepress->get_default_language();

			$this->sitepress->set_element_language_details( $item->attachment_id, 'post_attachment', 0, $languageCode );
		}

		return count( $items );
	}

	private function getPendingItems( $limit = null ) {
		return $this->getResultsWithLimit(
			"
			SELECT
				p.ID AS attachment_id,
				parent_t.language_code
			FROM {$this->wpdb->posts} p
			LEFT JOIN {$this->wpdb->prefix}icl_translations t
				ON t.element_id = p.ID
				AND t.element_type = 'post_attachment'
			LEFT JOIN {$this->wpdb->postmeta} pm
				ON pm.post_id = p.post_parent
				AND pm.meta_key = '" . Fields::TRANSLATION_GROUP . "'
			LEFT JOIN {$this->wpdb->prefix}icl_translations parent_t
				ON parent_t.element_id = p.post_parent
				AND parent_t.element_type LIKE 'post_%'
			WHERE p.post_type = 'attachment'
				AND p.post_status != 'auto-draft'
				AND t.trid IS NULL
				AND pm.meta_id IS NOT NULL
			ORDER BY p.ID ASC
			",
			$limit
		);
	}
}
