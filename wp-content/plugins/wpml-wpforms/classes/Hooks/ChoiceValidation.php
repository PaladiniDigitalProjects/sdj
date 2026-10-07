<?php

namespace WPML\Forms\WPForms\Hooks;

class ChoiceValidation {

	const CHOICE_FIELD_TYPES = [ 'radio', 'select', 'checkbox', 'gdpr-checkbox' ];

	private $originalForms = [];

	public function addHooks() {
		add_filter( 'wpforms_field_choices_allow_unknown_value', [ $this, 'allowOriginalChoiceValues' ], 10, 4 );
		add_filter( 'wpforms_process_filter', [ $this, 'restoreBlankChoiceValues' ], 10, 3 );
	}

	public function allowOriginalChoiceValues( $allow, $fieldSubmit, array $field, array $formData ) {
		if ( $allow ) {
			return true;
		}

		$formId  = isset( $formData['id'] ) ? (int) $formData['id'] : 0;
		$fieldId = isset( $field['id'] ) ? (int) $field['id'] : 0;

		if ( ! $formId || ! $fieldId ) {
			return $allow;
		}

		$originalField = $this->getOriginalField( $formId, $fieldId );
		if ( ! $originalField ) {
			return $allow;
		}

		return $this->isSubmissionAllowedByOriginalChoices( $fieldSubmit, $originalField );
	}

	public function restoreBlankChoiceValues( array $fields, array $entry, array $formData ): array {
		$formId = isset( $formData['id'] ) ? (int) $formData['id'] : 0;
		if ( ! $formId ) {
			return $fields;
		}

		foreach ( $fields as $fieldId => &$field ) {
			if ( ! is_array( $field ) ) {
				continue;
			}

			if ( ! in_array( $field['type'] ?? '', self::CHOICE_FIELD_TYPES, true ) ) {
				continue;
			}

			if ( ( $field['value'] ?? '' ) !== '' || ( $field['value_raw'] ?? '' ) !== '' ) {
				continue;
			}

			$submitted = $entry['fields'][ $fieldId ] ?? '';
			if ( $this->isEmptyItem( $submitted ) || $submitted === [] ) {
				continue;
			}

			$originalField = $this->getOriginalField( $formId, (int) $fieldId );
			if ( ! $originalField || ! $this->isSubmissionAllowedByOriginalChoices( $submitted, $originalField ) ) {
				continue;
			}

			if ( is_array( $submitted ) ) {
				$items = array_filter( $submitted, [ $this, 'isNonOtherItem' ], ARRAY_FILTER_USE_BOTH );
				$items = array_map( 'sanitize_text_field', array_values( $items ) );

				$field['value']     = implode( "\n", $items );
				$field['value_raw'] = '';
			} else {
				$value = sanitize_text_field( (string) $submitted );

				$field['value']     = $value;
				$field['value_raw'] = $value;
			}
		}
		unset( $field );

		return $fields;
	}

	private function isNonOtherItem( $item, $key ): bool {
		return $key !== 'other' && ! $this->isEmptyItem( $item );
	}

	private function getOriginalField( int $formId, int $fieldId ) {
		if ( ! array_key_exists( $formId, $this->originalForms ) ) {
			$content = get_post_field( 'post_content', $formId, 'raw' );
			$data    = $content ? json_decode( $content, true ) : null;

			$this->originalForms[ $formId ] = is_array( $data ) ? $data : null;
		}

		$data = $this->originalForms[ $formId ];

		if ( ! $data || empty( $data['fields'][ $fieldId ] ) ) {
			return null;
		}

		return $data['fields'][ $fieldId ];
	}

	private function isSubmissionAllowedByOriginalChoices( $fieldSubmit, array $originalField ): bool {
		if ( empty( $originalField['choices'] ) || ! is_array( $originalField['choices'] ) ) {
			return false;
		}

		$allowlist = $this->buildOriginalAllowlist( $originalField );
		$hasOther  = $this->hasOtherChoice( $originalField );

		if ( is_array( $fieldSubmit ) && array_key_exists( 'other', $fieldSubmit ) ) {
			if ( ! $hasOther ) {
				return false;
			}
			foreach ( $fieldSubmit as $key => $item ) {
				if ( $key === 'other' ) {
					continue;
				}
				if ( ! $this->isEmptyItem( $item ) && ! in_array( trim( (string) $item ), $allowlist, true ) ) {
					return false;
				}
			}
			return true;
		}

		$items = is_array( $fieldSubmit ) ? $fieldSubmit : [ $fieldSubmit ];
		foreach ( $items as $item ) {
			if ( ! $this->isEmptyItem( $item ) && ! in_array( trim( (string) $item ), $allowlist, true ) ) {
				return false;
			}
		}

		return true;
	}

	private function buildOriginalAllowlist( array $originalField ): array {
		$allowlist  = [];
		$showValues = ! empty( $originalField['show_values'] );

		foreach ( $originalField['choices'] as $key => $choice ) {
			if ( $showValues && isset( $choice['value'] ) && $choice['value'] !== '' ) {
				$allowlist[] = trim( $choice['value'] );
			} elseif ( ! $showValues && isset( $choice['label'] ) && $choice['label'] !== '' ) {
				$allowlist[] = trim( $choice['label'] );
			} else {
				$allowlist[] = trim( sprintf( esc_html__( 'Choice %s', 'wpforms-lite' ), $key ) );
			}
		}

		return $allowlist;
	}

	private function hasOtherChoice( array $originalField ): bool {
		foreach ( $originalField['choices'] as $choice ) {
			if ( ! empty( $choice['other'] ) ) {
				return true;
			}
		}
		return false;
	}

	private function isEmptyItem( $item ): bool {
		return $item === '' || $item === null;
	}
}
