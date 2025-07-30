<?php

/**
 * Query utilities.
 *
 * @package GutenberghubQueryTaxonomy
 */

/**
 * Checks if the query is active for the given block.
 *
 * @param WP_Block $block - block to check query for.
 *
 * @return bool - True if query is active, otherwise false.
 */
function ghqt_is_query_active($block) {

	if (!isset($block->context['ghubQueryId'])) {
		return false;
	}

	$block_query_id   = $block->context['ghubQueryId'];
	$current_query_id = isset($_GET['qid']) ? sanitize_text_field(wp_unslash($_GET['qid'])) : null;

	if (is_null($current_query_id)) {
		return false;
	}

	return (int) $block_query_id === (int) $current_query_id;
}

/**
 * Convert kababcase string to camelcase
 * 
 * @return string - a-to-z convert to A To Z
 * 
 */
function cbt_dashesToCamelCase($string, $capitalizeFirstCharacter = false) {

	$str = str_replace('-', ' ', ucwords($string, '-'));

	if (!$capitalizeFirstCharacter) {
		$str = lcfirst($str);
	}

	return $str;
}
