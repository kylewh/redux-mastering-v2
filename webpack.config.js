const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIST = [
  'react',
  'redux',
  'react-redux',
  'react-dom',
  'react-router'
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIST
  },
  devtool: "cheap-eval-source-map",
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    historyApiFallback: {
      index:'index.html'
    },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    publicPath: '/dist/',
    port: 9000
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      title: 'Mastering-Redux-V2',
    })
  ]
}