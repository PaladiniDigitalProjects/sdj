=== Terms Ver Más ===
Contributors: devsjd
Tags: terms, categories, tags, taxonomy, ver mas, see more, get_the_terms
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Plugin que modifica get_the_terms para añadir un botón "Ver más" cuando hay más de 10 términos, ocultando las categorías restantes.

== Description ==

Terms Ver Más es un plugin de WordPress que mejora la funcionalidad de `get_the_terms()` añadiendo un botón "Ver más" cuando hay más de 10 términos asociados a un post. Las categorías restantes se ocultan automáticamente para mantener una interfaz limpia y organizada.

**Características principales:**

* **Modificación automática** de `get_the_terms()` para añadir funcionalidad "Ver más"
* **Filtrado de términos** excluidos (como categorías específicas)
* **Funcionalidad AJAX** para cargar términos dinámicamente
* **Shortcode personalizable** `[terms_ver_mas]` para uso flexible
* **Widget** para áreas de widgets
* **Panel de administración** para configurar opciones
* **Diseño responsive** y accesible
* **Animaciones CSS** suaves
* **Soporte para todas las taxonomías** (categorías, etiquetas, taxonomías personalizadas)

**Funcionalidades:**

* Botón "Ver más" automático cuando hay más de 10 términos
* Exclusión de términos específicos (configurable)
* Carga AJAX de términos adicionales
* Versión simple como fallback
* Personalización completa de estilos
* Soporte para múltiples idiomas
* Compatible con todos los temas

== Installation ==

1. Sube el plugin a la carpeta `/wp-content/plugins/terms-ver-mas/`
2. Activa el plugin a través del menú 'Plugins' en WordPress
3. Ve a **Configuración > Terms Ver Más** para configurar las opciones
4. La funcionalidad se activará automáticamente en todos los lugares donde se use `get_the_terms()`

== Frequently Asked Questions ==

= ¿Funciona con cualquier tema? =

Sí, el plugin está diseñado para funcionar con cualquier tema de WordPress sin conflictos.

= ¿Puedo cambiar el límite de términos? =

Sí, puedes configurar el límite en **Configuración > Terms Ver Más**. Por defecto es 10 términos.

= ¿Puedo excluir categorías específicas? =

Sí, puedes configurar qué términos excluir en el panel de administración del plugin.

= ¿Funciona con taxonomías personalizadas? =

Sí, el plugin funciona con todas las taxonomías de WordPress, incluyendo las personalizadas.

= ¿Es compatible con el editor de bloques? =

Sí, el plugin es compatible con el editor de bloques de WordPress y funciona con todos los bloques que usen `get_the_terms()`.

= ¿Puedo personalizar los estilos? =

Sí, puedes personalizar los estilos mediante CSS personalizado o modificando los archivos CSS del plugin.

== Screenshots ==

1. Panel de administración del plugin
2. Términos con botón "Ver más" en el frontend
3. Configuración de opciones del plugin
4. Widget de términos con "Ver más"
5. Shortcode en acción

== Changelog ==

= 1.0.0 =
* Lanzamiento inicial
* Modificación automática de `get_the_terms()`
* Botón "Ver más" para más de 10 términos
* Funcionalidad AJAX
* Shortcode `[terms_ver_mas]`
* Widget personalizable
* Panel de administración
* Filtrado de términos excluidos
* Estilos responsive
* Soporte para todas las taxonomías
* Documentación completa

== Upgrade Notice ==

= 1.0.0 =
Primera versión del plugin. No requiere actualizaciones especiales.

== Development ==

Este plugin está desarrollado por DEVSJD y está en constante mejora. Para reportar bugs o solicitar nuevas funcionalidades, contacta con el desarrollador.

== Support ==

Para soporte técnico o consultas sobre el plugin, contacta con DEVSJD a través de https://devsjd.com

== Credits ==

Desarrollado por DEVSJD
Inspirado en las necesidades de WordPress para mostrar términos de manera organizada

