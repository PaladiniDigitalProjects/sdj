/**
 * editor.js
 *
 * Dynamically filters:
 *  - PDS_block_relacionado_taxonomia  → common taxonomies for the selected post types
 *                                       (server always pre-loads ALL public taxonomies,
 *                                        so 'category' is always a valid saved value)
 *  - PDS_block_relacionado_categoria  → terms for the selected taxonomy
 */
(function ($) {
    'use strict';

    /* ── Helpers ──────────────────────────────────────────────── */

    function getFieldEl(name) {
        return $('[data-name="' + name + '"]');
    }

    function getSelectEl(name) {
        return getFieldEl(name).find('select');
    }

    /**
     * Rebuild a Select2-enhanced ACF select with new choices,
     * restoring `savedValue` if provided.
     */
    function rebuildSelect(name, choices, savedValue) {
        var $field  = getFieldEl(name);
        var $select = getSelectEl(name);

        if ($select.length === 0) return;

        // Destroy Select2 before touching the DOM
        if ($select.hasClass('select2-hidden-accessible')) {
            $select.select2('destroy');
        }

        var placeholder = (name === 'PDS_block_relacionado_taxonomia')
            ? '— Selecciona taxonomía —'
            : '— Todos los términos —';

        $select.empty();
        $select.append('<option value="">' + placeholder + '</option>');

        $.each(choices, function (i, item) {
            var sel = (savedValue !== null && savedValue !== '' && String(savedValue) === String(item.value))
                ? ' selected="selected"' : '';
            $select.append('<option value="' + item.value + '"' + sel + '>' + item.label + '</option>');
        });

        // Re-init Select2 via ACF
        if (typeof acf !== 'undefined') {
            var acfField = acf.getField($field);
            if (acfField && typeof acfField.select2 === 'function') {
                acfField.select2();
            } else if (acf.fields && acf.fields.select) {
                acf.fields.select.init($field);
            }
        }
    }

    /* ── Step 1: Post types → Taxonomies ─────────────────────── */

    function loadTaxonomies(savedTaxonomy) {
        var $typesField = getFieldEl('PDS_block_relacionado_tipos');
        var postTypes   = [];

        $typesField.find('input[type="checkbox"]:checked').each(function () {
            postTypes.push($(this).val());
        });

        if (postTypes.length === 0) {
            // No post types selected: show all server-side choices unfiltered
            return;
        }

        $.post(PDS_Noticias.ajax_url, {
            action:     'pds_get_taxonomies',
            nonce:      PDS_Noticias.nonce,
            post_types: postTypes,
        }, function (response) {
            if (!response.success) return;

            var choices = [];

            // Always ensure 'category' appears first if present in the result
            if (response.data.hasOwnProperty('category')) {
                choices.push({ value: 'category', label: response.data['category'] });
            }

            $.each(response.data, function (slug, label) {
                if (slug !== 'category') {
                    choices.push({ value: slug, label: label });
                }
            });

            var current = savedTaxonomy || getSelectEl('PDS_block_relacionado_taxonomia').val() || '';
            rebuildSelect('PDS_block_relacionado_taxonomia', choices, current);

            // Reload terms for whichever taxonomy is now selected
            var activeTaxonomy = getSelectEl('PDS_block_relacionado_taxonomia').val();
            if (activeTaxonomy) {
                loadTerms(activeTaxonomy, null);
            } else {
                rebuildSelect('PDS_block_relacionado_categoria', [], null);
            }
        });
    }

    /* ── Step 2: Taxonomy → Terms ─────────────────────────────── */

    function loadTerms(taxonomy, savedTerm) {
        if (!taxonomy) {
            rebuildSelect('PDS_block_relacionado_categoria', [], null);
            return;
        }

        $.post(PDS_Noticias.ajax_url, {
            action:   'pds_get_terms',
            nonce:    PDS_Noticias.nonce,
            taxonomy: taxonomy,
        }, function (response) {
            if (!response.success) return;

            var choices = [];
            $.each(response.data, function (i, term) {
                choices.push({ value: term.id, label: term.name });
            });

            rebuildSelect('PDS_block_relacionado_categoria', choices, savedTerm);
        });
    }

    /* ── Init on ACF ready ────────────────────────────────────── */

    acf.addAction('ready', function () {
        // Read values already rendered by the server-side ACF load_field filters
        var savedTaxonomy = getSelectEl('PDS_block_relacionado_taxonomia').val() || '';
        var savedTerm     = getSelectEl('PDS_block_relacionado_categoria').val()  || '';

        // Filter taxonomy list to only what the current post types share
        loadTaxonomies(savedTaxonomy);

        // If a taxonomy is already saved, pre-load its terms
        if (savedTaxonomy) {
            loadTerms(savedTaxonomy, savedTerm);
        }

        /* ── Event listeners ── */

        // Post types changed → refresh taxonomy list
        $(document).on(
            'change',
            '[data-name="PDS_block_relacionado_tipos"] input[type="checkbox"]',
            function () { loadTaxonomies(null); }
        );

        // Taxonomy changed → refresh term list
        $(document).on(
            'change',
            '[data-name="PDS_block_relacionado_taxonomia"] select',
            function () { loadTerms($(this).val(), null); }
        );
    });

})(jQuery);