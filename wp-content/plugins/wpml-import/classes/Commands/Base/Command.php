<?php

namespace WPML\Import\Commands\Base;

use WPML\Collect\Support\Collection;

interface Command {

	public static function getTitle();

	public static function getDescription();

	public function countPendingItems( ?Collection $args = null );

	public function run( ?Collection $args = null );
}
