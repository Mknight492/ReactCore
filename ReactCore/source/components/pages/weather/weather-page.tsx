import * as React from "react";

import Friends from "../../friends/friendsHook";

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

interface OwnProps {
  path: string;
}
interface StateProps {
  position: object;
  locationWeather: object;
}
interface DispatchProps {
  dispatchUpdatedPosition: Function;
}
interface State {}

type Props = StateProps & DispatchProps & OwnProps & State;

const WeatherPage: React.SFC<Props> = () => {
  return (
    <div>
      <button onClick={() => HF.Appfetch("api/Authenticate/Throw500")}>
        throw5000
      </button>
      <button onClick={() => HF.Appfetch("api/Authenticate/Throw400")}>
        throw400
      </button>
      <Friends />
    </div>
  );
};

const mapStateToProps = state => ({
  position: state.weather.currentPosition,
  locationWeather: state.weather.locationWeather
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdatedPosition: position => {
    dispatch(positionSuccessAction(position));
    dispatch(performWeatherSearch(position));
  }
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WeatherPage);
