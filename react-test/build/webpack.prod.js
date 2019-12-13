
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const webpack = require('webpack');


const projectRoot = path.resolve(__dirname, '../');



module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    // publicPath: '/h5/unifyOrder/',
    filename: 'js/[name][contenthash:8].js',
    chunkFilename: 'js/[name][contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: projectRoot
        // exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[ext]',
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
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,  //使用多进程并行运行来提高构建速度
        sourceMap: false,
        uglifyOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true
          },
          output: {
            comments: false // 去掉注释
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true } // 移除注释
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,   // 大于30k会被webpack进行拆包
      minChunks: 1,     // 被引用次数大于等于这个次数进行拆分
      maxAsyncRequests: 5,  // 最大的按需加载（异步）请求次数
      maxInitialRequests: 5,
      automaticNameDelimiter: '~', // 打包分隔符
      name: true,
      cacheGroups: {
        // 拆分基础插件
        basic: {
          priority: 3,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|redux|react-redux|redux-saga|axios)[\\/]/
        },
        // 默认的配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: -10
        },
        // 默认的配置
        default: {
          minChunks: 2, // 引用超过两次的模块 -> default
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: './src/assets/favicon.ico',
      minify: {
        collapseWhitespace: true//html压缩
      }
    })
    //,new BundleAnalyzerPlugin()//打包分析
  ]
})