const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  presets: [
    "@babel/react",
    "@babel/typescript",
    ["@babel/env", { modules: isTest ? "commonjs" : false }]
  ],
  plugins: ["react-hot-loader/babel", "@babel/plugin-syntax-dynamic-import"]
};
