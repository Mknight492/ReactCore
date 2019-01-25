"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function execute401Handler(props) {
    return { type: constants_1.errorConstants.HTTP_401_ERROR, props };
}
function execute404Handler(props) {
    return { type: constants_1.errorConstants.HTTP_404_ERROR, props };
}
function execute500Handler(error, errorMessage) {
    return { type: constants_1.errorConstants.HTTP_500_ERROR, errorMessage };
}
function executeOtherErrorHandler(error) {
    return {
        type: constants_1.errorConstants.HTTP_OTHER_ERROR,
        error
    };
}
function handleHTTPError(error, errorMessage) {
    if (error.status === 401) {
        return execute401Handler(error);
    }
    else if (error.status === 404) {
        return execute404Handler(error);
    }
    else if (error.status === 500) {
        return execute500Handler(error, errorMessage);
    }
    else {
        return executeOtherErrorHandler(error);
    }
}
exports.handleHTTPError = handleHTTPError;
//# sourceMappingURL=errorActions.js.map