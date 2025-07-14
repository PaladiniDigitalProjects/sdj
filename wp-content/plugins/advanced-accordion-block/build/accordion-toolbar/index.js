/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/img/pro-patterns sync \\.(png%7Cjpg%7Cjpeg%7Cgif%7Csvg)$":
/*!**************************************************************************************!*\
  !*** ./assets/img/pro-patterns/ sync nonrecursive \.(png%7Cjpg%7Cjpeg%7Cgif%7Csvg)$ ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./Accordion-Search.png": "./assets/img/pro-patterns/Accordion-Search.png",
	"./Anchor-link-with-feature-icon.png": "./assets/img/pro-patterns/Anchor-link-with-feature-icon.png",
	"./Featured-icon-with-Showclose-all.png": "./assets/img/pro-patterns/Featured-icon-with-Showclose-all.png",
	"./Modern-QA.png": "./assets/img/pro-patterns/Modern-QA.png",
	"./Steps-With-Subheading.png": "./assets/img/pro-patterns/Steps-With-Subheading.png"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./assets/img/pro-patterns sync \\.(png%7Cjpg%7Cjpeg%7Cgif%7Csvg)$";

/***/ }),

/***/ "./src/accordion-toolbar/insert-hook.js":
/*!**********************************************!*\
  !*** ./src/accordion-toolbar/insert-hook.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useInsertionPoint)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */







/**
 * @typedef WPInserterConfig
 * @property {string=}   rootClientId   If set, insertion will be into the block with this ID.
 * @property {number=}   insertionIndex If set, insertion will be into this explicit position.
 * @property {string=}   clientId       If set, insertion will be after the block with this ID.
 * @property {boolean=}  isAppender     Whether the inserter is an appender or not.
 * @property {Function=} onSelect       Called after insertion.
 */

/**
 * Returns the insertion point state given the inserter config.
 *
 * @param {WPInserterConfig} config Inserter Config.
 * @return {Array} Insertion Point State (rootClientID, onInsertBlocks and onToggle).
 */
function useInsertionPoint({
  rootClientId = '',
  insertionIndex,
  clientId,
  isAppender,
  onSelect,
  shouldFocusBlock = true
}) {
  const {
    getSelectedBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    destinationRootClientId,
    destinationIndex
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const {
      getSelectedBlockClientId,
      getBlockRootClientId,
      getBlockIndex,
      getBlockOrder
    } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store);
    const selectedBlockClientId = getSelectedBlockClientId();
    let _destinationRootClientId = rootClientId;
    let _destinationIndex;
    if (insertionIndex !== undefined) {
      // Insert into a specific index.
      _destinationIndex = insertionIndex;
    } else if (clientId) {
      // Insert after a specific client ID.
      _destinationIndex = getBlockIndex(clientId, _destinationRootClientId);
    } else if (!isAppender && selectedBlockClientId) {
      _destinationRootClientId = getBlockRootClientId(selectedBlockClientId);
      _destinationIndex = getBlockIndex(selectedBlockClientId, _destinationRootClientId) + 1;
    } else {
      // Insert at the end of the list.
      _destinationIndex = getBlockOrder(_destinationRootClientId).length;
    }
    return {
      destinationRootClientId: _destinationRootClientId,
      destinationIndex: _destinationIndex
    };
  }, [rootClientId, insertionIndex, clientId, isAppender]);
  const {
    replaceBlocks,
    insertBlocks,
    showInsertionPoint,
    hideInsertionPoint
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.store);
  const onInsertBlocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useCallback)((blocks, meta, shouldForceFocusBlock = false) => {
    const selectedBlock = getSelectedBlock();
    if (!isAppender && selectedBlock && (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.isUnmodifiedDefaultBlock)(selectedBlock)) {
      replaceBlocks(selectedBlock.clientId, blocks, null, shouldFocusBlock || shouldForceFocusBlock ? 0 : null, meta);
    } else {
      insertBlocks(blocks, destinationIndex, destinationRootClientId, true, shouldFocusBlock || shouldForceFocusBlock ? 0 : null, meta);
    }
    const message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
    // translators: %d: the name of the block that has been added
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__._n)('%d block added.', '%d blocks added.', (0,lodash__WEBPACK_IMPORTED_MODULE_0__.castArray)(blocks).length), (0,lodash__WEBPACK_IMPORTED_MODULE_0__.castArray)(blocks).length);
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_4__.speak)(message);
    if (onSelect) {
      onSelect();
    }
  }, [isAppender, getSelectedBlock, replaceBlocks, insertBlocks, destinationRootClientId, destinationIndex, onSelect, shouldFocusBlock]);
  const onToggleInsertionPoint = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useCallback)(show => {
    if (show) {
      showInsertionPoint(destinationRootClientId, destinationIndex);
    } else {
      hideInsertionPoint();
    }
  }, [showInsertionPoint, hideInsertionPoint, destinationRootClientId, destinationIndex]);
  return [destinationRootClientId, onInsertBlocks, onToggleInsertionPoint];
}

/***/ }),

/***/ "./src/accordion-toolbar/pattern-hook.js":
/*!***********************************************!*\
  !*** ./src/accordion-toolbar/pattern-hook.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



const usePatternsState = rootClientId => {
  const patterns = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    try {
      const {
        __experimentalGetAllowedPatterns,
        getSettings
      } = select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.store);

      // Safely handle potential undefined or null return
      const allPatterns = __experimentalGetAllowedPatterns?.(rootClientId) || [];

      // Use memoization to prevent unnecessary re-renders
      return allPatterns.filter(pattern => pattern.categories?.includes("advanced-accordion-block-category"));
    } catch (error) {
      console.error('Error fetching patterns:', error);
      return [];
    }
  }, [rootClientId]);

  // Use useMemo to further optimize rendering
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => [patterns], [patterns]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePatternsState);

/***/ }),

/***/ "./src/components/icons/accordion-pattern.js":
/*!***************************************************!*\
  !*** ./src/components/icons/accordion-pattern.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionPatternIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function AccordionPatternIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 95 94",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M47.5 9.7948C11.2046 9.7948 9.89899 11.0866 9.89899 47C9.89899 82.9134 11.2046 84.2052 47.5 84.2052C83.7954 84.2052 85.101 82.9134 85.101 47C85.101 11.0866 83.7954 9.7948 47.5 9.7948Z",
    fill: "#5FE4D4"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 58.717H22.4824C21.9663 58.717 21.5474 59.1218 21.5474 59.6205V66.849C21.5474 67.3478 21.9663 67.7526 22.4824 67.7526H72.7404C73.2566 67.7526 73.6755 67.3478 73.6755 66.849V59.6205C73.6755 59.1209 73.2575 58.717 72.7404 58.717Z",
    fill: "white",
    "fill-opacity": "0.7"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 58.4448H22.4826C21.8121 58.4448 21.267 58.9716 21.267 59.6194V66.8479C21.267 67.4958 21.8121 68.0226 22.4826 68.0226H72.7406C73.411 68.0226 73.9562 67.4958 73.9562 66.8479V59.6194C73.9562 58.9716 73.411 58.4448 72.7406 58.4448ZM22.4826 67.4804C22.1216 67.4804 21.828 67.1967 21.828 66.8479V59.6194C21.828 59.2706 22.1216 58.9869 22.4826 58.9869H72.7406C73.1015 58.9869 73.3951 59.2706 73.3951 59.6194V66.8479C73.3951 67.1967 73.1015 67.4804 72.7406 67.4804H22.4826Z",
    fill: "black",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 26.2486H22.4824C21.9663 26.2486 21.5474 26.6534 21.5474 27.1522V34.3806C21.5474 34.8794 21.9663 35.2842 22.4824 35.2842H72.7404C73.2566 35.2842 73.6755 34.8794 73.6755 34.3806V27.1522C73.6755 26.6534 73.2575 26.2486 72.7404 26.2486Z",
    fill: "white",
    "fill-opacity": "0.7"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 25.9764H22.4826C21.8121 25.9764 21.267 26.5032 21.267 27.151V34.3795C21.267 35.0274 21.8121 35.5542 22.4826 35.5542H72.7406C73.411 35.5542 73.9562 35.0274 73.9562 34.3795V27.151C73.9562 26.5032 73.411 25.9764 72.7406 25.9764ZM22.4826 35.012C22.1216 35.012 21.828 34.7283 21.828 34.3795V27.151C21.828 26.8023 22.1216 26.5185 22.4826 26.5185H72.7406C73.1015 26.5185 73.3951 26.8023 73.3951 27.151V34.3795C73.3951 34.7283 73.1015 35.012 72.7406 35.012H22.4826Z",
    fill: "black",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 37.8806H22.4824C21.9663 37.8806 21.5474 38.2854 21.5474 38.7841V55.2181C21.5474 55.7169 21.9663 56.1217 22.4824 56.1217H72.7404C73.2566 56.1217 73.6755 55.7169 73.6755 55.2181V38.7841C73.6755 38.2854 73.2575 37.8806 72.7404 37.8806Z",
    fill: "white",
    "fill-opacity": "0.7"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 37.6083H22.4826C21.8121 37.6083 21.267 38.1352 21.267 38.783V55.217C21.267 55.8649 21.8121 56.3916 22.4826 56.3916H72.7406C73.411 56.3916 73.9562 55.8649 73.9562 55.217V38.783C73.9562 38.1352 73.411 37.6083 72.7406 37.6083ZM22.4826 55.8494C22.1216 55.8494 21.828 55.5658 21.828 55.217V38.783C21.828 38.4342 22.1216 38.1505 22.4826 38.1505H72.7406C73.1015 38.1505 73.3951 38.4342 73.3951 38.783V55.217C73.3951 55.5658 73.1015 55.8494 72.7406 55.8494H22.4826ZM26.5609 64.0667H23.5574V63.5246H26.5609V64.0667Z",
    fill: "black",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M26.2971 41.0598H23.2936V40.5176H26.2971V41.0598ZM25.3383 65.2435H24.7773V62.3413H25.3383V65.2435ZM26.5613 31.0329H23.5578V30.4908H26.5613V31.0329Z",
    fill: "black",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M25.3402 32.214H24.7791V29.3118H25.3402V32.214Z",
    fill: "black",
    "fill-opacity": "0.5"
  }));
}

/***/ }),

/***/ "./src/accordion-toolbar/editor.scss":
/*!*******************************************!*\
  !*** ./src/accordion-toolbar/editor.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/img/pro-patterns/Accordion-Search.png":
/*!******************************************************!*\
  !*** ./assets/img/pro-patterns/Accordion-Search.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/Accordion-Search.125b3cc3.png";

/***/ }),

/***/ "./assets/img/pro-patterns/Anchor-link-with-feature-icon.png":
/*!*******************************************************************!*\
  !*** ./assets/img/pro-patterns/Anchor-link-with-feature-icon.png ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/Anchor-link-with-feature-icon.e1451f8c.png";

/***/ }),

/***/ "./assets/img/pro-patterns/Featured-icon-with-Showclose-all.png":
/*!**********************************************************************!*\
  !*** ./assets/img/pro-patterns/Featured-icon-with-Showclose-all.png ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/Featured-icon-with-Showclose-all.fbb96663.png";

/***/ }),

/***/ "./assets/img/pro-patterns/Modern-QA.png":
/*!***********************************************!*\
  !*** ./assets/img/pro-patterns/Modern-QA.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/Modern-QA.1ce8ea07.png";

/***/ }),

/***/ "./assets/img/pro-patterns/Steps-With-Subheading.png":
/*!***********************************************************!*\
  !*** ./assets/img/pro-patterns/Steps-With-Subheading.png ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/Steps-With-Subheading.8052f372.png";

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/a11y":
/*!******************************!*\
  !*** external ["wp","a11y"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["a11y"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./src/accordion-toolbar/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _pattern_hook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pattern-hook */ "./src/accordion-toolbar/pattern-hook.js");
/* harmony import */ var _insert_hook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./insert-hook */ "./src/accordion-toolbar/insert-hook.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor.scss */ "./src/accordion-toolbar/editor.scss");
/* harmony import */ var _components_icons_accordion_pattern__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/icons/accordion-pattern */ "./src/components/icons/accordion-pattern.js");

/**
 * External dependencies.
 */

/**
 * WordPress dependencies.
 */








// include editor styles



/**
 * Render the header toolbar button and the accompanying pattern explorer modal.
 *
 * @since 0.1.0
 * @return {string} Return the rendered JSX for the Pattern Explorer Button
 */
function HeaderToolbarButton() {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [allPatterns] = (0,_pattern_hook__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const aab_premium = aagb_local_object.licensing;
  const {
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/notices');
  const [destinationRootClientId, onInsertBlocks] = (0,_insert_hook__WEBPACK_IMPORTED_MODULE_7__["default"])({
    // eslint-disable-line
    shouldFocusBlock: true
  });
  const handleAddPattern = pattern => {
    function cloneBlockWithNestedInnerBlocks(blockDef) {
      const innerBlocks = blockDef.innerBlocks ? blockDef.innerBlocks.map(cloneBlockWithNestedInnerBlocks) : [];
      return wp.blocks.cloneBlock(blockDef, {}, innerBlocks);
    }
    const blocksToInsert = pattern.blocks.map(cloneBlockWithNestedInnerBlocks);
    onInsertBlocks(blocksToInsert);
    setIsModalOpen(false);
    createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
    // Translators: Name of the pattern being inserted.
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Block pattern "%s" inserted.', 'advanced-accordion-block'), pattern.title), {
      type: 'snackbar'
    });
  };

  // Dynamically require all images from the `pro-patterns` folder
  const proPatternsContext = __webpack_require__("./assets/img/pro-patterns sync \\.(png%7Cjpg%7Cjpeg%7Cgif%7Csvg)$");
  const proPatterns = proPatternsContext.keys().map(fileName => ({
    name: fileName.replace('./', ''),
    // Extract the file name without './'
    src: proPatternsContext(fileName) // Get the image URL
  }));
  const sanitizeFileName = fileName => {
    return fileName.replace(/\.(png|jpg|jpeg|svg)$/i, '') // Remove the file extension (case-insensitive)
    .replace(/-/g, ' '); // Replace dashes with spaces
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    className: "has-icon",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Explore Advanced Accordion Block Patterns', 'advanced-accordion-block'),
    onClick: () => setIsModalOpen(true)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_accordion_pattern__WEBPACK_IMPORTED_MODULE_9__["default"], null)), isModalOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Advanced Accordion Block Patterns', 'advanced-accordion-block'),
    closeLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'advanced-accordion-block'),
    onRequestClose: () => setIsModalOpen(false),
    className: "accordion_block_pattern__modal",
    isFullScreen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion__pattern_list_wrapper"
  }, allPatterns.map(pattern => {
    const isPremium = !aab_premium && pattern.categories.includes('premium-advanced-accordion-block');
    if (isPremium) {
      return;
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion__pattern_list_item",
      key: pattern.name
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tooltip-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "accordion__item_preview",
      onClick: () => handleAddPattern(pattern)
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.BlockPreview, {
      blocks: pattern.blocks
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion_list_item_footer"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, pattern.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "primary",
      onClick: () => handleAddPattern(pattern)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Pattern', 'advanced-accordion-block'))));
  }), !aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, proPatterns.map((pattern, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion__pattern_list_item",
    key: index
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tooltip-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion__item_preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: pattern.src,
    alt: pattern.name,
    className: "pro-pattern-image"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "accordion_list_item_footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, sanitizeFileName(pattern.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pro-badge"
  }, " Pro"))))))));
}

/**
 * Add the header toolbar button to the block editor.
 */
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.subscribe)(() => {
  const inserter = document.querySelector('#accordion_block_patterns_inserter');

  // If the inserter already exists, bail.
  if (inserter) {
    return;
  }
  wp.domReady(() => {
    var toolbar = document.querySelector('.edit-post-header-toolbar__left');

    // If no toolbar can be found at all, bail.
    if (!toolbar) {
      toolbar = document.querySelector('.editor-document-tools__left');
    }

    // If no toolbar can be found at all, bail.
    if (!toolbar) {
      return;
    }
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'accordion_block_patterns_inserter';
    toolbar.appendChild(buttonContainer);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(HeaderToolbarButton, null), document.getElementById('accordion_block_patterns_inserter'));
  });
});

/**
 * Add our custom entities for retrieving external data in the Block Editor.
 *
 * @since 0.2.0
 */
})();

/******/ })()
;
//# sourceMappingURL=index.js.map