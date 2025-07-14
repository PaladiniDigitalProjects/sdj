<?php
if ($variables['locations_query']->have_posts()) :
    while ($variables['locations_query']->have_posts()) :
        $variables['locations_query']->the_post();
        ?>
        <div class='mlf-location' id='location-<?= get_the_ID() ?>'>
            <img src='https://picsum.photos/980/400' alt='title' />
            <div class='mlf-location-title'><?php the_title(); ?></div>
            <div class='mlf-location-description'><?php the_content(); ?></div>
            <a href='<?php the_permalink(); ?>'>Ver más</a>
        </div>
        <?php
    endwhile;
else :
    ?>
    Vaya, no hay entradas.
    <?php
endif;
?>
