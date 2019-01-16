"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
let userString = localStorage.getItem("user");
let user;
if (userString) {
    user = JSON.parse(userString);
}
const initialState = user ? { loggedIn: true, user: user } : {};
function authentication(state = initialState, action) {
    switch (action.type) {
        case constants_1.userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case constants_1.userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case constants_1.userConstants.LOGIN_FAILURE:
            return {};
        case constants_1.userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
exports.authentication = authentication;
//# sourceMappingURL=authenticationReducer.js.map