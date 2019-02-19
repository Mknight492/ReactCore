import { formState } from "models";

//const returnInputConfiguration( string[]): input

export const returnInitalFormState = (config: string[] = []): formState => ({
  formRows: {
    Name: {
      element: "input",
      type: "text",
      value: config[0] || "",
      validation: { required: true, email: true },
      valid: false,
      touched: config[0] ? true : false, //treat values as touched if they have had a value
      errorMessage: "",
      label: "Email:"
    },
    Password: {
      element: "input",
      type: "password",
      value: config[1] || "",
      validation: { required: true, minLength: 3, maxLength: 60 },
      valid: false,
      touched: config[1] ? true : false, //treat values as touched if they have had a value
      errorMessage: "",
      label: "Password:",
      showDropdown: false
    }
  },
  isValid: config.reduce((acc, cur) => {
    if (acc && cur) return true;
    else return false;
  }, true)
});
