# PDS Noticias - Plugin Specification

## Overview

**Plugin Name:** PDS - Noticias y Relacionados  
**Version:** 0.1.0  
**Author:** Paladini Digital Solutions  
**License:** GPL-2.0-or-later  
**Text Domain:** PDS

A WordPress block plugin that displays a carousel of news posts and publications with dynamic filtering by post type, taxonomy, and terms. Built with ACF (Advanced Custom Fields) integration.

---

## Core Functionality

### Block Registration
- **Block Name:** `acf/pdsnoticias`
- **Block Title:** PDS - Carrusel noticias
- **Category:** Formatting
- **API Version:** 3
- **Render Method:** PHP template (`render.php`)

### Features
1. Dynamic carousel of posts/publications using Owl Carousel
2. Manual or automatic content selection
3. Filtering by post types, taxonomies, and terms
4. Dynamic taxonomy/term dropdowns based on selected post types
5. Customizable ordering and display count
6. Optional call-to-action button
7. Support for multiple post types (posts, pages, events, publications)

---

## File Structure

```
PDS/
├── index.php                    # Main plugin file
└── pds-noticias/
    ├── block.json              # Block configuration
    ├── editor.js               # Admin editor JavaScript
    ├── render.php              # Frontend template
    ├── style.css               # Block styles
    └── PDS-translations.pot    # Translation template
```

---

## ACF Field Configuration

### Field Group: "Noticias relacionadas"
**Key:** `group_674632d1882ab`  
**Location:** Block = `acf/pdsnoticias`

#### Fields

| Field Label | Field Name | Type | Default | Width | Description |
|------------|-----------|------|---------|-------|-------------|
| Título apartado | `PDS_block_relacionado_title` | Text | - | 100% | Section title |
| Tipos de Contenido | `PDS_block_relacionado_tipos` | Checkbox | `['post', 'publicaciones']` | 25% | Post types to query |
| Número de publicaciones | `PDS_block_relacionado_numbers` | Number | 4 | 25% | Posts to display (1-16) |
| Orden | `PDS_block_relacionado_orden` | Select | `date-DESC` | 25% | Sort order |
| Taxonomía | `PDS_block_relacionado_taxonomia` | Select | - | 25% | Dynamic taxonomy filter |
| Filtrar por término | `PDS_block_relacionado_categoria` | Select | - | 50% | Dynamic term filter |
| Seleccionar contenido manualmente | `PDS_block_relacionado_contenido` | Relationship | - | 100% | Manual post selection |
| Llamada a la acción | `PDS_block_relacionado_CTA` | Link | - | 100% | Optional CTA button |

#### Post Type Choices
All public post types registered in WordPress are available dynamically.

#### Order Choices
- `date-DESC` - Más recientes (Most recent)
- `date-ASC` - Más antiguos (Oldest)
- `title-ASC` - Título A–Z
- `title-DESC` - Título Z–A
- `menuorder-ASC` - Manual

---

## Dynamic Filtering System

### Workflow

1. **Post Types Selection** → Triggers taxonomy filter update
2. **Taxonomy Selection** → Triggers term filter update
3. **Term Selection** → Filters query results

### AJAX Endpoints

#### 1. Get Taxonomies
**Action:** `pds_get_taxonomies`  
**Method:** POST  
**Nonce:** `pds_noticias_nonce`

**Request:**
```javascript
{
  action: 'pds_get_taxonomies',
  nonce: 'xxx',
  post_types: ['post', 'publicaciones']
}
```

**Response:**
```javascript
{
  success: true,
  data: {
    'category': 'Categories',
    'post_tag': 'Tags',
    // ... other common taxonomies
  }
}
```

**Logic:**
- Returns only taxonomies common to ALL selected post types
- Filters for public taxonomies with `show_ui = true`
- Ensures 'category' always appears first

#### 2. Get Terms
**Action:** `pds_get_terms`  
**Method:** POST  
**Nonce:** `pds_noticias_nonce`

**Request:**
```javascript
{
  action: 'pds_get_terms',
  nonce: 'xxx',
  taxonomy: 'category'
}
```

**Response:**
```javascript
{
  success: true,
  data: [
    { id: 1, name: 'News' },
    { id: 2, name: 'Updates' }
  ]
}
```

---

## Frontend Rendering

### Query Logic

#### Automatic Mode (Default)
```php
WP_Query([
  'post_type'      => $selected_post_types,
  'posts_per_page' => $post_numbers,
  'post_status'    => 'publish',
  'orderby'        => $order_by,
  'order'          => $order,
  'tax_query'      => [
    [
      'taxonomy' => $selected_taxonomy,
      'field'    => 'term_id',
      'terms'    => $term
    ]
  ]
])
```

#### Manual Mode
```php
WP_Query([
  'post__in'       => [selected post IDs],
  'post_type'      => 'any',
  'orderby'        => 'post__in' or $order_by,
  'order'          => $order,
  'posts_per_page' => count($manual_posts)
])
```

### Post Display

Each post card includes:
- Featured image (background)
- Event icon (for `tribe_events` post type)
- Post title
- Action buttons (for `publicaciones` post type):
  - "Ver publicación" (View publication) - opens digital link
  - "Descargar PDF" (Download PDF) - downloads PDF file

### Owl Carousel Configuration

```javascript
{
  center: false,
  autoplay: false,
  autoplayTimeout: 4000,
  margin: 16,
  nav: true,
  stagePadding: 10,
  responsive: {
    0:    { items: 2 },
    450:  { items: 2 },
    786:  { items: 3 },
    1024: { items: 4 }
  }
}
```

---

## JavaScript Architecture

### Editor.js Functions

#### `getFieldEl(name)`
Returns ACF field wrapper element by data-name attribute.

#### `getSelectEl(name)`
Returns select element within ACF field.

#### `rebuildSelect(name, choices, savedValue)`
Rebuilds Select2 dropdown with new options:
1. Destroys existing Select2 instance
2. Clears and repopulates options
3. Restores saved value if provided
4. Re-initializes Select2 via ACF

#### `loadTaxonomies(savedTaxonomy)`
Fetches taxonomies common to selected post types via AJAX.
- Ensures 'category' appears first
- Preserves saved taxonomy value
- Triggers term reload for active taxonomy

#### `loadTerms(taxonomy, savedTerm)`
Fetches terms for selected taxonomy via AJAX.
- Clears term dropdown if no taxonomy selected
- Preserves saved term value

### Event Listeners

```javascript
// Post types changed
$(document).on('change', 
  '[data-name="PDS_block_relacionado_tipos"] input[type="checkbox"]',
  () => loadTaxonomies(null)
);

// Taxonomy changed
$(document).on('change',
  '[data-name="PDS_block_relacionado_taxonomia"] select',
  (e) => loadTerms($(e.target).val(), null)
);
```

---

## ACF Filters (Server-Side)

### `acf/load_field/name=PDS_block_relacionado_taxonomia`
Pre-populates all public taxonomies to prevent saved values from being lost.
- Ensures 'category' is always first
- Includes all public taxonomies with `show_ui = true`
- JavaScript filters this list based on selected post types

### `acf/load_field/name=PDS_block_relacionado_categoria`
Pre-populates terms for the saved taxonomy.
- Defaults to 'category' taxonomy
- Loads terms from saved taxonomy if available
- Prevents saved term_id from being lost on page reload

---

## Block Supports

```json
{
  "jsx": true,
  "anchor": true,
  "color": {
    "text": true,
    "background": false
  }
}
```

---

## Dependencies

### Required Plugins
- Advanced Custom Fields (ACF) Pro

### JavaScript Libraries
- jQuery
- ACF Input scripts
- Owl Carousel 2 (frontend)

### WordPress Features
- Block Editor (Gutenberg)
- Custom Post Types
- Taxonomies
- WP_Query

---

## Custom Post Type Support

### Publicaciones
Special handling for publications post type:
- **Custom Fields:**
  - `publicacion-documento` - PDF download link
  - `publicacion-digital` - Digital publication link
- **Display:** Shows action buttons instead of permalink

### Tribe Events
- Displays event icon
- Shows in carousel with standard post layout

---

## Styling

### CSS Classes

- `.wp-block-noticias` - Main container
- `.section-header` - Title section
- `.section-title` - Title text
- `.post-list` - Carousel container
- `.entry` - Individual post card
- `.entry-tarja` - Card variant
- `.entry-link` - Clickable overlay
- `.entry-image` - Featured image background
- `.entry-content` - Content wrapper
- `.category-list` - Category badges
- `.entry-categories` - Individual category
- `.entry-title` - Post title
- `.publicaciones-actions` - Publication buttons
- `.section-footer` - CTA section

---

## Security

### Nonce Verification
All AJAX requests verify nonce: `pds_noticias_nonce`

### Data Sanitization
- `sanitize_key()` - Post types, taxonomy slugs
- `esc_attr()` - HTML attributes
- `esc_url()` - URLs
- `esc_html()` - Text output
- `wp_list_pluck()` - Extract post IDs

---

## Localization

**Text Domain:** `PDS`

### Translatable Strings
- "Evento" (Event)
- "Ver publicación" (View publication)
- "Descargar PDF" (Download PDF)

**Translation File:** `PDS-translations.pot`

---

## Known Issues & Considerations

1. **CSS Mismatch:** `style.css` contains `.acf-cta-block` styles (likely from template)
2. **ACF Dependency:** Plugin requires ACF Pro but doesn't check for it
3. **Owl Carousel:** External dependency not bundled or enqueued by plugin

---

## Future Enhancements

1. Add ACF Pro dependency check
2. Bundle/enqueue Owl Carousel properly
3. Add block preview in editor
5. Add loading states for AJAX operations
6. Implement error handling for failed AJAX requests
7. Add unit tests
8. Add block variations for different layouts

---

## Installation

1. Install and activate ACF Pro
2. Upload plugin to `/wp-content/plugins/PDS/`
3. Activate plugin
4. Ensure Owl Carousel is loaded by theme
5. Add block to any post/page via block editor

---

## Usage

1. Add "PDS - Carrusel noticias" block to page
2. Configure post types to display
3. (Optional) Select taxonomy and term to filter
4. (Optional) Manually select specific posts
5. Configure display count and order
6. (Optional) Add section title and CTA button
7. Publish/update page

---

## Version History

**0.1.1** - Current
- Dynamic post types: now loads all public post types from WordPress
- Hidden category badges in frontend display
- Fixed text domain consistency (PDP → PDS)

**0.1.0** - Initial release
- Basic carousel functionality
- Dynamic taxonomy/term filtering
- Manual post selection
- ACF integration
