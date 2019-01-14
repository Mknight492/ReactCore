import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//import components
import FriendForm from "../friendForm/friendForm.Outside";
import { Weather } from "../weather/weather";
import Test from "../test/testhook.tsx";
import MapComponent from "../map/maphook";
import OutsideClick from "../../higherOrderComponents/OutsideClick";

//import helper functions
import { locationServices } from "../../redux/services";
import { HF } from "../../helpers";

//import styles
import styles from "./friend.module.scss";
import "./friend.scss";

//redux imports
import { connect } from "react-redux";
import { friendActions } from "../../redux/actions";

const FriendComponent = ({
  latitude,
  longitude,
  changeActive,
  Id,
  isActive,
  name,
  location
}) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    locationServices.getWeather(latitude, longitude).then(result => {
      setWeather(result);
    });
  }, []);

  const date = new Date().toLocaleString(undefined, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const ClickTest = OutsideClick(Test, changeActive);

  return (
    <div>
      {isActive ? (
        <>
          <ClickTest
            initialName={name}
            initialWeather={weather}
            location={location}
            edit={true}
            initialLatitude={latitude}
            initialLongitude={longitude}
            //
            Id={Id}
            isActive={isActive}
          />
        </>
      ) : (
        <div>
          <h3 className={styles.name}> {name}</h3>
          <h4 className={styles.location}> {HF.formatLocation(location)} </h4>
          {weather && (
            <div className={styles.weather}>
              <Weather weather={weather} showLabel={false} />
              <button
                className={"btn btn--small"}
                onClick={() => changeActive(Id)}
              >
                Edit
              </button>
              <MapComponent
                mapKey={Id}
                position={{ latitude, longitude }}
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
    },
    loadFriends: () => {
      dispatch(friendActions.loadFriendAttemptAG());
    }
  };
}

const ConnectedFriend = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendComponent);

export default ConnectedFriend;
