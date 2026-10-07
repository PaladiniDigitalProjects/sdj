<?php

namespace WPML\Import\Integrations\WooCommerce;

use WPML\Import\Fields;
use WPML\FP\Lst;
use WPML\LIB\WP\Hooks;
use WPML\Import\Integrations\Base\StatusManagement;
use function WPML\FP\spreadArgs;

class ImportPostsStatusHooks extends StatusManagement {

	const PRIORITY = 11;

	const PLACEHOLDER_POST_STATUS = 'importing';

	public function add_hooks() {
		Hooks::onFilter( 'woocommerce_product_import_pre_insert_product_object', self::PRIORITY, 2 )
			->then( spreadArgs( [ $this, 'forceInvisibleStatus' ] ) );
	}

	public function forceInvisibleStatus( $obj, $data ) {
		if ( 'variation' === $obj->get_type() ) {
			return $obj;
		}

		$metaData = $data['meta_data'] ?? [];
		if ( empty( $metaData ) ) {
			return $obj;
		}

		if (
			$this->hasStatusField( $metaData )
			|| ! $this->hasLanguageField( $metaData )
		) {
			return $obj;
		}

		if ( $this->isPreExistingProduct( $obj ) ) {
			return $obj;
		}

		$status = $obj->get_status();
		if ( $this->isAlreadyInvisible( $status ) ) {
			return $obj;
		}

		if ( $this->skipSetPostTypeInvisible( 'product' ) ) {
			return $obj;
		}

		$obj->set_status( StatusManagement::INVISIBLE_POST_STATUS );
		$obj->update_meta_data( Fields::FINAL_POST_STATUS, $status );

		return $obj;
	}

	private function isPreExistingProduct( $obj ) {
		$id = $obj->get_id();
		if ( ! $id ) {
			return false;
		}

		$storedStatus = get_post_status( $id );

		return $storedStatus && self::PLACEHOLDER_POST_STATUS !== $storedStatus;
	}

	protected function hasField( $field, $metaData ) {
		$match = Lst::find(
			function ( $item ) use ( $field ) {
				return $field === $item['key'];
			},
			$metaData
		);

		return (bool) $match;
	}
}
