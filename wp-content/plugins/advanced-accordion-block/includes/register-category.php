<?php

/**
 * Register Block Category
 */
class AAB_Block_Category_Register {
	public function register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'accordion-block',
					'title' => esc_html__( 'Accordion Blocks', 'advanced-accordion-block' ),
				)
			),
			$categories // Remove the comma after $categories
		);
	}
}

add_action( 'init', function () {
	$patterns = glob( plugin_dir_path( __FILE__ ) . '../block-patterns/*.php' );
	foreach ( $patterns as $pattern ) {
		include $pattern;
	}
} );

