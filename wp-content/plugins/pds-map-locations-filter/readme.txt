=== Pds Map Locations Filter ===
Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      6.0
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Example block scaffolded with Create Block tool.

== Description ==

This is the long description. No limit, and you can use Markdown (as well as in the following sections).

For backwards compatibility, if this section is missing, the full length of the short description will be used, and
Markdown parsed.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/pds-map-locations-filter` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 0.1.0 =
* Release


pds-map-locations-filter/
├── assets/
│   └── map-handler.js       (Frontend JavaScript)
├── build/
│   ├── index.js             (Compiled block JS)
│   ├── style.css            (Frontend styles)
│   ├── editor.css           (Editor styles)
│   └── block.json           (Metadata)
├── templates/
│   ├── map-container.php    (Map container template)
│   ├── filter-ui.php        (Filter interface template)
│   ├── locations-list.php   (List of locations template)
├── src/
│   ├── index.js             (Source code for the block)
│   ├── editor.scss          (Editor styles)
│   └── style.scss           (Frontend styles)
├── pds-map-locations-filter.php (Main plugin file)
└── package.json             (npm dependencies)




== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
