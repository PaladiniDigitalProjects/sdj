<section class="contact">
    <header class="section-header">
      <h2 class="section-title"><?php the_field('contact-title', 'option'); ?></h2>
    </header>
      <div class="entry-list flex">
        <div class="item">
          <a href="tel:<?php the_field('contact-telefon', 'option'); ?>"><?php the_field('contact-telefon', 'option'); ?></a>
          <a href="mailto:<?php the_field('contact-email', 'option'); ?>"><?php the_field('contact-email', 'option'); ?></a>
        </div>
        <div class="item">
          <?php the_field('contact-direccio', 'option'); ?>
        </div>
        <div class="item">
          <a class="btn" href="mailto:<?php the_field('contact-email', 'option'); ?>"><?php the_field('contact-title', 'option'); ?></a>
        </div>
      </div>
    <div class="contact-footer" style="background:url('<?php echo the_field('contact-imatge', 'option'); ?>') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
      <?php
        $instagram = get_field('contact-instagram', 'option');
        $twitter = get_field('contact-twitter', 'option');
        $linkedin = get_field('contact-linkedin', 'option');
      ?>
      <ul class="xarxes-socials alignwide">
        <li>©<?php bloginfo( 'name' );?></li>
        <li><a href="<?php echo($instagram['url']); ?>"><?php echo($instagram['title']); ?></a></li>
        <li><a href="<?php echo($twitter['url']); ?>"><?php echo($twitter['title']); ?></a></li>
        <li><a href="<?php echo($linkedin['url']); ?>"><?php echo($linkedin['title']); ?></a></li>
        <li><a href="mailto:<?php the_field('contact-email', 'option'); ?>"><?php the_field('contact-title', 'option'); ?></a></li>
      </ul>
    </div>
</section>
