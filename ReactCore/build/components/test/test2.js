"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function Test2() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);
    return (React.createElement("div", null,
        React.createElement("p", null,
            "You clicked ",
            count,
            " times"),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Click me")));
}
exports.Test2 = Test2;
//# sourceMappingURL=test2.js.map