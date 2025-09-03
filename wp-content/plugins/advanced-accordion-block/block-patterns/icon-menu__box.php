<?php

$base_url = get_site_url();
register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);


register_block_pattern(
    'advanced-accordion-block/pattern-icon-menu-box',
    [
        'title' => __('Icon Menu Box', 'advanced-accordion-block'),
        'content' => '<!-- wp:aab/group-accordion {"anchorLinksShow":false,"QaStyle":false,"uniqueId":"c9ada2fd_0","faqSchema":false,"paddings":{"top":"0px","left":"0px","right":"0px","bottom":"0px"},"margins":{"top":"1px","bottom":"1px"},"borderRadius":1,"headingColor":"#000000","headerBg":"#ffffff","bodyBg":"#19827f","customCSS":"\n .heading-icon {\n    background: #19827f;\n    width: 60px;\n    height: 60px;\n    align-items: center;\n    display: flex;\n    justify-content:center;\n}\n.aagb__accordion_container{\nborder:none !important;\n}\n.aagb__accordion_component {\n    padding: 20px !important;\n}\n","headingBorder":{"width":"1px"},"bodyBorder":{"width":"0px","style":"none"},"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="custom-css-block"><style>.aagb_accordion_c9ada2fd_0 { 
 .heading-icon {
    background: #19827f;
    width: 60px;
    height: 60px;
    align-items: center;
    display: flex;
    justify-content:center;
}
.aagb__accordion_container{
border:none !important;
}
.aagb__accordion_component {
    padding: 20px !important;
}
 }</style></div><style>
        .aagb_accordion_c9ada2fd_0 .aagb__accordion_active .aagb__accordion_body {
            border-top: 1px solid #ebebeb;
        }
        .aagb_accordion_c9ada2fd_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #ffffff;
          padding: 0px 0px 0px 0px;
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_c9ada2fd_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          background-color: #19827f;
          
          padding: 0px 0px 0px 0px;
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_c9ada2fd_0 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_c9ada2fd_0 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          
        }
        .aagb_accordion_c9ada2fd_0 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_c9ada2fd_0 .aagb__accordion_title {
          margin: 0;
          color: #000000;
        }
        .aagb_accordion_c9ada2fd_0 .aagb__accordion_container {
          border: 1px solid #bcb6b638;
          margin-top: 1px;
          margin-bottom: 1px;
          border-radius: 1px;
        }
          .aagb_accordion_c9ada2fd_0 .aagb__accordion_number{
            
        }
        .aagb_accordion_c9ada2fd_0 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_c9ada2fd_0 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_c9ada2fd_0 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_c9ada2fd_0 .aagb__accordion_number{
          
        }
        .aagb_accordion_c9ada2fd_0 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_c9ada2fd_0 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
      
          .aagb_accordion_c9ada2fd_0 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_c9ada2fd_0 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="wp-block-aab-group-accordion searchable aagb_accordion_c9ada2fd_0 click false" id="group-accordion-c9ada2fd_0"><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","headingBorder":{"width":"1px"},"bodyBorder":{"width":"0px","style":"none"},"paddings":{"top":"0px","left":"0px","right":"0px","bottom":"0px"},"margins":{"top":"1px","bottom":"1px"},"borderRadius":1,"heading":"Manager","headingColor":"#000000","headerBg":"#ffffff","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/setting.png') . ' ","showHeadingIcon":true,"bodyBg":"#19827f","makeActive":true,"anchorLinkShow":false,"readMoreText":"Read More","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel  
			 
			aagb__accordion_active" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  aagb__accordion_active" data-active="true"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/setting.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Manager</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-minus"></span></div></div></div><div class="aagb__accordion_body aagb__accordion_body--show  " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#ffffffcc"}}},"color":{"text":"#ffffffcc"}}} -->
<p class="has-text-color has-link-color" style="color:#ffffffcc">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","headingBorder":{"width":"1px"},"bodyBorder":{"width":"0px","style":"none"},"paddings":{"top":"0px","left":"0px","right":"0px","bottom":"0px"},"margins":{"top":"1px","bottom":"1px"},"borderRadius":1,"heading":"Location","headingColor":"#000000","headerBg":"#ffffff","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/pin.png') . ' ","showHeadingIcon":true,"bodyBg":"#19827f","anchorLinkShow":false,"readMoreText":"Read More","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/pin.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Location</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#ffffffcc"}}},"color":{"text":"#ffffffcc"}}} -->
<p class="has-text-color has-link-color" style="color:#ffffffcc">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","headingBorder":{"width":"1px"},"bodyBorder":{"width":"0px","style":"none"},"paddings":{"top":"0px","left":"0px","right":"0px","bottom":"0px"},"margins":{"top":"1px","bottom":"1px"},"borderRadius":1,"heading":"Hobbies","headingColor":"#000000","headerBg":"#ffffff","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/basketball.png') . ' ","showHeadingIcon":true,"bodyBg":"#19827f","anchorLinkShow":false,"readMoreText":"Read More","faqSchema":false,"step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/basketball.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Hobbies</h5></div></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#ffffffcc"}}},"color":{"text":"#ffffffcc"}}} -->
<p class="has-text-color has-link-color" style="color:#ffffffcc">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
<!-- /wp:paragraph --></div></div></div>
<!-- /wp:aab/accordion-item --></div>
<!-- /wp:aab/group-accordion -->',
        'categories' => ['advanced-accordion-block-category', 'premium-advanced-accordion-block'],
    ]
);
