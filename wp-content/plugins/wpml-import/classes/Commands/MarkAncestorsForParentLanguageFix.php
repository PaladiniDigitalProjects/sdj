<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;
use WPML\Import\Commands\Base\HasItemsPerBatch;
use WPML\Import\Commands\Base\Query;
use WPML\Import\Commands\Base\Command;
use WPML\Import\Commands\Base\TemporaryTermFields;

class MarkAncestorsForParentLanguageFix implements Command, TemporaryTermFields {

	use Query;
	use HasItemsPerBatch;

	const DEFAULT_LIMIT = 50;

	const META_MARK_PARENT = '_wpml_import_fix_parent_lang';
	const META_MARK_DONE   = '_wpml_import_mark_parents_done';

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Marking Parent Terms for Connection', 'wpml-import' );
	}

	public static function getDescription() {
		/* translators: Description of the "Marking Parent Terms for Connection" import step, shown under the step name; "their" refers to the parent terms. */
		return __( 'Collecting parent terms to connect their translations in the next step.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getImportedTermsWithParents() );
	}

	public function run( ?Collection $args = null ) {
		$items     = $this->getImportedTermsWithParents( $this->filterNumberOfItemsPerBatch( self::DEFAULT_LIMIT ) );
		$processed = 0;

		foreach ( $items as $item ) {
			$switchLang = new \WPML_Temporary_Switch_Language( $this->sitepress, (string) $item->language_code );

			try {
				$this->markAncestors( (int) $item->term_id, (string) $item->language_code, (string) $item->taxonomy );
				update_term_meta( (int) $item->term_id, self::META_MARK_DONE, 1 );
			} finally {
				$switchLang->restore_lang();
			}

			++$processed;
		}

		return $processed;
	}

	private function getImportedTermsWithParents( $limit = null ) {
		$sql = "
			SELECT
				tt.term_id,
				tt.taxonomy,
				tr.language_code
			 FROM {$this->wpdb->termmeta} AS tm_import
			 INNER JOIN {$this->wpdb->term_taxonomy} AS tt
			   ON tt.term_id = tm_import.term_id AND tt.parent > 0
			 INNER JOIN {$this->wpdb->prefix}icl_translations AS tr
			   ON tr.element_id = tt.term_taxonomy_id
			  AND tr.element_type = CONCAT('tax_', tt.taxonomy)
			 LEFT JOIN {$this->wpdb->termmeta} AS tm_done
			   ON tm_done.term_id = tm_import.term_id
			  AND tm_done.meta_key = '" . self::META_MARK_DONE . "'
			 WHERE tm_import.meta_key = '" . SetInlineTermsLanguage::FIELD_TEMPORARY_PROCESSED_INLINE_TERM . "'
			   AND tm_done.meta_id IS NULL
			 GROUP BY tt.term_id, tt.taxonomy, tr.language_code
		";

		return $this->getResultsWithLimit( $sql, $limit );
	}

	private function markAncestors( $termId, $childLang, $taxonomy ) {
		$term = get_term( $termId, $taxonomy );
		if ( ! $term instanceof \WP_Term ) {
			return;
		}

		$visited  = [];
		$maxDepth = 20;
		$depth    = 0;

		while ( $term->parent > 0 && $depth < $maxDepth ) {
			if ( isset( $visited[ $term->parent ] ) ) {
				break;
			}

			$parent = get_term( $term->parent, $taxonomy );
			if ( ! $parent instanceof \WP_Term ) {
				break;
			}

			$parentLang = $this->getTermLanguageCode( $parent );
			if ( $parentLang !== $childLang ) {
				add_term_meta( (int) $parent->term_id, self::META_MARK_PARENT, $term->term_taxonomy_id, true );
			}

			$visited[ $term->term_id ] = true;
			$term                      = $parent;
			++$depth;
		}
	}

	private function getTermLanguageCode( $term ) {
		return (string) apply_filters(
			'wpml_element_language_code',
			null,
			[
				'element_id'   => (int) $term->term_taxonomy_id,
				'element_type' => 'tax_' . $term->taxonomy,
			]
		);
	}

	public static function getTemporaryTermFields() {
		return [ self::META_MARK_PARENT, self::META_MARK_DONE ];
	}
}
