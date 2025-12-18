<?php
$base_url = get_site_url();
register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);

register_block_pattern(
    'advanced-accordion-block/pattern-accordion-next-previous-navigation',
    [
        'title'       => __('Next Previous Navigation', 'advanced-accordion-block'),
        'description' => __('Accordion with next/previous navigation buttons.', 'advanced-accordion-block'),
        'content'     => '<!-- wp:aab/group-accordion {"QaStyle":false,"uniqueId":"e5d80826_1","defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"isFeatureImg":true,"nextPrevious":true,"metadata":{"categories":["advanced-accordion-block-category","premium-advanced-accordion-block"],"patternName":"advanced-accordion-block/pattern-accordion-next-previous-navigation","name":"Next Previous Navigation"}} -->
<div class="custom-css-block"><style>.aagb_accordion_e5d80826_1 {   }</style></div><style>
        .aagb_accordion_e5d80826_1 .aagb__accordion_active .aagb__accordion_body {
            border-top: 1px solid #ebebeb;
        }
        .aagb_accordion_e5d80826_1 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #bcb6b638;
          
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_e5d80826_1 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          
          
          
          border-top: 1px solid #bcb6b638; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_e5d80826_1 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_e5d80826_1 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          
        }
        .aagb_accordion_e5d80826_1 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_e5d80826_1 .aagb__accordion_title {
          margin: 0;
          
        }
        .aagb_accordion_e5d80826_1 .aagb__accordion_container {
          border: 1px solid #bcb6b638;
          margin-top: 0px;
          margin-bottom: 15px;
          
        }
          .aagb_accordion_e5d80826_1 .aagb__accordion_number{
            
        }
        .aagb_accordion_e5d80826_1 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_e5d80826_1 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_e5d80826_1 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_e5d80826_1 .aagb__accordion_number{
          
        }
        .aagb_accordion_e5d80826_1 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_e5d80826_1 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
         .aagb_accordion_e5d80826_1.wp-block-aab-group-accordion.aab-next-previous-enabled{
          padding-left: 50px !important;
            
            
            
        }
        .aagb_accordion_e5d80826_1 .aagb-accordion-next-previous{
          left: 0; top: 50%; transform: translateY(-50%); position: absolute;
            
            
            
        }
        .aagb_accordion_e5d80826_1 .aagb-accordion-previous-icon,.aagb_accordion_e5d80826_1 .aagb-accordion-next-icon {
          background-color: #010101;
          svg{
            fill: #ffffff;
          }
        }
         
        .aagb__group_accordion_container.has_img{
          position: relative; padding-top:80px !important;
          
          .aab-next-previous-enabled{
            position: static;padding-top:0 !important;
            
          }

        }
      
          .aagb_accordion_e5d80826_1 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_e5d80826_1 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="aagb__group_accordion_container "><div class="wp-block-aab-group-accordion searchable aagb_accordion_e5d80826_1 click false aab-feature-img-enabled aab-next-previous-enabled" id="group-accordion-e5d80826_1"><div class="aagb-accordion-next-previous"><div class="aagb-accordion-previous-icon" aria-label="Next"><svg class="icon-control icon-control-chevronup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="36" width="36"><path d="m11 20c0-.3838.1465-.7676.4395-1.0605l5.5-5.5c.5854-.5859 1.5356-.5859 2.1211 0l5.5 5.5c.5859.5859.5859 1.5352 0 2.1211-.5854.5859-1.5356.5859-2.1211 0l-4.4395-4.4395-4.4395 4.4395c-.5854.5859-1.5356.5859-2.1211 0-.293-.293-.4395-.6768-.4395-1.0605z"></path></svg></div><div class="aagb-accordion-next-icon" aria-label="Previous"><svg class="icon-control icon-control-chevrondown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="36" width="36"><path d="m19.0625 22.5597 5.5-5.5076c.5854-.5854.5825-1.5323-.0039-2.1157-.5869-.5835-1.5366-.5815-2.1211.0039l-4.4375 4.4438-4.4375-4.4438c-.5845-.5854-1.5342-.5874-2.1211-.0039-.2944.2922-.4414.676-.4414 1.0598 0 .3818.1455.7637.4375 1.0559l5.5 5.5076c.2813.2815.6636.4403 1.0625.4403s.7812-.1588 1.0625-.4403z"></path></svg></div></div><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"✨ The Introduction: Innovation, Commitment.","makeActive":true,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-1.png') . '","isFeatureImg":true,"nextPrevious":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel  
			 
			aagb__accordion_active" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-1.png') . '" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  aagb__accordion_active" data-active="true"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">✨ The Introduction: Innovation, Commitment.</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-minus"></span></div></div></div><div class="aagb__accordion_body aagb__accordion_body--show  " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p><strong>Who We Are:</strong> Spider-Themes is not merely a company; we are the architects of your digital aspirations. Born from a dedication to crafting world-class WordPress solutions, we empower creation without complexity. We replace the ambiguity of code with the certainty of clean, powerful technology.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-1.png') . '" alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"🚀 The Products: An Ecosystem of Limitless Potential.","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-2.png') . '","isFeatureImg":true,"nextPrevious":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-2.png') . '" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">🚀 The Products: An Ecosystem of Limitless Potential.</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p><strong>The Engine of Creativity:</strong> Our premium collection, designed to elevate your ideas into reality:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>EazyDocs:</strong> The Architecture of Knowledge. Make your information smarter, more accessible, and more intuitive.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Advanced Accordion:</strong> The Beauty of Organised Content. Simple yet powerful, delivering a modern and interactive content dimension, complete with <strong>FAQ Schema</strong> support for superior search visibility.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --><div class="aagb-feature-img-mobile"><img src="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-2.png') . '" alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"💎 Why Spider-Themes: Our Pledge to Superiority.","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-3.png') . '","isFeatureImg":true,"nextPrevious":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-3.png') . '" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">💎 Why Spider-Themes: Our Pledge to Superiority.</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p><strong>1. Design &amp; Engineering:</strong> Like Apple, we pursue meticulous detail in every line of code and user interface, achieving the perfect blend of performance and aesthetics.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2. Accessibility:</strong> High-quality solutions should be within reach. We deliver the absolute best without the prohibitive price tag, ensuring premium features are available at affordable prices.</p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-3.png') . '" alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"✨ Your Journey: It Begins Today.","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"color":null,"style":"solid","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-4.png') . '","isFeatureImg":true,"nextPrevious":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-4.png') . '" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">✨ Your Journey: It Begins Today.</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Are you ready to redefine your digital presence? Every Spider-Themes product instils that confidence and power. Build more than a website—build an experience.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Your Vision. Our Technology. Together, Boundless.</strong></p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="' . esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/next-prev-4.png') . '" alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item --></div><div hidden class="aab-feature-img"><img alt=""/></div></div>
<!-- /wp:aab/group-accordion -->',
        'categories'  => ['advanced-accordion-block-category', 'premium-advanced-accordion-block'],
    ]
);

