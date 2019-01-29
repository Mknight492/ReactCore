// module.exports = {
//   roots: ["<rootDir>/source"],
//   transform: {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   moduleDirectories: ["node_modules", "source/"],
//   moduleNameMapper: {
//     "\\module.scss$": "identity-obj-proxy",
//     "\\.scss$": "identity-obj-proxy"
//   },
//   testEnvironment: "jsdom"
// };

module.exports = {
  transform: { "^.+\\.tsx?$": "ts-jest", "^.+\\.jsx?$": "babel-jest" },
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\module.scss$": "identity-obj-proxy",
    "\\.scss$": "identity-obj-proxy"
  },
  setupFiles: [
    "<rootDir>/source/test/testconfig.d.ts",
    "<rootDir>/source/test/setupJest.ts"
  ],
  setupTestFrameworkScriptFile: "<rootDir>/source/test/testconfig.ts",
  globals: {
    NODE_PATH: "source/"
  },
  roots: ["<rootDir>/source"],
  moduleDirectories: ["node_modules", "source/"],
  automock: false
};
