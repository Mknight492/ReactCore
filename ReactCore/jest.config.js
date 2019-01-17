module.exports = {
  transform: { "^.+\\.tsx?$": "ts-jest" },
  testEnvironment: "jsdom",
  testRegex: ".(test|spec|etest).(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\module.scss$": "identity-obj-proxy"
  },
  setupFiles: ["<rootDir>/source/test/testconfig.d.ts"],
  setupTestFrameworkScriptFile: "<rootDir>/source/test/testconfig.ts",
  globals: {
    NODE_PATH: "source/"
  },
  moduleDirectories: ["node_modules", "source/"]
};
