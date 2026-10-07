<?php

namespace WPML\Import\CLI;

class Hooks implements \IWPML_CLI_Action {

	public function add_hooks() {
		\WP_CLI::add_command( 'wpml import', Commands::class );
	}
}
