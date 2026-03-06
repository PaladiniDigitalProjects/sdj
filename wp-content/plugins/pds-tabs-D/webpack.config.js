const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...defaultConfig,
    entry: {
        editor: './src/editor.js',
        frontend: './src/frontend.js',
        style: './src/style.scss', // Switch to SCSS
    },
    module: {
        rules: [
            ...(defaultConfig.module.rules || []),

            // CSS
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                parser: 'postcss-scss', // <-- SCSS parser
                                plugins: [
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                ],
            },

            // SCSS
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                parser: 'postcss-scss', // <-- SCSS parser
                                plugins: [
                                    require('autoprefixer'),
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        ...(defaultConfig.plugins || []),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};
