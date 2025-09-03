/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accordion/deprecated.js":
/*!*************************************!*\
  !*** ./src/accordion/deprecated.js ***!
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/get-border-style */ "./src/utils/get-border-style.js");






const saveDep = props => {
  var _margins$top, _margins$bottom, _paddings$left, _paddings$left2;
  const {
    attributes
  } = props;
  const {
    uniqueId,
    disableAccordion,
    makeActive,
    border,
    margins,
    borderRadius,
    anchorLinkShow,
    headingColor,
    customCSS,
    accessibilityOn,
    focusOutlineColor,
    paddings,
    qIconText,
    qIconColor,
    qIconBg,
    aIconText,
    aIconColor,
    aIconBg,
    heading,
    subheading,
    subheadingColor,
    headingTag,
    anchorPosition,
    showIcon,
    iconClass,
    iconPosition,
    iconColor,
    iconFontSize,
    iconBackground,
    headerBg,
    headingIconImageUrl,
    headingIconAlt,
    showHeadingIcon,
    iconBorder,
    iconBorderRadius,
    QaStyle,
    headingBorder,
    feedbackShow,
    bodyBg,
    feedbacLabel,
    yesBtn,
    noBtn,
    counterShow,
    bodyBorder
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const headingBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__.getBorderStyle)(headingBorder);
  const calculatedHeaderBg = QaStyle && headerBg.toLowerCase() === "#bcb6b638" ? "transparent" : headerBg;
  let subheadingPlaceholder = "";
  const borderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__.getBorderStyle)(border);
  const bodyBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__.getBorderStyle)(bodyBorder);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "custom-css-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("style", null, `#aab_accordion_${uniqueId} { ${customCSS} }`, anchorLinkShow && headingColor && aab_premium && `
                            #aab_accordion_${uniqueId} .aab__accordion_heading .anchorjs-link { 
                              color: ${headingColor};
                            }
                          `, accessibilityOn && focusOutlineColor !== "#C2DBFE" && `#aab_accordion_${uniqueId}:focus-visible {
                              outline: 2px solid ${focusOutlineColor};
                            }
                          `)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
    className: `aab__accordion_container ${disableAccordion ? 'aab__accordion_disabled' : ''} ${accessibilityOn && 'accessibilityOn'} ${makeActive ? `active__accordion_container_${uniqueId} ` : ''}`
  }), {
    style: {
      marginTop: (_margins$top = margins.top) !== null && _margins$top !== void 0 ? _margins$top : '0px',
      marginBottom: (_margins$bottom = margins.bottom) !== null && _margins$bottom !== void 0 ? _margins$bottom : '0px',
      ...(borderRadius && {
        borderRadius: borderRadius + 'px'
      }),
      ...borderStyle // Spread shorthand or individual border values
    },
    id: `aab_accordion_${uniqueId}`,
    role: "button",
    "aria-expanded": makeActive,
    tabIndex: accessibilityOn ? 0 : -1
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aab__accordion_head ${iconPosition} ${makeActive ? 'active' : ''} `,
    style: {
      backgroundColor: headerBg ? calculatedHeaderBg : undefined,
      ...(Object.values(paddings).some(val => val) && {
        padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
      }),
      ...headingBorderStyle
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aab__accordion_heading ${iconPosition} ${anchorPosition}`
  }, showHeadingIcon && headingIconImageUrl && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "heading-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: headingIconImageUrl,
    alt: headingIconAlt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Heading Icon', 'advanced-accordion-block')
  })), QaStyle && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-q",
    style: {
      color: qIconColor,
      backgroundColor: qIconBg
    }
  }, qIconText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-a",
    style: {
      color: aIconColor,
      backgroundColor: aIconBg
    }
  }, aIconText)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "head_content_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "title_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
    tagName: headingTag,
    value: heading,
    className: "aab__accordion_title",
    style: {
      margin: 0,
      color: headingColor
    }
  }), anchorLinkShow && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
    tabIndex: accessibilityOn ? 0 : -1,
    className: "anchorjs-link",
    href: "#"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "dashicons dashicons-admin-links"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
    className: "aab__accordion_subheading",
    tagName: "p",
    placeholder: subheadingPlaceholder,
    value: aab_premium ? subheading : '',
    onFocus: e => {
      if (!aab_premium) {
        e.target.blur(); // Prevent focus if aab_premium is false
      }
    },
    style: {
      margin: "5px 0 0 0",
      color: subheadingColor
    }
  }))), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aab__accordion_icon`,
    style: {
      ...(iconColor && {
        color: iconColor
      }),
      border: iconBorder ? `${iconBorder.width} ${iconBorder.style} ${iconBorder.color}` : '',
      ...(iconBorderRadius && {
        borderRadius: iconBorderRadius
      }),
      ...(iconBackground && {
        backgroundColor: iconBackground
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: `aab__icon dashicons dashicons-${iconClass}`,
    style: {
      fontSize: iconFontSize ? iconFontSize + 'px' : ''
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aab__accordion_body ${makeActive ? `aab__accordion_body--show` : ``} ${makeActive ? `active__accordion_${uniqueId}` : ''}`,
    role: "region",
    style: {
      ...(bodyBg && {
        backgroundColor: bodyBg
      }),
      display: makeActive ? 'block' : 'none',
      ...bodyBorderStyle,
      ...(!QaStyle ? {
        ...(Object.values(paddings).some(val => val) && {
          padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
        })
      } : QaStyle && iconPosition === "aab_left_icon" ? {
        borderTop: 'none !important',
        paddingTop: `0`,
        ...(paddings.bottom && {
          paddingBottom: paddings.bottom
        }),
        ...(paddings.right && {
          paddingRight: paddings.right
        }),
        paddingLeft: `calc(${(_paddings$left = paddings.left) !== null && _paddings$left !== void 0 ? _paddings$left : '15px'} + 140px)`
      } : {
        borderTop: 'none !important',
        paddingTop: `0`,
        ...(paddings.bottom && {
          paddingBottom: paddings.bottom
        }),
        ...(paddings.right && {
          paddingRight: paddings.right
        }),
        paddingLeft: `calc(${(_paddings$left2 = paddings.left) !== null && _paddings$left2 !== void 0 ? _paddings$left2 : '15px'} + 90px)`
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "aab__accordion_component"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.Content, {
    template: [['core/paragraph', {
      content: 'Accordion Content'
    }]]
  }), feedbackShow && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: `feedback-btn-wrap ${accessibilityOn && `accessible-feedback`}`,
    "data-id": uniqueId
  }, feedbacLabel && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, feedbacLabel), yesBtn && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "feedback-btn",
    "data-value": "yes",
    "data-id": uniqueId,
    tabIndex: accessibilityOn ? 0 : -1
  }, yesBtn, counterShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "count"
  }, "--")), noBtn && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "feedback-btn",
    "data-value": "no",
    "data-id": uniqueId,
    tabIndex: accessibilityOn ? 0 : -1
  }, noBtn, counterShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "count"
  }, "--")))))), anchorLinkShow === true && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("script", null, `
								 document.addEventListener("DOMContentLoaded", () => {
                                        var Anchor1 = new AnchorJS();
                                        Anchor1.add('#aab_accordion_${uniqueId} .aab__accordion_heading .title_wrapper');
                                 });
							`));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveDep);

/***/ }),

/***/ "./src/accordion/edit.js":
/*!*******************************!*\
  !*** ./src/accordion/edit.js ***!
  \*******************************/
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
/* harmony import */ var prismjs_themes_prism_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/themes/prism.css */ "./node_modules/prismjs/themes/prism.css");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./output */ "./src/accordion/output/index.js");
/* harmony import */ var _utils_disable_qa_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/disable-qa-button */ "./src/utils/disable-qa-button.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editor */ "./src/accordion/editor/index.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/global-settings */ "./src/utils/global-settings.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");


/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable @wordpress/no-unsafe-wp-apis */

 // For syntax highlighting style








let uniqueCounter = 0;
const Edit = props => {
  const {
    attributes,
    setAttributes,
    clientId
  } = props;
  let numericClientId = clientId.replace(/\D/g, '').slice(0, 5);
  // Ensure numericClientId contains exactly 5 characters
  while (numericClientId.length < 5) {
    numericClientId = '0' + numericClientId;
  }
  // set unique ID
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!attributes.uniqueId) {
      const newUniqueId = `${clientId.slice(0, 8)}_${uniqueCounter++}`;
      setAttributes({
        uniqueId: newUniqueId
      });
    }
    const fetchGlobalSettings = async () => {
      const settings = await (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_9__.loadGlobalSettings)();
      if (JSON.stringify(attributes.defaultStyles) !== JSON.stringify(settings)) {
        setAttributes({
          defaultStyles: settings
        });
      }
    };
    fetchGlobalSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only call disableQAButton once when component mounts if premium is false
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!_utils_constants__WEBPACK_IMPORTED_MODULE_10__.isPro) {
      (0,_utils_disable_qa_button__WEBPACK_IMPORTED_MODULE_7__["default"])();
    }

    // Cleanup on unmount
    return () => {
      if (!_utils_constants__WEBPACK_IMPORTED_MODULE_10__.isPro) {
        (0,_utils_disable_qa_button__WEBPACK_IMPORTED_MODULE_7__.cleanupQAButtonObserver)();
      }
    };
  }, []);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)();
  const hasQaStyle = blockProps.className?.includes('is-style-qa');
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.store);
  const currentBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_8__["default"].Styles, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_8__["default"].Settings, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_output__WEBPACK_IMPORTED_MODULE_6__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    isEditor: true
  }, props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/accordion/editor/index.js":
/*!***************************************!*\
  !*** ./src/accordion/editor/index.js ***!
  \***************************************/
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
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../editor.scss */ "./src/accordion/editor.scss");
/* harmony import */ var prismjs_themes_prism_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/themes/prism.css */ "./node_modules/prismjs/themes/prism.css");
/* harmony import */ var _editor_settings_accordion_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editor/settings/accordion-id */ "./src/accordion/editor/settings/accordion-id.js");
/* harmony import */ var _editor_settings_accordion_status__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editor/settings/accordion-status */ "./src/accordion/editor/settings/accordion-status.js");
/* harmony import */ var _editor_settings_accordion_head__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editor/settings/accordion-head */ "./src/accordion/editor/settings/accordion-head.js");
/* harmony import */ var _editor_settings_anchor_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../editor/settings/anchor-link */ "./src/accordion/editor/settings/anchor-link.js");
/* harmony import */ var _editor_settings_accordion_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../editor/settings/accordion-icon */ "./src/accordion/editor/settings/accordion-icon.js");
/* harmony import */ var _editor_settings_feedback__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editor/settings/feedback */ "./src/accordion/editor/settings/feedback.js");
/* harmony import */ var _editor_settings_faq_schema__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../editor/settings/faq-schema */ "./src/accordion/editor/settings/faq-schema.js");
/* harmony import */ var _editor_settings_qa_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../editor/settings/qa-icons */ "./src/accordion/editor/settings/qa-icons.js");
/* harmony import */ var _editor_styles_qa_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../editor/styles/qa-icons */ "./src/accordion/editor/styles/qa-icons.js");
/* harmony import */ var _editor_styles_accordion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../editor/styles/accordion */ "./src/accordion/editor/styles/accordion.js");
/* harmony import */ var _editor_styles_accordion_head__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../editor/styles/accordion-head */ "./src/accordion/editor/styles/accordion-head.js");
/* harmony import */ var _editor_styles_accordion_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../editor/styles/accordion-icon */ "./src/accordion/editor/styles/accordion-icon.js");
/* harmony import */ var _editor_styles_accordion_body__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../editor/styles/accordion-body */ "./src/accordion/editor/styles/accordion-body.js");
/* harmony import */ var _editor_styles_custom_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../editor/styles/custom-css */ "./src/accordion/editor/styles/custom-css.js");
/* harmony import */ var _settings_accessibility__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./settings/accessibility */ "./src/accordion/editor/settings/accessibility.js");




















function Settings(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_accordion_id__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_accordion_status__WEBPACK_IMPORTED_MODULE_6__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_qa_icons__WEBPACK_IMPORTED_MODULE_12__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_accordion_head__WEBPACK_IMPORTED_MODULE_7__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_anchor_link__WEBPACK_IMPORTED_MODULE_8__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_accordion_icon__WEBPACK_IMPORTED_MODULE_9__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_feedback__WEBPACK_IMPORTED_MODULE_10__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_settings_faq_schema__WEBPACK_IMPORTED_MODULE_11__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accessibility__WEBPACK_IMPORTED_MODULE_19__["default"], props));
}
function Styles(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    group: "styles"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_qa_icons__WEBPACK_IMPORTED_MODULE_13__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_accordion__WEBPACK_IMPORTED_MODULE_14__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_accordion_head__WEBPACK_IMPORTED_MODULE_15__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_accordion_icon__WEBPACK_IMPORTED_MODULE_16__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_accordion_body__WEBPACK_IMPORTED_MODULE_17__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_editor_styles_custom_css__WEBPACK_IMPORTED_MODULE_18__["default"], props));
}
const Editor = {
  Settings,
  Styles
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./src/accordion/editor/settings/accessibility.js":
/*!********************************************************!*\
  !*** ./src/accordion/editor/settings/accessibility.js ***!
  \********************************************************/
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

/***/ "./src/accordion/editor/settings/accordion-head.js":
/*!*********************************************************!*\
  !*** ./src/accordion/editor/settings/accordion-head.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionHeadPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_editor_settings_accordion_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/editor/settings/accordion-head */ "./src/components/editor/settings/accordion-head.js");



function AccordionHeadPanel(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_editor_settings_accordion_head__WEBPACK_IMPORTED_MODULE_2__["default"], props);
}

/***/ }),

/***/ "./src/accordion/editor/settings/accordion-icon.js":
/*!*********************************************************!*\
  !*** ./src/accordion/editor/settings/accordion-icon.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIconPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icons */ "./src/accordion/icons.js");





const iconPositions = [{
  label: 'Right',
  value: 'aab_right_icon'
}, {
  label: 'Left',
  value: 'aab_left_icon'
}];
function AccordionIconPanel({
  attributes,
  setAttributes
}) {
  const {
    showIcon,
    iconClass,
    iconPosition
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion Icon', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Icon', 'advanced-accordion-block'),
    checked: showIcon,
    onChange: showIcon => setAttributes({
      showIcon
    })
  }), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Icon Type', 'advanced-accordion-block'),
    options: _icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    onChange: iconClass => setAttributes({
      iconClass
    }),
    value: iconClass
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon Position', 'advanced-accordion-block'),
    options: iconPositions,
    onChange: iconPosition => {
      setAttributes({
        iconPosition
      });
    },
    value: iconPosition
  })));
}

/***/ }),

/***/ "./src/accordion/editor/settings/accordion-id.js":
/*!*******************************************************!*\
  !*** ./src/accordion/editor/settings/accordion-id.js ***!
  \*******************************************************/
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
    prefix: "aab_accordion"
  }, props));
}

/***/ }),

/***/ "./src/accordion/editor/settings/accordion-status.js":
/*!***********************************************************!*\
  !*** ./src/accordion/editor/settings/accordion-status.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionStatusPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




function AccordionStatusPanel({
  attributes,
  setAttributes
}) {
  const {
    makeActive,
    disableAccordion
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion Status', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Make it Active on Load', 'advanced-accordion-block'),
    checked: makeActive,
    onChange: makeActive => setAttributes({
      makeActive
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Make it a Disable Accordion?', 'advanced-accordion-block'),
    checked: disableAccordion,
    onChange: disableAccordion => setAttributes({
      disableAccordion
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No click event works. This feature is for the frontend only!', 'advanced-accordion-block')
  }));
}

/***/ }),

/***/ "./src/accordion/editor/settings/anchor-link.js":
/*!******************************************************!*\
  !*** ./src/accordion/editor/settings/anchor-link.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnchorLinkPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");





const anchorPositions = [{
  label: 'Left',
  value: 'aab_left_link'
}, {
  label: 'Right',
  value: 'aab_right_link'
}];
function AnchorLinkPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep;
  const {
    anchorPosition,
    QaStyle
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_4__.createAttrGetter)(attributes);
  const anchorLinkShow = (_getAttrDeep = getAttrDeep('anchorLinkShow')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Anchor Link', 'advanced-accordion-block'),
    initialOpen: false,
    className: aab_premium ? "" : "aab-pro-element"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Anchor Link', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: anchorLinkShow && aab_premium,
    onChange: anchorLinkShow => setAttributes({
      anchorLinkShow
    })
  }), anchorLinkShow && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Anchor Icon Position', 'advanced-accordion-block'),
    disabled: !aab_premium,
    options: anchorPositions,
    onChange: anchorPosition => setAttributes({
      anchorPosition
    }),
    value: anchorPosition
  }));
}

/***/ }),

/***/ "./src/accordion/editor/settings/faq-schema.js":
/*!*****************************************************!*\
  !*** ./src/accordion/editor/settings/faq-schema.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FaqSchemaPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");





function FaqSchemaPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_4__.createAttrGetter)(attributes);
  const faqSchema = (_getAttrDeep = getAttrDeep('faqSchema')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('FAQ Schema', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Make it enable', 'advanced-accordion-block'),
    checked: faqSchema,
    onChange: faqSchema => setAttributes({
      faqSchema
    })
  }));
}

/***/ }),

/***/ "./src/accordion/editor/settings/feedback.js":
/*!***************************************************!*\
  !*** ./src/accordion/editor/settings/feedback.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FeedbackPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




function FeedbackPanel({
  attributes,
  setAttributes
}) {
  const {
    feedbackShow,
    feedbacLabel,
    yesBtn,
    noBtn,
    counterShow
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Feedback', 'advanced-accordion-block'),
    initialOpen: false,
    className: aab_premium ? "" : "aab-pro-element"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable / Disable', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: feedbackShow && aab_premium,
    onChange: feedbackShow => setAttributes({
      feedbackShow
    })
  }), feedbackShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label', 'advanced-accordion-block'),
    disabled: !aab_premium,
    value: feedbacLabel,
    onChange: feedbacLabel => setAttributes({
      feedbacLabel
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Yes', 'advanced-accordion-block'),
    disabled: !aab_premium,
    value: yesBtn,
    onChange: yesBtn => setAttributes({
      yesBtn
    }),
    className: "bbpc-control-half yes-btn"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No', 'advanced-accordion-block'),
    disabled: !aab_premium,
    value: noBtn,
    onChange: noBtn => setAttributes({
      noBtn
    }),
    className: "bbpc-control-half no-btn"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Counter', 'advanced-accordion-block'),
    disabled: !aab_premium,
    checked: counterShow && aab_premium,
    onChange: counterShow => setAttributes({
      counterShow
    })
  })));
}

/***/ }),

/***/ "./src/accordion/editor/settings/qa-icons.js":
/*!***************************************************!*\
  !*** ./src/accordion/editor/settings/qa-icons.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QaIconsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");





function QaIconsPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2;
  const {
    QaStyle
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_4__.createAttrGetter)(attributes);
  const qIconText = (_getAttrDeep = getAttrDeep('qIconText')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  const aIconText = (_getAttrDeep2 = getAttrDeep('aIconText')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : null;
  if (!QaStyle) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Q/A Icons', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Q Icon Text', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set Q Icon Text', 'advanced-accordion-block'),
    value: qIconText,
    onChange: qIconText => setAttributes({
      qIconText
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('A Icon Text', 'advanced-accordion-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set A Icon Text', 'advanced-accordion-block'),
    value: aIconText,
    onChange: aIconText => setAttributes({
      aIconText
    })
  }));
}

/***/ }),

/***/ "./src/accordion/editor/styles/accordion-body.js":
/*!*******************************************************!*\
  !*** ./src/accordion/editor/styles/accordion-body.js ***!
  \*******************************************************/
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

"use strict";
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

/***/ "./src/accordion/editor/styles/custom-css.js":
/*!***************************************************!*\
  !*** ./src/accordion/editor/styles/custom-css.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomCssStylesPanel)
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






function CustomCssStylesPanel({
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

/***/ "./src/accordion/editor/styles/qa-icons.js":
/*!*************************************************!*\
  !*** ./src/accordion/editor/styles/qa-icons.js ***!
  \*************************************************/
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

/***/ "./src/accordion/icons.js":
/*!********************************!*\
  !*** ./src/accordion/icons.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const icons = [{
  label: 'Plus Minus',
  value: 'plus-alt2'
}, {
  label: 'Arrow Up Down',
  value: 'arrow-down'
}, {
  label: 'Arrow Up Down Alt',
  value: 'arrow-down-alt2'
}, {
  label: 'Open Close',
  value: 'plus-alt'
}, {
  label: 'Insert Remove',
  value: 'insert'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icons);

/***/ }),

/***/ "./src/accordion/index.js":
/*!********************************!*\
  !*** ./src/accordion/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/accordion/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/accordion/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/accordion/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/accordion/save.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deprecated */ "./src/accordion/deprecated.js");
/* harmony import */ var _components_icons_block_icons_accordion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/icons/block-icons/accordion */ "./src/components/icons/block-icons/accordion.js");




/**
 * Internal dependencies
*/





/**
 * Block Registration
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  icon: {
    src: _components_icons_block_icons_accordion__WEBPACK_IMPORTED_MODULE_6__["default"],
    foreground: '#3E58E1'
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated: [{
    "attributes": {
      "style": {
        "type": "object",
        "default": {
          "border": {
            "color": "#CFCABE",
            "radius": "3px",
            "style": "dash",
            "width": "1px"
          }
        }
      },
      "uniqueId": {
        "type": "string"
      },
      "border": {
        "type": "object",
        "default": {
          "color": "#bcb6b638",
          "style": "solid",
          "width": "1px"
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
        "type": "number",
        "default": "15"
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
      "headingTag": {
        "type": "string",
        "default": "h5"
      },
      "headingColor": {
        "type": "string"
      },
      "headerBg": {
        "type": "string",
        "default": "#bcb6b638"
      },
      "headingIconImageUrl": {
        "type": "string",
        "default": ""
      },
      "headingIconAlt": {
        "type": "string",
        "default": ""
      },
      "showHeadingIcon": {
        "type": "boolean",
        "default": false
      },
      "showIcon": {
        "type": "boolean",
        "default": true
      },
      "anchorLinkShow": {
        "type": "boolean",
        "default": false
      },
      "iconClass": {
        "type": "string",
        "default": "plus-alt2"
      },
      "iconPosition": {
        "type": "string",
        "default": "aab_right_icon"
      },
      "iconFontSize": {
        "type": "number",
        "default": 23
      },
      "iconColor": {
        "type": "string"
      },
      "iconBackground": {
        "type": "string"
      },
      "iconBorder": {
        "type": "object",
        "default": {
          "width": "0px",
          "style": "solid",
          "color": "transparent"
        }
      },
      "iconBorderRadius": {
        "type": "string"
      },
      "bodyBg": {
        "type": "string"
      },
      "makeActive": {
        "type": "boolean",
        "default": false
      },
      "id": {
        "type": "string"
      },
      "linkedAccordion": {
        "type": "boolean",
        "default": false
      },
      "link": {
        "type": "string",
        "default": "#"
      },
      "tab": {
        "type": "boolean",
        "default": false
      },
      "disableAccordion": {
        "type": "boolean",
        "default": false
      },
      "feedbackShow": {
        "type": "boolean",
        "default": false
      },
      "feedbacLabel": {
        "type": "string",
        "default": "Was this answer helpful?"
      },
      "yesBtn": {
        "type": "string",
        "default": "Yes"
      },
      "noBtn": {
        "type": "string",
        "default": "No"
      },
      "counterShow": {
        "type": "boolean",
        "default": false
      },
      "incNumber": {
        "type": "number",
        "default": 1
      },
      "anchorPosition": {
        "type": "string",
        "default": "aab_right_link"
      },
      "faqSchema": {
        "type": "boolean",
        "default": false
      },
      "QaStyle": {
        "type": "boolean",
        "default": false
      },
      "customCSS": {
        "type": "string",
        "default": ""
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
      "accessibilityOn": {
        "type": "boolean",
        "default": true
      },
      "focusOutlineColor": {
        "type": "string",
        "default": "#C2DBFE"
      },
      "defaultStyles": {
        "type": "object"
      }
    },
    save: _deprecated__WEBPACK_IMPORTED_MODULE_5__["default"]
  }]
});

/***/ }),

/***/ "./src/accordion/output/accordion-body.js":
/*!************************************************!*\
  !*** ./src/accordion/output/accordion-body.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionBody)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");







function AccordionBody(props) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4;
  const {
    isEditor,
    attributes
  } = props;
  const InnerBlocks = isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content;
  const EXCLUDED_BLOCKS = ["aab/accordion-item"];
  const ALLOWED_BLOCKS = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.getBlockTypes)().map(block => block.name).filter(blockName => !EXCLUDED_BLOCKS.includes(blockName));
  const {
    uniqueId,
    QaStyle,
    makeActive,
    feedbackShow,
    iconPosition,
    feedbacLabel,
    yesBtn,
    noBtn,
    counterShow,
    accessibilityOn
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(attributes);
  const paddings = (_getAttrDeep = getAttrDeep('paddings')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : {};
  const bodyBg = (_getAttrDeep2 = getAttrDeep('bodyBg')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : '';
  const bodyBorder = (_getAttrDeep3 = getAttrDeep('bodyBorder')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const borderRadius = (_getAttrDeep4 = getAttrDeep('borderRadius')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : null;
  const bodyBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__.getBorderStyle)(bodyBorder);
  const accordionBodyClassName = `aab__accordion_body ${makeActive ? 'aab__accordion_body--show' : ''} ${makeActive ? `active__accordion_${uniqueId}` : ''}`;
  const accordionBodyStyle = {
    display: makeActive ? 'block' : 'none',
    ...(bodyBg ? {
      backgroundColor: bodyBg
    } : {}),
    ...(borderRadius ? {
      borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`
    } : {}),
    ...bodyBorderStyle
  };

  // Padding logic
  const hasPadding = Object.values(paddings).some(val => val);
  if (!QaStyle) {
    if (hasPadding) {
      accordionBodyStyle.padding = `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`;
    }
  } else {
    var _paddings$left;
    accordionBodyStyle.borderTop = 'none !important';
    accordionBodyStyle.paddingTop = '0';
    if (paddings.bottom) accordionBodyStyle.paddingBottom = paddings.bottom;
    if (paddings.right) accordionBodyStyle.paddingRight = paddings.right;
    const leftPad = (_paddings$left = paddings.left) !== null && _paddings$left !== void 0 ? _paddings$left : '15px';
    const offset = iconPosition === 'aab_left_icon' ? '140px' : '90px';
    accordionBodyStyle.paddingLeft = `calc(${leftPad} + ${offset})`;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: accordionBodyClassName,
    role: "region",
    style: accordionBodyStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aab__accordion_component"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: [['core/paragraph', {
      content: 'Accordion Content'
    }]]
  }), feedbackShow && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `feedback-btn-wrap ${accessibilityOn && `accessible-feedback`}`,
    "data-id": uniqueId
  }, feedbacLabel && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, feedbacLabel), yesBtn && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "feedback-btn",
    "data-value": "yes",
    "data-id": uniqueId,
    tabIndex: accessibilityOn ? 0 : -1
  }, yesBtn, counterShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "count"
  }, "--")), noBtn && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "feedback-btn",
    "data-value": "no",
    "data-id": uniqueId,
    tabIndex: accessibilityOn ? 0 : -1
  }, noBtn, counterShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "count"
  }, "--"))))));
}
;

/***/ }),

/***/ "./src/accordion/output/accordion-head.js":
/*!************************************************!*\
  !*** ./src/accordion/output/accordion-head.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionHead)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");







function AccordionHead({
  isEditor,
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4, _getAttrDeep5, _getAttrDeep6, _getAttrDeep7, _getAttrDeep8, _getAttrDeep9, _getAttrDeep10, _getAttrDeep11, _getAttrDeep12, _getAttrDeep13, _getAttrDeep14, _getAttrDeep15, _getAttrDeep16, _getAttrDeep17, _getAttrDeep18, _getAttrDeep19;
  const RichText = isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content;
  const {
    makeActive,
    QaStyle,
    heading,
    subheading,
    anchorPosition,
    showIcon,
    iconClass,
    iconPosition,
    headingIconImageUrl,
    headingIconAlt,
    showHeadingIcon,
    accessibilityOn
  } = attributes;
  const iconClassesMap = {
    "plus-alt": "dismiss",
    "plus-alt2": "minus",
    "arrow-down": "arrow-up",
    "arrow-down-alt2": "arrow-up-alt2",
    "insert": "remove"
  };
  let subheadingPlaceholder = _utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro ? "Write some subheading" : "Subheading Available on Pro";
  if (!isEditor) subheadingPlaceholder = "";
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_5__.createAttrGetter)(attributes);
  const anchorLinkShow = (_getAttrDeep = getAttrDeep('anchorLinkShow')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  const paddings = (_getAttrDeep2 = getAttrDeep('paddings')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : {};
  const qIconColor = (_getAttrDeep3 = getAttrDeep('qIconColor')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : '';
  const qIconBg = (_getAttrDeep4 = getAttrDeep('qIconBg')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : '';
  const aIconText = (_getAttrDeep5 = getAttrDeep('aIconText')) !== null && _getAttrDeep5 !== void 0 ? _getAttrDeep5 : 'A';
  const qIconText = (_getAttrDeep6 = getAttrDeep('qIconText')) !== null && _getAttrDeep6 !== void 0 ? _getAttrDeep6 : 'Q';
  const aIconColor = (_getAttrDeep7 = getAttrDeep('aIconColor')) !== null && _getAttrDeep7 !== void 0 ? _getAttrDeep7 : '';
  const aIconBg = (_getAttrDeep8 = getAttrDeep('aIconBg')) !== null && _getAttrDeep8 !== void 0 ? _getAttrDeep8 : '';
  const subheadingColor = (_getAttrDeep9 = getAttrDeep('subheadingColor')) !== null && _getAttrDeep9 !== void 0 ? _getAttrDeep9 : null;
  const headingColor = (_getAttrDeep10 = getAttrDeep('headingColor')) !== null && _getAttrDeep10 !== void 0 ? _getAttrDeep10 : null;
  const headingTag = (_getAttrDeep11 = getAttrDeep('headingTag')) !== null && _getAttrDeep11 !== void 0 ? _getAttrDeep11 : 'h5';
  const iconColor = (_getAttrDeep12 = getAttrDeep('iconColor')) !== null && _getAttrDeep12 !== void 0 ? _getAttrDeep12 : '';
  const iconFontSize = (_getAttrDeep13 = getAttrDeep('iconFontSize')) !== null && _getAttrDeep13 !== void 0 ? _getAttrDeep13 : null;
  const iconBackground = (_getAttrDeep14 = getAttrDeep('iconBackground')) !== null && _getAttrDeep14 !== void 0 ? _getAttrDeep14 : '';
  const iconBorder = (_getAttrDeep15 = getAttrDeep('iconBorder')) !== null && _getAttrDeep15 !== void 0 ? _getAttrDeep15 : null;
  const iconBorderRadius = (_getAttrDeep16 = getAttrDeep('iconBorderRadius')) !== null && _getAttrDeep16 !== void 0 ? _getAttrDeep16 : null;
  const headingBorder = (_getAttrDeep17 = getAttrDeep('headingBorder')) !== null && _getAttrDeep17 !== void 0 ? _getAttrDeep17 : {};
  const headerBg = (_getAttrDeep18 = getAttrDeep('headerBg')) !== null && _getAttrDeep18 !== void 0 ? _getAttrDeep18 : null;
  const borderRadius = (_getAttrDeep19 = getAttrDeep('borderRadius')) !== null && _getAttrDeep19 !== void 0 ? _getAttrDeep19 : null;
  const headingBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__.getBorderStyle)(headingBorder);
  const calculatedHeaderBg = QaStyle && headerBg?.toLowerCase() === "#bcb6b638" ? "transparent" : headerBg;
  const currentIconClass = makeActive ? iconClassesMap[iconClass] : iconClass;
  const accordionHeadClassName = `aab__accordion_head ${iconPosition} ${makeActive ? 'active' : ''}`;
  const accordionHeadStyle = {
    backgroundColor: calculatedHeaderBg,
    ...headingBorderStyle
  };

  // Add border radius if provided
  if (borderRadius) {
    accordionHeadStyle.borderRadius = `${borderRadius}px ${borderRadius}px 0 0`;
  }

  // Add padding if any padding value is set
  const hasPadding = Object.values(paddings).some(val => val);
  if (hasPadding) {
    accordionHeadStyle.padding = `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: accordionHeadClassName,
    style: accordionHeadStyle
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aab__accordion_heading ${iconPosition} ${anchorPosition}`
  }, showHeadingIcon && headingIconImageUrl && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "heading-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: headingIconImageUrl,
    alt: headingIconAlt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading Icon', 'advanced-accordion-block')
  })), QaStyle && _utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-q",
    style: {
      color: qIconColor,
      backgroundColor: qIconBg
    }
  }, qIconText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-a",
    style: {
      color: aIconColor,
      backgroundColor: aIconBg
    }
  }, aIconText)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "head_content_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "title_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    tagName: headingTag,
    value: heading,
    className: "aab__accordion_title",
    onChange: heading => setAttributes({
      heading
    }),
    style: {
      margin: 0,
      color: headingColor
    }
  }), anchorLinkShow && _utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro && isEditor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    tabIndex: accessibilityOn ? 0 : -1,
    className: "anchorjs-link",
    href: "#"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-admin-links"
  }))), _utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro && (isEditor || !isEditor && subheading !== '') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    className: "aab__accordion_subheading",
    tagName: "p",
    placeholder: subheadingPlaceholder,
    value: _utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro ? subheading : '',
    onChange: value => {
      setAttributes({
        subheading: value
      });
    },
    onFocus: e => {
      if (!_utils_constants__WEBPACK_IMPORTED_MODULE_6__.isPro) {
        e.target.blur(); // Prevent focus if isPro is false
      }
    },
    style: {
      margin: "5px 0 0 0",
      color: subheadingColor
    }
  }))), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aab__accordion_icon`,
    style: {
      ...(iconColor && {
        color: iconColor
      }),
      border: iconBorder ? `${iconBorder.width} ${iconBorder.style} ${iconBorder.color}` : '',
      ...(iconBorderRadius && {
        borderRadius: iconBorderRadius
      }),
      ...(iconBackground && {
        backgroundColor: iconBackground
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `aab__icon dashicons dashicons-${currentIconClass}`,
    style: {
      fontSize: iconFontSize ? iconFontSize + 'px' : ''
    }
  })));
}
;

/***/ }),

/***/ "./src/accordion/output/index.js":
/*!***************************************!*\
  !*** ./src/accordion/output/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Output)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _accordion_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accordion-head */ "./src/accordion/output/accordion-head.js");
/* harmony import */ var _accordion_body__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accordion-body */ "./src/accordion/output/accordion-body.js");
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/constants */ "./src/utils/constants.js");









function Output(props) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4, _getAttrDeep5, _margins$top, _margins$bottom;
  const {
    isEditor,
    attributes
  } = props;
  const useBlockProps = isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save;
  const {
    uniqueId,
    disableAccordion,
    makeActive,
    customCSS,
    accessibilityOn,
    focusOutlineColor
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_7__.createAttrGetter)(attributes);
  const anchorLinkShow = (_getAttrDeep = getAttrDeep('anchorLinkShow')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  const border = (_getAttrDeep2 = getAttrDeep('border')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : {
    width: '1px',
    color: '#bcb6b638',
    style: 'solid'
  };
  const borderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_6__.getBorderStyle)(border);
  const margins = (_getAttrDeep3 = getAttrDeep('margins')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const borderRadius = (_getAttrDeep4 = getAttrDeep('borderRadius')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : null;
  const headingColor = (_getAttrDeep5 = getAttrDeep('headingColor')) !== null && _getAttrDeep5 !== void 0 ? _getAttrDeep5 : null;
  const accordionClassName = `aab__accordion_container ${disableAccordion ? 'aab__accordion_disabled' : ''} ${accessibilityOn ? 'accessibilityOn' : ''} ${makeActive ? `active__accordion_container_${uniqueId}` : ''}`;
  const accordionStyle = {
    marginTop: (_margins$top = margins?.top) !== null && _margins$top !== void 0 ? _margins$top : '0px',
    marginBottom: (_margins$bottom = margins?.bottom) !== null && _margins$bottom !== void 0 ? _margins$bottom : '15px',
    ...(borderRadius ? {
      borderRadius: `${borderRadius}px`
    } : {}),
    ...borderStyle
  };
  const blockProps = useBlockProps({
    className: accordionClassName
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "custom-css-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("style", null, `#aab_accordion_${uniqueId} { ${customCSS} }`, anchorLinkShow && headingColor && _utils_constants__WEBPACK_IMPORTED_MODULE_8__.isPro && `
                            #aab_accordion_${uniqueId} .aab__accordion_heading .anchorjs-link { 
                              color: ${headingColor};
                            }
                          `, accessibilityOn && focusOutlineColor !== "#C2DBFE" && `#aab_accordion_${uniqueId}:focus-visible {
                              outline: 2px solid ${focusOutlineColor};
                            }
                          `)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    style: accordionStyle,
    id: `aab_accordion_${uniqueId}`,
    role: "button",
    "aria-expanded": makeActive,
    tabIndex: accessibilityOn ? 0 : -1
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_accordion_head__WEBPACK_IMPORTED_MODULE_4__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_accordion_body__WEBPACK_IMPORTED_MODULE_5__["default"], props)), anchorLinkShow === true && _utils_constants__WEBPACK_IMPORTED_MODULE_8__.isPro && !isEditor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("script", null, `
								 document.addEventListener("DOMContentLoaded", () => {
                                        var Anchor1 = new AnchorJS();
                                        Anchor1.add('#aab_accordion_${uniqueId} .aab__accordion_heading .title_wrapper');
                                 });
							`));
}
;

/***/ }),

/***/ "./src/accordion/save.js":
/*!*******************************!*\
  !*** ./src/accordion/save.js ***!
  \*******************************/
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
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./output */ "./src/accordion/output/index.js");



const Save = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_output__WEBPACK_IMPORTED_MODULE_2__["default"], props);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

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

/***/ "./src/components/editor/settings/accordion-head.js":
/*!**********************************************************!*\
  !*** ./src/components/editor/settings/accordion-head.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionHeadPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../tags */ "./src/tags.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");







function AccordionHeadPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep;
  const {
    QaStyle,
    showHeadingIcon,
    headingIconImageUrl,
    headingIconAlt
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(attributes);
  const headingTag = (_getAttrDeep = getAttrDeep('headingTag')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion Head', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Heading Tag', 'advanced-accordion-block'),
    options: _tags__WEBPACK_IMPORTED_MODULE_5__["default"],
    onChange: headingTag => setAttributes({
      headingTag
    }),
    value: headingTag
  }), aab_premium && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Heading Icon', 'advanced-accordion-block'),
    checked: showHeadingIcon,
    onChange: () => setAttributes({
      showHeadingIcon: !showHeadingIcon
    })
  }), showHeadingIcon && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
    onSelect: media => {
      setAttributes({
        headingIconImageUrl: media.url,
        headingIconAlt: media.alt
      });
    },
    allowedTypes: ['image'],
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: open,
      variant: "secondary",
      icon: "format-image"
    }, headingIconImageUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Change Heading Icon', 'advanced-accordion-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Heading Icon', 'advanced-accordion-block'))
  })), showHeadingIcon && headingIconImageUrl && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: headingIconImageUrl,
    alt: headingIconAlt || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Heading Icon', 'advanced-accordion-block'),
    style: {
      maxWidth: '100%',
      marginTop: '10px'
    }
  }));
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

/***/ "./src/components/icons/block-icons/accordion.js":
/*!*******************************************************!*\
  !*** ./src/components/icons/block-icons/accordion.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionBlockIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function AccordionBlockIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 16 16",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#3E58E1",
    d: "M0 4v8h16v-8h-16zM15 11h-14v-4h14v4z"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#3E58E1",
    d: "M0 0h16v3h-16v-3z"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "#3E58E1",
    d: "M0 13h16v3h-16v-3z"
  }));
}

/***/ }),

/***/ "./src/tags.js":
/*!*********************!*\
  !*** ./src/tags.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPro: () => (/* binding */ isPro)
/* harmony export */ });
const isPro = !!aagb_local_object.licensing;

/***/ }),

/***/ "./src/utils/disable-qa-button.js":
/*!****************************************!*\
  !*** ./src/utils/disable-qa-button.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanupQAButtonObserver: () => (/* binding */ cleanupQAButtonObserver),
/* harmony export */   "default": () => (/* binding */ disableQAButton)
/* harmony export */ });
// Singleton pattern to ensure only one observer runs
let qaButtonObserver = null;
let isObserverActive = false;

// Debounce function to limit how often the disable operation runs
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

// The actual disable operation
function disableQAButtons() {
  const qaButtons = document.querySelectorAll('.block-editor-block-styles__variants button[aria-label="aab-style-pro-checked"]');
  qaButtons.forEach(button => {
    if (!button.hasAttribute('disabled')) {
      button.setAttribute('disabled', 'disabled');
      const panelBody = button.closest('.components-panel__body');
      if (panelBody && !panelBody.classList.contains('aab-pro-element')) {
        panelBody.classList.add('aab-pro-element');
      }
    }
  });
}

// Debounced version with 100ms delay
const debouncedDisableQAButtons = debounce(disableQAButtons, 100);
function disableQAButton() {
  // If observer is already active, just run the disable operation once and return
  if (isObserverActive) {
    disableQAButtons();
    return;
  }

  // Mark observer as active
  isObserverActive = true;

  // Initial disable
  disableQAButtons();

  // Create observer only once
  qaButtonObserver = new MutationObserver(mutations => {
    let shouldProcess = false;
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          // Only process if the added node is an element and contains relevant classes
          if (node.nodeType === Node.ELEMENT_NODE && (node.classList?.contains('block-editor-block-styles__variants') || node.querySelector?.('.block-editor-block-styles__variants'))) {
            shouldProcess = true;
          }
        });
      }
    });
    if (shouldProcess) {
      debouncedDisableQAButtons();
    }
  });

  // Start observing with more specific options
  qaButtonObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false
  });
}

// Cleanup function to disconnect observer when needed
function cleanupQAButtonObserver() {
  if (qaButtonObserver) {
    qaButtonObserver.disconnect();
    qaButtonObserver = null;
    isObserverActive = false;
  }
}

/***/ }),

/***/ "./src/utils/get-border-style.js":
/*!***************************************!*\
  !*** ./src/utils/get-border-style.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBorderStyle: () => (/* binding */ getBorderStyle)
/* harmony export */ });
const getBorderStyle = input => {
  if (!input) return null;
  const {
    width,
    style,
    color,
    top,
    right,
    bottom,
    left
  } = input;
  if (width && style && color) {
    return {
      border: `${width} ${style} ${color}`
    };
  }
  return {
    borderTop: top ? `${top.width} ${top.style} ${top.color}` : "none",
    borderRight: right ? `${right.width} ${right.style} ${right.color}` : "none",
    borderBottom: bottom ? `${bottom.width} ${bottom.style} ${bottom.color}` : "none",
    borderLeft: left ? `${left.width} ${left.style} ${left.color}` : "none"
  };
};

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

/***/ "./node_modules/prismjs/themes/prism.css":
/*!***********************************************!*\
  !*** ./node_modules/prismjs/themes/prism.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/accordion/editor.scss":
/*!***********************************!*\
  !*** ./src/accordion/editor.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/accordion/style.scss":
/*!**********************************!*\
  !*** ./src/accordion/style.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./src/accordion/block.json":
/*!**********************************!*\
  !*** ./src/accordion/block.json ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":2,"name":"aab/accordion-block","version":"0.1.0","title":"Separate Accordion","category":"accordion-block","description":"Build Accordion and FAQs Easily.","attributes":{"style":{"type":"object","default":{"border":{"color":"#CFCABE","radius":"3px","style":"dash","width":"1px"}}},"uniqueId":{"type":"string"},"border":{"type":"object"},"paddings":{"type":"object"},"margins":{"type":"object"},"borderRadius":{"type":"number"},"qIconText":{"type":"string"},"qIconColor":{"type":"string"},"qIconBg":{"type":"string"},"aIconText":{"type":"string"},"aIconColor":{"type":"string"},"aIconBg":{"type":"string"},"heading":{"type":"string","default":"Accordion Heading"},"subheading":{"type":"string","default":""},"subheadingColor":{"type":"string"},"headingTag":{"type":"string"},"headingColor":{"type":"string"},"headerBg":{"type":"string"},"headingIconImageUrl":{"type":"string","default":""},"headingIconAlt":{"type":"string","default":""},"showHeadingIcon":{"type":"boolean","default":false},"showIcon":{"type":"boolean","default":true},"anchorLinkShow":{"type":"boolean"},"iconClass":{"type":"string","default":"plus-alt2"},"iconPosition":{"type":"string","default":"aab_right_icon"},"iconFontSize":{"type":"number"},"iconColor":{"type":"string"},"iconBackground":{"type":"string"},"iconBorder":{"type":"object"},"iconBorderRadius":{"type":"string"},"bodyBg":{"type":"string"},"makeActive":{"type":"boolean","default":false},"id":{"type":"string"},"linkedAccordion":{"type":"boolean","default":false},"link":{"type":"string","default":"#"},"tab":{"type":"boolean","default":false},"disableAccordion":{"type":"boolean","default":false},"feedbackShow":{"type":"boolean","default":false},"feedbacLabel":{"type":"string","default":"Was this answer helpful?"},"yesBtn":{"type":"string","default":"Yes"},"noBtn":{"type":"string","default":"No"},"counterShow":{"type":"boolean","default":false},"incNumber":{"type":"number","default":1},"anchorPosition":{"type":"string","default":"aab_right_link"},"faqSchema":{"type":"boolean"},"QaStyle":{"type":"boolean"},"customCSS":{"type":"string","default":""},"headingBorder":{"type":"object"},"bodyBorder":{"type":"object"},"accessibilityOn":{"type":"boolean","default":true},"focusOutlineColor":{"type":"string","default":"#C2DBFE"},"defaultStyles":{"type":"object"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"qa","label":"Q A"},{"name":"aab-style-pro-checked","label":"aab-style-pro-checked"}],"editorScript":["file:./index.js","aagb-separate-accordion"],"editorStyle":"file:./index.css","style":["aagb-separate-accordion"],"viewScript":["aagb-separate-accordion"]}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"accordion/index": 0,
/******/ 			"accordion/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkaccordion"] = globalThis["webpackChunkaccordion"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["accordion/style-index"], () => (__webpack_require__("./src/accordion/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map