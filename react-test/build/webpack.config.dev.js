const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const dir = '../'
const projectRoot = path.resolve(__dirname, dir)

const resolve = p => path.resolve(__dirname, dir, p);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: resolve('dev'),
    open: true,
    port: 10086,
    //hot: true,
    overlay: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      'modules': resolve('src/modules'),
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
      //'react-dom': '@hot-loader/react-dom'
    }
  },
  entry: ['@/main.js'],
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
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
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}