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
        authentication: authenticationReducer_1.default,
        alert: alertReducer_1.default,
        registration: registrationReducer_1.default,
        users: usersReducer_1.default,
        errorHandler: errorHandlerReducer_1.default
    });
};
// export const rootReducer = combineReducers({
//   friends,
//   weather: WeatherReducer,
//   authentication,
//   alert,
//   registration,
//   users,
//   errorHandler
//   //@ts-ignore
// })(undefined, undefined as Action<any>);
//# sourceMappingURL=index.js.map