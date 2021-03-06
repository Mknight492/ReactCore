import * as React from "react";
import * as styles from "./weather.module.scss";
import { WeatherObject } from "../../models/index";
import { HF } from "helpers";

interface IProps {
  weather: WeatherObject | undefined;
  showLabel: boolean;
}

export const Weather: React.SFC<IProps> = props => {
  const { weather, showLabel } = props;
  if (weather) {
    return (
      <div className={styles.weather}>
        {showLabel && <h5 className={styles.weatherLabel}> {weather.name} </h5>}
        <h5 className={styles.weatherData}>
          {HF.formatWeather(weather, false)}
        </h5>
      </div>
    );
  }
  // this will make the widgit the correct size if there is no weather data to display
  else
    return (
      <div className={styles.weather}>
        <h5 className={styles.weatherLabel}>&nbsp;</h5>
        <h5 className={styles.weatherData}>&nbsp; </h5>
      </div>
    );
};
