// const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseWebpackConfig, {
  // 指定构建环境
  mode: 'development',
  devtool: 'source-map',
  // output: {
  //   publicPath: '/',
  //   devtoolModuleFilenameTemplate: '../[resource-path]'
  // },
  devServer: {
    contentBase: false,
    open: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3001,
    // port: 443,
    // https: true,
    hot: false,
    overlay: true
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
});