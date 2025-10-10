<?php
/**
 * ACF Call to Action Block template.
 */

// Load values and assign defaults.
$id = 'noticias-' . $block['id'];
if (!empty($block['anchor'])) {
    $id = $block['anchor'];
}

$className = 'noticias';
if (!empty($block['className'])) {
    $className .= ' ' . $block['className'];
}

$related_title = get_field('PDS_block_relacionado_title');
$related_manual_content = get_field('PDS_block_relacionado_contenido');
$post_numbers = get_field('PDS_block_relacionado_numbers');
$relatedCTA = get_field('PDS_block_relacionado_CTA');
$term = get_field('PDS_block_relacionado_categoria');
$selected_post_types = get_field('PDS_block_relacionado_tipos');
if (!$selected_post_types || !is_array($selected_post_types)) {
    $selected_post_types = array('post', 'publicaciones'); 
}
// Check if manual selection is used
$use_manual = !empty($related_manual_content);

if (!$use_manual) {
    // Dynamic query if no manual selection
    $args = array(
        'post_type'      => $selected_post_types,
        'posts_per_page' => $post_numbers ? $post_numbers : 4,
        'post_status'    => 'publish',
        'orderby'        => 'date',  
        'order'          => 'DESC',  
    );

    if ($term) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field'    => 'term_id',
                'terms'    => $term,
            ),
        );
    }

    $query = new WP_Query($args);
} else {
    $query = new WP_Query(array(
        'post__in'       => wp_list_pluck($related_manual_content, 'ID'),
        'post_type'      => 'any',
        'orderby'        => 'date',  
        'order'          => 'DESC',  
        'posts_per_page' => count($related_manual_content),
    ));
}
?>

<section class="wp-block-<?php echo esc_attr($className); ?>">
    <?php if ($related_title): ?>
        <header class="section-header alignwide">
            <h3 class="section-title"><?php echo esc_html($related_title); ?></h3>
        </header>
    <?php else: ?>
        <br /><br /><br />
    <?php endif; ?>

    <div id="<?php echo esc_attr($id); ?>" class="post-list owl-carousel owl-theme alignwide">
        <?php while ($query->have_posts()) : $query->the_post(); ?>
            <?php
            global $post;
            $post_type = get_post_type($post->ID);
            $categories = get_the_terms($post->ID, 'category');
            $excerpt = get_the_excerpt($post->ID);
            $featured_img_url = get_the_post_thumbnail_url($post->ID, 'large');
            $linkUrl = get_permalink($post->ID);
            $download_pdf = get_field('publicacion-documento', $post->ID);
            $link_pdf = get_field('publicacion-digital', $post->ID);
            ?>

            <article class="entry entry-tarja item <?php echo esc_attr($post_type); ?>">
                <?php if ($post_type !== 'publicaciones') : ?>
                    <a href="<?php echo esc_url($linkUrl); ?>" class="entry-link"></a>
                <?php endif; ?>

                <?php if ($featured_img_url): ?>
                    <div class="entry-image" style="background-image: url('<?php echo esc_url($featured_img_url); ?>')"></div>
                <?php endif; ?>

                <div class="entry-content">
                <?php if (!empty( $categoriesLoop ) ) : ?>
              <ul class="category-list">
              <?php if ('tribe_events' == get_post_type()) : ?>
                <li class="entry-categories"><i class="ico-evento"></i><?php _e('Evento', 'PDP');?></li>
              <?php endif; ?>
              <?php foreach ( $categoriesLoop as $cat ) { echo '<li class="entry-categories">'.$cat->name.'</li> '; } ?>
              </ul>
            <?php endif; ?>

                    <h3 class="entry-title"><?php the_title(); ?></h3>

                    <?php if ($post_type === 'publicaciones') : ?>
                        <div class="publicaciones-actions">
                            <?php if ($link_pdf): ?>
                                <button class="btn btn-descargar" onclick="window.open('<?php echo esc_url($link_pdf); ?>','_blank')">
                                    <?php esc_html_e('Ver publicación', 'PDP'); ?>
                                </button>
                            <?php endif; ?>
                            <?php if ($download_pdf): ?>
                                <button class="btn btn-descargar" onclick="window.open('<?php echo esc_url($download_pdf); ?>','_blank')">
                                    <?php esc_html_e('Descargar PDF', 'PDP'); ?>
                                </button>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </article>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    </div>

    <?php if ($relatedCTA): ?>
        <footer class="section-footer">
            <?php 
            $link = get_field('PDS_block_relacionado_CTA');
            if ($link): 
                $link_url = $link['url'];
                $link_title = $link['title'];
                $link_target = $link['target'] ? $link['target'] : '_self';
            ?>
                <div class="wp-block-buttons">
                    <div class="wp-block-button btn-pequeno">
                        <a class="wp-block-button__link" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>">
                            <?php echo esc_html($link_title); ?>
                        </a>
                    </div>
                </div>
            <?php endif; ?>
        </footer>
    <?php endif; ?>
</section>

<script type="text/javascript">
jQuery(document).ready(function ($) {

      var owl = $("#<?php echo esc_attr($id); ?>");
      owl.owlCarousel({
        center:false,
        // autoplay:true,
        autoplay:false,
        autoplayTimeout:4000,
        margin:16,
        nav:true,
        navText: ['<span class="photo-icons icon-prev"></span>','<span class="photo-icons icon-next"></span>'],
        // loop:true,
        stagePadding:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
                nav:true,
            },
            450:{
                items:2,
                nav:true,
            },
            786:{
                items:3,
                nav:true,
            },
            1024:{
                items:4,
                nav:true,
            },
        }
      });

    });
</script>

