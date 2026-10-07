<?php

namespace WPML\Import\Helper;

class Language {

	public static function switchAndRun( $langCode, callable $callback ) {
		global $sitepress;

		$tempSwitchLang = new \WPML_Temporary_Switch_Language( $sitepress, $langCode );

		try {
			return $callback();
		} finally {
			$tempSwitchLang->restore_lang();
		}
	}
}
