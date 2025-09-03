<?php
$base_url = get_site_url();
register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);

register_block_pattern(
    'advanced-accordion-block/pattern-accordion-feature-image',
    [
        'title'       => __('Accordion Feature Image', 'advanced-accordion-block'),
        'description' => __('A description of Pattern Five.', 'advanced-accordion-block'),
        'content'     => '<!-- wp:aab/group-accordion {"QaStyle":false,"uniqueId":"e5d80826_0","defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"isFeatureImg":true} -->
<div class="custom-css-block"><style>.aagb_accordion_e5d80826_0 {   }</style></div><style>
        .aagb_accordion_e5d80826_0 .aagb__accordion_active .aagb__accordion_body {
            border-top: 1px solid #ebebeb;
        }
        .aagb_accordion_e5d80826_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #bcb6b638;
          
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_e5d80826_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          
          
          
          border-top: 1px solid #bcb6b638; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_e5d80826_0 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_e5d80826_0 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          
        }
        .aagb_accordion_e5d80826_0 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_e5d80826_0 .aagb__accordion_title {
          margin: 0;
          
        }
        .aagb_accordion_e5d80826_0 .aagb__accordion_container {
          border: 1px solid #bcb6b638;
          margin-top: 0px;
          margin-bottom: 15px;
          
        }
          .aagb_accordion_e5d80826_0 .aagb__accordion_number{
            
        }
        .aagb_accordion_e5d80826_0 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_e5d80826_0 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_e5d80826_0 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_e5d80826_0 .aagb__accordion_number{
          
        }
        .aagb_accordion_e5d80826_0 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_e5d80826_0 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
      
          .aagb_accordion_e5d80826_0 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_e5d80826_0 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="aagb__group_accordion_container "><div class="wp-block-aab-group-accordion searchable aagb_accordion_e5d80826_0 click false aab-feature-img-enabled" id="group-accordion-e5d80826_0"><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"What is COVID-19?","subheading":"Learn about the virus","makeActive":true,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-01.jpg') . ' ","isFeatureImg":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel  
			 
			aagb__accordion_active" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-01.jpg') . ' " data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon hasSubHeading aagb__accordion_active" data-active="true"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">What is COVID-19?</h5></div><p class="aagb__accordion_subheading" placeholder="">Learn about the virus</p></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-minus"></span></div></div></div><div class="aagb__accordion_body aagb__accordion_body--show  " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>COVID-19 is a virus that made many people sick around the world. It started in 2019. It spreads from one person to another through cough, sneeze, or touch.</p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-01.jpg') . ' " alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"Common Symptoms","subheading":"How to know if someone has COVID-19","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-02.jpg') . ' ","isFeatureImg":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-02.jpg') . ' " data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon hasSubHeading " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">Common Symptoms</h5></div><p class="aagb__accordion_subheading" placeholder="">How to know if someone has COVID-19</p></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>The most common signs are fever, cough, tiredness, and loss of taste or smell. Some people may also feel body pain or sore throat.</p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-02.jpg') . ' " alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"How to Stay Safe","subheading":"Protect yourself and others","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-03.jpg') . ' ","isFeatureImg":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-03.jpg') . ' " data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon hasSubHeading " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">How to Stay Safe</h5></div><p class="aagb__accordion_subheading" placeholder="">Protect yourself and others</p></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>Wash your hands often. Wear a mask in crowded places. Stay away from sick people. Clean things you touch. These steps can keep you safe.</p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-03.jpg') . ' " alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","heading":"COVID-19 Vaccine","subheading":"Why the vaccine is important","readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23},"featureImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-04.jpg') . ' ","isFeatureImg":true} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-04.jpg') . ' " data-auto-numbering="false" data-progress-bar-on="false" tabindex="0"><div class="aagb__accordion_head aab_right_icon hasSubHeading " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">COVID-19 Vaccine</h5></div><p class="aagb__accordion_subheading" placeholder="">Why the vaccine is important</p></div></div><div class="aagb__accordion_icon"><div class="aagb__icon_dashicons_box"><span class="aagb__icon dashicons dashicons-plus-alt2"></span></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:paragraph -->
<p>The vaccine helps your body fight the virus. It does not stop the virus 100%, but it makes the sickness much less dangerous. Many people got better after the vaccine.</p>
<!-- /wp:paragraph --><div class="aagb-feature-img-mobile"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/covid-19-04.jpg') . ' " alt=""/></div></div></div></div>
<!-- /wp:aab/accordion-item --></div><div hidden class="aab-feature-img"><img alt=""/></div></div>
<!-- /wp:aab/group-accordion -->',
        'categories'  => ['advanced-accordion-block-category', 'premium-advanced-accordion-block'],
    ]
);
