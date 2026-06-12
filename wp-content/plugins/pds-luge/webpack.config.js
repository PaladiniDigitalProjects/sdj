const path = require('path');

module.exports = {
    resolve: {
        fallback: {
          http: require.resolve("stream-http")
        }
      },
  mode: 'production', // or 'development' while testing
  entry: './src/index.js', // Your main JS file that imports Luge and initializes your code.
  output: {
    filename: 'bundle.js', // The output file that you'll enqueue
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
