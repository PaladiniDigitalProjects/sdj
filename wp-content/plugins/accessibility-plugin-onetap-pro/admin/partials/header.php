<?php
/**
 * Admin Header Template for Onetap plugin.
 *
 * This template is responsible for rendering the header section
 * of the plugin's admin pages, including logo, documentation links,
 * support links, and navigation menu.
 *
 * @package    Accessibility_Plugin_Onetap_Pro
 * @subpackage Accessibility_Plugin_Onetap_Pro/admin/partials
 */

?>
<header>
	<div class="mycontainer">
		<div class="myrow one">
			<div class="box-logo">
				<img style="height: auto;" src="<?php echo esc_url( ACCESSIBILITY_PLUGIN_ONETAP_PRO_PLUGINS_URL . 'assets/images/logo.png' ); ?>" alt="<?php echo esc_attr( 'logo' ); ?>" width="125" />
			</div>
			<div class="box-menu">
				<ul>
					<li>
						<a target="_blank" href="<?php echo esc_url( 'https://wponetap.com/help-center/' ); ?>" class="button outline">
							<?php esc_html_e( 'Documentation', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>
					<li>
						<a target="_blank" href="<?php echo esc_url( 'https://wponetap.com/support/' ); ?>" class="button outline">
							<?php esc_html_e( 'Support', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>
					<li>
						<a style="display: flex;flex-wrap: wrap;align-items: center;gap: 6px; box-shadow: 0 0 0 1px rgba(10, 13, 18, 0.18) inset, 0 -2px 0 0 rgba(10, 13, 18, 0.05) inset, 0 1px 2px 0 rgba(10, 13, 18, 0.05); display: none;" target="_blank" href="<?php echo esc_url( 'https://wponetap.com/pricing/' ); ?>" class="button solid">
							<?php esc_html_e( 'Get PRO', 'accessibility-plugin-onetap-pro' ); ?>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path d="M5 15L15 5M15 5H5M15 5V15" stroke="#C8E0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="myrow two">
			<div class="box-navigation">
				<ul>
					<?php
					// Get current page parameter safely.
					// phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$apop_current_page = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : '';
					?>
					<li>
						<a class="header-nav-link<?php echo ( 'apop-settings' === $apop_current_page ) ? ' active' : ''; ?>" href="<?php echo esc_url( admin_url( 'admin.php?page=apop-settings' ) ); ?>">
							<?php esc_html_e( 'Widget', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>
					<li>
						<a class="header-nav-link<?php echo ( 'apop-modules' === $apop_current_page ) ? ' active' : ''; ?>" href="<?php echo esc_url( admin_url( 'admin.php?page=apop-modules' ) ); ?>">
							<?php esc_html_e( 'Modules', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>
					<li>
						<a class="header-nav-link<?php echo ( 'apop-accessibility-status' === $apop_current_page ) ? ' active' : ''; ?>" href="<?php echo esc_url( admin_url( 'admin.php?page=apop-accessibility-status' ) ); ?>">
							<?php esc_html_e( 'Statement', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>
					<li>
						<a class="header-nav-link<?php echo ( 'apop-general-settings' === $apop_current_page ) ? ' active' : ''; ?>" href="<?php echo esc_url( admin_url( 'admin.php?page=apop-general-settings' ) ); ?>">
							<?php esc_html_e( 'Settings', 'accessibility-plugin-onetap-pro' ); ?>
						</a>
					</li>			
				</ul>
			</div>
			<div class="box-save-changes">
				<?php if ( 'apop-module-labels' !== $apop_current_page && 'apop-modules' === $apop_current_page ) : ?>
					<a href="<?php echo esc_url( admin_url( 'admin.php?page=apop-module-labels' ) ); ?>" class="edit-labels button outline">
						<?php esc_html_e( 'Edit Labels', 'accessibility-plugin-onetap-pro' ); ?>
					</a>
				<?php endif; ?>
				
				<?php if ( 'apop-alt-text' !== $apop_current_page ) : ?>
					<button type="button" class="button primary save-changes">
						<?php esc_html_e( 'Save changes', 'accessibility-plugin-onetap-pro' ); ?>
					</button>
				<?php endif; ?>
			</div>
		</div>
	</div>
</header>