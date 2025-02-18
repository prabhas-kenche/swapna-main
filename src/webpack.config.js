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
      "path": require.resolve("path-browserify"),
      "fs": false, 
      "util": require.resolve("util/")
    }
  }  
};
