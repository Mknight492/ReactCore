import { POSITION_SUCCESS, WEATHER_SEARCH_FAILURE, WEATHER_SEARCH_SUCCESS } from "../actions/weatherActions";
const initalState = {
    currentPosition: {
        latitude: -1.11735,
        longitude: 73.0803
    },
    locationWeather: undefined
};
export default function WeatherReducer(state = initalState, action) {
    switch (action.type) {
        case POSITION_SUCCESS:
            return Object.assign({}, state, { currentPosition: action.coords });
        case WEATHER_SEARCH_SUCCESS:
            return Object.assign({}, state, { locationWeather: {
                    location: action.payload.name,
                    country: action.payload.sys.country,
                    weather: action.payload.weather[0].main,
                    weatherDescription: action.payload.weather[0].description,
                    temp: action.payload.main.temp
                } });
        case WEATHER_SEARCH_FAILURE:
            return state;
        default:
            return state;
    }
}
//# sourceMappingURL=weatherReducer.js.map