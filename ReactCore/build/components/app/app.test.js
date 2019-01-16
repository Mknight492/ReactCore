"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const app_1 = require("./app");
test("it Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(React.createElement(app_1.default, null), div);
    ReactDOM.unmountComponentAtNode(div);
});
function sum(a, b) {
    return a + b;
}
test("adds 1 +2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
//# sourceMappingURL=app.test.js.map