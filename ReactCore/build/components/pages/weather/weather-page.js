"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const friendsHook_1 = __importDefault(require("../../friends/friendsHook"));
//helper functions
const helpers_1 = require("../../../helpers");
//redux imports
const react_redux_1 = require("react-redux");
const weatherActions_1 = require("../../../redux/actions/weatherActions");
const WeatherPage = () => {
    return (React.createElement("div", { "data-testid": "weatherPage" },
        React.createElement("button", { onClick: () => helpers_1.HF.AppAxios({ url: "api/Authenticate/Throw500" }) }, "throw5000"),
        React.createElement("button", { onClick: () => helpers_1.HF.AppAxios({ url: "api/Authenticate/Throw400" }) }, "throw400"),
        React.createElement(friendsHook_1.default, null)));
};
const mapStateToProps = state => ({
    position: state.weather.currentPosition,
    locationWeather: state.weather.locationWeather
});
const mapDispatchToProps = dispatch => ({
    dispatchUpdatedPosition: position => {
        dispatch(weatherActions_1.positionSuccessAction(position));
        dispatch(weatherActions_1.performWeatherSearch(position));
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
//# sourceMappingURL=weather-page.js.map