<?php
/**
 * Plugin Name: PDS Navigation
 * Plugin URI:  https://pdsdev.io
 * Description: Mobile menu styles extension for WordPress Navigation block
 * Version:     1.0.1
 * Author:      PDS Dev
 * Text Domain: pds-navigation
 * Domain Path: /languages
 * License:     GPL v2 or later
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'PDS_NAVIGATION_VERSION', '1.0.0' );
define( 'PDS_NAVIGATION_DIR',     plugin_dir_path( __FILE__ ) );
define( 'PDS_NAVIGATION_URL',     plugin_dir_url( __FILE__ ) );

/**
 * Attribute defaults mirror those declared in the JS block filter so that
 * a single source of truth lives per language. If you add a new option,
 * update both places.
 */
define( 'PDS_NAVIGATION_DEFAULTS', array(
    'menuWidth'      => 320,
    'overlayOpacity' => 50,
    'animationSpeed' => 300,
    'breakpoint'     => 768,
    'closeOnOverlay' => true,
    'closeOnEscape'  => true,
    'enableSubmenus' => false,
) );

// ─── Plugin class ──────────────────────────────────────────────────────────────

final class PDS_Navigation_Plugin {

    private static ?self $instance = null;

    public static function get_instance(): self {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action( 'wp_enqueue_scripts',       array( $this, 'enqueue_frontend_assets' ) );
        add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
        add_filter( 'render_block_core/navigation', array( $this, 'add_mobile_menu_data_attributes' ), 10, 2 );
    }

    // Prevent cloning and unserialisation of the singleton.
    private function __clone() {}
    public function __wakeup() {
        _doing_it_wrong( __METHOD__, 'Cannot unserialise a singleton.', '1.0.0' );
    }

    // ─── Frontend assets ────────────────────────────────────────────────────────

    public function enqueue_frontend_assets(): void {
        $css_path = PDS_NAVIGATION_DIR . 'build/frontend.css';
        $js_path  = PDS_NAVIGATION_DIR . 'build/frontend.js';
        $handler_path = PDS_NAVIGATION_DIR . 'build/menu-handler.js';

        if ( ! file_exists( $css_path ) || ! file_exists( $js_path ) ) {
            return;
        }

        wp_enqueue_style(
            'pds-navigation-frontend',
            PDS_NAVIGATION_URL . 'build/frontend.css',
            array(),
            PDS_NAVIGATION_VERSION
        );

        wp_enqueue_script(
            'pds-navigation-frontend',
            PDS_NAVIGATION_URL . 'build/frontend.js',
            array(),
            PDS_NAVIGATION_VERSION,
            true
        );

        if ( file_exists( $handler_path ) ) {
            wp_enqueue_script(
                'pds-menu-handler',
                PDS_NAVIGATION_URL . 'build/menu-handler.js',
                array( 'pds-navigation-frontend' ),
                PDS_NAVIGATION_VERSION,
                true
            );
        }
    }

    // ─── Editor assets ──────────────────────────────────────────────────────────

    public function enqueue_editor_assets(): void {
        $path = PDS_NAVIGATION_DIR . 'build/index.js';
        if ( ! file_exists( $path ) ) {
            return;
        }

        wp_enqueue_script(
            'pds-navigation-editor',
            PDS_NAVIGATION_URL . 'build/index.js',
            array( 'wp-hooks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-compose' ),
            PDS_NAVIGATION_VERSION,
            true
        );
    }

    // ─── Block render filter ─────────────────────────────────────────────────────

    /**
     * Inject data-pds-* attributes onto the outermost nav element so the
     * frontend JS can read the plugin's settings without an extra REST call.
     *
     * We target the root <nav> / <div> that WordPress renders for the
     * Navigation block, not the inner responsive-container, because the
     * frontend setupMenu() scans [data-pds-mobile-menu] on the block wrapper.
     */
    public function add_mobile_menu_data_attributes( string $block_content, array $block ): string {
        $settings = $block['attrs']['pdsMobileMenu'] ?? array();

        $style = $settings['style'] ?? 'none';
        if ( empty( $style ) || 'none' === $style ) {
            return $block_content;
        }

        $defaults = PDS_NAVIGATION_DEFAULTS;

        $data_attrs = array(
            'data-pds-mobile-menu'     => esc_attr( $style ),
            'data-pds-menu-width'      => (int) ( $settings['menuWidth']      ?? $defaults['menuWidth'] ),
            'data-pds-overlay-opacity' => (int) ( $settings['overlayOpacity'] ?? $defaults['overlayOpacity'] ),
            'data-pds-animation-speed' => (int) ( $settings['animationSpeed'] ?? $defaults['animationSpeed'] ),
            'data-pds-breakpoint'      => (int) ( $settings['breakpoint']      ?? $defaults['breakpoint'] ),
            'data-pds-close-on-overlay'=> $this->bool_attr( $settings['closeOnOverlay'] ?? $defaults['closeOnOverlay'] ),
            'data-pds-close-on-escape' => $this->bool_attr( $settings['closeOnEscape']  ?? $defaults['closeOnEscape'] ),
            'data-pds-enable-submenus' => $this->bool_attr( $settings['enableSubmenus'] ?? $defaults['enableSubmenus'] ),
        );

        return $this->inject_attributes( $block_content, $data_attrs );
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────────

    /**
     * Inject an array of attribute key=>value pairs onto the first (outermost)
     * element in an HTML string using a minimal tag-regex approach.
     *
     * DOMDocument is avoided here because:
     *  1. It cannot be scoped to the block's root element without loading the
     *     entire fragment — which re-serialises everything and drops HTML5 tags
     *     or attributes WordPress or third-party plugins may have added.
     *  2. The outermost element of a Navigation block is a single, well-formed
     *     opening tag, so a targeted regex is both safer and faster.
     *
     * The pattern matches the first opening tag up to and including its closing
     * `>`, capturing the tag name and any existing attributes, then appends the
     * new data-* attributes before the closing bracket.
     */
    private function inject_attributes( string $html, array $attributes ): string {
        $attr_string = '';
        foreach ( $attributes as $key => $value ) {
            $attr_string .= ' ' . $key . '="' . esc_attr( (string) $value ) . '"';
        }

        // Match the first opening tag: <tagname ...> or <tagname .../>
        return preg_replace(
            '/^(\s*<[a-zA-Z][a-zA-Z0-9-]*)(\s[^>]*)?(\/?>)/',
            '$1$2' . $attr_string . '$3',
            $html,
            1
        );
    }

    /**
     * Serialise a boolean setting to the string 'true'/'false' expected by
     * the JS dataset reader  (`dataset.pdsCloseOnOverlay !== 'false'`).
     */
    private function bool_attr( mixed $value ): string {
        return filter_var( $value, FILTER_VALIDATE_BOOLEAN ) ? 'true' : 'false';
    }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

PDS_Navigation_Plugin::get_instance();