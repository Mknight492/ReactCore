"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnInputConfiguration = (config = []) => ({
    Name: {
        element: "input",
        type: "text",
        value: config[0] || "",
        validation: { required: true },
        valid: false,
        touched: false,
        errorMessage: "",
        label: "Name:"
    },
    Location: {
        element: "typeAhead",
        type: "text",
        value: config[1] || "",
        validation: { required: true, minLength: 5, maxLength: 60, location: true },
        valid: false,
        touched: false,
        errorMessage: "",
        label: "Location:"
    }
    /*
      dateOfBirth: {
        element: "datePicker",
        type: "text",
        value: moment(),
        valid: true,
        touched: false,
        errorMessage: "",
        label: "Date of birth:"
      }
      */
});
//# sourceMappingURL=inputConfiguration.js.map