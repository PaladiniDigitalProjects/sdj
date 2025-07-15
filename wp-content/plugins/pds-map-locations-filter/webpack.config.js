const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		index: './src/index.js', 
		view: './src/view.js',   
		style: './src/scss/main.scss',
		'tienda-lista-style': './src/blocks/tienda-lista/style.scss',
		'tienda-lista-editor': './src/blocks/tienda-lista/editor.scss',
		'map-locations-filter-style': './src/blocks/map-locations-filter/style.scss',
		'map-locations-filter-editor': './src/blocks/map-locations-filter/editor.scss',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		clean: true,
	},
	mode: isProduction ? 'production' : 'development',
	devtool: !isProduction ? 'source-map' : false,
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
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProduction,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	externals: {
		
	},
	plugins: [
		new DependencyExtractionWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: (pathData) => {
				// If the entry is 'index', wp-scripts/webpack expects the css output to be 'index.css'
				if (pathData.chunk.name === 'index') return 'index.css';
				if (pathData.chunk.name === 'style') return 'style.css';
                // Block specific outputs
				if (pathData.chunk.name === 'tienda-lista-editor') return 'blocks/tienda-lista/editor.css';
				if (pathData.chunk.name === 'tienda-lista-style') return 'blocks/tienda-lista/style.css';
				if (pathData.chunk.name === 'map-locations-filter-editor') return 'blocks/map-locations-filter/editor.css';
				if (pathData.chunk.name === 'map-locations-filter-style') return 'blocks/map-locations-filter/style.css';
				// Fallback - should ideally not be needed for standard entries
				return '[name].css';
			},
		}),
		new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/templates'),
                    to: path.resolve(__dirname, 'build/templates'),
                    globOptions: {
                        ignore: ['**/*.js', '**/*.scss'],
                    },
                    noErrorOnMissing: true,
                },
                 {
                     from: path.resolve(__dirname, 'src/blocks'),
                     to: path.resolve(__dirname, 'build/blocks'),
                     globOptions: {
                         ignore: ['**/*.js', '**/*.jsx', '**/*.scss', '**/*.css'],
                     },
                     to({ context, absoluteFilename }) {
                        const relativePath = path.relative(context, absoluteFilename);
                        if (/^[^\/]+\/block\.json$/.test(relativePath)) {
                            return path.join('blocks', relativePath);
                        }
                         const match = relativePath.match(/^([^\/]+)\/templates\/(.+\.php)$/);
                         if (match) {
                             const blockName = match[1];
                             const templateName = match[2];
                             return path.join('blocks', blockName, 'templates', templateName);
                         }
                         return '';
                     },
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
	stats: 'minimal',
};