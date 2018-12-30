import { handleHTTPError } from "../actions";

const initialState = {
  showErrorModal: false,
  errorMessage: ""
};

const execute404 = (state, action) => {
  action.props.history.push("/404");
  return { ...state };
};

const execute500 = (state, action) => {
  action.props.history.push("/500");
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
    case handleHTTPError.HTTP_404_ERROR:
      return execute404(state, action);
    case handleHTTPError.HTTP_500_ERROR:
      return execute500(state, action);
    case handleHTTPError.HTTP_OTHER_ERROR:
      return executeOtherError(state, action);
    default:
      return state;
  }
};

export default reducer;
