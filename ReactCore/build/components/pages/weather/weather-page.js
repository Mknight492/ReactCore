"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var friends_container_1 = require("../../friends/friends.container");
//helper functions
var helpers_1 = require("../../../helpers");
//redux imports
var react_redux_1 = require("react-redux");
var weatherActions_1 = require("../../../redux/actions/weatherActions");
var WeatherPage = function () {
    return (React.createElement("div", null,
        React.createElement("button", { onClick: function () { return helpers_1.HF.Appfetch("api/Authenticate/Throw500"); } }, "throw5000"),
        React.createElement("button", { onClick: function () {
                return helpers_1.HF.Appfetch("api/Authenticate/Throw400");
            } }, "throw400"),
        React.createElement(friends_container_1.default, null)));
};
var mapStateToProps = function (state) { return ({
    position: state.weather.currentPosition,
    locationWeather: state.weather.locationWeather,
    testArray: state.friends.friendsObj
}); };
var mapDispatchToProps = function (dispatch) { return ({
    dispatchUpdatedPosition: function (position) {
        dispatch(weatherActions_1.positionSuccessAction(position));
        dispatch(weatherActions_1.performWeatherSearch(position));
    },
    getWeather: function () {
        dispatch(weatherActions_1.performWeatherSearch());
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WeatherPage);
//# sourceMappingURL=weather-page.js.map