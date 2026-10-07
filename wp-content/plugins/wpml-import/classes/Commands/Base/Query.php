<?php

namespace WPML\Import\Commands\Base;

trait Query {

	protected $wpdb;

	protected function getResultsWithLimit( $query, $limit ) {
		if ( $limit ) {
			$query = $this->wpdb->prepare(
				$query . PHP_EOL . 'LIMIT %d',
				$limit
			);
		}

		return (array) $this->wpdb->get_results( $query );
	}
}
