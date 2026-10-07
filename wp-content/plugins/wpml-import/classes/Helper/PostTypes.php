<?php

namespace WPML\Import\Helper;

class PostTypes {

	public static function getTranslatable() {
		global $sitepress;

		return wpml_collect( $sitepress->get_translatable_documents() )
			->keys()
			->toArray();
	}

	public static function isTranslatable( $postType ) {
		return in_array( $postType, self::getTranslatable(), true );
	}

	public static function isDisplayAsTranslated( $postType ) {
		global $sitepress;

		return $sitepress->is_display_as_translated_post_type( $postType );
	}
}
