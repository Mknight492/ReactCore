"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const lodash_1 = require("lodash");
const initalState = {
    friendsObj: {},
    isActive: -1,
    locations: []
};
function friendReducer(state = initalState, action) {
    switch (action.type) {
        case constants_1.friendConstants.LOAD_FRIEND_ATTEMPT:
            return state;
        case constants_1.friendConstants.LOAD_FRIEND_FAILURE:
            return state;
        case constants_1.friendConstants.LOAD_FRIEND_SUCCESS:
            //action.payload = [friend{}, friend{}]
            // eslint-disable-next-line no-case-declarations
            let friendsObj = lodash_1.mapKeys(action.payload, "Id");
            //only update the state if the friendObj is differn't = stops rerenders
            if (lodash_1.isEqual(state.friendsObj, friendsObj)) {
                return state;
            }
            else {
                return Object.assign({}, state, { friendsObj });
            }
        case constants_1.friendConstants.ADD_FRIEND_ATTEMPT:
            return state;
        case constants_1.friendConstants.EDIT_FRIEND_SUCCESS:
            return Object.assign({}, state, { friendsObj: Object.assign({}, state.friendsObj, { [action.payload.Id]: action.payload }) });
        case constants_1.friendConstants.DELETE_FRIEND_SUCCESS:
            friendsObj = lodash_1.omit(state.friendsObj, action.payload);
            return Object.assign({}, state, { friendsObj });
        case constants_1.friendConstants.CHANGE_ACTIVE_FRIEND:
            //action.paylod = id (of currently active friend item)
            return Object.assign({}, state, { isActive: action.payload });
        case constants_1.friendConstants.LOAD_LOCATION_TA_ATTEMPT:
            return state;
        case constants_1.friendConstants.LOAD_LOCATION_TA_SUCCESS:
            return Object.assign({}, state, { [action.Id]: action.payload });
        case constants_1.friendConstants.LOAD_LOCATION_TA_FAILURE:
            return state;
        case constants_1.friendConstants.RESET_LOCATION_TA:
            return Object.assign({}, state, { locations: [] });
        case constants_1.friendConstants.RESET_FRIENDS_TA_VALUES:
            return Object.assign({}, state, { [action.id]: undefined });
        default:
            return state;
    }
}
exports.default = friendReducer;
//# sourceMappingURL=friendReducer.js.map