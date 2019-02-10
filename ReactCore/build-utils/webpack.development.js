const postcssPresetEnv = require("postcss-preset-env");
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
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: "/"
  },
  devtool: "source-map",
  optimization: {
    minimize: false
  },
  watch: true,
  module: {
    rules: [
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
  }
});
