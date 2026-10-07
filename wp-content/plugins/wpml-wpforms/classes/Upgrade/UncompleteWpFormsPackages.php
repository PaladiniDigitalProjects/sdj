<?php

namespace WPML\Forms\WPForms\Upgrade;

use WPML\Element\API\Languages;
use WPML\Forms\WPForms\SharedAPI\WpForms;
use WPML\Setup\Option;
use WPML\TM\ATE\TranslateEverything\UntranslatedPackages;
use WPML\WP\OptionManager;

class UncompleteWpFormsPackages implements \IWPML_Backend_Action, \IWPML_DIC_Action {

	public const DONE_OPTION = 'wpml_wpforms_tea_packages_repaired';

	private const FIRST_TEA_PACKAGES_VERSION = '4.7';

	private $untranslatedPackages;

	private $optionManager;

	public function __construct( UntranslatedPackages $untranslatedPackages, OptionManager $optionManager ) {
		$this->untranslatedPackages = $untranslatedPackages;
		$this->optionManager        = $optionManager;
	}

	public function add_hooks() {
		add_action( 'admin_init', [ $this, 'run' ] );
	}

	public function run() {
		if ( $this->isDone() || ! $this->canDecide() ) {
			return;
		}

		if ( $this->startedOnVersionWithTeaPackages() ) {
			$this->uncompleteLanguagesWithUntranslatedForms();
		}

		$this->markAsDone();
	}

	private function canDecide(): bool {
		return wpml_is_setup_complete()
			&& Option::getTranslateEverything()
			&& did_action( 'wpml_st_loaded' )
			&& ! $this->isBulkRegistrationPending();
	}

	private function uncompleteLanguagesWithUntranslatedForms() {
		$kind = WpForms::SLUG;
		$listed         = (array) ( Option::getTranslateEverythingCompletedPackages()[ $kind ] ?? [] );
		$secondaryCodes = (array) Languages::getSecondaryCodes();
		$drop           = [];

		foreach ( $listed as $language ) {
			if ( $this->shouldUncomplete( $language, $secondaryCodes ) ) {
				$drop[] = $language;
			}
		}

		if ( ! $drop ) {
			return;
		}

		$this->optionManager->invalidateGroup( Option::OPTION_GROUP );

		$completed          = Option::getTranslateEverythingCompletedPackages();
		$completed[ $kind ] = array_values( array_diff( (array) ( $completed[ $kind ] ?? [] ), $drop ) );

		Option::setTranslateEverythingCompletedPackages( $completed );

		$this->optionManager->invalidateGroup( Option::OPTION_GROUP );
	}

	private function shouldUncomplete( string $language, array $secondaryCodes ): bool {
		return in_array( $language, $secondaryCodes, true )
			&& $this->hasUntranslatedForm( $language );
	}

	private function hasUntranslatedForm( string $language ): bool {
		return (bool) $this->untranslatedPackages->getElementsToProcess( [ $language ], WpForms::SLUG, 1 );
	}

	private function startedOnVersionWithTeaPackages(): bool {
		return version_compare( (string) \WPML_Installation::getStartVersion(), self::FIRST_TEA_PACKAGES_VERSION, '>=' );
	}

	private function isBulkRegistrationPending(): bool {
		return (bool) get_option( wpml_forms_bulk_registration_option_name( WPML_WP_FORMS_FILE ), false );
	}

	private function isDone(): bool {
		return (bool) get_option( self::DONE_OPTION, false );
	}

	private function markAsDone() {
		update_option( self::DONE_OPTION, 1, true );
	}
}
