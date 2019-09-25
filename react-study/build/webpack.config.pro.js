
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const dir = '../'
const projectRoot = path.resolve(__dirname, dir)

const resolve = p => path.resolve(__dirname, dir, p);

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      'containers': resolve('src/containers'),
      'components': resolve('src/components'),
      'constants': resolve('src/constants'),
      'styles': resolve('src/styles'),
      'utils': resolve('src/utils'),
      'selectors': resolve('src/selectors'),
      'store': resolve('src/redux/store'),
      'assets': resolve('src/assets'),
      'http': resolve('src/http/index'),
      'reducers': resolve('src/redux/reducers'),
      'actions': resolve('src/redux/actions'),
      'indexJS': resolve('src/indexJS/indexJS'),
      'CONF': resolve('src/CONF'),
      'image': resolve('src/assets/images')

    }
  },
  entry: ['@/main.js'],
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[hash:4].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true
          },
          output: {
            beautify: false, //不需要格式化
            comments: false //不保留注释
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API': JSON.stringify(process.env.API),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PLATFORM': JSON.stringify(process.env.PLATFORM)
      }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
    })
  ]
}