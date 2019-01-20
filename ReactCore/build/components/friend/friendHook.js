"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import components
const weather_1 = require("../weather/weather");
const friendFormHook_1 = require("../friendForm/friendFormHook");
const maphook_1 = require("../map/maphook");
//import helper functions
const index_1 = require("../../redux/services/index");
const index_2 = require("../../helpers/index");
//import styles
const styles = require("./friend.module.scss");
//redux imports
const react_redux_1 = require("react-redux");
const index_3 = require("../../redux/actions/index");
const { useState, useEffect } = React;
const FriendComponent = ({ Friend, changeActive, isActive, weatherTest }) => {
    const [weather, setWeather] = useState(weatherTest || undefined);
    useEffect(() => {
        index_1.locationServices
            .getWeather(Friend.Location.Latitude, Friend.Location.Longitude)
            .then(result => {
            setWeather(result);
        });
    }, [Friend.Location.Latitude, Friend.Location.Longitude]);
    /*
    const date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    */
<<<<<<< HEAD
    return (React.createElement("div", null, isActive ? (React.createElement(React.Fragment, null,
        React.createElement(friendFormHook_1.default, { Friend: Friend, initialWeather: weather, isActive: isActive, edit: true }))) : (React.createElement("div", null,
        React.createElement("h3", { className: styles.name },
            " ",
            Friend.Name),
        React.createElement("h4", { className: styles.location }, index_2.HF.formatLocation(Friend.Location)),
        weather && (React.createElement("div", null,
            React.createElement(weather_1.Weather, { weather: weather, showLabel: false }),
            React.createElement("button", { className: "btn btn--small", onClick: () => changeActive(Friend.Id) }, "Edit"),
            React.createElement(maphook_1.default, { mapKey: Friend.Id, position: {
                    latitude: Friend.Location.Latitude,
                    longitude: Friend.Location.Longitude
                }, style: styles.map, zoom: 9, weather: weather.weather[0].main })))))));
=======
    if (isActive === Friend.Id) {
        return (React.createElement("div", null,
            React.createElement(React.Fragment, null,
                React.createElement(friendFormHook_1.default, { Friend: Friend, initialWeather: weatherTest || weather, edit: true }))));
    }
    else {
        return (React.createElement("div", { id: `Friend${Friend.Id}` },
            React.createElement("div", null,
                React.createElement("h3", { className: styles.name }, Friend.Name),
                React.createElement("h4", { className: styles.location }, index_2.HF.formatLocation(Friend.Location)),
                weather && (React.createElement("div", null,
                    React.createElement(weather_1.Weather, { weather: weather, showLabel: false }),
                    React.createElement("button", { className: "btn btn--small", onClick: () => changeActive(Friend.Id) }, "Edit"),
                    React.createElement(maphook_1.default, { mapKey: Friend.Id, position: {
                            latitude: Friend.Location.Latitude,
                            longitude: Friend.Location.Longitude
                        }, style: styles.map, zoom: 9, weather: weather.weather[0].main }))))));
    }
>>>>>>> testing
};
function mapStateToProps(state) {
    return {
        isActive: state.friends.isActive || -1
    };
}
function mapDispatchToProps(dispatch) {
    return {
        changeActive: id => {
            dispatch(index_3.friendActions.changeFriendAG(id));
        }
    };
}
const ConnectedFriend = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FriendComponent);
exports.default = ConnectedFriend;
//# sourceMappingURL=friendHook.js.map