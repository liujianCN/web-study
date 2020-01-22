const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require('./config/dev.config');
const { resolve } = require('./utils/common.js');

module.exports = {
  // 指定构建环境
  mode: 'development',
  entry: resolve('index.js'), // 入口文件
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': resolve('react'),
      'react-dom': resolve('react-dom'),
    }
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

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
      template: resolve('public/index.html')
    })
  ]
};
