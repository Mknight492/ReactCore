const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");
const postcssModulesValues = require("postcss-modules-values");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var autoprefixer = require("autoprefixer");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
//const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = ({ mode = "production", presets = [] }) => {
  return webpackMerge(
    {
      mode: mode,
      entry: {
        main: "./source/index.tsx"
      },
      output: {
        path: path.resolve(__dirname, "wwwroot/dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        publicPath: "/dist/"
      },
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        modules: [path.resolve(__dirname, "./source"), "node_modules"]
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
            test: /\.tsx?$/,
            exclude: [/node_modules/, /\.test\.tsx?$/],
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
            test: /\.(gif|jpe?g|tiff|png|svg|ttf|eot|woff2?)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000
                }
              }
            ]
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
        ]),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "./source/assets/webfonts"),
            to: "../webfonts"
          }
        ]),
        new ForkTsCheckerWebpackPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
