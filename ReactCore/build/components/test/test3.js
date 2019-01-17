"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function Test3() {
    // Declare a new state variable, which we'll call "count"
    const [text, setText] = React.useState("");
    return (React.createElement("form", { onSubmit: () => setText("") },
        React.createElement("button", { onClick: e => {
                e.preventDefault();
                setText("");
            } }, "Click me"),
        React.createElement("textarea", { value: text, onChange: e => setText(e.target.value) })));
}
exports.Test3 = Test3;
//# sourceMappingURL=test3.js.map