<?php

namespace WPML\Import\Integrations\Base\Strategies\Generate;

use WPML\Import\Helper\Taxonomies;

class ExportTermsHooks extends ExportObjectsHooks {

	protected $wpdb;

	protected $sitepress;

	protected $taxonomies;

	public function __construct(
		\wpdb $wpdb,
		\SitePress $sitepress,
		Taxonomies $taxonomies
	) {
		$this->wpdb       = $wpdb;
		$this->sitepress  = $sitepress;
		$this->taxonomies = $taxonomies;
	}

	protected function getWpdb() {
		return $this->wpdb;
	}

	protected function getMetaTable() {
		return $this->wpdb->termmeta;
	}

	protected function setObjectMeta( $objectId, $metaKey, $metaValue ) {
		add_term_meta( $objectId, $metaKey, $metaValue, true );
	}

	protected function isTermObject( $obj ) {
		return $obj instanceof \WP_Term;
	}

	protected function isTranslatable( $obj ) {
		if ( $this->isTermObject( $obj ) ) {
			return $this->taxonomies->isTranslatable( $obj->taxonomy );
		}
		return false;
	}

	protected function getObjectIdMetaKey( $obj ) {
		if ( $this->isTermObject( $obj ) ) {
			return 'term_id';
		}
		return '';
	}

	protected function getObjectId( $obj ) {
		if ( $this->isTermObject( $obj ) ) {
			return $obj->term_id;
		}
		return 0;
	}

	protected function getElementLanguageDetails( $obj ) {
		if ( $this->isTermObject( $obj ) ) {
			$element = $this->sitepress->get_element_language_details( $obj->term_taxonomy_id, 'tax_' . $obj->taxonomy );

			if ( ! is_object( $element ) ) {
				$element = $this->sitepress->get_element_language_details( $obj->term_id, 'tax_' . $obj->taxonomy );
			}

			if ( $element ) {
				return $element;
			}
		}
		return null;
	}
}
