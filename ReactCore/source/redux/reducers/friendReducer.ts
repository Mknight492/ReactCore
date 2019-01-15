import { friendConstants } from "../constants";
import { mapKeys, isEqual } from "lodash";

import { FriendsObj, Locations } from "../../models";

interface IinitialState {
  friendsObj: FriendsObj;
  isActive: boolean;
  locations: Locations[];
}

const initalState = {
  friendsObj: {},
  isActive: undefined,
  locations: []
};

export default function friendReducer(state = initalState, action) {
  switch (action.type) {
    case friendConstants.LOAD_FRIEND_ATTEMPT:
      return state;
    case friendConstants.LOAD_FRIEND_FAILURE:
      return state;
    case friendConstants.LOAD_FRIEND_SUCCESS:
      //action.payload = [friend{}, friend{}]
      // eslint-disable-next-line no-case-declarations
      const friendsObj = mapKeys(action.payload, "Id");
      //only update the state if the friendObj is differn't = stops rerenders
      if (isEqual(state.friendsObj, friendsObj)) {
        return state;
      } else {
        return { ...state, friendsObj };
      }

    case friendConstants.ADD_FRIEND_ATTEMPT:
      return state;
    case friendConstants.CHANGE_ACTIVE_FRIEND:
      //action.paylod = id (of currently active friend item)
      return {
        ...state,
        isActive: action.payload
      };
    case friendConstants.LOAD_LOCATION_TA_ATTEMPT:
      return state;
    case friendConstants.LOAD_LOCATION_TA_SUCCESS:
      return { ...state, [action.Id]: action.payload };
    case friendConstants.LOAD_LOCATION_TA_FAILURE:
      return state;
    case friendConstants.RESET_LOCATION_TA:
      return { ...state, locations: [] };
    default:
      return state;
  }
}