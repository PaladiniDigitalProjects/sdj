<?php

namespace WPML\Forms\WPForms\Hooks\ATE;

use WPML\FP\Lst;
use WPML\FP\Obj;
use WPML\FP\Str;
use function WPML\FP\pipe;

class AteFieldReorder {

	private $fieldsOrder;

	private $adjuster;

	public function __construct( array $formData, AteFieldAdjuster $adjuster ) {
		$this->adjuster    = $adjuster;
		$this->fieldsOrder = array_flip( array_keys( $formData['fields'] ) );
	}

	public function handle( array $fields ) : array {
		$getFieldId = Obj::path( [ 'attributes', 'id' ] );

		$isSettingField   = pipe( $getFieldId, [ $this->adjuster, 'isSettingField' ] );
		$isGeneralSetting = pipe( $getFieldId, Str::startsWith( AteFieldAdjuster::NAME_PART_SETTING ) );

		list( $settingFields, $formFields ) = Lst::partition( $isSettingField, $fields );

		list( $generalSettings, $confirmationsAndNotifications ) = Lst::partition( $isGeneralSetting, $settingFields );

		$orderedFormFields = $this->orderFormFields( $formFields );
		return Lst::concat(
			$orderedFormFields,
			$generalSettings,
			$confirmationsAndNotifications
		);
	}

	private function orderFormFields( array $fields ) : array {
		$getStringName = Obj::path( [ 'attributes', 'id' ] );

		$removeSortHelper = Obj::without( '__sort_helper' );
		$addSortHelper    = function ( array $field, int $index ) use ( $getStringName ) {
			$item  = $getStringName( $field );
			$id    = (int) ( Str::match( '/(\d+)/', $item )[0] ?? 0 );
			$parts = explode( '-', $item );

			return Obj::assoc(
				'__sort_helper',
				[
					'id'             => $id,
					'parts_length'   => count( $parts ),
					'original_index' => $index,
				],
				$field
			);
		};

		$getFieldId       = Obj::path( [ '__sort_helper', 'id' ] );
		$getPartsLength   = Obj::path( [ '__sort_helper', 'parts_length' ] );
		$getOriginalIndex = Obj::path( [ '__sort_helper', 'original_index' ] );
		$sorter           = function ( $a, $b ) use ( $getStringName, $getFieldId, $getPartsLength, $getOriginalIndex ) {
			if ( $getFieldId( $a ) === $getFieldId( $b ) ) {
				$aPartsLength = $getPartsLength( $a );
				$bPartsLength = $getPartsLength( $b );

				if ( $aPartsLength !== $bPartsLength ) {
					return $aPartsLength - $bPartsLength;
				}

				$isLabelA = Str::startsWith( 'label', $getStringName( $a ) );
				$isLabelB = Str::startsWith( 'label', $getStringName( $b ) );

				if ( $isLabelA && ! $isLabelB ) {
					return -1;
				} elseif ( ! $isLabelA && $isLabelB ) {
					return 1;
				}

				return $getOriginalIndex( $a ) - $getOriginalIndex( $b );
			}

			$orderA    = $this->fieldsOrder[ $getFieldId( $a ) ] ?? PHP_INT_MAX;
			$orderB    = $this->fieldsOrder[ $getFieldId( $b ) ] ?? PHP_INT_MAX;
			$orderDiff = $orderA - $orderB;

			return 0 !== $orderDiff ? $orderDiff : ( $getOriginalIndex( $a ) - $getOriginalIndex( $b ) );
		};

		$indexed = [];
		foreach ( $fields as $i => $field ) {
			$indexed[] = $addSortHelper( $field, $i );
		}

		usort( $indexed, $sorter );

		return array_map( $removeSortHelper, $indexed );
	}
}
