# Terms Ver Más Plugin - Documentación Completa

## Descripción

Terms Ver Más es un plugin de WordPress que modifica la función `get_the_terms()` para añadir automáticamente un botón "Ver más" cuando hay más de 10 términos asociados a un post. Las categorías restantes se ocultan para mantener una interfaz limpia y organizada.

## Características Principales

- ✅ **Modificación automática** de `get_the_terms()`
- ✅ **Botón "Ver más"** para más de 10 términos
- ✅ **Filtrado de términos** excluidos
- ✅ **Funcionalidad AJAX** para cargar términos dinámicamente
- ✅ **Shortcode personalizable** `[terms_ver_mas]`
- ✅ **Widget** para áreas de widgets
- ✅ **Panel de administración** configurable
- ✅ **Diseño responsive** y accesible
- ✅ **Soporte para todas las taxonomías**
- ✅ **Animaciones CSS** suaves

## Instalación

1. **Subir el plugin:**
   ```
   /wp-content/plugins/terms-ver-mas/
   ```

2. **Activar el plugin:**
   - Ve a **Plugins > Plugins instalados**
   - Busca "Terms Ver Más"
   - Haz clic en "Activar"

3. **Configurar opciones:**
   - Ve a **Configuración > Terms Ver Más**
   - Ajusta el límite de términos y términos excluidos

## Estructura del Plugin

```
terms-ver-mas/
├── terms-ver-mas.php          # Archivo principal
├── readme.txt                 # Información del plugin
├── uninstall.php             # Script de desinstalación
├── DOCUMENTACION.md          # Esta documentación
├── assets/                   # Recursos del plugin
│   ├── css/
│   │   └── terms-ver-mas.css # Estilos CSS
│   └── js/
│       └── terms-ver-mas.js  # JavaScript
└── languages/               # Archivos de traducción
    └── terms-ver-mas.pot    # Plantilla de traducción
```

## Uso

### 1. Automático

La funcionalidad se activa automáticamente cuando usas funciones como:

```php
// En templates de tema
$terms = get_the_terms($post_id, 'category');
the_terms($post_id, 'category');

// En el editor de bloques
// Cualquier bloque que use get_the_terms() automáticamente tendrá la funcionalidad
```

### 2. Shortcode

Usa el shortcode `[terms_ver_mas]` en cualquier lugar:

```php
// Básico
[terms_ver_mas]

// Con parámetros
[terms_ver_mas taxonomy="category" limit="5" separator=" | " show_count="true"]
```

**Parámetros del shortcode:**
- `post_id` - ID del post (por defecto: post actual)
- `taxonomy` - Taxonomía a mostrar (por defecto: "category")
- `limit` - Número de términos a mostrar inicialmente (por defecto: valor configurado)
- `separator` - Separador entre términos (por defecto: ", ")
- `class` - Clase CSS personalizada
- `show_count` - Mostrar conteo de posts (true/false)
- `exclude` - Términos adicionales a excluir (separados por comas)

### 3. Widget

1. Ve a **Apariencia > Widgets**
2. Busca "Términos con Ver Más"
3. Arrastra al área de widgets deseada
4. Configura:
   - Título del widget
   - Taxonomía
   - Límite inicial
   - Separador
   - Mostrar conteo

### 4. Uso Programático

```php
// Mostrar términos con "Ver más"
echo do_shortcode('[terms_ver_mas taxonomy="post_tag" limit="8"]');

// En templates personalizados
if (function_exists('get_the_terms')) {
    $terms = get_the_terms(get_the_ID(), 'category');
    if ($terms && !is_wp_error($terms)) {
        echo '<div class="post-categories">';
        echo get_the_term_list(get_the_ID(), 'category', '', ', ', '');
        echo '</div>';
    }
}
```

## Configuración

### Panel de Administración

Ve a **Configuración > Terms Ver Más** para configurar:

1. **Límite de términos:** Número de términos a mostrar antes de "Ver más" (por defecto: 10)
2. **Términos excluidos:** Separar con comas los slugs o nombres de términos a excluir

### Configuración por Código

```php
// Cambiar límite
update_option('terms_ver_mas_limit', 15);

// Añadir términos excluidos
update_option('terms_ver_mas_excluded_terms', array('ohsjd', 'categoria-oculta'));
```

## Personalización

### Estilos CSS

Añade estilos personalizados en tu tema:

```css
/* Personalizar botón "Ver más" */
.terms-ver-mas-btn {
    background-color: #your-color;
    color: #your-text-color;
    border-radius: 20px;
}

/* Personalizar términos */
.terms-ver-mas-container a {
    background-color: #your-bg-color;
    color: #your-text-color;
    border: 2px solid #your-border-color;
}

/* Personalizar por taxonomía */
.terms-ver-mas-container[data-taxonomy="category"] a {
    background-color: #category-color;
}

.terms-ver-mas-container[data-taxonomy="post_tag"] a {
    background-color: #tag-color;
}
```

### JavaScript Personalizado

```javascript
// Eventos personalizados
$(document).on('terms-ver-mas:term-clicked', function(e, data) {
    console.log('Término clickeado:', data.term);
    // Tu código aquí
});

$(document).on('terms-ver-mas:button-clicked', function(e, data) {
    console.log('Botón "Ver más" clickeado');
    // Tu código aquí
});

// API pública
TermsVerMas.showAllTerms('mi-contenedor');
TermsVerMas.hideExtraTerms('mi-contenedor', 5);
```

### Hooks y Filtros

```php
// Filtrar términos antes de mostrar
add_filter('terms_ver_mas_filter_terms', function($terms, $post_id, $taxonomy) {
    // Tu lógica de filtrado
    return $terms;
}, 10, 3);

// Modificar HTML del botón
add_filter('terms_ver_mas_button_html', function($html, $hidden_count) {
    return '<button class="mi-boton-personalizado">Ver ' . $hidden_count . ' más</button>';
}, 10, 2);
```

## Estructura HTML Generada

### HTML Básico
```html
<div class="terms-ver-mas-container" data-post-id="123" data-taxonomy="category">
    <a href="/category/term1/">Término 1</a>
    <a href="/category/term2/">Término 2</a>
    <!-- ... más términos ... -->
    <button type="button" class="terms-ver-mas-btn">Ver más...</button>
</div>
```

### HTML con AJAX
```html
<div class="terms-ver-mas-container" data-post-id="123" data-taxonomy="category">
    <a href="/category/term1/">Término 1</a>
    <!-- ... primeros términos ... -->
    <button type="button" class="terms-ver-mas-btn loading">
        <span class="ver-mas-text">Ver más...</span>
    </button>
</div>
```

## Clases CSS Disponibles

### Contenedor
- `.terms-ver-mas-container` - Contenedor principal
- `.terms-ver-mas-container[data-taxonomy="category"]` - Específico para categorías
- `.terms-ver-mas-container[data-taxonomy="post_tag"]` - Específico para etiquetas

### Botones
- `.terms-ver-mas-btn` - Botón "Ver más"
- `.terms-ver-mas-btn.loading` - Estado de carga
- `.terms-ver-mas-btn.simple-version` - Versión simple

### Estados
- `.showing-all` - Cuando se muestran todos los términos
- `.new-term` - Términos recién añadidos

## API JavaScript

### Funciones Globales
```javascript
// Reinicializar funcionalidad
TermsVerMas.init();

// Mostrar todos los términos
TermsVerMas.showAllTerms('container-id');

// Ocultar términos extra
TermsVerMas.hideExtraTerms('container-id', 5);

// Crear términos desde datos
var container = TermsVerMas.createFromData({
    terms: [
        {name: 'Término 1', url: '/term1/'},
        {name: 'Término 2', url: '/term2/'}
    ],
    separator: ', ',
    limit: 1
});
```

## Compatibilidad

- ✅ WordPress 5.0+
- ✅ PHP 7.4+
- ✅ Todos los temas
- ✅ Editor de bloques
- ✅ Móviles y tablets
- ✅ Navegadores modernos
- ✅ Accesibilidad (WCAG)

## Troubleshooting

### El botón "Ver más" no aparece
1. Verifica que hay más términos que el límite configurado
2. Comprueba que los archivos CSS/JS están cargados
3. Revisa la consola del navegador por errores JavaScript

### Los estilos no se aplican
1. Verifica que el archivo CSS está enqueueado
2. Comprueba conflictos con el tema
3. Añade `!important` si es necesario

### AJAX no funciona
1. Verifica que jQuery está cargado
2. Comprueba que el nonce es válido
3. Revisa los logs de errores de WordPress

### Filtros no funcionan
1. Verifica que los slugs/nombres de los términos son correctos
2. Comprueba que la configuración está guardada
3. Asegúrate de que no hay otros filtros conflictivos

## Ejemplos de Uso Avanzado

### En Templates de Tema
```php
// single.php
if (function_exists('get_the_terms')) {
    $categories = get_the_terms(get_the_ID(), 'category');
    if ($categories && !is_wp_error($categories)) {
        echo '<div class="entry-categories">';
        echo '<h4>Categorías:</h4>';
        echo get_the_term_list(get_the_ID(), 'category', '', ', ', '');
        echo '</div>';
    }
}

// archive.php
if (function_exists('get_the_terms')) {
    $tags = get_the_terms(get_the_ID(), 'post_tag');
    if ($tags && !is_wp_error($tags)) {
        echo '<div class="entry-tags">';
        echo get_the_term_list(get_the_ID(), 'post_tag', '', ', ', '');
        echo '</div>';
    }
}
```

### En Funciones Personalizadas
```php
function mostrar_categorias_con_ver_mas($post_id = null) {
    $post_id = $post_id ?: get_the_ID();
    return do_shortcode('[terms_ver_mas post_id="' . $post_id . '" taxonomy="category" limit="5"]');
}

function mostrar_etiquetas_con_ver_mas($post_id = null, $limit = 8) {
    $post_id = $post_id ?: get_the_ID();
    return do_shortcode('[terms_ver_mas post_id="' . $post_id . '" taxonomy="post_tag" limit="' . $limit . '"]');
}
```

### En Hooks Personalizados
```php
// Añadir a productos de WooCommerce
add_action('woocommerce_single_product_summary', function() {
    echo do_shortcode('[terms_ver_mas taxonomy="product_cat" limit="3"]');
}, 25);

// Añadir a eventos de The Events Calendar
add_action('tribe_events_single_event_after_the_content', function() {
    echo do_shortcode('[terms_ver_mas taxonomy="tribe_events_cat" limit="5"]');
}, 15);
```

## Soporte

Para soporte técnico o consultas sobre el plugin, contacta con DEVSJD:
- **Web:** https://devsjd.com
- **Email:** info@devsjd.com

## Changelog

### Versión 1.0.0
- Lanzamiento inicial
- Modificación automática de `get_the_terms()`
- Botón "Ver más" para más de 10 términos
- Funcionalidad AJAX
- Shortcode `[terms_ver_mas]`
- Widget personalizable
- Panel de administración
- Filtrado de términos excluidos
- Estilos responsive
- Soporte para todas las taxonomías
- Documentación completa

## Licencia

Este plugin está licenciado bajo GPL v2 o posterior.

