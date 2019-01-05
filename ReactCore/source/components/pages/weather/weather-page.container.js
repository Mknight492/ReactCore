import { connect } from "react-redux";
import {
  positionSuccessAction,
  performWeatherSearch
} from "../../../redux/actions/weatherActions";
import WeatherPage from "./weather-page";

const mapStateToProps = state => ({
  position: state.weather.currentPosition,
  locationWeather: state.weather.locationWeather,
  testArray: state.friends.friendsObj
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdatedPosition: position => {
    dispatch(positionSuccessAction(position));
    dispatch(performWeatherSearch(position));
  },
  getWeather: () => {
    dispatch(performWeatherSearch());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherPage);
