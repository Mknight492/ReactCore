import { handleHTTPError } from "../actions";
import { errorConstants } from "../constants";
import { navigate } from "@reach/router";

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
  navigate("/404");
  return { ...state, redircted: true };
};

function execute500(state, action) {
  navigate("/500");
  return { ...state, errorMessage: action.errorMessage };
}

const executeOtherError = (state, action) => {
  return {
    ...state,
    showErrorModal: true,
    errorMessage: action.error.statusText
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case errorConstants.HTTP_401_ERROR:
      return execute401(state);
    case errorConstants.HTTP_404_ERROR:
      return execute404(state, action);
    case errorConstants.HTTP_500_ERROR:
      return execute500(state, action);
    case errorConstants.HTTP_OTHER_ERROR:
      return executeOtherError(state, action);
    default:
      return state;
  }
};

export default reducer;

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
