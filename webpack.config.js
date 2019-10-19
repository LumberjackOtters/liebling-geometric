const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require ("cssnano")

module.exports = {
  context: path.resolve(__dirname, './src/'),
  entry: {
    "liebling-geometric": './sass/app.scss'
  },
  output: {
    path: path.resolve(__dirname, './assets/dist'),
    filename: '[name].js',
    publicPath: './assets/dist'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
      rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
              loader: "css-loader",
              options: {
                url: false
                  // minimize: {
                  //     safe: true
                  // }
              }
          },
          {
              loader: "postcss-loader",
              options: {
                  autoprefixer: {
                      browsers: ["last 2 versions"]
                  },
                  plugins: () => [
                      autoprefixer, cssnano
                  ]
              },
          },
          {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
    }
  },
  stats: { colors: true }
};
