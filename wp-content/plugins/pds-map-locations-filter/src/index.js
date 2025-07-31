/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, CheckboxControl, Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

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
const MapEdit = ({ attributes, setAttributes }) => {
	const { title, selectedTaxonomies = [], initialCenter, zoomLevel } = attributes;
	const blockProps = useBlockProps();

	const availableTaxonomies = useSelect(
		(select) => {
			const allTaxonomies = select('core').getTaxonomies({ per_page: -1, context: 'view' });
			return allTaxonomies?.filter((tax) => tax.types.includes('location')) || [];
		},
		[]
	);

	const onTaxonomyChange = (isChecked, taxSlug) => {
		const newTaxonomies = isChecked
			? [...selectedTaxonomies, taxSlug]
			: selectedTaxonomies.filter((slug) => slug !== taxSlug);
		const uniqueSortedTaxonomies = [...new Set(newTaxonomies)].sort();
		setAttributes({ selectedTaxonomies: uniqueSortedTaxonomies });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Settings', 'pds-map-locations-filter')}>
					<TextControl
						label={__('Block Title', 'pds-map-locations-filter')}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
				</PanelBody>
				<PanelBody title={__('Filters', 'pds-map-locations-filter')} initialOpen>
					<p>{__('Select taxonomies to use as filters:', 'pds-map-locations-filter')}</p>
					{availableTaxonomies.length === 0 ? (
						<p>{__('Loading taxonomies...', 'pds-map-locations-filter')}</p>
					) : (
						availableTaxonomies.map((tax) => (
							<CheckboxControl
								key={tax.slug}
								label={tax.name}
								checked={selectedTaxonomies.includes(tax.slug)}
								onChange={(checked) => onTaxonomyChange(checked, tax.slug)}
							/>
						))
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="mlf-title-editor">
					{title || __('Map Locations Filter (Editor Preview)', 'pds-map-locations-filter')}
				</div>
				<div className="mlf-map-placeholder">
					{__('Area mapa (Renderiza en Frontend)', 'pds-map-locations-filter')}
				</div>
				<div className="editor-filters-preview">
					<strong>{__('Filtros seleccionados:', 'pds-map-locations-filter')}</strong>
					{selectedTaxonomies.length > 0
						? ` ${selectedTaxonomies.join(', ')}`
						: ` ${__('None', 'pds-map-locations-filter')}`
					}
				</div>
				<Notice status="info" isDismissible={false}>
					{__('Configura los filtros en el panel (sidebar). Se renderizaran en frontend.', 'pds-map-locations-filter')}
				</Notice>
			</div>
		</>
	);
};

/**
 * Tienda Lista Block - Edit Component (with JSX preview + taxonomies)
 */
const TiendaEdit = ({ attributes, setAttributes }) => {
	const { title, displayStyle, numStores, selectedTaxonomies = [] } = attributes;
	const blockProps = useBlockProps();

	// Fetch taxonomies assigned to 'location' post type
	const taxonomies = useSelect(
		(select) => {
			const all = select('core').getTaxonomies({ per_page: -1 });
			return all?.filter((tax) => tax.types.includes('location')) || [];
		},
		[]
	);

	const onTaxonomyChange = (checked, slug) => {
		const next = checked ? [...selectedTaxonomies, slug] : selectedTaxonomies.filter((s) => s !== slug);
		setAttributes({ selectedTaxonomies: Array.from(new Set(next)).sort() });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('List Settings', 'pds-map-locations-filter')}>
					<TextControl
						label={__('Block Title', 'pds-map-locations-filter')}
						value={title}
						onChange={(v) => setAttributes({ title: v })}
					/>
					<SelectControl
						label={__('Display Style', 'pds-map-locations-filter')}
						value={displayStyle}
						options={[
							{ label: __('Grid', 'pds-map-locations-filter'), value: 'grid' },
							{ label: __('List', 'pds-map-locations-filter'), value: 'list' },
						]}
						onChange={(v) => setAttributes({ displayStyle: v })}
					/>
					<TextControl
						label={__('Number of Stores', 'pds-map-locations-filter')}
						type="number"
						min="1"
						value={numStores}
						help={__('Max number to display', 'pds-map-locations-filter')}
						onChange={(v) => setAttributes({ numStores: parseInt(v, 10) || 5 })}
					/>
				</PanelBody>

				<PanelBody title={__('Filters', 'pds-map-locations-filter')} initialOpen>
					{taxonomies.length === 0 && <p>{__('Loading taxonomies…', 'pds-map-locations-filter')}</p>}
					{taxonomies.map((tax) => (
						<CheckboxControl
							key={tax.slug}
							label={tax.name}
							checked={selectedTaxonomies.includes(tax.slug)}
							onChange={(checked) => onTaxonomyChange(checked, tax.slug)}
						/>
					))}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className="tienda-preview">
				<h3>{title || __('Tienda Lista Preview', 'pds-map-locations-filter')}</h3>
				<p>
					<strong>{__('Style:', 'pds-map-locations-filter')}</strong> {displayStyle}
				</p>
				<p>
					<strong>{__('Stores:', 'pds-map-locations-filter')}</strong> {numStores}
				</p>
				{selectedTaxonomies.length > 0 && (
					<p>
						<strong>{__('Filters:', 'pds-map-locations-filter')}</strong> {selectedTaxonomies.join(', ')}
					</p>
				)}
				<Notice status="info" isDismissible={false}>
					{__('These filters only preview here — real filtering happens on the front end.', 'pds-map-locations-filter')}
				</Notice>
				<div className={`tienda-placeholder ${displayStyle}`}> 
					{Array.from({ length: numStores }).map((_, i) => (
						<div className="tienda-item" key={i}>
							{__('Store', 'pds-map-locations-filter')} #{i + 1}
						</div>
					))}
				</div>
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