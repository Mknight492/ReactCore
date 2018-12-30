import { errorConstants } from "../constants";

function execute404Handler(props) {
  return { type: errorConstants.HTTP_404_ERROR, props };
}

function execute500Handler(props) {
  return { type: errorConstants.HTTP_500_ERROR, props };
}

function executeOtherErrorHandler(error) {
  return {
    type: errorConstants.HTTP_OTHER_ERROR,
    error
  };
}

export const handleHTTPError = (error, props) => {
  if (error.response.status === 404) {
    return execute404Handler(props);
  } else if (error.response.status === 500) {
    return execute500Handler(props);
  } else {
    return executeOtherErrorHandler(error);
  }
};
