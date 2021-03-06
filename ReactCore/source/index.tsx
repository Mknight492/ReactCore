﻿//envornmnet setup imports
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";

//React imports
import * as React from "react";
import * as ReactDOM from "react-dom";

//Redux Imports
import { Provider } from "react-redux";
import { configureStore, store } from "redux/store/configure-store";

//components
import App from "components/app/app";

//import global styles
import "./index.scss";
//const store = configureStore();

const rootEl = document.getElementById("app");
let render = () => {
  //const dynamicImport = import('./my_module').then(x => x.default || x);
  const App = require("components/app/app").default;
  //const Default = App.default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};

if (String(process.env.NODE_ENV) === "development") {
  if (module.hot) {
    const renderApp = render;
    const renderError = error => {
      const RedBox = require("redbox-react");
      ReactDOM.render(<RedBox error={error} />, rootEl);
    };

    render = () => {
      try {
        renderApp();
      } catch (error) {
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
}

render();
