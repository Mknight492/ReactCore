import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";
import testReducer from "./testReducer";
import WeatherReducer from "./weatherReducer";

//NB connectRouter must be first
export default history =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
    weather: WeatherReducer
  });
