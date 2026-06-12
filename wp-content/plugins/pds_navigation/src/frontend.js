/**
 * PDS Navigation - Frontend Mobile Menu Handler
 * Minimal vanilla JS for menu animations
 */
import './frontend.css';

(function () {
    'use strict';

    const PDSNav = {
        init: function () {
            document.querySelectorAll('[data-pds-mobile-menu]').forEach((menu) => {
                if (menu.dataset.pdsInitialized) return;

                const breakpoint = parseInt(menu.dataset.pdsBreakpoint || 768, 10);
                if (window.innerWidth <= breakpoint) {
                    this.setupMenu(menu);
                }
            });
        },

        setupMenu: function (menu) {
            menu.dataset.pdsInitialized = 'true';

            const style = menu.dataset.pdsMobileMenu || 'none';
            const menuWidth = menu.dataset.pdsMenuWidth || 320;
            const overlayOpacity = (menu.dataset.pdsOverlayOpacity || 50) / 100;
            const animationSpeed = parseInt(menu.dataset.pdsAnimationSpeed || 300, 10);
            const breakpoint = parseInt(menu.dataset.pdsBreakpoint || 768, 10);
            const closeOnOverlay = menu.dataset.pdsCloseOnOverlay !== 'false';
            const closeOnEscape = menu.dataset.pdsCloseOnEscape !== 'false';

            if (style === 'none') return;
            if (window.innerWidth > breakpoint) return;

            menu.style.setProperty('--pds-breakpoint', breakpoint + 'px');
            menu.style.setProperty('--pds-menu-width', menuWidth + 'px');
            menu.style.setProperty('--pds-overlay-opacity', overlayOpacity);
            menu.style.setProperty('--pds-animation-speed', animationSpeed + 'ms');

            menu.classList.add('pds-menu', 'pds-menu--' + style);
            menu.classList.add('pds-menu-active');

            const container = menu.querySelector('.wp-block-navigation__responsive-container');
            const wrapper = menu.querySelector('.wp-block-navigation__responsive-container-wrapper');
            const dialog = menu.querySelector('.wp-block-navigation__responsive-dialog');

            if (!dialog) return;

            if (dialog.querySelector('.pds-nav-overlay')) return;

            const overlay = document.createElement('div');
            overlay.className = 'pds-nav-overlay';
            overlay.style.setProperty('--pds-overlay-opacity', overlayOpacity);

            if (dialog && dialog.parentNode) {
                dialog.parentNode.insertBefore(overlay, dialog);
            }

            const toggleOpenState = (isOpen) => {
                if (isOpen) {
                    overlay.classList.add('is-active');
                    menu.classList.add('pds-menu-open');
                } else {
                    overlay.classList.remove('is-active');
                    menu.classList.remove('pds-menu-open');
                }
            };

            const enableSubmenus = menu.dataset.pdsEnableSubmenus === 'true';
            if (enableSubmenus) {
                this.initSubmenus(menu, breakpoint);
            }

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const isOpen = container && container.classList.contains('is-menu-open');
                        toggleOpenState(isOpen);
                    }
                });
            });

            if (container) {
                observer.observe(container, { attributes: true, attributeFilter: ['class'] });
            }

            const ac = new AbortController();
            const { signal } = ac;

            if (closeOnOverlay) {
                overlay.addEventListener('click', () => {
                    const closeBtn = container?.querySelector('.wp-block-navigation__responsive-container-close');
                    if (closeBtn) closeBtn.click();
                }, { signal });
            }

            if (closeOnEscape) {
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && container?.classList.contains('is-menu-open')) {
                        const closeBtn = container?.querySelector('.wp-block-navigation__responsive-container-close');
                        if (closeBtn) closeBtn.click();
                    }
                }, { capture: true, signal });
            }

            window.addEventListener('resize', () => {
                ac.abort();
                observer.disconnect();
            }, { once: true });
        },

        initSubmenus: function (menu, breakpoint) {
            const isMobile = window.innerWidth <= breakpoint;

            if (isMobile) {
                this.initSubmenusMobile(menu);
            } else {
                this.initSubmenusDesktop(menu);
            }

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const currentIsMobile = window.innerWidth <= breakpoint;
                    if (currentIsMobile !== isMobile) {
                        this.initSubmenus(menu, breakpoint);
                    }
                }, 250);
            }, { once: true });
        },

        initSubmenusDesktop: function (menu) {
            const submenuItems = menu.querySelectorAll('.submenu');
            if (!submenuItems.length) return;

            const submenusContainer = document.querySelector('.Sub_Menus');
            if (!submenusContainer) return;

            submenuItems.forEach((submenu) => {
                const trigger = submenu.querySelector('a');
                if (!trigger) return;

                const panelId = trigger.getAttribute('rel');
                if (!panelId) return;

                const panel = submenusContainer.querySelector('#' + panelId);
                if (!panel) return;

                this.setupDesktopSubmenu(trigger, panel);
            });
        },

        setupDesktopSubmenu: function (trigger, panel) {
            const showPanel = () => {
                panel.classList.remove('hide');
                panel.style.display = '';
            };
            const hidePanel = () => {
                panel.classList.add('hide');
                panel.style.display = 'none';
            };

            trigger.addEventListener('mouseenter', showPanel);
            trigger.addEventListener('mouseleave', hidePanel);
            panel.addEventListener('mouseenter', showPanel);
            panel.addEventListener('mouseleave', hidePanel);
        },

        initSubmenusMobile: function (menu) {
            const submenuItems = menu.querySelectorAll('.submenu');
            if (!submenuItems.length) return;

            const submenusContainer = document.querySelector('.Sub_Menus');
            if (!submenusContainer) return;

            submenuItems.forEach((submenu) => {
                const trigger = submenu.querySelector('a');
                if (!trigger) return;

                const panelId = trigger.getAttribute('rel');
                if (!panelId) return;

                const panel = submenusContainer.querySelector('#' + panelId);
                if (!panel) return;

                panel.classList.add('hide');
                panel.style.display = 'none';

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();

                    const isVisible = !panel.classList.contains('hide');

                    if (isVisible) {
                        panel.classList.add('hide');
                        panel.style.display = 'none';
                        trigger.setAttribute('aria-expanded', 'false');
                    } else {
                        document.querySelectorAll('.Sub_Menus > *:not(.hide)').forEach((p) => {
                            p.classList.add('hide');
                            p.style.display = 'none';
                        });
                        panel.classList.remove('hide');
                        panel.style.display = '';
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => PDSNav.init());
    } else {
        PDSNav.init();
    }
})();
