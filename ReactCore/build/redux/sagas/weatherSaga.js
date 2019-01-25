"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
//import { takeLatest } from "redux-saga";
const effects_1 = require("redux-saga/effects"); //select allows you to access values from state
const weatherActions_1 = require("../actions/weatherActions");
const security_1 = require("./../../security");
function* APIRequest(action) {
    try {
        const APIdata = yield effects_1.call(axios_1.default.get, "http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: action.payload.latitude,
                lon: action.payload.longitude,
                appid: security_1.weatherAPI,
                units: "metric"
            }
        });
        yield effects_1.put(weatherActions_1.weatherSuccessAction(APIdata.data));
    }
    catch (e) {
        yield effects_1.put(weatherActions_1.weatherFailureAction());
    }
}
function* default_1() {
    yield effects_1.takeLatest(weatherActions_1.PERFORM_WEATHER_SEARCH, APIRequest);
}
exports.default = default_1;
//wwwe
//# sourceMappingURL=weatherSaga.js.map