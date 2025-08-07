/*
 * src/blocks/map-locations-filter/view.js
 * Optimized Map Handler with clustering, i18n, error handling, and clean structure
 */

import { Loader } from '@googlemaps/js-api-loader';
import domReady from '@wordpress/dom-ready';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// Debounce helper
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

class MLFMapHandler {
  constructor(root) {
    this.root = root;
    this.mapEl = root.querySelector('.mlf-map-container');
    this.listEl = root.querySelector('.mlf-locations-list-container');
    this.toolbar = root.querySelector('.pds-map-toolbar');
    this.searchInput = this.toolbar?.querySelector('.mlf-search') || null;
    this.filterSelects = this.toolbar
      ? Array.from(this.toolbar.querySelectorAll('.mlf-filters-select'))
      : [];

    this.map = null;
    this.infoWindow = null;
    this.loader = null;
    this.cluster = null;
    this.markers = [];
    this.i18n = {};
    this.center = { lat: 0, lng: 0 };
    this.zoom = 8;

    this._readInitData();
    if (!this.mapEl || !this.listEl) {
      console.error('MLF: Missing map or list container');
      return;
    }
    this._init();
  }

  _readInitData() {
    try {
      const init = JSON.parse(this.root.dataset.blockInit || '{}');
      if (init.initialCenter) this.center = init.initialCenter;
      if (init.zoomLevel) this.zoom = init.zoomLevel;
      if (init.i18n) this.i18n = init.i18n;
    } catch (err) {
      console.warn('MLF: Invalid blockInit JSON', err);
    }
  }

  _init() {
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
      libraries: ['marker'],
      region: this.i18n.region || undefined,
      language: this.i18n.language || undefined,
    });

    this.loader
      .importLibrary('maps')
      .then(({ Map, InfoWindow }) => this._setupMap(Map, InfoWindow))
      .catch(err => this._showError(this.mapEl, this.i18n.errorLoadingMap, err));

    this._bindEvents();
    this._fetchData(true);
  }

    _setupMap(MapConstructor, InfoWindowConstructor) {
        this.mapEl.innerHTML = ''; 

        this.map = new MapConstructor(this.mapEl, {
        center: this.center,
        zoom: this.zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapId: 'PDS_CUSTOM_MAP_ID', 
        });
        this.infoWindow = new InfoWindowConstructor();
        this.cluster = new MarkerClusterer({ map: this.map });
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
    this.listEl.addEventListener('click', e => this._onListClick(e));
  }

  _onListClick(event) {
    const item = event.target.closest('.mlf-location-item');
    if (!item || !item.dataset.locationId) return;
    const id = parseInt(item.dataset.locationId, 10);
    const marker = this.markers.find(m => m.mlfId === id);
    if (marker && this.map) {
      this.map.panTo(marker.position);
      this.map.setZoom(15);
      google.maps.event.trigger(marker, 'click');
    }
  }

  _fetchData(initial = false) {
    this._showLoading();
    const filters = this._getFilters();
    const base = new URLSearchParams();
    base.set('nonce', window.mlf_ajax.nonce);
    base.set('search', filters.search);
    base.set('taxonomies', JSON.stringify(filters.taxonomies));

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
  }

  _getFilters() {
    const tax = {};
    this.filterSelects.forEach(sel => {
      if (sel.value && sel.value !== 'all') tax[sel.name] = sel.value;
    });
    return { taxonomies: tax, search: this.searchInput?.value.trim() || '' };
  }

  _handleList(response) {
    if (response.success && response.data.html) {
      this.listEl.innerHTML = response.data.html;
    } else {
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
    data.forEach(d => {
      const m = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: d.position,
        title: d.title,
        content: this._createMarkerContent(d),
      });
      m.mlfId = d.id;
      if (d.infoWindowContent) {
        m.addListener('click', () => {
          this.infoWindow.setContent(d.infoWindowContent);
          this.infoWindow.open(this.map, m);
        });
      }
      this.markers.push(m);
    });
    if (this.cluster) this.cluster.addMarkers(this.markers);
    this._fitBounds();
  }

  _createMarkerContent(d) {
    const el = document.createElement('div');
    el.className = 'mlf-marker';
    el.dataset.locationId = d.id;
    return el;
  }

  _clearMarkers() {
    if (this.cluster) this.cluster.clearMarkers();
    this.markers = [];
  }

  _fitBounds() {
    if (!this.markers.length) return;
    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(m => bounds.extend(m.position));
    this.map.fitBounds(bounds);
    if (this.markers.length === 1) this.map.setZoom(Math.min(this.map.getZoom(), 15));
  }

  _showLoading() {
    this.listEl.innerHTML = `<p class="mlf-loading">${this.i18n.loadingLocations}</p>`;
    this.root.classList.add('is-loading');
  }

  _hideLoading() {
    this.root.classList.remove('is-loading');
  }

  _showError(el, msg, err) {
    if (err) console.error(err);
    el.innerHTML = `<p class="mlf-error">${msg}</p>`;
  }
}

// Initialize when DOM ready
domReady(() => {
  document
    .querySelectorAll('.pds-map-block-wrapper')
    .forEach(wrapper => new MLFMapHandler(wrapper));
});
