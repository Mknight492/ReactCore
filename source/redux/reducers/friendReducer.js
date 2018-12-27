import { friendConstants } from "../constants";
import { mapKeys } from "lodash";

const initalState = {
  friendsObj: {},
  isActive: undefined
};

export default function friendReducer(state, action) {
  if (state === undefined) {
    return initalState;
  }

  switch (action.type) {
    case friendConstants.LOAD_FRIEND_ATTEMPT:
      return state;
    case friendConstants.LOAD_FRIEND_FAILURE:
      return state;
    case friendConstants.LOAD_FRIEND_SUCCESS:
      //action.payload = [friend{}, friend{}]
      console.log("friends reducer");
      const friendsObj = mapKeys(action.payload, "id");

      return { ...state, friendsObj };
    case friendConstants.ADD_FRIEND_ATTEMPT:
      return {
        state
      };
    case friendConstants.CHANGE_ACTIVE_FRIEND:
      //action.paylod = id (of currently active friend item)
      return {
        ...state,
        isActive: action.payload
      };
    default:
      return state;
  }
}

function formatfriendApiData(apiArray) {
  return apiArray.map(el => testString);
}
