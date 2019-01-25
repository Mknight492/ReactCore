import * as React from "react";
import * as styles from "./weather.module.scss";
import { WeatherObject } from "../../models/index";
import { HF } from "helpers";

interface IProps {
  weather: WeatherObject;
  showLabel: boolean;
}

export const Weather: React.SFC<IProps> = props => {
  const { weather, showLabel } = props;
  if (weather) {
    return (
      <div className={styles.weather}>
        {showLabel && <h5 className={styles.weatherLabel}> Weather: </h5>}
        <h5 className={styles.weatherData}>
          {HF.formatWeather(weather, false)}
        </h5>
      </div>
    );
  } else return null;
};
