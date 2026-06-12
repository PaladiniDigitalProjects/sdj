# PDS Navigation - Technical Specification

## Project Overview

- **Name**: PDS Navigation
- **Type**: WordPress Plugin
- **Purpose**: Extends WordPress Navigation block with custom mobile menu styles and animations
- **Version**: 1.0.0
- **Author**: PDS Dev
- **License**: GPL v2 or later

---

## Architecture

```
pds_navigation/
├── pds-navigation.php      # Main plugin file (PHP)
├── block.json          # Block registration
├── src/
│   ├── index.js       # Block editor extension
│   ├── frontend.js   # Frontend animations
│   ├── frontend.css # Frontend styles
│   └── menu-handler.js # Additional menu functionality
├── build/            # Compiled assets
├── Docs/
│   ├── SPEC.md       # This file
│   └── Product.md   # Product documentation
```

---

## Features

### 1. Block Editor Integration (index.js)

Extends `core/navigation` block via WordPress filters:

- **Filter**: `editor.BlockEdit` - Adds Mobile Menu panel to Inspector
- **Filter**: `blocks.registerBlockType` - Registers `pdsMobileMenu` attribute

**Inspector Controls:**

| Control | Type | Range | Default |
|---------|------|-------|--------|
| Menu Style | SelectControl | none, left-drawer, right-drawer, top-dropdown, bottom-popup, fullscreen | none |
| Menu Width | NumberControl | 200-600px | 320px |
| Overlay Opacity | RangeControl | 0-100% | 50% |
| Animation Speed | RangeControl | 100-800ms | 300ms |
| Breakpoint | NumberControl | 320-1200px | 768px |
| Close on Overlay Click | ToggleControl | boolean | true |
| Close on Escape Key | ToggleControl | boolean | true |

**Menu Styles:**

- `none` - No custom styling (default)
- `left-drawer` - Slide in from left
- `right-drawer` - Slide in from right
- `top-dropdown` - Slide down from top
- `bottom-popup` - Slide up from bottom
- `fullscreen` - Full screen overlay

---

### 2. PHP Backend (pds-navigation.php)

**Plugin Class**: `PDS_Navigation_Plugin`

**Actions:**
- `init` - Register block extension script
- `wp_enqueue_scripts` - Enqueue frontend assets

**Filters:**
- `render_block_core/navigation` - Inject data attributes to navigation block

**Methods:**

- `register_block_extension()` - Enqueue block editor script
- `enqueue_frontend_assets()` - Enqueue frontend CSS/JS, localize script
- `add_mobile_menu_attributes($block_content, $block)` - Parse HTML, inject data attributes

**Error Handling:**
- Uses `libxml_use_internal_errors(true)` for DOMDocument
- Returns original content if parsing fails

---

### 3. Frontend Animations (frontend.js)

Vanilla JavaScript - No dependencies

**Initialization:**
- Runs on DOMContentLoaded
- Uses MutationObserver for dynamic menus
- Double-init guard: `data-pdsInitialized` attribute

**Key Features:**

- **Breakpoint detection**: Only applies below configured breakpoint
- **CSS variables**: Sets `--pds-breakpoint`, `--pds-menu-width`, `--pds-overlay-opacity`, `--pds-animation-speed`
- **Class-based styling**: `.pds-menu--{style}` classes applied to menu element
- **State sync**: MutationObserver watches `container.classList.contains('is-menu-open')`
- **Overlay**: Dynamically inserted `.pds-nav-overlay` element
- **Event handling**:
  - Close on overlay click (finds and clicks close button)
  - Close on Escape key (capture phase: `true`)
- **Resize handling**: Disconnects observer on resize

---

### 4. Frontend Styles (frontend.css)

CSS-driven animations using transitions

**Structure:**

```css
.pds-nav-overlay           /* Overlay element */
.pds-menu-active         /* Applied when menu is configured */
.pds-menu--{style}     /* Style variant class */
.pds-menu-open         /* Applied when menu is open */
```

**Key Features:**

- Uses CSS custom properties for dynamic values
- Media query: `@media (max-width: var(--pds-breakpoint, 768px))`
- `!important` declarations to override theme styles
- Smooth transitions using `var(--pds-animation-speed, 300ms)`

**Menu Positioning:**

| Style | Position | Transform (closed) | Transform (open) |
|-------|----------|-------------------|-----------------|
| left-drawer | fixed, left: 0 | translateX(-100%) | translateX(0) |
| right-drawer | fixed, right: 0 | translateX(100%) | translateX(0) |
| top-dropdown | fixed, top: 0 | translateY(-100%) | translateY(0) |
| bottom-popup | fixed, bottom: 0 | translateY(100%) | translateY(0) |
| fullscreen | fixed, cover | opacity: 0 | opacity: 1 |

---

### 5. Menu Handler (menu-handler.js)

Additional menu functionality for specific themes

**Features:**

- **Menu Toggle**: Opens/closes `.menu-nav` via `#btn-open` / `#btn-close` buttons
- **Header Scroll**: Hides header on scroll down, shows on scroll up
- **Submenus**:
  - Mobile: Click to toggle, aria-expanded management
  - Desktop: Hover to show/hide
- **Centros Interception**:
  - Homepage: Smooth scroll to `#centros`
  - Other pages: Store target in sessionStorage, redirect to homepage, scroll after load

---

## Technical Implementation Details

### Data Flow

1. User configures menu in block editor
2. Settings saved to `pdsMobileMenu` attribute
3. PHP renders block with `data-pds-*` attributes
4. JS reads attributes, applies styles/animation
5. CSS handles positioning and transitions
6. JS observes state changes, updates UI

### CSS Priority

All styles use `!important` to override:
- WordPress core navigation styles
- Theme styles
- Other plugin styles

If conflicts occur, add higher specificity:
```css
.wp-block-navigation__responsive-dialog.pds-menu-active { ... }
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile: iOS Safari, Chrome for Android
- Requires JavaScript enabled

---

## Dependencies

- WordPress 6.0+
- PHP 7.4+ (DOMDocument)
- No external JS libraries (vanilla JS)