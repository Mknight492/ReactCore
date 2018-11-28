//envornmnet setup imports
import "babel-regenerator-runtime";

//React imports
import React from "react";
import { render } from "react-dom";
import App from "./components/app/app";

//Redux Imports
import { Provider } from "react-redux";
import { configureStore, sagas } from "./store/configure-store";

//saga imports
import WeatherSaga from "./sagas/weatherSaga";

//generating redux store with middleware NB routerMiddleWare must remain fist
let store = configureStore();

sagas.run(WeatherSaga);

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
  module.hot.accept("./components/app/app.js", () => {
    renderApp();
  });
}

if (module.hot) {
  require("./index.html");
}
