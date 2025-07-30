const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
    ...defaultConfig, // Inherit default settings from @wordpress/scripts
    entry: {
        // Define your custom entry points for each script
        editor: './src/editor.js',
        frontend: './src/frontend.js',
        // If you have a separate CSS/SCSS source file that needs to be
        // processed by webpack into the 'build' directory, you would
        // add an entry for it here, e.g., 'style: './src/style.scss''.
        // However, your PHP currently points to `style.css` in the root,
        // suggesting it's not being built by webpack into `build/`.
    },
    // The output path is automatically handled by `@wordpress/scripts`
    // to put the compiled files (e.g., build/editor.js, build/frontend.js)
    // in the 'build' directory relative to your entries.
};