<?php

namespace WPML\Import\Helper;

use WPML\FP\Str;

class Taxonomies {

	public static function getTranslatableOnly( $withWpmlPrefix = false ) {
		global $sitepress;

		return wpml_collect( self::getTranslatable() )
			->diff( $sitepress->get_display_as_translated_taxonomies() )
			->map( self::addWpmlPrefix( $withWpmlPrefix ) )
			->toArray();
	}

	public static function getTranslatable( $withWpmlPrefix = false ) {
		global $sitepress;

		return wpml_collect( $sitepress->get_translatable_taxonomies() )
			->map( self::addWpmlPrefix( $withWpmlPrefix ) )
			->toArray();
	}

	private static function addWpmlPrefix( $withWpmlPrefix ) {
		return Str::concat( $withWpmlPrefix ? 'tax_' : '' );
	}

	public static function isTranslatable( $taxonomy ) {
		return in_array( $taxonomy, self::getTranslatable(), true );
	}
}
