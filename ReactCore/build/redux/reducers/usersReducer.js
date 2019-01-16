"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const initialState = {
    LoggedIn: false,
    user: undefined,
    noUserActive: undefined,
    loading: false
};
function users(state = initialState, action) {
    switch (action.type) {
        case constants_1.userConstants.GETALL_REQUEST:
            return Object.assign({}, state, { loading: true });
        case constants_1.userConstants.GET_USER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case constants_1.userConstants.GET_USER_FAILURE:
            return Object.assign({}, state, { noUserActive: true });
        case constants_1.userConstants.GET_USER_SUCCESS:
            //payload = user{}
            return Object.assign({}, state, { LoggedIn: true, user: action.payload });
        default:
            return state;
    }
}
exports.users = users;
//# sourceMappingURL=usersReducer.js.map