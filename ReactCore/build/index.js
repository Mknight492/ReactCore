"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//envornmnet setup imports
require("babel-regenerator-runtime");
require("promise-polyfill/src/polyfill");
//React imports
const React = require("react");
const react_dom_1 = require("react-dom");
const app_1 = require("./components/app/app");
//Redux Imports
const react_redux_1 = require("react-redux");
const configure_store_1 = require("./redux/store/configure-store");
//import global styles
require("./index.scss");
const renderApp = () => {
    react_dom_1.render(React.createElement(react_redux_1.Provider, { store: configure_store_1.default },
        React.createElement(app_1.default, null)), document.getElementById("app"));
};
renderApp();
///may need to be app.js
if (module.hot) {
    module.hot.accept("./components/app/app", () => {
        renderApp();
    });
}
if (module.hot) {
    require("./index.html");
}
//# sourceMappingURL=index.js.map