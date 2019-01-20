﻿//envornmnet setup imports
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";

//React imports
import * as React from "react";
import { render } from "react-dom";
import Root from "./components/app/saga";

import Saga from "components/app/saga";
//Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store/configure-store";

//import global styles
import "./index.scss";

const renderApp = () => {
  render(
    <Root />,

    document.getElementById("app")
  );
};
renderApp();

declare const module: any;

///may need to be app.js
if (module.hot) {
  module.hot.accept("./components/app/saga", () => {
    renderApp();
  });
}

if (module.hot) {
  require("./index.html");
}
