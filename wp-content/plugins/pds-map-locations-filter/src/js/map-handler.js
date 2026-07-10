/*
 * src/js/map-handler.js
 * Clase reutilizable que gestiona el mapa de Google (marcadores + clustering +
 * info window). La usan dos consumidores:
 *   - El bloque legacy `map-locations-filter` (view.js), con su propia toolbar
 *     de búsqueda/filtros y su columna de lista (autoBindToolbar: true).
 *   - El bloque unificado `tienda-lista`, que la instancia como una vista más
 *     ("Mapa"), comparte sus filtros externos y la inicializa de forma perezosa
 *     al abrir la pestaña (autoBindToolbar: false).
 */

import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export class MLFMapHandler {
  /**
   * @param {Object} opts
   * @param {HTMLElement} opts.root            Wrapper que contiene el mapa.
   * @param {HTMLElement} [opts.mapEl]         Contenedor del mapa (por defecto .mlf-map-container dentro de root).
   * @param {boolean}     [opts.autoBindToolbar=false]  Si true, lee búsqueda/filtros/lista de su propia toolbar (legacy).
   * @param {Function}    [opts.getFilters]    () => ({ search, taxonomies }) para el modo filtros externos.
   * @param {Object}      [opts.center]        { lat, lng } centro inicial.
   * @param {number}      [opts.zoom]          Zoom inicial.
   * @param {Object}      [opts.i18n]          Textos.
   */
  constructor(opts = {}) {
    this.root = opts.root;
    this.mapEl = opts.mapEl || (this.root ? this.root.querySelector('.mlf-map-container') : null);
    this.autoBindToolbar = !!opts.autoBindToolbar;
    this._externalGetFilters = typeof opts.getFilters === 'function' ? opts.getFilters : null;

    this.map = null;
    this.infoWindow = null;
    this.loader = null;
    this.cluster = null;
    this.markers = [];
    this.markerData = new Map();
    this.markerCallbacks = new Map();
    this.i18n = opts.i18n || {};
    this.center = opts.center || { lat: 0, lng: 0 };
    this.zoom = opts.zoom || 8;
    this.showList = true;
    this._initialized = false;

    // Modo legacy: la toolbar/lista viven dentro de root.
    this.toolbar = null;
    this.searchInput = null;
    this.filterSelects = [];
    this.listEl = null;

    if (this.autoBindToolbar && this.root) {
      this._readInitData();
      this.toolbar = this.root.querySelector('.pds-map-toolbar');
      this.searchInput = this.toolbar ? this.toolbar.querySelector('.mlf-search') : null;
      this.filterSelects = this.toolbar
        ? Array.from(this.toolbar.querySelectorAll('.mlf-filters-select'))
        : [];
      this.listEl = this.root.querySelector('.mlf-locations-list-container');
    }
  }

  _readInitData() {
    try {
      const init = JSON.parse(this.root.dataset.blockInit || '{}');
      if (init.initialCenter) this.center = init.initialCenter;
      if (init.zoomLevel) this.zoom = init.zoomLevel;
      if (init.i18n) this.i18n = init.i18n;
      if (typeof init.showList !== 'undefined') this.showList = init.showList;
    } catch (err) {
      console.warn('MLF: Invalid blockInit JSON', err);
    }
  }

  /**
   * Inicialización perezosa e idempotente: carga Google Maps y pinta el mapa.
   * Debe llamarse cuando el contenedor del mapa ya es visible (Google Maps no
   * renderiza bien si se inicializa dentro de un display:none).
   */
  init() {
    if (this._initialized) return;
    if (!this.mapEl) {
      console.error('MLF: Missing map container');
      return;
    }
    this._initialized = true;

    const apiKey = window.mlf_ajax?.google_maps_api_key;
    if (!apiKey) {
      this._showError(
        this.mapEl,
        this.i18n.errorLoadingMap || 'Map cannot be loaded (API key missing).'
      );
      return;
    }

    this.loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['maps', 'marker'],
      region: this.i18n.region || undefined,
      language: this.i18n.language || undefined,
    });

    this.loader
      .importLibrary('maps')
      .then(({ Map, InfoWindow }) => {
        this.infoWindow = new InfoWindow();
        this.loader.importLibrary('marker').then(() => {
          this._setupMap(Map);
          if (this.autoBindToolbar) this._bindEvents();
          this._fetchData();
        });
      })
      .catch(err => this._showError(this.mapEl, this.i18n.errorLoadingMap, err));
  }

  /** Re-fetch de marcadores con los filtros actuales (modo filtros externos). */
  refresh() {
    if (!this._initialized) return;
    this._fetchMarkers();
  }

  _setupMap(MapConstructor) {
    this.mapEl.innerHTML = '';

    this.map = new MapConstructor(this.mapEl, {
      center: this.center,
      zoom: this.zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapId: '1095ea80eafe87291fdf2926',
    });

    this.map.addListener('click', () => {
      this.infoWindow.close();
    });

    // Renderer personalitzat dels clusters: cercle sòlid vermell ($cta) de
    // 30x30 amb vora blanca (com els punts destacats) i el número en blanc.
    this.cluster = new MarkerClusterer({
      map: this.map,
      renderer: {
        render: ({ count, position }) => {
          const svg = 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">' +
            '<circle cx="15" cy="15" r="13" fill="#dd1115" stroke="#ffffff" stroke-width="2"/></svg>'
          );
          return new google.maps.Marker({
            position,
            icon: {
              url: svg,
              scaledSize: new google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 15),
            },
            label: {
              text: String(count),
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
            },
            zIndex: 1000 + count,
          });
        },
      },
    });

    if (this.mapEl.dataset.singleLocation) {
      try {
        const loc = JSON.parse(this.mapEl.dataset.singleLocation);
        if (loc.position && this.map) {
          this._renderMarkers([loc]);
        }
      } catch (err) {
        console.warn('MLF: singleLocation parse error', err);
      }
    }
  }

  _bindEvents() {
    this.filterSelects.forEach(select =>
      select.addEventListener('change', () => this._fetchData())
    );
    if (this.searchInput) {
      this.searchInput.addEventListener(
        'input',
        debounce(() => this._fetchData(), 400)
      );
    }
    if (this.listEl) {
      this.listEl.addEventListener('click', e => this._onListClick(e));
    }
  }

  _onListClick(event) {
    const item = event.target.closest('.mlf-location-item');
    if (!item || !item.dataset.locationId) return;
    const id = parseInt(item.dataset.locationId, 10);
    const marker = this.markers.find(m => m.mlfId === id);
    if (marker) {
      this.map.panTo(marker.position);
      this.map.setZoom(15);
      const callback = this.markerCallbacks.get(id);
      if (callback) callback();
    }
  }

  _getFilters() {
    // Modo filtros externos (bloque unificado).
    if (this._externalGetFilters) {
      const f = this._externalGetFilters() || {};
      return { taxonomies: f.taxonomies || {}, search: f.search || '' };
    }
    // Modo legacy: lee su propia toolbar.
    const tax = {};
    this.filterSelects.forEach(sel => {
      if (sel.value && sel.value !== 'all') tax[sel.name] = sel.value;
    });
    return { taxonomies: tax, search: this.searchInput?.value.trim() || '' };
  }

  _buildBaseParams() {
    const filters = this._getFilters();
    const base = new URLSearchParams();
    base.set('nonce', window.mlf_ajax.nonce);
    base.set('search', filters.search);
    base.set('taxonomies', JSON.stringify(filters.taxonomies));
    return base;
  }

  /** Fetch de marcadores (y de la lista solo en modo legacy con columna de lista). */
  _fetchData() {
    if (this.autoBindToolbar && this.listEl) {
      this._showLoading();
      const base = this._buildBaseParams();

      const listReq = fetch(window.mlf_ajax.ajax_url, {
        method: 'POST',
        body: (() => { const p = new URLSearchParams(base); p.set('action', 'mlf_get_locations_html'); return p; })(),
      }).then(r => r.json());

      const markerReq = fetch(window.mlf_ajax.ajax_url, {
        method: 'POST',
        body: (() => { const p = new URLSearchParams(base); p.set('action', 'mlf_get_locations_markers'); return p; })(),
      }).then(r => r.json());

      Promise.all([listReq, markerReq])
        .then(([list, markers]) => {
          this._handleList(list);
          this._handleMarkers(markers);
        })
        .catch(err => {
          console.error('MLF: Fetch error', err);
          this._showError(this.listEl, this.i18n.errorLoadingLocations);
          this._clearMarkers();
        })
        .finally(() => this._hideLoading());
      return;
    }

    // Modo filtros externos: solo marcadores.
    this._fetchMarkers();
  }

  _fetchMarkers() {
    const base = this._buildBaseParams();
    base.set('action', 'mlf_get_locations_markers');
    fetch(window.mlf_ajax.ajax_url, { method: 'POST', body: base })
      .then(r => r.json())
      .then(markers => this._handleMarkers(markers))
      .catch(err => {
        console.error('MLF: Fetch markers error', err);
        this._clearMarkers();
      });
  }

  _handleList(response) {
    if (response.success && response.data.html) {
      this.listEl.innerHTML = response.data.html;
    } else if (this.listEl) {
      this._showError(this.listEl, this.i18n.noResults || 'No locations found.');
    }
  }

  _handleMarkers(response) {
    if (response.success && Array.isArray(response.data)) {
      this._renderMarkers(response.data);
    } else {
      console.error('MLF: Invalid marker data', response);
      this._clearMarkers();
    }
  }

  _renderMarkers(data) {
    this._clearMarkers();
    this.markerData.clear();

    data.forEach(d => {
      const m = new google.maps.marker.AdvancedMarkerElement({
        position: d.position,
        title: d.title,
        map: this.map,
        gmpClickable: true,
        content: this._createMarkerContent(d),
      });
      m.mlfId = d.id;
      this.markerData.set(d.id, d);

      if (d.infoWindowContent) {
        const callback = () => {
          this.infoWindow.close();
          this.infoWindow.setContent(d.infoWindowContent);
          this.infoWindow.open({ map: this.map, anchor: m });
        };

        m.addListener('click', callback);
        this.markerCallbacks.set(d.id, callback);
      }
      this.markers.push(m);
    });

    if (this.cluster) {
      this.cluster.clearMarkers();
      this.cluster.addMarkers(this.markers);
    }
    this._fitBounds();
  }

  _createMarkerContent(d) {
    const el = document.createElement('div');
    el.className = 'mlf-marker';
    el.dataset.locationId = d.id;

    const markerImage = window.mlf_ajax?.marker_image;
    if (markerImage) {
      el.classList.add('has-custom-image');
      el.style.backgroundImage = `url(${markerImage})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.backgroundColor = 'transparent';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid #fff';
      el.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    }

    return el;
  }

  _clearMarkers() {
    if (this.cluster) this.cluster.clearMarkers();
    this.markers.forEach(m => { m.map = null; });
    this.markers = [];
    this.markerCallbacks.clear();
    if (this.infoWindow) this.infoWindow.close();
  }

  _fitBounds() {
    if (!this.markers.length) return;
    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(m => bounds.extend(m.position));
    this.map.fitBounds(bounds);
    if (this.markers.length === 1) this.map.setZoom(Math.min(this.map.getZoom(), 15));
  }

  _showLoading() {
    if (this.listEl) {
      this.listEl.innerHTML = `<p class="mlf-loading">${this.i18n.loadingLocations || ''}</p>`;
    }
    if (this.root) this.root.classList.add('is-loading');
  }

  _hideLoading() {
    if (this.root) this.root.classList.remove('is-loading');
  }

  _showError(el, msg) {
    if (el) el.innerHTML = `<p class="mlf-error">${msg || ''}</p>`;
  }
}
