<?php

namespace WPML\Import\Integrations\Base\Strategies\Generate;

use WPML\FP\Str;

trait QueriedObject {

	abstract protected function getQuerySignature();

	private function isMetaQuery( $query ) {
		return (bool) Str::startsWith( $this->getQuerySignature(), $query );
	}

	private function getQueriedObjectId( $query ) {
		return (int) trim( Str::replace( $this->getQuerySignature(), '', $query ) );
	}

	private function getQueriedPost( $query ) {
		return get_post( $this->getQueriedObjectId( $query ) );
	}

	private function getQueriedTerm( $query ) {
		return get_term( $this->getQueriedObjectId( $query ) );
	}
}
