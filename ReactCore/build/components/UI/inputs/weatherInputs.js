"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Autocomplete = require("react-autocomplete");
//css imports
const styles = require("../../friendForm/friendForm.module.scss");
const FormRow = ({ formRow, changed, blur, items = [], selectHandler }) => {
    let inputField;
    let errorMessage;
    //if form is current;y invalid, requires validation and
    // has been altered by a use show the error msg
    if (!formRow.valid && formRow.validation && formRow.touched) {
        errorMessage = React.createElement("em", null, formRow.errorMessage);
    }
    switch (formRow.element) {
        case "input":
            inputField = (React.createElement("div", null,
                React.createElement("div", { style: { display: "block" } },
                    React.createElement("label", { className: styles.name, htmlFor: "name", id: "name" }, "Name:"),
                    React.createElement("input", { className: styles.input, key: formRow.id, type: formRow.type, value: formRow.value, onChange: changed, onBlur: blur }),
                    React.createElement("em", { className: styles.errorMessage }, errorMessage))));
            break;
        case "typeAhead":
            inputField = (React.createElement("div", null,
                React.createElement("label", { style: { textAlign: "left" }, className: styles.location, htmlFor: "location" }, "Location:"),
                React.createElement("div", { className: styles.typeAhead },
                    React.createElement(Autocomplete, { getItemValue: item => item, items: items || [], renderItem: (item, isHighlighted) => (React.createElement("div", { key: item, style: {
                            //background: isHighlighted ? "lightgray" : "white"
                            }, className: "typeAheadComponent" }, item)), value: formRow.value, onChange: changed, onSelect: selectHandler })),
                React.createElement("em", { className: styles.errorMessage }, errorMessage)));
            break;
        default:
            inputField = null;
    }
    return React.createElement("div", null, inputField);
};
exports.default = FormRow;
//# sourceMappingURL=weatherInputs.js.map