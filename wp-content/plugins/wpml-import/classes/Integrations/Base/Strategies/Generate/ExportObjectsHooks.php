<?php

namespace WPML\Import\Integrations\Base\Strategies\Generate;

use WPML\LIB\WP\Hooks;
use WPML\Import\Integrations\Base\Fields;

abstract class ExportObjectsHooks implements \IWPML_Backend_Action, \IWPML_DIC_Action {
	use Fields;

	protected $needsCleanup = false;

	public function add_hooks() {
		Hooks::onAction( 'shutdown' )->then( [ $this, 'cleanupFields' ] );
	}

	abstract protected function getWpdb();

	abstract protected function getMetaTable();

	abstract protected function setObjectMeta( $objectId, $metaKey, $metaValue );

	abstract protected function isTranslatable( $obj );

	abstract protected function getObjectIdMetaKey( $obj );

	abstract protected function getObjectId( $obj );

	abstract protected function getElementLanguageDetails( $obj );

	protected function quoteIdentifier( $identifier ) {
		return '`' . str_replace( '`', '``', $identifier ) . '`';
	}

	public function setMetaFields( $obj ) {
		if ( ! $obj ) {
			return;
		}

		if ( ! $this->isTranslatable( $obj ) ) {
			return;
		}

		$exportFields = $this->getImportFields();
		$objectId     = $this->getObjectId( $obj );
		$wpdb         = $this->getWpdb();
		$existingKeys = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT DISTINCT meta_key 
				FROM {$this->quoteIdentifier( $this->getMetaTable() )}
				WHERE {$this->quoteIdentifier( $this->getObjectIdMetaKey( $obj ) )} = %d 
				AND meta_key IN (" . wpml_prepare_in( $exportFields ) . ") 
				LIMIT %d",
				$objectId,
				count( $exportFields )
			)
		);
		$missingKeys  = array_diff(
			$exportFields,
			$existingKeys
		);

		if ( empty( $missingKeys ) ) {
			$this->needsCleanup = true;
			return;
		}

		$element = $this->getElementLanguageDetails( $obj );
		if ( ! $element ) {
			return;
		}

		array_walk(
			$missingKeys,
			function ( $key, $index, $args ) {
				$value    = $this->getFieldValue( $key, $args['element'] );
				$objectId = $args['objectId'];
				$this->setObjectMeta( $objectId, $key, $value );
			},
			[
				'element'  => $element,
				'objectId' => $objectId,
			]
		);

		$this->needsCleanup = true;
	}

	public function cleanupFields() {
		if ( ! $this->needsCleanup ) {
			return;
		}

		$exportFields = $this->getImportFields();
		$wpdb         = $this->getWpdb();
		$wpdb->query(
			"DELETE FROM {$this->quoteIdentifier( $this->getMetaTable() )} WHERE meta_key IN (" . wpml_prepare_in( $exportFields ) . ")"
		);
	}
}
