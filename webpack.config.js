const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const browsers = ['chrome', 'firefox'];
const configs = browsers.map(browser => {
  const buildDir = path.join(`${__dirname}/build`, browser);
  return {
    entry: {
      popup: './src/popup.js',
      bg: './src/bg.js'
    },
    output: {
      path: buildDir,
      // publicPath: "/statics/",
      filename: '[name].js'
    },
    module: {
      // 在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案（排除了 npm 安裝的套件位置 node_modules）轉譯成瀏覽器可以閱讀的 JavaScript。
      // preset 則是使用的 babel 轉譯規則，這邊使用 react、es2015。
      // 若是已經單獨使用 .babelrc 作為 presets 設定的話，則可以省略 query
      loaders: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          // query: {
          //   presets: ['es2015', 'react'],
          // }
        },
        {
          test: /\.css$/,
          // loader: ['style-loader', 'css-loader']
          loader: 'style!css'
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192&name=images/[name].[ext]'
          // 當圖片大小小於 8k 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
          // name 讓這些檔案可以放到指定的位置並保留原本的名稱
        },      
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        //{
        //  test: /\.(png|jpg|woff|woff2)$/,
        //  loader: 'url-loader?limit=8192'
        //  // 當圖片大小小於 8k 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
        //},
        ////fonts loader
        //{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
        //{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
        //{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
        //{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
      ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        //title: 'My Test',
        filename: 'popup.html', 
        template: 'src/popup.html'
      }),
      new CleanWebpackPlugin(buildDir, {
        //root: '/full/project/path', // An absolute path for the root.
        verbose: true,  // Write logs to console.
        //dry: false, // Use boolean "true" to test/emulate delete. (will not remove files).
        //            // (Default: "false", remove files)
        //exclude: ['shared.js']
      }),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
        { from: 'src/images', to: 'images' },
        { from: `src/${browser}/manifest.json` }
      ])
      ,
      //UglifyJsPluginConfig
      new webpack.DefinePlugin({
        BROWSER: JSON.stringify(browser),
      })
    ]
  };
});

module.exports = configs;
