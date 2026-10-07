/**
 * WordPress Dependencies
 */
import { assign, get } from 'lodash';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { useEffect, useRef } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Custom Dependencies
 */
import { PostSelector } from '../components';

const withSelectivePostControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const rawPostType = get(props, 'attributes.query.postType'); // sin valor por defecto
    const postType = rawPostType || 'post';
    const currentQuery = get(props, 'attributes.query', {});
    const prevPostType = useRef(); // sin inicializar

    const currentSelectivePosts = get(
      currentQuery,
      'qlpspSelectivePosts',
      []
    );

    const inherit = get(currentQuery, 'inherit', false);

    useEffect(() => {
      // Aún no ha llegado el valor real de postType: no juzgar todavía.
      if (rawPostType === undefined) {
        return;
      }

      // Primera vez que vemos un valor real: solo lo guardamos como referencia.
      if (prevPostType.current === undefined) {
        prevPostType.current = rawPostType;
        return;
      }

      // Solo resetea si el valor real cambió de verdad.
      if (rawPostType !== prevPostType.current) {
        props.setAttributes({
          query: {
            ...currentQuery,
            qlpspSelectivePosts: [],
          },
        });
      }

      prevPostType.current = rawPostType;
    }, [rawPostType, inherit]);

    if ('core/query' !== props.name) {
      return <BlockEdit {...props} />;
    }

    return (
      <>
        <BlockEdit {...props} />
        {!inherit && (
          <InspectorControls>
            <PanelBody
              title={__(
                'Selective Posts',
                'query-loop-post-selector'
              )}
            >
              <PostSelector
                postType={postType}
                value={currentSelectivePosts}
                onChange={(newSelectivePosts) =>
                  props.setAttributes({
                    query: {
                      ...currentQuery,
                      qlpspSelectivePosts: newSelectivePosts,
                    },
                  })
                }
              />
            </PanelBody>
          </InspectorControls>
        )}
      </>
    );
  };
}, 'withSelectivePostControl');

addFilter(
  'editor.BlockEdit',
  'small-plugins/with-query-loop-selective-post-control',
  withSelectivePostControl
);