<?php

namespace WPML\Import\Commands;

class CleanupPostFields extends Base\CleanupFields {

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Cleaning Up Post Data', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Removing temporary and import-related post meta data.', 'wpml-import' );
	}

	protected function getFieldsTable() {
		return $this->wpdb->postmeta;
	}

	protected function hasRowsToKeep() {
		return (bool) $this->wpdb->get_var(
			"
			SELECT 1
			FROM {$this->wpdb->postmeta}
			WHERE meta_key = '" . \WPML\Import\Fields::FINAL_POST_STATUS . "'
			LIMIT 1
			"
		);
	}

	protected function getRowsToKeepJoin() {
		$validStatuses = array_keys( get_post_statuses() );

		return "
			LEFT JOIN {$this->wpdb->posts} AS post
				ON post.ID = meta.post_id
			LEFT JOIN {$this->wpdb->postmeta} AS status
				ON status.post_id = meta.post_id
					AND status.meta_key = '" . \WPML\Import\Fields::FINAL_POST_STATUS . "'
					AND status.meta_value IN(" . wpml_prepare_in( $validStatuses ) . ")
					AND status.meta_value != post.post_status
			LEFT JOIN {$this->wpdb->postmeta} AS translationGroup
				ON translationGroup.post_id = meta.post_id
					AND translationGroup.meta_key = '" . \WPML\Import\Fields::TRANSLATION_GROUP . "'
		";
	}

	protected function getRowsToKeepCondition() {
		return 'status.meta_id IS NULL OR translationGroup.meta_id IS NULL';
	}

	protected function getCommandFields( $commandClass ) {
		if ( in_array( Base\TemporaryPostFields::class, class_implements( $commandClass ), true ) ) {
			return $commandClass::getTemporaryPostFields();
		}

		return [];
	}
}
