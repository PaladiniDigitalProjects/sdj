<?php
/**
 * Class AAB_Enqueue_Block_Assets
 *
 * This class is responsible for enqueuing the necessary assets (JavaScript and CSS)
 * for both the frontend and the block editor in the plugin.
 */
class AAB_Enqueue_Block_Assets {
	// construct
	public function __construct() {
		add_action( 'enqueue_block_assets', [ $this, 'external_libraries' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'block_editor_assets' ] );
	}

	/**
	 * Enqueue Block FrontEnd Assets
	 */
	public function external_libraries() {
		if ( ! is_admin() ) {
			wp_enqueue_style( 'dashicons' );
		}

		wp_register_script(
			'anchor',
			AAGB_ASSETS . 'js/anchor.js',
			array( 'jquery' ),
			'5.0.0',
			true
		);

		wp_register_script(
			'aagb-separate-accordion',
			plugins_url( '/', __FILE__ ) . '../assets/js/separate-accordion.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		wp_register_script(
			'aahb-horizontal-accordion',
			plugins_url( '/', __FILE__ ) . '../assets/js/horizontal-accordion.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		wp_register_script(
			'aagb-separate-accordion-feedback',
			plugins_url( '/', __FILE__ ) . '../assets/js/feedback.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		wp_localize_script( 'aagb-separate-accordion-feedback', 'aab_feedbackAjax', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'my_ajax_nonce' ),
			'user_id' => get_current_user_id(), // Pass user ID to JS (0 if not logged in)
		) );


		wp_register_script(
			'aagb-accordion-group',
			plugins_url( '/', __FILE__ ) . '../assets/js/group-accordion.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		wp_register_script(
			'aagb-group-accordion-frontend',
			plugins_url( '/', __FILE__ ) . '../assets/js/group-accordion-frontend.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		wp_register_script(
			'mark',
			plugins_url( '/', __FILE__ ) . '../assets/js/jquery.mark.min.js',
			array( 'jquery' ),
			AAGB_VERSION,
			true
		);

		$licensing = array( 'can_use_premium_code' => aab_fs()->can_use_premium_code() );
		wp_localize_script( 'jquery', 'aagb_local_object', array(
			'ajax_url'  => admin_url( 'admin-ajax.php' ),
			'nonce'     => wp_create_nonce( 'aagb_accordion_nonce' ),
			'licensing' => $licensing['can_use_premium_code'],
			'assets'    => AAGB_ASSETS
		) );
	}

	/**
	 * Enqueue Block Editor Assets
	 */
	public function block_editor_assets() {
		wp_register_style(
			'aagb-separate-accordion',
			plugins_url( '/', __FILE__ ) . '../build/accordion/style-index.css',
			array(),
			'initial'
		);

		wp_register_style(
			'aagb-group-accordion-item',
			plugins_url( '/', __FILE__ ) . '../build/accordion-item/style-index.css',
			array(),
			'initial'
		);

		wp_register_style(
			'aagb-toolbar',
			plugins_url( '/', __FILE__ ) . '../build/accordion-toolbar/index.css',
			array(),
			'initial'
		);

		wp_enqueue_script(
			'aab-block_deletion_tracker',
			plugin_dir_url( __FILE__ ) . '../assets/js/block-deletion-tracker.js',
			[ 'wp-blocks', 'wp-editor', 'wp-data' ], // Dependencies
			AAGB_VERSION,
			true
		);

		wp_enqueue_script(
			'aab-attempt-recovery-all',
			plugin_dir_url( __FILE__ ) . '../assets/js/attempt-recovery-all.js',
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ),
			AAGB_VERSION,
			true
		);
	}

}