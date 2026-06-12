# WordPress MCP — TODO

**Última actualización:** 2026-04-13  
**Versión objetivo:** 0.4.0 — Blocks & Patterns

---

## Estado general

```
Plugin puente (wp-mcp-bridge)  ████████████ 100% completo
  └─ Admin Panel                ████████████ 100% completo ✅
  └─ Blocks & Patterns          ████████████ 100% completo ✅ NUEVO
MCP Server                     ████████████ 100% completo
Configuración / DevOps         ████████████ 100% completo
Tests                          ░░░░░░░░░░░░   0% pendiente
```

---

## Archivos creados ✅

### Plugin puente — `wp-content/plugins/wp-mcp-bridge/`

- [x] `wp-mcp-bridge.php` — entrada del plugin, carga dependencias y registra rutas
- [x] `includes/class-response.php` — helper estático `Response::success/error/not_found/forbidden`
- [x] `includes/class-wpcli-runner.php` — ejecuta WP-CLI, detecta Lando automáticamente
- [x] `includes/class-router.php` — registra rutas REST bajo `/wp-json/mcp/v1/` (con verificación de grupos)
- [x] `includes/class-settings.php` — gestión de opciones de grupos de endpoints
- [x] `includes/class-admin.php` — registro del menú de administración
- [x] `includes/admin/class-admin-page.php` — lógica del admin page
- [x] `includes/admin/views/settings-view.php` — template HTML del settings page
- [x] `assets/css/admin.css` — estilos del panel de administración
- [x] `includes/endpoints/class-posts-endpoint.php` — CRUD completo de posts/páginas + meta + taxonomías + imágenes
- [x] `includes/endpoints/class-products-endpoint.php` — endpoint optimizado para WooCommerce
- [x] `includes/endpoints/class-plugins-endpoint.php` — list/install/activate/deactivate/delete
- [x] `includes/endpoints/class-themes-endpoint.php` — list/install/activate
- [x] `includes/endpoints/class-options-endpoint.php` — get/update con blocklist de claves sensibles
- [x] `includes/endpoints/class-system-endpoint.php` — cache_flush e info del sitio
- [x] `includes/endpoints/class-blocks-endpoint.php` — blocks, patterns, synced patterns

### MCP Server — `mcp-server/`

- [x] `composer.json` — dependencias PHP, autoload PSR-4
- [x] `src/Config.php` — lee WP_URL, WP_USER, WP_APP_PASSWORD; carga .env opcional
- [x] `src/HttpClient.php` — cliente cURL con auth Basic, métodos GET/POST/PUT/DELETE
- [x] `src/Server.php` — loop stdio JSON-RPC 2.0, maneja initialize/tools/list/tools/call
- [x] `src/Tools/ToolInterface.php` — interfaz base: description(), input_schema(), execute()
- [x] `src/Tools/AbstractTool.php` — unwrap() y format_result() para respuestas del plugin
- [x] `src/Tools/SiteInfo.php` — llama GET /info
- [x] `src/Tools/GetPosts.php` — llama GET /posts con filtros opcionales
- [x] `src/Tools/GetPost.php` — llama GET /posts/{id}
- [x] `src/Tools/CreatePost.php` — llama POST /posts
- [x] `src/Tools/UpdatePost.php` — llama PUT /posts/{id}
- [x] `src/Tools/ManagePlugins.php` — enruta list/install/activate/deactivate/delete
- [x] `src/Tools/ManageThemes.php` — enruta list/install/activate
- [x] `src/Tools/GetOption.php` — llama GET /options/{key}
- [x] `src/Tools/UpdateOption.php` — llama PUT /options/{key}
- [x] `src/Tools/CacheFlush.php` — llama POST /cache/flush
- [x] `src/Tools/GetProduct.php` — obtiene producto WooCommerce completo
- [x] `src/Tools/UpdateProduct.php` — actualiza producto WooCommerce
- [x] `src/Tools/GetPostMeta.php` — lee meta fields de un post
- [x] `src/Tools/UpdatePostMeta.php` — actualiza meta fields específicos
- [x] `src/Tools/SetPostTerms.php` — asigna términos a taxonomías
- [x] `bin/wordpress-mcp` — ejecutable CLI (`#!/usr/bin/env php`)
- [x] `src/Tools/GetBlockTypes.php` — lista bloques Gutenberg
- [x] `src/Tools/GetBlockPatterns.php` — lista patrones de bloques
- [x] `src/Tools/GetSyncedPatterns.php` — lista synced patterns
- [x] `src/Tools/GetSyncedPattern.php` — obtiene synced pattern
- [x] `src/Tools/CreateSyncedPattern.php` — crea synced pattern
- [x] `src/Tools/InsertBlockReference.php` — inserta bloque en post

---

## v0.3.0 — Admin Panel 🎯

### Panel de Administración

**Ubicación:** Settings → MCP Bridge  
**URL:** `/wp-admin/options-general.php?page=wp-mcp-settings`

#### Archivos del Admin Panel

- [x] `includes/class-settings.php` — Clase WP_MCP_Settings para gestionar grupos
- [x] `includes/class-admin.php` — Registro del menú admin y carga de assets
- [x] `includes/admin/class-admin-page.php` — Lógica de guardado y renderizado
- [x] `includes/admin/views/settings-view.php` — Template HTML del settings page
- [x] `assets/css/admin.css` — Estilos del panel

#### Funcionalidades del Admin Panel

- [x] Toggle por grupo de endpoints (5 grupos)
- [x] Botón "Guardar cambios" con nonce verification
- [x] Estadísticas de endpoints habilitados
- [x] Lista de rutas por grupo
- [x] Enlace a gestión de Application Passwords
- [x] Persistencia en `wp_options` (`wp_mcp_enabled_groups`)

#### Grupos de Endpoints

| Grupo | Label | Endpoints | Rutas |
|-------|-------|-----------|-------|
| `posts` | Posts & Pages | 4 | /posts, /posts/{id}, /posts/{id}/meta, /posts/{id}/terms |
| `products` | WooCommerce Products | 2 | /products, /products/{id} |
| `plugins` | Plugins & Themes | 7 | /plugins/*, /themes/* |
| `options` | WordPress Options | 1 | /options/{key} |
| `system` | System | 2 | /info, /cache/flush |
| `blocks` | Blocks & Patterns | 5 | /blocks/types, /blocks/patterns, /blocks/synced, /blocks/synced/{id}, /posts/{id}/blocks |

#### Router modificado

- [x] `class-router.php` ahora verifica `WP_MCP_Settings::is_group_enabled()` antes de registrar rutas
- [x] Cada grupo tiene su método privado para registro de rutas

---

## v0.4.0 — Blocks & Patterns 🎯

### Blocks & Patterns Endpoints

- [x] GET `/blocks/types` — lista todos los bloques Gutenberg registrados
- [x] GET `/blocks/patterns` — lista patrones disponibles (tema, plugins, w.org)
- [x] GET `/blocks/synced` — lista synced patterns (reusable blocks)
- [x] GET `/blocks/synced/{id}` — obtiene synced pattern con contenido
- [x] POST `/blocks/synced` — crea synced pattern
- [x] PUT `/blocks/synced/{id}` — actualiza synced pattern
- [x] DELETE `/blocks/synced/{id}` — elimina synced pattern
- [x] POST `/posts/{id}/blocks` — inserta referencia a synced pattern en post

### MCP Tools para Blocks

- [x] `get_block_types` — lista bloques Gutenberg
- [x] `get_block_patterns` — lista patrones de bloques
- [x] `get_synced_patterns` — lista synced patterns
- [x] `get_synced_pattern` — obtiene synced pattern por ID
- [x] `create_synced_pattern` — crea synced pattern
- [x] `insert_block_reference` — inserta bloque en post

### Admin Panel

- [x] Nuevo grupo "Blocks & Patterns" añadido al admin panel

---

## v0.2.0 — WooCommerce + ACF + Taxonomías + Imágenes ✅

### Endpoint WooCommerce

- [x] GET `/products` — lista productos WooCommerce con metadata completa
- [x] GET `/products/{id}` — obtiene producto con precio, SKU, stock, imágenes, categorías, atributos
- [x] POST `/products` — crea producto WooCommerce
- [x] PUT `/products/{id}` — actualiza producto WooCommerce completo

### Endpoint Posts extendido

#### Meta fields
- [x] GET `/posts/{id}` incluye thumbnail, categories, tags, author_name
- [x] PUT `/posts/{id}` soporta `meta_input` para ACF y meta personalizados
- [x] GET `/posts/{id}/meta` — obtiene todos los meta fields
- [x] PUT `/posts/{id}/meta` — actualiza meta fields específicos

#### Taxonomías
- [x] GET `/posts/{id}/terms` — obtiene términos de todas las taxonomías
- [x] PUT `/posts/{id}/terms` — asigna términos a taxonomías específicas

#### Imágenes
- [x] Soporte para `featured_image` (ID o URL) en create/update
- [x] Respuesta incluye `featured_image` con id, url, alt
- [x] Soporte para `gallery` (array de attachment IDs)
- [x] GET incluye `gallery_images` array con id, url, alt, caption

---

## Pendiente ❌

### Documentación

- [ ] `README.md` — instalación paso a paso, configuración en Claude Code y Claude Desktop
- [ ] `CHANGELOG.md` — historial de versiones

### Tests

- [ ] `tests/PluginBridge/OptionsEndpointTest.php` — verifica blocklist y get/update
- [ ] `tests/PluginBridge/PostsEndpointTest.php` — verifica CRUD básico + meta/taxonomías
- [ ] `tests/PluginBridge/ProductsEndpointTest.php` — verifica endpoint WooCommerce
- [ ] `tests/PluginBridge/SettingsTest.php` — verifica toggle de grupos
- [ ] `tests/McpServer/ServerTest.php` — verifica initialize y tools/list
- [ ] `tests/McpServer/HttpClientTest.php` — verifica construcción de requests
- [ ] `phpunit.xml` — configuración de PHPUnit

---

## Completado ✅

- Plugin puente completo (100%)
- Admin Panel completo (100%)
- Extensión WooCommerce/ACF/Taxonomías/Imágenes (100%)
- MCP Server completo (100%)
- Nuevas tools MCP (100%)
- Configuración DevOps completa (100%)

---

## Notas de implementación

### Admin Panel

El panel permite activar/desactivar grupos de endpoints. Los cambios requieren guardar. La estructura de settings:

```php
// wp_mcp_enabled_groups
array(
    'posts' => true,
    'products' => true,
    'plugins' => true,
    'options' => true,
    'system' => true
)
```

### WooCommerce fields incluidos en respuesta de producto

```json
{
  "price": "45.00",
  "regular_price": "50.00",
  "sale_price": "45.00",
  "sku": "WT-5L-001",
  "stock_status": "instock",
  "stock_quantity": 150,
  "weight": "0.5",
  "dimensions": {
    "length": "20",
    "width": "15",
    "height": "10",
    "unit": "cm"
  },
  "featured_image": {
    "id": 123,
    "url": "https://...",
    "alt": "Washer Tank 5L"
  },
  "gallery": [
    {"id": 124, "url": "https://...", "alt": "..."}
  ],
  "categories": [{"id": 10, "name": "Washer Tanks", "slug": "washer-tanks"}],
  "tags": [{"id": 5, "name": "Agricultural", "slug": "agricultural"}],
  "attributes": [{"name": "Capacity", "value": "5L"}],
  "meta": {
    "_price": "45.00",
    "_sku": "WT-5L-001",
    "acf_field_key": "value"
  }
}
```

### Meta fields ACF

- Se leen/escriben vía `get_post_meta()` / `update_post_meta()`
- Formato: `acf_nombre_del_campo` → se almacena en `post_meta`
- Para actualizar: `{ "meta_input": { "acf_technical_spec": "value" } }`

### Taxonomías soportadas

- `category`, `post_tag` (posts estándar)
- `product_cat`, `product_tag`, `product_shipping_class` (WooCommerce)
- Cualquier taxonomía personalizada registrada en WordPress

### Imágenes

- `featured_image`: ID numérico o URL completa
- `gallery`: array de IDs numéricos
- Upload de medios: futuro (v0.5)
