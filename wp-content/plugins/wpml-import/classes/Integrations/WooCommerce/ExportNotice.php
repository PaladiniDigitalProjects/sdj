<?php

namespace WPML\Import\Integrations\WooCommerce;

use WPML\Import\Fields;
use WPML\FP\Lst;
use WPML\LIB\WP\Hooks;
use WPML\Import\Integrations\Base\Notice;
use function WPML\FP\spreadArgs;

class ExportNotice extends Notice {

	const NOTICE_ID = 'woocommerce-export';

	protected function getId() {
		return self::NOTICE_ID;
	}

	protected function getDisplayCallback() {
		return [ HooksFactory::class, 'isOnExportPage' ];
	}

	protected function getMessage() {
		return $this->getShopExportMessage();
	}

	protected function getShopExportMessage() {
		$current_language         = apply_filters( 'wpml_current_language', null );
		$current_display_language = apply_filters( 'wpml_translated_language_name', '', $current_language );
		if ( 'all' === $current_language ) {
			return __( 'You are about to export all your products in all languages at once.', 'wpml-import' )
				. '<br /><br />'
				. sprintf(
					/* translators: Line of the notice shown on the WooCommerce product export screen. %1$s: a link to the WooCommerce Multilingual documentation, %2$s: a link to the WPML Export and Import documentation. Each link reads as the plugin's name. */
					__( 'Remember to install %1$s and %2$s on your new site before importing your content so we can restore all the translations.', 'wpml-import' ),
					$this->getWcmlLink(),
					$this->getSelfLink()
				);
		}
		return sprintf(
			/* translators: Line of the notice shown on the WooCommerce product export screen. %1$s: a link to the WooCommerce Multilingual documentation, %2$s: a link to the WPML Export and Import documentation. Each link reads as the plugin's name. */
			__( 'Remember to install %1$s and %2$s on your new site before importing your content so we can restore all the translations.', 'wpml-import' ),
			$this->getWcmlLink(),
			$this->getSelfLink()
		)
		. '<br /><br />'
		. sprintf(
			/* translators: Line of the notice shown on the WooCommerce product export screen. %s: the name of the language the products will be exported in, shown in bold. */
			__( 'You are about to export your products in %s.', 'wpml-import' ),
			'<strong>' . $current_display_language . '</strong>'
		);
	}

	protected function requiresAdminLangActionButton() {
		if ( ! $this->hasWcml() ) {
			return false;
		}
		if ( 'all' === apply_filters( 'wpml_current_language', null ) ) {
			return false;
		}
		return true;
	}
}
