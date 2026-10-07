<?php

namespace WPML\Import\Commands;

use WPML\API\Sanitize;
use WPML\FP\Fns;
use WPML\FP\Maybe;

class Provider {

	public static function get( $context ) {
		return wpml_collect()
			->merge( self::getProcessCommands( $context ) )
			->merge( self::getCleanupCommands( $context ) )
			->filter( [ self::class, 'isCommandClass' ] )
			->values()
			->toArray();
	}

	public static function getProcessCommands( $context ) {
		$processCommands = [
			SetTermsLanguage::class,
			SetPostsLanguage::class,
			SetAttachmentsLanguage::class,
			ConnectPostImageAttachments::class,
			FixImportedPostSlugs::class,
			SetFinalPostsStatus::class,
			SetInlineTermsLanguage::class,
			DuplicateTermsAssignedToPostsInDifferentLanguage::class,
			ReassignPostsToTranslatedTerms::class,
			DeleteOriginalsOfDuplicatedTerms::class,
			ConnectTermTranslationsByPostsWithOnlyOneAssignment::class,
			MarkAncestorsForParentLanguageFix::class,
			SetUnassignedParentTermsLanguage::class,
			SendPostsToAutomaticTranslation::class,
		];

		return (array) apply_filters( 'wpml_import_process_commands', $processCommands, $context );
	}

	public static function getCleanupCommands( $context ) {
		$cleanupCommands = [
			CleanupTermFields::class,
			CleanupPostFields::class,
			FlushTranslationsCache::class,
		];

		return (array) apply_filters( 'wpml_import_cleanup_commands', $cleanupCommands, $context );
	}

	public static function isCommandClass( $className ) {
		return in_array( Base\Command::class, class_implements( $className ), true );
	}

	public static function getCommandInstance( $commandClass ) {
		$command = null;

		try {
			$command = Maybe::fromNullable( $commandClass )
				->map( [ Sanitize::class, 'string' ] )
				->filter( [ self::class, 'isCommandClass' ] )
				->map( Fns::make() )
				->getOrElse( null );
		} catch ( \Exception $e ) {
		}

		return $command;
	}
}
