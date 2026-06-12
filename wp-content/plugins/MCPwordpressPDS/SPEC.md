# WordPress MCP — Especificación técnica

**Versión:** 0.4.0  
**Estado:** Estable  
**Última actualización:** 2026-04-13

---

## 1. Visión general

`wordpress-mcp` es un servidor MCP (Model Context Protocol) que permite a Claude interactuar con una instalación de WordPress.org autoalojada como si fuese WP-CLI remoto. El sistema consta de dos piezas:

1. **Plugin puente** (`wp-mcp-bridge`) — plugin WordPress que expone endpoints REST privados.
2. **MCP Server** — proceso PHP CLI que implementa el protocolo MCP y traduce las tool calls en peticiones al plugin puente.

El entorno de referencia es **Lando + Docker**, aunque el diseño es agnóstico del hosting.

---

## 2. Arquitectura

```
Claude (MCP Client)
        │  stdio / SSE  (MCP Protocol)
        ▼
  MCP Server (PHP CLI)
        │  HTTPS + Authorization: Basic (Application Password)
        ▼
  wp-mcp-bridge plugin  (/wp-json/mcp/v1/*)
        │  WordPress PHP API
        ▼
  WordPress Core  ──►  MySQL
        │
        └──►  WP-CLI  (via shell_exec / lando exec)
```

### Componentes

| Componente | Lenguaje | Ubicación |
|---|---|---|
| MCP Server | PHP 8.1+ CLI | `mcp-server/` |
| Plugin puente | PHP 8.1+ | `wp-content/plugins/wp-mcp-bridge/` |
| Tests | PHPUnit | `tests/` |

---

## 3. Autenticación

- Mecanismo: **WordPress Application Passwords** (nativo desde WP 5.6).
- El MCP Server envía el header `Authorization: Basic base64(user:app_password)` en cada petición.
- Los endpoints del plugin puente verifican la autenticación con `is_user_logged_in()` + capacidad `manage_options`.
- Las credenciales se configuran en el MCP Server mediante variables de entorno:

```
WP_URL=https://mi-sitio.lndo.site
WP_USER=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

- **No se almacenan credenciales en el repositorio.** El archivo `.env` está en `.gitignore`.

---

## 4. Plugin puente — `wp-mcp-bridge`

### 4.1 Registro de rutas

Prefijo base: `/wp-json/mcp/v1/`

Todos los endpoints requieren autenticación (`permission_callback` con `current_user_can('manage_options')`).

### 4.2 Endpoints

#### Contenido

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/posts` | Lista posts/páginas con filtros opcionales |
| GET | `/posts/{id}` | Obtiene un post por ID (incluye thumbnail, categories, tags, meta) |
| POST | `/posts` | Crea un nuevo post (soporta featured_image, categories, tags, meta_input) |
| PUT | `/posts/{id}` | Actualiza un post existente |
| DELETE | `/posts/{id}` | Mueve un post a la papelera |
| GET | `/posts/{id}/meta` | Obtiene meta fields de un post |
| PUT | `/posts/{id}/meta` | Actualiza meta fields específicos |
| GET | `/posts/{id}/terms` | Obtiene términos de taxonomías |
| PUT | `/posts/{id}/terms` | Asigna términos a taxonomías |

Parámetros de filtro para `GET /posts`: `post_type`, `post_status`, `per_page`, `search`, `author`.

#### Productos WooCommerce

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/products` | Lista productos WooCommerce |
| GET | `/products/{id}` | Obtiene producto completo (precio, SKU, stock, imágenes, categorías) |
| POST | `/products` | Crea un producto WooCommerce |
| PUT | `/products/{id}` | Actualiza un producto WooCommerce |

#### Plugins

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/plugins` | Lista todos los plugins con estado |
| POST | `/plugins/install` | Instala un plugin desde el repositorio de WP |
| POST | `/plugins/activate` | Activa un plugin instalado |
| POST | `/plugins/deactivate` | Desactiva un plugin activo |
| DELETE | `/plugins/{slug}` | Elimina un plugin (debe estar inactivo) |

#### Temas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/themes` | Lista todos los temas con estado |
| POST | `/themes/install` | Instala un tema desde el repositorio de WP |
| POST | `/themes/activate` | Activa un tema instalado |

#### Opciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/options/{key}` | Lee el valor de una opción de `wp_options` |
| PUT | `/options/{key}` | Actualiza el valor de una opción |

Las opciones consideradas sensibles (`auth_key`, `secure_auth_key`, contraseñas, tokens) están en una **blocklist** y no son accesibles vía este endpoint.

#### Sistema

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/cache/flush` | Vacía el object cache y regenera rewrite rules |
| GET | `/info` | Devuelve versión de WP, PHP, plugins activos y tema activo |

#### Blocks & Patterns

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/blocks/types` | Lista todos los bloques Gutenberg registrados (core, plugins, theme) |
| GET | `/blocks/patterns` | Lista todos los patrones disponibles (tema, plugins, WordPress.org) |
| GET | `/blocks/synced` | Lista patrones sincronizados (reusable blocks) |
| GET/PUT/DELETE | `/blocks/synced/{id}` | CRUD de un synced pattern específico |
| POST | `/posts/{id}/blocks` | Inserta referencia a un synced pattern en un post |

### 4.3 Formato de respuesta

Todas las respuestas siguen la estructura:

```json
{
  "success": true,
  "data": { ... },
  "message": "Descripción opcional"
}
```

En caso de error:

```json
{
  "success": false,
  "code": "plugin_not_found",
  "message": "El plugin especificado no existe."
}
```

### 4.4 Ejecución de WP-CLI

Las operaciones que requieren WP-CLI (instalar plugins/temas, flush de caché avanzado) se ejecutan mediante:

```php
// Entorno Lando
shell_exec('cd ' . ABSPATH . ' && wp plugin install ' . escapeshellarg($slug) . ' 2>&1');

// Entorno genérico (WP-CLI disponible en PATH)
shell_exec('wp plugin install ' . escapeshellarg($slug) . ' --path=' . escapeshellarg(ABSPATH) . ' 2>&1');
```

El plugin detecta automáticamente si está en Lando comprobando la variable de entorno `LANDO_APP_NAME`.

### 4.5 Panel de Administración

El plugin incluye un panel de administración para gestionar los grupos de endpoints.

**Ubicación:** Settings → MCP Bridge  
**URL:** `/wp-admin/options-general.php?page=wp-mcp-settings`

#### Grupos de Endpoints

| Grupo | Label | Endpoints |
|-------|-------|-----------|
| `posts` | Posts & Pages | 4 endpoints |
| `products` | WooCommerce Products | 2 endpoints |
| `plugins` | Plugins & Themes | 7 endpoints |
| `options` | WordPress Options | 1 endpoint |
| `system` | System | 2 endpoints |
| `blocks` | Blocks & Patterns | 5 endpoints |

#### Persistencia

Los settings se almacenan en `wp_options` con la clave `wp_mcp_enabled_groups`.

#### Clase de Settings

```php
WP_MCP_Settings::is_group_enabled('posts');  // true/false
WP_MCP_Settings::get_enabled_groups();       // array de grupos habilitados
WP_MCP_Settings::set_enabled_groups($array); // guarda settings
WP_MCP_Settings::get_stats();                // estadísticas
```

---

## 5. MCP Server

### 5.1 Protocolo

Implementa el [Model Context Protocol](https://modelcontextprotocol.io) versión **2024-11-05**.

- Transporte: **stdio** (entrada/salida estándar JSON-RPC 2.0).
- Inicialización: responde a `initialize` con la lista de tools disponibles.
- Cada tool call es traducida en una petición HTTP al plugin puente.

### 5.2 Tools expuestas

| Tool | Descripción |
|---|---|
| `get_posts` | Lista o busca posts y páginas |
| `get_post` | Obtiene el contenido completo de un post por ID |
| `create_post` | Crea un nuevo post o página |
| `update_post` | Actualiza título, contenido o estado de un post |
| `get_product` | Obtiene un producto WooCommerce completo |
| `update_product` | Actualiza un producto WooCommerce (precio, stock, imágenes, categorías, ACF) |
| `get_post_meta` | Lee meta fields de un post (incluye ACF) |
| `update_post_meta` | Actualiza meta fields específicos de un post |
| `set_post_terms` | Asigna términos a taxonomías específicas |
| `manage_plugins` | Instala, activa o desactiva plugins |
| `manage_themes` | Instala o activa temas |
| `get_option` | Lee una opción de WordPress |
| `update_option` | Actualiza una opción de WordPress |
| `cache_flush` | Vacía la caché del sitio |
| `site_info` | Devuelve información general del sitio |
| `get_block_types` | Lista bloques Gutenberg registrados |
| `get_block_patterns` | Lista patrones de bloques disponibles |
| `get_synced_patterns` | Lista synced patterns del sitio |
| `get_synced_pattern` | Obtiene un synced pattern por ID |
| `create_synced_pattern` | Crea un nuevo synced pattern |
| `insert_block_reference` | Inserta referencia a synced pattern en un post |

### 5.3 Definición de tools (JSON Schema)

#### `manage_plugins`

```json
{
  "name": "manage_plugins",
  "description": "Instala, activa o desactiva un plugin de WordPress",
  "inputSchema": {
    "type": "object",
    "properties": {
      "action": {
        "type": "string",
        "enum": ["list", "install", "activate", "deactivate", "delete"],
        "description": "Acción a realizar"
      },
      "slug": {
        "type": "string",
        "description": "Slug del plugin (requerido para todas las acciones excepto list)"
      }
    },
    "required": ["action"]
  }
}
```

#### `get_posts`

```json
{
  "name": "get_posts",
  "description": "Lista posts o páginas de WordPress con filtros opcionales",
  "inputSchema": {
    "type": "object",
    "properties": {
      "post_type": { "type": "string", "default": "post" },
      "post_status": { "type": "string", "default": "publish" },
      "per_page": { "type": "integer", "default": 10, "maximum": 100 },
      "search": { "type": "string" }
    }
  }
}
```

### 5.4 Estructura de archivos

```
mcp-server/
├── bin/
│   └── wordpress-mcp          # Ejecutable CLI (#!/usr/bin/env php)
├── src/
│   ├── Server.php             # Loop principal MCP (stdin/stdout)
│   ├── HttpClient.php         # Cliente HTTP hacia el plugin puente
│   ├── Tools/
│   │   ├── GetPosts.php
│   │   ├── GetPost.php
│   │   ├── CreatePost.php
│   │   ├── UpdatePost.php
│   │   ├── GetProduct.php       # NEW: WooCommerce product
│   │   ├── UpdateProduct.php    # NEW: WooCommerce product
│   │   ├── GetPostMeta.php      # NEW: Read meta fields
│   │   ├── UpdatePostMeta.php   # NEW: Update meta fields
│   │   ├── SetPostTerms.php     # NEW: Set taxonomy terms
│   │   ├── ManagePlugins.php
│   │   ├── ManageThemes.php
│   │   ├── GetOption.php
│   │   ├── UpdateOption.php
│   │   ├── CacheFlush.php
│   │   ├── SiteInfo.php
│   │   ├── GetBlockTypes.php         # NEW: List Gutenberg blocks
│   │   ├── GetBlockPatterns.php      # NEW: List block patterns
│   │   ├── GetSyncedPatterns.php     # NEW: List synced patterns
│   │   ├── GetSyncedPattern.php      # NEW: Get synced pattern
│   │   ├── CreateSyncedPattern.php   # NEW: Create synced pattern
│   │   └── InsertBlockReference.php  # NEW: Insert block ref in post
│   └── Config.php             # Lee variables de entorno
├── composer.json
└── .env.example

wp-content/plugins/wp-mcp-bridge/
├── wp-mcp-bridge.php
└── includes/
    ├── class-router.php
    ├── class-response.php
    ├── class-wpcli-runner.php
    └── endpoints/
        ├── class-posts-endpoint.php     # Extended: meta, taxonomies, images
        ├── class-products-endpoint.php  # NEW: WooCommerce products
        ├── class-plugins-endpoint.php
        ├── class-themes-endpoint.php
        ├── class-options-endpoint.php
        └── class-system-endpoint.php
        └── class-blocks-endpoint.php    # NEW: Gutenberg blocks, patterns, synced patterns
```

---

## 6. Seguridad

- Los endpoints del plugin están protegidos por autenticación WP nativa. Sin credenciales válidas devuelven `401 Unauthorized`.
- El plugin solo es accesible si está en un entorno HTTPS (o `localhost` para desarrollo local).
- `update_option` tiene una blocklist de claves protegidas que nunca pueden modificarse.
- `manage_plugins` y `manage_themes` requieren la capacidad `install_plugins` / `install_themes` además de `manage_options`.
- El plugin registra cada operación de escritura en el log de WordPress (`error_log`) con el usuario autenticado.
- En producción, se recomienda añadir rate limiting a nivel de servidor (nginx/Apache) sobre el prefijo `/wp-json/mcp/`.

---

## 7. Configuración en Claude

### Claude Code (`~/.claude.json` o `.mcp.json` en el proyecto)

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "php",
      "args": ["/ruta/al/mcp-server/bin/wordpress-mcp"],
      "env": {
        "WP_URL": "https://mi-sitio.lndo.site",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}
```

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "php",
      "args": ["/ruta/al/mcp-server/bin/wordpress-mcp"],
      "env": {
        "WP_URL": "https://mi-sitio.lndo.site",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}
```

---

## 8. Requisitos

### Plugin puente

- WordPress 5.6+ (necesario para Application Passwords)
- PHP 8.1+
- WP-CLI instalado en el servidor o accesible vía Lando

### MCP Server

- PHP 8.1+ con extensiones: `curl`, `json`, `mbstring`
- Composer
- Acceso de red al sitio WordPress

### Entorno de desarrollo

- Lando 3.x
- Docker Desktop
- WP-CLI (incluido automáticamente en Lando con `type: wordpress`)

---

## 9. Hoja de ruta

### v0.1 — MVP
- [x] Especificación técnica (este documento)
- [x] Plugin puente con endpoints de plugins, temas y opciones
- [x] MCP Server con 10 tools básicas
- [x] Configuración Lando de referencia

### v0.2 — WooCommerce + ACF + Taxonomías
- [x] Endpoint `/products` para WooCommerce
- [x] Meta fields en posts (ACF compatible)
- [x] Taxonomías en posts (categorías, tags, personalizadas)
- [x] Featured images y galerías
- [x] Tools: get_product, update_product, get_post_meta, update_post_meta, set_post_terms

### v0.3 — Admin Panel
- [x] Panel de administración en Settings → MCP Bridge
- [x] Toggle por grupo de endpoints
- [x] Botón guardar con nonce verification
- [x] Estadísticas de endpoints habilitados

### v0.4 — Blocks & Patterns (Actual)
- [x] Endpoint `/blocks/types` para listar bloques Gutenberg
- [x] Endpoint `/blocks/patterns` para patrones disponibles
- [x] Endpoint `/blocks/synced` para synced patterns (reusable blocks)
- [x] CRUD completo de synced patterns
- [x] Insertar referencias a synced patterns en posts
- [x] 6 nuevas tools MCP para blocks/patterns
- [x] Nuevo grupo "Blocks & Patterns" en admin panel

### v0.5 — Observabilidad
- [ ] Log de operaciones en la pantalla de administración de WP
- [ ] Tool `get_logs` para leer el log de errores de WP
- [ ] Tool `run_cron` para lanzar eventos de WP-Cron manualmente

### v0.5 — Media & Enhancement
- [ ] Upload de imágenes vía MCP
- [ ] Soporte para Custom Post Types
- [ ] Tool `search_replace` (wraps `wp search-replace`)
- [ ] Bulk operations para posts y productos

---

## 10. Decisiones de diseño

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| PHP CLI para el MCP Server | Node.js / TypeScript | Todo el stack es PHP; sin cambio de contexto para el desarrollador |
| Application Passwords de WP | JWT / API Key custom | Nativo de WP, sin dependencias extra, integrado con el sistema de usuarios |
| Plugin puente REST | SSH + WP-CLI directo | Compatible con hostings sin SSH; más seguro y auditable |
| Lando como entorno de referencia | DDEV / Valet | Es el entorno declarado por el usuario |
