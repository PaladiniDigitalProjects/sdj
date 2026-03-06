(function( $ ){

  $(document).ready(function($) {

    //  $('body').addClass('active');
  
    $('button.mas-content').on('click', function(){
       $(this).toggleClass("hide");
       $(this).parent().next('.entry-subtitle.more').toggleClass("hide");
     });
  
     $('button.menos-content').on('click', function(){
        $(".entry-subtitle .mas-content").removeClass("hide");
        $(this).toggleClass("hide");
        $(this).parent('p.entry-subtitle').toggleClass("hide");
      });
  
  
    $('#burguer').on('click', function() {
        $(this).toggleClass("active");
        // $('body').toggleClass("body-fixed");
        $('body').toggleClass("active");
        $('nav.menu').toggleClass("active");
        $('.site-header .footer-menu').toggleClass("active");
        $('.site-header .social-menu').toggleClass("active");
        $('.site-header').toggleClass("active");
        // $("#search-light-box").removeClass("active");
      });

      // if ($(window).width() > 769) {
      //   $('.site-header').addClass("active");
      // }

    
    // if ($(window).width() < 769) {

    //   console.log("< 769");

    //   $('ul.menu-list li.menu-item-has-children > a').click(function(){
    //     $('.sub-menu').removeClass('active');
    //     $('.menu-item-has-children').removeClass('open');
    //     $(this).parent().toggleClass('open');
    //     $(this).next('ul.sub-menu').toggleClass('active');
    //   });

    //   $('ul.menu-list li.menu-item-has-children.open > a').click(function(){
    //     $(this).parent().removeClass('open');
    //     $(this).next('ul.sub-menu.active').removeClass('active');
    //   });

    
    // } else {
      
    //   console.log(" > 769");

    //   $('nav.menu a.menu-item-has-children').mouseenter(function () {
    //       $('.submenu-nav').removeClass('active');
    //       $(this).toggleClass('on');
    //       $(this).next('nav.submenu-nav').addClass('active');
    //   });
  
    //   $('.submenu-nav').mouseleave(function () {
    //       $(this).removeClass('active');
    //       $('nav.menu a.menu-item-has-children').removeClass('on');
    //   });
  
    // }


  });

  
  }) (jQuery);

