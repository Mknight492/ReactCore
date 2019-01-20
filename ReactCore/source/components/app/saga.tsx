import * as React from "react";

import { Root } from "redux/store/configure-store";
import App from "./app";
import { Provider } from "react-redux";

export default ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
