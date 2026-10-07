<?php

namespace WPML\Import\Integrations\Base\Strategies\Generate;

use WPML\Import\Helper\PostTypes;

class ExportPostsHooks extends ExportObjectsHooks {

	protected $wpdb;

	protected $sitepress;

	protected $postTypes;

	public function __construct(
		\wpdb $wpdb,
		\SitePress $sitepress,
		PostTypes $postTypes
	) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
		$this->postTypes = $postTypes;
	}

	protected function getWpdb() {
		return $this->wpdb;
	}

	protected function getMetaTable() {
		return $this->wpdb->postmeta;
	}

	protected function setObjectMeta( $objectId, $metaKey, $metaValue ) {
		add_post_meta( $objectId, $metaKey, $metaValue, true );
	}

	protected function isPostObject( $obj ) {
		return $obj instanceof \WP_Post;
	}

	protected function isTranslatable( $obj ) {
		if ( $this->isPostObject( $obj ) ) {
			return $this->postTypes->isTranslatable( $obj->post_type );
		}
		return false;
	}

	protected function getObjectIdMetaKey( $obj ) {
		if ( $this->isPostObject( $obj ) ) {
			return 'post_id';
		}
		return '';
	}

	protected function getObjectId( $obj ) {
		if ( $this->isPostObject( $obj ) ) {
			return $obj->ID;
		}
		return 0;
	}

	protected function getElementLanguageDetails( $obj ) {
		if ( $this->isPostObject( $obj ) ) {
			return $this->sitepress->get_element_language_details( $obj->ID, 'post_' . $obj->post_type );
		}
		return null;
	}
}
