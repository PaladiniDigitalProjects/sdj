<?php

namespace WPML\Import\Helper;

use WPML\Import\Fields;

class ImportedItems {

	private $wpdb;

	public function __construct( \wpdb $wpdb ) {
		$this->wpdb = $wpdb;
	}

	public function countPosts() {
		return $this->countItems( $this->wpdb->postmeta );
	}

	public function countTerms() {
		return $this->countItems( $this->wpdb->termmeta );
	}

	private function countItems( $table ) {
		return (int) $this->wpdb->get_var(
			"
			SELECT COUNT(*) FROM {$table}
			WHERE meta_key = '" . Fields::TRANSLATION_GROUP . "'
			"
		);
	}
}
