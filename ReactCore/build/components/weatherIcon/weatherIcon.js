"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import * as styles from "./weatherIcon.module.scss";
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const WeatherIcon = ({ weather, weatherDescription }) => {
    return weatherSelector(weather);
};
function weatherSelector(weather) {
    switch (weather) {
        case "Rain":
            return React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: "cloud-rain" });
        case "Clouds":
            return React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: "cloud" });
        default:
            return React.createElement(React.Fragment, null);
    }
}
const rain = rain => {
    return rain == "light rain" || rain == "shower rain";
};
exports.default = WeatherIcon;
//# sourceMappingURL=weatherIcon.js.map