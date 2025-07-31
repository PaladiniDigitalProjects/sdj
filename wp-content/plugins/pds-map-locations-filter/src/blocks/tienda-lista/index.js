import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const EditComponent = ({ attributes, setAttributes }) => {
	const { title, displayStyle, numStores, selectedTaxonomies } = attributes;

	const { taxonomies } = useSelect(
		(select) => ({
			taxonomies: select('core').getTaxonomies({ post_type: 'location' }),
		}),
		[]
	);

	const blockProps = useBlockProps();

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
					<SelectControl
						label={__('Filter Taxonomies', 'pds-map-locations-filter')}
						multiple
						value={selectedTaxonomies}
						options={(taxonomies || []).map((taxonomy) => ({
							label: taxonomy.name || taxonomy.slug,
							value: taxonomy.slug,
						}))}
						onChange={(selected) =>
							setAttributes({
								selectedTaxonomies: Array.isArray(selected)
									? selected
									: [selected],
							})
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="pds-map-locations-filter/tienda-lista"
					attributes={attributes}
				/>
			</div>
		</>
	);
};
EditComponent.propTypes = {
	attributes: PropTypes.shape({
		title: PropTypes.string,
		displayStyle: PropTypes.string,
		numStores: PropTypes.number,
		selectedTaxonomies: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	setAttributes: PropTypes.func.isRequired,
};

export default EditComponent;
