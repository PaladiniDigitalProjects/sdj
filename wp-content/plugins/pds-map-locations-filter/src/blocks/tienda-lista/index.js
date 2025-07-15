import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( 'pds-map-locations-filter/tienda-lista', {
    edit: ( { attributes, setAttributes } ) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={ __( 'Settings', 'pds-map-locations-filter' ) }>
                        <TextControl
                            label={ __( 'Title', 'pds-map-locations-filter' ) }
                            value={ attributes.title || '' }
                            onChange={ ( value ) => setAttributes( { title: value } ) }
                        />
                        <SelectControl
                            label={ __( 'Display Style', 'pds-map-locations-filter' ) }
                            value={ attributes.displayStyle || 'grid' }
                            options={ [
                                { label: 'Grid', value: 'grid' },
                                { label: 'List', value: 'list' },
                            ] }
                            onChange={ ( value ) => setAttributes( { displayStyle: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <h3>{ attributes.title }</h3>
                    <p>{ __( 'This will display a list of stores.', 'pds-map-locations-filter' ) }</p>
                </div>
            </>
        );
    },
    save: () => {
        return null; // Rendering will be handled by PHP.
    }
} );
