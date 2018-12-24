const merge = require('webpack-merge');
const base = require('./webpack.front.base');
const webpack = require('webpack');
const path = require('path');
const dist = path.join(__dirname, 'dist', 'ui');

module.exports = merge(base, {
  mode: 'development',
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/ui/__webpack_hmr&timeout=20000",
      "./ui/main.js"
    ]
  },
  output: {
    path: dist
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      _DEV_: true
    })
  ],
  devtool: "source-map"
});
