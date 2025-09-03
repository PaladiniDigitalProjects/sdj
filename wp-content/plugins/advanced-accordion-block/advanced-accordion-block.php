<?php

/**
 * Plugin Name: Advanced Accordion Block
 * Description: <strong>Advanced Accordion Block</strong> is a custom Gutenberg Block that allows to showcase the content in accordion mode. It also helps to build FAQ sections easily.
 * Requires at least: 5.7
 * Requires PHP: 7.4
 * Version: 5.1.0
 * Plugin URI: https://spider-themes.net/advanced-accordion-block
 * Author: Spider Themes
 * Author URI: https://spider-themes.net
 * License: GPLv3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-accordion-block
 *
 * @package         @wordpress/create-block
 *
 */
// Stop Direct Access
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
if ( function_exists( 'aab_fs' ) ) {
    aab_fs()->set_basename( false, __FILE__ );
} else {
    // DO NOT REMOVE THIS IF, IT IS ESSENTIAL FOR THE `function_exists` CALL ABOVE TO PROPERLY WORK.
    if ( !function_exists( 'aab_fs' ) ) {
        function aab_fs() {
            global $aab_fs;
            if ( !isset( $aab_fs ) ) {
                // Activate multisite network integration.
                if ( !defined( 'WP_FS__PRODUCT_11041_MULTISITE' ) ) {
                    define( 'WP_FS__PRODUCT_11041_MULTISITE', true );
                }
                // Include Freemius SDK.
                require_once dirname( __FILE__ ) . '/vendor/fs/start.php';
                $aab_fs = fs_dynamic_init( array(
                    'id'               => '11041',
                    'slug'             => 'advanced-accordion-block',
                    'premium_slug'     => 'advanced-accordion-block-pro',
                    'type'             => 'plugin',
                    'public_key'       => 'pk_7347c71192131d87905aefe5e928f',
                    'premium_suffix'   => 'pro',
                    'is_premium'       => false,
                    'is_premium_only'  => false,
                    'has_addons'       => false,
                    'has_paid_plans'   => true,
                    'is_org_compliant' => true,
                    'trial'            => array(
                        'days'               => 14,
                        'is_require_payment' => true,
                    ),
                    'menu'             => array(
                        'slug'       => 'aab-settings',
                        'first-path' => 'admin.php?page=aab-settings',
                        'contact'    => false,
                        'support'    => false,
                    ),
                    'is_live'          => true,
                ) );
            }
            return $aab_fs;
        }

        // Init Freemius.
        aab_fs()->add_filter( 'hide_freemius_powered_by', '__return_true' );
        // Signal that SDK was initiated.
        do_action( 'aab_fs_loaded' );
    }
}
/**
 * Class AAGB_BLOCKS_CLASS
 *
 * This class is responsible for initializing the Advanced Accordion Block plugin, including defining constants,
 * including necessary files, registering blocks and block categories, and enqueuing assets for both the frontend and block editor.
 */
if ( !class_exists( 'AAGB_BLOCKS_CLASS' ) ) {
    final class AAGB_BLOCKS_CLASS {
        private $block_register;

        private $category_register;

        private $enqueue_assets;

        public function __construct() {
            // define constants
            $this->define_constants();
            // include files
            $this->core_includes();
            // block initialization
            $this->block_register = new AAB_Block_Register();
            // Instantiate the Block_Register class
            add_action( 'init', [$this->block_register, 'blocks_init'] );
            // Hook into init
            // blocks category registration
            $this->category_register = new AAB_Block_Category_Register();
            // Instantiate the Block_Register class
            if ( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
                add_filter(
                    'block_categories',
                    [$this->category_register, 'register_block_category'],
                    10,
                    2
                );
            } else {
                add_filter(
                    'block_categories_all',
                    [$this->category_register, 'register_block_category'],
                    10,
                    2
                );
            }
            // redirecting
            add_action( 'activated_plugin', [$this, 'user_redirecting'] );
            // Enqueue Assets class fetching
            $this->enqueue_assets = new AAB_Enqueue_Block_Assets();
            // Instantiate the Enque_Block_Assets class
        }

        /**
         * Initialize the plugin
         */
        public static function init() {
            static $instance = false;
            if ( !$instance ) {
                $instance = new self();
            }
            return $instance;
        }

        /**
         * Define the plugin constants
         */
        private function define_constants() {
            define( 'AAGB_VERSION', '5.1.0' );
            define( 'AAGB_URL', plugin_dir_url( __FILE__ ) );
            define( 'AAGB_ASSETS', AAGB_URL . 'assets/' );
            define( 'AAGB_PLUGIN_FILE', __FILE__ );
        }

        /**
         * File includes.
         */
        public function core_includes() {
            if ( aab_fs()->is_premium() ) {
                require_once __DIR__ . '/includes/feedback-voting.php';
                require_once __DIR__ . '/includes/faq_schema.php';
            }
            require_once __DIR__ . '/includes/register-blocks.php';
            require_once __DIR__ . '/includes/register-category.php';
            require_once __DIR__ . '/includes/enqueue-assets.php';
        }

        /**
         * Redirecting on activating the plugin
         *
         * @param $plugin
         *
         * @return void
         */
        function user_redirecting( $plugin ) {
            if ( plugin_basename( __FILE__ ) == $plugin ) {
                wp_redirect( admin_url( 'admin.php?page=aab-settings' ) );
                die;
            }
        }

    }

}
/**
 * Kickoff
 */
AAGB_BLOCKS_CLASS::init();
// external admin support file
require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
add_action( 'rest_api_init', function () {
    register_setting( 'general', 'aab_settings_defaults', array(
        'show_in_rest' => true,
        'type'         => 'string',
        'default'      => '',
    ) );
} );