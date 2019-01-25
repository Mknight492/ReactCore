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
const react_autocomplete_1 = __importDefault(require("react-autocomplete"));
function Test2() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);
    return (React.createElement("div", null,
        React.createElement(react_autocomplete_1.default, { getItemValue: item => item, items: [], renderItem: (item, isHighlighted) => (React.createElement("div", { key: item, style: {
                //background: isHighlighted ? "lightgray" : "white"
                }, className: "typeAheadComponent" }, item)), value: "formRow.value", onChange: () => { }, onSelect: () => { } }),
        React.createElement("p", null,
            "You clicked ",
            count,
            " times"),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Click me")));
}
exports.Test2 = Test2;
//# sourceMappingURL=test2.js.map