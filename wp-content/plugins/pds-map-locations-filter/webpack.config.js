const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	// Define entry points for Webpack.
	// Each entry point generates a corresponding output file in the 'build' directory.
	entry: {
		// Main plugin editor entry point. This file should be responsible for registering ALL your blocks.
		index: './src/index.js',
		
		// Main plugin frontend CSS. This will be enqueued globally by the plugin's PHP.
		'style': './src/scss/main.scss',

		// A small, global frontend JavaScript file. Its primary purpose is to receive
		// `wp_localize_script` data (like your `mlf_ajax` object).
		'global-frontend': './src/global-frontend.js', 

		// --- Block-specific entry points (matching what 'block.json' 'file:' paths point to) ---
		// Map Locations Filter Block
		'blocks/map-locations-filter/index': './src/blocks/map-locations-filter/index.js',     // Editor Script (for block.json `editorScript`)
		'blocks/map-locations-filter/view': './src/blocks/map-locations-filter/view.js',       // Frontend Script (for block.json `viewScript`)
		'blocks/map-locations-filter/editor': './src/blocks/map-locations-filter/editor.scss', // Editor Styles (for block.json `editorStyle`)
		'blocks/map-locations-filter/style': './src/blocks/map-locations-filter/style.scss',   // Frontend Styles (for block.json `style`)

		// Tienda Lista Block
		'blocks/tienda-lista/index': './src/blocks/tienda-lista/index.js',     // Editor Script
		'blocks/tienda-lista/view': './src/blocks/tienda-lista/view.js',       // Frontend Script
		'blocks/tienda-lista/editor': './src/blocks/tienda-lista/editor.scss', // Editor Styles
		'blocks/tienda-lista/style': './src/blocks/tienda-lista/style.scss',   // Frontend Styles
	},
	output: {
		// Specifies the output file names based on the entry point keys.
		// E.g., 'blocks/map-locations-filter/index' will become 'blocks/map-locations-filter/index.js'.
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		clean: true, // Clean the build directory before each build.
	},
	mode: isProduction ? 'production' : 'development',
	devtool: !isProduction ? 'source-map' : false, // Generate source maps in development.
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@wordpress/babel-preset-default'],
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // Extracts CSS into separate files.
					'css-loader',                // Interprets @import and url() like import/require().
					{
						loader: 'sass-loader',   // Compiles Sass to CSS.
						options: {
							sourceMap: !isProduction, // Generate source maps for Sass.
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'], // Allow importing .js and .jsx files without specifying extension.
	},
	// `externals` is typically handled by `DependencyExtractionWebpackPlugin` for WordPress scripts.
	// You generally don't need to explicitly define WordPress dependencies here if using that plugin.
	externals: {
		// Example if you had specific non-WordPress libraries to exclude:
		// "jquery": "jQuery"
	},
	plugins: [
		// Automatically extracts WordPress script dependencies and generates .asset.php files.
		new DependencyExtractionWebpackPlugin({
            // injectPolyfill: true, // Consider adding for broader browser support if needed.
        }),
		// Extracts CSS into separate files instead of bundling them into JavaScript.
		new MiniCssExtractPlugin({
			filename: ({ chunk }) => {
				// Custom logic to determine output CSS file paths.
				// For entry points like 'blocks/map-locations-filter/editor', it creates 'blocks/map-locations-filter/editor.css'.
				if (chunk.name.startsWith('blocks/')) {
					const parts = chunk.name.split('/');
					// parts[0] = 'blocks', parts[1] = blockName, parts[2] = type (editor/style)
					return `blocks/${parts[1]}/${parts[2]}.css`;
				}
				// For top-level CSS entries (like 'style' for global frontend CSS).
				return `${chunk.name}.css`;
			},
		}),
		// Copies static assets (like block.json and PHP templates) from src to build.
		new CopyWebpackPlugin({
            patterns: [
                // Copies generic PHP templates from src/templates to build/templates.
                {
                    from: path.resolve(__dirname, 'src/templates'),
                    to: path.resolve(__dirname, 'build/templates'),
                    globOptions: {
                        ignore: ['**/*.js', '**/*.jsx', '**/*.scss', '**/*.css'], // Ignore code files.
                    },
                    noErrorOnMissing: true, // Don't error if src/templates is empty.
                },
                // Copies block-specific static assets (block.json, PHP templates) from src/blocks to build/blocks.
                {
                    from: path.resolve(__dirname, 'src/blocks'),
                    to: path.resolve(__dirname, 'build/blocks'),
                    // Dynamic path resolver for copied files.
                    to({ context, absoluteFilename }) {
                        const relativePath = path.relative(context, absoluteFilename);
                        // Matches block.json files (e.g., 'block-name/block.json').
                        if (/^[^\/]+\/block\.json$/.test(relativePath)) {
                            return path.join('blocks', relativePath);
                        }
                        // Matches PHP templates within block's 'templates' folder (e.g., 'block-name/templates/template.php').
                        const match = relativePath.match(/^([^\/]+)\/templates\/(.+\.php)$/);
                        if (match) {
                            const blockName = match[1];
                            const templateName = match[2];
                            return path.join('blocks', blockName, 'templates', templateName);
                        }
                        return ''; // Ignore other files in src/blocks.
                    },
                    // Filter to only copy block.json and PHP templates.
                    filter: (resourcePath) => {
                        const relativePath = path.relative(path.resolve(__dirname, 'src/blocks'), resourcePath);
                        if (/^[^\/]+\/block\.json$/.test(relativePath)) return true;
                        if (/^[^\/]+\/templates\/.+\.php$/.test(relativePath)) return true;
                        return false;
                    },
                    noErrorOnMissing: true,
                }
            ],
        }),
	],
	stats: 'minimal', // Keep build output concise.
};