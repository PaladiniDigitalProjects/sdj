# WordPress MCP

Servidor MCP (Model Context Protocol) para controlar WordPress desde Claude.

## Requisitos

- PHP 8.1+
- Composer
- WordPress 5.6+ con Application Passwords
- (Opcional) Lando para desarrollo local

## Instalación

### 1. Instalar dependencias del MCP Server

```bash
cd mcp-server
composer install
```

### 2. Configurar credenciales

```bash
cp mcp-server/.env.example mcp-server/.env
```

Editar `.env` con tus datos:

```
WP_URL=https://tu-sitio.lndo.site
WP_USER=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

### 3. Instalar el plugin en WordPress

Copiar la carpeta `wp-content/plugins/wp-mcp-bridge/` a tu instalación de WordPress:

```bash
cp -r wp-content/plugins/wp-mcp-bridge /ruta/a/tu-wordpress/wp-content/plugins/
```

O crear un symlink:

```bash
ln -s /Users/pdp/Sites/PluginsWP/MCP_wordpressPDS/wp-content/plugins/wp-mcp-bridge /ruta/a/tu-wordpress/wp-content/plugins/
```

### 4. Activar el plugin

Desde WordPress Admin o WP-CLI:

```bash
wp plugin activate wp-mcp-bridge
```

### 5. Crear Application Password

1. Ir a **Usuarios > Perfil** en WordPress Admin
2. Scroll hasta "Application Passwords"
3. Añadir nuevo: nombre (ej: "Claude MCP")
4. Copiar la contraseña generada (formato: `xxxx xxxx xxxx xxxx xxxx xxxx`)
5. Pegarla en `.env` como `WP_APP_PASSWORD`

## Docker (sin PHP local)

Si no tienes PHP instalado, puedes usar Docker para ejecutar el MCP Server.

### 1. Configurar credenciales

```bash
cp mcp-server/.env.example mcp-server/.env
```

Editar `mcp-server/.env` con tus datos (importante: usar comillas simples para el password):

```
WP_URL=https://tu-sitio.lndo.site
WP_USER=admin
WP_APP_PASSWORD='xxxx xxxx xxxx xxxx xxxx xxxx'
```

### 2. Construir y ejecutar el contenedor

```bash
cd mcp-server
docker build -t wordpress-mcp .
docker run -d --name wordpress-mcp --network host --add-host tu-sitio.lndo.site:127.0.0.1 wordpress-mcp
```

### 3. Configurar en Claude Desktop

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

### Notas

- El flag `--network host` y `--add-host` son necesarios para que Docker pueda acceder a dominios `.lndo.site` del host
- Si reinicias tu computadora, inicia el contenedor con: `docker start wordpress-mcp`

## Configuración en Claude

### Claude Code

En el proyecto, crear `.mcp.json`:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "php",
      "args": ["/ruta/al/mcp-server/bin/wordpress-mcp"],
      "env": {
        "WP_URL": "https://tu-sitio.lndo.site",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
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
      "command": "php",
      "args": ["/ruta/al/mcp-server/bin/wordpress-mcp"],
      "env": {
        "WP_URL": "https://tu-sitio.lndo.site",
        "WP_USER": "admin",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}
```

## Tools disponibles

| Tool | Descripción |
|------|-------------|
| `site_info` | Información del sitio (versión WP, PHP, tema, plugins) |
| `get_posts` | Listar posts/páginas con filtros |
| `get_post` | Obtener un post por ID |
| `create_post` | Crear nuevo post/página |
| `update_post` | Actualizar post existente |
| `manage_plugins` | Listar/install/activate/deactivate/delete plugins |
| `manage_themes` | Listar/install/activate temas |
| `get_option` | Leer opción de wp_options |
| `update_option` | Actualizar opción |
| `cache_flush` | Vaciar caché |

## Desarrollo con Lando

```bash
# Iniciar entorno
lando start

# Instalar WordPress (si no existe)
lando wp core install --url=https://wordpress-mcp.lndo.site --title="WP MCP" --admin_user=admin --admin_password=admin --admin_email=test@test.com

# Instalar plugin
lando wp plugin install /app/wp-content/plugins/wp-mcp-bridge --activate

# Probar MCP Server
WP_URL=https://wordpress-mcp.lndo.site WP_USER=admin WP_APP_PASSWORD="..." php mcp-server/bin/wordpress-mcp
```

## Estructura del proyecto

```
wp-mcp-bridge/          # Plugin WordPress
├── wp-mcp-bridge.php   # Entry point
└── includes/
    ├── class-*.php     # Helpers
    └── endpoints/      # REST endpoints

mcp-server/             # MCP Server
├── bin/wordpress-mcp   # CLI entrypoint
├── src/
│   ├── Server.php      # MCP protocol handler
│   ├── HttpClient.php  # HTTP client
│   ├── Config.php      # Environment config
│   └── Tools/          # MCP tools
└── .env.example        # Config template
```

## Solución de problemas

### "401 Unauthorized"
- Verificar que el Application Password sea correcto
- Verificar que el usuario tenga rol de administrador

### "SSL certificate error"
- El servidor detecta automáticamente dominios `.lndo.site` y deshabilita SSL verify
- Para otros dominios HTTPS, asegurar que el certificado sea válido

### "Tool not found"
- Verificar que `composer install` se ejecutó correctamente
- Verificar que el autoload está cargado
