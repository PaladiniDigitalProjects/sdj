<?php

namespace WPML\Import\Integrations\WPAllImport;

use WPML\Import\Helper\Page;

use function WPML\Container\make;

class HooksFactory implements \IWPML_Backend_Action_Loader, \IWPML_Frontend_Action_Loader, \IWPML_CLI_Action_Loader {

	const LABEL = 'WP All Import Pro';

	public function create() {
		$hooks = [];

		if ( self::hasWooCommerceAddon() && defined( 'WCML_VERSION' ) ) {
			$hooks[] = make( SyncProductTranslationsHooks::class );
		}

		if ( self::isImporting() ) {
			$hooks[] = make( ImportPostsStatusHooks::class );
		}

		if ( self::isOnImportPage() ) {
			$hooks[] = make( ImportNotice::class );
		}

		return $hooks;
	}

	private static function isImporting() {
		if ( ! isset( $_SERVER['HTTP_REFERER'] ) ) {
			return false;
		}

		if ( admin_url( 'admin.php?page=pmxi-admin-import&action=process' ) === $_SERVER['HTTP_REFERER'] ) {
			return true;
		}

		return false;
	}

	public static function isOnImportPage() {
		return Page::isOn( '/admin.php?page=pmxi-admin-import' );
	}

	public static function hasWooCommerceAddon() {
		return defined( 'PMWI_VERSION' );
	}
}
