<?php

namespace WPML\Import\CLI;

use WPML\Import\Commands\Provider;

class Commands {

	const CONTEXT = 'cli';

	public function process() {
		$commands = Provider::get( self::CONTEXT );

		foreach ( $commands as $commandClass ) {
			$command = Provider::getCommandInstance( $commandClass );

			if ( $command ) {
				$toProcessCount = $command->countPendingItems();
				$progress       = new Progress( $command->getTitle(), $toProcessCount );

				while ( $toProcessCount > 0 ) {
					$processedCount = $command->run();

					if ( ! $processedCount ) {
						break;
					}

					$progress->tick( $processedCount );
					$toProcessCount -= $processedCount;
				}

				$progress->finish();

				$this->warnAboutSkippedItems( $command->getTitle(), $toProcessCount );
			}
		}
	}

	private function warnAboutSkippedItems( $commandTitle, $skippedCount ) {
		if ( $skippedCount <= 0 ) {
			return;
		}

		\WP_CLI::warning(
			sprintf(
				/* translators: Warning printed by the WP-CLI import command when a step could not finish. %1$s: the name of the import step, for example "Updating Final Post Status". %2$d: the number of items that were left unprocessed. */
				_n(
					'%1$s: %2$d item could not be processed and was skipped.',
					'%1$s: %2$d items could not be processed and were skipped.',
					$skippedCount,
					'wpml-import'
				),
				$commandTitle,
				$skippedCount
			)
		);
	}
}
