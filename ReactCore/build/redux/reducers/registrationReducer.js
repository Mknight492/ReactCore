"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function registration(state = {}, action) {
    switch (action.type) {
        case constants_1.userConstants.REGISTER_REQUEST:
            return { registering: true };
        case constants_1.userConstants.REGISTER_SUCCESS:
            return {};
        case constants_1.userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
}
exports.registration = registration;
//# sourceMappingURL=registrationReducer.js.map