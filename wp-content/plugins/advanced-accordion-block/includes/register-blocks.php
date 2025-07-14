<?php
/**
 * Register Block
 */
class AAB_Block_Register {
	public function __construct() {
		add_action( 'init', [ $this, 'blocks_init' ] );
	}

	/**
	 * Register block
	 *
	 * @param string $name
	 * @param array $options
	 */
	public function register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/../build/' . $name, $options );
	}

	public function blocks_init() {
		$this->register_block( 'accordion', array(
			'render_callback' => [ $this, 'render_separate_accordion' ],
		) );
		$this->register_block( 'group-accordion', array(
			'render_callback' => [ $this, 'render_group_accordion' ],
		) );
		$this->register_block( 'accordion-item', array(
			'render_callback' => [ $this, 'render_group_accordion_item' ],
		) );
		$this->register_block( 'accordion-toolbar', array(
			'render_callback' => [ $this, 'render_accordion_toolbar' ],
		) );
		$this->register_block( 'accordion-default', array(
			'render_callback' => [ $this, 'render_accordion_default' ],
		) );
		$this->register_block( 'horizontal-accordion', array(
			'render_callback' => [ $this, 'render_horizontal_accordion' ],
		) );
		$this->register_block( 'horizontal-accordion-item', array(
			'render_callback' => [ $this, 'render_horizontal_accordion_item' ],
		) );
	}

	// render inline css
	public function render_inline_css( $handle, $css ) {
		wp_register_style( $handle, false );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, $css );
	}

	// Separate accordion render callback
	public function render_separate_accordion( $attributes, $content ) {
		wp_register_style( 'aagb-separate-accordion', plugins_url( '/', __FILE__ ) . '../build/accordion/style-index.css' );

		if (
			($attributes['anchorLinkShow'] ?? '') == 1 ||
			( ($attributes['anchorLinkShow'] ?? '') != 1 && ($attributes['defaultStyles']['anchorLinkShow'] ?? '') == 1 )
		) {
			wp_enqueue_script( 'anchor' );
		}
		if ( $attributes['feedbackShow'] == '1' ) {
			wp_enqueue_script( 'aagb-separate-accordion-feedback' );
		}

		return $content;
	}

	// Group accordion-item render callback
	public function render_group_accordion_item( $attributes, $content ) {
		wp_register_style( 'aagb-group-accordion-item', plugins_url( '/', __FILE__ ) . '../build/accordion-item/style-index.css' );

		return $content;
	}

	// Accordion Toolbar render callback
	public function render_accordion_toolbar( $attributes, $content ) {
		wp_register_style( 'aagb-accordion-toolbar', plugins_url( '/', __FILE__ ) . '../build/accordion-toolbar/index.css' );

		return $content;
	}

	// Accordion Toolbar render callback
	public function render_accordion_default( $attributes, $content ) {
		wp_register_style( 'aagb-accordion-defaults', plugins_url( '/', __FILE__ ) . '../build/accordion-default/index.css' );

		return $content;
	}

	// Group accordion render callback
	public function render_group_accordion( $attributes, $content ) {


		if (
			($attributes['anchorLinksShow'] ?? '') == 1 ||
			( ($attributes['anchorLinksShow'] ?? '') != 1 && ($attributes['defaultStyles']['anchorLinkShow'] ?? '') == 1 )
		) {
			wp_enqueue_script( 'anchor' );
		}

		if ( $attributes['searchShow'] == '1' ) {
			wp_enqueue_script( 'mark' );
		}

		$container_border_style = isset( $attributes['activeAccordionBorder']['style'] ) ? 'border-style: ' . $attributes['activeAccordionBorder']['style']
		                                                                                   . ' !important;' : '';
		$container_border_color = isset( $attributes['activeAccordionBorder']['color'] ) ? 'border-color: ' . $attributes['activeAccordionBorder']['color']
		                                                                                   . ' !important;' : '';
		$container_background_color = isset( $attributes['activeBackground'] ) ? 'background: ' . $attributes['activeBackground']
		                                                                         . ' !important;' : '';
		$body_border_style = isset( $attributes['activeAccordionBorder']['style'] ) ? 'border-top-style: ' . $attributes['activeAccordionBorder']['style']
		                                                                              . ' !important;' : '';
		$body_border_color = isset( $attributes['activeAccordionBorder']['color'] ) ? 'border-top-color: ' . $attributes['activeAccordionBorder']['color'] . ' !important;' : '';

		if ( ! is_admin() ) {
			$handle     = 'aagb-' . $attributes['uniqueId'];
			$custom_css = '';
			// container
			$custom_css .= '.aagb_accordion_' . $attributes['uniqueId'] . ' > .aagb__accordion_container.aagb__accordion_active{ '
			               . $container_border_color . ' border-width: ' . $attributes['activeAccordionBorder']['width']
			               . '!important; ' . $container_border_style . $container_background_color . ' }';
			// body
			$custom_css .= '.aagb_accordion_' . $attributes['uniqueId'] . ' > .aagb__accordion_body--show{ '
			               . $body_border_color . ' border-top-width: '
			               . $attributes['activeAccordionBorder']['width']
			               . '!important; ' . $body_border_style . ' }';

			$this->render_inline_css( $handle, $custom_css );
		}

		return $content;
	}
	
	// Horizontal accordion render callback
	public function render_horizontal_accordion( $attributes, $content ) {
		return $content;
	}

	// Horizontal accordion item render callback
	public function render_horizontal_accordion_item( $attributes, $content ) {
		return $content;
	}
}