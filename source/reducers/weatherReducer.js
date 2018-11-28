import {
  POSITION_SUCCESS,
  WEATHER_SEARCH_FAILURE,
  WEATHER_SEARCH_SUCCESS
} from "../actions/weatherActions";

const initalState = {
  currentPosition: {
    latitude: -1.11735,
    longitude: 73.0803
  },
  locationWeather: undefined
};

export default function WeatherReducer(state, action) {
  if (state === undefined) {
    return initalState;
  }

  switch (action.type) {
    case POSITION_SUCCESS:
      return {
        ...state,
        currentPosition: action.position.coords
      };
    case WEATHER_SEARCH_SUCCESS:
      return {
        ...state,
        locationWeather: {
          location: action.payload.name,
          country: action.payload.sys.country,
          weather: action.payload.weather[0].main,
          weatherDescription: action.payload.weather[0].description,
          temp: action.payload.main.temp
        }
      };
    default:
      return state;
  }
}
