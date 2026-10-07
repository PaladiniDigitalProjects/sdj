<?php

namespace WPML\Import\Integrations\WPAllExport;

use WPML\FP\Just;
use WPML\FP\Logic;
use WPML\FP\Obj;
use WPML\LIB\WP\Hooks;
use WPML\FP\Str;
use WPML\Import\Fields as ImportFields;
use WPML\Import\Integrations\Base\Fields;

use function WPML\FP\pipe;
use function WPML\FP\spreadArgs;

class PrepareFieldsHooks implements \IWPML_Backend_Action, \IWPML_DIC_Action {
	use Fields;

	const REGISTER_FIELDS_PRIORITY = 11;

	private $woocommerce_wpml;

	private $cachedImportFields = null;

	public function __construct( ?\woocommerce_wpml $woocommerce_wpml = null ) {
		$this->woocommerce_wpml = $woocommerce_wpml;
	}

	public function add_hooks() {
		Hooks::onAction( 'pmxe_init_addons' )->then( [ $this, 'initMetaFields' ] );
	}

	public function initMetaFields() {
		Hooks::onFilter( 'wp_all_export_available_data', self::REGISTER_FIELDS_PRIORITY )
			->then( spreadArgs( [ $this, 'registerMetaFields' ] ) );
	}

	private function canRegisterMetaFields( $availableData ) {
		$hasFieldTypeStartingWithPostOrTerm = pipe(
			Obj::prop( 'type' ),
			Logic::anyPass(
				[
					Str::startsWith( 'post_' ),
					Str::startsWith( 'term_' ),
				]
			)
		);

		return (bool) wpml_collect( (array) Obj::prop( 'default_fields', $availableData ) )
			->first( $hasFieldTypeStartingWithPostOrTerm );
	}

	public function registerMetaFields( $availableData ) {
		if ( ! $this->canRegisterMetaFields( $availableData ) ) {
			return $availableData;
		}

		$initGroupArray = function ( $availableData, $group ) {
			if (
				! array_key_exists( $group, $availableData )
				|| ! is_array( $availableData[ $group ] )
			) {
				$availableData[ $group ] = [];
			}

			return $availableData;
		};

		$addFieldDefinitionsToGroup = function ( $group ) use ( $initGroupArray ) {
			return function ( $availableData ) use ( $group, $initGroupArray ) {
				$availableData = $initGroupArray( $availableData, $group );

				foreach ( $this->getImportFields() as $field ) {
					$availableData[ $group ][] = [
						'label' => $field,
						'name'  => $field,
						'type'  => 'cf',
						'auto'  => true,
					];
				}

				return $availableData;
			};
		};

		$addFieldKeysToGroup = function ( $group ) use ( $initGroupArray ) {
			return function ( $availableData ) use ( $group, $initGroupArray ) {
				$availableData = $initGroupArray( $availableData, $group );

				$availableData[ $group ] = array_unique(
					array_merge( $availableData[ $group ], $this->getImportFields() )
				);

				return $availableData;
			};
		};

		return Just::of( $availableData )
			->map( $addFieldDefinitionsToGroup( 'init_fields' ) )
			->map( $addFieldDefinitionsToGroup( 'default_fields' ) )
			->map( $addFieldKeysToGroup( 'existing_meta_keys' ) )
			->get();
	}

	private function getImportFields() {
		if ( null === $this->cachedImportFields ) {
			$this->cachedImportFields = array_merge(
				[
					ImportFields::LANGUAGE_CODE,
					ImportFields::SOURCE_LANGUAGE_CODE,
					ImportFields::TRANSLATION_GROUP,
				],
				$this->getMulticurrencyFields()
			);
		}
		return $this->cachedImportFields;
	}

	private function getMulticurrencyFields() {
		if ( ! $this->woocommerce_wpml || ! $this->woocommerce_wpml->multi_currency ) {
			return [];
		}

		$currencies = array_keys( $this->woocommerce_wpml->multi_currency->get_currencies() );
		if ( empty( $currencies ) ) {
			return [];
		}

		$fields = [ '_wcml_custom_prices_status' ];

		foreach ( $currencies as $currency ) {
			$fields[] = '_price_' . $currency;
			$fields[] = '_regular_price_' . $currency;
			$fields[] = '_sale_price_' . $currency;
			$fields[] = '_sale_price_dates_from_' . $currency;
			$fields[] = '_sale_price_dates_to_' . $currency;
			$fields[] = '_wcml_schedule_' . $currency;
		}

		return $fields;
	}
}
