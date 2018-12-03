import React from "react";
import { create } from "react-test-renderer";
import App from "./app";

test("snapshot", () => {
  const c = create(<App />);
  expect(c.toJSON()).toMatchSnapshot();
});
