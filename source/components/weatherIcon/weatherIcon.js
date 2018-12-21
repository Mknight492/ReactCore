import React from "react";
import styles from "./weatherIcon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const WeatherIcon = ({ weather, weatherDescription }) => {
  return weatherSelector(weather);
};

function weatherSelector(weather) {
  switch (weather) {
    case "Rain":
      return <FontAwesomeIcon icon="cloud-rain" />;
    case "Clouds":
      return <FontAwesomeIcon icon="cloud" />;
    default:
      return <></>;
  }
}

const rain = rain => {
  return rain == "light rain" || rain == "shower rain";
};

export default WeatherIcon;
