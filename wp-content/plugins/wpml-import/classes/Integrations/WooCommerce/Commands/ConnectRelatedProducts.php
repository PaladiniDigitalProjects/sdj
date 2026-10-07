<?php

namespace WPML\Import\Integrations\WooCommerce\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\Command;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Commands\Base\TemporaryPostFields;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Helper\PostTypes;

class ConnectRelatedProducts implements Command, TemporaryPostFields {
	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 100;

	const FIELD_TEMPORARY_CONNECT_RELATED_PRODUCTS = '_wpml_import_connect_wc_related';

	const UPSELL_META_KEY    = '_upsell_ids';
	const CROSSSELL_META_KEY = '_crosssell_ids';
	const CHILDREN_META_KEY  = '_children';

	private $groups = [];

	private $processed = [];

	private $defaultLanguage;

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}


	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Updating Related Products On Translations', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Setting up-sells, cross-sells and grouped products references in the right language.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$countProcessed        = 0;
		$this->defaultLanguage = $this->sitepress->get_default_language();

		$items = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		foreach ( $items as $item ) {
			$this->processFields( $item );
			add_post_meta( $item->element_id, self::FIELD_TEMPORARY_CONNECT_RELATED_PRODUCTS, 1 );
			++$countProcessed;
		}

		return $countProcessed;
	}

	private function getFieldValue( $fieldKey, $item ) {
		switch ( $fieldKey ) {
			case self::UPSELL_META_KEY:
				return $item->upsells;
			case self::CROSSSELL_META_KEY:
				return $item->crosssells;
			case self::CHILDREN_META_KEY:
				return $item->children;
		}
		return null;
	}

	private function processFields( $item ) {
		$fields = [
			self::UPSELL_META_KEY,
			self::CROSSSELL_META_KEY,
			self::CHILDREN_META_KEY,
		];
		array_walk(
			$fields,
			function ( $fieldKey ) use ( $item ) {
				$this->processField( $fieldKey, $item );
			}
		);
	}

	private function processField( $fieldKey, $item ) {
		$fieldValue = $this->getFieldValue( $fieldKey, $item );
		if ( empty( $fieldValue ) ) {
			return;
		}

		$values           = maybe_unserialize( $fieldValue );
		$translatedValues = array_unique(
			array_filter(
				array_map(
					function ( $idToP ) use ( $item ) {
						if ( in_array( $idToP, $this->processed, true ) ) {
							$trId = $this->findTranslationGroup( $idToP );
						} else {
							$trId = $this->generateTranslationGroup( $idToP );
						}
						return $this->getTranslationId( $trId, $item->language_code, $item->post_type );
					},
					$values
				)
			)
		);

		if ( empty( $translatedValues ) ) {
			$this->wpdb->delete(
				$this->wpdb->postmeta,
				[
					'post_id'    => $item->element_id,
					'meta_key'   => $fieldKey,
					'meta_value' => $fieldValue,
				]
			);

			return;
		}

		if (
			count( $values ) === count( $translatedValues )
			&& empty( array_diff( $values, $translatedValues ) )
		) {
			return;
		}

		$this->wpdb->update(
			$this->wpdb->postmeta,
			[
				'meta_key'   => $fieldKey,
				'meta_value' => maybe_serialize( $translatedValues ),
			],
			[
				'post_id'    => $item->element_id,
				'meta_key'   => $fieldKey,
				'meta_value' => $fieldValue,
			]
		);
	}

	private function findTranslationGroup( $elementId ) {
		foreach ( $this->groups as $groupTrId => $elements ) {
			$elementIds = array_values( $elements );
			if ( in_array( $elementId, $elementIds, true ) ) {
				return $groupTrId;
			}
		}
		return null;
	}

	private function generateTranslationGroup( $elementId ) {
		$elementType = 'post_' . get_post_type( $elementId );
		$trId        = $this->sitepress->get_element_trid( $elementId, $elementType );
		if ( empty( $trId ) ) {
			$this->processed[] = $elementId;
			return null;
		}
		$translations          = $this->sitepress->get_element_translations( $trId, $elementType );
		$this->groups[ $trId ] = [];
		foreach ( $translations as $trans ) {
			$this->groups[ $trId ][ $trans->language_code ] = (int) $trans->element_id;
			$this->processed[]                              = (int) $trans->element_id;
		}
		return $trId;
	}

	private function getOriginalLanguageId( $trId ) {
		return $this->groups[ $trId ][ $this->defaultLanguage ] ?? null;
	}

	private function getTranslationId( $trId, $languageCode, $postType ) {
		$fallbackValue = PostTypes::isDisplayAsTranslated( $postType )
			? $this->getOriginalLanguageId( $trId )
			: null;
		return $this->groups[ $trId ][ $languageCode ] ?? $fallbackValue;
	}

	private function getPendingItems( $limit = null ) {
		if (
			! PostTypes::isTranslatable( 'product' )
			&& ! PostTypes::isTranslatable( 'product_variation' )
		) {
			return [];
		}

		return $this->getResultsWithLimit(
			"
			SELECT iclptr.element_id AS element_id,
				iclptr.language_code AS language_code,
				p.post_type AS post_type,
				(SELECT meta_value FROM {$this->wpdb->postmeta} WHERE post_id = iclptr.element_id AND meta_key = '" . self::UPSELL_META_KEY . "' LIMIT 1) AS upsells,
				(SELECT meta_value FROM {$this->wpdb->postmeta} WHERE post_id = iclptr.element_id AND meta_key = '" . self::CROSSSELL_META_KEY . "' LIMIT 1) AS crosssells,
				(SELECT meta_value FROM {$this->wpdb->postmeta} WHERE post_id = iclptr.element_id AND meta_key = '" . self::CHILDREN_META_KEY . "' LIMIT 1) AS children
			FROM {$this->wpdb->prefix}icl_translations AS iclptr
			LEFT JOIN {$this->wpdb->posts} AS p
				ON p.ID = iclptr.element_id
			LEFT JOIN {$this->wpdb->postmeta} AS tpm
				ON tpm.post_id = iclptr.element_id
				AND tpm.meta_key = '" . self::FIELD_TEMPORARY_CONNECT_RELATED_PRODUCTS . "'
				AND tpm.meta_value IS NULL
			WHERE iclptr.element_type LIKE 'post_%'
			HAVING (
				upsells IS NOT NULL
				OR crosssells IS NOT NULL
				OR children IS NOT NULL
			)
			ORDER BY iclptr.element_id ASC
			",
			$limit
		);
	}

	public static function getTemporaryPostFields() {
		return [
			self::FIELD_TEMPORARY_CONNECT_RELATED_PRODUCTS,
		];
	}
}
