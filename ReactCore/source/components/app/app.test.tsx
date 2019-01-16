import * as React from "react";
import * as ReactDOM from "react-dom";
import { create } from "react-test-renderer";
import App from "./app";

test("it Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

function sum(a, b) {
  return a + b;
}

test("adds 1 +2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
