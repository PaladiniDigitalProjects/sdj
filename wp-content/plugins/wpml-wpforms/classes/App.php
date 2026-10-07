<?php

namespace WPML\Forms\WPForms;

use WPML\Forms\WPForms\SharedAPI\SharedBaseHooks;
use WPML\Forms\WPForms\Upgrade\UncompleteWpFormsPackages;

final class App {

	public static function init() {
		( new \WPML_Action_Filter_Loader() )->load(
			[
				SharedBaseHooks::class,
				UncompleteWpFormsPackages::class,
			]
		);
	}
}
