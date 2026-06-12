# PDS Navigation - Product Documentation

## Product Description

PDS Navigation is a WordPress plugin that extends the core Navigation block with custom mobile menu styles. It provides 5 distinct menu animations (drawers, dropdowns, popup, fullscreen) with configurable settings for menu width, overlay, animation speed, and breakpoint.

Designed for themes using the WordPress Navigation block, it enhances the mobile user experience with smooth, professional menu animations.

---

## Version History

### v1.0.0 (Current)

**Release Date**: April 2026

**Core Features:**

| Feature | Description |
|---------|-------------|
| Mobile Menu Styles | Left Drawer, Right Drawer, Top Dropdown, Bottom Popup, Fullscreen Overlay |
| Menu Width | Configurable 200-600px (drawer styles) |
| Overlay | Dark overlay behind menu (0-100% opacity) |
| Animation Speed | Smooth 100-800ms transitions |
| Breakpoint | Responsive trigger 320-1200px |
| Close on Overlay | Tap outside to close |
| Close on Escape | Keyboard dismiss |

**Menu Handler Features:**

| Feature | Description |
|---------|-------------|
| Menu Toggle | Open/close buttons for custom menus |
| Header Scroll | Auto-hide header on scroll down |
| Submenus | Mobile: tap to expand, Desktop: hover |
| Centros Scroll | Smooth scroll to centros section |

**Technical Details:**

- Block editor integration with Inspector controls
- CSS-driven animations (no jQuery)
- Vanilla JavaScript only
- Singleton PHP architecture
- Proper error handling

---

### v1.1.0 (Planned)

**Target**: Q3 2026

**Features Under Consideration:**

| Feature | Priority | Description |
|---------|----------|-------------|
| Swipe Gestures | High | Touch swipe to open/close |
| Animation Presets | Medium | Preset animations (fade, scale) |
| Improved Accessibility | Medium | Focus trapping, ARIA improvements |
| RTL Support | Medium | Right-to-left language support |

**Estimated Development Time**: 2-3 weeks

---

### v2.0.0 (Vision)

**Target**: Q4 2026

**Major Features:**

| Feature | Description |
|---------|-------------|
| Custom Block | Standalone PDS Navigation block (not extending core) |
| FSE Support | Full Site Editor / Block Theme compatibility |
| Theme Builder | Integration with WordPress Site Editor |
| Custom Colors | Overlay color picker, not just dark |
| Menu Presets | Pre-designed menu templates |
| Animation Builder | Custom keyframe animations |

**Architecture Change:**

- Move from core block extension to custom block
- Register new block: `pds/navigation`
- Maintain backward compatibility with v1.x settings

**Estimated Development Time**: 6-8 weeks

---

## Comparison with Alternatives

| Feature | PDS Navigation | WP Mobile Menu | WalkerNavMenu |
|---------|---------------|---------------|--------------|
| Styles | 5 (+ none) | 3 | 2 |
| Configuration | Block settings | Plugin settings | Theme code |
| Animations | CSS transitions | CSS transitions | jQuery |
| Block Editor | Native | No | No |
| Dependencies | Vanilla JS | jQuery | jQuery |
| Updates | Active | Unknown | Abandoned |

---

## Use Cases

1. **Modern Themes**: Themes using WordPress Navigation block
2. **Custom Menus**: Sites requiring drawer/dropdown animations
3. **Mobile-First**: Responsive sites with custom mobile navigation
4. **Brand Identity**: Sites needing consistent menu animations

---

## Installation

1. Upload `pds_navigation` to `/wp-content/plugins/`
2. Activate via WordPress admin
3. Add Navigation block to page
4. Configure Mobile Menu in Inspector panel

---

## Support

- **Documentation**: Inline help in block Inspector
- **Issues**: Report via GitHub issues
- **Email**: contact@paladinidigital.com

---

## Changelog

### v1.0.0
- Initial release
- 5 menu styles (drawer, dropdown, popup, fullscreen)
- Block editor integration
- Menu handler for custom menus
- Centros link interception