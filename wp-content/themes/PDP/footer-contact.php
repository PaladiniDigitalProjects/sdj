
<?php
	$title = get_field('contact-title', 'option');
	$direccio = get_field('contact-postal', 'option');
	$phone = get_field('contact-phone', 'option');
	$mail1 = get_field('contact-email-primary', 'option');
	$mail2 = get_field('contact-email-secondary', 'option');
	$imagebg = get_field('contact-logo', 'option');

	$newsletter = get_field('contact-newsletter-title', 'option');
	$newsletterImgLeft = get_field('contact-newsletter-image-left', 'option');
	$newsletterImgRight = get_field('contact-newsletter-image-right', 'option');
	$contactform = get_field('contact-contactform-title', 'option');
	$contactformImg = get_field('contact-form-image', 'option');
	?>

<?php if($contactform == true): ?>
	<section class="contact-form">
	<?php if($imagebg == true): ?>
		<div class="contact-image">
			<img src="<?php echo($imagebg);?>" />
		</div>
	<?php endif; ?>
	<div class="contact-content">
		<h2 class="section-title"><?php the_field('contact-contactform-title', 'option'); ?></h2>
	</div>
	</section>
<?php endif; ?>
<?php if($newsletter == true): ?>
	<section class="newsletter">
		<div class="newsletter-content">
			<h2 class="section-title"><?php the_field('contact-newsletter-title', 'option'); ?></h2>
			<form id="newsletter-form" class="call-to-action">
				<button class="btn btn-call-to-action btn-blue" type="submit"><?php the_field('contact-newsletter-call-to-action-text', 'option'); ?></button>
				<?php the_field('contact-newsletter-call-to-action', 'option');?>
			</form>
		</div>
		<?php if($newsletterImgLeft == true): ?>
		<div class="newsletter-image"></div>
		<style type="text/css">
			.newsletter-image:before {
				background:url('<?php the_field('contact-newsletter-image-left', 'option');?>') center no-repeat;
			}
			@media (min-width: 1024px) {
				.newsletter-image:before {
					background:url('<?php the_field('contact-newsletter-image-right', 'option');?>') center no-repeat;
				}
			}
		</style>
	<?php endif; ?>
	</section>
<?php endif; ?>