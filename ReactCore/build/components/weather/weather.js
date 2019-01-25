"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styles = __importStar(require("./weather.module.scss"));
const helpers_1 = require("helpers");
exports.Weather = props => {
    const { weather, showLabel } = props;
    if (weather) {
        return (React.createElement("div", { className: styles.weather },
            showLabel && React.createElement("h5", { className: styles.weatherLabel }, " Weather: "),
            React.createElement("h5", { className: styles.weatherData }, helpers_1.HF.formatWeather(weather, false))));
    }
    else
        return null;
};
//# sourceMappingURL=weather.js.map