import React from "react";
import PropTypes from "prop-types";

import styles from "./weather-page.module.scss";
import MapComponent from "../../map/map";
import Friends from "../../friends/friends.container";
import FriendForm from "../../friendForm/friendForm.container";

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
      <h2 onClick={getWeather}> Weather Page</h2>
      <button
        onClick={() => {
          clickHandler();
        }}
      >
        get location
      </button>

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
      <button
        onClick={() => {
          validateHandler();
        }}
      >
        Validate
      </button>

      <button
        onClick={() => {
          logOut();
        }}
      >
        Logout
      </button>
      {position && false && google && (
        <div>
          <MapComponent
            mapKey={"gerge"}
            position={position}
            style={styles.map}
          />
        </div>
      )}
      <Friends />
    </div>
  );
}

WeatherPage.propTypes = {
  position: PropTypes.object,
  dispatchUpdatedPosition: PropTypes.func.isRequired,
  locationWeather: PropTypes.object
};

async function Validate() {
  const loggedIn = await fetch("/Account/validate", {
    method: "GET",
    headers: {
      RequestVerificationToken: document.getElementsByName(
        "__RequestVerificationToken"
      )[0].value
    }
  });
  const loggedInParsed = await loggedIn.json();
}

async function logOut() {
  const result = await fetch("/Account/Logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      RequestVerificationToken: document.getElementsByName(
        "__RequestVerificationToken"
      )[0].value
    }
  });
}
