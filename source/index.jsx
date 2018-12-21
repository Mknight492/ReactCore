//envornmnet setup imports
import "babel-regenerator-runtime";

//React imports
import React from "react";
import { render } from "react-dom";
import App from "./components/app/app.container";

//Redux Imports
import { Provider } from "react-redux";
import { configureStore, sagas } from "./redux/store/configure-store";

//saga import

import rootSaga from "./redux/sagas";

//generating redux store with middleware NB routerMiddleWare must remain fist

//import global styles

let store = configureStore();

sagas.run(rootSaga);

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
