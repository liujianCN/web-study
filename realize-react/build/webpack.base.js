const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const alias = require('./config/alias');
const { resolve, isDev } = require('./utils/common.js');

module.exports = {
  entry: resolve('src/main.js'), // 入口文件
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: alias
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.css$/,
        use: isDev ? [
          'style-loader', 
          'css-loader'
        ] : [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader'
        ] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: isDev ? [
          'style-loader', 
          'css-loader', 
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ] : [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        use: isDev ? [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ] : [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API': JSON.stringify(process.env.API)
    })
  ]
}