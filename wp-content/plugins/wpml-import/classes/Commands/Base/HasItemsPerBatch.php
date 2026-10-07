<?php

namespace WPML\Import\Commands\Base;

trait HasItemsPerBatch {

	protected function filterNumberOfItemsPerBatch( int $defaultLimit ) {
		$className      = static::class;
		$lastSeparator  = strrpos( $className, '\\' );
		$stepIdentifier = false !== $lastSeparator ? substr( $className, $lastSeparator + 1 ) : $className;

		return (int) apply_filters(
			'wpml_import_command_items_per_batch',
			$defaultLimit,
			$stepIdentifier
		);
	}
}
