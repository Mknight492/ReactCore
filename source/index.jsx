//envornmnet setup imports
import "babel-regenerator-runtime";

//React imports
import React from "react";
import { render } from "react-dom";
import App from "./components/app/app";

//Redux Imports
import { Provider } from "react-redux";
import { configureStore, history, sagas } from "./store/configure-store";

//routing Imports
import { ConnectedRouter } from "connected-react-router";

//saga imports
import WeatherSaga from "./sagas/weatherSaga";

//generating redux store with middleware NB routerMiddleWare must remain fist
let store = configureStore();

sagas.run(WeatherSaga);

const renderApp = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
  );
};
renderApp();

if (module.hot) {
  module.hot.accept("./components/app/app", () => {
    renderApp();
  });
}

//allow HMR for js and css imports and auto reloading on changing html
if (module.hot) {
  require("./index.html");
  module.hot.accept();
}
