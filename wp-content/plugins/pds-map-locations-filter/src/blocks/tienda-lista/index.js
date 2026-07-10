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
    enableMap = true,
    zoomLevel = 6,
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

  // Botones de vista disponibles (el switcher real se renderiza en el front).
  const views = [
    { view: 'list', label: __('Listado', 'pds-map-locations-filter') },
    { view: 'grid', label: __('Tabla', 'pds-map-locations-filter') },
  ];
  if (enableMap) {
    views.push({ view: 'map', label: __('Mapa', 'pds-map-locations-filter') });
  }

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
            label={__('Vista por defecto', 'pds-map-locations-filter')}
            value={displayStyle}
            options={[
              { label: __('Listado', 'pds-map-locations-filter'), value: 'list' },
              { label: __('Tabla', 'pds-map-locations-filter'), value: 'grid' },
              ...(enableMap ? [{ label: __('Mapa', 'pds-map-locations-filter'), value: 'map' }] : []),
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

        <PanelBody title={__('Mapa', 'pds-map-locations-filter')} initialOpen={false}>
          <CheckboxControl
            label={__('Habilitar vista Mapa', 'pds-map-locations-filter')}
            checked={enableMap}
            help={__('Muestra el botón "Mapa" en el conmutador de vistas.', 'pds-map-locations-filter')}
            onChange={(checked) => setAttributes({ enableMap: checked })}
          />
          {enableMap && (
            <TextControl
              label={__('Zoom inicial del mapa', 'pds-map-locations-filter')}
              type="number"
              min="1"
              max="20"
              value={zoomLevel}
              onChange={(v) => setAttributes({ zoomLevel: parseInt(v, 10) || 6 })}
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
        <h3>{title || __('Centros SJD', 'pds-map-locations-filter')}</h3>

        {/* Vista previa del conmutador (el interactivo se renderiza en el front) */}
        <div className="pds-view-switcher">
          {views.map((v) => (
            <button
              type="button"
              key={v.view}
              className={`mlf-view-btn${v.view === displayStyle ? ' active' : ''}`}
              disabled
            >
              {v.label}
            </button>
          ))}
        </div>

        <Notice status="info" isDismissible={false}>
          {__(
            'El conmutador y los filtros son interactivos solo en la parte pública.',
            'pds-map-locations-filter'
          )}
        </Notice>

        <div className={`tienda-placeholder ${displayStyle}`}>
          {Array.from({ length: Math.min(numStores, 3) }).map((_, i) => (
            <div className="tienda-item" key={i}>
              {__('Centro', 'pds-map-locations-filter')} #{i + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TiendaEdit;
