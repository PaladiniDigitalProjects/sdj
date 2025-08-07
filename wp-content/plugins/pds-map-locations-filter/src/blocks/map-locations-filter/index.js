import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	SelectControl,
	CheckboxControl,
	Notice,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const TiendaEdit = ({ attributes, setAttributes }) => {
	const {
		title,
		selectedTaxonomies = [],
		zoomLevel,
		initialCenter,
		cptSlug,
	} = attributes;

	const taxonomies = useSelect((select) => {
		const all = select('core').getTaxonomies({ per_page: -1, context: 'view' }) || [];
		return all.filter(
			(tax) =>
				tax.types.includes(cptSlug) &&
				tax.public &&
				tax.show_ui
		);
	}, [cptSlug]);

	const onTaxonomyChange = (checked, slug) => {
		const next = checked
			? [...selectedTaxonomies, slug]
			: selectedTaxonomies.filter((s) => s !== slug);
		setAttributes({ selectedTaxonomies: [...new Set(next)] });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Settings', 'pds-map-locations-filter')}>
					<TextControl
						label={__('Block Title', 'pds-map-locations-filter')}
						value={title}
						onChange={(v) => setAttributes({ title: v })}
					/>
					<TextControl
						label={__('Zoom Level', 'pds-map-locations-filter')}
						type="number"
						value={zoomLevel}
						onChange={(v) => setAttributes({ zoomLevel: parseInt(v, 10) || 6 })}
					/>
				</PanelBody>

				<PanelBody title={__('Filters', 'pds-map-locations-filter')} initialOpen>
					{taxonomies.length === 0 ? (
						<p>
							{__('No taxonomies found for:', 'pds-map-locations-filter')}{' '}
							<code>{cptSlug}</code>
						</p>
					) : (
						taxonomies.map((tax) => (
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

			<div {...useBlockProps()} className="map-preview">
				<h3>{title}</h3>
				<p>
					<strong>{__('Zoom:', 'pds-map-locations-filter')}</strong> {zoomLevel}
				</p>
				<p>
					<strong>{__('Center:', 'pds-map-locations-filter')}</strong>{' '}
					{initialCenter.lat}, {initialCenter.lng}
				</p>
				{selectedTaxonomies.length > 0 && (
					<p>
						<strong>{__('Filters:', 'pds-map-locations-filter')}</strong>{' '}
						{selectedTaxonomies.join(', ')}
					</p>
				)}
				<Notice status="info" isDismissible={false}>
					{__('This is a preview. Filters apply on the front end.', 'pds-map-locations-filter')}
				</Notice>
			</div>
		</>
	);
};

export default TiendaEdit;
