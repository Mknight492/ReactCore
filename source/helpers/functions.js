//helper function

export const HF = {
  AFfetch,
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
  return await fetch(url, options);
}

function isNullOrWhiteSpace(input) {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
}

function formatLocation(locationObj) {
  return locationObj.name + " " + locationObj.countryCode;
}
