import { MLFMapHandler } from '../../js/map-handler';

document.addEventListener('DOMContentLoaded', () => {
  const listBlocks = document.querySelectorAll('.pds-tiendas-wrapper');

  listBlocks.forEach(blockWrapper => {

    const attrs = JSON.parse(blockWrapper.dataset.blockInit || '{}');
    const blockId = blockWrapper.id;
    const { ajax_url: ajaxUrl, nonce, i18n: globalI18n } = window.mlf_ajax;
    // El límite viene del PHP en `initialNumStores` (ver $block_data en
    // templates/tienda-lista.php); `numStores` nunca ha existido en ese JSON, así
    // que se leía undefined y caía al fallback -> el filtrado AJAX devolvía como
    // mucho 12 centros (p.ej. "Social" tiene 39). Se mantiene `numStores` como
    // alternativa por si algún render antiguo lo publicara, y el fallback es -1
    // (sin límite) para no volver a truncar en silencio.
    const rawNumStores = attrs.initialNumStores !== undefined ? attrs.initialNumStores : attrs.numStores;
    const parsedNumStores = parseInt(rawNumStores, 10);
    const initialNumStores = attrs.showAllResults || !parsedNumStores ? -1 : parsedNumStores;
    const initialStyle = attrs.displayStyle || attrs.initialStyle || 'list';
    const enableMap = attrs.enableMap !== false;
    const i18n = {
      loading: globalI18n.loadingLocations || globalI18n.loading,
      noResults: attrs.i18n?.noResults || 'No se ha encontrado la localización',
    };

    const resultsContainer = blockWrapper.querySelector('.pds-tiendas-results-container');
    const searchInput = blockWrapper.querySelector(`#${blockId}-mlf-search-input`);
    const taxonomySelects = blockWrapper.querySelectorAll('.mlf-filters-select');
    const viewButtons = blockWrapper.querySelectorAll('.mlf-view-btn');
    const mapEl = blockWrapper.querySelector('.mlf-map-container');

    let currentSearch = '';
    let currentTaxonomies = {};
    let currentDisplayStyle = initialStyle;
    const numStores = initialNumStores;

    // --- Vista Mapa (perezosa): comparte los filtros de este bloque ---
    let mapHandler = null;
    let mapInitialized = false;
    const getFilters = () => ({ search: currentSearch, taxonomies: currentTaxonomies });

    const ensureMap = () => {
      if (!enableMap || !mapEl) return;
      if (!mapHandler) {
        mapHandler = new MLFMapHandler({
          root: blockWrapper,
          mapEl,
          getFilters,
          center: attrs.initialCenter,
          zoom: attrs.zoomLevel,
          i18n: attrs.i18n || {},
        });
      }
      if (!mapInitialized) {
        mapInitialized = true;
        mapHandler.init(); // carga Google Maps + fetch inicial con los filtros actuales
      } else {
        mapHandler.refresh(); // re-aplica los filtros actuales
      }
    };

    // Browsers restore <input>/<select> values from the previous visit on
    // back/forward navigation, which would leave the filter UI showing a
    // value that no longer matches the freshly initialized (empty) state
    // above. Reset the controls so the visible filter always matches the
    // results that are about to be fetched.
    const resetFilters = () => {
      if (searchInput) searchInput.value = '';
      taxonomySelects.forEach(select => { select.value = 'all'; });
      currentSearch = '';
      currentTaxonomies = {};
    };
    resetFilters();

    const applyDisplayStyle = () => {
      blockWrapper.classList.remove('grid', 'list', 'map');
      blockWrapper.classList.add(currentDisplayStyle);
      viewButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === currentDisplayStyle));
    };

    applyDisplayStyle();

    const fetchStores = debounce(async () => {
      resultsContainer.innerHTML = `<p class="pds-tiendas-loading">${i18n.loading}</p>`;
      blockWrapper.classList.add('is-loading');

      const formData = new FormData();
      formData.append('action', 'mlf_get_tienda_list_html');
      formData.append('nonce', nonce);
      formData.append('search', currentSearch);
      formData.append('taxonomies', JSON.stringify(currentTaxonomies));
      formData.append('numStores', numStores);
      // El mapa reutiliza la lista; en vista mapa pedimos estilo "list" por defecto.
      formData.append('displayStyle', currentDisplayStyle === 'map' ? 'list' : currentDisplayStyle);

      try {
        const res = await fetch(ajaxUrl, { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
          resultsContainer.innerHTML = data.data.html;
        } else {
          resultsContainer.innerHTML = `<p class="pds-tiendas-error">${i18n.noResults}</p>`;
          console.error('AJAX error:', data.data);
        }
      } catch (err) {
        resultsContainer.innerHTML = `<p class="pds-tiendas-error">${i18n.noResults}</p>`;
        console.error('Fetch error:', err);
      } finally {
        blockWrapper.classList.remove('is-loading');
      }
    }, 300);

    // Un cambio de filtro se aplica a la vista activa: mapa (marcadores) o lista/grilla.
    const onFilterChange = () => {
      if (currentDisplayStyle === 'map') {
        if (mapHandler && mapInitialized) mapHandler.refresh();
      } else {
        fetchStores();
      }
    };

    // Event listeners

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentSearch = e.target.value;
        onFilterChange();
      });
    }

    taxonomySelects.forEach(select => {
      select.addEventListener('change', e => {
        currentTaxonomies[e.target.name] = e.target.value;
        onFilterChange();
      });
    });

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentDisplayStyle = btn.dataset.view;
        applyDisplayStyle();
        if (currentDisplayStyle === 'map') {
          ensureMap();
        } else {
          fetchStores();
        }
      });
    });

    // Carga inicial según la vista por defecto.
    if (currentDisplayStyle === 'map') {
      ensureMap();
    } else {
      fetchStores();
    }

    // On back/forward navigation (e.g. after visiting a location's "ficha"
    // and going back), browsers restore <input>/<select> values from the
    // previous visit — and on bfcache restores this script doesn't re-run at
    // all — so the wrapper could keep showing a filter UI that no longer
    // matches its results. `pageshow` fires in both cases (and on the
    // initial load too), so reset and refetch every time to keep them in sync.
    window.addEventListener('pageshow', () => {
      currentDisplayStyle = initialStyle;
      applyDisplayStyle();
      resetFilters();
      if (currentDisplayStyle === 'map') {
        ensureMap();
      } else {
        fetchStores();
      }
    });
  });


  function debounce(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }
});
