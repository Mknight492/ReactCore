import * as React from "react";

import Friends from "../../friends/friends.container";

//helper functions
import { HF } from "../../../helpers";

//redux imports
import { connect } from "react-redux";
import {
  positionSuccessAction,
  performWeatherSearch
} from "../../../redux/actions/weatherActions";

//styles
import * as styles from "./weather-page.module.scss";


interface WeatherPageProps{
  position: object,
  locationWeather: object,
  testArray: object,
  dispatchUpdatedPosition: Function,
  getWeather: Function
}


const WeatherPage: React.SFC<WeatherPageProps> =()=> {
  return (
    <div>
      <button onClick={() => HF.Appfetch("api/Authenticate/Throw500")}>
        throw5000
      </button>
      <button
        onClick={() =>
          HF.Appfetch("api/Authenticate/Throw400")}
      >
        throw400
      </button>
      <Friends />
    </div>
  );
}





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





