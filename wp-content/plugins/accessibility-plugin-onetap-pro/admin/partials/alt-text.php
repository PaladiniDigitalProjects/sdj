<?php
/**
 * Content template for submenu page.
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @since      1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="wrap">
	<style>
		#apop_alt_text,
		#onetap_alt_text {
			overflow: auto;
		}

		@media only screen and (max-width: 1280px) {
			#apop_alt_text,
			#onetap_alt_text {
				margin-bottom: 15px;
			}
		}
	</style>
	<?php apop_load_template( 'admin/partials/header.php' ); ?>

	<div class="box box-alt-pilot">
		<div class="mycontainer">
			<div class="myrow">
				<div class="logo">
					<img src="<?php echo esc_url( ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL . 'assets/images/admin/logo-altpilot2.svg' ); ?>" alt="AltPilot.ai Logo" />
					<span class="save-hours"><?php esc_html_e( 'Save hours', 'accessibility-plugin-onetap-pro' ); ?></span>
					<span><?php esc_html_e( 'and generate your Alt-text with AltPilot.ai.', 'accessibility-plugin-onetap-pro' ); ?></span>
					<span class="try-free"><?php esc_html_e( 'Try 25 Images for Free', 'accessibility-plugin-onetap-pro' ); ?></span>
				</div>

				<?php
				$apop_altpilot_cta = $this->settings_api->get_altpilot_cta_link_attrs();
				$apop_altpilot_rel = ( '_blank' === $apop_altpilot_cta['target'] ) ? 'noopener noreferrer' : '';
				?>
				<div class="link">
					<a href="<?php echo esc_url( $apop_altpilot_cta['url'] ); ?>" class="button-alt-pilot"<?php echo $apop_altpilot_cta['target'] ? ' target="' . esc_attr( $apop_altpilot_cta['target'] ) . '" rel="' . esc_attr( $apop_altpilot_rel ) . '"' : ''; ?>><?php esc_html_e( 'Start with AltPilot.ai', 'accessibility-plugin-onetap-pro' ); ?></a>
				</div>
			</div>
		</div>
	</div>
	
	<?php $this->settings_api->show_forms(); ?>

	<?php apop_load_template( 'admin/partials/footer.php' ); ?>
</div>