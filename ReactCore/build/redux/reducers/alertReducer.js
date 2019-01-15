"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function alert(state = {}, action) {
    switch (action.type) {
        case constants_1.alertConstants.SUCCESS:
            return {
                type: "alert-success",
                message: action.message
            };
        case constants_1.alertConstants.ERROR:
            return {
                type: "alert-danger",
                message: action.message
            };
        case constants_1.alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
exports.alert = alert;
//# sourceMappingURL=alertReducer.js.map