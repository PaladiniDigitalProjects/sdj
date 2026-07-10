/*
 * src/blocks/map-locations-filter/view.js
 * Bloque legacy "map-locations-filter": instancia el MLFMapHandler compartido
 * sobre cada wrapper, usando su propia toolbar de búsqueda/filtros y su columna
 * de lista (autoBindToolbar: true). La lógica del mapa vive en src/js/map-handler.js.
 */

import domReady from '@wordpress/dom-ready';
import { MLFMapHandler } from '../../js/map-handler';

domReady(() => {
  document.querySelectorAll('.pds-map-block-wrapper').forEach(wrapper => {
    const handler = new MLFMapHandler({ root: wrapper, autoBindToolbar: true });
    handler.init();
  });
});
