<?php

namespace WPML\Forms\WPForms\Language;

use SitePress;

class RequestScope {

	const CLOSE_PRIORITY = 0;

	private $sitepress;

	private $open = 0;

	private $closeRegistered = false;

	public function __construct( SitePress $sitepress ) {
		$this->sitepress = $sitepress;
	}

	public function open( $languageCode, $writesCookie = false ) {
		if ( ! $languageCode ) {
			return false;
		}

		$this->registerClose();

		$this->sitepress->switch_lang( $languageCode, $writesCookie );

		++$this->open;

		return true;
	}

	public function close() {
		while ( $this->open > 0 ) {
			--$this->open;
			$this->sitepress->switch_lang();
		}
	}

	public function openScopes() {
		return $this->open;
	}

	private function registerClose() {
		if ( ! $this->closeRegistered ) {
			$this->closeRegistered = true;

			add_action( 'shutdown', [ $this, 'close' ], self::CLOSE_PRIORITY );
		}
	}
}
