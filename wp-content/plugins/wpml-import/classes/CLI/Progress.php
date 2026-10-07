<?php

namespace WPML\Import\CLI;

use cli\Streams;

class Progress {

	const FORMAT_LINE         = '{:lineLabel}: {:processed}/{:total} items ({:percentage})';
	const FORMAT_LINE_NO_ITEM = '{:lineLabel}: no item';

	private $lineLabel;

	private $totalItemsCount;

	private $processedItemsCount = 0;

	public function __construct( $lineLabel, $totalItemsCount ) {
		$this->lineLabel       = $lineLabel;
		$this->totalItemsCount = $totalItemsCount;

		$this->outputLine( \WP_CLI::colorize( '…' ) );
	}

	public function tick( $newProcessedItemsCount ) {
		$this->processedItemsCount += $newProcessedItemsCount;
		$this->outputLine( \WP_CLI::colorize( '…' ) );
	}

	public function finish() {
		$this->outputLine( \WP_CLI::colorize( '%G✓%n' ) );
		Streams::line();
	}

	private function outputLine( $prefix ) {
		$format = $this->hasItem() ? self::FORMAT_LINE : self::FORMAT_LINE_NO_ITEM;
		Streams::out( "\r" );
		Streams::out( $prefix . ' ' . $format, $this->getVars() );
	}

	private function getVars() {
		if ( $this->hasItem() ) {
			$percentage = min( 100, ceil( 100 * $this->processedItemsCount / $this->totalItemsCount ) );
		} else {
			$percentage = 100;
		}

		return [
			'lineLabel'  => $this->lineLabel,
			'processed'  => $this->processedItemsCount,
			'total'      => $this->totalItemsCount,
			'percentage' => $percentage . '%',
		];
	}

	private function hasItem() {
		return $this->totalItemsCount > 0;
	}
}
