import React from "react";
import PropTypes from "prop-types";

import styles from "./weather-page.css";
import MapComponent from "../../map/map";
import Friend from "../../friend/friend.container";

export default function WeatherPage({
  position,
  dispatchUpdatedPosition,
  locationWeather,
  getWeather,
  testArray
}) {
  const getlocation = () => {
    navigator.geolocation.getCurrentPosition(newPosition => {
      dispatchUpdatedPosition(newPosition);
    });
  };

  const clickHandler = () => {
    getlocation();
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

      {position && google && (
        <div>
          <MapComponent
            mapKey={"gerge"}
            position={position}
            style={styles.map}
          />
        </div>
      )}
      {testArray &&
        Object.values(testArray).map(el => {
          return (
            <Friend
              key={el.id}
              testString={el.testString}
              clickHandler={id => this.FriendClick(id)}
              id={el.id}
            />
          );
        })}
    </div>
  );
}

WeatherPage.propTypes = {
  position: PropTypes.object,
  dispatchUpdatedPosition: PropTypes.func.isRequired,
  locationWeather: PropTypes.object
};
