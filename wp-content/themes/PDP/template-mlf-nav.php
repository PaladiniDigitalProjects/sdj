<nav>
    <div class='mlf-title'><?=$variables['title']; ?></div>
    <div class='mlf-filters'>
        <!-- <div class='mlf-taxonomy'>
            <input type='text' class='mlf-search' placeholder='<?php //echo _e('Buscar', 'PDP'); ?>' />
        </div> -->
        <?php
        foreach ($variables['taxonomies'] as $taxonomy) {
            $terms = get_terms($taxonomy, array(
                'hide_empty' => false,
                'parent' => 0,
            ));
            $taxonomy_ob = get_taxonomy($taxonomy);
            ?>
                <div class='mlf-taxonomy'>
                    <select class='filters' name='<?php echo $taxonomy; ?>'>
                        <option value='all'><?=$taxonomy_ob->label?></option>
                        <?php
                        foreach ($terms as $term) {
                        ?>
                            <option><?= $term->name; ?></option>
                        <?php
                        }
                        ?>
                    </select>
                </div>
            <?php
        }
        ?>
    </div>
</nav>
