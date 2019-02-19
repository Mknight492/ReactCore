import React from "react";
import NavBar from "components/navigation/navigation";
import { render } from "react-dom";
import "babel-regenerator-runtime";
import "promise-polyfill/src/polyfill";

let root = document.getElementById("navRoot");
if (root) {
  render(<NavBar />, document.getElementById("navRoot"));
}
