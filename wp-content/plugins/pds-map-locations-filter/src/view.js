/**
 * src/blocks/map-locations-filter/view.js
 * Updated to respect `showList` block attribute and to work when the list container is absent.
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
    this.showList = true; // default; will be overridden by init data

    this._readInitData();

    if (!this.mapEl) {
      console.error('MLF: Missing map container');
      return;
    }

    // If init says showList but the DOM has no list container, turn it off to avoid errors.
    if (this.showList && !this.listEl) {
      console.warn('MLF: showList enabled but .mlf-locations-list-container not found. Disabling list features for this instance.');
      this.showList = false;
    }

    this._init();
  }

  _readInitData() {
    try {
      const init = JSON.parse(this.root.dataset.blockInit || '{}');
      if (init.initialCenter) this.center = init.initialCenter;
      if (init.zoomLevel) this.zoom = init.zoomLevel;
      if (init.i18n) this.i18n = init.i18n;
      if (typeof init.showList !== 'undefined') this.showList = !!init.showList;
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

    // import maps library (Map, InfoWindow constructors)
    this.loader
      .importLibrary('maps')
      .then(({ Map, InfoWindow }) => this._setupMap(Map, InfoWindow))
      .catch(err => this._showError(this.mapEl, this.i18n.errorLoadingMap || 'Error loading map.', err));

    this._bindEvents();
    // initial fetch: markers (and list if showList)
    this._fetchData(true);
  }

  _setupMap(MapConstructor, InfoWindowConstructor) {
    // ensure map container is empty
    this.mapEl.innerHTML = '';

    this.map = new MapConstructor(this.mapEl, {
      center: this.center,
      zoom: this.zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      // keep your custom mapId if you use it
      mapId: '9648649d5b5a13afc237a196',
    });

    this.infoWindow = new InfoWindowConstructor();
    // initialize clusterer (markers will be added after creation)
    try {
      this.cluster = new MarkerClusterer({ map: this.map });
    } catch (err) {
      // Fallback: some versions of MarkerClusterer expect different args; still safe to continue without cluster.
      console.warn('MLF: MarkerClusterer init error, continuing without cluster', err);
      this.cluster = null;
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

    // Attach list click handler only if list is present and enabled
    if (this.showList && this.listEl) {
      this.listEl.addEventListener('click', e => this._onListClick(e));
    }
  }

  _onListClick(event) {
    const item = event.target.closest('.mlf-location-item');
    if (!item || !item.dataset.locationId) return;
    const id = parseInt(item.dataset.locationId, 10);
    const marker = this.markers.find(m => m.mlfId === id);
    if (marker && this.map) {
      // pan to marker and open info window
      this.map.panTo(marker.position);
      this.map.setZoom(15);
      // trigger click on the marker to open infoWindow if bound
      if (typeof google?.maps?.event?.trigger === 'function') {
        google.maps.event.trigger(marker, 'click');
      }
    }
  }

  _fetchData(initial = false) {
    this._showLoading();

    const filters = this._getFilters();
    const base = new URLSearchParams();
    // Use localized values from PHP
    base.set('nonce', window.mlf_ajax.nonce);
    base.set('search', filters.search);
    base.set('taxonomies', JSON.stringify(filters.taxonomies));

    // Marker request (always)
    const markerReq = fetch(window.mlf_ajax.ajax_url, {
      method: 'POST',
      body: (() => { const p = new URLSearchParams(base); p.set('action', 'mlf_get_locations_markers'); return p; })(),
    }).then(r => r.json());

    // List request (only if list is enabled)
    let listReq = Promise.resolve(null);
    if (this.showList) {
      listReq = fetch(window.mlf_ajax.ajax_url, {
        method: 'POST',
        body: (() => { const p = new URLSearchParams(base); p.set('action', 'mlf_get_locations_html'); return p; })(),
      }).then(r => r.json());
    }

    Promise.all([listReq, markerReq])
      .then(([list, markers]) => {
        if (this.showList) {
          this._handleList(list);
        }
        this._handleMarkers(markers);
      })
      .catch(err => {
        console.error('MLF: Fetch error', err);
        if (this.showList && this.listEl) {
          this._showError(this.listEl, this.i18n.errorLoadingLocations || 'Error loading locations.');
        }
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
    if (!this.showList || !this.listEl) return;

    if (response && response.success && response.data && response.data.html) {
      this.listEl.innerHTML = response.data.html;
    } else {
      this._showError(this.listEl, this.i18n.noResults || 'No locations found.');
    }
  }

  _handleMarkers(response) {
    if (response && response.success && Array.isArray(response.data)) {
      this._renderMarkers(response.data);
    } else {
      console.error('MLF: Invalid marker data', response);
      this._clearMarkers();
    }
  }

  _renderMarkers(data) {
    this._clearMarkers();

    data.forEach(d => {
      // AdvancedMarkerElement provides custom content. Use fallback to classic Marker if needed.
      try {
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
            // Opening InfoWindow anchored to marker — AdvancedMarkerElement works as anchor in many setups.
            this.infoWindow.open(this.map, m);
          });
        }

        this.markers.push(m);
      } catch (err) {
        // AdvancedMarkerElement might not be available in older builds — fallback to classic Marker
        console.warn('MLF: AdvancedMarkerElement not available, falling back to classic Marker', err);
        const marker = new google.maps.Marker({
          map: this.map,
          position: d.position,
          title: d.title,
        });
        marker.mlfId = d.id;
        if (d.infoWindowContent) {
          marker.addListener('click', () => {
            this.infoWindow.setContent(d.infoWindowContent);
            this.infoWindow.open(this.map, marker);
          });
        }
        this.markers.push(marker);
      }
    });

    if (this.cluster && typeof this.cluster.addMarkers === 'function') {
      try {
        this.cluster.addMarkers(this.markers);
      } catch (err) {
        console.warn('MLF: cluster.addMarkers failed', err);
      }
    }

    this._fitBounds();
  }

  _createMarkerContent(d) {
    const el = document.createElement('div');
    el.className = 'mlf-marker';
    el.dataset.locationId = d.id;
    // Optionally you can include simple visuals (small dot) but avoid changing structure.
    return el;
  }

  _clearMarkers() {
    // Clear cluster and markers
    if (this.cluster && typeof this.cluster.clearMarkers === 'function') {
      try {
        this.cluster.clearMarkers();
      } catch (err) {
        console.warn('MLF: cluster.clearMarkers failed', err);
      }
    }

    // Remove markers from map if classic markers used
    if (this.markers && this.markers.length) {
      this.markers.forEach(m => {
        try {
          if (typeof m.setMap === 'function') {
            m.setMap(null);
          }
        } catch (err) {
          // ignore
        }
      });
    }

    this.markers = [];
  }

  _fitBounds() {
    if (!this.markers.length || !this.map) return;

    const bounds = new google.maps.LatLngBounds();
    this.markers.forEach(m => {
      // m.position may be LatLngLiteral or LatLng; both should work with extend
      try {
        bounds.extend(m.position);
      } catch (err) {
        // fallback if AdvancedMarkerElement stores position differently
        try {
          const pos = m.getPosition ? m.getPosition() : null;
          if (pos) bounds.extend(pos);
        } catch (innerErr) {
          // ignore
        }
      }
    });

    try {
      this.map.fitBounds(bounds);
      if (this.markers.length === 1) {
        this.map.setZoom(Math.min(this.map.getZoom(), 15));
      }
    } catch (err) {
      // ignore fitErrors
      console.warn('MLF: fitBounds failed', err);
    }
  }

  _showLoading() {
    if (this.showList && this.listEl) {
      const loadingText = this.i18n.loadingLocations || 'Loading locations...';
      this.listEl.innerHTML = `<p class="mlf-loading">${loadingText}</p>`;
    }
    this.root.classList.add('is-loading');
  }

  _hideLoading() {
    this.root.classList.remove('is-loading');
  }

  _showError(el, msg, err) {
    if (err) console.error(err);
    if (!el) return;
    el.innerHTML = `<p class="mlf-error">${msg}</p>`;
  }
}

// Initialize when DOM ready
domReady(() => {
  document
    .querySelectorAll('.pds-map-block-wrapper')
    .forEach(wrapper => new MLFMapHandler(wrapper));
});
