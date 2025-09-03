/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accordion-default/default-attributes.js":
/*!*****************************************************!*\
  !*** ./src/accordion-default/default-attributes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Default Sidebar Settings
const defaultAttributes = {
  activeAccordionBorder: {
    width: "1px",
    color: "#ebebeb",
    style: "solid"
  },
  border: {
    width: '1px',
    color: '#bcb6b638',
    style: 'solid'
  },
  headingBorder: {
    color: null,
    style: 'solid',
    width: '0px'
  },
  bodyBorder: {
    top: {
      color: '#bcb6b638',
      style: 'solid',
      width: '1px'
    }
  },
  paddings: {
    top: '',
    right: '',
    left: '',
    bottom: ''
  },
  margins: {
    top: '0px',
    right: '',
    left: '',
    bottom: '15px'
  },
  borderRadius: null,
  subheadingColor: null,
  headingTag: 'h5',
  headingColor: null,
  headerBg: '#bcb6b638',
  showHeadingIcon: false,
  showIcon: true,
  iconColor: null,
  iconBackground: null,
  bodyBg: null,
  anchorLinkShow: false,
  QaStyle: false,
  aIconText: 'A',
  qIconText: 'Q',
  qIconColor: '#fff',
  qIconBg: '#505050',
  aIconColor: '#fff',
  aIconBg: '#f5a623',
  faqSchema: false,
  iconBorder: {
    width: '0px',
    style: 'solid',
    color: 'transparent'
  },
  iconBorderRadius: '',
  iconFontSize: 23
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultAttributes);

/***/ }),

/***/ "./src/accordion/editor/styles/accordion-body.js":
/*!*******************************************************!*\
  !*** ./src/accordion/editor/styles/accordion-body.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");







function AccordionBodyStylesPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2;
  const {
    QaStyle
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(attributes);
  const bodyBg = (_getAttrDeep = getAttrDeep('bodyBg')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const bodyBorder = (_getAttrDeep2 = getAttrDeep('bodyBorder')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Body', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Background Color', 'advanced-accordion-block'),
    value: bodyBg,
    onChange: bodyBg => setAttributes({
      bodyBg
    }),
    bgValue: undefined,
    onBgChange: undefined,
    innerLabel: ['Background']
  }), !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set Body Border', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_5__["default"],
    onChange: bodyBorder => setAttributes({
      bodyBorder
    }),
    value: bodyBorder
  })));
}

/***/ }),

/***/ "./src/accordion/editor/styles/accordion-head.js":
/*!*******************************************************!*\
  !*** ./src/accordion/editor/styles/accordion-head.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");







function AccordionHeadStylesPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4;
  const {
    QaStyle
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(attributes);
  const headerBg = (_getAttrDeep = getAttrDeep('headerBg')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const headingBorder = (_getAttrDeep2 = getAttrDeep('headingBorder')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  const subheadingColor = (_getAttrDeep3 = getAttrDeep('subheadingColor')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const headingColor = (_getAttrDeep4 = getAttrDeep('headingColor')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : null;
  const aab_premium = aagb_local_object.licensing;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Head', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: "Header Color",
    value: headingColor,
    onChange: headingColor => setAttributes({
      headingColor
    }),
    bgValue: headerBg,
    onBgChange: headerBg => setAttributes({
      headerBg
    })
  }), aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sub Heading Color', 'advanced-accordion-block'),
    value: subheadingColor,
    onChange: subheadingColor => setAttributes({
      subheadingColor
    })
  }), !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderBoxControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_5__["default"],
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set Heading Border', 'advanced-accordion-block'),
    onChange: headingBorder => setAttributes({
      headingBorder
    }),
    value: headingBorder
  }));
}

/***/ }),

/***/ "./src/accordion/editor/styles/accordion-icon.js":
/*!*******************************************************!*\
  !*** ./src/accordion/editor/styles/accordion-icon.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIconsStylesPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../colors */ "./src/colors.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");








function AccordionIconsStylesPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3;
  const {
    showIcon,
    iconBorder,
    iconBorderRadius
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_7__.createAttrGetter)(attributes);
  const iconColor = (_getAttrDeep = getAttrDeep('iconColor')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const iconFontSize = (_getAttrDeep2 = getAttrDeep('iconFontSize')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  const iconBackground = (_getAttrDeep3 = getAttrDeep('iconBackground')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Accordion Icon', 'advanced-accordion-block')
  }, !showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "To change icon style you must select Show Icon in settings tab."), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Color', 'advanced-accordion-block'),
    value: iconColor,
    onChange: iconColor => setAttributes({
      iconColor
    }),
    bgValue: iconBackground,
    onBgChange: iconBackground => setAttributes({
      iconBackground
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
    label: "Font Size",
    value: iconFontSize,
    onChange: value => setAttributes({
      iconFontSize: value
    }),
    min: 20,
    max: 50
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanel, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Border', 'advanced-accordion-block'),
    className: "aab-component-toolpanel",
    resetAll: () => {
      setAttributes({
        iconBorder: {
          "style": "none",
          "width": "0px"
        }
      });
      setAttributes({
        iconBorderRadius: ''
      });
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => iconBorder?.width !== "0px" && !!iconBorder?.width,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Border', 'advanced-accordion-block'),
    onDeselect: () => setAttributes({
      iconBorder: {
        "style": "none",
        "width": "0px"
      }
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderControl, {
    colors: _colors__WEBPACK_IMPORTED_MODULE_6__["default"],
    value: iconBorder,
    onChange: value => {
      setAttributes({
        iconBorder: value
      });
    },
    withSlider: true
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToolsPanelItem, {
    hasValue: () => !!iconBorderRadius,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Border Radius', 'advanced-accordion-block'),
    onDeselect: () => setAttributes({
      iconBorderRadius: ''
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalBorderRadiusControl, {
    values: iconBorderRadius,
    onChange: value => {
      setAttributes({
        iconBorderRadius: value
      });
    }
  })))));
}

/***/ }),

/***/ "./src/accordion/editor/styles/accordion.js":
/*!**************************************************!*\
  !*** ./src/accordion/editor/styles/accordion.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  const onChangeBorder = border => {
    setAttributes({
      border,
      bodyBorder: {
        "top": {
          "color": border.color,
          "style": border.style,
          "width": border.width
        }
      }
    });
  };
  const normalizePx = value => {
    if (typeof value === 'string' && value.endsWith('px')) return value;
    return `${parseInt(value, 10)}px`;
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
        top: normalizePx(newValue.top),
        bottom: normalizePx(newValue.bottom)
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
        top: normalizePx(newValue.top),
        left: normalizePx(newValue.left),
        right: normalizePx(newValue.right),
        bottom: normalizePx(newValue.bottom)
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

/***/ "./src/accordion/editor/styles/qa-icons.js":
/*!*************************************************!*\
  !*** ./src/accordion/editor/styles/qa-icons.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_5__.createAttrGetter)(attributes);
  const qIconColor = (_getAttrDeep = getAttrDeep('qIconColor')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const qIconBg = (_getAttrDeep2 = getAttrDeep('qIconBg')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  const aIconColor = (_getAttrDeep3 = getAttrDeep('aIconColor')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const aIconBg = (_getAttrDeep4 = getAttrDeep('aIconBg')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : null;
  const aab_premium = aagb_local_object.licensing;
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

/***/ "./src/colors.js":
/*!***********************!*\
  !*** ./src/colors.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/components/icons/accordion-default.js":
/*!***************************************************!*\
  !*** ./src/components/icons/accordion-default.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionDefaultIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function AccordionDefaultIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "200",
    height: "200",
    viewBox: "8 9 79 76",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M47.5 9.7948C11.2046 9.7948 9.89899 11.0866 9.89899 47C9.89899 82.9134 11.2046 84.2052 47.5 84.2052C83.7954 84.2052 85.101 82.9134 85.101 47C85.101 11.0866 83.7954 9.7948 47.5 9.7948Z",
    "fill-opacity": "0.7"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 58.717H22.4824C21.9663 58.717 21.5474 59.1218 21.5474 59.6205V66.849C21.5474 67.3478 21.9663 67.7526 22.4824 67.7526H72.7404C73.2566 67.7526 73.6755 67.3478 73.6755 66.849V59.6205C73.6755 59.1209 73.2575 58.717 72.7404 58.717Z",
    fill: "white"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 58.4448H22.4826C21.8121 58.4448 21.267 58.9716 21.267 59.6194V66.8479C21.267 67.4958 21.8121 68.0226 22.4826 68.0226H72.7406C73.411 68.0226 73.9562 67.4958 73.9562 66.8479V59.6194C73.9562 58.9716 73.411 58.4448 72.7406 58.4448ZM22.4826 67.4804C22.1216 67.4804 21.828 67.1967 21.828 66.8479V59.6194C21.828 59.2706 22.1216 58.9869 22.4826 58.9869H72.7406C73.1015 58.9869 73.3951 59.2706 73.3951 59.6194V66.8479C73.3951 67.1967 73.1015 67.4804 72.7406 67.4804H22.4826Z",
    fill: "white",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 26.2486H22.4824C21.9663 26.2486 21.5474 26.6534 21.5474 27.1522V34.3806C21.5474 34.8794 21.9663 35.2842 22.4824 35.2842H72.7404C73.2566 35.2842 73.6755 34.8794 73.6755 34.3806V27.1522C73.6755 26.6534 73.2575 26.2486 72.7404 26.2486Z",
    fill: "white"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 25.9764H22.4826C21.8121 25.9764 21.267 26.5032 21.267 27.151V34.3795C21.267 35.0274 21.8121 35.5542 22.4826 35.5542H72.7406C73.411 35.5542 73.9562 35.0274 73.9562 34.3795V27.151C73.9562 26.5032 73.411 25.9764 72.7406 25.9764ZM22.4826 35.012C22.1216 35.012 21.828 34.7283 21.828 34.3795V27.151C21.828 26.8023 22.1216 26.5185 22.4826 26.5185H72.7406C73.1015 26.5185 73.3951 26.8023 73.3951 27.151V34.3795C73.3951 34.7283 73.1015 35.012 72.7406 35.012H22.4826Z",
    fill: "white",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7404 37.8806H22.4824C21.9663 37.8806 21.5474 38.2854 21.5474 38.7841V55.2181C21.5474 55.7169 21.9663 56.1217 22.4824 56.1217H72.7404C73.2566 56.1217 73.6755 55.7169 73.6755 55.2181V38.7841C73.6755 38.2854 73.2575 37.8806 72.7404 37.8806Z",
    fill: "white"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M72.7406 37.6083H22.4826C21.8121 37.6083 21.267 38.1352 21.267 38.783V55.217C21.267 55.8649 21.8121 56.3916 22.4826 56.3916H72.7406C73.411 56.3916 73.9562 55.8649 73.9562 55.217V38.783C73.9562 38.1352 73.411 37.6083 72.7406 37.6083ZM22.4826 55.8494C22.1216 55.8494 21.828 55.5658 21.828 55.217V38.783C21.828 38.4342 22.1216 38.1505 22.4826 38.1505H72.7406C73.1015 38.1505 73.3951 38.4342 73.3951 38.783V55.217C73.3951 55.5658 73.1015 55.8494 72.7406 55.8494H22.4826ZM26.5609 64.0667H23.5574V63.5246H26.5609V64.0667Z",
    fill: "white",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M26.2971 41.0598H23.2936V40.5176H26.2971V41.0598ZM25.3383 65.2435H24.7773V62.3413H25.3383V65.2435ZM26.5613 31.0329H23.5578V30.4908H26.5613V31.0329Z",
    fill: "white",
    "fill-opacity": "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M25.3402 32.214H24.7791V29.3118H25.3402V32.214Z",
    fill: "black"
  }));
}

/***/ }),

/***/ "./src/tags.js":
/*!*********************!*\
  !*** ./src/tags.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tags = [{
  label: 'h1',
  value: 'h1'
}, {
  label: 'h2',
  value: 'h2'
}, {
  label: 'h3',
  value: 'h3'
}, {
  label: 'h4',
  value: 'h4'
}, {
  label: 'h5',
  value: 'h5'
}, {
  label: 'h6',
  value: 'h6'
}, {
  label: 'p',
  value: 'p'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tags);

/***/ }),

/***/ "./src/utils/global-settings.js":
/*!**************************************!*\
  !*** ./src/utils/global-settings.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/accordion-default/editor.scss":
/*!*******************************************!*\
  !*** ./src/accordion-default/editor.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/colorpicker.scss":
/*!*****************************************!*\
  !*** ./src/components/colorpicker.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/accordion-default/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_attributes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./default-attributes */ "./src/accordion-default/default-attributes.js");
/* harmony import */ var _accordion_editor_styles_accordion_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../accordion/editor/styles/accordion-icon */ "./src/accordion/editor/styles/accordion-icon.js");
/* harmony import */ var _accordion_editor_styles_qa_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../accordion/editor/styles/qa-icons */ "./src/accordion/editor/styles/qa-icons.js");
/* harmony import */ var _accordion_editor_styles_accordion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../accordion/editor/styles/accordion */ "./src/accordion/editor/styles/accordion.js");
/* harmony import */ var _accordion_editor_styles_accordion_head__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../accordion/editor/styles/accordion-head */ "./src/accordion/editor/styles/accordion-head.js");
/* harmony import */ var _accordion_editor_styles_accordion_body__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../accordion/editor/styles/accordion-body */ "./src/accordion/editor/styles/accordion-body.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./editor.scss */ "./src/accordion-default/editor.scss");
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../tags */ "./src/tags.js");
/* harmony import */ var _components_icons_accordion_default__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/icons/accordion-default */ "./src/components/icons/accordion-default.js");

// Import necessary WordPress packages


















const Options = () => {
  const [defaultStyles, setDefaultStyles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(_default_attributes__WEBPACK_IMPORTED_MODULE_8__["default"]); // Current settings
  const {
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/notices');

  // Load saved settings on component mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadSidebarSettings();
  }, []);

  // Load settings from the WordPress database (wp_options)
  const loadSidebarSettings = async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7___default()({
        path: '/wp/v2/settings'
      });
      const savedSettings = data.aab_settings_defaults ? JSON.parse(data.aab_settings_defaults) : null;
      if (!savedSettings) {
        // Save defaultAttributes to database for the first time
        await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7___default()({
          path: '/wp/v2/settings',
          method: 'POST',
          data: {
            aab_settings_defaults: JSON.stringify(_default_attributes__WEBPACK_IMPORTED_MODULE_8__["default"])
          }
        });
        setDefaultStyles(_default_attributes__WEBPACK_IMPORTED_MODULE_8__["default"]);
      } else {
        setDefaultStyles({
          ..._default_attributes__WEBPACK_IMPORTED_MODULE_8__["default"],
          ...savedSettings
        });
      }
    } catch (error) {
      console.error('Error loading sidebar settings:', error);
    }
  };

  // Change a specific setting
  const changeSidebarSetting = updates => {
    setDefaultStyles(prevState => ({
      ...prevState,
      ...updates
    }));
  };
  // Reset to default settings
  const resetSidebarSettings = () => {
    changeSidebarSetting(_default_attributes__WEBPACK_IMPORTED_MODULE_8__["default"]);
  };

  // Save settings to the WordPress database
  const saveSidebarSettings = async () => {
    const settingsToSave = {
      ...defaultStyles
    };
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7___default()({
        path: '/wp/v2/settings',
        method: 'POST',
        data: {
          aab_settings_defaults: JSON.stringify(settingsToSave)
        }
      });
      createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('AAB Global styles saved successfully!', 'advanced-accordion-block'), {
        type: 'snackbar'
      });
      // Reload the page after a short delay to show the notice
      setTimeout(() => {
        window.location.reload();
      }, 800); // delay 1s for snackbar to show
    } catch (error) {
      console.error('Error saving AAB Global styles:', error);
      createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Failed to save AAB Global styles.', 'advanced-accordion-block'), {
        type: 'snackbar'
      });
    }
  };
  const prop = {
    attributes: defaultStyles,
    setAttributes: changeSidebarSetting
  };

  // Check if aab_premium is true
  const aab_premium = aagb_local_object.licensing;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('AAB Global Style', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Settings', 'advanced-accordion-block'),
    initialOpen: false,
    className: aab_premium ? "" : "aab-pro-element"
  }, aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Accordion Layout', 'advanced-accordion-block'),
    value: defaultStyles.QaStyle ? 'QaLayout' : 'default',
    onChange: value => changeSidebarSetting({
      QaStyle: value === 'QaLayout'
    }),
    isBlock: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "default",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Default', 'advanced-accordion-block')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "QaLayout",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Q A', 'advanced-accordion-block')
  })), defaultStyles.QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Set Q Icon Text', 'advanced-accordion-block'),
    value: defaultStyles.qIconText,
    onChange: qIconText => changeSidebarSetting({
      qIconText
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Set A Icon Text', 'advanced-accordion-block'),
    value: defaultStyles.aIconText,
    onChange: aIconText => changeSidebarSetting({
      aIconText
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Select Heading Tag', 'advanced-accordion-block'),
    options: _tags__WEBPACK_IMPORTED_MODULE_15__["default"],
    onChange: headingTag => changeSidebarSetting({
      headingTag
    }),
    value: defaultStyles.headingTag
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Anchor Link', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: defaultStyles.anchorLinkShow && aab_premium,
    onChange: anchorLinkShow => changeSidebarSetting({
      anchorLinkShow
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('FAQ Schema', 'advanced-accordion-block'),
    checked: defaultStyles.faqSchema,
    onChange: faqSchema => changeSidebarSetting({
      faqSchema
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_accordion_editor_styles_qa_icons__WEBPACK_IMPORTED_MODULE_10__["default"], prop), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_accordion_editor_styles_accordion__WEBPACK_IMPORTED_MODULE_11__["default"], prop), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_accordion_editor_styles_accordion_head__WEBPACK_IMPORTED_MODULE_12__["default"], prop), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_accordion_editor_styles_accordion_icon__WEBPACK_IMPORTED_MODULE_9__["default"], prop), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_accordion_editor_styles_accordion_body__WEBPACK_IMPORTED_MODULE_13__["default"], prop), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "custom-css-notice ",
    style: {
      padding: '10px 15px 0 15px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('(Make your desired changes in the global styles, then click ‘Save’ to apply them across your site.)', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    className: "aab-default-sidebar-action",
    justify: "end"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "action-red",
    onClick: resetSidebarSettings
  }, "Reset")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: "action-save",
    variant: "primary",
    onClick: saveSidebarSettings
  }, "Save"))));
};

// Register the plugin
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('accordion-default', {
  render: Options,
  icon: _components_icons_accordion_default__WEBPACK_IMPORTED_MODULE_16__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map