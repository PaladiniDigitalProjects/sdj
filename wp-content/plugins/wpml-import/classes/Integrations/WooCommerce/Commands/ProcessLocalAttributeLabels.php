<?php

namespace WPML\Import\Integrations\WooCommerce\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\Command;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\TemporaryPostFields;
use WPML\Import\Integrations\WooCommerce\Fields as WooCommerceFields;

class ProcessLocalAttributeLabels implements Command, TemporaryPostFields {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 100;


	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Importing Custom Attribute Labels', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Importing labels for product-specific (custom) attributes from the exported data.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$countProcessed = 0;
		$pendingItems   = $this->getPendingItems( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );

		foreach ( $pendingItems as $item ) {
			$this->processLocalAttributeLabels( $item );
			++$countProcessed;
		}

		return $countProcessed;
	}

	private function getPendingItems( $limit = null ) {
		$items = $this->getResultsWithLimit(
			"
			SELECT 
				p.ID as product_id,
				pm.meta_value as local_attribute_labels,
				icl.language_code
			FROM {$this->wpdb->posts} p
			INNER JOIN {$this->wpdb->postmeta} pm 
				ON p.ID = pm.post_id 
				AND pm.meta_key = '" . WooCommerceFields::LOCAL_ATTRIBUTE_LABELS . "'
			INNER JOIN {$this->wpdb->prefix}icl_translations icl 
				ON icl.element_id = p.ID 
				AND icl.element_type = 'post_product'
			WHERE p.post_type = 'product'
				AND pm.meta_value IS NOT NULL 
				AND pm.meta_value != ''
			ORDER BY p.ID ASC
			",
			$limit
		);

		return $items;
	}

	private function processLocalAttributeLabels( $item ) {
		$productId                = $item->product_id;
		$languageCode             = $item->language_code;
		$localAttributeLabelsJson = $item->local_attribute_labels;

		$localAttributeLabels = json_decode( $localAttributeLabelsJson, true );
		if ( ! is_array( $localAttributeLabels ) || empty( $localAttributeLabels ) ) {
			delete_post_meta( $productId, WooCommerceFields::LOCAL_ATTRIBUTE_LABELS );
			return;
		}

		$existingTranslations = get_post_meta( $productId, 'attr_label_translations', true );
		if ( ! is_array( $existingTranslations ) ) {
			$existingTranslations = [];
		}

		if ( ! isset( $existingTranslations[ $languageCode ] ) ) {
			$existingTranslations[ $languageCode ] = [];
		}

		foreach ( $localAttributeLabels as $attributeSlug => $translatedLabel ) {
			if ( ! empty( $translatedLabel ) ) {
				$existingTranslations[ $languageCode ][ $attributeSlug ] = $translatedLabel;
			}
		}

		update_post_meta( $productId, 'attr_label_translations', $existingTranslations );
	}

	public static function getTemporaryPostFields() {
		return [
			WooCommerceFields::LOCAL_ATTRIBUTE_LABELS,
		];
	}
}
