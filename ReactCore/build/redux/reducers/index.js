"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const friendReducer_1 = require("./friendReducer");
const weatherReducer_1 = require("./weatherReducer");
const registrationReducer_1 = require("./registrationReducer");
const authenticationReducer_1 = require("./authenticationReducer");
const usersReducer_1 = require("./usersReducer");
const alertReducer_1 = require("./alertReducer");
const errorHandlerReducer_1 = require("./errorHandlerReducer");
//NB connectRouter must be first
exports.default = () => {
    return redux_1.combineReducers({
        friends: friendReducer_1.default,
        weather: weatherReducer_1.default,
        authentication: authenticationReducer_1.authentication,
        alert: alertReducer_1.alert,
        registration: registrationReducer_1.registration,
        users: usersReducer_1.users,
        errorHandler: errorHandlerReducer_1.default
    });
};
//# sourceMappingURL=index.js.map