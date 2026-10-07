<?php

namespace WPML\Import\Integrations\WPAllImport;

use WPML\LIB\WP\Hooks;
use WPML\Import\Integrations\Base\StatusManagement;

use function WPML\FP\spreadArgs;

class ImportPostsStatusHooks extends StatusManagement {

	private $skipProcessing = false;

	public function add_hooks() {
		Hooks::onAction( 'pmxi_before_post_import' )
			->then( spreadArgs( [ $this, 'maybeSkipProcessing' ] ) );
		Hooks::onAction( 'pmxi_saved_post', 10, 3 )
			->then( spreadArgs( [ $this, 'forceInvisibleStatus' ] ) );
	}

	public function maybeSkipProcessing( $importId ) {
		$importType = wp_all_import_get_import_post_type( $importId );
		if ( false === in_array( $importType, $this->getPostTypes(), true ) ) {
			$this->skipProcessing = true;
		}
	}

	public function forceInvisibleStatus( $id, $record, $isUpdate ) {
		if ( $this->skipProcessing ) {
			return;
		}

		if ( $isUpdate ) {
			return;
		}

		$data       = wp_all_import_xml2array( $record );
		$importType = $data['posttype'] ?? '';
		if (
			! empty( $importType )
			&& false === in_array( $importType, $this->getPostTypes(), true )
		) {
			return;
		}

		$postStatus = get_post_status( $id );
		$this->maybeSetPostInvisible( $id, $postStatus, $data );
	}

	protected function hasField( $field, $data ) {
		return array_key_exists( $field, $data );
	}
}
