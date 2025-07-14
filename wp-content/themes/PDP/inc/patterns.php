<?php
/**
* gutenbergtheme Patterns
*
* PATERNS */


add_action('init', function() {
	remove_theme_support('core-block-patterns');
});

// function my_register_block_patterns()
//   {
//     if (class_exists('WP_Block_Patterns_Registry')) {
//       // register pattern
//       register_block_pattern('mine/your-pattern', [
//         'title' => __('Section Pattern', 'PDP'),
//         'description' => _x(
//           'Your pattern description',
//           'Block pattern description',
//           'PDP'
//         ),
//         'content' =>
//           "<!-- wp:paragraph -->\n<p>Your pattern</p>\n<!-- /wp:paragraph -->",
//         'categories' => ['section'],
//       ]);

//       // register categories
//       register_block_pattern_category('section', [
//         'label' => _x('SectionAA', 'PDP'),
//       ]);
//     }
//   }

// add_action( 'init', 'my_register_block_patterns' );

?>