"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//envornmnet setup imports
require("babel-regenerator-runtime");
require("promise-polyfill/src/polyfill");
//React imports
var React = require("react");
var react_dom_1 = require("react-dom");
var app_container_1 = require("./components/app/app.container");
//Redux Imports
var react_redux_1 = require("react-redux");
var configure_store_1 = require("./redux/store/configure-store");
//import global styles
require("./index.scss");
var renderApp = function () {
    react_dom_1.render(React.createElement(react_redux_1.Provider, { store: configure_store_1.store },
        React.createElement(app_container_1.default, null)), document.getElementById("app"));
};
renderApp();
if (module.hot) {
    module.hot.accept("./components/app/app.container.js", function () {
        renderApp();
    });
}
if (module.hot) {
    require("./index.html");
}
//# sourceMappingURL=index.js.map