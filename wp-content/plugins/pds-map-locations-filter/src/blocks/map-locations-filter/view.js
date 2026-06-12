/*
 * src/blocks/map-locations-filter/view.js
 * Map Handler with InfoWindow for marker cards
 */

import { Loader } from '@googlemaps/js-api-loader';
import domReady from '@wordpress/dom-ready';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

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
    this.markerData = new Map();
    this.markerCallbacks = new Map();
    this.i18n = {};
    this.center = { lat: 0, lng: 0 };
    this.zoom = 8;
    this.showList = true;

    this._readInitData();
  
    if (!this.mapEl) {
      console.error('MLF: Missing map container');
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
      if (typeof init.showList !== 'undefined') this.showList = init.showList;
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
          this._bindEvents();
          this._fetchData();
        });
      })
      .catch(err => this._showError(this.mapEl, this.i18n.errorLoadingMap, err));
  }

  _setupMap(MapConstructor) {
    console.log('Google Maps API loaded, initializing map...');
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

    this.cluster = new MarkerClusterer({ map: this.map });

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

  _fetchData() {
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
    console.log('MLF: Rendering markers', data.length);
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
    this.markers = [];
    this.markerCallbacks.clear();
    this.infoWindow.close();
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
      this.listEl.innerHTML = `<p class="mlf-loading">${this.i18n.loadingLocations}</p>`;
    }
    this.root.classList.add('is-loading');
  }

  _hideLoading() {
    this.root.classList.remove('is-loading');
  }

  _showError(el, msg) {
    if (el) el.innerHTML = `<p class="mlf-error">${msg}</p>`;
  }
}

domReady(() => {
  document
    .querySelectorAll('.pds-map-block-wrapper')
    .forEach(wrapper => new MLFMapHandler(wrapper));
});
