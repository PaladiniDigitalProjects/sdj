<?php
return ['messages'=>['
<input style="width:95%; padding:0.75rem; border:2px solid #007FAD; border-radius:5px;" type="text" onkeyup="filterCentros(this)" placeholder="Buscar centro"/>

<script>
    function normalizeSearchCentros(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filterCentros(element) {
        var value = normalizeSearchCentros(jQuery(element).val());

        jQuery(\'.pds-centros-pagina .pds-tiendas-row\').each(function () {
            var text = normalizeSearchCentros(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>
'=>'<input style="width:95%; padding:0.75rem; border:2px solid #007FAD; border-radius:5px;" type="text" onkeyup="filterCentros(this)" placeholder="Buscar centre"/>

<script>
    function normalizeSearchCentros(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filterCentros(element) {
        var value = normalizeSearchCentros(jQuery(element).val());

        jQuery(\'.pds-centros-pagina .pds-tiendas-row\').each(function () {
            var text = normalizeSearchCentros(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>
','8832bd5fd3c472c0f220355f991a26a8'=>'Els nostres centres','Nuestros centros'=>'Els nostres centres','d74e102654c177508c66429abed8b86c'=>'<input style="width:95%; padding:0.75rem; border:2px solid #007FAD; border-radius:5px;" type="text" onkeyup="filterCentros(this)" placeholder="Buscar centre"/>

<script>
    function normalizeSearchCentros(text) {
        return text
            .toLowerCase()
            .normalize(\'NFD\')
            .replace(/[\\u0300-\\u036f]/g, \'\');
    }

    function filterCentros(element) {
        var value = normalizeSearchCentros(jQuery(element).val());

        jQuery(\'.pds-centros-pagina .pds-tiendas-row\').each(function () {
            var text = normalizeSearchCentros(jQuery(this).text());

            if (text.indexOf(value) > -1) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
</script>
']];
