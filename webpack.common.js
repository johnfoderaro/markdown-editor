const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  rules: [{
    test: /\.(js|jsx)$/,
    exclude: [/node_modules/],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/transform-react-jsx'],
      },
    },
  }, {
    test: /\.(png|jpg|gif|svg|ttf)$/,
    use: {
      loader: 'file-loader',
      options: { name: '[name].[ext]' },
    },
  }],
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      alwaysWriteToDisk: true,
      title: '',
      root: 'root',
      template: 'src/index.html',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
