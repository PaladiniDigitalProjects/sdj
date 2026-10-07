<?php

namespace WPML\Forms\WPForms\SharedAPI;

use SitePress;
use WPML\Forms\Hooks\Registration;
use WPML\Forms\Translation\Factory;
use WPML\Forms\WPForms\Language\RequestScope;
use WPML\FP\Fns;
use WPML\FP\Lst;
use WPML\FP\Obj;
use function WPML\FP\pipe;

class Strings extends Registration {

	private $sitepress;

	private $languageScope;

	public function __construct( $slug, $kind, Factory $factory, SitePress $sitepress, RequestScope $languageScope ) {
		$this->sitepress     = $sitepress;
		$this->languageScope = $languageScope;
		parent::__construct( $slug, $kind, $factory );
	}

	public function addHooks() {
		parent::addHooks();
		add_action( 'wpforms_save_form', [ $this, 'register' ] );
		add_filter( 'wpforms_process_before_form_data', [ $this, 'applySubmissionTranslations' ] );
		add_filter( 'wpforms_frontend_form_data', [ $this, 'applyTranslations' ] );
		add_filter( 'wpforms_entry_preview_form_data', [ $this, 'applyTranslations' ] );
		add_filter( 'wpforms_process_before_filter', [ $this, 'translateEntry' ], 10, 2 );
	}

	public function getFieldId( array $data ) {
		return ( array_key_exists( 'id', $data )
			&& ( is_string( $data['id'] ) || is_int( $data['id'] ) ) )
			? strval( $data['id'] ) : null;
	}

	public function register( $formId ) {

		$content = get_post_field( 'post_content', $formId, 'raw' );
		$data    = json_decode( $content, true );
		$package = $this->newPackage( $formId );

		if ( $this->notEmpty( 'settings', $data ) ) {
			$package->registerFormSettings( $data['settings'] );
		}

		if ( $this->notEmpty( 'fields', $data ) ) {
			foreach ( $data['fields'] as $field ) {
				$fieldID = $this->getFieldId( $field );
				if ( ! is_null( $fieldID ) ) {
					$package->registerField( $fieldID, $field );
				}
			}
		}
		$package->cleanup();
	}

	public function applyTranslations( array $formData ) {

		$package = $this->newPackage( $this->getId( $formData ) );

		if ( $this->notEmpty( 'settings', $formData ) ) {
			$formData['settings'] = $package->translateFormSettings( $formData['settings'] );
		}

		if ( did_action( 'wpforms_process_before' ) ) {
			return $formData;
		} else {
			return $this->applySubmissionTranslations( $formData );
		}
	}

	public function applySubmissionTranslations( array $formData ) {

		$package = $this->newPackage( $this->getId( $formData ) );

		$this->ajaxSwitchLanguage();

		if ( $this->notEmpty( 'fields', $formData ) ) {
			foreach ( $formData['fields'] as &$field ) {
				$fieldID = $this->getFieldId( $field );
				if ( ! is_null( $fieldID ) ) {
					$field = $package->translateField( $field, $fieldID );
				}
			}
		}

		return $formData;
	}

	public function bulkRegistrationItems( array $items ) {

		$forms = wpforms()->get( 'form' )->get();
		if ( is_array( $forms ) ) {
			foreach ( $forms as $form ) {
				$items[] = $this->getBulkRegistrationItem( $form->ID, $form->post_title );
			}
		}

		return $items;
	}

	public function bulkRegistration( array $forms ) {
		foreach ( $forms as $formId ) {
			$this->register( $formId );
		}
	}

	private function ajaxSwitchLanguage() {
		if ( wpml_is_ajax() ) {
			$pageUrl = filter_input( INPUT_POST, 'page_url' );
			if ( $pageUrl ) {
				$languageCode = $this->sitepress->get_language_from_url( $pageUrl );
				if ( is_string( $languageCode ) && array_key_exists( $languageCode, $this->sitepress->get_active_languages() ) ) {
					$this->languageScope->open( $languageCode, true );
				}
			}
		}
	}

	public function translateEntry( $entry, $formData ) {
		$originalForm = wpforms()->get( 'form' )->get(
			$formData['id'],
			[ 'content_only' => true ]
		);

		$formTemplate = Obj::path( [ 'meta', 'template' ], $formData );
		if ( 'poll' !== $formTemplate ) {
			return $entry;
		}

		$restoreOriginalChoice = function( $fieldValue, $fieldId ) use ( $originalForm, $formData ) {
			if ( in_array( Obj::path( [ 'fields', $fieldId, 'type' ], $originalForm ), [ 'checkbox', 'radio', 'select' ], true ) ) {
				$getChoices        = pipe( Obj::path( [ 'fields', $fieldId, 'choices' ] ), Lst::pluck( 'label' ) );
				$originalChoices   = $getChoices( $originalForm );
				$translatedChoices = $getChoices( $formData );

				$choicesMap = [];
				foreach ( $translatedChoices as $key => $choice ) {
					$choicesMap[ $choice ] = $originalChoices[ $key ];
				}

				if ( is_array( $fieldValue ) ) {
					foreach ( $fieldValue as &$value ) {
						$value = Obj::propOr( $value, $value, $choicesMap );
					}
					return $fieldValue;
				}

				return Obj::propOr( $fieldValue, $fieldValue, $choicesMap );
			}

			return $fieldValue;
		};

		return Obj::over( Obj::lensProp( 'fields' ), Fns::map( $restoreOriginalChoice ), $entry );
	}
}
