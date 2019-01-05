﻿const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");
const postcssModulesValues = require("postcss-modules-values");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var autoprefixer = require("autoprefixer");

const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: "[local]__[hash:base64:5]",
    minimize: true
  }
};

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: false,
    sourceMap: true,
    minimize: true
  }
};

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
      })
    ]
  }
};

module.exports = {
  mode: "development",
  entry: {
    main: "./source/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/dist/"
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [postcssModulesValues]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.scss$/,
        exclude: [/\.module\.scss$/],
        use: ["style-loader", CSSLoader, postCSSLoader, "sass-loader"]
      },
      {
        test: /\.module\.scss$/,
        use: ["style-loader", CSSModuleLoader, postCSSLoader, "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./source/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./source/index.html"),
      filename: path.resolve(__dirname, "./views/home/index.cshtml"),
      inject: "body"
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./source/assets"),
        to: ""
      }
    ])
  ]
};
