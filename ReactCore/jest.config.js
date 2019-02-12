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
    "\\.scss$": "identity-obj-proxy",
    "^lodash-es$": "lodash"
  },
  setupFilesAfterEnv: [
    "<rootDir>/source/test/testconfig.ts"
    //"<rootDir>/source/test/setupJest.ts"
  ],
  globals: {
    NODE_PATH: "source/",
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json"
    }
  },
  roots: ["<rootDir>/source"],
  moduleDirectories: ["node_modules", "source/"],
  automock: false,
  transformIgnorePatterns: ["/!node_modules\\/lodash-es/", "node_modules"]
};
