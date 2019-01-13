const postcssPresetEnv = require("postcss-preset-env");

module.exports = () =>
  (module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-mixins"),
                  postcssPresetEnv({
                    exportTo: "./wwwroot/file.css",
                    features: {
                      "nesting-rules": true
                    }
                  }),
                  require("postcss-simple-vars")(),
                  require("postcss-import")(),
                  require("postcss-hexrgba"),
                  require("postcss-selector-not")
                ]
              }
            },
            "resolve-url-loader",
            "sass-loader"
          ]
        }
      ]
    },
    devtool: "source-map",
    devServer: {
      stats: "errors-only",
      contentBase: "source/index.js"
    }
  });
