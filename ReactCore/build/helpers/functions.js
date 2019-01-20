"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("redux/actions");
const configure_store_1 = require("redux/store/configure-store");
const axios_1 = require("axios");
//helper functions
exports.HF = {
    AFfetch,
    Appfetch,
    AppAxios,
    isNullOrWhiteSpace,
    formatLocation,
    Utf8ArrayToStr,
    generateRandomNumber
};
async function AFfetch(url, options) {
    if (options) {
        options.headers.RequestVerificationToken = (document.getElementsByName("__RequestVerificationToken")[0]).value;
    }
    else {
        options = {
            method: "GET",
            headers: {
                RequestVerificationToken: (document.getElementsByName("__RequestVerificationToken")[0]).value
            }
        };
    }
    try {
        const result = await fetch(url, options);
        if (result.status < 200 || result.status >= 300)
            throw result;
        return result;
    }
    catch (e) {
        throw e;
    }
}
async function Appfetch(url, options) {
    if (options) {
        options.headers.RequestVerificationToken = (document.getElementsByName("__RequestVerificationToken")[0]).value;
    }
    else {
        options = {
            method: "GET",
            headers: {
                RequestVerificationToken: (document.getElementsByName("__RequestVerificationToken")[0]).value
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
                    let obj = actions_1.handleHTTPError(result, errorMessage);
                    configure_store_1.store.dispatch(obj);
                });
            }
        }
        return result;
    }
    catch (e) {
        throw e;
    }
}
async function AppAxios(options) {
    console.log("here");
    options.headers = {
        "Content-Type": "application/json",
        RequestVerificationToken: (document.getElementsByName("__RequestVerificationToken")[0]).value
    };
    try {
        let res = await axios_1.default(options);
        console.log(res);
        return res;
    }
    catch (error) {
        console.log(error.response);
        console.log(error.response.data);
        let action = actions_1.handleHTTPError(error.response, error.response.data);
        configure_store_1.store.dispatch(action);
        throw error;
    }
    console.log("here");
    // axios(options)
    //   .then(result => {
    //     console.log(result);
    //     return result;
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //     console.log(error);
    //     error.body
    //       .getReader()
    //       .read()
    //       .then(r => {
    //         let errorMessage = Utf8ArrayToStr(r.value);
    //         let obj = handleHTTPError(error, errorMessage);
    //         store.dispatch(obj);
    //       });
    //   });
}
function isNullOrWhiteSpace(input) {
    if (typeof input === "undefined" || input == null)
        return true;
    return input.replace(/\s/g, "").length < 1;
}
function formatLocation(locationObj) {
    if (locationObj && locationObj.Name && locationObj.CountryCode) {
        return locationObj.Name + " " + locationObj.CountryCode;
    }
    else {
        return "";
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
                out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
                break;
        }
    }
    return out;
}
function generateRandomNumber(min_value, max_value) {
    return Math.random() * (max_value - min_value) + min_value;
}
//# sourceMappingURL=functions.js.map