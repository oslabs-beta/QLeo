const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry point of our app
  entry: './landingPage/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,  // conditional  '.js(x)'
        exclude: /node_modules/,
        loader: 'babel-loader', // if it meets a conditional run it..
        options: {
          presets: ['@babel/env', '@babel/react'],
        }
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          //Reads Postcss to CSS
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    inject: false,
    template: path.resolve(__dirname, './landingPage/index.html')
  })],
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    //   publicPath: "/",
    // },
    compress: true,
    port: 8080,
  },
};