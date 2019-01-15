"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const initialState = {
    LoggedIn: false,
    user: undefined
};
function users(state = initialState, action) {
    switch (action.type) {
        case constants_1.userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case constants_1.userConstants.GET_USER_REQUEST:
            return {
                loading: true
            };
        case constants_1.userConstants.GET_USER_FAILURE:
            return {
                noUserActive: true
            };
        case constants_1.userConstants.GET_USER_SUCCESS:
            //payload = user{}
            return {
                LoggedIn: true,
                user: action.payload
            };
        default:
            return state;
    }
}
exports.users = users;
//# sourceMappingURL=usersReducer.js.map