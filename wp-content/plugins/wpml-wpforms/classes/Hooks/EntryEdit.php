<?php

namespace WPML\Forms\WPForms\Hooks;

use SitePress;
use WPML\Forms\WPForms\Helpers\DynamicChoices;
use WPML\Forms\WPForms\Helpers\Entry;
use WPML\Forms\WPForms\SharedAPI\Strings;
use WPML\LIB\WP\Hooks;
use function WPML\FP\spreadArgs;

class EntryEdit {

	private $strings;

	private $sitepress;

	public function __construct( Strings $strings, SitePress $sitepress ) {
		$this->strings   = $strings;
		$this->sitepress = $sitepress;
	}

	public function addHooks() {
		$maybeAddHooks = function( $mode ) {
			if ( 'edit' === $mode ) {
				$entryEdit = (int) $_GET['entry_id'];

				Hooks::onFilter( 'wpforms_pro_admin_entries_edit_form_data' )
					->then( spreadArgs( $this->getMaybeTranslateFormData( $entryEdit ) ) );
				Hooks::onFilter( 'wpforms_entry_single_data' )
					->then( spreadArgs( [ $this, 'maybeConvertDynamicChoices' ] ) );
			}
		};

		Hooks::onAction( 'wpforms_entries_init' )
			->then( spreadArgs( $maybeAddHooks ) );
	}

	public function getMaybeTranslateFormData( int $entryEdit ) : callable {
		return function( array $formData ) use ( $entryEdit ) {
			$language = Entry::getLanguageById( $entryEdit );

			if ( $language && $this->sitepress->get_current_language() !== $language ) {
				$this->sitepress->switch_lang( $language );

				try {
					return $this->strings->applyTranslations( $formData );
				} finally {
					$this->sitepress->switch_lang();
				}
			}

			return $formData;
		};
	}

	public function maybeConvertDynamicChoices( array $fields ) : array {
		return wpml_collect( $fields )
			->map( [ DynamicChoices::class, 'convertRawValue' ] )
			->all();
	}
}
