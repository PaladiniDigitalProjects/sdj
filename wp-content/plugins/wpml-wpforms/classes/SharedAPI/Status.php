<?php

namespace WPML\Forms\WPForms\SharedAPI;

use WPML\Forms\Loader\AddonStatus;

class Status implements AddonStatus {
	const INIT_ACTION = 'wpforms_loaded';

	public function isActive() {
		return (bool) did_action( self::INIT_ACTION);
	}
}
