import * as React from "react";

//import components

import { Weather } from "../weather/weather";

import FriendForm from "../friendForm/friendFormHook";
import MapComponent from "../map/maphook";

//import helper functions
import { locationServices } from "../../redux/services/index";
import { HF } from "../../helpers/index";

//import styles
import * as styles from "./friend.module.scss";

//redux imports
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions/index";

//models
import { Friend, WeatherObject } from "../../models";

const { useState, useEffect } = React;

interface OwnProps {
  Friend: Friend;
  weatherTest?: WeatherObject;
}
interface StateProps {
  isActive?: number;
}
interface DispatchProps {
  changeActive: Function;
}
interface State {}

type Props = StateProps & DispatchProps & OwnProps & State;

const FriendComponent: React.FunctionComponent<Props> = ({
  Friend,
  changeActive,
  isActive,
  weatherTest
}) => {
  const [weather, setWeather] = useState(
    weatherTest || (undefined as WeatherObject | undefined)
  );

  useEffect(
    () => {
      locationServices
        .getWeather(Friend.Location.Latitude, Friend.Location.Longitude)
        .then(result => {
          setWeather(result);
        });
    },
    [Friend.Location.Latitude, Friend.Location.Longitude]
  );

  /*
  const date = new Date().toLocaleString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  */

  return (
    <div>
      {isActive === Friend.Id ? (
        <>
          <FriendForm
            Friend={Friend}
            initialWeather={weather}
            //isActive={isActive}
            edit={true}
          />
        </>
      ) : (
        <div>
          <h3 className={styles.name}> {Friend.Name}</h3>
          <h4 className={styles.location}>
            {HF.formatLocation(Friend.Location)}
          </h4>
          {weather && (
            <div>
              <Weather weather={weather} showLabel={false} />
              <button
                className={"btn btn--small"}
                onClick={() => changeActive(Friend.Id)}
              >
                Edit
              </button>
              <MapComponent
                mapKey={Friend.Id}
                position={{
                  latitude: Friend.Location.Latitude,
                  longitude: Friend.Location.Longitude
                }}
                style={styles.map}
                zoom={9}
                weather={weather.weather[0].main}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isActive: state.friends.isActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeActive: id => {
      dispatch(friendActions.changeFriendAG(id));
    }
  };
}

const ConnectedFriend = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(FriendComponent);

export default ConnectedFriend;
