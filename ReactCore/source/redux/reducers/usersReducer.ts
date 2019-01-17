import { userConstants } from "../constants";

import { ApplicationUserDto } from "models";

export interface userState {
  LoggedIn: boolean | false;
  user?: ApplicationUserDto;
  noUserActive: boolean;
  loading: boolean | false;
}

const initialState: userState = {
  LoggedIn: false,
  user: undefined as ApplicationUserDto | undefined,
  noUserActive: undefined as any,
  loading: false
};

export default function users(state = initialState, action) {
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
