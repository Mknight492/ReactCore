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
