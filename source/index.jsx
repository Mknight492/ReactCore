//envornmnet setup imports
import "babel-regenerator-runtime";

//React imports
import React from "react";
import { render } from "react-dom";
import App from "./components/app/app.container";

//Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store/configure-store";

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

if (module.hot) {
  module.hot.accept("./components/app/app.container.js", () => {
    renderApp();
  });
}

if (module.hot) {
  require("./index.html");
}
