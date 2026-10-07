<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\Query;

class DeleteOriginalsOfDuplicatedTerms implements Base\Command {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 20;

	protected $wpdb;

	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Deleting Obsolete Original Terms', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Removing original terms that are no longer needed after creating duplicates for same-named terms. Ensuring no posts are linked to these original terms.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$items = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		foreach ( $items as $item ) {
			wp_delete_term( $item->term_id, $item->taxonomy );
		}

		return count( $items );
	}

	private function getPendingItems( $limit = null ) {
		return $this->getResultsWithLimit(
			"
			SELECT DISTINCT
				tm.term_id AS term_id,
				tt.taxonomy AS taxonomy
			FROM {$this->wpdb->termmeta} AS tm
			LEFT JOIN {$this->wpdb->term_taxonomy} AS tt
				ON tt.term_id = tm.term_id
			LEFT JOIN {$this->wpdb->term_relationships} AS tr
				ON tr.term_taxonomy_id = tt.term_taxonomy_id
			WHERE tm.meta_key = '" . DuplicateTermsAssignedToPostsInDifferentLanguage::FIELD_TEMPORARY_DUPLICATED_TERM . "'
			    AND tr.term_taxonomy_id IS NULL
		        AND NOT EXISTS (
					SELECT 1
					FROM {$this->wpdb->term_taxonomy} AS tt2
					WHERE tt2.parent = tt.term_taxonomy_id
			    )
			",
			$limit
		);
	}
}
