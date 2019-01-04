import React from "react";
import PropTypes from "prop-types";

import styles from "./weather-page.module.scss";
import MapComponent from "../../map/map";
import Friends from "../../friends/friends.container";
import FriendForm from "../../friendForm/friendForm.container";
import { HF } from "../../../helpers";

export default function WeatherPage({
  position,
  dispatchUpdatedPosition,
  locationWeather,
  getWeather
}) {
  const getlocation = () => {
    navigator.geolocation.getCurrentPosition(newPosition => {
      dispatchUpdatedPosition(newPosition.coords);
    });
  };

  const clickHandler = () => {
    getlocation();
  };

  const validateHandler = () => {
    Validate();
  };

  return (
    <div>
      {position && (
        <div>
          {position.latitude} {position.longitude}
        </div>
      )}
      {locationWeather && (
        <h2>
          {locationWeather.location},{locationWeather.country},
          {locationWeather.weather},{locationWeather.weatherDescription},
          {locationWeather.temp}degrees,
          <i className="fas fa-cloud-rain" />
        </h2>
      )}
      {position && false && google && (
        <div>
          <MapComponent
            mapKey={"gerge"}
            position={position}
            style={styles.map}
          />
        </div>
      )}
      <button onClick={() => HF.Appfetch("api/Authenticate/Throw500")}>
        throw500
      </button>
      <Friends />
    </div>
  );
}

WeatherPage.propTypes = {
  position: PropTypes.object,
  dispatchUpdatedPosition: PropTypes.func.isRequired,
  locationWeather: PropTypes.object
};
