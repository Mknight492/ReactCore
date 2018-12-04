import { combineReducers } from "redux";

import testReducer from "./testReducer";
import WeatherReducer from "./weatherReducer";
import { registration } from "./registrationReducer";
import { authentication } from "./authenticationReducer";
import { users } from "./usersReducer";
import { alert } from "./alertReducer";
//NB connectRouter must be first
export default () => {
  return combineReducers({
    test: testReducer,
    weather: WeatherReducer,
    authentication,
    alert,
    registration,
    users
  });
};
