import { combineReducers } from "redux";

import friends from "./friendReducer";
import WeatherReducer from "./weatherReducer";

import { alert } from "./alertReducer";
//NB connectRouter must be first
export default () => {
  return combineReducers({
    friends,
    weather: WeatherReducer,
    alert
  });
};
