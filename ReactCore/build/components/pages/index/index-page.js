"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const test2_1 = require("../../test/test2");
const test3_1 = require("../../test/test3");
const IndexPage = props => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, " you shouldn't be here..."),
        React.createElement("h2", null, " you shouldn't be here"),
        React.createElement(test2_1.Test2, null),
        React.createElement(test3_1.Hello, { compiler: "typescript", framework: "React" })));
};
exports.default = IndexPage;
//# sourceMappingURL=index-page.js.map