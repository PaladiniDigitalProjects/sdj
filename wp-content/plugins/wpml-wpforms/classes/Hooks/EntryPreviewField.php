<?php

namespace WPML\Forms\WPForms\Hooks;

use SitePress;
use WPML\Forms\Hooks\Base;
use WPML\Forms\WPForms\Language\RequestScope;
use WPML\FP\Obj;

class EntryPreviewField  extends Base {

	const BEFORE_WPFORMS_PRO = 9;

	private $sitepress;

	private $languageScope;

	public function __construct( $slug, $kind, \WPML\Forms\Translation\Factory $factory, SitePress $sitepress, RequestScope $languageScope ) {
		$this->sitepress     = $sitepress;
		$this->languageScope = $languageScope;
		parent::__construct( $slug, $kind, $factory );
	}

	public function addHooks() {
		add_filter( 'wpforms_frontend_form_data', [ $this, 'mayBeAddLanguageField' ] );
		\WPML\Forms\Request\Ajax::listen(
			'wpforms_get_entry_preview',
			[ $this, 'markAsNeedsTranslations' ],
			'WPForms entry preview (front-end, incl. anonymous): switches the WPML language for the host request only; WPForms verifies its own nonce',
			self::BEFORE_WPFORMS_PRO,
			1,
			true
		);
	}

	public function mayBeAddLanguageField( array $formData ) {
		if ( $this->hasPreviewEntryField( $formData ) ) {
			$formData['fields'][0] = [
				'id'            => 0,
				'type'          => 'hidden',
				'default_value' => $this->sitepress->get_current_language(),
			];
		}
		return $formData;
	}

	public function markAsNeedsTranslations() {
		$submittedData = filter_input( INPUT_POST, 'wpforms', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$languageCode  = Obj::pathOr( '', [ 'fields', 0 ], $submittedData );
		if ( is_string( $languageCode ) && array_key_exists( $languageCode, $this->sitepress->get_active_languages() ) ) {
			$this->languageScope->open( $languageCode, true );
		}
		add_filter( 'wpforms_pro_fields_entry_preview_get_field_label', [ $this, 'mayBeApplyPreviewLabelTranslation' ], 10, 3 );
	}

	public function mayBeApplyPreviewLabelTranslation( $label, $rawField, $formData ) {
		$package         = $this->newPackage( $this->getId( $formData ) );
		$fieldId         = $this->getId( $rawField );
		$field           = (array) Obj::path( [ 'fields', $fieldId ], $formData );
		$fieldId         = (string) $this->getId( $field );
		$translatedField = $package->translateField( $field, $fieldId );
		return Obj::propOr( $label, 'label', $translatedField );
	}

	private function hasPreviewEntryField( array $formData ): bool {
		foreach ( $formData['fields'] as $field ) {
			if ( $field['type'] === 'entry-preview' ) {
				return true;
			}
		}
		return false;
	}
}
