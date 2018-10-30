const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { resolve, rules, plugins } = require('./webpack.common');

module.exports = {
  resolve,
  mode: 'production',
  entry: {
    vendors: [
      '@babel/polyfill',
      'react',
      'react-dom',
    ],
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash:6].min.js',
    publicPath: '/',
  },
  module: { rules: [...rules] },
  plugins: [
    ...plugins,
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['public']),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
