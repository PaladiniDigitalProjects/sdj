<?php

namespace WPML\Import\Integrations\WooCommerce\ImportHooks;

use WPML\Import\Fields;
use WPML\Import\Integrations\WooCommerce\ImportHooks;
use WPML\LIB\WP\Hooks;
use WPML\FP\Fns;

use function WPML\FP\spreadArgs;

class Create extends ImportHooks {

	public function add_hooks() {
		Hooks::onFilter( 'woocommerce_product_importer_parsed_data', 10, 2 )
			->then( spreadArgs( [ $this, 'prefixProductSku' ] ) );

		Hooks::onFilter( 'woocommerce_product_import_pre_insert_product_object', 10, 2 )
			->then( spreadArgs( [ $this, 'restoreProductSku' ] ) );
	}

	public function prefixProductSku( $data, $wcProductCsvImporter ) {
		$params = $wcProductCsvImporter->get_params();
		if ( $params['update_existing'] ) {
			return $data;
		}

		$originalSku = $data['sku'] ?? '';
		$metaData    = $data['meta_data'] ?? [];

		if ( empty( $metaData ) ) {
			return $data;
		}

		$language         = $this->getMetaValue( $metaData, Fields::LANGUAGE_CODE );
		$translationGroup = $this->getMetaValue( $metaData, Fields::TRANSLATION_GROUP );
		if ( empty( $language ) || empty( $translationGroup ) ) {
			return $data;
		}

		$existingId = $this->findExistingProductId( $originalSku, $language, $translationGroup );

		if ( $existingId ) {
			$data['id']        = $existingId;
			$data['meta_data'] = $this->removeWpmlImportMetaFields( $metaData );
			return $data;
		}

		$this->setImportRowData( $translationGroup, $language, $wcProductCsvImporter );

		if ( false === $this->hasImportRow() ) {
			return $data;
		}

		if ( empty( $originalSku ) ) {
			return $this->manageRelatedProducts( $data, $language );
		}

		$currentId  = $data['id'] ?? false;
		$originalId = $this->getImportValue( ImportHooks::COLUMN_ID );
		$newSku     = $this->prefixValue( $originalSku, $language );
		$existingId = $this->getProductIdBySkuMeta( $newSku );

		$data['sku'] = $newSku;
		$data        = $this->manageRelatedProducts( $data, $language );

		if ( $existingId ) {
			$data['id'] = $this->completeProduct( $existingId, $newSku, $originalSku, $originalId );
			if ( $existingId === $currentId ) {
				return $data;
			}
			$this->removeProductsBySkuMeta( $originalSku );
			return $data;
		}

		if ( $currentId && $originalId ) {
			$originalForCurrentId               = get_post_meta( $currentId, self::ORIGINAL_ID_META_KEY, true );
			$alreadyCompletedForAnotherLanguage = (bool) get_post_meta( $currentId, self::TRANSLATION_SKU_META_KEY, true );
			if ( $originalId === $originalForCurrentId && ! $alreadyCompletedForAnotherLanguage ) {
				$data['id'] = $this->completeProduct( $currentId, $newSku, $originalSku, $originalId );
				return $data;
			}
		}

		$data['id'] = $this->createProduct( $newSku, $originalSku, $originalId );
		return $data;
	}

	public function restoreProductSku( $obj, $data ) {
		$originalSku = $data['sku'] ?? '';
		$metaData    = $data['meta_data'] ?? [];
		if ( empty( $originalSku ) || empty( $metaData ) ) {
			return $obj;
		}
		if ( 0 !== strpos( $originalSku, self::SKU_PLACEHOLDER_PREFIX ) ) {
			return $obj;
		}

		$language = $this->getMetaValue( $metaData, Fields::LANGUAGE_CODE );
		if ( empty( $language ) ) {
			return $obj;
		}

		$setRestoredSku = function () use ( &$obj, $originalSku, $language ) {
			$restoredSku = str_replace(
				$this->prefixValue( '', $language ),
				'',
				$originalSku
			);
			$obj->set_sku( $restoredSku );
		};
		Hooks::callWithFilter( $setRestoredSku, 'wc_product_has_unique_sku', Fns::always( false ) );

		return $obj;
	}

	private function prefixValue( $value, $language ) {
		return sprintf( self::SKU_PLACEHOLDER, $language, $value );
	}

	private function completeProduct( $productId, $newSku, $originalSku, $originalId ) {
		$product = wc_get_product( $productId );
		if ( ! $product ) {
			return $productId;
		}

		global $wpdb;
		$wpdb->update(
			$wpdb->postmeta,
			[
				'meta_key'   => '_sku',
				'meta_value' => $newSku,
			],
			[
				'post_id'    => $productId,
				'meta_key'   => '_sku',
				'meta_value' => $originalSku,
			]
		);
		$insertMetaQuery  = "INSERT INTO {$wpdb->postmeta} (post_id, meta_key, meta_value ) VALUES ";
		$insertMetaQuery .= $wpdb->prepare(
			"( %d, %s, %s )",
			[ $productId, self::TRANSLATION_SKU_META_KEY, $newSku ]
		);
		$insertMetaQuery .= $wpdb->prepare(
			",( %d, %s, %s )",
			[ $productId, self::ORIGINAL_ID_META_KEY, $originalId ]
		);
		$wpdb->query( $insertMetaQuery );

		$product->read_meta_data( true );
		$product->apply_changes();

		return $productId;
	}

	private function createProduct( $newSku, $originalSku, $originalId = false ) {
		$product = wc_get_product_object( 'simple' );
		$product->set_name( 'Import placeholder for ' . $newSku );
		$product->set_status( self::PRODUCT_IMPORTING_STATUS );
		$product->set_sku( $newSku );
		if ( $originalId ) {
			$product->add_meta_data( self::ORIGINAL_ID_META_KEY, strval( $originalId ), true );
		}
		$product->add_meta_data( self::TRANSLATION_SKU_META_KEY, $newSku, true );
		$importedId = $product->save();
		$this->removeProductsBySkuMeta( $originalSku );
		return $importedId;
	}

	protected function manageSimpleRelatedProduct( $originalValue, $language, $processedValue ) {
		if ( ! $this->shouldUpdateRelatedFieldValue( $originalValue ) ) {
			return $processedValue;
		}
		$itemSku = $this->prefixValue( $originalValue, $language );
		$itemId  = $this->getProductIdBySkuMeta( $itemSku );
		if ( 0 !== $itemId ) {
			$this->removeProductsBySkuMeta( $originalValue );
			return $itemId;
		}
		$existingId = $this->getProductIdBySkuAndLanguage( $originalValue, $language );
		if ( 0 !== $existingId ) {
			return $existingId;
		}
		return $this->createProduct( $itemSku, $originalValue );
	}

	private function getProductIdBySkuMeta( $languageSku ) {
		global $wpdb;
		$productId = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = %s AND meta_value = %s LIMIT 1;", self::TRANSLATION_SKU_META_KEY, $languageSku ) );
		return (int) $productId;
	}

	private function findExistingProductId( $originalSku, $language, $translationGroup ) {
		if ( $originalSku ) {
			$skuMatchId = $this->getProductIdBySkuAndLanguage( $originalSku, $language );

			$isAssignedToTargetLanguageInWpml = $skuMatchId && $this->isProductInLanguage( $skuMatchId, $language );
			if ( $isAssignedToTargetLanguageInWpml ) {
				return $skuMatchId;
			}
		}

		$tridMatchId = $this->getProductIdByTranslationGroupAndLanguage( $translationGroup, $language );

		if ( $tridMatchId ) {
			$product = wc_get_product( $tridMatchId );

			$isNotWcAutoCreatedCsvPlaceholder = $product && self::PRODUCT_IMPORTING_STATUS !== $product->get_status();

			$isNotProductBeingImported = ! get_post_meta( $tridMatchId, Fields::TRANSLATION_GROUP, true );
			if ( $isNotWcAutoCreatedCsvPlaceholder && $isNotProductBeingImported ) {
				return $tridMatchId;
			}
		}

		return 0;
	}

	private function isProductInLanguage( $productId, $language ) {
		global $wpdb;
		return (bool) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT 1 FROM {$wpdb->prefix}icl_translations
					WHERE element_id = %d AND language_code = %s AND element_type LIKE %s
					LIMIT 1",
				$productId,
				$language,
				'post_product%'
			)
		);
	}

	private function getProductIdByTranslationGroupAndLanguage( $trid, $language ) {
		global $wpdb;
		$result = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT element_id FROM {$wpdb->prefix}icl_translations
					WHERE trid = %d AND language_code = %s AND element_type LIKE %s
					LIMIT 1",
				(int) $trid,
				$language,
				'post_product%'
			)
		);
		return (int) $result;
	}

	private function removeWpmlImportMetaFields( $metaData ) {
		$isKeyNotStartingWithWPMLImport = fn( $item ) => 0 !== strpos( $item['key'], '_wpml_import_' );

		return array_values( array_filter( $metaData, $isKeyNotStartingWithWPMLImport ) );
	}

	private function removeProductsBySkuMeta( $sku ) {
		global $wpdb;
		$products = $wpdb->get_col(
			$wpdb->prepare(
				"
					SELECT DISTINCT psku.post_id
					FROM {$wpdb->postmeta} AS psku
					LEFT JOIN {$wpdb->postmeta} AS tsku
					ON psku.post_id = tsku.post_id AND tsku.meta_key = %s
					WHERE psku.meta_key = %s
					AND psku.meta_value = %s
					AND tsku.meta_value IS NULL
					LIMIT 1
				",
				[
					self::TRANSLATION_SKU_META_KEY,
					self::SKU_META_KEY,
					$sku,
				]
			)
		);
		array_walk(
			$products,
			function ( $productId ) {
				$product = wc_get_product( $productId );
				if ( $product && self::PRODUCT_IMPORTING_STATUS === $product->get_status() ) {
					$product->delete( true );
				}
			}
		);
	}
}
