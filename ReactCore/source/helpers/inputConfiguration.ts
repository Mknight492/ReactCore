import * as moment from "moment";
import input from "../components/UI/inputs/weatherInputs";

export interface inputConfig {
  [key: string]: {
    element: string;
    type: string;
    value: string;
    validation: ValidationObject;
    valid: boolean;
    touched: boolean;
    errorMessage: string;
    label: string;
  };
}

export interface ValidationObject {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  location?: boolean;
}

//const returnInputConfiguration( string[]): input

export const returnInputConfiguration = (
  config: string[] = []
): inputConfig => ({
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
