export const POSITION_SUCCESS = "POSITION_SUCCESS";
export const PERFORM_WEATHER_SEARCH = "PERFORM_WEATHER_SEARCH";
export const WEATHER_SEARCH_SUCCESS = "WEATHER_SEARCH_SUCCESS";
export const WEATHER_SEARCH_FAILURE = "WEATHER_SEARCH_FAILURE";

export const positionSuccessAction = position => ({
  type: POSITION_SUCCESS,
  position
});

export const performWeatherSearch = position => ({
  type: PERFORM_WEATHER_SEARCH,
  payload: position
});

export const weatherSuccessAction = weatherAPIdata => ({
  type: WEATHER_SEARCH_SUCCESS,
  payload: weatherAPIdata
});

export const weatherFailureAction = () => ({ type: WEATHER_SEARCH_FAILURE });
