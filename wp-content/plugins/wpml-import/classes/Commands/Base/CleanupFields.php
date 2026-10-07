<?php

namespace WPML\Import\Commands\Base;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Provider;

abstract class CleanupFields implements Command {

	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 200;

	protected $wpdb;

	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	abstract protected function getFieldsTable();

	abstract protected function getCommandFields( $command );

	public function countPendingItems( ?Collection $args = null ) {
		if ( ! $this->hasRowsToKeep() ) {
			$fields = $this->getFieldsToCleanup();

			return (int) $this->wpdb->get_var(
				"
				SELECT
					COUNT(*)
				FROM {$this->getFieldsTable()}
				WHERE meta_key IN(" . wpml_prepare_in( $fields ) . ")
				"
			);
		}

		return (int) $this->wpdb->get_var( $this->getRowsToDeleteQuery( 'COUNT(DISTINCT meta.meta_id)' ) );
	}

	public function run( ?Collection $args = null ) {
		if ( ! $this->hasRowsToKeep() ) {
			$fields = $this->getFieldsToCleanup();

			return (int) $this->wpdb->query(
				$this->wpdb->prepare(
					"
					DELETE FROM {$this->getFieldsTable()}
					WHERE meta_key IN(" . wpml_prepare_in( $fields ) . ")
					LIMIT %d
					",
					$this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT )
				)
			);
		}

		$rowIds = $this->wpdb->get_col(
			$this->wpdb->prepare(
				$this->getRowsToDeleteQuery( 'DISTINCT meta.meta_id' ) . ' LIMIT %d',
				$this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT )
			)
		);

		if ( ! $rowIds ) {
			return 0;
		}

		return (int) $this->wpdb->query(
			"
			DELETE FROM {$this->getFieldsTable()}
			WHERE meta_id IN(" . wpml_prepare_in( $rowIds, '%d' ) . ")
			"
		);
	}

	protected function hasRowsToKeep() {
		return false;
	}

	private function getRowsToDeleteQuery( $select ) {
		return "
			SELECT {$select}
			FROM {$this->getFieldsTable()} AS meta
			" . $this->getRowsToKeepJoin() . "
			WHERE meta.meta_key IN(" . wpml_prepare_in( $this->getFieldsToCleanup() ) . ")
			" . $this->getRowsToKeepWhere();
	}

	private function getRowsToKeepWhere() {
		$condition = $this->getRowsToKeepCondition();

		return $condition ? 'AND (' . $condition . ')' : '';
	}

	protected function getRowsToKeepJoin() {
		return '';
	}

	protected function getRowsToKeepCondition() {
		return '';
	}

	private function getFieldsToCleanup() {
		$fieldsFromCommands = wpml_collect( Provider::getProcessCommands( static::class ) )
			->reduce(
				function ( array $carry, $commandClass ) {
					return array_merge( $carry, $this->getCommandFields( $commandClass ) );
				},
				[]
			);

		return array_merge(
			[
				\WPML\Import\Fields::LANGUAGE_CODE,
				\WPML\Import\Fields::SOURCE_LANGUAGE_CODE,
				\WPML\Import\Fields::TRANSLATION_GROUP,
				\WPML\Import\Fields::FINAL_POST_STATUS,
				\WPML\Import\Integrations\WooCommerce\ImportHooks::TRANSLATION_SKU_META_KEY,
			],
			$fieldsFromCommands
		);
	}
}
