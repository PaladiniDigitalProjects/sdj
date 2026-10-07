<?php

namespace WPML\Import\Integrations\WordPress;

use WPML\Import\Integrations\Base\Notice;

class ImportNotice extends Notice {

	const NOTICE_ID = 'wordpress-import';

	protected function getId() {
		return self::NOTICE_ID;
	}

	protected function getDisplayCallback() {
		return [ HooksFactory::class, 'isOnImportPage' ];
	}

	protected function getMessage() {
		return $this->getImportMessage();
	}
}
