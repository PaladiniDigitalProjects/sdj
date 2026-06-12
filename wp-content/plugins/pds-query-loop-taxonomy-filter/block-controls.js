( function ( wp ) {

    const { addFilter }                  = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment, createElement, useRef } = wp.element;
    const { InspectorControls }          = wp.blockEditor;
    const { PanelBody, ToggleControl, SelectControl, Notice } = wp.components;
    const { useSelect }                  = wp.data;

    // Must match $wrapper_targets in PHP.
    const TARGETS = [
        'core/query',
        'gutenberghub/query-slider',
        'gutenberghub/query-slider-pro',
        'gutenberghub/query-slider-premium',
    ];

    /**
     * Sync pds_* params into the native `query` attribute so Gutenberg
     * automatically includes them in every REST preview request.
     *
     * When active=false all pds_* keys are removed so the block reverts
     * to its default query behaviour.
     */
    function buildNativeQuery( currentQuery, active, relation, exclude, postId ) {

        // Always start from a plain copy — never mutate the original.
        const q = Object.assign( {}, currentQuery );

        if ( active ) {
            q.pds_related  = true;
            q.pds_post_id  = postId || 0;
            q.pds_relation = relation || 'OR';
            q.pds_exclude  = ( exclude !== false ); // explicit boolean
        } else {
            delete q.pds_related;
            delete q.pds_post_id;
            delete q.pds_relation;
            delete q.pds_exclude;
        }

        return q;
    }

    const withProControls = createHigherOrderComponent( ( BlockEdit ) => {

        return function WithProControls( props ) {

            const { name, attributes, setAttributes, isSelected } = props;

            // Bail early — not a target block or sidebar not open.
            if ( ! TARGETS.includes( name ) || ! isSelected ) {
                return createElement( BlockEdit, props );
            }

            const { qltf_active, qltf_relation, qltf_exclude } = attributes;

            // Explicit default matching PHP registered default (true).
            const excludeChecked = ( qltf_exclude !== false );

            // ── useSelect (React hook) — the correct way to read store data
            // inside a functional component. Avoids the stale-closure and
            // "called outside component" issues from bare select() calls.
            const currentPostId = useSelect( function( sel ) {
                const store = sel( 'core/editor' );
                return store ? store.getCurrentPostId() : 0;
            }, [] ); // [] = only compute once per mount (post ID never changes mid-edit)

            return createElement(
                Fragment,
                null,

                // Original block edit component — always render first.
                createElement( BlockEdit, props ),

                // Sidebar inspector panel.
                createElement(
                    InspectorControls,
                    null,
                    createElement(
                        PanelBody,
                        { title: '⚡ PDS Related Posts', initialOpen: true },

                        // ── Master toggle ────────────────────────────────────
                        createElement( ToggleControl, {
                            label:    'Activar Filtro Relacionado',
                            help:     qltf_active
                                        ? 'ON: Muestra posts con la misma taxonomía.'
                                        : 'OFF: Usa la configuración estándar.',
                            checked:  !! qltf_active,
                            onChange: function( val ) {
                                setAttributes( {
                                    qltf_active: val,
                                    // Inject / clean pds_* into the native query
                                    // object so Gutenberg refreshes the preview.
                                    query: buildNativeQuery(
                                        attributes.query || {},
                                        val,
                                        qltf_relation || 'OR',
                                        excludeChecked,
                                        currentPostId
                                    ),
                                } );
                            },
                        } ),

                        // ── Secondary controls (only when active) ────────────
                        qltf_active && createElement(
                            Fragment,
                            null,

                            createElement( SelectControl, {
                                label:    'Lógica de Relación',
                                value:    qltf_relation || 'OR',
                                options:  [
                                    { label: 'Cualquiera (OR)',       value: 'OR'  },
                                    { label: 'Todas Estrictas (AND)', value: 'AND' },
                                ],
                                onChange: function( val ) {
                                    setAttributes( {
                                        qltf_relation: val,
                                        query: buildNativeQuery(
                                            attributes.query || {},
                                            true,
                                            val,
                                            excludeChecked,
                                            currentPostId
                                        ),
                                    } );
                                },
                            } ),

                            createElement( ToggleControl, {
                                label:    'Excluir Post Actual',
                                checked:  excludeChecked,
                                onChange: function( val ) {
                                    setAttributes( {
                                        qltf_exclude: val,
                                        query: buildNativeQuery(
                                            attributes.query || {},
                                            true,
                                            qltf_relation || 'OR',
                                            val,
                                            currentPostId
                                        ),
                                    } );
                                },
                            } ),

                            createElement(
                                Notice,
                                {
                                    status:        'info',
                                    isDismissible: false,
                                    className:     'qltf-notice',
                                },
                                'Vista previa dinámica activa. ' +
                                'Los resultados del editor reflejan el frontend.'
                            )
                        ) // end qltf_active &&
                    )
                )
            );
        };

    }, 'withProControls' );

    addFilter(
        'editor.BlockEdit',
        'pds/query-loop-taxonomy-filter',
        withProControls,
        10
    );

} )( window.wp );