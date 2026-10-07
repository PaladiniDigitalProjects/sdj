<?php

namespace WPML\Forms\WPForms\Addons;

use WPML\Forms\Hooks\Base;

class SurveyAndPolls extends Base {

	public function addHooks() {
		
		add_filter( 'wpforms_surveys_reporting_fields_get_survey_field_data', [ $this, 'apply_form_result_translation' ], 10, 2 );
		add_filter( 'wpforms_surveys_polls_display_results_choices', [ $this, 'apply_form_result_choices_translation' ], 10, 3 );
	}

	public function apply_form_result_translation( $data, $form_id ) {

		$package = $this->newPackage( $form_id );

		if ( $this->notEmpty( 'question', $data ) ) {
			
			$data['question'] = $package->translateString( $data['question'], strval( $this->getId( $data ) ), 'label' );
		}

		if ( $this->notEmpty( 'answers', $data ) ) {
			$i = 0;
			foreach ( $data['answers'] as &$answer ) {
				if ( ! isset( $answer['choice_id'] ) ) {
					continue;
				}
				$string_name     = $this->getLabelOptionName( $this->getId( $data ) );
				$answer['value'] = $package->translateString( $answer['value'], strval( $answer['choice_id'] ), $string_name );

				if ( $this->notEmpty( 'chart', $data ) ) {
					
					$data['chart']['labels'][ $i ] = $answer['value'];
				}

				$i ++;
			}
		}

		return $data;
	}

	public function apply_form_result_choices_translation( $choices, $field_id, $form_id ) {

		$package = $this->newPackage( $form_id );

		foreach ( $choices as $key => &$choice ) {

			$string_name     = $this->getLabelOptionName( $field_id );
			$choice['label'] = $package->translateString( $choice['label'], strval( $key ),  $string_name );
		}

		return $choices;
	}

	private function getLabelOptionName( $fieldId ) {
		return 'label-' . $fieldId . '-option';
	}

}