import React from "react";
import styles from "./weather.module.scss";

export const Weather = props => {
  const { weather, showLabel } = props;
  if (weather) {
    return (
      <div className={styles.weather}>
        {showLabel && <h4 className={styles.weatherLabel}> Weather: </h4>}
        <h4 className={styles.weatherData}>
          {weather.name} &nbsp; {weather.main.temp} &deg;C,{" "}
          {weather.weather[0].main},{weather.weather[0].description}
        </h4>
      </div>
    );
  } else return null;
};
