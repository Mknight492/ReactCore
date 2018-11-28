import { combineReducers } from "redux";

import testReducer from "./testReducer";
import WeatherReducer from "./weatherReducer";

//NB connectRouter must be first
export default () => {
  return combineReducers({
    test: testReducer,
    weather: WeatherReducer
  });
};
