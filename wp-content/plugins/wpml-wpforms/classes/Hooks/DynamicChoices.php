<?php

namespace WPML\Forms\WPForms\Hooks;

class DynamicChoices {

	public function addHooks() {
		add_filter( 'wpforms_dynamic_choice_post_type_args', [ $this, 'allowFilters' ] );
	}

	public function allowFilters( $args ) {
		$args['suppress_filters'] = false;
		return $args;
	}
}
