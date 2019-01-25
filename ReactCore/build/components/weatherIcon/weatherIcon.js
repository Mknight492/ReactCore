import * as React from "react";
//import * as styles from "./weatherIcon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const WeatherIcon = ({ weather, weatherDescription }) => {
    return weatherSelector(weather);
};
function weatherSelector(weather) {
    switch (weather) {
        case "Rain":
            return React.createElement(FontAwesomeIcon, { icon: "cloud-rain" });
        case "Clouds":
            return React.createElement(FontAwesomeIcon, { icon: "cloud" });
        default:
            return React.createElement(React.Fragment, null);
    }
}
const rain = rain => {
    return rain == "light rain" || rain == "shower rain";
};
export default WeatherIcon;
//# sourceMappingURL=weatherIcon.js.map