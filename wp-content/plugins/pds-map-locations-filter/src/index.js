/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies for block registration
 */
import metadataMap from './blocks/map-locations-filter/block.json';
import MapEdit from './blocks/map-locations-filter/index.js'; // Assuming this is where MapEdit lives

import metadataTienda from './blocks/tienda-lista/block.json';
import TiendaEdit from './blocks/tienda-lista/index.js'; // Assuming this is where TiendaEdit lives

// Import SCSS files that should apply in editor
import './scss/editor.scss'; // For editor-specific overrides/placeholders
import './scss/main.scss';   // For general block appearance in editor

/**
 * Register Blocks
 */
registerBlockType( metadataMap.name, {
	edit: MapEdit,
	save: () => null, // Dynamic block
} );

registerBlockType( metadataTienda.name, {
	edit: TiendaEdit,
	save: () => null, // Dynamic block
} );