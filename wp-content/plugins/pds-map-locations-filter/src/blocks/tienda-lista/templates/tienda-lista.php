<?php
/**
 * Template for the Tienda Lista block.
 * Expects $attributes array.
 */

$attributes    = $attributes ?? [];
$title         = $attributes['title'] ?? __('Our Stores', 'pds-map-locations-filter');
$display_style = in_array($attributes['displayStyle'] ?? '', ['grid','list']) ? $attributes['displayStyle'] : 'grid';
$num_stores    = $attributes['numStores'] ?? 5;
$selectedTaxonomies = $attributes['selectedTaxonomies'] ?? [];
$post_type     = 'location';
$taxonomies     = $taxonomies ?? [];
$filter_data = json_encode([
    'selectedTaxonomies' => $selectedTaxonomies, // Or maybe empty array [] if filters should default to 'all'
]);
// Query stores
$args = [
    'post_type'      => $post_type,
    'posts_per_page' => $num_stores > 0 ? $num_stores : -1,
    'post_status'    => 'publish',
];
$stores_query = new WP_Query($args);
?>
<div class="pds-tiendas <?php echo esc_attr($display_style); ?>">

    <?php if ($title): ?>
        <h3><?php echo esc_html($title); ?></h3>
    <?php endif; ?>



    <div class="pds-tiendas-toolbar">

     <?php
    // Render Navigation/Filters
    echo mlf_get_template_part(
        'template-mlf-nav.php',
        [
            'title'      => $title,
            'taxonomies' => $taxonomies // Pass the prepared taxonomy objects/info
        ],
        'tienda-lista' // Block name context
    );
    ?>
        <button type="button" class="mlf-view-btn<?php echo $display_style==='grid' ? ' active' : ''; ?>" data-view="grid">
            <?php esc_html_e('Grid View', 'pds-map-locations-filter'); ?>
        </button>
        <button type="button" class="mlf-view-btn<?php echo $display_style==='list' ? ' active' : ''; ?>" data-view="list">
            <?php esc_html_e('List View', 'pds-map-locations-filter'); ?>
        </button>
    </div>

    <?php if ($stores_query->have_posts()): ?>
        <div class="pds-tiendas-list">
            <?php if ($display_style === 'list'): ?>
                <div class="pds-tiendas-row pds-tiendas-header">
                    <div class="pds-column pds-col-thumb"><?php esc_html_e('Image', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column pds-col-title"><?php esc_html_e('Store', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column"><?php esc_html_e('Dirección', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column"><?php esc_html_e('Teléfono', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column"><?php esc_html_e('Email', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column"><?php esc_html_e('Web', 'pds-map-locations-filter'); ?></div>
                    <div class="pds-column"><?php esc_html_e('Google Maps', 'pds-map-locations-filter'); ?></div>
                </div>
            <?php endif; ?>

            <?php while ($stores_query->have_posts()): $stores_query->the_post(); ?>
                <?php
                $direccion       = get_field('ce_direccion') ?: '';
                $telefono        = get_field('ce_telefono') ?: '';
                $email           = get_field('ce_email') ?: '';
                $web             = get_field('ce_web') ?: '';
                $google_maps_url = get_field('ce_google_maps') ?: '';
                $thumb_html      = has_post_thumbnail() ? get_the_post_thumbnail(get_the_ID(), 'thumbnail') : '';
                ?>
                <div class="pds-tiendas-row">
                    <div class="pds-column pds-col-thumb">
                        <?php echo $thumb_html; ?>
                    </div>
                    <div class="pds-column pds-col-title">
                        <a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a>
                    </div>
                    <div class="pds-column"><?php echo esc_html($direccion); ?></div>
                    <div class="pds-column"><?php echo esc_html($telefono); ?></div>
                    <div class="pds-column">
                        <?php if ($email): ?>
                            <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
                        <?php endif; ?>
                    </div>
                    <div class="pds-column">
                        <?php if ($web): ?>
                            <a href="<?php echo esc_url($web); ?>" target="_blank"><?php echo esc_html($web); ?></a>
                        <?php endif; ?>
                    </div>
                    <div class="pds-column">
                        <?php if ($google_maps_url): ?>
                            <a href="<?php echo esc_url($google_maps_url); ?>" target="_blank"><?php esc_html_e('View', 'pds-map-locations-filter'); ?></a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    <?php else: ?>
        <p><?php esc_html_e('No stores found.', 'pds-map-locations-filter'); ?></p>
    <?php endif; ?>

</div>

<script>
(function(){
    var wrapper = document.currentScript.previousElementSibling;
    Array.prototype.forEach.call(
      wrapper.querySelectorAll('.mlf-view-btn'),
      function(btn){
        btn.addEventListener('click', function(){
          var view = this.getAttribute('data-view');
          wrapper.classList.remove('grid','list');
          wrapper.classList.add(view);
          wrapper.querySelectorAll('.mlf-view-btn').forEach(function(b){
            b.classList.toggle('active', b===btn);
          });
        });
      }
    );
})();
</script>

<style>
.pds-tiendas-list {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5em;
}
.pds-tiendas-row {
    box-sizing: border-box;
    padding: 0.5em;
}

/* reduce non-title text */
.pds-tiendas .pds-column:not(.pds-col-title) {
    font-size: 50%;
}

/* List view */
.pds-tiendas.list .pds-tiendas-list {
    flex-direction: column;
}
.pds-tiendas.list .pds-col-thumb .attachment-thumbnail{
    max-width:150px;
    height:auto;
}
.pds-tiendas.list .pds-tiendas-row {
    display: flex;
    border-bottom: 1px solid #ddd;
    align-items: center;
}
.pds-tiendas.list .pds-tiendas-header .pds-column {
    font-weight: bold;
    background: #f9f9f9;
}
.pds-tiendas.list .pds-column {
    flex: 1;
    padding: 0.5em;
}

/* Grid view */
.pds-tiendas.grid .pds-tiendas-list {
    /* default wrap */
}
.pds-tiendas.grid .pds-col-thumb .attachment-thumbnail{
    max-width:100%;
    height:auto;
}
.pds-tiendas.grid .pds-tiendas-row {
    display: flex;
    flex-direction: column;
    width: calc(33.333% - 1em);
    margin: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.pds-tiendas.grid .pds-column {
    padding: 0.5em;
}
.pds-tiendas.grid .pds-col-title { font-weight: bold; }
</style>
