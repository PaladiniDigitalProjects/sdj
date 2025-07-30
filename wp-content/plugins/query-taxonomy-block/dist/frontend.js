/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/frontend/src/query-by-taxonomy.js":
/*!****************************************************!*\
  !*** ./packages/frontend/src/query-by-taxonomy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./packages/frontend/src/utils.js");

const $ = jQuery;
class GutenberghubQueryByTaxonomy {
  /**
   * Constructor.
   *
   * @param {HTMLDivElement} queryContainer - Query loop container.
   * @param {HTMLDivElement} container - Block container.
   * @param {number} queryContainerIndex - Query Container Index.
   */
  constructor(queryContainer, container, queryContainerIndex) {
    this.queryContainer = queryContainer;
    this.container = container;
    this.queryContainerIndex = queryContainerIndex;
    this.postTemplate = $(this.queryContainer).find('.wp-block-post-template');
    this.loadMoreButton = $(this.queryContainer).find('.ghub-query-load-more');
    this.resultCount = $(this.queryContainer).find('.gutenberghub-query-result-count');
    /**
     * Query Identity.
     *
     * @type {number}
     */
    this.queryId = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.ctbParseQueryId)(this.queryContainer);

    /**
     * All relevant query elements from different layouts.
     *
     * @type {{
     *  selectbox?: HTMLSelectElement | null | undefined;
     *  checkboxesContainer: HTMLDivElement | null | undefined;
     * }}
     */
    this.queryElements = {
      /**
       * Radio Container.
       */
      radiosContainer: this?.container?.querySelector(':scope > .gutenberghub-query-taxonomy-radio'),
      /**
       * Selectbox Container.
       */
      selectbox: this?.container?.querySelector(':scope select'),
      /**
       * Selectbox Container.
       */
      checkboxesContainer: this?.container?.querySelector(':scope > .gutenberghub-query-taxonomy-checkbox'),
      /**
       * Menu Container
       */
      menusContainer: this?.container?.querySelector(':scope > .gutenberghub-query-taxonomy-menu')
    };
    if (this.queryElements.selectbox) {
      this.initializeSelectbox();
    }
    if (this.queryElements.checkboxesContainer) {
      this.initializeCheckbox();
    }
    if (this.queryElements.radiosContainer) {
      this.initializeRadio();
    }
    if (this.queryElements.menusContainer) {
      this.initializeMenu();
    }
  }
  /**
   * Handles the load more visibility.
   *
   * @param {HTMLElement} newPostWrapper Next page query loop instance
   */
  handleLoadMoreButton(newPostWrapper) {
    if (this.loadMoreButton.get(0) === undefined) {
      return null;
    }
    const newLoadMoreButton = $(newPostWrapper).find('.ghub-query-load-more');
    const newLoadMoreTotalPages = newLoadMoreButton.data('totalpages');
    this.loadMoreButton.attr('data-totalpages', newLoadMoreTotalPages);
    newLoadMoreTotalPages === 1 || newLoadMoreTotalPages === 0 ? this.loadMoreButton.css('display', 'none') : this.loadMoreButton.css('display', 'flex');
  }
  /**
   * Handles the result count.
   *
   * @param {HTMLElement} newPostWrapper Next page query loop instance
   */
  handleResultCount(newPostWrapper) {
    if (this.resultCount.get(0) === undefined) {
      return null;
    }
    const newResultCount = $(newPostWrapper).find('.gutenberghub-query-result-count');
    this.resultCount.replaceWith(newResultCount);
    this.resultCount = newResultCount;
  }
  /**
   * Loads the taxonomy query.
   *
   * @param {{
   *  taxonomy: string;
   *  term: string;
   * }} query
   * @param {string[]|false} include Include just the given terms.
   *
   * @return {void}
   */
  loadQuery(query) {
    let include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const url = new URL(location.href);
    let hasTerms = url.searchParams.has(query.taxonomy) && url.searchParams.get(query.taxonomy) !== '';
    let terms = hasTerms ? url.searchParams.get(query.taxonomy)?.split(',') : [];
    if (Array.isArray(include)) {
      terms = [...terms, query.term];
      terms = terms.filter(term => include.includes(term));
      terms = [...new Set(terms)];
      url.searchParams.set(query.taxonomy, terms.join(','));
    } else {
      url.searchParams.set(query.taxonomy, query.term);
    }
    url.searchParams.set('qid', this.queryId.toString());
    const self = this;
    $.ajax({
      url: url.href,
      success: function (response) {
        const responseDocument = $($.parseHTML(response));
        const newPostWrapper = responseDocument.find(`.wp-block-query`)[self.queryContainerIndex];
        const newPosts = $(newPostWrapper).find(`.wp-block-post-template .wp-block-post`);
        self.handleLoadMoreButton(newPostWrapper);
        self.handleResultCount(newPostWrapper);
        self.postTemplate.html(newPosts);
      }
    });
    window.history.pushState({}, '', decodeURIComponent(url));
  }

  /**
   * Removes the taxonomy query.
   *
   * @param {string} taxonomy - Taxonomy name.
   *
   * @return {void}
   */
  removeQuery(taxonomy) {
    const url = new URL(location.href);
    url.searchParams.delete(taxonomy);
    const self = this;
    $.ajax({
      url: url.href,
      success: function (response) {
        const responseDocument = $($.parseHTML(response));
        const newPostWrapper = responseDocument.find(`.wp-block-query`)[self.queryContainerIndex];
        const newPosts = $(newPostWrapper).find(`.wp-block-post-template .wp-block-post`);
        self.handleLoadMoreButton(newPostWrapper);
        self.handleResultCount(newPostWrapper);
        self.postTemplate.html(newPosts);
      }
    });
    window.history.pushState({}, '', decodeURIComponent(url));
  }
  activeTaxonomyTaxonomy(taxonomy) {
    var _url$searchParams$get;
    const url = new URL(location.href);
    return (_url$searchParams$get = url.searchParams.get(taxonomy)) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : '';
  }
  /**
   * Initializes the selectbox filter.
   *
   * @return {void}
   */
  initializeSelectbox() {
    const url = new URL(location.href);
    if (Number(url.searchParams.get('qid')) === this.queryId) {
      this.queryElements.selectbox.value = this.activeTaxonomyTaxonomy(this.queryElements.selectbox.name);
    }
    this.queryElements.selectbox?.addEventListener('change', event => {
      if (event.target.value !== '') {
        this.loadQuery({
          taxonomy: event.target?.name,
          term: event.target?.value
        });
      } else {
        this.removeQuery(event.target?.name);
      }
    });
  }
  /**
   * Initializes the menu filter.
   *
   * @return {void}
   */
  initializeMenu() {
    const {
      menusContainer
    } = this.queryElements;
    const taxonomySlug = menusContainer?.dataset['tax'];
    const menus = menusContainer?.querySelectorAll('.wp-element-button');
    menus?.forEach(menu => {
      menu.addEventListener('click', event => {
        menus.forEach(m => m.classList.remove('is-active-menu'));
        menu.classList.add('is-active-menu');
        const filterValue = menu.dataset.filter_value;
        if (filterValue !== '') {
          this.loadQuery({
            taxonomy: taxonomySlug,
            term: filterValue
          });
        } else {
          this.removeQuery(taxonomySlug);
        }
      });
    });
  }

  /**
   * Initializes the radio filter.
   *
   * @return {void}
   */
  initializeRadio() {
    const {
      radiosContainer
    } = this.queryElements;
    const taxonomySlug = radiosContainer?.dataset['tax'];
    const radios = radiosContainer?.querySelectorAll('input[type="radio"]');
    const url = new URL(location.href);
    radios?.forEach(radio => {
      if (radio.value === this.activeTaxonomyTaxonomy(taxonomySlug) && Number(url.searchParams.get('qid')) === this.queryId) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
      radio.addEventListener('change', event => {
        const includedTerms = Array.from(radios).filter(radio => {
          if (radio.name === event.target.value) {
            return event.target.checked;
          } else {
            return radio.checked;
          }
        }).map(radio => radio.value);
        if (includedTerms.length > 0 && event.target.value !== '') {
          this.loadQuery({
            taxonomy: taxonomySlug,
            term: event.target.value
          }, includedTerms);
        } else {
          this.removeQuery(taxonomySlug);
        }
      });
    });
  }

  /**
   * Initializes the checkbox filter.
   *
   * @return {void}
   */
  initializeCheckbox() {
    const {
      checkboxesContainer
    } = this.queryElements;
    const taxonomySlug = checkboxesContainer?.dataset['tax'];
    const checkboxes = checkboxesContainer?.querySelectorAll('input[type="checkbox"]');
    const url = new URL(location.href);
    checkboxes?.forEach(checkbox => {
      const currentActiveTaxonomy = this.activeTaxonomyTaxonomy(taxonomySlug).split(',').find(tax => tax === checkbox.value);
      if (currentActiveTaxonomy && Number(url.searchParams.get('qid')) === this.queryId) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
      checkbox.addEventListener('change', event => {
        const includedTerms = Array.from(checkboxes).filter(checkbox => {
          if (checkbox.name === event.target.value) {
            return event.target.checked;
          } else {
            return checkbox.checked;
          }
        }).map(checkbox => checkbox.value);
        if (includedTerms.length > 0) {
          this.loadQuery({
            taxonomy: taxonomySlug,
            term: event.target.value
          }, includedTerms);
        } else {
          this.removeQuery(taxonomySlug);
        }
      });
    });
  }
}
window.addEventListener('load', () => {
  /**
   * @type {NodeListOf<HTMLDivElement>} Loop Blocks.
   */
  const ctbQueryLoopBlocks = document.querySelectorAll('.wp-block-query');
  ctbQueryLoopBlocks.forEach((queryLoopBlock, queryContainerIndex) => {
    queryLoopBlock.querySelectorAll(':scope .gutenberghub-query-taxonomy').forEach(container => {
      new GutenberghubQueryByTaxonomy(queryLoopBlock, container, queryContainerIndex);
    });
  });
});

/***/ }),

/***/ "./packages/frontend/src/utils.js":
/*!****************************************!*\
  !*** ./packages/frontend/src/utils.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ctbParseQueryId": () => (/* binding */ ctbParseQueryId)
/* harmony export */ });
/**
 * Parses the gutenberghub query id from the query loop instance.
 *
 * @param {HTMLDivElement|null} queryLoopInstance - Query loop instance.
 * @return {number} - Query id if found, otherwise -1.
 */
function ctbParseQueryId(queryLoopInstance) {
  if (!queryLoopInstance) {
    return -1;
  }
  const classList = Array.from(queryLoopInstance.classList);
  const queryClass = classList.find(className => className.startsWith('ghub-query-id-'));
  if (!queryClass) {
    return -1;
  }
  const classTokens = queryClass.split('-');
  return Number(classTokens[classTokens.length - 1]);
}

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./packages/frontend/src/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query_by_taxonomy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-by-taxonomy */ "./packages/frontend/src/query-by-taxonomy.js");

})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map