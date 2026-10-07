<?php

namespace WPML\Import\API;

use WPML\Import\Commands\Provider;

class Commands {

	public function processImport( $context = 'hook' ) {
		$commands = Provider::get( $context );

		foreach ( $commands as $commandClass ) {
			$command = Provider::getCommandInstance( $commandClass );

			if ( $command ) {
				$toProcessCount = $command->countPendingItems();

				while ( $toProcessCount > 0 ) {
					$processedCount = $command->run();

					if ( ! $processedCount ) {
						break;
					}

					$toProcessCount -= $processedCount;
				}
			}
		}
	}
}
