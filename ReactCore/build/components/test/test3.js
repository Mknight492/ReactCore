"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const axios_1 = require("axios");
function Test3() {
    // Declare a new state variable, which we'll call "count"
    const [text, setText] = React.useState("");
    return (React.createElement("form", { onSubmit: () => setText("") },
        React.createElement("button", { onClick: e => {
                e.preventDefault();
                setText("");
                axios_1.default
                    .get("api/Authenticate/CheckUser")
                    .then(result => {
                    console.log(result);
                    return result;
                })
                    .catch(error => {
                    console.log(error);
                });
            } }, "Click me"),
        React.createElement("textarea", { value: text, onChange: e => setText(e.target.value) })));
}
exports.Test3 = Test3;
//# sourceMappingURL=test3.js.map