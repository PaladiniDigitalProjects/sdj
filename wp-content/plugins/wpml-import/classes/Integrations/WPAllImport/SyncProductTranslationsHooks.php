<?php

namespace WPML\Import\Integrations\WPAllImport;

use WPML\Import\Fields;
use WPML\LIB\WP\Hooks;

use function WPML\FP\spreadArgs;

class SyncProductTranslationsHooks implements \IWPML_Action {

	const SYNCHRONIZE_PRODUCT_TRANSLATIONS = 'wcml_synchronize_product_translations';

	public function add_hooks() {
		Hooks::onAction( 'pmxi_before_post_import' )
			->then( spreadArgs( [ $this, 'disableSynchronizationOnSave' ] ) );

		Hooks::onAction( 'pmxi_saved_post', 10, 3 )
			->then( spreadArgs( [ $this, 'synchronizeProductTranslations' ] ) );
	}

	public function disableSynchronizationOnSave( $importId ) {
		add_filter( 'wcml_product_synchronization_on_save_is_valid_context', '__return_false' );
	}

	public function synchronizeProductTranslations( $postId, $record, $isUpdate ) {
		if ( 'product' !== get_post_type( $postId ) || $this->isMultilingualImport( $record ) ) {
			return;
		}

		do_action( 'wpml_sync_all_custom_fields', $postId );

		if ( $this->isProductSynchronizationLoaded() ) {
			do_action( self::SYNCHRONIZE_PRODUCT_TRANSLATIONS, get_post( $postId ), [], [] );
		}
	}

	private function isProductSynchronizationLoaded() {
		global $woocommerce_wpml;

		return isset( $woocommerce_wpml->media );
	}

	private function isMultilingualImport( $record ) {
		$data = wp_all_import_xml2array( $record );

		return array_key_exists( Fields::LANGUAGE_CODE, $data );
	}
}
