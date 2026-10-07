<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Fields;
use WPML\TM\AutomaticTranslation\Actions\Actions;

use function WPML\Container\make;


class SendPostsToAutomaticTranslation implements Base\Command, Base\TemporaryPostFields {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 3;

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Sending Posts for Automatic Translation', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Creating automatic translation jobs for posts flagged for auto-translation in the exported data.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {

		$items = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		$itemsParam = $this->groupDataBySourceLanguageAndElementType( $items );

		$actions = make( Actions::class );

		$result = [];
		foreach ( $itemsParam as $sourceLangCode => $slcJobs ) {
			foreach ( $slcJobs as $elementType => $jobs ) {
				$result = array_merge(
					$result,
					$actions->createNewTranslationJobs( $sourceLangCode, $jobs, $elementType )
				);
			}
		}

		return count( $result );
	}


	private function getPendingItems( $limit = null ) {
		if ( ! \WPML\Setup\Option::shouldTranslateEverything() ) {
			return [];
		}

		$items = $this->getResultsWithLimit(
			$this->wpdb->prepare(
				"
				SELECT DISTINCT pm.post_id,
					tr.trid,
					tr.element_type,
					tr.language_code AS source_language_code,
					lang.code AS target_language_code
				FROM {$this->wpdb->postmeta} AS pm
				INNER JOIN {$this->wpdb->prefix}icl_translations AS tr ON tr.element_id = pm.post_id
					AND tr.element_type LIKE 'post_%'
					AND tr.source_language_code IS NULL
				INNER JOIN {$this->wpdb->prefix}icl_languages AS lang ON lang.active = 1
					AND lang.code != tr.language_code
				LEFT JOIN {$this->wpdb->prefix}icl_translations AS tr2 ON tr2.trid = tr.trid
					AND tr2.language_code = lang.code
				WHERE pm.meta_key = '" . Fields::DO_APPLY_ATE_ON_POST . "'
					AND pm.meta_value = '1'
					AND tr2.element_id IS NULL
					# during iterative imports, this helps to only take pending items, and not get stuck on the first LIMIT items
					AND tr2.trid is NULL
				ORDER BY pm.post_id ASC, lang.code ASC
				"
			),
			$limit
		);

		return $items;
	}


	private function groupDataBySourceLanguageAndElementType( $items ) {

		$newItems = [];

		foreach ( $items as $item ) {
			$slc = $item->source_language_code;
			if ( ! isset( $newItems[ $slc ] ) ) {
				$newItems[ $slc ] = [];
			}
			$et = $item->element_type;
			if ( ! isset( $newItems[ $slc ][ $et ] ) ) {
				$newItems[ $slc ][ $et ] = [];
			}
			$newItems[ $slc ][ $et ][] = [ (int) $item->post_id, $item->target_language_code ];
		}

		return $newItems;
	}

	public static function getTemporaryPostFields() {
		return [
			Fields::DO_APPLY_ATE_ON_POST,
		];
	}
}
