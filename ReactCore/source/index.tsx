//envornmnet setup imports
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";

//React imports
import * as React from "react";
import { render } from "react-dom";
import App from "./components/app/app";

//Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store/configure-store";

//import global styles
import "./index.scss";

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
};
renderApp();

declare const module: any;

///may need to be app.js
if (module.hot) {
  module.hot.accept("./components/app/app", () => {
    renderApp();
  });
}

if (module.hot) {
  require("./index.html");
}
