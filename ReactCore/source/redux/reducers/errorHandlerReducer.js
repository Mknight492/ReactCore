import { handleHTTPError } from "../actions";
import { errorConstants } from "../constants";
import { navigate } from "@reach/router";

const initialState = {
  showErrorModal: false,
  errorMessage: ""
};

const execute401 = state => {
  console.log("executeing 401");
  window.location.replace("http://localhost:59853/Account/login");
  return state;
};

const execute404 = (state, action) => {
  navigate("/404");
  return { ...state, redircted: true };
};

const execute500 = (state, action) => {
  navigate("/500");
  return { ...state };
};

const executeOtherError = (state, action) => {
  return {
    ...state,
    showErrorModal: true,
    errorMessage: action.error.response.data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case errorConstants.HTTP_401_ERROR:
      console.log("redux");
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
