<?php

namespace WPML\Import\Integrations\Base;

use WPML\Import\Fields;

abstract class StatusManagement implements \IWPML_Backend_Action {

	const INVISIBLE_POST_STATUS = 'draft';
	const INVISIBLE_POST_STATI  = [
		'draft',
		'pending',
		'auto-draft',
		'trash',
		'inherit',
	];

	abstract public function add_hooks();

	protected function maybeSetPostInvisible( $id, $postStatus, $data ) {
		if (
			false === $postStatus
			|| $this->isAlreadyInvisible( $postStatus )
		) {
			return;
		}

		if (
			$this->hasStatusField( $data )
			|| ! $this->hasLanguageField( $data )
		) {
			return;
		}

		if ( $this->skipSetPostInvisible( $id ) ) {
			return;
		}

		$postType = get_post_type( $id );
		if (
			false !== $postType
			&& $this->skipSetPostTypeInvisible( $postType )
		) {
			return;
		}

		wp_update_post(
			[
				'ID'          => $id,
				'post_status' => self::INVISIBLE_POST_STATUS,
			]
		);
		update_post_meta( $id, Fields::FINAL_POST_STATUS, $postStatus );
	}

	protected function isAlreadyInvisible( $postStatus ) {
		return in_array( $postStatus, self::INVISIBLE_POST_STATI, true );
	}

	protected function hasLanguageField( $data ) {
		return $this->hasField( Fields::LANGUAGE_CODE, $data );
	}

	protected function hasStatusField( $data ) {
		return $this->hasField( Fields::FINAL_POST_STATUS, $data );
	}

	abstract protected function hasField( $field, $data );

	protected function skipSetPostInvisible( $id ) {
		$skip = false;

		return apply_filters( 'wpml_import_skip_set_post_invisible', $skip, $id );
	}

	protected function skipSetPostTypeInvisible( $postType ) {
		$skip = false;

		return apply_filters( 'wpml_import_skip_set_post_type_invisible', $skip, $postType );
	}

	protected static function getPostTypes() {
		return get_post_types( '', 'names' );
	}
}
