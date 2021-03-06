import { locationHelpers } from "helpers/locationHelpers";
import { Locations, ValidationObject } from "models";

import { formState, formRow } from "models";

export const formUtilityActions = {
  convertStateToArrayOfFormObjects,
  executeValidationAndReturnFormElement,
  checkIfFormValid,
  executeFormValidationAndReturnForm,
  convertStateToValuesObject
};

function convertStateToArrayOfFormObjects(formObject: formState) {
  return Object.keys(formObject.formRows).map(
    (el): formRow => ({
      id: el,
      ...formObject.formRows[el]
    })
  );
}

function convertStateToValuesObject(formObject: formState) {
  return Object.keys(formObject.formRows).reduce(
    (acc, el): any => {
      acc[el] = formObject.formRows[el].value;
      return acc;
    },
    {} as any
  );
}

function executeValidationAndReturnFormElement(
  event,
  updatedOwnerForm,
  LocationArray,
  labelId
) {
  let formElement = { ...updatedOwnerForm.formRow[labelId] };
  formElement.value = labelId === "dateOfBirth" ? event : event.target.value;
  formElement.touched = true;

  const validationResponse = checkValidity(
    formElement.value,
    formElement.validation,
    LocationArray
  );

  formElement.valid = validationResponse.isValid;
  formElement.errorMessage = validationResponse.errorMessage;
  return formElement;
}

function executeFormValidationAndReturnForm(ownerForm: formState): formState;
function executeFormValidationAndReturnForm(
  ownerForm: formState,
  LocationArray: Locations[]
): formState;

function executeFormValidationAndReturnForm(
  ownerForm: formState,
  LocationArray?: Locations[] | undefined
) {
  Object.keys(ownerForm.formRows).map(key => {
    //map over each value in the formObj.
    //turn touched to true and check if valid and add error message
    const element = ownerForm.formRows[key];

    if (element.touched) {
      const validationResponse = checkValidity(
        element.value,
        element.validation,
        LocationArray
      );
      //element.touched = true;
      element.valid = validationResponse.isValid;
      element.errorMessage = validationResponse.errorMessage;
    }
  });
  ownerForm.isValid = checkIfFormValid(ownerForm);

  return ownerForm;
}

function checkIfFormValid(ownerForm: formState) {
  for (let element in ownerForm.formRows) {
    if (!ownerForm.formRows[element].valid) {
      return false;
    }
  }
  return true;
}

function checkValidity(
  value: string,
  validation: ValidationObject,
  LocationArray: Locations[] | undefined
) {
  let validationObject = {
    isValid: true,
    errorMessage: ""
  };

  if (validation) {
    if (validation.required) {
      validationObject.isValid = value.trim() !== "";
      validationObject.errorMessage = validationObject.isValid
        ? ""
        : "Field is required";
    }

    if (validationObject.isValid && validation.minLength) {
      validationObject.isValid = value.length >= validation.minLength;
      validationObject.errorMessage = `Length must exceed ${
        validation.minLength
      } characters`;
    }

    if (validationObject.isValid && validation.maxLength) {
      validationObject.isValid = value.length <= validation.maxLength;
      validationObject.errorMessage = "Not allowed more than 60 charactes";
    }

    if (validationObject.isValid && validation.location) {
      //get the corresponding array of locations from LocationArray/store

      //format the location object array into location string array
      //see if the TA value includes this
      validationObject.isValid = locationHelpers
        .uniqueTAValues(LocationArray)
        .includes(value);

      //if validation is valid don't include error message else add message
      validationObject.isValid = validationObject.isValid;
      validationObject.errorMessage =
        "Please select a location from the dropdown bar";
    }

    if (validationObject.isValid && validation.email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      validationObject.isValid = re.test(value);
      if (!validationObject.isValid) {
        validationObject.errorMessage = "Must be a valid email adress";
      }
    }

    return validationObject;
  } else {
    return validationObject;
  }
}
