const path = require('path');

const { resolve, rules, plugins } = require('./webpack.common');

module.exports = {
  plugins,
  resolve,
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      ...rules,
    ],
  },
};
