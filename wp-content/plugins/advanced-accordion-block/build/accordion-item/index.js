/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accordion-item/deprecated.js":
/*!******************************************!*\
  !*** ./src/accordion-item/deprecated.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);


/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-lonely-if */


const saveDep = ({
  attributes
}) => {
  var _paddings$left, _paddings$left2;
  const {
    singleAcdId,
    makeActive,
    border,
    margins,
    paddings,
    borderRadius,
    heading,
    headingTag,
    headingColor,
    showIcon,
    iconClass,
    iconPosition,
    iconColor,
    iconBackground,
    headerBg,
    bodyBg,
    buttonShow,
    anchorPosition,
    contentCount,
    QaStyle,
    qIconText,
    qIconColor,
    qIconBg,
    aIconColor,
    aIconBg,
    aIconText,
    step,
    stepText,
    checkList,
    button_show,
    readMoreText,
    headingIconImageUrl,
    headingIconAlt,
    showHeadingIcon,
    subheading,
    subheadingColor,
    headingBorder,
    bodyBorder,
    selectedCategories,
    enableLabels,
    labels,
    labelsTextColor,
    labelsBgColor
  } = attributes;
  const activeClass = makeActive ? `aagb__accordion_body--show` : '';
  const expandClass = buttonShow ? 'expand' : '';

  // set unique ID
  // initial accordion stage
  let currentIconClass;
  if (makeActive === false) {
    currentIconClass = iconClass;
  } else {
    if (iconClass === 'plus-alt2') {
      currentIconClass = 'minus';
    } else if (iconClass === 'arrow-down') {
      currentIconClass = 'arrow-up';
    } else if (iconClass === 'arrow-down-alt2') {
      currentIconClass = 'arrow-up-alt2';
    } else if (iconClass === 'plus-alt') {
      currentIconClass = 'dismiss';
    } else if (iconClass === 'insert') {
      currentIconClass = 'remove';
    }
  }
  function hexToRgb(hex) {
    if (!hex || hex === "transparent") {
      // Default to white (255, 255, 255)
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return {
      r,
      g,
      b
    };
  }
  const getBorderStyle = border => {
    if (!border) {
      return {};
    }

    // Check for shorthand condition: if all width, style, and color are present
    if (border.width && border.style && border.color) {
      return {
        border: `${border.width} ${border.style} ${border.color}`
      };
    }

    // Construct 4-axis styles if shorthand condition is not met
    return {
      borderTop: border.top ? `${border.top.width} ${border.top.style} ${border.top.color}` : "none",
      borderRight: border.right ? `${border.right.width} ${border.right.style} ${border.right.color}` : "none",
      borderBottom: border.bottom ? `${border.bottom.width} ${border.bottom.style} ${border.bottom.color}` : "none",
      borderLeft: border.left ? `${border.left.width} ${border.left.style} ${border.left.color}` : "none"
    };
  };
  const borderStyle = getBorderStyle(border);
  const headingBorderStyle = getBorderStyle(headingBorder);
  const bodyBorderStyle = getBorderStyle(bodyBorder);
  const renderContent = () => {
    const innerBlocksContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, {
      key: 0,
      className: "aagb__accordion_inner_content"
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: `aagb__accordion_component ${button_show ? "read-more-btn" : ""}`,
      "data-contentCount": button_show ? contentCount : null
    }, innerBlocksContent, button_show && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "aagb_overlay",
      style: {
        background: `linear-gradient(to bottom, rgba(${hexToRgb(bodyBg).r}, ${hexToRgb(bodyBg).g}, ${hexToRgb(bodyBg).b}, 0), rgba(${hexToRgb(bodyBg).r}, ${hexToRgb(bodyBg).g}, ${hexToRgb(bodyBg).b}, 0.9))`
      }
    })));
  };

  // Check if aab_premium is true
  const aab_premium = aagb_local_object.licensing;
  const categoryClassList = () => {
    let list = '';
    if (selectedCategories) {
      selectedCategories.map(function (item) {
        let sanitizedItem = item.toLowerCase() // Convert to lowercase (optional)
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/&/g, 'and') // Replace '&' with 'and'
        .replace(/%/g, 'percent') // Replace '%' with 'percent'
        .replace(/[^a-z0-9-]/g, ''); // Remove all other special characters
        list = list + ` cat_${sanitizedItem}`;
      });
    }
    return list;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("style", null, `.aagb__accordion_container.no-pro-plan .aagb__accordion_body { padding:  10px !important; }`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
    className: `aagb__accordion_container panel ${categoryClassList()} ${step ? 'step' : ''} ${checkList ? 'check-list' : ''} ${makeActive ? 'aagb__accordion_active' : ''} ${QaStyle ? 'style-qa' : ''} `
  }), {
    style: {
      ...borderStyle,
      marginTop: `${margins.top}`,
      marginBottom: `${margins.bottom}`,
      ...(borderRadius && {
        borderRadius: borderRadius + 'px'
      })
    },
    id: singleAcdId !== '' ? singleAcdId : ''
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aagb__accordion_head ${iconPosition} ${subheading && aab_premium ? 'hasSubHeading' : ''} ${makeActive ? 'aagb__accordion_active' : ''}`,
    "data-active": makeActive,
    style: {
      ...(headerBg && {
        backgroundColor: headerBg
      }),
      ...(Object.values(paddings).some(val => val) && {
        padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
      }),
      ...headingBorderStyle
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aagb__accordion_heading ${iconPosition} ${anchorPosition || ''}`
  }, showHeadingIcon && headingIconImageUrl && aab_premium && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "heading-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: headingIconImageUrl,
    alt: headingIconAlt || 'Heading Icon'
  })), aab_premium && QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-q",
    style: {
      color: qIconColor,
      backgroundColor: qIconBg
    }
  }, " ", qIconText, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "icon-a",
    style: {
      color: aIconColor,
      backgroundColor: aIconBg
    }
  }, " ", aIconText, " ")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "head_content_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "title_wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    className: "aagb__accordion_title",
    tagName: headingTag,
    value: heading,
    style: {
      margin: 0,
      color: headingColor
    }
  }), aab_premium && enableLabels && labels?.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "aagb__labels_container"
  }, labels.map(label => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("small", {
      className: "label_name",
      style: {
        color: labelsTextColor,
        backgroundColor: labelsBgColor
      }
    }, label);
  })) : null), subheading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    className: "aagb__accordion_subheading",
    tagName: "p",
    value: subheading,
    style: {
      margin: 0,
      color: subheadingColor
    }
  }))), !showIcon && step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "complete-sign"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "12",
    height: "12",
    x: "0",
    y: "0",
    viewBox: "0 0 511.985 511.985",
    style: "enable-background:new 0 0 512 512",
    xmlSpace: "preserve"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z",
    fill: "#ffffff",
    opacity: "1",
    "data-original": "#000000",
    className: ""
  })))), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aagb__accordion_icon`,
    style: {
      ...(iconColor && {
        color: iconColor
      }),
      ...(iconBackground && {
        backgroundColor: iconBackground
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "aagb__icon_dashicons_box"
  }, step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "complete-sign"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "12",
    height: "12",
    x: "0",
    y: "0",
    viewBox: "0 0 511.985 511.985",
    style: "enable-background:new 0 0 512 512",
    xmlSpace: "preserve"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z",
    fill: "#ffffff",
    opacity: "1",
    "data-original": "#000000",
    className: ""
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: `aagb__icon dashicons dashicons-${currentIconClass}`
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `aagb__accordion_body ${activeClass} ${expandClass} `,
    role: "region",
    style: {
      ...(bodyBg && {
        backgroundColor: bodyBg
      }),
      ...bodyBorderStyle,
      ...(!QaStyle ? {
        ...(Object.values(paddings).some(val => val) && {
          padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
        })
      } : QaStyle && checkList ? {
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
  }, renderContent(), step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "continue"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "step-text"
  }, stepText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "step-down-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    fill: "#ffffff"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 23.724,15.92l-6.11,7.714 c-0.008,0.012-0.012,0.028-0.022,0.040c-0.34,0.434-0.894,0.434-1.234,0L 10.236,15.92c-0.34-0.434-0.34-1.138,0-1.572L 10.24,14.352 C 10.398,14.138, 10.62,14, 10.87,14l 12.22,0 c 0.246,0, 0.466,0.13, 0.624,0.338c 0.004,0.004, 0.008,0.004, 0.010,0.008 C 24.066,14.782, 24.066,15.486, 23.724,15.92z"
  }))))), button_show && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "aagb_button_toggle"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    value: readMoreText,
    style: {
      margin: 0
    }
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveDep);

/***/ }),

/***/ "./src/accordion-item/edit.js":
/*!************************************!*\
  !*** ./src/accordion-item/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./output */ "./src/accordion-item/output/index.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor */ "./src/accordion-item/editor/index.js");
/* harmony import */ var _utils_disable_qa_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/disable-qa-button */ "./src/utils/disable-qa-button.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/global-settings */ "./src/utils/global-settings.js");


/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable @wordpress/no-unsafe-wp-apis */







const Edit = props => {
  const {
    setAttributes,
    context
  } = props;

  // Check if aab_premium is true
  const aab_premium = aagb_local_object.licensing;
  const hasQaStyle = context["aagb/accordion-QaStyle"];
  const hasFaqSchema = context["aagb/accordion-faqSchema"];
  const hasStep = context["aagb/accordion-step"];
  const hasStepText = context["aagb/accordion-stepText"];
  const hasStepCmpltText = context["aagb/accordion-stepCmpltText"];
  const hasCheckList = context["aagb/accordion-checkList"];
  const buttonShowContext = context["aagb/accordion-buttonShow"];
  const readMoreTxt = context["aagb/accordion-readMoreText"];
  const hasBorder = context["aagb/accordion-border"];
  const hasMargins = context["aagb/accordion-margins"];
  const hasPaddings = context["aagb/accordion-paddings"];
  const hasBorderRadius = context["aagb/accordion-borderRadius"];
  const hasHeadingColor = context["aagb/accordion-headingColor"];
  const hasShowIcon = context["aagb/accordion-showIcon"];
  const hasIconColor = context["aagb/accordion-iconColor"];
  const hasIconBackground = context["aagb/accordion-iconBackground"];
  const hasHeaderBg = context["aagb/accordion-headerBg"];
  const hasBodyBg = context["aagb/accordion-bodyBg"];
  const hasQIconText = context["aagb/accordion-qIconText"];
  const hasQIconColor = context["aagb/accordion-qIconColor"];
  const hasQIconBg = context["aagb/accordion-qIconBg"];
  const hasAIconText = context["aagb/accordion-aIconText"];
  const hasAIconColor = context["aagb/accordion-aIconColor"];
  const hasAIconBg = context["aagb/accordion-aIconBg"];
  const hasContentCount = context["aagb/accordion-contentCount"];
  const hasSubheadingColor = context["aagb/accordion-subheadingColor"];
  const hasHeadingBorder = context["aagb/accordion-headingBorder"];
  const hasBodyBorder = context["aagb/accordion-bodyBorder"];
  const hasCategoryList = context["aagb/accordion-categoryList"];
  const hasLabelsGlobalTextColor = context["aagb/accordion-labelsGlobalTextColor"];
  const hasLabelsGlobalBgColor = context["aagb/accordion-labelsGlobalBgColor"];
  const hasAccessibilityOn = context["aagb/accordion-accessibilityOn"];
  const hasFocusOutlineColor = context["aagb/accordion-focusOutlineColor"];
  const hasAnchorLinksShow = context["aagb/accordion-anchorLinksShow"];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      anchorLinkShow: hasAnchorLinksShow
    });
  }, [hasAnchorLinksShow]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      QaStyle: hasQaStyle
    });
  }, [hasQaStyle]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      faqSchema: hasFaqSchema
    });
  }, [hasFaqSchema]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      step: hasStep
    });
  }, [hasStep]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      stepText: hasStepText
    });
  }, [hasStepText]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      stepCmpltText: hasStepCmpltText
    });
  }, [hasStepCmpltText]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      checkList: hasCheckList
    });
  }, [hasCheckList]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      button_show: buttonShowContext
    });
  }, [buttonShowContext]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      readMoreText: readMoreTxt
    });
  }, [readMoreTxt]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      border: hasBorder
    });
  }, [hasBorder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      margins: hasMargins
    });
  }, [hasMargins]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      paddings: hasPaddings
    });
  }, [hasPaddings]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      borderRadius: hasBorderRadius
    });
  }, [hasBorderRadius]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      headingColor: hasHeadingColor
    });
  }, [hasHeadingColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      showIcon: hasShowIcon
    });
  }, [hasShowIcon]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      iconColor: hasIconColor
    });
  }, [hasIconColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      iconBackground: hasIconBackground
    });
  }, [hasIconBackground]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      headerBg: hasHeaderBg
    });
  }, [hasHeaderBg]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      bodyBg: hasBodyBg
    });
  }, [hasBodyBg]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      qIconText: hasQIconText
    });
  }, [hasQIconText]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      qIconColor: hasQIconColor
    });
  }, [hasQIconColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      qIconBg: hasQIconBg
    });
  }, [hasQIconBg]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      aIconText: hasAIconText
    });
  }, [hasAIconText]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      aIconColor: hasAIconColor
    });
  }, [hasAIconColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      aIconBg: hasAIconBg
    });
  }, [hasAIconBg]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      contentCount: hasContentCount
    });
  }, [hasContentCount]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      subheadingColor: hasSubheadingColor
    });
  }, [hasSubheadingColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      headingBorder: hasHeadingBorder
    });
  }, [hasHeadingBorder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      bodyBorder: hasBodyBorder
    });
  }, [hasBodyBorder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      categoryList: hasCategoryList
    });
  }, [hasCategoryList]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      labelsGlobalTextColor: hasLabelsGlobalTextColor
    });
  }, [hasLabelsGlobalTextColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      labelsGlobalBgColor: hasLabelsGlobalBgColor
    });
  }, [hasLabelsGlobalBgColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      accessibilityOn: hasAccessibilityOn
    });
  }, [hasAccessibilityOn]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      focusOutlineColor: hasFocusOutlineColor
    });
  }, [hasFocusOutlineColor]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const fetchGlobalSettings = async () => {
      const settings = await (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_7__.loadGlobalSettings)(); // Fetch global settings

      setAttributes({
        defaultStyles: settings
      });
    };
    fetchGlobalSettings(); // Fetch settings when the component mounts
  }, []);
  if (!aab_premium) (0,_utils_disable_qa_button__WEBPACK_IMPORTED_MODULE_6__["default"])();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_5__["default"].Settings, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_editor__WEBPACK_IMPORTED_MODULE_5__["default"].Styles, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_output__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    isEditor: true
  }, props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/accordion-item/editor/index.js":
/*!********************************************!*\
  !*** ./src/accordion-item/editor/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editor.scss */ "./src/accordion-item/editor.scss");
/* harmony import */ var _settings_accordion_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/accordion-id */ "./src/accordion-item/editor/settings/accordion-id.js");
/* harmony import */ var _settings_labels_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/labels-panel */ "./src/accordion-item/editor/settings/labels-panel.js");
/* harmony import */ var _settings_category_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/category-filter */ "./src/accordion-item/editor/settings/category-filter.js");
/* harmony import */ var _settings_accordion_status__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./settings/accordion-status */ "./src/accordion-item/editor/settings/accordion-status.js");
/* harmony import */ var _settings_accordion_head__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings/accordion-head */ "./src/accordion-item/editor/settings/accordion-head.js");
/* harmony import */ var _settings_anchor_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./settings/anchor-link */ "./src/accordion-item/editor/settings/anchor-link.js");
/* harmony import */ var _settings_accordion_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./settings/accordion-icon */ "./src/accordion-item/editor/settings/accordion-icon.js");












function Settings(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_id__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_labels_panel__WEBPACK_IMPORTED_MODULE_6__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_category_filter__WEBPACK_IMPORTED_MODULE_7__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_status__WEBPACK_IMPORTED_MODULE_8__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_head__WEBPACK_IMPORTED_MODULE_9__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_anchor_link__WEBPACK_IMPORTED_MODULE_10__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_settings_accordion_icon__WEBPACK_IMPORTED_MODULE_11__["default"], props));
}
function Styles(props) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
}
const Editor = {
  Settings,
  Styles
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./src/accordion-item/editor/settings/accordion-head.js":
/*!**************************************************************!*\
  !*** ./src/accordion-item/editor/settings/accordion-head.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/accordion-item/editor/settings/accordion-icon.js":
/*!**************************************************************!*\
  !*** ./src/accordion-item/editor/settings/accordion-icon.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIconPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icons */ "./src/accordion-item/icons.js");





const iconPositions = [{
  label: 'Right',
  value: 'aagb_right_icon'
}, {
  label: 'Left',
  value: 'aagb_left_icon'
}];
function AccordionIconPanel({
  attributes,
  setAttributes
}) {
  const {
    QaStyle,
    showIcon,
    iconClass,
    iconPosition
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion Icon', 'advanced-accordion-block'),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Icon', 'advanced-accordion-block'),
    checked: showIcon,
    onChange: () => setAttributes({
      showIcon: !showIcon
    })
  }), showIcon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Icon Type', 'advanced-accordion-block'),
    options: _icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    onChange: iconClass => setAttributes({
      iconClass
    }),
    value: iconClass
  }), !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon Position', 'advanced-accordion-block'),
    options: iconPositions,
    onChange: iconPosition => setAttributes({
      iconPosition
    }),
    value: iconPosition
  }))));
}

/***/ }),

/***/ "./src/accordion-item/editor/settings/accordion-id.js":
/*!************************************************************!*\
  !*** ./src/accordion-item/editor/settings/accordion-id.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionIdPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function AccordionIdPanel({
  attributes,
  setAttributes
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion ID', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set Accordion ID', 'advanced-accordion-block'),
    value: attributes.singleAcdId,
    onChange: singleAcdId => setAttributes({
      singleAcdId
    })
  })));
}

/***/ }),

/***/ "./src/accordion-item/editor/settings/accordion-status.js":
/*!****************************************************************!*\
  !*** ./src/accordion-item/editor/settings/accordion-status.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionStatusPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function AccordionStatusPanel({
  attributes,
  setAttributes
}) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Accordion Status', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Make it active on load', 'advanced-accordion-block'),
    checked: attributes.makeActive,
    onChange: makeActive => setAttributes({
      makeActive
    })
  })));
}

/***/ }),

/***/ "./src/accordion-item/editor/settings/anchor-link.js":
/*!***********************************************************!*\
  !*** ./src/accordion-item/editor/settings/anchor-link.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnchorLinkPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/global-settings */ "./src/utils/global-settings.js");





const anchorPositions = [{
  label: 'Left',
  value: 'aagb_left_link'
}, {
  label: 'Right',
  value: 'aagb_right_link'
}];
function AnchorLinkPanel({
  attributes,
  setAttributes
}) {
  var _getAttrDeep;
  const {
    QaStyle,
    anchorPosition,
    step
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_4__.createAttrGetter)(attributes);
  const anchorLinkShow = (_getAttrDeep = getAttrDeep('anchorLinkShow')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  if (!anchorLinkShow || step || QaStyle) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Anchor Link', 'advanced-accordion-block'),
    initialOpen: false,
    className: !aab_premium ? 'aab-pro-element' : ''
  }, anchorLinkShow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Anchor Icon Position', 'advanced-accordion-block'),
    disabled: !aab_premium,
    options: anchorPositions,
    onChange: anchorPosition => setAttributes({
      anchorPosition
    }),
    value: anchorPosition
  }))));
}

/***/ }),

/***/ "./src/accordion-item/editor/settings/category-filter.js":
/*!***************************************************************!*\
  !*** ./src/accordion-item/editor/settings/category-filter.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryFilterPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




function CategoryFilterPanel({
  attributes,
  setAttributes
}) {
  const {
    categoryList,
    selectedCategories
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  if (!categoryList) return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Category Filter', 'advanced-accordion-block')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    __experimentalShowHowTo: false,
    __experimentalValidateInput: input => categoryList.includes(input),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set Category Tag', 'advanced-accordion-block'),
    onChange: state => {
      setAttributes({
        selectedCategories: state
      });
    },
    className: "aab_component_form_token_selector",
    suggestions: categoryList,
    value: selectedCategories,
    disabled: !aab_premium
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "aab__sublabel"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(Set tags in the parent block first. They will appear here for selection.)', 'advanced-accordion-block'))));
}

/***/ }),

/***/ "./src/accordion-item/editor/settings/labels-panel.js":
/*!************************************************************!*\
  !*** ./src/accordion-item/editor/settings/labels-panel.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LabelsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/aab-colorpicker */ "./src/components/aab-colorpicker.js");





function LabelsPanel({
  attributes,
  setAttributes
}) {
  const {
    enableLabels,
    labels,
    labelsTextColor,
    labelsBgColor
  } = attributes;
  const aab_premium = aagb_local_object.licensing;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    initialOpen: false,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Labels', 'advanced-accordion-block'),
    className: !aab_premium ? 'aab-pro-element' : ''
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Labels', 'advanced-accordion-block'),
    checked: enableLabels,
    disabled: !aab_premium,
    onChange: enableLabels => setAttributes({
      enableLabels
    })
  }), enableLabels && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormTokenField, {
    __experimentalAutoSelectFirstMatch: true,
    __experimentalExpandOnFocus: true,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Labels', 'advanced-accordion-block'),
    onChange: labels => setAttributes({
      labels
    }),
    suggestions: [],
    value: labels,
    disabled: !aab_premium
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_aab_colorpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'advanced-accordion-block'),
    value: labelsTextColor,
    onChange: labelsTextColor => setAttributes({
      labelsTextColor
    }),
    bgValue: labelsBgColor,
    onBgChange: labelsBgColor => setAttributes({
      labelsBgColor
    })
  }))));
}

/***/ }),

/***/ "./src/accordion-item/icons.js":
/*!*************************************!*\
  !*** ./src/accordion-item/icons.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/accordion-item/index.js":
/*!*************************************!*\
  !*** ./src/accordion-item/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/accordion-item/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/accordion-item/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/accordion-item/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/accordion-item/save.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deprecated */ "./src/accordion-item/deprecated.js");




/**
 * Internal dependencies
 */




/**
 * Block Registration
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  icon: {
    src: 'minus',
    foreground: '#77b5f7'
  },
  usesContext: ["aagb/accordion-QaStyle", "aagb/accordion-faqSchema", "aagb/accordion-step", "aagb/accordion-stepText", "aagb/accordion-stepCmpltText", "aagb/accordion-checkList", "aagb/accordion-anchorLinksShow", "aagb/accordion-buttonShow", "aagb/accordion-readMoreText", "aagb/accordion-border", "aagb/accordion-margins", "aagb/accordion-paddings", "aagb/accordion-borderRadius", "aagb/accordion-headingColor", "aagb/accordion-showIcon", "aagb/accordion-iconColor", "aagb/accordion-iconBackground", "aagb/accordion-headerBg", "aagb/accordion-bodyBg", "aagb/accordion-qIconText", "aagb/accordion-qIconColor", "aagb/accordion-qIconBg", "aagb/accordion-aIconText", "aagb/accordion-aIconColor", "aagb/accordion-aIconBg", "aagb/accordion-contentCount", "aagb/accordion-subheadingColor", "aagb/accordion-headingBorder", "aagb/accordion-bodyBorder", "aagb/accordion-categoryList", "aagb/accordion-labelsGlobalTextColor", "aagb/accordion-labelsGlobalBgColor", "aagb/accordion-accessibilityOn", "aagb/accordion-focusOutlineColor"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated: [{
    "attributes": {
      "QaStyle": {
        "type": "boolean",
        "default": false
      },
      "singleAcdId": {
        "type": "string"
      },
      "border": {
        "type": "object",
        "default": {
          "width": "1px",
          "color": "#bcb6b638",
          "style": "solid"
        }
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
        "type": "string"
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
      "iconClass": {
        "type": "string",
        "default": "plus-alt2"
      },
      "iconPosition": {
        "type": "string",
        "default": "aab_right_icon"
      },
      "iconColor": {
        "type": "string"
      },
      "iconBackground": {
        "type": "string"
      },
      "iconFontSize": {
        "type": "number"
      },
      "bodyBg": {
        "type": "string"
      },
      "makeActive": {
        "type": "boolean",
        "default": false
      },
      "uniqueId": {
        "type": "string"
      },
      "buttonShow": {
        "type": "boolean",
        "default": false
      },
      "anchorLinkShow": {
        "type": "boolean",
        "default": false
      },
      "anchorPosition": {
        "type": "string",
        "default": "aagb_right_link"
      },
      "contentCount": {
        "type": "number",
        "default": 300
      },
      "readMoreText": {
        "type": "string"
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
      "faqSchema": {
        "type": "boolean"
      },
      "step": {
        "type": "boolean"
      },
      "stepText": {
        "type": "string"
      },
      "stepCmpltText": {
        "type": "string",
        "default": "Congratulations, you are done!"
      },
      "checkList": {
        "type": "boolean"
      },
      "button_show": {
        "type": "boolean"
      },
      "selectedCategories": {
        "type": "array",
        "default": []
      },
      "enableLabels": {
        "type": "boolean",
        "default": false
      },
      "labels": {
        "type": "array",
        "default": []
      },
      "labelsTextColor": {
        "type": "string",
        "default": ""
      },
      "labelsBgColor": {
        "type": "string",
        "default": ""
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
      return {
        ...attributes
      };
    },
    save: _deprecated__WEBPACK_IMPORTED_MODULE_5__["default"]
  }]
});

/***/ }),

/***/ "./src/accordion-item/output/accordion-body.js":
/*!*****************************************************!*\
  !*** ./src/accordion-item/output/accordion-body.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _components_icons_step_down__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/step-down */ "./src/components/icons/step-down.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");







function AccordionBody(props) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4, _paddings$left, _paddings$left2;
  const InnerBlocks = props.isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content;
  const EXCLUDED_BLOCKS = ["aab/accordion-item"];
  const ALLOWED_BLOCKS = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.getBlockTypes)().map(block => block.name).filter(blockName => !EXCLUDED_BLOCKS.includes(blockName));
  const aab_premium = aagb_local_object.licensing;
  const {
    makeActive,
    buttonShow,
    contentCount,
    QaStyle,
    step,
    stepText,
    checkList,
    button_show,
    readMoreText
  } = props.attributes;
  const activeClass = makeActive ? `aagb__accordion_body--show` : '';
  const expandClass = buttonShow ? 'expand' : '';
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(props.attributes);
  const bodyBorder = (_getAttrDeep = getAttrDeep('bodyBorder')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : {};
  const paddings = (_getAttrDeep2 = getAttrDeep('paddings')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : {};
  const bodyBg = (_getAttrDeep3 = getAttrDeep('bodyBg')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : {};
  const borderRadius = (_getAttrDeep4 = getAttrDeep('borderRadius')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : {};
  const bodyBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__.getBorderStyle)(bodyBorder);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb__accordion_body ${activeClass} ${expandClass} `,
    role: "region",
    style: {
      borderRadius: borderRadius ? `0 0 ${borderRadius}px ${borderRadius}px` : '0',
      ...(bodyBg && {
        backgroundColor: bodyBg
      }),
      ...bodyBorderStyle,
      ...(!QaStyle ? {
        ...(Object.values(paddings).some(val => val) && {
          padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
        })
      } : QaStyle && checkList ? {
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
        paddingLeft: `calc(${(_paddings$left2 = paddings.left) !== null && _paddings$left2 !== void 0 ? _paddings$left2 : '15px'} + 95px)`
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb__accordion_component ${button_show ? "read-more-btn" : ""}`,
    "data-contentCount": button_show ? contentCount : null
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: [['core/paragraph', {
      content: 'Accordion Content'
    }]],
    className: "aagb__accordion_inner_content"
  }), !props.isEditor && button_show && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb_overlay",
    style: {
      background: `linear-gradient(to bottom, ${bodyBg}00, ${bodyBg}EE)`
    }
  })), button_show && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "aagb_button_toggle"
  }, readMoreText), step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "continue"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "step-text"
  }, stepText), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "step-down-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_step_down__WEBPACK_IMPORTED_MODULE_5__["default"], null)))));
}

/***/ }),

/***/ "./src/accordion-item/output/accordion-head.js":
/*!*****************************************************!*\
  !*** ./src/accordion-item/output/accordion-head.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccordionHead)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_icons_complete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/complete */ "./src/components/icons/complete.js");
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");







const iconClassesMap = {
  "plus-alt": "dismiss",
  "plus-alt2": "minus",
  "arrow-down": "arrow-up",
  "arrow-down-alt2": "arrow-up-alt2",
  "insert": "remove"
};
function AccordionHead({
  isEditor,
  attributes,
  setAttributes
}) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3, _getAttrDeep4, _getAttrDeep5, _getAttrDeep6, _getAttrDeep7, _getAttrDeep8, _getAttrDeep9, _getAttrDeep10, _getAttrDeep11, _getAttrDeep12, _getAttrDeep13, _getAttrDeep14, _getAttrDeep15, _getAttrDeep16, _getAttrDeep17;
  const RichText = isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content;
  const aab_premium = aagb_local_object.licensing;
  const {
    QaStyle,
    makeActive,
    heading,
    showIcon,
    iconClass,
    iconPosition,
    anchorPosition,
    step,
    checkList,
    headingIconImageUrl,
    headingIconAlt,
    showHeadingIcon,
    subheading,
    enableLabels,
    labels,
    labelsTextColor,
    labelsBgColor,
    labelsGlobalTextColor,
    labelsGlobalBgColor,
    accessibilityOn
  } = attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_6__.createAttrGetter)(attributes);
  const anchorLinkShow = (_getAttrDeep = getAttrDeep('anchorLinkShow')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : false;
  const paddings = (_getAttrDeep2 = getAttrDeep('paddings')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : {};
  const headingColor = (_getAttrDeep3 = getAttrDeep('headingColor')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : null;
  const headingTag = (_getAttrDeep4 = getAttrDeep('headingTag')) !== null && _getAttrDeep4 !== void 0 ? _getAttrDeep4 : 'h5';
  const iconColor = (_getAttrDeep5 = getAttrDeep('iconColor')) !== null && _getAttrDeep5 !== void 0 ? _getAttrDeep5 : null;
  const iconBackground = (_getAttrDeep6 = getAttrDeep('iconBackground')) !== null && _getAttrDeep6 !== void 0 ? _getAttrDeep6 : null;
  const headerBg = (_getAttrDeep7 = getAttrDeep('headerBg')) !== null && _getAttrDeep7 !== void 0 ? _getAttrDeep7 : null;
  const aIconText = (_getAttrDeep8 = getAttrDeep('aIconText')) !== null && _getAttrDeep8 !== void 0 ? _getAttrDeep8 : 'A';
  const qIconText = (_getAttrDeep9 = getAttrDeep('qIconText')) !== null && _getAttrDeep9 !== void 0 ? _getAttrDeep9 : 'Q';
  const qIconColor = (_getAttrDeep10 = getAttrDeep('qIconColor')) !== null && _getAttrDeep10 !== void 0 ? _getAttrDeep10 : '';
  const qIconBg = (_getAttrDeep11 = getAttrDeep('qIconBg')) !== null && _getAttrDeep11 !== void 0 ? _getAttrDeep11 : '';
  const aIconColor = (_getAttrDeep12 = getAttrDeep('aIconColor')) !== null && _getAttrDeep12 !== void 0 ? _getAttrDeep12 : '';
  const aIconBg = (_getAttrDeep13 = getAttrDeep('aIconBg')) !== null && _getAttrDeep13 !== void 0 ? _getAttrDeep13 : '';
  const subheadingColor = (_getAttrDeep14 = getAttrDeep('subheadingColor')) !== null && _getAttrDeep14 !== void 0 ? _getAttrDeep14 : null;
  const headingBorder = (_getAttrDeep15 = getAttrDeep('headingBorder')) !== null && _getAttrDeep15 !== void 0 ? _getAttrDeep15 : {
    color: null,
    style: 'solid',
    width: '0px'
  };
  const iconFontSize = (_getAttrDeep16 = getAttrDeep('iconFontSize')) !== null && _getAttrDeep16 !== void 0 ? _getAttrDeep16 : null;
  const borderRadius = (_getAttrDeep17 = getAttrDeep('borderRadius')) !== null && _getAttrDeep17 !== void 0 ? _getAttrDeep17 : {};
  const headingBorderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_5__.getBorderStyle)(headingBorder);
  const currentIconClass = makeActive ? iconClassesMap[iconClass] : iconClass;
  const calculatedHeaderBg = QaStyle && headerBg?.toLowerCase() === "#bcb6b638" ? "transparent" : headerBg;
  let subheadingPlaceholder = aab_premium ? "Write some subheading" : "Subheading Available on Pro";
  if (!isEditor) subheadingPlaceholder = "";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb__accordion_head ${iconPosition} ${subheading && aab_premium ? 'hasSubHeading' : ''} ${makeActive ? 'aagb__accordion_active' : ''}`,
    "data-active": makeActive,
    style: {
      borderRadius: borderRadius ? `${borderRadius}px ${borderRadius}px 0 0` : '0',
      backgroundColor: headerBg ? calculatedHeaderBg : undefined,
      ...(Object.values(paddings).some(v => !!v) && {
        padding: `${paddings.top} ${paddings.left} ${paddings.bottom} ${paddings.right}`
      }),
      ...headingBorderStyle
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb__accordion_heading ${iconPosition} ${anchorPosition || ''}`
  }, aab_premium && checkList && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "checklist-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null)), showHeadingIcon && headingIconImageUrl && aab_premium && !QaStyle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "heading-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: headingIconImageUrl,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(headingIconAlt || 'Heading Icon', 'advanced-accordion-block')
  })), QaStyle && aab_premium && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    className: "aagb__accordion_title",
    tagName: headingTag,
    value: heading,
    onChange: heading => setAttributes({
      heading
    }),
    style: {
      margin: 0,
      color: headingColor
    }
  }), aab_premium && enableLabels && labels?.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb__labels_container"
  }, labels.map(label => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", {
      className: "label_name",
      style: {
        color: labelsTextColor || labelsGlobalTextColor,
        backgroundColor: labelsBgColor || labelsGlobalBgColor
      }
    }, label);
  })) : null, anchorLinkShow && aab_premium && !step && isEditor && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    tabIndex: accessibilityOn ? 0 : -1,
    className: "anchorjs-link",
    href: "#"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "dashicons dashicons-admin-links"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    className: "aagb__accordion_subheading",
    tagName: "p",
    placeholder: subheadingPlaceholder,
    value: aab_premium ? subheading : '',
    onChange: value => {
      setAttributes({
        subheading: value
      });
    },
    onFocus: e => {
      if (!aab_premium) {
        e.target.blur(); // Prevent focus if aab_premium is false
      }
    },
    style: {
      margin: "5px 0 0 0",
      color: subheadingColor
    }
  }))), showIcon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `aagb__accordion_icon`,
    style: {
      ...(iconColor && {
        color: iconColor
      }),
      ...(iconBackground && {
        backgroundColor: iconBackground
      })
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "aagb__icon_dashicons_box"
  }, step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "complete-sign"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_complete__WEBPACK_IMPORTED_MODULE_4__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `aagb__icon dashicons dashicons-${currentIconClass}`,
    style: {
      fontSize: iconFontSize ? iconFontSize + 'px' : ''
    }
  }))) : step && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "complete-sign"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_complete__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
}

/***/ }),

/***/ "./src/accordion-item/output/index.js":
/*!********************************************!*\
  !*** ./src/accordion-item/output/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/get-border-style */ "./src/utils/get-border-style.js");
/* harmony import */ var _accordion_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accordion-head */ "./src/accordion-item/output/accordion-head.js");
/* harmony import */ var _accordion_body__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accordion-body */ "./src/accordion-item/output/accordion-body.js");
/* harmony import */ var _utils_global_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/global-settings */ "./src/utils/global-settings.js");








function Output(props) {
  var _getAttrDeep, _getAttrDeep2, _getAttrDeep3;
  const useBlockProps = props.isEditor ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save;
  const {
    singleAcdId,
    makeActive,
    QaStyle,
    step,
    checkList,
    selectedCategories,
    accessibilityOn
  } = props.attributes;
  const getAttrDeep = (0,_utils_global_settings__WEBPACK_IMPORTED_MODULE_7__.createAttrGetter)(props.attributes);
  const border = (_getAttrDeep = getAttrDeep('border')) !== null && _getAttrDeep !== void 0 ? _getAttrDeep : {};
  const margins = (_getAttrDeep2 = getAttrDeep('margins')) !== null && _getAttrDeep2 !== void 0 ? _getAttrDeep2 : {};
  const borderRadius = (_getAttrDeep3 = getAttrDeep('borderRadius')) !== null && _getAttrDeep3 !== void 0 ? _getAttrDeep3 : {};
  const borderStyle = (0,_utils_get_border_style__WEBPACK_IMPORTED_MODULE_4__.getBorderStyle)(border);
  const categoryClassList = (selectedCategories || []).map(item => {
    return "cat_" + item.toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/&/g, 'and') // Replace '&' with 'and'
    .replace(/%/g, 'percent') // Replace '%' with 'percent'
    .replace(/[^a-z0-9-]/g, ''); // Remove all other special characters
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, useBlockProps({
    className: `aagb__accordion_container panel ${categoryClassList.join(" ")} ${step ? 'step' : ''} ${checkList ? 'check-list' : ''} ${makeActive ? 'aagb__accordion_active' : ''} ${QaStyle ? 'style-qa' : ''} `
  }), {
    tabIndex: accessibilityOn ? 0 : -1,
    style: {
      ...borderStyle,
      ...(borderRadius && {
        borderRadius: borderRadius + 'px'
      }),
      marginTop: `${margins.top}`,
      marginBottom: `${margins.bottom}`
    },
    id: singleAcdId
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_accordion_head__WEBPACK_IMPORTED_MODULE_5__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_accordion_body__WEBPACK_IMPORTED_MODULE_6__["default"], props)));
}

/***/ }),

/***/ "./src/accordion-item/save.js":
/*!************************************!*\
  !*** ./src/accordion-item/save.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./output */ "./src/accordion-item/output/index.js");



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

/***/ "./src/components/editor/settings/accordion-head.js":
/*!**********************************************************!*\
  !*** ./src/components/editor/settings/accordion-head.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/components/icons/complete.js":
/*!******************************************!*\
  !*** ./src/components/icons/complete.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CompleteIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function CompleteIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "12",
    height: "12",
    x: "0",
    y: "0",
    viewBox: "0 0 511.985 511.985",
    xmlSpace: "preserve"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z",
    fill: "#ffffff",
    opacity: "1",
    "data-original": "#000000"
  })));
}

/***/ }),

/***/ "./src/components/icons/step-down.js":
/*!*******************************************!*\
  !*** ./src/components/icons/step-down.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StepDownIcon)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function StepDownIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    fill: "#ffffff"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 23.724,15.92l-6.11,7.714 c-0.008,0.012-0.012,0.028-0.022,0.040c-0.34,0.434-0.894,0.434-1.234,0L 10.236,15.92c-0.34-0.434-0.34-1.138,0-1.572L 10.24,14.352 C 10.398,14.138, 10.62,14, 10.87,14l 12.22,0 c 0.246,0, 0.466,0.13, 0.624,0.338c 0.004,0.004, 0.008,0.004, 0.010,0.008 C 24.066,14.782, 24.066,15.486, 23.724,15.92z"
  })));
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

/***/ "./src/utils/disable-qa-button.js":
/*!****************************************!*\
  !*** ./src/utils/disable-qa-button.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ disableQAButton)
/* harmony export */ });
function disableQAButton() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          // Find the button for the "Q A" style and disable it
          jQuery('.block-editor-block-styles__variants button[aria-label=aab-style-pro-checked]').attr('disabled', 'disabled');
          // add class parent .components-panel__body.is-opened
          jQuery('.block-editor-block-styles__variants button[aria-label=aab-style-pro-checked]').closest('.components-panel__body').addClass('aab-pro-element');
        });
      }
    });
  });

  // Start observing the editor for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/***/ }),

/***/ "./src/utils/get-border-style.js":
/*!***************************************!*\
  !*** ./src/utils/get-border-style.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/accordion-item/editor.scss":
/*!****************************************!*\
  !*** ./src/accordion-item/editor.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/accordion-item/style.scss":
/*!***************************************!*\
  !*** ./src/accordion-item/style.scss ***!
  \***************************************/
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

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/accordion-item/block.json":
/*!***************************************!*\
  !*** ./src/accordion-item/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":2,"name":"aab/accordion-item","version":"0.1.0","title":"Single Accordion","category":"accordion-block","description":"Single Accordion for Group Accordion","parent":["aab/group-accordion"],"supports":{"html":false},"example":{"attributes":{"heading":"Accordion Heading"}},"attributes":{"QaStyle":{"type":"boolean","default":false},"singleAcdId":{"type":"string"},"border":{"type":"object"},"headingBorder":{"type":"object"},"bodyBorder":{"type":"object"},"paddings":{"type":"object"},"margins":{"type":"object"},"borderRadius":{"type":"number"},"heading":{"type":"string","default":"Accordion Heading"},"subheading":{"type":"string","default":""},"subheadingColor":{"type":"string"},"headingTag":{"type":"string"},"headingColor":{"type":"string"},"headerBg":{"type":"string"},"headingIconImageUrl":{"type":"string","default":""},"headingIconAlt":{"type":"string","default":""},"showHeadingIcon":{"type":"boolean","default":false},"showIcon":{"type":"boolean","default":true},"iconClass":{"type":"string","default":"plus-alt2"},"iconPosition":{"type":"string","default":"aab_right_icon"},"iconColor":{"type":"string"},"iconBackground":{"type":"string"},"bodyBg":{"type":"string"},"makeActive":{"type":"boolean","default":false},"uniqueId":{"type":"string"},"buttonShow":{"type":"boolean","default":false},"anchorLinkShow":{"type":"boolean"},"anchorPosition":{"type":"string","default":"aagb_right_link"},"contentCount":{"type":"number","default":300},"readMoreText":{"type":"string"},"qIconText":{"type":"string"},"qIconColor":{"type":"string"},"qIconBg":{"type":"string"},"aIconText":{"type":"string"},"aIconColor":{"type":"string"},"aIconBg":{"type":"string"},"faqSchema":{"type":"boolean"},"step":{"type":"boolean"},"stepText":{"type":"string"},"stepCmpltText":{"type":"string","default":"Congratulations, you are done!"},"checkList":{"type":"boolean"},"button_show":{"type":"boolean"},"selectedCategories":{"type":"array","default":[]},"enableLabels":{"type":"boolean","default":false},"labels":{"type":"array","default":[]},"labelsTextColor":{"type":"string","default":""},"labelsBgColor":{"type":"string","default":""},"labelsGlobalTextColor":{"type":"string","default":"#1570EC"},"labelsGlobalBgColor":{"type":"string","default":"#c1d8f7"},"accessibilityOn":{"type":"boolean","default":true},"focusOutlineColor":{"type":"string","default":"#C2DBFE"},"defaultStyles":{"type":"object"}},"textdomain":"advanced-accordion-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["aagb-group-accordion-item"]}');

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
/******/ 			"accordion-item/index": 0,
/******/ 			"accordion-item/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["accordion-item/style-index"], () => (__webpack_require__("./src/accordion-item/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map