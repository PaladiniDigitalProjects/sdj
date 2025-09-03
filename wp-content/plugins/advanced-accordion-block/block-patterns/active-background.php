<?php

register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);


register_block_pattern(
    'advanced-accordion-block/pattern-active-background',
    [
        'title'       => __('Active Background Style', 'advanced-accordion-block'),
        'description' => __('A description of Pattern Two.', 'advanced-accordion-block'),
        'content'     => '<!-- wp:aab/group-accordion {"anchorLinksShow":false,"QaStyle":false,"uniqueId":"86c44ca5_0","activeAccordionBorder":{"width":"0px","style":"none"},"faqSchema":false,"contentCount":137,"border":{"width":"0px","style":"none"},"paddings":{"top":"25px","left":"25px","right":"25px","bottom":"25px"},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":10,"headingColor":"#202442","headerBg":"#ffffff00","iconBackground":"#ffffff","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","customCSS":"\n.aagb__accordion_body .aagb__accordion_component {\n    margin-left: 60px;\n}\n.aagb__accordion_body{\n  padding-top:5px !important;\n}\n.wp-block-aab-accordion-item.aagb__accordion_active .aagb__accordion_head{\n  padding-bottom:5px;\n}\n.wp-block-aab-accordion-item .aagb__accordion_head .aagb__icon_dashicons_box{\n      width: 40px;\n      height: 40px;\n}","headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"activeBackground":"#f0f4fd","defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"metadata":{"categories":["advanced-accordion-block-category"],"patternName":"advanced-accordion-block/pattern-active-background","name":"Active Background Style"}} -->
<div class="custom-css-block"><style>.aagb_accordion_86c44ca5_0 { 
.aagb__accordion_body .aagb__accordion_component {
    margin-left: 60px;
}
.aagb__accordion_body{
  padding-top:5px !important;
}
.wp-block-aab-accordion-item.aagb__accordion_active .aagb__accordion_head{
  padding-bottom:5px;
}
.wp-block-aab-accordion-item .aagb__accordion_head .aagb__icon_dashicons_box{
      width: 40px;
      height: 40px;
} }</style></div><style>
        .aagb_accordion_86c44ca5_0 .aagb__accordion_active .aagb__accordion_body {
            
        }
        .aagb_accordion_86c44ca5_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #ffffff00;
          padding: 25px 25px 25px 25px;
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_86c44ca5_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          
          
          padding: 25px 25px 25px 25px;
          border-top: 0px none undefined; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_86c44ca5_0 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_86c44ca5_0 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          background-color: #ffffff;
        }
        .aagb_accordion_86c44ca5_0 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_86c44ca5_0 .aagb__accordion_title {
          margin: 0;
          color: #202442;
        }
        .aagb_accordion_86c44ca5_0 .aagb__accordion_container {
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          margin-top: 0px;
          margin-bottom: 15px;
          border-radius: 10px;
        }
          .aagb_accordion_86c44ca5_0 .aagb__accordion_number{
            
        }
        .aagb_accordion_86c44ca5_0 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_86c44ca5_0 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_86c44ca5_0 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_86c44ca5_0 .aagb__accordion_number{
          
        }
        .aagb_accordion_86c44ca5_0 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_86c44ca5_0 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
      
          .aagb_accordion_86c44ca5_0 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_86c44ca5_0 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="wp-block-aab-group-accordion searchable aagb_accordion_86c44ca5_0 click false" id="group-accordion-86c44ca5_0"><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"25px","left":"25px","right":"25px","bottom":"25px"},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":10,"heading":"What’s new in AI?","headingColor":"#202442","headerBg":"#ffffff00","iconPosition":"aagb_left_icon","iconBackground":"#ffffff","makeActive":true,"anchorLinkShow":false,"contentCount":137,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel  
			 
			aagb__accordion_active" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aagb_left_icon  aagb__accordion_active" data-active="true"><div class="aagb__accordion_heading aagb_left_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">What’s new in AI?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-minus"></span></div></div></div><div class="aagb__accordion_body aagb__accordion_body--show  " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>AI is now driving breakthroughs in personalized healthcare, autonomous vehicles, and real-time language translation. Its integration into daily apps has never been more seamless.</p>
<!-- /wp:paragraph -->

<!-- wp:button {"style":{"color":{"background":"#6b63ff"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" style="background-color:#6b63ff">Learn More</a></div>
<!-- /wp:button --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"25px","left":"25px","right":"25px","bottom":"25px"},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":10,"heading":"Can my phone last longer?","headingColor":"#202442","headerBg":"#ffffff00","iconPosition":"aagb_left_icon","iconBackground":"#ffffff","anchorLinkShow":false,"contentCount":137,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aagb_left_icon  " data-active="false"><div class="aagb__accordion_heading aagb_left_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Can my phone last longer?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Yes! Extend battery life by reducing screen brightness, closing unused apps, and enabling battery saver mode. Regular updates also optimize performance.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"25px","left":"25px","right":"25px","bottom":"25px"},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":10,"heading":"Is blockchain still relevant outside of cryptocurrency?","headingColor":"#202442","headerBg":"#ffffff00","iconPosition":"aagb_left_icon","iconBackground":"#ffffff","anchorLinkShow":false,"contentCount":137,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aagb_left_icon  " data-active="false"><div class="aagb__accordion_heading aagb_left_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Is blockchain still relevant outside of cryptocurrency?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Absolutely! Blockchain is widely used in supply chain management, digital identity verification, and secure data sharing, proving its versatility beyond cryptocurrencies.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"25px","left":"25px","right":"25px","bottom":"25px"},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":10,"heading":"Is VR worth it now?","headingColor":"#202442","headerBg":"#ffffff00","iconPosition":"aagb_left_icon","iconBackground":"#ffffff","anchorLinkShow":false,"contentCount":137,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aagb_left_icon  " data-active="false"><div class="aagb__accordion_heading aagb_left_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Is VR worth it now?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Virtual reality in 2025 is more immersive, affordable, and practical. It is widely used in gaming, virtual meetings, and even online shopping experiences.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item --></div>
<!-- /wp:aab/group-accordion -->',
        'categories'  => ['advanced-accordion-block-category'],
    ]
);
