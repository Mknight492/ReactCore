module.exports = {
  transform: { "^.+\\.tsx?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: ".(test|spec).(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\module.scss$": "identity-obj-proxy"
  },
  setupTestFrameworkScriptFile: "<rootDir>/source/test/testconfig.js"
};
