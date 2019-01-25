import * as React from "react";
import * as styles from "./weather.module.scss";
import { HF } from "helpers";
export const Weather = props => {
    const { weather, showLabel } = props;
    if (weather) {
        return (React.createElement("div", { className: styles.weather },
            showLabel && React.createElement("h5", { className: styles.weatherLabel }, " Weather: "),
            React.createElement("h5", { className: styles.weatherData }, HF.formatWeather(weather, false))));
    }
    else
        return null;
};
//# sourceMappingURL=weather.js.map