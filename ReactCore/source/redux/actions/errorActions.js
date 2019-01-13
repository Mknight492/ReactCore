import { errorConstants } from "../constants";

function execute401Handler(props) {
  return { type: errorConstants.HTTP_401_ERROR, props };
}

function execute404Handler(props) {
  return { type: errorConstants.HTTP_404_ERROR, props };
}

function execute500Handler(error, errorMessage) {
  return { type: errorConstants.HTTP_500_ERROR, errorMessage };
}

function executeOtherErrorHandler(error) {
  return {
    type: errorConstants.HTTP_OTHER_ERROR,
    error
  };
}

export function handleHTTPError(error, errorMessage) {
  if (error.status === 401) {
    return execute401Handler(error);
  } else if (error.status === 404) {
    return execute404Handler(error);
  } else if (error.status === 500) {
    return execute500Handler(error, errorMessage);
  } else {
    return executeOtherErrorHandler(error);
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
