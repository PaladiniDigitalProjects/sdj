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
	<?php apop_load_template( 'admin/partials/header.php' ); ?>
	<?php $this->settings_api->show_forms(); ?>
	<?php apop_load_template( 'admin/partials/footer.php' ); ?>
</div>