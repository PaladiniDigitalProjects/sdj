import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Loader } from '@googlemaps/js-api-loader';
import PropTypes from 'prop-types';
// ---------------------
// Block Registration
// ---------------------
EditComponent.propTypes = {
	attributes: PropTypes.shape({
	  title: PropTypes.string,
	  selectedTaxonomies: PropTypes.arrayOf(PropTypes.string)
	}),
	setAttributes: PropTypes.func.isRequired
  };
const EditComponent = ( { attributes, setAttributes } ) => {
	const { taxonomies } = useSelect(
		( select ) => ( {
			taxonomies: select( 'core' ).getTaxonomies( {
				post_type: 'tienda',
			} ),
		} ),
		[]
	);

	return (
		<div
			{ ...useBlockProps( { className: 'map-container' } ) }
			data-title={ attributes.title }
			data-taxonomies={ JSON.stringify( attributes.selectedTaxonomies ) }
		>
			<InspectorControls>
				<PanelBody title="Settings">
					<TextControl
						label="Block Title"
						value={ attributes.title }
						onChange={ ( title ) => setAttributes( { title } ) }
					/>
					<SelectControl
						label="Filter Taxonomies"
						multiple
						value={ attributes.selectedTaxonomies }
						options={ (taxonomies || []).map((t) => ({ 
							label: t.name || t.slug,
							value: t.slug 
						})) }
						onChange={(selected) => setAttributes({ 
							selectedTaxonomies: Array.isArray(selected) ? selected : [selected] 
						})}
						/>
				</PanelBody>
			</InspectorControls>
			<div className="pds-map-editor">
				<div className="map-container" style={ { height: 400 } }></div>
				<div className="locations-list"></div>
			</div>
		</div>
	);
};


registerBlockType( 'pds/map-locations-filter', {
	title: 'Map Locations Filter',
	icon: 'location-alt',
	category: 'widgets',
	attributes: {
		title: { type: 'string', default: 'Our Locations' },
		selectedTaxonomies: { 
		  type: 'array', 
		  default: [],
		  items: { type: 'string' }  // Add validation
		},
	  },
	edit: EditComponent,
	save: () => null,
} );

// ---------------------
// Google Maps Integration apiKey: 'AIzaSyAAGE7jq1qHpsj-pdtA1pKGmnJVydYRvXE',
// ---------------------

const initializeMaps = () => {
	if (!document.querySelector('.map-container')) return;
  
	const loader = new Loader({
	  apiKey: 'YOUR_API_KEY',
	  version: 'weekly',
	  libraries: ['places'],
	  region: 'ES',
	  language: 'es'
	});
	
	// Add retry logic
	const loadWithRetry = (retries = 3) => {
	  loader.load()
		.then(/* ... */)
		.catch(error => {
		  if (retries > 0) {
			setTimeout(() => loadWithRetry(retries - 1), 2000);
		  }
		});
	};
	
	loadWithRetry();
  };

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initializeMaps );
} else {
	initializeMaps();
}

class MapHandler {
	constructor(container) {
	  // Add bounds padding
	  this.boundsPadding = 50;
	  
	  // Add marker clustering
	  this.markerCluster = new MarkerClusterer({
		map: this.map,
		renderer: {
		  render: ({ count, position }) => new google.maps.Marker({
			position,
			label: { text: String(count), color: "white" },
			icon: this.getClusterIcon(count)
		  })
		}
	  });
	}
  
	getClusterIcon(count) {
	  return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: "#1976d2",
		fillOpacity: 0.8,
		strokeWeight: 2,
		strokeColor: "#ffffff",
		scale: Math.min(10, 5 + Math.sqrt(count))
	  };
	}
  
	updateMap(markers) {
	  // Clear existing markers properly
	  this.markerCluster.clearMarkers();
	  
	  // Create new markers
	  const newMarkers = markers.map(/* ... */);
	  
	  // Add to cluster
	  this.markerCluster.addMarkers(newMarkers);
	  
	  // Adjust view with padding
	  if (this.bounds.isEmpty()) return;
	  this.map.fitBounds(this.bounds, {
		top: this.boundsPadding,
		right: this.boundsPadding,
		bottom: this.boundsPadding,
		left: this.boundsPadding
	  });
	}
  }
