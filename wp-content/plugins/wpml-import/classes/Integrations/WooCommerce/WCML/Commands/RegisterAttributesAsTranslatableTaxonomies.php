<?php

namespace WPML\Import\Integrations\WooCommerce\WCML\Commands;

use WPML\Collect\Support\Collection;
use WPML\FP\Obj;
use WPML\Import\Commands\Base\Command;

class RegisterAttributesAsTranslatableTaxonomies implements Command {

	protected $wpdb;

	protected $sitepress;

	public function __construct( \wpdb $wpdb, \SitePress $sitepress ) {
		$this->wpdb      = $wpdb;
		$this->sitepress = $sitepress;
	}

	public static function getTitle() {
		/* translators: Name of a step in the list of steps WPML Export and Import runs, shown on its screen and by its WP-CLI command. A noun phrase naming what the step does, not an instruction to the user. */
		return __( 'Registering Product Attributes', 'wpml-import' );
	}

	public static function getDescription() {
		return __( 'Identifying and registering attributes created during product imports for translation.', 'wpml-import' );
	}

	public function countPendingItems( ?Collection $args = null ) {
		return count( $this->getPendingItems() );
	}

	public function run( ?Collection $args = null ) {
		$wpmlSettings = (array) $this->sitepress->get_settings();
		$syncSettings = (array) $this->sitepress->get_setting( 'taxonomies_sync_option', [] );

		$items = $this->getPendingItems();
		foreach ( $items as $taxonomyName ) {
			$syncSettings[ $taxonomyName ] = 1;
		}

		$wpmlSettings['taxonomies_sync_option'] = $syncSettings;
		$this->sitepress->save_settings( $wpmlSettings );

		return count( $items );
	}

	private function getPendingItems() {
		$attributes   = wc_get_attribute_taxonomies();
		$syncSettings = $this->sitepress->get_setting( 'taxonomies_sync_option', [] );

		$getAttributeName = Obj::prop( 'attribute_name' );
		$getTaxonomyName  = 'wc_attribute_taxonomy_name';
		$isNotRegistered  = function ( $attributeName ) use ( $syncSettings ) {
			return ! Obj::has( $attributeName, $syncSettings );
		};

		return wpml_collect( $attributes )
			->map( $getAttributeName )
			->map( $getTaxonomyName )
			->filter( $isNotRegistered )
			->values()
			->toArray();
	}
}
