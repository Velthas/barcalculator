const loader = require('css-loader');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(svg|jpg|jpeg|png|gif)$/i,
            type: 'asset/resource',
          },

      ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};