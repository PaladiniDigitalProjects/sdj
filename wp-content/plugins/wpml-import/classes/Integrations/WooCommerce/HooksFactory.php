<?php

namespace WPML\Import\Integrations\WooCommerce;

use WPML\FP\Obj;
use WPML\Import\Helper\Page;

use function WPML\Container\make;

class HooksFactory implements \IWPML_Backend_Action_Loader, \IWPML_CLI_Action_Loader {

	const LABEL = 'WooCommerce';

	public function create() {
		$hooks = [ make( CommandHooks::class ) ];

		if ( self::isExporting() ) {
			$hooks[] = make( ExportHooks::class );
		} elseif ( self::isImporting() ) {
			$hooks[] = make( self::isImportingUpdate() ? ImportHooks\Update::class : ImportHooks\Create::class );
			$hooks[] = make( ImportPostsStatusHooks::class );
		}

		$hooks[] = make( CompatibilityHooks::class );

		if ( self::isOnExportPage() ) {
			$hooks[] = make( ExportNotice::class );
		} elseif ( self::isOnImportPage() ) {
			$hooks[] = make( ImportNotice::class );
		}

		return $hooks;
	}

	private static function isExporting() {
		if (
			wp_doing_ajax()
			&& 'woocommerce_do_ajax_product_export' === Obj::prop( 'action', $_POST )
		) {
			return true;
		}

		return false;
	}

	private static function isImporting() {
		if (
			wp_doing_ajax()
			&& 'woocommerce_do_ajax_product_import' === Obj::prop( 'action', $_POST )
		) {
			return true;
		}

		return false;
	}

	private static function isImportingUpdate() {
		return (bool) Obj::prop( 'update_existing', $_POST );
	}

	public static function isOnExportPage() {
		return Page::isOn( '/edit.php?post_type=product&page=product_exporter' );
	}

	public static function isOnImportPage() {
		return Page::isOn( '/edit.php?post_type=product&page=product_importer' );
	}
}
