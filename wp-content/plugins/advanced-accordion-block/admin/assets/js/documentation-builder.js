/**
 * Documentation Builder Admin Page JavaScript
 * Handles plugin installation and activation
 */

(function ($) {
    'use strict';

    $(document).ready(function () {

        /**
         * Handle Install EazyDocs Button Click
         */
        $('#aab-install-eazydocs').on('click', function (e) {
            e.preventDefault();

            const $button = $(this);
            const slug = $button.data('slug');
            const originalText = $button.html();

            // Disable button and show loading state
            $button.prop('disabled', true);
            $button.html('Installing... <span class="spinner"></span>');

            // Hide previous messages
            $('#aab-plugin-message').hide().removeClass('success error info');

            $.ajax({
                url: aabDocBuilder.ajaxurl,
                type: 'POST',
                data: {
                    action: 'aab_install_plugin',
                    slug: slug,
                    nonce: aabDocBuilder.nonce
                },
                success: function (response) {
                    if (response.success) {
                        // Show success message
                        $('#aab-plugin-message')
                            .addClass('success')
                            .html(response.data.message)
                            .slideDown();

                        // Update button to activate
                        $button.html('Activate EazyDocs');
                        $button.attr('id', 'aab-activate-eazydocs');
                        $button.data('plugin', response.data.plugin_file);
                        $button.removeClass('aab-btn-primary');
                        $button.prop('disabled', false);

                        // Re-bind click event for activation
                        setTimeout(function () {
                            $('#aab-activate-eazydocs').trigger('click');
                        }, 1000);

                    } else {
                        // Show error message
                        $('#aab-plugin-message')
                            .addClass('error')
                            .html(response.data.message || 'Installation failed. Please try again.')
                            .slideDown();

                        $button.prop('disabled', false);
                        $button.html(originalText);
                    }
                },
                error: function (xhr, status, error) {
                    // Show error message
                    $('#aab-plugin-message')
                        .addClass('error')
                        .html('An error occurred: ' + error)
                        .slideDown();

                    $button.prop('disabled', false);
                    $button.html(originalText);
                }
            });
        });

        /**
         * Handle Activate EazyDocs Button Click
         */
        $(document).on('click', '#aab-activate-eazydocs', function (e) {
            e.preventDefault();

            const $button = $(this);
            const plugin = $button.data('plugin');
            const originalText = $button.html();

            // Disable button and show loading state
            $button.prop('disabled', true);
            $button.html('Activating... <span class="spinner"></span>');

            // Hide previous messages
            $('#aab-plugin-message').hide().removeClass('success error info');

            $.ajax({
                url: aabDocBuilder.ajaxurl,
                type: 'POST',
                data: {
                    action: 'aab_activate_plugin',
                    plugin: plugin,
                    nonce: aabDocBuilder.nonce
                },
                success: function (response) {
                    if (response.success) {
                        // Show success message
                        $('#aab-plugin-message')
                            .addClass('success')
                            .html(response.data.message + ' Redirecting...')
                            .slideDown();

                        // Update button
                        $button.html('✓ Plugin Activated - Redirecting...');

                        // Redirect to EazyDocs after short delay
                        setTimeout(function () {
                            window.location.href = response.data.redirect_url;
                        }, 1500);

                    } else {
                        // Show error message
                        $('#aab-plugin-message')
                            .addClass('error')
                            .html(response.data.message || 'Activation failed. Please try again.')
                            .slideDown();

                        $button.prop('disabled', false);
                        $button.html(originalText);
                    }
                },
                error: function (xhr, status, error) {
                    // Show error message
                    $('#aab-plugin-message')
                        .addClass('error')
                        .html('An error occurred: ' + error)
                        .slideDown();

                    $button.prop('disabled', false);
                    $button.html(originalText);
                }
            });
        });

        /**
         * Handle Install EazyDocs Button Click (Hero Section)
         */
        $('#aab-install-eazydocs-hero').on('click', function (e) {
            e.preventDefault();

            const $button = $(this);
            const slug = $button.data('slug');
            const originalText = $button.html();

            // Disable button and show loading state
            $button.prop('disabled', true);
            $button.html('Installing... <span class="spinner"></span>');

            // Hide previous messages
            $('#aab-hero-plugin-message').hide().removeClass('success error info');

            $.ajax({
                url: aabDocBuilder.ajaxurl,
                type: 'POST',
                data: {
                    action: 'aab_install_plugin',
                    slug: slug,
                    nonce: aabDocBuilder.nonce
                },
                success: function (response) {
                    if (response.success) {
                        // Show success message
                        $('#aab-hero-plugin-message')
                            .addClass('success')
                            .html(response.data.message)
                            .slideDown();

                        // Update button to activate
                        $button.html('Activate EazyDocs');
                        $button.attr('id', 'aab-activate-eazydocs-hero');
                        $button.data('plugin', response.data.plugin_file);
                        $button.removeClass('aab-btn-primary');
                        $button.prop('disabled', false);

                        // Re-bind click event for activation
                        setTimeout(function () {
                            $('#aab-activate-eazydocs-hero').trigger('click');
                        }, 1000);

                    } else {
                        // Show error message
                        $('#aab-hero-plugin-message')
                            .addClass('error')
                            .html(response.data.message || 'Installation failed. Please try again.')
                            .slideDown();

                        $button.prop('disabled', false);
                        $button.html(originalText);
                    }
                },
                error: function (xhr, status, error) {
                    // Show error message
                    $('#aab-hero-plugin-message')
                        .addClass('error')
                        .html('An error occurred: ' + error)
                        .slideDown();

                    $button.prop('disabled', false);
                    $button.html(originalText);
                }
            });
        });

        /**
         * Handle Activate EazyDocs Button Click (Hero Section)
         */
        $(document).on('click', '#aab-activate-eazydocs-hero', function (e) {
            e.preventDefault();

            const $button = $(this);
            const plugin = $button.data('plugin');
            const originalText = $button.html();

            // Disable button and show loading state
            $button.prop('disabled', true);
            $button.html('Activating... <span class="spinner"></span>');

            // Hide previous messages
            $('#aab-hero-plugin-message').hide().removeClass('success error info');

            $.ajax({
                url: aabDocBuilder.ajaxurl,
                type: 'POST',
                data: {
                    action: 'aab_activate_plugin',
                    plugin: plugin,
                    nonce: aabDocBuilder.nonce
                },
                success: function (response) {
                    if (response.success) {
                        // Show success message
                        $('#aab-hero-plugin-message')
                            .addClass('success')
                            .html(response.data.message + ' Redirecting...')
                            .slideDown();

                        // Update button
                        $button.html('✓ Plugin Activated - Redirecting...');

                        // Redirect to EazyDocs after short delay
                        setTimeout(function () {
                            window.location.href = response.data.redirect_url;
                        }, 1500);

                    } else {
                        // Show error message
                        $('#aab-hero-plugin-message')
                            .addClass('error')
                            .html(response.data.message || 'Activation failed. Please try again.')
                            .slideDown();

                        $button.prop('disabled', false);
                        $button.html(originalText);
                    }
                },
                error: function (xhr, status, error) {
                    // Show error message
                    $('#aab-hero-plugin-message')
                        .addClass('error')
                        .html('An error occurred: ' + error)
                        .slideDown();

                    $button.prop('disabled', false);
                    $button.html(originalText);
                }
            });
        });

        /**
         * Smooth scroll for anchor links (if any)
         */
        $('a[href^="#"]').on('click', function (e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        });

        /**
         * Add animation to feature cards on scroll
         */
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        
                        setTimeout(function () {
                            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            $('.aab-feature-card, .aab-screenshot-item').each(function () {
                observer.observe(this);
            });
        }

    });

})(jQuery);
