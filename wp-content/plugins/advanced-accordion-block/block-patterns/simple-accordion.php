<?php

register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);


register_block_pattern(
    'advanced-accordion-block/pattern-simple-accordion',
    [
        'title'       => __('Simple Accordion', 'advanced-accordion-block'),
        'description' => __('A description of Pattern Three.', 'advanced-accordion-block'),
        'content'     => '<!-- wp:aab/group-accordion {"anchorLinksShow":false,"QaStyle":false,"uniqueId":"56c19c7f_0","activeAccordionBorder":{"width":"0px","style":"none"},"faqSchema":false,"border":{"width":"0px","style":"none"},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"headerBg":"#bcb6b638","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","customCSS":".aagb__accordion_head{\n  border-radius:6px;\n}","headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"metadata":{"categories":["advanced-accordion-block-category"],"patternName":"advanced-accordion-block/pattern-simple-accordion","name":"Simple Accordion"}} -->
<div class="custom-css-block"><style>.aagb_accordion_56c19c7f_0 { .aagb__accordion_head{
  border-radius:6px;
} }</style></div><style>
        .aagb_accordion_56c19c7f_0 .aagb__accordion_active .aagb__accordion_body {
            
        }
        .aagb_accordion_56c19c7f_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #bcb6b638;
          padding: 14px 25px 14px 25px;
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_56c19c7f_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          
          
          padding: 14px 25px 14px 25px;
          border-top: 0px none undefined; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_56c19c7f_0 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_56c19c7f_0 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          
        }
        .aagb_accordion_56c19c7f_0 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_56c19c7f_0 .aagb__accordion_title {
          margin: 0;
          
        }
        .aagb_accordion_56c19c7f_0 .aagb__accordion_container {
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          margin-top: 0px;
          margin-bottom: 20px;
          border-radius: 6px;
        }
          .aagb_accordion_56c19c7f_0 .aagb__accordion_number{
            
        }
        .aagb_accordion_56c19c7f_0 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_56c19c7f_0 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_56c19c7f_0 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_56c19c7f_0 .aagb__accordion_number{
          
        }
        .aagb_accordion_56c19c7f_0 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_56c19c7f_0 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
      
          .aagb_accordion_56c19c7f_0 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_56c19c7f_0 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="wp-block-aab-group-accordion searchable aagb_accordion_56c19c7f_0 click false" id="group-accordion-56c19c7f_0"><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"heading":"How do I install the Advanced Accordion Block Plugin?","headerBg":"#bcb6b638","anchorLinkShow":false,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">How do I install the Advanced Accordion Block Plugin?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>To install the plugin, go to your WordPress dashboard, navigate to Plugins &gt; Add New, and search for "Advanced Accordion Block." Click Install Now and then Activate. Once activated, the accordion block will be available in the WordPress editor. If installing manually, download the plugin from the WordPress repository, upload the ZIP file via Plugins &gt; Add New &gt; Upload Plugin, and activate it.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"heading":"How do I create an accordion using the plugin?","headerBg":"#bcb6b638","anchorLinkShow":false,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">How do I create an accordion using the plugin?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>To add an accordion, open the WordPress editor and go to the page where you want to insert it. Click the "+" button to add a new block, search for "Advanced Accordion," and select it. Once inserted, click "Add Accordion Item" to create multiple collapsible sections. Customize each item by adding a title, content, and adjusting settings like open/close behavior. Save or publish the page to apply changes.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"heading":"Can I customize the appearance of the accordion?","headerBg":"#bcb6b638","anchorLinkShow":false,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Can I customize the appearance of the accordion?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Yes, the plugin offers extensive customization options. You can modify colors, typography, spacing, and borders to match your website’s design. The accordion behavior can also be adjusted, such as enabling auto-close, setting items to open by default, or allowing multiple sections to be expanded at once. For advanced styling, custom CSS can be applied through the WordPress Customizer or additional CSS settings in the block editor.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"heading":"Can I use this plugin with Elementor, WPBakery, or other page builders?","headerBg":"#bcb6b638","anchorLinkShow":false,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Can I use this plugin with Elementor, WPBakery, or other page builders?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Yes, the Advanced Accordion Block works seamlessly with Gutenberg and can be used inside Elementor using the Gutenberg widget. It is also compatible with WPBakery, Beaver Builder, and Divi, though in these builders, you may need to use shortcodes or embed the accordion within custom HTML blocks. To ensure smooth performance, keep your page builder and WordPress version up to date.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","border":{"width":"0px","style":"none"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"style":"none","width":"0px"}},"paddings":{"top":"14px","left":"25px","right":"25px","bottom":"14px"},"margins":{"top":"0px","bottom":"20px"},"borderRadius":6,"heading":"Why is my accordion not working properly?","headerBg":"#bcb6b638","anchorLinkShow":false,"readMoreText":"Read More","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Why is my accordion not working properly?</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>If your accordion is not functioning correctly, check for plugin conflicts by deactivating other plugins one by one. Ensure that JavaScript is enabled on your site, as the accordion relies on it for expand/collapse functionality. If you are using a caching plugin, clear the cache and refresh the page. Some themes may override default styles, so applying custom CSS may help fix display issues. If the problem persists, enable WordPress debugging to identify any script errors or reach out to the plugin’s support team for further assistance.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item --></div>
<!-- /wp:aab/group-accordion -->',
        'categories'  => ['advanced-accordion-block-category'],
    ]
);
