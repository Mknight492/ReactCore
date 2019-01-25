"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const test2_1 = require("../../test/test2");
const test3_1 = require("../../test/test3");
const POJS_js_1 = __importDefault(require("./POJS.js"));
const IndexPage = props => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, " you shouldn't be here.."),
        React.createElement("h2", null, " you shouldn't be here..."),
        React.createElement(test2_1.Test2, null),
        React.createElement(test3_1.Test3, null),
        React.createElement(POJS_js_1.default, null)));
};
exports.default = IndexPage;
//# sourceMappingURL=index-page.js.map