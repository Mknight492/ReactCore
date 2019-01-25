import * as React from "react";
import * as Autocomplete from "react-autocomplete";
//css imports
import * as styles from "../../friendForm/friendForm.module.scss";
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
                    React.createElement("label", { className: styles.name, htmlFor: formRow.id, id: "name" }, "Name:"),
                    React.createElement("input", { id: formRow.id, className: styles.input, key: formRow.id, type: formRow.type, value: formRow.value, onChange: changed, onBlur: blur, onFocus: focus }),
                    React.createElement("em", { className: styles.errorMessage }, errorMessage))));
            break;
        case "typeAhead":
            inputField = (React.createElement("div", null,
                React.createElement("label", { style: { textAlign: "left" }, className: styles.location, htmlFor: formRow.id }, "Location:"),
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
export default FormRow;
//# sourceMappingURL=weatherInputs.js.map