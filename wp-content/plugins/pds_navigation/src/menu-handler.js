/**
 * PDS Navigation - Menu Handler
 * Handles menu toggle, header scroll, submenus, and centros link interception
 * Original functionality from twentytwentyfive-child theme
 */

(function () {
    'use strict';

    const PDSMenuHandler = {
        init: function () {
            this.initMenuToggle();
            this.initHeaderScroll();
            this.initSubmenus();
            this.initCentrosInterception();
            this.initCentrosScroll();
        },

        initMenuToggle: function () {
            const btnOpen = document.getElementById('btn-open');
            const btnClose = document.getElementById('btn-close');
            const menuNav = document.querySelector('.menu-nav');

            if (!btnOpen || !btnClose || !menuNav) {
                return;
            }

            btnOpen.addEventListener('click', function (e) {
                if (menuNav.classList.contains('active') || 
                    document.body.classList.contains('active') || 
                    btnClose.classList.contains('active')) {
                    menuNav.classList.remove('active');
                    document.body.classList.remove('active');
                    btnClose.classList.remove('active');
                } else {
                    menuNav.classList.add('active');
                    document.body.classList.add('active');
                    btnClose.classList.add('active');
                }
            });

            btnClose.addEventListener('click', function (e) {
                menuNav.classList.remove('active');
                document.body.classList.remove('active');
                btnClose.classList.remove('active');
            });
        },

        initHeaderScroll: function () {
            const header = document.querySelector('header.wp-block-template-part');
            if (!header) {
                return;
            }

            let mypos = window.scrollY;

            window.addEventListener('scroll', function () {
                if (mypos > 10) {
                    if (window.scrollY > mypos) {
                        header.classList.add('headerup');
                        header.classList.remove('fullheader');
                    } else {
                        header.classList.remove('headerup');
                        header.classList.add('fullheader');
                    }
                    if (mypos === 0) {
                        header.classList.remove('fullheader');
                    }
                }
                mypos = window.scrollY;
            });
        },

        initSubmenus: function () {
            const self = this;
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                this.initSubmenusMobile();
            } else {
                this.initSubmenusDesktop();
            }

            let resizeTimer;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    const currentIsMobile = window.innerWidth <= 768;
                    if (currentIsMobile !== isMobile) {
                        location.reload();
                    }
                }, 250);
            });
        },

        initSubmenusDesktop: function () {
            const triggers = document.querySelectorAll('.submenu');
            if (!triggers.length) {
                return;
            }

            triggers.forEach(function (trigger) {
                const link = trigger.querySelector('a');
                if (!link) return;
                
                const targetId = link.getAttribute('rel');
                const panel = document.getElementById(targetId);
                if (!panel) {
                    return;
                }

                trigger.addEventListener('mouseenter', function () {
                    panel.classList.remove('hide');
                });
                trigger.addEventListener('mouseleave', function () {
                    panel.classList.add('hide');
                });
                panel.addEventListener('mouseenter', function () {
                    panel.classList.remove('hide');
                });
                panel.addEventListener('mouseleave', function () {
                    panel.classList.add('hide');
                });
            });
        },

        initSubmenusMobile: function () {
            const navItems = document.querySelectorAll('.wp-block-navigation-item.has-child');
            
            navItems.forEach(function (item) {
                const toggle = item.querySelector('.wp-block-navigation-submenu__toggle');
                const submenu = item.querySelector('.wp-block-navigation__submenu-container');
                
                if (!toggle || !submenu) {
                    return;
                }

                toggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    
                    toggle.setAttribute('aria-expanded', String(!isExpanded));
                    
                    if (isExpanded) {
                        submenu.classList.add('hide');
                        submenu.style.display = 'none';
                    } else {
                        submenu.classList.remove('hide');
                        submenu.style.display = 'block';
                    }
                });

                submenu.classList.add('hide');
                submenu.style.display = 'none';
            });
        },

        initCentrosInterception: function () {
            document.addEventListener('click', function (e) {
                const link = e.target.closest('a[href*="#centros"]');
                if (!link) {
                    return;
                }

                const isHomepage = window.location.pathname === '/';

                if (isHomepage) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    const el = document.getElementById('centros');
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    sessionStorage.setItem('scrollTo', 'centros');
                    link.dataset.originalHref = link.href;
                    link.href = '/';

                    if (typeof luge !== 'undefined' && luge.emitter) {
                        luge.emitter.once('transitionIn', function () {
                            link.href = link.dataset.originalHref;
                            delete link.dataset.originalHref;
                        });
                    }
                }
            }, true);
        },

        initCentrosScroll: function () {
            const scrollTarget = sessionStorage.getItem('scrollTo');
            if (scrollTarget) {
                sessionStorage.removeItem('scrollTo');
                const el = document.getElementById(scrollTarget);
                if (el) {
                    setTimeout(function () {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        PDSMenuHandler.init();
    });
})();
