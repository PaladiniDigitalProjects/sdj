<?php

namespace WPML\Import\Integrations\WordPress;

use WPML\Import\Fields;
use WPML\FP\Lst;
use WPML\LIB\WP\Hooks;
use WPML\Import\Integrations\Base\Notice;
use function WPML\FP\spreadArgs;

class ExportNotice extends Notice {

	const NOTICE_ID = 'wordpress-export';

	protected function getId() {
		return self::NOTICE_ID;
	}

	protected function getDisplayCallback() {
		return [ HooksFactory::class, 'isOnExportPage' ];
	}

	protected function getMessage() {
		return $this->getExportMessage();
	}
}
