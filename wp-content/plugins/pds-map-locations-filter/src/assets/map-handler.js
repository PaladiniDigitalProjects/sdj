import { Loader } from '@googlemaps/js-api-loader';

// Create the loader instance
const loader = new Loader( {
	apiKey: 'AIzaSyAAGE7jq1qHpsj-pdtA1pKGmnJVydYRvXE',
	version: 'weekly',
} );

loader
	.load()
	.then( () => {
		// Now the google.maps object is available
		document.addEventListener( 'DOMContentLoaded', () => {
			document
				.querySelectorAll( '.map-container' )
				.forEach( ( block ) => {
					// If you have additional data attributes, process them here
					const title = block.dataset.title;
					const taxonomies = JSON.parse( block.dataset.taxonomies );

					class MapHandler {
						constructor( container ) {
							this.map = this.initMap( container );
							this.filters = { taxonomies: {} };
							this.initEvents();
							this.loadMarkers();
						}

						initMap( container ) {
							if ( ! window.google ) {
								console.error(
									'Google Maps API no ha sido cargada aún.'
								);
								return null;
							}
							return new google.maps.Map(
								container.querySelector( '.map-container' ),
								{
									center: {
										lat: 40.1909526,
										lng: -5.9609863,
									},
									zoom: 6,
								}
							);
						}

						initEvents() {
							block
								.querySelectorAll( '.filter-select' )
								.forEach( ( select ) => {
									select.addEventListener(
										'change',
										( e ) => {
											this.filters.taxonomies[
												e.target.name
											] = e.target.value;
											this.loadMarkers();
										}
									);
								} );
						}

						async loadMarkers() {
							const response = await fetch( mlfAjax.ajax_url, {
								method: 'POST',
								headers: {
									'Content-Type':
										'application/x-www-form-urlencoded',
								},
								body: new URLSearchParams( {
									action: 'get_locations_markers',
									taxonomies: JSON.stringify(
										this.filters.taxonomies
									),
								} ),
							} );

							const markers = await response.json();
							this.updateMap( markers );
						}

						updateMap( markers ) {
							// Clear existing markers and add new ones
							// Add your marker handling logic here
						}
					}

					new MapHandler( block );
				} );
		} );
	} )
	.catch( ( e ) => {
		console.error( 'Error loading Google Maps API:', e );
	} );
