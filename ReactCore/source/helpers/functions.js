import { handleHTTPError } from "../redux/actions";
import { store } from "../redux/store/configure-store";

//helper functions

export const HF = {
  AFfetch,
  Appfetch,
  isNullOrWhiteSpace,
  formatLocation
};

async function AFfetch(url, options) {
  if (options) {
    options.headers.RequestVerificationToken = document.getElementsByName(
      "__RequestVerificationToken"
    )[0].value;
  } else {
    options = {
      method: "GET",
      headers: {
        RequestVerificationToken: document.getElementsByName(
          "__RequestVerificationToken"
        )[0].value
      }
    };
  }
  try {
    const result = await fetch(url, options);
    return result;
    if (result.status < 200 || result.status >= 300) throw result;
    return result;
  } catch (e) {
    throw e;
  }
}

async function Appfetch(url, options) {
  if (options) {
    options.headers.RequestVerificationToken = document.getElementsByName(
      "__RequestVerificationToken"
    )[0].value;
  } else {
    options = {
      method: "GET",
      headers: {
        RequestVerificationToken: document.getElementsByName(
          "__RequestVerificationToken"
        )[0].value
      }
    };
  }
  try {
    const result = await fetch(url, options);
    console.log(result);
    if (result.status < 200 || result.status >= 300) {
      let obj = handleHTTPError(result);
      store.dispatch(obj);
    }
    return result;
  } catch (e) {
    throw e;
  }
}

function isNullOrWhiteSpace(input) {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
}

function formatLocation(locationObj) {
  return locationObj.name + " " + locationObj.countryCode;
}
