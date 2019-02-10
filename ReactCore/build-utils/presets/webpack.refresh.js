var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = () => ({
  plugins: [
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:8080/"
      },
      {
        injectCss: true
      }
    )
  ]
});
