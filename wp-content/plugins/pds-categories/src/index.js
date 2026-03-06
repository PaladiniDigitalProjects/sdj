import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

registerBlockType( 'pds/query-categories', {
  apiVersion: 2,
  title: __( 'Query Categories', 'pds' ),
  icon: 'list-view',
  category: 'widgets',
  attributes: {
    taxonomy: {
      type: 'string',
      default: 'category',
    },
    style: {
      type: 'string',
      default: 'texto',
    },
  },
  supports: {
    html: false,
  },

  edit( { attributes, setAttributes } ) {
    const { taxonomy, style } = attributes;

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Ajustes', 'pds' ) } initialOpen>
            <SelectControl
              label={ __( 'Taxonomía', 'pds' ) }
              value={ taxonomy }
              options={ [
                { label: __( 'Categoría', 'pds' ), value: 'category' },
                { label: __( 'Etiqueta', 'pds' ), value: 'post_tag' },
              ] }
              onChange={ ( val ) => setAttributes( { taxonomy: val } ) }
            />

            <SelectControl
              label={ __( 'Estilo', 'pds' ) }
              value={ style }
              options={ [
                { label: __( 'Pill', 'pds' ), value: 'pill' },
                { label: __( 'Texto', 'pds' ), value: 'texto' },
              ] }
              onChange={ ( val ) => setAttributes( { style: val } ) }
            />
          </PanelBody>
        </InspectorControls>

        <div className="pds-server-render">
          <ServerSideRender
            block="pds/query-categories"
            attributes={ attributes }
          />
        </div>
      </>
    );
  },

  save() {
    return null;
  },
} );
