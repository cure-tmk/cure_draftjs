/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const mode = process.env.NODE_ENV || 'development'

const resolve = (relPath) => path.resolve(__dirname, relPath)

module.exports = {
  mode,
  entry: resolve('src/index.tsx'),
  output: {
    path: resolve(`dist`),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TARGET_ENV': JSON.stringify(process.env.TARGET_ENV),
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      inject: true,
    }),
  ],
}
