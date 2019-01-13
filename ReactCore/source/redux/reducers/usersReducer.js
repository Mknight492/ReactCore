import { userConstants } from "../constants";

const initialState = {
  LoggedIn: false,
  user: undefined
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };

    case userConstants.GET_USER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_USER_FAILURE:
      return {
        noUserActive: true
      };
    case userConstants.GET_USER_SUCCESS:
      //payload = user{}
      return {
        LoggedIn: true,
        user: action.payload
      };
    default:
      return state;
  }
}
