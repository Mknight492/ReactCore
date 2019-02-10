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

process.env.mode;

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
      // resolve: {
      //   alias: {
      //     react: "preact-compat",
      //     "react-dom": "preact-compat",
      //     // Not necessary unless you consume a module using `createClass`
      //     "create-react-class": "preact-compat/lib/create-react-class",
      //     // Not necessary unless you consume a module requiring `react-dom-factories`
      //     "react-dom-factories": "preact-compat/lib/react-dom-factories"
      //   }
      // },
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
// Alternative TS lint config
// {
//   "extends": [
//     "tslint:recommended",
//     "tslint-react",
//     "tslint-config-prettier"
//   ],
//   "rules": {
//     "ordered-imports": false,
//     "object-literal-sort-keys": false,
//     "interface-name": false,
//     "member-ordering": false
//   }
// }
