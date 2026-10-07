<?php

namespace WPML\Import\Commands\Base;

use WPML\Collect\Support\Collection;
use WPML\FP\Lst;
use WPML\FP\Obj;

abstract class SetEntitiesLanguage implements Command {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 200;

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public function countPendingItems( ?Collection $args = null ) {
		return (int) count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$countProcessed = 0;

		foreach ( $this->getPendingItemsByTranslationGroup( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) ) as $itemsGroup ) {
			$this->processTranslationGroup( $itemsGroup );
			$countProcessed += count( $itemsGroup );
		}

		return $countProcessed;
	}

	private function getPendingItemsByTranslationGroup( $limit ) {
		$limit = max( 1, (int) $limit, count( $this->sitepress->get_languages( null, true ) ) );

		$items       = $this->getPendingItems( $limit + 1 );
		$isLastBatch = count( $items ) <= $limit;
		$itemsGroups = [];

		foreach ( $items as $item ) {
			if ( ! array_key_exists( $item->translation_group, $itemsGroups ) ) {
				$itemsGroups[ $item->translation_group ] = [];
			}

			$itemsGroups[ $item->translation_group ][] = $item;
		}

		if ( ! $isLastBatch ) {
			array_pop( $itemsGroups );
		}

		return $itemsGroups;
	}

	private function processTranslationGroup( array $itemsGroup ) {
		$isTranslation                 = Obj::prop( 'source_language_code' );
		list( $translations, $source ) = Lst::partition( $isTranslation, $itemsGroup );
		$source                        = reset( $source );
		list( $trid, $elementType )    = $this->getTridAndType( $source, $translations );

		foreach ( $translations as $translation ) {
			$this->sitepress->set_element_language_details( $translation->element_id, $elementType, $trid, $translation->language_code, $translation->source_language_code );
		}

		$this->deleteLanguageFields( $itemsGroup );
	}

	abstract protected function getPendingItems( $limit = null );

	abstract protected function getTridAndType( $source, $translations );

	abstract protected function deleteLanguageFields( $itemsGroup );
}
