"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
exports.Hello = props => {
    return (React.createElement("h1", null,
        "Hello from ",
        props.compiler,
        " and ",
        props.framework,
        "!"));
};
//# sourceMappingURL=test3.js.map