<?php

namespace WPML\Forms\WPForms\Hooks;

use WPML\FP\Obj;
use WPML\LIB\WP\Hooks;
use function WPML\FP\spreadArgs;

class SubLabels {

	public function addHooks() {
		Hooks::onFilter( 'wpforms_save_form_args' )
			->then( spreadArgs( [ $this, 'addFieldSubLabels' ] ) );
		Hooks::onFilter( 'wpforms_field_properties_name', 10, 2 )
			->then( spreadArgs( [ $this, 'addSubLabelsTranslations' ] ) );
	}

	public function addSubLabelsTranslations( array $properties, array $field ) : array {
		if ( $this->hasSubLabels( $field ) ) {
			foreach ( [
				'first'  => 'first_label',
				'middle' => 'middle_label',
				'last'   => 'last_label',
			] as $key => $label ) {
				if ( Obj::prop( 'first_label', $field ) ) {
					$properties['inputs'][ $key ]['sublabel']['value'] = Obj::prop( $label, $field );
				}
			}
		}

		return $properties;
	}

	public function addFieldSubLabels( array $form ) : array {
		$formData = wpforms_decode( wp_unslash( $form['post_content'] ) );

		$addSubLabels = function( array $field ) : array {
			if ( $this->hasSubLabels( $field ) ) {
				$field['first_label']  = Obj::propOr( __( 'First', 'wpforms-lite' ), 'first_label', $field );
				$field['middle_label'] = Obj::propOr( __( 'Middle', 'wpforms-lite' ), 'middle_label', $field );
				$field['last_label']   = Obj::propOr( __( 'Last', 'wpforms-lite' ), 'last_label', $field );
			}

			return $field;
		};

		$formData['fields'] = wpml_collect( $formData['fields'] )
			->map( $addSubLabels )
			->all();

		return array_merge( $form, [ 'post_content' => wpforms_encode( $formData ) ] );
	}

	private function hasSubLabels( array $field ) : bool {
		return 'name' === $field['type'] && 'simple' !== $field['format'];
	}
}
