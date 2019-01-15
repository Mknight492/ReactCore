import * as React from "react";
import * as styles from "./weather.module.scss";
import { WeatherObject } from "../../models/index";

interface IProps {
  weather: WeatherObject;
  showLabel: boolean;
}

export const Weather: React.SFC<IProps> = props => {
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
