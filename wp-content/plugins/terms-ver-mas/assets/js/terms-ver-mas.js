/**
 * JavaScript para Terms Ver Más Plugin
 */

(function($) {
    'use strict';

    // Inicializar cuando el documento esté listo
    $(document).ready(function() {
        initTermsVerMas();
    });

    /**
     * Inicializar funcionalidad Terms Ver Más
     */
    function initTermsVerMas() {
        $('.terms-ver-mas-container').each(function() {
            var $container = $(this);
            var postId = $container.data('post-id');
            var taxonomy = $container.data('taxonomy');
            
            // Encontrar el botón "Ver más"
            var $verMasBtn = $container.find('.terms-ver-mas-btn');
            
            if ($verMasBtn.length > 0) {
                // Configurar el botón
                setupVerMasButton($verMasBtn, $container, postId, taxonomy);
            }
        });
    }

    /**
     * Configurar botón "Ver más"
     */
    function setupVerMasButton($btn, $container, postId, taxonomy) {
        $btn.on('click', function(e) {
            e.preventDefault();
            
            var $this = $(this);
            var hiddenCount = $this.data('hidden-count') || 0;
            
            // Verificar si ya se han mostrado todos los términos
            if ($this.hasClass('showing-all')) {
                // Volver al estado inicial
                showLimitedTerms($container, $this);
            } else {
                // Mostrar todos los términos
                showAllTerms($container, $this, postId, taxonomy, hiddenCount);
            }
        });
    }

    /**
     * Mostrar todos los términos (versión AJAX)
     */
    function showAllTerms($container, $btn, postId, taxonomy, hiddenCount) {
        // Mostrar estado de carga
        $btn.addClass('loading');
        $btn.prop('disabled', true);
        
        // Hacer petición AJAX
        $.ajax({
            url: termsVerMas.ajaxUrl,
            type: 'POST',
            data: {
                action: 'get_all_terms',
                post_id: postId,
                taxonomy: taxonomy,
                nonce: termsVerMas.nonce
            },
            success: function(response) {
                if (response.success) {
                    // Reemplazar contenido con todos los términos
                    $container.html(response.data);
                    
                    // Añadir clase para indicar que se muestran todos
                    $container.addClass('showing-all');
                    
                    // Añadir botón "Ver menos"
                    var $verMenosBtn = $('<button type="button" class="terms-ver-mas-btn showing-all">' + 
                        termsVerMas.strings.verMenos + '</button>');
                    $container.append($verMenosBtn);
                    
                    // Configurar nuevo botón
                    setupVerMasButton($verMenosBtn, $container, postId, taxonomy);
                    
                    // Animar aparición de términos
                    animateNewTerms($container);
                } else {
                    // Mostrar error
                    showError($btn, response.data || termsVerMas.strings.error);
                }
            },
            error: function() {
                // Mostrar error
                showError($btn, termsVerMas.strings.error);
            }
        });
    }

    /**
     * Mostrar términos limitados (versión simple)
     */
    function showLimitedTerms($container, $btn) {
        // Esta función se implementaría para la versión simple
        // Por ahora, recargamos la página para volver al estado inicial
        location.reload();
    }

    /**
     * Mostrar error
     */
    function showError($btn, message) {
        $btn.removeClass('loading');
        $btn.prop('disabled', false);
        $btn.text(message || 'Error');
        
        // Restaurar texto original después de 3 segundos
        setTimeout(function() {
            $btn.text(termsVerMas.strings.verMas);
        }, 3000);
    }

    /**
     * Animar aparición de nuevos términos
     */
    function animateNewTerms($container) {
        $container.find('a').each(function(index) {
            var $term = $(this);
            
            // Resetear animación
            $term.css({
                'opacity': '0',
                'transform': 'translateY(10px)'
            });
            
            // Animar con delay
            setTimeout(function() {
                $term.animate({
                    'opacity': '1'
                }, 300).css('transform', 'translateY(0)');
            }, index * 50);
        });
    }

    /**
     * Versión simple sin AJAX (fallback)
     */
    function initSimpleVersion() {
        $('.terms-ver-mas-container').each(function() {
            var $container = $(this);
            var $terms = $container.find('a');
            var limit = termsVerMas.limit || 10;
            
            if ($terms.length > limit) {
                // Ocultar términos después del límite
                $terms.slice(limit).hide();
                
                // Crear botón "Ver más" simple
                var $verMasBtn = $('<button type="button" class="terms-ver-mas-btn simple-version">' + 
                    termsVerMas.strings.verMas + '</button>');
                $container.append($verMasBtn);
                
                // Event handler
                $verMasBtn.on('click', function() {
                    var $btn = $(this);
                    
                    if ($btn.hasClass('showing-all')) {
                        // Ocultar términos extra
                        $terms.slice(limit).slideUp(300);
                        $btn.removeClass('showing-all');
                        $btn.text(termsVerMas.strings.verMas);
                    } else {
                        // Mostrar todos los términos
                        $terms.slice(limit).slideDown(300);
                        $btn.addClass('showing-all');
                        $btn.text(termsVerMas.strings.verMenos);
                    }
                });
            }
        });
    }

    /**
     * Función para añadir tooltips a términos largos
     */
    function addTooltips() {
        $('.terms-ver-mas-container a').each(function() {
            var $term = $(this);
            var termText = $term.text();
            
            if (termText.length > 20) {
                $term.attr('title', termText);
            }
        });
    }

    /**
     * Función para manejar redimensionamiento de ventana
     */
    function handleResize() {
        $('.terms-ver-mas-container').each(function() {
            var $container = $(this);
            var $terms = $container.find('a');
            var limit = termsVerMas.limit || 10;
            
            if ($terms.length > limit) {
                // En móviles, ajustar el límite
                if ($(window).width() < 768) {
                    var mobileLimit = Math.min(limit, 5);
                    $terms.slice(mobileLimit).hide();
                } else {
                    $terms.slice(limit).hide();
                }
            }
        });
    }

    /**
     * Función para lazy loading de términos
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var $container = $(entry.target);
                        
                        // Inicializar funcionalidad para este contenedor
                        initSingleContainer($container);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('.terms-ver-mas-container').forEach(function(container) {
                observer.observe(container);
            });
        }
    }

    /**
     * Inicializar contenedor individual
     */
    function initSingleContainer($container) {
        var postId = $container.data('post-id');
        var taxonomy = $container.data('taxonomy');
        var $verMasBtn = $container.find('.terms-ver-mas-btn');
        
        if ($verMasBtn.length > 0) {
            setupVerMasButton($verMasBtn, $container, postId, taxonomy);
        }
    }

    /**
     * Función para crear términos dinámicamente
     */
    function createTermsFromData(data) {
        var $container = $('<div class="terms-ver-mas-container"></div>');
        
        data.terms.forEach(function(term, index) {
            var $term = $('<a href="' + term.url + '">' + term.name + '</a>');
            $container.append($term);
            
            if (index < data.terms.length - 1) {
                $container.append(data.separator || ', ');
            }
        });
        
        // Añadir botón "Ver más" si es necesario
        if (data.total > data.limit) {
            var $btn = $('<button type="button" class="terms-ver-mas-btn">' + 
                termsVerMas.strings.verMas + '</button>');
            $container.append($btn);
        }
        
        return $container;
    }

    /**
     * API pública para uso externo
     */
    window.TermsVerMas = {
        init: function() {
            initTermsVerMas();
        },
        
        initSimple: function() {
            initSimpleVersion();
        },
        
        showAllTerms: function(containerId) {
            var $container = $('#' + containerId);
            $container.find('a').show();
            $container.find('.terms-ver-mas-btn').hide();
        },
        
        hideExtraTerms: function(containerId, limit) {
            var $container = $('#' + containerId);
            var $terms = $container.find('a');
            limit = limit || termsVerMas.limit;
            
            $terms.slice(limit).hide();
        },
        
        createFromData: function(data) {
            return createTermsFromData(data);
        },
        
        refresh: function() {
            initTermsVerMas();
        }
    };

    // Event listeners
    $(window).on('resize', handleResize);
    
    // Inicializar lazy loading si está disponible
    if (typeof IntersectionObserver !== 'undefined') {
        initLazyLoading();
    } else {
        // Fallback para navegadores sin IntersectionObserver
        initTermsVerMas();
    }
    
    // Añadir tooltips
    addTooltips();
    
    // Manejar clicks en términos para analytics
    $('.terms-ver-mas-container').on('click', 'a', function() {
        var $term = $(this);
        var termName = $term.text();
        var termUrl = $term.attr('href');
        
        // Evento personalizado para analytics
        $(document).trigger('terms-ver-mas:term-clicked', {
            term: termName,
            url: termUrl,
            container: $term.closest('.terms-ver-mas-container')
        });
    });
    
    // Manejar clicks en botón "Ver más"
    $('.terms-ver-mas-container').on('click', '.terms-ver-mas-btn', function() {
        var $btn = $(this);
        var $container = $btn.closest('.terms-ver-mas-container');
        
        // Evento personalizado para analytics
        $(document).trigger('terms-ver-mas:button-clicked', {
            button: $btn,
            container: $container,
            showingAll: $btn.hasClass('showing-all')
        });
    });

})(jQuery);

