"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// @ts-ignore
var test2_tsx_1 = require("../../test/test2.tsx");
// @ts-ignore
var test3_tsx_1 = require("../../test/test3.tsx");
var IndexPage = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, " you shouldn't be here"),
        React.createElement("h2", null, " you shouldn't be here"),
        React.createElement("h2", null, " you shouldn't be here"),
        React.createElement(test2_tsx_1.Test2, null),
        React.createElement(test3_tsx_1.Hello, { compiler: "typescript", framework: "React" })));
};
exports.IndexPage = IndexPage;
//# sourceMappingURL=index-page.js.map