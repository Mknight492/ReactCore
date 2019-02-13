import { locationHelpers } from "helpers/locationHelpers";
import { Locations } from "models";

import { formState, formRow } from "models";

export const formUtilityActions = {
  convertStateToArrayOfFormObjects,
  executeValidationAndReturnFormElement,
  checkIfFormValid,
  executeFormValidationAndReturnForm
};

function convertStateToArrayOfFormObjects(formObject: formState) {
  return Object.keys(formObject).map(
    (el): formRow => ({
      id: el,
      ...formObject[el]
    })
  );
}

function executeValidationAndReturnFormElement(
  event,
  updatedOwnerForm,
  LocationArray,
  labelId
) {
  let formElement = { ...updatedOwnerForm[labelId] };
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

function executeFormValidationAndReturnForm(ownerForm, LocationArray) {
  Object.keys(ownerForm).map(key => {
    //map over each value in the formObj.
    //turn touched to true and check if valid and add error message
    const element = ownerForm[key];

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

  return ownerForm;
}

function checkIfFormValid(ownerForm) {
  for (let element in ownerForm) {
    if (!ownerForm[element].valid) {
      return false;
    }
  }
  return true;
}

function checkValidity(value, validation, LocationArray: Locations[]) {
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

    return validationObject;
  } else {
    return validationObject;
  }
}
