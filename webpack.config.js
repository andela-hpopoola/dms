const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'client/app.jsx'
  ],
  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true
    }),

  ],
  output: {
    path: path.join(__dirname, 'client/public/'),
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
