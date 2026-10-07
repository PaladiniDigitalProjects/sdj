<?php

namespace WPML\Import\Commands;

class CleanupTermFields extends Base\CleanupFields {

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Cleaning Up Term Data', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Removing temporary and import-related term meta data.', 'wpml-import' );
	}

	protected function getFieldsTable() {
		return $this->wpdb->termmeta;
	}

	protected function getCommandFields( $commandClass ) {
		if ( in_array( Base\TemporaryTermFields::class, class_implements( $commandClass ), true ) ) {
			return $commandClass::getTemporaryTermFields();
		}

		return [];
	}
}
