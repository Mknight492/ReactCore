"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Test2() {
    // Declare a new state variable, which we'll call "count"
    var _a = React.useState(0), count = _a[0], setCount = _a[1];
    return (React.createElement("div", null,
        React.createElement("p", null,
            "You clicked ",
            count,
            " times"),
        React.createElement("button", { onClick: function () { return setCount(count + 1); } }, "Click me")));
}
exports.Test2 = Test2;
//# sourceMappingURL=test2.js.map