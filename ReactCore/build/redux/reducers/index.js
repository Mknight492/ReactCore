"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const friendReducer_1 = __importDefault(require("./friendReducer"));
const weatherReducer_1 = __importDefault(require("./weatherReducer"));
const registrationReducer_1 = __importDefault(require("./registrationReducer"));
const authenticationReducer_1 = __importDefault(require("./authenticationReducer"));
const usersReducer_1 = __importDefault(require("./usersReducer"));
const alertReducer_1 = __importDefault(require("./alertReducer"));
const errorHandlerReducer_1 = __importDefault(require("./errorHandlerReducer"));
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