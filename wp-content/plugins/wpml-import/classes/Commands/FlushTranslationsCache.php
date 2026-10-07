<?php

namespace WPML\Import\Commands;

use WPML\Collect\Support\Collection;

class FlushTranslationsCache implements Base\Command {

	public static function getTitle(): string {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Clearing Translations Cache', 'wpml-import' );
	}

	public static function getDescription(): string {
		/* translators: Description of the "Clearing Translations Cache" import step, shown under the step name; "it" is the cache. */
		return __( 'Invalidating the persistent cache so it can be regenerated.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ): int {
		return 1;
	}

	public function run( ?Collection $args = null ): int {
		if ( ! class_exists( \WPML_WP_Cache::class ) ) {
			return 1;
		}

		wpml_collect(
			[
				defined( 'WPML_ELEMENT_TRANSLATIONS_CACHE_GROUP' ) ? WPML_ELEMENT_TRANSLATIONS_CACHE_GROUP : null,
				'WPML_Name_Query_Filter_Translated',
				'WPML_Name_Query_Filter_Untranslated',
			]
		)
			->filter()
			->each( fn( $group ) => ( new \WPML_WP_Cache( $group ) )->flush_group_cache() );

		return 1;
	}
}
