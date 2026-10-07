<?php

namespace WPML\Import;

class EarlyHooks {

	public static function init() {
		if ( self::isImportScreen() ) {
			add_filter( 'wpml_show_admin_language_switcher', '__return_false' );
		}
	}

	private static function isImportScreen() {
		if ( ! is_admin() ) {
			return false;
		}

		$query = isset( $_SERVER['REQUEST_URI'] ) ? wp_parse_url( $_SERVER['REQUEST_URI'], PHP_URL_QUERY ) : [];

		if ( $query ) {
			parse_str( $query, $queryArgs );

			if ( isset( $queryArgs['page'] ) && WPML_IMPORT_ADMIN_PAGE_SLUG === $queryArgs['page'] ) {
				return true;
			}
		}

		return false;
	}
}
