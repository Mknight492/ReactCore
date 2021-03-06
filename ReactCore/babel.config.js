const isTest = String(process.env.NODE_ENV) === "test";
const isProd = String(process.env.NODE_ENV) === "production";
const isDev = String(process.env.NODE_ENV) === "development";

module.exports = {
  presets: [
    "@babel/react",
    "@babel/typescript",
    ["@babel/env", { modules: isTest ? "commonjs" : false }]
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: false
      }
    ],
    "react-hot-loader/babel",
    "@babel/plugin-syntax-dynamic-import"
  ],
  ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/, "node_modules"],
  env: {
    test: {
      plugins: ["dynamic-import-node"]
    }
  }
};

// module.exports = {
//   presets: [
//     [
//       "@babel/preset-env",
//       { targets: { browsers: "last 2 versions" }, modules: "commonjs" }
//       // or whatever your project requires
//     ],
//     "@babel/preset-typescript",
//     "@babel/preset-react"
//   ],
//   plugins: [
//     // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
//     //"react-hot-loader/babel",
//     "@babel/plugin-syntax-dynamic-import"
//   ],
//   env: {
//     test: {
//       plugins: ["dynamic-import-node", "add-module-exports"]
//     }
//   }
// };
