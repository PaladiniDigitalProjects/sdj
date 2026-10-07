<?php

namespace WPML\Import\Helper;

use function WPML\FP\partial;

class Resources {

	public static function enqueueApp( $app, array $dependencies = [] ) {
		return function ( $localize ) use ( $app, $dependencies ) {
			\WPML\LIB\WP\App\Resources::enqueueWithDeps(
				$app,
				WPML_IMPORT_PLUGIN_URL,
				WPML_IMPORT_PLUGIN_PATH,
				WPML_IMPORT_VERSION,
				'wpml-import',
				$localize,
				$dependencies
			);
		};
	}
}
