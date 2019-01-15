"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherActions_1 = require("../actions/weatherActions");
const initalState = {
    currentPosition: {
        latitude: -1.11735,
        longitude: 73.0803
    },
    locationWeather: undefined
};
function WeatherReducer(state, action) {
    if (state === undefined) {
        return initalState;
    }
    switch (action.type) {
        case weatherActions_1.POSITION_SUCCESS:
            return Object.assign({}, state, { currentPosition: action.coords });
        case weatherActions_1.WEATHER_SEARCH_SUCCESS:
            return Object.assign({}, state, { locationWeather: {
                    location: action.payload.name,
                    country: action.payload.sys.country,
                    weather: action.payload.weather[0].main,
                    weatherDescription: action.payload.weather[0].description,
                    temp: action.payload.main.temp
                } });
        case weatherActions_1.WEATHER_SEARCH_FAILURE:
            return state;
        default:
            return state;
    }
}
exports.default = WeatherReducer;
//# sourceMappingURL=weatherReducer.js.map