import * as React from "react";

//import components

import { Weather } from "../weather/weather";

import Test from "../test/testhook";
import MapComponent from "../map/maphook";
import OutsideClick from "../../higherOrderComponents/OutsideClick";

//import helper functions
import { locationServices } from "../../redux/services/index";
import { HF } from "../../helpers/index";

//import styles
import * as styles from "./friend.module.scss";

//redux imports
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions/index";

//models
import { Friend } from "../../models";

const { useState, useEffect } = React;

interface OwnProps {
  Friend: Friend;
  isActive: boolean;
  changeActive: Function;
}
interface StateProps {}
interface DispatchProps {
  changeActive: Function;
}
interface State {}

type Props = StateProps & DispatchProps & OwnProps & State;

const FriendComponent: React.FunctionComponent<Props> = ({
  Friend,
  changeActive,
  isActive
}) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    locationServices
      .getWeather(Friend.Location.Latitude, Friend.Location.Longitude)
      .then(result => {
        setWeather(result);
      });
  }, []);

  /*
  const date = new Date().toLocaleString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  */
  const ClickTest = OutsideClick(Test, changeActive);

  return (
    <div>
      {isActive ? (
        <>
          <ClickTest
            Friend={Friend}
            initialWeather={weather}
            isActive={isActive}
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
  return {};
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
