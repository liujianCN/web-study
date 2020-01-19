const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require('./config/dev.config');
const { resolve } = require('./utils/common.js');

module.exports = webpackMerge(baseConfig, {
  // 指定构建环境
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: false,
    open: true,
    disableHostCheck: true,
    overlay: true,
    hot: false,
    host: devConfig.host,
    port: devConfig.port,
    proxy: devConfig.proxy
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      favicon: resolve('public/favicon.ico'),
      template: resolve('public/index.html')
    })
    // ,new webpack.HotModuleReplacementPlugin()
  ]
});