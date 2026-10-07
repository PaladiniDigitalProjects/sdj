<?php

namespace WPML\Import\Integrations\WooCommerce;

use WPML\Import\Fields;
use WPML\Import\Helper\Language;
use WPML\FP\Lst;

abstract class ImportHooks implements \IWPML_Action {

	const SKU_PLACEHOLDER          = '_wpml_import_sku_%s_%s';
	const SKU_PLACEHOLDER_PREFIX   = '_wpml_import_sku_';
	const TRANSLATION_SKU_META_KEY = '_wpml_import_wc_translation_sku';
	const SKU_META_KEY             = '_sku';
	const ORIGINAL_ID_META_KEY     = '_original_id';

	const PRODUCT_IMPORTING_STATUS = 'importing';

	public const COLUMN_ID               = 'id';
	public const COLUMN_SKU              = 'sku';
	public const COLUMN_PARENT           = 'parent_id';
	public const COLUMN_GROUPED_PRODUCTS = 'grouped_products';
	public const COLUMN_UPSELLS          = 'upsell_ids';
	public const COLUMN_CROSS_SELLS      = 'cross_sell_ids';

	public const MAPPED_META_PREFIX = 'meta:';

	private $importRawData;

	private $importKeys;

	private $importMappedKeys;

	private $importIndexes;

	private $importRow;

	private $importValues;

	abstract public function add_hooks();

	protected function setImportRowData( $translationGroup, $language, $wcProductCsvImporter ) {
		$this->setImportData( $wcProductCsvImporter );
		$this->setImportRow( $translationGroup, $language );
		$this->setimportValues();
	}

	private function setImportData( $wcProductCsvImporter ) {
		if ( null !== $this->importIndexes ) {
			return;
		}
		$this->importRawData    = $wcProductCsvImporter->get_raw_data();
		$this->importKeys       = $wcProductCsvImporter->get_raw_keys();
		$this->importMappedKeys = $wcProductCsvImporter->get_mapped_keys();
		$this->importIndexes    = $this->getImportFieldDefaults();
		$callback               = function ( &$value, $key ) {
			$value = $this->findColumnIndex( $key );
		};
		array_walk( $this->importIndexes, $callback );
	}

	private function findColumnIndex( $key ) {
		$mappedIndex = $this->searchHeaders(
			$this->importMappedKeys,
			[ $key, self::MAPPED_META_PREFIX . $key ]
		);

		if ( false !== $mappedIndex ) {
			return $mappedIndex;
		}

		$candidates = array_merge(
			[ $key, ExportHooks::getFieldLabel( $key ) ],
			$this->getColumnLabels( $key )
		);

		return $this->searchHeaders(
			array_map( 'strtolower', $this->importKeys ),
			array_map( 'strtolower', $candidates )
		);
	}

	private function getColumnLabels( $key ) {
		$labels = [
			self::COLUMN_ID               => [ 'ID', __( 'ID', 'woocommerce' ) ],
			self::COLUMN_SKU              => [ 'SKU', __( 'SKU', 'woocommerce' ) ],
			self::COLUMN_PARENT           => [ 'Parent', __( 'Parent', 'woocommerce' ) ],
			self::COLUMN_GROUPED_PRODUCTS => [ 'Grouped products', __( 'Grouped products', 'woocommerce' ) ],
			self::COLUMN_UPSELLS          => [ 'Upsells', __( 'Upsells', 'woocommerce' ) ],
			self::COLUMN_CROSS_SELLS      => [ 'Cross-sells', __( 'Cross-sells', 'woocommerce' ) ],
		];

		return $labels[ $key ] ?? [];
	}

	private function searchHeaders( array $headers, array $candidates ) {
		foreach ( $candidates as $candidate ) {
			$index = array_search( $candidate, $headers, true );
			if ( false !== $index ) {
				return $index;
			}
		}

		return false;
	}

	private function getImportFieldDefaults() {
		return [
			self::COLUMN_ID               => false,
			self::COLUMN_SKU              => false,
			self::COLUMN_PARENT           => false,
			self::COLUMN_GROUPED_PRODUCTS => false,
			self::COLUMN_UPSELLS          => false,
			self::COLUMN_CROSS_SELLS      => false,
			Fields::LANGUAGE_CODE         => false,
			Fields::TRANSLATION_GROUP     => false,
		];
	}

	private function setImportRow( $translationGroup, $language ) {
		if (
			false === $this->importIndexes[ Fields::TRANSLATION_GROUP ]
			|| false === $this->importIndexes[ Fields::LANGUAGE_CODE ]
		) {
			return;
		}

		$this->importRow = Lst::find(
			function ( $row ) use ( $translationGroup, $language ) {
				return (
					$row[ $this->importIndexes[ Fields::TRANSLATION_GROUP ] ] === $translationGroup
					&& $row[ $this->importIndexes[ Fields::LANGUAGE_CODE ] ] === $language
				);
			},
			$this->importRawData
		);
	}

	private function setimportValues() {
		$this->importValues = $this->getImportFieldDefaults();

		if ( ! $this->importRow ) {
			return;
		}

		$callback = function ( &$value, $key ) {
			$importIndex = $this->importIndexes[ $key ];
			if ( false !== $importIndex ) {
				$value = $this->importRow[ $importIndex ];
			}
		};
		array_walk( $this->importValues, $callback );
	}

	protected function hasImportRow() {
		return (bool) $this->importRow;
	}

	protected function getImportValue( $key ) {
		return $this->importValues[ $key ] ?? false;
	}

	protected function getMetaValue( $data, $key ) {
		$match = Lst::find(
			function ( $item ) use ( $key ) {
				return $key === $item['key'];
			},
			$data
		);

		return $match['value'] ?? '';
	}

	protected function getRelativeFields() {
		return [
			'parent_id' => self::COLUMN_PARENT,
		];
	}

	protected function getRelativeCommaFields() {
		return [
			'children'       => self::COLUMN_GROUPED_PRODUCTS,
			'upsell_ids'     => self::COLUMN_UPSELLS,
			'cross_sell_ids' => self::COLUMN_CROSS_SELLS,
		];
	}

	protected function manageRelatedProducts( $data, $language ) {
		$relativeFields = $this->getRelativeFields();
		array_walk(
			$relativeFields,
			function ( $keyInCsv, $keyInData ) use ( &$data, $language ) {
				if ( $this->hasRelatedFieldValue( $keyInCsv ) ) {
					$data[ $keyInData ] = $this->manageSimpleRelatedProduct( $this->importValues[ $keyInCsv ], $language, $data[ $keyInData ] );
				}
			}
		);

		$relativeCommaFields = $this->getRelativeCommaFields();
		array_walk(
			$relativeCommaFields,
			function ( $keyInCsv, $keyInData ) use ( &$data, $language ) {
				if ( $this->hasRelatedFieldValue( $keyInCsv ) ) {
					$data[ $keyInData ] = array_filter( $this->manageMultipleRelatedProducts( $this->importValues[ $keyInCsv ], $language, $data[ $keyInData ] ) );
				}
			}
		);

		return $data;
	}

	private function hasRelatedFieldValue( $fieldKey ) {
		if (
			array_key_exists( $fieldKey, $this->importValues )
			&& $this->importValues[ $fieldKey ]
		) {
			return true;
		}
		return false;
	}

	abstract protected function manageSimpleRelatedProduct( $originalValue, $language, $processedValue );

	protected function manageMultipleRelatedProducts( $value, $language, $processedValues ) {
		$values = $this->explodeRelatedCommaField( $value );
		if ( count( $values ) !== count( $processedValues ) ) {
			return $processedValues;
		}
		$callback = function ( &$value, $key ) use ( $language, $processedValues ) {
			$value = $this->manageSimpleRelatedProduct( $value, $language, $processedValues[ $key ] );
		};
		array_walk( $values, $callback );

		return $values;
	}

	private function explodeRelatedCommaField( $value ) {
		$value  = str_replace( '\\,', '::separator::', $value );
		$values = explode( ',', $value );

		return array_map(
			function ( $item ) {
				return trim( str_replace( '::separator::', ',', $item ) );
			},
			$values
		);
	}

	protected function shouldUpdateRelatedFieldValue( $fieldValue ) {
		if ( 0 !== strpos( $fieldValue, 'id:' ) ) {
			return true;
		}

		return false;
	}

	protected function getProductIdBySkuAndLanguage( $sku, $language ) {
		return Language::switchAndRun(
			$language,
			function () use ( $sku ) {
				$args    = [
					'post_type'              => [
						'product',
						'product_variation',
					],
					'meta_query'             => [
						[
							'key'   => self::SKU_META_KEY,
							'value' => $sku,
						],
					],
					'posts_per_page'         => 1,
					'cache_results'          => false,
					'update_post_meta_cache' => false,
					'update_post_term_cache' => false,
					'fields'                 => 'ids',
				];
				$query   = new \WP_Query( $args );
				$results = $query->posts;

				return $results[0] ?? 0;
			}
		);
	}
}
