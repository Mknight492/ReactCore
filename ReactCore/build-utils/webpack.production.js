const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
var autoprefixer = require("autoprefixer");

const CSSModuleLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: "[local]__[hash:base64:5]",
    minimize: true,
    namedExport: true
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

module.exports = () => ({
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all"
    }
  },
  devtool: "none",
  watch: false,
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/\.module\.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          CSSLoader,
          postCSSLoader,
          "sass-loader"
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          CSSModuleLoader,
          postCSSLoader,
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
