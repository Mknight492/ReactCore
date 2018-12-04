import axios from "axios";
import { takeLatest } from "redux-saga";
import { put, call, select } from "redux-saga/effects"; //select allows you to access values from state
import {
  weatherSuccessAction,
  weatherFailureAction,
  PERFORM_WEATHER_SEARCH
} from "../actions/weatherActions";
import { weatherAPI } from "../../../security";

const selectWeatherState = state => state.weather;

function* APIRequest() {
  const { currentPosition } = yield select(selectWeatherState);

  try {
    const APIdata = yield call(
      axios.get,
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
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
