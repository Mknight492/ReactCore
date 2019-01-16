import { userConstants } from "../constants";

const initialState = {
  LoggedIn: false,
    user: undefined as object | undefined,
    noUserActive: undefined as any,
    loading: false
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
          return {
          ...state,
        loading: true
      };

    case userConstants.GET_USER_REQUEST:
          return {
          ...state,
        loading: true
      };
    case userConstants.GET_USER_FAILURE:
          return {
          ...state,
        noUserActive: true
      };
    case userConstants.GET_USER_SUCCESS:
      //payload = user{}
          return {
          ...state,
        LoggedIn: true,
        user: action.payload
      };
    default:
      return state;
  }
}
