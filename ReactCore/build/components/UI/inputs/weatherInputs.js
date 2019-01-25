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
const typeAhead_1 = __importDefault(require("components/typeAhead/typeAhead"));
//css imports
const styles = __importStar(require("../../friendForm/friendForm.module.scss"));
const FormRow = ({ formRow, changed, blur, items = [], selectHandler, locations }) => {
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
                    React.createElement("label", { className: styles.name, htmlFor: formRow.id, id: "name" }, "Name:"),
                    React.createElement("input", { id: formRow.id, className: styles.input, key: formRow.id, type: formRow.type, value: formRow.value, onChange: changed, onBlur: blur, onFocus: focus }),
                    React.createElement("em", { className: styles.errorMessage }, errorMessage))));
            break;
        case "typeAhead":
            inputField = (React.createElement(React.Fragment, null,
                React.createElement("div", null,
                    React.createElement("label", { style: { textAlign: "left" }, className: styles.location, htmlFor: formRow.id }, "Location:"),
                    React.createElement(typeAhead_1.default, { name: "Location", onSelect: selectHandler, suggestions: locations, onChange: changed, onBlur: blur, onFocus: focus, formRow: formRow, showDropdown: {} }),
                    React.createElement("div", { className: styles.typeAhead },
                        React.createElement(react_autocomplete_1.default, { getItemValue: item => item, items: items || [], renderItem: (item, isHighlighted) => (React.createElement("div", { key: item + "TA", style: {
                                //background: isHighlighted ? "lightgray" : "white"
                                }, className: "typeAheadComponent" }, item)), value: formRow.value, onChange: changed, onSelect: selectHandler })),
                    React.createElement("em", { className: styles.errorMessage }, errorMessage))));
            break;
        default:
            inputField = null;
    }
    return React.createElement("div", null, inputField);
};
exports.default = FormRow;
//# sourceMappingURL=weatherInputs.js.map