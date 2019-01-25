"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
exports.alertActions = {
    success,
    error,
    clear
};
function success(message) {
    return { type: constants_1.alertConstants.SUCCESS, message };
}
function error(message) {
    return { type: constants_1.alertConstants.ERROR, message };
}
function clear() {
    return { type: constants_1.alertConstants.CLEAR };
}
//# sourceMappingURL=alertActions.js.map