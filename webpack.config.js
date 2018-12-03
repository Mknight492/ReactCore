const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = {
  mode: "development",
  entry: {
    main: "./source/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/"
  },
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
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
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
    new webpack.NamedModulesPlugin()
  ]
};
