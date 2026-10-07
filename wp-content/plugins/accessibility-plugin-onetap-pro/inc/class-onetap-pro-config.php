<?php
/**
 * Onetap Pro Config Class.
 *
 * This class manages the configuration settings for Onetap Pro.
 *
 * @link       https://wponetap.com
 * @since      1.0.0
 *
 * @package    Onetap_Pro_Config
 */

/**
 * Class Onetap_Pro_Config
 *
 * Manages configuration settings for Onetap Pro.
 */
class Onetap_Pro_Config {

	/**
	 * Static array property to hold configuration settings.
	 *
	 * @var array
	 */
	public static $settings = array(
		'icons'                            => 'design1',
		'size'                             => 'design-size2',
		'border'                           => 'design-border2',
		'color'                            => '#0048FE',
		'toggle-widget-button-focus-style' => 'off',
		'widget_position'                  => 'bottom-right',
		'position_top_bottom'              => 20,
		'position_left_right'              => 20,
		'widget_position_tablet'           => 'bottom-right',
		'position_top_bottom_tablet'       => 20,
		'position_left_right_tablet'       => 20,
		'widget_position_mobile'           => 'bottom-right',
		'position_top_bottom_mobile'       => 20,
		'position_left_right_mobile'       => 20,
		'hide_on_desktop'                  => 'off',
		'hide_on_tablet'                   => 'off',
		'hide_on_mobile'                   => 'off',
		'language'                         => 'en',
		'language_toggles'                 => 'en',
		'license'                          => '',
		'hide_powered_by_onetap'           => 'off',
	);

	/**
	 * Static array property to hold module configurations.
	 *
	 * @var array
	 */
	public static $modules = array(
		'accessibility_profiles' => 'on',
		'bigger_text'            => 'on',
		'highlight_links'        => 'on',
		'line_height'            => 'on',
		'readable_font'          => 'on',
		'cursor'                 => 'on',
		'text_magnifier'         => 'on',
		'dyslexic_font'          => 'on',
		'text_align'             => 'on',
		'letter_spacing'         => 'on',
		'font_weight'            => 'on',
		'dark_contrast'          => 'on',
		'light_contrast'         => 'on',
		'high_contrast'          => 'on',
		'monochrome'             => 'on',
		'saturation'             => 'on',
		'reading_line'           => 'on',
		'reading_mask'           => 'on',
		'read_page'              => 'on',
		'keyboard_navigation'    => 'on',
		'hide_images'            => 'on',
		'mute_sounds'            => 'on',
		'highlight_titles'       => 'on',
		'highlight_all'          => 'on',
		'stop_animations'        => 'on',
		'skip_to_content'        => 'on',
	);

	/**
	 * Static array property to hold general settings configurations.
	 *
	 * @var array
	 */
	public static $general_settings = array(
		'hide_powered_by_onetap' => 'off',
	);

	/**
	 * Static method to get a setting value.
	 *
	 * @param string $key The setting key to retrieve.
	 * @return mixed The setting value or null if key doesn't exist.
	 */
	public static function get_setting( $key ) {
		return isset( self::$settings[ $key ] ) ? self::$settings[ $key ] : null; // Return setting value or null.
	}

	/**
	 * Static method to get a module configuration value.
	 *
	 * @param string $key The module key to retrieve.
	 * @return mixed The module value or null if key doesn't exist.
	 */
	public static function get_module( $key ) {
		return isset( self::$modules[ $key ] ) ? self::$modules[ $key ] : null; // Return module value or null.
	}

	/**
	 * Static method to get a general setting configuration value.
	 *
	 * @param string $key The general setting key to retrieve.
	 * @return mixed The general setting value or null if key doesn't exist.
	 */
	public static function get_general_setting( $key ) {
		return isset( self::$general_settings[ $key ] ) ? self::$general_settings[ $key ] : null; // Return general setting value or null.
	}
}

// Example usage:
// Accessing static array values without creating an object.
// echo Onetap_Pro_Config::get_setting('language'); // Output: en.
// echo Onetap_Pro_Config::get_module('bigger_text'); // Output: on.
// echo Onetap_Pro_Config::get_general_setting('hide_powered_by_onetap'); // Output: off.
