# Configuración de Google Maps API para PDS Map Locations Filter

## Introducción

Para que los marcadores personalizados (AdvancedMarkerElement) se muestren correctamente en el mapa, necesitas registrar un Map ID en Google Cloud Console. Este documento te guiará paso a paso en el proceso.

---

## Requisitos Previos

- Una cuenta de Google Cloud Platform (puedes crear una gratis en https://console.cloud.google.com)
- Un proyecto de Google Cloud activo
- Facturación habilitada en Google Cloud (es necesario para usar las APIs de Google Maps)

---

## Pasos para Configurar

### 1. Acceder a Google Cloud Console

1. Ve a https://console.cloud.google.com/
2. Inicia sesión con tu cuenta de Google
3. Selecciona o crea un proyecto

### 2. Habilitar las APIs necesarias

1. En el menú lateral, ve a **APIs y servicios** > **Biblioteca**
2. Busca y habilita las siguientes APIs:
   - **Maps JavaScript API** (obligatorio)
   - **Places API** (opcional, si usas autocompletado)
   - **Geocoding API** (opcional, para conversión de direcciones)

### 3. Crear credenciales

1. Ve a **APIs y servicios** > **Credenciales**
2. Haz clic en **Crear credenciales** > **Clave de API**
3. Copia la clave API generada
4. En WordPress, ve a **Ajustes** > **PDS Map Locations** y pega la clave

### 4. Registrar un Map ID (Importante)

Los marcadores personalizados requieren un Map ID registrado:

1. En Google Cloud Console, ve a **Maps JavaScript API**
2. En el menú lateral, busca **Map Management** > **Map IDs**
3. Haz clic en **Create New Map ID**
4. Rellena los datos:
   - **Map ID**: Un nombre único (ej: `pds-map-locations`)
   - **Description**: Descripción opcional
   - **Map Type**: Selecciona **JavaScript**
5. Haz clic en **Save**
6. Copia el **Map ID** generado (serie de números y letras)

### 5. Actualizar el código del plugin

1. Abre el archivo `src/blocks/map-locations-filter/view.js`
2. Busca la línea con `mapId:`
3. Reemplaza el valor actual con tu nuevo Map ID:

```javascript
mapId: 'TU_NUEVO_MAP_ID_AQUI', // Tu Map ID registrado
```

4. Guarda el archivo
5. Ejecuta `npm run build` para reconstruir el plugin
6. Sube los archivos actualizados a tu sitio WordPress

---

## Solución de Problemas

### Los marcadores no aparecen

- Verifica que el Map ID esté correctamente registrado
- Asegúrate de que la API de Maps JavaScript esté habilitada
- Comprueba que la clave API sea válida en la configuración del plugin

### Error "InvalidMapId"

- El Map ID no está registrado o tiene un formato incorrecto
- Vuelve a Google Cloud Console y verifica el Map ID

### El mapa no carga

- Verifica que la clave API tenga restricciones (opcional pero recomendado)
- Comprueba que la facturación esté habilitada en Google Cloud

---

## Notas Importantes

1. **Coste**: Google Maps tiene un nivel gratuito mensual, pero si superas el límite, se aplicará cargo por uso. Consulta https://cloud.google.com/maps-platform/pricing

2. **Map ID vs API Key**: 
   - La **API Key** es para autenticación y seguimiento de uso
   - El **Map ID** es para identificar un mapa específico y habilitar funciones avanzadas como marcadores personalizados

3. **Actualizaciones**: Si cambias el estilo del mapa en Cloud Console, los cambios se reflejarán automáticamente en tu sitio.

---

## Contacto y Soporte

Si tienes problemas con la configuración, consulta:
- Documentación oficial: https://developers.google.com/maps/documentation/javascript
- Soporte de Google Cloud: https://cloud.google.com/support

---

*Documento generado para PDS Map Locations Filter v2.0.7*
