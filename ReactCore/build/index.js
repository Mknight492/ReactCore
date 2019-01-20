"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//envornmnet setup imports
require("babel-regenerator-runtime");
require("promise-polyfill/src/polyfill");
//React imports
const React = require("react");
const ReactDOM = require("react-dom");
const configure_store_1 = require("./redux/store/configure-store");
//import global styles
require("./index.scss");
const store = configure_store_1.configureStore();
const rootEl = document.getElementById("app");
let render = () => {
    const Root = require("components/app/saga").default;
    ReactDOM.render(React.createElement(Root, { store: store }), rootEl);
};
///may need to be app.js
if (module.hot) {
    const renderApp = render;
    const renderError = error => {
        const RedBox = require("redbox-react");
        ReactDOM.render(React.createElement(RedBox, { error: error }), rootEl);
    };
    render = () => {
        try {
            renderApp();
        }
        catch (error) {
            renderError(error);
        }
    };
    module.hot.accept("components/app/app", () => {
        setTimeout(render);
    });
}
if (module.hot) {
    require("./index.html");
}
render();
//# sourceMappingURL=index.js.map