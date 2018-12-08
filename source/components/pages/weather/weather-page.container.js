import { connect } from "react-redux";
import {
  positionSuccessAction,
  performWeatherSearch
} from "../../../redux/actions/weatherActions";
import WeatherPage from "./weather-page";

const mapStateToProps = state => ({
  position: state.weather.currentPosition,
  locationWeather: state.weather.locationWeather,
  testArray: state.test.testArray
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdatedPosition: position => {
    dispatch(positionSuccessAction(position));
    dispatch(performWeatherSearch());
  },
  getWeather: () => {
    dispatch(performWeatherSearch());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherPage);
