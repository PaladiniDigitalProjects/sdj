<?php

namespace WPML\Import\Integrations\WooCommerce;

use WPML\Import\Fields;
use WPML\Import\Integrations\WooCommerce\Fields as WooCommerceFields;
use WPML\LIB\WP\Hooks;

use function WPML\FP\spreadArgs;

class ExportHooks implements \IWPML_Action {

	const META_KEY_PREFIX = 'meta:';

	private $sitepress;

	public function __construct( \SitePress $sitepress ) {
		$this->sitepress = $sitepress;
	}

	public function add_hooks() {
		Hooks::onFilter( 'woocommerce_product_export_column_names' )
			->then( spreadArgs( [ $this, 'addLanguageColumnsToExport' ] ) );

		Hooks::onFilter( 'woocommerce_product_export_row_data', 10, 2 )
			->then( spreadArgs( [ $this, 'addLanguageInfoToExport' ] ) );
	}

	public function addLanguageColumnsToExport( $columnNames ) {
		return array_merge(
			$columnNames,
			[
				self::getFieldId( Fields::TRANSLATION_GROUP ) => self::getFieldLabel( Fields::TRANSLATION_GROUP ),
				self::getFieldId( Fields::LANGUAGE_CODE ) => self::getFieldLabel( Fields::LANGUAGE_CODE ),
				self::getFieldId( Fields::SOURCE_LANGUAGE_CODE ) => self::getFieldLabel( Fields::SOURCE_LANGUAGE_CODE ),
				self::getFieldId( WooCommerceFields::LOCAL_ATTRIBUTE_LABELS ) => self::getFieldLabel( WooCommerceFields::LOCAL_ATTRIBUTE_LABELS ),
			]
		);
	}

	public function addLanguageInfoToExport( $row, $product ) {
		$element = $this->sitepress->get_element_language_details( $product->get_id(), 'post_' . $product->post_type );

		if ( $element ) {
			$row = array_merge(
				$row,
				[
					self::getFieldId( Fields::TRANSLATION_GROUP )                 => $element->trid,
					self::getFieldId( Fields::LANGUAGE_CODE )                     => $element->language_code,
					self::getFieldId( Fields::SOURCE_LANGUAGE_CODE )              => $element->source_language_code,
					self::getFieldId( WooCommerceFields::LOCAL_ATTRIBUTE_LABELS ) => $this->getAttributeLabels( $product, $element ),
				]
			);
		}

		return $row;
	}

	private function getAttributeLabels( $product, $element ) {
		$attrLabelTranslations = get_post_meta( $product->get_id(), 'attr_label_translations', true );
		if ( ! is_array( $attrLabelTranslations ) || empty( $attrLabelTranslations[ $element->language_code ] ) ) {
			return '';
		}

		$localAttributeLabels = $attrLabelTranslations[ $element->language_code ];

		return wp_json_encode( $localAttributeLabels ) ?: '';
	}

	public static function getFieldLabel( $field ) {
		$format = __( 'Meta: %s', 'woocommerce' );

		return sprintf( $format, $field );
	}

	private static function getFieldId( $field ) {
		return self::META_KEY_PREFIX . $field;
	}
}
