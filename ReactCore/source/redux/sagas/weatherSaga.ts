import axios from "axios";
//import { takeLatest } from "redux-saga";
import { put, call, takeLatest } from "redux-saga/effects"; //select allows you to access values from state
import {
  weatherSuccessAction,
  weatherFailureAction,
  PERFORM_WEATHER_SEARCH
} from "../actions/weatherActions";
import { weatherAPI } from "./../../security";

function* APIRequest(action) {
  try {
    const APIdata = yield call(
      axios.get,
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: action.payload.latitude,
          lon: action.payload.longitude,
          appid: weatherAPI,
          units: "metric"
        }
      }
    );
    yield put(weatherSuccessAction(APIdata.data));
  } catch (e) {
    yield put(weatherFailureAction());
  }
}

export default function*() {
  yield takeLatest(PERFORM_WEATHER_SEARCH, APIRequest);
}

//wwwe
