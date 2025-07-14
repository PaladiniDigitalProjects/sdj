<?php if ($variables['locations_query']->have_posts()) :?>
    <?php while ($variables['locations_query']->have_posts()) : $variables['locations_query']->the_post(); ?>
            <?php
            $localidad = get_the_terms( $post->ID , 'localidad');
            $comunidad = get_the_terms( $post->ID , 'comunidad_autonoma'); 
            $ciudad = get_the_terms( $post->ID , 'localidad');
            $ambito = get_the_terms( $post->ID , 'ambito');
            $telefono = get_field('ce_telefono');
            ?>
            <article class='entry mlf-location <?php if($localidad):?><?php foreach ($localidad as $lo):?> <?php echo $lo->slug;?><?php endforeach;?><?php endif;?>' id="location-<?=get_the_ID() ?>">
                <?php if ( has_post_thumbnail()): ?>
                    <div class="entry-image" style="background: url('<?php the_post_thumbnail_url(); ?>') center no-repeat;"></div>                    
                <?php endif; ?>
                <div class="entry-content">
                    <p class="entry-categories"><?php if($localidad):?><?php foreach ($localidad as $lo):?><?php echo $lo->name;?><?php endforeach; ?><?php endif;?><?php if($comunidad):?><?php foreach ($comunidad as $co):?><?php if($localidad and $comunidad): ?><span>, </span><?php endif;?><?php echo $co->name;?><?php endforeach;?><?php endif;?></p>
                    <h3 class="entry-title"><?php the_title(); ?></h3>
                    <?php if($ambito):?><dl class="entry-categories"><dt><?php _e('Ámbitos de actuación', 'PDP');?></dt><?php foreach ($ambito as $amb):?><dd><?php echo $amb->name;?></dd><?php endforeach; ?></dl><?php endif;?>
                    <?php if($telefono): ?><a class="telefon" href="tel:<?php echo($telefono);?>"><?php echo($telefono);?></a><?php endif; ?>
                </div>
                <a class="entry-link" href="<?php the_permalink(); ?>"></a>
            </article>
    <?php endwhile; ?>
    <?php pagination_nav(); ?>
    <?php else : ?>
        Vaya, no hay entradas. 
<?php endif; ?>