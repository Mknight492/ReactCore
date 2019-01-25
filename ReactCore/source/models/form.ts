export interface formRow {
  id: string;
  element: string;
  type: string;
  value: string;
  validation: ValidationObject;
  valid: boolean;
  touched: boolean;
  errorMessage: string;
  label: string;
  showDropdown?: boolean | false;
}

export interface formState {
  [key: string]: {
    element: string;
    type: string;
    value: string;
    validation: ValidationObject;
    valid: boolean;
    touched: boolean;
    errorMessage: string;
    label: string;
    showDropdown?: boolean | false;
  };
}

export interface ValidationObject {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  location?: boolean;
}
