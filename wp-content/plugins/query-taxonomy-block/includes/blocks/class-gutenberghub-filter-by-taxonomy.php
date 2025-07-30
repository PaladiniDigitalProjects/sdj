<?php

/**
 * Taxonomy By Taxonomy Block
 *
 * @package GutenberghubQueryTaxonomy
 */

if (!defined('ABSPATH')) {
	die('No direct access');
}

/**
 * Main class for handling block functionalities.
 */
class Gutenberghub_Query_Taxonomy_Block
{

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	public function __construct()
	{
		add_action('init', array($this, 'ctb_register'));
		add_filter('query_loop_block_query_vars', array($this, 'ctb_apply_query'), 10, 3);
	}

	/**
	 * Applies the associated query to the query loop block results.
	 *
	 * @param array    $query - Current query.
	 * @param WP_Block $block - Block instance.
	 * @param int      $page - Current query page.
	 *
	 * @return - Updated Query.
	 */
	public function ctb_apply_query($query, $block, $page)
	{

		$block_query_id   = $block->context['ghubQueryId'];
		$current_query_id = isset($_GET['qid']) ? $_GET['qid'] : -1;
		$is_current_query = (int) $current_query_id === (int) $block_query_id;

		if (!$is_current_query) {
			return $query;
		}

		$available_taxonomies = array_values(get_taxonomies(array('public' => true)));
		$requested_taxonomies = array();

		foreach ($available_taxonomies as $available_taxonomy) {
			if (array_key_exists($available_taxonomy, $_GET)) {
				$requested_taxonomies[] = $available_taxonomy;
			}
		}

		if (empty($requested_taxonomies)) {
			return $query;
		}

		$taxonomy_query = array(
			'relation' => 'AND',
		);

		foreach ($requested_taxonomies as $requested_taxonomy) {
			$taxonomy_query[] = array(
				'taxonomy' => $requested_taxonomy,
				'field'    => 'slug',
				'terms'    => explode(',', sanitize_text_field(wp_unslash($_GET[$requested_taxonomy]))),
			);
		}

		if (isset($query['tax_query'])) {
			$query['tax_query'] = array_merge($taxonomy_query, $query['tax_query']);
		} else {
			$query['tax_query'] = $taxonomy_query;
		}

		return $query;
	}

	/**
	 * Renders the block.
	 *
	 * @param array    $attributes - Attributes.
	 * @param string   $content - Block content.
	 * @param WP_Block $block_instance - Block instance.
	 *
	 * @return string - Rendered block.
	 */
	public function render($attributes, $content, $block_instance)
	{
		$parent_taxonomy = isset($attributes['taxonomySlug']) ? $attributes['taxonomySlug'] : null;

		if (is_null($parent_taxonomy)) {
			return '';
		}

		/**
		 * Inherited Query from query loop.
		 */
		$inherited_query = $block_instance->context['query'];

		/**
		 * Checks if there is a selective taxonomy query
		 * from the parent Query loop.
		 */
		$has_selective_taxonomy_query = isset($inherited_query['taxQuery'][$parent_taxonomy]);
		$hide_empties                 = isset($attributes['hideEmpties']) ? $attributes['hideEmpties'] : true;

		$query_args = array(
			'hide_empty' => $hide_empties,
			'taxonomy'   => $parent_taxonomy,
		);

		/**
		 * Displaying only selective term ids if set.
		 */
		if ($has_selective_taxonomy_query) {
			$selective_taxonomy_term_ids = $has_selective_taxonomy_query ? $inherited_query['taxQuery'][$parent_taxonomy] : array();
			$query_args['include']       = $selective_taxonomy_term_ids;
		}

		$terms           = get_terms($query_args);
		$query_id        = isset($block_instance->context['ghubQueryId']) ? $block_instance->context['ghubQueryId'] : -1;

		$active_taxonomy = isset($_GET[$parent_taxonomy]) ? sanitize_text_field(wp_unslash($_GET[$parent_taxonomy])) : null;
		$rendered_block  = '';
		$layout          = isset($attributes['layout']) ? $attributes['layout'] : 'select';
		$display_count   = isset($attributes['displayCount']) ? $attributes['displayCount'] : false;

		// Updating terms to include total count.
		$terms = $display_count ? $this->ctb_merge_total_count($terms) : $terms;

		switch ($layout) {
			case 'select':
				$rendered_block = $this->ctb_render_selectbox($terms, $parent_taxonomy, $active_taxonomy, $attributes,  $block_instance);
				break;

			case 'menu':
				$rendered_block = $this->ctb_render_menu($terms, $parent_taxonomy, $active_taxonomy, $query_id,  $attributes, $block_instance);
				break;

			case 'checkbox':
				$rendered_block = $this->ctb_render_checkbox($terms, $parent_taxonomy, $active_taxonomy, $query_id,  $attributes, $block_instance);
				break;

			case 'radio':
				$rendered_block = $this->ctb_render_radio($terms, $parent_taxonomy, $active_taxonomy, $query_id,  $attributes, $block_instance);
		}

		/**
		 * Replacing content inside the block container.
		 */
		return str_replace('%1$s', $rendered_block, $content);
	}

	/**
	 * Renders the selectbox layout for selecting filter.
	 *
	 * @param WP_Term[]   $terms - Terms to render.
	 * @param string      $parent_taxonomy - Parent taxonomy slug.
	 * @param string|null $active_taxonomy_term - Currently active taxonomy term.
	 */
	public function ctb_render_selectbox($terms, $parent_taxonomy, $active_taxonomy_term, $attributes, $block_instance)
	{
		$is_query_active = ghqt_is_query_active($block_instance);
		$total_count = wp_count_posts($block_instance->context['query']['postType'])->publish;
		$display_count   = isset($block_instance->attributes['displayCount'])  ? $block_instance->attributes['displayCount'] : false;
		$options = array();


		if (isset($block_instance->attributes['showAll']) && true === $block_instance->attributes['showAll']) {
			$options[] = sprintf(
				'<option value="">%2$s %1$s</option>',
				$display_count ? '(' . $total_count . ')' : "",
				'' === $block_instance->attributes['showAllLabel'] ? 'All' : $block_instance->attributes['showAllLabel']
			);
		}

		// Appending options.
		foreach ($terms as $term) {
			if (!isset($term->name)) {
				continue;
			}
			$options[] = sprintf(
				'<option value="%2$s" %3$s>%1$s</option>',
				esc_html($term->name),
				esc_html($term->slug),
				$active_taxonomy_term === $term->slug && $is_query_active ? 'selected' : ''
			);
		}




		return sprintf(
			'<select name="%2$s">%1$s</select>',
			join('', $options),
			$parent_taxonomy
		);
	}

	/**
	 * Renders the menu layout for selecting filter.
	 *
	 * @param WP_Term[]   $terms - Terms to render.
	 * @param string      $parent_taxonomy - Parent taxonomy slug.
	 * @param string|null $active_taxonomy_term - Currently active taxonomy term.
	 * @param int         $query_id - Block query id.
	 */
	public function ctb_render_menu($terms, $parent_taxonomy, $active_taxonomy_term, $query_id, $attributes, $block_instance)
	{
		$is_query_active = ghqt_is_query_active($block_instance);
		$total_count = wp_count_posts($block_instance->context['query']['postType'])->publish;

		$display_count   = isset($block_instance->attributes['displayCount'])  ? $block_instance->attributes['displayCount'] : false;
		$menu_items = array();

		if (isset($block_instance->attributes['showAll']) && true === $block_instance->attributes['showAll']) {
			$menu_items[] = sprintf(
				'<button class="wp-element-button %1$s" data-filter_value="">%3$s %2$s</button>',
				is_null($active_taxonomy_term) ? 'is-active-menu' : '',
				$display_count ? '(' . $total_count . ')' : "",
				'' === $block_instance->attributes['showAllLabel'] ? 'All' : $block_instance->attributes['showAllLabel']

			);
		}

		// Appending menu items.
		foreach ($terms as $term) {
			$is_active    = $active_taxonomy_term === $term->slug;
			$menu_items[] = sprintf(
				'<button class="wp-element-button %3$s" data-filter_value="%2$s">%1$s</button>',
				esc_html($term->name),
				esc_attr($term->slug),
				$is_active && $is_query_active ? 'is-active-menu' : ''
			);
		}

		return sprintf(
			'<div class="gutenberghub-query-taxonomy-menu" data-tax="%2$s" >%1$s</div>',
			join('', $menu_items),
			$parent_taxonomy
		);
	}


	/**
	 * Renders the radio layout for selecting filter.
	 *
	 * @param WP_Term[]   $terms - Terms to render.
	 * @param string      $parent_taxonomy - Parent taxonomy slug.
	 * @param string|null $active_taxonomy_term - Currently active taxonomy term.
	 * @param int         $query_id - Block query id.
	 */
	public function ctb_render_radio($terms, $parent_taxonomy, $active_taxonomy_term, $query_id, $attributes, $block_instance)
	{
		$is_query_active = ghqt_is_query_active($block_instance);
		$total_count = wp_count_posts($block_instance->context['query']['postType'])->publish;
		$display_count   = isset($block_instance->attributes['displayCount'])  ? $block_instance->attributes['displayCount'] : false;

		$radio_items = array();

		if (isset($block_instance->attributes['showAll']) && true === $block_instance->attributes['showAll']) {
			$all_active_terms = is_array($active_taxonomy_term) ?  explode(',', $active_taxonomy_term) : array();
			$is_all_active    = in_array("", $all_active_terms, true);

			$radio_items[] = sprintf(
				'<label>
					<input type="radio" name="taxonomy-filter" value="" %3$s/>
					%2$s %1$s
				</label>',
				$display_count ? '(' . $total_count . ')' : "",
				$block_instance->attributes['showAllLabel'],
				$is_all_active && $is_query_active ? 'checked' : '',

			);
		}
		foreach ($terms as $term) {

			$active_terms = is_array($active_taxonomy_term) ?  explode(',', $active_taxonomy_term) : array();
			$is_active    = in_array($term->slug, $active_terms, true);

			$radio_items[] = sprintf(
				'<label>
					<input type="radio" name="taxonomy-filter" value="%2$s" %3$s/>
					%1$s
				</label>
				',
				esc_html($term->name),
				esc_html($term->slug),
				$is_active && $is_query_active ? 'checked' : '',
				esc_html($term->taxonomy)
			);
		}
		return sprintf(
			'<div class="gutenberghub-query-taxonomy-radio" data-tax="%2$s">%1$s</div>',
			join('', $radio_items),
			$parent_taxonomy
		);
	}

	/**
	 * Renders the checkbox layout for selecting filter.
	 *
	 * @param WP_Term[]   $terms - Terms to render.
	 * @param string      $parent_taxonomy - Parent taxonomy slug.
	 * @param string|null $active_taxonomy_term - Currently active taxonomy term.
	 * @param int         $query_id - Block query id.
	 */
	public function ctb_render_checkbox($terms, $parent_taxonomy, $active_taxonomy_term, $query_id, $attributes, $block_instance)
	{
		$is_query_active = ghqt_is_query_active($block_instance);
		$checkbox_items = array();

		foreach ($terms as $term) {
			$active_terms = is_array($active_taxonomy_term) ?  explode(',', $active_taxonomy_term) : array();
			$is_active    = in_array($term->slug, $active_terms, true);

			$checkbox_items[] = sprintf(
				'<label>
					<input type="checkbox" value="%2$s" %3$s/>
					%1$s
				</label>
				',
				esc_html($term->name),
				esc_html($term->slug),
				$is_active && $is_query_active ? 'checked' : ''
			);
		}

		return sprintf(
			'<div class="gutenberghub-query-taxonomy-checkbox" data-tax="%2$s">%1$s</div>',
			join('', $checkbox_items),
			$parent_taxonomy
		);
	}

	/**
	 * Merges total assigned post count to the given terms.
	 *
	 * @param WP_Term[] $terms - Terms.
	 *
	 * @return WP_Term[] - Terms with name modified.
	 */
	public function ctb_merge_total_count($terms)
	{

		foreach ($terms as $term) {
			$term->name = $term->name . ' ' . sprintf('(%1$s)', number_format($term->count));
		}

		return $terms;
	}

	/**
	 * Main registeration.
	 *
	 * @return void
	 */
	public function ctb_register()
	{
		register_block_type_from_metadata(
			GHQT_DIR_PATH . 'dist/block.json',
			array(
				'render_callback' => array($this, 'render'),
			)
		);
	}
}

new Gutenberghub_Query_Taxonomy_Block();
