<?php

namespace WPML\Import\Integrations\WPImportExport;

use WPML\FP\Just;
use WPML\FP\Logic;
use WPML\FP\Obj;
use WPML\LIB\WP\Hooks;
use WPML\FP\Str;
use WPML\Import\Integrations\Base\Fields;
use WPML\Import\Integrations\Base\Languages;

use function WPML\FP\pipe;
use function WPML\FP\spreadArgs;

class PrepareFieldsHooks implements \IWPML_Backend_Action, \IWPML_DIC_Action {
	use Fields;
	use Languages;

	public function add_hooks() {
		Hooks::onFilter( 'wpie_pre_execute_post_query' )->then( spreadArgs( [ $this, 'includeAllLanguagesInQuery' ] ) );
		Hooks::onFilter( 'wpie_pre_execute_taxonomy_query' )->then( spreadArgs( [ $this, 'includeAllLanguagesInQuery' ] ) );
		Hooks::onFilter( 'wpie_export_fields' )->then( spreadArgs( [ $this, 'registerMetaFields' ] ) );
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

		return (bool) wpml_collect( (array) Obj::prop( 'data', Obj::prop( 'standard', $availableData ) ) )
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
			if ( ! array_key_exists( 'data', $availableData[ $group ] ) ) {
				$availableData[ $group ]['data'] = [];
			}

			return $availableData;
		};

		$addFieldDefinitionsToGroup = function ( $group ) use ( $initGroupArray ) {
			return function ( $availableData ) use ( $group, $initGroupArray ) {
				$availableData = $initGroupArray( $availableData, $group );

				foreach ( $this->getImportFields() as $field ) {
					$availableData[ $group ]['data'][] = [
						'name'      => $field,
						'type'      => 'wpie_cf',
						'metaKey'   => $field,
						'isDefault' => true,
					];
				}

				return $availableData;
			};
		};

		return Just::of( $availableData )
			->map( $addFieldDefinitionsToGroup( 'standard' ) )
			->map( $addFieldDefinitionsToGroup( 'meta' ) )
			->get();
	}
}
