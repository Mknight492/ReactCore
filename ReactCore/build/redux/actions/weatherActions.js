"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSITION_SUCCESS = "POSITION_SUCCESS";
exports.PERFORM_WEATHER_SEARCH = "PERFORM_WEATHER_SEARCH";
exports.WEATHER_SEARCH_SUCCESS = "WEATHER_SEARCH_SUCCESS";
exports.WEATHER_SEARCH_FAILURE = "WEATHER_SEARCH_FAILURE";
exports.positionSuccessAction = position => ({
    type: exports.POSITION_SUCCESS,
    position
});
exports.performWeatherSearch = position => ({
    type: exports.PERFORM_WEATHER_SEARCH,
    payload: position
});
exports.weatherSuccessAction = weatherAPIdata => ({
    type: exports.WEATHER_SEARCH_SUCCESS,
    payload: weatherAPIdata
});
exports.weatherFailureAction = () => ({ type: exports.WEATHER_SEARCH_FAILURE });
//# sourceMappingURL=weatherActions.js.map