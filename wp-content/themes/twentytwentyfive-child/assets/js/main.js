document.addEventListener('DOMContentLoaded', function() {
    jQuery(function($){
    var mywindow = $(window);
    var mypos = mywindow.scrollTop();
    mywindow.scroll(function() {
    if (mypos > 10) {
        if(mywindow.scrollTop() > mypos) {
            $('header.wp-block-template-part').addClass('headerup');
            $('header.wp-block-template-part').removeClass('fullheader');
        } else {
            $('header.wp-block-template-part').removeClass('headerup');
            $('header.wp-block-template-part').addClass('fullheader');
        } if (mypos == 0) {
            $('header.wp-block-template-part').removeClass('fullheader');
            }
        }
        mypos = mywindow.scrollTop();
        });
        $('#btn-open').click(function (e) {
            if ($('.menu-nav, body, #btn-close').hasClass("active")) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
                $(this).attr('aria-expanded', 'false');
            }
            else {
                $('.menu-nav').addClass("active");
                $('body').addClass("active");
                $('#btn-close').addClass("active");
                $(this).attr('aria-expanded', 'true');
            }
        });
        $('#btn-close').click(function (e) {
                $('.menu-nav').removeClass("active");
                $('body').removeClass("active");
                $('#btn-close').removeClass("active");
                $('#btn-open').attr('aria-expanded', 'false');
        });
    });    
});

window.addEventListener('load', function() {
  // 🔹 SCROLL TO #centros AFTER NAVIGATION
  const scrollTarget = sessionStorage.getItem('scrollTo');
  if (scrollTarget) {
    sessionStorage.removeItem('scrollTo');
    const el = document.getElementById(scrollTarget);
    if (el) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }, 300);
    }
  }

  /* NAVEGACIÓ SUBSECCIONS 
  function activarSubmenusUniversal(triggerSelector = '.submenu > a', className = 'hide') {
    const triggers = document.querySelectorAll(triggerSelector);
    triggers.forEach(trigger => {
      const targetId = trigger.getAttribute('rel');
      const panel = document.getElementById(targetId);
      if (!panel) return;
      trigger.addEventListener('mouseenter', () => panel.classList.remove(className));
      trigger.addEventListener('mouseleave', () => panel.classList.add(className));
      panel.addEventListener('mouseleave', () => panel.classList.add(className));
      panel.addEventListener('mouseenter', () => panel.classList.remove(className));
    });
  }
  activarSubmenusUniversal();*/
});

// 🔹 INTERCEPT #centros LINK — capture phase to run before Luge
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="/#centros"]');
  if (!link) return;

  const isHomepage = window.location.pathname === '/';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isHomepage) {
    e.preventDefault();
    e.stopImmediatePropagation();
    document.getElementById('centros')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  } else {
    sessionStorage.setItem('scrollTo', 'centros');
    link.dataset.originalHref = link.href; // save original
    link.href = '/';

    luge.emitter.once('transitionIn', () => {
      link.href = link.dataset.originalHref;  // restore after Luge is done
      delete link.dataset.originalHref;
    });
  }
}, true);