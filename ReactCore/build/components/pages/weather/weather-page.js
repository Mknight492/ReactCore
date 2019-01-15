"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const friends_container_1 = require("../../friends/friends.container");
//helper functions
const helpers_1 = require("../../../helpers");
//redux imports
const react_redux_1 = require("react-redux");
const weatherActions_1 = require("../../../redux/actions/weatherActions");
const WeatherPage = () => {
    return (React.createElement("div", null,
        React.createElement("button", { onClick: () => helpers_1.HF.Appfetch("api/Authenticate/Throw500") }, "throw5000"),
        React.createElement("button", { onClick: () => helpers_1.HF.Appfetch("api/Authenticate/Throw400") }, "throw400"),
        React.createElement(friends_container_1.default, null)));
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