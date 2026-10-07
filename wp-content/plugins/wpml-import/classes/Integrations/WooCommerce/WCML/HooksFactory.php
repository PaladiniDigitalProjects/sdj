<?php

namespace WPML\Import\Integrations\WooCommerce\WCML;

use function WPML\Container\make;

class HooksFactory implements \IWPML_Backend_Action_Loader, \IWPML_CLI_Action_Loader {

	public function create() {
		return [ make( CommandHooks::class ) ];
	}
}
