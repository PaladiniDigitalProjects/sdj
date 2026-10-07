<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Fields;


class SetFinalPostsStatus implements Base\Command, Base\TemporaryPostFields {

	use Query;
	use HasItemsPerBatch;

	const FAILED_META = '_wpml_import_final_status_failed';

	const DEFAULT_LIMIT = 10;

	protected $wpdb;

	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Updating Final Post Status', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Setting the post status based on the "_wpml_import_after_process_post_status" field from the import file (if provided).', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		$this->clearFailedAttempts();

		return (int) $this->wpdb->get_var( $this->getQuery( 'COUNT(*)' ) );
	}

	public function run( ?Collection $args = null ) {
		$limit         = $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT );
		$restoredCount = 0;
		$attempted     = [];

		while ( 0 === $restoredCount ) {
			$items = $this->rejectAttempted( $this->getPendingItems( $limit ), $attempted );

			if ( ! $items ) {
				break;
			}

			foreach ( $items as $item ) {
				$attempted[ (int) $item->post_id ] = true;
			}

			$restoredCount = $this->restoreStatuses( $items );
		}

		return $restoredCount;
	}

	private function rejectAttempted( array $items, array $attempted ): array {
		return array_filter( $items, fn( $item ) => ! isset( $attempted[ (int) $item->post_id ] ) );
	}

	private function restoreStatuses( array $items ): int {
		$restoredCount = 0;

		foreach ( $items as $item ) {
			$postId    = (int) $item->post_id;
			$newStatus = (string) $item->new_status;

			$result = wp_update_post(
				[
					'ID'          => $postId,
					'post_status' => $newStatus,
				],
				true
			);

			if ( $this->isMissingPost( $result ) ) {
				delete_post_meta( $postId, Fields::FINAL_POST_STATUS );
				continue;
			}

			if ( ! $this->hasRequestedStatus( $postId, $newStatus ) ) {
				$this->markAsFailed( $postId, $newStatus, $result );
				continue;
			}

			delete_post_meta( $postId, Fields::FINAL_POST_STATUS );
			++$restoredCount;
		}

		return $restoredCount;
	}

	public static function getTemporaryPostFields() {
		return [ self::FAILED_META ];
	}

	private function clearFailedAttempts() {
		delete_post_meta_by_key( self::FAILED_META );
	}

	private function isMissingPost( $result ): bool {
		return is_wp_error( $result ) && 'invalid_post' === $result->get_error_code();
	}

	private function hasRequestedStatus( int $postId, string $requestedStatus ): bool {
		$storedStatus = get_post_field( 'post_status', $postId, 'raw' );

		if ( $storedStatus === $requestedStatus ) {
			return true;
		}

		if ( 'future' === $storedStatus && 'publish' === $requestedStatus ) {
			return true;
		}

		return 'inherit' === $storedStatus && 'attachment' === get_post_type( $postId );
	}

	private function markAsFailed( int $postId, string $status, $result ) {
		add_post_meta( $postId, self::FAILED_META, '1', true );

		if ( defined( 'WP_DEBUG_LOG' ) && constant( 'WP_DEBUG_LOG' ) ) {
			error_log(
				sprintf(
					'WPML Import: the status of post %d could not be set to "%s" (%s). It is reported as skipped and keeps its "%s" field.',
					$postId,
					$status,
					is_wp_error( $result ) ? $result->get_error_message() : 'the save did not go through',
					Fields::FINAL_POST_STATUS
				)
			);
		}
	}

	private function getPendingItems( $limit ) {
		return $this->getResultsWithLimit(
			$this->getQuery(
				'pm.post_id AS post_id,
				pm2.meta_value AS new_status',
				"
			LEFT JOIN {$this->wpdb->postmeta} AS failedMeta
				ON failedMeta.post_id = pm.post_id
					AND failedMeta.meta_key = '" . self::FAILED_META . "'",
				'
				AND failedMeta.meta_id IS NULL'
			),
			$limit
		);
	}

	private function getQuery( $fields, $extraJoin = '', $extraWhere = '' ) {
		$validStatuses = array_keys( get_post_statuses() );

		return "
			SELECT
				{$fields}
			FROM {$this->wpdb->postmeta} AS pm
			RIGHT JOIN {$this->wpdb->postmeta} AS pm2
				ON pm2.post_id = pm.post_id
					AND pm2.meta_key = '" . Fields::FINAL_POST_STATUS . "'
			LEFT JOIN {$this->wpdb->posts} AS p
				ON p.ID = pm.post_id" . $extraJoin . "
			WHERE pm.meta_key = '" . Fields::TRANSLATION_GROUP . "'
				AND pm2.meta_value IN(" . wpml_prepare_in( $validStatuses ) . ")
				AND pm2.meta_value != p.post_status" . $extraWhere . "
			";
	}
}
