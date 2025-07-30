/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, CheckboxControl, Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import metadataMap from './blocks/map-locations-filter/block.json';
import metadataTienda from './blocks/tienda-lista/block.json';

// Import SCSS files that should apply in editor
import './scss/editor.scss'; // For editor-specific overrides/placeholders
import './scss/main.scss';   // For general block appearance in editor

const { name: mapName } = metadataMap;
const { name: tiendaName } = metadataTienda;

/**
 * Map Locations Filter Block - Edit Component
 */
const MapEdit = ( { attributes, setAttributes } ) => {
	const { title, selectedTaxonomies = [], initialCenter, zoomLevel } = attributes;
	const blockProps = useBlockProps();

	
	const availableTaxonomies = useSelect( ( select ) => {
		const { getTaxonomies } = select( 'core' );
		const allTaxonomies = getTaxonomies( { per_page: -1, context: 'view' } ); // Use context: 'view'
		return allTaxonomies
			? allTaxonomies.filter( ( tax ) =>
					tax.types.includes( 'location' ) // Ensure 'location' is correct CPT slug
			  )
			: [];
	}, [] );

	const onTaxonomyChange = ( isChecked, taxSlug ) => {
		const newTaxonomies = isChecked
			? [ ...selectedTaxonomies, taxSlug ]
			: selectedTaxonomies.filter( ( slug ) => slug !== taxSlug );
		// Ensure unique values and sort for consistency (optional)
		const uniqueSortedTaxonomies = [...new Set(newTaxonomies)].sort();
		setAttributes( { selectedTaxonomies: uniqueSortedTaxonomies } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Map Settings', 'pds-map-locations-filter' ) }>
					<TextControl
						label={ __( 'Block Title', 'pds-map-locations-filter' ) }
						value={ title }
						onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
					/>
					{ /* Add controls for initialCenter (Lat/Lng) and zoomLevel if needed */ }
                    {/* Example:
                    <TextControl label="Initial Latitude" type="number" value={ initialCenter.lat } onChange={ (val) => setAttributes({ initialCenter: { ...initialCenter, lat: parseFloat(val) || 0 } }) } />
                    <TextControl label="Initial Longitude" type="number" value={ initialCenter.lng } onChange={ (val) => setAttributes({ initialCenter: { ...initialCenter, lng: parseFloat(val) || 0 } }) } />
                    <TextControl label="Zoom Level" type="number" value={ zoomLevel } onChange={ (val) => setAttributes({ zoomLevel: parseInt(val, 10) || 6 }) } min="1" max="20" />
                    */}
				</PanelBody>
				<PanelBody title={ __( 'Filters', 'pds-map-locations-filter' ) } initialOpen={ true }>
					<p>{ __( 'Select taxonomies to use as filters:', 'pds-map-locations-filter' ) }</p>
					{ !availableTaxonomies ? (
                         <p>{__('Loading taxonomies...', 'pds-map-locations-filter')}</p>
                     ) : availableTaxonomies.length > 0 ? (
						availableTaxonomies.map( ( tax ) => (
							<CheckboxControl
								key={ tax.slug }
								label={ tax.name }
								checked={ selectedTaxonomies.includes( tax.slug ) }
								onChange={ ( isChecked ) => onTaxonomyChange( isChecked, tax.slug ) }
							/>
						) )
					) : (
						<p>{ __( 'No relevant taxonomies found for "Tienda" posts.', 'pds-map-locations-filter' ) }</p>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
                <div className="mlf-title-editor">{ title || __( 'Map Locations Filter (Editor Preview)', 'pds-map-locations-filter' ) }</div>
				<div className="mlf-map-placeholder">
					{ __( 'Area mapa (Renderiza en Frontend)', 'pds-map-locations-filter' ) }
				</div>
                <div className="editor-filters-preview">
                    <strong>{ __( 'Filtros seleccionados:', 'pds-map-locations-filter' ) }</strong>
                    { selectedTaxonomies.length > 0
                        ? ` ${selectedTaxonomies.join(', ')}`
                        : ` ${__( 'None', 'pds-map-locations-filter' )}`
                    }
                </div>
                 <Notice status="info" isDismissible={false}>
                     {__( 'Configura los filtros en el panel (sidebar). Se renderizaran en frontend.', 'pds-map-locations-filter' )}
                 </Notice>
			</div>
		</>
	);
};

/**
 * Tienda Lista Block - Edit Component
 */
const TiendaEdit = ( { attributes, setAttributes } ) => {
	const { title, displayStyle, numStores } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'List Settings', 'pds-map-locations-filter' ) }>
					<TextControl
						label={ __( 'Block Title', 'pds-map-locations-filter' ) }
						value={ title }
						onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
					/>
					<SelectControl
						label={ __( 'Display Style', 'pds-map-locations-filter' ) }
						value={ displayStyle }
						options={ [
							{ label: __( 'Grid', 'pds-map-locations-filter' ), value: 'grid' },
							{ label: __( 'List', 'pds-map-locations-filter' ), value: 'list' },
						] }
						onChange={ ( newStyle ) => setAttributes( { displayStyle: newStyle } ) }
					/>
					<TextControl
                        label={ __( 'Number of Stores', 'pds-map-locations-filter' ) }
                        type="number"
                        value={ numStores }
                        onChange={ ( newNum ) => setAttributes( { numStores: parseInt( newNum, 10 ) || 5 } ) } // Default to 5 if invalid
                        min="1"
                        help={ __( 'Maximum number of stores to display.', 'pds-map-locations-filter' )}
                    />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ /* ServerSideRender shows a preview using the PHP render callback */ }
				<ServerSideRender
					block={ tiendaName }
					attributes={ attributes }
				/>
			</div>
		</>
	);
};


/**
 * Register Blocks
 */
registerBlockType( metadataMap.name, {
	edit: MapEdit,
	save: () => null, // Dynamic block
} );

registerBlockType( metadataTienda.name, {
	edit: TiendaEdit,
	save: () => null, // Dynamic block
} );