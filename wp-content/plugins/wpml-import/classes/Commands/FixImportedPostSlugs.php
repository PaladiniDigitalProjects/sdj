<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\Query;


class FixImportedPostSlugs implements Base\Command, Base\TemporaryPostFields {

	use Query;
	use HasItemsPerBatch;

	const PROCESSED_META = '_wpml_import_slug_fix_done';

	const DEFAULT_LIMIT = 50;

	protected $wpdb;

	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Fixing Imported Post Slugs', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Regenerating translated post slugs to prevent conflicts with the originals.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$items = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		if ( empty( $items ) ) {
			return 0;
		}

		foreach ( $items as $item ) {
			$postId = (int) $item->post_id;

			$slugCurrent   = (string) $item->current_slug;
			$slugCandidate = (string) $item->source_slug;

			if ( '' === $slugCandidate ) {
				$this->markAsProcessed( $postId );
				continue;
			}

			$isOriginalSlugWithIndex = preg_match( '/^' . preg_quote( $slugCandidate, '/' ) . '-\d+$/', $slugCurrent );

			if ( $isOriginalSlugWithIndex ) {
				$updated = wp_update_post(
					[
						'ID'                => $postId,
						'post_name'         => $slugCandidate,
						'post_modified'     => $item->post_modified,
						'post_modified_gmt' => $item->post_modified_gmt,
					],
					true
				);

				if ( is_wp_error( $updated ) ) {
					$this->markAsProcessed( $postId );
					continue;
				}

				$this->restoreModifiedDates( $postId, $item );
				$this->cleanupOldSlugMeta( $postId );
			}

			$this->markAsProcessed( $postId );
		}

		return count( $items );
	}

	private function restoreModifiedDates( int $postId, $item ) {
		if ( empty( $item->post_modified ) || empty( $item->post_modified_gmt ) ) {
			return;
		}

		$this->wpdb->update(
			$this->wpdb->posts,
			[
				'post_modified'     => $item->post_modified,
				'post_modified_gmt' => $item->post_modified_gmt,
			],
			[ 'ID' => $postId ],
			[ '%s', '%s' ],
			[ '%d' ]
		);

		clean_post_cache( $postId );
	}

	private function cleanupOldSlugMeta( int $postId ) {
		delete_post_meta( $postId, '_wp_old_slug' );
	}

	public static function getTemporaryPostFields() {
		return [ self::PROCESSED_META ];
	}

	private function markAsProcessed( int $postId ) {
		add_post_meta( $postId, self::PROCESSED_META, '1', true );
	}

	private function getPendingItems( $limit = null ) {
		return $this->getResultsWithLimit(
			"
			SELECT
				tr.element_id AS post_id,
				post.post_name AS current_slug,
				post.post_modified AS post_modified,
				post.post_modified_gmt AS post_modified_gmt,
				sourcePost.post_name AS source_slug
			FROM {$this->wpdb->prefix}icl_translations tr
			INNER JOIN {$this->wpdb->posts} post
				ON post.ID = tr.element_id
				AND tr.element_type = CONCAT('post_', post.post_type)
			INNER JOIN {$this->wpdb->prefix}icl_translations sourceTr
				ON sourceTr.trid = tr.trid
				AND sourceTr.source_language_code IS NULL
			INNER JOIN {$this->wpdb->posts} sourcePost
				ON sourcePost.ID = sourceTr.element_id
				AND sourceTr.element_type = CONCAT('post_', sourcePost.post_type)
			LEFT JOIN {$this->wpdb->postmeta} processedMeta
				ON processedMeta.post_id = tr.element_id
				AND processedMeta.meta_key = '" . self::PROCESSED_META . "'
			WHERE tr.source_language_code IS NOT NULL
				AND tr.element_type <> 'post_attachment'
				AND processedMeta.meta_id IS NULL
				AND post.post_name <> sourcePost.post_name
			ORDER BY tr.element_id ASC
			",
			$limit
		);
	}
}
