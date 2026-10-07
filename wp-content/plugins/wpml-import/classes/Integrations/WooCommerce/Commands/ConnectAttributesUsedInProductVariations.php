<?php

namespace WPML\Import\Integrations\WooCommerce\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\Command;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Commands\Base\TemporaryTermFields;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Fields;
use WPML\Import\Helper\Taxonomies;

class ConnectAttributesUsedInProductVariations implements Command, TemporaryTermFields {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 100;

	const FIELD_TEMPORARY_ATTEMPT_RECONNECT_ATTRIBUTE = '_wpml_import_attempt_reconnect_wc_attribute';

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Linking Product Attribute Translations', 'wpml-import' );
	}

	public static function getDescription() {
		/* translators: Description of the "Linking Product Attribute Translations" import step, shown under the step name; "their" refers to the product attributes. */
		return __( 'Connecting product attributes to their translations based on associated product variations.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		$sql = $this->getQuery( 'COUNT(*)' );
		if ( null === $sql ) {
			return 0;
		}

		return (int) $this->wpdb->get_var( $sql );
	}

	public function run( ?Collection $args = null ) {
		$pendingBefore   = $this->countPendingItems();
		$defaultLanguage = $this->sitepress->get_default_language();

		foreach ( $this->getPendingItemGroups( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) ) as $groupedItems ) {
			if ( isset( $groupedItems[ $defaultLanguage ] ) ) {
				$originalAttribute = $groupedItems[ $defaultLanguage ];
			} else {
				$originalAttribute = reset( $groupedItems );
			}

			foreach ( $groupedItems as $attribute ) {
				add_term_meta( $attribute->attribute_term_id, self::FIELD_TEMPORARY_ATTEMPT_RECONNECT_ATTRIBUTE, 1, true );

				if ( $attribute->attribute_ttid === $originalAttribute->attribute_ttid ) {
					continue;
				}

				$this->sitepress->set_element_language_details(
					$attribute->attribute_ttid,
					'tax_pa_' . $attribute->attribute_name,
					$originalAttribute->attribute_trid,
					$attribute->attribute_language_code,
					$originalAttribute->attribute_source_language_code
				);
			}
		}

		return max( 0, $pendingBefore - $this->countPendingItems() );
	}

	private function getPendingItems( $limit = null ) {
		$sql = $this->getQuery(
			"
			tt.term_taxonomy_id AS attribute_ttid,
			tt.term_id AS attribute_term_id,
			REPLACE( pmattr.meta_key, 'attribute_pa_', '' ) AS attribute_name,
			pmattr.meta_value AS attribute_value,
			ptr.trid AS product_trid,
			atr.trid AS attribute_trid,
			atr.language_code AS attribute_language_code,
			atr.source_language_code AS attribute_source_language_code
			",
			$limit,
			'ptr.trid ASC, atr.language_code ASC, tt.term_taxonomy_id ASC'
		);
		if ( null === $sql ) {
			return [];
		}

		return (array) $this->wpdb->get_results( $sql );
	}

	private function getQuery( $fields, $limit = null, $order = null ) {
		$translatableTaxTypes = Taxonomies::getTranslatable( true );
		if ( empty( $translatableTaxTypes ) ) {
			return null;
		}

		$sql = "
			SELECT {$fields}
			FROM {$this->wpdb->postmeta} AS pmattr
			LEFT JOIN {$this->wpdb->terms} AS t
				ON t.slug = pmattr.meta_value
			LEFT JOIN {$this->wpdb->term_taxonomy} AS tt
				ON tt.term_id = t.term_id AND tt.taxonomy = CONCAT( 'pa_', REPLACE( pmattr.meta_key, 'attribute_pa_', '' ) )
			LEFT JOIN {$this->wpdb->termmeta} AS tm
				ON tm.term_id = tt.term_id AND tm.meta_key = '" . self::FIELD_TEMPORARY_ATTEMPT_RECONNECT_ATTRIBUTE . "'
			LEFT JOIN {$this->wpdb->posts} AS p
				ON p.ID = pmattr.post_id
			LEFT JOIN {$this->wpdb->postmeta} AS pm
				ON pm.post_id = p.ID AND pm.meta_key = '" . Fields::TRANSLATION_GROUP . "'
			LEFT JOIN {$this->wpdb->prefix}icl_translations AS ptr
				ON ptr.element_id = p.ID AND ptr.element_type = 'post_product_variation'
			LEFT JOIN {$this->wpdb->prefix}icl_translations AS atr
				ON atr.element_id = tt.term_taxonomy_id AND atr.element_type = CONCAT( 'tax_pa_', REPLACE( pmattr.meta_key, 'attribute_pa_', '' ) )
			WHERE p.post_type = 'product_variation'
				AND pm.meta_value IS NOT NULL
				AND atr.source_language_code IS NULL
				AND tm.meta_value IS NULL
				AND atr.element_type IN(" . wpml_prepare_in( $translatableTaxTypes ) . ")
				AND pmattr.meta_key LIKE '" . $this->wpdb->esc_like( 'attribute_pa_' ) . "%'
		";

		if ( $order ) {
			$sql .= " ORDER BY {$order}";
		}

		$limit = (int) $limit;
		if ( $limit > 0 ) {
			$sql .= ' LIMIT ' . $limit;
		}

		return $sql;
	}

	private function getPendingItemGroups( $limit ) {
		$activeLanguages = $this->sitepress->get_active_languages();
		$limit           = max( 1, (int) $limit, count( $activeLanguages ) );

		$items    = $this->getPendingItems( $limit + 1 );
		$sentinel = $this->extractSentinelItem( $items, $limit );

		$itemsGroups = [];

		foreach ( $items as $item ) {
			if ( ! array_key_exists( $item->product_trid, $itemsGroups ) ) {
				$itemsGroups[ $item->product_trid ] = [];
			}

			$itemsGroups[ $item->product_trid ][ $item->attribute_language_code ] = $item;
		}

		return $this->removeIncompleteLastGroup( $itemsGroups, $sentinel );
	}

	private function extractSentinelItem( array &$items, $limit ) {
		if ( count( $items ) <= $limit ) {
			return null;
		}

		return array_pop( $items );
	}

	private function removeIncompleteLastGroup( array $itemsGroups, $sentinel ) {
		if ( ! $sentinel || empty( $itemsGroups ) || count( $itemsGroups ) <= 1 ) {
			return $itemsGroups;
		}

		end( $itemsGroups );
		$lastProductTrid = key( $itemsGroups );
		reset( $itemsGroups );

		if ( (string) $lastProductTrid === (string) $sentinel->product_trid ) {
			array_pop( $itemsGroups );
		}

		return $itemsGroups;
	}

	public static function getTemporaryTermFields() {
		return [
			self::FIELD_TEMPORARY_ATTEMPT_RECONNECT_ATTRIBUTE,
		];
	}
}
