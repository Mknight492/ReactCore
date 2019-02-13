import { formState } from "models";

//const returnInputConfiguration( string[]): input

export const returnInitalFormState = (config: string[] = []): formState => ({
  Name: {
    element: "input",
    type: "text",
    value: config[0] || "",
    validation: { required: true },
    valid: false,
    touched: config[0] ? true : false, //treat values as touched if they have had a value
    errorMessage: "",
    label: "Name:"
  },
  Location: {
    element: "typeAhead",
    type: "text",
    value: config[1] || "",
    validation: { required: true, minLength: 3, maxLength: 60, location: true },
    valid: false,
    touched: config[1] ? true : false, //treat values as touched if they have had a value
    errorMessage: "",
    label: "Location:",
    showDropdown: false
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
