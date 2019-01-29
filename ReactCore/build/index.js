"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//envornmnet setup imports
require("babel-regenerator-runtime");
//import "promise-polyfill/src/polyfill";
//React imports
const React = __importStar(require("react"));
const ReactDOM = __importStar(require("react-dom"));
//Redux Imports
const react_redux_1 = require("react-redux");
const configure_store_1 = require("redux/store/configure-store");
//import global styles
require("./index.scss");
//const store = configureStore();
const rootEl = document.getElementById("app");
let render = () => {
    //const dynamicImport = import('./my_module').then(x => x.default || x);
    const App = require("components/app/app").default;
    //const Default = App.default;
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: configure_store_1.store },
        React.createElement(App, null)), rootEl);
};
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