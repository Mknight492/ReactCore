import { friendConstants } from "../constants";
import { mapKeys, isEqual } from "lodash";
const initalState = {
    friendsObj: {},
    isActive: -1,
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
            }
            else {
                return Object.assign({}, state, { friendsObj });
            }
        case friendConstants.ADD_FRIEND_ATTEMPT:
            return state;
        case friendConstants.CHANGE_ACTIVE_FRIEND:
            //action.paylod = id (of currently active friend item)
            return Object.assign({}, state, { isActive: action.payload });
        case friendConstants.LOAD_LOCATION_TA_ATTEMPT:
            return state;
        case friendConstants.LOAD_LOCATION_TA_SUCCESS:
            return Object.assign({}, state, { [action.Id]: action.payload });
        case friendConstants.LOAD_LOCATION_TA_FAILURE:
            return state;
        case friendConstants.RESET_LOCATION_TA:
            return Object.assign({}, state, { locations: [] });
        case friendConstants.RESET_FRIENDS_TA_VALUES:
            return Object.assign({}, state, { [action.id]: undefined });
        default:
            return state;
    }
}
//# sourceMappingURL=friendReducer.js.map