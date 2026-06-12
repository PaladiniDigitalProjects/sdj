# Guía de Activación - WP MCP Bridge

**Versión:** 0.4.0  
**Última actualización:** 2026-04-13

---

## Descripción

Este documento explica cómo configurar y activar el servidor MCP para controlar WordPress desde OpenCode, Claude Desktop o Claude Code.

---

## Requisitos Previos

- WordPress con el plugin **WP MCP Bridge** instalado y activo
- Docker instalado
- Credenciales de WordPress (usuario + Application Password)
- Lando ejecutándose (para desarrollo local)

---

## Paso 1: Activar el Plugin en WordPress

### Opción A: WP-CLI (Lando)

```bash
lando wp plugin activate wp-mcp-bridge
```

### Opción B: Manual

1. Ir a **WP Admin > Plugins**
2. Buscar "WP MCP Bridge"
3. Clic en **Activar**

---

## Paso 1.5: Configurar Endpoints del MCP (Opcional)

Una vez activado el plugin, puedes configurar qué grupos de endpoints estarán disponibles:

1. Ir a **Settings > MCP Bridge**
2. Marcar/desmarcar los grupos deseados:
   - **Posts & Pages** - Gestión de contenido (4 endpoints)
   - **WooCommerce Products** - Gestión de productos WC (2 endpoints)
   - **Plugins & Themes** - Instalación de plugins/temas (7 endpoints)
   - **WordPress Options** - Lectura/modificación de opciones (1 endpoint)
   - **System** - Info del sitio y caché (2 endpoints)
   - **Blocks & Patterns** - Gutenberg blocks y patrones (5 endpoints)
3. Clic en **Guardar cambios**

**Total: 21 endpoints configurables**

---

## Paso 2: Construir la Imagen Docker

```bash
cd mcp-server
docker build -t wordpress-mcp .
```

---

## Paso 3: Ejecutar el Contenedor

```bash
docker run -d --name wordpress-mcp \
  --network host \
  --add-host doga.lndo.site:127.0.0.1 \
  wordpress-mcp
```

**Nota:** El argumento `--add-host` es necesario para que el contenedor pueda resolver dominios `.lndo.site` de Lando.

---

## Paso 4: Configurar el Cliente MCP

### OpenCode

Crear o editar `opencode.json` en la raíz del proyecto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "wordpress": {
      "type": "local",
      "command": ["docker", "exec", "-i", "wordpress-mcp", "php", "/app/bin/wordpress-mcp"],
      "enabled": true
    }
  }
}
```

### Claude Desktop

Editar `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "docker",
      "args": ["exec", "-i", "wordpress-mcp", "php", "/app/bin/wordpress-mcp"]
    }
  }
}
```

### Claude Code

Crear `.mcp.json` en el proyecto:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "docker",
      "args": ["exec", "-i", "wordpress-mcp", "php", "/app/bin/wordpress-mcp"]
    }
  }
}
```

---

## Herramientas MCP Disponibles

El plugin expone las siguientes herramientas:

### Contenido

| Herramienta | Descripción |
|-------------|-------------|
| `get_posts` | Lista posts/páginas con filtros |
| `get_post` | Obtiene un post por ID |
| `create_post` | Crea nuevo post/página |
| `update_post` | Actualiza post existente |
| `get_product` | Obtiene producto WooCommerce |
| `update_product` | Actualiza producto WooCommerce |
| `get_post_meta` | Lee meta fields (ACF) |
| `update_post_meta` | Actualiza meta fields |
| `set_post_terms` | Asigna términos a taxonomías |

### Gestión

| Herramienta | Descripción |
|-------------|-------------|
| `manage_plugins` | Instala/activa/desactiva plugins |
| `manage_themes` | Instala/activa temas |

### Blocks & Patterns

| Herramienta | Descripción |
|-------------|-------------|
| `get_block_types` | Lista bloques Gutenberg registrados |
| `get_block_patterns` | Lista patrones de bloques disponibles |
| `get_synced_patterns` | Lista synced patterns del sitio |
| `get_synced_pattern` | Obtiene synced pattern por ID |
| `create_synced_pattern` | Crea synced pattern |
| `insert_block_reference` | Inserta bloque en post |

### Sistema

| Herramienta | Descripción |
|-------------|-------------|
| `get_option` | Lee opción de WordPress |
| `update_option` | Actualiza opción de WordPress |
| `cache_flush` | Vacía la caché |
| `site_info` | Información del sitio |

---

## Credenciales

Las credenciales ya están configuradas en `mcp-server/.env`:

```
WP_URL=https://doga.lndo.site/
WP_USER=r*+++++*@paladinidigital.com
WP_APP_PASSWORD='K3nz**********'
```

### Si necesitas un nuevo Application Password

1. Ir a **Usuarios > Perfil** en WordPress Admin
2. Scroll hasta "Application Passwords"
3. Añadir nuevo: nombre (ej: "MCP OpenCode")
4. Copiar la contraseña generada
5. Actualizar `mcp-server/.env`

---

## Verificar que Funciona

### Probar el endpoint REST del plugin

```bash
curl -u ricard@paladinidigital.com:'K3nz vlmD XrKZ k7FS OCHB f1ky' \
  https://doga.lndo.site/wp-json/mcp/v1/info
```

Debería devolver información del sistema.

### Probar el servidor MCP

```bash
docker exec -i wordpress-mcp php /app/bin/wordpress-mcp
```

Enviar un mensaje JSON de prueba:

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}
```

---

## Comandos Útiles

```bash
# Ver logs del contenedor
docker logs wordpress-mcp

# Reiniciar el contenedor
docker restart wordpress-mcp

# Detener el contenedor
docker stop wordpress-mcp

# Iniciar el contenedor
docker start wordpress-mcp

# Ver si el contenedor está corriendo
docker ps | grep wordpress-mcp

# Ver endpoints activos del plugin
curl -u user:pass https://doga.lndo.site/wp-json/mcp/v1/info
```

---

## Estructura de Archivos del Plugin

```
wp-content/plugins/wp-mcp-bridge/
├── wp-mcp-bridge.php              # Entrada del plugin
├── includes/
│   ├── class-settings.php          # Gestión de grupos de endpoints
│   ├── class-admin.php             # Menú admin
│   ├── class-router.php            # Rutas REST
│   ├── class-response.php          # Respuestas JSON
│   ├── class-wpcli-runner.php      # WP-CLI
│   └── endpoints/
│       ├── class-posts-endpoint.php
│       ├── class-products-endpoint.php
│       ├── class-plugins-endpoint.php
│       ├── class-themes-endpoint.php
│       ├── class-options-endpoint.php
│       ├── class-system-endpoint.php
│       └── class-blocks-endpoint.php
└── assets/css/admin.css
```

---

## Solución de Problemas

### Error: "401 Unauthorized"
- Verificar que el Application Password sea correcto
- Confirmar que el plugin está activo
- Verificar que el grupo de endpoints esté habilitado en Settings > MCP Bridge

### Error: "Connection refused"
- Verificar que Lando está ejecutándose (`lando start`)
- Verificar que el contenedor está corriendo

### Error: "SSL certificate error"
- El servidor ya deshabilita SSL verify para dominios `.lndo.site`
- Para otros dominios, asegurar que el certificado sea válido

### Endpoints no responden
- Ir a **Settings > MCP Bridge**
- Verificar que el grupo correspondiente esté marcado
- Clic en "Guardar cambios"

---

## Changelog

### v0.4.0 (2026-04-13)
- Endpoint `/blocks/types` para listar bloques Gutenberg
- Endpoint `/blocks/patterns` para patrones disponibles
- Endpoint `/blocks/synced` para synced patterns
- CRUD completo de synced patterns
- Insertar referencias a synced patterns en posts
- 6 nuevas tools MCP: get_block_types, get_block_patterns, get_synced_patterns, get_synced_pattern, create_synced_pattern, insert_block_reference
- Nuevo grupo "Blocks & Patterns" en admin panel (5 endpoints adicionales)

### v0.3.0 (2026-04-13)
- Panel de administración para activar/desactivar grupos de endpoints
- 5 grupos configurables: Posts, Products, Plugins, Options, System
- 16 endpoints totales configurables

### v0.2.0 (2026-04-13)
- Endpoint WooCommerce Products
- Soporte para meta fields (ACF)
- Soporte para taxonomías
- Featured images y galerías

### v0.1.0
- MVP: CRUD de posts, plugins, themes, options, sistema
