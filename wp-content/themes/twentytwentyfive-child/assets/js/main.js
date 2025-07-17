document.addEventListener('DOMContentLoaded', function() {
    jQuery(function($){

    var mywindow = $(window);
    var mypos = mywindow.scrollTop();

    mywindow.scroll(function() {
    if (mypos > 10) {
        if(mywindow.scrollTop() > mypos) {
            $('header.wp-block-template-part').addClass('headerup');
            $('header.wp-block-template-part').removeClass('fullheader');
            // $('.single-products .apertura').removeClass('fixed');
        } else {
            $('header.wp-block-template-part').removeClass('headerup');
            $('header.wp-block-template-part').addClass('fullheader');
            // $('.single-products .apertura').addClass('fixed');      
        } if (mypos = 0) {
            $('header.wp-block-template-part').removeClass('fullheader');
            }
        }
        mypos = mywindow.scrollTop();
        });

        $('#btn-open').click(function (e) {
            if ($('.menu-nav or body or #btn-close').hasClass("active")) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
            }
            else {
                $('.menu-nav').addClass("active");
                $('body').addClass("active");
                $('#btn-close').addClass("active");
            }
        });

        $('#btn-close').click(function (e) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
        });

    });    
});

window.addEventListener('load', function() {
    console.log('La página ha terminado de cargarse!!');


    /* NAVEGACIÓ SUBSECCIONS */


    function activarTogglePorRel(relValue, className = 'hide') {
    const elementos = document.querySelectorAll(`[rel="${relValue}"]`);

    elementos.forEach(el => {
        el.addEventListener('mouseenter', () => {
        el.classList.remove(className);
        });

        el.addEventListener('mouseleave', () => {
        el.classList.add(className);
        });
    });
    }

    // Llamadas universales:
    activarTogglePorRel('menu_que_hacemos');        // Activa para todos los que tienen rel="panel"
    activarTogglePorRel('otro-panel');   // También puedes usarlo para otros tipos




    // const quehacemos = document.querySelector('[rel="menu_que_hacemos"]');
    // const menuquehacemos = document.getElementById('#menu_que_hacemos');

    //  quehacemos.addEventListener('mouseenter', () => {
    //     console.log('IN');
    //     menuquehacemos.removeClass('hide');
    // });

    // // quehacemos.addEventListener('mouseleave', () => {
    // //     console.log('OUT');
    // //     menuquehacemos.addClass('hide');
    // // });



});


