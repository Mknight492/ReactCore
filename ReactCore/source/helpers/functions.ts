import { handleHTTPError } from "redux/actions";
import { store } from "redux/store/configure-store";
import { Locations, WeatherObject } from "models";
import axios from "axios";

//helper functions

export const HF = {
  AFfetch,
  Appfetch,
  ServerAxios,
  isNullOrWhiteSpace,
  formatLocation,
  formatWeather,
  Utf8ArrayToStr,
  generateRandomNumber,
  ExternalAxios
};

async function AFfetch(url: string, options: any): Promise<any>;
async function AFfetch(url: string): Promise<any>;

async function AFfetch(url: string, options?: any) {
  if (options) {
    options.headers.RequestVerificationToken = (<HTMLInputElement>(
      document.getElementsByName("__RequestVerificationToken")[0]
    )).value;
  } else {
    options = {
      method: "GET",
      headers: {
        RequestVerificationToken: (<HTMLInputElement>(
          document.getElementsByName("__RequestVerificationToken")[0]
        )).value
      }
    };
  }
  try {
    const result = await fetch(url, options);
    if (result.status < 200 || result.status >= 300) throw result;
    return result;
  } catch (e) {
    throw e;
  }
}

async function Appfetch(url: string, options: any): Promise<any>;
async function Appfetch(url: string): Promise<any>;

async function Appfetch(url: string, options?: any) {
  if (options) {
    options.headers.RequestVerificationToken = (<HTMLInputElement>(
      document.getElementsByName("__RequestVerificationToken")[0]
    )).value;
  } else {
    options = {
      method: "GET",
      headers: {
        RequestVerificationToken: (<HTMLInputElement>(
          document.getElementsByName("__RequestVerificationToken")[0]
        )).value
      }
    };
  }
  try {
    const result = await fetch(url, options);
    if (result.status < 200 || result.status >= 300) {
      if (result.body) {
        await result.body
          .getReader()
          .read()
          .then(r => {
            let errorMessage = Utf8ArrayToStr(r.value);
            let obj = handleHTTPError(result, errorMessage);
            store.dispatch(obj);
          });
      }
    }
    return result;
  } catch (e) {
    throw e;
  }
}

interface AxiosReturn {
  data: any;
}

async function ServerAxios(options): Promise<AxiosReturn> {
  //make sure not in testing env
  if (!(process.env.NODE_ENV == "test")) {
    //then add the antiforgery token to the header
    options.headers = {
      "X-Requested-With": "json",
      "Content-Type": "application/json",
      RequestVerificationToken: (<HTMLInputElement>(
        document.getElementsByName("__RequestVerificationToken")[0]
      )).value
    };
  }

  try {
    let res = await axios(options);
    return res;
  } catch (error) {
    let action = handleHTTPError(error.response, error.response.data);
    store.dispatch(action);
  }
  return { data: undefined };
}

async function ExternalAxios(options): Promise<AxiosReturn> {
  try {
    let res = await axios(options);
    return res;
  } catch (error) {
    let action = handleHTTPError(error.response, error.response.data);
    store.dispatch(action);
  }
  return { data: undefined };
}

function isNullOrWhiteSpace(input) {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
}

function formatLocation(locationObj: Locations) {
  if (locationObj && locationObj.Name && locationObj.CountryCode) {
    return locationObj.Name + " " + locationObj.CountryCode;
  } else {
    return "";
  }
}

function formatWeather(
  weatherObj: WeatherObject,
  displayName: boolean | false
) {
  let name = displayName ? `${weatherObj.name}: ` : "";
  if (weatherObj) {
    return `${name}${weatherObj.main.temp}°C ${weatherObj.weather[0].main}, ${
      weatherObj.weather[0].description
    }`;
  }
}

function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }

  return out;
}

function generateRandomNumber(min_value, max_value) {
  return Math.random() * (max_value - min_value) + min_value;
}
