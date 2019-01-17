//envornmnet setup imports
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";

//React imports
import * as React from "react";
import { render } from "react-dom";
import App from "./components/app/app";

import Saga from "components/app/saga";
//Redux Imports
import { Provider } from "react-redux";
import { store, Root } from "./redux/store/configure-store";

//import global styles
import "./index.scss";

const renderApp = () => {
  render(
    <App />,

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
