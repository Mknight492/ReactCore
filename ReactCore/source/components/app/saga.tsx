import * as React from "react";

import { Root } from "redux/store/configure-store";
import App from "./app";

export default () => {
  return (
    <Root>
      <App />
    </Root>
  );
};
