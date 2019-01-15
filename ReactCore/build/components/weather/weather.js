"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styles = require("./weather.module.scss");
exports.Weather = props => {
    const { weather, showLabel } = props;
    if (weather) {
        return (React.createElement("div", { className: styles.weather },
            showLabel && React.createElement("h4", { className: styles.weatherLabel }, " Weather: "),
            React.createElement("h4", { className: styles.weatherData },
                weather.name,
                " \u00A0 ",
                weather.main.temp,
                " \u00B0C,",
                " ",
                weather.weather[0].main,
                ",",
                weather.weather[0].description)));
    }
    else
        return null;
};
//# sourceMappingURL=weather.js.map