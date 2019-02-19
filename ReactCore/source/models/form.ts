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

interface formObjectRow {
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
  formRows: {
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
  };
  isValid: boolean;
}

export interface ValidationObject {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  location?: boolean;
  email?: boolean;
}

export interface loginViewModel {
  Email: string;
  Password: string;
}

export interface registerViewModel extends loginViewModel {
  FirstName: string;
  LastName: string;
  ConfirmPassword: string;
}
