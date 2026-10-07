<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://wponetap.com
 * @since      1.0.0
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/admin
 * @author     OneTap <support@wponetap.com>
 */
class Accessibility_Plugin_Onetap_Pro_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The option group name used for registering accessibility status settings.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $accessibility_status_option_group    Option group ID for accessibility status settings.
	 */
	protected $accessibility_status_option_group = 'options_group_accessibility_status';

	/**
	 * The list of allowed languages for accessibility status settings.
	 *
	 * @since    1.0.0
	 * @access   public
	 * @const    array     ALLOWED_LANGUAGES    Array of allowed language codes.
	 */
	const ALLOWED_LANGUAGES = array(
		'en',
		'de',
		'es',
		'fr',
		'it',
		'pl',
		'se',
		'fi',
		'pt',
		'ro',
		'si',
		'sk',
		'nl',
		'dk',
		'gr',
		'cz',
		'hu',
		'lt',
		'lv',
		'ee',
		'hr',
		'ie',
		'bg',
		'no',
		'tr',
		'id',
		'pt-br',
		'ja',
		'ko',
		'zh',
		'ar',
		'ru',
		'hi',
		'uk',
		'sr',
	);

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 *
	 * @param string $hook The current admin page hook suffix passed by WordPress.
	 */
	public function enqueue_styles( $hook ) {

		if (
			'toplevel_page_apop-settings' === $hook ||
			'onetap-pro_page_apop-general-settings' === $hook ||
			'onetap-pro_page_apop-alt-text' === $hook ||
			'onetap-pro_page_apop-modules' === $hook ||
			'admin_page_apop-module-labels' === $hook ||
			'onetap-pro_page_apop-accessibility-status' === $hook
		) {

			// Enqueue the main admin CSS for the plugin.
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/accessibility-plugin-onetap-pro-admin.css', array(), $this->version, 'all' );

			// Enqueue Google Fonts (Inter) for the admin pages of the plugin.
			wp_enqueue_style(
				'onetap-google-fonts',
				'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
				array(),
				$this->version,
				'all'
			);
		}
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 *
	 * @param string $hook The current admin page hook suffix passed by WordPress.
	 */
	public function enqueue_scripts( $hook ) {

		if (
			'toplevel_page_apop-settings' === $hook ||
			'onetap-pro_page_apop-general-settings' === $hook ||
			'onetap-pro_page_apop-alt-text' === $hook ||
			'onetap-pro_page_apop-modules' === $hook ||
			'admin_page_apop-module-labels' === $hook ||
			'onetap-pro_page_apop-accessibility-status' === $hook
		) {
			wp_enqueue_script( $this->plugin_name . '-sweetalert', ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL . 'assets/js/sweetalert.min.js', array(), $this->version, true );

			wp_enqueue_script( $this->plugin_name, ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL . 'assets/js/admin-menu.min.js', array( 'jquery' ), $this->version, true );

			$license_status = get_option( 'onetap_license_status' );
			$license_text   = '';
			if ( 'valid' === $license_status ) {
				$license_text = esc_html__( 'Active', 'accessibility-plugin-onetap-pro' );
			} else {
				$license_text = esc_html__( 'Inactive', 'accessibility-plugin-onetap-pro' );
			}

			// Get plugin settings.
			$plugin_settings = get_option( 'apop_settings' );

			// Get active language.
			$language = isset( $plugin_settings['language'] ) ? $plugin_settings['language'] : 'en';

			// Localize admin.
			wp_localize_script(
				$this->plugin_name,
				'adminLocalize',
				array(
					'ajaxUrl'         => admin_url( 'admin-ajax.php' ),
					'ajaxNonce'       => wp_create_nonce( 'onetap-ajax-verification' ),
					'adminUrl'        => esc_url( admin_url() ),
					'pluginUrl'       => ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL,
					'statusLicense'   => $license_text,
					'activeLanguage'  => $language,
					'localizedLabels' => get_option( 'apop_localized_labels' ),
				)
			);
		}
	}

	/**
	 * Add a custom "Settings" link below the plugin description metadata
	 * (next to "Version | By | View details") in the Plugins admin screen.
	 *
	 * This function hooks into 'plugin_row_meta' and adds a link to the plugin's settings page
	 * only for this specific plugin file.
	 *
	 * @param array  $links Array of existing plugin row meta links.
	 * @param string $file  The plugin file path (relative to the plugins directory).
	 *
	 * @return array Modified array of plugin row meta links.
	 */
	public function add_row_meta( $links, $file ) {

		// Only add the settings link for this specific plugin.
		if ( 'accessibility-plugin-onetap-pro/accessibility-plugin-onetap-pro.php' === $file ) {
			$settings_url  = admin_url( 'admin.php?page=apop-settings' );
			$settings_link = '<a href="' . esc_url( $settings_url ) . '">' . esc_html__( 'Settings', 'accessibility-plugin-onetap-pro' ) . '</a>';

			// Append the custom settings link to the plugin meta row.
			$links[] = $settings_link;
		}

		return $links;
	}

	/**
	 * Prepare API parameters for license activation or deactivation.
	 *
	 * @param string $action The action to perform (activate or deactivate).
	 * @param string $license The license key to activate or deactivate.
	 * @return array The prepared API parameters.
	 */
	private function prepare_api_params( $action, $license ) {
		return array(
			'edd_action'  => $action,
			'license'     => $license, // License key to activate or deactivate.
			'item_id'     => ACCESSIBILITY_PLUGIN_ONETAP_PRO_PRODUCT_ID, // Product ID.
			'item_name'   => rawurlencode( ACCESSIBILITY_PLUGIN_ONETAP_PRO_PRODUCT_NAME ), // Encoded product name.
			'url'         => esc_url( home_url() ), // Site URL, sanitized for security.
			'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production', // Environment type.
		);
	}

	/**
	 * Handle the license response from the EDD server.
	 *
	 * @param WP_Error|array $response The response from the EDD server.
	 * @param string         $valid_status The status to set if successful (valid/invalid).
	 * @param bool           $is_deactivation Whether this call is for deactivation.
	 * @return void
	 */
	private function handle_license_response( $response, $valid_status, $is_deactivation = false ) {
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		if ( $license_data && $license_data->success ) {
			// Update the license status in the database.
			if ( $is_deactivation ) {
				delete_option( 'onetap_license_status' ); // Remove the status on successful deactivation.
			} else {
				update_option( 'onetap_license_status', $valid_status ); // Set status to valid on successful activation.
			}
		}
	}

	/**
	 * Handle AJAX request to activate the license.
	 *
	 * @return void
	 */
	/**
	 * Handle AJAX request to activate the license.
	 *
	 * @return void
	 */
	public function handle_ajax_activate_license() {
		// Verify the security nonce.
		if (
			! isset( $_POST['nonce'] ) ||
			! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'onetap-ajax-verification' )
		) {
			wp_send_json( array( 'error' => 'Invalid nonce!' ), 400 );
		}

		// Check user capabilities.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json( array( 'error' => 'Unauthorized' ), 403 );
		}

		// Get and sanitize license key from request.
		$license = isset( $_POST['license'] ) ? sanitize_text_field( wp_unslash( $_POST['license'] ) ) : '';

		// Prepare API parameters.
		$api_params = $this->prepare_api_params( 'activate_license', $license );

		// Send request to remote license server.
		$response = wp_remote_post(
			ACCESSIBILITY_PLUGIN_ONETAP_PRO_STORE_URL,
			array(
				'timeout'   => 15,
				'sslverify' => true,
				'body'      => $api_params,
			)
		);

		// Handle connection errors.
		if ( is_wp_error( $response ) ) {
			wp_send_json( array( 'error' => 'Request failed: ' . $response->get_error_message() ), 500 );
		}

		// Decode the response body.
		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		// Check if the license is valid.
		if ( isset( $data['license'] ) && 'valid' === $data['license'] ) {
			// Get the existing plugin settings from the database.
			$apop_settings = get_option( 'apop_settings' );

			// Ensure the settings are in array format.
			if ( ! is_array( $apop_settings ) ) {
				$apop_settings = array();
			}

			// Set or update the license value in the settings array.
			$apop_settings['license'] = $license;

			// Save the updated settings back to the database.
			update_option( 'apop_settings', $apop_settings );

			// Reset the license status to true whenever the license is updated.
			update_option( 'onetap_license_status', true );
			update_option( 'onetap_original_license', $license );

			// Optionally process the license response.
			$this->handle_license_response( $response, 'valid' );

			wp_send_json(
				array(
					'message' => 'License activated successfully.',
					'status'  => 'valid',
				),
				200
			);
		} else {
			// Get the existing plugin settings from the database.
			$apop_settings = get_option( 'apop_settings' );

			// Ensure the settings are in array format.
			if ( ! is_array( $apop_settings ) ) {
				$apop_settings = array();
			}

			// Set or update the license value in the settings array.
			$apop_settings['license'] = $license;

			// Save the updated settings back to the database.
			update_option( 'apop_settings', $apop_settings );

			// Reset the license status to false whenever the license is updated.
			update_option( 'onetap_license_status', false );
			update_option( 'onetap_original_license', false );

			// License is not valid.
			wp_send_json(
				array(
					'error'  => 'License activation failed.',
					'status' => isset( $data['license'] ) ? $data['license'] : 'invalid',
				),
				400
			);
		}
	}

	/**
	 * Handle AJAX request to deactivate the license.
	 *
	 * @return void
	 */
	public function handle_ajax_deactivate_license() {
		// Verify the security nonce.
		if (
			! isset( $_POST['nonce'] ) ||
			! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'onetap-ajax-verification' )
		) {
			wp_send_json( array( 'error' => 'Invalid nonce!' ), 400 );
		}

		// Check if the current user has the capability to manage options.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json( array( 'error' => 'Unauthorized' ), 403 );
		}

		// Delete the stored license status option.
		delete_option( 'onetap_license_status' );
		delete_option( 'onetap_original_license' );

		// Send a success response.
		wp_send_json( array( 'message' => 'License deactivated successfully.' ), 200 );

		// End AJAX execution.
		wp_die();
	}

	/**
	 * Save localized module labels to the database after settings are updated.
	 *
	 * This function runs on the 'admin_init' hook and checks if the current admin page
	 * is the plugin settings page. If the settings are updated and the language is set,
	 * it normalizes the module labels (converts kebab-case keys to camelCase)
	 * and stores them in a language-specific format in the 'apop_localized_labels' option.
	 *
	 * @return void
	 */
	public function save_localized_module_labels() {
		if ( ! is_admin() ) {
			return;
		}

		global $plugin_page;

		// Only run on the specific plugin settings page.
		if ( 'apop-module-labels' !== $plugin_page ) {
			return;
		}

		// Proceed only if settings have been updated.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- This GET param is set by WordPress Settings API.
		if ( ! isset( $_GET['settings-updated'] ) || 'true' !== $_GET['settings-updated'] ) {
			return;
		}

		$plugin_settings = get_option( 'apop_settings' );

		// Make sure language is set in plugin settings.
		$language = isset( $plugin_settings['language'] ) ? $plugin_settings['language'] : 'en';

		$raw_module_labels = get_option( 'apop_module_labels', array() );
		$normalized_labels = array();

		// Normalize keys: kebab-case to camelCase.
		foreach ( $raw_module_labels as $key => $value ) {
			$camel_key                       = lcfirst( str_replace( ' ', '', ucwords( str_replace( '-', ' ', $key ) ) ) );
			$normalized_labels[ $camel_key ] = $value;
		}

		// Retrieve previously saved localized labels.
		$existing_localized_labels = get_option( 'apop_localized_labels', array() );

		// Update or add new labels for the current language.
		$existing_localized_labels[ $language ] = $normalized_labels;

		// Save updated labels back to the database.
		update_option( 'apop_localized_labels', $existing_localized_labels );
	}

	/**
	 * Register settings related to the accessibility status section.
	 *
	 * This method registers multiple options using the WordPress Settings API,
	 * including checkboxes, text inputs, select dropdowns, and rich text fields.
	 *
	 * @since 1.0.0
	 * @access public
	 * @return void
	 */
	public function register_settings_for_accessibility_status() {
		// Register a boolean setting for showing the accessibility status toggle.
		register_setting(
			$this->accessibility_status_option_group,
			'show_accessibility',
			array(
				'type'              => 'boolean',
				'sanitize_callback' => array( $this, 'sanitize_checkbox_input' ),
			)
		);

		// Register a string setting for language selection.
		register_setting(
			$this->accessibility_status_option_group,
			'select_language',
			array(
				'type'              => 'string',
				'sanitize_callback' => array( $this, 'sanitize_select_language' ),
			)
		);

		// Register a string setting for the company name input.
		register_setting(
			$this->accessibility_status_option_group,
			'company_name',
			array(
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			)
		);

		// Register a string setting for the company website URL.
		register_setting(
			$this->accessibility_status_option_group,
			'company_website',
			array(
				'type'              => 'string',
				'sanitize_callback' => array( $this, 'sanitize_company_website' ),
			)
		);

		// Register a string setting for the business email address.
		register_setting(
			$this->accessibility_status_option_group,
			'business_email',
			array(
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_email',
			)
		);

		// Register a boolean setting for the confirmation checkbox.
		register_setting(
			$this->accessibility_status_option_group,
			'confirmation_checkbox',
			array(
				'type'              => 'boolean',
				'sanitize_callback' => array( $this, 'sanitize_checkbox_input' ),
			)
		);

		// Register a string setting for a WYSIWYG or rich text editor.
		register_setting(
			$this->accessibility_status_option_group,
			'editor_generator',
			array(
				'type'              => 'string',
				'sanitize_callback' => 'wp_kses_post',
			)
		);
	}

	/**
	 * Sanitize checkbox input value.
	 *
	 * Converts any truthy value to integer 1, otherwise returns 0.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param mixed $value The input value to sanitize.
	 * @return int Sanitized checkbox value (1 or 0).
	 */
	public function sanitize_checkbox_input( $value ) {
		return ( isset( $value ) && (bool) $value ) ? 1 : 0;
	}

	/**
	 * Sanitize the selected language input.
	 *
	 * Ensures the selected language is in the list of allowed values.
	 * Defaults to 'en' if the input is not valid.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $value The selected language value.
	 * @return string Sanitized language code.
	 */
	public function sanitize_select_language( $value ) {
		return in_array( $value, self::ALLOWED_LANGUAGES, true ) ? $value : 'en';
	}

	/**
	 * Sanitize company website input by removing protocol prefixes.
	 *
	 * Removes "https://" or "http://" from the beginning of the URL
	 * and sanitizes the remaining value.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $value The company website URL value.
	 * @return string Sanitized website URL without protocol.
	 */
	public function sanitize_company_website( $value ) {
		// Convert to string and trim whitespace.
		$value = trim( (string) $value );

		// Remove "https://" or "http://" from the beginning (case-insensitive).
		$value = preg_replace( '#^https?://#i', '', $value );

		// Remove any trailing slashes.
		$value = rtrim( $value, '/' );

		// Sanitize the remaining value.
		return sanitize_text_field( $value );
	}

	/**
	 * Register the "Missing Alt-Text" widget on the Dashboard home screen.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_missing_alt_text_dashboard_widget() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		wp_add_dashboard_widget(
			'apop_missing_alt_text',
			__( 'Missing Alt-Text', 'accessibility-plugin-onetap-pro' ),
			array( $this, 'render_missing_alt_text_dashboard_widget' ),
			null,
			null,
			'side',
			'high'
		);
	}

	/**
	 * Output the Dashboard widget body (missing vs total images + CTA).
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function render_missing_alt_text_dashboard_widget() {
		$missing = $this->count_attachment_images_missing_alt_text();
		$total   = $this->count_attachment_images_total();

		$alt_url = admin_url( 'admin.php?page=apop-alt-text' );
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		if ( is_plugin_active( 'altpilot/altpilot.php' ) ) {
			$alt_url = admin_url( 'admin.php?page=altpilot' );
		}
		?>
		<div class="apop-dashboard-missing-alt">
			<p class="apop-dashboard-missing-alt__stats">
				<?php
				printf(
					/* translators: 1: number of images without alt text, 2: total number of images in the media library */
					esc_html__( '%1$s / %2$s Images', 'accessibility-plugin-onetap-pro' ),
					esc_html( number_format_i18n( $missing ) ),
					esc_html( number_format_i18n( $total ) )
				);
				?>
			</p>
			<p class="apop-dashboard-missing-alt__desc">
				<?php esc_html_e( 'Alt text improves SEO and makes your content accessible to screen readers.', 'accessibility-plugin-onetap-pro' ); ?>
			</p>
			<p class="apop-dashboard-missing-alt__actions">
				<a href="<?php echo esc_url( $alt_url ); ?>" class="button button-primary apop-dashboard-missing-alt__cta">
					<?php esc_html_e( 'Add Alt-Texts', 'accessibility-plugin-onetap-pro' ); ?>
				</a>
			</p>
		</div>
		<?php
	}

	/**
	 * Inline styles for the Missing Alt-Text dashboard widget.
	 *
	 * @since 1.0.0
	 * @param string $hook Current admin screen hook.
	 * @return void
	 */
	public function enqueue_dashboard_missing_alt_widget_styles( $hook ) {
		if ( 'index.php' !== $hook || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$handle = 'apop-dashboard-missing-alt-text';
		wp_register_style( $handle, false, array(), $this->version );
		wp_enqueue_style( $handle );

		$css = '
			#apop_missing_alt_text .apop-dashboard-missing-alt__stats {
				margin: 0 0 8px;
				font-size: 20px;
				font-weight: 600;
				line-height: 1.3;
				color: #1d2327;
			}
			#apop_missing_alt_text .apop-dashboard-missing-alt__desc {
				margin: 0 0 16px;
				font-size: 13px;
				line-height: 1.5;
				color: #646970;
			}
			#apop_missing_alt_text .apop-dashboard-missing-alt__actions {
				margin: 0;
			}
			#apop_missing_alt_text .apop-dashboard-missing-alt__cta {
				text-align: center;
			}
		';

		wp_add_inline_style( $handle, $css );
	}

	/**
	 * Count image attachments in the media library.
	 *
	 * @since 1.0.0
	 * @return int
	 */
	private function count_attachment_images_total() {
		$query = new WP_Query(
			array(
				'post_type'              => 'attachment',
				'post_mime_type'         => 'image',
				'post_status'            => 'inherit',
				'posts_per_page'         => 1,
				'fields'                 => 'ids',
				'no_found_rows'          => false,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
			)
		);

		return (int) $query->found_posts;
	}

	/**
	 * Count image attachments with empty or missing alt text meta.
	 *
	 * @since 1.0.0
	 * @return int
	 */
	private function count_attachment_images_missing_alt_text() {
		$query = new WP_Query(
			array(
				'post_type'              => 'attachment',
				'post_mime_type'         => 'image',
				'post_status'            => 'inherit',
				'posts_per_page'         => 1,
				'fields'                 => 'ids',
				'no_found_rows'          => false,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
				'meta_query'             => array(
					'relation' => 'OR',
					array(
						'key'     => '_wp_attachment_image_alt',
						'compare' => 'NOT EXISTS',
					),
					array(
						'key'     => '_wp_attachment_image_alt',
						'value'   => '',
						'compare' => '=',
					),
				),
			)
		);

		return (int) $query->found_posts;
	}
}
