<?php

register_block_pattern_category(
    'advanced-accordion-block-category',
    ['label' => __('Advance Accordion Block', 'advanced-accordion-block')]
);


register_block_pattern(
    'advanced-accordion-block/easy-schedule',
    [
        'title'       => __('Easy Schedule', 'advanced-accordion-block'),
        'description' => __('A description of Pattern Three.', 'advanced-accordion-block'),
        'content'     => '<!-- wp:aab/group-accordion {"QaStyle":false,"uniqueId":"503fb4b2_0","activeAccordionBorder":{"width":"0px","style":"none"},"paddings":{"top":"NaNpx","left":"NaNpx","right":"NaNpx","bottom":"NaNpx"},"margins":{"top":"0px","bottom":"0px"},"borderRadius":1,"headerBg":"#ffffff00","showIcon":false,"customCSS":" .aagb__accordion_heading {\n    justify-content: space-between;\n}\n#aagb_funky_item1 {\n    background: #99B998;\n    border-left: 10px solid #cdafaf !important;\n}\n.active .heading-icon {\n    visibility: hidden;\n}\n#aagb_funky_item1 .wp-block-image img {\n    width: 59% !important;\n    background: #EA495F;\n    padding: 10px;\n    border-radius: 14px;\n}\naagb__accordion_component, h2, h6, p {\n    padding: 3px !important;\n    margin: 0px !important;\n}\n.aagb__accordion_body img {\n \n  transform: translateY(-250px);\n  transition: opacity 0.5s ease, transform 0.5s ease;\n}\n.aagb__accordion_body.aagb__accordion_body\u002d\u002dshow img {\n  \n  transform: translateY(0);\n}\n.wp-block img {\n    transform: translateY(0px);\n}\n#aagb_funky_item2 {\n    background: #E4B794;\n    border-left: 10px solid #d09261 !important;\n}\n#aagb_funky_item2 .wp-block-image img {\n    width: 59% !important;\n    background: #99B998;\n    padding: 10px;\n    border-radius: 14px;\n}\n\n#aagb_funky_item3 {\n    background: #F4837D;\n    border-left: 10px solid #D6736E !important;\n}\n#aagb_funky_item3 .wp-block-image img {\n    width: 59% !important;\n    background: #E4B794;\n    padding: 10px;\n    border-radius: 14px;\n}\n\n#aagb_funky_item4 {\n    background: #EA495F;\n    border-left: 10px solid #CE4053 !important;\n}\n#aagb_funky_item4 .wp-block-image img {\n    width: 20% !important;\n    background: #F4837D;\n    padding: 10px;\n    border-radius: 14px;\n    margin-left:35%;\n}\n#aagb_funky_item1 .aagb__accordion_component a {\n    border: 2px solid #ea495f !important;\n}\n#aagb_funky_item2 .aagb__accordion_component a {\n    border: 2px solid #99b998 !important;\n}\n#aagb_funky_item3 .aagb__accordion_component a {\n    border: 2px solid #e4b794 !important;\n}\n#aagb_funky_item5 .aagb__accordion_component a {\n    border: 2px solid #f4837d !important;\n}\n.aagb__accordion_body .aagb_fad_in {\n    transform: translateX(-113px);\n    opacity: 0;\n    transition: 0.3s;\n}\n.aagb__accordion_body\u002d\u002dshow .aagb_fad_in {\n    transform: translateX(10px);\n    opacity: 1;\n}\n.block-editor-block-list__block  .aagb_fad_in{\ntransform: translateX(0);\n        opacity: 1;\n}\n.heading-icon img{\nwidth:15px;}\n\n\n#aagb_funky_item5 {\n    background: #EA495F;\n    border-left: 10px solid #CE4053 !important;\n}\n#aagb_funky_item5 .wp-block-image img {\n   width:59%;\n    background: #F4837D;\n    padding: 10px;\n    border-radius: 14px;\n}\n","headingBorder":{"width":"0px","style":"none"},"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="custom-css-block"><style>.aagb_accordion_503fb4b2_0 {  .aagb__accordion_heading {
    justify-content: space-between;
}
#aagb_funky_item1 {
    background: #99B998;
    border-left: 10px solid #cdafaf !important;
}
.active .heading-icon {
    visibility: hidden;
}
#aagb_funky_item1 .wp-block-image img {
    width: 59% !important;
    background: #EA495F;
    padding: 10px;
    border-radius: 14px;
}
aagb__accordion_component, h2, h6, p {
    padding: 3px !important;
    margin: 0px !important;
}
.aagb__accordion_body img {
 
  transform: translateY(-250px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.aagb__accordion_body.aagb__accordion_body--show img {
  
  transform: translateY(0);
}
.wp-block img {
    transform: translateY(0px);
}
#aagb_funky_item2 {
    background: #E4B794;
    border-left: 10px solid #d09261 !important;
}
#aagb_funky_item2 .wp-block-image img {
    width: 59% !important;
    background: #99B998;
    padding: 10px;
    border-radius: 14px;
}

#aagb_funky_item3 {
    background: #F4837D;
    border-left: 10px solid #D6736E !important;
}
#aagb_funky_item3 .wp-block-image img {
    width: 59% !important;
    background: #E4B794;
    padding: 10px;
    border-radius: 14px;
}

#aagb_funky_item4 {
    background: #EA495F;
    border-left: 10px solid #CE4053 !important;
}
#aagb_funky_item4 .wp-block-image img {
    width: 20% !important;
    background: #F4837D;
    padding: 10px;
    border-radius: 14px;
    margin-left:35%;
}
#aagb_funky_item1 .aagb__accordion_component a {
    border: 2px solid #ea495f !important;
}
#aagb_funky_item2 .aagb__accordion_component a {
    border: 2px solid #99b998 !important;
}
#aagb_funky_item3 .aagb__accordion_component a {
    border: 2px solid #e4b794 !important;
}
#aagb_funky_item5 .aagb__accordion_component a {
    border: 2px solid #f4837d !important;
}
.aagb__accordion_body .aagb_fad_in {
    transform: translateX(-113px);
    opacity: 0;
    transition: 0.3s;
}
.aagb__accordion_body--show .aagb_fad_in {
    transform: translateX(10px);
    opacity: 1;
}
.block-editor-block-list__block  .aagb_fad_in{
transform: translateX(0);
        opacity: 1;
}
.heading-icon img{
width:15px;}


#aagb_funky_item5 {
    background: #EA495F;
    border-left: 10px solid #CE4053 !important;
}
#aagb_funky_item5 .wp-block-image img {
   width:59%;
    background: #F4837D;
    padding: 10px;
    border-radius: 14px;
}
 }</style></div><style>
        .aagb_accordion_503fb4b2_0 .aagb__accordion_active .aagb__accordion_body {
            
        }
        .aagb_accordion_503fb4b2_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_head {
          background-color: #ffffff00;
          padding: NaNpx NaNpx NaNpx NaNpx;
          border-top: none; border-right: none; border-bottom: none; border-left: none;
          
        }
        .aagb_accordion_503fb4b2_0 .aagb__accordion_container.wp-block-aab-accordion-item .aagb__accordion_body {
          
          
          padding: NaNpx NaNpx NaNpx NaNpx;
          border-top: 1px solid #bcb6b638; border-right: none; border-bottom: none; border-left: none;
          
        }
        
        .aagb_accordion_503fb4b2_0 .wp-block-aab-accordion-item .aagb__accordion_subheading {
          margin: 5px 0 0 0;
          
        }
        .aagb_accordion_503fb4b2_0 .wp-block-aab-accordion-item .aagb__accordion_icon {
          
          
        }
        .aagb_accordion_503fb4b2_0 .wp-block-aab-accordion-item .aagb__icon {
          font-size: 23px;
        }
        .aagb_accordion_503fb4b2_0 .aagb__accordion_title {
          margin: 0;
          
        }
        .aagb_accordion_503fb4b2_0 .aagb__accordion_container {
          border: 1px solid #bcb6b638;
          margin-top: 0px;
          margin-bottom: 0px;
          border-radius: 1px;
        }
          .aagb_accordion_503fb4b2_0 .aagb__accordion_number{
            
        }
        .aagb_accordion_503fb4b2_0 .wp-block-aab-accordion-item .aagb__accordion_subheading{
           false
        }

        .aagb_accordion_503fb4b2_0 .aab-step-progress{
          background-color: #dfd2d2;
        }
            
        .aagb_accordion_503fb4b2_0 .aab-step-progress-bar {
          background-color: #1570ec;
        }

        .aagb_accordion_503fb4b2_0 .aagb__accordion_number{
          
        }
        .aagb_accordion_503fb4b2_0 .aab-progress-bar-container{
          background-color: #f0f0f0;
        }
        .aagb_accordion_503fb4b2_0 .aab-progress-bar {
            background-color: #0866ff;
        }
        
       .aagb__group_accordion_container.has_img {
            
            flex-direction: row;
        }
      
          .aagb_accordion_503fb4b2_0 .aagb__accordion_container {
            transition-duration: 0ms !important;
            outline: 2px solid #00000000;
          }
          .aagb_accordion_503fb4b2_0 .aagb__accordion_container:focus-visible {
            outline: 2px solid #C2DBFE;
          }
        </style><div class="wp-block-aab-group-accordion searchable aagb_accordion_503fb4b2_0 click false" id="group-accordion-503fb4b2_0"><!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","singleAcdId":"aagb_funky_item1","headingBorder":{"width":"0px","style":"none"},"paddings":{"top":"NaNpx","left":"NaNpx","right":"NaNpx","bottom":"NaNpx"},"margins":{"top":"0px","bottom":"0px"},"borderRadius":1,"heading":"8am - 10am","headerBg":"#ffffff00","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' ","showHeadingIcon":true,"showIcon":false,"makeActive":true,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel  
			 
			aagb__accordion_active" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0" id="aagb_funky_item1"><div class="aagb__accordion_head aab_right_icon  aagb__accordion_active" data-active="true"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">8am - 10am</h5></div></div></div></div><div class="aagb__accordion_body aagb__accordion_body--show  " role="region"><div class="aagb__accordion_component "><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1069,"scale":"cover","sizeSlug":"thumbnail","linkDestination":"none","align":"left"} -->
<figure class="wp-block-image alignleft size-thumbnail"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/palette.png') . ' " alt="" class="wp-image-1069" style="object-fit:cover"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","className":"aagb_fad_in"} -->
<div class="wp-block-column aagb_fad_in"><!-- wp:heading {"textAlign":"right","style":{"typography":{"fontSize":"21px"}}} -->
<h2 class="wp-block-heading has-text-align-right" style="font-size:21px">Jamie talks design</h2>
<!-- /wp:heading -->

<!-- wp:heading {"textAlign":"right","level":6,"style":{"typography":{"fontSize":"14px"}}} -->
<h6 class="wp-block-heading has-text-align-right" style="font-size:14px">Monday - Thursday</h6>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-right has-white-color has-text-color has-link-color" style="font-size:12px">I talk a bunch of rubbish</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","verticalAlignment":"bottom","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"textAlign":"right","textColor":"white","className":"is-style-outline","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"color":{"background":"#ffffff00"}}} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color has-background has-link-color has-text-align-right wp-element-button" style="background-color:#ffffff00">More information</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","singleAcdId":"aagb_funky_item2","headingBorder":{"width":"0px","style":"none"},"paddings":{"top":"NaNpx","left":"NaNpx","right":"NaNpx","bottom":"NaNpx"},"margins":{"top":"0px","bottom":"0px"},"borderRadius":1,"heading":"10am - 12am","headerBg":"#ffffff00","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' ","showHeadingIcon":true,"showIcon":false,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0" id="aagb_funky_item2"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">10am - 12am</h5></div></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1101,"scale":"cover","sizeSlug":"thumbnail","linkDestination":"none","align":"left"} -->
<figure class="wp-block-image alignleft size-thumbnail"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/musical-note.png') . ' " alt="" class="wp-image-1101" style="object-fit:cover"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","className":"aagb_fad_in"} -->
<div class="wp-block-column aagb_fad_in"><!-- wp:heading {"textAlign":"right","style":{"typography":{"fontSize":"21px"}}} -->
<h2 class="wp-block-heading has-text-align-right" style="font-size:21px">Jamie talks design</h2>
<!-- /wp:heading -->

<!-- wp:heading {"textAlign":"right","level":6,"style":{"typography":{"fontSize":"14px"}}} -->
<h6 class="wp-block-heading has-text-align-right" style="font-size:14px">Monday - Thursday</h6>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-right has-white-color has-text-color has-link-color" style="font-size:12px">I talk a bunch of rubbish</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","verticalAlignment":"bottom","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"textAlign":"right","textColor":"white","className":"is-style-outline","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"color":{"background":"#ffffff00"}}} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color has-background has-link-color has-text-align-right wp-element-button" style="background-color:#ffffff00">More information</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","singleAcdId":"aagb_funky_item3","headingBorder":{"width":"0px","style":"none"},"paddings":{"top":"NaNpx","left":"NaNpx","right":"NaNpx","bottom":"NaNpx"},"margins":{"top":"0px","bottom":"0px"},"borderRadius":1,"heading":"12am - 02pm","headerBg":"#ffffff00","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' ","showHeadingIcon":true,"showIcon":false,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0" id="aagb_funky_item3"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">12am - 02pm</h5></div></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1106,"scale":"cover","sizeSlug":"thumbnail","linkDestination":"none","align":"left"} -->
<figure class="wp-block-image alignleft size-thumbnail"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/voice-recording.png') . ' " alt="" class="wp-image-1106" style="object-fit:cover"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","className":"aagb_fad_in"} -->
<div class="wp-block-column aagb_fad_in"><!-- wp:heading {"textAlign":"right","style":{"typography":{"fontSize":"21px"}}} -->
<h2 class="wp-block-heading has-text-align-right" style="font-size:21px">Jamie talks design</h2>
<!-- /wp:heading -->

<!-- wp:heading {"textAlign":"right","level":6,"style":{"typography":{"fontSize":"14px"}}} -->
<h6 class="wp-block-heading has-text-align-right" style="font-size:14px">Monday - Thursday</h6>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-right has-white-color has-text-color has-link-color" style="font-size:12px">I talk a bunch of rubbish</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","verticalAlignment":"bottom","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"textAlign":"right","textColor":"white","className":"is-style-outline","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"color":{"background":"#ffffff00"}}} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color has-background has-link-color has-text-align-right wp-element-button" style="background-color:#ffffff00">More information</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div></div>
<!-- /wp:aab/accordion-item -->

<!-- wp:aab/accordion-item {"progressBarBgColor":"#f0f0f0","singleAcdId":"aagb_funky_item5","headingBorder":{"width":"0px","style":"none"},"paddings":{"top":"NaNpx","left":"NaNpx","right":"NaNpx","bottom":"NaNpx"},"margins":{"top":"0px","bottom":"0px"},"borderRadius":1,"heading":"02am - 04pm","headerBg":"#ffffff00","headingIconImageUrl":"'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' ","showHeadingIcon":true,"showIcon":false,"readMoreText":"Read More","step":false,"stepText":"Continue","checkList":false,"button_show":false,"defaultStyles":{"activeAccordionBorder":{"width":"1px","color":"#ebebeb","style":"solid"},"border":{"width":"1px","color":"#bcb6b638","style":"solid"},"headingBorder":{"style":"none","width":"0px"},"bodyBorder":{"top":{"color":"#bcb6b638","style":"solid","width":"1px"}},"paddings":{"top":"","right":"","left":"","bottom":""},"margins":{"top":"0px","right":"","left":"","bottom":"15px"},"borderRadius":null,"subheadingColor":null,"headingTag":"h5","headingColor":null,"headerBg":"#bcb6b638","showHeadingIcon":false,"showIcon":true,"iconColor":null,"iconBackground":null,"bodyBg":null,"anchorLinkShow":false,"QaStyle":false,"aIconText":"A","qIconText":"Q","qIconColor":"#fff","qIconBg":"#505050","aIconColor":"#fff","aIconBg":"#f5a623","faqSchema":false,"iconBorder":{"width":"0px","style":"solid","color":"transparent"},"iconBorderRadius":"","iconFontSize":23}} -->
<div class="wp-block-aab-accordion-item aagb__accordion_container panel" data-autoplay="false" data-duration="3000" data-progress-bar-direction="horizontal" data-feature-image-url="" data-auto-numbering="false" data-progress-bar-on="false" tabindex="0" id="aagb_funky_item5"><div class="aagb__accordion_head aab_right_icon  " data-active="false"><div class="aagb__accordion_heading aab_right_icon aagb_right_link"><div class="heading-icon"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/clock.png') . ' " alt="Heading Icon"/></div><div class="head_content_wrapper"><div class="title_wrapper"><h5 class="aagb__accordion_title">02am - 04pm</h5></div></div></div></div><div class="aagb__accordion_body   " role="region"><div class="aagb__accordion_component "><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1116,"scale":"cover","sizeSlug":"thumbnail","linkDestination":"none","align":"left"} -->
<figure class="wp-block-image alignleft size-thumbnail"><img src="'. esc_url($base_url . '/wp-content/plugins/advanced-accordion-block-pro/assets/img/bar.png') . ' " alt="" class="wp-image-1116" style="object-fit:cover"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"","className":"aagb_fad_in"} -->
<div class="wp-block-column aagb_fad_in"><!-- wp:heading {"textAlign":"right","style":{"typography":{"fontSize":"21px"}}} -->
<h2 class="wp-block-heading has-text-align-right" style="font-size:21px">Jamie talks design</h2>
<!-- /wp:heading -->

<!-- wp:heading {"textAlign":"right","level":6,"style":{"typography":{"fontSize":"14px"}}} -->
<h6 class="wp-block-heading has-text-align-right" style="font-size:14px">Monday - Thursday</h6>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"right","style":{"typography":{"fontSize":"12px"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-right has-white-color has-text-color has-link-color" style="font-size:12px">I talk a bunch of rubbish</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","verticalAlignment":"bottom","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"textAlign":"right","textColor":"white","className":"is-style-outline","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"color":{"background":"#ffffff00"}}} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color has-background has-link-color has-text-align-right wp-element-button" style="background-color:#ffffff00">More information</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div></div>
<!-- /wp:aab/accordion-item --></div>
<!-- /wp:aab/group-accordion -->',
        'categories'  => ['advanced-accordion-block-category'],
    ]
);
