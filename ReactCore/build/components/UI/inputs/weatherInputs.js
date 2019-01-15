"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_autocomplete_1 = require("react-autocomplete");
//css imports
const styles = require("../../friendForm/friendForm.module.scss");
const input = props => {
    let inputField = null;
    let errorMessage = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        errorMessage = React.createElement("em", null, props.errorMessage);
    }
    switch (props.elementType) {
        case "input":
            inputField = (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "block" } },
                    React.createElement("label", { className: styles.name, htmlFor: "name", id: "name" }, "Name:"),
                    React.createElement("input", { className: styles.input, key: props.id, type: props.type, value: props.value, onChange: props.changed, onBlur: props.blur }),
                    React.createElement("em", { className: styles.errorMessage }, errorMessage))));
            break;
        case "typeAhead":
            inputField = (React.createElement("div", null,
                React.createElement("label", { style: { textAlign: "left" }, className: styles.location, htmlFor: "location" }, "Location:"),
                React.createElement("div", { className: styles.typeAhead },
                    React.createElement(react_autocomplete_1.default, { name: "location", getItemValue: item => item, items: props.items, renderItem: (item, isHighlighted) => (React.createElement("div", { key: item, style: {
                                background: isHighlighted ? "lightgray" : "white"
                            }, className: "typeAheadComponent" }, item)), value: props.value, onChange: props.changed, onSelect: props.selectHandler, onBlur: props.changed })),
                React.createElement("em", { className: styles.errorMessage }, errorMessage)));
            break;
        default:
            inputField = null;
    }
    return React.createElement("div", null, inputField);
};
exports.default = input;
//# sourceMappingURL=weatherInputs.js.map