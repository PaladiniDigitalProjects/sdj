<?php

namespace WPML\Forms\WPForms\SharedAPI;

use WPForms_Conditional_Logic_Fields;
use WPML\Forms\WPForms\Helpers\Field;
use WPML\Forms\Hooks\Base;
use WPML\Forms\WPForms\SmartTag;
use WPML\FP\Fns;
use WPML\FP\Obj;
use WPML\FP\Lst;
use function WPML\FP\pipe;

class Notifications extends Base {

	const EMAIL_HTML_CONTEXT = 'email-html';

	public function addHooks() {
		add_filter( 'wpforms_process_before_form_data', [ $this, 'applyConfirmationTranslations' ] );
		add_filter( 'wpforms_emails_send_email_data', [ $this, 'applyEmailTranslations' ], 10, 2 );
		add_action( 'wpforms_email_send_after', [ $this, 'restoreLanguage' ] );
		add_filter( 'wpml_user_language', [ $this, 'getLanguageForEmail' ], 10, 2 );
		add_filter( 'wpforms_entry_email_data', [ $this, 'restoreFieldLabelsToDefaultLanguage' ], 10, 3 );

		add_filter( 'wpforms_html_field_value', [ $this, 'restoreRawValuesForHtmlEmail' ], 10, 4 );
		add_filter( 'wpforms_plaintext_field_value', [ $this, 'restoreRawValuesForNotifications' ], 10, 2 );

		if (
			class_exists( WPForms_Conditional_Logic_Fields::class )
			&& has_filter( 'wpforms_entry_email_process', [ WPForms_Conditional_Logic_Fields::instance(), 'process_notification_conditionals' ] )
		) {
			remove_filter( 'wpforms_entry_email_process', [ WPForms_Conditional_Logic_Fields::instance(), 'process_notification_conditionals' ], 10 );
			add_filter( 'wpforms_entry_email_process', [ $this, 'processNotificationConditionals' ], 10, 4 );
		}
	}

	public function restoreRawValuesForHtmlEmail( string $value, array $field, array $formData, string $context ) : string {
		if ( self::EMAIL_HTML_CONTEXT === $context ) {
			return $this->restoreRawValuesForNotifications( $value, $field );
		}

		return $value;
	}

	public function restoreRawValuesForNotifications( string $value, array $field ) : string {
		if (
			in_array( $field['type'], [ 'radio', 'select', 'checkbox' ], true )
			&& ! Field::isDynamic( $field )
		) {
			return Obj::propOr( $value, 'value_raw', $field );
		}

		return $value;
	}

	public function restoreFieldLabelsToDefaultLanguage( $fields, $entry, $formData ) {

		$formPost = wpforms()->get( 'form' )->get(
			$formData['id'],
			[ 'content_only' => true ]
		);

		$formPostFields   = $formPost['fields'];
		$translatedFields = $formData['fields'];
		$entryFields      = Obj::propOr( [], 'fields', $entry );

		foreach ( $fields as $key => &$field ) {
			$key = $this->decodeFieldKey( $key );

			$formPostField = $formPostFields[ $key ] ?? [];

			if ( isset( $formPostField['label'] ) ) {
				$field['name'] = $formPostField['label'];
			}

			if ( array_key_exists( $key, $entryFields ) ) {
				$field['value'] = $this->getFieldValue(
					$field,
					$entry['fields'][ $key ],
					$formPostField,
					Obj::propOr( [], $key, $translatedFields )
				);
			}
		}

		return $fields;
	}

	public function applyEmailTranslations( $data, $emails ) {
		$package = $this->newPackage( $this->getId( $emails->form_data ) );

		$email = is_array( $data['to'] ) ? reset( $data['to'] ) : $data['to'];
		do_action( 'wpml_switch_language_for_email', $email );

		$dataKeys = [ 'subject', 'message' ];
		$formPost = wpforms()->get( 'form' )->get(
			$emails->form_data['id'],
			[ 'content_only' => true ]
		);

		if ( $this->notEmpty( 'settings', $formPost ) ) {

			$formPost['settings'] = $package->translateFormSettings( $formPost['settings'] );
		}

		$current_notification = $formPost['settings']['notifications'][ $emails->notification_id ];

		$setData = function( $data, $key ) use ( $current_notification ) {
			if ( ! empty( $current_notification[ $key ] ) ) {
				$data[ $key ] = $current_notification[ $key ];
			}

			return $data;
		};

		foreach ( $dataKeys as $key ) {
			$data = $setData( $data, $key );
		}

		$data = SmartTag::process( $data, $formPost, $dataKeys );

		$translated = [ 'notifications' => [ $emails->notification_id => $data ] ];
		foreach ( $emails->fields as &$field ) {
			$field['name'] = $package->translateString( $field['name'], strval( $this->getId( $field ) ), 'label' );
		}

		return $translated['notifications'][ $emails->notification_id ];
	}

	public function restoreLanguage() {
		do_action( 'wpml_restore_language_from_email' );
	}

	public function applyConfirmationTranslations( $formData ) {

		$package = $this->newPackage( $this->getId( $formData ) );

		if (
			$this->notEmpty( 'settings', $formData )
			&& $this->notEmpty( 'confirmations', $formData['settings'] )
		) {
			$formData['settings'] = $package->translateFormSettings( $formData['settings'] );

			foreach ( $formData['settings']['confirmations'] as &$confirmation ) {

				$confirmation = SmartTag::process( $confirmation, $formData );
			}
		}

		return $formData;
	}

	public function getLanguageForEmail( $language, $email ) {
		$user = get_user_by( 'email', $email );
		if ( isset( $user->ID ) ) {
			return $language;
		}
		return $this->getCurrentFormLanguage();
	}

	private function getCurrentFormLanguage() {
		return apply_filters( 'wpml_current_language', '' );
	}

	private function getFieldValue( $field, $entryField, $originalField, $translatedField ) {
		$getField         = Obj::path( Fns::__, $field );
		$getOriginalField = Obj::path( Fns::__, $originalField );
		$getAnswerLabel   = function ( array $path ) use ( $translatedField, $originalField ) {
			return $this->getAnswerLabel( $path, $translatedField, $originalField );
		};

		switch ( $field['type'] ) {
			case 'select':
			case 'radio':
			case 'checkbox':
				$choicesMap = $this->getChoiceMap( $originalField, $translatedField );

				if ( is_array( $entryField ) && $choicesMap ) {
					$value = '';
					foreach ( $entryField as $val ) {
						$value .= PHP_EOL . Obj::propOr( $val, $val, $choicesMap );
					}
					return $value;
				}
				return Obj::propOr( $field['value'], $field['value'], $choicesMap );

			case 'likert_scale':
				$value = '';
				$rows  = is_array( $field['value_raw'] ) ? $field['value_raw'] : [];
				foreach ( $rows as $rowKey => $columnKeys ) {
					$columns = [];
					foreach ( (array) $columnKeys as $columnKey ) {
						$columns[] = $getAnswerLabel( [ 'columns', $columnKey ] );
					}
					$value .= PHP_EOL . $getAnswerLabel( [ 'rows', $rowKey ] ) . ':' . PHP_EOL
						. implode( ', ', $columns );
				}
				return $value;

			case 'payment-multiple':
			case 'payment-select':
				return $getAnswerLabel( [ 'choices', $field['value_raw'], 'label' ] )
						. ' - ' . $getField( [ 'currency' ] )
						. ' ' . $getField( [ 'amount' ] );

			case 'payment-checkbox':
				$value     = '';
				$choiceIds = explode( ',', $field['value_raw'] );
				foreach ( $choiceIds as $key ) {
					$value .= PHP_EOL . $getAnswerLabel( [ 'choices', $key, 'label' ] )
						. ' - ' . $getField( [ 'currency' ] )
						. ' ' . $getOriginalField( [ 'choices', $key, 'value' ] );
				}
				return $value;

			default:
				return $field['value'];
		}
	}

	private function getAnswerLabel( array $path, array $translatedField, array $originalField ) {
		$submitted = Obj::path( $path, $translatedField );

		if ( is_string( $submitted ) && '' !== $submitted ) {
			return $submitted;
		}

		$original = Obj::path( $path, $originalField );

		return is_string( $original ) ? $original : '';
	}

	private function getChoiceMap( $originalField, $translatedField ) {
		if ( Obj::prop( 'dynamic_choices', $originalField ) ) {
			return [];
		}

		$getChoices = pipe( Obj::path( [ 'choices' ] ), Lst::pluck( 'label' ) );

		$originalChoices   = $getChoices( $originalField );
		$translatedChoices = $getChoices( $translatedField );

		$choicesMap = [];
		foreach ( $translatedChoices as $key => $choice ) {
			$choicesMap[ $choice ] = $originalChoices[ $key ];
		}

		return $choicesMap;
	}

	public function processNotificationConditionals( $process, $fields, $form_data, $id ) {
		$conditionalLogicFields = WPForms_Conditional_Logic_Fields::instance();

		$form_data = $this->restoreConditionalLabels( $form_data, $fields );

		return $conditionalLogicFields->process_notification_conditionals( $process, $fields, $form_data, $id );
	}

	private function restoreConditionalLabels( $form_data, $fields ) {
		foreach ( $form_data['fields'] as $form_field_id => &$form_field_data ) {
			if ( isset( $form_field_data['choices'] ) ) {
				foreach ( $form_field_data['choices'] as &$form_field_choice ) {
					$value_raw = $fields[ $form_field_id ]['value_raw'] ?? null;
					if ( $form_field_choice['label'] === $value_raw ) {
						$form_field_choice['label'] = $fields[ $form_field_id ]['value'];
					}
				}
			}
		}

		return $form_data;
	}

	private function decodeFieldKey( $key ) {
		return strpos( $key, '_' ) !== false
			? (int) substr( $key, 0, strpos( $key, '_' ) )
			: (int) $key;
	}
}
