"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const router_1 = require("@reach/router");
const initialState = {
    showErrorModal: false,
    errorMessage: ""
};
const execute401 = state => {
    console.log("executeing 401");
    //navigate("/Account/login");
    window.location.replace("http://localhost:59853/Account/login");
    return state;
};
const execute404 = (state, action) => {
    router_1.navigate("/404");
    return Object.assign({}, state, { redircted: true });
};
function execute500(state, action) {
    router_1.navigate("/500");
    return Object.assign({}, state, { errorMessage: action.errorMessage });
}
const executeOtherError = (state, action) => {
    return Object.assign({}, state, { showErrorModal: true, errorMessage: action.error.statusText });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants_1.errorConstants.HTTP_401_ERROR:
            return execute401(state);
        case constants_1.errorConstants.HTTP_404_ERROR:
            return execute404(state, action);
        case constants_1.errorConstants.HTTP_500_ERROR:
            return execute500(state, action);
        case constants_1.errorConstants.HTTP_OTHER_ERROR:
            return executeOtherError(state, action);
        default:
            return state;
    }
};
exports.default = reducer;
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
//# sourceMappingURL=errorHandlerReducer.js.map