<?php

namespace WPML\Import\Integrations\WPAllImport;

use WPML\Import\Integrations\Base\Notice;

class ImportNotice extends Notice {

	const NOTICE_ID = 'wp-all-import';

	protected function getId() {
		return self::NOTICE_ID;
	}

	protected function getDisplayCallback() {
		return [ HooksFactory::class, 'isOnImportPage' ];
	}

	protected function getMessage() {
		if ( HooksFactory::hasWooCommerceAddon() ) {
			return $this->getShopImportMessage();
		}

		return $this->getImportMessage();
	}
}
