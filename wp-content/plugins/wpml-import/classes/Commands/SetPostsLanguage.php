<?php

namespace WPML\Import\Commands;

use WPML\FP\Lst;
use WPML\Import\Fields;

class SetPostsLanguage extends Base\SetEntitiesLanguage {

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Setting Posts’ Language', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Connecting posts to the default language and translations.', 'wpml-import' );
	}

	protected function getPendingItems( $limit = null ) {
		return $this->getResultsWithLimit(
			"
			SELECT
				meta_value AS translation_group,
				post_id AS element_id,
				(SELECT meta_value FROM {$this->wpdb->postmeta} WHERE post_id = pm.post_id AND meta_key='" . Fields::LANGUAGE_CODE . "' LIMIT 1) AS language_code,
				(SELECT meta_value FROM {$this->wpdb->postmeta} WHERE post_id = pm.post_id AND meta_key='" . Fields::SOURCE_LANGUAGE_CODE . "' LIMIT 1) AS source_language_code
			FROM {$this->wpdb->postmeta} pm
			WHERE meta_key = '" . Fields::TRANSLATION_GROUP . "'
				HAVING language_code IS NOT NULL
			ORDER BY meta_value ASC,
				CASE WHEN source_language_code = '' THEN 0 ELSE 1 END
			",
			$limit
		);
	}


	protected function getTridAndType( $source, $translations ) {
		if ( $source ) {
			$elementType            = 'post_' . get_post_type( $source->element_id );
			$elementLanguageDetails = $this->sitepress->get_element_language_details( $source->element_id, $elementType );

			if ( $elementLanguageDetails ) {
				$trid = $elementLanguageDetails->trid;
			}
			if ( ! $elementLanguageDetails || $elementLanguageDetails->language_code !== $source->language_code ) {
				$this->sitepress->set_element_language_details( $source->element_id, $elementType, 0, $source->language_code );
				$trid = $this->sitepress->get_element_trid( $source->element_id, $elementType );
			}
		} else {
			$firstTranslation = reset( $translations );
			$elementType      = 'post_' . get_post_type( $firstTranslation->element_id );

			$trid = $this->wpdb->get_var(
				$this->wpdb->prepare(
					"
					SELECT trid FROM {$this->wpdb->prefix}icl_translations AS t
					LEFT JOIN {$this->wpdb->postmeta} AS pm
				    	ON t.element_type = %s
							AND t.element_id = pm.post_id
					WHERE pm.meta_key = '" . Fields::TRANSLATION_GROUP . "'
						AND pm.meta_value = %s
						AND t.language_code = %s
					ORDER BY t.trid ASC
					LIMIT 1
					",
					$elementType,
					$firstTranslation->translation_group,
					$firstTranslation->source_language_code
				)
			);

			$trid = apply_filters( 'wpml_import_get_trid_from_imported_translations', $trid, $firstTranslation );
		}

		return [ $trid, $elementType ];
	}

	protected function deleteLanguageFields( $itemsGroup ) {
		$itemIds = Lst::pluck( 'element_id', $itemsGroup );

		$this->wpdb->query(
			"
			DELETE FROM {$this->wpdb->postmeta}
			WHERE post_id IN(" . wpml_prepare_in( $itemIds, '%d' ) . ")
				AND meta_key IN('" . Fields::LANGUAGE_CODE . "','" . Fields::SOURCE_LANGUAGE_CODE . "')
			"
		);
	}
}
