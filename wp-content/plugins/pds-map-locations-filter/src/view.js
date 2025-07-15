/**
 * External dependencies
 */
import { Loader } from '@googlemaps/js-api-loader';
import domReady from '@wordpress/dom-ready';

// Simple debounce function
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Map and Filter Handler Class
 */
class MLFMapHandler {
	constructor(element) {
		this.container = element;
		this.mapElement = element.querySelector('.mlf-map');
		this.locationsListElement = element.querySelector('.mlf-locations');
		this.placeholderElement = element.querySelector('.mlf-locations-placeholder');
		this.filters = element.querySelector('.pds-map-filters');
		this.searchBox = element.querySelector('.mlf-search');
		this.map = null;
		this.markers = [];
		this.infoWindow = null;
		this.loader = null;
		this.mapOptions = {};
		this.initialFilters = {};

		if (!this.mapElement || !this.locationsListElement || !this.filters) {
			console.error('MLF Error: Missing required elements within:', element);
			return;
		}

		this.init();
	}

	init() {
		try {
			this.mapOptions = JSON.parse(this.container.dataset.mapOptions || '{}');
			this.initialFilters = JSON.parse(this.container.dataset.filterOptions || '{}');
		} catch (e) {
			console.error('MLF Error: Could not parse data attributes.', e);
		}

        // !! IMPORTANT: Get API Key securely. Using localized script data is recommended.
        // Replace 'YOUR_API_KEY_PLACEHOLDER' with the actual key or variable from wp_localize_script
        const apiKey = mlf_ajax?.google_maps_api_key || 'YOUR_API_KEY_PLACEHOLDER'; // Use localized data if available

        if (apiKey === 'YOUR_API_KEY_PLACEHOLDER') {
             console.warn('MLF Warning: Google Maps API Key not configured. Map may not load.');
             // Optionally display a user-facing message
             this.mapElement.innerHTML = '<p>Map cannot be loaded. API key missing.</p>';
             return; // Stop initialization if key is missing
         }

		this.loader = new Loader({
			apiKey: apiKey,
			version: 'weekly',
			libraries: ['marker'], // Add libraries as needed (places, geometry, etc.)
		});

		this.loadMap();
		this.setupEventListeners();
		this.fetchLocations(true); // Initial fetch
	}

	async loadMap() {
		try {
			const { Map, InfoWindow } = await this.loader.importLibrary('maps');
            const { AdvancedMarkerElement } = await this.loader.importLibrary("marker"); // For advanced markers

			this.map = new Map(this.mapElement, {
				center: this.mapOptions.center || { lat: 0, lng: 0 },
				zoom: this.mapOptions.zoom || 8,
				mapId: 'PDS_CUSTOM_MAP_ID', // Optional: Add a Map ID for cloud styling
                // Add other map options: mapTypeControl, streetViewControl, etc.
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,

			});

			this.infoWindow = new InfoWindow();

		} catch (e) {
			console.error('MLF Error: Could not load Google Maps API.', e);
            this.mapElement.innerHTML = `<p>${__( 'Error loading map.', 'pds-map-locations-filter' )}</p>`;
		}
	}

    clearMarkers() {
        this.markers.forEach(marker => {
            // For AdvancedMarkerElement, set map to null
             if (marker.setMap) marker.setMap(null);
             else marker.map = null; // Fallback or handle default markers differently if needed
        });
        this.markers = [];
    }

	addMarker(markerData) {
         if (!this.map || !google?.maps?.marker) return; // Ensure map and library are loaded

         const { AdvancedMarkerElement } = google.maps.marker; // Destructure here

         const marker = new AdvancedMarkerElement({
            map: this.map,
            position: markerData.position,
            title: markerData.title,
            // You can customize the marker appearance here
             // Example: content: document.createElement('div')...
          });

        // Add InfoWindow listener
        if (markerData.infoWindowContent && this.infoWindow) {
             marker.addListener('click', () => {
                this.infoWindow.close(); // Close existing window
                this.infoWindow.setContent(markerData.infoWindowContent);
                this.infoWindow.open(this.map, marker);

                 // Optional: Pan map to center the marker when info window opens
                 // this.map.panTo(markerData.position);
             });
        }

         this.markers.push(marker);
    }


	setupEventListeners() {
		 // Filter change handler
         this.filters.querySelectorAll('select.filters').forEach(select => {
            select.addEventListener('change', () => {
                console.log('Filter changed:', select.name, select.value); // <-- ADD THIS
                this.fetchLocations();
            });
        });
    
        // Search input handler (debounced)
        if (this.searchBox) {
            this.searchBox.addEventListener('input', debounce(() => {
                console.log('Search input:', this.searchBox.value); // <-- ADD THIS
                this.fetchLocations();
            }, 500));
        }

        // Clicking on a list item might highlight/open the map marker
        this.locationsListElement.addEventListener('click', (event) => {
            const locationDiv = event.target.closest('.mlf-location');
            if (locationDiv && locationDiv.dataset.locationId) {
                const locationId = parseInt(locationDiv.dataset.locationId, 10);
                const correspondingMarker = this.markers.find(m => m.content?.dataset?.locationId == locationId); // Find marker by ID (assuming content has ID)

                 if (correspondingMarker && this.map && this.infoWindow) {
                     this.map.panTo(correspondingMarker.position);
                     this.map.setZoom(15); // Zoom in on the marker
                     // Trigger the marker click to open info window
                     google.maps.event.trigger(correspondingMarker, 'click');
                 }
            }
         });
	}

    getCurrentFilters() {
        const taxonomyFilters = {};
        this.filters.querySelectorAll('select.filters').forEach(select => {
            if (select.value !== 'all') {
                taxonomyFilters[select.name] = select.value;
            }
        });

        const searchTerm = this.searchBox ? this.searchBox.value.trim() : '';

        return {
             taxonomies: taxonomyFilters,
             search: searchTerm,
         };
    }

	async fetchLocations(isInitialLoad = false) {
        if (this.placeholderElement) this.placeholderElement.style.display = 'block';
        if (this.locationsListElement) this.locationsListElement.innerHTML = ''; // Clear previous results

        const filters = this.getCurrentFilters();
         console.log('AJAX Request - Sending Filters:', filters);
        const formData = new FormData();
        formData.append('action', 'mlf_get_locations_html');
        formData.append('nonce', mlf_ajax.nonce);
        formData.append('search', filters.search);
        // Send taxonomies as a JSON string if your PHP expects it, or loop and append
        formData.append('taxonomies', JSON.stringify(filters.taxonomies));


        const markerFormData = new FormData();
        markerFormData.append('action', 'mlf_get_locations_markers');
        markerFormData.append('nonce', mlf_ajax.nonce);
        markerFormData.append('search', filters.search);
        markerFormData.append('taxonomies', JSON.stringify(filters.taxonomies));

        try {
            const [listResponse, markerResponse] = await Promise.all([
                fetch(mlf_ajax.ajax_url, { method: 'POST', body: formData }),
                fetch(mlf_ajax.ajax_url, { method: 'POST', body: markerFormData })
            ]);

            // --- Handle List Response ---
                if (!listResponse.ok) {
                    throw new Error(`HTTP error! status: ${listResponse.status}`);
                }
                // const listHtml = await listResponse.text(); // OLD
                const listJson = await listResponse.json(); // NEW: Expect JSON
                if (listJson.success && listJson.data.html) { // NEW: Check success and get HTML
                    if (this.locationsListElement) this.locationsListElement.innerHTML = listJson.data.html;
                } else {
                    throw new Error('Invalid HTML list response from server.');
                }

            // --- Handle Marker Response ---
             if (!markerResponse.ok) {
                 throw new Error(`HTTP error! status: ${markerResponse.status}`);
            }
             const markerData = await markerResponse.json();
             this.clearMarkers();

             if (markerData.success && Array.isArray(markerData.data)) {
                 markerData.data.forEach(markerInfo => this.addMarker(markerInfo));

                 // Optional: Adjust map bounds based on new markers
                 if (markerData.data.length > 0 && this.map) {
                     const bounds = new google.maps.LatLngBounds();
                     markerData.data.forEach(m => bounds.extend(m.position));
                     this.map.fitBounds(bounds);
                      // Don't zoom in too far if there's only one result
                      if (markerData.data.length === 1) {
                         this.map.setZoom(Math.min(this.map.getZoom(), 15)); // Max zoom level 15 for single result
                      }
                 } else if (!isInitialLoad && this.map) {
                     // No results, maybe reset to initial view?
                     this.map.setCenter(this.mapOptions.center || { lat: 0, lng: 0 });
                     this.map.setZoom(this.mapOptions.zoom || 8);
                 }
             } else {
                 console.error('MLF Error: Invalid marker data received.', markerData);
             }


		} catch (error) {
			console.error('MLF Error fetching locations:', error);
            if (this.locationsListElement) {
                this.locationsListElement.innerHTML = `<p>${__('Error loading locations. Please try again.', 'pds-map-locations-filter')}</p>`;
            }
		} finally {
            if (this.placeholderElement) this.placeholderElement.style.display = 'none';
		}
	}
}

// Initialize map handlers when the DOM is ready
domReady(() => {
	const mapContainers = document.querySelectorAll('.pds-map-block');
	mapContainers.forEach(container => {
		new MLFMapHandler(container);
	});
});