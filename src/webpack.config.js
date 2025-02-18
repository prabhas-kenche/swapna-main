const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Adjust output path as needed
  },
  devtool: 'source-map', // Ensure source maps are enabled
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/react-responsive-3d-carousel/, // Ignore warnings from this package
      },
    ],
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert"),
      "util": require.resolve("util/"),
      "process": require.resolve("process"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
