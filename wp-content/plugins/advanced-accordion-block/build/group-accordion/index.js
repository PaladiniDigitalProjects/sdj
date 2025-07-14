/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/colors.js":
/*!***********************!*\
  !*** ./src/colors.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const {
  __
} = wp.i18n;
const colors = [{
  name: __('Black', 'advanced-accordion-block'),
  color: '#000000'
}, {
  name: __('White', 'advanced-accordion-block'),
  color: '#ffffff'
}, {
  name: __('Red', 'advanced-accordion-block'),
  color: '#ff0000'
}, {
  name: __('Green', 'advanced-accordion-block'),
  color: '#00ff00'
}, {
  name: __('Blue', 'advanced-accordion-block'),
  color: '#0000ff'
}, {
  name: __('Yellow', 'advanced-accordion-block'),
  color: '#ffff00'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colors);

/***/ }),

/***/ "./src/components/aab-colorpicker.js":
/*!*******************************************!*\
  !*** ./src/components/aab-colorpicker.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../colors */ "./src/colors.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _colorpicker_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./colorpicker.scss */ "./src/components/colorpicker.scss");






const AabColorPicker = ({
  value,
  onChange,
  bgValue,
  onBgChange,
  label,
  innerLabel = ['Text', 'Background']
}) => {
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [color, setColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  const [bgColor, setBgColor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(bgValue);
  let tabListNames = () => {
    if (onBgChange) {
      return [{
        name: 'color',
        title: `${innerLabel[0] || 'Text'}`,
        className: 'tab-color'
      }, {
        name: 'background',
        title: `${innerLabel[1] || 'Background'}`,
        className: 'tab-background'
      }];
    } else {
      return [{
        name: 'color',
        title: `${innerLabel[0] || 'Text'}`,
        className: 'tab-color'
      }];
    }
  };
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleColorChange = newColor => {
    setColor(newColor);
    if (onChange) {
      onChange(newColor); // Pass the color to the parent
    }
  };
  const handleBgColorChange = newColor => {
    setBgColor(newColor);
    if (onBgChange) {
      onBgChange(newColor); // Pass the color to the parent
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aab-color-picker",
    style: {
      'position': 'relative'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl, {
    label: label
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: `aab-reset-btn ${color || bgColor ? 'active' : 'disabled'}`,
    onClick: function () {
      handleColorChange('');
      handleBgColorChange('');
    },
    icon: "image-rotate",
    showTooltip: true,
    label: "Reset"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: toggleVisible
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalZStack, {
    offset: 14
  }, onChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
    colorValue: color
  }), onBgChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
    colorValue: bgColor
  }))))), isVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
    placement: "left",
    className: "aab-color-popover",
    onFocusOutside: () => setIsVisible(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "my-tab-panel",
    activeClass: "active-tab",
    tabs: tabListNames()
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, tab.name === 'color' && onChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    enableAlpha: true,
    onChange: newColor => handleColorChange(newColor),
    color: color
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      'padding': '0 14px 16px 14px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_2__["default"],
    value: color,
    asButtons: true,
    disableCustomColors: true,
    onChange: newColor => handleColorChange(newColor),
    clearable: false
  }))), tab.name === 'background' && onBgChange && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    enableAlpha: true,
    onChange: newColor => handleBgColorChange(newColor),
    color: bgColor
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      'padding': '0 14px 16px 14px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_2__["default"],
    value: bgColor,
    asButtons: true,
    disableCustomColors: true,
    onChange: newColor => handleBgColorChange(newColor),
    clearable: false
  })))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AabColorPicker);

/***/ }),

/***/ "./src/components/editor/settings/accessibility.js":
/*!*********************************************************!*\
  !*** ./src/components/editor/settings/accessibility.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccessibilityPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../aab-colorpicker */ "./src/components/aab-colorpicker.js");





function AccessibilityPanel({
  attributes,
  setAttributes
}) {
  const {
    accessibilityOn,
    focusOutlineColor
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accessibility', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`Accessibility ${accessibilityOn ? "ON" : "OFF"}`, 'advanced-accordion-block'),
    checked: accessibilityOn,
    onChange: accessibilityOn => setAttributes({
      accessibilityOn
    })
  }), accessibilityOn ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: "Focused Accordion Color",
    innerLabel: ["Outline"],
    value: focusOutlineColor,
    onChange: focusOutlineColor => setAttributes({
      focusOutlineColor
    }),
    bgValue: undefined,
    onBgChange: undefined
  }) : null);
}

/***/ }),

/***/ "./src/components/editor/settings/accordion-id.js":
/*!********************************************************!*\
  !*** ./src/components/editor/settings/accordion-id.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIdPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function AccordionIdPanel({
  prefix = "aab_accordion",
  attributes,
  setAttributes
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion ID', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set Accordion ID', 'advanced-accordion-block'),
    value: `${prefix}_${attributes.uniqueId}`,
    onChange: function (uniqueId) {
      if (uniqueId !== prefix) {
        const slicedWord = uniqueId.replace(`${prefix}_`, "");
        setAttributes({
          uniqueId: slicedWord
        });
      }
    }
  }));
}

/***/ }),

/***/ "./src/components/icons/block-icons/group-accordion.js":
/*!*************************************************************!*\
  !*** ./src/components/icons/block-icons/group-accordion.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GroupAccordionBlockIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function GroupAccordionBlockIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 17 17",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M0 0v17h17v-17h-17zM16 1v9h-15v-9h15zM16 11v2h-15v-2h15zM1 16v-2h15v2h-15z",
    fill: "#77b5f7"
  }));
}

/***/ }),

/***/ "./src/components/icons/expand.js":
/*!****************************************!*\
  !*** ./src/components/icons/expand.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExpandIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function ExpandIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "svg-inline--fa fa-expand-alt fa-w-14",
    role: "presentation",
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "expand-alt",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    "data-fa-i2svg": ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M212.686 315.314L120 408l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C10.697 480 0 469.255 0 456V344c0-21.382 25.803-32.09 40.922-16.971L72 360l92.686-92.686c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.249 6.248 6.249 16.378 0 22.627zm22.628-118.628L328 104l-32.922-31.029C279.958 57.851 290.666 32 312.048 32h112C437.303 32 448 42.745 448 56v112c0 21.382-25.803 32.09-40.922 16.971L376 152l-92.686 92.686c-6.248 6.248-16.379 6.248-22.627 0l-25.373-25.373c-6.249-6.248-6.249-16.378 0-22.627z"
  }));
}

/***/ }),

/***/ "./src/components/icons/minimize.js":
/*!******************************************!*\
  !*** ./src/components/icons/minimize.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MinimizeIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function MinimizeIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "svg-inline--fa fa-compress-alt fa-w-14",
    role: "presentation",
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "compress-alt",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    "data-fa-i2svg": ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M4.686 427.314L104 328l-32.922-31.029C55.958 281.851 66.666 256 88.048 256h112C213.303 256 224 266.745 224 280v112c0 21.382-25.803 32.09-40.922 16.971L152 376l-99.314 99.314c-6.248 6.248-16.379 6.248-22.627 0L4.686 449.941c-6.248-6.248-6.248-16.379 0-22.627zM443.314 84.686L344 184l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C234.697 256 224 245.255 224 232V120c0-21.382 25.803-32.09 40.922-16.971L296 136l99.314-99.314c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.248 6.248 6.248 16.379 0 22.627z"
  }));
}

/***/ }),

/***/ "./src/group-accordion/deprecated.js":
/*!*******************************************!*\
  !*** ./src/group-accordion/deprecated.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




const Save = ({
  attributes
}) => {
  const {
    uniqueId,
    searchShow,
    showAllbtn,
    placeholderText,
    closeText,
    openText,
    activetorClass,
    step,
    stepCmpltText,
    anchorLinksShow,
    customCSS,
    openALLBtnPosition,
    categoryList,
    filterBtnAlignment,
    filterBtnPosition,
    filterBtnColor,
    filterBtnBg,
    filterBtnActiveColor,
    filterBtnActiveBg,
    enableCategoryFilter,
    headingColor,
    showMoreBtn,
    showMoreBtnTxt,
    showLessBtnTxt,
    itemsToShow,
    showMoreBtnBg,
    showMoreBtnColor
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const activetorClassEvent = aab_premium ? activetorClass : 'click';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, customCSS && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "custom-css-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `.aagb_accordion_${uniqueId} { ${customCSS} }`)), anchorLinksShow && headingColor && !step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `.aagb_accordion_${uniqueId} .aagb__accordion_heading .anchorjs-link{ color: ${headingColor} }`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: `searchable aagb_accordion_${uniqueId} ${activetorClassEvent} ${enableCategoryFilter && filterBtnPosition}`,
    id: `group-accordion-${uniqueId}`
  }), enableCategoryFilter && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
                                div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn {
                                    color: ${filterBtnColor};
                                    background-color: ${filterBtnBg};
                                    border-color:rgba(${filterBtnColor.replace(/^#/, '').match(/\w\w/g).map(x => parseInt(x, 16)).join(',')},0.3);
                                }

                                div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn.active {
                                    color: ${filterBtnActiveColor};
                                    background-color: ${filterBtnActiveBg};
                                    border-color:${filterBtnActiveBg};
                                }
                                div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn:hover {
                                    background-color:rgba(${filterBtnActiveBg.replace(/^#/, '').match(/\w\w/g).map(x => parseInt(x, 16)).join(',')},0.3);
                                }
                            `), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `button-group aab-filter-button-group ${filterBtnAlignment}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "active btn cat_all_item"
  }, "All"), categoryList?.map(item => {
    let sanitizedItem = item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/%/g, 'percent').replace(/[^a-z0-9-]/g, '');
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "btn",
      "data-filter": `cat_${sanitizedItem}`,
      key: sanitizedItem
    }, item);
  }))), searchShow && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb_form_inner",
    id: "aagb-search-form-" + uniqueId
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb_form_group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "search",
    "data-searchTarget": uniqueId,
    className: "aagb-search-control aagb_form_control noEnterSubmit",
    placeholder: placeholderText || 'Search for FAQ'
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "aagb-search-help-block",
    className: "help-block"
  })), showAllbtn && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb_accordion_wrapper_btn ${openALLBtnPosition}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    "data-openTarget": 'aagb_accordion_' + uniqueId,
    className: "content-accordion__show-all"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "svg-inline--fa fa-expand-alt fa-w-14",
    role: "presentation",
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "expand-alt",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    "data-fa-i2svg": ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M212.686 315.314L120 408l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C10.697 480 0 469.255 0 456V344c0-21.382 25.803-32.09 40.922-16.971L72 360l92.686-92.686c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.249 6.248 6.249 16.378 0 22.627zm22.628-118.628L328 104l-32.922-31.029C279.958 57.851 290.666 32 312.048 32h112C437.303 32 448 42.745 448 56v112c0 21.382-25.803 32.09-40.922 16.971L376 152l-92.686 92.686c-6.248 6.248-16.379 6.248-22.627 0l-25.373-25.373c-6.249-6.248-6.249-16.378 0-22.627z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    value: openText,
    style: {
      margin: 0
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    "data-closeTarget": 'aagb_accordion_' + uniqueId,
    className: "content-accordion__close-all"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "svg-inline--fa fa-compress-alt fa-w-14",
    role: "presentation",
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "compress-alt",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512",
    "data-fa-i2svg": ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M4.686 427.314L104 328l-32.922-31.029C55.958 281.851 66.666 256 88.048 256h112C213.303 256 224 266.745 224 280v112c0 21.382-25.803 32.09-40.922 16.971L152 376l-99.314 99.314c-6.248 6.248-16.379 6.248-22.627 0L4.686 449.941c-6.248-6.248-6.248-16.379 0-22.627zM443.314 84.686L344 184l32.922 31.029c15.12 15.12 4.412 40.971-16.97 40.971h-112C234.697 256 224 245.255 224 232V120c0-21.382 25.803-32.09 40.922-16.971L296 136l99.314-99.314c6.248-6.248 16.379-6.248 22.627 0l25.373 25.373c6.248 6.248 6.248 16.379 0 22.627z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    value: closeText,
    style: {
      margin: 0
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null), showMoreBtn && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aab-show-more-btn-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "show-more-btn",
    style: {
      color: showMoreBtnColor,
      backgroundColor: showMoreBtnBg
    },
    "data-items-to-show": itemsToShow
  }, showMoreBtnTxt || "Show More", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "aagb__icon dashicons dashicons-arrow-down"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "show-less-btn",
    style: {
      color: showMoreBtnColor,
      backgroundColor: showMoreBtnBg
    }
  }, showLessBtnTxt || "Show Less", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "aagb__icon dashicons dashicons-arrow-up"
  }))), step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "step-result"
  }, stepCmpltText)), anchorLinksShow === true && aab_premium && !step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("script", null, `
                        document.addEventListener("DOMContentLoaded", () => {
                                        var Anchor1 = new AnchorJS();
                                        Anchor1.add('.aagb_accordion_${uniqueId} .aagb__accordion_heading .title_wrapper');
                        });
                    
					`));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

/***/ "./src/group-accordion/edit.js":
/*!*************************************!*\
  !*** ./src/group-accordion/edit.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./output */ "./src/group-accordion/output/index.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor */ "./src/group-accordion/editor/index.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/global-settings */ "./src/utils/global-settings.js");









let uniqueCounter = 0;
const Edit = props => {
  const {
    attributes,
    setAttributes,
    clientId
  } = props;

  // set unique ID
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!attributes.uniqueId) {
      const newUniqueId = `${clientId.slice(0, 8)}_${uniqueCounter++}`;
      setAttributes({
        uniqueId: newUniqueId
      });
    }
    const fetchGlobalSettings = async () => {
      const settings = await (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_7__.loadGlobalSettings)(); // Fetch global settings

      setAttributes({
        defaultStyles: settings
      });
    };
    fetchGlobalSettings();
  }, []);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  const hasQaStyle = blockProps.className?.includes('is-style-qa');
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store);
  const currentBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/block-editor').getBlock(clientId);
  }, [clientId]);

  // Function to apply block style
  const applyBlockStyle = styleName => {
    const newStyleClass = styleName !== 'default' ? `is-style-${styleName}` : '';
    let currentClassName = currentBlock?.attributes?.className || '';

    // Avoid reapplying if style already exists
    if (newStyleClass && currentClassName.includes(newStyleClass)) return;

    // Remove all existing is-style-* classes
    currentClassName = currentClassName.replace(/\bis-style-\S+/g, '').replace(/\s+/g, ' ').trim();

    // Add new style class if not default
    if (newStyleClass) {
      currentClassName = currentClassName ? `${currentClassName} ${newStyleClass}` : newStyleClass;
    }

    // Update block attributes
    updateBlockAttributes(clientId, {
      className: currentClassName || undefined
    });
  };
  const isFirstRender = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Only apply default style if QaStyle not set
    if (attributes.QaStyle === undefined && attributes.defaultStyles?.QaStyle !== undefined) {
      applyBlockStyle(attributes.defaultStyles.QaStyle === true ? 'qa' : 'default');
      setAttributes({
        QaStyle: attributes.defaultStyles.QaStyle
      });
    }
  }, [attributes.QaStyle, attributes.defaultStyles?.QaStyle]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isFirstRender.current) {
      // First render: if className already contains 'is-style-qa', set QaStyle true
      if (hasQaStyle === true) {
        setAttributes({
          QaStyle: true
        });
      }
      isFirstRender.current = false;
      return;
    }

    // Sync QaStyle with class presence
    if (attributes.QaStyle !== hasQaStyle && hasQaStyle !== undefined) {
      setAttributes({
        QaStyle: hasQaStyle
      });
    }
  }, [hasQaStyle, attributes.QaStyle]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_6__["default"].Styles, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_6__["default"].Settings, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_output__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    isEditor: true
  }, props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/group-accordion/editor/index.js":
/*!*********************************************!*\
  !*** ./src/group-accordion/editor/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editor.scss */ "./src/group-accordion/editor.scss");
/* harmony import */ var _styles_qa_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/qa-icons */ "./src/group-accordion/editor/styles/qa-icons.js");
/* harmony import */ var _styles_active_accordion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/active-accordion */ "./src/group-accordion/editor/styles/active-accordion.js");
/* harmony import */ var _styles_accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/accordion */ "./src/group-accordion/editor/styles/accordion.js");
/* harmony import */ var _styles_accordion_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styles/accordion-head */ "./src/group-accordion/editor/styles/accordion-head.js");
/* harmony import */ var _styles_accordion_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles/accordion-icon */ "./src/group-accordion/editor/styles/accordion-icon.js");
/* harmony import */ var _styles_accordion_body__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles/accordion-body */ "./src/group-accordion/editor/styles/accordion-body.js");
/* harmony import */ var _styles_custom_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles/custom-css */ "./src/group-accordion/editor/styles/custom-css.js");
/* harmony import */ var _settings_accordion_id__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./settings/accordion-id */ "./src/group-accordion/editor/settings/accordion-id.js");
/* harmony import */ var _settings_accordion_search__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./settings/accordion-search */ "./src/group-accordion/editor/settings/accordion-search.js");
/* harmony import */ var _settings_show_all_btn__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./settings/show-all-btn */ "./src/group-accordion/editor/settings/show-all-btn.js");
/* harmony import */ var _settings_steps_checklist_panel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./settings/steps-checklist-panel */ "./src/group-accordion/editor/settings/steps-checklist-panel.js");
/* harmony import */ var _settings_read_more_btn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./settings/read-more-btn */ "./src/group-accordion/editor/settings/read-more-btn.js");
/* harmony import */ var _settings_category_filter__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./settings/category-filter */ "./src/group-accordion/editor/settings/category-filter.js");
/* harmony import */ var _settings_show_more_btn__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./settings/show-more-btn */ "./src/group-accordion/editor/settings/show-more-btn.js");
/* harmony import */ var _settings_more_features__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./settings/more-features */ "./src/group-accordion/editor/settings/more-features.js");
/* harmony import */ var _styles_category_filter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./styles/category-filter */ "./src/group-accordion/editor/styles/category-filter.js");
/* harmony import */ var _settings_accessibility__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./settings/accessibility */ "./src/group-accordion/editor/settings/accessibility.js");






















function Settings(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_id__WEBPACK_IMPORTED_MODULE_12__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_search__WEBPACK_IMPORTED_MODULE_13__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_show_all_btn__WEBPACK_IMPORTED_MODULE_14__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_steps_checklist_panel__WEBPACK_IMPORTED_MODULE_15__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_read_more_btn__WEBPACK_IMPORTED_MODULE_16__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_category_filter__WEBPACK_IMPORTED_MODULE_17__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_show_more_btn__WEBPACK_IMPORTED_MODULE_18__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_more_features__WEBPACK_IMPORTED_MODULE_19__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accessibility__WEBPACK_IMPORTED_MODULE_21__["default"], props));
}
function Styles(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    group: "styles"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_qa_icons__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_active_accordion__WEBPACK_IMPORTED_MODULE_6__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_accordion__WEBPACK_IMPORTED_MODULE_7__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_accordion_head__WEBPACK_IMPORTED_MODULE_8__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_accordion_icon__WEBPACK_IMPORTED_MODULE_9__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_accordion_body__WEBPACK_IMPORTED_MODULE_10__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_category_filter__WEBPACK_IMPORTED_MODULE_20__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_styles_custom_css__WEBPACK_IMPORTED_MODULE_11__["default"], props)));
}
const Editor = {
  Settings,
  Styles
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./src/group-accordion/editor/settings/accessibility.js":
/*!**************************************************************!*\
  !*** ./src/group-accordion/editor/settings/accessibility.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccessibilityPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_editor_settings_accessibility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/editor/settings/accessibility */ "./src/components/editor/settings/accessibility.js");



function AccessibilityPanel(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_editor_settings_accessibility__WEBPACK_IMPORTED_MODULE_2__["default"], props);
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/accordion-id.js":
/*!*************************************************************!*\
  !*** ./src/group-accordion/editor/settings/accordion-id.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIdPanel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_editor_settings_accordion_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/editor/settings/accordion-id */ "./src/components/editor/settings/accordion-id.js");




function AccordionIdPanel(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_editor_settings_accordion_id__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    prefix: "aab_group_accordion"
  }, props));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/accordion-search.js":
/*!*****************************************************************!*\
  !*** ./src/group-accordion/editor/settings/accordion-search.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionSearchPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function AccordionSearchPanel({
  attributes,
  setAttributes
}) {
  const {
    searchShow,
    placeholderText
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Search', 'advanced-accordion-block'),
    initialOpen: false,
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Accordion Search', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: aab_premium && searchShow,
    onChange: searchShow => setAttributes({
      searchShow
    })
  }), searchShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "label-d-block"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Placeholder Text', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "widefat",
    disabled: !aab_premium,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter placeholder text', 'advanced-accordion-block'),
    value: placeholderText,
    onChange: e => setAttributes({
      placeholderText: e.target.value
    })
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/category-filter.js":
/*!****************************************************************!*\
  !*** ./src/group-accordion/editor/settings/category-filter.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryFilterPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




const filterBtnPositions = [{
  label: 'Vertical',
  value: 'vertical_filter'
}, {
  label: 'Horizontal',
  value: 'horizontal_filter'
}];
const filterBtnAlignments = [{
  label: 'Left',
  value: 'left_btn'
}, {
  label: 'Center',
  value: 'center_btn'
}, {
  label: 'Right',
  value: 'right_btn'
}];
function CategoryFilterPanel({
  attributes,
  setAttributes
}) {
  const {
    enableCategoryFilter,
    categoryList,
    filterBtnPosition,
    filterBtnAlignment
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Category Filter', 'advanced-accordion-block'),
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Category Filter', 'advanced-accordion-block'),
    checked: enableCategoryFilter,
    disabled: !aab_premium,
    onChange: enableCategoryFilter => setAttributes({
      enableCategoryFilter
    })
  }), enableCategoryFilter && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Category Tags', 'advanced-accordion-block'),
    onChange: categoryList => setAttributes({
      categoryList
    }),
    suggestions: [],
    value: categoryList,
    disabled: !aab_premium
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter Button Position', 'advanced-accordion-block'),
    disabled: !aab_premium,
    options: filterBtnPositions,
    onChange: filterBtnPosition => setAttributes({
      filterBtnPosition
    }),
    value: filterBtnPosition
  }), filterBtnPosition === 'horizontal_filter' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter Button Alignment', 'advanced-accordion-block'),
    disabled: !aab_premium,
    options: filterBtnAlignments,
    onChange: filterBtnAlignment => setAttributes({
      filterBtnAlignment
    }),
    value: filterBtnAlignment
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/more-features.js":
/*!**************************************************************!*\
  !*** ./src/group-accordion/editor/settings/more-features.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MoreFeaturesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");





function MoreFeaturesPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep;
  const {
    step,
    activetorClass
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  const anchorLinksShow = attributes.anchorLinksShow !== false ? attributes.anchorLinksShow === true ? true : attributes.defaultStyles?.anchorLinkShow === true : false;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_4__.createAttrGetter)(attributes);
  const faqSchema = (_getAttrDeep = getAttrDeep('faqSchema')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('More Features', 'advanced-accordion-block'),
    initialOpen: false,
    className: has_disabled_class
  }, !step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Anchor Link', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: aab_premium && anchorLinksShow,
    onChange: anchorLinksShow => setAttributes({
      anchorLinksShow
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('FAQ Schema', 'advanced-accordion-block'),
    checked: faqSchema,
    onChange: faqSchema => setAttributes({
      faqSchema
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
    value: activetorClass,
    onChange: activetorClass => setAttributes({
      activetorClass
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activator Event', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "click",
    label: "Click",
    disabled: !aab_premium,
    showTooltip: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
    value: "hover",
    disabled: !aab_premium,
    label: "Hover"
  }))));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/read-more-btn.js":
/*!**************************************************************!*\
  !*** ./src/group-accordion/editor/settings/read-more-btn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReadMoreBtnPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function ReadMoreBtnPanel({
  attributes,
  setAttributes
}) {
  const {
    buttonShow,
    contentCount,
    readText
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Read More Button', 'advanced-accordion-block'),
    initialOpen: false,
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Show/Hide', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: aab_premium && buttonShow,
    onChange: buttonShow => setAttributes({
      buttonShow
    })
  }), buttonShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Content Count', 'advanced-accordion-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Total Number of Characters you want to display on accordion body', 'advanced-accordion-block'),
    disabled: !aab_premium,
    value: contentCount,
    onChange: contentCount => setAttributes({
      contentCount
    }),
    min: 1,
    max: 1000
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Read More Text', 'advanced-accordion-block'),
    value: readText,
    onChange: readText => setAttributes({
      readText
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter the text you want to display on Read more button.', 'advanced-accordion-block')
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/show-all-btn.js":
/*!*************************************************************!*\
  !*** ./src/group-accordion/editor/settings/show-all-btn.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowAllBtnPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




const openALLBtnPositions = [{
  label: 'Left',
  value: 'left_btn'
}, {
  label: 'Center',
  value: 'center_btn'
}, {
  label: 'Right',
  value: 'right_btn'
}];
function ShowAllBtnPanel({
  attributes,
  setAttributes
}) {
  const {
    showAllbtn,
    openText,
    closeText,
    openALLBtnPosition
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Open/Close All', 'advanced-accordion-block'),
    initialOpen: false,
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Open All & Close All', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: aab_premium && showAllbtn,
    onChange: showAllbtn => setAttributes({
      showAllbtn
    })
  }), showAllbtn && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    __nextHasNoMarginBottom: true,
    id: "openText",
    label: "Show All Text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "openText",
    type: "text",
    disabled: !aab_premium,
    value: openText,
    onChange: e => setAttributes({
      openText: e.target.value
    }),
    style: {
      display: 'block',
      width: '100%'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    __nextHasNoMarginBottom: true,
    id: "closeText",
    label: "Close All Text"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "closeText",
    type: "text",
    disabled: !aab_premium,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter text', 'advanced-accordion-block'),
    value: closeText,
    onChange: e => setAttributes({
      closeText: e.target.value
    }),
    style: {
      display: 'block',
      width: '100%'
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Open/Close Button Position', 'advanced-accordion-block'),
    disabled: !aab_premium,
    options: openALLBtnPositions,
    onChange: openALLBtnPosition => setAttributes({
      openALLBtnPosition
    }),
    value: openALLBtnPosition
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/show-more-btn.js":
/*!**************************************************************!*\
  !*** ./src/group-accordion/editor/settings/show-more-btn.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowMoreBtnPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");






function ShowMoreBtnPanel({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    showMoreBtn,
    itemsToShow,
    showMoreBtnTxt,
    showLessBtnTxt,
    showMoreBtnColor,
    showMoreBtnBg
  } = attributes;
  const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)('core/block-editor', []).getBlock(clientId)?.innerBlocks;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show More Button', 'advanced-accordion-block'),
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      paddingTop: 5,
      paddingBottom: 5
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Show More Button', 'advanced-accordion-block'),
    checked: showMoreBtn,
    disabled: !aab_premium,
    onChange: showMoreBtn => setAttributes({
      showMoreBtn
    })
  })), showMoreBtn && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Items Per Click', 'advanced-accordion-block'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('How many items to show per click?', 'advanced-accordion-block'),
    value: itemsToShow,
    min: 1,
    max: blocks?.length,
    disabled: !aab_premium || !showMoreBtn || blocks?.length < 2,
    onChange: itemsToShow => setAttributes({
      itemsToShow
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show More Text', 'advanced-accordion-block'),
    value: showMoreBtnTxt,
    onChange: showMoreBtnTxt => setAttributes({
      showMoreBtnTxt
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter the text you want to display on the Show more button.', 'advanced-accordion-block')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show Less Text', 'advanced-accordion-block'),
    value: showLessBtnTxt,
    onChange: showLessBtnTxt => setAttributes({
      showLessBtnTxt
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter the text you want to display on the Show less button.', 'advanced-accordion-block')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Button Color', 'advanced-accordion-block'),
    value: showMoreBtnColor,
    onChange: showMoreBtnColor => setAttributes({
      showMoreBtnColor
    }),
    bgValue: showMoreBtnBg,
    onBgChange: showMoreBtnBg => setAttributes({
      showMoreBtnBg
    })
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/settings/steps-checklist-panel.js":
/*!**********************************************************************!*\
  !*** ./src/group-accordion/editor/settings/steps-checklist-panel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StepsChecklistPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function StepsChecklistPanel({
  attributes,
  setAttributes
}) {
  const {
    step,
    checkList,
    stepText,
    stepCmpltText
  } = attributes;
  let optionsName = step ? "step" : checkList ? "checkList" : "none";
  const aab_premium = aagb_local_object.licensing;
  if (!aab_premium) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Steps or Checklist', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RadioControl, {
    label: "Options",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Transform the accordions into interactive steps or a checklist for a streamlined user experience.', 'advanced-accordion-block'),
    selected: optionsName,
    options: [{
      label: 'Steps',
      value: "step"
    }, {
      label: 'Checklist',
      value: "checkList"
    }, {
      label: 'None',
      value: "none"
    }],
    onChange: value => {
      if (value === 'step') {
        setAttributes({
          checkList: false
        });
        setAttributes({
          step: true
        });
      } else if (value === 'checkList') {
        setAttributes({
          step: false
        });
        setAttributes({
          checkList: true
        });
      } else {
        setAttributes({
          step: false
        });
        setAttributes({
          checkList: false
        });
      }
    }
  }), aab_premium && step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Step Text', 'advanced-accordion-block'),
    value: stepText,
    onChange: stepText => setAttributes({
      stepText
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter the text you want to display on the step.', 'advanced-accordion-block')
  }), aab_premium && step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Step Complete Text', 'advanced-accordion-block'),
    value: stepCmpltText,
    onChange: stepCmpltText => setAttributes({
      stepCmpltText
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter the text you want to display when the step is completed.', 'advanced-accordion-block')
  }));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/accordion-body.js":
/*!*************************************************************!*\
  !*** ./src/group-accordion/editor/styles/accordion-body.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionBodyStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");






function AccordionBodyStylesPanel({
  attributes,
  setAttributes
}) {
  const {
    bodyBg,
    QaStyle,
    bodyBorder
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Body', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color', 'advanced-accordion-block'),
    value: bodyBg,
    onChange: bodyBg => setAttributes({
      bodyBg
    }),
    innerLabel: ['Background'],
    bgValue: undefined,
    onBgChange: undefined
  }), !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aagb__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set Body Border', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_5__["default"],
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Borders'),
    onChange: bodyBorder => setAttributes({
      bodyBorder
    }),
    value: bodyBorder
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/accordion-head.js":
/*!*************************************************************!*\
  !*** ./src/group-accordion/editor/styles/accordion-head.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionHeadStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");







function AccordionHeadStylesPanel({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    QaStyle,
    headerBg,
    headingColor,
    headingBorder,
    subheadingColor,
    labelsGlobalTextColor,
    labelsGlobalBgColor
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const hasLabels = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const blocks = select("core/block-editor")?.getBlock(clientId)?.innerBlocks || [];
    return blocks.some(block => block.attributes?.enableLabels); // at least one accordion-item has labels enabled.
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Head', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Header Color', 'advanced-accordion-block'),
    value: headingColor,
    onChange: headingColor => setAttributes({
      headingColor
    }),
    bgValue: headerBg,
    onBgChange: headerBg => setAttributes({
      headerBg
    })
  }), aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sub Heading Color', 'advanced-accordion-block'),
    value: subheadingColor,
    onChange: subheadingColor => setAttributes({
      subheadingColor
    }),
    bgValue: undefined,
    onBgChange: undefined
  }), hasLabels && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aa-custom-spacer"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Labels Color', 'advanced-accordion-block'),
    value: labelsGlobalTextColor,
    onChange: labelsGlobalTextColor => setAttributes({
      labelsGlobalTextColor
    }),
    bgValue: labelsGlobalBgColor,
    onBgChange: labelsGlobalBgColor => setAttributes({
      labelsGlobalBgColor
    })
  })), !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aa-custom-spacer"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_5__["default"],
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Borders'),
    onChange: headingBorder => setAttributes({
      headingBorder
    }),
    value: headingBorder
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/accordion-icon.js":
/*!*************************************************************!*\
  !*** ./src/group-accordion/editor/styles/accordion-icon.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIconStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");





function AccordionIconStylesPanel({
  attributes,
  setAttributes
}) {
  const {
    showIcon,
    iconColor,
    iconBackground
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Icon', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Icon', 'advanced-accordion-block'),
    checked: showIcon,
    onChange: showIcon => setAttributes({
      showIcon
    })
  }), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Color', 'advanced-accordion-block'),
    value: iconColor,
    onChange: iconColor => setAttributes({
      iconColor
    }),
    bgValue: iconBackground,
    onBgChange: iconBackground => setAttributes({
      iconBackground
    }),
    innerLabel: ['Icon', 'Background']
  })));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/accordion.js":
/*!********************************************************!*\
  !*** ./src/group-accordion/editor/styles/accordion.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");





function AccordionStylesPanel({
  attributes,
  setAttributes
}) {
  const {
    border,
    margins,
    paddings,
    borderRadius
  } = attributes;
  const onChangeBorder = newBorders => {
    setAttributes({
      border: newBorders
    });
    setAttributes({
      bodyBorder: {
        top: {
          color: `${newBorders.color}`,
          style: `${newBorders.style}`,
          width: `${newBorders.width}`
        }
      }
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Styles', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanel, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Spacings', 'advanced-accordion-block'),
    className: "aab-component-toolpanel",
    resetAll: () => {
      setAttributes({
        margins: {
          top: "",
          right: "",
          left: "",
          bottom: ""
        },
        paddings: {
          top: "",
          right: "",
          left: "",
          bottom: ""
        }
      });
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => margins?.top || margins?.bottom,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Margins', 'advanced-accordion-block'),
    onDeselect: () => setAttributes({
      margins: {
        top: "",
        right: "",
        left: "",
        bottom: ""
      }
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBoxControl, {
    values: margins,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Margin', 'advanced-accordion-block'),
    sides: ['top', 'bottom'],
    units: [],
    allowReset: false,
    onChange: newValue => setAttributes({
      ...margins,
      margins: {
        top: newValue.top,
        bottom: newValue.bottom
      }
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => paddings?.top || paddings?.right,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding', 'advanced-accordion-block'),
    onDeselect: () => setAttributes({
      paddings: {
        top: "",
        right: "",
        left: "",
        bottom: ""
      }
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBoxControl, {
    values: paddings,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Content Padding', 'advanced-accordion-block'),
    units: [],
    splitOnAxis: true,
    allowReset: false,
    onChange: newValue => setAttributes({
      ...paddings,
      paddings: {
        top: newValue.top,
        left: newValue.left,
        right: newValue.right,
        bottom: newValue.bottom
      }
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanel, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border', 'advanced-accordion-block'),
    className: "aab-component-toolpanel",
    resetAll: () => {
      onChangeBorder({
        "style": "none",
        "width": "0px"
      });
      setAttributes({
        borderRadius: 0
      });
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => border?.width !== "0px" && !!border?.width,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border', 'advanced-accordion-block'),
    onDeselect: () => onChangeBorder({
      "style": "none",
      "width": "0px"
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_4__["default"],
    onChange: onChangeBorder,
    value: border
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => !!borderRadius,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius', 'advanced-accordion-block'),
    onDeselect: () => setAttributes({
      borderRadius: 0
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border Radius', 'advanced-accordion-block'),
    value: borderRadius,
    onChange: borderRadius => setAttributes({
      borderRadius
    }),
    min: 0,
    max: 50
  }))));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/active-accordion.js":
/*!***************************************************************!*\
  !*** ./src/group-accordion/editor/styles/active-accordion.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActiveAccordionStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");






function ActiveAccordionStylesPanel({
  attributes,
  setAttributes
}) {
  const {
    activeAccordionBorder,
    activeBackground
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active Accordion Style', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Border', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_4__["default"],
    value: activeAccordionBorder,
    onChange: activeAccordionBorder => setAttributes({
      activeAccordionBorder
    }),
    withSlider: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__sublabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('(This style will only be visible in the frontend only)', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active Background', 'advanced-accordion-block'),
    value: activeBackground,
    onChange: activeBackground => setAttributes({
      activeBackground
    }),
    bgValue: undefined,
    onBgChange: undefined
  }));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/category-filter.js":
/*!**************************************************************!*\
  !*** ./src/group-accordion/editor/styles/category-filter.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryFilterStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");





function CategoryFilterStylesPanel({
  attributes,
  setAttributes
}) {
  const {
    filterBtnColor,
    filterBtnBg,
    filterBtnHoverColor,
    filterBtnHoverBg,
    filterBtnActiveColor,
    filterBtnActiveBg,
    enableCategoryFilter
  } = attributes;
  if (!enableCategoryFilter) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Category Filter', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default Color', 'advanced-accordion-block'),
    value: filterBtnColor,
    onChange: filterBtnColor => setAttributes({
      filterBtnColor
    }),
    bgValue: filterBtnBg,
    onBgChange: filterBtnBg => setAttributes({
      filterBtnBg
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Hover Color', 'advanced-accordion-block'),
    value: filterBtnHoverColor,
    onChange: filterBtnHoverColor => setAttributes({
      filterBtnHoverColor
    }),
    bgValue: filterBtnHoverBg,
    onBgChange: filterBtnHoverBg => setAttributes({
      filterBtnHoverBg
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active Color', 'advanced-accordion-block'),
    value: filterBtnActiveColor,
    onChange: filterBtnActiveColor => setAttributes({
      filterBtnActiveColor
    }),
    bgValue: filterBtnActiveBg,
    onBgChange: filterBtnActiveBg => setAttributes({
      filterBtnActiveBg
    })
  }));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/custom-css.js":
/*!*********************************************************!*\
  !*** ./src/group-accordion/editor/styles/custom-css.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomCSSPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_simple_code_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-simple-code-editor */ "./node_modules/react-simple-code-editor/lib/index.js");
/* harmony import */ var react_simple_code_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_simple_code_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_5__);






function CustomCSSPanel({
  attributes,
  setAttributes
}) {
  const {
    customCSS
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const has_disabled_class = aab_premium ? '' : 'aab-pro-element';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom CSS', 'advanced-accordion-block'),
    initialOpen: false,
    className: has_disabled_class
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "custom-css-notice",
    htmlFor: "custom-css"
  }, "Add your own CSS code here to customize the accordion as per your expectations."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_simple_code_editor__WEBPACK_IMPORTED_MODULE_4___default()), {
    value: customCSS !== null && customCSS !== void 0 ? customCSS : '',
    onValueChange: customCSS => setAttributes({
      customCSS
    }),
    highlight: code => code ? prismjs__WEBPACK_IMPORTED_MODULE_5___default().highlight(code, (prismjs__WEBPACK_IMPORTED_MODULE_5___default().languages).css, 'css') : '',
    padding: 10,
    disabled: !aab_premium,
    style: {
      fontFamily: 'monospace',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      minHeight: '100px',
      backgroundColor: '#f9f9f9',
      color: '#333',
      outline: 'none',
      boxSizing: 'border-box',
      marginTop: '7px'
    }
  }));
}

/***/ }),

/***/ "./src/group-accordion/editor/styles/qa-icons.js":
/*!*******************************************************!*\
  !*** ./src/group-accordion/editor/styles/qa-icons.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QaIconsStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");






function QaIconsStylesPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4;
  const {
    QaStyle
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_5__.createAttrGetter)(attributes);
  const qIconColor = (_getAttrDeep = getAttrDeep('qIconColor')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const qIconBg = (_getAttrDeep2 = getAttrDeep('qIconBg')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  const aIconColor = (_getAttrDeep3 = getAttrDeep('aIconColor')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const aIconBg = (_getAttrDeep4 = getAttrDeep('aIconBg')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : null;
  if (!QaStyle || !aab_premium) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Q/A Icons Styles', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Q Color', 'advanced-accordion-block'),
    value: qIconColor,
    onChange: qIconColor => setAttributes({
      qIconColor
    }),
    bgValue: qIconBg,
    onBgChange: qIconBg => setAttributes({
      qIconBg
    }),
    innerLabel: ['Text', 'Background']
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A Color', 'advanced-accordion-block'),
    value: aIconColor,
    onChange: aIconColor => setAttributes({
      aIconColor
    }),
    bgValue: aIconBg,
    onBgChange: aIconBg => setAttributes({
      aIconBg
    }),
    innerLabel: ['Text', 'Background']
  }));
}

/***/ }),

/***/ "./src/group-accordion/output/category-filter.js":
/*!*******************************************************!*\
  !*** ./src/group-accordion/output/category-filter.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function CategoryFilter(props) {
  const {
    uniqueId,
    enableCategoryFilter,
    filterBtnColor,
    filterBtnBg,
    filterBtnHoverColor,
    filterBtnHoverBg,
    filterBtnActiveColor,
    filterBtnActiveBg,
    filterBtnAlignment,
    categoryList,
    accessibilityOn
  } = props.attributes;
  const aab_premium = aagb_local_object.licensing;
  if (!aab_premium || !enableCategoryFilter) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
          div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn {
            color: ${filterBtnColor};
            background-color: ${filterBtnBg};
            border-color: ${filterBtnColor}33;
            outline: 3px solid #00000000;
          }

          div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn:hover {
            color: ${filterBtnHoverColor};
            background-color: ${filterBtnHoverBg};
            border-color: ${filterBtnHoverColor}33;
          }

          ${accessibilityOn ? `
              div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn:focus-visible {
                outline-color: ${filterBtnHoverColor}33;
              }
            ` : ``}

          div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn.active,
          div.aagb_accordion_${uniqueId} .aab-filter-button-group .btn.active:hover {
            color: ${filterBtnActiveColor};
            background-color: ${filterBtnActiveBg};
            border-color: ${filterBtnActiveBg};
            cursor: default;
          }
        `), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `button-group aab-filter-button-group ${filterBtnAlignment}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    tabIndex: accessibilityOn ? undefined : -1,
    className: "active btn cat_all_item"
  }, "All"), categoryList?.map(item => {
    let sanitizedItem = item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/%/g, 'percent').replace(/[^a-z0-9-]/g, '');
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "btn",
      "data-filter": `cat_${sanitizedItem}`,
      key: sanitizedItem,
      tabIndex: accessibilityOn ? undefined : -1
    }, item);
  })));
}

/***/ }),

/***/ "./src/group-accordion/output/custom-css-block.js":
/*!********************************************************!*\
  !*** ./src/group-accordion/output/custom-css-block.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomCSSBlock)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function CustomCSSBlock(props) {
  const {
    uniqueId,
    customCSS
  } = props.attributes;
  if (!customCSS) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "custom-css-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `.aagb_accordion_${uniqueId} { ${customCSS} }`));
}

/***/ }),

/***/ "./src/group-accordion/output/index.js":
/*!*********************************************!*\
  !*** ./src/group-accordion/output/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Output)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _show_more_btn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./show-more-btn */ "./src/group-accordion/output/show-more-btn.js");
/* harmony import */ var _category_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./category-filter */ "./src/group-accordion/output/category-filter.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search */ "./src/group-accordion/output/search.js");
/* harmony import */ var _show_all_btn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./show-all-btn */ "./src/group-accordion/output/show-all-btn.js");
/* harmony import */ var _custom_css_block__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom-css-block */ "./src/group-accordion/output/custom-css-block.js");
/* harmony import */ var _other__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./other */ "./src/group-accordion/output/other.js");









function Output({
  isEditor = false,
  ...props
}) {
  const useBlockProps = isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save;
  const {
    uniqueId,
    activetorClass,
    step,
    stepCmpltText,
    filterBtnPosition,
    enableCategoryFilter
  } = props.attributes;
  const aab_premium = aagb_local_object.licensing;
  const activetorClassEvent = aab_premium ? activetorClass : 'click';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_custom_css_block__WEBPACK_IMPORTED_MODULE_7__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_other__WEBPACK_IMPORTED_MODULE_8__["default"].Styles, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", useBlockProps({
    className: `searchable aagb_accordion_${uniqueId} ${activetorClassEvent} ${enableCategoryFilter && filterBtnPosition}`,
    id: `group-accordion-${uniqueId}`
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_category_filter__WEBPACK_IMPORTED_MODULE_4__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_search__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_show_all_btn__WEBPACK_IMPORTED_MODULE_6__["default"], props), isEditor ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
    allowedBlocks: ['aab/accordion-item'],
    template: [['aab/accordion-item']]
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_show_more_btn__WEBPACK_IMPORTED_MODULE_3__["default"], props), step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "step-result"
  }, stepCmpltText)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_other__WEBPACK_IMPORTED_MODULE_8__["default"].Scripts, props));
}
;

/***/ }),

/***/ "./src/group-accordion/output/other.js":
/*!*********************************************!*\
  !*** ./src/group-accordion/output/other.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");



function Styles(props) {
  var _getAttrDeep;
  const {
    uniqueId,
    step,
    activeAccordionBorder,
    accessibilityOn,
    focusOutlineColor
  } = props.attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_2__.createAttrGetter)(props.attributes);
  const anchorLinksShow = props.attributes.anchorLinksShow !== false ? props.attributes.anchorLinksShow === true ? true : props.attributes.defaultStyles?.anchorLinkShow === true : false;
  const headingColor = (_getAttrDeep = getAttrDeep('headingColor')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : {};
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
        .aagb_accordion_${uniqueId} .aagb__accordion_active .aagb__accordion_body {
          border-top: ${activeAccordionBorder.width} ${activeAccordionBorder.style} ${activeAccordionBorder.color};
        }
      `, anchorLinksShow && headingColor && !step && `.aagb_accordion_${uniqueId} .aagb__accordion_heading .anchorjs-link {
            color: ${headingColor}
          }`, accessibilityOn ? `
          .aagb_accordion_${uniqueId} .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_${uniqueId} .aagb__accordion_container:focus-visible {
            outline: 2px solid ${focusOutlineColor};
          }
        ` : ``);
}
function Scripts(props) {
  const {
    uniqueId,
    step
  } = props.attributes;
  const anchorLinksShow = props.attributes.anchorLinksShow !== false ? props.attributes.anchorLinksShow === true ? true : props.attributes.defaultStyles?.anchorLinkShow === true : false;
  const aab_premium = aagb_local_object.licensing;
  if (!anchorLinksShow || !aab_premium || step) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("script", null, `
        document.addEventListener("DOMContentLoaded", () => {
          const Anchor1 = new AnchorJS();
          Anchor1.add('.aagb_accordion_${uniqueId} .aagb__accordion_heading .title_wrapper');
        });     
      `);
}
const Other = {
  Styles,
  Scripts
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Other);

/***/ }),

/***/ "./src/group-accordion/output/search.js":
/*!**********************************************!*\
  !*** ./src/group-accordion/output/search.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Search(props) {
  const {
    uniqueId,
    searchShow,
    placeholderText,
    accessibilityOn
  } = props.attributes;
  const divId = "aagb-search-form-" + uniqueId;
  const aab_premium = aagb_local_object.licensing;
  if (!aab_premium || !searchShow) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb_form_inner",
    id: divId
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb_form_group"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "search",
    "data-searchTarget": uniqueId,
    className: "aagb-search-control aagb_form_control noEnterSubmit",
    placeholder: placeholderText || 'Search for FAQ',
    tabIndex: accessibilityOn ? undefined : -1
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "aagb-search-help-block",
    className: "help-block"
  })));
}

/***/ }),

/***/ "./src/group-accordion/output/show-all-btn.js":
/*!****************************************************!*\
  !*** ./src/group-accordion/output/show-all-btn.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowAllBtn)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_icons_expand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/icons/expand */ "./src/components/icons/expand.js");
/* harmony import */ var _components_icons_minimize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/minimize */ "./src/components/icons/minimize.js");





function ShowAllBtn(props) {
  const {
    uniqueId,
    showAllbtn,
    closeText,
    openText,
    openALLBtnPosition,
    accessibilityOn
  } = props.attributes;
  const aab_premium = aagb_local_object.licensing;
  if (!aab_premium || !showAllbtn) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb_accordion_wrapper_btn ${openALLBtnPosition}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    tabIndex: accessibilityOn ? 0 : -1,
    href: "#",
    "data-openTarget": 'aagb_accordion_' + uniqueId,
    className: "content-accordion__show-all"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_expand__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: openText,
    style: {
      margin: 0
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    tabIndex: accessibilityOn ? 0 : -1,
    href: "#",
    "data-closeTarget": 'aagb_accordion_' + uniqueId,
    className: "content-accordion__close-all"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_minimize__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: closeText,
    style: {
      margin: 0
    }
  })));
}

/***/ }),

/***/ "./src/group-accordion/output/show-more-btn.js":
/*!*****************************************************!*\
  !*** ./src/group-accordion/output/show-more-btn.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowMoreBtn)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ShowMoreBtn(props) {
  const {
    showMoreBtn,
    itemsToShow,
    showMoreBtnTxt,
    showLessBtnTxt,
    showMoreBtnColor,
    showMoreBtnBg,
    accessibilityOn
  } = props.attributes;
  const aab_premium = aagb_local_object.licensing;
  if (!aab_premium || !showMoreBtn) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, accessibilityOn ? `
            .aab-show-more-btn-container button.show-more-btn:focus-visible, 
            .aab-show-more-btn-container button.show-less-btn:focus-visible {
              outline-color: ${showMoreBtnColor}33;
            }
          ` : ``), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aab-show-more-btn-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    tabIndex: accessibilityOn ? undefined : -1,
    className: "show-more-btn",
    style: {
      color: showMoreBtnColor,
      backgroundColor: showMoreBtnBg
    },
    "data-items-to-show": itemsToShow
  }, showMoreBtnTxt || "Show More", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "aagb__icon dashicons dashicons-arrow-down"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    tabIndex: accessibilityOn ? undefined : -1,
    className: "show-less-btn",
    style: {
      color: showMoreBtnColor,
      backgroundColor: showMoreBtnBg
    }
  }, showLessBtnTxt || "Show Less", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "aagb__icon dashicons dashicons-arrow-up"
  }))));
}

/***/ }),

/***/ "./src/group-accordion/save.js":
/*!*************************************!*\
  !*** ./src/group-accordion/save.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./output */ "./src/group-accordion/output/index.js");


const Save = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_output__WEBPACK_IMPORTED_MODULE_1__["default"], props);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

/***/ "./src/utils/global-settings.js":
/*!**************************************!*\
  !*** ./src/utils/global-settings.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAttrGetter: () => (/* binding */ createAttrGetter),
/* harmony export */   loadGlobalSettings: () => (/* binding */ loadGlobalSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
// Import necessary WordPress packages


// Function to load global settings from the WordPress database
const loadGlobalSettings = async () => {
  try {
    const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/settings'
    });
    const savedGlobalStyles = data.aab_settings_defaults ? JSON.parse(data.aab_settings_defaults) : {};
    return {
      ...savedGlobalStyles
    };
  } catch (error) {
    console.error('Error loading global styles:', error);
    return null; // Return default values in case of an error
  }
};
const createAttrGetter = attributes => {
  return path => {
    const keys = path.split('.');
    let val = attributes;
    for (let key of keys) val = val?.[key];
    if (val !== undefined) return val;
    val = attributes.defaultStyles;
    for (let key of keys) val = val?.[key];
    return val;
  };
};

/***/ }),

/***/ "./src/components/colorpicker.scss":
/*!*****************************************!*\
  !*** ./src/components/colorpicker.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/group-accordion/editor.scss":
/*!*****************************************!*\
  !*** ./src/group-accordion/editor.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/prismjs/prism.js":
/*!***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if ( true && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof __webpack_require__.g !== 'undefined') {
	__webpack_require__.g.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism.util.setLanguage(code, language);
			Prism.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());


/***/ }),

/***/ "./node_modules/react-simple-code-editor/lib/index.js":
/*!************************************************************!*\
  !*** ./node_modules/react-simple-code-editor/lib/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __importStar(__webpack_require__(/*! react */ "react"));
var KEYCODE_Y = 89;
var KEYCODE_Z = 90;
var KEYCODE_M = 77;
var KEYCODE_PARENS = 57;
var KEYCODE_BRACKETS = 219;
var KEYCODE_QUOTE = 222;
var KEYCODE_BACK_QUOTE = 192;
var HISTORY_LIMIT = 100;
var HISTORY_TIME_GAP = 3000;
var isWindows = typeof window !== 'undefined' &&
    'navigator' in window &&
    /Win/i.test(navigator.platform);
var isMacLike = typeof window !== 'undefined' &&
    'navigator' in window &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
var className = 'npm__react-simple-code-editor__textarea';
var cssText = /* CSS */ "\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.".concat(className, ":empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .").concat(className, " {\n    color: transparent !important;\n  }\n\n  .").concat(className, "::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n");
var Editor = React.forwardRef(function Editor(props, ref) {
    var autoFocus = props.autoFocus, disabled = props.disabled, form = props.form, highlight = props.highlight, _a = props.ignoreTabKey, ignoreTabKey = _a === void 0 ? false : _a, _b = props.insertSpaces, insertSpaces = _b === void 0 ? true : _b, maxLength = props.maxLength, minLength = props.minLength, name = props.name, onBlur = props.onBlur, onClick = props.onClick, onFocus = props.onFocus, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, onValueChange = props.onValueChange, _c = props.padding, padding = _c === void 0 ? 0 : _c, placeholder = props.placeholder, preClassName = props.preClassName, readOnly = props.readOnly, required = props.required, style = props.style, _d = props.tabSize, tabSize = _d === void 0 ? 2 : _d, textareaClassName = props.textareaClassName, textareaId = props.textareaId, value = props.value, rest = __rest(props, ["autoFocus", "disabled", "form", "highlight", "ignoreTabKey", "insertSpaces", "maxLength", "minLength", "name", "onBlur", "onClick", "onFocus", "onKeyDown", "onKeyUp", "onValueChange", "padding", "placeholder", "preClassName", "readOnly", "required", "style", "tabSize", "textareaClassName", "textareaId", "value"]);
    var historyRef = React.useRef({
        stack: [],
        offset: -1,
    });
    var inputRef = React.useRef(null);
    var _e = React.useState(true), capture = _e[0], setCapture = _e[1];
    var contentStyle = {
        paddingTop: typeof padding === 'object' ? padding.top : padding,
        paddingRight: typeof padding === 'object' ? padding.right : padding,
        paddingBottom: typeof padding === 'object' ? padding.bottom : padding,
        paddingLeft: typeof padding === 'object' ? padding.left : padding,
    };
    var highlighted = highlight(value);
    var getLines = function (text, position) {
        return text.substring(0, position).split('\n');
    };
    var recordChange = React.useCallback(function (record, overwrite) {
        var _a, _b, _c;
        if (overwrite === void 0) { overwrite = false; }
        var _d = historyRef.current, stack = _d.stack, offset = _d.offset;
        if (stack.length && offset > -1) {
            // When something updates, drop the redo operations
            historyRef.current.stack = stack.slice(0, offset + 1);
            // Limit the number of operations to 100
            var count = historyRef.current.stack.length;
            if (count > HISTORY_LIMIT) {
                var extras = count - HISTORY_LIMIT;
                historyRef.current.stack = stack.slice(extras, count);
                historyRef.current.offset = Math.max(historyRef.current.offset - extras, 0);
            }
        }
        var timestamp = Date.now();
        if (overwrite) {
            var last = historyRef.current.stack[historyRef.current.offset];
            if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
                // A previous entry exists and was in short interval
                // Match the last word in the line
                var re = /[^a-z0-9]([a-z0-9]+)$/i;
                // Get the previous line
                var previous = (_a = getLines(last.value, last.selectionStart)
                    .pop()) === null || _a === void 0 ? void 0 : _a.match(re);
                // Get the current line
                var current = (_b = getLines(record.value, record.selectionStart)
                    .pop()) === null || _b === void 0 ? void 0 : _b.match(re);
                if ((previous === null || previous === void 0 ? void 0 : previous[1]) && ((_c = current === null || current === void 0 ? void 0 : current[1]) === null || _c === void 0 ? void 0 : _c.startsWith(previous[1]))) {
                    // The last word of the previous line and current line match
                    // Overwrite previous entry so that undo will remove whole word
                    historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, record), { timestamp: timestamp });
                    return;
                }
            }
        }
        // Add the new operation to the stack
        historyRef.current.stack.push(__assign(__assign({}, record), { timestamp: timestamp }));
        historyRef.current.offset++;
    }, []);
    var recordCurrentState = React.useCallback(function () {
        var input = inputRef.current;
        if (!input)
            return;
        // Save current state of the input
        var value = input.value, selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
        recordChange({
            value: value,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
        });
    }, [recordChange]);
    var updateInput = function (record) {
        var input = inputRef.current;
        if (!input)
            return;
        // Update values and selection state
        input.value = record.value;
        input.selectionStart = record.selectionStart;
        input.selectionEnd = record.selectionEnd;
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(record.value);
    };
    var applyEdits = function (record) {
        // Save last selection state
        var input = inputRef.current;
        var last = historyRef.current.stack[historyRef.current.offset];
        if (last && input) {
            historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, last), { selectionStart: input.selectionStart, selectionEnd: input.selectionEnd });
        }
        // Save the changes
        recordChange(record);
        updateInput(record);
    };
    var undoEdit = function () {
        var _a = historyRef.current, stack = _a.stack, offset = _a.offset;
        // Get the previous edit
        var record = stack[offset - 1];
        if (record) {
            // Apply the changes and update the offset
            updateInput(record);
            historyRef.current.offset = Math.max(offset - 1, 0);
        }
    };
    var redoEdit = function () {
        var _a = historyRef.current, stack = _a.stack, offset = _a.offset;
        // Get the next edit
        var record = stack[offset + 1];
        if (record) {
            // Apply the changes and update the offset
            updateInput(record);
            historyRef.current.offset = Math.min(offset + 1, stack.length - 1);
        }
    };
    var handleKeyDown = function (e) {
        if (onKeyDown) {
            onKeyDown(e);
            if (e.defaultPrevented) {
                return;
            }
        }
        if (e.key === 'Escape') {
            e.currentTarget.blur();
        }
        var _a = e.currentTarget, value = _a.value, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);
        if (e.key === 'Tab' && !ignoreTabKey && capture) {
            // Prevent focus change
            e.preventDefault();
            if (e.shiftKey) {
                // Unindent selected lines
                var linesBeforeCaret = getLines(value, selectionStart);
                var startLine_1 = linesBeforeCaret.length - 1;
                var endLine_1 = getLines(value, selectionEnd).length - 1;
                var nextValue = value
                    .split('\n')
                    .map(function (line, i) {
                    if (i >= startLine_1 &&
                        i <= endLine_1 &&
                        line.startsWith(tabCharacter)) {
                        return line.substring(tabCharacter.length);
                    }
                    return line;
                })
                    .join('\n');
                if (value !== nextValue) {
                    var startLineText = linesBeforeCaret[startLine_1];
                    applyEdits({
                        value: nextValue,
                        // Move the start cursor if first line in selection was modified
                        // It was modified only if it started with a tab
                        selectionStart: (startLineText === null || startLineText === void 0 ? void 0 : startLineText.startsWith(tabCharacter))
                            ? selectionStart - tabCharacter.length
                            : selectionStart,
                        // Move the end cursor by total number of characters removed
                        selectionEnd: selectionEnd - (value.length - nextValue.length),
                    });
                }
            }
            else if (selectionStart !== selectionEnd) {
                // Indent selected lines
                var linesBeforeCaret = getLines(value, selectionStart);
                var startLine_2 = linesBeforeCaret.length - 1;
                var endLine_2 = getLines(value, selectionEnd).length - 1;
                var startLineText = linesBeforeCaret[startLine_2];
                applyEdits({
                    value: value
                        .split('\n')
                        .map(function (line, i) {
                        if (i >= startLine_2 && i <= endLine_2) {
                            return tabCharacter + line;
                        }
                        return line;
                    })
                        .join('\n'),
                    // Move the start cursor by number of characters added in first line of selection
                    // Don't move it if it there was no text before cursor
                    selectionStart: startLineText && /\S/.test(startLineText)
                        ? selectionStart + tabCharacter.length
                        : selectionStart,
                    // Move the end cursor by total number of characters added
                    selectionEnd: selectionEnd + tabCharacter.length * (endLine_2 - startLine_2 + 1),
                });
            }
            else {
                var updatedSelection = selectionStart + tabCharacter.length;
                applyEdits({
                    // Insert tab character at caret
                    value: value.substring(0, selectionStart) +
                        tabCharacter +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: updatedSelection,
                    selectionEnd: updatedSelection,
                });
            }
        }
        else if (e.key === 'Backspace') {
            var hasSelection = selectionStart !== selectionEnd;
            var textBeforeCaret = value.substring(0, selectionStart);
            if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
                // Prevent default delete behaviour
                e.preventDefault();
                var updatedSelection = selectionStart - tabCharacter.length;
                applyEdits({
                    // Remove tab character at caret
                    value: value.substring(0, selectionStart - tabCharacter.length) +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: updatedSelection,
                    selectionEnd: updatedSelection,
                });
            }
        }
        else if (e.key === 'Enter') {
            // Ignore selections
            if (selectionStart === selectionEnd) {
                // Get the current line
                var line = getLines(value, selectionStart).pop();
                var matches = line === null || line === void 0 ? void 0 : line.match(/^\s+/);
                if (matches === null || matches === void 0 ? void 0 : matches[0]) {
                    e.preventDefault();
                    // Preserve indentation on inserting a new line
                    var indent = '\n' + matches[0];
                    var updatedSelection = selectionStart + indent.length;
                    applyEdits({
                        // Insert indentation character at caret
                        value: value.substring(0, selectionStart) +
                            indent +
                            value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: updatedSelection,
                        selectionEnd: updatedSelection,
                    });
                }
            }
        }
        else if (e.keyCode === KEYCODE_PARENS ||
            e.keyCode === KEYCODE_BRACKETS ||
            e.keyCode === KEYCODE_QUOTE ||
            e.keyCode === KEYCODE_BACK_QUOTE) {
            var chars = void 0;
            if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
                chars = ['(', ')'];
            }
            else if (e.keyCode === KEYCODE_BRACKETS) {
                if (e.shiftKey) {
                    chars = ['{', '}'];
                }
                else {
                    chars = ['[', ']'];
                }
            }
            else if (e.keyCode === KEYCODE_QUOTE) {
                if (e.shiftKey) {
                    chars = ['"', '"'];
                }
                else {
                    chars = ["'", "'"];
                }
            }
            else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
                chars = ['`', '`'];
            }
            // If text is selected, wrap them in the characters
            if (selectionStart !== selectionEnd && chars) {
                e.preventDefault();
                applyEdits({
                    value: value.substring(0, selectionStart) +
                        chars[0] +
                        value.substring(selectionStart, selectionEnd) +
                        chars[1] +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd + 2,
                });
            }
        }
        else if ((isMacLike
            ? // Trigger undo with ⌘+Z on Mac
                e.metaKey && e.keyCode === KEYCODE_Z
            : // Trigger undo with Ctrl+Z on other platforms
                e.ctrlKey && e.keyCode === KEYCODE_Z) &&
            !e.shiftKey &&
            !e.altKey) {
            e.preventDefault();
            undoEdit();
        }
        else if ((isMacLike
            ? // Trigger redo with ⌘+Shift+Z on Mac
                e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey
            : isWindows
                ? // Trigger redo with Ctrl+Y on Windows
                    e.ctrlKey && e.keyCode === KEYCODE_Y
                : // Trigger redo with Ctrl+Shift+Z on other platforms
                    e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) &&
            !e.altKey) {
            e.preventDefault();
            redoEdit();
        }
        else if (e.keyCode === KEYCODE_M &&
            e.ctrlKey &&
            (isMacLike ? e.shiftKey : true)) {
            e.preventDefault();
            // Toggle capturing tab key so users can focus away
            setCapture(function (prev) { return !prev; });
        }
    };
    var handleChange = function (e) {
        var _a = e.currentTarget, value = _a.value, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        recordChange({
            value: value,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
        }, true);
        onValueChange(value);
    };
    React.useEffect(function () {
        recordCurrentState();
    }, [recordCurrentState]);
    React.useImperativeHandle(ref, function () {
        return {
            get session() {
                return {
                    history: historyRef.current,
                };
            },
            set session(session) {
                historyRef.current = session.history;
            },
        };
    }, []);
    return (React.createElement("div", __assign({}, rest, { style: __assign(__assign({}, styles.container), style) }),
        React.createElement("pre", __assign({ className: preClassName, "aria-hidden": "true", style: __assign(__assign(__assign({}, styles.editor), styles.highlight), contentStyle) }, (typeof highlighted === 'string'
            ? { dangerouslySetInnerHTML: { __html: highlighted + '<br />' } }
            : { children: highlighted }))),
        React.createElement("textarea", { ref: function (c) { return (inputRef.current = c); }, style: __assign(__assign(__assign({}, styles.editor), styles.textarea), contentStyle), className: className + (textareaClassName ? " ".concat(textareaClassName) : ''), id: textareaId, value: value, onChange: handleChange, onKeyDown: handleKeyDown, onClick: onClick, onKeyUp: onKeyUp, onFocus: onFocus, onBlur: onBlur, disabled: disabled, form: form, maxLength: maxLength, minLength: minLength, name: name, placeholder: placeholder, readOnly: readOnly, required: required, autoFocus: autoFocus, autoCapitalize: "off", autoComplete: "off", autoCorrect: "off", spellCheck: false, "data-gramm": false }),
        React.createElement("style", { dangerouslySetInnerHTML: { __html: cssText } })));
});
var styles = {
    container: {
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box',
        padding: 0,
        overflow: 'hidden',
    },
    textarea: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        resize: 'none',
        color: 'inherit',
        overflow: 'hidden',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        WebkitTextFillColor: 'transparent',
    },
    highlight: {
        position: 'relative',
        pointerEvents: 'none',
    },
    editor: {
        margin: 0,
        border: 0,
        background: 'none',
        boxSizing: 'inherit',
        display: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontVariantLigatures: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        tabSize: 'inherit',
        textIndent: 'inherit',
        textRendering: 'inherit',
        textTransform: 'inherit',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
    },
};
exports["default"] = Editor;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ "./src/group-accordion/block.json":
/*!****************************************!*\
  !*** ./src/group-accordion/block.json ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":2,"name":"aab/group-accordion","version":"0.1.0","title":"Group Accordion","category":"accordion-block","description":"Build Accordion and FAQs Easily.","supports":{"html":false,"anchor":false},"example":{"attributes":{"heading":"Accordion Heading"}},"providesContext":{"aagb/accordion-step":"step","aagb/accordion-QaStyle":"QaStyle","aagb/accordion-faqSchema":"faqSchema","aagb/accordion-stepText":"stepText","aagb/accordion-stepCmpltText":"stepCmpltText","aagb/accordion-checkList":"checkList","aagb/accordion-buttonShow":"buttonShow","aagb/accordion-readMoreText":"readText","aagb/accordion-border":"border","aagb/accordion-margins":"margins","aagb/accordion-paddings":"paddings","aagb/accordion-borderRadius":"borderRadius","aagb/accordion-headingColor":"headingColor","aagb/accordion-showIcon":"showIcon","aagb/accordion-iconColor":"iconColor","aagb/accordion-iconBackground":"iconBackground","aagb/accordion-headerBg":"headerBg","aagb/accordion-bodyBg":"bodyBg","aagb/accordion-qIconText":"qIconText","aagb/accordion-qIconColor":"qIconColor","aagb/accordion-qIconBg":"qIconBg","aagb/accordion-aIconText":"aIconText","aagb/accordion-aIconColor":"aIconColor","aagb/accordion-aIconBg":"aIconBg","aagb/accordion-subheadingColor":"subheadingColor","aagb/accordion-contentCount":"contentCount","aagb/accordion-headingBorder":"headingBorder","aagb/accordion-bodyBorder":"bodyBorder","aagb/accordion-categoryList":"categoryList","aagb/accordion-labelsGlobalTextColor":"labelsGlobalTextColor","aagb/accordion-labelsGlobalBgColor":"labelsGlobalBgColor","aagb/accordion-accessibilityOn":"accessibilityOn","aagb/accordion-focusOutlineColor":"focusOutlineColor","aagb/accordion-anchorLinksShow":"anchorLinksShow"},"attributes":{"anchorLinksShow":{"type":"boolean"},"QaStyle":{"type":"boolean"},"uniqueId":{"type":"string"},"activeAccordionBorder":{"type":"object","default":{"width":"1px","color":"#ebebeb","style":"solid"}},"searchShow":{"type":"boolean","default":false},"placeholderText":{"type":"string"},"showAllbtn":{"type":"boolean","default":false},"closeText":{"type":"string","default":"Close all"},"openText":{"type":"string","default":"Show all"},"heading":{"type":"string","default":"Accordion Heading"},"subheading":{"type":"string","default":""},"subheadingColor":{"type":"string"},"activetorClass":{"type":"string","default":"click"},"faqSchema":{"type":"boolean"},"step":{"type":"boolean","default":false},"stepText":{"type":"string","default":"Continue"},"stepCmpltText":{"type":"string","default":"Congratulations, you are done!"},"checkList":{"type":"boolean","default":false},"buttonShow":{"type":"boolean","default":false},"contentCount":{"type":"number","default":300},"readText":{"type":"string","default":"Read More"},"border":{"type":"object"},"paddings":{"type":"object"},"margins":{"type":"object"},"borderRadius":{"type":"number"},"headingColor":{"type":"string"},"headerBg":{"type":"string"},"iconColor":{"type":"string"},"iconBackground":{"type":"string"},"bodyBg":{"type":"string"},"showIcon":{"type":"boolean","default":true},"qIconText":{"type":"string"},"qIconColor":{"type":"string"},"qIconBg":{"type":"string"},"aIconText":{"type":"string"},"aIconColor":{"type":"string"},"aIconBg":{"type":"string"},"customCSS":{"type":"string","default":" "},"openALLBtnPosition":{"type":"string","default":"right_btn"},"headingBorder":{"type":"object"},"bodyBorder":{"type":"object"},"activeBackground":{"type":"string"},"categoryList":{"type":"array"},"filterBtnAlignment":{"type":"string","default":"center_btn"},"filterBtnPosition":{"type":"string","default":"horizontal_filter"},"filterBtnColor":{"type":"string","default":"#0866ff"},"filterBtnBg":{"type":"string","default":"#F4F8FF"},"filterBtnHoverColor":{"type":"string","default":"#0866ff"},"filterBtnHoverBg":{"type":"string","default":"#DDE9FD"},"filterBtnActiveColor":{"type":"string","default":"#F4F8FF"},"filterBtnActiveBg":{"type":"string","default":"#0866ff"},"enableCategoryFilter":{"type":"boolean","default":false},"showMoreBtn":{"type":"boolean","default":false},"showMoreBtnTxt":{"type":"string","default":"Show More"},"showLessBtnTxt":{"type":"string","default":"Show Less"},"itemsToShow":{"type":"number","default":5},"showMoreBtnColor":{"type":"string","default":"#010101"},"showMoreBtnBg":{"type":"string","default":"#eaeaea"},"labelsGlobalTextColor":{"type":"string","default":"#1570EC"},"labelsGlobalBgColor":{"type":"string","default":"#c1d8f7"},"accessibilityOn":{"type":"boolean","default":true},"focusOutlineColor":{"type":"string","default":"#C2DBFE"},"defaultStyles":{"type":"object"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"qa","label":"Q A"},{"name":"aab-style-pro-checked","label":"aab-style-pro-checked"}],"textdomain":"advanced-accordion-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["aagb-group-accordion"],"viewScript":["aagb-accordion-group","aagb-group-accordion-frontend"]}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/group-accordion/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/group-accordion/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/group-accordion/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/group-accordion/save.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deprecated */ "./src/group-accordion/deprecated.js");
/* harmony import */ var _components_icons_block_icons_group_accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/icons/block-icons/group-accordion */ "./src/components/icons/block-icons/group-accordion.js");



/**
 * Internal dependencies
 */





/**
 * Block Registration
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  icon: {
    src: _components_icons_block_icons_group_accordion__WEBPACK_IMPORTED_MODULE_5__["default"],
    foreground: '#77b5f7'
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"],
  deprecated: [{
    "attributes": {
      "anchorLinksShow": {
        "type": "boolean",
        "default": false
      },
      "QaStyle": {
        "type": "boolean",
        "default": false
      },
      "uniqueId": {
        "type": "string"
      },
      "activeAccordionBorder": {
        "type": "object",
        "default": {
          "width": "1px",
          "color": "#ebebeb",
          "style": "solid"
        }
      },
      "searchShow": {
        "type": "boolean",
        "default": false
      },
      "placeholderText": {
        "type": "string"
      },
      "showAllbtn": {
        "type": "boolean",
        "default": false
      },
      "closeText": {
        "type": "string",
        "default": "Close all"
      },
      "openText": {
        "type": "string",
        "default": "Show all"
      },
      "heading": {
        "type": "string",
        "default": "Accordion Heading"
      },
      "subheading": {
        "type": "string",
        "default": ""
      },
      "subheadingColor": {
        "type": "string"
      },
      "activetorClass": {
        "type": "string",
        "default": "click"
      },
      "faqSchema": {
        "type": "boolean",
        "default": false
      },
      "step": {
        "type": "boolean",
        "default": false
      },
      "stepText": {
        "type": "string",
        "default": "Continue"
      },
      "stepCmpltText": {
        "type": "string",
        "default": "Congratulations, you are done!"
      },
      "checkList": {
        "type": "boolean",
        "default": false
      },
      "buttonShow": {
        "type": "boolean",
        "default": false
      },
      "contentCount": {
        "type": "number",
        "default": 300
      },
      "readText": {
        "type": "string",
        "default": "Read More"
      },
      "border": {
        "type": "object",
        "default": {
          "width": "1px",
          "color": "#bcb6b638",
          "style": "solid"
        }
      },
      "paddings": {
        "type": "object",
        "default": {
          "top": "",
          "right": "",
          "left": "",
          "bottom": ""
        }
      },
      "margins": {
        "type": "object",
        "default": {
          "top": "0px",
          "right": "",
          "left": "",
          "bottom": "15px"
        }
      },
      "borderRadius": {
        "type": "number"
      },
      "headingColor": {
        "type": "string"
      },
      "headerBg": {
        "type": "string",
        "default": "#bcb6b638"
      },
      "iconColor": {
        "type": "string"
      },
      "iconBackground": {
        "type": "string"
      },
      "bodyBg": {
        "type": "string"
      },
      "showIcon": {
        "type": "boolean",
        "default": true
      },
      "qIconText": {
        "type": "string",
        "default": "Q"
      },
      "qIconColor": {
        "type": "string",
        "default": "#fff"
      },
      "qIconBg": {
        "type": "string",
        "default": "#505050"
      },
      "aIconText": {
        "type": "string",
        "default": "A"
      },
      "aIconColor": {
        "type": "string",
        "default": "#fff"
      },
      "aIconBg": {
        "type": "string",
        "default": "#f5a623"
      },
      "customCSS": {
        "type": "string",
        "default": ""
      },
      "openALLBtnPosition": {
        "type": "string",
        "default": "right_btn"
      },
      "headingBorder": {
        "type": "object",
        "default": {
          "color": null,
          "style": "solid",
          "width": "0px"
        }
      },
      "bodyBorder": {
        "type": "object",
        "default": {
          "top": {
            "color": "#bcb6b638",
            "style": "solid",
            "width": "1px"
          }
        }
      },
      "activeBackground": {
        "type": "string"
      },
      "categoryList": {
        "type": "array"
      },
      "filterBtnAlignment": {
        "type": "string",
        "default": "center_btn"
      },
      "filterBtnPosition": {
        "type": "string",
        "default": "horizontal_filter"
      },
      "filterBtnColor": {
        "type": "string",
        "default": "#0866ff"
      },
      "filterBtnBg": {
        "type": "string",
        "default": "#10b3d608"
      },
      "filterBtnActiveColor": {
        "type": "string",
        "default": "#fff"
      },
      "filterBtnActiveBg": {
        "type": "string",
        "default": "#0866ff"
      },
      "enableCategoryFilter": {
        "type": "boolean",
        "default": false
      },
      "showMoreBtn": {
        "type": "boolean",
        "default": false
      },
      "showMoreBtnTxt": {
        "type": "string",
        "default": "Show More"
      },
      "showLessBtnTxt": {
        "type": "string",
        "default": "Show Less"
      },
      "itemsToShow": {
        "type": "number",
        "default": 5
      },
      "showMoreBtnColor": {
        "type": "string",
        "default": "#010101"
      },
      "showMoreBtnBg": {
        "type": "string",
        "default": "#eaeaea"
      },
      "labelsGlobalTextColor": {
        "type": "string",
        "default": "#1570EC"
      },
      "labelsGlobalBgColor": {
        "type": "string",
        "default": "#c1d8f7"
      }
    },
    migrate: attributes => {
      if (attributes.accessibilityOn === undefined) attributes.accessibilityOn = true;
      if (attributes.focusOutlineColor === undefined) attributes.focusOutlineColor = "#C2DBFE";
      if (attributes.filterBtnBg === "#10b3d608") attributes.filterBtnBg = "#F4F8FF";
      if (attributes.filterBtnActiveColor === "#fff") attributes.filterBtnActiveColor = "#F4F8FF";
      if (attributes.filterBtnHoverColor === undefined) attributes.filterBtnHoverColor = "#0866ff";
      if (attributes.filterBtnHoverBg === undefined) attributes.filterBtnHoverBg = "#DDE9FD";
      return {
        ...attributes
      };
    },
    save: _deprecated__WEBPACK_IMPORTED_MODULE_4__["default"]
  }]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map