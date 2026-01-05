<?php
$provincia = get_the_terms( $post->ID , 'provincia');
$comunidad = get_the_terms( $post->ID , 'comunidad_autonoma');
$ciudad = get_the_terms( $post->ID , 'localidad');
$ambito = get_the_terms( $post->ID , 'ambito');
$telefono = get_field('ce_telefono');
?>

<article class='entry mlf-info mlf-location' id="location-<?=get_the_ID() ?>">
    <?php if ( has_post_thumbnail()): ?><div class="entry-image" style="background: url('<?php the_post_thumbnail_url(); ?>') center no-repeat;"></div><?php endif; ?>
    <p class="entry-categories"><?php if($ciudad):?><?php foreach ($ciudad as $ci):?><?php echo $ci->name;?><?php endforeach; ?><?php endif;?><?php if($continente):?><?php foreach ($continente as $c):?><?php if($continente and $ciudad): ?><span>, </span><?php endif;?><?php echo $c->name;?><?php endforeach;?><?php endif;?></p>
    <h3 class="entry-title"><?php the_title($post->ID);?></h3>
    <?php if($ambito):?><dl class="entry-categories"><dt class="hide"><?php _e('Ámbitos de actuación', 'PDP');?></dt><?php foreach ($ambito as $amb):?><dd><?php echo $amb->name;?></dd><?php endforeach; ?></dl><?php endif;?>
    <?php if($telefono): ?><a class="telefon" href="tel:<?php echo($telefono);?>"><?php echo($telefono);?></a><?php endif; ?>
    <a class="entry-link" href="<?php the_permalink($post->ID); ?>"></a>
</article>