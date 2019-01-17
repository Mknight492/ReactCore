import { combineReducers } from "redux";

import friends from "./friendReducer";
import WeatherReducer from "./weatherReducer";
import registration from "./registrationReducer";
import authentication from "./authenticationReducer";
import users from "./usersReducer";
import alert from "./alertReducer";
import errorHandler from "./errorHandlerReducer";
//NB connectRouter must be first
export default () => {
  return combineReducers({
    friends,
    weather: WeatherReducer,
    authentication,
    alert,
    registration,
    users,
    errorHandler
  });
};
