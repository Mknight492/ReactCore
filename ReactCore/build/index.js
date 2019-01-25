//envornmnet setup imports
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";
//React imports
import * as React from "react";
import * as ReactDOM from "react-dom";
//Redux Imports
import { Provider } from "react-redux";
import { configureStore } from "./redux/store/configure-store";
//import global styles
import "./index.scss";
const store = configureStore();
const rootEl = document.getElementById("app");
let render = () => {
    const App = require("components/app/app").default;
    ReactDOM.render(React.createElement(Provider, { store: store },
        React.createElement(App, null)), rootEl);
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