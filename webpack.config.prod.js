const config = require('./webpack.config');

var webpack = require('webpack');
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = {
  entry: config.entry,
  output: config.output,
  module: config.module,
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    UglifyJsPluginConfig
  ].concat(config.plugins)
};