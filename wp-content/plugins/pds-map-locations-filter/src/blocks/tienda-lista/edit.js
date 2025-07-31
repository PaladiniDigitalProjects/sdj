import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

const TiendaEdit = ({ attributes, setAttributes }) => {
	const { title, displayStyle, numStores, selectedTaxonomies = [] } = attributes;
	const blockProps = useBlockProps();

	// Fetch taxonomies related to 'location' post type
	const taxonomies = useSelect((select) => {
		const all = select('core').getTaxonomies();
		return all?.filter((tax) => tax.types?.includes('location')) || [];
	}, []);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('List Settings', 'pds-map-locations-filter')}>
					<TextControl
						label={__('Block Title', 'pds-map-locations-filter')}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
					/>
					<SelectControl
						label={__('Display Style', 'pds-map-locations-filter')}
						value={displayStyle}
						options={[
							{ label: __('Grid', 'pds-map-locations-filter'), value: 'grid' },
							{ label: __('List', 'pds-map-locations-filter'), value: 'list' },
						]}
						onChange={(newStyle) => setAttributes({ displayStyle: newStyle })}
					/>
					<TextControl
						label={__('Number of Stores', 'pds-map-locations-filter')}
						type="number"
						value={numStores}
						onChange={(newNum) =>
							setAttributes({ numStores: parseInt(newNum, 10) || 5 })
						}
						min="1"
						help={__('Maximum number of stores to display.', 'pds-map-locations-filter')}
					/>
				</PanelBody>

				<PanelBody title={__('Filters', 'pds-map-locations-filter')} initialOpen={true}>
					{!taxonomies.length ? (
						<p>{__('Loading taxonomies...', 'pds-map-locations-filter')}</p>
					) : (
						taxonomies.map((tax) => (
							<CheckboxControl
								key={tax.slug}
								label={tax.name}
								checked={selectedTaxonomies.includes(tax.slug)}
								onChange={(isChecked) => {
									const updated = isChecked
										? [...selectedTaxonomies, tax.slug]
										: selectedTaxonomies.filter((slug) => slug !== tax.slug);
									setAttributes({ selectedTaxonomies: [...new Set(updated)] });
								}}
							/>
						))
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<h3>{title || 'Tienda Lista'}</h3>
				<p><strong>Style:</strong> {displayStyle}</p>
				<p><strong>Stores to show:</strong> {numStores}</p>
				{selectedTaxonomies.length > 0 && (
					<p><strong>Selected Taxonomies:</strong> {selectedTaxonomies.join(', ')}</p>
				)}
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

export default TiendaEdit;
