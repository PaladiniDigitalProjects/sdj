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
    displayStyle,
    numStores,
    showAllResults,
    selectedTaxonomies = [],
    cptSlug,
  } = attributes;

  const taxonomies =
      useSelect(
        (select) =>
          select('core').getTaxonomies(
            { type: cptSlug, per_page: -1 },
            { context: 'view' }
          ),
        [cptSlug]
      ) || [];

  const onTaxonomyChange = (checked, slug) => {
    const next = checked
      ? [...selectedTaxonomies, slug]
      : selectedTaxonomies.filter((s) => s !== slug);
    setAttributes({
      selectedTaxonomies: Array.from(new Set(next)).sort(),
    });
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
          <CheckboxControl
            label={__('Show All Results', 'pds-map-locations-filter')}
            checked={showAllResults}
            help={__('Display all stores without limit', 'pds-map-locations-filter')}
            onChange={(checked) => setAttributes({ showAllResults: checked })}
          />
          {!showAllResults && (
            <TextControl
              label={__('Number of Stores', 'pds-map-locations-filter')}
              type="number"
              min="1"
              value={numStores}
              help={__('Max number to display', 'pds-map-locations-filter')}
              onChange={(v) => setAttributes({ numStores: parseInt(v, 10) || 8 })}
            />
          )}
        </PanelBody>

        <PanelBody title={__('Filters', 'pds-map-locations-filter')} initialOpen>
          {taxonomies.length === 0 ? (
            <p>
              {__('No filterable taxonomies found for CPT:', 'pds-map-locations-filter')}{' '}
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

      <div {...useBlockProps()} className="tienda-preview">
        <h3>{title || __('Tienda Lista Preview', 'pds-map-locations-filter')}</h3>
        <p>
          <strong>{__('Style:', 'pds-map-locations-filter')}</strong> {displayStyle}
        </p>
        <p>
          <strong>{__('Stores:', 'pds-map-locations-filter')}</strong> {numStores}
        </p>
        {selectedTaxonomies.length > 0 && (
          <p>
            <strong>{__('Filters:', 'pds-map-locations-filter')}</strong>{' '}
            {selectedTaxonomies.join(', ')}
          </p>
        )}
        <Notice status="info" isDismissible={false}>
          {__(
            'These filters only preview here — real filtering happens on the front end.',
            'pds-map-locations-filter'
          )}
        </Notice>
        <div className={`tienda-placeholder ${displayStyle}`}>
          {Array.from({ length: Math.min(numStores, 3) }).map((_, i) => (
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
