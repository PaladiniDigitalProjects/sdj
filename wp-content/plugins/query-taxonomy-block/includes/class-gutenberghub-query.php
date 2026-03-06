<?php

/**
 * Gutenberghub Query
 *
 * @package GutenberghubQueryTaxonomy
 */

/**
 * Prepares the core query block for gutenberghub filters queries.
 */
class Gutenberghub_Query_Taxonomy_Query {

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	public function __construct() {
		add_filter('render_block', array($this, 'ctb_prepare_query_loop_block'), 10, 3);
		add_filter('register_block_type_args', array($this, 'ctb_prepare_query_id_consumption'), 10, 2);

	}



	/**
	 * Prepares all blocks to consume our custom query id.
	 *
	 * @param array  $args - Registeration arguments.
	 * @param string $block_name - Block type name.
	 *
	 * @return array - Modified arguments to consume custom query context id.
	 */
	public function ctb_prepare_query_id_consumption($args, $block_name) {
		if ('core/query' === $block_name) {
			$args['attributes'] = array_merge(
				$args['attributes'],
				array(
					'ghubQueryId' => array(
						'type' => 'string',
						'default' => ''
					)
				)
			);
			
			$current_provided_contexts = isset( $args[ 'provides_context' ] ) ? $args[ 'provides_context' ] : array();
			$args['provides_context'] = array_merge( $current_provided_contexts, array( 'ghubQueryId' => 'ghubQueryId' ) );
		} else {
			$current_use_context  = isset($args['uses_context']) ? $args['uses_context'] : array();
			$args['uses_context'] = array_merge($current_use_context, array('ghubQueryId'));
		}

		return $args;
	}

	/**
	 * Prepares the query loop block to use custom id.
	 *
	 * @param string   $block_content - Block content.
	 * @param array    $block - Parsed Block.
	 */
	public function ctb_prepare_query_loop_block($block_content, $block) {

		if ('core/query' !== $block['blockName']) {
			return $block_content;
		}

		$is_query_id_added = false !== stripos($block_content, 'ghub-query-id-');

		if ($is_query_id_added) {
			return $block_content;
		}

		$has_query_id = isset( $block['attrs']['ghubQueryId'] );

		if ( false === $has_query_id ) {
			return $block_content;
		}

		$block_content = str_replace('wp-block-query', sprintf('wp-block-query ghub-query-id-%s', $block['attrs']['ghubQueryId']), $block_content);

		return $block_content;
	}
}

new Gutenberghub_Query_Taxonomy_Query();
