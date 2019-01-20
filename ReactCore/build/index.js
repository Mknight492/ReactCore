"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//envornmnet setup imports
require("babel-regenerator-runtime");
require("promise-polyfill/src/polyfill");
//React imports
const React = require("react");
const react_dom_1 = require("react-dom");
const saga_1 = require("./components/app/saga");
//import global styles
require("./index.scss");
const renderApp = () => {
    react_dom_1.render(React.createElement(saga_1.default, null), document.getElementById("app"));
};
renderApp();
///may need to be app.js
if (module.hot) {
    module.hot.accept("./components/app/saga", () => {
        renderApp();
    });
}
if (module.hot) {
    require("./index.html");
}
//# sourceMappingURL=index.js.map