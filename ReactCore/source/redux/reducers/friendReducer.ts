import { friendConstants } from "../constants";
import { mapKeys, isEqual, omit } from "lodash-es";

import { FriendsObj, Locations } from "../../models";
import { Action } from "redux";

interface IinitialState {
  friendsObj: FriendsObj;
  isActive: number;
  locations: Locations[];
  loadingTA: boolean | false;
  noTAresultsFound: boolean | false;
}

const initalState: IinitialState = {
  friendsObj: {},
  isActive: -1,
  locations: [],
  loadingTA: false,
  noTAresultsFound: false
};

let friendsObj;

export default function friendReducer(state = initalState, action) {
  switch (action.type) {
    case friendConstants.LOAD_FRIEND_ATTEMPT:
      return state;
    case friendConstants.LOAD_FRIEND_FAILURE:
      return state;
    case friendConstants.LOAD_FRIEND_SUCCESS:
      //action.payload = [friend{}, friend{}]
      // eslint-disable-next-line no-case-declarations
      friendsObj = mapKeys(action.payload, "Id");
      //only update the state if the friendObj is differn't = stops rerenders
      if (isEqual(state.friendsObj, friendsObj)) {
        return state;
      } else {
        return { ...state, friendsObj };
      }

    case friendConstants.ADD_FRIEND_ATTEMPT:
      return state;
    case friendConstants.EDIT_FRIEND_SUCCESS:
      return {
        ...state,
        friendsObj: {
          ...state.friendsObj,
          [action.payload.Id]: action.payload
        }
      };

    case friendConstants.DELETE_FRIEND_SUCCESS:
      friendsObj = omit(state.friendsObj, action.payload);
      return {
        ...state,
        friendsObj
      };
    case friendConstants.CHANGE_ACTIVE_FRIEND:
      //action.paylod = id (of currently active friend item)
      return {
        ...state,
        isActive: action.payload
      };
    case friendConstants.LOAD_LOCATION_TA_ATTEMPT:
      return { ...state, loadingTA: true };
    case friendConstants.LOAD_LOCATION_TA_SUCCESS:
      let noTAresultsFound = false;
      if (isEqual(action.payload, [])) {
        noTAresultsFound = true;
      }
      return {
        ...state,
        [action.Id]: action.payload,
        loadingTA: false,
        noTAresultsFound
      };
    case friendConstants.LOAD_LOCATION_TA_FAILURE:
      return { ...state, loadingTA: false };
    case friendConstants.RESET_LOCATION_TA:
      return { ...state, locations: [] };
    case friendConstants.RESET_FRIENDS_TA_VALUES:
      return { ...state, [action.id]: undefined };
    default:
      return state;
  }
}
