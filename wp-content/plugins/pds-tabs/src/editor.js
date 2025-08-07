// src/editor.js

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  RangeControl,
} from '@wordpress/components';

const BLOCK_NAME = 'ghub/tabs-container';


const withTabsInspectorControls = createHigherOrderComponent(
  ( BlockEdit ) => ( props ) => {
    if ( props.name !== BLOCK_NAME ) {
      return <BlockEdit { ...props } />;
    }
    const { attributes, setAttributes } = props;
    const { activate, autoSlideDuration, pauseOnHover } = attributes;

    return (
      <>
        <BlockEdit { ...props } />
        <InspectorControls>
          <PanelBody title="Auto‑Slide" initialOpen>
            <ToggleControl
              label="Enable Auto‑Slide"
              checked={ activate }
              onChange={ ( val ) => setAttributes( { activate: val } ) }
            />
            <RangeControl
              label="Duration (ms)"
              help="Time each tab stays visible"
              value={ autoSlideDuration ?? 5000 }
              onChange={ ( val ) => setAttributes( { autoSlideDuration: val } ) }
              min={ 500 }
              max={ 10000 }
              step={ 500 }
              disabled={ ! activate }
            />
            <ToggleControl
              label="Pause on hover"
              help="Stop auto-slide when hovering"
              checked={ pauseOnHover }
              onChange={ ( val ) => setAttributes( { pauseOnHover: val } ) }
              disabled={ ! activate }
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  },
  'withTabsInspectorControls'
);

addFilter(
  'editor.BlockEdit',
  'pds-tabs/with-tabs-inspector-controls',
  withTabsInspectorControls
);


function addDataAttributes( saveProps, blockType, attributes ) {
  if ( blockType.name !== BLOCK_NAME ) {
    return saveProps;
  }
  return {
    ...saveProps,
    'data-activation': attributes.activate ? 'true' : 'false',
    'data-auto-slide-duration': attributes.autoSlideDuration,
    'data-pause-hover': attributes.pauseOnHover ? 'true' : 'false',
  };
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'pds-tabs/add-data-attributes',
  addDataAttributes
);
