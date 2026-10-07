<?php

namespace WPML\Import\API;

use WPML\LIB\WP\Hooks as WPHooks;
use WPML\Import\Helper\ImportedItems;

class Hooks implements \IWPML_Frontend_Action, \IWPML_Backend_Action, \IWPML_DIC_Action {

	const TRIGGER_ENDPOINT = 'wpml_import_trigger';
	const TRIGGER_HOOK     = 'wpml_import_process';

	private $commands;

	private $importedItems;

	public function __construct( Commands $commands, ImportedItems $importedItems ) {
		$this->commands      = $commands;
		$this->importedItems = $importedItems;
	}

	public function add_hooks() {
		WPHooks::onAction( 'init' )
			->then( [ $this, 'handleUrlRequest' ] );

		WPHooks::onAction( self::TRIGGER_HOOK )
			->then( [ $this->commands, 'processImport' ] );
	}

	public function handleUrlRequest() {
		if ( $this->isRetiredGetTrigger() ) {
			if ( ! headers_sent() ) {
				header( 'Allow: POST' );
			}

			wp_die(
				/* translators: Text of the page returned when the import trigger is called the old way, with the key in the address. */
				esc_html__( 'The import trigger no longer accepts the key in the URL. Send it in a POST body.', 'wpml-import' ),
				/* translators: Title of the page returned when the import trigger is called the old way, with the key in the address. It is the name of HTTP status 405. */
				esc_html__( 'Method Not Allowed', 'wpml-import' ),
				405
			);
		}

		if ( ! $this->isValidTriggerRequest() ) {
			return;
		}

		$key = $this->getTriggerKey();

		if ( ! $this->isValidKey( $key ) ) {
			wp_die(
				/* translators: Text and title of the page returned when the import trigger is called with a wrong or missing key. It is the name of HTTP status 401. */
				esc_html__( 'Unauthorized', 'wpml-import' ),
				esc_html__( 'Unauthorized', 'wpml-import' ),
				401
			);
		}

		if ( ! $this->hasItemsToProcess() ) {
			wp_die(
				/* translators: Text of the page returned when the import trigger runs and there is nothing left to import. */
				esc_html__( 'No items to process', 'wpml-import' ),
				/* translators: Title of the page returned when the import trigger runs and there is nothing left to import. It is the name of HTTP status 204. */
				esc_html__( 'No Content', 'wpml-import' ),
				204
			);
		}

		try {
			$this->commands->processImport( 'endpoint' );

			wp_die(
				/* translators: Text of the page returned when the import trigger has finished running. */
				esc_html__( 'Import process completed', 'wpml-import' ),
				/* translators: Title of the page returned when the import trigger has finished running. It is the name of HTTP status 200. */
				esc_html__( 'Success', 'wpml-import' ),
				200
			);
		} catch ( \Exception $e ) {
			if ( defined( 'WP_DEBUG_LOG' ) && constant( 'WP_DEBUG_LOG' ) ) {
				error_log( $e->getMessage() );
			}

			wp_die(
				/* translators: Text of the page returned when the import trigger stopped on an error. */
				esc_html__( 'Import process failed', 'wpml-import' ),
				/* translators: Title of the page returned when the import trigger stopped on an error. It is the name of HTTP status 500. */
				esc_html__( 'Internal Server Error', 'wpml-import' ),
				500
			);
		}
	}

	private function isRetiredGetTrigger(): bool {
		if ( ! in_array( $this->getRequestMethod(), [ 'GET', 'HEAD' ], true ) ) {
			return false;
		}

		return ! empty( $_GET[ self::TRIGGER_ENDPOINT ] );
	}

	private function isValidTriggerRequest(): bool {
		if ( 'POST' !== $this->getRequestMethod() ) {
			return false;
		}

		return ! empty( $_POST[ self::TRIGGER_ENDPOINT ] );
	}

	private function getTriggerKey(): string {
		return sanitize_text_field( $_POST[ self::TRIGGER_ENDPOINT ] ?? '' );
	}

	private function getRequestMethod(): string {
		return strtoupper( $_SERVER['REQUEST_METHOD'] ?? '' );
	}

	private function isValidKey( string $key ): bool {
		if ( ! defined( 'WPML_IMPORT_KEY' ) ) {
			return false;
		}
		$expectedKey = constant( 'WPML_IMPORT_KEY' );
		if ( ! is_string( $expectedKey ) || '' === $expectedKey ) {
			return false;
		}
		return hash_equals( $expectedKey, $key );
	}

	private function hasItemsToProcess() {
		return $this->importedItems->countPosts() > 0 || $this->importedItems->countTerms() > 0;
	}
}
