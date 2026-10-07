<?php

namespace WPML\Import\Integrations\Base;

trait Languages {

	public function includeAllLanguagesInQuery( $queryArgs ) {
		do_action( 'wpml_switch_language', 'all' );
		$queryArgs['wpml_skip_filters'] = true;
		return $queryArgs;
	}
}
