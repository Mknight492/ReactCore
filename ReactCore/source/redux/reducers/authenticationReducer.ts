import { userConstants } from "../constants/userConstants";

let userString = localStorage.getItem("user");
let user;
if (userString) {
  user = JSON.parse(userString);
}

const initialState = user ? { loggedIn: true, user: user } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
